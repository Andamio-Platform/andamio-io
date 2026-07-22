# Work Breakdown — Phased Tasks (Backlog)

- **as_of:** `2026-07-22`
- **Status:** **frozen** — documentation complete; no active design/code phases
- **Next gate:** separate implementation plan (see [2026-07-22-recommendations-and-next-steps.md](2026-07-22-recommendations-and-next-steps.md))
- **Prototype / production coding:** cancelled for this program phase; reopen only under a new plan

Rows below are a prioritized backlog, not authorization to code.

## Phase 0 — Docs complete

- [x] Research catalogs + shortlists (75 GitHub AI + 87 UI/UX)
- [x] Baseline audits + keep/reuse/archive
- [x] Adoption matrix + rejected patterns
- [x] Design strategy + Concept A decision
- [x] Requirements + agent briefs + implementation planning docs
- [x] Recommendations and next-steps package
- [x] **Gate:** documentation freeze — implementation deferred

## Phase 1 — Strategy artifacts (docs only; no production code)

| Task | Owner brief | Reqs | Status |
|---|---|---|---|
| Section-job + CTA wireframes | ux-strategy | AUD/UX | backlog (optional before coding) |
| Copy deck + claim register | conversion-copy | CNT | backlog |
| Desktop/mobile comps | ui-design | VIS | backlog |

## Phase 2 — Structural quality

| Task | Owner brief | Reqs | Status |
|---|---|---|---|
| Main landmark + skip link | accessibility / frontend | A11Y-01 | done on `dev` (review in future plan) |
| HowItWorks tabs pattern | accessibility / frontend | A11Y-02 | done on `dev` (review in future plan) |
| Keyboard funnel pass | accessibility / qa | A11Y-03 | backlog |
| Reduced-motion equivalents | motion / accessibility | MOT-02, A11Y-04 | backlog |
| Link registry convergence | frontend / seo | UX-07, TECH-02 | backlog |
| `/show-me` sitemap (SEO-01 slice) | seo / frontend | SEO-01 | done on `dev` (confirm index policy) |

## Phase 3 — Concept A surface

| Task | Owner brief | Reqs | Status |
|---|---|---|---|
| Hero budget + brand-first polish | frontend + ui-design | UX-02, VIS-02 | backlog — **do not start** |
| CTA hierarchy / closing Discord demotion | frontend + copy | UX-03, CNT-04 | done on `dev` (review in future plan) |
| `/show-me` continuation QA | frontend + qa | UX-05 | backlog |
| Issuer demo copy truth | copy + frontend | CNT-02 | backlog |
| Motion intentional set | motion | MOT-01 | backlog — **do not start** |

## Phase 4 — Perf / SEO / measure

| Task | Owner brief | Reqs | Status |
|---|---|---|---|
| Font bounding (± Fontsource) | performance | PERF-03 | backlog |
| SVG LCP hygiene | performance | PERF-04 | backlog |
| Isolated Lighthouse baseline + budgets | performance + qa | PERF-01, PERF-05, QA-05 | backlog |
| `/show-me` index policy decision + implement | seo | SEO-01 | backlog (decision open) |
| Social identity centralize | seo | SEO-02 | backlog |
| Privacy-approved analytics plan/impl | seo | TECH-01, QA-07 | backlog — privacy first |

## Phase 5 — Release gates

| Task | Owner brief | Reqs | Status |
|---|---|---|---|
| Playwright funnel + a11y smoke | qa | QA-02..04 | backlog |
| CI quality steps on deploy path | qa | QA-01 | backlog |
| Visual baselines | qa | QA-06 | backlog |
| Rollout per [rollout-and-rollback.md](rollout-and-rollback.md) | program | — | backlog |

## Constraints while frozen

- Do not start TECH-01 instrumentation before privacy sign-off.
- Do not revive V2 walkthrough without a superseding decision.
- Do not treat Magic UI / Aceternity defaults as brand.
- Optional comps (Phase 1) may be produced as **documents/images only** if useful for the future plan; they are not a green light for production coding.
