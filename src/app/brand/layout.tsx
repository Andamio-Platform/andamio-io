import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "~/styles/globals.css";
import "~/styles/proof-badge.css";
import { ThemeProvider } from "~/components/theme-provider";
import { SITE_URL } from "~/lib/seo";
import { Analytics } from "~/components/site/Analytics";
import { fontVariables } from "~/styles/fonts";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Andamio Brand Hub",
  description: "Official brand guidelines, assets, and resources for Andamio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  if (process.env.NODE_ENV === "production") notFound();
  return (
    <html
      lang="en"
      className={`dark ${fontVariables}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          forcedTheme="dark"
          enableSystem={false}
        >
          <Analytics />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
