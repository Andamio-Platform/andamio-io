import fs from "fs";
import path from "path";
import { paperBySlug } from "./papers";

/**
 * Server-only paper body reader (uses fs). Import this ONLY from getStaticProps
 * — keeping it out of the client bundle. The registry (client-safe) is in papers.ts.
 */

const DIR = path.join(process.cwd(), "src/content/papers");

/**
 * Read a paper's rendered-ready body. Strips the sync provenance comment, the
 * YAML frontmatter (review/consent lifecycle metadata), the legacy `doc-status`
 * marker, and the legacy "Draft, open for team review" callout (review scaffolding
 * that should not show on the public route). The source in ecosystem-enterprise is
 * untouched — this is a render-time transform only.
 */
export function readPaperBody(slug: string): string {
  const meta = paperBySlug(slug);
  if (!meta) throw new Error(`unknown paper: ${slug}`);
  const raw = fs.readFileSync(path.join(DIR, meta.file), "utf8");
  return raw
    .replace(/^<!--[\s\S]*?-->\s*/, "") // sync provenance header
    .replace(/^---\r?\n[\s\S]*?\r?\n---\s*/, "") // YAML frontmatter (lifecycle metadata)
    .replace(/<!--\s*doc-status:[\s\S]*?-->\s*/g, "") // legacy draft status marker
    .replace(/^>\s*\*\*Draft\.[^\n]*\n/m, "") // legacy review callout
    .trimStart();
}
