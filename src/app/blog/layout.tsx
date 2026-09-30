import "~/styles/globals.css";
import "~/styles/prose.css";
import type { Metadata } from "next";
import { TopNav, Footer, LogoWash } from "~/ui/system/kit";
import { nav, footer as footerData } from "~/ui/explore/content";
import { color, font } from "~/ui/system/tokens";
import { SITE_URL, ogImagePath } from "~/lib/seo";
import { Analytics } from "~/components/site/Analytics";
import { fontVariables } from "~/styles/fonts";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Andamio Blog", template: "%s — Andamio" },
  description: "Insights, updates, and stories from the Andamio ecosystem",
  alternates: { canonical: "/blog" },
  openGraph: { images: [{ url: ogImagePath("Blog"), width: 1200, height: 630 }] },
  twitter: { card: "summary_large_image", site: "@Andamio_teams" },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`dark ${fontVariables}`} suppressHydrationWarning>
      <body style={{ background: color.paper, color: color.ink, fontFamily: font.sans }}>
        <div className="relative min-h-screen antialiased">
          <LogoWash />
          <div className="relative z-10">
            <Analytics />
        <TopNav items={nav.items} cta={nav.cta} />
            <main>{children}</main>
            <Footer
              tagline={footerData.tagline}
              meta={footerData.meta}
              copyright={footerData.copyright}
              columns={footerData.columns}
              backHref="/"
              backLabel="← Back to home"
              caption="Blog"
            />
          </div>
        </div>
      </body>
    </html>
  );
}
