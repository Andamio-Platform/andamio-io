import { Button } from "~/components/ui/button";
import MenuBar from "./MenuBar";
import { LearnerHero } from "./LearnerHero";
import { OrganizationHero } from "./OrganizationHero";
import { FAQ } from "./FAQ";
import { HowAndamioWorks } from "./HowAndamioWorks";
import { WhyAndamio } from "./WhyAndamio";
import { useState } from "react";
import BackgroundVideo from "~/components/media/BackgroundVideo";

export default function SB7PageLanding() {
  const [role, setRole] = useState<"learner" | "organization">("learner");
  return (
    <div className="flex w-full flex-col bg-white">
      <MenuBar />
      <div className="flex w-full flex-col">
        <BackgroundVideo />
        {role === "learner" ? <LearnerHero /> : <OrganizationHero />}
        <div className="z-20 mx-auto flex w-full flex-row items-center gap-5 md:mt-24 md:w-[200px]">
          <Button
            onClick={() => setRole("learner")}
            className={`cursor-pointer border-2 border-solid border-black text-foreground ${role === "learner" ? "bg-secondary" : "bg-white"}`}
          >
            I am a&nbsp;
            <span className="font-beckman font-semibold">LEARNER</span>
          </Button>
          <Button
            onClick={() => setRole("organization")}
            className={`cursor-pointer border-2 border-solid border-black text-foreground ${role === "organization" ? "bg-secondary" : "bg-white"}`}
          >
            I am an&nbsp;
            <span className="font-beckman font-semibold">ORGANIZATION</span>
          </Button>
        </div>
      </div>
      <WhyAndamio />
      <HowAndamioWorks />
      <FAQ />
    </div>
  );
}
