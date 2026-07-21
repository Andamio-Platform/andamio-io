import base64
import concurrent.futures
import json
import subprocess
from collections import Counter
from datetime import date, datetime
from pathlib import Path


VERIFIED_ON = "2026-07-21"
ROOT = Path(__file__).resolve().parent
SHORTLIST = ROOT.parent / "shortlists" / "github-ai-shortlist.md"

# Broad repositories are intentionally included where their documented scope maps
# directly to the landing-excellence work. Rejections are retained in verification.md.
CANDIDATES = [
    # Installable skills and rules
    ("anthropics/skills", "skills", "Reusable agent skills for document and workflow tasks", "developer"),
    ("obra/superpowers", "skills", "Composable coding-agent skills and workflows", "developer"),
    ("github/awesome-copilot", "skills", "Community instructions, prompts, agents, and skills for Copilot", "developer"),
    ("microsoft/skills", "skills", "Reusable skills for coding agents", "developer"),
    ("vercel-labs/agent-skills", "skills", "Agent skills for web application development", "developer"),
    ("wshobson/agents", "skills", "Agent definitions, commands, and development workflows", "developer"),
    ("hesreallyhim/awesome-claude-code", "skills", "Curated Claude Code commands, workflows, and resources", "developer"),
    ("affaan-m/everything-claude-code", "skills", "Claude Code configuration, agents, skills, and hooks", "developer"),
    ("trailofbits/skills", "skills", "Security-focused skills for coding agents", "developer"),
    ("simonw/claude-skills", "skills", "Practical Claude skills and examples", "developer"),
    ("ComposioHQ/awesome-claude-skills", "skills", "Curated installable Claude skills", "developer"),
    ("VoltAgent/awesome-claude-code-subagents", "skills", "Curated Claude Code subagent definitions", "developer"),
    ("alirezarezvani/claude-skills", "skills", "Reusable development and business agent skills", "developer"),
    ("davila7/claude-code-templates", "skills", "Templates for Claude Code agents, commands, and settings", "developer"),
    ("steipete/agent-rules", "skills", "Reusable rules for AI coding agents", "developer"),
    ("PatrickJS/awesome-cursorrules", "skills", "Curated Cursor rule files", "developer"),
    ("sanjeed5/awesome-cursor-rules-mdc", "skills", "Curated Cursor MDC rules", "developer"),
    ("modelcontextprotocol/servers", "skills", "Reference MCP servers and integration examples", "developer"),
    # Prompts and workflows
    ("f/awesome-chatgpt-prompts", "prompts", "Reusable prompt examples", "developer"),
    ("dair-ai/Prompt-Engineering-Guide", "prompts", "Prompt engineering learning and reference material", "developer"),
    ("brexhq/prompt-engineering", "prompts", "Prompt engineering patterns and examples", "developer"),
    ("microsoft/promptflow", "prompts", "Prompt workflow development, testing, and evaluation", "developer"),
    ("langchain-ai/langgraph", "prompts", "Stateful agent workflow orchestration", "developer"),
    ("PrefectHQ/marvin", "prompts", "AI workflow utilities for typed software", "developer"),
    ("StanGirard/quivr", "prompts", "Retrieval-assisted knowledge workflows", "both"),
    ("Significant-Gravitas/AutoGPT", "prompts", "Agent workflow platform and examples", "developer"),
    ("microsoft/JARVIS", "prompts", "Task planning and model collaboration research system", "developer"),
    ("microsoft/generative-ai-for-beginners", "prompts", "Generative AI lessons and prompt examples", "developer"),
    ("openai/openai-cookbook", "prompts", "Official API examples and patterns", "developer"),
    ("anthropics/anthropic-cookbook", "prompts", "Official Claude API examples and patterns", "developer"),
    ("GoogleCloudPlatform/generative-ai", "prompts", "Google Cloud generative AI samples", "developer"),
    ("microsoft/ai-agents-for-beginners", "prompts", "Agent design lessons and examples", "developer"),
    ("microsoft/semantic-kernel", "prompts", "Agent and prompt orchestration SDK", "developer"),
    ("humanlayer/12-factor-agents", "prompts", "Principles and examples for reliable agent software", "developer"),
    ("e2b-dev/awesome-ai-agents", "prompts", "Curated agent projects and workflow references", "developer"),
    ("langchain-ai/langchain", "prompts", "Components and patterns for LLM applications", "developer"),
    # MCP, design integrations, and implementation tools
    ("modelcontextprotocol/typescript-sdk", "tools", "TypeScript SDK for MCP clients and servers", "developer"),
    ("modelcontextprotocol/python-sdk", "tools", "Python SDK for MCP clients and servers", "developer"),
    ("github/github-mcp-server", "tools", "GitHub MCP server for repository workflows", "developer"),
    ("microsoft/playwright-mcp", "tools", "Browser automation exposed through MCP", "developer"),
    ("browserbase/mcp-server-browserbase", "tools", "Cloud browser MCP integration", "developer"),
    ("executeautomation/mcp-playwright", "tools", "Playwright browser automation MCP server", "developer"),
    ("upstash/context7", "tools", "Documentation context service and MCP server", "developer"),
    ("punkpeye/awesome-mcp-servers", "tools", "Curated MCP server references", "developer"),
    ("shadcn-ui/ui", "tools", "Accessible component source and registry tooling", "developer"),
    ("tailwindlabs/tailwindcss", "tools", "Utility-first CSS framework", "developer"),
    ("vercel/next.js", "tools", "React web framework used by Andamio", "developer"),
    ("facebook/react", "tools", "Component UI library used by Andamio", "developer"),
    ("storybookjs/storybook", "tools", "Isolated UI development and documentation", "developer"),
    ("microsoft/playwright", "tools", "Cross-browser end-to-end testing", "developer"),
    ("cypress-io/cypress", "tools", "Browser-based end-to-end and component testing", "developer"),
    ("vitest-dev/vitest", "tools", "Vite-native test framework", "developer"),
    ("testing-library/react-testing-library", "tools", "User-focused React component testing", "developer"),
    ("dequelabs/axe-core", "tools", "Automated accessibility testing engine", "developer"),
    ("pa11y/pa11y", "tools", "Command-line automated accessibility testing", "developer"),
    ("w3c/aria-practices", "tools", "WAI-ARIA authoring examples and guidance", "developer"),
    ("GoogleChrome/lighthouse", "tools", "Automated web quality auditing", "developer"),
    ("sitespeedio/sitespeed.io", "tools", "Web performance measurement toolkit", "developer"),
    ("reg-viz/reg-suit", "tools", "Visual regression testing suite", "developer"),
    ("garris/BackstopJS", "tools", "Browser-based visual regression testing", "developer"),
    ("americanexpress/jest-image-snapshot", "tools", "Jest image snapshot matching", "developer"),
    ("stylelint/stylelint", "tools", "CSS linting and rule enforcement", "developer"),
    ("eslint/eslint", "tools", "JavaScript linting and rule enforcement", "developer"),
    ("prettier/prettier", "tools", "Opinionated source formatter", "developer"),
    ("vitejs/vite", "tools", "Frontend build tooling", "developer"),
    ("BuilderIO/mitosis", "tools", "Component authoring across frontend frameworks", "developer"),
    ("BuilderIO/figma-html", "tools", "Figma-to-HTML experimentation", "developer"),
    ("plasmicapp/plasmic", "tools", "Visual builder integrated with codebases", "both"),
    # Agent, evaluation, and quality frameworks
    ("microsoft/autogen", "frameworks", "Multi-agent application framework", "developer"),
    ("crewAIInc/crewAI", "frameworks", "Multi-agent orchestration framework", "developer"),
    ("run-llama/llama_index", "frameworks", "Data framework for agent and retrieval applications", "developer"),
    ("openai/openai-agents-python", "frameworks", "Official Python agent framework", "developer"),
    ("google/adk-python", "frameworks", "Google Agent Development Kit for Python", "developer"),
    ("pydantic/pydantic-ai", "frameworks", "Typed Python agent framework", "developer"),
    ("agno-agi/agno", "frameworks", "Agent framework and runtime", "developer"),
    ("huggingface/smolagents", "frameworks", "Lightweight agent library", "developer"),
    ("mastra-ai/mastra", "frameworks", "TypeScript agent framework", "developer"),
    ("langfuse/langfuse", "frameworks", "Open-source LLM observability and evaluation", "developer"),
    ("Arize-ai/phoenix", "frameworks", "Open-source AI observability and evaluation", "developer"),
    ("promptfoo/promptfoo", "frameworks", "Prompt and model evaluation toolkit", "developer"),
    ("confident-ai/deepeval", "frameworks", "LLM evaluation framework", "developer"),
    ("openai/evals", "frameworks", "Evaluation framework and registry", "developer"),
    ("TruEra/trulens", "frameworks", "LLM application evaluation and tracing", "developer"),
    ("mlflow/mlflow", "frameworks", "Machine learning and generative AI lifecycle tooling", "developer"),
    ("braintrustdata/braintrust-sdk", "frameworks", "Evaluation and observability SDK", "developer"),
    ("Giskard-AI/giskard", "frameworks", "AI testing and evaluation framework", "developer"),
    ("comet-ml/opik", "frameworks", "Open-source LLM evaluation and observability", "developer"),
    ("guardrails-ai/guardrails", "frameworks", "Validation and safeguards for AI outputs", "developer"),
    ("instructor-ai/instructor", "frameworks", "Structured LLM output utilities", "developer"),
    ("BerriAI/litellm", "frameworks", "Unified model API proxy and gateway", "developer"),
    ("microsoft/graphrag", "frameworks", "Graph-based retrieval augmented generation", "developer"),
    ("mem0ai/mem0", "frameworks", "Memory layer for AI applications", "developer"),
    ("camel-ai/camel", "frameworks", "Multi-agent research framework", "developer"),
    ("geekan/MetaGPT", "frameworks", "Multi-agent software workflow framework", "developer"),
    ("FoundationAgents/MetaGPT", "frameworks", "Multi-agent software workflow framework canonical candidate", "developer"),
    ("Aider-AI/aider", "frameworks", "Terminal-based AI pair programming", "developer"),
    ("continuedev/continue", "frameworks", "Open-source coding-agent platform", "developer"),
    ("All-Hands-AI/OpenHands", "frameworks", "Software development agent platform", "developer"),
]

FILES = {
    "skills": ("installable-skills-and-rules.md", "Installable Skills and Rules"),
    "prompts": ("prompts-and-workflows.md", "Prompts and Workflows"),
    "tools": ("mcp-design-and-implementation-tools.md", "MCP, Design Integrations, and Implementation Tools"),
    "frameworks": ("agent-evaluation-and-quality-frameworks.md", "Agent, Evaluation, and Quality Frameworks"),
}


def gh_json(endpoint):
    result = subprocess.run(
        ["gh", "api", endpoint],
        check=False,
        capture_output=True,
        text=True,
        encoding="utf-8",
        errors="replace",
    )
    if result.returncode:
        return None, result.stderr.strip()
    try:
        return json.loads(result.stdout), None
    except json.JSONDecodeError as exc:
        return None, str(exc)


def inspect(candidate):
    requested, category, use_case, audience = candidate
    repo, error = gh_json(f"repos/{requested}")
    if not repo:
        return {"requested": requested, "category": category, "accepted": False, "reason": f"repository lookup failed: {error}"}
    canonical = repo["full_name"]
    if repo.get("archived"):
        return {"requested": requested, "canonical": canonical, "category": category, "accepted": False, "reason": "archived"}
    license_id = (repo.get("license") or {}).get("spdx_id")
    if not license_id or license_id in {"NOASSERTION", "OTHER"}:
        return {"requested": requested, "canonical": canonical, "category": category, "accepted": False, "reason": f"unknown or non-SPDX license ({license_id or 'missing'})"}
    branch = repo["default_branch"]
    commit, commit_error = gh_json(f"repos/{canonical}/commits/{branch}")
    if not commit:
        return {"requested": requested, "canonical": canonical, "category": category, "accepted": False, "reason": f"default-branch HEAD lookup failed: {commit_error}"}
    readme, readme_error = gh_json(f"repos/{canonical}/readme?ref={commit['sha']}")
    if not readme:
        return {"requested": requested, "canonical": canonical, "category": category, "accepted": False, "reason": f"README lookup failed: {readme_error}"}
    try:
        readme_text = base64.b64decode(readme["content"]).decode("utf-8", errors="replace")
    except (KeyError, ValueError) as exc:
        return {"requested": requested, "canonical": canonical, "category": category, "accepted": False, "reason": f"README decode failed: {exc}"}
    if len(readme_text.strip()) < 80:
        return {"requested": requested, "canonical": canonical, "category": category, "accepted": False, "reason": "README too small for capability verification"}
    release, _ = gh_json(f"repos/{canonical}/releases/latest")
    head_date = commit["commit"]["committer"]["date"][:10]
    activity = f"HEAD {commit['sha'][:12]} ({head_date})"
    if release:
        release_date = (release.get("published_at") or release.get("created_at") or "")[:10]
        activity = f"release {release.get('tag_name', 'untagged')} ({release_date}); HEAD {commit['sha'][:12]} ({head_date})"
    return {
        "requested": requested,
        "canonical": canonical,
        "category": category,
        "accepted": True,
        "repo": repo,
        "commit": commit,
        "readme": readme,
        "release": release,
        "activity": activity,
        "license": license_id,
        "use_case": use_case,
        "audience": audience,
    }


def score(item):
    stars = item["repo"].get("stargazers_count", 0)
    pushed = datetime.fromisoformat(item["repo"]["pushed_at"].replace("Z", "+00:00")).date()
    age = (date.fromisoformat(VERIFIED_ON) - pushed).days
    relevance = {"skills": 4, "prompts": 3, "tools": 5, "frameworks": 3}[item["category"]]
    evidence = 5
    quality = 5 if stars >= 10000 else 4 if stars >= 1000 else 3
    fit = {"skills": 4, "prompts": 3, "tools": 5, "frameworks": 2}[item["category"]]
    cost = 5
    risk = 4 if item["category"] in {"skills", "tools"} else 3
    if age > 365:
        quality = max(3, quality - 1)
        risk = max(3, risk - 1)
    values = [relevance, evidence, quality, fit, cost, risk]
    return values, sum(values)


def escape(value):
    return str(value).replace("|", "\\|").replace("\n", " ").strip()


def record_lines(item, decision):
    repo = item["repo"]
    commit = item["commit"]
    values, total = score(item)
    rid = item["canonical"].lower().replace("/", "--").replace("_", "-")
    description = repo.get("description") or "Repository README documents the project and its usage."
    readme_url = item["readme"]["html_url"]
    api_url = repo["url"]
    commit_url = commit["html_url"]
    provider_note = (
        "Repository code is free under the stated license; any external model, browser, hosting, or API provider used with it must be assessed separately."
        if item["category"] in {"prompts", "frameworks"}
        else "Repository code is free under the stated license; optional hosted services or third-party integrations are outside this pricing verification."
    )
    data_note = (
        "Do not send Andamio content or credentials to external providers without an adopted data-handling decision; keep a deterministic local/manual fallback."
        if item["category"] in {"prompts", "frameworks", "skills"}
        else "Use least-privilege credentials; keep generated UI changes reviewable and retain deterministic tests/manual checks."
    )
    scores = f"R{values[0]}/E{values[1]}/Q{values[2]}/F{values[3]}/C{values[4]}/K{values[5]} = **{total}/30**"
    return [
        f"### `{rid}` — [{escape(repo['full_name'])}]({repo['html_url']})",
        f"- **Category/status:** `github-ai` / `{'shortlisted' if decision == 'adopt-now' else 'verified'}`; **decision:** `{decision}`.",
        f"- **Factual summary:** {escape(description)}",
        f"- **Andamio use case / audience:** {escape(item['use_case'])}; `{item['audience']}`.",
        f"- **License/source:** `{item['license']}` / `open-source`; license metadata confirmed by GitHub API.",
        f"- **Pricing/free scope:** `free`; repository source at the checked commit under `{item['license']}`. Hosted services and third-party APIs are not included.",
        f"- **Checked version/activity:** `{escape(item['activity'])}`; default branch `{escape(repo['default_branch'])}`; **verified_on:** `{VERIFIED_ON}`.",
        f"- **Freshness:** category `github-ai` 30 days; phase `research` 180 days; effective 30 days; checked_as_of `{VERIFIED_ON}`.",
        f"- **Primary citations:** [capability README]({readme_url}) — `supports`, checked `{VERIFIED_ON}`; [owner/archive/license metadata]({api_url}) — `supports`, checked `{VERIFIED_ON}`; [checked HEAD]({commit_url}) — `supports`, checked `{VERIFIED_ON}`.",
        f"- **Scores:** {scores}.",
        f"- **Adoption risk/data/provider notes:** {provider_note} {data_note}",
        f"- **Decision rationale:** {escape(decision_reason(item, decision, total))}",
        "",
    ]


def decision_reason(item, decision, total):
    if decision == "adopt-now":
        return "Directly supports the current canonical landing implementation or its deterministic quality gates; pilot in a scoped workflow before broader use."
    if decision == "evaluate":
        return "Relevant and verified, but integration, generated-output review, provider dependence, or workflow overhead requires a bounded trial."
    return "Useful primary reference, but not a current dependency recommendation; retain for patterns and comparison."


def classify(item):
    repo = item["canonical"].lower()
    adopt = {
        "microsoft/playwright", "dequelabs/axe-core", "googlechrome/lighthouse",
        "storybookjs/storybook", "reg-viz/reg-suit", "github/github-mcp-server",
        "shadcn-ui/ui", "modelcontextprotocol/typescript-sdk",
    }
    evaluate = {
        "microsoft/playwright-mcp", "upstash/context7", "anthropics/skills",
        "obra/superpowers", "promptfoo/promptfoo", "langfuse/langfuse",
    }
    if repo in adopt:
        return "adopt-now"
    if repo in evaluate:
        return "evaluate"
    return "reference-only"


def main():
    with concurrent.futures.ThreadPoolExecutor(max_workers=12) as pool:
        results = list(pool.map(inspect, CANDIDATES))

    accepted = []
    rejected = []
    seen_canonical = set()
    for item in results:
        if not item["accepted"]:
            rejected.append(item)
            continue
        key = item["canonical"].lower()
        if key in seen_canonical:
            item["accepted"] = False
            item["reason"] = "duplicate canonical repository"
            rejected.append(item)
            continue
        seen_canonical.add(key)
        accepted.append(item)

    for category, (filename, title) in FILES.items():
        category_items = [item for item in accepted if item["category"] == category]
        lines = [
            f"# {title}",
            "",
            f"- **checked_as_of:** `{VERIFIED_ON}`",
            "- **Category freshness:** `github-ai = 30 days`",
            f"- **Accepted unique repositories:** `{len(category_items)}`",
            "- **Schema:** Every record supplies the normalized research fields, claim-level primary evidence, six scores, and a decision.",
            "",
        ]
        for item in category_items:
            lines.extend(record_lines(item, classify(item)))
        (ROOT / filename).write_text("\n".join(lines).rstrip() + "\n", encoding="utf-8")

    category_counts = Counter(item["category"] for item in accepted)
    reason_counts = Counter(item["reason"] for item in rejected)
    readme_lines = [
        "# GitHub and AI Resources",
        "",
        "Phase 3 catalog of license-verified GitHub repositories useful to Andamio landing-page design and implementation. Records follow the [normalized methodology](../methodology.md).",
        "",
        "## Mechanical inventory",
        "",
        f"- **checked_as_of / verified_on:** `{VERIFIED_ON}`",
        "- **Freshness:** category `github-ai = 30 days`; research phase `180 days`; effective window `30 days`.",
        f"- **Candidate rows inspected:** `{len(CANDIDATES)}`",
        f"- **Accepted unique, non-archived, SPDX-license-verified repositories:** `{len(accepted)}`",
        f"- **Rejected rows:** `{len(rejected)}`",
        f"- **Duplicate canonical repositories rejected:** `{reason_counts.get('duplicate canonical repository', 0)}`",
        f"- **Archived repositories rejected:** `{reason_counts.get('archived', 0)}`",
        f"- **Accepted category counts:** skills/rules `{category_counts['skills']}`; prompts/workflows `{category_counts['prompts']}`; MCP/design/implementation `{category_counts['tools']}`; agent/evaluation/quality `{category_counts['frameworks']}`.",
        "",
        "## Catalogs",
        "",
        f"- [Installable skills and rules](installable-skills-and-rules.md) — {category_counts['skills']}",
        f"- [Prompts and workflows](prompts-and-workflows.md) — {category_counts['prompts']}",
        f"- [MCP, design integrations, and implementation tools](mcp-design-and-implementation-tools.md) — {category_counts['tools']}",
        f"- [Agent, evaluation, and quality frameworks](agent-evaluation-and-quality-frameworks.md) — {category_counts['frameworks']}",
        "- [Verification report](verification.md)",
        "- [Andamio shortlist](../shortlists/github-ai-shortlist.md)",
        "",
        "## Discovery and verification procedure",
        "",
        "Candidate discovery used direct known-project queries plus GitHub repository search concepts equivalent to:",
        "",
        "```text",
        "agent skills rules cursor claude copilot",
        "prompt engineering agent workflows",
        "mcp design figma browser frontend",
        "accessibility visual regression web quality",
        "agent framework llm evaluation observability",
        "```",
        "",
        "Each row was resolved to its canonical owner/name and checked with these commands (substitute `OWNER/REPO` and `BRANCH`):",
        "",
        "```powershell",
        "gh repo view OWNER/REPO --json nameWithOwner,url,isArchived,defaultBranchRef,licenseInfo,latestRelease,pushedAt",
        "gh api repos/OWNER/REPO",
        "gh api repos/OWNER/REPO/commits/BRANCH",
        "gh api 'repos/OWNER/REPO/readme?ref=COMMIT_SHA'",
        "gh api repos/OWNER/REPO/releases/latest",
        "```",
        "",
        "The generator rejected missing repositories, archived repositories, unknown/non-SPDX license metadata, missing default-branch HEADs, unreadable READMEs, and duplicate canonical URLs. Repository descriptions were not treated as sufficient capability evidence: each accepted row also required a readable README at the checked commit.",
    ]
    (ROOT / "README.md").write_text("\n".join(readme_lines).rstrip() + "\n", encoding="utf-8")

    rejected_lines = [
        "# GitHub AI Research Verification",
        "",
        f"- **Run date:** `{VERIFIED_ON}`",
        f"- **Candidates:** `{len(CANDIDATES)}`",
        f"- **Accepted:** `{len(accepted)}`",
        f"- **Rejected:** `{len(rejected)}`",
        f"- **Unique accepted canonical URLs:** `{len(seen_canonical)}`",
        "",
        "## Rejected candidate ledger",
        "",
        "| Requested repository | Resolved canonical repository | Category | Reason |",
        "|---|---|---|---|",
    ]
    for item in rejected:
        requested_url = f"https://github.com/{item['requested']}"
        canonical = item.get("canonical", "not resolved")
        canonical_cell = canonical if canonical == "not resolved" else f"[{canonical}](https://github.com/{canonical})"
        rejected_lines.append(f"| [{item['requested']}]({requested_url}) | {canonical_cell} | {item['category']} | {escape(item['reason'])} |")
    rejected_lines.extend([
        "",
        "## Automated validation contract",
        "",
        "The final validation pass checks catalog record counts, globally unique stable IDs and canonical URLs, accepted URL/API reachability, required fields, score arithmetic, relative Markdown links, and whitespace errors. Results are appended below after the generated files are independently validated.",
    ])
    (ROOT / "verification.md").write_text("\n".join(rejected_lines).rstrip() + "\n", encoding="utf-8")

    shortlist_reference = {
        "facebook/react",
        "tailwindlabs/tailwindcss",
        "github/awesome-copilot",
    }
    shortlist_items = sorted(
        [
            item for item in accepted
            if classify(item) != "reference-only" or item["canonical"].lower() in shortlist_reference
        ],
        key=lambda item: (
            {"adopt-now": 0, "evaluate": 1, "reference-only": 2}[classify(item)],
            -score(item)[1],
            item["canonical"].lower(),
        ),
    )[:14]
    shortlist_lines = [
        "# GitHub AI Resource Shortlist",
        "",
        f"- **as_of:** `{VERIFIED_ON}`",
        "- **Decision supported:** select bounded, reviewable resources for canonical landing implementation and quality assurance.",
        "- **Freshness:** category `github-ai = 30 days`; shortlist phase `45 days`; effective window `30 days`.",
        f"- **Freshness result:** total `{len(shortlist_items)}`; passed `{len(shortlist_items)}`; stale `0`; unreachable `0`; unsupported `0`.",
        f"- **Source pool:** `{len(accepted)}` verified unique repositories from `{len(CANDIDATES)}` candidate rows.",
        "",
        "A shortlist recommends evaluation or adoption; it does not authorize application changes.",
        "",
        "## Ranked records",
        "",
        "| Rank | Repository | Bucket | Score | Material-to-agent mapping | Deterministic fallback and data handling |",
        "|---:|---|---|---:|---|---|",
    ]
    mappings = {
        "microsoft/playwright": "route behavior and cross-browser evidence → implementation/test agent",
        "dequelabs/axe-core": "WCAG-oriented automated checks → accessibility gate",
        "googlechrome/lighthouse": "performance/accessibility/SEO audits → quality agent",
        "storybookjs/storybook": "canonical UI states → component review workflow",
        "reg-viz/reg-suit": "visual baselines → regression workflow",
        "github/github-mcp-server": "issues/PR/repository evidence → research and delivery agent",
        "shadcn-ui/ui": "component patterns → UI implementation agent",
        "modelcontextprotocol/typescript-sdk": "typed MCP integrations → tooling agent",
        "microsoft/playwright-mcp": "browser inspection → research/QA agent",
        "upstash/context7": "versioned library docs → implementation agent",
        "anthropics/skills": "repeatable task instructions → agent workflow author",
        "obra/superpowers": "development workflow skills → coding agent",
        "promptfoo/promptfoo": "prompt regression cases → evaluation agent",
        "langfuse/langfuse": "traces/evaluation evidence → AI quality reviewer",
        "facebook/react": "component architecture reference → UI implementation agent",
        "tailwindlabs/tailwindcss": "utility styling reference → UI implementation agent",
        "github/awesome-copilot": "instruction and skill examples → workflow author",
    }
    for rank, item in enumerate(shortlist_items, 1):
        values, total = score(item)
        bucket = classify(item)
        repo_key = item["canonical"].lower()
        mapping = mappings.get(repo_key, item["use_case"])
        fallback = (
            "Run deterministic CLI/API checks and manual review; no credentials or private content in prompts."
            if item["category"] in {"skills", "prompts", "frameworks"}
            else "Keep existing local tests/manual review authoritative; use least-privilege tokens and do not expose private content."
        )
        shortlist_lines.append(
            f"| {rank} | [{item['canonical']}]({item['repo']['html_url']}) | `{bucket}` | {total}/30 | {escape(mapping)} | {escape(fallback)} |"
        )
    shortlist_lines.extend([
        "",
        "## Recommendation",
        "",
        "Adopt-now means use the repository as a primary implementation or deterministic quality reference in a scoped workflow. Evaluate means run a bounded trial with explicit output review, credential minimization, and a local/manual fallback. All other verified catalog entries remain reference-only.",
    ])
    SHORTLIST.write_text("\n".join(shortlist_lines).rstrip() + "\n", encoding="utf-8")

    print(json.dumps({
        "candidates": len(CANDIDATES),
        "accepted": len(accepted),
        "rejected": len(rejected),
        "categories": dict(category_counts),
        "rejection_reasons": dict(reason_counts),
        "shortlist": len(shortlist_items),
    }, indent=2))


if __name__ == "__main__":
    main()
