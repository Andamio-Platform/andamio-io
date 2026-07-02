#!/usr/bin/env bash
# sync-papers.sh — copy the Andamio Papers from ecosystem-enterprise into the
# landing repo's content dir. The mechanical half of "single source, both
# surfaces derive" (Whitepaper V2 Phase 4). Never hand-edit the synced files —
# edit the source in ecosystem-enterprise/papers/ and re-run this.
#
# Rendered as plain markdown (react-markdown) on the /papers route, so the
# provenance banner is an HTML comment and the output is .md.
#
# The combined-PDF copy was dropped 2026-07-02 (James): the papers are pages,
# not a downloadable "whitepapers" bundle — the word and the artifact are both
# retired from the site.
#
# Usage (local):
#   SRC=../ecosystem-enterprise/papers DEST=src/content/papers ./scripts/sync-papers.sh
# Defaults assume the CI layout (ecosystem-enterprise checked out to ./papers-src).
set -euo pipefail

SRC="${SRC:-./papers-src/papers}"
DEST="${DEST:-src/content/papers}"

if [ ! -d "$SRC" ]; then
  echo "::error::source dir not found: $SRC" >&2
  exit 1
fi

mkdir -p "$DEST"

shopt -s nullglob
count=0
for f in "$SRC"/*.md; do
  base="$(basename "$f" .md)"
  out="$DEST/$base.md"
  {
    echo "<!-- GENERATED — DO NOT EDIT. Synced from ecosystem-enterprise/papers/${base}.md."
    echo "     Edit the source there and re-run scripts/sync-papers.sh. -->"
    echo
    cat "$f"
  } > "$out"
  echo "  synced  $base.md -> $out"
  count=$((count + 1))
done

echo "✓ synced $count paper(s) from $SRC"
if [ "$count" -eq 0 ]; then
  echo "::warning::no .md files found in $SRC — nothing synced"
fi
