"use client";

import React from "react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

function CheckCircleIcon() {
  return (
    <svg
      className="mt-0.5 h-5 w-5 shrink-0 text-success"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function WrenchIcon() {
  return (
    <svg
      className="mt-0.5 h-5 w-5 shrink-0 text-warning"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M14.5 10a4.5 4.5 0 004.284-5.882c-.105-.324-.51-.391-.752-.15L15.34 6.66a.454.454 0 01-.493.11 3.01 3.01 0 01-1.618-1.616.455.455 0 01.11-.494l2.694-2.692c.24-.241.174-.647-.15-.752a4.5 4.5 0 00-5.873 4.575c.055.873-.128 1.808-.8 2.368l-7.23 6.024a2.724 2.724 0 103.837 3.837l6.024-7.23c.56-.672 1.495-.855 2.368-.8.096.007.193.01.291.01zM5 16a1 1 0 11-2 0 1 1 0 012 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}

interface StatusItem {
  completed: boolean;
  title: string;
  description: string;
}

const statusItems: StatusItem[] = [
  {
    completed: true,
    title: "V2 Protocol",
    description: "Live on Cardano mainnet (Feb 6, 2026)",
  },
  {
    completed: true,
    title: "V2 Platform",
    description: "12 features, 17 transaction types, audited",
  },
  {
    completed: true,
    title: "API",
    description: "Endpoints documented and functional",
  },
  {
    completed: true,
    title: "Andamioscan",
    description: "Blockchain explorer (live)",
  },
  {
    completed: false,
    title: "SDK V2",
    description: "Developer toolkit update (under development)",
  },
  {
    completed: false,
    title: "Stripe Integration",
    description: "USD payments (in development)",
  },
];

export default function V2StatusSection() {
  return (
    <section className="bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left column — heading */}
          <motion.div
            variants={fadeInVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-primary">
              STATUS
            </p>
            <h2 className="mb-2 text-3xl font-bold text-foreground sm:text-4xl">
              V2 is live.
            </h2>
            <p className="mb-6 text-3xl font-bold text-muted-foreground sm:text-4xl">
              We&rsquo;re still building.
            </p>
            <p className="text-lg text-muted-foreground">
              Full transparency. Here&rsquo;s exactly where things stand.
            </p>
          </motion.div>

          {/* Right column — status list */}
          <motion.div
            className="rounded-xl border border-border bg-card p-6 sm:p-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="space-y-4">
              {statusItems.map((item) => (
                <motion.div
                  key={item.title}
                  className="flex items-start gap-3"
                  variants={itemVariants}
                >
                  {item.completed ? <CheckCircleIcon /> : <WrenchIcon />}
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {item.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
