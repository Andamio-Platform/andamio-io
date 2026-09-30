import json
import re
import subprocess
from pathlib import Path


ROOT = Path(__file__).resolve().parent
CATALOGS = [
    ROOT / "installable-skills-and-rules.md",
    ROOT / "prompts-and-workflows.md",
    ROOT / "mcp-design-and-implementation-tools.md",
    ROOT / "agent-evaluation-and-quality-frameworks.md",
]
ALL_MD = CATALOGS + [
    ROOT / "README.md",
    ROOT / "verification.md",
    ROOT.parent / "shortlists" / "github-ai-shortlist.md",
]
REQUIRED_LABELS = [
    "**Category/status:**",
    "**Factual summary:**",
    "**Andamio use case / audience:**",
    "**License/source:**",
    "**Pricing/free scope:**",
    "**Checked version/activity:**",
    "**Freshness:**",
    "**Primary citations:**",
    "**Scores:**",
    "**Adoption risk/data/provider notes:**",
    "**Decision rationale:**",
]


def fail(errors, message):
    errors.append(message)


def main():
    errors = []
    ids = []
    urls = []
    counts = {}
    records = []
    for path in CATALOGS:
        text = path.read_text(encoding="utf-8")
        matches = list(re.finditer(r"^### `([^`]+)` — \[([^\]]+)\]\((https://github\.com/[^)]+)\)$", text, re.MULTILINE))
        counts[path.name] = len(matches)
        declared = re.search(r"Accepted unique repositories:\*\* `(\d+)`", text)
        if not declared or int(declared.group(1)) != len(matches):
            fail(errors, f"{path.name}: declared count does not match {len(matches)} records")
        for index, match in enumerate(matches):
            end = matches[index + 1].start() if index + 1 < len(matches) else len(text)
            body = text[match.start():end]
            rid, name, url = match.groups()
            ids.append(rid)
            urls.append(url.rstrip("/").lower())
            records.append((path, rid, name, url, body))
            for label in REQUIRED_LABELS:
                if label not in body:
                    fail(errors, f"{path.name}:{rid}: missing {label}")
            score_match = re.search(r"Scores:\*\* R(\d)/E(\d)/Q(\d)/F(\d)/C(\d)/K(\d) = \*\*(\d+)/30\*\*", body)
            if not score_match:
                fail(errors, f"{path.name}:{rid}: malformed scores")
            else:
                values = [int(value) for value in score_match.groups()]
                if any(value < 0 or value > 5 for value in values[:6]):
                    fail(errors, f"{path.name}:{rid}: score outside 0-5")
                if sum(values[:6]) != values[6]:
                    fail(errors, f"{path.name}:{rid}: score total mismatch")
            if "`unknown`" in body or "`NOASSERTION`" in body:
                fail(errors, f"{path.name}:{rid}: accepted record has unknown license")
            if body.count("`supports`, checked `2026-07-21`") < 3:
                fail(errors, f"{path.name}:{rid}: missing current claim evidence")

    if len(ids) != len(set(ids)):
        fail(errors, "duplicate stable IDs detected")
    if len(urls) != len(set(urls)):
        fail(errors, "duplicate canonical GitHub URLs detected")

    api_failures = []
    for _, rid, _, url, _ in records:
        slug = url.split("github.com/", 1)[1].strip("/")
        result = subprocess.run(
            ["gh", "api", f"repos/{slug}", "--jq", "[.full_name,.archived,.license.spdx_id] | @tsv"],
            check=False,
            capture_output=True,
            text=True,
            encoding="utf-8",
            errors="replace",
        )
        if result.returncode:
            api_failures.append(f"{rid}: API request failed")
            continue
        fields = result.stdout.strip().split("\t")
        if len(fields) != 3:
            api_failures.append(f"{rid}: malformed API result")
            continue
        canonical, archived, license_id = fields
        if canonical.lower() != slug.lower():
            api_failures.append(f"{rid}: URL is not canonical ({canonical})")
        if archived != "false":
            api_failures.append(f"{rid}: repository is archived")
        if not license_id or license_id in {"NOASSERTION", "OTHER"}:
            api_failures.append(f"{rid}: license is not SPDX-verified ({license_id})")
    errors.extend(api_failures)

    relative_links_checked = 0
    for path in ALL_MD:
        text = path.read_text(encoding="utf-8")
        for target in re.findall(r"\[[^\]]+\]\(([^)]+)\)", text):
            if re.match(r"^[a-z]+://", target) or target.startswith("#"):
                continue
            relative_links_checked += 1
            clean = target.split("#", 1)[0]
            if clean and not (path.parent / clean).resolve().exists():
                fail(errors, f"{path.name}: broken relative link {target}")

    result = {
        "catalog_counts": counts,
        "accepted_total": len(records),
        "unique_ids": len(set(ids)),
        "unique_urls": len(set(urls)),
        "github_api_urls_checked": len(records),
        "github_api_failures": len(api_failures),
        "relative_links_checked": relative_links_checked,
        "errors": errors,
        "status": "PASS" if not errors else "FAIL",
    }
    print(json.dumps(result, indent=2))
    raise SystemExit(0 if not errors else 1)


if __name__ == "__main__":
    main()
