#!/usr/bin/env bash
# sync-papers.sh — copy the Andamio Papers from ecosystem-enterprise into the
# landing repo's content dir. The mechanical half of "single source, both
# surfaces derive" (Whitepaper V2 Phase 4). Never hand-edit the synced files —
# edit the source in ecosystem-enterprise/papers/ and re-run this.
#
# Rendered as plain markdown (react-markdown) on the /whitepaper route, so the
# provenance banner is an HTML comment and the output is .md.
#
# Usage (local):
#   SRC=../ecosystem-enterprise/papers DEST=src/content/papers PDF_DEST=public/papers ./scripts/sync-papers.sh
# Defaults assume the CI layout (ecosystem-enterprise checked out to ./papers-src).
set -euo pipefail

SRC="${SRC:-./papers-src/papers}"
DEST="${DEST:-src/content/papers}"
PDF_DEST="${PDF_DEST:-public/papers}"
PDF_NAME="andamio-whitepapers.pdf"

if [ ! -d "$SRC" ]; then
  echo "::error::source dir not found: $SRC" >&2
  exit 1
fi

mkdir -p "$DEST" "$PDF_DEST"

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

if [ -f "$SRC/$PDF_NAME" ]; then
  cp "$SRC/$PDF_NAME" "$PDF_DEST/$PDF_NAME"
  echo "  copied  $PDF_NAME -> $PDF_DEST/$PDF_NAME"
fi

echo "✓ synced $count paper(s) from $SRC"
if [ "$count" -eq 0 ]; then
  echo "::warning::no .md files found in $SRC — nothing synced"
fi
