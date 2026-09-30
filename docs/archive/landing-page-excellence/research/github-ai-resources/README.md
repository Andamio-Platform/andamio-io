# GitHub and AI Resources

Phase 3 catalog of license-verified GitHub repositories useful to Andamio landing-page design and implementation. Records follow the [normalized methodology](../methodology.md).

## Mechanical inventory

- **checked_as_of / verified_on:** `2026-07-21`
- **Freshness:** category `github-ai = 30 days`; research phase `180 days`; effective window `30 days`.
- **Candidate rows inspected:** `98`
- **Accepted unique, non-archived, SPDX-license-verified repositories:** `75`
- **Rejected rows:** `23`
- **Duplicate canonical repositories rejected:** `1`
- **Archived repositories rejected:** `2`
- **Accepted category counts:** skills/rules `11`; prompts/workflows `13`; MCP/design/implementation `28`; agent/evaluation/quality `23`.

## Catalogs

- [Installable skills and rules](installable-skills-and-rules.md) — 11
- [Prompts and workflows](prompts-and-workflows.md) — 13
- [MCP, design integrations, and implementation tools](mcp-design-and-implementation-tools.md) — 28
- [Agent, evaluation, and quality frameworks](agent-evaluation-and-quality-frameworks.md) — 23
- [Verification report](verification.md)
- [Andamio shortlist](../shortlists/github-ai-shortlist.md)

## Discovery and verification procedure

Candidate discovery used direct known-project queries plus GitHub repository search concepts equivalent to:

```text
agent skills rules cursor claude copilot
prompt engineering agent workflows
mcp design figma browser frontend
accessibility visual regression web quality
agent framework llm evaluation observability
```

Each row was resolved to its canonical owner/name and checked with these commands (substitute `OWNER/REPO` and `BRANCH`):

```powershell
gh repo view OWNER/REPO --json nameWithOwner,url,isArchived,defaultBranchRef,licenseInfo,latestRelease,pushedAt
gh api repos/OWNER/REPO
gh api repos/OWNER/REPO/commits/BRANCH
gh api 'repos/OWNER/REPO/readme?ref=COMMIT_SHA'
gh api repos/OWNER/REPO/releases/latest
```

The generator rejected missing repositories, archived repositories, unknown/non-SPDX license metadata, missing default-branch HEADs, unreadable READMEs, and duplicate canonical URLs. Repository descriptions were not treated as sufficient capability evidence: each accepted row also required a readable README at the checked commit.
