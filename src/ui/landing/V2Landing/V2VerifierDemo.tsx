"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { fadeIn } from "./motion-variants";
import { Kicker, primaryBtnSm } from "./_ui";
import {
  SAMPLE_ID,
  VERIFIER_SCENARIOS,
  resolveScenario,
  type VerifierScenario,
  type VerifierTone,
} from "./verifier-demo-data";

const LOOKUP_MS = 600;

const toneStyles: Record<VerifierTone, string> = {
  verified: "border-success/40 bg-success/10 text-success",
  revoked: "border-destructive/40 bg-destructive/10 text-destructive",
  neutral: "border-border bg-muted text-muted-foreground",
};

type Phase = "idle" | "looking" | "result";

/** The on-chain data fields — the one honest use of monospace on this page. */
function DataRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <dt className="text-[11px] text-muted-foreground">{label}</dt>
      <dd className="font-mono text-[13px] text-foreground">{value}</dd>
    </div>
  );
}

function ResultCard({ scenario, lookedUpId }: { scenario: VerifierScenario; lookedUpId: string }) {
  const found = scenario.key !== "not-found";
  return (
    <div className="rounded-lg border border-border bg-background p-5" aria-live="polite">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="font-mono text-[13px] text-muted-foreground">
          {found ? scenario.credentialId : lookedUpId}
        </p>
        <span
          className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[12px] font-semibold ${toneStyles[scenario.tone]}`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden />
          {scenario.badgeLabel}
        </span>
      </div>

      {found && (
        <>
          <p className="mt-3 font-display text-lg font-semibold tracking-[-0.015em] text-foreground">
            {scenario.credentialName}
          </p>
          <dl className="mt-4 grid grid-cols-2 gap-4 border-t border-border pt-4 sm:grid-cols-4">
            <DataRow label="Issued by" value={scenario.issuer!} />
            <DataRow label="Holder controls" value={scenario.holder!} />
            <DataRow label="Block" value={scenario.anchor!.block} />
            <DataRow label="Transaction" value={scenario.anchor!.tx} />
          </dl>
        </>
      )}

      <p className="mt-4 text-[13px] leading-relaxed text-muted-foreground">{scenario.note}</p>
    </div>
  );
}

export default function V2VerifierDemo() {
  const reduce = useReducedMotion();
  const [inputId, setInputId] = React.useState(SAMPLE_ID);
  const [lookedUpId, setLookedUpId] = React.useState(SAMPLE_ID);
  const [phase, setPhase] = React.useState<Phase>("idle");
  const [scenario, setScenario] = React.useState<VerifierScenario | null>(null);
  const [showOldWay, setShowOldWay] = React.useState(false);
  const timerRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  const runLookup = (next: VerifierScenario, displayId: string) => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    setInputId(displayId);
    setLookedUpId(displayId);
    if (reduce) {
      setScenario(next);
      setPhase("result");
      return;
    }
    setPhase("looking");
    timerRef.current = window.setTimeout(() => {
      setScenario(next);
      setPhase("result");
    }, LOOKUP_MS);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    runLookup(resolveScenario(inputId), inputId.trim());
  };

  const revealVariants = fadeIn(8, 0.4);

  return (
    <div className="mt-2 rounded-lg border border-border bg-card/40 p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Kicker>Verify a credential</Kicker>
        <span className="rounded-full border border-border px-2 py-0.5 text-[11px] text-muted-foreground">
          Example data
        </span>
      </div>

      <form onSubmit={onSubmit} className="mt-4 flex flex-col gap-2 sm:flex-row">
        <label htmlFor="verifier-id" className="sr-only">
          Credential id
        </label>
        <input
          id="verifier-id"
          value={inputId}
          onChange={(e) => setInputId(e.target.value)}
          spellCheck={false}
          autoComplete="off"
          className="flex-1 rounded-md border border-border bg-background px-3.5 py-2.5 font-mono text-[14px] text-foreground placeholder:text-muted-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        />
        <button type="submit" className={primaryBtnSm}>
          Verify
        </button>
      </form>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="text-[13px] text-muted-foreground">Try:</span>
        {VERIFIER_SCENARIOS.map((s) => {
          const active = phase === "result" && scenario?.key === s.key;
          return (
            <button
              key={s.key}
              type="button"
              onClick={() => runLookup(s, s.credentialId)}
              aria-pressed={active}
              className={`rounded-md border px-3 py-1 text-[13px] font-medium transition-colors ${
                active
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground"
              }`}
            >
              {s.chipLabel}
            </button>
          );
        })}
      </div>

      <div className="mt-5 min-h-[72px]">
        {phase === "looking" && (
          <div className="flex items-center gap-2.5 rounded-lg border border-border bg-background px-5 py-5 text-[13px] text-muted-foreground">
            <span className="h-2 w-2 animate-pulse-slow rounded-full bg-primary" aria-hidden />
            Reading the chain…
          </div>
        )}

        {phase === "result" &&
          scenario &&
          (reduce ? (
            <ResultCard scenario={scenario} lookedUpId={lookedUpId} />
          ) : (
            <motion.div variants={revealVariants} initial="hidden" animate="visible">
              <ResultCard scenario={scenario} lookedUpId={lookedUpId} />
            </motion.div>
          ))}
      </div>

      {phase === "result" && (
        <p className="mt-4 text-[14px] font-medium text-foreground">
          This is a public read. No phone call, no PDF, no vendor API.
        </p>
      )}

      <div className="mt-4 border-t border-border pt-4">
        <button
          type="button"
          onClick={() => setShowOldWay((v) => !v)}
          aria-expanded={showOldWay}
          className="inline-flex items-center gap-1.5 text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <span
            aria-hidden
            className={`transition-transform duration-200 ${showOldWay ? "rotate-90" : ""}`}
          >
            ›
          </span>
          Compare the old way
        </button>

        {showOldWay && (
          <dl className="mt-3 grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-border bg-background p-4">
              <dt className="text-[12px] font-semibold text-muted-foreground">The old way</dt>
              <dd className="mt-1 text-[13px] leading-relaxed text-muted-foreground">
                Email the issuer&rsquo;s compliance desk, wait two or three days, get back a PDF you
                still have to trust.
              </dd>
            </div>
            <div className="rounded-lg border border-primary/40 bg-primary/[0.06] p-4">
              <dt className="text-[12px] font-semibold text-primary">A public read</dt>
              <dd className="mt-1 text-[13px] leading-relaxed text-foreground">
                Look it up. Answered in a second, by anyone, with nothing to trust but the record
                itself.
              </dd>
            </div>
          </dl>
        )}
      </div>
    </div>
  );
}
