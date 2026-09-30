#!/usr/bin/env python3
"""One-off vendor for a single skill from the manifest (avoids full re-sync)."""

from __future__ import annotations

import json
import shutil
import subprocess
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent
MANIFEST = ROOT / "github-skills-manifest.json"
DEST = "cds-motion-framer"


def run(cmd: list[str], cwd: Path | None = None) -> None:
    print("+", " ".join(cmd), flush=True)
    subprocess.run(cmd, cwd=cwd, check=True)


def main() -> int:
    manifest = json.loads(MANIFEST.read_text(encoding="utf-8"))
    group = next(g for g in manifest["groups"] if g["repo"] == "freshtechbro/claudedesignskills")
    item = next(s for s in group["skills"] if s["dest"] == DEST)
    repo = group["repo"]
    commit = group.get("commit")
    path = item["path"].rstrip("/")

    with tempfile.TemporaryDirectory(prefix="andamio-cds-") as tmp:
        clone_dir = Path(tmp) / "clone"
        clone_dir.mkdir(parents=True)
        run(["git", "init"], cwd=clone_dir)
        run(["git", "remote", "add", "origin", f"https://github.com/{repo}.git"], cwd=clone_dir)
        run(["git", "sparse-checkout", "init", "--no-cone"], cwd=clone_dir)
        sparse = clone_dir / ".git" / "info" / "sparse-checkout"
        sparse.write_text(f"{path}\n{path}/**\n", encoding="utf-8")
        if commit:
            run(["git", "fetch", "--depth", "1", "origin", commit], cwd=clone_dir)
            run(["git", "checkout", commit], cwd=clone_dir)
        else:
            run(["git", "fetch", "--depth", "1", "origin", "HEAD"], cwd=clone_dir)
            run(["git", "checkout", "FETCH_HEAD"], cwd=clone_dir)

        src = clone_dir / path
        skill_md = src / "SKILL.md"
        if not skill_md.is_file():
            raise SystemExit(f"missing {skill_md}")

        out = ROOT / DEST
        if out.exists():
            shutil.rmtree(out)
        shutil.copytree(src, out)
        (out / "VENDOR.md").write_text(
            "\n".join(
                [
                    f"# Vendored skill: `{DEST}`",
                    "",
                    f"- **Source repo:** [{repo}](https://github.com/{repo})",
                    f"- **Source path:** `{path}`",
                    f"- **Catalog decision:** `{group.get('decision', 'reference-only')}`",
                    f"- **License (repo):** `{group.get('license', 'see upstream')}`",
                    "- **Synced by:** `.claude/skills/sync-github-skills.py`",
                    "",
                    "Treat as evaluate/reference unless an Andamio decision adopts it.",
                    "Do not send secrets, badge inputs, wallet data, or private content to external providers.",
                    "Prefer `landing-excellence` locks over conflicting vendor guidance.",
                    "",
                ]
            ),
            encoding="utf-8",
        )
        print(f"OK {DEST}")
        for p in sorted(out.rglob("*")):
            if p.is_file():
                print(" ", p.relative_to(out).as_posix())
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
