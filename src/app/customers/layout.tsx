import "~/styles/globals.css";
import "./blog.css";
import type { Metadata } from "next";
import Footer from "~/ui/landing/Footer";
import V2Navigation from "~/ui/landing/V2Landing/V2Navigation";
import { ThemeProvider } from "~/components/theme-provider";

export const metadata: Metadata = {
  title: 'Andamio Customers',
  description: "Insights, updates, and stories from Andamio customers",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <V2Navigation />

          <main className="relative pt-20">{children}</main>

          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
