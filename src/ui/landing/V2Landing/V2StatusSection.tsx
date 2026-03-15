"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Wrench } from "lucide-react";
import { fadeIn, staggerContainer, slideInRight } from "./motion-variants";

const containerVariants = staggerContainer();
const itemVariants = slideInRight;
const fadeInVariants = fadeIn();

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
    title: "V2 App",
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
            <h2 className="mb-6 text-3xl font-bold leading-tight text-foreground sm:text-4xl">
              V2 is live.{" "}
              <span className="text-muted-foreground">Still building.</span>
            </h2>
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
                  {item.completed ? (
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" />
                  ) : (
                    <Wrench className="mt-0.5 h-5 w-5 shrink-0 text-warning" />
                  )}
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
