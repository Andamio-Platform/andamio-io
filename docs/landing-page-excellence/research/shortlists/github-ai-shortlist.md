# GitHub AI Resource Shortlist

- **as_of:** `2026-07-21`
- **Decision supported:** select bounded, reviewable resources for canonical landing implementation and quality assurance.
- **Freshness:** category `github-ai = 30 days`; shortlist phase `45 days`; effective window `30 days`.
- **Freshness result:** total `13`; passed `13`; stale `0`; unreachable `0`; unsupported `0`.
- **Source pool:** `75` verified unique repositories from `98` candidate rows.

A shortlist recommends evaluation or adoption; it does not authorize application changes.

## Ranked records

| Rank | Repository | Bucket | Score | Material-to-agent mapping | Deterministic fallback and data handling |
|---:|---|---|---:|---|---|
| 1 | [github/github-mcp-server](https://github.com/github/github-mcp-server) | `adopt-now` | 29/30 | issues/PR/repository evidence → research and delivery agent | Keep existing local tests/manual review authoritative; use least-privilege tokens and do not expose private content. |
| 2 | [GoogleChrome/lighthouse](https://github.com/GoogleChrome/lighthouse) | `adopt-now` | 29/30 | performance/accessibility/SEO audits → quality agent | Keep existing local tests/manual review authoritative; use least-privilege tokens and do not expose private content. |
| 3 | [microsoft/playwright](https://github.com/microsoft/playwright) | `adopt-now` | 29/30 | route behavior and cross-browser evidence → implementation/test agent | Keep existing local tests/manual review authoritative; use least-privilege tokens and do not expose private content. |
| 4 | [shadcn-ui/ui](https://github.com/shadcn-ui/ui) | `adopt-now` | 29/30 | component patterns → UI implementation agent | Keep existing local tests/manual review authoritative; use least-privilege tokens and do not expose private content. |
| 5 | [storybookjs/storybook](https://github.com/storybookjs/storybook) | `adopt-now` | 29/30 | canonical UI states → component review workflow | Keep existing local tests/manual review authoritative; use least-privilege tokens and do not expose private content. |
| 6 | [dequelabs/axe-core](https://github.com/dequelabs/axe-core) | `adopt-now` | 28/30 | WCAG-oriented automated checks → accessibility gate | Keep existing local tests/manual review authoritative; use least-privilege tokens and do not expose private content. |
| 7 | [reg-viz/reg-suit](https://github.com/reg-viz/reg-suit) | `adopt-now` | 28/30 | visual baselines → regression workflow | Keep existing local tests/manual review authoritative; use least-privilege tokens and do not expose private content. |
| 8 | [microsoft/playwright-mcp](https://github.com/microsoft/playwright-mcp) | `evaluate` | 29/30 | browser inspection → research/QA agent | Keep existing local tests/manual review authoritative; use least-privilege tokens and do not expose private content. |
| 9 | [upstash/context7](https://github.com/upstash/context7) | `evaluate` | 29/30 | versioned library docs → implementation agent | Keep existing local tests/manual review authoritative; use least-privilege tokens and do not expose private content. |
| 10 | [obra/superpowers](https://github.com/obra/superpowers) | `evaluate` | 27/30 | development workflow skills → coding agent | Run deterministic CLI/API checks and manual review; no credentials or private content in prompts. |
| 11 | [promptfoo/promptfoo](https://github.com/promptfoo/promptfoo) | `evaluate` | 23/30 | prompt regression cases → evaluation agent | Run deterministic CLI/API checks and manual review; no credentials or private content in prompts. |
| 12 | [tailwindlabs/tailwindcss](https://github.com/tailwindlabs/tailwindcss) | `reference-only` | 29/30 | utility styling reference → UI implementation agent | Keep existing local tests/manual review authoritative; use least-privilege tokens and do not expose private content. |
| 13 | [github/awesome-copilot](https://github.com/github/awesome-copilot) | `reference-only` | 27/30 | instruction and skill examples → workflow author | Run deterministic CLI/API checks and manual review; no credentials or private content in prompts. |

## Recommendation

Adopt-now means use the repository as a primary implementation or deterministic quality reference in a scoped workflow. Evaluate means run a bounded trial with explicit output review, credential minimization, and a local/manual fallback. All other verified catalog entries remain reference-only.
