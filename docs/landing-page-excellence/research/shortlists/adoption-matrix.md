# Adoption Matrix — GitHub AI + UI/UX → Agents/Tasks

- **as_of:** `2026-07-21`
- **Sources:** [github-ai-shortlist.md](github-ai-shortlist.md), [ui-ux-shortlist.md](ui-ux-shortlist.md)
- **Decision supported:** bound which shortlisted tools may enter agent workflows before prototype work.
- **Product frame:** issuer-primary / developer-secondary.

A matrix recommends workflow use. It does **not** authorize application source changes. Adoption into code still requires approved requirements and adopted decisions.

## Bucket legend

| Bucket | Meaning |
|---|---|
| `adopt-now` | Primary deterministic tool or stack-aligned reference for the named agent/task. |
| `evaluate` | Bounded trial with reviewable output, credential minimization, and local/manual fallback. |
| `reference-only` | Pattern mining or comparison; do not install as a dependency or brand authority. |

## Task columns

`research` · `copy` · `design` · `implement` · `motion` · `a11y` · `perf` · `SEO` · `QA`

## Matrix

| Resource | Bucket | Agents / tasks | Use on Andamio | Licensing caution |
|---|---|---|---|---|
| [github/github-mcp-server](https://github.com/github/github-mcp-server) | `adopt-now` | research, QA | Issues/PR/repo evidence for delivery agents | MIT-class OSS; least-privilege tokens; no private content in prompts |
| [GoogleChrome/lighthouse](https://github.com/GoogleChrome/lighthouse) | `adopt-now` | perf, a11y, SEO, QA | Median of 3 cold mobile runs on `/`, `/issuer`, `/show-me` | Apache-2.0; retain JSON/HTML reports; do not treat local unthrottled runs as baseline |
| [microsoft/playwright](https://github.com/microsoft/playwright) | `adopt-now` | implement, QA, a11y | Route smoke, funnel, keyboard, screenshot evidence | Apache-2.0; already in stack via `yarn shoot` |
| [Playwright docs](https://playwright.dev/) | `adopt-now` | QA, implement | Same as Playwright repo | Docs are reference; keep local config authoritative |
| [shadcn-ui/ui](https://github.com/shadcn-ui/ui) / [ui.shadcn.com](https://ui.shadcn.com/) | `adopt-now` | design, implement, a11y | Interaction primitives only; restyle to Warm Index | MIT; do not import brand chrome or dark neon demos |
| [storybookjs/storybook](https://github.com/storybookjs/storybook) | `adopt-now` | design, implement, QA | Canonical kit states for review (optional phase) | MIT; add only if review workflow justifies cost |
| [dequelabs/axe-core](https://github.com/dequelabs/axe-core) / [axe DevTools](https://www.deque.com/axe/devtools/) | `adopt-now` | a11y, QA | WCAG-oriented automated gate on funnel routes | MPL-2.0 (axe-core); DevTools freemium — free scope only unless paid approved |
| [reg-viz/reg-suit](https://github.com/reg-viz/reg-suit) | `adopt-now` | QA, design | Visual baselines for hero/issuer/show-me | MIT; store baselines under docs/evidence, not secrets |
| [Motion](https://motion.dev/) | `adopt-now` | motion, implement, a11y | Tokenized reveal/scroll; honor `prefers-reduced-motion` | MIT (framer-motion lineage); already in stack |
| [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) | `adopt-now` | design, a11y, VIS | Validate orange/blue on paper/ink | Free tool; record pass/fail in evidence |
| [SVGOMG](https://jakearchibald.github.io/svgomg/) | `adopt-now` | perf, implement | Compress LCP badge/logo SVGs | Tool UI; optimize copies, keep source SVGs reviewable |
| [prefers-reduced-motion (MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion) | `adopt-now` | motion, a11y | Every animation needs an equivalent | Not software; standards reference |
| [microsoft/playwright-mcp](https://github.com/microsoft/playwright-mcp) | `evaluate` | research, QA | Browser inspection for agents | Apache-2.0; keep Playwright CLI authoritative if MCP flakes |
| [upstash/context7](https://github.com/upstash/context7) | `evaluate` | implement, research | Versioned library docs for agents | Check current license/ToS; no credentials in queries |
| [obra/superpowers](https://github.com/obra/superpowers) | `evaluate` | research, implement | Coding-agent workflow skills | MIT; review generated output; no Andamio secrets in prompts |
| [promptfoo/promptfoo](https://github.com/promptfoo/promptfoo) | `evaluate` | research, QA | Prompt regression for agent briefs/copy | MIT; keep fixtures free of PII/credentials |
| [Launch UI](https://www.launchuicomponents.com/) | `evaluate` | design, implement | Section structure ideas only | Freemium; restyle to Warm Index; no wholesale clone |
| [Magic UI](https://magicui.design/) | `evaluate` | motion, design | Trial ≤2 micro-interactions | Freemium; license/paid blocks before shipping |
| [Aceternity UI](https://ui.aceternity.com/) | `evaluate` | design, motion | Inspiration + selective free components | Freemium; reject neon/dark defaults |
| [React Bits](https://www.reactbits.dev/) | `evaluate` | motion, design | Prefer over heavy 3D | Check per-component license before copy |
| [Fontsource](https://fontsource.org/) | `evaluate` | perf, implement | Self-host Inter + JetBrains Mono subset | SIL OFL fonts; replace broad Google Fonts import |
| [tailwindlabs/tailwindcss](https://github.com/tailwindlabs/tailwindcss) | `reference-only` | design, implement | Utility styling reference; tokens remain authority | MIT; already in stack — do not re-theme Warm Index via Tailwind defaults |
| [github/awesome-copilot](https://github.com/github/awesome-copilot) | `reference-only` | research | Instruction/skill examples | MIT; community content quality varies |
| [Credly](https://www.credly.com/) / [Accredible](https://www.accredible.com/) | `reference-only` | copy, design, research | Competitor issuer journeys — differentiate ownership/proof | Proprietary; no visual/copy cloning |
| [Lapa Ninja](https://www.lapa.ninja/) | `reference-only` | design | Broad landing inspiration | Gallery; pattern mining only |

## Agent → primary tools (quick map)

| Agent | Primary (`adopt-now`) | Secondary (`evaluate`) |
|---|---|---|
| research | github-mcp-server | playwright-mcp, context7, superpowers, promptfoo |
| conversion-copy | — (product truth + funnel audit) | competitor reference-only sites |
| ux-strategy / ui-design | shadcn patterns, WebAIM, Motion docs | Launch UI, Magic UI, Aceternity, React Bits |
| frontend-implementation | Playwright, shadcn patterns, SVGOMG | Fontsource, context7 |
| motion | Motion + reduced-motion MDN | Magic UI / React Bits (≤2 trials) |
| accessibility | axe-core, Playwright, WebAIM | — |
| performance | Lighthouse, SVGOMG | Fontsource |
| seo | Lighthouse SEO category | — |
| qa | Playwright, Lighthouse, axe, reg-suit | playwright-mcp, promptfoo |

## Licensing cautions (program-wide)

1. **Unknown or missing SPDX** → `reference-only` until verified; never paste into product.
2. **Freemium UI kits** → free components only unless a paid license decision is adopted; always restyle to Warm Index.
3. **Competitor sites** → IA and journey insight only; no wholesale aesthetic or claim copy.
4. **Agent skills / MCP** → minimize credentials; never send badge inputs, wallet/credential data, or secrets to external providers without an adopted data-handling decision.
5. **Quality tools** → local/manual fallback remains authoritative when automation conflicts with observed UX.

## Recommendation

Adopt deterministic quality and stack-aligned tools first. Evaluate animated kits and agent skills only inside brief-scoped trials. Keep competitor and gallery sites reference-only. See [rejected-and-cautions.md](rejected-and-cautions.md) for explicit exclusions.
