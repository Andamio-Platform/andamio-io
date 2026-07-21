# 05 — Motion and Interaction

- **Status:** in-review
- **Stack:** Motion (framer-motion lineage) already present

## MOT-01 — Intentional motion budget

| Field | Value |
|---|---|
| Priority | P1 |
| Rationale | Presence and hierarchy, not noise |
| Acceptance test | Funnel ships ≥2 and ≤5 intentional motions (e.g. specimen reveal, section reveal, focus/hover feedback); no continuous decorative particle/3D loops |
| Dependencies | VIS-02 |
| Source | design rules; ui-ux shortlist Motion |

## MOT-02 — Reduced-motion equivalent

| Field | Value |
|---|---|
| Priority | P0 |
| Rationale | Motion-sensitive users must keep state and comprehension |
| Acceptance test | With `prefers-reduced-motion: reduce`, nonessential animation stops; `/`, `/show-me`, `/issuer` remain operable; pulse/live indicators have static equivalent |
| Dependencies | A11Y-04 |
| Source | a11y audit A11Y-F04; MDN shortlist |

## MOT-03 — HowItWorks interaction model

| Field | Value |
|---|---|
| Priority | P1 |
| Rationale | Define/Issue/Verify is the core issuer evaluation interaction |
| Acceptance test | Step changes are keyboard-operable, announce selection, and do not require hover; illustrative actions complete local state only |
| Dependencies | A11Y-02, CNT-02 |
| Source | funnel issuer demo; a11y tabs finding |

## MOT-04 — Micro-interaction trial limit

| Field | Value |
|---|---|
| Priority | P2 |
| Rationale | Magic UI / React Bits risk perf and brand |
| Acceptance test | At most two evaluate-bucket micro-interactions enter prototype; each passes MOT-02 and PERF budgets or is removed |
| Dependencies | adoption-matrix evaluate |
| Source | ui-ux shortlist recommendation |

## MOT-05 — No default Three.js hero

| Field | Value |
|---|---|
| Priority | P0 |
| Rationale | Heavy WebGL heroes rejected for LCP/a11y |
| Acceptance test | Canonical hero uses specimen/SVG/static+Motion path; no Three.js/WebGL dependency on `/` without a superseding decision |
| Dependencies | rejected-and-cautions |
| Source | rejected-and-cautions; Concept A |
