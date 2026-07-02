"use client";

import React from "react";
import { WALKTHROUGH, type Archetype } from "./walkthrough-data";
import { primaryBtnSm, outlineBtnSm, ghostBtnSm } from "./_ui";
import { STEP_DEMOS } from "./step-demos";

const ARCHETYPE_ORDER: Archetype[] = ["cert", "partner", "cohort"];
const STORAGE_KEY = "andamio-wt";

const primaryBtn = primaryBtnSm;
const outlineBtn = outlineBtnSm;
const ghostBtn = ghostBtnSm;

export default function V2WalkthroughSection() {
  const [archetype, setArchetype] = React.useState<Archetype | null>(null);
  const [step, setStep] = React.useState<number>(0);

  React.useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw) as { archetype?: Archetype; step?: number };
      if (saved.archetype && saved.archetype in WALKTHROUGH) {
        setArchetype(saved.archetype);
        setStep(Math.min(Math.max(0, saved.step ?? 0), 3));
      }
    } catch {
      /* ignore */
    }
  }, []);

  React.useEffect(() => {
    if (!archetype) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ archetype, step }));
    } catch {
      /* ignore */
    }
  }, [archetype, step]);

  const selectArchetype = (next: Archetype) => {
    if (archetype !== next) {
      setArchetype(next);
      setStep(0);
    }
  };

  const entry = archetype ? WALKTHROUGH[archetype] : null;
  const currentStep = entry ? entry.steps[step] : null;
  const isLastStep = entry ? step === entry.steps.length - 1 : false;
  const StepDemo = currentStep?.demoId ? STEP_DEMOS[currentStep.demoId] : undefined;

  return (
    <section
      id="walkthrough-section"
      className="flex min-h-screen flex-col justify-center border-t border-border/60 bg-surface-subtle py-20 sm:py-24"
    >
      <div className="mx-auto max-w-none px-5 sm:px-8 lg:px-14 2xl:px-20">
        <div id="walkthrough">
          {/* Header */}
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-14">
            <div>
              <p className="text-sm font-semibold text-muted-foreground">
                Choose your archetype
              </p>
              <h3 className="mt-4 font-display text-[2.5rem] font-bold leading-[1.0] tracking-[-0.02em] text-foreground sm:text-6xl lg:text-7xl">
                Which describes you? We&rsquo;ll walk you through the first
                six months, in four steps
              </h3>
            </div>

            <div className="flex flex-wrap gap-2">
              {ARCHETYPE_ORDER.map((key) => {
                const e = WALKTHROUGH[key];
                const active = archetype === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => selectArchetype(key)}
                    className={`flex max-w-[240px] flex-col rounded-md border px-4 py-3 text-left text-[13px] tracking-[-0.005em] transition-colors duration-150 ${
                      active
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-background text-foreground hover:border-foreground/40 hover:bg-foreground/[0.04]"
                    }`}
                  >
                    <span
                      className={`mb-1 text-[12px] font-medium ${
                        active ? "text-primary-foreground/80" : "text-muted-foreground"
                      }`}
                    >
                      {e.chipKicker}
                    </span>
                    <span className="font-semibold">{e.chipLabel}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Stage */}
          <div className="mt-14 border-t border-border pt-12">
            {!entry && (
              <p className="py-16 text-center text-base text-muted-foreground">
                Pick one above to see the 4-step story tailored to your work.
              </p>
            )}

            {entry && currentStep && (
              <div className="grid gap-10 lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-14">
                {/* Step list (vertical on desktop) */}
                <div className="flex flex-wrap gap-1 lg:flex-col lg:gap-0">
                  {entry.steps.map((s, i) => {
                    const active = i === step;
                    const shortTitle = s.title.split(".")[0] + ".";
                    return (
                      <button
                        key={s.n}
                        type="button"
                        onClick={() => setStep(i)}
                        className={`flex flex-1 flex-col gap-1 border-l-2 px-4 py-3.5 text-left text-[13px] tracking-[-0.005em] transition-colors duration-150 lg:flex-initial ${
                          active
                            ? "border-l-primary bg-muted text-foreground"
                            : "border-l-border text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <span className="text-[12px] font-medium text-muted-foreground">
                          Step {s.n} · {s.k}
                        </span>
                        <span className="font-semibold">{shortTitle}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Panel */}
                <div className="min-h-[320px]">
                  <span className="text-[13px] font-semibold text-primary">
                    Step {currentStep.n} · {currentStep.k}
                  </span>
                  <h4 className="mt-3 font-display text-2xl font-semibold leading-[1.12] tracking-[-0.025em] text-foreground sm:text-[2rem]">
                    {currentStep.title}
                  </h4>
                  <p className="mt-5 max-w-[58ch] text-[17px] leading-[1.55] tracking-[-0.005em] text-muted-foreground">
                    {currentStep.lede}
                  </p>
                  <ul className="mt-7 grid gap-4">
                    {currentStep.bullets.map((b) => (
                      <li
                        key={b}
                        className="grid grid-cols-[24px_1fr] gap-3 text-[15px] leading-[1.55] tracking-[-0.005em] text-foreground"
                      >
                        <span aria-hidden className="font-medium text-primary">
                          →
                        </span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  {StepDemo && (
                    <div className="mt-7">
                      <StepDemo />
                    </div>
                  )}

                  <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
                    <span className="text-[13px] font-medium text-muted-foreground">
                      Step {step + 1} of {entry.steps.length}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {step > 0 && (
                        <button
                          type="button"
                          onClick={() => setStep((s) => Math.max(0, s - 1))}
                          className={ghostBtn}
                        >
                          Back
                        </button>
                      )}
                      {!isLastStep && (
                        <button
                          type="button"
                          onClick={() =>
                            setStep((s) =>
                              Math.min(entry.steps.length - 1, s + 1)
                            )
                          }
                          className={outlineBtn}
                        >
                          Next step →
                        </button>
                      )}
                      {isLastStep && (
                        <>
                          <a href={entry.cta.secondary.href} className={outlineBtn}>
                            {entry.cta.secondary.label}
                          </a>
                          <a href={entry.cta.href} className={primaryBtn}>
                            {entry.cta.label}
                          </a>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
