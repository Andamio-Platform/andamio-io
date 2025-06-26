import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "~/components/ui/button";
import Footer from "~/ui/landing/Footer";

interface ModernPageLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  currentPage?: string;
}

export default function ModernPageLayout({
  children,
  title,
  description,
  currentPage,
}: ModernPageLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
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
                  <span className="text-xl font-bold text-white">Andamio</span>
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
                className={`font-medium transition-colors duration-200 ${
                  currentPage === "roadmap"
                    ? "text-white"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                Roadmap
              </Link>
              <Link
                href="/blog"
                className={`font-medium transition-colors duration-200 ${
                  currentPage === "blog"
                    ? "text-white"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                Blog
              </Link>
              <Link
                href="/about"
                className={`font-medium transition-colors duration-200 ${
                  currentPage === "about"
                    ? "text-white"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                About
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

      <main className="relative pt-20">
        {/* Page Header */}
        {(title ?? description) && (
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
            <div className="relative mb-16">
              {/* Angular accent lines */}
              <div className="absolute -top-8 left-0 h-1 w-32 bg-gradient-to-r from-blue-500 to-transparent shadow-lg shadow-blue-500/50"></div>
              <div className="absolute -top-4 left-8 h-1 w-16 bg-gradient-to-r from-white/60 to-transparent"></div>

              {title && (
                <div className="mb-6 flex items-center gap-4">
                  <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-transparent"></div>
                  <h1 className="text-4xl font-bold text-white lg:text-6xl">
                    {title}
                  </h1>
                </div>
              )}
              {description && (
                <p className="max-w-3xl text-xl text-gray-300">{description}</p>
              )}
            </div>
          </div>
        )}

        {/* Page Content */}
        <div className="mx-auto max-w-7xl px-6 lg:px-8">{children}</div>
      </main>

      <Footer />
    </div>
  );
}
