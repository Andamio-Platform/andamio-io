# 07 — Technical SEO and Analytics

- **Status:** in-review
- **Canonical helpers:** `src/components/site/metatags.tsx`, `src/lib/seo.ts`, `src/app/sitemap.ts`

## SEO-01 — `/show-me` indexability decision

| Field | Value |
|---|---|
| Priority | P1 |
| Rationale | Narrative entry missing from sitemap without policy |
| Acceptance test | Adopted choice recorded: either `/show-me` in sitemap with unique metadata/canonical, or intentional `noindex` + documented exclusion; omission without policy fails |
| Dependencies | Concept A keeps `/show-me` |
| Source | SEO audit SEO-F01 |

## SEO-02 — Official social identity centralized

| Field | Value |
|---|---|
| Priority | P1 |
| Rationale | `@AndamioPlatform` vs `andamio_teams` drift |
| Acceptance test | One verified handle used in Metatags, Organization JSON-LD, footer, and contact copy |
| Dependencies | marketing identity confirmation |
| Source | SEO audit SEO-F02 |

## SEO-03 — Social/OG asset production check

| Field | Value |
|---|---|
| Priority | P2 |
| Rationale | Local assets tracked; production rendering unverified |
| Acceptance test | Deployed `/andamio.png` (and referenced logos) return 200 image MIME, expected dimensions, and pass preview checks |
| Dependencies | release environment |
| Source | SEO audit SEO-F03 |

## SEO-04 — Unique metadata per canonical route

| Field | Value |
|---|---|
| Priority | P1 |
| Rationale | Indexable routes need distinct titles/descriptions |
| Acceptance test | `/`, `/issuer`, `/show-me`, `/developers` each have non-empty unique title/description, absolute self-canonical, matching OG/Twitter tags, intended robots directive |
| Dependencies | SEO-01 for `/show-me` policy |
| Source | SEO acceptance block |

## TECH-01 — Privacy-approved analytics contract

| Field | Value |
|---|---|
| Priority | P1 |
| Rationale | No measurement exists; must not collect sensitive payloads |
| Acceptance test | Before any analytics code: privacy/consent/retention/ownership approved; event vocabulary matches funnel audit; no badge inputs, wallet/credential addresses, email body, or free text |
| Dependencies | legal/privacy owner |
| Source | funnel event contract; SEO ANALYTICS-F01 |

## TECH-02 — Link registry and host ownership

| Field | Value |
|---|---|
| Priority | P1 |
| Rationale | API reference host drift |
| Acceptance test | Same as UX-07; synthetic check fails CI if registry disagrees with live content constants |
| Dependencies | UX-07 |
| Source | LINK-F01 |

## TECH-03 — Content path facade or relocation plan

| Field | Value |
|---|---|
| Priority | P2 |
| Rationale | Canonical copy under `explore/` confuses contributors |
| Acceptance test | Either relocate with redirects/imports updated, or document facade in component-map and shared-context; single source remains |
| Dependencies | CNT-05 |
| Source | ARCH-F02 |
