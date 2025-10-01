import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "~/components/ui/button";

interface NavigationBarProps {
  currentPage?: string;
}

export default function NavigationBar({ currentPage }: NavigationBarProps) {
  return (
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
              href="https://docs.andamio.io"
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
                href="https://app.andamio.io/course/86affc4de251b0fb7636c376383bcebf6ca7ca426528f9b7a5adc298"
                className="font-medium text-gray-300 transition-colors duration-200 hover:text-white"
              >
                Andamio 101
            </Link>    
            <Link
              href="/customers"
              className={`font-medium transition-colors duration-200 ${
                currentPage === "customers"
                  ? "text-white"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Customers  
            </Link>
            <Link
              href="/fund/13"
              className={`font-medium transition-colors duration-200 ${
                currentPage === "fund/13"
                  ? "text-white"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              <span role="img" aria-label="rocket">🚀</span> Project Catalyst
            </Link>
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
  );
}