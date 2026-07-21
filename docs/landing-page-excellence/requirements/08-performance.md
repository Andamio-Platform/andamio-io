# 08 — Performance

- **Status:** in-review
- **Baseline caveat:** local unthrottled diagnostics are non-representative

## PERF-01 — Route JS budgets

| Field | Value |
|---|---|
| Priority | P1 |
| Rationale | Full hydration; `/` at 160 kB first-load JS |
| Acceptance test | After isolated `next build`, first-load JS ≤160 kB `/`, ≤175 kB `/issuer`, ≤180 kB `/show-me`, shared ≤125 kB — or budgets ratified with evidence + adopted exception |
| Dependencies | clean build (no concurrent `.next` corruption) |
| Source | performance audit PERF-F02 |

## PERF-02 — Field Core Web Vitals

| Field | Value |
|---|---|
| Priority | P1 |
| Rationale | Real p75 unknown |
| Acceptance test | Privacy-reviewed field telemetry reports p75 LCP ≤2.5 s, INP ≤200 ms, CLS ≤0.1 by route/device when sample sufficient; until then lab gates apply |
| Dependencies | TECH-01 |
| Source | performance PERF-F01; audit index |

## PERF-03 — Bounded font loading

| Field | Value |
|---|---|
| Priority | P1 |
| Rationale | Broad Google Fonts import |
| Acceptance test | Inventory used families/weights; load only Warm Index needs (Inter + JetBrains Mono subset); evaluate Fontsource self-host; remove unused families from critical path |
| Dependencies | VIS-04 |
| Source | performance PERF-F03; ui-ux Fontsource evaluate |

## PERF-04 — LCP asset hygiene

| Field | Value |
|---|---|
| Priority | P1 |
| Rationale | Hero badge/logo payload affects LCP |
| Acceptance test | Critical SVGs optimized (SVGOMG or equivalent) without visual regression; LCP element identified per route in Lighthouse evidence |
| Dependencies | VIS-02 |
| Source | ui-ux SVGOMG; performance asset section |

## PERF-05 — Lab Lighthouse floor

| Field | Value |
|---|---|
| Priority | P1 |
| Rationale | Release quality floor |
| Acceptance test | Median of 3 cold mobile-profile Lighthouse runs ≥90 for Performance, Accessibility, Best Practices, SEO on `/`, `/issuer`, `/show-me` |
| Dependencies | PERF-01, PERF-03, A11Y-05, SEO-04 |
| Source | audit quality targets; adoption-matrix Lighthouse |

## PERF-06 — Single toaster system

| Field | Value |
|---|---|
| Priority | P2 |
| Rationale | Duplicate global toasters add JS |
| Acceptance test | Pages Router mounts one notification system; other removed or lazy-gated off funnel |
| Dependencies | ARCH decision at implement |
| Source | performance PERF-F04 |
