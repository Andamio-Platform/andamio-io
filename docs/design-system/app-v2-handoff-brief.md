# Andamio Design Brief — Marketing ↔ App v2 Sync

**Source:** `landing-page-and-blog` · "Warm Index · Editorial rail" design system
(`src/ui/system/`)
**Audience:** Andamio App v2 (`andamio-app-v2`) design/eng
**Goal:** Get the two surfaces visibly *of the same family* without pretending a
marketing site and a web app are the same thing.
**Date:** 2026-06-27

---

## 0. How to read this

This system was extracted from one chosen landing iteration into tokens +
components. It is **solid as a brand+token foundation**, and deliberately
**marketing-shaped** at the surface. So this brief splits everything into two
buckets:

- **ADOPT (brand DNA)** — must be *identical* on both surfaces. Color, type,
  logo, accent discipline, motion feel. This is what makes them look like one
  company.
- **ADAPT (surface patterns)** — marketing-only expressions of that DNA. The
  editorial rail, full-bleed hairlines, the withheld-credential hero. An app
  should honor the *principles* but not copy the *layout*.

If you only do one thing: ship the **tokens** (§3) into app v2 unchanged and
enforce the **accent discipline** (§2). Everything else is refinement.

---

## 1. Honest solidity assessment

Where the system is strong, and where it will bite you — from actually pushing
~6 rounds of changes through it.

**Strong**
- **Single source of truth for values.** Every color, type size, and spacing
  unit lives in `tokens.ts`; components read from it, nothing hard-codes a hex.
  Changing a token changes the whole surface.
- **Componentized primitives.** `Page`, `Section`, `SectionHead`, `Button`,
  `Display`, `Kicker`, `EditorialRail`, `Footer`, `Brand`. When a change lands
  on a real component it propagates for free — e.g. removing the "meta" slot
  from `SectionHead` fixed every instance in one edit.
- **Rules are written down**, not just implied — see the header block of
  `tokens.ts` ("THE RULES THIS SYSTEM ENCODES") and the live style guide at
  `/explore/system`.

**Fragile — fix before scaling**
- **Page headers are not componentized.** The lead-header block
  (`pb-12 pt-16 sm:pt-24` → Kicker + Display + subtitle) is copy-pasted across
  ~13 files. A structural change ("hero carries no bottom rule") had to be
  hand-applied to each. **Lesson for app v2: build a `PageHeader` primitive on
  day one.** Same for any "hero row" — the landing hero hand-rolls a
  kicker·rule that `SectionHead` already encodes, so it missed the systemic fix.
- **Magic-number coupling not enforced by types.** The rail reserve appears in
  three places that *must* agree: `layout.railReserve` (150), the Tailwind
  literal `xl:pr-[150px]`, and `RailFade` width. Tailwind can't read a JS token,
  so the literal is duplicated. Today they're kept in sync by comments. In app
  v2, drive spacing from a real Tailwind theme extension so this can't drift.
- **It's expressed in this repo's stack** (Tailwind + inline style objects from
  `tokens.ts`). The *values* port anywhere; the *mechanism* (inline styles) is a
  marketing-site convenience, not what you want in a component-dense app.

**Scope honesty**
- This is a **marketing/editorial** language: light, ink-on-paper, full-bleed
  rules, big withheld-credential hero, a de-chromed margin rail. App v2 is a
  dense application (dashboards, forms, tables, tx flows). The editorial rail
  and museum-specimen hero **do not** map onto app chrome. What ports is the
  brand layer, not the page architecture.

**Verdict:** Trust the tokens and the accent policy completely. Treat the
components as *reference contracts* to re-express in the app's stack, not as a
library to import as-is. Extract a `PageHeader` and a shared token package and
this becomes genuinely robust across both surfaces.

---

## 2. Brand DNA — ADOPT verbatim

### 2.1 Color (the whole palette)

Neutrals do the work; three accents, each with a *job*.

| Token | Value | Role |
|---|---|---|
| `paper` | `#FFFFFF` | Background |
| `ink` | `#0A0A0A` | Primary text, solid rules |
| `inkMuted` | `rgba(10,10,10,0.60)` | Body / secondary text |
| `inkFaint` | `rgba(10,10,10,0.45)` | Tertiary labels |
| `inkGhost` | `rgba(10,10,10,0.30)` | Faint meta |
| `inkWatermark` | `rgba(10,10,10,0.10)` | Big tabular numerals |
| `cell` | `rgba(10,10,10,0.15)` | Inner dividers / card edges |
| `grid` | `rgba(10,10,10,0.05)` | The fixed 12-col grid field |
| `orange` | `#FF6B35` | **Brand signal — sparing (see policy)** |
| `blue` | `#2F6BFF` | Wayfinding + data/links only |
| `coralTint` | `rgba(255,107,74,0.055)` | One specimen-plate tint |

### 2.2 Accent discipline — the single most important rule

This is what keeps the brand from looking generic. **Enforce it in review.**

- **Orange `#FF6B35`** — brand mark, the *single* primary CTA on a view, the
  live-pulse dot, the "VERIFIED" stamp. **Never** on headings, body, kickers,
  numerals, or as a fill for decoration. In an app: primary action button,
  active/verified status, brand mark. That's it.
- **Blue `#2F6BFF`** — wayfinding and data: links, the rail, data readouts.
  Never a heading or body color. In an app this is your natural "interactive
  text / nav-active / link" color.
- **Coral tint** — a background wash for credential artifacts only. Never type.
- Everything else is **ink on paper** at varying opacity.

> App-v2 translation: most of an app's UI is neutral ink-on-paper. Orange marks
> *the one thing you want the user to do* and *success/verified state*. If a
> screen has three orange things, two of them are wrong.

### 2.3 Type

- **Display / UI:** Inter, weight **600**, tight tracking **−0.045em**, leading
  **0.92** for large display (the "12 cut"). Stack:
  `'Inter', system-ui, -apple-system, sans-serif`.
- **Mono:** JetBrains Mono — *only* for small labels, section numbers, data
  readouts, kickers. Stack:
  `'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace`.
- **Never a serif.**
- **Kicker:** 11px, uppercase, tracking 0.18em, mono, muted — **never orange.**
- **Fluid display scale (clamp):**
  | Step | clamp |
  |---|---|
  | `hero` | `clamp(2.9rem, 8.5vw, 7rem)` |
  | `xl` | `clamp(2.6rem, 7vw, 5.5rem)` |
  | `lg` | `clamp(2rem, 4.5vw, 3.5rem)` |
  | `md` | `clamp(1.9rem, 4vw, 2.9rem)` |
  | `sm` | `clamp(1.6rem, 3.4vw, 2.6rem)` |

  An app needs a *denser* body scale than this marketing display scale — add
  14/16px body steps, but keep Inter 600 + the mono-label convention so headings
  and labels read identically across surfaces.

### 2.4 Logo

- Use the official mark **+ logotype** lockup: `/logo-with-typography.svg`
  (mark + "ANDAMIO"). Light-bg variant reads on paper; a `-dark` variant exists
  for dark surfaces.
- Sizing: ~22px tall in nav, ~30px in footer. Links to home.
- The mark color includes the exact brand orange `#FF6B35` — same value as the
  token, so logo and UI accents match.

### 2.5 Motion signature

The brand's one signature gesture: **a credential is withheld, then revealed by
a sideways scroll into a museum-specimen frame.** Values:

- `useScroll` offset `["start end", "center center"]`
- badge slides in from the right `["60%", "0%"]`, opacity ramps `0→1` over
  scroll progress `0→0.55`, frame widens `["44%", "100%"]`
- SSR-safe (deterministic at progress 0)

App-v2 translation: you won't reuse the museum frame, but the *feel* — content
that resolves/verifies with a deliberate, physical reveal rather than a fade —
is the brand's motion personality. Reuse it for credential mint/verify moments.

---

## 3. Spacing, grid, structure — ADOPT the values, ADAPT the expression

| Token | Value |
|---|---|
| Content measure (`maxWidth`) | **1320px** |
| Container padding (`padX`) | `px-6 sm:px-10` |
| Section rhythm (`padY`) | `py-16 sm:py-24` |
| Grid | fixed **12 columns**, faint (`grid` color) |
| Rail reserve (`railReserve`) | 150px (marketing rail only) |

- **12-column grid + 1320 measure**: adopt. Gives both surfaces the same
  proportional skeleton.
- **Full-bleed ink hairline rules between sections**: a *marketing* device.
  An app uses `cell`-weight dividers inside dense layouts, not full-bleed ink
  rules. Adapt.

---

## 4. Surface patterns — ADAPT, don't copy

These are marketing-only. Honor the principle, not the markup.

- **Editorial margin rail** (`EditorialRail` + `RailFade`) — a de-chromed
  progress annotation in the right margin, blue active marker, scroll-spy. This
  is *reading wayfinding*, not app navigation. App v2 keeps its own nav; borrow
  only the blue-active + mono-label treatment.
- **Full-bleed hairlines feathering behind the rail** — a solved marketing
  detail (rules run to the content edge; a gutter-width mask dissolves them
  behind the rail; the nav border alone is true full-bleed). Not relevant to app
  chrome.
- **Withheld-credential hero / museum specimen** — marketing storytelling.
  Reuse the *motion feel* (§2.5) at credential moments, not the layout.
- **Lead/hero section carries no bottom rule; header rules carry no trailing
  meta** — these are good general hygiene rules; keep them anywhere you use a
  kicker·rule header.

---

## 5. Component contracts (reference, not a library to import)

The kit (`src/ui/system/kit.tsx`) is the canonical expression. App v2 should
build equivalents that honor these contracts:

| Primitive | Contract to preserve |
|---|---|
| `Brand` | mark+logotype lockup, links home, fixed heights |
| `TopNav` | full-bleed bottom border, sticky, mobile menu, single orange CTA |
| `Button` | variants `primary` (orange) · `ink` · `outline` · `chip` · `disabled`; exactly one `primary` per view |
| `Display` | Inter 600, the clamp scale, tight tracking |
| `Kicker` | mono 11px uppercase, muted, never orange |
| `SectionHead` | kicker · optional `[LIVE]` pulse · rule — **no trailing meta** |
| `Footer` | mark + tagline + mono meta + link columns |
| `DataList` / `StackLayers` / `NumberWatermark` | mono data-readout idioms |

**Missing primitive both surfaces need:** `PageHeader` (kicker + display +
subtitle). Build it once; it's the duplication that bit this repo.

---

## 6. Recommended path to sync

1. **Extract a shared token package** — `@andamio/tokens` (color, type, motion
   as plain JS/JSON). Both repos import it; neither re-types hexes. This is the
   highest-leverage step.
2. **Express tokens as a Tailwind theme extension** in app v2 (not inline
   styles), so spacing/scale are utility-driven and the rail-reserve class of
   bug can't happen.
3. **Adopt §2 wholesale** (color, type, logo, accent policy, motion feel) and
   **enforce the accent policy in code review** — it's the make-or-break.
4. **Build `PageHeader` + a body type scale** in app v2 before broad use.
5. **Leave §4 behind** — app v2 keeps its own navigation and density; it borrows
   the brand layer, not the editorial architecture.

---

## 7. Pointers

- Tokens: `src/ui/system/tokens.ts` (rules in the file header)
- Components: `src/ui/system/kit.tsx`
- Living style guide (rendered): `/explore/system`
- Reference composition: `src/ui/system/AndamioLanding.tsx` → `/`
- Decision history: `docs/brainstorms/2026-06-27-design-inspiration.md`

---

## 8. App v2 current-state reality check

Sections 1–7 are written from the marketing side. This section reports what App
v2 (`andamio-app-v2`) **actually** does today, so the sync work is grounded in
both surfaces rather than one. Source files cited inline.

**Stack:** shadcn/ui (new-york style) on Radix, Tailwind via `@theme` inlined in
`src/styles/globals.css` (no separate `tailwind.config`). Colors are
`oklch()` CSS custom properties, not hex. A thin `src/components/andamio/*`
layer wraps the shadcn primitives with productivity props (loading, icons) — it
is **not** a brand re-skin. Honest read: ~35–40% deliberately branded, the rest
default scaffolding.

### Already aligned — leave alone
- **Logo.** App v2 ships the exact same `/logos/logo-with-typography.svg` lockup
  (+ dark / stacked variants), wired through `src/config/branding.ts`. Full
  agreement with §2.4.
- **Font family.** Inter for UI + a mono for labels (`src/app/layout.tsx`). The
  *choice* matches §2.3.
- **Intent shape.** orange = primary, blue = secondary, white bg, near-black
  ink — the brand's story is roughly already the one App v2 tells.
- **Container width.** `MAX_CONTENT_WIDTH: 1280` (`src/config/ui-constants.ts`)
  vs marketing's 1320 — close enough to call agreement.

### Drift — the real work

**1. The accent values resemble the brand values but are not them.**
- Primary = `oklch(0.669 0.199 38.581)` — a slightly darker, redder orange than
  `#FF6B35` (≈ `oklch(0.704 0.191 41)`). This **breaks §2.4's promise** that
  logo orange === UI accent orange. Off by a hair today — visible side-by-side.
- Secondary "blue" = `oklch(0.387 0.134 250.505)` — a **dark desaturated navy**,
  nowhere near the bright `#2F6BFF` wayfinding blue (≈ `oklch(0.55 0.22 264)`).
  Biggest single color miss.

**2. The component taxonomy fights the accent discipline (§2.2) — deepest
issue.** App v2 uses shadcn's stock button variants
(`default · secondary · destructive · outline · ghost · link`), and
**`secondary` renders blue as a button *fill*.** The brand policy says blue is
wayfinding/links/data *only, never a fill*. shadcn's generic taxonomy therefore
structurally encodes a rule the brand forbids. This is not a value you tweak —
it's the genuine integration decision: map shadcn's variants onto the brand's
intent hierarchy (one orange primary, blue = links/nav-active only). §5's
"reference contracts" are the right target shape; the work is the remapping.

**3. Smaller value drifts.**
- Mono is **Geist Mono**; brief specifies **JetBrains Mono**.
- Headings are **Inter 700 / −0.025em** (`globals.css`); brief specifies
  **600 / −0.045em**. App headings read heavier and looser than marketing.

**4. State palette the brief never addressed.** App v2 already carries a full
semantic set — `destructive · success · warning · info` (`globals.css`). An app
needs these; the brand system never had to define them. They must **coexist**
with the accent policy (orange stays reserved for primary action + verified),
not get steamrolled by it. This is a gap in §2, not in App v2.

### Recommended first moves (supersedes §6's ordering for the App-v2 side)
The `@andamio/tokens` package (§6.1) is the right destination but premature
while both surfaces are still moving. Grounded order:

1. **Reconcile the two accent values first.** Pick one canonical orange (the
   logo's `#FF6B35`) and one canonical link blue; make App v2's `--primary` and
   link color match exactly. Near one-line change, highest-visibility payoff.
2. **Remap shadcn variants to the brand intent model.** Kill blue-as-`secondary`
   -fill; `default` becomes the sole orange primary; blue routes to
   `link`/nav-active only. Enforce in review (§2.2). This is the real decision.
3. **Then** extract the shared token package, once both surfaces have settled.

*(Reality check added 2026-06-28, grounded in an App v2 source audit.)*
