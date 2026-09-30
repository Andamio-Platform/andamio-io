// Proof Rings SVG generator — evolved Warm Index face (concept 40) with
// U1 ring ticks (decode-parity), hybrid photo + hash lattice (U2), earner
// micro-pattern, short IDs, QR, and named interactive groups.
// Pure, deterministic string assembly; NO React / Next / landing imports.

import { ALL_TOKENS, type Palette } from "./palettes";
import { FONT_FACE } from "./fonts";
import {
  DEFAULT_PERIMETER,
  DEFAULT_SKILLS,
  shortHex,
  type BadgeSkill,
} from "./badge-display";
import { buildConcept40Face } from "./badge-face-c40";

const CX = 512;
const CY = 512;

/** Soft scaffold photo behind the core (hybrid BG). Falls back gracefully if missing. */
const SCAFFOLD_PHOTO = "/images/landing/local.jpeg";

export interface BadgeParams {
  courseTitle: string;
  moduleTitle: string;
  courseId: string; // hex, 28 bytes (56 chars) — outer ring
  sltHash: string; // hex, 32 bytes (64 chars) — inner ring
  network: string; // "mainnet" | "preprod" | "preview"
  /** Face display — fictional wired when absent from chain. */
  earnerName?: string;
  did?: string;
  issuedAt?: string;
  skills?: BadgeSkill[];
  verifyUrl?: string;
  /** Short face label; defaults to compact hex. */
  courseIdShort?: string;
  sltHashShort?: string;
  perimeterLabels?: string[];
}

export interface BuildOptions {
  /** Suffix appended to internal element IDs so multiple inline SVGs don't collide. */
  idSuffix?: string;
  /**
   * `canonical` — denser type for builders / issued SVGs.
   * `hero` — marketing specimen rhythm for large display.
   */
  layout?: "canonical" | "hero";
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

/** Interior tokens default to the dark field. Port of gen.fill_defaults. */
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

/** Turn a hex string into ring tick lines. Port of gen.ring_ticks — decode parity. */
function ringTicks(
  R: number,
  hexstr: string,
  color: string,
  hair: string,
): Ticks {
  const bytes: number[] = [];
  for (let i = 0; i < hexstr.length; i += 2)
    bytes.push(parseInt(hexstr.slice(i, i + 2), 16));
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

/** Shrink a title's font-size so it fits maxw px; never grows past base. */
export function fitTitle(
  text: string,
  base: number,
  maxw = 384.0,
  factor = 0.56,
  floor = 16,
): number {
  const n = Math.max(text.length, 1);
  return Math.max(Math.min(base, Math.floor(maxw / (factor * n))), floor);
}

function credentialJson(P: Required<Palette>, params: BadgeParams): string {
  const theme: Record<string, string> = {};
  for (const k of ALL_TOKENS) theme[k] = (P as Record<string, string>)[k] ?? "";
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
        id: params.did ?? undefined,
        name: params.earnerName ?? undefined,
        achievement: {
          type: ["Achievement"],
          name: params.moduleTitle,
          description: `${params.moduleTitle} — ${params.courseTitle}`,
        },
      },
      "andamio:course": params.courseTitle,
      "andamio:onChainAnchor": {
        network: params.network,
        courseId: params.courseId,
        sltHash: params.sltHash,
      },
      "andamio:theme": theme,
      _note:
        "Presentation artifact. Colors are CSS vars (--token) overridable for theming; signed VC-JWT bakes into openbadges:credential verify= at issue time. QR is illustrative — not a live verify endpoint.",
    },
    null,
    2,
  );
}

function arcLabelPath(
  id: string,
  r: number,
  startDeg: number,
  sweepDeg: number,
): string {
  const a0 = ((startDeg - 90) * Math.PI) / 180;
  const a1 = ((startDeg + sweepDeg - 90) * Math.PI) / 180;
  const x0 = CX + r * Math.cos(a0);
  const y0 = CY + r * Math.sin(a0);
  const x1 = CX + r * Math.cos(a1);
  const y1 = CY + r * Math.sin(a1);
  const large = sweepDeg > 180 ? 1 : 0;
  return `<path id="${id}" d="M ${x0.toFixed(2)} ${y0.toFixed(2)} A ${r} ${r} 0 ${large} 1 ${x1.toFixed(2)} ${y1.toFixed(2)}" fill="none"/>`;
}

/**
 * Build the Proof Rings SVG string for the given params + palette.
 * Pass a stable `idSuffix` for deterministic output (parity tests); pass a
 * unique one per render in the browser so multiple inline badges don't collide.
 */
export function buildBadgeSvg(
  params: BadgeParams,
  palette: Palette,
  opts: BuildOptions = {},
): string {
  const P = fillDefaults(palette);
  const sfx = opts.idSuffix ?? "";
  const id = (base: string) => (sfx ? `${base}-${sfx}` : base);
  const c = (k: keyof Palette) => `var(--${k}, ${P[k]})`;
  const hero = opts.layout === "hero";

  const R_OUT = 472;
  const R_IN = 440;
  const R_CORE = 412;
  const ringO = ringTicks(R_OUT, params.courseId, c("prim"), c("hair"));
  const ringI = ringTicks(R_IN, params.sltHash, c("sec"), c("hair"));
  const cred = credentialJson(P, params);
  const varStyle = ALL_TOKENS.map(
    (k) => `--${k}:${(P as Record<string, string>)[k]};`,
  ).join("");

  const earner = params.earnerName ?? "Credential holder";
  const did = params.did ?? "did:andamio:preview";
  const issued = params.issuedAt ?? "—";
  const skills = (params.skills ?? DEFAULT_SKILLS).slice(0, 4);
  const verifyUrl =
    params.verifyUrl ?? "https://credentials.andamio.io/verify/demo";
  const courseShort = params.courseIdShort ?? shortHex(params.courseId);
  const sltShort = params.sltHashShort ?? shortHex(params.sltHash);
  const perimeter = params.perimeterLabels ?? [...DEFAULT_PERIMETER];
  const earnerSalt = params.did ?? params.earnerName ?? "earner";

  const p: string[] = [];
  p.push(
    `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" ` +
      `xmlns:openbadges="https://purl.imsglobal.org/ob/v3p0" ` +
      `viewBox="0 0 1024 1024" width="1024" height="1024" role="img" ` +
      `style="${varStyle}" ` +
      `aria-label="Andamio credential — ${esc(params.moduleTitle)} (${esc(params.courseTitle)})">`,
  );
  p.push(`<metadata><![CDATA[\n${cred}\n]]></metadata>`);
  p.push(
    `<openbadges:credential verify=""><![CDATA[\n${cred}\n]]></openbadges:credential>`,
  );

  // Arc paths for perimeter labels (ride outer ring)
  const arcDefs = [
    arcLabelPath(id("arc0"), 498, -36, 72),
    arcLabelPath(id("arc1"), 498, 40, 55),
    arcLabelPath(id("arc2"), 498, 125, 55),
    arcLabelPath(id("arc3"), 498, 215, 55),
    arcLabelPath(id("arc4"), 498, 305, 55),
  ].join("");

  p.push(
    `<defs>` +
      `<style>${FONT_FACE}.sans{font-family:"Archivo",sans-serif;}.mono{font-family:"Spline Sans Mono",monospace;}text{text-rendering:geometricPrecision;}</style>` +
      `<radialGradient id="${id("field")}" cx="50%" cy="44%" r="62%"><stop offset="0%" stop-color="${c("raised")}"/><stop offset="70%" stop-color="${c("ink")}"/><stop offset="100%" stop-color="${c("deep")}"/></radialGradient>` +
      `<linearGradient id="${id("core")}" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="${c("core1")}" stop-opacity="0.92"/><stop offset="100%" stop-color="${c("core2")}" stop-opacity="0.96"/></linearGradient>` +
      `<radialGradient id="${id("photo-veil")}" cx="50%" cy="45%" r="55%"><stop offset="0%" stop-color="${c("ink")}" stop-opacity="0.25"/><stop offset="100%" stop-color="${c("deep")}" stop-opacity="0.72"/></radialGradient>` +
      `<filter id="${id("glow")}" x="-40%" y="-40%" width="180%" height="180%">` +
      `<feGaussianBlur in="SourceGraphic" stdDeviation="2.8" result="b"/>` +
      `<feColorMatrix in="b" type="matrix" values="1 0.2 0 0 0  0.15 0.55 0.85 0 0  0.1 0.35 1 0 0  0 0 0 0.85 0" result="tint"/>` +
      `<feMerge><feMergeNode in="tint"/><feMergeNode in="SourceGraphic"/></feMerge></filter>` +
      `<clipPath id="${id("core-clip")}"><circle cx="${CX}" cy="${CY}" r="${R_CORE}"/></clipPath>` +
      `<clipPath id="${id("field-clip")}"><circle cx="${CX}" cy="${CY}" r="500"/></clipPath>` +
      arcDefs +
      `</defs>`,
  );

  /* ── Field plate ─────────────────────────────────────────────── */
  p.push(`<g class="badge-field" id="${id("badge-field")}">`);
  p.push(
    `<circle cx="${CX}" cy="${CY}" r="500" fill="url(#${id("field")})" stroke="${c("hair")}" stroke-width="2"/>`,
  );
  p.push(
    `<circle cx="${CX}" cy="${CY}" r="488" fill="none" stroke="${c("hair")}" stroke-width="1.25" opacity="0.7"/>`,
  );
  p.push(`</g>`);

  p.push(
    `<circle cx="${CX}" cy="${CY}" r="${R_IN}" fill="none" stroke="${c("sec")}" stroke-width="1" opacity="0.16"/>`,
  );

  /* Outer ring + arc labels (rotate together) */
  const arcFills = [c("prim"), c("sec"), c("sec"), c("sec"), c("sec")];
  let arcLabels = `<g class="badge-arc-labels">`;
  perimeter.slice(0, 5).forEach((label, i) => {
    arcLabels +=
      `<text class="mono" font-size="${hero ? 11 : 10}" fill="${arcFills[i]}" letter-spacing="2.2" opacity="0.92">` +
      `<textPath href="#${id(`arc${i}`)}" xlink:href="#${id(`arc${i}`)}" startOffset="50%" text-anchor="middle">${esc(label)}</textPath>` +
      `</text>`;
  });
  arcLabels += `</g>`;

  p.push(
    `<g class="badge-ring-outer" id="${id("ring-outer")}">${ringO.dim.join("")}` +
      `<g filter="url(#${id("glow")})">${ringO.lit.join("")}</g>${arcLabels}</g>`,
  );
  p.push(
    `<g class="badge-ring-inner" id="${id("ring-inner")}">${ringI.dim.join("")}` +
      `<g filter="url(#${id("glow")})">${ringI.lit.join("")}</g></g>`,
  );
  p.push(
    `<path class="badge-start" d="M ${CX} ${CY - R_OUT - 19} l 6 -11 l -12 0 z" fill="${c("prim")}" opacity="0.85"/>`,
  );
  // Bottom cardinal triangle (concept 40)
  p.push(
    `<path class="badge-start-south" d="M ${CX} ${CY + R_OUT + 19} l 6 11 l -12 0 z" fill="${c("prim")}" opacity="0.75"/>`,
  );

  /* ── Core face (concept 40 plate) ────────────────────────────── */
  p.push(`<g class="badge-core" id="${id("badge-core")}">`);
  p.push(
    buildConcept40Face({
      courseTitle: params.courseTitle,
      moduleTitle: params.moduleTitle,
      courseId: params.courseId,
      earnerName: earner,
      did,
      issuedAt: issued,
      network: params.network,
      skills,
      verifyUrl,
      courseIdShort: courseShort,
      sltHashShort: sltShort,
      earnerSalt,
      photoHref: SCAFFOLD_PHOTO,
      id,
      R_CORE,
    }),
  );
  p.push(`</g>`); // badge-core
  p.push("</svg>");
  return p.join("");
}

export { shortHex } from "./badge-display";
export type { BadgeSkill } from "./badge-display";
