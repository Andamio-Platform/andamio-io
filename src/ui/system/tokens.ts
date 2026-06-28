/**
 * Andamio Landing — Design Tokens
 * =================================================================
 * The single source of truth for the design language extracted from
 * iteration 22 ("Warm Index · Editorial rail"). Every component in
 * ./kit.tsx reads from here; nothing hard-codes a hex or a size.
 *
 * THE RULES THIS SYSTEM ENCODES (the decisions we converged on):
 *
 *  1. Type is Inter semibold (600) for display — the refined "12 cut":
 *     tight tracking (~-0.045em), leading ~0.92. JetBrains Mono ONLY for
 *     small labels, section numbers, and data readouts. Never a serif.
 *  2. Color discipline — a 3-color theme on ink/paper neutrals:
 *       • ORANGE is the Andamio brand signal, used SPARINGLY. Allowed on:
 *         the brand mark, the single primary CTA, the live pulse, and the
 *         VERIFIED stamp. NEVER on kickers, numerals, headings, or body.
 *       • BLUE is secondary — wayfinding + data only (the rail, links).
 *       • CORAL is a tint, used in exactly one zone (the specimen plate).
 *  3. Structure — a faint fixed 12-column grid, a 1320px measure, generous
 *     vertical rhythm with full-width ink hairline rules between sections.
 *       • The LEAD / hero section carries NO bottom rule — it flows into the
 *         first section's header rather than closing with a heavy divider.
 *       • Section-header rules (kicker · [LIVE] · rule) carry NO trailing meta
 *         text. A faint mono label floating on the rule reads as illegible
 *         decoration; the rule runs clean to the edge of the measure.
 *  4. Hero is full-bleed type with the credential WITHHELD; it is revealed
 *     by a sideways scroll into a museum-specimen frame.
 *  5. Wayfinding is an editorial margin rail (de-chromed) — not app furniture.
 */

/* ── Color ──────────────────────────────────────────────────────────── */
export const color = {
  paper: "#FFFFFF",
  ink: "#0A0A0A",
  /** Body / secondary text on paper. */
  inkMuted: "rgba(10,10,10,0.60)",
  inkFaint: "rgba(10,10,10,0.45)",
  inkGhost: "rgba(10,10,10,0.30)",
  /** Big tabular watermark numerals. */
  inkWatermark: "rgba(10,10,10,0.10)",

  /** Solid ink rule between full-bleed sections. */
  rule: "#0A0A0A",
  /** Inner cell / sub-divider. */
  cell: "rgba(10,10,10,0.15)",
  /** Faint fixed grid field. */
  grid: "rgba(10,10,10,0.05)",
  /** Hairline panel edge. */
  hairline: "rgba(10,10,10,0.10)",

  /** Brand signal — sparing. Brand mark · primary CTA · live · verified. */
  orange: "#FF6B35",
  /** Secondary — wayfinding + data only. */
  blue: "#2F6BFF",
  /** Tertiary tint — the specimen plate only. */
  coralTint: "rgba(255,107,74,0.055)",
} as const;

/** Where each accent is allowed — enforced by convention + reviewed in /explore/system. */
export const accentPolicy = {
  orange: "Brand mark, the single primary CTA, the live pulse dot, the VERIFIED stamp. Nothing else.",
  blue: "Wayfinding (editorial rail) and data readouts/links. Never a heading or body color.",
  coral: "A background tint for the one specimen plate. Never type.",
} as const;

/* ── Typography ─────────────────────────────────────────────────────── */
export const font = {
  sans: "'Inter', system-ui, -apple-system, sans-serif",
  mono: "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace",
} as const;

/** Display weight + metrics — the "12 cut". */
export const display = {
  weight: 600,
  tracking: "-0.045em",
  leading: "0.92",
} as const;

/** Fluid type scale (clamp). Use via the Display/Heading helpers in kit. */
export const typeScale = {
  hero: "clamp(2.9rem, 8.5vw, 7rem)",
  xl: "clamp(2.6rem, 7vw, 5.5rem)", // section titles (Issuer, API, closing)
  lg: "clamp(2rem, 4.5vw, 3.5rem)", // problem heading
  md: "clamp(1.9rem, 4vw, 2.9rem)", // demo title
  sm: "clamp(1.6rem, 3.4vw, 2.6rem)", // ecosystem lead
} as const;

/** Mono label ("kicker") — uppercase, muted, NEVER orange. */
export const kicker = {
  size: "11px",
  tracking: "0.18em",
} as const;

/* ── Layout & rhythm ───────────────────────────────────────────────── */
export const layout = {
  /** Content measure. */
  maxWidth: 1320,
  /** Horizontal container padding. */
  padX: "px-6 sm:px-10",
  /** Vertical section rhythm. */
  padY: "py-16 sm:py-24",
  /** Grid columns. */
  columns: 12,
  /** Reserved space for the editorial rail on xl+. */
  railReserve: 150,
} as const;

/* ── Motion — the signature reveal ─────────────────────────────────── */
export const motion = {
  /** useScroll offset for the specimen reveal section. */
  revealOffset: ["start end", "center center"] as [string, string],
  /** Badge slides in from the right; deterministic at progress 0 (SSR-safe). */
  badgeX: ["60%", "0%"] as [string, string],
  badgeOpacity: { input: [0, 0.55] as [number, number], output: [0, 1] as [number, number] },
  frameWidth: ["44%", "100%"] as [string, string],
} as const;

/* ── Prebuilt class fragments (Tailwind) ───────────────────────────── */
/** Centered container at the system measure. */
export const containerCls = `mx-auto ${layout.padX}`;
export const sectionPadCls = layout.padY;
/** The mono kicker className (color applied inline). Literal for Tailwind. */
export const kickerCls = "text-[11px] uppercase tracking-[0.18em]";

/** Section index used by the editorial rail + section ids. */
export const SECTIONS = [
  { id: "top", num: "00", label: "Hero" },
  { id: "how-it-works", num: "01", label: "How it works" },
  { id: "problem", num: "02", label: "The problem" },
  { id: "issuer", num: "03", label: "Issuer" },
  { id: "ecosystem", num: "04", label: "Ecosystem" },
  { id: "andamio-api", num: "05", label: "API" },
  { id: "closing", num: "06", label: "Upgrade" },
] as const;

export type SectionId = (typeof SECTIONS)[number]["id"];
