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
            Lead Generation
          </h1>
          <p className="mx-auto mt-4 max-w-4xl text-lg font-light text-muted-foreground">
            Use Andamio to connect with certified lead generators to drive your
            business growth.
          </p>
        </section>

        {/* Cycles Section */}
        <section className="mx-auto grid gap-12 md:grid-cols-3 lg:max-w-7xl">
          {/* Cycle Cards */}
          {leadgenCycles.map((cycle, index) => (
            <div
              key={index}
              className="rounded-lg bg-white p-6 shadow-md transition-shadow duration-300 hover:shadow-lg"
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
            The LeadgenDAO Flywheel
          </h3>
          <p className="text-md mx-auto mb-12 max-w-2xl font-light text-muted-foreground">
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
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
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
      </div>
    </>
  );
}

// Cycle data for dynamic rendering
const leadgenCycles = [
  {
    title: "Cycle One",
    icon: AcademicCapIcon,
    description:
      "Train quality connectors through Andamio’s LeadGen course, certifying them as skilled lead generators to fulfill your company’s lead generation needs.",
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
          "Effective mentorship further establishes mentors’ expertise within LeadGenDAO.",
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
