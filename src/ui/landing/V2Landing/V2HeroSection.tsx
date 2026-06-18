"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { Transition } from "framer-motion";

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
/*  Signature: the scaffold lattice = the credential graph                     */
/*                                                                             */
/*  Two institutional scaffolds with no shared infrastructure (dashed gap).    */
/*  One orange brace — the protocol — carries a credential across the          */
/*  issuer boundary. That single load-bearing diagonal is the whole product.   */
/* -------------------------------------------------------------------------- */

function ScaffoldGraph() {
  const reduce = useReducedMotion();

  // A drawn line that assembles on load (or appears instantly if reduced motion).
  const draw = (delay: number, duration = 0.6): Record<string, unknown> =>
    reduce
      ? { initial: { pathLength: 1, opacity: 1 } }
      : {
          initial: { pathLength: 0, opacity: 0 },
          animate: { pathLength: 1, opacity: 1 },
          transition: { pathLength: { delay, duration, ease: "easeInOut" }, opacity: { delay, duration: 0.2 } } as Transition,
        };

  const pop = (delay: number): Record<string, unknown> =>
    reduce
      ? { initial: { opacity: 1, scale: 1 } }
      : {
          initial: { opacity: 0, scale: 0.9 },
          animate: { opacity: 1, scale: 1 },
          transition: { delay, duration: 0.4, ease: "easeOut" } as Transition,
        };

  const fade = (delay: number): Record<string, unknown> =>
    reduce
      ? { initial: { opacity: 1 } }
      : { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay, duration: 0.5 } as Transition };

  const structure = "var(--foreground)";

  return (
    <svg
      viewBox="0 0 460 440"
      role="img"
      aria-label="Two separate issuers' scaffolds, joined by a single protocol-enforced credential link that needs no integration between them."
      className="h-auto w-full"
    >
      {/* institutional boundary — two systems that share nothing */}
      <motion.line
        x1="230" y1="40" x2="230" y2="404"
        stroke={structure} strokeWidth="1" strokeDasharray="3 6" strokeOpacity="0.3"
        {...fade(0.1)}
      />
      <motion.text x="120" y="26" textAnchor="middle" className="fill-foreground/55 font-sans text-[12px] font-medium" {...fade(0.2)}>
        Issuer A
      </motion.text>
      <motion.text x="340" y="26" textAnchor="middle" className="fill-foreground/55 font-sans text-[12px] font-medium" {...fade(0.2)}>
        Issuer B · different org
      </motion.text>

      {/* ---- Left scaffold (Issuer A) ---------------------------------- */}
      <g stroke={structure} strokeWidth="1.5" strokeOpacity="0.4" fill="none" strokeLinecap="square">
        <motion.line x1="70" y1="78" x2="70" y2="404" {...draw(0.15)} />
        <motion.line x1="170" y1="78" x2="170" y2="404" {...draw(0.25)} />
        <motion.line x1="70" y1="120" x2="170" y2="120" {...draw(0.4)} />
        <motion.line x1="70" y1="250" x2="170" y2="250" {...draw(0.5)} />
        <motion.line x1="70" y1="404" x2="170" y2="404" {...draw(0.3)} />
        {/* x-brace, faint, reads as scaffolding */}
        <motion.line x1="70" y1="250" x2="170" y2="120" strokeOpacity="0.2" {...draw(0.6)} />
      </g>

      {/* ---- Right scaffold (Issuer B) --------------------------------- */}
      <g stroke={structure} strokeWidth="1.5" strokeOpacity="0.4" fill="none" strokeLinecap="square">
        <motion.line x1="290" y1="46" x2="290" y2="372" {...draw(0.2)} />
        <motion.line x1="390" y1="46" x2="390" y2="372" {...draw(0.3)} />
        <motion.line x1="290" y1="86" x2="390" y2="86" {...draw(0.55)} />
        <motion.line x1="290" y1="190" x2="390" y2="190" {...draw(0.45)} />
        <motion.line x1="290" y1="372" x2="390" y2="372" {...draw(0.35)} />
        <motion.line x1="290" y1="190" x2="390" y2="86" strokeOpacity="0.2" {...draw(0.65)} />
      </g>

      {/* ---- Joint A: earned credential (Foundation Blue) -------------- */}
      <motion.g {...pop(0.9)}>
        <rect x="104" y="234" width="32" height="32" rx="2" fill="var(--secondary)" />
        <path d="M112 250.5l5.5 5.5 10-11" stroke="#fff" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </motion.g>
      <motion.text x="120" y="298" textAnchor="middle" className="fill-foreground font-sans text-[13px] font-semibold" {...fade(1.0)}>
        Fundamentals
      </motion.text>
      <motion.text x="120" y="315" textAnchor="middle" className="fill-foreground/55 font-sans text-[11px]" {...fade(1.0)}>
        Earned
      </motion.text>

      {/* ---- The orange brace: the protocol carries it across ---------- */}
      <motion.line
        x1="138" y1="248" x2="322" y2="176"
        stroke="var(--primary)" strokeWidth="3" strokeLinecap="round" fill="none"
        {...draw(1.25, 0.7)}
      />
      <motion.circle cx="322" cy="176" r="4" fill="var(--primary)" {...pop(1.85)} />

      {/* ---- Joint B: unlocked credential (orange) --------------------- */}
      <motion.g {...pop(1.9)}>
        <rect x="324" y="158" width="32" height="32" rx="2" fill="none" stroke="var(--primary)" strokeWidth="2.5" />
        <rect x="331" y="165" width="18" height="18" rx="1" fill="var(--primary)" fillOpacity="0.2" />
      </motion.g>
      <motion.text x="340" y="220" textAnchor="middle" className="fill-foreground font-sans text-[13px] font-semibold" {...fade(2.0)}>
        Solution Architect
      </motion.text>
      <motion.text x="340" y="237" textAnchor="middle" className="fill-foreground/55 font-sans text-[11px]" {...fade(2.0)}>
        Unlocked
      </motion.text>

      {/* ---- Joint C: next, pending (ghost) ---------------------------- */}
      <motion.g {...fade(2.2)}>
        <rect x="324" y="54" width="32" height="32" rx="2" fill="none" stroke={structure} strokeOpacity="0.4" strokeWidth="1.5" strokeDasharray="3 4" />
        <text x="340" y="116" textAnchor="middle" className="fill-foreground/45 font-sans text-[12.5px]">Certified Channel Pro</text>
        <text x="340" y="132" textAnchor="middle" className="fill-foreground/40 font-sans text-[11px]">Next</text>
      </motion.g>
    </svg>
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
            <motion.h1
              variants={rise}
              className="font-display text-[clamp(2.75rem,5.4vw,5rem)] font-extrabold leading-[0.98] tracking-[-0.035em] text-foreground"
            >
              Badges should <span className="text-primary">outlive</span> the platform that issued them.
            </motion.h1>

            <motion.p variants={rise} className="mt-7 text-lg leading-relaxed text-muted-foreground sm:text-xl">
              A badge locked inside a vendor&rsquo;s database is just a picture. Andamio is the
              protocol for credentials that compose across issuers and stay yours when the platform
              is gone.
            </motion.p>

            <motion.div variants={rise} className="mt-9 flex flex-wrap gap-3">
              <a href="mailto:hello@andamio.io?subject=Enterprise%20walkthrough%20request" className={primaryBtn}>
                Book a 20-min walkthrough
                <svg aria-hidden viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-3.5 w-3.5">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a href="#archetypes" className={outlineBtn}>
                See how composition works
              </a>
            </motion.div>

            <motion.p variants={rise} className="mt-10 border-t border-border pt-5 text-sm text-muted-foreground">
              Live on Cardano mainnet <span className="px-1.5 text-border">/</span> Audited by TxPipe
              <span className="px-1.5 text-border">/</span> Runs alongside Credly &amp; Accredible
            </motion.p>
          </motion.div>

          {/* ---- Signature ------------------------------------------- */}
          <div className="relative">
            <div className="rounded-lg border border-border bg-card/40 p-6 sm:p-8">
              <p className="mb-1 font-display text-sm font-semibold text-foreground">
                One credential, two issuers, no integration
              </p>
              <p className="mb-6 text-[13px] leading-snug text-muted-foreground">
                The protocol enforces the prerequisite. The issuers never share a database.
              </p>
              <ScaffoldGraph />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
