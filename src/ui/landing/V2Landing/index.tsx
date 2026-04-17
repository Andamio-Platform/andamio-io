import React from "react";
import V2Navigation from "./V2Navigation";
import V2HeroSection from "./V2HeroSection";
import V2ProblemSection from "./V2ProblemSection";
import V2CompositionSection from "./V2CompositionSection";
import V2ArchitectureSection from "./V2ArchitectureSection";
import V2PillarsSection from "./V2PillarsSection";
import V2PartnersSection from "./V2PartnersSection";
import V2ComparisonSection from "./V2ComparisonSection";
import V2FAQSection from "./V2FAQSection";
import V2StatusSection from "./V2StatusSection";
import V2CTAFooter from "./V2CTAFooter";

export default function V2Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <V2Navigation />
      <V2HeroSection />
      <V2ProblemSection />
      <V2CompositionSection />
      <V2ArchitectureSection />
      <V2PillarsSection />
      <V2PartnersSection />
      <V2ComparisonSection />
      <V2FAQSection />
      <V2StatusSection />
      <V2CTAFooter />
    </div>
  );
}
