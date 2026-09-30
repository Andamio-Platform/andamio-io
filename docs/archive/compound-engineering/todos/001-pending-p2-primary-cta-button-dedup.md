---
id: 001
priority: p2
status: pending
source: ce-review run 20260416-172313-f1240cb9 (MAINT-003)
origin_branch: refactor/de-slop-v2-landing
created: 2026-04-16
---

# Extract primary CTA button into shared component

The primary CTA button class — `inline-flex items-center rounded-md bg-primary px-{5|6} py-{2.5|3} text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90` — is duplicated (with minor padding variation) across:

- `src/ui/landing/V2Landing/V2HeroSection.tsx`
- `src/ui/landing/V2Landing/V2StatusSection.tsx`
- `src/ui/landing/V2Landing/V2CTAFooter.tsx`
- `src/ui/landing/V2Landing/V2Navigation.tsx`

The codebase already has a `src/components/ui/` shadcn-style components directory. Landing page CTAs should consume a `<Button>` variant rather than assembling ad-hoc Tailwind strings per section.

**Reviewer:** maintainability, confidence 0.80.
**Scope note:** out of scope for the de-slop refactor; captured for a follow-up PR.
