"use client";

import React from "react";
import { motion } from "framer-motion";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const layerVariants = (delay: number) => ({
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut", delay },
  },
});

const cardContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

interface IntegrationPath {
  badge: string;
  badgeClass: string;
  title: string;
  description: string;
  linkLabel: string;
  linkHref: string;
}

const integrationPaths: IntegrationPath[] = [
  {
    badge: "Turnkey",
    badgeClass: "bg-success/10 text-success",
    title: "Use the Platform",
    description: "app.andamio.io — ready to go. No code required.",
    linkLabel: "Launch App →",
    linkHref: "https://app.andamio.io",
  },
  {
    badge: "Developer",
    badgeClass: "bg-primary/10 text-primary",
    title: "Integrate the API",
    description: "REST API — add credentials to your existing app.",
    linkLabel: "Read the Docs →",
    linkHref: "https://docs.andamio.io",
  },
  {
    badge: "Advanced",
    badgeClass: "bg-secondary/10 text-secondary",
    title: "Build on Protocol",
    description:
      "Smart contracts on Cardano — full control, maximum flexibility.",
    linkLabel: "View on GitHub →",
    linkHref: "https://github.com/andamioio",
  },
];

export default function V2ArchitectureSection() {
  return (
    <section id="platform" className="relative bg-muted/30 py-16 sm:py-24 overflow-hidden">
      {/* Subtle grid texture */}
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          className="text-center"
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <p className="mb-4 text-center text-xs font-semibold uppercase tracking-widest text-primary">
            HOW IT WORKS
          </p>
          <h2 className="mb-16 text-center text-3xl font-bold text-foreground sm:text-4xl">
            Three layers. One protocol.
          </h2>
        </motion.div>

        {/* Architecture diagram */}
        <div className="mx-auto mb-16 max-w-3xl">
          {/* Top layer — Your Application */}
          <motion.div
            className="rounded-t-xl border border-border bg-card p-6"
            variants={layerVariants(0.4)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              YOUR APPLICATION
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Platform, custom app, or partner integration
            </p>
          </motion.div>

          {/* Middle layer — Andamio API */}
          <motion.div
            className="border-x border-border bg-primary/5 p-6"
            variants={layerVariants(0.2)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <p className="text-xs font-bold uppercase tracking-widest text-primary">
              ANDAMIO API
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Credentials · Identity · Treasury · Courses
            </p>
          </motion.div>

          {/* Bottom layer — Andamio Protocol */}
          <motion.div
            className="rounded-b-xl border border-border bg-card p-6"
            variants={layerVariants(0)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              ANDAMIO PROTOCOL
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Smart contracts on Cardano (audited by TxPipe)
            </p>
          </motion.div>
        </div>

        {/* Integration path cards */}
        <motion.div
          className="grid grid-cols-1 gap-6 md:grid-cols-3"
          variants={cardContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {integrationPaths.map((path) => (
            <motion.div
              key={path.title}
              className="rounded-xl border border-border bg-card p-6"
              variants={cardVariants}
            >
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {path.badge}
              </p>
              <h3 className="mb-2 text-lg font-bold text-foreground">
                {path.title}
              </h3>
              <p className="mb-3 text-sm text-muted-foreground">
                {path.description}
              </p>
              <a
                href={path.linkHref}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-primary hover:underline"
              >
                {path.linkLabel}
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
