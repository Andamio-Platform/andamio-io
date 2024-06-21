import "../styles/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Andamio",
  description: "Welcome to Andamio",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="my-24">
        <div>{children}</div>
      </body>
    </html>
  );
}
