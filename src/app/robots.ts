import type { MetadataRoute } from "next";
import { SITE_URL } from "~/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // /debug is developer tooling. /explore and /brand are internal
        // references (brand is also 404 outside local dev). None of them
        // should appear in search results.
        disallow: ["/debug", "/explore", "/brand"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
