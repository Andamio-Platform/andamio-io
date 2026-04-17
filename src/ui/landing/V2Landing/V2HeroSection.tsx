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
            For organizations that issue credentials
          </motion.p>

          <motion.h1
            variants={childVariants}
            className="mt-8 font-display text-4xl font-extrabold leading-[1.05] tracking-[-0.02em] text-foreground sm:text-5xl md:text-6xl lg:text-[5.5rem]"
          >
            Verifiable credentials your customers can check{" "}
            <span className="text-primary">without calling you.</span>
          </motion.h1>

          <motion.p
            variants={childVariants}
            className="mx-auto mt-10 max-w-2xl text-lg text-muted-foreground sm:text-xl"
          >
            Credential programs today are dead ends — issued once, owned by
            the platform, forgotten. Andamio makes every credential
            independently verifiable, portable, and programmable, on
            infrastructure you already trust.
          </motion.p>

          <motion.div
            variants={childVariants}
            className="mt-10 flex flex-wrap justify-center gap-3"
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
            className="mx-auto mt-8 max-w-xl text-sm text-muted-foreground/90"
          >
            Runs alongside Credly, Accredible, and custom systems. No migration on day one.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
