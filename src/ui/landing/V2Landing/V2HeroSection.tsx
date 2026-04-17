"use client";

import React from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
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
              className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground"
            >
              For organizations that issue credentials
            </motion.p>

            <motion.h1
              variants={childVariants}
              className="mt-6 font-display text-4xl font-extrabold leading-[1.05] tracking-[-0.02em] text-foreground sm:text-5xl lg:text-6xl xl:text-[4.5rem]"
            >
              Verifiable credentials your customers can check{" "}
              <span className="text-primary">without calling you.</span>
            </motion.h1>

            <motion.p
              variants={childVariants}
              className="mt-8 max-w-xl text-lg text-muted-foreground sm:text-xl"
            >
              Credential programs today are dead ends — issued once, owned by
              the platform, forgotten. Andamio makes every credential
              independently verifiable, portable, and programmable, on
              infrastructure you already trust.
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
                href="#composability"
                className="inline-flex items-center rounded-md border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
              >
                See how it works
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
                  Verify credential
                </span>
                <span className="font-mono text-[10px] text-muted-foreground">
                  api.andamio.io
                </span>
              </div>

              <div className="p-6 sm:p-7">
                <p className="font-mono text-xs text-muted-foreground">
                  andamio:v2:cred:
                </p>
                <p className="font-mono text-xs text-foreground/80 break-all">
                  8f2e4a17c9d6b3a8e45f1c2d9b7e0a63
                </p>

                <div className="mt-6 flex items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-success/15">
                    <CheckCircle2 className="h-6 w-6 text-success" />
                  </div>
                  <div>
                    <p className="font-display text-xl font-semibold text-foreground">
                      Valid
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Verified on-chain — no issuer lookup
                    </p>
                  </div>
                </div>

                <dl className="mt-6 space-y-3 border-t border-border pt-6 text-sm">
                  <div className="flex items-baseline justify-between gap-4">
                    <dt className="text-muted-foreground">Program</dt>
                    <dd className="text-right font-medium text-foreground">
                      Partner Solution Architect
                    </dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4">
                    <dt className="text-muted-foreground">Issuer</dt>
                    <dd className="text-right font-medium text-foreground">
                      Horizon Cloud
                    </dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4">
                    <dt className="text-muted-foreground">Issued</dt>
                    <dd className="text-right font-mono text-foreground">
                      2026-03-14
                    </dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4">
                    <dt className="text-muted-foreground">Status</dt>
                    <dd className="text-right font-medium text-success">
                      Active
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
