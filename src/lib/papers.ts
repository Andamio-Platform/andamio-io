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

// Ordered registry. Every paper, including Introducing Andamio, has its own
// /papers/<slug> page. The hub only lists them.
// (Renamed from `light-paper` 2026-07-02, matching the ee source rename; the
// old /whitepaper/* routes 301 to /papers/* in next.config.js — "whitepaper"
// is banned from site routes and copy.)
export const PAPERS: PaperMeta[] = [
  {
    slug: "introducing-andamio",
    title: "Introducing Andamio",
    summary: "What Andamio is, and why trust signals need an upgrade.",
    file: "introducing-andamio.md",
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

/** Every paper has its own /papers/<slug> page. */
export const SUB_PAPERS = PAPERS;

export function paperBySlug(slug: string): PaperMeta | undefined {
  return PAPERS.find((p) => p.slug === slug);
}
