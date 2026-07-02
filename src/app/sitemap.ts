import type { MetadataRoute } from "next";
import { getBlogPostData } from "~/lib/blogposts";
import { getCustomerPages } from "~/lib/customers";
import { SUB_PAPERS } from "~/lib/papers";
import { SITE_URL } from "~/lib/seo";

/**
 * Static marketing routes. Blog posts, customer pages, and papers are derived
 * from their content sources below — only add here when a new top-level page
 * ships. /debug and /explore are deliberately absent (blocked in robots.ts).
 */
const STATIC_ROUTES = [
  "",
  "/issuer",
  "/developers",
  "/cli",
  "/bot",
  "/pricing",
  "/use-cases",
  "/use-cases/CatalystReviewers",
  "/use-cases/DecentralizedInnovation",
  "/use-cases/FanEngagement",
  "/use-cases/Intersect",
  "/use-cases/LeadGenerator",
  "/use-cases/Syngenta",
  "/use-cases/Toha",
  "/about",
  "/about/our-team",
  "/about/our-technology",
  "/about/whitepaper",
  "/contact",
  "/roadmap",
  "/calendar",
  "/papers",
  "/blog",
  "/customers",
  "/brand",
  "/fund/12",
  "/fund/14",
  "/summit",
  "/privacy-policy",
  "/terms",
];

function asDate(value: string | undefined): Date | undefined {
  if (!value) return undefined;
  const date = new Date(value);
  return isNaN(date.getTime()) ? undefined : date;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route}`,
  }));

  const posts = await getBlogPostData();
  const blogEntries: MetadataRoute.Sitemap = posts
    .filter((post) => !post.frontmatter.redirectTo)
    .map((post) => ({
      url: `${SITE_URL}/blog/${post.title}`,
      lastModified: asDate(post.frontmatter.date),
    }));

  const customerEntries: MetadataRoute.Sitemap = getCustomerPages()
    .filter((page) => !page.frontmatter?.redirectTo)
    .map((page) => ({
      url: `${SITE_URL}/customers/${page.id}`,
      lastModified: asDate(page.frontmatter?.date),
    }));

  const paperEntries: MetadataRoute.Sitemap = SUB_PAPERS.map((paper) => ({
    url: `${SITE_URL}/papers/${paper.slug}`,
  }));

  return [...staticEntries, ...blogEntries, ...customerEntries, ...paperEntries];
}
