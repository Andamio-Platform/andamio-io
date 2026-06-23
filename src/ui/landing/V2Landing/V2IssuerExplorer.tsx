"use client";

import React from "react";
import { primaryBtnClass, outlineBtnClass } from "./_ui";
import BadgeBuilderDemo from "./BadgeBuilderDemo";

/* "How it works" — one general-purpose, show-don't-tell badge demo. The visitor
 * builds a credential and sees what makes it an Andamio credential. The old
 * buyer-archetype picker is gone; archetype material is repurposed into the
 * "Need Inspiration" drawer (U2) and the demo annotations (U3). */

export default function V2IssuerExplorer() {
  return (
    <section
      id="archetypes"
      className="flex min-h-screen flex-col justify-center border-t border-border/60 bg-surface-subtle py-24 sm:py-32"
    >
      <div className="mx-auto max-w-none px-5 sm:px-8 lg:px-14 2xl:px-20">
        <div>
          <h2 className="whitespace-nowrap font-display text-[3.25rem] font-bold leading-[0.98] tracking-[-0.02em] text-foreground sm:text-8xl lg:text-9xl">
            How it works
          </h2>
          <p className="mt-6 max-w-3xl text-xl leading-relaxed tracking-[-0.005em] text-muted-foreground sm:text-2xl">
            Build a credential and see what makes it an Andamio credential.
          </p>
        </div>

        {/* Demo centerpiece */}
        <div className="mt-16">
          <BadgeBuilderDemo />
        </div>

        {/* CTA */}
        <div className="mt-14 flex flex-wrap items-center justify-end gap-3 border-t border-border pt-6">
          {/* FUTURE: capture email, send the 1-page report. Disabled until it ships. */}
          <button
            type="button"
            disabled
            title="Coming soon"
            className={`${outlineBtnClass} cursor-not-allowed opacity-50`}
          >
            Get the report
          </button>
          <a
            href="mailto:hello@andamio.io?subject=Andamio%20Issuer%20walkthrough"
            className={primaryBtnClass}
          >
            Book a 20-minute walkthrough
          </a>
        </div>
      </div>
    </section>
  );
}
