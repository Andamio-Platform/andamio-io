import React from "react";
import V2Navigation from "./V2Navigation";
import V2HeroSection from "./V2HeroSection";
import V2ProblemSection from "./V2ProblemSection";
import V2IssuerOverview from "./V2IssuerOverview";
import V2IssuerExplorer from "./V2IssuerExplorer";
import V2QuoteBandSection from "./V2QuoteBandSection";
import V2ArchitectureSection from "./V2ArchitectureSection";
import V2CTAFooter from "./V2CTAFooter";

/* Zone header — marks the two products as distinct sections of the page. */
function ZoneHeader({
  id,
  eyebrow,
  title,
  blurb,
}: {
  id: string;
  eyebrow: string;
  title: string;
  blurb: string;
}) {
  return (
    <section
      id={id}
      className="flex min-h-screen flex-col justify-center border-t border-border bg-background"
    >
      <div className="mx-auto max-w-none px-5 sm:px-8 lg:px-14 2xl:px-20">
        <p className="text-sm font-semibold text-muted-foreground">
          {eyebrow}
        </p>
        <h2 className="mt-4 font-display text-[3.25rem] font-bold leading-[0.98] tracking-[-0.02em] text-foreground sm:text-8xl lg:text-9xl">
          {title}
        </h2>
        <p className="mt-7 max-w-3xl text-xl leading-relaxed tracking-[-0.005em] text-muted-foreground sm:text-2xl">
          {blurb}
        </p>
      </div>
    </section>
  );
}

export default function V2Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <V2Navigation />
      <V2HeroSection />

      {/* ===================== THE PROBLEM ======================== */}
      <V2ProblemSection />

      {/* ===================== ANDAMIO ISSUER ===================== */}
      <V2IssuerOverview />
      <V2IssuerExplorer />

      {/* ===================== ANDAMIO API ======================= */}
      <ZoneHeader
        id="andamio-api"
        eyebrow="Product 02 · For builders"
        title="Andamio API"
        blurb="The protocol you build on. The same credentials, as REST endpoints. Issue, verify, and gate on them from your own stack."
      />
      <V2ArchitectureSection />

      {/* ===================== PROOF + CLOSE ====================== */}
      <V2QuoteBandSection />
      <V2CTAFooter />
    </div>
  );
}
