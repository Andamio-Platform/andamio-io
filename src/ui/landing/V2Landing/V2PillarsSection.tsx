"use client";

import React from "react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

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
    title: "Define & Issue",
    description:
      "You define the credentials. You decide who earns them. Your recipients own them forever — portable across every platform on the protocol.",
  },
  {
    icon: <ChartIcon />,
    title: "Track & Verify",
    description:
      "Every credential, every milestone — recorded permanently on-chain. No more lost certificates, no disputed records, no platform lock-in.",
  },
  {
    icon: <DiamondIcon />,
    title: "Reward",
    description:
      "Release funds when milestones are completed. Transparent treasury management with built-in accountability. No platform can revoke what your people earned.",
  },
];

export default function V2PillarsSection() {
  return (
    <section className="bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center">
          <p className="mb-4 text-center text-xs font-semibold uppercase tracking-widest text-primary">
            HOW IT WORKS
          </p>
          <h2 className="mb-16 text-center text-3xl font-bold text-foreground sm:text-4xl">
            Your credentials. Your standards.{" "}
            <span className="text-muted-foreground">Your people own the proof.</span>
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
              className="group rounded-xl border border-border bg-card p-8 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl"
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
