# 02 — Information Architecture

- **Status:** in-review
- **Routes in scope:** `/`, `/show-me`, `/issuer`, `/developers`

## UX-01 — Canonical funnel ownership

| Field | Value |
|---|---|
| Priority | P0 |
| Rationale | One implementation authority prevents legacy revival |
| Acceptance test | Production composition for `/`, `/show-me`, `/issuer` remains under `src/ui/system`; no new imports from archived V2 walkthrough / ModernLanding / SB7 without a new decision |
| Dependencies | keep/reuse/archive adopted |
| Source | decision/keep-reuse-archive; architecture audit |

## UX-02 — Homepage section jobs (Concept A)

| Field | Value |
|---|---|
| Priority | P0 |
| Rationale | One job per section; hero budget discipline |
| Acceptance test | `/` first viewport contains only brand, one headline, one support sentence, one CTA group, one dominant specimen plane — no stats strip, schedule, or card grid in hero |
| Dependencies | AUD-01, VIS-* |
| Source | design-strategy Concept A; frontend design rules |

## UX-03 — CTA hierarchy

| Field | Value |
|---|---|
| Priority | P0 |
| Rationale | Issuer conversion ladder must outrank community CTAs |
| Acceptance test | Stable IDs preserve ladder: Show me / issuer evaluation → walkthrough or Start issuing → developer resources → Discord; closing Discord is not the sole primary CTA |
| Dependencies | AUD-01 |
| Source | funnel audit CTA inventory; design-strategy |

## UX-04 — `/issuer` proof demo remains authoritative

| Field | Value |
|---|---|
| Priority | P0 |
| Rationale | HowItWorks + BadgeBuilder is the issuer evaluation surface |
| Acceptance test | `/issuer` exposes Define/Issue/Verify and BadgeBuilder; deep link `/issuer#how-it-works` scrolls to the demo; V2 walkthrough is not wired as replacement |
| Dependencies | UX-01 |
| Source | keep/reuse/archive; architecture ARCH-02 |

## UX-05 — `/show-me` continuation and recovery

| Field | Value |
|---|---|
| Priority | P1 |
| Rationale | Users must complete or exit without dead ends |
| Acceptance test | Every door has a path to an enabled exit or recovery (back to doors / close home); Escape and Close return to `/` |
| Dependencies | AUD-03 |
| Source | funnel REQ-CONV-03 seed |

## UX-06 — `/developers` secondary IA

| Field | Value |
|---|---|
| Priority | P1 |
| Rationale | Builders need a stable home without homepage takeover |
| Acceptance test | Nav and `/show-me` builder exits reach `/developers` or approved docs/API; homepage does not lead with API/CLI |
| Dependencies | AUD-02 |
| Source | Concept A; funnel developer ladder |

## UX-07 — Single external-link registry

| Field | Value |
|---|---|
| Priority | P1 |
| Rationale | API host drift sends users to different destinations |
| Acceptance test | One approved registry owns API Reference and other outbound constants; `content.ts` and `external-links.ts` no longer disagree on host |
| Dependencies | TECH link ownership decision at implement time |
| Source | architecture ARCH-F03; SEO LINK-F01 |
