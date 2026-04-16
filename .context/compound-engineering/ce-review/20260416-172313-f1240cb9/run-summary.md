---
run_id: 20260416-172313-f1240cb9
branch: refactor/de-slop-v2-landing
base: 91a5228765ef252678185032a319325cc2082839
mode: autofix
plan: docs/plans/2026-04-16-001-refactor-de-slop-v2-landing-plan.md
date: 2026-04-16
---

# Review run — de-slop V2 landing

## Reviewers dispatched

- correctness (always-on)
- testing (always-on)
- maintainability (always-on)
- project-standards (always-on)
- agent-native-reviewer (always-on)
- learnings-researcher (always-on)
- kieran-typescript (TSX diff)

## Applied safe_auto fixes

1. **Tokenized dark surface colors.** Introduced `--surface-dark` (#0d1117) and `--surface-dark-elevated` (#161b22) CSS vars in `src/styles/globals.css`, registered `surface.dark` and `surface.dark-elevated` in `tailwind.config.ts`, replaced three hard-coded `bg-[#0d1117]` / `bg-[#161b22]` usages across `V2CodeSection.tsx` and `V2CTAFooter.tsx`. (Addresses MAINT-001, aligned with plan scope's "opportunistic" cleanup note.)

2. **Deleted dead keyframes.** Removed `@keyframes slideInLeft`, `slideInRight`, and `throb` from `src/styles/globals.css`. All three were unreferenced anywhere in the codebase. Kept `slideIn` and `slideOut` (still used by `.CollapsibleContent`). (Addresses MAINT-004.)

3. **Fixed Link vs `<a>` for external/mailto hrefs** in `V2CTAFooter.tsx` footer link columns. External `https://` and `mailto:` URLs now render as `<a>` with `target="_blank"` + `rel="noopener noreferrer"` for https; internal paths continue to use Next.js `Link`. (Addresses KT-001.)

4. **Fixed React key** in `V2FAQSection.tsx` — changed `key={index}` to `key={item.question}` for stable-key semantics. (Addresses KT-002.)

## Residual actionable work (not auto-applied)

- **MAINT-003** — Primary CTA button class string duplicated across 4 files. Recommendation is to consume a shared `<Button>` component from `src/components/ui/`. Out of scope for this refactor; captures existing project drift. Owner: downstream-resolver.
- **MAINT-002** — `border-t border-border/60 bg-surface-subtle` class string duplicated across 3 section files. Could be extracted to a constant. Judgment call: 3 instances is borderline for abstraction; leaving duplicated preserves clarity. Advisory.
- **MAINT-006** — `motion-variants.ts` lives in `src/ui/landing/V2Landing/` but is imported by `src/pages/about/index.tsx` and `src/pages/use-cases/index.tsx`. Location misleading. Should move to `src/lib/` or `src/ui/shared/`. Owner: downstream-resolver.
- **Residual V2Navigation** — `transition-all hover:shadow-md` on its "Get Started" CTA is the hover-shadow pattern this refactor was meant to remove. V2Navigation was explicitly out of scope per the plan, but this is the one spot where slop survives. Owner: downstream-resolver.

## Advisory / noted

- No test infrastructure exists (no jest/vitest/playwright/cypress in devDependencies, zero test files under `src/`). V2FAQSection's accordion toggle has no coverage. Pre-existing.
- V2FAQSection lacks `aria-expanded` / `aria-controls` on the accordion button — accessibility gap, pre-existing.
- No `docs/solutions/` knowledge base in this repo. Consider running `/compound` after merge to seed it with learnings from this de-slop pass.

## Verdict

**Ready with fixes.** All safe_auto fixes applied. Residual items are either out of scope (V2Navigation, button extraction) or judgment calls (constant extraction). Build + typecheck clean. User will verify visually.
