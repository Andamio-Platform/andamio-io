# Phase 1 baseline audit index and disposition map

- **Date:** 2026-07-21
- **Status:** triaged
- **Canonical commit:** `0890cc35a233f81efa2c33310b9b0f8c70fc7cb5`
- **Program:** Andamio Landing Excellence
- **Scope constraint:** documentation only; no application source changes
- **Owner:** Landing Excellence Program

## Audit set

1. [`2026-07-21-current-state-architecture.md`](2026-07-21-current-state-architecture.md) — route ownership, canonical dependencies, legacy boundary, and architecture risks.
2. [`2026-07-21-funnel-and-cta-inventory.md`](2026-07-21-funnel-and-cta-inventory.md) — issuer-primary/developer-secondary ladder, CTA inventory, and event vocabulary.
3. [`2026-07-21-performance-baseline.md`](2026-07-21-performance-baseline.md) — build/local measurements, non-representative caveat, and performance risks.
4. [`2026-07-21-accessibility-responsive-baseline.md`](2026-07-21-accessibility-responsive-baseline.md) — WCAG, keyboard, motion, landmark, tabs, and responsive baseline.
5. [`2026-07-21-seo-analytics-testing-baseline.md`](2026-07-21-seo-analytics-testing-baseline.md) — crawl/metadata, measurement, and quality-gate baseline.
6. [`../decisions/2026-07-21-keep-reuse-archive.md`](../decisions/2026-07-21-keep-reuse-archive.md) — adopted implementation boundary.

## Evidence legend

- **Measured:** build output, trace/transfer measurement, Git object inspection, or HTTP response obtained on 2026-07-21.
- **Observed:** direct but partial desktop browser observation.
- **Source:** conclusion supported by current code/configuration inspection.
- **Risk:** impact inferred from measured/observed/source evidence.
- **Unknown/unverified:** no suitable evidence; must not be represented as passing.

## Disposition map

| Finding | Priority | Evidence | Disposition / seed |
|---|---|---|---|
| Supplied tracked-asset absence claim conflicts with Git `HEAD` and localhost 200s | P0 evidence integrity / release blocker | Supplied + measured | Verify exact production artifact (`REQ-ASSET-01`); confirmed deployment absence remains P0 |
| Missing `/show-me` sitemap entry | P1 | Source | Decide index policy and implement (`REQ-SEO-01`) |
| No analytics | P1 | Source | Approve privacy/event contract first (`REQ-AN-01`) |
| No automated test suite or CI quality gate | P1 | Source | Establish release gates (`REQ-TEST-01`, `REQ-TEST-02`) |
| HowItWorks lacks complete tab semantics/keyboard model | P1 | Source | WCAG tabs pattern (`REQ-A11Y-02`) |
| Canonical Page lacks main landmark and skip link | P1 | Source | Add structural bypass (`REQ-A11Y-01`) |
| Duplicated external-link constants and API host drift | P1 | Source | Consolidate and verify (`REQ-LINK-01`) |
| Social handle drift | P1 | Source | Verify official identity and centralize (`REQ-SEO-02`) |
| Mobile, keyboard, reduced-motion, zoom, full-route checks incomplete | P1 | Unknown | Execute acceptance matrix (`REQ-A11Y-03`, `REQ-A11Y-04`, `REQ-RESP-01`) |
| Broad Google Fonts import | P1 | Source | Inventory and bound loading (`REQ-PERF-03`) |
| Full Pages Router hydration / 160 kB first-load JS | P1 | Measured + source | Profile and budget (`REQ-PERF-01`) |
| No field CWV | P1 | Unknown | Privacy-reviewed field telemetry (`REQ-PERF-02`) |
| Stale docs can override current architecture mentally | P1 | Source | Cross-link current decision and label history (`REQ-DOC-01`) |
| Two global toaster systems | P2 | Source | Select one (`REQ-ARCH-02`) |
| Closing Discord CTA may dilute issuer conversion | P2 | Risk | Validate with approved measurement (`REQ-COPY-01`) |

## Architecture disposition

- **KEEP:** `/show-me`; canonical `/issuer` HowItWorks + BadgeBuilder; current `src/ui/system` production funnel.
- **REUSE:** shared V2 badge core only.
- **ARCHIVE/reference-only:** V2 walkthrough, V2 verifier shell, V2 landing composition, ModernLanding, and SB7 unless explicitly approved by a later adopted decision.

## Phase 2 requirement seeds

- `REQ-ASSET-01`: reconcile the supplied absence claim with Git/deployment evidence; the production artifact contains every referenced critical asset and returns the correct MIME/body, with no required image broken.
- `REQ-CONV-01..03`: preserve issuer-primary hierarchy, define conversion success, and provide story continuation/recovery.
- `REQ-A11Y-01..07`: WCAG 2.2 AA, semantic structure, tabs, keyboard completion, motion, focus, and manual/automated validation.
- `REQ-RESP-01..02`: 320 px no overflow, 400% zoom reflow, and representative viewport/theme coverage.
- `REQ-PERF-01..03`: route budgets, field CWV, and bounded fonts.
- `REQ-SEO-01..03`: `/show-me` index policy, social identity, and production social assets.
- `REQ-AN-01`: privacy-approved event schema without badge, wallet, email, credential, or free-text payloads.
- `REQ-TEST-01..02`: build/type/lint, route/link, funnel, accessibility, and Lighthouse gates.
- `REQ-LINK-01`, `REQ-ARCH-01..02`, `REQ-DOC-01`, `REQ-COPY-01`: consolidate ownership and resolve secondary risks.

## Quality targets

- WCAG 2.2 AA.
- Lighthouse scores ≥90.
- Field p75 LCP ≤2.5 s, INP ≤200 ms, CLS ≤0.1.
- No horizontal overflow at 320 CSS px.
- Complete keyboard operation and an equivalent reduced-motion experience.
- No broken required links.

## Current limitations

Local performance measurements are unthrottled development observations and are explicitly non-representative. Desktop hierarchy was observed, but the browser disconnected before mobile, keyboard, and full-route browser testing. A final localhost HEAD recheck returned 500 for page routes while sitemap and critical assets returned 200, so that running dev-server state was inconclusive. No production deployment, field CWV, outbound-link sweep, analytics property, Search Console, screen reader, or CI platform was verified.
