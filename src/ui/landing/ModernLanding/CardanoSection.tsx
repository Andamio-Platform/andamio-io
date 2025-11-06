import React from "react";
import Image from "next/image";

export default function CardanoSection() {
  return (
    <section
      id="cardano"
      className="relative flex min-h-screen items-center overflow-hidden border-t-0 snap-start"
      style={{ paddingTop: 'clamp(3rem, 6vh, 5rem)', paddingBottom: 'clamp(3rem, 6vh, 5rem)' }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-6 sm:gap-8 lg:gap-12 lg:grid-cols-2">
          {/* Left side - Stats Cards */}
          <div className="flex flex-col order-2 lg:order-1" style={{ gap: 'clamp(1rem, 2vh, 1.5rem)' }}>
            <div className="group relative">
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-primary/20 to-primary/10 opacity-50 blur-xl transition duration-500 group-hover:opacity-75"></div>
              <div className="relative rounded-xl border-2 border-border bg-card p-4 sm:p-5 lg:p-6 shadow-2xl">
                <Image
                  src="/cardano-horizontal-blue.svg"
                  alt="Cardano"
                  className="mb-3 sm:mb-4 h-10 sm:h-12 w-auto"
                  width={500}
                  height={500}
                />
                <div className="mb-2 sm:mb-3 text-3xl sm:text-4xl font-bold text-primary">100%</div>
                <div className="text-base sm:text-lg font-semibold text-foreground">Verifiable</div>
                <div className="mt-2 sm:mt-3 h-1.5 w-full rounded-full bg-primary/20"></div>
              </div>
            </div>

            <div className="group relative">
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-secondary/20 to-secondary/10 opacity-50 blur-xl transition duration-500 group-hover:opacity-75"></div>
              <div className="relative rounded-xl border-2 border-border bg-card p-4 sm:p-5 lg:p-6 shadow-2xl">
                <div className="mb-2 sm:mb-3 text-3xl sm:text-4xl font-bold text-secondary">∞</div>
                <div className="text-base sm:text-lg font-semibold text-foreground">Permanent</div>
                <div className="mt-2 sm:mt-3 h-1.5 w-full rounded-full bg-secondary/20"></div>
              </div>
            </div>

            <div className="group relative">
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-accent/20 to-accent/10 opacity-50 blur-xl transition duration-500 group-hover:opacity-75"></div>
              <div className="relative rounded-xl border-2 border-border bg-card p-4 sm:p-5 lg:p-6 shadow-2xl">
                <div className="mb-2 sm:mb-3 text-3xl sm:text-4xl font-bold text-accent">24/7</div>
                <div className="text-base sm:text-lg font-semibold text-foreground">Accessible</div>
                <div className="mt-2 sm:mt-3 h-1.5 w-full rounded-full bg-accent/20"></div>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="relative order-1 lg:order-2">
            <h2 className="mb-4 sm:mb-6 lg:mb-8 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1]">
              <span className="block tracking-tight text-foreground">Built on</span>
              <span className="block bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text tracking-tight text-transparent">
                Cardano
              </span>
            </h2>

            <div className="relative">
              <p className="mb-3 sm:mb-4 lg:mb-5 text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold leading-tight text-foreground">
                Leveraging the security and sustainability of the Cardano blockchain.
              </p>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground">
                Andamio harnesses Cardano's proof-of-stake blockchain to provide secure, energy-efficient, and transparent credentialing. Every certificate and achievement is{" "}
                <strong className="text-foreground">immutably recorded</strong>, ensuring your credentials are always verifiable and portable.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
