/**
 * Single source of truth for site-wide SEO values. Every surface that emits
 * metadata (Metatags, app-router generateMetadata, sitemap, robots, JSON-LD)
 * imports from here — change the domain or defaults in one place.
 */

export const SITE_URL = "https://www.andamio.io";

export const SITE_NAME = "Andamio";

export const DEFAULT_TITLE =
  "Andamio — An open protocol for interoperable credentials";

export const DEFAULT_DESCRIPTION =
  "An open protocol for interoperable credentials.";

/**
 * Fallback social-share image. 1024x1024 — acceptable for cards, but a
 * dedicated 1200x630 og-default image is a known follow-up.
 */
export const DEFAULT_OG_IMAGE = "/andamio.png";

export const TWITTER_HANDLE = "@AndamioPlatform";

export function absoluteUrl(pathOrUrl: string): string {
  if (pathOrUrl.startsWith("http")) return pathOrUrl;
  return `${SITE_URL}${pathOrUrl.startsWith("/") ? "" : "/"}${pathOrUrl}`;
}

export const ORGANIZATION_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: absoluteUrl("/andamio.png"),
  sameAs: ["https://x.com/AndamioPlatform"],
} as const;
