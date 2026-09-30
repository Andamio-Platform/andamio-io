import type { MetadataRoute } from "next";
import { getBlogPostData } from "~/lib/blogposts";
import { SUB_PAPERS } from "~/lib/papers";
import { SITE_URL } from "~/lib/seo";
import { CASES } from "~/ui/use-cases/cases";

/**
 * Static marketing routes. Blog posts, customer pages, and papers are derived
 * from their content sources below — only add here when a new top-level page
 * ships. /debug and /explore are deliberately absent (blocked in robots.ts).
 */
const STATIC_ROUTES = [
  "",
  "/issuer",
  // StoryFork (/show-me) is indexable per SEO-01 decision for this program.
  "/show-me",
  "/developers",
  "/cli",
  "/bot",
  "/pricing",
  "/use-cases",
  "/about",
  "/community",
  "/roadmap",
  "/papers",
  "/blog",
  "/privacy-policy",
  "/terms",
];

function asDate(value: string | undefined): Date | undefined {
  if (!value) return undefined;
  const date = new Date(value);
  return isNaN(date.getTime()) ? undefined : date;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const built = new Date();
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: built,
  }));

  const caseEntries: MetadataRoute.Sitemap = CASES.map((c) => ({
    url: `${SITE_URL}/use-cases/${c.slug}`,
    lastModified: built,
  }));

  const posts = await getBlogPostData();
  const blogEntries: MetadataRoute.Sitemap = posts
    .filter((post) => !post.frontmatter.redirectTo)
    .map((post) => ({
      url: `${SITE_URL}/blog/${post.title}`,
      lastModified: asDate(post.frontmatter.date),
    }));

  const paperEntries: MetadataRoute.Sitemap = SUB_PAPERS.map((paper) => ({
    url: `${SITE_URL}/papers/${paper.slug}`,
    lastModified: built,
  }));

  return [...staticEntries, ...caseEntries, ...blogEntries, ...paperEntries];
}
