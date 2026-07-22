# Tool adoption buckets

Source: `docs/landing-page-excellence/research/shortlists/adoption-matrix.md`

A matrix recommends workflow use. It does **not** authorize application source changes.

| Bucket | Meaning |
|---|---|
| `adopt-now` | Primary deterministic / stack-aligned tool |
| `evaluate` | Bounded trial; restyle; license check; local fallback |
| `reference-only` | Pattern mining; do not install as brand authority |

## adopt-now (prefer)

| Resource | Tasks |
|---|---|
| Playwright (+ `yarn shoot`) | Funnel, keyboard, screenshots |
| Lighthouse | Median of 3 cold mobile runs on `/`, `/issuer`, `/show-me` |
| axe-core | Automated a11y gate |
| Motion | Tokenized motion; honor `prefers-reduced-motion` |
| WebAIM Contrast Checker | Orange/blue on paper/ink |
| SVGOMG | Compress LCP badge/logo SVGs |
| shadcn patterns | Interaction primitives only; restyle to Warm Index |
| github-mcp-server | Repo/PR evidence (least-privilege tokens) |
| Storybook / reg-suit | Optional visual review when cost justified |

## evaluate (bounded)

| Resource | Limit |
|---|---|
| Magic UI / React Bits | ≤2 micro-interactions; no neon defaults |
| Launch UI | Section structure ideas only |
| Aceternity free | Inspiration; reject heavy 3D hero |
| Fontsource | Self-host Inter + JetBrains Mono subset |
| playwright-mcp, context7, superpowers, promptfoo | Agent assist; review output; no secrets/PII |

## reference-only

- Credly / Accredible (differentiate; no clone)
- Lapa Ninja / galleries
- Tailwind defaults as brand (tokens remain authority)
- Community skill dumps until SPDX verified

## Licensing rules

1. Unknown SPDX → `reference-only` until verified
2. Freemium kits → free scope only unless paid license decided; always restyle
3. Never send badge inputs, wallet/credential data, or secrets to external agent providers without an adopted data-handling decision
4. When automation conflicts with observed UX, local/manual check wins
