/**
 * Measured geometry of the concept-40 Proof Ring artwork, in its native
 * 1024 x 1024 space. Source: scripts/badge-src/{measure,profile,sample_hue,
 * text_boxes}.py run against the PNG embedded in
 * andamio_badge_hybrid_editable.svg. Re-run those scripts before editing.
 */

export const BADGE_SIZE = 1024;
export const CENTER = 512;

/** Ring radii (px from center). */
export const RING = {
  /** Cream face edge; the clean plate owns everything inside this. */
  face: 414,
  b: {
    inner: 428.5,
    outer: 466.5,
    band: { from: 427, to: 468 },
    /** Large square dashes and phrase baseline. */
    track: 447.5,
    dash: 12,
    dashPitchDeg: 2.1,
    /** Small orange dashes across the bottom (degrees, SVG angle). */
    bottomDashes: { from: 82.3, to: 97.7, pitchDeg: 2.2, w: 13, h: 5 },
  },
  a: {
    band: { from: 468, to: 502 },
    innerLine: 479.5,
    ticks: 489,
    tickPitchDeg: 2,
    rim: 498,
  },
} as const;

/**
 * Where the artwork's five ring phrases sat (SVG degrees: 0 = +x, clockwise).
 * They become the rotating showcase slots.
 */
export const PHRASE_SLOTS = [
  { angle: 270, flip: false, arc: 30 },
  { angle: 234, flip: false, arc: 30 },
  { angle: 306, flip: false, arc: 30 },
  { angle: 120, flip: true, arc: 34 },
  { angle: 60, flip: true, arc: 34 },
] as const;
/** Ring-phrase type: JetBrains Mono 600, advance ≈ 0.6em + 0.16em tracking. */
export const PHRASE_FONT = { size: 16, minSize: 12, advanceEm: 0.76 } as const;

/** Degree spans on ring B that carry the large square dashes. */
export const DASH_SPANS: ReadonlyArray<readonly [number, number]> = [
  [143, 214],
  [-34, 37],
];

/**
 * Orange weight per 5 degrees (index = deg / 5), 0 = cyan, 1 = orange,
 * sampled from the brightest pixels of each band.
 */
export const HUE = {
  rim: [1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
  ticks: [1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0.73, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
  dashes: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1],
  edgeOuter: [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  edgeInner: [1, 1, 1, 1, 1, 1, 1, 1, 0.46, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
} as const;

export type HueBand = keyof typeof HUE;

/** Smoothed orange weight at any angle (3-sample window, wraps around). */
export function hueAt(band: HueBand, deg: number): number {
  const table = HUE[band];
  const n = table.length;
  const pos = (((deg % 360) + 360) % 360) / 5;
  const i = Math.floor(pos);
  const t = pos - i;
  const at = (k: number) => table[((k % n) + n) % n] ?? 0;
  const smooth = (k: number) => (at(k - 1) + 2 * at(k) + at(k + 1)) / 4;
  return smooth(i) * (1 - t) + smooth(i + 1) * t;
}

/** Fixed (non-rotating) markers. */
export const MARKERS = {
  top: { points: "476,13 547,13 511.5,52", bar: { x: 495, y: 5, w: 33, h: 4 } },
  bottom: { points: "491,1010 527,1010 527,996 509,982 491,996" },
  left: { x: 10, y: 498, w: 18, h: 29 },
  right: { x: 996, y: 498, w: 18, h: 29 },
} as const;

/**
 * Face text anchors: x is the horizontal center (or left edge when `align`
 * is "start"), y is the vertical center of the cap height. Sizes are px in
 * 1024 space; cap heights measured from the artwork.
 */
export const FACE = {
  wordmark: { x: 473, y: 230.5, size: 45, maxW: 250 },
  courseLabel: { x: 512, y: 304 },
  course: { x: 512, y: 342, size: 29.5, maxW: 440 },
  moduleLabel: { x: 512, y: 386 },
  module: { x: 510, y: 417, size: 18.5, maxW: 440 },
  earnerLabel: { x: 512, y: 453.5 },
  earner: { x: 512, y: 489, size: 32, maxW: 420 },
  didBox: { x0: 282, x1: 504, y0: 522, y1: 582 },
  issuedBox: { x0: 520, x1: 742, y0: 522, y1: 582 },
  boxLabelY: 537,
  boxValueY: 559,
  networkLabel: { x: 512, y: 601.5 },
  network: { x: 501, y: 625.5, size: 17 },
  skillsLabel: { x: 516, y: 662 },
  skills: { iconY: 689, textY: 721.5, columns: [361, 458, 564, 672], span: [316, 710] },
  courseIdPanel: { x: 355, labelY: 778.5, valueY: 804.5, width: 150 },
  hashPanel: { x: 669, labelY: 778.5, valueY: 804, width: 150 },
  qr: { x: 459, y: 766, size: 106 },
  verifyTab: { x: 512, y: 898.5 },
} as const;

/** Average advance per glyph (em) of the face fonts, from calibrate.mjs. */
export const GLYPH_EM = {
  wordmark: 0.757,
  course: 0.49,
  module: 0.5,
  earner: 0.54,
  value: 0.5,
} as const;

/** Ink colors sampled from the artwork. */
export const INK = {
  navy: "#102d44",
  body: "#152537",
  value: "#1e2b39",
  wordmark: "#1d3b52",
  teal: "#3f9fab",
  orange: "#d3581b",
  panelLabel: "#44d3dd",
  panelValue: "#ecf0f2",
  verify: "#5ee2e9",
} as const;

/** Artwork ring colors (brightest samples) and band tints. */
export const RING_COLORS = {
  cyan: "#3fd9e8",
  cyanHot: "#c4fbfb",
  orange: "#f7a54a",
  orangeHot: "#fcd48a",
  bandCool: "#142a39",
  bandWarm: "#2a1a20",
  deep: "#0b121b",
} as const;

/**
 * Ring-B arcs tied to the copyable fields (SVG degrees), highlighted while
 * the field is hovered or focused. They stay fixed in badge space.
 */
export const FIELD_ARCS = {
  did: { from: 160, to: 196 },
  courseId: { from: 124, to: 152 },
  hash: { from: 28, to: 56 },
} as const;
export type FieldArc = keyof typeof FIELD_ARCS;

/** Polar to cartesian in badge space. */
export function polar(r: number, deg: number): { x: number; y: number } {
  const a = (deg * Math.PI) / 180;
  return { x: CENTER + r * Math.cos(a), y: CENTER + r * Math.sin(a) };
}

/** SVG arc path from `from` to `to` degrees (clockwise), or reversed. */
export function arcPath(r: number, from: number, to: number, reverse = false): string {
  const a = polar(r, reverse ? to : from);
  const b = polar(r, reverse ? from : to);
  const large = Math.abs(to - from) > 180 ? 1 : 0;
  const sweep = reverse ? 0 : 1;
  return `M${a.x.toFixed(2)},${a.y.toFixed(2)} A${r},${r} 0 ${large} ${sweep} ${b.x.toFixed(2)},${b.y.toFixed(2)}`;
}
