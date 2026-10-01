import type { MetadataRoute } from "next";
import { SITE_URL } from "~/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // /debug is developer tooling. /explore is an internal reference.
        // /brand was removed; keep it disallowed so old URLs stay out of search.
        disallow: ["/debug", "/explore", "/brand"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
