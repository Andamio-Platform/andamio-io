/**
 * One self-contained SVG of a Proof Ring badge: the plate, both rings, the
 * binary bars, the face, and the verify QR. Ring A spins clockwise and ring B
 * counter-clockwise. Images are inlined so the file still opens after it is
 * pinned to IPFS. The JSON-LD block is an OpenBadges 3.0 preview, not a
 * signed credential.
 */

import {
  arcPath,
  BADGE_SIZE,
  CENTER,
  FACE,
  GLYPH_EM,
  hueAt,
  INK,
  MARKERS,
  polar,
  RING,
  RING_COLORS,
  type HueBand,
} from "./geometry";
import {
  middleTruncate,
  type ProofCredential,
  type ProofSkill,
  type ProofTheme,
  type SkillIcon,
} from "./credential";

const PLATE_SRC = "/images/landing/proof-badge-plate.webp";
const PLATE_OPEN_SRC = "/images/landing/proof-badge-plate-open.webp";

type Rgb = [number, number, number];

function hexToRgb(hex: string): Rgb {
  const h = hex.replace("#", "");
  const full =
    h.length === 3
      ? h
          .split("")
          .map((c) => c + c)
          .join("")
      : h;
  const n = Number.parseInt(full, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function rgbToHex([r, g, b]: Rgb): string {
  const c = (n: number) =>
    Math.max(0, Math.min(255, Math.round(n)))
      .toString(16)
      .padStart(2, "0");
  return `#${c(r)}${c(g)}${c(b)}`;
}

/** `weight` is how much of `toward` is mixed in. */
function mixHex(base: string, toward: string, weight: number): string {
  const a = hexToRgb(base);
  const b = hexToRgb(toward);
  const w = Math.max(0, Math.min(1, weight));
  return rgbToHex([
    a[0] + (b[0] - a[0]) * w,
    a[1] + (b[1] - a[1]) * w,
    a[2] + (b[2] - a[2]) * w,
  ]);
}

function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function fitSize(text: string, base: number, maxW: number, em: number): number {
  const natural = text.length * em * base;
  return natural > maxW
    ? Math.max(base * 0.62, maxW / (text.length * em))
    : base;
}

function formatIssued(iso: string): string {
  const match = /^(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2})/.exec(iso);
  return match ? `${match[1]} ${match[2]}` : iso;
}

function hexBytes(hex: string): number[] {
  const bytes: number[] = [];
  for (let i = 0; i + 1 < hex.length; i += 2) {
    const pair = hex.slice(i, i + 2);
    if (!/^[0-9a-fA-F]{2}$/.test(pair)) continue;
    bytes.push(Number.parseInt(pair, 16));
  }
  return bytes;
}

type Palette = {
  cyan: string;
  cyanHot: string;
  orange: string;
  orangeHot: string;
  bandCool: string;
  bandWarm: string;
};

function paletteOf(theme: ProofTheme | undefined): Palette {
  return {
    cyan: theme?.cyan ?? RING_COLORS.cyan,
    cyanHot: theme?.cyanHot ?? RING_COLORS.cyanHot,
    orange: theme?.orange ?? RING_COLORS.orange,
    orangeHot: theme?.orangeHot ?? RING_COLORS.orangeHot,
    bandCool: theme?.bandCool ?? RING_COLORS.bandCool,
    bandWarm: theme?.bandWarm ?? RING_COLORS.bandWarm,
  };
}

function huePaint(palette: Palette, hot: boolean) {
  return (weight: number) =>
    mixHex(
      hot ? palette.cyanHot : palette.cyan,
      hot ? palette.orangeHot : palette.orange,
      weight,
    );
}

function bandPaint(palette: Palette) {
  return (weight: number) => mixHex(palette.bandCool, palette.bandWarm, weight);
}

/** Stroke-width annulus, one arc per 5 degrees, matching the page's hue table. */
function annulus(
  r0: number,
  r1: number,
  band: HueBand,
  paint: (weight: number) => string,
  opacity = 1,
): string {
  const radius = (r0 + r1) / 2;
  const width = r1 - r0;
  const parts: string[] = [];
  for (let deg = 0; deg < 360; deg += 5) {
    const color = paint(hueAt(band, deg + 2.5));
    const d = arcPath(radius, deg - 0.2, deg + 5.2);
    parts.push(
      `<path d="${d}" fill="none" stroke="${color}" stroke-width="${width.toFixed(2)}" stroke-linecap="butt" opacity="${opacity}"/>`,
    );
  }
  return parts.join("");
}

function bars(
  hex: string,
  radius: number,
  band: HueBand,
  palette: Palette,
): string {
  const bytes = hexBytes(hex);
  if (bytes.length === 0) return "";
  const paint = huePaint(palette, false);
  const paintHot = huePaint(palette, true);
  const group = 360 / bytes.length;
  const lead = (group - 8) / 2;
  const lines: string[] = [];
  bytes.forEach((value, index) => {
    const start = -90 + index * group;
    for (let bit = 0; bit < 8; bit++) {
      const on = ((value >> (7 - bit)) & 1) === 1;
      const head = bit === 0;
      const deg = start + lead + (bit + 0.5);
      const len = on ? (head ? 16 : 12) : head ? 7 : 4.5;
      const width = on ? (head ? 2.6 : 2) : 1.5;
      const inner = polar(radius - len / 2, deg);
      const outer = polar(radius + len / 2, deg);
      const colored = mixHex(
        head && on
          ? paintHot(1 - hueAt(band, deg))
          : paint(1 - hueAt(band, deg)),
        "#ffffff",
        on ? 0.14 : 0.22,
      );
      const edge = on ? 1 : 0.72;
      lines.push(
        `<line x1="${inner.x.toFixed(2)}" y1="${inner.y.toFixed(2)}" x2="${outer.x.toFixed(2)}" y2="${outer.y.toFixed(2)}" stroke="#f7f8f8" stroke-width="${(width + 0.7).toFixed(2)}" stroke-linecap="butt"/>`,
        `<line x1="${inner.x.toFixed(2)}" y1="${inner.y.toFixed(2)}" x2="${outer.x.toFixed(2)}" y2="${outer.y.toFixed(2)}" stroke="${colored}" stroke-width="${width.toFixed(2)}" stroke-linecap="butt" opacity="${edge}"/>`,
      );
    }
  });
  return lines.join("");
}

function text(
  value: string,
  x: number,
  y: number,
  size: number,
  fill: string,
  extra = "",
): string {
  return `<text x="${x}" y="${y}" text-anchor="middle" dominant-baseline="central" fill="${fill}" font-size="${size}" ${extra}>${esc(value)}</text>`;
}

const SKILL_PATHS: Record<SkillIcon, string> = {
  scaffold:
    '<path d="M8 31V4M26 31V4M8 11h18M8 20h18M8 29h18M8 11l18 9M26 11L8 20M8 20l18 9M26 20L8 29M5 31h24"/>',
  warning: '<path d="M17 4L31 29H3z"/><path d="M17 13v8M17 24.5v.5"/>',
  calculator:
    '<rect x="7" y="3" width="20" height="28" rx="2"/><rect x="10.5" y="6.5" width="13" height="5.5"/><path d="M11 16h2M16 16h2M21 16h2M11 20.5h2M16 20.5h2M21 20.5h2M11 25h2M16 25h2M21 25h2"/>',
  checklist:
    '<rect x="7" y="5" width="20" height="26" rx="2"/><path d="M13 3.5h8v4h-8zM11 13l1.5 1.5L15 12M18 13.5h6M11 19l1.5 1.5L15 18M18 19.5h6M11 25l1.5 1.5L15 24M18 25.5h6"/>',
  badge:
    '<circle cx="17" cy="13" r="8"/><path d="M12 19.5L9.5 31l7.5-4 7.5 4L22 19.5M14 13l2 2 4-4"/>',
};

/** Same 32px stroke icons the face uses, centered on the skill column. */
function skillIcon(skill: ProofSkill, x: number, y: number): string {
  const size = 32;
  const scale = size / 34;
  return `<g transform="translate(${(x - size / 2).toFixed(2)} ${(y - size / 2).toFixed(2)}) scale(${scale.toFixed(4)})" fill="none" stroke="#1e3a53" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${SKILL_PATHS[skill.icon]}</g>`;
}

/**
 * `x` and `y` are the top-left of the plate's printed QR. The white tile
 * covers that static code, and the real QR is drawn inside it.
 */
function qrMarkup(qr: string, x: number, y: number, size: number): string {
  const pad = 5;
  const inner = size - pad * 2;
  return `<g>
    <rect x="${x}" y="${y}" width="${size}" height="${size}" rx="7" fill="#ffffff"/>
    <g transform="translate(${x + pad} ${y + pad}) scale(${(inner / 256).toFixed(6)})">${qr}</g>
  </g>`;
}

function faceMarkup(c: ProofCredential): string {
  const f = FACE;
  const earner = c.holder.displayName ?? c.holder.alias;
  const showAlias = Boolean(c.holder.displayName && c.holder.alias);
  const courseSize = fitSize(
    c.course,
    f.course.size,
    f.course.maxW,
    GLYPH_EM.course,
  );
  const moduleSize = fitSize(
    c.module,
    f.module.size,
    f.module.maxW,
    GLYPH_EM.module,
  );
  const earnerSize = fitSize(
    earner,
    f.earner.size,
    f.earner.maxW,
    GLYPH_EM.earner,
  );
  const label = `font-weight="600" letter-spacing="1.5" font-family="Inter, system-ui, sans-serif"`;
  const sans = `font-family="Inter, system-ui, sans-serif"`;
  const mono = `font-family="ui-monospace, monospace"`;
  const skills = c.skills.slice(0, 4);
  const skillX = (i: number) =>
    skills.length === 4
      ? (f.skills.columns[i] ?? 512)
      : f.skills.span[0] +
        ((i + 0.5) * (f.skills.span[1] - f.skills.span[0])) / skills.length;
  const didX = (f.didBox.x0 + f.didBox.x1) / 2;
  const issuedX = (f.issuedBox.x0 + f.issuedBox.x1) / 2;
  const parts = [
    text("COURSE", f.courseLabel.x, f.courseLabel.y, 12.5, INK.teal, label),
    text(
      c.course,
      f.course.x,
      f.course.y,
      courseSize,
      INK.navy,
      `font-weight="600" ${sans}`,
    ),
    text("MODULE", f.moduleLabel.x, f.moduleLabel.y, 12.5, INK.teal, label),
    text(c.module, f.module.x, f.module.y, moduleSize, INK.body, sans),
    text("EARNER", f.earnerLabel.x, f.earnerLabel.y, 12.5, INK.orange, label),
    text(
      earner,
      f.earner.x,
      f.earner.y - (showAlias ? 3 : 0),
      earnerSize,
      INK.navy,
      `font-weight="700" ${sans}`,
    ),
  ];
  if (showAlias) {
    parts.push(text(c.holder.alias, f.earner.x, 511, 11, "#4d6173", mono));
  }
  parts.push(
    text("ISSUER DID", didX, f.boxLabelY, 12.5, INK.teal, label),
    text(c.issuerDid, didX, f.boxValueY, 13, INK.value, mono),
    text("ISSUED", issuedX, f.boxLabelY, 12.5, INK.teal, label),
    text(formatIssued(c.issuedAt), issuedX, f.boxValueY, 14.5, INK.value, sans),
    text("NETWORK", f.networkLabel.x, f.networkLabel.y, 12.5, INK.teal, label),
    text(c.network, f.network.x, f.network.y, f.network.size, INK.body, sans),
  );
  if (skills.length > 0) {
    parts.push(
      text("SKILLS", f.skillsLabel.x, f.skillsLabel.y, 12.5, INK.orange, label),
    );
    skills.forEach((skill, i) => {
      const x = skillX(i);
      parts.push(
        skillIcon(skill, x, f.skills.iconY),
        text(skill.label, x, f.skills.textY, 11.5, "#2a3441", sans),
      );
    });
  }
  parts.push(
    text(
      "COURSE ID",
      f.courseIdPanel.x,
      f.courseIdPanel.labelY,
      14.5,
      INK.panelLabel,
      `font-weight="600" letter-spacing="1.2" ${mono}`,
    ),
    text(
      middleTruncate(c.courseId),
      f.courseIdPanel.x,
      f.courseIdPanel.valueY,
      13.5,
      INK.panelValue,
      mono,
    ),
    text(
      "SLT HASH",
      f.hashPanel.x,
      f.hashPanel.labelY,
      14.5,
      INK.panelLabel,
      `font-weight="600" letter-spacing="1.2" ${mono}`,
    ),
    text(
      middleTruncate(c.sltHash),
      f.hashPanel.x,
      f.hashPanel.valueY,
      13.5,
      INK.panelValue,
      mono,
    ),
    `<a href="${esc(c.claimUrl ?? c.verifyUrl)}">`,
    `<rect x="${f.verifyTab.x - 78}" y="${f.verifyTab.y - 14}" width="156" height="28" rx="5" fill="#081c24" fill-opacity="0.78" stroke="#5ee2e9" stroke-opacity="0.75"/>`,
    text(
      "VERIFY CREDENTIAL",
      f.verifyTab.x,
      f.verifyTab.y,
      11,
      INK.verify,
      `font-weight="600" letter-spacing="0.7" ${sans}`,
    ),
    `</a>`,
  );
  return parts.join("");
}

function metadata(c: ProofCredential): string {
  const earner = c.holder.displayName ?? c.holder.alias;
  const doc = {
    "@context": [
      "https://www.w3.org/2018/credentials/v1",
      "https://purl.imsglobal.org/spec/ob/v3p0/context-3.0.3.json",
    ],
    type: ["VerifiableCredential", "OpenBadgeCredential"],
    name: c.course,
    validFrom: c.issuedAt,
    issuer: {
      id: c.issuerDid,
      type: "Profile",
      name: c.brand,
    },
    credentialSubject: {
      type: "AchievementSubject",
      name: earner,
      achievement: {
        type: "Achievement",
        name: c.module,
        description: c.course,
      },
    },
    "andamio:preview": true,
    "andamio:module": c.module,
    "andamio:holder": {
      alias: c.holder.alias,
      displayName: c.holder.displayName ?? earner,
    },
    "andamio:issuerDid": c.issuerDid,
    "andamio:issuedAt": c.issuedAt,
    "andamio:network": c.network,
    "andamio:skills": c.skills.map((skill) => skill.label),
    "andamio:courseId": c.courseId,
    "andamio:sltHash": c.sltHash,
    "andamio:theme": c.theme ?? {
      cyan: RING_COLORS.cyan,
      cyanHot: RING_COLORS.cyanHot,
      orange: RING_COLORS.orange,
      orangeHot: RING_COLORS.orangeHot,
      bandCool: RING_COLORS.bandCool,
      bandWarm: RING_COLORS.bandWarm,
    },
    "andamio:verifyUrl": c.verifyUrl,
  };
  return `<metadata><![CDATA[${JSON.stringify(doc)}]]></metadata>`;
}

function spin(dur: string, clockwise: boolean, body: string): string {
  const to = clockwise ? "360" : "-360";
  return `<g><animateTransform attributeName="transform" type="rotate" from="0 ${CENTER} ${CENTER}" to="${to} ${CENTER} ${CENTER}" dur="${dur}" repeatCount="indefinite"/>${body}</g>`;
}

export type BadgeSvgAssets = {
  plate: string;
  mark?: string;
  /** Inner markup of the QR, in a 256 viewBox. */
  qr: string;
};

/** Assemble the SVG. Callers inline the plate, logo, and QR first. */
export function renderBadgeSvg(
  credential: ProofCredential,
  assets: BadgeSvgAssets,
): string {
  const palette = paletteOf(credential.theme);
  const hue = huePaint(palette, false);
  const hueHot = huePaint(palette, true);
  const band = bandPaint(palette);
  const b = RING.b;
  const a = RING.a;
  const q = FACE.qr;
  const ringB = [
    annulus(b.band.from, b.band.to, "dashes", band),
    annulus(b.outer - 1.5, b.outer + 1.5, "edgeOuter", hue, 0.55),
    annulus(b.inner - 0.8, b.inner + 0.8, "edgeInner", hue),
    annulus(b.outer - 1, b.outer + 1, "edgeOuter", hue),
    bars(credential.sltHash, b.track, "dashes", palette),
  ].join("");
  const ringA = [
    annulus(a.band.from, a.band.to, "ticks", band),
    annulus(a.innerLine - 0.6, a.innerLine + 0.6, "ticks", hue, 0.55),
    `<g filter="url(#pb-glow)" opacity="0.75">${annulus(a.rim - 1, a.rim + 2, "rim", hue)}</g>`,
    annulus(a.rim - 0.9, a.rim + 0.9, "rim", hueHot),
    bars(credential.courseId, a.ticks, "ticks", palette),
  ].join("");
  const mark = assets.mark
    ? `<image href="${assets.mark}" x="${FACE.mark.x - FACE.mark.w / 2}" y="${FACE.mark.y - FACE.mark.h / 2}" width="${FACE.mark.w}" height="${FACE.mark.h}" preserveAspectRatio="xMidYMid meet"/>`
    : `<text x="${FACE.wordmark.x}" y="${FACE.wordmark.y}" text-anchor="start" dominant-baseline="central" fill="${INK.wordmark}" font-size="${fitSize(credential.brand, FACE.wordmark.size, FACE.wordmark.maxW, GLYPH_EM.wordmark)}" font-weight="600" font-family="Inter, system-ui, sans-serif">${esc(credential.brand.toUpperCase())}</text>`;
  const markers = [
    `<polygon points="${MARKERS.top.points}" fill="${palette.orange}"/>`,
    `<polygon points="${MARKERS.bottom.points}" fill="${palette.orange}"/>`,
    `<rect x="${MARKERS.left.x}" y="${MARKERS.left.y}" width="${MARKERS.left.w}" height="${MARKERS.left.h}" rx="3" fill="${palette.cyanHot}"/>`,
    `<rect x="${MARKERS.right.x}" y="${MARKERS.right.y}" width="${MARKERS.right.w}" height="${MARKERS.right.h}" rx="3" fill="${palette.orange}"/>`,
  ].join("");
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 ${BADGE_SIZE} ${BADGE_SIZE}" width="${BADGE_SIZE}" height="${BADGE_SIZE}" role="img" aria-label="${esc(`${credential.module}, ${credential.course}`)}">
${metadata(credential)}
<defs>
  <filter id="pb-glow" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="4"/></filter>
  <clipPath id="pb-disc"><circle cx="${CENTER}" cy="${CENTER}" r="${CENTER}"/></clipPath>
</defs>
<g clip-path="url(#pb-disc)">
  <circle cx="${CENTER}" cy="${CENTER}" r="${CENTER}" fill="${RING_COLORS.deep}"/>
  <image href="${assets.plate}" x="0" y="0" width="${BADGE_SIZE}" height="${BADGE_SIZE}" preserveAspectRatio="xMidYMid slice"/>
  ${spin("112s", false, ringB)}
  ${spin("84s", true, ringA)}
  ${markers}
  ${mark}
  ${faceMarkup(credential)}
  ${qrMarkup(assets.qr, q.x, q.y, q.size)}
</g>
</svg>`;
}

async function toDataUrl(src: string): Promise<string> {
  if (src.startsWith("data:")) return src;
  const response = await fetch(src);
  if (!response.ok) throw new Error(`Could not read ${src}`);
  const blob = await response.blob();
  return await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () =>
      reject(reader.error ?? new Error("Could not read image"));
    reader.readAsDataURL(blob);
  });
}

function qrInner(markup: string): string {
  return markup.replace(/^<\?xml[^>]*>/, "").replace(/<\/?svg[^>]*>/g, "");
}

/** Fetch the plate, logo, and QR, then build the downloadable file. */
export async function buildBadgeSvg(
  credential: ProofCredential,
): Promise<string> {
  const plateSrc = credential.mark ? PLATE_OPEN_SRC : PLATE_SRC;
  const [plate, mark, QRCode] = await Promise.all([
    toDataUrl(plateSrc),
    credential.mark ? toDataUrl(credential.mark) : Promise.resolve(undefined),
    import("@pjaudiomv/qrcode-svg").then((mod) => mod.default),
  ]);
  const qr = new QRCode({
    content: credential.verifyUrl || "https://andamio.io",
    padding: 0,
    width: 256,
    height: 256,
    ecl: "L",
    join: true,
    container: "none",
    color: "#0b121b",
    background: "#ffffff",
    pretty: false,
    xmlDeclaration: false,
  }).svg();
  return renderBadgeSvg(credential, { plate, mark, qr: qrInner(qr) });
}

export function badgeSvgFilename(credential: ProofCredential): string {
  return `${credential.courseId}.${credential.sltHash}.svg`;
}
