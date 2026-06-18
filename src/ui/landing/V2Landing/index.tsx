import React from "react";
import V2Navigation from "./V2Navigation";
import V2HeroSection from "./V2HeroSection";
import V2ProblemSection from "./V2ProblemSection";
import V2ComposabilityTaxSection from "./V2ComposabilityTaxSection";
import V2PillarsSection from "./V2PillarsSection";
import V2PartnersSection from "./V2PartnersSection";
import V2WalkthroughSection from "./V2WalkthroughSection";
import V2QuoteBandSection from "./V2QuoteBandSection";
import V2ArchitectureSection from "./V2ArchitectureSection";
import V2CTAFooter from "./V2CTAFooter";

export default function V2Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <V2Navigation />
      <V2HeroSection />
      <V2ProblemSection />
      <V2ComposabilityTaxSection />
      <V2PillarsSection />
      <V2PartnersSection />
      <V2WalkthroughSection />
      <V2QuoteBandSection />
      {/* Andamio API — the builder product, secondary to the Issuer lead */}
      <V2ArchitectureSection />
      <V2CTAFooter />
    </div>
  );
}
