import React, { useEffect, useState } from "react";
import Image from "next/image";
import V2PageLayout from "~/ui/landing/V2Landing/V2PageLayout";

import {
  CheckBadgeIcon,
  AcademicCapIcon,
  BriefcaseIcon,
} from "@heroicons/react/24/outline";

export default function DecentralizedInnovationPage() {
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
      title="Decentralized Innovation"
      description="Use Andamio to certify reviewers, build their reputation, and ensure high-quality assessments."
    >
      {/* Cycles Section */}
      <section className="mx-auto grid gap-12 md:grid-cols-3">
        {cycles.map((cycle, index) => (
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
          The Decentralized Innovation Flywheel
        </h3>
        <p className="mx-auto mb-12 max-w-2xl text-muted-foreground">
          The Reviewer journey is a continuous cycle of learning,
          certification, and paid contributions, helping build trusted
          reputations within your community.
        </p>
        <div className="flex w-full items-center justify-center">
          <Image
            src="/pc-flywheel.svg"
            alt="decentralized innovation fund reviewer flywheel"
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
            src="/pc-flywheel.svg"
            alt="decentralized innovation fund reviewer flywheel"
            width={1000}
            height={1000}
            className="max-h-full max-w-full bg-white"
          />
        </div>
      )}
    </V2PageLayout>
  );
}

const cycles = [
  {
    title: "Cycle One",
    icon: AcademicCapIcon,
    description:
      "Invite community members to earn Level 1 certification, training them to assess proposals and provide structured feedback.",
    steps: [
      {
        label: "Action:",
        content:
          "Certified reviewers join funding rounds, providing structured proposal feedback.",
      },
      {
        label: "Reward:",
        content: "Compensation drives accuracy and engagement.",
      },
      {
        label: "Outcome:",
        content:
          "Each review enhances the reviewer's credibility and strengthens funding decisions.",
      },
    ],
  },
  {
    title: "Cycle Two",
    icon: CheckBadgeIcon,
    description:
      "Support experienced reviewers in advancing to Level 2 certification for handling more complex proposal reviews.",
    steps: [
      {
        label: "Action:",
        content:
          "Level 2 reviewers apply advanced criteria in later funding rounds.",
      },
      {
        label: "Reward:",
        content: "Increased compensation encourages continuous improvement.",
      },
      {
        label: "Outcome:",
        content:
          "High-quality reviews from skilled contributors boost trust and improve funding outcomes.",
      },
    ],
  },
  {
    title: "Cycle Three",
    icon: BriefcaseIcon,
    description:
      "Develop a team of milestone reviewers, certified to oversee milestone progress and validate project completion.",
    steps: [
      {
        label: "Action:",
        content:
          "Certified milestone reviewers monitor project stages and validate results.",
      },
      {
        label: "Reward:",
        content: "Financial incentives ensure diligent oversight.",
      },
      {
        label: "Outcome:",
        content:
          "Consistent milestone management strengthens your organization's reputation for accountability.",
      },
    ],
  },
];
