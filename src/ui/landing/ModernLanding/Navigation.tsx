import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-border bg-card/80 shadow-sm backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between sm:h-20">
          <div className="flex items-center">
            <div className="flex items-center gap-2 sm:gap-3">
              <Image
                className="h-8 w-auto opacity-80"
                src="/andamio-logo.svg"
                alt="Andamio"
                width={100}
                height={100}
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden items-center space-x-4 lg:flex xl:space-x-8">
            <a
              href="https://docs.andamio.io"
              className="text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-primary"
            >
              Docs
            </a>
            <Link
              href="/roadmap"
              className="text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-primary"
            >
              Roadmap
            </Link>
            <Link
              href="/blog"
              className="text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-primary"
            >
              Blog
            </Link>
            <Link
              href="https://app.andamio.io/course/86affc4de251b0fb7636c376383bcebf6ca7ca426528f9b7a5adc298"
              className="text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-primary"
            >
              Andamio 101
            </Link>
            <Link
              href="/customers"
              className="text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-primary"
            >
              Customers
            </Link>
            <Link
              href="/fund/14"
              className="text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-primary"
            >
              <span role="img" aria-label="rocket">
                🚀
              </span>{" "}
              Catalyst
            </Link>
            <Link
              href="https://app.andamio.io"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-primary bg-primary px-3 py-2 text-sm font-medium text-primary-foreground shadow-md transition-all duration-200 hover:bg-primary/90 hover:shadow-lg xl:px-4"
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

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground lg:hidden"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-border bg-card/95 backdrop-blur-md lg:hidden">
          <div className="max-h-[calc(100vh-4rem)] space-y-3 overflow-y-auto px-4 py-4">
            <a
              href="https://docs.andamio.io"
              className="block rounded-md px-3 py-2 text-base font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              Docs
            </a>
            <Link
              href="/roadmap"
              className="block rounded-md px-3 py-2 text-base font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              Roadmap
            </Link>
            <Link
              href="/blog"
              className="block rounded-md px-3 py-2 text-base font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              Blog
            </Link>
            <Link
              href="https://app.andamio.io/course/86affc4de251b0fb7636c376383bcebf6ca7ca426528f9b7a5adc298"
              className="block rounded-md px-3 py-2 text-base font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              Andamio 101
            </Link>
            <Link
              href="/customers"
              className="block rounded-md px-3 py-2 text-base font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              Customers
            </Link>
            <Link
              href="/fund/14"
              className="block rounded-md px-3 py-2 text-base font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span role="img" aria-label="rocket">
                🚀
              </span>{" "}
              Project Catalyst
            </Link>
            <Link
              href="https://app.andamio.io"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 block rounded-md border border-primary bg-primary px-4 py-3 text-center text-base font-medium text-primary-foreground shadow-md transition-all duration-200 hover:bg-primary/90"
              onClick={() => setMobileMenuOpen(false)}
            >
              Enter App
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
