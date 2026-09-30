---
title: "refactor: De-slop the V2 landing page"
type: refactor
status: active
date: 2026-04-16
---

# De-slop the V2 landing page

## Overview

The current V2 landing page (`src/ui/landing/V2Landing/`) reads as generic AI-Tailwind output: every section opens with the same font-mono eyebrow label, every headline uses the same two-tone color gimmick, every card has the same floating-hover trick, the palette is unmodified shadcn defaults, and Framer Motion is sprinkled everywhere as decoration. It also contains a broken Tailwind opacity token (`bg-primary/3`) that renders transparent and a "comparison" table with only one column.

This refactor removes those tells without altering copy, routes, or information architecture. The goal is to give each section its own visual voice, restore editorial rhythm, and fix the technically-broken classes — while keeping the implementation footprint contained to the `V2Landing` directory, `tailwind.config.ts`, and `src/styles/globals.css`.

The user will review visually; no screenshot capture or demo reel is required.

## Problem Frame

James described the landing page as "total AI slop" and asked for 10 tell-tale signs to be fixed. The diagnosis is well-grounded: the page was built quickly by an LLM and carries the entire cluster of AI-Tailwind patterns — identical eyebrow labels, split-color headlines, outline-stroke icons, `py-20 sm:py-32` on every section, `grid-cols-1 md:grid-cols-3` as the reflex layout, `hover:-translate-y-1 hover:shadow-xl` as the reflex hover, and raw shadcn tokens as the reflex palette.

Because the copy is acceptable and the IA is already decided, this is purely a visual/structural refactor. No new sections, no copy rewrites (except where copy was literally broken, e.g., the comparison "table").

## Requirements Trace

- **R1.** Each section has a distinct section-header treatment — not the same `font-mono text-xs uppercase tracking-[0.2em] text-primary` eyebrow pattern on six sections in a row.
- **R2.** The two-tone split-color headline gimmick (`<span class="text-muted-foreground">…</span>` / `<span class="text-primary">…</span>`) appears at most once on the page, or is replaced entirely.
- **R3.** The color palette has at least one identifiable brand gesture beyond unmodified shadcn defaults (e.g., a branded neutral ramp, a considered accent pairing, or a dedicated surface treatment for dark sections). The existing `--primary` and `--secondary` values may stay, but usage patterns should change.
- **R4.** Framer Motion is reduced to purposeful use only — hero entrance, FAQ disclosure, and at most one editorial reveal. Not every section fades-and-rises.
- **R5.** The three pillar icons (`ClipboardIcon`, `ChartIcon`, `DiamondIcon`) are replaced with a treatment that is coherent with the content (Issue / Verify / Gate) and not lucide-knockoff outline strokes.
- **R6.** Text-arrow `→` / `&rarr;` is removed from every link label. The SVG chevron inside the hero CTA is also removed.
- **R7.** Vertical rhythm varies across sections — not every section uses `py-20 sm:py-32`. At least one section is denser, at least one uses asymmetric spacing, and at least one breaks out of the centered-column layout.
- **R8.** Not every grid is `md:grid-cols-3`. Pillars and integration paths should use different layouts from each other.
- **R9.** The uniform `hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl` card hover is replaced with treatments appropriate to each card's semantics (or removed where cards are non-interactive).
- **R10.** All broken or near-invisible Tailwind values are fixed: `bg-primary/3` (invalid), `text-muted-foreground/40` (unreadable). The `V2ComparisonSection` either becomes a real comparison (Andamio vs. alternatives) or is reshaped so its heading and content agree.
- **R11.** The `bg-gradient-to-r from-transparent via-border to-transparent` ghost-line divider is removed or used at most once.
- **R12.** The page still builds, typechecks, and lints cleanly. No existing links, anchors (`#platform`, `#partners`), or external URLs change.

## Scope Boundaries

- **Not changing:** copy, page structure/order of sections, navigation, routes, `pages/index.tsx` wiring, `V2Navigation`, `V2PageLayout`, blog, customer pages.
- **Not changing:** `EXTERNAL_LINKS` values, section `id` anchors (`#platform`, `#partners`), analytics/tracking.
- **Not changing:** light/dark theme toggle behavior — dark mode must continue to work.
- **Not changing:** font stack (already customized: WorkSans, Inter, Inconsolata).

### Deferred to Separate Tasks

- Full brand-system rework (logo, typography overhaul, illustration language): future iteration.
- Actual competitive comparison content (Andamio vs. Credly vs. Accredible): deferred — for this pass, we reshape the section to match its single-column content.
- Replacing the hard-coded `#0d1117` / `#161b22` / `bg-white/[0.08]` in `V2CodeSection` and `V2CTAFooter` with proper tokens: will be addressed as part of the palette work in Unit 1 (opportunistic, not required).

## Context & Research

### Relevant Code and Patterns

- `src/ui/landing/V2Landing/index.tsx` — page assembly, section order.
- `src/ui/landing/V2Landing/motion-variants.ts` — central Framer Motion variants (`fadeIn`, `staggerContainer`, `slideInRight`).
- `src/ui/landing/V2Landing/V2HeroSection.tsx` — hero with split-color headline, CTA-with-chevron, near-invisible trust row.
- `src/ui/landing/V2Landing/V2CodeSection.tsx` — uses hard-coded `#0d1117` / `#161b22`; eyebrow + split-color heading.
- `src/ui/landing/V2Landing/V2PillarsSection.tsx` — three outline-stroke icons + rule-of-threes grid + floating hover.
- `src/ui/landing/V2Landing/V2ArchitectureSection.tsx` — gradient ghost-line divider, `bg-primary/3` (broken), rule-of-threes cards, `&rarr;` on every link.
- `src/ui/landing/V2Landing/V2PartnersSection.tsx` — split-color headline, `&rarr;` CTA.
- `src/ui/landing/V2Landing/V2ComparisonSection.tsx` — "comparison" table with only one column, split-color headline.
- `src/ui/landing/V2Landing/V2FAQSection.tsx` — eyebrow + boring header; accordion interaction is OK.
- `src/ui/landing/V2Landing/V2StatusSection.tsx` — two-column section, already less slop-y but still has the eyebrow.
- `src/ui/landing/V2Landing/V2CTAFooter.tsx` — eyebrow pill appears twice more in the CTA cards, `&rarr;` on three CTAs.
- `tailwind.config.ts` — theme extension, CSS-var-driven colors.
- `src/styles/globals.css` — root CSS variables (OKLCH primary `oklch(0.669 0.199 38.581)`, a warm orange; secondary `oklch(0.387 0.134 250.505)`, a deep blue). Custom fonts defined. Dark mode is a full palette.

### Institutional Learnings

- None checked. The `docs/plans/` directory contains prior landing-page work (`2026-03-04-landing-page-v2-design.md`, `2026-03-05-v2-messaging-decisions.md`) that defined the current copy + IA; this plan does not override those decisions, only the visual execution on top of them.

### External References

- None used. The problems are well-understood shadcn/AI-Tailwind tells; fixes are design decisions, not research questions.

## Key Technical Decisions

- **Keep existing CSS tokens, change usage patterns.** The OKLCH primary (warm orange) and secondary (deep blue) are already non-default and recognizable. Rather than invent a new brand palette, we earn brand identity by (a) introducing a neutral ramp variable for layered surfaces (replacing the broken `bg-primary/3` and the monotonous `bg-card` everywhere), (b) differentiating section surfaces with it, and (c) using `--secondary` (deep blue) intentionally in one or two places instead of only `--primary`.
- **Eliminate the "section-eyebrow template."** Each section's header should come from a small set of patterns, used deliberately: (1) no eyebrow, just a strong heading; (2) a numbered section marker (`01 — Capabilities`); (3) a left-aligned kicker word; (4) an inline subhead. The `font-mono uppercase tracking-[0.2em] text-primary` combination is retired.
- **Kill the two-tone headline.** Replace with single-color headings. Where contrast is desired, use weight or size — not split color.
- **Consolidate motion to three moments.** (1) Hero entrance on load. (2) FAQ accordion (already event-driven). (3) Status section's task list stagger (as an editorial reveal of "here's what's done"). Every other `motion.*` wrapper becomes a plain element.
- **Replace outline-stroke pillar icons with numbered typographic markers.** `01 / Issue`, `02 / Verify`, `03 / Gate` using the display font — relates to the content and escapes the lucide-knockoff trap. No SVGs needed.
- **Remove every text arrow.** Link labels stand on their own. Where a link is a primary CTA button, styling carries the affordance; no `&rarr;`.
- **Break rhythm by varying section density.** Hero stays `min-h-screen`. Pillars goes tighter (`py-16 sm:py-24`). Architecture stays full. Partners becomes a compact list. Comparison becomes a two-column editorial block. FAQ tightens. CTA footer stays punchy.
- **Change layout shapes per-section.** Pillars moves from `grid-cols-3` to an editorial two-column layout with the three items stacked as numbered rows on the right. Integration paths in the Architecture section become a single-row horizontal list at `md:grid-cols-3` (this one stays 3, but as a different treatment from pillars).
- **Reshape the Comparison section** to match its single-column content. Rename the heading from "What you get. Why it matters." to something honest ("What Andamio gives you" or similar), drop the `<table>` in favor of a prose-forward definition list, and make it left-aligned and asymmetric (not centered).
- **Remove `hover:-translate-y-1` everywhere.** Non-interactive cards get no hover lift. Where cards are genuinely links (architecture integration paths), give them a subtle border or background change, not a float.
- **Fix `bg-primary/3`** by introducing a new CSS variable `--surface-subtle` (a light-mode near-white / dark-mode near-card) and using `bg-[var(--surface-subtle)]` — or simply delete that layer and use the neutral ramp. **Decision:** introduce `--surface-subtle` so the architecture stack diagram still has four distinguishable layers.
- **Fix `text-muted-foreground/40`** by using full `text-muted-foreground` with smaller scale + letter-spacing — readable, still quiet.

## Open Questions

### Resolved During Planning

- *Do we need a new brand color ramp?* No — the existing OKLCH primary/secondary are fine. We add one neutral surface variable and change usage patterns. Keeps scope tight.
- *Do we replace the comparison section with a real comparison?* No — deferred. For this pass, reshape the existing single-column content into an honest prose section. A real Andamio-vs-X comparison is a separate content task.
- *Do we keep Framer Motion installed?* Yes — still used by hero and status sections. No dependency removal.
- *Do we rewrite the Navigation or Page Layout components?* No — those are not flagged.

### Deferred to Implementation

- Exact micro-copy for section headers when the eyebrow is replaced by a numbered marker (e.g., is it `01` or `01 /` or `Capabilities / 01`?) — implementer picks the cleanest of 2–3 options during the unit.
- Whether the Comparison section becomes a `<dl>` or a 2-column grid of paragraphs — implementer chooses based on how the reshaped copy reads.
- Whether the Code section keeps its hard-coded `#0d1117` / `#161b22` or moves to tokens — opportunistic; fine to leave if the token work is non-trivial in that unit.

## Implementation Units

- [ ] **Unit 1: Create the refactor branch and introduce the surface-subtle token**

**Goal:** Cut a feature branch and add one CSS variable so the architecture stack (and any future layered surfaces) have a valid, readable "one shade off the background" surface.

**Requirements:** R3, R10, R12

**Dependencies:** None

**Files:**
- Modify: `src/styles/globals.css` (add `--surface-subtle` in `:root` and `.dark`)
- Modify: `tailwind.config.ts` (extend `colors.surface.subtle: "var(--surface-subtle)"`)

**Approach:**
- Light mode: `--surface-subtle: oklch(0.985 0.002 106.423);` (same as existing `--muted`, which is already "just off white") — or one step different. Pick a value that is clearly distinct from `--background: oklch(1 0 0)` and from `--card: oklch(1 0 0)`.
- Dark mode: one step lighter than `--background: oklch(0.188 0.013 257.128)` but darker than `--card: oklch(0.241 0.018 257.128)`. Try `oklch(0.215 0.015 257.128)`.
- Branch name: `refactor/de-slop-v2-landing`.

**Patterns to follow:** existing CSS variable naming + dual-mode blocks in `src/styles/globals.css:8-91`.

**Test scenarios:**
- Test expectation: none -- pure token addition with no behavioral change. Verification is visual + typecheck.

**Verification:**
- `npm run type-check` passes.
- The new `bg-surface-subtle` class works in a throwaway component (or verified at the next unit's first use).

---

- [ ] **Unit 2: Prune the motion system**

**Goal:** Reduce Framer Motion usage to purposeful moments. Delete unused helpers; keep hero entrance, FAQ (already non-Motion), and the status section task-list reveal.

**Requirements:** R4, R12

**Dependencies:** Unit 1 (not strictly, but lands first so later units build on simplified motion)

**Files:**
- Modify: `src/ui/landing/V2Landing/motion-variants.ts` (keep `fadeIn` and `staggerContainer` only if still needed by hero/status; drop `slideInRight` if unused after later units; drop stock cubic-bezier).
- Modify: `src/ui/landing/V2Landing/V2HeroSection.tsx` (keep motion; drop the stock `[0.25, 0.46, 0.45, 0.94]` ease tuple — use `"easeOut"` consistent with `motion-variants.ts`).

**Approach:**
- Keep hero as the one load-time reveal. Standardize on `"easeOut"` string easing throughout — no cubic-bezier literals.
- Remove `whileInView` / `viewport` wrappers from sections that don't need them (to be done in each section's unit).
- This unit just cleans up the variants file and hero easing; per-section removal happens in later units.

**Patterns to follow:** keep `motion-variants.ts` as the single source of motion values.

**Test scenarios:**
- Test expectation: none -- visual/animation change only.

**Verification:**
- `grep -r "0.25, 0.46" src/ui/landing/V2Landing/` returns no hits.
- Hero still animates on load.

---

- [ ] **Unit 3: Refactor the Hero section**

**Goal:** Remove the split-color headline, remove the CTA chevron SVG, make the trust row readable, replace the near-invisible opacity hack.

**Requirements:** R2, R6, R7, R10

**Dependencies:** Unit 2

**Files:**
- Modify: `src/ui/landing/V2Landing/V2HeroSection.tsx`

**Approach:**
- Replace `<h1>Credentials That <br/> <span class="text-primary">Belong to You</span></h1>` with a single-color heading. Options: keep "Credentials that belong to you" all in one color, or break emphasis via weight/size, not hue.
- Remove the inline SVG chevron from the "Build on Andamio" CTA. The button styling already carries affordance.
- Trust row: change `text-muted-foreground/40` to `text-xs tracking-widest text-muted-foreground` (or a similar readable-but-quiet treatment). Drop `font-mono` if it reads AI-templated — use sans with letter-spacing instead.
- Keep the Framer Motion entrance.

**Patterns to follow:** readable "Trusted by" rows from well-designed marketing sites — full opacity, small scale, letter-spacing for restraint instead of alpha.

**Test scenarios:**
- Test expectation: none -- presentational only.

**Verification:**
- Hero headline is a single color.
- CTA button has no SVG child.
- `grep "text-muted-foreground/40" src/ui/landing/V2Landing/V2HeroSection.tsx` returns nothing.
- Hero still fades in on load.

---

- [ ] **Unit 4: Refactor the Pillars section**

**Goal:** Replace outline-stroke SVG icons with numbered typographic markers; change layout from `md:grid-cols-3` cards to an editorial two-column (heading left, numbered rows right); drop the floating hover.

**Requirements:** R1, R2, R5, R8, R9

**Dependencies:** Unit 2

**Files:**
- Modify: `src/ui/landing/V2Landing/V2PillarsSection.tsx`

**Approach:**
- Delete `ClipboardIcon`, `ChartIcon`, `DiamondIcon` helper components.
- Replace the eyebrow + centered headline treatment. For this section: drop the eyebrow entirely; put the heading in the left column at `lg:grid-cols-[1fr_1.4fr]` or similar.
- Right column: three numbered rows (`01 / Issue`, `02 / Verify`, `03 / Gate`) with title + description. Use the `font-display` (Inter) for the number marker.
- Remove `hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl`. These rows are not interactive cards.
- Remove Framer Motion from this section (the reveal was decorative, not meaningful).
- Drop the split-color headline.

**Patterns to follow:** editorial two-column marketing sections where the heading anchors the left rail.

**Test scenarios:**
- Test expectation: none -- presentational only.

**Verification:**
- No `ClipboardIcon`/`ChartIcon`/`DiamondIcon` references remain.
- No `hover:-translate-y-1` in this file.
- No `motion.*` components in this file (or at most a wrapper with minimal purpose).
- Section renders as two-column at `lg` breakpoint, single column on mobile.

---

- [ ] **Unit 5: Refactor the Architecture section**

**Goal:** Fix the broken `bg-primary/3`, remove the gradient ghost-line divider, remove text arrows from integration-path link labels, vary the layout from the pillars section, replace the eyebrow.

**Requirements:** R1, R6, R8, R10, R11

**Dependencies:** Unit 1 (needs `--surface-subtle`), Unit 2

**Files:**
- Modify: `src/ui/landing/V2Landing/V2ArchitectureSection.tsx`

**Approach:**
- Replace `bg-primary/3` on the "ANDAMIO PLATFORM" layer with `bg-surface-subtle` (defined in Unit 1). Confirms all four stack layers are visually distinct.
- Remove the `bg-gradient-to-r from-transparent via-border to-transparent` ghost-line divider at the top of the section.
- Section header: drop the `font-mono uppercase tracking-[0.2em]` eyebrow. Use a numbered marker (`02`) or a simple heading-plus-subhead.
- Drop the split-color subhead ("Your app is built on Andamio." in muted).
- Integration-path cards: remove `→` from `linkLabel` strings (`Getting Started Guide`, `View on GitHub`, `Open the App`). No replacement arrow.
- Keep `md:grid-cols-3` for integration paths — this is where we allow the 3-up layout (since pillars no longer uses it). But simplify the card chrome: remove the badge pill (or keep the badge but restyle — colored text only, no `bg-primary/10` pill block).
- Remove Framer Motion wrappers on the stack-layer blocks (the staggered delay was noise). Keep or remove motion on the card grid — decision: remove.

**Patterns to follow:** the existing architecture stack is actually the strongest design gesture on the page — retain it, just fix its broken layer and its decorative motion.

**Test scenarios:**
- Test expectation: none -- presentational + broken-token fix.

**Verification:**
- `grep "bg-primary/3" src/ui/landing/V2Landing/V2ArchitectureSection.tsx` returns nothing.
- `grep -E "→|&rarr;" src/ui/landing/V2Landing/V2ArchitectureSection.tsx` returns nothing.
- Gradient ghost-line divider is removed.
- All four stack layers (YOUR APP / ANDAMIO API / ANDAMIO PLATFORM / CARDANO) are visually distinguishable in both light and dark mode.
- Section anchor `id="platform"` still present.

---

- [ ] **Unit 6: Refactor the Partners section**

**Goal:** Drop the eyebrow + split-color headline, remove the `&rarr;` from the CTA link, vary the rhythm.

**Requirements:** R1, R2, R6

**Dependencies:** Unit 2

**Files:**
- Modify: `src/ui/landing/V2Landing/V2PartnersSection.tsx`

**Approach:**
- Replace eyebrow + two-tone headline with a single concise header. The list of partner rows (already reasonably well-designed) stays.
- Change the CTA from `"View all use cases &rarr;"` to `"View all use cases"` with underline or arrow-less treatment.
- Remove Framer Motion wrappers — the list is short and the motion is decorative.
- Vary padding: tighter than `py-12 sm:py-20`? Decision: keep as a compact section (already denser than the others). Consider `pb-20` / `pt-12` asymmetry.

**Test scenarios:**
- Test expectation: none -- presentational only.

**Verification:**
- `grep "&rarr;\|&rarr;\|tracking-\[0.2em\]" src/ui/landing/V2Landing/V2PartnersSection.tsx` returns nothing.
- Section `id="partners"` still present.

---

- [ ] **Unit 7: Reshape the Comparison section**

**Goal:** Make the section honest about what it is — a list of protocol properties, not a comparison. Replace the `<table>` with a layout that fits the content, drop the eyebrow + split-color headline, break the centered-column rhythm.

**Requirements:** R1, R2, R7, R10, R11

**Dependencies:** Unit 2

**Files:**
- Modify: `src/ui/landing/V2Landing/V2ComparisonSection.tsx`

**Approach:**
- Rename the section heading from `"What you get. Why it matters."` (split-color) to a single-color, single-line heading that matches the content. Suggested: `"What Andamio gives you"` or `"The guarantees"` — implementer picks.
- Replace the `<table>` with either a two-column `<dl>` or a 2-up grid of feature/detail blocks. Left-align, max-width maybe `max-w-4xl`, not centered block inside full-width.
- Remove the gradient ghost-line divider at the top of the section.
- Remove Framer Motion wrapper.
- Keep all six feature rows; only their presentation changes.

**Patterns to follow:** editorial definition lists.

**Test scenarios:**
- Test expectation: none -- presentational + heading text change.

**Verification:**
- Section heading contains no `<span class="text-muted-foreground">`.
- No `<table>` in this file.
- All six `feature` / `detail` entries from `featureData` still render.
- No `bg-gradient-to-r from-transparent via-border` divider.

---

- [ ] **Unit 8: Refactor the FAQ section**

**Goal:** Drop the eyebrow, rework the headline, tighten rhythm.

**Requirements:** R1, R4

**Dependencies:** Unit 2

**Files:**
- Modify: `src/ui/landing/V2Landing/V2FAQSection.tsx`

**Approach:**
- Remove the `FAQ` eyebrow pill. The heading `"Common questions"` can stand on its own, or be replaced entirely — a simple `<h2>` with no preamble.
- Remove the outer `motion.div` wrappers (accordion is already event-driven; the outer fade-in is noise).
- Keep the accordion interaction logic and chevron icon unchanged (the chevron here is functional, not decorative).
- Consider left-aligning or narrowing (`max-w-2xl`) instead of `max-w-3xl text-center`.

**Test scenarios:**
- Happy path: clicking a question still expands/collapses its answer.
- Edge case: clicking an already-open question collapses it (existing `openIndex === index` behavior preserved).

**Verification:**
- No `tracking-[0.2em]` eyebrow on this file.
- Accordion still opens/closes on click (manual visual check).
- `motion.div` wrappers removed except where the chevron's `rotate` transform sits (that's a CSS class, not Motion).

---

- [ ] **Unit 9: Refactor the Status section**

**Goal:** Drop the eyebrow, drop the split-color subhead, keep the two-column layout and the status-list reveal (this is one of the motion moments we keep).

**Requirements:** R1, R2, R4

**Dependencies:** Unit 2

**Files:**
- Modify: `src/ui/landing/V2Landing/V2StatusSection.tsx`

**Approach:**
- Remove the `STATUS` eyebrow.
- Replace `"V2 is live. <span class='text-muted-foreground'>Still building.</span>"` with a single-color heading.
- Keep the `slideInRight` stagger on the status items — this is editorial and appropriate (a checklist revealing item by item).
- Keep the two-column layout (`lg:grid-cols-2`).
- Remove `&rarr;` from any link labels (none present in this file currently — verify).

**Test scenarios:**
- Test expectation: none -- presentational only. Motion behavior preserved.

**Verification:**
- No `tracking-[0.2em]` on this file.
- Headline has no `<span class="text-muted-foreground">`.
- Status-items stagger animation still plays on scroll-into-view.

---

- [ ] **Unit 10: Refactor the CTA Footer section**

**Goal:** Remove the `FOR DEVELOPERS` / `FOR ORGANIZATIONS` eyebrows, drop the split-color headline in the developer card, strip `&rarr;` from the three CTAs.

**Requirements:** R1, R2, R6

**Dependencies:** Unit 2

**Files:**
- Modify: `src/ui/landing/V2Landing/V2CTAFooter.tsx`

**Approach:**
- Remove both eyebrow pills inside the CTA cards.
- Change the developer card headline from `"Get your API key. <span class='text-white/80'>Start issuing credentials today.</span>"` to a single-color line.
- Remove `&rarr;` from: "Read the Docs", "View Use Cases", "Talk to Us".
- Keep the CTA cards' dark-on-white-with-white-border treatment.
- Keep the footer link columns as-is (the `font-mono uppercase tracking-wider` there is acceptable — link-column labels are a legitimate use of the style, and there's only one instance, not six).
- Remove the outer `motion.div` fade-in wrapper around the CTA cards.

**Test scenarios:**
- Test expectation: none -- presentational only.

**Verification:**
- `grep -c "tracking-\[0.2em\]" src/ui/landing/V2Landing/V2CTAFooter.tsx` returns `0`.
- `grep "&rarr;" src/ui/landing/V2Landing/V2CTAFooter.tsx` returns nothing.
- Footer link columns still render all 4 groups (Build / Explore / Connect / Legal).

---

- [ ] **Unit 11: Refactor the Code section**

**Goal:** Drop the eyebrow, drop the split-color headline, remove the `&rarr;` on "View Full API Reference".

**Requirements:** R1, R2, R6

**Dependencies:** Unit 2

**Files:**
- Modify: `src/ui/landing/V2Landing/V2CodeSection.tsx`

**Approach:**
- Remove the `FOR DEVELOPERS` eyebrow pill.
- Change headline from `"Build apps anchored on interoperable credentials. <span class='text-gray-400'>Andamio handles the blockchain.</span>"` to a single-color line (drop the `<span>`).
- Strip `&rarr;` from "View Full API Reference".
- Keep the code block styling (terminal chrome, syntax colors) — it's one of the page's stronger gestures and isn't part of the slop cluster.
- Remove the outer `motion.div` wrapper — keep it static. The code block's glow backdrop is fine.

**Test scenarios:**
- Test expectation: none -- presentational only.

**Verification:**
- `grep "tracking-\[0.2em\]" src/ui/landing/V2Landing/V2CodeSection.tsx` returns nothing.
- `grep "&rarr;" src/ui/landing/V2Landing/V2CodeSection.tsx` returns nothing.
- Code block still renders the curl example.

---

- [ ] **Unit 12: Final sweep — verify no leftover slop patterns**

**Goal:** Global grep pass to catch any remaining instances of the flagged patterns. Run build + typecheck + lint.

**Requirements:** R1, R6, R9, R10, R11, R12

**Dependencies:** Units 1–11

**Files:**
- Review (no edits expected): all files under `src/ui/landing/V2Landing/`

**Approach:**
- Run these greps and ensure they return zero hits (or only intentional ones) across `src/ui/landing/V2Landing/`:
  - `tracking-\[0.2em\]` — eyebrow pattern
  - `&rarr;` — text arrows (HTML entity)
  - `→` — text arrows (raw)
  - `bg-primary/3` — invalid opacity
  - `text-muted-foreground/40` — near-invisible text
  - `hover:-translate-y-1` — floating-card hover
  - `bg-gradient-to-r from-transparent via-border to-transparent` — ghost-line divider
  - `span className="text-muted-foreground"` inside `<h1>` / `<h2>` / `<h3>` tags — split-color headline
  - `[0.25, 0.46, 0.45, 0.94]` — stock cubic-bezier
- Audit remaining `motion.*` components: each should have a purposeful reason (hero entrance, status stagger).
- Run `npm run type-check` and `npm run lint`. Fix any regressions.
- Run `npm run build`. Confirm successful build.

**Test scenarios:**
- Happy path: page renders in dev, all anchor navigation (`#platform`, `#partners`) works, all external links point where they did before.
- Happy path: toggle light/dark mode — new `--surface-subtle` token works in both.

**Verification:**
- All greps above return zero hits (or are documented as intentional exceptions).
- `npm run type-check` clean.
- `npm run lint` clean (or no new violations).
- `npm run build` succeeds.
- No section `id` anchors changed; no `EXTERNAL_LINKS` usage changed.

## System-Wide Impact

- **Interaction graph:** Purely presentational changes inside `src/ui/landing/V2Landing/`. No other routes, no shared components outside the V2Landing folder, no layout/navigation changes.
- **Error propagation:** N/A — no data paths.
- **State lifecycle risks:** None. FAQ accordion keeps its existing `useState`.
- **API surface parity:** N/A — no APIs.
- **Integration coverage:** Light/dark theme must continue to work. The new `--surface-subtle` variable is defined in both `:root` and `.dark`.
- **Unchanged invariants:**
  - `pages/index.tsx` still renders `<V2Landing />`.
  - Section `id` anchors (`#platform`, `#partners`) unchanged.
  - `EXTERNAL_LINKS` import usage unchanged.
  - All external URLs, route paths, and analytics tracking unchanged.
  - Navigation (`V2Navigation`) and page layout wrappers untouched.

## Risks & Dependencies

| Risk | Mitigation |
|------|------------|
| Removing Framer Motion wrappers accidentally changes DOM structure and breaks CSS selectors | Each unit's verification step includes a visual check. Motion removal only removes the wrapping `<motion.div>`; the inner markup and classes stay. |
| New `--surface-subtle` value is visually indistinct in one of the two themes | Unit 5 verification explicitly calls for checking all four architecture layers in both light and dark mode. |
| User dislikes the editorial direction (e.g., hates the numbered pillars) | This is a design review loop — James explicitly said he'll review after these changes. Each section is its own unit, so individual treatments can be reverted without rolling back the whole PR. |
| Scope creep into brand-system work | Scope Boundaries explicitly defers full brand-system rework. Palette changes limited to the single `--surface-subtle` addition + changed usage patterns. |
| Splitting the refactor into 12 units produces commit noise | Expected — commits will be squashed at merge. Each unit is focused enough that reverting a specific choice is easy. |

## Documentation / Operational Notes

- No changelog entry required (internal visual refactor, no user-facing behavior change).
- No migration, no feature flag, no rollout notes — standard PR, merge to main, deploy.
- No SEO/metadata changes.

## Sources & References

- Landing page V2 design doc: `docs/plans/2026-03-04-landing-page-v2-design.md`
- V2 messaging decisions: `docs/plans/2026-03-05-v2-messaging-decisions.md`
- Prior conversation turn: 10 tell-tale AI-Tailwind slop signs enumerated, with file:line citations in `src/ui/landing/V2Landing/`.
