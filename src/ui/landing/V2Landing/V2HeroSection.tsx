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
    transition: { duration: 0.6, ease: "easeOut" },
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
            className="font-display text-5xl font-extrabold leading-[1.05] tracking-[-0.03em] text-foreground sm:text-6xl md:text-7xl lg:text-[7.5rem]"
          >
            Credentials that belong to you.
          </motion.h1>

          <motion.p
            variants={childVariants}
            className="mx-auto mt-8 max-w-xl text-lg text-muted-foreground sm:text-xl"
          >
            An open protocol for interoperable credentials.
          </motion.p>

          <motion.div
            variants={childVariants}
            className="mt-10 flex flex-wrap justify-center gap-3"
          >
            <a
              href={EXTERNAL_LINKS.docs}
              className="inline-flex items-center rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Build on Andamio
            </a>
            <a
              href={EXTERNAL_LINKS.app}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-md border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              Learn What Andamio Can Do
            </a>
          </motion.div>

          <motion.div
            variants={childVariants}
            className="mt-20 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground"
          >
            <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground/80">
              Trusted by
            </span>
            {trustPartners.map((partner) => (
              <span key={partner} className="font-medium text-foreground/70">
                {partner}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
