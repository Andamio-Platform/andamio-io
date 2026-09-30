# Recommendations and Next Steps (Documentation Freeze)

- **Date:** 2026-07-22
- **Branch:** `dev`
- **Status:** documentation complete for planning; **no further design/code implementation in this phase**
- **Owner:** Landing Excellence Program

## Freeze decision

Stop implementing landing design and production UI in this program phase. Use the documentation package below to write a **separate implementation plan** later. Do not start visual redesign, motion experiments, or new component stacks until that plan is approved.

Already-landed structural commits on `dev` (`feat(landing): concept-a prototype and structural quality fixes`) may stay as history; treat them as optional baseline, not as authorization to continue coding without a new plan.

## What the documentation package contains

| Package | Path | Use later for |
|---|---|---|
| Research methodology | [../research/methodology.md](../../archive/landing-page-excellence/research/methodology.md) | How to score and freshness-check tools |
| GitHub AI catalog (75) | [../research/github-ai-resources/](../../archive/landing-page-excellence/research/github-ai-resources/) | Agent skills, MCP, QA/eval tools |
| UI/UX web catalog (87) | [../research/ui-ux-resources/](../../archive/landing-page-excellence/research/ui-ux-resources/) | Free/animated components, inspiration, a11y/perf tools |
| Shortlists + adoption matrix | [../research/shortlists/](../research/shortlists/) | What to adopt / evaluate / reference |
| Baseline audits | [../audits/](../../archive/landing-page-excellence/audits/) | Current funnel, a11y/SEO/perf gaps |
| Concept A decision | [../decisions/2026-07-21-concept-direction.md](../decisions/2026-07-21-concept-direction.md) | Issuer-led narrative direction |
| Keep/reuse/archive | [../decisions/2026-07-21-keep-reuse-archive.md](../decisions/2026-07-21-keep-reuse-archive.md) | Canonical vs legacy stacks |
| Requirements 01–09 | [../requirements/](../requirements/) | Agent-testable acceptance criteria |
| Agent briefs | [../agent-briefs/](../agent-briefs/) | Bounded specialist prompts |
| Design strategy + WBS | [./](./) | Section jobs, phases, verification |

## Product recommendations (locked for planning)

1. **Audience:** credential issuers primary; developers secondary (not equal in the hero).
2. **Concept:** Concept A — issuer-led proof narrative with progressive developer depth.
3. **Canonical code when implementation resumes:** `src/ui/system/*` + `src/ui/explore/content.ts` only.
4. **Demo scope:** KEEP `/show-me` and `/issuer` HowItWorks + BadgeBuilder; ARCHIVE V2 walkthrough as authority; REUSE V2 badge core only.
5. **Brand:** Warm Index — ink/paper, one orange primary per view, blue wayfinding only, square geometry, Inter + JetBrains Mono. Do not clone neon/dark SaaS kits.

## Highest-value work for the future implementation plan

Ordered by impact before craft polish:

### P0 — Trust and structure

| ID | Work | Why |
|---|---|---|
| A11Y-01/02 | Confirm skip link, `<main>`, HowItWorks tabs (if already on branch) in the new plan’s smoke checklist | Structural trust |
| A11Y-03 | Full keyboard funnel on `/`, `/show-me`, `/issuer` | WCAG 2.2 AA |
| CNT-02 | Demo copy truth (illustrative Issue/Verify never claimed as live API) | Credibility |
| UX-07 / TECH-02 | Consolidate `EXTERNAL_LINKS` (api host drift) | Broken/wrong destinations |

### P1 — Conversion and clarity

| ID | Work | Why |
|---|---|---|
| UX-02 / VIS-02 | Hero budget + brand-first first viewport (no clutter) | Issuer comprehension |
| UX-03 / CNT-04 | Closing CTA hierarchy: walkthrough / Start issuing above Discord | Issuer conversion |
| UX-05 | `/show-me` continuation and recovery QA | Primary narrative path |
| SEO-01 | Explicit `/show-me` index policy (sitemap already lists it on `dev`) | Discoverability |
| SEO-02 | Centralize social identity (Twitter/`sameAs` drift) | SEO consistency |

### P1 — Quality floor

| ID | Work | Why |
|---|---|---|
| PERF-03 | Bound fonts (evaluate Fontsource; drop unused Google families) | LCP/privacy |
| PERF-04 | SVG LCP hygiene (badge/logos via SVGOMG) | Hero performance |
| PERF-01/05 | Isolated production-mode Lighthouse ×3 mobile on `/`, `/issuer`, `/show-me` | Real budgets |
| MOT-01/02 | Intentional motion set + reduced-motion equivalents | Brand + a11y |
| TECH-01 | Privacy-approved analytics/event contract before any instrumentation | Measurement without surveillance |

### P2 — Craft and tooling

| Work | Source shortlist | Caution |
|---|---|---|
| At most 1–2 micro-interactions from Magic UI / React Bits | evaluate | Restyle to Warm Index; no neon/dark defaults |
| Section structure ideas from Launch UI | evaluate | Structure only, not aesthetic clone |
| Aceternity free components | evaluate | Inspiration; reject heavy 3D hero by default |
| Storybook / visual regression | adopt-now if review cost justified | Optional |
| Competitor pattern study (Credly/Accredible) | reference-only | Differentiate ownership/proof; no clone |

## Explicit non-goals until a new plan is approved

- New landing stack or revival of `ModernLanding` / `V2Landing` as homepage
- Equal issuer/developer hero
- Analytics vendor wiring without privacy decision
- Wholesale Aceternity/Magic UI theme adoption
- Deleting archived legacy trees without a dedicated cleanup plan
- Claiming real credential mint/verify from illustrative demos

## Recommended reading order for the future implementation plan author

1. [../decisions/2026-07-21-concept-direction.md](../decisions/2026-07-21-concept-direction.md)
2. [../decisions/2026-07-21-keep-reuse-archive.md](../decisions/2026-07-21-keep-reuse-archive.md)
3. [../audits/2026-07-21-audit-index-and-disposition-map.md](../../archive/landing-page-excellence/audits/2026-07-21-audit-index-and-disposition-map.md)
4. [../audits/2026-07-21-funnel-and-cta-inventory.md](../../archive/landing-page-excellence/audits/2026-07-21-funnel-and-cta-inventory.md)
5. [../requirements/README.md](../requirements/README.md)
6. [../research/shortlists/adoption-matrix.md](../research/shortlists/adoption-matrix.md)
7. [../research/shortlists/rejected-and-cautions.md](../research/shortlists/rejected-and-cautions.md)
8. [2026-07-21-design-strategy.md](2026-07-21-design-strategy.md)
9. [work-breakdown.md](work-breakdown.md) — treat remaining rows as backlog, not active coding tasks
10. [../agent-briefs/shared-context.md](../agent-briefs/shared-context.md)

## Suggested shape of the later implementation plan

When you create it, prefer:

1. **Scope freeze** — Concept A only; list in/out.
2. **Evidence baseline** — isolated `yarn build` + Lighthouse/a11y before visual work.
3. **P0 structural/link/copy truth** slice with acceptance tests from requirements IDs.
4. **P1 conversion/SEO** slice.
5. **P1 performance/motion** slice.
6. **Optional craft** slice (≤2 evaluated motion components), gated by brand + reduced-motion + budget.
7. **Measurement** slice only after privacy approval.
8. **Rollback** per [rollout-and-rollback.md](rollout-and-rollback.md).

## Catalog counts (research deliverables)

| Catalog | Accepted | Location |
|---|---:|---|
| GitHub AI resources | 75 | `docs/archive/landing-page-excellence/research/github-ai-resources/` |
| UI/UX websites/tools | 87 | `docs/archive/landing-page-excellence/research/ui-ux-resources/` |
| GitHub shortlist | 13 | `research/shortlists/github-ai-shortlist.md` |
| UI/UX shortlist | 15 | `research/shortlists/ui-ux-shortlist.md` |

## Open owner decisions (document before coding resumes)

1. Approve or amend requirements package status → `approved`.
2. Confirm `/show-me` remains indexable (SEO-01).
3. Approve privacy/event contract before analytics (TECH-01).
4. Confirm whether structural commits already on `dev` are kept, reverted, or re-done under the new plan.
5. Assign primary KPI owner for issuer path-selection vs developer secondary monitoring.
