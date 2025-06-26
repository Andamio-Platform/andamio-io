import React from "react";
import MenuBar from "~/ui/landing/MenuBar";
import Image from "next/image";
import {
  CheckBadgeIcon,
  AcademicCapIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

export default function LeadgenDAOPage() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Close fullscreen when pressing the Escape key
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
    <>
      <MenuBar />
      <div className="bg-gray-50 px-4 py-10 md:px-6 lg:px-24">
        {/* Hero Section */}
        <section className="mb-16 text-center">
          <h1 className="text-4xl font-black uppercase text-primary sm:text-5xl md:text-7xl">
            Fan Engagement
          </h1>
          <p className="mx-auto mt-4 max-w-4xl text-lg font-light text-muted-foreground">
            Use Andamio to empower contributors to promote your sports team on
            social media, build fan loyalty, and grow your audience.
          </p>
        </section>

        {/* Cycles Section */}
        <section className="mx-auto grid gap-12 md:grid-cols-3 lg:max-w-7xl">
          {/* Cycle Cards */}
          {fanEngagementCycles.map((cycle, index) => (
            <div
              key={index}
              className="rounded-sm bg-white p-6 shadow-md transition-shadow duration-300 hover:shadow-lg"
            >
              <h2 className="mb-4 flex items-center gap-2 text-3xl font-semibold text-primary">
                <cycle.icon className="h-8 w-8 text-secondary" /> {cycle.title}
              </h2>
              <p className="text-md mb-4 font-light text-muted-foreground">
                {cycle.description}
              </p>
              <ul className="space-y-3">
                {cycle.steps.map((step, stepIdx) => (
                  <li key={stepIdx} className="flex items-start gap-2">
                    <CheckBadgeIcon
                      className="h-6 w-6 flex-shrink-0 text-primary"
                      aria-hidden="true"
                    />
                    <p className="text-sm font-light text-foreground">
                      <span className="font-bold">{step.label}</span>{" "}
                      {step.content}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* Flywheel Section */}
        <section className="my-24 text-center">
          <h3 className="mb-4 text-3xl font-bold text-primary">
            The Fan Engagement Flywheel
          </h3>
          <p className="text-md mx-auto mb-12 max-w-2xl font-light text-muted-foreground">
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
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
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
      </div>
    </>
  );
}

// Cycle data for dynamic rendering
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
          "High-quality content enhances fans’ skills and builds their credibility.",
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
          "Successful promotion builds promoters’ reputation and engagement metrics.",
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
