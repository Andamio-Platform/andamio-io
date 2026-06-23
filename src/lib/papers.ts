/**
 * The Andamio Papers registry (client-safe — no fs). Papers are synced from
 * ecosystem-enterprise/papers/ by scripts/sync-papers.sh (single source of
 * truth — never hand-edit src/content/papers/). The body reader that touches
 * the filesystem lives in papers.server.ts (getStaticProps only).
 */

export interface PaperMeta {
  slug: string;
  title: string;
  summary: string;
  file: string;
}

// Ordered registry. `light-paper` leads and is rendered on the /whitepaper hub;
// the rest are their own /whitepaper/<slug> pages.
export const PAPERS: PaperMeta[] = [
  {
    slug: "light-paper",
    title: "Andamio Light Paper",
    summary: "What Andamio is, and why trust signals need an upgrade.",
    file: "andamio-light-paper.md",
  },
  {
    slug: "issuer",
    title: "Andamio Issuer",
    summary: "Turn the badge you already issue into a credential you control.",
    file: "andamio-issuer.md",
  },
  {
    slug: "building-on-andamio",
    title: "Building on Andamio",
    summary: "The protocol underneath, for the people who build on it.",
    file: "building-on-andamio.md",
  },
  {
    slug: "glossary",
    title: "Andamio Glossary",
    summary: "Every term in the papers, defined once.",
    file: "andamio-glossary.md",
  },
];

/** The papers that get their own sub-page (everything except the hub leader). */
export const SUB_PAPERS = PAPERS.filter((p) => p.slug !== "light-paper");

export function paperBySlug(slug: string): PaperMeta | undefined {
  return PAPERS.find((p) => p.slug === slug);
}
