// Proof Rings palettes — a faithful TS port of the credential-badges generator
// `colors.py`. Pure data + color transforms; NO React / Next / landing imports
// (this whole `badge/` folder is extraction-ready — see the plan's R9).
//
// Token model (must match gen.py):
//   FRAME/RING : deep/ink/raised (field) · prim/prim_lt · sec/sec_lt · hair · extlabel
//   INTERIOR   : core1/core2 (plate) · itext · imuted · iline · slt_label · ev_label · ctitle · mtitle
// Interior tokens default to the dark field (fillDefaults); the light/white/invert
// transforms override only the interior (and, for invert, the band) tokens.

export interface Palette {
  slug?: string;
  name: string;
  // FRAME / RING (always present)
  deep: string;
  ink: string;
  raised: string;
  prim: string;
  prim_lt: string;
  sec: string;
  sec_lt: string;
  bone: string;
  slate: string;
  hair: string;
  // INTERIOR (optional; filled by fillDefaults or a transform)
  core1?: string;
  core2?: string;
  itext?: string;
  imuted?: string;
  iline?: string;
  extlabel?: string;
  slt_label?: string;
  ev_label?: string;
  ctitle?: string;
  mtitle?: string;
}

// Order of every token written into the SVG `style` var block + baked theme.
export const ALL_TOKENS = [
  "deep", "ink", "raised", "prim", "prim_lt", "sec", "sec_lt", "bone", "slate", "hair",
  "core1", "core2", "itext", "imuted", "iline", "extlabel", "slt_label", "ev_label", "ctitle", "mtitle",
] as const;

// deep=outer field · ink=mid · raised=inner · prim=outer ring · sec=inner ring
export const PALETTES: Palette[] = [
  { slug: "01-andamio-navy", name: "Andamio Navy", deep: "#0C1325", ink: "#121A2D", raised: "#1B2540",
    prim: "#EE6C3A", prim_lt: "#F6A07A", sec: "#5BB8D4", sec_lt: "#9ED8E8", bone: "#EAE6DD", slate: "#6E7A98", hair: "#2C3858" },
  { slug: "02-cardano-blue", name: "Cardano Blue", deep: "#091022", ink: "#0F1A33", raised: "#172742",
    prim: "#3B82F0", prim_lt: "#86B4F7", sec: "#33D6C4", sec_lt: "#8FE9DF", bone: "#E9EDF5", slate: "#6E7E9C", hair: "#26324E" },
  { slug: "03-indigo-violet", name: "Indigo Violet", deep: "#0E0A1F", ink: "#15112B", raised: "#201A3C",
    prim: "#8B6CF0", prim_lt: "#B9A6F7", sec: "#E86CA8", sec_lt: "#F2A6CC", bone: "#ECE7F2", slate: "#7A7196", hair: "#2E2A4A" },
  { slug: "04-pine-gold", name: "Pine Gold", deep: "#08140F", ink: "#0E1E18", raised: "#163026",
    prim: "#E9B23C", prim_lt: "#F3CE80", sec: "#46D6A0", sec_lt: "#92E8C6", bone: "#E7EDE6", slate: "#6E8478", hair: "#244236" },
  { slug: "05-wine-crimson", name: "Wine Crimson", deep: "#170A12", ink: "#22101B", raised: "#341A29",
    prim: "#F0524D", prim_lt: "#F59390", sec: "#F2A0B5", sec_lt: "#F7C4D2", bone: "#F2E7EA", slate: "#9A7E86", hair: "#3A2230" },
  { slug: "06-mono-ember", name: "Mono Ember", deep: "#0C1020", ink: "#121826", raised: "#1B2334",
    prim: "#EE6C3A", prim_lt: "#F6A07A", sec: "#F0A24A", sec_lt: "#F7C98A", bone: "#EAE6DD", slate: "#7A8092", hair: "#2C3344" },
  { slug: "07-teal-ice", name: "Teal Ice", deep: "#08151C", ink: "#0E2029", raised: "#163039",
    prim: "#5FD0E8", prim_lt: "#A6E6F2", sec: "#7FA8C8", sec_lt: "#B4CBE0", bone: "#E6EEF0", slate: "#6E8490", hair: "#23404A" },
  { slug: "08-plum-sunset", name: "Plum Sunset", deep: "#14091C", ink: "#1E1029", raised: "#2E1A3C",
    prim: "#F58A3C", prim_lt: "#F8B580", sec: "#C56CE0", sec_lt: "#DEA6EE", bone: "#F0E8F2", slate: "#86749A", hair: "#3A2A4A" },
  { slug: "09-onyx-emerald", name: "Onyx Emerald", deep: "#0A0D0B", ink: "#101310", raised: "#1A201A",
    prim: "#E7C24A", prim_lt: "#F1D98A", sec: "#3FB985", sec_lt: "#86D6B4", bone: "#ECEAE0", slate: "#7E8478", hair: "#2A332A" },
  { slug: "10-graphite-electric", name: "Graphite Electric", deep: "#0C0E12", ink: "#14171C", raised: "#1E232A",
    prim: "#FF6B4A", prim_lt: "#FF9E86", sec: "#34E0D0", sec_lt: "#86EFE4", bone: "#ECEEF0", slate: "#7A828E", hair: "#2A2F38" },
];

/** Blend hexc toward another hex color by fraction t (0..1). Port of colors._mix. */
export function mix(hexc: string, toward: string, t: number): string {
  const a = hexc.replace("#", "");
  const b = toward.replace("#", "");
  const r = [0, 2, 4].map((i) => parseInt(a.slice(i, i + 2), 16));
  const s = [0, 2, 4].map((i) => parseInt(b.slice(i, i + 2), 16));
  const m = r.map((v, i) => Math.round(v + (s[i]! - v) * t));
  return "#" + m.map((v) => v.toString(16).padStart(2, "0").toUpperCase()).join("");
}

/**
 * CANONICAL interior: near-white plate with a faint same-hue tinge gradient,
 * dark text. The saturated field + rings (the border band) are kept EXACTLY.
 * Port of colors.light_interior — the deployed look.
 */
export function lightInterior(pal: Palette): Palette {
  return {
    ...pal,
    name: pal.name + " (light interior)",
    core1: "#FFFFFF",
    core2: mix("#FFFFFF", pal.prim, 0.08),
    itext: "#15203A",
    imuted: "#5C6680",
    iline: "#E5E9F0",
    ctitle: mix(pal.prim, "#0C0F17", 0.64),
    mtitle: mix(pal.sec, "#0C0F17", 0.64),
    slt_label: pal.sec,
    ev_label: pal.sec,
  };
}

/**
 * Dark ring-band kept EXACTLY; only the INTERIOR plate goes pure white with
 * dark text. Port of colors.white_interior.
 */
export function whiteInterior(pal: Palette): Palette {
  return {
    ...pal,
    name: pal.name + " (white interior)",
    core1: "#FFFFFF",
    core2: "#FFFFFF",
    itext: "#16213A",
    imuted: "#5C6680",
    iline: "#E2E6EC",
    slt_label: pal.prim,
    ev_label: pal.sec,
  };
}

/**
 * INVERTED mirror of lightInterior: white ring-band, colored/dark interior.
 * Color moves from the border to the center. Rings stay prim/sec (they pop on
 * white); interior text flips light. Port of the orchestration-vault experiment
 * `invert-experiment/invert.py` (invert_colors) — the light/dark toggle's dark side.
 */
export function invertColors(pal: Palette): Palette {
  return {
    ...pal,
    name: pal.name + " (inverted)",
    // band -> near-white with a faint cool vignette toward the rim
    raised: "#FFFFFF",
    ink: "#FBFCFE",
    deep: "#EDF1F7",
    // dim "0" ticks + hairlines must read SUBTLE on white -> light gray
    hair: "#CCD4E0",
    // interior plate -> the palette's own dark field gradient (color lives here now)
    core1: pal.raised,
    core2: pal.deep,
    // text on the now-dark interior -> light
    itext: pal.bone,
    imuted: pal.slate,
    iline: mix(pal.raised, pal.bone, 0.35),
    // titles = light tints of their ring hue (course<->prim, module<->sec)
    ctitle: pal.prim_lt,
    mtitle: pal.sec_lt,
    slt_label: pal.sec_lt,
    ev_label: pal.sec_lt,
  };
}

export type InteriorStyle = "light" | "inverted";

/** Apply the interior style the builder's toggle selects. */
export function withInterior(pal: Palette, style: InteriorStyle): Palette {
  return style === "inverted" ? invertColors(pal) : lightInterior(pal);
}
