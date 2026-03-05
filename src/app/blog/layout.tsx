import "~/styles/globals.css";
import "./blog.css";
import type { Metadata } from "next";
import Footer from "~/ui/landing/Footer";
import V2Navigation from "~/ui/landing/V2Landing/V2Navigation";

export const metadata: Metadata = {
  title: "Andamio Blog",
  description: "Insights, updates, and stories from the Andamio ecosystem",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground">
        <V2Navigation />

        <main className="relative pt-20">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
