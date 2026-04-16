"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Wrench } from "lucide-react";
import { EXTERNAL_LINKS } from "~/lib/external-links";
import { staggerContainer, slideInRight } from "./motion-variants";

const containerVariants = staggerContainer();
const itemVariants = slideInRight;

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
    <section className="border-t border-border/60 bg-surface-subtle py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-16 lg:grid-cols-2 lg:gap-24">
          <div>
            <h2 className="text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              V2 is live. We&rsquo;re still building.
            </h2>
            <p className="mt-6 max-w-md text-lg text-muted-foreground">
              Full transparency. Here&rsquo;s exactly where things stand.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={EXTERNAL_LINKS.docs}
                className="inline-flex items-center rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Read the Docs
              </a>
              <a
                href={EXTERNAL_LINKS.app}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-md border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
              >
                Join the Pioneer Program
              </a>
              <a
                href={EXTERNAL_LINKS.discord}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-md border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
              >
                Discord
              </a>
            </div>
          </div>

          <motion.ul
            className="space-y-5"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {statusItems.map((item) => (
              <motion.li
                key={item.title}
                className="flex items-start gap-4 border-b border-border/60 pb-5 last:border-b-0"
                variants={itemVariants}
              >
                {item.completed ? (
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" />
                ) : (
                  <Wrench className="mt-0.5 h-5 w-5 shrink-0 text-warning" />
                )}
                <div>
                  <p className="font-display text-base font-semibold text-foreground">
                    {item.title}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
