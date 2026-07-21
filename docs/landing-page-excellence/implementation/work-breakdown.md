# Work Breakdown — Phased Tasks

- **as_of:** `2026-07-21`
- **Status:** in progress — Phase 2 structural started
- **Next gate:** Phase 1 comps / remaining Phase 2 keyboard + motion; Phase 5 release
- **Prototype approval:** [../decisions/2026-07-21-prototype-approval.md](../decisions/2026-07-21-prototype-approval.md) (`adopted`)

## Phase 0 — Docs complete (this package)

- [x] Research catalogs + shortlists
- [x] Baseline audits + keep/reuse/archive
- [x] Adoption matrix + rejected patterns
- [x] Design strategy + Concept A decision
- [x] Requirements + agent briefs + implementation planning
- [x] **Gate:** prototype approval recorded

## Phase 1 — Strategy and prototype (no production code required)

| Task | Owner brief | Reqs | Done when |
|---|---|---|---|
| Section-job + CTA wireframes | ux-strategy | AUD/UX | Checklist signed |
| Copy deck + claim register | conversion-copy | CNT | Review signed |
| Desktop/mobile comps | ui-design | VIS | Prototype approval accept/reject |

> Note: Concept A prototype approval for **structural** P0/P1 landed ahead of full comps (see decision). Isolated shell: `/explore/concept-a`.

## Phase 2 — Structural quality (can start on approved P0s post-prototype)

| Task | Owner brief | Reqs | Status |
|---|---|---|---|
| Main landmark + skip link | accessibility / frontend | A11Y-01 | **done** — `Page` in `kit.tsx` |
| HowItWorks tabs pattern | accessibility / frontend | A11Y-02, MOT-03 | **done** (tabs a11y); MOT-03 still open if needed |
| Keyboard funnel pass | accessibility / qa | A11Y-03 | pending |
| Reduced-motion equivalents | motion / accessibility | MOT-02, A11Y-04 | pending |
| Link registry convergence | frontend / seo | UX-07, TECH-02 | pending |
| `/show-me` sitemap (SEO-01 slice) | seo / frontend | SEO-01 | **done** — `STATIC_ROUTES` |

## Phase 3 — Concept A surface

| Task | Owner brief | Reqs | Status |
|---|---|---|---|
| Hero budget + brand-first polish | frontend + ui-design | UX-02, VIS-02 | pending |
| CTA hierarchy / closing Discord demotion if needed | frontend + copy | UX-03, CNT-04 | **done** (closing CTA hierarchy on `AndamioLanding`) |
| `/show-me` continuation QA | frontend + qa | UX-05 | pending |
| Issuer demo copy truth | copy + frontend | CNT-02 | pending |
| Motion intentional set | motion | MOT-01 | pending |

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
