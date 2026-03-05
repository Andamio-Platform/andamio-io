import React, { useEffect, useState } from "react";
import Image from "next/image";
import V2PageLayout from "~/ui/landing/V2Landing/V2PageLayout";

import {
  CheckBadgeIcon,
  AcademicCapIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

export default function LeadGeneratorPage() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isFullscreen]);

  return (
    <V2PageLayout
      title="Lead Generation"
      description="Use Andamio to connect with certified lead generators to drive your business growth."
    >
      {/* Cycles Section */}
      <section className="mx-auto grid gap-12 md:grid-cols-3">
        {leadgenCycles.map((cycle, index) => (
          <div
            key={index}
            className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow duration-300 hover:shadow-lg"
          >
            <h2 className="mb-4 flex items-center gap-2 text-2xl font-semibold text-foreground">
              <cycle.icon className="h-7 w-7 text-primary" /> {cycle.title}
            </h2>
            <p className="mb-4 text-sm text-muted-foreground">
              {cycle.description}
            </p>
            <ul className="space-y-3">
              {cycle.steps.map((step, stepIdx) => (
                <li key={stepIdx} className="flex items-start gap-2">
                  <CheckBadgeIcon
                    className="h-5 w-5 flex-shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  <p className="text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">{step.label}</span>{" "}
                    {step.content}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* Flywheel Section */}
      <section className="my-16 text-center sm:my-24">
        <h3 className="mb-4 text-2xl font-bold text-foreground sm:text-3xl">
          The LeadgenDAO Flywheel
        </h3>
        <p className="mx-auto mb-12 max-w-2xl text-muted-foreground">
          Through each cycle, LeadgenDAO members continue learning, earning,
          and advancing within the DAO, building a network of trusted lead
          generation professionals.
        </p>
        <div className="flex w-full items-center justify-center">
          <Image
            src="/leadgen-flywheel.svg"
            alt="leadgen flywheel"
            width={800}
            height={800}
            className="w-3/4 max-w-xs cursor-pointer sm:max-w-md md:max-w-lg lg:max-w-xl"
            onClick={() => setIsFullscreen(true)}
          />
        </div>
      </section>

      {/* Fullscreen Image Overlay */}
      {isFullscreen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75"
          onClick={() => setIsFullscreen(false)}
        >
          <Image
            src="/leadgen-flywheel.svg"
            alt="leadgen DAO flywheel"
            width={1000}
            height={1000}
            className="max-h-full max-w-full bg-white"
          />
        </div>
      )}
    </V2PageLayout>
  );
}

const leadgenCycles = [
  {
    title: "Cycle One",
    icon: AcademicCapIcon,
    description:
      "Train quality connectors through Andamio's LeadGen course, certifying them as skilled lead generators to fulfill your company's lead generation needs.",
    steps: [
      {
        label: "Action:",
        content:
          "Certified connectors review lead gen needs and commit to providing leads for your business.",
      },
      {
        label: "Reward:",
        content:
          "Connectors receive compensation upon successfully delivering quality leads.",
      },
      {
        label: "Outcome:",
        content:
          "Each lead delivered enhances their expertise and builds their reputation.",
      },
    ],
  },
  {
    title: "Cycle Two",
    icon: CheckBadgeIcon,
    description:
      "Develop expert lead generators by advancing them to mentorship roles, sharing their skills with new contributors.",
    steps: [
      {
        label: "Action:",
        content:
          "Expert lead gens earn mentor certification to train and support new lead generators.",
      },
      {
        label: "Reward:",
        content:
          "Mentors receive compensation for their guidance and support, building loyalty.",
      },
      {
        label: "Outcome:",
        content:
          "Effective mentorship further establishes mentors' expertise within LeadGenDAO.",
      },
    ],
  },
  {
    title: "Cycle Three",
    icon: UserGroupIcon,
    description:
      "Support expert mentors in becoming active DAO members, gaining access to benefits and participating in governance.",
    steps: [
      {
        label: "Action:",
        content:
          "Mentors join the DAO, participating in governance and decision-making.",
      },
      {
        label: "Reward:",
        content:
          "DAO members access exclusive benefits, enhancing their engagement and loyalty.",
      },
      {
        label: "Outcome:",
        content:
          "Growing influence within LeadGenDAO elevates their professional reputation.",
      },
    ],
  },
];
