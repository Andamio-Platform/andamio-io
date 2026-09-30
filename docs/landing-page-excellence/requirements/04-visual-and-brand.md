# 04 — Visual and Brand

- **Status:** in-review
- **Authority:** `src/ui/system/tokens.ts`, `kit.tsx`, proof-instrument rules (decision 2026-09-30-proof-instrument-dark supersedes Warm Index)

## VIS-01 — Accent discipline (badge palette)

| Field | Value |
|---|---|
| Priority | P0 |
| Rationale | Orange is brand signal; overuse becomes generic SaaS |
| Acceptance test | On the dark navy surface, orange is limited to the primary CTA and live states (one orange action per view); cyan is for links, data and focus; no purple, neon, glass or gradient text on any route |
| Dependencies | Concept A |
| Source | design-system handoff; ui-ux shortlist; rejected-and-cautions |

## VIS-02 — Brand-first first viewport

| Field | Value |
|---|---|
| Priority | P0 |
| Rationale | Brand test: page must still read as Andamio without nav |
| Acceptance test | Andamio wordmark/name is hero-level; headline does not overpower brand; specimen/credential visual is the dominant plane |
| Dependencies | UX-02 |
| Source | frontend design rules; design-strategy |

## VIS-03 — No hero cards or overlay chrome

| Field | Value |
|---|---|
| Priority | P1 |
| Rationale | Cards/badges in hero create dashboard clutter |
| Acceptance test | Hero has no card grid, floating promo chips, or detached stickers on media |
| Dependencies | VIS-02 |
| Source | frontend design rules; rejected patterns |

## VIS-04 — Square geometry and type stack

| Field | Value |
|---|---|
| Priority | P1 |
| Rationale | System DNA uses Inter + JetBrains Mono and square geometry |
| Acceptance test | Funnel routes do not introduce rounded-full pill clusters or alternate display fonts as brand defaults; type comes from bounded Inter + JetBrains Mono |
| Dependencies | PERF font bounding |
| Source | tokens/Warm Index |

## VIS-05 — Contrast for cyan/orange on dark navy

| Field | Value |
|---|---|
| Priority | P1 |
| Rationale | Brand accents risk AA contrast failures |
| Acceptance test | WebAIM (or equivalent) AA passes for cream body text, cyan links and orange CTA text on the navy page and raised surfaces; failures remediated or documented via decision |
| Dependencies | A11Y contrast |
| Source | ui-ux shortlist WebAIM; a11y audit seeds |

## VIS-06 — Borrowed kit structure must be restyled

| Field | Value |
|---|---|
| Priority | P1 |
| Rationale | Launch/Magic/Aceternity defaults break brand |
| Acceptance test | Any evaluated component ships only after token restyle and review against VIS-01..03 |
| Dependencies | adoption-matrix evaluate bucket |
| Source | adoption-matrix; rejected-and-cautions |
