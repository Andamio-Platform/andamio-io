import "~/styles/globals.css";
import "~/styles/prose.css";
import type { Metadata } from "next";
import { TopNav, Footer, LogoWash } from "~/ui/system/kit";
import { nav, footer as footerData } from "~/ui/explore/content";
import { color, font } from "~/ui/system/tokens";
import { SITE_URL } from "~/lib/seo";
import { fontVariables } from "~/styles/fonts";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Andamio Customers", template: "%s — Andamio" },
  description: "Insights, updates, and stories from Andamio customers",
  alternates: { canonical: "/customers" },
};

export default function CustomersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`dark ${fontVariables}`}
      suppressHydrationWarning
    >
      <body
        style={{
          background: color.paper,
          color: color.ink,
          fontFamily: font.sans,
        }}
      >
        <div className="relative min-h-screen antialiased">
          <LogoWash />
          <div className="relative z-10">
            <TopNav items={nav.items} />
            <main>{children}</main>
            <Footer
              tagline={footerData.tagline}
              meta={footerData.meta}
              copyright={footerData.copyright}
              columns={footerData.columns}
              backHref="/"
              backLabel="← Back to home"
              caption="Customers"
            />
          </div>
        </div>
      </body>
    </html>
  );
}
