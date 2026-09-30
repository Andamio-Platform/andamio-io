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

## Claims we do not make

Carried forward from the March 2026 messaging review. Each needs new evidence before it returns to copy.

| Do not say | Why / say instead |
|---|---|
| "No blockchain expertise required" | Overpromises. Describe the adoption mode instead: invisible (sponsored transactions) or visible (own wallet). |
| Commission percentages, sponsorship bundle tables | Not finalized |
| "GDPR compliant" | Legal claim needing formal verification. Say "private by design". |
| "Open source" for smart contracts | Contracts are not open source yet. The CLI, bot and app template are. |
| "SDK" as a shipped product | SDK V2 is under development |
| Bearer-token or single-call API examples | Auth is `X-API-Key`; responses are CBOR; minting is build, then sign and submit |
| Exact per-credential costs without an asterisk | Cost depends on transaction complexity and network conditions |
| "Whitepaper" | Banned in copy and routes (2026-07-02). Use "Papers" (`/papers`). |
| "API Docs" | Ambiguous. Use "Docs" or "API Reference". |
| Partner adoption numbers | Only what the partner has published |

## Link rules

- Every cross-site URL comes from `src/lib/external-links.ts`. Never hardcode one in a component.
- Labels: "Docs" (`docs`), "API Reference" (`apiReference`), "Get Started" / "App" (`app`), "GitHub", "Discord".
- Same tab for Andamio docs and the API reference. New tab with `rel="noopener noreferrer"` for the app (wallet context), GitHub, Discord and third-party sites.
- One X handle everywhere: `@Andamio_teams` (`x.com/andamio_teams`).

## Soft cautions (gated)

- ≤ **1–2** evaluated micro-interactions from Magic UI / React Bits; must pass reduced-motion + Lighthouse
- Credly/Accredible: journey insight only — differentiate ownership/proof; no clone
