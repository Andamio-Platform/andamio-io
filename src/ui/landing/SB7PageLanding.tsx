import { Button } from "~/components/ui/button";
import MenuBar from "./MenuBar";
import { LearnerHero } from "./LearnerHero";
import { OrganizationHero } from "./OrganizationHero";
import { FAQ } from "./FAQ";
import { HowAndamioWorks } from "./HowAndamioWorks";
import { WhyAndamio } from "./WhyAndamio";

export default function SB7PageLanding() {
  return (
    <div className="flex w-full flex-col bg-white">
      <MenuBar />

      {/* Hero Section for Learners */}
      <div className="bg-gradient-to-r from-blue-100 via-blue-200 to-blue-100 py-20">
        <LearnerHero />
      </div>

      {/* Why Andamio Section */}
      <div className="bg-white py-20">
        <WhyAndamio />
      </div>

      {/* Hero Section for Organizations */}
      <div className="bg-gradient-to-r from-yellow-100 via-yellow-200 to-yellow-100 py-20">
        <OrganizationHero />
      </div>

      {/* How Andamio Works */}
      <div className="bg-gray-50 py-20">
        <HowAndamioWorks />
      </div>

      {/* FAQ Section */}
      <div className="bg-gray-100 py-20">
        <FAQ />
      </div>
    </div>
  );
}
