# MCP, Design Integrations, and Implementation Tools

- **checked_as_of:** `2026-07-21`
- **Category freshness:** `github-ai = 30 days`
- **Accepted unique repositories:** `28`
- **Schema:** Every record supplies the normalized research fields, claim-level primary evidence, six scores, and a decision.

### `modelcontextprotocol--python-sdk` — [modelcontextprotocol/python-sdk](https://github.com/modelcontextprotocol/python-sdk)
- **Category/status:** `github-ai` / `verified`; **decision:** `reference-only`.
- **Factual summary:** The official Python SDK for Model Context Protocol servers and clients
- **Andamio use case / audience:** Python SDK for MCP clients and servers; `developer`.
- **License/source:** `MIT` / `open-source`; license metadata confirmed by GitHub API.
- **Pricing/free scope:** `free`; repository source at the checked commit under `MIT`. Hosted services and third-party APIs are not included.
- **Checked version/activity:** `release v1.28.1 (2026-06-26); HEAD 3a6f2996cdd8 (2026-07-16)`; default branch `main`; **verified_on:** `2026-07-21`.
- **Freshness:** category `github-ai` 30 days; phase `research` 180 days; effective 30 days; checked_as_of `2026-07-21`.
- **Primary citations:** [capability README](https://github.com/modelcontextprotocol/python-sdk/blob/3a6f2996cdd8358957479791e8b26198c07d6a75/README.md) — `supports`, checked `2026-07-21`; [owner/archive/license metadata](https://api.github.com/repos/modelcontextprotocol/python-sdk) — `supports`, checked `2026-07-21`; [checked HEAD](https://github.com/modelcontextprotocol/python-sdk/commit/3a6f2996cdd8358957479791e8b26198c07d6a75) — `supports`, checked `2026-07-21`.
- **Scores:** R5/E5/Q5/F5/C5/K4 = **29/30**.
- **Adoption risk/data/provider notes:** Repository code is free under the stated license; optional hosted services or third-party integrations are outside this pricing verification. Use least-privilege credentials; keep generated UI changes reviewable and retain deterministic tests/manual checks.
- **Decision rationale:** Useful primary reference, but not a current dependency recommendation; retain for patterns and comparison.

### `github--github-mcp-server` — [github/github-mcp-server](https://github.com/github/github-mcp-server)
- **Category/status:** `github-ai` / `shortlisted`; **decision:** `adopt-now`.
- **Factual summary:** GitHub's official MCP Server
- **Andamio use case / audience:** GitHub MCP server for repository workflows; `developer`.
- **License/source:** `MIT` / `open-source`; license metadata confirmed by GitHub API.
- **Pricing/free scope:** `free`; repository source at the checked commit under `MIT`. Hosted services and third-party APIs are not included.
- **Checked version/activity:** `release v1.6.0 (2026-07-15); HEAD 9d130049e907 (2026-07-21)`; default branch `main`; **verified_on:** `2026-07-21`.
- **Freshness:** category `github-ai` 30 days; phase `research` 180 days; effective 30 days; checked_as_of `2026-07-21`.
- **Primary citations:** [capability README](https://github.com/github/github-mcp-server/blob/9d130049e9074772c2afbbd5e904725d240443ad/README.md) — `supports`, checked `2026-07-21`; [owner/archive/license metadata](https://api.github.com/repos/github/github-mcp-server) — `supports`, checked `2026-07-21`; [checked HEAD](https://github.com/github/github-mcp-server/commit/9d130049e9074772c2afbbd5e904725d240443ad) — `supports`, checked `2026-07-21`.
- **Scores:** R5/E5/Q5/F5/C5/K4 = **29/30**.
- **Adoption risk/data/provider notes:** Repository code is free under the stated license; optional hosted services or third-party integrations are outside this pricing verification. Use least-privilege credentials; keep generated UI changes reviewable and retain deterministic tests/manual checks.
- **Decision rationale:** Directly supports the current canonical landing implementation or its deterministic quality gates; pilot in a scoped workflow before broader use.

### `microsoft--playwright-mcp` — [microsoft/playwright-mcp](https://github.com/microsoft/playwright-mcp)
- **Category/status:** `github-ai` / `verified`; **decision:** `evaluate`.
- **Factual summary:** Playwright MCP server
- **Andamio use case / audience:** Browser automation exposed through MCP; `developer`.
- **License/source:** `Apache-2.0` / `open-source`; license metadata confirmed by GitHub API.
- **Pricing/free scope:** `free`; repository source at the checked commit under `Apache-2.0`. Hosted services and third-party APIs are not included.
- **Checked version/activity:** `release v0.0.78 (2026-07-09); HEAD 55679f5f3d4b (2026-07-15)`; default branch `main`; **verified_on:** `2026-07-21`.
- **Freshness:** category `github-ai` 30 days; phase `research` 180 days; effective 30 days; checked_as_of `2026-07-21`.
- **Primary citations:** [capability README](https://github.com/microsoft/playwright-mcp/blob/55679f5f3d4b4f3e2534ec0ce2fc5683ba2eaf3f/README.md) — `supports`, checked `2026-07-21`; [owner/archive/license metadata](https://api.github.com/repos/microsoft/playwright-mcp) — `supports`, checked `2026-07-21`; [checked HEAD](https://github.com/microsoft/playwright-mcp/commit/55679f5f3d4b4f3e2534ec0ce2fc5683ba2eaf3f) — `supports`, checked `2026-07-21`.
- **Scores:** R5/E5/Q5/F5/C5/K4 = **29/30**.
- **Adoption risk/data/provider notes:** Repository code is free under the stated license; optional hosted services or third-party integrations are outside this pricing verification. Use least-privilege credentials; keep generated UI changes reviewable and retain deterministic tests/manual checks.
- **Decision rationale:** Relevant and verified, but integration, generated-output review, provider dependence, or workflow overhead requires a bounded trial.

### `executeautomation--mcp-playwright` — [executeautomation/mcp-playwright](https://github.com/executeautomation/mcp-playwright)
- **Category/status:** `github-ai` / `verified`; **decision:** `reference-only`.
- **Factual summary:** Playwright Model Context Protocol Server - Tool to automate Browsers and APIs in Claude Desktop, Cline, Cursor IDE and More 🔌
- **Andamio use case / audience:** Playwright browser automation MCP server; `developer`.
- **License/source:** `MIT` / `open-source`; license metadata confirmed by GitHub API.
- **Pricing/free scope:** `free`; repository source at the checked commit under `MIT`. Hosted services and third-party APIs are not included.
- **Checked version/activity:** `HEAD 2349c2891e7c (2025-12-13)`; default branch `main`; **verified_on:** `2026-07-21`.
- **Freshness:** category `github-ai` 30 days; phase `research` 180 days; effective 30 days; checked_as_of `2026-07-21`.
- **Primary citations:** [capability README](https://github.com/executeautomation/mcp-playwright/blob/2349c2891e7c499c8c07b7d78c7f3fb4c797a1da/README.md) — `supports`, checked `2026-07-21`; [owner/archive/license metadata](https://api.github.com/repos/executeautomation/mcp-playwright) — `supports`, checked `2026-07-21`; [checked HEAD](https://github.com/executeautomation/mcp-playwright/commit/2349c2891e7c499c8c07b7d78c7f3fb4c797a1da) — `supports`, checked `2026-07-21`.
- **Scores:** R5/E5/Q4/F5/C5/K4 = **28/30**.
- **Adoption risk/data/provider notes:** Repository code is free under the stated license; optional hosted services or third-party integrations are outside this pricing verification. Use least-privilege credentials; keep generated UI changes reviewable and retain deterministic tests/manual checks.
- **Decision rationale:** Useful primary reference, but not a current dependency recommendation; retain for patterns and comparison.

### `upstash--context7` — [upstash/context7](https://github.com/upstash/context7)
- **Category/status:** `github-ai` / `verified`; **decision:** `evaluate`.
- **Factual summary:** Context7 Platform -- Up-to-date code documentation for LLMs and AI code editors
- **Andamio use case / audience:** Documentation context service and MCP server; `developer`.
- **License/source:** `MIT` / `open-source`; license metadata confirmed by GitHub API.
- **Pricing/free scope:** `free`; repository source at the checked commit under `MIT`. Hosted services and third-party APIs are not included.
- **Checked version/activity:** `release @upstash/context7-mcp@3.2.4 (2026-07-17); HEAD 23843e9ce629 (2026-07-17)`; default branch `master`; **verified_on:** `2026-07-21`.
- **Freshness:** category `github-ai` 30 days; phase `research` 180 days; effective 30 days; checked_as_of `2026-07-21`.
- **Primary citations:** [capability README](https://github.com/upstash/context7/blob/23843e9ce62908896cf2dcd32cc5c03c05047416/README.md) — `supports`, checked `2026-07-21`; [owner/archive/license metadata](https://api.github.com/repos/upstash/context7) — `supports`, checked `2026-07-21`; [checked HEAD](https://github.com/upstash/context7/commit/23843e9ce62908896cf2dcd32cc5c03c05047416) — `supports`, checked `2026-07-21`.
- **Scores:** R5/E5/Q5/F5/C5/K4 = **29/30**.
- **Adoption risk/data/provider notes:** Repository code is free under the stated license; optional hosted services or third-party integrations are outside this pricing verification. Use least-privilege credentials; keep generated UI changes reviewable and retain deterministic tests/manual checks.
- **Decision rationale:** Relevant and verified, but integration, generated-output review, provider dependence, or workflow overhead requires a bounded trial.

### `shadcn-ui--ui` — [shadcn-ui/ui](https://github.com/shadcn-ui/ui)
- **Category/status:** `github-ai` / `shortlisted`; **decision:** `adopt-now`.
- **Factual summary:** A set of beautifully-designed, accessible components and a code distribution platform. Works with your favorite frameworks. Open Source. Open Code.
- **Andamio use case / audience:** Accessible component source and registry tooling; `developer`.
- **License/source:** `MIT` / `open-source`; license metadata confirmed by GitHub API.
- **Pricing/free scope:** `free`; repository source at the checked commit under `MIT`. Hosted services and third-party APIs are not included.
- **Checked version/activity:** `release shadcn@4.13.1 (2026-07-17); HEAD fa4872c8ed94 (2026-07-21)`; default branch `main`; **verified_on:** `2026-07-21`.
- **Freshness:** category `github-ai` 30 days; phase `research` 180 days; effective 30 days; checked_as_of `2026-07-21`.
- **Primary citations:** [capability README](https://github.com/shadcn-ui/ui/blob/fa4872c8ed948c111884e52ae23a649e83591b71/README.md) — `supports`, checked `2026-07-21`; [owner/archive/license metadata](https://api.github.com/repos/shadcn-ui/ui) — `supports`, checked `2026-07-21`; [checked HEAD](https://github.com/shadcn-ui/ui/commit/fa4872c8ed948c111884e52ae23a649e83591b71) — `supports`, checked `2026-07-21`.
- **Scores:** R5/E5/Q5/F5/C5/K4 = **29/30**.
- **Adoption risk/data/provider notes:** Repository code is free under the stated license; optional hosted services or third-party integrations are outside this pricing verification. Use least-privilege credentials; keep generated UI changes reviewable and retain deterministic tests/manual checks.
- **Decision rationale:** Directly supports the current canonical landing implementation or its deterministic quality gates; pilot in a scoped workflow before broader use.

### `tailwindlabs--tailwindcss` — [tailwindlabs/tailwindcss](https://github.com/tailwindlabs/tailwindcss)
- **Category/status:** `github-ai` / `verified`; **decision:** `reference-only`.
- **Factual summary:** A utility-first CSS framework for rapid UI development.
- **Andamio use case / audience:** Utility-first CSS framework; `developer`.
- **License/source:** `MIT` / `open-source`; license metadata confirmed by GitHub API.
- **Pricing/free scope:** `free`; repository source at the checked commit under `MIT`. Hosted services and third-party APIs are not included.
- **Checked version/activity:** `release v4.3.3 (2026-07-16); HEAD 094bf6260587 (2026-07-16)`; default branch `main`; **verified_on:** `2026-07-21`.
- **Freshness:** category `github-ai` 30 days; phase `research` 180 days; effective 30 days; checked_as_of `2026-07-21`.
- **Primary citations:** [capability README](https://github.com/tailwindlabs/tailwindcss/blob/094bf62605870311a8def6ae45c87d578b198ebf/README.md) — `supports`, checked `2026-07-21`; [owner/archive/license metadata](https://api.github.com/repos/tailwindlabs/tailwindcss) — `supports`, checked `2026-07-21`; [checked HEAD](https://github.com/tailwindlabs/tailwindcss/commit/094bf62605870311a8def6ae45c87d578b198ebf) — `supports`, checked `2026-07-21`.
- **Scores:** R5/E5/Q5/F5/C5/K4 = **29/30**.
- **Adoption risk/data/provider notes:** Repository code is free under the stated license; optional hosted services or third-party integrations are outside this pricing verification. Use least-privilege credentials; keep generated UI changes reviewable and retain deterministic tests/manual checks.
- **Decision rationale:** Useful primary reference, but not a current dependency recommendation; retain for patterns and comparison.

### `vercel--next.js` — [vercel/next.js](https://github.com/vercel/next.js)
- **Category/status:** `github-ai` / `verified`; **decision:** `reference-only`.
- **Factual summary:** The React Framework
- **Andamio use case / audience:** React web framework used by Andamio; `developer`.
- **License/source:** `MIT` / `open-source`; license metadata confirmed by GitHub API.
- **Pricing/free scope:** `free`; repository source at the checked commit under `MIT`. Hosted services and third-party APIs are not included.
- **Checked version/activity:** `release v16.2.11 (2026-07-21); HEAD 18123b376560 (2026-07-21)`; default branch `canary`; **verified_on:** `2026-07-21`.
- **Freshness:** category `github-ai` 30 days; phase `research` 180 days; effective 30 days; checked_as_of `2026-07-21`.
- **Primary citations:** [capability README](https://github.com/vercel/next.js/blob/18123b376560fb0dce4b2df3f39afbb086577afe/readme.md) — `supports`, checked `2026-07-21`; [owner/archive/license metadata](https://api.github.com/repos/vercel/next.js) — `supports`, checked `2026-07-21`; [checked HEAD](https://github.com/vercel/next.js/commit/18123b376560fb0dce4b2df3f39afbb086577afe) — `supports`, checked `2026-07-21`.
- **Scores:** R5/E5/Q5/F5/C5/K4 = **29/30**.
- **Adoption risk/data/provider notes:** Repository code is free under the stated license; optional hosted services or third-party integrations are outside this pricing verification. Use least-privilege credentials; keep generated UI changes reviewable and retain deterministic tests/manual checks.
- **Decision rationale:** Useful primary reference, but not a current dependency recommendation; retain for patterns and comparison.

### `react--react` — [react/react](https://github.com/react/react)
- **Category/status:** `github-ai` / `verified`; **decision:** `reference-only`.
- **Factual summary:** The library for web and native user interfaces.
- **Andamio use case / audience:** Component UI library used by Andamio; `developer`.
- **License/source:** `MIT` / `open-source`; license metadata confirmed by GitHub API.
- **Pricing/free scope:** `free`; repository source at the checked commit under `MIT`. Hosted services and third-party APIs are not included.
- **Checked version/activity:** `release v19.2.8 (2026-07-21); HEAD 81e442eaf3fb (2026-07-21)`; default branch `main`; **verified_on:** `2026-07-21`.
- **Freshness:** category `github-ai` 30 days; phase `research` 180 days; effective 30 days; checked_as_of `2026-07-21`.
- **Primary citations:** [capability README](https://github.com/react/react/blob/81e442eaf3fbfabd2367a0d8691ec0df13a3add0/README.md) — `supports`, checked `2026-07-21`; [owner/archive/license metadata](https://api.github.com/repos/react/react) — `supports`, checked `2026-07-21`; [checked HEAD](https://github.com/react/react/commit/81e442eaf3fbfabd2367a0d8691ec0df13a3add0) — `supports`, checked `2026-07-21`.
- **Scores:** R5/E5/Q5/F5/C5/K4 = **29/30**.
- **Adoption risk/data/provider notes:** Repository code is free under the stated license; optional hosted services or third-party integrations are outside this pricing verification. Use least-privilege credentials; keep generated UI changes reviewable and retain deterministic tests/manual checks.
- **Decision rationale:** Useful primary reference, but not a current dependency recommendation; retain for patterns and comparison.

### `storybookjs--storybook` — [storybookjs/storybook](https://github.com/storybookjs/storybook)
- **Category/status:** `github-ai` / `shortlisted`; **decision:** `adopt-now`.
- **Factual summary:** Storybook is the industry standard workshop for building, documenting, and testing UI components in isolation
- **Andamio use case / audience:** Isolated UI development and documentation; `developer`.
- **License/source:** `MIT` / `open-source`; license metadata confirmed by GitHub API.
- **Pricing/free scope:** `free`; repository source at the checked commit under `MIT`. Hosted services and third-party APIs are not included.
- **Checked version/activity:** `release v10.5.3 (2026-07-20); HEAD 5675a31efd5f (2026-07-21)`; default branch `next`; **verified_on:** `2026-07-21`.
- **Freshness:** category `github-ai` 30 days; phase `research` 180 days; effective 30 days; checked_as_of `2026-07-21`.
- **Primary citations:** [capability README](https://github.com/storybookjs/storybook/blob/5675a31efd5ffca36b8a3c46c2f5a43ef6863834/README.md) — `supports`, checked `2026-07-21`; [owner/archive/license metadata](https://api.github.com/repos/storybookjs/storybook) — `supports`, checked `2026-07-21`; [checked HEAD](https://github.com/storybookjs/storybook/commit/5675a31efd5ffca36b8a3c46c2f5a43ef6863834) — `supports`, checked `2026-07-21`.
- **Scores:** R5/E5/Q5/F5/C5/K4 = **29/30**.
- **Adoption risk/data/provider notes:** Repository code is free under the stated license; optional hosted services or third-party integrations are outside this pricing verification. Use least-privilege credentials; keep generated UI changes reviewable and retain deterministic tests/manual checks.
- **Decision rationale:** Directly supports the current canonical landing implementation or its deterministic quality gates; pilot in a scoped workflow before broader use.

### `microsoft--playwright` — [microsoft/playwright](https://github.com/microsoft/playwright)
- **Category/status:** `github-ai` / `shortlisted`; **decision:** `adopt-now`.
- **Factual summary:** Playwright is a framework for Web Testing and Automation. It allows testing Chromium, Firefox and WebKit with a single API.
- **Andamio use case / audience:** Cross-browser end-to-end testing; `developer`.
- **License/source:** `Apache-2.0` / `open-source`; license metadata confirmed by GitHub API.
- **Pricing/free scope:** `free`; repository source at the checked commit under `Apache-2.0`. Hosted services and third-party APIs are not included.
- **Checked version/activity:** `release v1.61.1 (2026-06-23); HEAD 129717a626d6 (2026-07-21)`; default branch `main`; **verified_on:** `2026-07-21`.
- **Freshness:** category `github-ai` 30 days; phase `research` 180 days; effective 30 days; checked_as_of `2026-07-21`.
- **Primary citations:** [capability README](https://github.com/microsoft/playwright/blob/129717a626d6ff1c870b19f285db7771f3b33a59/README.md) — `supports`, checked `2026-07-21`; [owner/archive/license metadata](https://api.github.com/repos/microsoft/playwright) — `supports`, checked `2026-07-21`; [checked HEAD](https://github.com/microsoft/playwright/commit/129717a626d6ff1c870b19f285db7771f3b33a59) — `supports`, checked `2026-07-21`.
- **Scores:** R5/E5/Q5/F5/C5/K4 = **29/30**.
- **Adoption risk/data/provider notes:** Repository code is free under the stated license; optional hosted services or third-party integrations are outside this pricing verification. Use least-privilege credentials; keep generated UI changes reviewable and retain deterministic tests/manual checks.
- **Decision rationale:** Directly supports the current canonical landing implementation or its deterministic quality gates; pilot in a scoped workflow before broader use.

### `cypress-io--cypress` — [cypress-io/cypress](https://github.com/cypress-io/cypress)
- **Category/status:** `github-ai` / `verified`; **decision:** `reference-only`.
- **Factual summary:** Fast, easy and reliable testing for anything that runs in a browser.
- **Andamio use case / audience:** Browser-based end-to-end and component testing; `developer`.
- **License/source:** `MIT` / `open-source`; license metadata confirmed by GitHub API.
- **Pricing/free scope:** `free`; repository source at the checked commit under `MIT`. Hosted services and third-party APIs are not included.
- **Checked version/activity:** `release v15.19.0 (2026-07-21); HEAD d19a47c24214 (2026-07-21)`; default branch `develop`; **verified_on:** `2026-07-21`.
- **Freshness:** category `github-ai` 30 days; phase `research` 180 days; effective 30 days; checked_as_of `2026-07-21`.
- **Primary citations:** [capability README](https://github.com/cypress-io/cypress/blob/d19a47c2421485e2352b89e3167a0a3237c2d21c/README.md) — `supports`, checked `2026-07-21`; [owner/archive/license metadata](https://api.github.com/repos/cypress-io/cypress) — `supports`, checked `2026-07-21`; [checked HEAD](https://github.com/cypress-io/cypress/commit/d19a47c2421485e2352b89e3167a0a3237c2d21c) — `supports`, checked `2026-07-21`.
- **Scores:** R5/E5/Q5/F5/C5/K4 = **29/30**.
- **Adoption risk/data/provider notes:** Repository code is free under the stated license; optional hosted services or third-party integrations are outside this pricing verification. Use least-privilege credentials; keep generated UI changes reviewable and retain deterministic tests/manual checks.
- **Decision rationale:** Useful primary reference, but not a current dependency recommendation; retain for patterns and comparison.

### `vitest-dev--vitest` — [vitest-dev/vitest](https://github.com/vitest-dev/vitest)
- **Category/status:** `github-ai` / `verified`; **decision:** `reference-only`.
- **Factual summary:** Next generation testing framework powered by Vite.
- **Andamio use case / audience:** Vite-native test framework; `developer`.
- **License/source:** `MIT` / `open-source`; license metadata confirmed by GitHub API.
- **Pricing/free scope:** `free`; repository source at the checked commit under `MIT`. Hosted services and third-party APIs are not included.
- **Checked version/activity:** `release v4.1.10 (2026-07-06); HEAD 15e0af953fd6 (2026-07-21)`; default branch `main`; **verified_on:** `2026-07-21`.
- **Freshness:** category `github-ai` 30 days; phase `research` 180 days; effective 30 days; checked_as_of `2026-07-21`.
- **Primary citations:** [capability README](https://github.com/vitest-dev/vitest/blob/15e0af953fd67e445324ceccda4547526e092cb4/README.md) — `supports`, checked `2026-07-21`; [owner/archive/license metadata](https://api.github.com/repos/vitest-dev/vitest) — `supports`, checked `2026-07-21`; [checked HEAD](https://github.com/vitest-dev/vitest/commit/15e0af953fd67e445324ceccda4547526e092cb4) — `supports`, checked `2026-07-21`.
- **Scores:** R5/E5/Q5/F5/C5/K4 = **29/30**.
- **Adoption risk/data/provider notes:** Repository code is free under the stated license; optional hosted services or third-party integrations are outside this pricing verification. Use least-privilege credentials; keep generated UI changes reviewable and retain deterministic tests/manual checks.
- **Decision rationale:** Useful primary reference, but not a current dependency recommendation; retain for patterns and comparison.

### `testing-library--react-testing-library` — [testing-library/react-testing-library](https://github.com/testing-library/react-testing-library)
- **Category/status:** `github-ai` / `verified`; **decision:** `reference-only`.
- **Factual summary:** 🐐 Simple and complete React DOM testing utilities that encourage good testing practices.
- **Andamio use case / audience:** User-focused React component testing; `developer`.
- **License/source:** `MIT` / `open-source`; license metadata confirmed by GitHub API.
- **Pricing/free scope:** `free`; repository source at the checked commit under `MIT`. Hosted services and third-party APIs are not included.
- **Checked version/activity:** `release v16.3.2 (2026-01-19); HEAD be9d81d91314 (2026-04-02)`; default branch `main`; **verified_on:** `2026-07-21`.
- **Freshness:** category `github-ai` 30 days; phase `research` 180 days; effective 30 days; checked_as_of `2026-07-21`.
- **Primary citations:** [capability README](https://github.com/testing-library/react-testing-library/blob/be9d81d91314c9f0bafaa363f70b409b4b31989c/README.md) — `supports`, checked `2026-07-21`; [owner/archive/license metadata](https://api.github.com/repos/testing-library/react-testing-library) — `supports`, checked `2026-07-21`; [checked HEAD](https://github.com/testing-library/react-testing-library/commit/be9d81d91314c9f0bafaa363f70b409b4b31989c) — `supports`, checked `2026-07-21`.
- **Scores:** R5/E5/Q5/F5/C5/K4 = **29/30**.
- **Adoption risk/data/provider notes:** Repository code is free under the stated license; optional hosted services or third-party integrations are outside this pricing verification. Use least-privilege credentials; keep generated UI changes reviewable and retain deterministic tests/manual checks.
- **Decision rationale:** Useful primary reference, but not a current dependency recommendation; retain for patterns and comparison.

### `dequelabs--axe-core` — [dequelabs/axe-core](https://github.com/dequelabs/axe-core)
- **Category/status:** `github-ai` / `shortlisted`; **decision:** `adopt-now`.
- **Factual summary:** Accessibility engine for automated Web UI testing
- **Andamio use case / audience:** Automated accessibility testing engine; `developer`.
- **License/source:** `MPL-2.0` / `open-source`; license metadata confirmed by GitHub API.
- **Pricing/free scope:** `free`; repository source at the checked commit under `MPL-2.0`. Hosted services and third-party APIs are not included.
- **Checked version/activity:** `release v4.12.1 (2026-06-10); HEAD a84d22887801 (2026-07-21)`; default branch `develop`; **verified_on:** `2026-07-21`.
- **Freshness:** category `github-ai` 30 days; phase `research` 180 days; effective 30 days; checked_as_of `2026-07-21`.
- **Primary citations:** [capability README](https://github.com/dequelabs/axe-core/blob/a84d228878018b4c3db7bb5865f6457524a9b255/README.md) — `supports`, checked `2026-07-21`; [owner/archive/license metadata](https://api.github.com/repos/dequelabs/axe-core) — `supports`, checked `2026-07-21`; [checked HEAD](https://github.com/dequelabs/axe-core/commit/a84d228878018b4c3db7bb5865f6457524a9b255) — `supports`, checked `2026-07-21`.
- **Scores:** R5/E5/Q4/F5/C5/K4 = **28/30**.
- **Adoption risk/data/provider notes:** Repository code is free under the stated license; optional hosted services or third-party integrations are outside this pricing verification. Use least-privilege credentials; keep generated UI changes reviewable and retain deterministic tests/manual checks.
- **Decision rationale:** Directly supports the current canonical landing implementation or its deterministic quality gates; pilot in a scoped workflow before broader use.

### `pa11y--pa11y` — [pa11y/pa11y](https://github.com/pa11y/pa11y)
- **Category/status:** `github-ai` / `verified`; **decision:** `reference-only`.
- **Factual summary:** Pa11y is your automated accessibility testing pal
- **Andamio use case / audience:** Command-line automated accessibility testing; `developer`.
- **License/source:** `LGPL-3.0` / `open-source`; license metadata confirmed by GitHub API.
- **Pricing/free scope:** `free`; repository source at the checked commit under `LGPL-3.0`. Hosted services and third-party APIs are not included.
- **Checked version/activity:** `release 9.1.1 (2026-02-26); HEAD 850325bd4b3c (2026-07-14)`; default branch `main`; **verified_on:** `2026-07-21`.
- **Freshness:** category `github-ai` 30 days; phase `research` 180 days; effective 30 days; checked_as_of `2026-07-21`.
- **Primary citations:** [capability README](https://github.com/pa11y/pa11y/blob/850325bd4b3ca8add9ce1c8a3fa0750528d75937/README.md) — `supports`, checked `2026-07-21`; [owner/archive/license metadata](https://api.github.com/repos/pa11y/pa11y) — `supports`, checked `2026-07-21`; [checked HEAD](https://github.com/pa11y/pa11y/commit/850325bd4b3ca8add9ce1c8a3fa0750528d75937) — `supports`, checked `2026-07-21`.
- **Scores:** R5/E5/Q4/F5/C5/K4 = **28/30**.
- **Adoption risk/data/provider notes:** Repository code is free under the stated license; optional hosted services or third-party integrations are outside this pricing verification. Use least-privilege credentials; keep generated UI changes reviewable and retain deterministic tests/manual checks.
- **Decision rationale:** Useful primary reference, but not a current dependency recommendation; retain for patterns and comparison.

### `googlechrome--lighthouse` — [GoogleChrome/lighthouse](https://github.com/GoogleChrome/lighthouse)
- **Category/status:** `github-ai` / `shortlisted`; **decision:** `adopt-now`.
- **Factual summary:** Automated auditing, performance metrics, and best practices for the web.
- **Andamio use case / audience:** Automated web quality auditing; `developer`.
- **License/source:** `Apache-2.0` / `open-source`; license metadata confirmed by GitHub API.
- **Pricing/free scope:** `free`; repository source at the checked commit under `Apache-2.0`. Hosted services and third-party APIs are not included.
- **Checked version/activity:** `release v13.4.1 (2026-07-20); HEAD 1d58f5b06d28 (2026-07-20)`; default branch `main`; **verified_on:** `2026-07-21`.
- **Freshness:** category `github-ai` 30 days; phase `research` 180 days; effective 30 days; checked_as_of `2026-07-21`.
- **Primary citations:** [capability README](https://github.com/GoogleChrome/lighthouse/blob/1d58f5b06d28e3419b38817a6c7488ec4413c67d/readme.md) — `supports`, checked `2026-07-21`; [owner/archive/license metadata](https://api.github.com/repos/GoogleChrome/lighthouse) — `supports`, checked `2026-07-21`; [checked HEAD](https://github.com/GoogleChrome/lighthouse/commit/1d58f5b06d28e3419b38817a6c7488ec4413c67d) — `supports`, checked `2026-07-21`.
- **Scores:** R5/E5/Q5/F5/C5/K4 = **29/30**.
- **Adoption risk/data/provider notes:** Repository code is free under the stated license; optional hosted services or third-party integrations are outside this pricing verification. Use least-privilege credentials; keep generated UI changes reviewable and retain deterministic tests/manual checks.
- **Decision rationale:** Directly supports the current canonical landing implementation or its deterministic quality gates; pilot in a scoped workflow before broader use.

### `sitespeedio--sitespeed.io` — [sitespeedio/sitespeed.io](https://github.com/sitespeedio/sitespeed.io)
- **Category/status:** `github-ai` / `verified`; **decision:** `reference-only`.
- **Factual summary:** sitespeed.io is an open-source tool for comprehensive web performance analysis, enabling you to test, monitor, and optimize your website’s speed using real browsers in various environments.
- **Andamio use case / audience:** Web performance measurement toolkit; `developer`.
- **License/source:** `MIT` / `open-source`; license metadata confirmed by GitHub API.
- **Pricing/free scope:** `free`; repository source at the checked commit under `MIT`. Hosted services and third-party APIs are not included.
- **Checked version/activity:** `release v42.2.0 (2026-07-20); HEAD 3bc8da2f64eb (2026-07-21)`; default branch `main`; **verified_on:** `2026-07-21`.
- **Freshness:** category `github-ai` 30 days; phase `research` 180 days; effective 30 days; checked_as_of `2026-07-21`.
- **Primary citations:** [capability README](https://github.com/sitespeedio/sitespeed.io/blob/3bc8da2f64eb25f41ff8956f85347f19de41c59e/README.md) — `supports`, checked `2026-07-21`; [owner/archive/license metadata](https://api.github.com/repos/sitespeedio/sitespeed.io) — `supports`, checked `2026-07-21`; [checked HEAD](https://github.com/sitespeedio/sitespeed.io/commit/3bc8da2f64eb25f41ff8956f85347f19de41c59e) — `supports`, checked `2026-07-21`.
- **Scores:** R5/E5/Q4/F5/C5/K4 = **28/30**.
- **Adoption risk/data/provider notes:** Repository code is free under the stated license; optional hosted services or third-party integrations are outside this pricing verification. Use least-privilege credentials; keep generated UI changes reviewable and retain deterministic tests/manual checks.
- **Decision rationale:** Useful primary reference, but not a current dependency recommendation; retain for patterns and comparison.

### `reg-viz--reg-suit` — [reg-viz/reg-suit](https://github.com/reg-viz/reg-suit)
- **Category/status:** `github-ai` / `shortlisted`; **decision:** `adopt-now`.
- **Factual summary:** :recycle: Visual Regression Testing tool
- **Andamio use case / audience:** Visual regression testing suite; `developer`.
- **License/source:** `MIT` / `open-source`; license metadata confirmed by GitHub API.
- **Pricing/free scope:** `free`; repository source at the checked commit under `MIT`. Hosted services and third-party APIs are not included.
- **Checked version/activity:** `release v0.14.6 (2026-03-16); HEAD 5c09c8eb1e35 (2026-03-16)`; default branch `master`; **verified_on:** `2026-07-21`.
- **Freshness:** category `github-ai` 30 days; phase `research` 180 days; effective 30 days; checked_as_of `2026-07-21`.
- **Primary citations:** [capability README](https://github.com/reg-viz/reg-suit/blob/5c09c8eb1e356d7e8145e5850e6de17b2b25a5a0/README.md) — `supports`, checked `2026-07-21`; [owner/archive/license metadata](https://api.github.com/repos/reg-viz/reg-suit) — `supports`, checked `2026-07-21`; [checked HEAD](https://github.com/reg-viz/reg-suit/commit/5c09c8eb1e356d7e8145e5850e6de17b2b25a5a0) — `supports`, checked `2026-07-21`.
- **Scores:** R5/E5/Q4/F5/C5/K4 = **28/30**.
- **Adoption risk/data/provider notes:** Repository code is free under the stated license; optional hosted services or third-party integrations are outside this pricing verification. Use least-privilege credentials; keep generated UI changes reviewable and retain deterministic tests/manual checks.
- **Decision rationale:** Directly supports the current canonical landing implementation or its deterministic quality gates; pilot in a scoped workflow before broader use.

### `garris--backstopjs` — [garris/BackstopJS](https://github.com/garris/BackstopJS)
- **Category/status:** `github-ai` / `verified`; **decision:** `reference-only`.
- **Factual summary:** Catch CSS curve balls.
- **Andamio use case / audience:** Browser-based visual regression testing; `developer`.
- **License/source:** `MIT` / `open-source`; license metadata confirmed by GitHub API.
- **Pricing/free scope:** `free`; repository source at the checked commit under `MIT`. Hosted services and third-party APIs are not included.
- **Checked version/activity:** `release v3.8.8 (2019-01-21); HEAD 930b3c863d39 (2024-09-07)`; default branch `master`; **verified_on:** `2026-07-21`.
- **Freshness:** category `github-ai` 30 days; phase `research` 180 days; effective 30 days; checked_as_of `2026-07-21`.
- **Primary citations:** [capability README](https://github.com/garris/BackstopJS/blob/930b3c863d3946fd3c8156166692739479ad51c7/README.md) — `supports`, checked `2026-07-21`; [owner/archive/license metadata](https://api.github.com/repos/garris/BackstopJS) — `supports`, checked `2026-07-21`; [checked HEAD](https://github.com/garris/BackstopJS/commit/930b3c863d3946fd3c8156166692739479ad51c7) — `supports`, checked `2026-07-21`.
- **Scores:** R5/E5/Q3/F5/C5/K3 = **26/30**.
- **Adoption risk/data/provider notes:** Repository code is free under the stated license; optional hosted services or third-party integrations are outside this pricing verification. Use least-privilege credentials; keep generated UI changes reviewable and retain deterministic tests/manual checks.
- **Decision rationale:** Useful primary reference, but not a current dependency recommendation; retain for patterns and comparison.

### `americanexpress--jest-image-snapshot` — [americanexpress/jest-image-snapshot](https://github.com/americanexpress/jest-image-snapshot)
- **Category/status:** `github-ai` / `verified`; **decision:** `reference-only`.
- **Factual summary:** ✨ Jest matcher for image comparisons. Most commonly used for visual regression testing.
- **Andamio use case / audience:** Jest image snapshot matching; `developer`.
- **License/source:** `Apache-2.0` / `open-source`; license metadata confirmed by GitHub API.
- **Pricing/free scope:** `free`; repository source at the checked commit under `Apache-2.0`. Hosted services and third-party APIs are not included.
- **Checked version/activity:** `release v6.5.2 (2026-03-09); HEAD c7e3056b034f (2026-05-15)`; default branch `main`; **verified_on:** `2026-07-21`.
- **Freshness:** category `github-ai` 30 days; phase `research` 180 days; effective 30 days; checked_as_of `2026-07-21`.
- **Primary citations:** [capability README](https://github.com/americanexpress/jest-image-snapshot/blob/c7e3056b034f8cb60c3016ef18963b0ad8bb127a/README.md) — `supports`, checked `2026-07-21`; [owner/archive/license metadata](https://api.github.com/repos/americanexpress/jest-image-snapshot) — `supports`, checked `2026-07-21`; [checked HEAD](https://github.com/americanexpress/jest-image-snapshot/commit/c7e3056b034f8cb60c3016ef18963b0ad8bb127a) — `supports`, checked `2026-07-21`.
- **Scores:** R5/E5/Q4/F5/C5/K4 = **28/30**.
- **Adoption risk/data/provider notes:** Repository code is free under the stated license; optional hosted services or third-party integrations are outside this pricing verification. Use least-privilege credentials; keep generated UI changes reviewable and retain deterministic tests/manual checks.
- **Decision rationale:** Useful primary reference, but not a current dependency recommendation; retain for patterns and comparison.

### `stylelint--stylelint` — [stylelint/stylelint](https://github.com/stylelint/stylelint)
- **Category/status:** `github-ai` / `verified`; **decision:** `reference-only`.
- **Factual summary:** A mighty CSS linter that helps you avoid errors and enforce conventions.
- **Andamio use case / audience:** CSS linting and rule enforcement; `developer`.
- **License/source:** `MIT` / `open-source`; license metadata confirmed by GitHub API.
- **Pricing/free scope:** `free`; repository source at the checked commit under `MIT`. Hosted services and third-party APIs are not included.
- **Checked version/activity:** `release 17.14.1 (2026-07-20); HEAD 43921857af41 (2026-07-21)`; default branch `main`; **verified_on:** `2026-07-21`.
- **Freshness:** category `github-ai` 30 days; phase `research` 180 days; effective 30 days; checked_as_of `2026-07-21`.
- **Primary citations:** [capability README](https://github.com/stylelint/stylelint/blob/43921857af41277a02cad0948f5f2889edbbc43c/README.md) — `supports`, checked `2026-07-21`; [owner/archive/license metadata](https://api.github.com/repos/stylelint/stylelint) — `supports`, checked `2026-07-21`; [checked HEAD](https://github.com/stylelint/stylelint/commit/43921857af41277a02cad0948f5f2889edbbc43c) — `supports`, checked `2026-07-21`.
- **Scores:** R5/E5/Q5/F5/C5/K4 = **29/30**.
- **Adoption risk/data/provider notes:** Repository code is free under the stated license; optional hosted services or third-party integrations are outside this pricing verification. Use least-privilege credentials; keep generated UI changes reviewable and retain deterministic tests/manual checks.
- **Decision rationale:** Useful primary reference, but not a current dependency recommendation; retain for patterns and comparison.

### `eslint--eslint` — [eslint/eslint](https://github.com/eslint/eslint)
- **Category/status:** `github-ai` / `verified`; **decision:** `reference-only`.
- **Factual summary:** Find and fix problems in your JavaScript code.
- **Andamio use case / audience:** JavaScript linting and rule enforcement; `developer`.
- **License/source:** `MIT` / `open-source`; license metadata confirmed by GitHub API.
- **Pricing/free scope:** `free`; repository source at the checked commit under `MIT`. Hosted services and third-party APIs are not included.
- **Checked version/activity:** `release v10.7.0 (2026-07-10); HEAD 2fee9bb74161 (2026-07-21)`; default branch `main`; **verified_on:** `2026-07-21`.
- **Freshness:** category `github-ai` 30 days; phase `research` 180 days; effective 30 days; checked_as_of `2026-07-21`.
- **Primary citations:** [capability README](https://github.com/eslint/eslint/blob/2fee9bb7416116cbed4d8c8100b1ae713b6356a1/README.md) — `supports`, checked `2026-07-21`; [owner/archive/license metadata](https://api.github.com/repos/eslint/eslint) — `supports`, checked `2026-07-21`; [checked HEAD](https://github.com/eslint/eslint/commit/2fee9bb7416116cbed4d8c8100b1ae713b6356a1) — `supports`, checked `2026-07-21`.
- **Scores:** R5/E5/Q5/F5/C5/K4 = **29/30**.
- **Adoption risk/data/provider notes:** Repository code is free under the stated license; optional hosted services or third-party integrations are outside this pricing verification. Use least-privilege credentials; keep generated UI changes reviewable and retain deterministic tests/manual checks.
- **Decision rationale:** Useful primary reference, but not a current dependency recommendation; retain for patterns and comparison.

### `prettier--prettier` — [prettier/prettier](https://github.com/prettier/prettier)
- **Category/status:** `github-ai` / `verified`; **decision:** `reference-only`.
- **Factual summary:** Prettier is an opinionated code formatter.
- **Andamio use case / audience:** Opinionated source formatter; `developer`.
- **License/source:** `MIT` / `open-source`; license metadata confirmed by GitHub API.
- **Pricing/free scope:** `free`; repository source at the checked commit under `MIT`. Hosted services and third-party APIs are not included.
- **Checked version/activity:** `release 3.9.6 (2026-07-21); HEAD 0512f04f32c7 (2026-07-21)`; default branch `main`; **verified_on:** `2026-07-21`.
- **Freshness:** category `github-ai` 30 days; phase `research` 180 days; effective 30 days; checked_as_of `2026-07-21`.
- **Primary citations:** [capability README](https://github.com/prettier/prettier/blob/0512f04f32c7421a2175efca52f1bafa9f2a6f44/README.md) — `supports`, checked `2026-07-21`; [owner/archive/license metadata](https://api.github.com/repos/prettier/prettier) — `supports`, checked `2026-07-21`; [checked HEAD](https://github.com/prettier/prettier/commit/0512f04f32c7421a2175efca52f1bafa9f2a6f44) — `supports`, checked `2026-07-21`.
- **Scores:** R5/E5/Q5/F5/C5/K4 = **29/30**.
- **Adoption risk/data/provider notes:** Repository code is free under the stated license; optional hosted services or third-party integrations are outside this pricing verification. Use least-privilege credentials; keep generated UI changes reviewable and retain deterministic tests/manual checks.
- **Decision rationale:** Useful primary reference, but not a current dependency recommendation; retain for patterns and comparison.

### `vitejs--vite` — [vitejs/vite](https://github.com/vitejs/vite)
- **Category/status:** `github-ai` / `verified`; **decision:** `reference-only`.
- **Factual summary:** Next generation frontend tooling. It's fast!
- **Andamio use case / audience:** Frontend build tooling; `developer`.
- **License/source:** `MIT` / `open-source`; license metadata confirmed by GitHub API.
- **Pricing/free scope:** `free`; repository source at the checked commit under `MIT`. Hosted services and third-party APIs are not included.
- **Checked version/activity:** `release v8.1.5 (2026-07-16); HEAD c60b4d7cdb85 (2026-07-21)`; default branch `main`; **verified_on:** `2026-07-21`.
- **Freshness:** category `github-ai` 30 days; phase `research` 180 days; effective 30 days; checked_as_of `2026-07-21`.
- **Primary citations:** [capability README](https://github.com/vitejs/vite/blob/c60b4d7cdb85b7d4f78671cdcfb863e5f8b66bb7/README.md) — `supports`, checked `2026-07-21`; [owner/archive/license metadata](https://api.github.com/repos/vitejs/vite) — `supports`, checked `2026-07-21`; [checked HEAD](https://github.com/vitejs/vite/commit/c60b4d7cdb85b7d4f78671cdcfb863e5f8b66bb7) — `supports`, checked `2026-07-21`.
- **Scores:** R5/E5/Q5/F5/C5/K4 = **29/30**.
- **Adoption risk/data/provider notes:** Repository code is free under the stated license; optional hosted services or third-party integrations are outside this pricing verification. Use least-privilege credentials; keep generated UI changes reviewable and retain deterministic tests/manual checks.
- **Decision rationale:** Useful primary reference, but not a current dependency recommendation; retain for patterns and comparison.

### `builderio--mitosis` — [BuilderIO/mitosis](https://github.com/BuilderIO/mitosis)
- **Category/status:** `github-ai` / `verified`; **decision:** `reference-only`.
- **Factual summary:** Write components once, run everywhere. Compiles to React, Vue, Qwik, Solid, Angular, Svelte, and more.
- **Andamio use case / audience:** Component authoring across frontend frameworks; `developer`.
- **License/source:** `MIT` / `open-source`; license metadata confirmed by GitHub API.
- **Pricing/free scope:** `free`; repository source at the checked commit under `MIT`. Hosted services and third-party APIs are not included.
- **Checked version/activity:** `release @builder.io/mitosis-cli@0.14.0 (2026-07-21); HEAD cb1e2105c219 (2026-07-21)`; default branch `main`; **verified_on:** `2026-07-21`.
- **Freshness:** category `github-ai` 30 days; phase `research` 180 days; effective 30 days; checked_as_of `2026-07-21`.
- **Primary citations:** [capability README](https://github.com/BuilderIO/mitosis/blob/cb1e2105c21971f336a1d8a4ff9a0406716471a0/README.MD) — `supports`, checked `2026-07-21`; [owner/archive/license metadata](https://api.github.com/repos/BuilderIO/mitosis) — `supports`, checked `2026-07-21`; [checked HEAD](https://github.com/BuilderIO/mitosis/commit/cb1e2105c21971f336a1d8a4ff9a0406716471a0) — `supports`, checked `2026-07-21`.
- **Scores:** R5/E5/Q5/F5/C5/K4 = **29/30**.
- **Adoption risk/data/provider notes:** Repository code is free under the stated license; optional hosted services or third-party integrations are outside this pricing verification. Use least-privilege credentials; keep generated UI changes reviewable and retain deterministic tests/manual checks.
- **Decision rationale:** Useful primary reference, but not a current dependency recommendation; retain for patterns and comparison.

### `builderio--figma-html` — [BuilderIO/figma-html](https://github.com/BuilderIO/figma-html)
- **Category/status:** `github-ai` / `verified`; **decision:** `reference-only`.
- **Factual summary:** Convert any website to editable Figma designs
- **Andamio use case / audience:** Figma-to-HTML experimentation; `developer`.
- **License/source:** `MIT` / `open-source`; license metadata confirmed by GitHub API.
- **Pricing/free scope:** `free`; repository source at the checked commit under `MIT`. Hosted services and third-party APIs are not included.
- **Checked version/activity:** `HEAD 2b244343ba3f (2025-08-19)`; default branch `master`; **verified_on:** `2026-07-21`.
- **Freshness:** category `github-ai` 30 days; phase `research` 180 days; effective 30 days; checked_as_of `2026-07-21`.
- **Primary citations:** [capability README](https://github.com/BuilderIO/figma-html/blob/2b244343ba3fcc1a2de50fa652e13833e78e36f9/README.md) — `supports`, checked `2026-07-21`; [owner/archive/license metadata](https://api.github.com/repos/BuilderIO/figma-html) — `supports`, checked `2026-07-21`; [checked HEAD](https://github.com/BuilderIO/figma-html/commit/2b244343ba3fcc1a2de50fa652e13833e78e36f9) — `supports`, checked `2026-07-21`.
- **Scores:** R5/E5/Q4/F5/C5/K4 = **28/30**.
- **Adoption risk/data/provider notes:** Repository code is free under the stated license; optional hosted services or third-party integrations are outside this pricing verification. Use least-privilege credentials; keep generated UI changes reviewable and retain deterministic tests/manual checks.
- **Decision rationale:** Useful primary reference, but not a current dependency recommendation; retain for patterns and comparison.

### `plasmicapp--plasmic` — [plasmicapp/plasmic](https://github.com/plasmicapp/plasmic)
- **Category/status:** `github-ai` / `verified`; **decision:** `reference-only`.
- **Factual summary:** Visual builder for React. Build apps, websites, and content. Integrate with your codebase.
- **Andamio use case / audience:** Visual builder integrated with codebases; `both`.
- **License/source:** `MIT` / `open-source`; license metadata confirmed by GitHub API.
- **Pricing/free scope:** `free`; repository source at the checked commit under `MIT`. Hosted services and third-party APIs are not included.
- **Checked version/activity:** `HEAD eeb70a5522e9 (2026-07-20)`; default branch `master`; **verified_on:** `2026-07-21`.
- **Freshness:** category `github-ai` 30 days; phase `research` 180 days; effective 30 days; checked_as_of `2026-07-21`.
- **Primary citations:** [capability README](https://github.com/plasmicapp/plasmic/blob/eeb70a5522e97f02be96405de763900bccd8a461/README.md) — `supports`, checked `2026-07-21`; [owner/archive/license metadata](https://api.github.com/repos/plasmicapp/plasmic) — `supports`, checked `2026-07-21`; [checked HEAD](https://github.com/plasmicapp/plasmic/commit/eeb70a5522e97f02be96405de763900bccd8a461) — `supports`, checked `2026-07-21`.
- **Scores:** R5/E5/Q4/F5/C5/K4 = **28/30**.
- **Adoption risk/data/provider notes:** Repository code is free under the stated license; optional hosted services or third-party integrations are outside this pricing verification. Use least-privilege credentials; keep generated UI changes reviewable and retain deterministic tests/manual checks.
- **Decision rationale:** Useful primary reference, but not a current dependency recommendation; retain for patterns and comparison.
