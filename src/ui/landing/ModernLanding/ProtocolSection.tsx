import React from "react";
import Link from "next/link";

export default function ProtocolSection() {
  return (
    <section
      id="protocol"
      className="relative flex items-center border-t-0 snap-start min-h-screen pt-20 sm:pt-24"
      style={{ paddingBottom: 'clamp(1.5rem, 3vh, 3.5rem)' }}
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative">
          {/* Section header */}
          <div className="mb-4 sm:mb-5 lg:mb-6">
            <div className="mb-2 flex items-center gap-2">
              <div className="h-0.5 w-6 bg-gradient-to-r from-primary to-transparent"></div>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
                Three Ways to Build with Andamio
              </h2>
            </div>
            <p className="mb-1 max-w-3xl text-sm sm:text-base text-muted-foreground">
              <strong className="text-foreground">
              Accessible professional identity{" "}
              </strong>
                that works for your team
            </p>
            <p className="max-w-2xl text-xs sm:text-sm text-muted-foreground">
              Andamio is built to be integrated across applications. Whether you want a ready-to-use solution, developer tools, or protocol-level integration, these tools help you get started.
            </p>
          </div>

          {/* Three column grid */}
          <div className="grid gap-5 sm:gap-6 lg:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Platform */}
            <Link href="https://app.andamio.io">
            <div className="group relative">
              <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-primary/30 to-primary/20 opacity-30 blur transition duration-500 group-hover:opacity-50"></div>
              <div className="relative aspect-square overflow-hidden rounded-lg border border-border bg-card shadow-xl transition-all duration-500 hover:shadow-2xl">
                {/* Background image */}
                <div
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 ease-out group-hover:scale-110"
                  style={{
                    backgroundImage: "url(/images/landing/global.jpeg)",
                  }}
                ></div>

                {/* Overlay gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/40 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-transparent"></div>

                {/* Content overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-3 sm:p-4 lg:p-5">
                  <div className="space-y-1.5 sm:space-y-2">
                    <h3 className="text-base sm:text-lg font-bold text-card">
                      Platform
                    </h3>
                    <div className="h-0.5 w-10 sm:w-12 bg-card"></div>
                    <p className="text-xs leading-relaxed text-card line-clamp-4">
                      A complete, hosted solution at{" "}
                      <strong className="text-card">app.andamio.io</strong>.
                      Start building your team immediately with no infrastructure setup required.
                    </p>
                  </div>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-primary/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
              </div>
            </div>
            </Link>

            {/* SDK + API */}
            <Link href="https://sdk.andamio.io/">
            <div className="group relative">
              <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-success/30 to-success/20 opacity-30 blur transition duration-500 group-hover:opacity-50"></div>
              <div className="relative aspect-square overflow-hidden rounded-lg border border-border bg-card shadow-xl transition-all duration-500 hover:shadow-2xl">
                {/* Background image */}
                <div
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 ease-out group-hover:scale-110"
                  style={{
                    backgroundImage: "url(/images/landing/local.jpeg)",
                  }}
                ></div>

                {/* Overlay gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-success/80 via-success/40 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-success/30 to-transparent"></div>

                {/* Content overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-3 sm:p-4 lg:p-5">
                  <div className="space-y-1.5 sm:space-y-2">
                    <h3 className="text-base sm:text-lg font-bold text-card">
                      SDK + API
                    </h3>
                    <div className="h-0.5 w-10 sm:w-12 bg-card"></div>
                    <p className="text-xs leading-relaxed text-card line-clamp-4">
                      Developer tools that{" "}
                      <strong className="text-card">
                        integrate with your existing applications
                      </strong>. Add credentialing to your product in days, not months.
                    </p>
                  </div>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-success/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
              </div>
            </div>
            </Link>


            {/* Andamio Protocol */}
            <Link href="https://docs.andamio.io">
            <div className="group relative md:col-span-2 lg:col-span-1">
              <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-secondary/30 to-secondary/20 opacity-30 blur transition duration-500 group-hover:opacity-50"></div>
              <div className="relative aspect-square overflow-hidden rounded-lg border border-border bg-card shadow-xl transition-all duration-500 hover:shadow-2xl">
                {/* Background image */}
                <div
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 ease-out group-hover:scale-110"
                  style={{
                    backgroundImage: "url(/images/landing/access-token.jpeg)",
                  }}
                ></div>

                {/* Overlay gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-secondary/40 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-secondary/30 to-transparent"></div>

                {/* Content overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-3 sm:p-4 lg:p-5">
                  <div className="space-y-1.5 sm:space-y-2">
                    <h3 className="text-base sm:text-lg font-bold text-card">
                      Andamio Protocol
                    </h3>
                    <div className="h-0.5 w-10 sm:w-12 bg-card"></div>
                    <p className="text-xs leading-relaxed text-card line-clamp-4">
                      Open credentialing infrastructure built on{" "}
                      <strong className="text-card">Cardano blockchain</strong>.
                      Portable identity for distributed work.
                    </p>
                  </div>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-secondary/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
              </div>
            </div>
            </Link>

          </div>
        </div>
      </div>


    </section>
  );
}
