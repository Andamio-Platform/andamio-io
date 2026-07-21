# SEO, analytics, and testing baseline audit

- **Date:** 2026-07-21
- **Status:** complete
- **Canonical commit:** `0890cc35a233f81efa2c33310b9b0f8c70fc7cb5`
- **Scope:** canonical funnel metadata, sitemap/robots, measurement, and quality gates
- **Method:** source/config inspection, production build, and localhost HTTP probes
- **Owner:** Landing Excellence Program

## Verified baseline

- `yarn build` succeeds.
- `/`, `/issuer`, `/show-me`, `/developers`, and `/sitemap.xml` returned HTTP 200 on localhost.
- Pages Router routes receive title, description, canonical, Open Graph, and X/Twitter metadata through `Metatags`.
- `/` includes Organization JSON-LD.
- `robots.ts` references the sitemap.
- `/show-me` is not present in `STATIC_ROUTES` in `src/app/sitemap.ts`.
- `package.json` has no test script. Playwright is a dev dependency, but no automated suite/config or CI quality gate was found.
- No product analytics integration was found.

## Findings

### SEO-F01 — `/show-me` missing from sitemap

- **Severity:** P1
- **Risk:** the canonical narrative entry is discoverable through links but omitted from the declared crawl inventory.
- **Requirement seed:** `REQ-SEO-01` — explicitly decide indexability; if indexable, include `/show-me` with valid canonical/metadata, otherwise apply an intentional noindex policy and document why.

### SEO-F02 — Social identity drift

- **Severity:** P1
- **Observed:** metadata uses `@AndamioPlatform` and Organization JSON-LD links to `x.com/AndamioPlatform`; navigation/content links use `x.com/andamio_teams`; contact copy also uses `@AndamioPlatform`.
- **Risk:** inconsistent identity and potentially invalid structured/social references.
- **Requirement seed:** `REQ-SEO-02` — verify the official handle and centralize it across metadata, JSON-LD, contact, and footer.

### SEO-F03 — Supplied missing-asset claim is contradicted locally

- **Severity:** P0 evidence-integrity discrepancy
- **Supplied evidence:** the Phase 1 brief says the tracked `public` directory lacks referenced `andamio.png`, `andamio-credential-badge.svg`, and logo SVGs.
- **Observed:** `src/lib/seo.ts` references `/andamio.png`; current Git `HEAD` tracks `public/andamio.png` and localhost returns 200. Git also tracks `public/andamio-credential-badge.svg` and the referenced logo SVGs.
- **Risk:** a different deployment artifact may still omit it, but that is unverified.
- **Next step:** `REQ-SEO-03` — keep this P0 evidence discrepancy release-blocking until the exact deployed image responses, MIME types, dimensions, cache headers, and social-card rendering are verified. A confirmed production absence remains P0.

### ANALYTICS-F01 — No conversion analytics

- **Severity:** P1
- **Risk:** issuer/developer path selection, CTA performance, and funnel loss are unknown.
- **Requirement seed:** `REQ-AN-01` — approve privacy, consent, retention, ownership, and event schema before adding analytics. Use the vocabulary in [`2026-07-21-funnel-and-cta-inventory.md`](2026-07-21-funnel-and-cta-inventory.md).

### TEST-F01 — No automated suite or CI quality gate

- **Severity:** P1
- **Risk:** routes, links, accessibility, metadata, and core journeys can regress silently.
- **Requirement seed:** `REQ-TEST-01` — gate production changes on build, lint/type checks, route smoke tests, internal link checks, and critical funnel end-to-end checks.

### TEST-F02 — No performance/accessibility release gate

- **Severity:** P1
- **Requirement seed:** `REQ-TEST-02` — add reproducible Lighthouse/accessibility budgets and retain reports as release evidence.

### LINK-F01 — API host and external-link registry drift

- **Severity:** P1
- **Observed:** canonical content uses `api.andamio.io/reference`; `src/lib/external-links.ts` uses `dev.api.andamio.io/reference`.
- **Requirement seed:** `REQ-LINK-01` — one registry, approved host ownership, and scheduled synthetic checks.

## Quality gate seeds

- Lighthouse category scores ≥90, including performance.
- Field p75 LCP ≤2.5 s, INP ≤200 ms, CLS ≤0.1 when sufficient field data exists.
- WCAG 2.2 AA acceptance plus keyboard, reduced-motion, and 320 px reflow checks.
- No broken required links; intentional redirects are asserted.
- Metadata/canonical/sitemap tests cover `/`, `/issuer`, and the chosen `/show-me` index policy.
- Critical issuer and developer ladder paths run in CI without collecting sensitive data.

## Unknown or unverified

- Search Console, production robots/sitemap, indexed URLs, structured-data validation, social-card previews, outbound link status, CI outside this repository, and field CWV were not inspected.
- Local HTTP 200 verifies route availability only, not content correctness, accessibility, or production parity.
- A final 2026-07-21 localhost HEAD recheck returned 500 for the page routes while `/sitemap.xml` and critical image assets still returned 200. Treat the running dev server as unstable and the final page-route recheck as inconclusive; the earlier 200 observations remain time-bounded evidence.
