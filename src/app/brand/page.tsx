import type { Metadata } from "next";
import BrandPress from "~/ui/brand/BrandPress";

export const metadata: Metadata = {
  title: "Brand and press",
  description:
    "Andamio logos, the dark color palette, and the anatomy of the credential badge. Download the marks.",
};

export default function BrandPage() {
  return <BrandPress />;
}
