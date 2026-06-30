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
 *       • Spacing is ROLE-DRIVEN on a 4px grid (see `space`): one role → one
 *         step, never eyeballed. Canonical steps (px): 4·8·12·16·24·32·40·48·
 *         64·96. The off-rhythm strays (20·28·56·80) migrate to the nearest role.
 *       • The LEAD / hero section carries NO bottom rule — it flows into the
 *         first section's header rather than closing with a heavy divider.
 *       • Section-header rules (kicker · [LIVE] · rule) carry NO trailing meta
 *         text. A faint mono label floating on the rule reads as illegible
 *         decoration; the rule runs clean to the edge of the measure.
 *  4. Hero is full-bleed type with the credential WITHHELD; it is revealed
 *     by a sideways scroll into a museum-specimen frame.
 *  5. Wayfinding is an editorial margin rail (de-chromed) — not app furniture.
 */

/* ── Color ──────────────────────────────────────────────────────────────
 * Values resolve to CSS vars defined in globals.css (`--sys-*`), so the whole
 * design system flips with the global light/dark toggle (next-themes `.dark`).
 * The ink/paper neutrals derive their alpha tints from a single channel triplet
 * (`--sys-ink-rgb` / `--sys-paper-rgb`) so muted/faint/ghost/etc invert from one
 * source. Editing a hex here does nothing — change the var in globals.css. */
export const color = {
  paper: "var(--sys-paper)",
  ink: "var(--sys-ink)",
  /** Body / secondary text on paper. */
  inkMuted: "rgb(var(--sys-ink-rgb) / 0.60)",
  inkFaint: "rgb(var(--sys-ink-rgb) / 0.45)",
  inkGhost: "rgb(var(--sys-ink-rgb) / 0.30)",
  /** Big tabular watermark numerals. */
  inkWatermark: "rgb(var(--sys-ink-rgb) / 0.10)",

  /** Solid ink rule between full-bleed sections (softened in dark). */
  rule: "var(--sys-rule)",
  /** Inner cell / sub-divider. */
  cell: "rgb(var(--sys-ink-rgb) / 0.15)",
  /** Faint fixed grid field. */
  grid: "rgb(var(--sys-ink-rgb) / 0.05)",
  /** Hairline panel edge. */
  hairline: "rgb(var(--sys-ink-rgb) / 0.10)",

  /** Contrast pair for ink-emphasis surfaces (ink button, emphasized layer). */
  onInk: "var(--sys-on-ink)",

  /** Brand signal — sparing. Brand mark · primary CTA · live · verified. */
  orange: "var(--sys-orange)",
  /** Secondary — wayfinding + data only. */
  blue: "var(--sys-blue)",
  /** Tertiary tint — the specimen plate only. */
  coralTint: "var(--sys-coral-tint)",
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
  /** Sticky-nav clearance. Mirrored as the `--nav-clear` CSS var (globals.css),
   *  which drives both anchor scroll-padding-top and the full-viewport Section
   *  (`screen` prop) height. Keep this and the CSS var in sync. */
  navClearance: "5rem",
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

/* ── Spacing roles ──────────────────────────────────────────────────── */
/**
 * 4px base grid (Tailwind-native, so every step is already a 4px multiple). The
 * system's rule is not "use 4px" — it's "one ROLE → one STEP", so spacing is
 * intentional rather than eyeballed. Reach for a role in components; use a raw
 * step only for genuine one-offs. Governs LAYOUT spacing (padding, gaps, vertical
 * rhythm) — not 1–2px optical nudges. Avoid the off-rhythm strays the audit
 * found (20·28·56·80 → migrate to the nearest role).
 */
export const space = {
  /** Canonical step scale (px) → Tailwind unit in comments. */
  scale: {
    xs: 4, //  1
    sm: 8, //  2
    md: 12, //  3
    base: 16, //  4
    lg: 24, //  6
    xl: 32, //  8
    "2xl": 40, // 10
    "3xl": 48, // 12
    "4xl": 64, // 16
    "5xl": 96, // 24
  },
  /** Named roles — literal Tailwind class strings (scanner-visible). */
  sectionY: layout.padY, //   py-16 sm:py-24 · 64→96 · a Section's content block
  headerTop: "pt-16 sm:pt-24", // 64→96 · lead / page-header block top padding
  cardPad: "p-6", //          24 · card / panel interior
  gapTight: "gap-2", //        8 · label↔value, icon↔text
  gap: "gap-4", //            16 · default flex / grid gap
  gapRow: "gap-y-10", //      40 · between grid rows
  rhythmTight: "mt-3", //     12 · closely-related elements
  rhythm: "mt-6", //          24 · heading → body (the default step-down)
  rhythmGroup: "mt-12", //    48 · block → block within a section
} as const;
/** The mono kicker className (color applied inline). Literal for Tailwind. */
export const kickerCls = "text-[11px] uppercase tracking-[0.18em]";

/** Section index used by the editorial rail + section ids. */
export const SECTIONS = [
  { id: "top", num: "00", label: "Own Your Badges" },
  { id: "problem", num: "01", label: "The problem" },
  { id: "how-it-works", num: "02", label: "How it works" },
  { id: "products", num: "03", label: "Which one?" },
  { id: "issuer", num: "04", label: "Andamio Issuer" },
  { id: "andamio-api", num: "05", label: "Andamio API" },
  { id: "ecosystem", num: "06", label: "Ecosystem" },
  { id: "closing", num: "07", label: "Upgrade" },
] as const;

export type SectionId = (typeof SECTIONS)[number]["id"];
