"use client";

import React from "react";
import { motion } from "motion/react";
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

const primaryBtn =
  "inline-flex items-center gap-2 rounded-sm border border-[oklch(0.55_0.19_38)] bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-[0_2px_0_oklch(0.45_0.17_38)] transition-[background,transform,box-shadow] duration-150 hover:bg-primary/90 active:translate-y-[2px] active:shadow-[0_0_0_oklch(0.45_0.17_38)]";

const outlineBtn =
  "inline-flex items-center gap-2 rounded-sm border border-foreground bg-background px-5 py-2.5 text-sm font-medium text-foreground shadow-[0_2px_0_var(--foreground)] transition-[background,color,transform,box-shadow] duration-150 hover:bg-foreground hover:text-background active:translate-y-[2px] active:shadow-[0_0_0_var(--foreground)]";

export default function V2StatusSection() {
  return (
    <section className="border-t border-border/60 bg-surface-subtle py-24 sm:py-32">
      <div className="mx-auto max-w-none px-5 sm:px-8 lg:px-14 2xl:px-20">
        <div className="flex items-baseline justify-between gap-6">
          <span className="inline-flex items-center gap-3 font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-primary">
            <span className="h-px w-8 bg-current opacity-70" aria-hidden />
            What’s live · what’s next
          </span>
          <span className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground opacity-80">
            Build log
          </span>
        </div>

        <div className="mt-10 grid items-start gap-16 lg:grid-cols-2 lg:gap-24">
          <div>
            <h2 className="font-display text-3xl font-semibold leading-[1.05] tracking-[-0.035em] text-foreground sm:text-4xl lg:text-5xl">
              Live on mainnet. Audited. In production.
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed tracking-[-0.005em] text-muted-foreground">
              Full transparency on what’s ready today and what’s next. Buy
              with eyes open.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="mailto:hello@andamio.io?subject=Enterprise%20demo%20request"
                className={primaryBtn}
              >
                Talk to our team
              </a>
              <a href={EXTERNAL_LINKS.docs} className={outlineBtn}>
                Read the docs
              </a>
            </div>
          </div>

          <motion.ul
            className="flex flex-col"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {statusItems.map((item) => (
              <motion.li
                key={item.title}
                className="grid grid-cols-[28px_1fr_auto] items-baseline gap-5 border-t border-border py-6 first:border-t-0 first:pt-0"
                variants={itemVariants}
              >
                <span
                  className={`inline-block h-2 w-2 translate-y-[6px] ${
                    item.completed ? "bg-success" : "bg-warning"
                  }`}
                  aria-hidden
                />
                <div>
                  <p className="font-display text-base font-semibold tracking-[-0.01em] text-foreground">
                    {item.title}
                  </p>
                  <p className="mt-1 text-[14px] leading-relaxed tracking-[-0.005em] text-muted-foreground">
                    {item.description}
                  </p>
                </div>
                <span
                  className={`font-mono text-[10px] font-medium uppercase tracking-[0.18em] ${
                    item.completed ? "text-success" : "text-warning"
                  }`}
                >
                  {item.completed ? "Live" : "In dev"}
                </span>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
