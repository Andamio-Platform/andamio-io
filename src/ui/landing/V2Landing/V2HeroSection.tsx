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
}

const graphNodes: GraphNode[] = [
  { issuer: "Node Academy", credential: "Fundamentals of Cloud Ops", status: "earned" },
  { issuer: "Horizon Cloud", credential: "Partner Solution Architect", status: "unlocked" },
  { issuer: "Meridian Industry Assoc.", credential: "Certified Channel Pro", status: "pending" },
];

const statusStyle: Record<GraphNode["status"], { label: string; className: string }> = {
  earned: { label: "Earned", className: "text-success" },
  unlocked: { label: "Just unlocked", className: "text-primary" },
  pending: { label: "Next", className: "text-muted-foreground" },
};

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
            <motion.p
              variants={childVariants}
              className="text-xs font-semibold uppercase tracking-[0.22em] text-primary"
            >
              A new category of credential
            </motion.p>

            <motion.h1
              variants={childVariants}
              className="mt-6 font-display text-5xl font-extrabold leading-[0.98] tracking-[-0.03em] text-foreground sm:text-6xl md:text-7xl lg:text-[6.25rem]"
            >
              Composable
              <br />
              <span className="text-primary">Credentials.</span>
            </motion.h1>

            <motion.p
              variants={childVariants}
              className="mt-8 max-w-xl text-lg text-muted-foreground sm:text-xl"
            >
              The end of dead-end credentials. Andamio is building the
              infrastructure for credentials that compose — across issuers,
              programs, and time.
            </motion.p>

            <motion.p
              variants={childVariants}
              className="mt-4 max-w-xl text-lg font-medium text-foreground sm:text-xl"
            >
              Your credentials. Your credential graph.
            </motion.p>

            <motion.div
              variants={childVariants}
              className="mt-10 flex flex-wrap gap-3"
            >
              <a
                href="mailto:hello@andamio.io?subject=Enterprise%20walkthrough%20request"
                className="inline-flex items-center rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Book a 20-minute walkthrough
              </a>
              <a
                href="#manifesto"
                className="inline-flex items-center rounded-md border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
              >
                Read the manifesto
              </a>
            </motion.div>

            <motion.p
              variants={childVariants}
              className="mt-8 max-w-xl text-sm text-muted-foreground/90"
            >
              Runs alongside Credly, Accredible, and custom systems. No migration on day one.
            </motion.p>
          </motion.div>

          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="relative mx-auto w-full max-w-md lg:max-w-none"
          >
            <div className="absolute -inset-2 rounded-2xl bg-gradient-to-br from-primary/25 via-primary/10 to-transparent opacity-60 blur-2xl" />
            <div className="relative overflow-hidden rounded-xl border border-border bg-card shadow-xl">
              <div className="flex items-center justify-between border-b border-border bg-surface-subtle px-5 py-3">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Credential graph
                </span>
                <span className="font-mono text-[10px] text-muted-foreground">
                  alice.andamio
                </span>
              </div>

              <ol className="divide-y divide-border">
                {graphNodes.map((node, index) => {
                  const style = statusStyle[node.status];
                  return (
                    <li key={node.credential} className="relative px-5 py-5 sm:px-6">
                      <div className="flex items-start gap-4">
                        <div className="flex flex-col items-center">
                          <span className="font-mono text-xs text-muted-foreground">
                            0{index + 1}
                          </span>
                          {index < graphNodes.length - 1 && (
                            <span className="mt-2 h-10 w-px bg-border" aria-hidden />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                            {node.issuer}
                          </p>
                          <p className="mt-1 font-display text-base font-semibold text-foreground">
                            {node.credential}
                          </p>
                          <p className={`mt-1 text-sm font-medium ${style.className}`}>
                            {style.label}
                            {node.status === "unlocked" && (
                              <span className="ml-2 text-muted-foreground">
                                by Credential 01 — no integration between issuers
                              </span>
                            )}
                          </p>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ol>

              <div className="border-t border-border bg-surface-subtle px-5 py-3">
                <p className="text-xs text-muted-foreground">
                  Each credential verifies independently. Prerequisites enforced by the protocol.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
