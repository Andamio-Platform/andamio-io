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
- `package.json` has no test script. Playwright is a dev dependency, but no automated suite/config was found.
- `.github/workflows/vercel-deploy.yml` is an existing manual `workflow_dispatch` production deployment workflow. It checks out, sets up Node 18, runs `vercel build --prod`, and deploys the prebuilt artifact; it does not run repository lint, type, test, route, link, accessibility, Lighthouse, or conversion gates.
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

### SEO-F03 — Social assets tracked locally; production rendering unverified

- **Severity:** P2 verification gap
- **Observed:** `src/lib/seo.ts` references `/andamio.png`; `git ls-files` proves `public/andamio.png`, `public/andamio-credential-badge.svg`, and referenced logo SVGs are tracked. Local probes returned 200 with image MIME types.
- **Risk:** production social-card dimensions, caching, and rendering have not been checked.
- **Next step:** `REQ-SEO-03` — verify deployed image status, MIME type, dimensions, cache headers, absolute URL, and social-card rendering. There is no observed broken-asset finding.

### ANALYTICS-F01 — No conversion analytics

- **Severity:** P1
- **Risk:** issuer/developer path selection, CTA performance, and funnel loss are unknown.
- **Requirement seed:** `REQ-AN-01` — approve privacy, consent, retention, ownership, and event schema before adding analytics. Use the vocabulary in [`2026-07-21-funnel-and-cta-inventory.md`](2026-07-21-funnel-and-cta-inventory.md).

### TEST-F01 — Manual deployment exists without quality gates

- **Severity:** P1
- **Observed:** `.github/workflows/vercel-deploy.yml` manually builds and deploys production artifacts, but has no repository quality-check steps.
- **Risk:** routes, links, accessibility, metadata, and core journeys can regress while deployment still succeeds.
- **Requirement seed:** `REQ-TEST-01` — gate production changes on build, lint/type checks, route smoke tests, internal link checks, and critical funnel end-to-end checks.

### TEST-F02 — No performance/accessibility release gate

- **Severity:** P1
- **Requirement seed:** `REQ-TEST-02` — add reproducible Lighthouse/accessibility budgets and retain reports as release evidence.

### LINK-F01 — API host and external-link registry drift

- **Severity:** P1
- **Observed:** canonical content uses `api.andamio.io/reference`; `src/lib/external-links.ts` uses `dev.api.andamio.io/reference`.
- **Requirement seed:** `REQ-LINK-01` — one registry, approved host ownership, and scheduled synthetic checks.

## Quality gate and SEO acceptance

- Lighthouse and JavaScript budgets use the route-specific profile in [`2026-07-21-performance-baseline.md`](2026-07-21-performance-baseline.md).
- Field p75 LCP ≤2.5 s, INP ≤200 ms, CLS ≤0.1 when sufficient representative field data exists.
- WCAG 2.2 AA acceptance plus keyboard, reduced-motion, and 320 px reflow checks.
- `/`, `/issuer`, and `/show-me` each return the intended non-error response in an isolated production-mode run; no required internal or external link is broken, and intentional redirects are asserted.
- Every canonical route has a unique, non-empty title and description, one absolute self-canonical, matching Open Graph/X metadata, and the intended robots directive.
- `/show-me` has an explicit adopted indexability decision: either it appears in `src/app/sitemap.ts` and the generated sitemap, or it carries an intentional `noindex` policy and is excluded. Omission without policy fails.
- `robots.txt` references the canonical sitemap; sitemap URLs use the production origin and return the intended status.
- Organization JSON-LD parses and validates with the verified official social identity; social image URLs return 200 image responses and pass preview checks.
- Critical issuer and developer ladder paths run in CI without collecting sensitive data.
- Proposed conversion thresholds are defined in [`2026-07-21-funnel-and-cta-inventory.md`](2026-07-21-funnel-and-cta-inventory.md) and remain non-gating until a privacy-approved analytics baseline exists.

## Unknown or unverified

- Search Console, production robots/sitemap, indexed URLs, structured-data validation, social-card previews, outbound link status, CI outside this repository, and field CWV were not inspected.
- Local HTTP 200 verifies route availability only, not content correctness, accessibility, or production parity.
- A final 2026-07-21 localhost recheck returned 500 for page routes because concurrent build/dev tooling shared and mutated `.next`; sitemap and critical assets still returned 200. This was tooling interference, not an application failure or route-health result.
