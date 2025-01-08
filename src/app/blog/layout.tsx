import "~/styles/globals.css";
import "./blog.css"
import type { Metadata } from "next";
import MenuBar from "~/ui/landing/MenuBar";
import Footer from "~/ui/landing/Footer";

export const metadata: Metadata = {
  title: "Andamio",
  description: "Welcome to Andamio",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <MenuBar />
        <div className="my-24">{children}</div>
        <Footer />
      </body>
    </html>
  );
} 
