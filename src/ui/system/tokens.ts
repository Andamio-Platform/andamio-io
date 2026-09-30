/**
 * Andamio Landing — Design Tokens (Proof instrument, dark only)
 * =================================================================
 * The single source of truth for the site's design language. Every component
 * in ./kit.tsx and ./instrument/ reads from here; nothing hard-codes a hex or
 * a size. Decision: docs/landing-page-excellence/decisions/
 * 2026-09-30-proof-instrument-dark.md.
 *
 * THE RULES THIS SYSTEM ENCODES:
 *
 *  1. Type is Inter semibold (600) for display: tight tracking (~-0.045em),
 *     leading ~0.92. JetBrains Mono ONLY for labels, section numbers and data
 *     readouts. Never a serif.
 *  2. Color comes from the Proof Ring badge: deep navy page, raised navy
 *     surfaces, cream text.
 *       • CYAN explains: links, data, readouts, focus.
 *       • ORANGE acts: the one primary action per view, live states, the
 *         VERIFIED stamp. Never kickers, numerals, headings or body.
 *  3. Every mark encodes something real. Tick rules count, arcs trace a
 *     lifecycle, corner ticks frame evidence. No gradient text, no glass
 *     cards, no three-icon grids.
 *  4. Structure: a 1320px measure, role-driven spacing on a 4px grid (see
 *     `space`), hairline rules between sections.
 *  5. Motion: only the hero badge moves continuously. Everything else is
 *     user-driven or a one-time reveal, gated by `useMotionGate`.
 */

/* ── Color ──────────────────────────────────────────────────────────────
 * Values resolve to CSS vars defined in globals.css (`--sys-*`). Neutrals
 * derive their alpha tints from one channel triplet (`--sys-ink-rgb`).
 * Editing a hex here does nothing — change the var in globals.css. */
export const color = {
  paper: "var(--sys-paper)",
  /** Raised navy: cards, panels, readouts. */
  surface: "var(--sys-surface)",
  ink: "var(--sys-ink)",
  /** Body / secondary text on paper. */
  inkMuted: "rgb(var(--sys-ink-rgb) / 0.66)",
  inkFaint: "rgb(var(--sys-ink-rgb) / 0.50)",
  inkGhost: "rgb(var(--sys-ink-rgb) / 0.32)",
  /** Big tabular watermark numerals. */
  inkWatermark: "rgb(var(--sys-ink-rgb) / 0.08)",

  /** Rule between full-bleed sections. */
  rule: "var(--sys-rule)",
  /** Inner cell / sub-divider. */
  cell: "rgb(var(--sys-ink-rgb) / 0.14)",
  /** Faint grid field. */
  grid: "rgb(var(--sys-ink-rgb) / 0.05)",
  /** Hairline panel edge. */
  hairline: "rgb(var(--sys-ink-rgb) / 0.10)",

  /** Text on orange or cream fills. */
  onInk: "var(--sys-on-ink)",

  /** Acts — one primary CTA per view, live states, VERIFIED. */
  orange: "var(--sys-orange)",
  /** Explains — links, data, readouts, focus. */
  cyan: "var(--sys-cyan)",
  /** Warm tint for the one specimen plate. */
  coralTint: "var(--sys-coral-tint)",
  /** Opaque artifact-plate fill. */
  plate: "var(--sys-surface)",
  /** Soft lift for floating cards. */
  cardShadow: "0 1px 2px rgb(0 0 0 / 0.3), 0 8px 24px rgb(0 0 0 / 0.35)",
  /** Control elevation — buttons / chips. */
  controlShadow: "var(--sys-shadow-control)",
  /** Specimen plate elevation. */
  specimenShadow: "var(--sys-shadow-specimen)",
} as const;

/** Where each accent is allowed. */
export const accentPolicy = {
  orange:
    "The single primary CTA per view, live states, the VERIFIED stamp, the brand mark. Nothing else.",
  cyan: "Links, data readouts, focus rings, lifecycle marks. Never a heading or body color.",
  coral: "A background tint for the one specimen plate. Never type.",
} as const;
/* ── Typography ─────────────────────────────────────────────────────── */
export const font = {
  sans: "var(--font-inter), system-ui, -apple-system, sans-serif",
  mono: "var(--font-jetbrains), ui-monospace, SFMono-Regular, Menlo, monospace",
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
  /** Sticky-nav clearance. Mirrored as the `--nav-clear` CSS var (globals.css),
   *  which drives both anchor scroll-padding-top and the full-viewport Section
   *  (`screen` prop) height. Keep this and the CSS var in sync. */
  navClearance: "5rem",
} as const;

/* ── Motion — Warm Index dense cinematic grammar ───────────────────── */
export const motion = {
  /** useScroll offset for the specimen reveal section. */
  revealOffset: ["start end", "center center"] as [string, string],
  /** Badge slides in from the right; deterministic at progress 0 (SSR-safe). */
  badgeX: ["60%", "0%"] as [string, string],
  badgeOpacity: {
    input: [0, 0.55] as [number, number],
    output: [0, 1] as [number, number],
  },
  frameWidth: ["44%", "100%"] as [string, string],

  /** Shared easing — editorial ease-out. */
  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
  duration: {
    enter: 0.65,
    enterFast: 0.45,
    exit: 0.25,
    press: 0.15,
  },
  stagger: {
    children: 0.08,
    delayChildren: 0.12,
  },
  spring: {
    press: { type: "spring" as const, stiffness: 420, damping: 28 },
    layout: { type: "spring" as const, stiffness: 400, damping: 30 },
    soft: { type: "spring" as const, stiffness: 120, damping: 22 },
  },
  reveal: {
    y: 28,
    ySoft: 14,
    viewport: { once: true, margin: "-10% 0px" as const },
  },
  press: {
    hoverScale: 1.02,
    tapScale: 0.98,
  },
  /** Scroll-linked theater specimen (parallax / depth). */
  theater: {
    scrollOffset: ["start end", "end start"] as [string, string],
    y: [24, -24] as [number, number],
    rotate: [-1.2, 1.2] as [number, number],
    scale: [0.97, 1.02] as [number, number],
  },
  /** Continuous “alive” idle on the credential (Motion layer). */
  alive: {
    rotate: [-1.5, 1.5, -1.5] as [number, number, number],
    scale: [1, 1.012, 1] as [number, number, number],
    duration: 10,
  },
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
  gapButtons: "gap-3", //     12 · between buttons in an action row — rows of
  //                               buttons ALWAYS get x spacing, never touch
  gap: "gap-4", //            16 · default flex / grid gap
  gapRow: "gap-y-10", //      40 · between grid rows
  rhythmTight: "mt-3", //     12 · closely-related elements
  rhythm: "mt-6", //          24 · heading → body (the default step-down)
  rhythmGroup: "mt-12", //    48 · block → block within a section
} as const;
/* `kickerCls` (mono-uppercase eyebrow) removed 2026-07-02 — the eyebrow is the
 * Kicker component in kit.tsx (sentence case + orange square). All-caps
 * letterspaced eyebrows are retired; they collided with pok.tech's treatment. */

/** Section index used by the editorial rail + section ids. */
// Landing rail index — matches the story-first DOM order. The how-it-works demo
// + the deep Issuer treatment moved to /issuer (2026-07-01); the landing keeps
// an Issuer teaser that funnels there.
export const SECTIONS = [
  { id: "top", num: "00", label: "Overview" },
  { id: "problem", num: "01", label: "The problem" },
  { id: "pattern", num: "02", label: "The pattern" },
  { id: "issuer", num: "03", label: "Andamio Issuer" },
  { id: "products", num: "04", label: "Build on it" },
  { id: "ecosystem", num: "05", label: "Ecosystem" },
  { id: "closing", num: "06", label: "Get started" },
] as const;

export type SectionId = (typeof SECTIONS)[number]["id"];
