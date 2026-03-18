"use client";

import React from "react";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "./motion-variants";

const containerVariants = staggerContainer(0.15);
const cardVariants = fadeIn(30);

function ClipboardIcon() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-primary"
    >
      <rect x="10" y="8" width="20" height="26" rx="2" />
      <path d="M15 4h10a1 1 0 0 1 1 1v3H14V5a1 1 0 0 1 1-1z" />
      <line x1="15" y1="17" x2="25" y2="17" />
      <line x1="15" y1="22" x2="25" y2="22" />
      <line x1="15" y1="27" x2="20" y2="27" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-primary"
    >
      <circle cx="17" cy="17" r="10" />
      <line x1="24" y1="24" x2="34" y2="34" />
      <polyline points="13 20 17 15 21 18" />
    </svg>
  );
}

function DiamondIcon() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-primary"
    >
      <polygon points="20 4 34 16 20 36 6 16" />
      <line x1="6" y1="16" x2="34" y2="16" />
      <polyline points="14 4 20 16 26 4" />
    </svg>
  );
}

interface PillarCard {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const pillars: PillarCard[] = [
  {
    icon: <ClipboardIcon />,
    title: "Issue",
    description:
      "Define credentials that mean something in your context. Anyone can issue. Recipients carry them across every app on the protocol.",
  },
  {
    icon: <ChartIcon />,
    title: "Verify",
    description:
      "Check any credential, from any issuer, in real time. On-chain records mean no phone calls, no PDFs, no trust required.",
  },
  {
    icon: <DiamondIcon />,
    title: "Gate",
    description:
      "Use credentials to unlock content, roles, or rewards. Build learning paths, contributor programs, or access tiers — all anchored on proof.",
  },
];

export default function V2PillarsSection() {
  return (
    <section className="bg-background py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center">
          <p className="mb-6 text-center font-mono text-xs font-medium uppercase tracking-[0.2em] text-primary">
            WHAT YOU CAN DO
          </p>
          <h2 className="mb-16 text-center text-3xl font-bold text-foreground sm:text-4xl">
            Your app. Shared credentials.{" "}
            <span className="text-muted-foreground">Users own the proof.</span>
          </h2>
        </div>

        {/* Pillar cards */}
        <motion.div
          className="grid grid-cols-1 gap-8 md:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {pillars.map((pillar) => (
            <motion.div
              key={pillar.title}
              className="group rounded-lg border border-border bg-card p-8 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl"
              variants={cardVariants}
            >
              {pillar.icon}
              <h3 className="mb-3 mt-4 text-xl font-bold text-foreground">
                {pillar.title}
              </h3>
              <p className="leading-relaxed text-muted-foreground">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
