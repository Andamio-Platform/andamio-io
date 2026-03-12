import "~/styles/globals.css";
import "./blog.css";
import type { Metadata } from "next";
import Footer from "~/ui/landing/Footer";
import NavigationBar from "~/components/shared/NavigationBar";
import AngularGridOverlay from "~/components/shared/AngularGridOverlay";
import { ThemeProvider } from "~/components/theme-provider";

export const metadata = {
  title: 'Andamio Customers',
  description: "Insights, updates, and stories from the Andamio customers",
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
          <AngularGridOverlay />
          <NavigationBar currentPage="customers" />

          <main className="relative pt-20">{children}</main>

          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}



