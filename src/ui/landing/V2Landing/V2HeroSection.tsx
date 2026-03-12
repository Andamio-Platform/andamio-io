"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const childVariants = {
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
      {/* Decorative gradient blobs */}
      <div className="absolute -right-20 top-1/4 h-[500px] w-[500px] rounded-full bg-primary/8 blur-[120px]" />
      <div className="absolute -left-40 bottom-1/4 h-[400px] w-[400px] rounded-full bg-secondary/6 blur-[100px]" />

      <div className="relative z-10 mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            variants={childVariants}
            className="text-4xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Credentials That
            <br />
            <span className="text-primary">Belong to You</span>
          </motion.h1>

          <motion.p
            variants={childVariants}
            className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl"
          >
            An open protocol for verifiable credentials. Issue via API,
            permanent on-chain, owned by the people who earned them.
          </motion.p>

          <motion.p
            variants={childVariants}
            className="mt-3 text-base font-medium text-muted-foreground/60 sm:text-lg"
          >
            Free to start. ~$0.17 per credential.*
          </motion.p>

          <motion.div
            variants={childVariants}
            className="mt-8 flex flex-wrap justify-center gap-3"
          >
            <Link
              href="https://app.andamio.io"
              className="inline-flex items-center rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md"
            >
              Get Started Free
              <svg className="ml-1.5 h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="https://docs.andamio.io"
              className="inline-flex items-center rounded-md border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-all hover:bg-muted hover:shadow-sm"
            >
              Explore the Docs
            </Link>
          </motion.div>

          <motion.div
            variants={childVariants}
            className="mt-12 flex flex-wrap items-center justify-center gap-x-2 text-sm text-muted-foreground/50"
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
