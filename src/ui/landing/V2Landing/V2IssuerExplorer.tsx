"use client";

import React from "react";
import { primaryBtnClass, outlineBtnClass } from "./_ui";
import { EXTERNAL_LINKS } from "~/lib/external-links";

type Key = "cohort" | "cert" | "platform";

interface Evidence {
  label: string;
  href: string;
}
interface Step {
  name: string;
  lede: string;
  points: string[];
  evidence?: Evidence[];
}
interface Archetype {
  label: string;
  qualifier: string;
  steps: Step[]; // four steps to get started, named by what happens, not when
}

const ORDER: Key[] = ["cohort", "cert", "platform"];

const ARCHETYPES: Record<Key, Archetype> = {
  cert: {
    label: "Certification",
    qualifier: "You run a certification program. The credential has to hold up.",
    steps: [
      {
        name: "The problem",
        lede: "Your certs live in a vendor’s platform, and you don’t own the data.",
        points: [
          "Fake PDFs are easy to make, and hard to disprove.",
          "The badges aren’t machine-readable.",
          "A price hike or a vendor change puts the whole program at risk.",
        ],
        evidence: [
          {
            label: "Accredible — 2025 State of Credentialing Report",
            href: "https://www.accredible.com/reports/2025-state-of-credentialing-report",
          },
          {
            label: "StandOutCV — how many people lie on a resume",
            href: "https://standout-cv.com/usa/stats-usa/study-fake-job-references-resume-lies",
          },
        ],
      },
      {
        name: "The shift",
        lede: "Add a verification layer on top of the program you already run.",
        points: [
          "It runs alongside your current system, with no day-one migration.",
          "You own the data, and you own the certs.",
          "Anyone can check a credential without calling you.",
        ],
      },
      {
        name: "Your first credential",
        lede: "Start with one certification line, alongside your current flow.",
        points: [
          "Define what it certifies, down to the targets it proves.",
          "Issue it through the API, with no new tool for your team.",
          "The people you certify never touch crypto.",
        ],
      },
      {
        name: "What you’re left with",
        lede: "A credential that can’t be faked, and that you own for good.",
        points: [
          "It proves which targets were met, not just a pass.",
          "It outlives any vendor, including us.",
          "Holders carry it anywhere it’s useful.",
        ],
      },
    ],
  },
  platform: {
    label: "Platform operators",
    qualifier: "You run a platform others teach on. Recognition should travel.",
    steps: [
      {
        name: "The problem",
        lede: "The credentials your users earn die the day they leave your platform.",
        points: [
          "Recognition is trapped inside your walls.",
          "You depend on a credentialing vendor you don’t control.",
          "Your users walk away with nothing that travels.",
        ],
        evidence: [
          {
            label: "Accredible — 2025 State of Credentialing Report",
            href: "https://www.accredible.com/reports/2025-state-of-credentialing-report",
          },
        ],
      },
      {
        name: "The shift",
        lede: "Give your community recognition that travels beyond the platform.",
        points: [
          "Issue credentials your users actually own.",
          "Embed it as your own, through a clean API and a public badge page.",
          "Your platform gets more valuable to the clients you serve.",
        ],
      },
      {
        name: "Your first credential",
        lede: "Wire issuing into the moment a user finishes their work.",
        points: [
          "Your content owners define what their credentials mean.",
          "Each user gets a credential they carry anywhere.",
          "Users never touch crypto.",
        ],
      },
      {
        name: "What you’re left with",
        lede: "Portable recognition is something your platform now offers.",
        points: [
          "Users keep what they earned, for good.",
          "Anyone can verify it directly.",
          "The recognition you give travels everywhere your users go.",
        ],
      },
    ],
  },
  cohort: {
    label: "Cohort training",
    qualifier: "You run a cohort or practicum. The credential is the product.",
    steps: [
      {
        name: "The problem",
        lede: "Your graduates finish real work, but the proof is a PDF an employer can’t check.",
        points: [
          "There’s no machine-readable proof of which outcomes they hit.",
          "The recognition stays trapped in your own bubble.",
          "You pay for nothing an employer actually trusts.",
        ],
        evidence: [
          {
            label: "Accredible — 2025 State of Credentialing Report",
            href: "https://www.accredible.com/reports/2025-state-of-credentialing-report",
          },
        ],
      },
      {
        name: "The shift",
        lede: "You become the issuer, and the credential is proof of shipped work any employer can verify.",
        points: [
          "It records which targets a graduate met, not just that they finished.",
          "Anyone can check it without calling you.",
          "Your graduates never touch crypto.",
        ],
      },
      {
        name: "Your first credential",
        lede: "Start with your completion credential for one cohort.",
        points: [
          "Define what it certifies, and issue it from the tools you already use.",
          "Each graduate gets a credential they own.",
          "You keep the data, and you keep the standard.",
        ],
      },
      {
        name: "What you’re left with",
        lede: "A credential you issued gets verified by someone you never coordinated with.",
        points: [
          "Graduates carry it anywhere, even after the cohort ends.",
          "Employers verify it directly.",
          "Your program’s recognition travels beyond your bubble.",
        ],
      },
    ],
  },
};

export default function V2IssuerExplorer() {
  const [key, setKey] = React.useState<Key>("cohort");
  const [step, setStep] = React.useState(0);

  const entry = ARCHETYPES[key];
  const current = entry.steps[step] ?? entry.steps[0]!;
  const isLast = step === entry.steps.length - 1;

  const select = (k: Key) => {
    if (k !== key) {
      setKey(k);
      setStep(0);
    }
  };

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
            How do you use credentials?
          </p>
        </div>

        {/* Archetype selectors */}
        <div className="mt-16 grid gap-4 lg:grid-cols-3">
          {ORDER.map((k) => {
            const a = ARCHETYPES[k];
            const active = k === key;
            return (
              <button
                key={k}
                type="button"
                onClick={() => select(k)}
                className={`flex flex-col rounded-lg border p-6 text-left transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                  active
                    ? "border-primary bg-primary/[0.06]"
                    : "border-border bg-background hover:border-foreground/40"
                }`}
              >
                <span className="font-display text-2xl font-bold tracking-[-0.015em] text-foreground sm:text-3xl">
                  {a.label}
                </span>
                <span className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
                  {a.qualifier}
                </span>
              </button>
            );
          })}
        </div>

        {/* Interactive slides */}
        <div className="mt-16 border-t border-border pt-12">
          {/* Progress tabs */}
          <div className="flex flex-wrap gap-2">
            {entry.steps.map((s, i) => {
              const active = i === step;
              return (
                <button
                  key={s.name}
                  type="button"
                  onClick={() => setStep(i)}
                  className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors duration-150 ${
                    active
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground"
                  }`}
                >
                  <span className="font-semibold tabular-nums">0{i + 1}</span>
                  <span className="font-medium">{s.name}</span>
                </button>
              );
            })}
          </div>

          {/* Slide */}
          <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-20">
            <h3 className="font-display text-3xl font-bold leading-[1.08] tracking-[-0.02em] text-foreground sm:text-4xl lg:text-5xl">
              {current.lede.replace(/\.$/, "")}
            </h3>

            <div>
              <ul className="grid gap-5">
                {current.points.map((p) => (
                  <li
                    key={p}
                    className="grid grid-cols-[24px_1fr] gap-3 text-[17px] leading-[1.5] text-foreground"
                  >
                    <span aria-hidden className="font-medium text-primary">
                      →
                    </span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>

              {current.evidence && current.evidence.length > 0 && (
                <div className="mt-10 border-t border-border pt-5">
                  <p className="text-sm font-semibold text-muted-foreground">
                    Evidence
                  </p>
                  <ul className="mt-3 flex flex-col gap-2">
                    {current.evidence.map((e) => (
                      <li key={e.href}>
                        <a
                          href={e.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-[15px] font-medium text-primary underline-offset-4 hover:underline"
                        >
                          {e.label}
                          <span aria-hidden>↗</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Slide nav + CTA ladder */}
          <div className="mt-14 flex flex-wrap items-center justify-between gap-6 border-t border-border pt-6">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                disabled={step === 0}
                className={`${outlineBtnClass} disabled:cursor-not-allowed disabled:opacity-40`}
              >
                ← Back
              </button>
              {!isLast && (
                <button
                  type="button"
                  onClick={() => setStep((s) => Math.min(entry.steps.length - 1, s + 1))}
                  className={primaryBtnClass}
                >
                  Next →
                </button>
              )}
              <span className="text-[13px] font-medium text-muted-foreground tabular-nums">
                {step + 1} / {entry.steps.length}
              </span>
            </div>

            {/* CTA ladder: explore hands-on first, book only at the end.
                Email -> PDF report is a future feature (placeholder for now). */}
            <div className="flex flex-wrap items-center gap-3">
              {!isLast ? (
                <a
                  href={EXTERNAL_LINKS.app}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={outlineBtnClass}
                >
                  Try it yourself
                </a>
              ) : (
                <>
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
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
