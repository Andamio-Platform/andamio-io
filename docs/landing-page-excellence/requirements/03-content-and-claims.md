# 03 — Content and Claims

- **Status:** in-review
- **Canonical copy file:** `src/ui/explore/content.ts` (production import despite path)

## CNT-01 — Product truth language

| Field | Value |
|---|---|
| Priority | P0 |
| Rationale | Issuers must understand permanent, useful, owned, verifiable credentials |
| Acceptance test | Homepage and `/show-me` issuer path state ownership/proof outcomes without requiring blockchain literacy in the first two beats |
| Dependencies | AUD-01 |
| Source | funnel L0; Concept A |

## CNT-02 — Illustrative demo claims only

| Field | Value |
|---|---|
| Priority | P0 |
| Rationale | Issue/Verify actions are local UI, not backend success |
| Acceptance test | Copy/UI near HowItWorks Issue/Verify does not claim real credential issuance or verification; analytics (when added) uses illustrative predicates only |
| Dependencies | UX-04 |
| Source | funnel audit issuer demo notes; rejected-and-cautions |

## CNT-03 — Walkthrough is L3 intent, not L4 completion

| Field | Value |
|---|---|
| Priority | P1 |
| Rationale | `mailto:` launches are intent signals |
| Acceptance test | Marketing copy does not claim “booked” or “submitted” from mailto alone; L4 language reserved for owned confirmation flow (future) |
| Dependencies | CNT-01 |
| Source | funnel conversion ladder |

## CNT-04 — Discord dilution check

| Field | Value |
|---|---|
| Priority | P2 |
| Rationale | Duplicate Discord CTAs may dilute issuer conversion |
| Acceptance test | After privacy-approved baseline, compare issuer walkthrough CTR with/without Discord as closing primary; change only with evidence |
| Dependencies | TECH analytics |
| Source | funnel FUN-F04 |

## CNT-05 — Canonical content ownership clarity

| Field | Value |
|---|---|
| Priority | P1 |
| Rationale | `explore/content.ts` looks experimental but is authoritative |
| Acceptance test | Docs and briefs label `content.ts` as canonical; any move/facade lands with import map and no duplicate sources of truth |
| Dependencies | UX-01 |
| Source | architecture ARCH-F02 |
