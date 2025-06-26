import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Card } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import ModernPageLayout from "~/components/layouts/ModernPageLayout";
import {
  AcademicCapIcon,
  CheckBadgeIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";

export default function LearnMoreTechnology() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Close fullscreen on Escape
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
    <ModernPageLayout
      title="Our Technology"
      description="Discover how Andamio's innovative tools are shaping the future of decentralized work."
      currentPage="about"
    >
      <div className="pb-20">
        {/* Hero CTA */}
        <div className="mb-16 text-left">
          <Link href="https://app.andamio.io">
            <Button className="text-md rounded-sm bg-blue-600 px-8 py-3 font-semibold text-white shadow-lg shadow-blue-500/25 hover:bg-blue-700">
              Open Andamio App
            </Button>
          </Link>
        </div>

        {/* PBL Framework Section */}
        <SectionWithCards
          title="Andamio's Learning Framework"
          cards={[
            {
              icon: <AcademicCapIcon className="h-8 w-8 text-blue-400" />,
              header: "Hands-On Learning",
              content: "Gain practical experience with real-world projects.",
            },
            {
              icon: <CheckBadgeIcon className="h-8 w-8 text-green-400" />,
              header: "Skill-Based Approach",
              content: "Acquire targeted skills for effective contribution.",
            },
            {
              icon: <ShieldCheckIcon className="h-8 w-8 text-purple-400" />,
              header: "Verified Credentials",
              content: "Take your skills with you everywhere.",
            },
          ]}
        />

        {/* Smart Contracts Section */}
        <section className="mb-16 flex flex-col items-center gap-12 rounded-sm border border-white/20 bg-gray-800/50 p-8 backdrop-blur-sm lg:flex-row">
          <div className="lg:w-1/2">
            <h2 className="mb-4 text-3xl font-bold text-white">
              The Andamio Smart Contracts
            </h2>
            <p className="mb-8 text-lg text-gray-300">
              Andamio's blockchain-based smart contracts deliver secure,
              automated, and transparent solutions for organizations.
            </p>
            <ul className="space-y-4">
              <ListItem
                icon={<ShieldCheckIcon className="h-8 w-8 text-blue-400" />}
                title="Verified Credentials"
                description="Contributors validate skills and earn certifications."
              />
              <ListItem
                icon={<UserGroupIcon className="h-8 w-8 text-green-400" />}
                title="Automatic Onboarding"
                description="Seamlessly onboard talent using validated credentials."
              />
              <ListItem
                icon={<EyeIcon className="h-8 w-8 text-purple-400" />}
                title="Decentralized Decision-Making"
                description="Empower contributors to shape your organization's growth."
              />
            </ul>
          </div>
          <div className="flex justify-center lg:w-1/2">
            <Image
              src="/andamio-smart-contracts.png"
              alt="Smart Contract Flow"
              className="w-full max-w-lg cursor-pointer transition-transform duration-300 hover:scale-105 sm:max-w-xl md:max-w-2xl"
              onClick={() => setIsFullscreen(true)}
              width={1200}
              height={1200}
            />
          </div>
        </section>

        {/* Fullscreen Image Overlay */}
        {isFullscreen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 backdrop-blur-sm"
            onClick={() => setIsFullscreen(false)}
          >
            <Image
              src="/andamio-smart-contracts.png"
              alt="Smart Contract Flow"
              className="max-w-screen max-h-screen"
              width={1800}
              height={1800}
            />
            <button
              className="absolute right-4 top-4 rounded-sm border border-white/30 bg-gray-800/50 px-4 py-2 text-white backdrop-blur-sm transition-colors hover:bg-gray-700/50"
              onClick={() => setIsFullscreen(false)}
            >
              Close
            </button>
          </div>
        )}

        {/* Interface Section */}
        <SectionWithCards
          title="The Andamio Interface"
          cards={[
            {
              icon: <EyeIcon className="h-8 w-8 text-blue-400" />,
              header: "User-Friendly Design",
              content: "Intuitive tools for seamless project management.",
            },
            {
              icon: <ShieldCheckIcon className="h-8 w-8 text-green-400" />,
              header: "Secure Transactions",
              content: "Manage your resources with peace of mind.",
            },
            {
              icon: <AcademicCapIcon className="h-8 w-8 text-purple-400" />,
              header: "Streamlined Collaboration",
              content: "Empower contributors to work more effectively.",
            },
          ]}
        />

        {/* Footer CTA */}
        <section className="mt-16 rounded-sm border border-white/20 bg-gray-800/50 p-8 text-center backdrop-blur-sm">
          <h2 className="mb-4 text-3xl font-bold text-white">
            Start Your Andamio Journey Today
          </h2>
          <Link href="https://app.andamio.io">
            <Button className="text-md rounded-sm bg-blue-600 px-8 py-3 font-semibold text-white shadow-lg shadow-blue-500/25 hover:bg-blue-700">
              Open Andamio App
            </Button>
          </Link>
        </section>
      </div>
    </ModernPageLayout>
  );
}

const SectionWithCards = ({
  title,
  cards,
}: {
  title: string;
  cards: { icon: React.ReactNode; header: string; content: string }[];
}) => (
  <section className="mb-16 space-y-12">
    <h2 className="mb-8 text-left text-3xl font-bold text-white">
      {title}
    </h2>
    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
      {cards.map((card, index) => (
        <Card
          key={index}
          className="group relative overflow-hidden border border-white/20 bg-gray-800/50 p-6 shadow-xl backdrop-blur-sm transition-all duration-300 hover:border-white/40 hover:shadow-2xl"
        >
          <div className="mb-4">{card.icon}</div>
          <h3 className="mb-3 text-xl font-bold text-white transition-colors duration-200 group-hover:text-blue-300">
            {card.header}
          </h3>
          <p className="text-gray-300">{card.content}</p>
        </Card>
      ))}
    </div>
  </section>
);

const ListItem = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <li className="flex items-start gap-4">
    {icon}
    <div>
      <h4 className="text-lg font-semibold text-white">{title}</h4>
      <p className="text-sm text-gray-300">{description}</p>
    </div>
  </li>
);