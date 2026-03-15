import React, { useEffect, useState } from "react";
import Image from "next/image";
import V2PageLayout from "~/ui/landing/V2Landing/V2PageLayout";

import {
  CheckBadgeIcon,
  AcademicCapIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

export default function FanEngagementPage() {
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
      title="Fan Engagement"
      description="Use Andamio to empower contributors to promote your sports team on social media, build fan loyalty, and grow your audience."
    >
      {/* Cycles Section */}
      <section className="mx-auto grid gap-12 md:grid-cols-3">
        {fanEngagementCycles.map((cycle, index) => (
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
          The Fan Engagement Flywheel
        </h3>
        <p className="mx-auto mb-12 max-w-2xl text-muted-foreground">
          Each cycle builds loyalty, grows your fanbase, and rewards engaged
          contributors, creating a powerful feedback loop in fan engagement.
        </p>
        <div className="flex w-full items-center justify-center">
          <Image
            src="/fan-engagement-flywheel.svg"
            alt="fan engagement flywheel"
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
            src="/fan-engagement-flywheel.svg"
            alt="Fan engagement flywheel"
            width={1000}
            height={1000}
            className="max-h-full max-w-full bg-white"
          />
        </div>
      )}
    </V2PageLayout>
  );
}

const fanEngagementCycles = [
  {
    title: "Cycle One",
    icon: AcademicCapIcon,
    description:
      "Engage fans to create unique content for social media, promoting your team and increasing visibility.",
    steps: [
      {
        label: "Action:",
        content: "Fans learn content creation skills and gain certification.",
      },
      {
        label: "Reward:",
        content:
          "Content creators receive rewards for unique social media posts promoting the team.",
      },
      {
        label: "Outcome:",
        content:
          "High-quality content enhances fans' skills and builds their credibility.",
      },
    ],
  },
  {
    title: "Cycle Two",
    icon: CheckBadgeIcon,
    description:
      "Train fans to become social media promoters, driving engagement and visibility across platforms.",
    steps: [
      {
        label: "Action:",
        content:
          "Certified promoters share team content and enhance engagement.",
      },
      {
        label: "Reward:",
        content: "Promoters receive rewards for driving positive engagement.",
      },
      {
        label: "Outcome:",
        content:
          "Successful promotion builds promoters' reputation and engagement metrics.",
      },
    ],
  },
  {
    title: "Cycle Three",
    icon: UserGroupIcon,
    description:
      "Enable experienced promoters to become social media managers, representing your team on a national level.",
    steps: [
      {
        label: "Action:",
        content:
          "Promoters advance to social media managers, overseeing team representation.",
      },
      {
        label: "Reward:",
        content:
          "Managers earn compensation for their role, increasing engagement and loyalty.",
      },
      {
        label: "Outcome:",
        content:
          "Active involvement in social media management solidifies their reputation.",
      },
    ],
  },
];
