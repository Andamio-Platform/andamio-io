import React, { useEffect, useState } from "react";
import MenuBar from "~/ui/landing/MenuBar";
import Image from "next/image";
import Footer from "~/ui/landing/Footer";
import { Card, CardIcon, CardHeader, CardContent } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import Link from "next/link";
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
    <>
      <VideoBackground>
        <MenuBar />
        <div className="px-6 py-16 lg:px-24">
          {/* Hero Section */}
          <section className="mb-16 text-center">
            <h1 className="text-5xl font-black uppercase text-primary sm:text-6xl md:text-7xl">
              Learn More About Our Technology
            </h1>
            <p className="mx-auto mt-4 max-w-4xl text-lg font-light text-muted-foreground">
              Discover how Andamio’s innovative tools are shaping the future of
              decentralized work.
            </p>
            <Link href="https://app.andamio.io">
              <Button className="text-md mt-6 rounded bg-primary px-8 py-3 font-semibold uppercase text-white hover:bg-opacity-90">
                Open Andamio App
              </Button>
            </Link>
          </section>

          {/* PBL Framework Section */}
          <SectionWithCards
            title="Andamio’s Learning Framework"
            cards={[
              {
                icon: <AcademicCapIcon className="h-8 w-8 text-secondary" />,
                header: "Hands-On Learning",
                content: "Gain practical experience with real-world projects.",
              },
              {
                icon: <CheckBadgeIcon className="h-8 w-8 text-secondary" />,
                header: "Skill-Based Approach",
                content: "Acquire targeted skills for effective contribution.",
              },
              {
                icon: <ShieldCheckIcon className="h-8 w-8 text-secondary" />,
                header: "Verified Credentials",
                content: "Take your skills with you everywhere.",
              },
            ]}
          />

          {/* Smart Contracts Section */}
          <section className="mx-auto mb-16 flex max-w-7xl flex-col items-center gap-12 rounded-md bg-gray-50 p-8 lg:flex-row">
            <div className="lg:w-1/2">
              <h2 className="mb-4 text-3xl font-bold uppercase text-primary">
                The Andamio Smart Contracts
              </h2>
              <p className="mb-8 text-lg font-light text-muted-foreground">
                Andamio’s blockchain-based smart contracts deliver secure,
                automated, and transparent solutions for organizations.
              </p>
              <ul className="space-y-4">
                <ListItem
                  icon={<ShieldCheckIcon className="h-8 w-8 text-secondary" />}
                  title="Verified Credentials"
                  description="Contributors validate skills and earn certifications."
                />
                <ListItem
                  icon={<UserGroupIcon className="h-8 w-8 text-secondary" />}
                  title="Automatic Onboarding"
                  description="Seamlessly onboard talent using validated credentials."
                />
                <ListItem
                  icon={<EyeIcon className="h-8 w-8 text-secondary" />}
                  title="Decentralized Decision-Making"
                  description="Empower contributors to shape your organization’s growth."
                />
              </ul>
            </div>
            <div className="flex justify-center lg:w-1/2">
              <Image
                src="/andamio-smart-contracts.png"
                alt="Smart Contract Flow"
                className="w-full max-w-lg cursor-pointer sm:max-w-xl md:max-w-2xl"
                onClick={() => setIsFullscreen(true)}
                width={1200}
                height={1200}
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
                src="/andamio-smart-contracts.png"
                alt="Smart Contract Flow"
                className="max-w-screen max-h-screen"
                width={1800}
                height={1800}
              />
              <button
                className="absolute right-4 top-4 text-white"
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
                icon: <EyeIcon className="h-8 w-8 text-secondary" />,
                header: "User-Friendly Design",
                content: "Intuitive tools for seamless project management.",
              },
              {
                icon: <ShieldCheckIcon className="h-8 w-8 text-secondary" />,
                header: "Secure Transactions",
                content: "Manage your resources with peace of mind.",
              },
              {
                icon: <AcademicCapIcon className="h-8 w-8 text-secondary" />,
                header: "Streamlined Collaboration",
                content: "Empower contributors to work more effectively.",
              },
            ]}
          />

          {/* Footer CTA */}
          <section className="mx-auto mt-12 max-w-7xl text-center">
            <h2 className="mb-4 text-3xl font-bold uppercase text-primary">
              Start Your Andamio Journey Today
            </h2>
            <Link href="https://app.andamio.io">
              <Button className="text-md rounded bg-primary px-8 py-3 font-semibold uppercase text-white hover:bg-opacity-90">
                Open Andamio App
              </Button>
            </Link>
          </section>
        </div>
        <Footer />
      </VideoBackground>
    </>
  );
}

const VideoBackground = ({ children }: { children: React.ReactNode }) => (
  <div className="relative min-h-screen">
    <div className="fixed left-0 top-0 h-full w-full overflow-hidden opacity-70">
      <video
        className="min-h-screen min-w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/video/bg-video-002.webm" type="video/webm" />
        Your browser does not support the video tag.
      </video>
    </div>
    <div className="relative z-10">{children}</div>
  </div>
);

const SectionWithCards = ({
  title,
  cards,
}: {
  title: string;
  cards: { icon: React.ReactNode; header: string; content: string }[];
}) => (
  <section className="mx-auto mb-16 max-w-7xl space-y-12 rounded-md p-8">
    <h2 className="mb-8 text-center text-3xl font-bold uppercase text-primary">
      {title}
    </h2>
    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
      {cards.map((card, index) => (
        <Card
          key={index}
          className="flex flex-col items-start p-6 shadow-md transition-transform hover:scale-105 hover:shadow-lg"
        >
          <CardIcon>{card.icon}</CardIcon>
          <CardHeader className="mt-4 text-xl font-bold text-primary">
            {card.header}
          </CardHeader>
          <CardContent>
            <p className="text-sm font-light text-foreground">{card.content}</p>
          </CardContent>
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
      <h4 className="text-lg font-semibold text-primary">{title}</h4>
      <p className="text-sm text-foreground">{description}</p>
    </div>
  </li>
);
