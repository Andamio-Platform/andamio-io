"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { EXTERNAL_LINKS } from "~/lib/external-links";
import { fadeIn } from "./motion-variants";

const fadeInVariants = fadeIn(30, 0.6);

const footerLinks = {
  Build: [
    { name: "Docs", href: EXTERNAL_LINKS.docs },
    { name: "API Reference", href: EXTERNAL_LINKS.apiReference },
    { name: "GitHub", href: EXTERNAL_LINKS.github },
    { name: "Discord", href: EXTERNAL_LINKS.discord },
  ],
  Explore: [
    { name: "Use Cases", href: "/use-cases" },
    { name: "Blog", href: "/blog" },
    { name: "About", href: "/about" },
    { name: "App", href: EXTERNAL_LINKS.app },
  ],
  Connect: [
    { name: "hello@andamio.io", href: "mailto:hello@andamio.io" },
    { name: "LinkedIn", href: EXTERNAL_LINKS.linkedin },
    { name: "Twitter", href: EXTERNAL_LINKS.twitter },
  ],
  Legal: [
    { name: "Privacy", href: "https://app.andamio.io/privacy-policy" },
    { name: "Terms", href: "https://app.andamio.io/terms" },
  ],
};

export default function V2CTAFooter() {
  return (
    <section className="bg-[#0d1117]">
      {/* CTA cards */}
      <motion.div
        className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8"
        variants={fadeInVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
          <div className="rounded-lg border border-white/15 bg-white/[0.08] p-8 sm:p-10">
            <p className="mb-6 font-mono text-xs font-medium uppercase tracking-[0.2em] text-primary">
              FOR DEVELOPERS
            </p>
            <h3 className="mb-6 text-2xl font-bold leading-snug text-white">
              Get your API key.{" "}
              <span className="text-white/80">Start issuing credentials today.</span>
            </h3>
            <a
              href={EXTERNAL_LINKS.docs}
              className="inline-flex items-center rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Read the Docs &rarr;
            </a>
          </div>

          <div className="rounded-lg border border-white/15 bg-white/[0.08] p-8 sm:p-10">
            <p className="mb-6 font-mono text-xs font-medium uppercase tracking-[0.2em] text-primary">
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

      {/* Footer */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-10 md:flex-row md:items-start md:justify-between lg:px-8">
          {/* Left — brand */}
          <div className="shrink-0">
            <img
              className="mb-3 h-6 w-auto opacity-80"
              src="/logo-with-typography-dark.svg"
              alt="Andamio"
            />
            <p className="text-xs text-white/60">
              Open protocol for interoperable credentials
            </p>
            <p className="mt-4 text-xs text-white/40">
              © {new Date().getFullYear()} Andamio
            </p>
          </div>

          {/* Right — link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {Object.entries(footerLinks).map(([key, links]) => (
              <div key={key}>
                <h3 className="mb-3 font-mono text-xs font-medium uppercase tracking-wider text-white/60">
                  {key}
                </h3>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm text-white/60 transition-colors hover:text-white"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
