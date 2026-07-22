#!/usr/bin/env python3
"""Vendor selected SKILL.md trees from Landing Excellence GitHub AI catalog repos.

Writes flat skill folders under .claude/skills/ with namespaced names (source-skill).
Does not replace project-owned skills: landing-excellence, seo-skill.
"""

from __future__ import annotations

import json
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent
MANIFEST = ROOT / "github-skills-manifest.json"
OWNED = {"landing-excellence", "seo-skill", "github-skills-index"}


def run(cmd: list[str], cwd: Path | None = None) -> None:
    print("+", " ".join(cmd), flush=True)
    subprocess.run(cmd, cwd=cwd, check=True)


def sparse_clone(repo: str, commit: str | None, paths: list[str], dest: Path) -> None:
    dest.mkdir(parents=True, exist_ok=True)
    run(["git", "init"], cwd=dest)
    run(["git", "remote", "add", "origin", f"https://github.com/{repo}.git"], cwd=dest)
    run(["git", "sparse-checkout", "init", "--no-cone"], cwd=dest)
    # Include each skill directory recursively
    patterns = []
    for p in paths:
        patterns.append(p)
        patterns.append(f"{p}/**")
    sparse = dest / ".git" / "info" / "sparse-checkout"
    sparse.write_text("\n".join(patterns) + "\n", encoding="utf-8")
    if commit:
        run(["git", "fetch", "--depth", "1", "origin", commit], cwd=dest)
        run(["git", "checkout", commit], cwd=dest)
    else:
        run(["git", "fetch", "--depth", "1", "origin", "HEAD"], cwd=dest)
        run(["git", "checkout", "FETCH_HEAD"], cwd=dest)


def copy_skill(src: Path, dest_name: str, meta: dict) -> bool:
    skill_md = src / "SKILL.md"
    if not skill_md.is_file():
        print(f"  SKIP missing {skill_md}", flush=True)
        return False
    if dest_name in OWNED:
        print(f"  SKIP owned name collision {dest_name}", flush=True)
        return False
    dest = ROOT / dest_name
    if dest.exists():
        shutil.rmtree(dest)
    shutil.copytree(src, dest)
    source_note = dest / "VENDOR.md"
    source_note.write_text(
        "\n".join(
            [
                f"# Vendored skill: `{dest_name}`",
                "",
                f"- **Source repo:** [{meta['repo']}](https://github.com/{meta['repo']})",
                f"- **Source path:** `{meta['path']}`",
                f"- **Catalog decision:** `{meta.get('decision', 'reference-only')}`",
                f"- **License (repo):** `{meta.get('license', 'see upstream')}`",
                f"- **Synced by:** `.claude/skills/sync-github-skills.py`",
                "",
                "Treat as evaluate/reference unless an Andamio decision adopts it.",
                "Do not send secrets, badge inputs, wallet data, or private content to external providers.",
                "Prefer `landing-excellence` locks over conflicting vendor guidance.",
                "",
            ]
        ),
        encoding="utf-8",
    )
    print(f"  OK {dest_name}", flush=True)
    return True


def main() -> int:
    manifest = json.loads(MANIFEST.read_text(encoding="utf-8"))
    installed: list[dict] = []
    with tempfile.TemporaryDirectory(prefix="andamio-skills-") as tmp:
        tmp_path = Path(tmp)
        for group in manifest["groups"]:
            repo = group["repo"]
            commit = group.get("commit")
            paths = sorted({item["path"].rstrip("/") for item in group["skills"]})
            # Include parent dirs for sparse checkout
            sparse_paths = []
            for p in paths:
                sparse_paths.append(p)
                sparse_paths.append(p + "/*")
            clone_dir = tmp_path / repo.replace("/", "__")
            print(f"\n== {repo} ==", flush=True)
            try:
                sparse_clone(repo, commit, sparse_paths, clone_dir)
            except subprocess.CalledProcessError as exc:
                print(f"  FAIL clone {repo}: {exc}", flush=True)
                continue
            for item in group["skills"]:
                src = clone_dir / item["path"]
                dest_name = item["dest"]
                ok = copy_skill(
                    src,
                    dest_name,
                    {
                        "repo": repo,
                        "path": item["path"],
                        "decision": group.get("decision", "reference-only"),
                        "license": group.get("license", "see upstream"),
                    },
                )
                if ok:
                    installed.append(
                        {
                            "dest": dest_name,
                            "repo": repo,
                            "path": item["path"],
                            "decision": group.get("decision", "reference-only"),
                        }
                    )

    index_path = ROOT / "github-skills-index" / "SKILL.md"
    index_path.parent.mkdir(parents=True, exist_ok=True)
    lines = [
        "---",
        "name: github-skills-index",
        "description: >-",
        "  Index of vendored GitHub agent skills under .claude/skills from the",
        "  Landing Page Excellence GitHub AI catalog. Use when choosing which",
        "  vendored skill to invoke, refreshing vendors, or checking provenance.",
        "trigger: <github-skills-index>",
        "---",
        "",
        "# GitHub Skills Index (vendored)",
        "",
        "Project-owned skills stay authoritative for Andamio landing:",
        "`landing-excellence`, `seo-skill`.",
        "",
        "Vendored skills are **evaluate/reference** unless a decision adopts them.",
        "When guidance conflicts, follow `landing-excellence` + Warm Index.",
        "",
        f"**Installed count:** {len(installed)}",
        "",
        "Refresh:",
        "",
        "```bash",
        "python .claude/skills/sync-github-skills.py",
        "```",
        "",
        "## Manifest source",
        "",
        "- Catalog: `docs/landing-page-excellence/research/github-ai-resources/installable-skills-and-rules.md`",
        "- Manifest: `.claude/skills/github-skills-manifest.json`",
        "",
        "## Installed skills",
        "",
        "| Dest | Repo | Upstream path | Decision |",
        "|---|---|---|---|",
    ]
    for row in sorted(installed, key=lambda r: r["dest"]):
        lines.append(
            f"| `{row['dest']}` | [{row['repo']}](https://github.com/{row['repo']}) | `{row['path']}` | `{row['decision']}` |"
        )
    lines.extend(
        [
            "",
            "## Not bulk-vendored (too large / off-domain)",
            "",
            "- `microsoft/skills` Azure SDK plugin trees (hundreds of Azure-specific skills)",
            "- Full `alirezarezvani/claude-skills` (~800 SKILL.md files) — only landing-relevant subset synced",
            "- Cursor-rules-only repos (`PatrickJS/awesome-cursorrules`, `sanjeed5/awesome-cursor-rules-mdc`) — rules, not Claude skills",
            "- `VoltAgent/awesome-claude-code-subagents` — subagents, not skills (see catalog)",
            "",
            "Add more entries to `github-skills-manifest.json` and re-run the sync script.",
            "",
        ]
    )
    index_path.write_text("\n".join(lines), encoding="utf-8")
    (ROOT / "github-skills-index" / "VENDOR.md").write_text(
        "# Generated index\n\nDo not hand-edit; regenerate via sync-github-skills.py.\n",
        encoding="utf-8",
    )
    print(f"\nInstalled {len(installed)} skills. Index -> {index_path}", flush=True)
    return 0


if __name__ == "__main__":
    sys.exit(main())
