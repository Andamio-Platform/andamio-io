"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { EXTERNAL_LINKS } from "~/lib/external-links";
import { fadeIn } from "./motion-variants";

const fadeInVariants = fadeIn(30, 0.6);

export default function V2CTAFooter() {
  return (
    <section className="relative bg-[#0d1117] py-16 sm:py-24">
      {/* Decorative gradient line */}
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <motion.div
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        variants={fadeInVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
          {/* Developers card */}
          <div className="rounded-xl border border-white/15 bg-white/[0.08] p-8 sm:p-10">
            <p className="mb-6 text-xs font-semibold uppercase tracking-widest text-primary">
              FOR DEVELOPERS
            </p>
            <h3 className="mb-6 text-2xl font-bold leading-snug text-white">
              Get your API key.{" "}
              <span className="text-white/60">Start issuing credentials today.</span>
            </h3>
            <a
              href={EXTERNAL_LINKS.docs}
              className="inline-flex items-center rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Read the Docs &rarr;
            </a>
          </div>

          {/* Organizations card */}
          <div className="rounded-xl border border-white/15 bg-white/[0.08] p-8 sm:p-10">
            <p className="mb-6 text-xs font-semibold uppercase tracking-widest text-primary">
              FOR ORGANIZATIONS
            </p>
            <h3 className="mb-6 text-2xl font-bold leading-snug text-white">
              See how Intersect, Toha, and Syngenta use Andamio.
            </h3>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/use-cases"
                className="inline-flex items-center rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                View Use Cases &rarr;
              </Link>
              <a
                href="mailto:hello@andamio.io"
                className="inline-flex items-center rounded-md border border-white/20 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
              >
                Talk to Us &rarr;
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
