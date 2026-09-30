---
name: github-skills-index
description: >-
  Index of vendored GitHub agent skills under .claude/skills from the
  Landing Page Excellence GitHub AI catalog. Use when choosing which
  vendored skill to invoke, refreshing vendors, or checking provenance.
trigger: <github-skills-index>
---

# GitHub Skills Index (vendored)

Project-owned skills stay authoritative for Andamio landing:
`landing-excellence`, `seo-skill`.

Vendored skills are **evaluate/reference** unless a decision adopts them.
When guidance conflicts, follow `landing-excellence` + Warm Index.

**Installed count:** 78

Refresh:

```bash
python .claude/skills/sync-github-skills.py
```

## Manifest source

- Catalog: `docs/archive/landing-page-excellence/research/github-ai-resources/installable-skills-and-rules.md`
- Manifest: `.claude/skills/github-skills-manifest.json`

## Installed skills

| Dest | Repo | Upstream path | Decision |
|---|---|---|---|
| `anthropic-brand-guidelines` | [anthropics/skills](https://github.com/anthropics/skills) | `skills/brand-guidelines` | `reference-only` |
| `anthropic-doc-coauthoring` | [anthropics/skills](https://github.com/anthropics/skills) | `skills/doc-coauthoring` | `reference-only` |
| `anthropic-frontend-design` | [anthropics/skills](https://github.com/anthropics/skills) | `skills/frontend-design` | `reference-only` |
| `anthropic-mcp-builder` | [anthropics/skills](https://github.com/anthropics/skills) | `skills/mcp-builder` | `reference-only` |
| `anthropic-skill-creator` | [anthropics/skills](https://github.com/anthropics/skills) | `skills/skill-creator` | `reference-only` |
| `anthropic-theme-factory` | [anthropics/skills](https://github.com/anthropics/skills) | `skills/theme-factory` | `reference-only` |
| `anthropic-web-artifacts-builder` | [anthropics/skills](https://github.com/anthropics/skills) | `skills/web-artifacts-builder` | `reference-only` |
| `anthropic-webapp-testing` | [anthropics/skills](https://github.com/anthropics/skills) | `skills/webapp-testing` | `reference-only` |
| `arz-a11y-audit` | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | `engineering-team/a11y-audit/skills/a11y-audit` | `reference-only` |
| `arz-brand-guidelines` | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | `.gemini/skills/brand-guidelines` | `reference-only` |
| `arz-content-strategist` | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | `.gemini/skills/content-strategist` | `reference-only` |
| `arz-copy-editing` | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | `.gemini/skills/copy-editing` | `reference-only` |
| `arz-copywriting` | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | `marketing-skill/skills/copywriting` | `reference-only` |
| `arz-design-system` | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | `markdown-html/skills/design-system` | `reference-only` |
| `arz-landing` | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | `marketing/landing/skills/landing` | `reference-only` |
| `arz-landing-page-generator` | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | `product-team/skills/landing-page-generator` | `reference-only` |
| `arz-performance-profiler` | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | `engineering/skills/performance-profiler` | `reference-only` |
| `arz-programmatic-seo` | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | `.gemini/skills/programmatic-seo` | `reference-only` |
| `arz-senior-frontend` | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | `engineering-team/skills/senior-frontend` | `reference-only` |
| `arz-seo-audit` | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | `marketing-skill/skills/seo-audit` | `reference-only` |
| `arz-seo-auditor` | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | `.gemini/skills/seo-auditor` | `reference-only` |
| `arz-ui-design-system` | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | `product-team/skills/ui-design-system` | `reference-only` |
| `arz-ux-researcher-designer` | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | `product-team/skills/ux-researcher-designer` | `reference-only` |
| `cds-motion-framer` | [freshtechbro/claudedesignskills](https://github.com/freshtechbro/claudedesignskills) | `.claude/skills/motion-framer` | `reference-only` |
| `davila-accessibility` | [davila7/claude-code-templates](https://github.com/davila7/claude-code-templates) | `cli-tool/components/skills/development/accessibility` | `reference-only` |
| `davila-accessibility-auditor` | [davila7/claude-code-templates](https://github.com/davila7/claude-code-templates) | `cli-tool/components/skills/creative-design/accessibility-auditor` | `reference-only` |
| `davila-brand-guidelines` | [davila7/claude-code-templates](https://github.com/davila7/claude-code-templates) | `cli-tool/components/skills/business-marketing/brand-guidelines-anthropic` | `reference-only` |
| `davila-frontend-design` | [davila7/claude-code-templates](https://github.com/davila7/claude-code-templates) | `cli-tool/components/skills/creative-design/frontend-design` | `reference-only` |
| `davila-programmatic-seo` | [davila7/claude-code-templates](https://github.com/davila7/claude-code-templates) | `cli-tool/components/skills/business-marketing/programmatic-seo` | `reference-only` |
| `davila-seo-audit` | [davila7/claude-code-templates](https://github.com/davila7/claude-code-templates) | `cli-tool/components/skills/business-marketing/seo-audit` | `reference-only` |
| `davila-web-design-guidelines` | [davila7/claude-code-templates](https://github.com/davila7/claude-code-templates) | `cli-tool/components/skills/creative-design/web-design-guidelines` | `reference-only` |
| `davila-webapp-testing` | [davila7/claude-code-templates](https://github.com/davila7/claude-code-templates) | `cli-tool/components/skills/development/webapp-testing` | `reference-only` |
| `ecc-api-design` | [affaan-m/ECC](https://github.com/affaan-m/ECC) | `.agents/skills/api-design` | `reference-only` |
| `ecc-brand-discovery` | [affaan-m/ECC](https://github.com/affaan-m/ECC) | `.agents/skills/brand-discovery` | `reference-only` |
| `ecc-brand-voice` | [affaan-m/ECC](https://github.com/affaan-m/ECC) | `.agents/skills/brand-voice` | `reference-only` |
| `ecc-coding-standards` | [affaan-m/ECC](https://github.com/affaan-m/ECC) | `.agents/skills/coding-standards` | `reference-only` |
| `ecc-e2e-testing` | [affaan-m/ECC](https://github.com/affaan-m/ECC) | `.agents/skills/e2e-testing` | `reference-only` |
| `ecc-frontend-patterns` | [affaan-m/ECC](https://github.com/affaan-m/ECC) | `.agents/skills/frontend-patterns` | `reference-only` |
| `ecc-nextjs-turbopack` | [affaan-m/ECC](https://github.com/affaan-m/ECC) | `.agents/skills/nextjs-turbopack` | `reference-only` |
| `ecc-security-review` | [affaan-m/ECC](https://github.com/affaan-m/ECC) | `.agents/skills/security-review` | `reference-only` |
| `ecc-tdd-workflow` | [affaan-m/ECC](https://github.com/affaan-m/ECC) | `.agents/skills/tdd-workflow` | `reference-only` |
| `ecc-verification-loop` | [affaan-m/ECC](https://github.com/affaan-m/ECC) | `.agents/skills/verification-loop` | `reference-only` |
| `ghcp-anti-ui-slop` | [github/awesome-copilot](https://github.com/github/awesome-copilot) | `skills/anti-ui-slop` | `reference-only` |
| `ghcp-chrome-devtools` | [github/awesome-copilot](https://github.com/github/awesome-copilot) | `skills/chrome-devtools` | `reference-only` |
| `ghcp-create-implementation-plan` | [github/awesome-copilot](https://github.com/github/awesome-copilot) | `skills/create-implementation-plan` | `reference-only` |
| `ghcp-gsap-framer-scroll-animation` | [github/awesome-copilot](https://github.com/github/awesome-copilot) | `skills/gsap-framer-scroll-animation` | `reference-only` |
| `ghcp-penpot-uiux-design` | [github/awesome-copilot](https://github.com/github/awesome-copilot) | `skills/penpot-uiux-design` | `reference-only` |
| `ghcp-playwright-explore-website` | [github/awesome-copilot](https://github.com/github/awesome-copilot) | `skills/playwright-explore-website` | `reference-only` |
| `ghcp-playwright-generate-test` | [github/awesome-copilot](https://github.com/github/awesome-copilot) | `skills/playwright-generate-test` | `reference-only` |
| `ghcp-premium-frontend-ui` | [github/awesome-copilot](https://github.com/github/awesome-copilot) | `skills/premium-frontend-ui` | `reference-only` |
| `ghcp-security-review` | [github/awesome-copilot](https://github.com/github/awesome-copilot) | `skills/security-review` | `reference-only` |
| `ghcp-ui-screenshots` | [github/awesome-copilot](https://github.com/github/awesome-copilot) | `skills/ui-screenshots` | `reference-only` |
| `ghcp-web-design-reviewer` | [github/awesome-copilot](https://github.com/github/awesome-copilot) | `skills/web-design-reviewer` | `reference-only` |
| `ghcp-webapp-testing` | [github/awesome-copilot](https://github.com/github/awesome-copilot) | `skills/webapp-testing` | `reference-only` |
| `ms-continual-learning` | [microsoft/skills](https://github.com/microsoft/skills) | `.github/skills/continual-learning` | `reference-only` |
| `ms-frontend-design-review` | [microsoft/skills](https://github.com/microsoft/skills) | `.github/skills/frontend-design-review` | `reference-only` |
| `ms-github-issue-creator` | [microsoft/skills](https://github.com/microsoft/skills) | `.github/skills/github-issue-creator` | `reference-only` |
| `ms-mcp-builder` | [microsoft/skills](https://github.com/microsoft/skills) | `.github/skills/mcp-builder` | `reference-only` |
| `ms-skill-creator` | [microsoft/skills](https://github.com/microsoft/skills) | `.github/skills/skill-creator` | `reference-only` |
| `obra-brainstorming` | [obra/superpowers](https://github.com/obra/superpowers) | `skills/brainstorming` | `evaluate` |
| `obra-dispatching-parallel-agents` | [obra/superpowers](https://github.com/obra/superpowers) | `skills/dispatching-parallel-agents` | `evaluate` |
| `obra-executing-plans` | [obra/superpowers](https://github.com/obra/superpowers) | `skills/executing-plans` | `evaluate` |
| `obra-finishing-a-development-branch` | [obra/superpowers](https://github.com/obra/superpowers) | `skills/finishing-a-development-branch` | `evaluate` |
| `obra-receiving-code-review` | [obra/superpowers](https://github.com/obra/superpowers) | `skills/receiving-code-review` | `evaluate` |
| `obra-requesting-code-review` | [obra/superpowers](https://github.com/obra/superpowers) | `skills/requesting-code-review` | `evaluate` |
| `obra-subagent-driven-development` | [obra/superpowers](https://github.com/obra/superpowers) | `skills/subagent-driven-development` | `evaluate` |
| `obra-systematic-debugging` | [obra/superpowers](https://github.com/obra/superpowers) | `skills/systematic-debugging` | `evaluate` |
| `obra-test-driven-development` | [obra/superpowers](https://github.com/obra/superpowers) | `skills/test-driven-development` | `evaluate` |
| `obra-using-git-worktrees` | [obra/superpowers](https://github.com/obra/superpowers) | `skills/using-git-worktrees` | `evaluate` |
| `obra-using-superpowers` | [obra/superpowers](https://github.com/obra/superpowers) | `skills/using-superpowers` | `evaluate` |
| `obra-verification-before-completion` | [obra/superpowers](https://github.com/obra/superpowers) | `skills/verification-before-completion` | `evaluate` |
| `obra-writing-plans` | [obra/superpowers](https://github.com/obra/superpowers) | `skills/writing-plans` | `evaluate` |
| `obra-writing-skills` | [obra/superpowers](https://github.com/obra/superpowers) | `skills/writing-skills` | `evaluate` |
| `tob-ask-questions-if-underspecified` | [trailofbits/skills](https://github.com/trailofbits/skills) | `plugins/ask-questions-if-underspecified/skills/ask-questions-if-underspecified` | `reference-only` |
| `tob-differential-review` | [trailofbits/skills](https://github.com/trailofbits/skills) | `plugins/differential-review/skills/differential-review` | `reference-only` |
| `tob-insecure-defaults` | [trailofbits/skills](https://github.com/trailofbits/skills) | `plugins/insecure-defaults/skills/insecure-defaults` | `reference-only` |
| `tob-skill-improver` | [trailofbits/skills](https://github.com/trailofbits/skills) | `plugins/skill-improver/skills/skill-improver` | `reference-only` |
| `tob-supply-chain-risk-auditor` | [trailofbits/skills](https://github.com/trailofbits/skills) | `plugins/supply-chain-risk-auditor/skills/supply-chain-risk-auditor` | `reference-only` |

## Not bulk-vendored (too large / off-domain)

- `microsoft/skills` Azure SDK plugin trees (hundreds of Azure-specific skills)
- Full `alirezarezvani/claude-skills` (~800 SKILL.md files) — only landing-relevant subset synced
- Cursor-rules-only repos (`PatrickJS/awesome-cursorrules`, `sanjeed5/awesome-cursor-rules-mdc`) — rules, not Claude skills
- `VoltAgent/awesome-claude-code-subagents` — subagents, not skills (see catalog)

Add more entries to `github-skills-manifest.json` and re-run the sync script.
