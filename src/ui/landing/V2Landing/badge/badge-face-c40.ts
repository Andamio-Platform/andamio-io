/**
 * Concept-40 face chrome — layout, colors, icons matched to
 * docs/design-system/credential-badge-concepts/images/40-circular-proof-rings-evolved.png
 * Rings stay in badge-generator (U1 decode parity). This draws only the core plate.
 */

import type { BadgeSkill } from "./badge-display";
import { networkLabel } from "./badge-display";
import { buildQrModulesSvg } from "./badge-qr";
import { buildEarnerPattern, buildHashLattice } from "./badge-lattice";

const CX = 512;
const CY = 512;

function esc(s: string): string {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Fixed face palette from concept 40 (independent of ring palette tokens). */
export const C40 = {
  plate: "#F0F4F8",
  plateDeep: "#E4EAF0",
  ink: "#0B1C2C",
  muted: "#5F7285",
  hair: "#B8C4D0",
  teal: "#00B7C7",
  tealDeep: "#009AAA",
  orange: "#FF8A00",
  well: "#0C1824",
  wellLift: "#152433",
  wellText: "#E8EEF4",
  white: "#FFFFFF",
  boxBorder: "#C2CEDA",
  boxFill: "rgb(255 255 255 / 0.72)",
} as const;

function t(
  y: number,
  s: string,
  size: number,
  fill: string,
  cls: "sans" | "mono",
  w?: number,
  ls?: number,
  x = CX,
  anchor: "middle" | "start" | "end" = "middle",
): string {
  let a = `<text class="${cls}" x="${x}" y="${y}" text-anchor="${anchor}" font-size="${size}" fill="${fill}"`;
  if (w) a += ` font-weight="${w}"`;
  if (ls != null) a += ` letter-spacing="${ls}"`;
  return a + `>${s}</text>`;
}

function copyIcon(x: number, y: number, fill: string): string {
  return (
    `<g transform="translate(${x},${y})" opacity="0.7">` +
    `<rect x="0" y="2.5" width="8" height="8" rx="1" fill="none" stroke="${fill}" stroke-width="1.15"/>` +
    `<rect x="2.5" y="0" width="8" height="8" rx="1" fill="none" stroke="${fill}" stroke-width="1.15"/>` +
    `</g>`
  );
}

function calIcon(x: number, y: number, fill: string): string {
  return (
    `<g transform="translate(${x},${y})" fill="none" stroke="${fill}" stroke-width="1.15" opacity="0.75">` +
    `<rect x="0" y="2" width="11" height="10" rx="1.5"/>` +
    `<path d="M0 5.5h11M3 0v3M8 0v3"/>` +
    `</g>`
  );
}

/** Constellation + triangle-A mark (concept header). */
function brandMark(cx: number, cy: number): string {
  const dots = [
    [0, -14, 2.2, C40.orange],
    [-11, -6, 1.8, C40.teal],
    [12, -5, 2.0, "#5B8DEF"],
    [-8, 8, 1.6, C40.orange],
    [9, 9, 1.7, C40.teal],
    [-14, 1, 1.4, "#8B6BCF"],
    [14, 2, 1.5, C40.orange],
    [0, 12, 1.3, C40.teal],
    [-4, -11, 1.2, "#5B8DEF"],
    [5, -12, 1.1, C40.orange],
  ] as const;
  let g = `<g class="badge-brand-mark">`;
  for (const [dx, dy, r, fill] of dots) {
    g += `<circle cx="${cx + dx}" cy="${cy + dy}" r="${r}" fill="${fill}" opacity="0.9"/>`;
  }
  g +=
    `<path d="M${cx} ${cy - 7} L${cx + 7.5} ${cy + 6} L${cx - 7.5} ${cy + 6} Z" fill="none" stroke="${C40.ink}" stroke-width="1.6" stroke-linejoin="round"/>` +
    `<path d="M${cx} ${cy - 2} L${cx + 3.2} ${cy + 4} L${cx - 3.2} ${cy + 4} Z" fill="${C40.ink}"/>` +
    `</g>`;
  return g;
}

/** Cardano ADA-style diamond mark (network row — not Polygon). */
function cardanoMark(cx: number, cy: number, fill: string): string {
  return (
    `<g transform="translate(${cx},${cy})">` +
    `<path d="M0 -7 L6 0 L0 7 L-6 0 Z" fill="none" stroke="${fill}" stroke-width="1.4"/>` +
    `<path d="M0 -3.5 L3 0 L0 3.5 L-3 0 Z" fill="${fill}"/>` +
    `</g>`
  );
}

type SkillIconKind = "scaffold" | "warning" | "calc" | "clipboard";

const SKILL_ICONS: SkillIconKind[] = [
  "scaffold",
  "warning",
  "calc",
  "clipboard",
];

function skillIcon(
  kind: SkillIconKind,
  cx: number,
  cy: number,
  stroke: string,
): string {
  const g = `transform="translate(${cx},${cy})" fill="none" stroke="${stroke}" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round"`;
  switch (kind) {
    case "scaffold":
      return `<g ${g}><path d="M-8 8 V-6 M8 8 V-6 M-8 -2 H8 M-8 3 H8 M-5 -6 V-9 M5 -6 V-9"/><path d="M-8 8 H8"/></g>`;
    case "warning":
      return `<g ${g}><path d="M0 -9 L9 7 H-9 Z"/><path d="M0 -2 V3 M0 5.5 V6.2"/></g>`;
    case "calc":
      return `<g ${g}><rect x="-8" y="-9" width="16" height="18" rx="1.5"/><path d="M-5 -5 H5 M-5 -1 H5 M-5 3 H1 M-5 6 H5"/></g>`;
    case "clipboard":
      return `<g ${g}><rect x="-6" y="-6" width="12" height="15" rx="1.5"/><path d="M-3 -8 H3 V-5 H-3 Z M-3 0 H3 M-3 4 H3"/></g>`;
    default: {
      const _exhaustive: never = kind;
      return _exhaustive;
    }
  }
}

function hairline(y: number, half = 168): string {
  return `<line x1="${CX - half}" y1="${y}" x2="${CX + half}" y2="${y}" stroke="${C40.hair}" stroke-width="1" opacity="0.85"/>`;
}

function wrap2(text: string): string[] {
  const mid = Math.floor(text.length / 2);
  const l = text.lastIndexOf(" ", mid - 1);
  const r = text.indexOf(" ", mid);
  if (l < 0 && r < 0) return [text];
  const cut = r < 0 ? l : l < 0 ? r : mid - l <= r - mid ? l : r;
  return [text.slice(0, cut).trim(), text.slice(cut).trim()];
}

function layTitle(
  text: string,
  base: number,
  maxw: number,
  factor: number,
  minOne: number,
  floor = 15,
): [string[], number] {
  const n = Math.max(text.length, 1);
  const one = Math.min(base, Math.floor(maxw / (factor * n)));
  if (one >= minOne || !text.includes(" "))
    return [[text], Math.max(one, floor)];
  const lines = wrap2(text);
  if (lines.length === 1) return [lines, Math.max(one, floor)];
  const longest = Math.max(...lines.map((s) => s.length));
  return [
    lines,
    Math.max(Math.min(base, Math.floor(maxw / (factor * longest))), floor),
  ];
}

export interface FaceParams {
  courseTitle: string;
  moduleTitle: string;
  courseId: string;
  earnerName: string;
  did: string;
  issuedAt: string;
  network: string;
  skills: BadgeSkill[];
  verifyUrl: string;
  courseIdShort: string;
  sltHashShort: string;
  earnerSalt: string;
  photoHref: string;
  id: (base: string) => string;
  R_CORE: number;
}

/**
 * Concept-40 central plate: light face, scaffold photo, boxed DID/ISSUED,
 * line skill icons, dark QR verify well.
 */
export function buildConcept40Face(fp: FaceParams): string {
  const {
    courseTitle,
    moduleTitle,
    courseId,
    earnerName,
    did,
    issuedAt,
    network,
    skills,
    verifyUrl,
    courseIdShort,
    sltHashShort,
    earnerSalt,
    photoHref,
    id,
    R_CORE,
  } = fp;

  const p: string[] = [];
  const clip = `url(#${id("core-clip")})`;

  // Light plate base
  p.push(
    `<circle cx="${CX}" cy="${CY}" r="424" fill="none" stroke="${C40.hair}" stroke-width="1.25" opacity="0.7"/>`,
  );
  p.push(
    `<circle cx="${CX}" cy="${CY}" r="${R_CORE}" fill="${C40.plate}" stroke="${C40.boxBorder}" stroke-width="1.5"/>`,
  );

  // Scaffold photo (soft) + lattice + earner pattern under type
  p.push(`<g class="badge-bg-photo" clip-path="${clip}">`);
  p.push(
    `<image href="${photoHref}" xlink:href="${photoHref}" x="${CX - R_CORE}" y="${CY - R_CORE}" width="${R_CORE * 2}" height="${R_CORE * 2}" preserveAspectRatio="xMidYMid slice" opacity="0.42"/>`,
  );
  p.push(
    `<circle cx="${CX}" cy="${CY}" r="${R_CORE}" fill="${C40.plate}" opacity="0.55"/>`,
  );
  p.push(`</g>`);

  p.push(
    `<g class="badge-bg-lattice" clip-path="${clip}" opacity="0.55">` +
      buildHashLattice(courseId, C40.teal, C40.orange) +
      `</g>`,
  );
  p.push(
    `<g class="badge-earner-pattern" clip-path="${clip}" opacity="0.85">` +
      buildEarnerPattern(earnerSalt, C40.orange) +
      `</g>`,
  );

  const [clines, csz] = layTitle(courseTitle, 30, 520, 0.52, 22, 17);
  const [mlines, msz] = layTitle(moduleTitle, 20, 500, 0.52, 16, 14);
  const earnerSz = Math.max(
    16,
    Math.min(24, Math.floor(460 / (0.55 * Math.max(earnerName.length, 1)))),
  );

  // Brand
  p.push(`<g class="badge-brand">`);
  p.push(brandMark(CX - 58, 248));
  p.push(t(254, "ANDAMIO", 16, C40.ink, "sans", 700, 3.5, CX - 28, "start"));
  p.push(`</g>`);

  let y = 292;
  p.push(hairline(y - 14, 150));

  // Course
  p.push(`<g class="badge-course">`);
  p.push(t(y, "COURSE", 9, C40.teal, "mono", 600, 3.2));
  y += 8 + Math.floor(csz * 0.78);
  for (const ln of clines) {
    p.push(t(y, esc(ln), csz, C40.ink, "sans", 700));
    y += Math.floor(csz * 1.05);
  }
  p.push(`</g>`);

  y += 8;
  p.push(hairline(y));
  y += 16;

  // Module
  p.push(`<g class="badge-module">`);
  p.push(t(y, "MODULE", 9, C40.teal, "mono", 600, 3.2));
  y += 8 + Math.floor(msz * 0.75);
  for (const ln of mlines) {
    p.push(t(y, esc(ln), msz, C40.ink, "sans", 600));
    y += Math.floor(msz * 1.05);
  }
  p.push(`</g>`);

  y += 8;
  p.push(hairline(y));
  y += 16;

  // Earner
  p.push(`<g class="badge-earner">`);
  p.push(t(y, "EARNER", 9, C40.orange, "mono", 600, 3.2));
  y += 8 + Math.floor(earnerSz * 0.72);
  p.push(t(y, esc(earnerName), earnerSz, C40.ink, "sans", 700));
  p.push(`</g>`);

  y += 22;

  // DID / ISSUED boxed pods (concept layout)
  const boxW = 168;
  const boxH = 46;
  const boxGap = 14;
  const boxY = y;
  const leftX = CX - boxGap / 2 - boxW;
  const rightX = CX + boxGap / 2;

  const didFace = did.length > 22 ? `${did.slice(0, 20)}…` : did;
  const issuedFace =
    issuedAt.length > 22 ? `${issuedAt.slice(0, 19)}…` : issuedAt;

  p.push(`<g class="badge-did">`);
  p.push(
    `<rect x="${leftX}" y="${boxY}" width="${boxW}" height="${boxH}" rx="5" fill="${C40.boxFill}" stroke="${C40.boxBorder}" stroke-width="1.1"/>`,
  );
  p.push(
    t(boxY + 14, "DID", 7.5, C40.muted, "mono", 600, 2, leftX + 12, "start"),
  );
  p.push(
    t(
      boxY + 32,
      esc(didFace),
      10,
      C40.ink,
      "mono",
      500,
      0,
      leftX + 12,
      "start",
    ),
  );
  p.push(copyIcon(leftX + boxW - 22, boxY + 16, C40.muted));
  p.push(`</g>`);

  p.push(`<g class="badge-issued">`);
  p.push(
    `<rect x="${rightX}" y="${boxY}" width="${boxW}" height="${boxH}" rx="5" fill="${C40.boxFill}" stroke="${C40.boxBorder}" stroke-width="1.1"/>`,
  );
  p.push(
    t(
      boxY + 14,
      "ISSUED",
      7.5,
      C40.muted,
      "mono",
      600,
      2,
      rightX + 12,
      "start",
    ),
  );
  p.push(
    t(
      boxY + 32,
      esc(issuedFace),
      10,
      C40.ink,
      "mono",
      500,
      0,
      rightX + 12,
      "start",
    ),
  );
  p.push(calIcon(rightX + boxW - 24, boxY + 15, C40.muted));
  p.push(`</g>`);

  y = boxY + boxH + 18;
  p.push(hairline(y));
  y += 16;

  // Network
  p.push(`<g class="badge-network">`);
  p.push(t(y, "NETWORK", 8, C40.teal, "mono", 600, 2.8));
  y += 18;
  p.push(cardanoMark(CX - 48, y - 4, C40.tealDeep));
  const net = networkLabel(network).replace(/^Cardano · /, "Cardano · ");
  p.push(t(y, esc(net), 13, C40.ink, "sans", 600, undefined, CX - 32, "start"));
  p.push(`</g>`);

  y += 22;
  p.push(hairline(y));
  y += 14;

  // Skills + line icons
  p.push(`<g class="badge-skills">`);
  p.push(t(y, "SKILLS", 8, C40.orange, "mono", 600, 2.8));
  y += 22;
  const skillW = 92;
  const list = skills.slice(0, 4);
  const skillStart = CX - ((list.length - 1) * skillW) / 2;
  list.forEach((sk, i) => {
    const sx = skillStart + i * skillW;
    const kind = SKILL_ICONS[i % SKILL_ICONS.length]!;
    p.push(`<g class="badge-skill-${esc(sk.id)}">`);
    p.push(skillIcon(kind, sx, y, C40.ink));
    const lab = sk.label.length > 14 ? `${sk.label.slice(0, 13)}…` : sk.label;
    p.push(
      t(y + 26, esc(lab), 8, C40.muted, "sans", 500, undefined, sx, "middle"),
    );
    p.push(`</g>`);
  });
  p.push(`</g>`);

  // Dark verify well (bottom third of plate)
  const wellTop = 700;
  p.push(`<g clip-path="${clip}">`);
  p.push(
    `<path d="M ${CX - R_CORE + 8} ${wellTop} L ${CX + R_CORE - 8} ${wellTop} L ${CX + R_CORE - 4} ${CY + R_CORE} L ${CX - R_CORE + 4} ${CY + R_CORE} Z" fill="${C40.well}"/>`,
  );
  // Soft top edge of well
  p.push(
    `<line x1="${CX - 190}" y1="${wellTop}" x2="${CX + 190}" y2="${wellTop}" stroke="${C40.teal}" stroke-width="1" opacity="0.35"/>`,
  );
  p.push(`</g>`);

  const footY = wellTop + 28;
  const qrSize = 72;
  const qrX = CX - qrSize / 2;
  const qrY = wellTop + 14;

  // Side pods for short IDs
  p.push(`<g class="badge-course-id">`);
  p.push(
    `<path d="M${CX - 210} ${footY - 6} L${CX - 78} ${footY - 6} L${CX - 70} ${footY + 40} L${CX - 218} ${footY + 40} Z" fill="${C40.wellLift}" stroke="${C40.teal}" stroke-width="0.8" opacity="0.95"/>`,
  );
  p.push(
    t(
      footY + 10,
      "COURSE_ID",
      7.5,
      C40.teal,
      "mono",
      600,
      2,
      CX - 144,
      "middle",
    ),
  );
  p.push(
    t(
      footY + 28,
      esc(courseIdShort),
      11,
      C40.wellText,
      "mono",
      600,
      0,
      CX - 144,
      "middle",
    ),
  );
  p.push(`</g>`);

  p.push(`<g class="badge-slt-hash">`);
  p.push(
    `<path d="M${CX + 78} ${footY - 6} L${CX + 210} ${footY - 6} L${CX + 218} ${footY + 40} L${CX + 70} ${footY + 40} Z" fill="${C40.wellLift}" stroke="${C40.teal}" stroke-width="0.8" opacity="0.95"/>`,
  );
  p.push(
    t(
      footY + 10,
      "SLT_HASH",
      7.5,
      C40.teal,
      "mono",
      600,
      2,
      CX + 144,
      "middle",
    ),
  );
  p.push(
    t(
      footY + 28,
      esc(sltHashShort),
      11,
      C40.wellText,
      "mono",
      600,
      0,
      CX + 136,
      "middle",
    ),
  );
  p.push(copyIcon(CX + 188, footY + 18, C40.teal));
  p.push(`</g>`);

  p.push(`<g class="badge-qr">`);
  p.push(
    `<rect x="${qrX - 4}" y="${qrY - 4}" width="${qrSize + 8}" height="${qrSize + 8}" rx="3" fill="${C40.white}"/>`,
  );
  p.push(buildQrModulesSvg(verifyUrl, qrX, qrY, qrSize, C40.ink, C40.white));
  // VERIFY CREDENTIAL pill
  const pillW = 118;
  const pillX = CX - pillW / 2;
  const pillY = qrY + qrSize + 8;
  p.push(
    `<rect x="${pillX}" y="${pillY}" width="${pillW}" height="16" rx="3" fill="none" stroke="${C40.teal}" stroke-width="1"/>`,
  );
  p.push(t(pillY + 11.5, "VERIFY CREDENTIAL", 7.5, C40.teal, "mono", 700, 1.2));
  p.push(`</g>`);

  return p.join("");
}
