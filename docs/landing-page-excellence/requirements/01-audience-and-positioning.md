# 01 — Audience and Positioning

- **Status:** in-review
- **Decision:** [Concept A](../decisions/2026-07-21-concept-direction.md)

## AUD-01 — Issuer-primary framing on `/`

| Field | Value |
|---|---|
| Priority | P0 |
| Rationale | Product priority; first viewport must serve credential issuers before builders |
| Acceptance test | On `/` at ≥1024 px: issuer narrative and issuer CTA appear before any developer module; removing nav still reads as Andamio issuer outcome |
| Dependencies | Concept A adopted |
| Source | decision/concept-direction; funnel audit |

## AUD-02 — Developer-secondary progressive depth

| Field | Value |
|---|---|
| Priority | P0 |
| Rationale | Builders need a clear path without competing for hero attention |
| Acceptance test | Developer CTAs on `/` are below-fold or visually quieter than Show me / issuer actions; `/show-me` builder door and `/developers` remain reachable in ≤2 clicks from `/` |
| Dependencies | AUD-01 |
| Source | decision/concept-direction; funnel audit L1 |

## AUD-03 — Self-selection via `/show-me`

| Field | Value |
|---|---|
| Priority | P1 |
| Rationale | Story fork is the canonical orientation tool for mixed traffic |
| Acceptance test | Hero primary CTA reaches `/show-me`; issuer, builder, and curious doors remain distinct; issuer door can complete to `/issuer` without requiring blockchain comfort |
| Dependencies | keep/reuse/archive KEEP `/show-me` |
| Source | audit/funnel; architecture ARCH-01 |

## AUD-04 — Curious/community paths do not redefine primary KPI

| Field | Value |
|---|---|
| Priority | P2 |
| Rationale | Cardano/community exits are valid but must not dilute issuer conversion reporting |
| Acceptance test | KPI docs and future analytics report curious/community separately from issuer-designated L1+ IDs |
| Dependencies | SEO/TECH analytics contract |
| Source | funnel audit KPI predicates |
