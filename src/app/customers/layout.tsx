import "~/styles/globals.css";
import "./blog.css";
import type { Metadata } from "next";
import { TopNav, GridField, Footer } from "~/ui/system/kit";
import { nav, footer as footerData } from "~/ui/explore/content";
import { color, font } from "~/ui/system/tokens";
import { SITE_URL } from "~/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Andamio Customers", template: "%s — Andamio" },
  description: "Insights, updates, and stories from Andamio customers",
  alternates: { canonical: "/customers" },
};

export default function CustomersLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body style={{ background: color.paper, color: color.ink, fontFamily: font.sans }}>
        <div className="relative min-h-screen antialiased">
          <GridField />
          <div className="relative z-10">
            <TopNav items={nav.items} cta={nav.cta} />
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
