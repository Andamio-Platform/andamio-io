# Decision: Concept A prototype approval — production structural fixes

- **Date:** 2026-07-21
- **Status:** adopted
- **Owner:** Landing Excellence Program
- **Approval date:** 2026-07-21
- **Canonical commit:** `feat(landing): concept-a prototype and structural quality fixes` on `dev`
- **Supersedes:** none (completes the prototype gate named in [2026-07-21-concept-direction.md](2026-07-21-concept-direction.md))
- **Strategy source:** [../implementation/2026-07-21-design-strategy.md](../implementation/2026-07-21-design-strategy.md)

## Context

Concept A (issuer-led proof narrative) is adopted. Phase 0 required a separate prototype-approval gate before shipping production structural quality work. An isolated prototype under `/explore` (already robots-disallowed) lets reviewers inspect Concept A without changing the production homepage import.

## Options considered

1. **Approve Concept A structural P0/P1 now** — landmarks, HowItWorks tabs a11y, closing CTA hierarchy, `/show-me` sitemap, isolated `/explore/concept-a` shell — while keeping production on `AndamioLanding`.
2. **Defer all code until full visual/comps sign-off** — block A11Y/SEO/UX structural fixes behind Phase 1 comps.
3. **Ship a new landing stack for the prototype** — revive or fork V2Landing / alternate homepage.

## Decision

Adopt **option 1**. Concept A prototype is approved for the production structural fixes listed below.

### Fixed product decisions (unchanged)

- Issuer-primary / developer-secondary
- Canonical stack: `src/ui/system/*` + `src/ui/explore/content.ts` — do **not** revive V2Landing as homepage
- Brand: Warm Index — ink/paper, one orange primary CTA per view, blue wayfinding only, square geometry
- KEEP `/show-me` and `/issuer` HowItWorks + BadgeBuilder

### What this authorizes (production + prototype)

| ID | Change |
|---|---|
| A11Y-01 | `Page` skip link → `#main-content`; children wrapped in `<main id="main-content">`; footer remains sibling after main |
| A11Y-02 | HowItWorks WAI-ARIA tabs (tablist/tab/tabpanel, roving tabindex, Left/Right/Home/End) without breaking visibility height layout |
| UX-03 | Closing section: primary walkthrough (`EXTERNAL_LINKS.walkthroughMailto` / `issuer.walkthroughCta`), secondary Discord (`closing.cta`) — copy-only / CTA hierarchy per brand guide §11.1 |
| SEO-01 | Sitemap includes `/show-me` (StoryFork indexable for this program) |
| Prototype | Isolated `src/pages/explore/concept-a.tsx` shell with prototype banner; production `src/pages/index.tsx` stays on `AndamioLanding` |

### Non-goals

- New landing stack or homepage import swap away from `AndamioLanding`
- Fabricated claims or live issue/verify endpoints in demos
- Analytics vendor wiring
- Full Phase 3 visual polish / hero budget work in this gate

## Consequences

- Phase 0 gate in [../implementation/work-breakdown.md](../implementation/work-breakdown.md) is checked.
- Phase 2 structural tasks A11Y-01, A11Y-02, SEO-01 (sitemap), and UX-03 (closing CTA) may ship on the shared system components.
- Reviewers use `/explore/concept-a` for the labeled prototype; `/` remains production with the same structural fixes applied to shared kit/landing.

## Related evidence

- [2026-07-21-concept-direction.md](2026-07-21-concept-direction.md)
- [../implementation/work-breakdown.md](../implementation/work-breakdown.md)
- [../implementation/verification-evidence.md](../implementation/verification-evidence.md)
