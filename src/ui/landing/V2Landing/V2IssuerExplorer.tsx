"use client";

import React from "react";
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

/* Credential Assay Station — a full-viewport demo presented as one bordered
 * widget: a control console drives the live badge (the specimen under glass),
 * and the derived hashes read out beside it. The widget card holds the heading,
 * the wired three-zone bench (<BadgeBuilderDemo />), and the "ways to use it"
 * drawer, framed so it clearly reads as a self-contained demo. On large screens
 * it fits one viewport (no scroll but a very long targets list); below lg it
 * degrades to a natural-height stacked layout. */

export default function V2IssuerExplorer() {
  return (
    <section id="how-it-works" className="border-t border-border/60 bg-surface-subtle">
      <div className="mx-auto w-full max-w-none px-5 py-12 sm:px-8 sm:py-16 lg:px-14 lg:py-8 2xl:px-20">
        {/* The whole demo is one bordered, lifted widget with a LIGHT surface
            (demo-light island) sitting on the page's dark background. */}
        <div className="demo-light flex flex-col gap-6 rounded-2xl border border-black/10 bg-card p-5 text-foreground shadow-[0_30px_80px_-30px_rgba(0,0,0,0.85)] sm:p-6 lg:grid lg:h-[calc(100dvh-4rem)] lg:grid-rows-[auto_minmax(0,1fr)] lg:gap-6 lg:overflow-hidden lg:p-7">
          {/* ── Top bar ─────────────────────────────────────────────── */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                  How it works
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-primary">
                    Live
                  </span>
                </span>
              </div>
              <h2 className="mt-2 font-display text-xl font-bold tracking-[-0.01em] text-foreground sm:text-2xl">
                Build a credential and watch it become verifiable
              </h2>
            </div>

            <Sheet>
              <SheetTrigger className="mt-1 inline-flex shrink-0 items-center gap-2 text-[14px] font-medium text-primary underline-offset-4 transition-colors hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                <span className="hidden sm:inline">Need inspiration? See ways to use it</span>
                <span className="sm:hidden">Inspiration</span>
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

          {/* ── Bench: console + specimen + readouts (fills the 1fr band) ── */}
          <BadgeBuilderDemo />
        </div>
      </div>
    </section>
  );
}
