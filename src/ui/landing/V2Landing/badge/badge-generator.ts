// Proof Rings SVG generator — a faithful TS port of the credential-badges
// generator `gen.py`. Pure, deterministic string assembly; NO React / Next /
// landing imports (this `badge/` folder is extraction-ready — see plan R9).
//
// RINGS (curves only): outer = course_id, inner = slt_hash (256b/32B). Byte 0 at
// 12 o'clock, sweeping clockwise; bit k=0 is the MSB; lit tick = 1, dim = 0. The
// tick geometry round-trips back to the hashes (credential-badges decode.py).
// Lit strokes keep the `var(--prim|--sec, #hex)` form so decode.py reads them.

import { ALL_TOKENS, Palette } from "./palettes";
import { FONT_FACE } from "./fonts";

const CX = 512;
const CY = 512;

export interface BadgeParams {
  courseTitle: string;
  moduleTitle: string;
  courseId: string; // hex, 28 bytes (56 chars) — outer ring
  sltHash: string; // hex, 32 bytes (64 chars) — inner ring
  network: string; // "mainnet" | "preprod" | "preview"
}

export interface BuildOptions {
  /** Suffix appended to internal element IDs so multiple inline SVGs don't collide. */
  idSuffix?: string;
}

/** XML-escape text-node and attribute content. Port of gen.esc. */
export function esc(s: string): string {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Interior tokens default to the dark field, so a bare palette renders the dark
 *  canonical; the light/white/invert transforms override only these. Port of gen.fill_defaults. */
function fillDefaults(pal: Palette): Required<Palette> {
  const P = { ...pal } as Palette;
  P.core1 ??= P.raised;
  P.core2 ??= P.ink;
  P.itext ??= P.bone;
  P.imuted ??= P.slate;
  P.iline ??= P.hair;
  P.extlabel ??= P.slate;
  P.slt_label ??= P.prim_lt;
  P.ev_label ??= P.sec_lt;
  P.ctitle ??= P.itext;
  P.mtitle ??= P.itext;
  P.slug ??= "";
  return P as Required<Palette>;
}

interface Ticks {
  lit: string[];
  dim: string[];
}

/** Turn a hex string into ring tick lines. Port of gen.ring_ticks. */
function ringTicks(R: number, hexstr: string, color: string, hair: string): Ticks {
  const bytes: number[] = [];
  for (let i = 0; i < hexstr.length; i += 2) bytes.push(parseInt(hexstr.slice(i, i + 2), 16));
  const gs = 360.0 / bytes.length;
  const lead = (gs - 8.0) / 2.0;
  const lit: string[] = [];
  const dim: string[] = [];
  bytes.forEach((bv, bi) => {
    const g0 = -90.0 + bi * gs;
    for (let k = 0; k < 8; k++) {
      const bit = (bv >> (7 - k)) & 1;
      const msb = k === 0;
      const a = ((g0 + lead + (k + 0.5)) * Math.PI) / 180;
      const c = Math.cos(a);
      const s = Math.sin(a);
      if (bit) {
        const L = msb ? 18 : 13;
        const w = msb ? 3.4 : 2.6;
        const r0 = R - L / 2;
        const r1 = R + L / 2;
        lit.push(
          `<line x1="${(CX + r0 * c).toFixed(2)}" y1="${(CY + r0 * s).toFixed(2)}" x2="${(CX + r1 * c).toFixed(2)}" y2="${(CY + r1 * s).toFixed(2)}" stroke="${color}" stroke-width="${w}" stroke-linecap="round"/>`,
        );
      } else {
        const L = msb ? 8 : 5;
        const r0 = R - L / 2;
        const r1 = R + L / 2;
        dim.push(
          `<line x1="${(CX + r0 * c).toFixed(2)}" y1="${(CY + r0 * s).toFixed(2)}" x2="${(CX + r1 * c).toFixed(2)}" y2="${(CY + r1 * s).toFixed(2)}" stroke="${hair}" stroke-width="2" stroke-linecap="round" opacity="0.6"/>`,
        );
      }
    }
  });
  return { lit, dim };
}

/** Shrink a title's font-size so it fits maxw px; never grows past base. Port of gen.fit_title. */
export function fitTitle(text: string, base: number, maxw = 384.0, factor = 0.56, floor = 16): number {
  const n = Math.max(text.length, 1);
  return Math.max(Math.min(base, Math.floor(maxw / (factor * n))), floor);
}

/** Split into at most 2 lines, breaking at the space nearest the middle. Port of gen._wrap2. */
function wrap2(text: string): string[] {
  const mid = Math.floor(text.length / 2);
  const l = text.lastIndexOf(" ", mid - 1); // rfind(" ", 0, mid): highest index < mid
  const r = text.indexOf(" ", mid); // find(" ", mid): lowest index >= mid
  if (l < 0 && r < 0) return [text];
  const cut = r < 0 ? l : l < 0 ? r : mid - l <= r - mid ? l : r;
  return [text.slice(0, cut).trim(), text.slice(cut).trim()];
}

/** Lay a title as 1 line at the largest size up to base; else wrap to 2. Port of gen.lay_title. */
function layTitle(text: string, base: number, maxw: number, factor: number, minOne: number, floor = 15): [string[], number] {
  const n = Math.max(text.length, 1);
  const one = Math.min(base, Math.floor(maxw / (factor * n)));
  if (one >= minOne || !text.includes(" ")) return [[text], Math.max(one, floor)];
  const lines = wrap2(text);
  if (lines.length === 1) return [lines, Math.max(one, floor)];
  const longest = Math.max(...lines.map((s) => s.length));
  return [lines, Math.max(Math.min(base, Math.floor(maxw / (factor * longest))), floor)];
}

/** OB3 credential JSON baked into the SVG. Port of gen.credential_json.
 *  `verify` stays empty — the demo badge is a preview, never a signed claim. */
function credentialJson(P: Required<Palette>, params: BadgeParams): string {
  const theme: Record<string, string> = {};
  for (const k of ALL_TOKENS) theme[k] = (P as Record<string, string>)[k];
  return JSON.stringify(
    {
      "@context": [
        "https://www.w3.org/ns/credentials/v2",
        "https://purl.imsglobal.org/spec/ob/v3p0/context-3.0.3.json",
        "https://credentials.andamio.io/context/v0.jsonld",
      ],
      type: ["VerifiableCredential", "OpenBadgeCredential"],
      issuer: "did:web:credentials.andamio.io",
      name: params.moduleTitle,
      credentialSubject: {
        type: ["AchievementSubject"],
        achievement: {
          type: ["Achievement"],
          name: params.moduleTitle,
          description: `${params.moduleTitle} — ${params.courseTitle}`,
        },
      },
      "andamio:course": params.courseTitle,
      "andamio:onChainAnchor": { network: params.network, courseId: params.courseId, sltHash: params.sltHash },
      "andamio:theme": theme,
      _note:
        "Presentation artifact. Colors are CSS vars (--token) overridable for theming; signed VC-JWT bakes into openbadges:credential verify= at issue time.",
    },
    null,
    2,
  );
}

function textEl(
  y: number,
  s: string,
  size: number,
  fill: string,
  cls = "mono",
  w?: number,
  ls?: number,
): string {
  let a = `<text class="${cls}" x="${CX}" y="${y}" text-anchor="middle" font-size="${size}" fill="${fill}"`;
  if (w) a += ` font-weight="${w}"`;
  if (ls != null) a += ` letter-spacing="${ls}"`;
  return a + `>${s}</text>`;
}

/**
 * Build the Proof Rings SVG string for the given params + palette.
 * Pass a stable `idSuffix` for deterministic output (parity tests); pass a
 * unique one per render in the browser so multiple inline badges don't collide.
 */
export function buildBadgeSvg(params: BadgeParams, palette: Palette, opts: BuildOptions = {}): string {
  const P = fillDefaults(palette);
  const sfx = opts.idSuffix ?? "";
  const id = (base: string) => (sfx ? `${base}-${sfx}` : base);
  const c = (k: keyof Palette) => `var(--${k}, ${P[k]})`;

  const R_OUT = 472;
  const R_IN = 440;
  const ringO = ringTicks(R_OUT, params.courseId, c("prim"), c("hair"));
  const ringI = ringTicks(R_IN, params.sltHash, c("sec"), c("hair"));
  const cred = credentialJson(P, params);
  const varStyle = ALL_TOKENS.map((k) => `--${k}:${(P as Record<string, string>)[k]};`).join("");

  const p: string[] = [];
  p.push(
    `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" ` +
      `xmlns:openbadges="https://purl.imsglobal.org/ob/v3p0" ` +
      `viewBox="0 0 1024 1024" width="1024" height="1024" role="img" ` +
      `style="${varStyle}" ` +
      `aria-label="Andamio credential — ${esc(params.moduleTitle)} (${esc(params.courseTitle)})">`,
  );
  p.push(`<metadata><![CDATA[\n${cred}\n]]></metadata>`);
  p.push(`<openbadges:credential verify=""><![CDATA[\n${cred}\n]]></openbadges:credential>`);
  p.push(
    `<defs>` +
      `<style>${FONT_FACE}.sans{font-family:"Archivo",sans-serif;}.mono{font-family:"Spline Sans Mono",monospace;}</style>` +
      `<radialGradient id="${id("field")}" cx="50%" cy="44%" r="62%"><stop offset="0%" stop-color="${c("raised")}"/><stop offset="70%" stop-color="${c("ink")}"/><stop offset="100%" stop-color="${c("deep")}"/></radialGradient>` +
      `<linearGradient id="${id("core")}" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="${c("core1")}"/><stop offset="100%" stop-color="${c("core2")}"/></linearGradient>` +
      `<filter id="${id("glow")}" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="2.4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>` +
      `</defs>`,
  );

  p.push(`<circle cx="${CX}" cy="${CY}" r="500" fill="url(#${id("field")})" stroke="${c("hair")}" stroke-width="2"/>`);
  p.push(`<circle cx="${CX}" cy="${CY}" r="488" fill="none" stroke="${c("hair")}" stroke-width="1.25" opacity="0.7"/>`);
  p.push(`<circle cx="${CX}" cy="${CY}" r="${R_IN}" fill="none" stroke="${c("sec")}" stroke-width="1" opacity="0.16"/>`);
  p.push(`<g>${ringO.dim.join("")}${ringI.dim.join("")}</g>`);
  p.push(`<g filter="url(#${id("glow")})">${ringI.lit.join("")}${ringO.lit.join("")}</g>`);
  // One small start marker at 12 o'clock (where byte 0 begins).
  p.push(`<path d="M ${CX} ${CY - R_OUT - 19} l 6 -11 l -12 0 z" fill="${c("prim")}" opacity="0.85"/>`);

  p.push(`<circle cx="${CX}" cy="${CY}" r="424" fill="none" stroke="${c("hair")}" stroke-width="1.25" opacity="0.55"/>`);
  p.push(`<circle cx="${CX}" cy="${CY}" r="412" fill="url(#${id("core")})" stroke="${c("hair")}" stroke-width="1.5"/>`);

  // Center content: titles are the heroes (wrap to 2 lines when long); course_id /
  // slt_hash sit below the divider. The block is measured and vertically centered.
  const items: Array<[number, (y: number) => void]> = [];
  let cur = 0;
  const emit = (fn: (y: number) => void, advance: number) => {
    items.push([cur, fn]);
    cur += advance;
  };
  const text =
    (s: string, size: number, fill: string, cls: string, w?: number, ls?: number) =>
    (y: number) =>
      p.push(textEl(y, s, size, fill, cls, w, ls));

  const [clines, csz] = layTitle(params.courseTitle, 34, 500, 0.54, 24);
  const [mlines, msz] = layTitle(params.moduleTitle, 60, 520, 0.58, 40);
  const EG = 18; // eyebrow-label baseline to title cap-top

  emit(text("COURSE", 11, c("imuted"), "mono", undefined, 4), Math.floor(EG + csz * 0.72));
  for (const ln of clines) emit(text(esc(ln), csz, c("ctitle"), "sans", 600, undefined), Math.floor(csz * 1.12));
  cur += 22;
  emit(text("MODULE", 11, c("imuted"), "mono", undefined, 4), Math.floor(EG + msz * 0.72));
  for (const ln of mlines) emit(text(esc(ln), msz, c("mtitle"), "sans", 800, undefined), Math.floor(msz * 1.06));
  cur += 40;
  const divRel = cur;
  cur += 54;
  emit(text("COURSE_ID", 11, c("ctitle"), "mono", undefined, 3), 24);
  emit(text(params.courseId, 15, c("itext"), "mono", undefined, 0), 42);
  emit(text("SLT_HASH", 11, c("mtitle"), "mono", undefined, 3), 24);
  emit(text(params.sltHash, 13, c("itext"), "mono", undefined, 0), 0);

  const start = 532 - cur / 2.0;
  for (const [rel, fn] of items) fn(start + rel);
  const dy = start + divRel;
  p.push(`<line x1="${CX - 150}" y1="${dy.toFixed(1)}" x2="${CX + 150}" y2="${dy.toFixed(1)}" stroke="${c("iline")}" stroke-width="1.25"/>`);
  p.push(textEl(884, "ANDAMIO", 9, c("imuted"), "sans", 600, 6));
  p.push("</svg>");
  return p.join("");
}
