# Work Breakdown — Phased Tasks

- **as_of:** `2026-07-21`
- **Status:** planned
- **Next gate:** prototype approval (after ux/copy/ui-design)

## Phase 0 — Docs complete (this package)

- [x] Research catalogs + shortlists
- [x] Baseline audits + keep/reuse/archive
- [x] Adoption matrix + rejected patterns
- [x] Design strategy + Concept A decision
- [x] Requirements + agent briefs + implementation planning
- [ ] **Gate:** prototype approval recorded

## Phase 1 — Strategy and prototype (no production code required)

| Task | Owner brief | Reqs | Done when |
|---|---|---|---|
| Section-job + CTA wireframes | ux-strategy | AUD/UX | Checklist signed |
| Copy deck + claim register | conversion-copy | CNT | Review signed |
| Desktop/mobile comps | ui-design | VIS | Prototype approval accept/reject |

## Phase 2 — Structural quality (can start on approved P0s post-prototype)

| Task | Owner brief | Reqs |
|---|---|---|
| Main landmark + skip link | accessibility / frontend | A11Y-01 |
| HowItWorks tabs pattern | accessibility / frontend | A11Y-02, MOT-03 |
| Keyboard funnel pass | accessibility / qa | A11Y-03 |
| Reduced-motion equivalents | motion / accessibility | MOT-02, A11Y-04 |
| Link registry convergence | frontend / seo | UX-07, TECH-02 |

## Phase 3 — Concept A surface

| Task | Owner brief | Reqs |
|---|---|---|
| Hero budget + brand-first polish | frontend + ui-design | UX-02, VIS-02 |
| CTA hierarchy / closing Discord demotion if needed | frontend + copy | UX-03, CNT-04 |
| `/show-me` continuation QA | frontend + qa | UX-05 |
| Issuer demo copy truth | copy + frontend | CNT-02 |
| Motion intentional set | motion | MOT-01 |

## Phase 4 — Perf / SEO / measure

| Task | Owner brief | Reqs |
|---|---|---|
| Font bounding (± Fontsource) | performance | PERF-03 |
| SVG LCP hygiene | performance | PERF-04 |
| Isolated Lighthouse baseline + budgets | performance + qa | PERF-01, PERF-05, QA-05 |
| `/show-me` index policy decision + implement | seo | SEO-01 |
| Social identity centralize | seo | SEO-02 |
| Privacy-approved analytics plan/impl | seo | TECH-01, QA-07 |

## Phase 5 — Release gates

| Task | Owner brief | Reqs |
|---|---|---|
| Playwright funnel + a11y smoke | qa | QA-02..04 |
| CI quality steps on deploy path | qa | QA-01 |
| Visual baselines | qa | QA-06 |
| Rollout per [rollout-and-rollback.md](rollout-and-rollback.md) | program | — |

## Parallelism notes

- Phase 2 A11Y-01/02 may proceed immediately after prototype approval even if visual polish continues.
- Do not start TECH-01 instrumentation before privacy sign-off.
- Do not revive V2 walkthrough in any phase without a superseding decision.
