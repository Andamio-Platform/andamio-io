"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { Transition } from "framer-motion";
import { Kicker } from "./_ui";

/* -------------------------------------------------------------------------- */
/*  Buttons                                                                    */
/* -------------------------------------------------------------------------- */

const primaryBtn =
  "inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-[15px] font-semibold text-primary-foreground " +
  "transition-[background,transform] duration-150 hover:bg-primary/90 active:translate-y-px " +
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

const outlineBtn =
  "inline-flex items-center gap-2 rounded-md border border-border px-6 py-3 text-[15px] font-medium text-foreground " +
  "transition-colors duration-150 hover:border-foreground/40 hover:bg-foreground/[0.04] " +
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground/40";

/* -------------------------------------------------------------------------- */
/*  Signature: a badge that dies in a database becomes a credential that       */
/*  keeps working. Single program, single issuer — only shipped claims:        */
/*  verifiable, held by the earner, anchored on-chain, outlives the vendor.    */
/* -------------------------------------------------------------------------- */

function DeadEndToBuildingBlock() {
  const reduce = useReducedMotion();

  const fade = (delay: number): Record<string, unknown> =>
    reduce
      ? { initial: { opacity: 1 } }
      : { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay, duration: 0.5 } as Transition };

  const pop = (delay: number): Record<string, unknown> =>
    reduce
      ? { initial: { opacity: 1, y: 0 } }
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { delay, duration: 0.5, ease: "easeOut" } as Transition,
        };

  return (
    <div className="mx-auto w-full max-w-md lg:max-w-none">
      {/* The badge — a dead end */}
      <motion.div
        {...fade(0.1)}
        className="rounded-lg border border-dashed border-border bg-card/30 p-5"
      >
        <div className="flex items-center justify-between gap-3">
          <span className="font-display text-[15px] font-semibold text-muted-foreground">
            A badge
          </span>
          <span className="rounded-full border border-border px-2 py-0.5 text-[11px] text-muted-foreground">
            in a vendor&rsquo;s database
          </span>
        </div>
        <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
          Issued once. Sits in a profile. Can be changed, switched off, or lost when the vendor is.
        </p>
      </motion.div>

      {/* The turn */}
      <motion.div {...fade(0.5)} className="flex items-center gap-3 py-3 pl-1">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-4 w-4 text-primary" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v14m0 0l-5-5m5 5l5-5" />
        </svg>
        <span className="text-[13px] font-medium text-foreground">on Andamio</span>
      </motion.div>

      {/* The credential — a building block */}
      <motion.div
        {...pop(0.7)}
        className="rounded-lg border border-border bg-card/60 p-5 shadow-sm"
      >
        <div className="flex items-center justify-between gap-3">
          <span className="font-display text-[15px] font-semibold text-foreground">A credential</span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-success/40 bg-success/10 px-2.5 py-1 text-[12px] font-semibold text-success">
            <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden />
            Verified
          </span>
        </div>

        <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-border pt-4">
          <div>
            <dt className="text-[11px] text-muted-foreground">Issued by</dt>
            <dd className="text-[13px] text-foreground">Your program</dd>
          </div>
          <div>
            <dt className="text-[11px] text-muted-foreground">Held by</dt>
            <dd className="font-mono text-[13px] text-foreground">addr1q9x…7v2k</dd>
          </div>
          <div className="col-span-2">
            <dt className="text-[11px] text-muted-foreground">Anchored on Cardano</dt>
            <dd className="font-mono text-[13px] text-foreground">block 11,482,003 · tx a3f9c1…e21c</dd>
          </div>
        </dl>

        <p className="mt-4 text-[12.5px] leading-relaxed text-muted-foreground">
          Anyone can verify it. The earner keeps it. It outlives whoever issued it.
        </p>
      </motion.div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};
const rise = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
};

export default function V2HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background pt-28 pb-20 sm:pt-32">
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-20">
          {/* ---- Argument -------------------------------------------- */}
          <motion.div variants={stagger} initial="hidden" animate="visible" className="max-w-xl">
            <motion.div variants={rise}>
              <Kicker>Andamio Issuer</Kicker>
            </motion.div>

            <motion.h1
              variants={rise}
              className="mt-4 font-display text-[clamp(2.75rem,5.4vw,5rem)] font-extrabold leading-[0.98] tracking-[-0.035em] text-foreground"
            >
              Your badges are dead ends.{" "}
              <span className="text-primary">What if they were building blocks?</span>
            </motion.h1>

            <motion.p variants={rise} className="mt-7 text-lg leading-relaxed text-muted-foreground sm:text-xl">
              Andamio Issuer adds a verifiable credential layer on top of the programs you already
              run — credentials that keep working after you issue them. You and your team never touch
              crypto. It&rsquo;s a credentialing company that happens to use blockchain, not the other
              way around.
            </motion.p>

            <motion.div variants={rise} className="mt-9 flex flex-wrap gap-3">
              <a href="mailto:hello@andamio.io?subject=Andamio%20Issuer%20walkthrough" className={primaryBtn}>
                Book a 20-min walkthrough
                <svg aria-hidden viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-3.5 w-3.5">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a href="#andamio-api" className={outlineBtn}>
                Building? See Andamio API
              </a>
            </motion.div>

            <motion.p variants={rise} className="mt-10 border-t border-border pt-5 text-sm text-muted-foreground">
              Live on Cardano mainnet <span className="px-1.5 text-border">/</span> Audited by TxPipe
              <span className="px-1.5 text-border">/</span> Plans from $29/mo
            </motion.p>
          </motion.div>

          {/* ---- Signature ------------------------------------------- */}
          <DeadEndToBuildingBlock />
        </div>
      </div>
    </section>
  );
}
