"use client";

import React from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { EXTERNAL_LINKS } from "~/lib/external-links";
import { staggerContainer } from "./motion-variants";

const containerVariants = staggerContainer(0.12);

const childVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const trustPartners = ["Intersect", "Syngenta", "Toha Network"];

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
          <motion.h1
            variants={childVariants}
            className="font-display text-5xl font-extrabold leading-[1.08] tracking-[-0.025em] text-foreground sm:text-6xl md:text-7xl lg:text-8xl"
          >
            Credentials That
            <br />
            <span className="text-primary">Belong to You</span>
          </motion.h1>

          <motion.p
            variants={childVariants}
            className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl"
          >
            An open protocol for interoperable credentials.
          </motion.p>

          <motion.div
            variants={childVariants}
            className="mt-8 flex flex-wrap justify-center gap-3"
          >
            <a
              href={EXTERNAL_LINKS.docs}
              className="inline-flex items-center rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md"
            >
              Build on Andamio
              <svg className="ml-1.5 h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
            <a
              href={EXTERNAL_LINKS.app}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-md border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-all hover:bg-muted hover:shadow-sm"
            >
              Learn What Andamio Can Do
            </a>
          </motion.div>

          <motion.div
            variants={childVariants}
            className="mt-16 flex flex-wrap items-center justify-center gap-x-2 font-mono text-xs uppercase tracking-widest text-muted-foreground/40"
          >
            <span className="font-medium">Trusted by</span>
            {trustPartners.map((partner, index) => (
              <React.Fragment key={partner}>
                {index > 0 && (
                  <span className="select-none" aria-hidden="true">
                    &middot;
                  </span>
                )}
                <span>{partner}</span>
              </React.Fragment>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
