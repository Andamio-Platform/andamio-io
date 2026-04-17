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

export default function V2HeroSection() {
  return (
    <section
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background pt-20"
    >
      <div className="relative z-10 mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            variants={childVariants}
            className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground"
          >
            Credential infrastructure for certification bodies, partner programs, and corporate training
          </motion.p>

          <motion.h1
            variants={childVariants}
            className="mt-8 font-display text-5xl font-extrabold leading-[1.05] tracking-[-0.03em] text-foreground sm:text-6xl md:text-7xl lg:text-[7rem]"
          >
            Your badges are dead ends.
            <br />
            <span className="text-primary">What if they were building blocks?</span>
          </motion.h1>

          <motion.p
            variants={childVariants}
            className="mx-auto mt-10 max-w-2xl text-lg text-muted-foreground sm:text-xl"
          >
            Add a verifiable credential layer on top of what you already run —
            without replacing your LMS, your CRM, or your certification system.
          </motion.p>

          <motion.div
            variants={childVariants}
            className="mt-10 flex flex-wrap justify-center gap-3"
          >
            <a
              href="mailto:hello@andamio.io?subject=Enterprise%20demo%20request"
              className="inline-flex items-center rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Talk to our enterprise team
            </a>
            <a
              href="#composability"
              className="inline-flex items-center rounded-md border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              See how it works
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
