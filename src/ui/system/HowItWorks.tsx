"use client";

/**
 * HowItWorks — "Issuing takes three steps" as ONE demo card whose header
 * ("Learn how an Andamio Credential Badge works" + a live pulse) stays constant,
 * with the three steps (Define · Issue · Verify) as tabs INSIDE the card, right
 * below the header. The card body swaps between three mini-demos; the REAL
 * Getting Started with Andamio badge (the landing hero's fig. 1) stays on
 * screen across all three — the landing presents it, this demo customizes it:
 *   Define → the real BadgeBuilder, rendered bare (chrome={false})
 *   Issue  → example evidence (assignment commitment) → press Issue → badge minted.
 *            The evidence stays in the customer's system; only the credential is
 *            on-chain (called out in the pane).
 *   Verify → look up the credential address → verified on-chain.
 * Issue + Verify are illustrative (no live API); Define is the wired builder.
 */

import React, { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { BadgeInfoFooter } from "./BadgeInfoFooter";
import { GETTING_STARTED } from "./proof-badge/getting-started";
import { credentialFromBuilder, ProofRingBadge } from "./proof-badge";
import { color, font } from "./tokens";
import { ClaimFence } from "./ClaimFence";
import { LayoutMark } from "./motion";
import { useNearViewport } from "./useNearViewport";

const mono = { fontFamily: font.mono };
const sans = { fontFamily: font.sans };
const NUMS = ["01", "02", "03"];
const BLUE = "var(--sys-cyan)"; // the system's data / confirmed accent

// The credential's FULL on-chain address (<course_id>.<slt_hash>). Rule
// (James, 2026-07-02): never truncate a credential address — the whole point
// is that it can be validated, and a truncated address can't be.
const REAL_ADDR = `${GETTING_STARTED.params.courseId}.${GETTING_STARTED.params.sltHash}`;

const GETTING_STARTED_CREDENTIAL = credentialFromBuilder({
  course: GETTING_STARTED.params.courseTitle,
  module: GETTING_STARTED.params.moduleTitle,
  courseId: GETTING_STARTED.params.courseId,
  sltHash: GETTING_STARTED.params.sltHash,
  network: GETTING_STARTED.params.network,
  earnerName: GETTING_STARTED.params.earnerName,
  issuerDid: GETTING_STARTED.params.did,
  issuedAt: GETTING_STARTED.params.issuedAt,
  skills: (GETTING_STARTED.params.skills ?? []).map((s) => s.label),
  verifyUrl: GETTING_STARTED.params.verifyUrl,
});

type Step = { title: string; body: string };

/** Same footprint as the tallest pane (Define), so mounting the demos never shifts the page. */
function PaneSkeleton() {
  return (
    <div
      aria-hidden
      className="min-h-[1180px] border-y sm:min-h-[1080px] lg:min-h-[620px]"
      style={{ borderColor: color.cell }}
    />
  );
}

const BadgeBuilder = dynamic(() => import("./BadgeBuilder"), {
  ssr: false,
  loading: PaneSkeleton,
});

/** React 18 types omit `inert`; set/remove the HTML attribute via the DOM. */
function setInert(el: HTMLElement | null, inert: boolean) {
  if (!el) return;
  if (inert) el.setAttribute("inert", "");
  else el.removeAttribute("inert");
}

export default function HowItWorks({
  heading,
  steps,
  demo,
  active: controlled,
  onActiveChange,
}: {
  heading: string;
  steps: readonly Step[];
  demo: { title: string; note: string; liveLabel: string };
  /** Controlled pane index (e.g. synced to an OrbitSteps lifecycle). */
  active?: number;
  onActiveChange?: (index: number) => void;
}) {
  const [own, setOwn] = useState(0);
  const active = controlled ?? own;
  const setActive = useCallback(
    (i: number) => {
      if (controlled === undefined) setOwn(i);
      onActiveChange?.(i);
    },
    [controlled, onActiveChange],
  );
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const paneRefs = useRef<Array<HTMLDivElement | null>>([]);
  const panesRef = useRef<HTMLDivElement>(null);
  const panesNear = useNearViewport(panesRef);

  // Keep inactive panes out of the a11y/tab order while preserving the
  // visibility layout trick that sizes the card to the tallest pane.
  useEffect(() => {
    paneRefs.current.forEach((el, i) => setInert(el, i !== active));
  }, [active, steps.length, panesNear]);

  const selectTab = useCallback(
    (index: number, focus = false) => {
      const next = Math.max(0, Math.min(steps.length - 1, index));
      setActive(next);
      if (focus) tabRefs.current[next]?.focus();
    },
    [steps.length, setActive],
  );

  const onTabKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
      const last = steps.length - 1;
      let next: number | null = null;
      switch (e.key) {
        case "ArrowRight":
          next = index === last ? 0 : index + 1;
          break;
        case "ArrowLeft":
          next = index === 0 ? last : index - 1;
          break;
        case "Home":
          next = 0;
          break;
        case "End":
          next = last;
          break;
        default:
          return;
      }
      e.preventDefault();
      selectTab(next, true);
    },
    [selectTab, steps.length],
  );

  const tablistLabel = heading || "Issuing steps";

  return (
    <>
      {/* Section heading */}
      {heading ? (
        <div className="border-t pt-8" style={{ borderColor: color.rule }}>
          <span className="text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
            {heading}
          </span>
        </div>
      ) : null}

      {/* The demo card — header, then tabs, then the active pane, all inside one
          bordered card. Theme-aware (follows the app's light/dark). ────────── */}
      <div className="mt-10 pb-12 pt-8 sm:pb-16 sm:pt-10">
        <div
          className="m-0 border"
          style={{
            borderColor: color.rule,
            background: color.paper,
            boxShadow: color.cardShadow,
          }}
        >
          {/* Card header — constant across tabs */}
          <div
            className="flex items-start justify-between gap-4 border-b px-4 py-3"
            style={{ borderColor: color.rule }}
          >
            <h2
              className="min-w-0 text-[19px] leading-tight sm:text-[22px]"
              style={{
                ...sans,
                fontWeight: 600,
                letterSpacing: "-0.02em",
                color: color.ink,
              }}
            >
              {demo.title}
            </h2>
            <span
              className="inline-flex shrink-0 items-center gap-2 pt-1 text-[11px] font-semibold tracking-[-0.01em]"
              style={{ color: color.inkFaint }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: color.orange }}
              />
              {demo.liveLabel}
            </span>
          </div>
          <div
            className="border-b px-4 py-2"
            style={{ borderColor: color.cell }}
          >
            <ClaimFence>{demo.note}</ClaimFence>
          </div>

          {/* Tabs — WAI-ARIA tablist (A11Y-02); Left/Right/Home/End move selection. */}
          <div
            role="tablist"
            aria-label={tablistLabel}
            className="grid grid-cols-3 gap-px border-b"
            style={{ background: color.cell, borderColor: color.rule }}
          >
            {steps.map((s, i) => {
              const on = i === active;
              return (
                <button
                  key={s.title}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`hiw-tab-${i}`}
                  aria-controls={`hiw-panel-${i}`}
                  aria-selected={on}
                  tabIndex={on ? 0 : -1}
                  onClick={() => selectTab(i)}
                  onKeyDown={(e) => onTabKeyDown(e, i)}
                  className="relative flex items-baseline gap-2 px-3 py-3 text-left transition-colors sm:gap-3 sm:px-5 sm:py-4"
                  style={{
                    background: color.paper,
                    borderBottom: "2px solid transparent",
                  }}
                >
                  {on && (
                    <LayoutMark
                      layoutId="hiw-tab-underline"
                      className="pointer-events-none absolute bottom-0 left-0 right-0 h-[2px]"
                      style={{ background: color.orange }}
                    />
                  )}
                  <span
                    className="relative z-[1] text-xl font-semibold tabular-nums leading-none sm:text-2xl"
                    style={{ color: on ? color.orange : color.inkWatermark }}
                  >
                    {NUMS[i]}
                  </span>
                  <span
                    className="relative z-[1] text-[14px] font-semibold tracking-[-0.02em] sm:text-[15px]"
                    style={{ color: on ? color.ink : color.inkMuted }}
                  >
                    {s.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active step caption */}
          <p
            className="px-4 pt-4 text-[14px] leading-relaxed sm:px-5"
            style={{ color: color.inkMuted }}
          >
            {steps[active]?.body}
          </p>

          {/* Panes — stacked in one grid cell so height = tallest (Define).
              Visibility (not display) preserves layout; inert + aria-hidden
              keep inactive panes out of the a11y tree / tab order. */}
          <div ref={panesRef} className="grid [&>*]:col-start-1 [&>*]:row-start-1">
            {!panesNear && <PaneSkeleton />}
            {panesNear && steps.map((s, i) => {
              const on = i === active;
              return (
                <div
                  key={s.title}
                  ref={(el) => {
                    paneRefs.current[i] = el;
                  }}
                  role="tabpanel"
                  id={`hiw-panel-${i}`}
                  aria-labelledby={`hiw-tab-${i}`}
                  aria-hidden={!on}
                  className={`h-full ${on ? "" : "invisible"}`}
                >
                  {i === 0 && <BadgeBuilder chrome={false} />}
                  {i === 1 && <IssueDemo />}
                  {i === 2 && <VerifyDemo />}
                </div>
              );
            })}
          </div>

          {/* Shared footer — the ring-anatomy chips + address, on every tab. */}
          <BadgeInfoFooter />
        </div>
      </div>
    </>
  );
}

/* ── The static badge, rendered from the generated SVG (non-editable). ─────── */
function StaticBadge() {
  return (
    <div className="relative mx-auto w-full max-w-[340px]">
      <ProofRingBadge
        credential={GETTING_STARTED_CREDENTIAL}
        showcasePhrases={false}
        intro={false}
      />
    </div>
  );
}

/* ── Bare pane wrapper (the card supplies the border) ──────────────────────── */
function Pane({ children }: { children: React.ReactNode }) {
  return <div className="h-full p-4 sm:p-6">{children}</div>;
}

const runBtn =
  "mt-5 border px-4 py-2 text-[13px] font-semibold transition-opacity hover:opacity-70";

/* ── 02 · Issue — example evidence → press Issue → the badge is minted. ────── */
function IssueDemo() {
  const [issued, setIssued] = React.useState(false);
  return (
    <Pane>
      <div className="grid items-start gap-8 sm:grid-cols-2">
        {/* Left — the learner's evidence, inside a "your system" container so
            the private / off-Andamio boundary is tangible (diploma vs. exam). */}
        <div>
          <div className="border" style={{ borderColor: color.cell }}>
            <div
              className="flex items-center justify-between border-b px-3 py-2"
              style={{ borderColor: color.cell }}
            >
              <span
                className="text-[12px] font-medium tracking-[-0.01em]"
                style={{ color: color.inkFaint }}
              >
                Your system
              </span>
              <span
                className="text-[11px] font-medium tracking-[-0.01em]"
                style={{ color: color.inkFaint }}
              >
                private · not on Andamio
              </span>
            </div>
            <div className="p-4">
              <p
                className="text-[12px] font-medium tracking-[-0.01em]"
                style={{ color: color.inkFaint }}
              >
                Assignment commitment
              </p>
              <p
                className="mt-2 text-[14px] font-semibold"
                style={{ color: color.ink }}
              >
                Mint Access Token and Commit to Assignment — submitted evidence
              </p>
              <ul
                className="mt-2 space-y-1.5 text-[13px]"
                style={{ color: color.inkMuted }}
              >
                <li>• Screenshot — Access Token minted in the app</li>
                <li>• Link — the commitment transaction</li>
                <li>• Note — "Committed to the module assignment."</li>
              </ul>
            </div>
          </div>
          <p
            className="mt-3 text-[12px] leading-relaxed"
            style={{ color: color.inkFaint }}
          >
            The evidence stays in your system, not on Andamio. Only the
            credential goes on-chain.
          </p>
          <button
            type="button"
            className={runBtn}
            style={{ borderColor: color.ink, color: color.ink }}
            onClick={() => setIssued(true)}
          >
            Issue credential
          </button>
        </div>

        {/* Right — the badge, minted on issue */}
        <div>
          <div
            className="transition-opacity duration-500"
            style={{ opacity: issued ? 1 : 0.15 }}
          >
            <StaticBadge />
          </div>
          <p
            className="mt-3 text-center text-[13px] font-semibold"
            style={{ color: issued ? BLUE : color.inkFaint }}
          >
            {issued ? "Issued ✓ (illustrative)" : "Awaiting issue"}
          </p>
          {issued && (
            <>
              <p
                className="mx-auto mt-2 max-w-[340px] break-all text-center text-[11px] leading-relaxed"
                style={{ ...mono, color: color.inkMuted }}
              >
                {REAL_ADDR}
              </p>
              <div className="mt-3 flex justify-center">
                <ClaimFence>Local UI state only — not a live mint.</ClaimFence>
              </div>
            </>
          )}
        </div>
      </div>
    </Pane>
  );
}

/* ── 03 · Verify — look up the credential address, verify on-chain. ───────── */
function VerifyDemo() {
  const [verified, setVerified] = React.useState(false);
  return (
    <Pane>
      <div className="grid items-center gap-8 sm:grid-cols-2">
        {/* Left — verify (badge kept on the right to match Define + Issue) */}
        <div>
          <label
            className="text-[12px] font-medium tracking-[-0.01em]"
            style={{ color: color.inkFaint }}
          >
            Credential address
          </label>
          {/* A div, not an <input> — the full address must be visible, and
              inputs clip instead of wrapping (never truncate a credential
              address, an slt_hash, or a course_id). */}
          <div
            className="mt-2 w-full break-all border px-3 py-2 text-[12px] leading-relaxed"
            style={{
              ...mono,
              borderColor: color.cell,
              color: color.ink,
              background: color.paper,
            }}
          >
            {REAL_ADDR}
          </div>
          <button
            type="button"
            className={runBtn}
            style={{ borderColor: color.ink, color: color.ink }}
            onClick={() => setVerified(true)}
          >
            Verify
          </button>
          {verified && (
            <>
              <p
                className="mt-4 text-[13px] font-semibold"
                style={{ color: BLUE }}
              >
                Verified on-chain ✓ (illustrative)
              </p>
              <div className="mt-2">
                <ClaimFence>
                  Simulated verify — not a live chain lookup.
                </ClaimFence>
              </div>
              <dl
                className="mt-3 border-t pt-3 text-[13px]"
                style={{ borderColor: color.cell }}
              >
                {[
                  ["Course", GETTING_STARTED.courseName],
                  ["Module", GETTING_STARTED.moduleName],
                  ["Holder", "addr1q9…"],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between py-1">
                    <dt style={{ color: color.inkMuted }}>{k}</dt>
                    <dd
                      style={
                        k === "Holder"
                          ? { ...mono, color: color.ink }
                          : { color: color.ink }
                      }
                    >
                      {v}
                    </dd>
                  </div>
                ))}
              </dl>
              <p
                className="mt-3 text-[12px] leading-relaxed"
                style={{ color: color.inkMuted }}
              >
                The holder can sign to prove they own it, so your applications
                can gate access on this credential.
              </p>
            </>
          )}
        </div>

        {/* Right — the badge + what the rings encode */}
        <div>
          <StaticBadge />
          <p
            className="mx-auto mt-4 max-w-[340px] text-center text-[12px] leading-relaxed"
            style={{ color: color.inkFaint }}
          >
            The rings encode the credential's identity: its{" "}
            <span style={{ ...mono, color: color.inkMuted }}>course_id</span>{" "}
            and <span style={{ ...mono, color: color.inkMuted }}>slt_hash</span>
            , the same address you verify.
          </p>
        </div>
      </div>
    </Pane>
  );
}
