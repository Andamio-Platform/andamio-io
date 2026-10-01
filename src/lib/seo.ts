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

export const TWITTER_HANDLE = "@Andamio_teams";

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
  sameAs: ["https://x.com/andamio_teams"],
} as const;

/** 1200×630 share image for a page title. Rendered by `app/og/route.tsx`. */
export function ogImagePath(title?: string): string {
  const trimmed = title?.trim();
  const label = trimmed ? trimmed : SITE_NAME;
  return `/og?title=${encodeURIComponent(label)}`;
}

export function articleJsonLd(article: { title: string; description: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    mainEntityOfPage: absoluteUrl(article.path),
    author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
  };
}

export function softwareAppJsonLd(app: { name: string; description: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: app.name,
    description: app.description,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Windows, macOS, Linux",
    url: absoluteUrl(app.path),
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };
}

export function productOffersJsonLd(
  product: { name: string; description: string },
  offers: readonly { name: string; price: string; unit: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    brand: { "@type": "Brand", name: SITE_NAME },
    offers: offers.map((offer) => ({
      "@type": "Offer",
      name: offer.name,
      price: offer.price,
      priceCurrency: "USD",
      url: absoluteUrl("/pricing"),
      description: offer.unit,
    })),
  };
}

export function faqJsonLd(items: readonly { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
