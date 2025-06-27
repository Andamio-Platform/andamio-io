import React from "react";
import { Button } from "~/components/ui/button";
import { Target, Users, CheckCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ModernLanding() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-950 to-gray-900 text-white">
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
      <nav className="fixed top-0 z-50 w-full border-b border-white/20 backdrop-blur-sm bg-black/20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <div className="flex items-center">
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
            </div>
            <div className="hidden items-center space-x-8 md:flex">
              <a
                href="#protocol"
                className="font-medium text-gray-300 transition-colors duration-200 hover:text-white"
              >
                Docs
              </a>
              <Link
                href="/roadmap"
                className="font-medium text-gray-300 transition-colors duration-200 hover:text-white"
              >
                Roadmap
              </Link>
              <Link
                href="/blog"
                className="font-medium text-gray-300 transition-colors duration-200 hover:text-white"
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

      {/* Hero Section */}
      <section className="relative flex min-h-screen items-center overflow-hidden">
        {/* Background Andamio Logo */}
        <div className="absolute -left-40 top-1/2 -translate-y-1/2 transform opacity-5">
          <Image
            src="/andamio-logo-no-white-overflow.png"
            alt=""
            width={800}
            height={800}
            className="h-[50vh] w-auto"
          />
        </div>

        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="relative">
            {/* Angular accent lines */}

            <div className="grid items-center gap-8 lg:grid-cols-2">
              <div className="relative">
                <h1 className="mb-10 text-5xl font-bold  lg:text-8xl">
                  <span className="block tracking-tight">Verified</span>
                  <span className="block bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text tracking-tight text-transparent drop-shadow-lg">
                    Trust
                  </span>
                  <span className="mt-4 block text-2xl font-normal text-gray-300 lg:text-4xl">
                    for Distributed Work
                  </span>
                </h1>

                <div className="relative mb-12 border-l-2 border-white/20 pl-6">
                  <p className="mb-6 text-xl leading-relaxed text-gray-300">
                    Infrastructure for{" "}
                    <strong className="text-white">
                      decentralized access control
                    </strong>
                    , credential issuance, contributor onboarding, and treasury
                    management.
                  </p>
                  <p className="text-lg text-gray-400">
                    Local participation that opens global opportunity.
                  </p>
                </div>

                <div className="flex flex-col gap-6 sm:flex-row">
                  <Button
                    size="lg"
                    className="bg-white px-8 py-4 font-semibold text-blue-900 shadow-xl hover:bg-gray-100"
                  >
                    Start with Andamio 101
                  </Button>
                  <Button
                    size="lg"
                    className="border-white/50 px-8 py-4 text-lg font-semibold text-white shadow-lg hover:bg-white/10 hover:text-white"
                  >
                    View Documentation
                  </Button>
                </div>
              </div>

              {/* Right side image collage */}
              <div className="relative hidden lg:block">
                <div className="relative">
                  <div className="relative h-[55vh] w-full">
                    {/* Top left - smaller, rotated slightly */}
                    <div className="absolute left-12 top-0 z-10 h-48 w-56 -rotate-2 transform overflow-hidden border-8 border-white shadow-2xl">
                      <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                        style={{
                          backgroundImage: "url(/images/landing/example1.jpeg)",
                        }}
                      ></div>
                      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-blue-800/40 to-transparent"></div>
                      <div className="relative flex h-full flex-col justify-end p-4">
                        <div className="mb-3 h-8 w-full bg-gradient-to-r from-blue-500/20 to-transparent"></div>
                        <div className="space-y-1">
                          <div className="h-1.5 w-2/3 bg-white/20"></div>
                          <div className="h-1.5 w-1/2 bg-white/10"></div>
                        </div>
                      </div>
                    </div>

                    {/* Top right - larger, slight rotation */}
                    <div className="absolute right-8 top-8 z-20 h-64 w-64 rotate-1 transform overflow-hidden border-8 border-white shadow-2xl">
                      <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                        style={{
                          backgroundImage: "url(/images/landing/example2.jpeg)",
                        }}
                      ></div>
                      <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/80 via-cyan-800/40 to-transparent"></div>
                      <div className="relative flex h-full flex-col justify-end p-4">
                        <div className="mb-3 h-12 w-full bg-gradient-to-r from-cyan-500/20 to-transparent"></div>
                        <div className="space-y-2">
                          <div className="h-1.5 w-2/3 bg-white/20"></div>
                          <div className="h-1.5 w-3/4 bg-white/10"></div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom left - larger, overlapping */}
                    <div className="absolute bottom-24 left-4 z-30 h-60 w-72 -rotate-1 transform overflow-hidden border-8 border-white shadow-2xl">
                      <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                        style={{
                          backgroundImage: "url(/images/landing/example3.jpeg)",
                        }}
                      ></div>
                      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 via-purple-800/40 to-transparent"></div>
                      <div className="relative flex h-full flex-col justify-end p-4">
                        <div className="mb-3 h-12 w-full bg-gradient-to-r from-purple-500/20 to-transparent"></div>
                        <div className="space-y-2">
                          <div className="h-1.5 w-1/2 bg-white/20"></div>
                          <div className="h-1.5 w-2/3 bg-white/10"></div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom right - smaller, highest z-index */}
                    <div className="absolute bottom-12 right-12 z-40 h-52 w-52 rotate-3 transform overflow-hidden border-8 border-white shadow-2xl">
                      <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                        style={{
                          backgroundImage: "url(/images/landing/example4.jpeg)",
                        }}
                      ></div>
                      <div className="absolute inset-0 bg-gradient-to-t from-green-900/80 via-green-800/40 to-transparent"></div>
                      <div className="relative flex h-full flex-col justify-end p-4">
                        <div className="mb-3 h-10 w-full bg-gradient-to-r from-green-500/20 to-transparent"></div>
                        <div className="space-y-1">
                          <div className="h-1.5 w-3/5 bg-white/20"></div>
                          <div className="h-1.5 w-4/5 bg-white/10"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll down arrow */}
        <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 transform lg:flex">
          <button
            onClick={() =>
              document
                .getElementById("trust")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="group flex flex-col items-center text-white/60 transition-colors duration-300 hover:text-white"
          >
            <div className="mb-2 text-xs font-medium uppercase tracking-widest">
              Next
            </div>
            <div className="h-8 w-px bg-white/20 transition-colors duration-300 group-hover:bg-white/40"></div>
            <svg
              className="mt-2 h-4 w-4 animate-[throb_2s_ease-in-out_infinite]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </button>
        </div>
      </section>

      {/* Trust Framework */}
      <section
        id="trust"
        className="relative flex h-screen items-center overflow-hidden border-t border-white/10"
      >
        <div className="mx-auto max-w-5xl px-6 py-8 lg:px-8">
          <div className="relative">
            {/* Section header */}
            <div className="mb-8">
              <div className="mb-4 flex items-center gap-4">
                <div className="h-1 w-12 bg-gradient-to-r from-cyan-500 to-transparent"></div>
                <h2 className="text-3xl font-bold text-white lg:text-4xl">
                  Three Pillars of Trust
                </h2>
              </div>
              <p className="max-w-3xl text-lg text-gray-300">
                Trust is the foundation of any distributed ecosystem. By
                enabling purpose-driven, collaborative work, Andamio creates
                ways for trust networks to thrive.
              </p>
            </div>

            {/* Vertical Process Flow */}
            <div className="relative">
              {/* Central connecting line */}
              <div className="absolute bottom-0 left-1/2 top-0 w-px -translate-x-1/2 transform bg-gradient-to-b from-blue-500 via-green-500 to-purple-500"></div>

              {/* Process flow items */}
              <div className="space-y-8 lg:space-y-12">
                {/* Purpose - Slides in from left */}
                <div className="relative animate-[slideInLeft_1s_ease-out_0.2s_both]">
                  <div className="flex flex-col items-center justify-between lg:flex-row">
                    <div className="w-full pr-0 lg:w-5/12 lg:pr-8">
                      <div className="group relative">
                        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-500/30 to-blue-600/30 opacity-50 blur-xl transition duration-500 group-hover:opacity-75"></div>
                        <div className="relative rounded-2xl border border-white/20 bg-gray-800/60 p-6 shadow-2xl backdrop-blur-sm">
                          <div className="mb-4 flex items-center gap-4">
                            <div className="flex h-16 w-16 items-center justify-center rounded-sm bg-gradient-to-br from-blue-500 to-blue-600 text-2xl font-bold text-white shadow-xl shadow-blue-500/25">
                              <Target className="h-8 w-8" />
                            </div>
                            <div>
                              <h3 className="mb-2 text-2xl font-bold text-white">
                                Purpose
                              </h3>
                              <div className="h-0.5 w-16 bg-blue-500"></div>
                            </div>
                          </div>
                          <p className="mb-3 text-base font-semibold text-blue-400">
                            Do we trust that our work matters?
                          </p>
                          <p className="text-base leading-relaxed text-gray-300">
                            Infrastructure for projects to define their mission,
                            manage treasuries, and create
                            <strong className="text-white">
                              {" "}
                              transparent governance structures
                            </strong>{" "}
                            that ensure meaningful work.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Central node */}
                    <div className="relative z-10 hidden lg:block">
                      <div className="h-8 w-8 rounded-full border-4 border-gray-950 bg-blue-500 shadow-lg shadow-blue-500/50"></div>
                      <div className="absolute -inset-2 animate-pulse rounded-full bg-blue-500/20"></div>
                    </div>

                    <div className="hidden w-5/12 pl-8 lg:block">
                      <div className="text-right opacity-40">
                        <div className="text-6xl font-bold text-blue-500/30">
                          01
                        </div>
                        <div className="mt-2 text-blue-300/50">Foundation</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Participation - Slides in from right */}
                <div className="relative animate-[slideInRight_1s_ease-out_0.4s_both]">
                  <div className="flex flex-col items-center justify-between lg:flex-row">
                    <div className="hidden w-5/12 pr-8 lg:block">
                      <div className="text-left opacity-40">
                        <div className="text-6xl font-bold text-green-500/30">
                          02
                        </div>
                        <div className="mt-2 text-green-300/50">Connection</div>
                      </div>
                    </div>

                    {/* Central node */}
                    <div className="relative z-10 hidden lg:block">
                      <div className="h-8 w-8 rounded-full border-4 border-gray-950 bg-green-500 shadow-lg shadow-green-500/50"></div>
                      <div className="absolute -inset-2 animate-pulse rounded-full bg-green-500/20"></div>
                    </div>

                    <div className="w-full pl-0 lg:w-5/12 lg:pl-8">
                      <div className="group relative">
                        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-green-500/30 to-green-600/30 opacity-50 blur-xl transition duration-500 group-hover:opacity-75"></div>
                        <div className="relative rounded-2xl border border-white/20 bg-gray-800/60 p-6 shadow-2xl backdrop-blur-sm">
                          <div className="mb-4 flex items-center gap-4">
                            <div className="flex h-16 w-16 items-center justify-center rounded-sm bg-gradient-to-br from-green-500 to-green-600 text-2xl font-bold text-white shadow-xl shadow-green-500/25">
                              <Users className="h-8 w-8" />
                            </div>
                            <div>
                              <h3 className="mb-2 text-2xl font-bold text-white">
                                Participation
                              </h3>
                              <div className="h-0.5 w-16 bg-green-500"></div>
                            </div>
                          </div>
                          <p className="mb-3 text-base font-semibold text-green-400">
                            Do we trust the people we are working with?
                          </p>
                          <p className="text-base leading-relaxed text-gray-300">
                            Credentials and rewards systems that enable
                            contributor onboarding,
                            <strong className="text-white">
                              {" "}
                              role-based access control
                            </strong>
                            , and recognition of valuable contributions.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Proof - Slides in from left */}
                <div className="relative animate-[slideInLeft_1s_ease-out_0.6s_both]">
                  <div className="flex flex-col items-center justify-between lg:flex-row">
                    <div className="w-full pr-0 lg:w-5/12 lg:pr-8">
                      <div className="group relative">
                        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-purple-500/30 to-purple-600/30 opacity-50 blur-xl transition duration-500 group-hover:opacity-75"></div>
                        <div className="relative rounded-2xl border border-white/20 bg-gray-800/60 p-6 shadow-2xl backdrop-blur-sm">
                          <div className="mb-4 flex items-center gap-4">
                            <div className="flex h-16 w-16 items-center justify-center rounded-sm bg-gradient-to-br from-purple-500 to-purple-600 text-2xl font-bold text-white shadow-xl shadow-purple-500/25">
                              <CheckCircle className="h-8 w-8" />
                            </div>
                            <div>
                              <h3 className="mb-2 text-2xl font-bold text-white">
                                Proof
                              </h3>
                              <div className="h-0.5 w-16 bg-purple-500"></div>
                            </div>
                          </div>
                          <p className="mb-3 text-base font-semibold text-purple-400">
                            Do we trust that others can do what they say they
                            can do?
                          </p>
                          <p className="text-base leading-relaxed text-gray-300">
                            Discovery and connection tools that make credentials
                            portable and verifiable, enabling
                            <strong className="text-white">
                              {" "}
                              global opportunities through local participation
                            </strong>
                            .
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Central node */}
                    <div className="relative z-10 hidden lg:block">
                      <div className="h-8 w-8 rounded-full border-4 border-gray-950 bg-purple-500 shadow-lg shadow-purple-500/50"></div>
                      <div className="absolute -inset-2 animate-pulse rounded-full bg-purple-500/20"></div>
                    </div>

                    <div className="hidden w-5/12 pl-8 lg:block">
                      <div className="text-right opacity-40">
                        <div className="text-6xl font-bold text-purple-500/30">
                          03
                        </div>
                        <div className="mt-2 text-purple-300/50">
                          Verification
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll down arrow */}
        <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 transform lg:flex">
          <button
            onClick={() =>
              document
                .getElementById("protocol")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="group flex flex-col items-center text-white/60 transition-colors duration-300 hover:text-white"
          >
            <div className="mb-2 text-xs font-medium uppercase tracking-widest">
              Scroll
            </div>
            <div className="h-8 w-px bg-white/20 transition-colors duration-300 group-hover:bg-white/40"></div>
            <svg
              className="mt-2 h-4 w-4 animate-[throb_2s_ease-in-out_infinite]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </button>
        </div>
      </section>

      {/* Andamio Protocol Components */}
      <section
        id="protocol"
        className="relative flex min-h-screen items-center border-t border-white/10"
      >
        <div className="mx-auto w-5/6 max-w-screen-2xl px-6 py-20 lg:px-8">
          <div className="relative">
            {/* Section header */}
            <div className="mb-16">
              <div className="mb-6 flex items-center gap-4">
                <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-transparent"></div>
                <h2 className="text-4xl font-bold text-white lg:text-5xl">
                  The Andamio Protocol
                </h2>
              </div>
              <p className="max-w-3xl text-xl text-gray-300">
                Three core components enabling trust for distributed work.
              </p>
            </div>

            {/* Three column grid */}
            <div className="grid max-w-none gap-16 lg:grid-cols-3">
              {/* Global State */}
              <div className="group relative">
                <div className="absolute -inset-0.5 rounded-sm bg-gradient-to-r from-blue-500 to-blue-600 opacity-30 blur transition duration-500 group-hover:opacity-50"></div>
                <div className="relative aspect-square overflow-hidden rounded-sm border border-white/20 bg-gray-900 shadow-2xl transition-all duration-500 hover:shadow-blue-500/10">
                  {/* Background image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 ease-out group-hover:scale-110"
                    style={{
                      backgroundImage: "url(/images/landing/global.jpeg)",
                    }}
                  ></div>

                  {/* Overlay gradients */}
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-800/50 to-transparent"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 to-transparent"></div>

                  {/* Content overlay */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <div className="space-y-3">
                      <h3 className="text-xl font-bold text-white">
                        Global Connection
                      </h3>
                      <div className="h-0.5 w-16 bg-blue-400"></div>
                      <p className="text-sm leading-relaxed text-blue-100">
                        Shared, immutable records of credentials and
                        achievements across the entire network, enabling{" "}
                        <strong className="text-white">
                          universal verification
                        </strong>{" "}
                        and trust.
                      </p>
                    </div>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-blue-900/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                </div>
              </div>

              {/* Local State */}
              <div className="group relative">
                <div className="absolute -inset-0.5 rounded-sm bg-gradient-to-r from-green-500 to-green-600 opacity-30 blur transition duration-500 group-hover:opacity-50"></div>
                <div className="relative aspect-square overflow-hidden rounded-sm border border-white/20 bg-gray-900 shadow-2xl transition-all duration-500 hover:shadow-green-500/10">
                  {/* Background image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 ease-out group-hover:scale-110"
                    style={{
                      backgroundImage: "url(/images/landing/local.jpeg)",
                    }}
                  ></div>

                  {/* Overlay gradients */}
                  <div className="absolute inset-0 bg-gradient-to-t from-green-900/90 via-green-800/50 to-transparent"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-green-900/40 to-transparent"></div>

                  {/* Content overlay */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <div className="space-y-3">
                      <h3 className="text-xl font-bold text-white">
                        Local Infrastructure
                      </h3>
                      <div className="h-0.5 w-16 bg-green-400"></div>
                      <p className="text-sm leading-relaxed text-green-100">
                        Project-specific data and governance structures that
                        manage participation, contributions, and{" "}
                        <strong className="text-white">
                          treasury allocation
                        </strong>{" "}
                        within communities.
                      </p>
                    </div>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-green-900/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                </div>
              </div>

              {/* Access Token */}
              <div className="group relative">
                <div className="absolute -inset-0.5 rounded-sm bg-gradient-to-r from-purple-500 to-purple-600 opacity-30 blur transition duration-500 group-hover:opacity-50"></div>
                <div className="relative aspect-square overflow-hidden rounded-sm border border-white/20 bg-gray-900 shadow-2xl transition-all duration-500 hover:shadow-purple-500/10">
                  {/* Background image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 ease-out group-hover:scale-110"
                    style={{
                      backgroundImage: "url(/images/landing/access-token.jpeg)",
                    }}
                  ></div>

                  {/* Overlay gradients */}
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/90 via-purple-800/50 to-transparent"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-900/40 to-transparent"></div>

                  {/* Content overlay */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <div className="space-y-3">
                      <h3 className="text-xl font-bold text-white">
                        Access Token
                      </h3>
                      <div className="h-0.5 w-16 bg-purple-400"></div>
                      <p className="text-sm leading-relaxed text-purple-100">
                        Your key to a network of applications - enabling
                        seamless{" "}
                        <strong className="text-white">access control</strong>
                        and participation across the distributed work ecosystem.
                      </p>
                    </div>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-purple-900/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll down arrow */}
        <div className="absolute bottom-16 left-1/2 hidden -translate-x-1/2 transform lg:bottom-8 lg:flex">
          <button
            onClick={() =>
              document
                .getElementById("cardano")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="group flex flex-col items-center text-white/60 transition-colors duration-300 hover:text-white"
          >
            <div className="mb-2 text-xs font-medium uppercase tracking-widest">
              Next
            </div>
            <div className="h-8 w-px bg-white/20 transition-colors duration-300 group-hover:bg-white/40"></div>
            <svg
              className="mt-2 h-4 w-4 animate-[throb_2s_ease-in-out_infinite]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </button>
        </div>
      </section>

      {/* Built on Cardano */}
      <section
        id="cardano"
        className="relative flex min-h-screen items-center border-t border-white/10"
      >
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="grid items-center gap-20 lg:grid-cols-2">
            <div className="relative">
              <div className="mb-8 flex items-center gap-4">
                <div className="h-1 w-12 bg-gradient-to-r from-orange-500 to-transparent"></div>
                <h2 className="text-4xl font-bold text-white lg:text-5xl">
                  Built on Cardano
                </h2>
              </div>
              <p className="mb-10 text-xl text-gray-300">
                Leveraging the security and sustainability of the Cardano
                blockchain.
              </p>

              <div className="relative rounded-sm border border-white/20 bg-gray-100 p-8 text-gray-900 backdrop-blur-sm">
                <Image
                  src="/cardano-horizontal-blue.svg"
                  alt="Cardano"
                  className="mb-8 h-12 brightness-125 filter"
                  width={500}
                  height={500}
                />
                <p className="text-lg leading-relaxed text-gray-800">
                  Andamio harnesses Cardano's proof-of-stake blockchain to
                  provide secure, energy-efficient, and transparent
                  credentialing. Every certificate and achievement is{" "}
                  <strong className="text-black">immutably recorded</strong>,
                  ensuring your credentials are always verifiable and portable.
                </p>
              </div>
            </div>

            <div className="mx-auto grid w-[180px] grid-cols-1 gap-6">
              <div className="group relative">
                <div className="absolute -inset-0.5 rounded-sm bg-blue-500/30 opacity-50 blur transition duration-300 group-hover:opacity-75"></div>
                <div className="relative rounded-sm border border-white/20 bg-gray-800/80 p-6 shadow-xl backdrop-blur-sm">
                  <div className="mb-2 text-3xl font-bold text-blue-400">
                    100%
                  </div>
                  <div className="font-medium text-gray-300">Verifiable</div>
                  <div className="mt-3 h-1 w-full rounded-full bg-blue-500/20"></div>
                </div>
              </div>

              <div className="group relative">
                <div className="absolute -inset-0.5 rounded-sm bg-purple-500/30 opacity-50 blur transition duration-300 group-hover:opacity-75"></div>
                <div className="relative rounded-sm border border-white/20 bg-gray-800/80 p-6 shadow-xl backdrop-blur-sm">
                  <div className="mb-2 text-3xl font-bold text-purple-400">
                    ∞
                  </div>
                  <div className="font-medium text-gray-300">Permanent</div>
                  <div className="mt-3 h-1 w-full rounded-full bg-purple-500/20"></div>
                </div>
              </div>

              <div className="group relative">
                <div className="absolute -inset-0.5 rounded-sm bg-orange-500/30 opacity-50 blur transition duration-300 group-hover:opacity-75"></div>
                <div className="relative rounded-sm border border-white/20 bg-gray-800/80 p-6 shadow-xl backdrop-blur-sm">
                  <div className="mb-2 text-3xl font-bold text-orange-400">
                    24/7
                  </div>
                  <div className="font-medium text-gray-300">Accessible</div>
                  <div className="mt-3 h-1 w-full rounded-full bg-orange-500/20"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll down arrow */}
        <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 transform lg:flex">
          <button
            onClick={() =>
              document
                .getElementById("cta")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="group flex flex-col items-center text-white/60 transition-colors duration-300 hover:text-white"
          >
            <div className="mb-2 text-xs font-medium uppercase tracking-widest">
              Final
            </div>
            <div className="h-8 w-px bg-white/20 transition-colors duration-300 group-hover:bg-white/40"></div>
            <svg
              className="mt-2 h-4 w-4 animate-[throb_2s_ease-in-out_infinite]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </button>
        </div>
      </section>

      {/* CTA Section */}
      <section
        id="cta"
        className="relative flex min-h-screen items-center overflow-hidden border-t border-white/10 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
        <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div>
              <div className="mb-8 flex items-center gap-4">
                <div className="h-1 w-12 bg-gradient-to-r from-white to-transparent"></div>
                <h2 className="text-4xl font-bold text-white lg:text-5xl">
                  Ready to enable trust for distributed work?
                </h2>
              </div>
              <p className="mb-10 text-xl leading-relaxed text-blue-100">
                Join projects and contributors building the future of
                decentralized collaboration.
              </p>

              <div className="mb-10 flex flex-col gap-6 sm:flex-row">
                <Button
                  size="lg"
                  className="bg-white px-8 py-4 font-semibold text-blue-900 shadow-xl hover:bg-gray-100"
                >
                  Start with Andamio 101
                </Button>
                <Button
                  size="lg"
                  className="border-white/70 px-8 py-4 font-semibold text-white shadow-lg hover:bg-white/20 hover:text-white"
                >
                  View Documentation
                </Button>
              </div>

              <div className="grid gap-6 text-blue-200 sm:grid-cols-2">
                <div className="flex items-center gap-4 rounded-sm border border-white/20 bg-white/10 p-6 backdrop-blur-sm">
                  <span className="text-3xl">👤</span>
                  <div>
                    <div className="text-lg font-semibold text-white">
                      Curious Users
                    </div>
                    <div className="text-sm">Start with Andamio 101</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 rounded-sm border border-white/20 bg-white/10 p-6 backdrop-blur-sm">
                  <span className="text-3xl">👩‍💻</span>
                  <div>
                    <div className="text-lg font-semibold text-white">
                      Developers
                    </div>
                    <div className="text-sm">Explore Documentation</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 via-transparent to-white/5"></div>
              <div className="relative p-8">
                <div className="grid h-80 grid-cols-3 gap-4">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <div
                      key={i}
                      className={`rounded-sm border border-white/20 bg-white/10 backdrop-blur-sm ${i % 3 === 1 ? "mt-8" : i % 3 === 2 ? "-mt-4" : ""}`}
                    >
                      <div className="h-full w-full rounded-sm bg-gradient-to-br from-blue-400/20 to-transparent"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
