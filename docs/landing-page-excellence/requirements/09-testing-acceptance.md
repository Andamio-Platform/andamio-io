# 09 — Testing and Acceptance

- **Status:** in-review
- **Tools:** Playwright, axe-core, Lighthouse, reg-suit (adopt-now)

## QA-01 — Build/lint/type gate

| Field | Value |
|---|---|
| Priority | P0 |
| Rationale | Deploy workflow lacks quality checks |
| Acceptance test | Landing changes require successful `yarn build` and `yarn next:lint` (plus project typecheck if configured) before merge/release |
| Dependencies | none |
| Source | SEO TEST-F01 |

## QA-02 — Route and link smoke

| Field | Value |
|---|---|
| Priority | P0 |
| Rationale | Funnel must stay reachable |
| Acceptance test | Isolated production-mode run: `/`, `/show-me`, `/issuer`, `/developers` return intended non-error status; critical internal links and approved external registry links not broken |
| Dependencies | TECH-02 |
| Source | SEO acceptance; Playwright shortlist |

## QA-03 — Critical funnel E2E

| Field | Value |
|---|---|
| Priority | P1 |
| Rationale | Issuer ladder is the product path |
| Acceptance test | Playwright covers: `/` → `/show-me` issuer door → `/issuer`; `/` → `/issuer` HowItWorks step change; walkthrough mailto href present; developer path `/` → `/developers` or docs link |
| Dependencies | UX-03..05 |
| Source | funnel audit; TEST-F01 |

## QA-04 — Accessibility automated + manual evidence

| Field | Value |
|---|---|
| Priority | P0 |
| Rationale | No a11y gate today |
| Acceptance test | axe (or Playwright+axe) clean of Serious/Critical on funnel routes; manual keyboard + one screen-reader pass recorded for `/issuer` tabs and `/show-me` |
| Dependencies | A11Y-01..05 |
| Source | a11y A11Y-F05; TEST-F02 |

## QA-05 — Lighthouse evidence retention

| Field | Value |
|---|---|
| Priority | P1 |
| Rationale | Budgets need reproducible artifacts |
| Acceptance test | Retain all JSON/HTML for 3 runs × 3 routes; gate on median; corrupted `.next` runs marked invalid |
| Dependencies | PERF-05 |
| Source | performance baseline profile |

## QA-06 — Visual regression on key surfaces

| Field | Value |
|---|---|
| Priority | P2 |
| Rationale | Brand regressions are easy in kit restyles |
| Acceptance test | Baselines for `/` hero, `/issuer` demo, `/show-me` doors; reg-suit or `yarn shoot` diff reviewed on UI PRs |
| Dependencies | VIS-* |
| Source | adoption-matrix reg-suit |

## QA-07 — Analytics non-collection check

| Field | Value |
|---|---|
| Priority | P1 |
| Rationale | Prevent sensitive payload leaks |
| Acceptance test | If analytics lands, fixture tests assert payloads exclude badge/wallet/email/free-text fields |
| Dependencies | TECH-01 |
| Source | funnel privacy rules |

## Package acceptance (prototype gate)

Prototype approval requires documented review that Concept A hierarchy, Warm Index, and P0 requirements are satisfiable in comps/prototype — not full QA-01..07 completion. Implementation release requires QA-01..05 pass.
