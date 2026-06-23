"use client";

import React from "react";
import { motion } from "framer-motion";

const primaryBtn =
  "inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-[15px] font-semibold text-primary-foreground " +
  "transition-[background,transform] duration-150 hover:bg-primary/90 active:translate-y-px " +
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

const outlineBtn =
  "inline-flex items-center gap-2 rounded-md border border-border px-6 py-3 text-[15px] font-medium text-foreground " +
  "transition-colors duration-150 hover:border-foreground/40 hover:bg-foreground/[0.04] " +
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground/40";

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.09 } } };
const rise = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
};

export default function V2HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-background pt-28 pb-20 sm:pt-32">
      <div className="relative z-10 mx-auto w-full max-w-none px-5 sm:px-8 lg:px-14 2xl:px-20">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
          {/* ---- Message (centered in the left half) ------------------ */}
          <motion.div variants={stagger} initial="hidden" animate="visible" className="mx-auto max-w-2xl">
            <motion.h1
              variants={rise}
              className="font-display text-[clamp(3.25rem,7.2vw,7rem)] font-extrabold leading-[1.02] tracking-[-0.02em] text-foreground"
            >
              Badges are due for an{" "}
              <span className="text-primary">upgrade</span>
            </motion.h1>

            <motion.div variants={rise} className="mt-16">
              <p className="text-sm font-semibold text-muted-foreground">
                Learn how
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <a href="#issuer" className={primaryBtn}>
                  Andamio Issuer
                  <svg aria-hidden viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-3.5 w-3.5">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </a>
                <a href="#andamio-api" className={outlineBtn}>
                  Andamio API
                </a>
              </div>
            </motion.div>
          </motion.div>

          {/* ---- A real credential ----------------------------------- */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
            className="mx-auto w-full max-w-4xl"
          >
            <img
              src="/andamio-credential-badge.svg"
              alt="An Andamio credential, Getting Started with Andamio. Its rings encode the course it came from, and what it certifies."
              className="w-full"
              width={1024}
              height={1024}
            />
            <p className="mt-4 text-center text-[13px] text-muted-foreground">
              A real Andamio credential. Its rings encode where it came from and what it certifies.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
