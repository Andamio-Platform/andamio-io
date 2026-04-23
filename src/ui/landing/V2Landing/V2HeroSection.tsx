"use client";

import React from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { staggerContainer } from "./motion-variants";

const containerVariants = staggerContainer(0.12);

const childVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: "easeOut", delay: 0.25 },
  },
};

interface GraphNode {
  issuer: string;
  credential: string;
  status: "earned" | "unlocked" | "pending";
  note?: string;
}

const graphNodes: GraphNode[] = [
  { issuer: "Node Academy", credential: "Fundamentals of Cloud Ops", status: "earned" },
  {
    issuer: "Horizon Cloud · different issuer",
    credential: "Partner Solution Architect",
    status: "unlocked",
    note: "unlocked by 01 — no integration between issuers",
  },
  { issuer: "Meridian Industry Assoc.", credential: "Certified Channel Pro", status: "pending" },
];

const statusStyle: Record<GraphNode["status"], { label: string; className: string }> = {
  earned: { label: "Earned", className: "text-success" },
  unlocked: { label: "Unlocked", className: "text-primary" },
  pending: { label: "Next", className: "text-muted-foreground" },
};

const heroFoot: Array<{ k: string; v: string }> = [
  { k: "Live on", v: "Cardano mainnet · Feb 2026" },
  { k: "Audited by", v: "TxPipe" },
  { k: "Runs alongside", v: "Credly, Accredible, custom" },
];

const primaryBtn =
  "inline-flex items-center gap-2 rounded-sm bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground " +
  "border border-[oklch(0.55_0.19_38)] shadow-[0_2px_0_oklch(0.45_0.17_38),0_4px_10px_-2px_rgb(0_0_0_/_0.12)] " +
  "transition-[background,transform,box-shadow] duration-150 hover:bg-primary/90 " +
  "active:translate-y-[2px] active:shadow-[0_0_0_oklch(0.45_0.17_38)]";

const outlineBtn =
  "inline-flex items-center gap-2 rounded-sm border border-foreground bg-background px-6 py-3 text-sm font-medium text-foreground " +
  "shadow-[0_2px_0_var(--foreground)] transition-[background,color,transform,box-shadow] duration-150 " +
  "hover:bg-foreground hover:text-background " +
  "active:translate-y-[2px] active:shadow-[0_0_0_var(--foreground)]";

export default function V2HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-background pt-24 pb-16 sm:pt-28">
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:items-center lg:gap-20">
          <motion.div
            className="text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.span
              variants={childVariants}
              className="inline-flex items-center gap-3 font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-primary"
            >
              <span className="h-px w-8 bg-current opacity-70" aria-hidden />
              An open protocol for composable credentials
            </motion.span>

            <motion.h1
              variants={childVariants}
              className="mt-6 font-display text-5xl font-semibold leading-[0.98] tracking-[-0.04em] text-foreground sm:text-6xl md:text-7xl lg:text-[5.5rem]"
            >
              Badges should <span className="text-primary">outlive</span>{" "}
              the platform that issued them.
            </motion.h1>

            <motion.p
              variants={childVariants}
              className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl"
            >
              A badge locked inside a vendor’s database is just a picture. Andamio is the protocol for
              credentials that compose across issuers, survive platform
              changes, and stay yours.
            </motion.p>

            <motion.div
              variants={childVariants}
              className="mt-10 flex flex-wrap gap-3"
            >
              <a
                href="mailto:hello@andamio.io?subject=Enterprise%20walkthrough%20request"
                className={primaryBtn}
              >
                Book a 20-min walkthrough
                <svg
                  aria-hidden
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  className="h-3.5 w-3.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
              <a href="#archetypes" className={outlineBtn}>
                See if it fits your work
              </a>
            </motion.div>

            <motion.dl
              variants={childVariants}
              className="mt-12 grid max-w-xl grid-cols-1 gap-6 border-t border-border pt-6 sm:grid-cols-3"
            >
              {heroFoot.map(({ k, v }) => (
                <div key={k} className="flex flex-col gap-1.5">
                  <dt className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                    {k}
                  </dt>
                  <dd className="text-[13px] font-medium leading-snug tracking-[-0.005em] text-foreground">
                    {v}
                  </dd>
                </div>
              ))}
            </motion.dl>
          </motion.div>

          <motion.aside
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            aria-label="A preview of the credential graph"
            className="relative mx-auto w-full max-w-md lg:max-w-none"
          >
            <div className="relative border-2 border-foreground bg-background shadow-[8px_8px_0_var(--foreground)]">
              <div className="flex items-center justify-between gap-4 bg-foreground px-5 py-3 text-background">
                <span className="font-mono text-[11px] font-medium uppercase tracking-[0.2em]">
                  Credential graph · preview
                </span>
                <span className="font-mono text-[11px] opacity-70">
                  alice.andamio
                </span>
              </div>

              <ol className="px-0 py-2">
                {graphNodes.map((node, index) => {
                  const style = statusStyle[node.status];
                  return (
                    <li
                      key={node.credential}
                      className="grid grid-cols-[36px_1fr_auto] items-center gap-4 border-t border-dashed border-border px-5 py-[18px] first:border-t-0"
                    >
                      <span className="font-mono text-[11px] font-medium tracking-[0.1em] text-muted-foreground">
                        0{index + 1}
                      </span>
                      <div>
                        <p className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                          {node.issuer}
                        </p>
                        <p className="mt-1 font-display text-[15px] font-medium tracking-[-0.01em] text-foreground">
                          {node.credential}
                        </p>
                        {node.note && (
                          <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                            {node.note}
                          </p>
                        )}
                      </div>
                      <span
                        className={`font-mono text-[11px] font-medium uppercase tracking-[0.1em] ${style.className}`}
                      >
                        {style.label}
                      </span>
                    </li>
                  );
                })}
              </ol>

              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-foreground px-5 py-3.5">
                <span className="font-mono text-[11px] font-medium uppercase tracking-[0.15em] text-muted-foreground">
                  <b className="font-semibold text-foreground">
                    Protocol enforces
                  </b>{" "}
                  prerequisites across issuers
                </span>
                <span className="font-mono text-[11px] font-medium uppercase tracking-[0.15em] text-muted-foreground">
                  no data-sharing agreement
                </span>
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
