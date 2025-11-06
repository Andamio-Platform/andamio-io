import React from "react";

export default function RiskFreeSection() {
  return (
    <section
      id="outcomes"
      className="relative flex items-center overflow-hidden snap-start min-h-screen border-t-0"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full py-8 sm:py-12 lg:py-16">
        <div className="grid items-center gap-6 lg:gap-10 xl:gap-12 lg:grid-cols-2">
          {/* Left Content */}
          <div className="relative flex flex-col justify-center">
            <h2 className="mb-3 sm:mb-4 lg:mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05]">
              <span className="block tracking-tight text-foreground">Risk-Free</span>
              <span className="block bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text tracking-tight text-transparent">
                Team Building
              </span>
            </h2>

            <div className="relative">
              <p className="mb-2 sm:mb-3 lg:mb-4 text-lg sm:text-xl md:text-2xl font-bold leading-tight text-foreground">
                Either way, everyone wins.
              </p>
              <p className="text-base sm:text-lg text-muted-foreground">
                Skip the traditional interview theater.
              </p>
            </div>
          </div>

          {/* Right side - Stacked Outcomes */}
          <div className="flex flex-col justify-center" style={{ gap: 'clamp(1rem, 2vh, 1.5rem)', paddingTop: 'clamp(1rem, 2vh, 1.5rem)', paddingBottom: 'clamp(1rem, 2vh, 1.5rem)' }}>
            {/* Works Out */}
            <div className="group relative">
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-success/20 to-success/10 opacity-50 blur-xl transition duration-500 group-hover:opacity-75"></div>
              <div className="relative rounded-xl border-2 border-border bg-card p-4 sm:p-5 lg:p-6 shadow-2xl">
                <div className="mb-2.5 sm:mb-3 lg:mb-4 flex items-center gap-2.5 sm:gap-3">
                  <div className="flex h-11 w-11 sm:h-12 sm:w-12 lg:h-14 lg:w-14 items-center justify-center rounded-full bg-success shadow-lg flex-shrink-0">
                    <svg className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 text-success-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-base sm:text-lg lg:text-xl font-bold text-foreground">If It Works Out</h3>
                </div>
                <div className="space-y-2 sm:space-y-2.5 lg:space-y-3 text-sm sm:text-base leading-relaxed text-muted-foreground">
                  <p>
                    You've built{" "}
                    <strong className="text-foreground">real trust</strong> by working
                    together on actual tasks.
                  </p>
                  <p>
                    They're already{" "}
                    <strong className="text-foreground">onboarded and enrolled</strong>{" "}
                    in your project workflows.
                  </p>
                  <p>
                    You skip the traditional interview theater and hire someone{" "}
                    <strong className="text-foreground">
                      you've actually worked with
                    </strong>
                    .
                  </p>
                </div>
              </div>
            </div>

            {/* Doesn't Work Out */}
            <div className="group relative">
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-primary/20 to-primary/10 opacity-50 blur-xl transition duration-500 group-hover:opacity-75"></div>
              <div className="relative rounded-xl border-2 border-border bg-card p-4 sm:p-5 lg:p-6 shadow-2xl">
                <div className="mb-2.5 sm:mb-3 lg:mb-4 flex items-center gap-2.5 sm:gap-3">
                  <div className="flex h-11 w-11 sm:h-12 sm:w-12 lg:h-14 lg:w-14 items-center justify-center rounded-full bg-primary shadow-lg flex-shrink-0">
                    <svg className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-base sm:text-lg lg:text-xl font-bold text-foreground">If It Doesn't Work Out</h3>
                </div>
                <div className="space-y-2 sm:space-y-2.5 lg:space-y-3 text-sm sm:text-base leading-relaxed text-muted-foreground">
                  <p>
                    The time wasn't wasted—your{" "}
                    <strong className="text-foreground">team still got work done</strong>.
                  </p>
                  <p>
                    The contributor has{" "}
                    <strong className="text-foreground">
                      verifiable credentials
                    </strong>{" "}
                    for what they learned and how they contributed.
                  </p>
                  <p>
                    Those credentials are{" "}
                    <strong className="text-foreground">portable across apps</strong>
                    —someone else likely needs a Cardano TypeScript developer.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
