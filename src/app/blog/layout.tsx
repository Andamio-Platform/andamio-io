import "~/styles/globals.css";
import "./blog.css";
import type { Metadata } from "next";
import Footer from "~/ui/landing/Footer";
import Link from "next/link";
import Image from "next/image";
import { Button } from "~/components/ui/button";

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
      <body className="min-h-screen bg-gray-950 text-white">
        {/* Angular Grid Overlay */}
        <div className="pointer-events-none fixed inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent"></div>
          <div className="grid h-full grid-cols-16">
            {Array.from({ length: 16 }).map((_, i) => (
              <div key={i} className="border-r border-white/20"></div>
            ))}
          </div>
          <div className="absolute inset-0">
            <div className="flex h-full flex-col">
              {Array.from({ length: 24 }).map((_, i) => (
                <div key={i} className="flex-1 border-b border-white/10"></div>
              ))}
            </div>
          </div>
          {/* Additional vertical accent lines */}
          <div className="absolute left-1/4 top-0 h-full w-px bg-white/15"></div>
          <div className="absolute left-1/2 top-0 h-full w-px bg-white/20"></div>
          <div className="absolute left-3/4 top-0 h-full w-px bg-white/15"></div>
        </div>

        {/* Navigation */}
        <nav className="fixed top-0 z-50 w-full border-b border-white/20 bg-gray-950/90 shadow-2xl backdrop-blur-xl">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex h-20 items-center justify-between">
              <div className="flex items-center">
                <Link href="/">
                  <div className="flex items-center gap-3">
                    <Image
                      className="h-10 w-auto"
                      src="/andamio-logo-no-white-overflow.png"
                      alt="Andamio"
                      width={100}
                      height={100}
                    />
                    <span className="text-xl font-bold text-white">
                      Andamio
                    </span>
                  </div>
                </Link>
              </div>
              <div className="hidden items-center space-x-8 md:flex">
                <Link
                  href="/#protocol"
                  className="font-medium text-gray-300 transition-colors duration-200 hover:text-white"
                >
                  Docs
                </Link>
                <Link
                  href="/roadmap"
                  className="font-medium text-gray-300 transition-colors duration-200 hover:text-white"
                >
                  Roadmap
                </Link>
                <Link
                  href="/blog"
                  className="font-medium text-white transition-colors duration-200"
                >
                  Blog
                </Link>
                <Button
                  size="sm"
                  className="bg-blue-600 text-white shadow-lg shadow-blue-500/25 hover:bg-blue-700"
                >
                  Andamio 101
                </Button>
                <Link
                  href="https://app.andamio.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-sm border border-white/30 bg-gray-800/50 px-4 py-2 text-sm font-medium text-white shadow-lg transition-all duration-200 hover:border-white/50 hover:bg-gray-700/50"
                >
                  <span>Enter App</span>
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <main className="relative pt-20">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
