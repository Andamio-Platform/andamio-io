# Rejected Patterns and Cautions

- **as_of:** `2026-07-21`
- **Status:** research guidance for shortlist and design gates
- **Audience:** all landing excellence agents

These patterns are **rejected by default**. Reviving any item requires an adopted decision with evidence that Warm Index, accessibility, performance, and issuer-primary framing still hold.

## Rejected patterns

| Pattern | Why rejected for Andamio | Safer alternative |
|---|---|---|
| Neon dark SaaS clones (purple glow, glassmorphism, gradient orbs) | Conflicts with Warm Index ink/paper; looks generic AI-marketing; weakens brand test | Light editorial surface; orange sparingly; blue for wayfinding only |
| Unknown-license or unverified installable skills | Legal and supply-chain risk; prompt injection / credential leakage risk | MIT/Apache verified tools from [github-ai-shortlist.md](github-ai-shortlist.md); keep local fallback |
| Wholesale aesthetic copy from Launch UI / Magic UI / Aceternity / galleries | Brand dilution; possible license/ToS issues; fails “brand first” test | Steal **section jobs** and interaction ideas; restyle every pixel to tokens |
| Heavy Three.js / WebGL hero by default | LCP/INP risk; a11y/motion cost; distracts from issuer proof narrative | Static/SVG credential specimen + Motion reveals; 3D only via future adopted exception |
| Reviving archived V2 walkthrough / ModernLanding / SB7 as authority | Splits ownership; contradicts keep/reuse/archive decision | Canonical `src/ui/system` + HowItWorks + BadgeBuilder |
| Dark-mode-first marketing redesign | Warm Index is ink-on-paper marketing DNA | Support theme if required later; do not lead with dark chrome |
| Claim inflation (real issuance/verification from demo clicks) | Trust and compliance risk | Label Define/Issue/Verify as illustrative; L4 only from owned confirmation |
| Unbounded Google Fonts import growth | Perf + privacy; already a PERF finding | Bound to Inter + JetBrains Mono (evaluate Fontsource) |
| Analytics that capture badge/wallet/email/free text | Privacy violation of funnel contract | Event IDs + non-sensitive enums only after privacy approval |

## Soft cautions (allowed only with gates)

- **Discord as primary closing CTA** — community is fine; do not outrank issuer walkthrough / Start issuing.
- **Animated component libraries** — max 1–2 evaluated micro-interactions; must pass reduced-motion + Lighthouse budgets.
- **Storybook** — adopt when kit review cost is justified; not a Phase-0 blocker.
- **Competitor issuer sites (Credly/Accredible)** — differentiate on ownership/proof, do not mirror badge-marketplace layout.

## Related

- [adoption-matrix.md](adoption-matrix.md)
- [../methodology.md](../methodology.md)
- [../../decisions/2026-07-21-keep-reuse-archive.md](../../decisions/2026-07-21-keep-reuse-archive.md)
