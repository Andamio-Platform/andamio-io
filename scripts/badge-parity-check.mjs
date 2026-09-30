#!/usr/bin/env node
/**
 * Dev-only parity / round-trip check for the TS Proof Rings port (plan KTD-6).
 * The repo has no test runner; this is the one pure-logic guard worth a real check.
 *
 * Asserts:
 *  - R3 round-trip: rendering known course_id + slt_hash, the drawn ring ticks
 *    decode back to the same hex (a self-contained JS port of credential-badges
 *    decode.py's geometry — no Python, no sibling repo).
 *  - R2 determinism: same (params, palette, idSuffix) → byte-identical SVG.
 *  - R9 boundary: the badge/ core imports nothing from react/next/landing.
 *
 * Run:  node scripts/badge-parity-check.mjs
 */
import { execFileSync } from "node:child_process";
import { mkdtempSync, writeFileSync, readFileSync, readdirSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";

const repo = path.resolve(import.meta.dirname, "..");
const badgeDir = path.join(repo, "src/ui/landing/V2Landing/badge");
// Windows: prefer tsc.cmd / node-run of lib/tsc.js (bare .bin/tsc is a shell stub).
const tscJs = path.join(repo, "node_modules", "typescript", "lib", "tsc.js");
const importJs = (file) => import(pathToFileURL(file).href);

function fail(msg) {
  console.error("❌ " + msg);
  process.exit(1);
}

// --- 1. compile the badge/ module to temp CJS -------------------------------
const out = mkdtempSync(path.join(tmpdir(), "badge-parity-"));
try {
  execFileSync(
    process.execPath,
    [
      tscJs,
      path.join(badgeDir, "badge-generator.ts"),
      path.join(badgeDir, "badge-display.ts"),
      path.join(badgeDir, "badge-face-c40.ts"),
      path.join(badgeDir, "badge-lattice.ts"),
      path.join(badgeDir, "badge-qr.ts"),
      path.join(badgeDir, "palettes.ts"),
      path.join(badgeDir, "fonts.ts"),
      path.join(badgeDir, "badge-model.ts"),
      "--outDir",
      out,
      "--module",
      "commonjs",
      "--target",
      "es2020",
      "--moduleResolution",
      "node",
      "--skipLibCheck",
    ],
    { stdio: "pipe" },
  );
} catch (e) {
  fail(
    "tsc compile of badge module failed:\n" +
      (e.stdout || e.stderr || e.message),
  );
}

const { buildBadgeSvg } = await importJs(path.join(out, "badge-generator.js"));
const { PALETTES, withInterior } = await importJs(
  path.join(out, "palettes.js"),
);

// --- 2. JS port of decode.py ring geometry ----------------------------------
const CX = 512,
  CY = 512;
function decodeRing(svg, token, rLo, rHi, nbytes) {
  const gs = 360.0 / nbytes;
  const off = (gs - 8.0) / 2.0 + 0.5; // matches gen ring_ticks
  const bits = {};
  const re =
    /<line x1="([\d.]+)" y1="([\d.]+)" x2="([\d.]+)" y2="([\d.]+)" stroke="([^"]+)"/g;
  let m;
  while ((m = re.exec(svg))) {
    const [, x1, y1, x2, y2, stroke] = m;
    const mx = (+x1 + +x2) / 2,
      my = (+y1 + +y2) / 2;
    const r = Math.hypot(mx - CX, my - CY);
    if (r < rLo || r > rHi) continue;
    const ang = (Math.atan2(my - CY, mx - CX) * 180) / Math.PI;
    const v = (ang + 90 + 360) % 360; // 0 at top, clockwise
    const bi = Math.floor(v / gs);
    const k = Math.round(v - bi * gs - off);
    if (k < 0 || k > 7 || bi < 0 || bi >= nbytes) continue;
    (bits[bi] ??= {})[k] = stroke.includes(token) ? 1 : 0;
  }
  let hex = "";
  for (let bi = 0; bi < nbytes; bi++) {
    let byte = 0;
    for (let k = 0; k < 8; k++) byte = (byte << 1) | (bits[bi]?.[k] ?? 0);
    hex += byte.toString(16).padStart(2, "0");
  }
  return hex;
}

// --- 3. round-trip a known credential ---------------------------------------
const courseId = "6348bba0f9b7d7e0353715ece5946f3b61de433d314e84dad313a677"; // 28B
const sltHash =
  "a891203913065a08e2c87ea57b808bb0f6efa4e57f36bc1412f7c2cdd846a045"; // 32B
const params = {
  courseTitle: "Andamio for Developers",
  moduleTitle: "Transactions",
  courseId,
  sltHash,
  network: "preview",
};
const pal = withInterior(PALETTES[0], "light");

const svg = buildBadgeSvg(params, pal, { idSuffix: "parity" });
const outer = decodeRing(svg, "--prim", 456, 486, courseId.length / 2);
const inner = decodeRing(svg, "--sec", 424, 456, sltHash.length / 2);
if (outer !== courseId)
  fail(`outer ring decode mismatch\n  got ${outer}\n  exp ${courseId}`);
if (inner !== sltHash)
  fail(`inner ring decode mismatch\n  got ${inner}\n  exp ${sltHash}`);

// --- 4. determinism ---------------------------------------------------------
const svg2 = buildBadgeSvg(params, pal, { idSuffix: "parity" });
if (svg !== svg2) fail("non-deterministic output for identical inputs");

// inverted interior renders and still round-trips (rings unchanged by interior)
const inv = buildBadgeSvg(params, withInterior(PALETTES[0], "inverted"), {
  idSuffix: "p2",
});
if (decodeRing(inv, "--prim", 456, 486, 28) !== courseId)
  fail("inverted interior broke the outer ring");

// distinct idSuffix → no shared internal ids (KTD-5)
const idsA = [...svg.matchAll(/id="([^"]+)"/g)].map((m) => m[1]);
const idsB = [...inv.matchAll(/id="([^"]+)"/g)].map((m) => m[1]);
if (idsA.some((id) => idsB.includes(id)))
  fail("two badges share internal SVG ids — collision risk");

// --- 4b. badge-model (U2): hashing typed inputs → ring hex ------------------
const { buildBadgeParams, canonicalizeSlts } = await importJs(
  path.join(out, "badge-model.js"),
);
const inputsA = {
  courseName: "Intro to Cardano",
  moduleName: "Wallets",
  slts: ["I can create a wallet", "I can send ada"],
};
const pA = await buildBadgeParams(inputsA);
const pA2 = await buildBadgeParams(inputsA);
if (pA.courseId.length !== 56)
  fail(`courseId should be 56 hex chars, got ${pA.courseId.length}`);
if (pA.sltHash.length !== 64)
  fail(`sltHash should be 64 hex chars, got ${pA.sltHash.length}`);
if (pA.courseId !== pA2.courseId || pA.sltHash !== pA2.sltHash)
  fail("buildBadgeParams not deterministic");
// changing an SLT changes the inner ring, not the outer
const pB = await buildBadgeParams({
  ...inputsA,
  slts: ["I can create a wallet", "I can stake ada"],
});
if (pB.courseId !== pA.courseId)
  fail("courseId changed when only SLTs changed");
if (pB.sltHash === pA.sltHash)
  fail("sltHash did not change when an SLT changed");
// empty / whitespace rows dropped before hashing
if (canonicalizeSlts(["a", " ", "", "b"]) !== "a\nb")
  fail("canonicalizeSlts did not drop empty rows");
// the rendered preview carries no signed verify= claim (R7)
if (
  !buildBadgeSvg(pA, pal, { idSuffix: "x" }).includes(
    '<openbadges:credential verify="">',
  )
) {
  fail("preview badge should have an empty verify= claim");
}

// --- 5. R9 import boundary --------------------------------------------------
const forbidden = /from\s+["'](react|next|@\/|\.\.\/)/;
for (const f of readdirSync(badgeDir).filter((f) => f.endsWith(".ts"))) {
  const src = readFileSync(path.join(badgeDir, f), "utf8");
  for (const line of src.split("\n")) {
    if (line.trimStart().startsWith("import") && forbidden.test(line)) {
      fail(`R9 boundary violated in badge/${f}: ${line.trim()}`);
    }
  }
}

console.log(
  "✅ parity-check passed — rings round-trip, output deterministic, ids scoped, R9 boundary clean.",
);
