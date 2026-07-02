import type { MetadataRoute } from "next";
import { SITE_URL } from "~/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // /debug is developer tooling; /explore holds the internal design
        // system reference. Neither should appear in search results.
        disallow: ["/debug", "/explore"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
