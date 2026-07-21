# 04 — Visual and Brand

- **Status:** in-review
- **Authority:** `src/ui/system/tokens.ts`, `kit.tsx`, Warm Index rules

## VIS-01 — Warm Index accent discipline

| Field | Value |
|---|---|
| Priority | P0 |
| Rationale | Orange is brand signal; overuse becomes generic SaaS |
| Acceptance test | Orange limited to brand mark, primary CTA, live/VERIFIED signals; blue only for wayfinding/links/data; no purple-glow or neon kit defaults on funnel routes |
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
| Acceptance test | Funnel routes do not introduce rounded-full pill clusters or alternate display fonts as brand defaults; type comes from bounded Warm Index families |
| Dependencies | PERF font bounding |
| Source | tokens/Warm Index |

## VIS-05 — Contrast for orange/blue on paper

| Field | Value |
|---|---|
| Priority | P1 |
| Rationale | Brand accents risk AA contrast failures |
| Acceptance test | WebAIM (or equivalent) passes for text/icon uses of orange and blue on paper/ink contexts used in CTAs and links; failures remediated or documented via decision |
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
