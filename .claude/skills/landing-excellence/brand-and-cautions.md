# Proof instrument brand + rejected patterns

Direction: `docs/landing-page-excellence/decisions/2026-09-30-proof-instrument-dark.md` (supersedes Warm Index)  
Tokens: `src/ui/system/tokens.ts`, `kit.tsx`, `src/ui/system/instrument/*`  
Badge: `src/ui/system/proof-badge/*`, `src/styles/proof-badge.css`

## Brand DNA (marketing)

- Surface: dark only, in the badge palette — deep navy page, raised navy surfaces, cream text
- Cyan explains (links, data, focus); orange acts (**one orange primary per view**)
- Type: Inter + JetBrains Mono
- Geometry: square corners; structure from ticks, arcs and monospace readouts
- Every decorative mark encodes something real (hash, date, count)
- Only the hero badge moves continuously; everything else is scroll, hover or interaction
- Brand test: if the first viewport could belong to another brand after removing nav, branding is too weak

## Rejected by default

| Pattern | Safer alternative |
|---|---|
| Neon, purple glow, glass orbs, gradient text | Badge palette; cyan/orange from the rings only |
| Three-icon feature grids, stat strips | `ProofCard`, `Readout`, `OrbitSteps` |
| Wholesale Launch UI / Magic UI / Aceternity look | Steal section jobs only; restyle every pixel |
| Heavy Three.js / WebGL hero | Live CSS/SVG badge |
| Claim inflation (demo = live mint/verify) | Label illustrative |
| Unbounded Google Fonts growth | Bound Inter + JetBrains Mono |
| Analytics on badge/wallet/email/free text | Umami enum events only |
| Adoption numbers for partners that have not published them | Public facts only |

## Soft cautions (gated)

- ≤ **1–2** evaluated micro-interactions from Magic UI / React Bits; must pass reduced-motion + Lighthouse
- Credly/Accredible: journey insight only — differentiate ownership/proof; no clone
