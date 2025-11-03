import "~/styles/globals.css";
import "./blog.css";
import type { Metadata } from "next";
import Footer from "~/ui/landing/Footer";
import NavigationBar from "~/components/shared/NavigationBar";
import AngularGridOverlay from "~/components/shared/AngularGridOverlay";

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
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground">
        <AngularGridOverlay />
        <NavigationBar currentPage="customers" />

        <main className="relative pt-20">{children}</main>

        <Footer />
      </body>
    </html>
  )
}



