"use client";

import React from "react";
import { primaryBtnClass, outlineBtnClass } from "./_ui";
import BadgeBuilderDemo from "./BadgeBuilderDemo";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import { INSPIRATION } from "./inspiration-data";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";
import { OUTER_RING, INNER_RING, SHIFT, LEFT_WITH, type RingNote, type InfoCard } from "./annotation-data";

function truncHash(hex: string): string {
  return hex.length > 16 ? `${hex.slice(0, 10)}…${hex.slice(-6)}` : hex;
}

function InfoDot({ label }: { label: string }) {
  return (
    <PopoverTrigger
      aria-label={label}
      className="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-border text-[10px] font-semibold text-muted-foreground transition-colors hover:border-foreground/50 hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      i
    </PopoverTrigger>
  );
}

function RingRow({ note, value }: { note: RingNote; value: string | null }) {
  return (
    <div className="flex flex-col gap-1 rounded-lg border border-border bg-background p-4">
      <Popover>
        <div className="flex items-center gap-2">
          <span className="text-[15px] font-semibold text-foreground">{note.label}</span>
          <InfoDot label={`About the ${note.label} ring`} />
        </div>
        <PopoverContent align="start" className="max-w-xs text-[13px] leading-relaxed">
          {note.body}
        </PopoverContent>
      </Popover>
      <span className="text-[11px] uppercase tracking-wide text-muted-foreground">{note.sub}</span>
      <span className="mt-1 font-mono text-[12px] text-foreground" aria-live="polite">
        {value ? truncHash(value) : "…"}
      </span>
    </div>
  );
}

function MessageCard({ card }: { card: InfoCard }) {
  return (
    <Popover>
      <PopoverTrigger className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-[14px] font-medium text-foreground transition-colors hover:border-foreground/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
        {card.title}
        <span aria-hidden className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-border text-[10px] text-muted-foreground">
          i
        </span>
      </PopoverTrigger>
      <PopoverContent align="start" className="max-w-xs text-[13px] leading-relaxed">
        {card.body}
      </PopoverContent>
    </Popover>
  );
}

/* "How it works" — one general-purpose, show-don't-tell badge demo. The visitor
 * builds a credential and sees what makes it an Andamio credential. The old
 * buyer-archetype picker is gone; archetype material is repurposed into the
 * "Need Inspiration" drawer (U2) and the demo annotations (U3). */

export default function V2IssuerExplorer() {
  const [rings, setRings] = React.useState<{ courseId: string; sltHash: string } | null>(null);
  return (
    <section
      id="how-it-works"
      className="flex min-h-screen flex-col justify-center border-t border-border/60 bg-surface-subtle py-12 sm:py-16"
    >
      <div className="mx-auto w-full max-w-none px-5 sm:px-8 lg:px-14 2xl:px-20">
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
          <div>
            <h2 className="font-display text-4xl font-bold leading-[0.98] tracking-[-0.02em] text-foreground sm:text-5xl lg:text-6xl">
              How it works
            </h2>
            <p className="mt-3 max-w-3xl text-lg leading-relaxed tracking-[-0.005em] text-muted-foreground sm:text-xl">
              Build a credential and see what makes it an Andamio credential.
            </p>
          </div>

          <Sheet>
            <SheetTrigger
              className="inline-flex items-center gap-2 text-[15px] font-medium text-primary underline-offset-4 transition-colors hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Need inspiration? See ways to use it
              <span aria-hidden>→</span>
            </SheetTrigger>
            <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-md">
              <SheetHeader>
                <SheetTitle className="font-display text-2xl font-bold tracking-[-0.015em]">
                  Ways to use it
                </SheetTitle>
                <SheetDescription className="text-[15px] leading-relaxed">
                  A few ways teams put an owned credential to work.
                </SheetDescription>
              </SheetHeader>
              <ul className="mt-8 flex flex-col gap-7">
                {INSPIRATION.map((item) => (
                  <li key={item.title}>
                    <p className="font-display text-lg font-semibold tracking-[-0.01em] text-foreground">
                      {item.title}
                    </p>
                    <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">
                      {item.problem}
                    </p>
                    <p className="mt-2 grid grid-cols-[20px_1fr] gap-2 text-[14px] leading-relaxed text-foreground">
                      <span aria-hidden className="font-medium text-primary">
                        →
                      </span>
                      <span>{item.help}</span>
                    </p>
                  </li>
                ))}
              </ul>
            </SheetContent>
          </Sheet>
        </div>

        {/* Demo centerpiece — full width. Annotations live INSIDE the card's left
            column (passed as a slot) so the badge column stays free to be larger. */}
        <div className="mt-8">
          <BadgeBuilderDemo
            onDerived={setRings}
            annotations={
              <div className="flex flex-col gap-3 border-t border-border pt-4">
                {/* R10: James to add the "two ways" to acquire the course token to OUTER_RING.body */}
                <RingRow note={OUTER_RING} value={rings?.courseId ?? null} />
                <RingRow note={INNER_RING} value={rings?.sltHash ?? null} />
                <div className="flex flex-wrap gap-2">
                  <MessageCard card={SHIFT} />
                  <MessageCard card={LEFT_WITH} />
                </div>
              </div>
            }
          />
        </div>

        {/* CTA */}
        <div className="mt-8 flex flex-wrap items-center justify-end gap-3 border-t border-border pt-6">
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
