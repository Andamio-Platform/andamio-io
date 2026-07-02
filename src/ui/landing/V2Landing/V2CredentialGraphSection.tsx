import React from "react";
import { Kicker } from "./_ui";

interface Bar {
  label: string;
  subtitle: string;
  segments: Array<{ kind: "solid" | "ghost" | "link"; text: string; meta?: string }>;
}

const oldWorldBars: Bar[] = [
  {
    label: "Issuer A",
    subtitle: "Cert body",
    segments: [
      { kind: "solid", text: "Credential A" },
      { kind: "ghost", text: "locked" },
    ],
  },
  {
    label: "Issuer B",
    subtitle: "Partner program",
    segments: [
      { kind: "solid", text: "Credential B" },
      { kind: "ghost", text: "locked" },
    ],
  },
  {
    label: "Issuer C",
    subtitle: "Cohort school",
    segments: [
      { kind: "solid", text: "Credential C" },
      { kind: "ghost", text: "locked" },
    ],
  },
];

const newWorldBars: Bar[] = [
  {
    label: "Issuer A",
    subtitle: "Cert body",
    segments: [{ kind: "link", text: "Credential A" }],
  },
  {
    label: "Issuer B",
    subtitle: "Partner program",
    segments: [
      { kind: "link", text: "Credential B" },
      { kind: "link", text: "", meta: "← requires A" },
    ],
  },
  {
    label: "Issuer C",
    subtitle: "Cohort school",
    segments: [
      { kind: "link", text: "Credential C" },
      { kind: "link", text: "", meta: "← requires A + B" },
    ],
  },
];

function GraphDiagram({ bars, subtle }: { bars: Bar[]; subtle?: boolean }) {
  return (
    <div
      className={`flex flex-col gap-2 rounded-lg border border-border p-6 sm:p-8 ${
        subtle ? "bg-surface-subtle" : "bg-background"
      }`}
    >
      {bars.map((bar) => (
        <div
          key={bar.label}
          className="grid grid-cols-1 items-center gap-3 py-1 sm:grid-cols-[180px_1fr] sm:gap-5"
        >
          <div>
            <p className="text-[13px] font-semibold tracking-[-0.005em] text-foreground">
              {bar.label}
            </p>
            <p className="mt-0.5 text-[13px] tracking-[-0.005em] text-muted-foreground">
              {bar.subtitle}
            </p>
          </div>
          <div className="flex min-h-[44px] items-stretch gap-1">
            {bar.segments.map((seg, i) => {
              if (seg.meta) {
                return (
                  <div
                    key={i}
                    className="flex items-center px-0.5 text-[11px] text-muted-foreground"
                  >
                    {seg.meta}
                  </div>
                );
              }
              const baseClasses =
                "flex items-center rounded-md border px-3.5 py-2.5 text-[12px] font-medium tracking-[-0.005em]";
              if (seg.kind === "solid") {
                return (
                  <div
                    key={i}
                    className={`${baseClasses} border-border bg-card text-foreground`}
                  >
                    {seg.text}
                  </div>
                );
              }
              if (seg.kind === "ghost") {
                return (
                  <div
                    key={i}
                    className={`${baseClasses} border-dashed border-border bg-card/40 text-muted-foreground`}
                  >
                    {seg.text}
                  </div>
                );
              }
              return (
                <div
                  key={i}
                  className={`${baseClasses} border-transparent bg-primary text-primary-foreground`}
                >
                  {seg.text}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function V2CredentialGraphSection() {
  return (
    <section
      id="graph"
      className="border-t border-border/60 bg-surface-subtle py-24 sm:py-32"
    >
      <div className="mx-auto max-w-none px-5 sm:px-8 lg:px-14 2xl:px-20">
        <Kicker>The new world · in progress</Kicker>

        <div className="mt-4 max-w-[60rem]">
          <h2 className="font-display text-4xl font-semibold leading-[1.02] tracking-[-0.035em] text-foreground sm:text-5xl lg:text-6xl">
            The Credential Graph is what we&rsquo;re&nbsp;building.
          </h2>
          <p className="mt-7 text-lg leading-relaxed tracking-[-0.005em] text-muted-foreground sm:text-xl">
            Every credential a person earns should compose with every other —
            across issuers, across industries, across time. One graph. No
            gatekeeper. Here&rsquo;s the shape of it, and what it looks like
            today versus where we&rsquo;re going.
          </p>
        </div>

        <div className="mt-16 flex flex-col gap-12">
          {/* OLD WORLD */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[140px_1fr] lg:items-start lg:gap-12">
            <div className="pt-2">
              <p className="text-[13px] font-semibold text-muted-foreground">
                Today
              </p>
              <p className="mt-1 font-display text-[15px] font-semibold tracking-[-0.01em] text-foreground">
                Dead-end credentials
              </p>
            </div>
            <div>
              <GraphDiagram bars={oldWorldBars} subtle />
              <p className="mt-4 max-w-[68ch] text-[13px] leading-relaxed tracking-[-0.005em] text-muted-foreground">
                Three issuers. Three databases.{" "}
                <span className="font-medium text-foreground">
                  No shared edge.
                </span>{" "}
                A learner holding all three has to verify each one
                independently, through three phone calls or three bespoke
                integrations.
              </p>
            </div>
          </div>

          {/* NEW WORLD */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[140px_1fr] lg:items-start lg:gap-12">
            <div className="pt-2">
              <p className="text-[13px] font-semibold text-primary">
                The&nbsp;graph
              </p>
              <p className="mt-1 font-display text-[15px] font-semibold tracking-[-0.01em] text-primary">
                Composable
              </p>
            </div>
            <div>
              <GraphDiagram bars={newWorldBars} />
              <p className="mt-4 max-w-[68ch] text-[13px] leading-relaxed tracking-[-0.005em] text-muted-foreground">
                Same three issuers.{" "}
                <span className="font-medium text-foreground">
                  One shared edge across all of them
                </span>{" "}
                — the credential itself. Issuer C never talked to Issuer A;
                the protocol enforces the prerequisite anyway.
              </p>
            </div>
          </div>

          {/* STATUS CALLOUT */}
          <div className="grid grid-cols-1 gap-4 rounded-lg border border-border bg-background p-6 sm:grid-cols-[auto_1fr_auto] sm:items-center sm:gap-8">
            <span className="inline-flex items-center gap-2.5 text-[13px] font-semibold text-warning">
              <span
                className="h-2 w-2 rounded-full bg-warning"
                aria-hidden
              />
              Phase 1 · in development
            </span>
            <p className="text-[15px] font-medium leading-[1.5] tracking-[-0.01em] text-foreground">
              First two-issuer prerequisite chain shipping on Cardano this
              quarter. When it&rsquo;s live, this section will link to the
              chain itself.
            </p>
            <a
              href="mailto:hello@andamio.io?subject=Credential%20Graph%20updates"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary underline-offset-4 hover:underline"
            >
              Get updates <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
