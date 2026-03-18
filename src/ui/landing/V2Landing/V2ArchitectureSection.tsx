"use client";

import React from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { EXTERNAL_LINKS } from "~/lib/external-links";
import { fadeIn, staggerContainer } from "./motion-variants";

const fadeInVariants = fadeIn();
const cardContainerVariants = staggerContainer(0.12);
const cardVariants = fadeIn();

const layerVariants = (delay: number): Variants => ({
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut", delay },
  },
});

interface IntegrationPath {
  badge: string;
  badgeClass: string;
  title: string;
  description: string;
  linkLabel: string;
  linkHref: string;
  external: boolean;
}

const integrationPaths: IntegrationPath[] = [
  {
    badge: "Developer",
    badgeClass: "bg-primary/10 text-primary",
    title: "Build with the API",
    description: "Add credentials, access control, and courses to your app via REST API.",
    linkLabel: "Getting Started Guide →",
    linkHref: EXTERNAL_LINKS.docsGettingStarted,
    external: false,
  },
  {
    badge: "Advanced",
    badgeClass: "bg-secondary/10 text-secondary",
    title: "Build on the Platform",
    description:
      "Work directly with Andamio smart contracts on Cardano. Full control.",
    linkLabel: "View on GitHub →",
    linkHref: EXTERNAL_LINKS.github,
    external: true,
  },
  {
    badge: "Explore",
    badgeClass: "bg-success/10 text-success",
    title: "See It in Action",
    description: "Explore the Andamio App to see how credentials, courses, and projects work together.",
    linkLabel: "Open the App →",
    linkHref: EXTERNAL_LINKS.app,
    external: true,
  },
];

export default function V2ArchitectureSection() {
  return (
    <section id="platform" className="relative py-16 sm:py-24 overflow-hidden">
      {/* Section divider */}
      <div className="absolute left-1/2 top-0 h-px w-4/5 -translate-x-1/2 bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          className="text-center"
          variants={fadeInVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <p className="mb-6 text-center font-mono text-xs font-medium uppercase tracking-[0.2em] text-primary">
            HOW IT WORKS
          </p>
          <h2 className="mb-4 text-center text-3xl font-bold text-foreground sm:text-4xl">
            Andamio is built on Cardano.
            <br />
            <span className="mt-2 inline-block text-muted-foreground">Your app is built on Andamio.</span>
          </h2>
          <p className="mx-auto mb-16 max-w-2xl text-center text-lg text-muted-foreground">
            Role-based access, credential gating, and contribution tracking — on a layer you don&rsquo;t have to build yourself.
          </p>
        </motion.div>

        {/* Architecture diagram */}
        <div className="mx-auto mb-16 max-w-3xl">
          {/* Top layer — Your Application */}
          <motion.div
            className="rounded-t-xl border border-border bg-card p-6"
            variants={layerVariants(0.6)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              YOUR APP
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              You build this — your frontend, your experience, your users
            </p>
          </motion.div>

          {/* Andamio API */}
          <motion.div
            className="border-x border-border bg-primary/5 p-6"
            variants={layerVariants(0.4)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <p className="text-xs font-bold uppercase tracking-widest text-primary">
              ANDAMIO API
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Credentials &middot; Access Control &middot; Courses &middot; Treasury
            </p>
          </motion.div>

          {/* Andamio Platform */}
          <motion.div
            className="border-x border-border bg-primary/3 p-6"
            variants={layerVariants(0.2)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              ANDAMIO PLATFORM
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Smart contracts, on-chain state, credential registry (audited by TxPipe)
            </p>
          </motion.div>

          {/* Cardano */}
          <motion.div
            className="rounded-b-xl border border-border bg-card p-6"
            variants={layerVariants(0)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              CARDANO BLOCKCHAIN
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Settlement, permanence, interoperability
            </p>
          </motion.div>
        </div>

        {/* Integration path cards */}
        <motion.div
          className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-3"
          variants={cardContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {integrationPaths.map((path) => (
            <motion.div
              key={path.title}
              className="rounded-lg border border-border bg-card p-6"
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
                {...(path.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
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
