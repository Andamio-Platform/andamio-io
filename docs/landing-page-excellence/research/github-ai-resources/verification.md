# GitHub AI Research Verification

- **Run date:** `2026-07-21`
- **Candidates:** `98`
- **Accepted:** `75`
- **Rejected:** `23`
- **Unique accepted canonical URLs:** `75`

## Rejected candidate ledger

| Requested repository | Resolved canonical repository | Category | Reason |
|---|---|---|---|
| [anthropics/skills](https://github.com/anthropics/skills) | [anthropics/skills](https://github.com/anthropics/skills) | skills | unknown or non-SPDX license (missing) |
| [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) | [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) | skills | unknown or non-SPDX license (missing) |
| [hesreallyhim/awesome-claude-code](https://github.com/hesreallyhim/awesome-claude-code) | [hesreallyhim/awesome-claude-code](https://github.com/hesreallyhim/awesome-claude-code) | skills | unknown or non-SPDX license (NOASSERTION) |
| [simonw/claude-skills](https://github.com/simonw/claude-skills) | [simonw/claude-skills](https://github.com/simonw/claude-skills) | skills | unknown or non-SPDX license (missing) |
| [ComposioHQ/awesome-claude-skills](https://github.com/ComposioHQ/awesome-claude-skills) | [ComposioHQ/awesome-claude-skills](https://github.com/ComposioHQ/awesome-claude-skills) | skills | unknown or non-SPDX license (missing) |
| [steipete/agent-rules](https://github.com/steipete/agent-rules) | [steipete/agent-rules](https://github.com/steipete/agent-rules) | skills | archived |
| [modelcontextprotocol/servers](https://github.com/modelcontextprotocol/servers) | [modelcontextprotocol/servers](https://github.com/modelcontextprotocol/servers) | skills | unknown or non-SPDX license (NOASSERTION) |
| [f/awesome-chatgpt-prompts](https://github.com/f/awesome-chatgpt-prompts) | [f/prompts.chat](https://github.com/f/prompts.chat) | prompts | unknown or non-SPDX license (NOASSERTION) |
| [StanGirard/quivr](https://github.com/StanGirard/quivr) | [QuivrHQ/quivr](https://github.com/QuivrHQ/quivr) | prompts | unknown or non-SPDX license (NOASSERTION) |
| [Significant-Gravitas/AutoGPT](https://github.com/Significant-Gravitas/AutoGPT) | [Significant-Gravitas/AutoGPT](https://github.com/Significant-Gravitas/AutoGPT) | prompts | unknown or non-SPDX license (NOASSERTION) |
| [humanlayer/12-factor-agents](https://github.com/humanlayer/12-factor-agents) | [humanlayer/12-factor-agents](https://github.com/humanlayer/12-factor-agents) | prompts | unknown or non-SPDX license (NOASSERTION) |
| [e2b-dev/awesome-ai-agents](https://github.com/e2b-dev/awesome-ai-agents) | [e2b-dev/awesome-ai-agents](https://github.com/e2b-dev/awesome-ai-agents) | prompts | unknown or non-SPDX license (NOASSERTION) |
| [modelcontextprotocol/typescript-sdk](https://github.com/modelcontextprotocol/typescript-sdk) | [modelcontextprotocol/typescript-sdk](https://github.com/modelcontextprotocol/typescript-sdk) | tools | unknown or non-SPDX license (NOASSERTION) |
| [browserbase/mcp-server-browserbase](https://github.com/browserbase/mcp-server-browserbase) | [browserbase/mcp-server-browserbase](https://github.com/browserbase/mcp-server-browserbase) | tools | archived |
| [punkpeye/awesome-mcp-servers](https://github.com/punkpeye/awesome-mcp-servers) | [punkpeye/awesome-mcp-servers](https://github.com/punkpeye/awesome-mcp-servers) | tools | README too small for capability verification |
| [w3c/aria-practices](https://github.com/w3c/aria-practices) | [w3c/aria-practices](https://github.com/w3c/aria-practices) | tools | unknown or non-SPDX license (NOASSERTION) |
| [mastra-ai/mastra](https://github.com/mastra-ai/mastra) | [mastra-ai/mastra](https://github.com/mastra-ai/mastra) | frameworks | unknown or non-SPDX license (NOASSERTION) |
| [langfuse/langfuse](https://github.com/langfuse/langfuse) | [langfuse/langfuse](https://github.com/langfuse/langfuse) | frameworks | unknown or non-SPDX license (NOASSERTION) |
| [Arize-ai/phoenix](https://github.com/Arize-ai/phoenix) | [Arize-ai/phoenix](https://github.com/Arize-ai/phoenix) | frameworks | unknown or non-SPDX license (NOASSERTION) |
| [openai/evals](https://github.com/openai/evals) | [openai/evals](https://github.com/openai/evals) | frameworks | unknown or non-SPDX license (NOASSERTION) |
| [BerriAI/litellm](https://github.com/BerriAI/litellm) | [BerriAI/litellm](https://github.com/BerriAI/litellm) | frameworks | unknown or non-SPDX license (NOASSERTION) |
| [FoundationAgents/MetaGPT](https://github.com/FoundationAgents/MetaGPT) | [FoundationAgents/MetaGPT](https://github.com/FoundationAgents/MetaGPT) | frameworks | duplicate canonical repository |
| [All-Hands-AI/OpenHands](https://github.com/All-Hands-AI/OpenHands) | [OpenHands/OpenHands](https://github.com/OpenHands/OpenHands) | frameworks | unknown or non-SPDX license (NOASSERTION) |

## Automated validation contract

The final validation pass checks catalog record counts, globally unique stable IDs and canonical URLs, accepted URL/API reachability, required fields, score arithmetic, relative Markdown links, and whitespace errors.

## Final validation result

Executed on `2026-07-21`:

```powershell
python docs/landing-page-excellence/research/github-ai-resources/validate_catalogs.py
python -m py_compile docs/landing-page-excellence/research/github-ai-resources/generate_catalogs.py docs/landing-page-excellence/research/github-ai-resources/validate_catalogs.py
git diff --check
```

- Catalog counts: `11 + 13 + 28 + 23 = 75`.
- Unique stable IDs: `75`.
- Unique canonical GitHub URLs: `75`.
- GitHub API URLs checked: `75`; failures: `0`.
- Required record fields, score arithmetic, relative links, Python syntax, and patch whitespace: `PASS`.
