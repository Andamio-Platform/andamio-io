import type { Metadata } from "next";
import BrandPress from "~/ui/brand/BrandPress";
import { ogImagePath } from "~/lib/seo";

export const metadata: Metadata = {
  title: "Brand and press",
  description:
    "Andamio logos, the dark color palette, and the anatomy of the credential badge. Download the marks.",
  openGraph: { images: [{ url: ogImagePath("Brand and press"), width: 1200, height: 630 }] },
};

export default function BrandPage() {
  return <BrandPress />;
}
