"use client";

/**
 * CredentialTheater — homepage interactive specimen shell.
 * Layers: presence → anatomy → lifecycle → intent (progressive, not simultaneous).
 */

import React, { useEffect, useState } from "react";
import { hero, EXTERNAL_LINKS, lifecycles, type LifecycleKey } from "~/ui/explore/content";
import { color, font, space } from "./tokens";
import {
  BADGE_FIELD_NOTES,
  type RingFocus,
} from "./proof-badge/field-notes";
import { DEFAULT_CREDENTIAL, ProofRingBadge } from "./proof-badge";
import { type FieldArc } from "./proof-badge/geometry";
import { Button, ButtonRow, Display } from "./kit";
import { ClaimFence } from "./ClaimFence";
import { OrbitSteps } from "./instrument";
import { persistIntent, readIntent } from "./funnel-intent";
import { track } from "~/lib/analytics";
import {
  FadeSwap,
  LayoutMark,
  useMotionGate,
} from "./motion";
import { GETTING_STARTED } from "./proof-badge/getting-started";

/** Inspector zones that have a matching highlight arc on the live badge. */
const FOCUS_TO_ARC: Partial<Record<Exclude<RingFocus, null>, FieldArc>> = {
  did: "did",
  courseId: "courseId",
  sltHash: "hash",
};

const INSPECTOR_ZONES: { id: Exclude<RingFocus, null>; label: string }[] = [
  { id: "outer", label: "Outer ring" },
  { id: "inner", label: "Inner ring" },
  { id: "brand", label: "Brand" },
  { id: "course", label: "Course" },
  { id: "module", label: "Module" },
  { id: "earner", label: "Earner" },
  { id: "did", label: "DID" },
  { id: "issued", label: "Issued" },
  { id: "network", label: "Network" },
  { id: "skills", label: "Skills" },
  { id: "courseId", label: "Course ID" },
  { id: "sltHash", label: "SLT hash" },
  { id: "qr", label: "Verify QR" },
  { id: "core", label: "Meaning" },
];

const INTENTS = [
  {
    key: "issuer" as const,
    label: "I need to issue better credentials.",
    href: "/issuer",
  },
  {
    key: "builder" as const,
    label: "I want to build with this.",
    href: "/developers",
  },
  {
    key: "curious" as const,
    label: "I want the principles / story.",
    href: "/show-me",
  },
];

function RingInspector({
  focus,
  onFocus,
}: {
  focus: RingFocus;
  onFocus: (z: RingFocus) => void;
}) {
  const note = focus ? (BADGE_FIELD_NOTES[focus] ?? null) : null;
  const p = GETTING_STARTED.params;
  const fullValue =
    focus === "courseId"
      ? p.courseId
      : focus === "sltHash"
        ? p.sltHash
        : focus === "did"
          ? p.did
          : null;

  return (
    <div className="space-y-4">
      <p
        className="text-[11px] font-medium tracking-[0.14em]"
        style={{ color: color.inkFaint, fontFamily: font.mono }}
      >
        LOOK INSIDE
      </p>
      <div className={`flex flex-wrap ${space.gapButtons}`}>
        {INSPECTOR_ZONES.map((z) => {
          const active = focus === z.id;
          return (
            <button
              key={z.id}
              type="button"
              onClick={() => onFocus(active ? null : z.id)}
              className="sys-control-press relative px-3 py-2 text-[12px] font-semibold tracking-[-0.01em] transition-[transform,box-shadow,background,border-color] duration-200"
              style={{
                border: `1px solid ${active ? color.orange : "rgb(var(--sys-ink-rgb) / 0.18)"}`,
                color: active ? color.orange : color.inkMuted,
                boxShadow: active
                  ? color.controlShadow
                  : "inset 0 1px 0 rgb(var(--sys-ink-rgb) / 0.04)",
                background: active
                  ? "rgb(255 107 53 / 0.08)"
                  : "rgb(var(--sys-ink-rgb) / 0.03)",
              }}
              aria-pressed={active}
            >
              {active && (
                <LayoutMark
                  layoutId="theater-ring-focus"
                  className="pointer-events-none absolute inset-0"
                  style={{
                    border: `1px solid ${color.orange}`,
                    background: "rgb(255 107 53 / 0.06)",
                  }}
                />
              )}
              <span className="relative z-[1]">{z.label}</span>
            </button>
          );
        })}
      </div>
      <div
        aria-live="polite"
        className="min-h-[5.5rem] border-t pt-4"
        style={{ borderColor: color.cell }}
      >
        {note && (
          <div>
            <p className="text-[14px] font-semibold tracking-[-0.01em]">
              {note.label}
            </p>
            <p
              className="mt-1 text-[11px] tracking-[0.06em]"
              style={{ color: color.inkFaint, fontFamily: font.mono }}
            >
              {note.sub}
            </p>
            <p
              className="mt-3 text-[14px] leading-relaxed"
              style={{ color: color.inkMuted }}
            >
              {note.body}
            </p>
            {fullValue && (
              <p
                className="mt-3 break-all text-[11px] leading-relaxed"
                style={{ color: color.ink, fontFamily: font.mono }}
              >
                {fullValue}
              </p>
            )}
          </div>
        )}
        {!focus && (
          <p
            className="text-[14px] leading-relaxed"
            style={{ color: color.inkMuted }}
          >
            Select a field to see what it encodes. Short IDs on the face copy as
            full hex; the QR opens this credential's public record.
          </p>
        )}
      </div>
    </div>
  );
}

const LIFECYCLE_KEYS = ["earner", "organization", "developer"] as const satisfies readonly LifecycleKey[];

function LifecycleTabs() {
  const [who, setWho] = useState<LifecycleKey>("earner");
  const [step, setStep] = useState(0);
  const cycle = lifecycles[who];
  return (
    <div>
      <div role="tablist" aria-label="Whose lifecycle" className={`flex flex-wrap ${space.gapTight}`}>
        {LIFECYCLE_KEYS.map((key) => {
          const on = key === who;
          return (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={on}
              onClick={() => {
                setWho(key);
                setStep(0);
                track("lifecycle-tab");
              }}
              className="border px-3 py-1.5 text-[12px] font-semibold tracking-[-0.01em] transition-colors focus:outline-none focus-visible:[box-shadow:inset_0_0_0_1.5px_var(--sys-cyan)]"
              style={{
                borderColor: on ? color.cyan : color.cell,
                color: on ? color.ink : color.inkFaint,
                background: on ? "rgb(63 217 232 / 0.08)" : "transparent",
              }}
            >
              {lifecycles[key].label}
            </button>
          );
        })}
      </div>
      <p className="mt-3 text-[13px]" style={{ color: color.inkMuted }}>
        {cycle.audience}
      </p>
      <OrbitSteps
        key={who}
        className="mt-6"
        label={`${cycle.label} lifecycle`}
        steps={cycle.steps}
        active={step}
        onActiveChange={setStep}
      />
    </div>
  );
}
export function IntentContinue({
  onChoose,
}: {
  onChoose?: (key: (typeof INTENTS)[number]["key"]) => void;
}) {
  return (
    <div>
      <p
        className="text-[11px] font-medium tracking-[0.14em]"
        style={{ color: color.inkFaint, fontFamily: font.mono }}
      >
        CONTINUE
      </p>
      <p
        className="mt-3 text-[15px] leading-relaxed"
        style={{ color: color.inkMuted }}
      >
        When you are ready, choose what you want next.
      </p>
      <div className={`mt-6 flex flex-col ${space.gapButtons}`}>
        {INTENTS.map((intent) => (
          <Button
            key={intent.key}
            variant="outline"
            href={intent.href}
            onClick={() => {
              persistIntent(intent.key);
              onChoose?.(intent.key);
            }}
            full
          >
            {intent.label} <span aria-hidden>→</span>
          </Button>
        ))}
      </div>
    </div>
  );
}

export function PathModule({ intent }: { intent: string | null }) {
  if (!intent) return null;

  const copy =
    intent === "issuer"
      ? {
          title: "Issue credentials that outlive the vendor.",
          body: "See how define, evidence, review, and claim become a credential you can verify — then book a walkthrough when you want the real product conversation.",
          primary: { label: "See how it works", href: "/issuer#how-it-works" },
          secondary: {
            label: "Book a walkthrough",
            href: EXTERNAL_LINKS.walkthroughMailto,
          },
        }
      : intent === "builder"
        ? {
            title: "Build on the same credential primitives.",
            body: "REST endpoints, docs, and tools — quieter than the issuer path, but the same artifact underneath.",
            primary: { label: "Build on Andamio", href: "/developers" },
            secondary: {
              label: "API reference",
              href: EXTERNAL_LINKS.apiReference,
            },
          }
        : {
            title: "The principles, without the pitch.",
            body: "A short narrative on use, how it is built, and why ownership and proof matter.",
            primary: { label: "Show me the story", href: "/show-me" },
            secondary: { label: "Read the papers", href: "/papers" },
          };

  return (
    <div className="border-t pt-14" style={{ borderColor: color.rule }}>
      <div aria-live="polite">
        <Display as="h2" size="lg">
          {copy.title}
        </Display>
        <p
          className="mt-4 max-w-[58ch] text-lg leading-relaxed"
          style={{ color: color.inkMuted }}
        >
          {copy.body}
        </p>
        <div className="mt-10">
          <ButtonRow>
            <Button variant="primary" href={copy.primary.href}>
              {copy.primary.label} <span aria-hidden>→</span>
            </Button>
            <Button variant="outline" href={copy.secondary.href}>
              {copy.secondary.label}
            </Button>
          </ButtonRow>
        </div>
      </div>
    </div>
  );
}

export default function CredentialTheater() {
  const reduce = useMotionGate();
  const [focus, setFocus] = useState<RingFocus>(null);
  const [layer, setLayer] = useState<"inspect" | "lifecycle" | "intent">(
    "inspect",
  );
  const [intent, setIntent] = useState<string | null>(null);

  useEffect(() => {
    setIntent(readIntent());
  }, []);

  return (
    <div className="grid grid-cols-12 items-start gap-y-10 pb-10 pt-6 sm:pt-10 lg:gap-x-12">
      <div className="col-span-12 lg:col-span-5 lg:pt-4">
        <Display as="h1" size="xl">
          {hero.headlineLead} {hero.headlineAccent}
        </Display>
        <p
          className="mt-6 max-w-[42ch] text-lg leading-relaxed sm:text-xl"
          style={{ color: color.inkMuted }}
        >
          {hero.supportLine ?? hero.manifesto[0]}
        </p>
        <div className="mt-10">
          <ButtonRow>
            <Button variant="primary" href={hero.showMeCta.href}>
              {hero.showMeCta.label} <span aria-hidden>→</span>
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setLayer("inspect");
                document
                  .getElementById("credential-teach")
                  ?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
              }}
            >
              Look inside
            </Button>
          </ButtonRow>
        </div>
      </div>

      <div className="col-span-12 lg:col-span-7">
        <figure
          className="credential-spotlight group relative flex flex-col items-center justify-center"
          aria-label={hero.badgeAlt}
        >
          {/* Soft scaffold bloom behind the badge — no card, no hard edges */}
          <div
            className="credential-aura pointer-events-none absolute inset-0"
            aria-hidden
          >
            <div className="credential-aura-core" />
            <div className="credential-aura-ring" />
            <div className="credential-aura-beam credential-aura-beam-a" />
            <div className="credential-aura-beam credential-aura-beam-b" />
          </div>

          <div className="relative z-[1] -mx-5 flex w-[calc(100%+2.5rem)] items-center justify-center py-4 sm:mx-0 sm:w-full sm:px-4 sm:py-6">
            <ProofRingBadge
              credential={DEFAULT_CREDENTIAL}
              className="w-[min(100%,40rem,max(calc(100svh-10rem),20rem))]"
              showcasePhrases
              highlight={focus ? (FOCUS_TO_ARC[focus] ?? null) : null}
              priority
            />
          </div>
          <figcaption
            className="relative z-[1] mt-1 max-w-[46ch] text-center text-[13px] leading-relaxed"
            style={{ color: color.inkMuted }}
          >
            {hero.badgeCaption}
          </figcaption>
        </figure>
      </div>

      <div
        id="credential-teach"
        className="col-span-12 scroll-mt-24 border-t pt-8 sm:pt-10"
        style={{ borderColor: color.rule }}
      >
        <div className={`mb-8 flex flex-wrap ${space.gapButtons}`}>
          {(
            [
              { id: "inspect" as const, label: "Anatomy" },
              { id: "lifecycle" as const, label: "Lifecycle" },
              { id: "intent" as const, label: "Your path" },
            ] as const
          ).map((tab) => {
            const active = layer === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setLayer(tab.id)}
                className="sys-control-press relative px-4 py-2.5 text-[13px] font-semibold tracking-[-0.01em] transition-[transform,box-shadow,background] duration-200"
                style={{
                  border: `1px solid ${active ? "rgb(var(--sys-ink-rgb) / 0.28)" : "rgb(var(--sys-ink-rgb) / 0.12)"}`,
                  color: active ? color.ink : color.inkFaint,
                  boxShadow: active
                    ? color.controlShadow
                    : "inset 0 1px 0 rgb(var(--sys-ink-rgb) / 0.04)",
                  background: active
                    ? "rgb(var(--sys-ink-rgb) / 0.06)"
                    : "rgb(var(--sys-ink-rgb) / 0.02)",
                }}
                aria-pressed={active}
              >
                {active && (
                  <LayoutMark
                    layoutId="theater-layer-tab"
                    className="pointer-events-none absolute inset-0"
                    style={{
                      border: "1px solid rgb(var(--sys-ink-rgb) / 0.28)",
                      background: "rgb(var(--sys-ink-rgb) / 0.05)",
                    }}
                  />
                )}
                <span className="relative z-[1]">{tab.label}</span>
              </button>
            );
          })}
        </div>

        <FadeSwap
          swapKey={layer}
          className="grid grid-cols-1 gap-10 lg:grid-cols-12"
        >
          <div className="lg:col-span-7">
            {layer === "inspect" && (
              <RingInspector focus={focus} onFocus={setFocus} />
            )}
            {layer === "lifecycle" && (
              <LifecycleTabs />
            )}
            {layer === "intent" && (
              <IntentContinue
                onChoose={(key) => {
                  setIntent(key);
                }}
              />
            )}
          </div>
          <div className="lg:col-span-5">
            <ClaimFence>
              A real credential on Cardano mainnet. Field focus is a teaching
              overlay; the QR and IDs point at its public record. Nothing here mints.
            </ClaimFence>
          </div>
        </FadeSwap>

        <PathModule intent={intent} />
      </div>
    </div>
  );
}
