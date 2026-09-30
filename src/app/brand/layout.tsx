import type { Metadata } from "next";
import "~/styles/globals.css";
import { ThemeProvider } from "~/components/theme-provider";
import { SITE_URL } from "~/lib/seo";
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
  return (
    <html lang="en" className={`dark ${fontVariables}`} suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" forcedTheme="dark" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
