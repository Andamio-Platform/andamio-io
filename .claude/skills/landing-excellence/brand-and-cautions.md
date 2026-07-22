# Warm Index + rejected patterns

Brand canon: `docs/design-system/andamio-brand-guide.md`  
Tokens: `src/ui/system/tokens.ts`, `kit.tsx`  
Cautions: `docs/landing-page-excellence/research/shortlists/rejected-and-cautions.md`

## Brand DNA (marketing)

- Surface: ink on paper (light editorial), not dark-mode-first marketing
- Orange `#FF6B35` — primary CTA / accent sparingly (**one orange primary per view**)
- Blue `#2F6BFF` — wayfinding / data only, not primary CTA
- Type: Inter + JetBrains Mono
- Geometry: square corners; editorial rail optional on desktop
- Brand test: if the first viewport could belong to another brand after removing nav, branding is too weak

## Rejected by default

| Pattern | Safer alternative |
|---|---|
| Neon dark SaaS, purple glow, glass orbs | Light editorial; Warm Index tokens |
| Wholesale Launch UI / Magic UI / Aceternity look | Steal section jobs only; restyle every pixel |
| Heavy Three.js / WebGL hero | SVG/static specimen + Motion; 3D needs adopted exception |
| V2 / ModernLanding / SB7 as authority | Canonical `src/ui/system` |
| Claim inflation (demo = live mint/verify) | Label illustrative; L4 only from owned confirmation |
| Unbounded Google Fonts growth | Bound Inter + JetBrains Mono; evaluate Fontsource |
| Analytics on badge/wallet/email/free text | Event IDs + non-sensitive enums after privacy approval |
| Unknown-license agent skills | Verified MIT/Apache from shortlist; local fallback |

## Soft cautions (gated)

- ≤ **1–2** evaluated micro-interactions from Magic UI / React Bits; must pass reduced-motion + Lighthouse
- Storybook only if kit review cost is justified
- Credly/Accredible: journey insight only — differentiate ownership/proof; no clone
