# Design Strategy — Opportunity Map and Concept Directions

- **Date:** 2026-07-21
- **Status:** planned (awaits prototype approval gate)
- **Owner:** Landing Excellence Program
- **Brand system:** Warm Index · Editorial rail (`src/ui/system/tokens.ts`, `kit.tsx`)
- **Product frame:** issuer-primary / developer-secondary
- **Depends on:** [../decisions/2026-07-21-keep-reuse-archive.md](../decisions/2026-07-21-keep-reuse-archive.md), audits under [../audits/](../audits/)

## Opportunity map

| Opportunity | Evidence | Issuer outcome | Constraint |
|---|---|---|---|
| Clarify proof narrative in first viewport | Funnel audit: hero CTA is Show me; brand must lead | Understand permanent, useful, owned, verifiable credentials | Brand-first; no stats/card clutter in hero |
| Progressive depth for builders | `/show-me` already forks issuer/builder/curious | Issuers never blocked by API depth | Developer path secondary, not competing hero |
| Keep live issuer demo as proof | HowItWorks + BadgeBuilder on `/issuer` | Evaluate Define/Issue/Verify without claiming backend success | Archive V2 walkthrough; reuse badge core only |
| Fix structural a11y before craft polish | Missing `<main>`/skip; incomplete tabs | Trust + WCAG 2.2 AA | P0/P1 before motion experiments |
| Bound fonts and JS | Broad Google Fonts; 160 kB first-load JS | Faster first paint on mobile | Ratify budgets after isolated Lighthouse |
| Measurement after privacy | No analytics | Optimize issuer path selection with evidence | Event contract from funnel audit |
| Warm Index discipline vs kit aesthetics | UI/UX shortlist cautions | Distinct brand vs neon SaaS clones | Restyle any borrowed structure |

## Concept directions (Warm Index)

All three keep ink/paper, sparing orange, blue wayfinding, Inter + JetBrains Mono, square geometry, editorial rail optional on desktop.

### Concept A — Issuer-led proof narrative with progressive developer depth (RECOMMENDED)

**Story:** Brand and one outcome sentence lead. Primary path: Show me → issuer fork → `/issuer` proof (HowItWorks + BadgeBuilder) → walkthrough / Start issuing. Developer depth appears after self-selection or below the fold, never competing with the hero.

**Section architecture (`/`)**

1. Hero — brand, one headline, one support line, CTA group (Show me primary; Start issuing secondary), full-bleed specimen plane
2. Issuer outcome — permanent/useful/owned/verifiable proof
3. How path teaser — link to `/issuer#how-it-works`
4. Developer secondary — Build on Andamio / Docs (visually quieter)
5. Ecosystem / community — portable, pattern, Discord (non-primary)
6. Closing — issuer walkthrough primary; Discord secondary

**CTA hierarchy**

1. `home.hero_show_me` / issuer evaluation
2. Walkthrough mailto or Start issuing
3. Developer Build / Docs
4. Community Discord

**Demo scope**

- KEEP: `/show-me` (StoryFork)
- KEEP: `/issuer` HowItWorks + BadgeBuilder
- ARCHIVE: V2 walkthrough as authority (already decided)
- `/developers` remains secondary destination, not homepage hero

### Concept B — Dual-rail marketplace

Equal issuer/developer columns from hero. Rejected for Phase 1: dilutes issuer-primary framing and fails conversion ladder priority.

### Concept C — Spec-first / API-first

Hero leads with API/CLI. Rejected for Phase 1: developer-primary; contradicts product priority.

## Decision gate language

> **Prototype approval gate:** Concept A is the adopted direction only after [../decisions/2026-07-21-concept-direction.md](../decisions/2026-07-21-concept-direction.md) is `adopted` (this package adopts it). Visual/copy prototypes may proceed against Concept A. **Implementation gate:** no canonical application changes ship until requirements in [../requirements/](../requirements/) are `approved`, the relevant agent brief is `ready`, and a prototype review records accept/reject with date and owner. Rejecting the prototype returns design to `in-review` without reviving Concepts B/C unless a new decision supersedes Concept A.

## Non-goals for this strategy doc

- Pixel comps (belong in ui-design brief outputs)
- Analytics vendor selection (privacy decision first)
- Deleting archived legacy files

## Related

- [../decisions/2026-07-21-concept-direction.md](../decisions/2026-07-21-concept-direction.md)
- [component-map.md](component-map.md)
- [work-breakdown.md](work-breakdown.md)
