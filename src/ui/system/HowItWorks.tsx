"use client";

/**
 * HowItWorks — "Issuing takes three steps" as ONE demo card whose header
 * ("Learn how an Andamio Credential Badge works" + a live pulse) stays constant,
 * with the three steps (Define · Issue · Verify) as tabs INSIDE the card, right
 * below the header. The card body swaps between three mini-demos; the same
 * Fix-a-Flat-Tire badge stays on screen across all three:
 *   Define → the real BadgeBuilder, rendered bare (chrome={false})
 *   Issue  → example evidence (assignment commitment) → press Issue → badge minted.
 *            The evidence stays in the customer's system; only the credential is
 *            on-chain (called out in the pane).
 *   Verify → look up the credential address → verified on-chain.
 * Issue + Verify are illustrative (no live API); Define is the wired builder.
 */

import React from "react";
import BadgeBuilder, { BadgeInfoFooter } from "./BadgeBuilder";
import {
  buildBadgeParams,
  buildBadgeSvg,
  PALETTES,
  withInterior,
} from "~/ui/landing/V2Landing/badge";
import { color, font } from "./tokens";

const mono = { fontFamily: font.mono };
const sans = { fontFamily: font.sans };
const NUMS = ["01", "02", "03"];
const BLUE = "#2F6BFF"; // the system's data / confirmed accent

// The one credential shown across every tab (matches the builder's sample).
const SAMPLE = {
  courseName: "Bike Repair Basics",
  moduleName: "Fix a Flat Tire",
  slts: ["I can remove a wheel", "I can patch an inner tube"],
};

type Step = { title: string; body: string };

export default function HowItWorks({
  heading,
  steps,
  demo,
}: {
  heading: string;
  steps: readonly Step[];
  demo: { title: string; note: string; liveLabel: string };
}) {
  const [active, setActive] = React.useState(0);

  // Build the static Fix-a-Flat-Tire badge once — shared by Issue + Verify.
  const [badgeSvg, setBadgeSvg] = React.useState("");
  React.useEffect(() => {
    let alive = true;
    (async () => {
      const params = await buildBadgeParams(SAMPLE);
      const palette = withInterior(PALETTES[0]!, "light");
      const svg = buildBadgeSvg(params, palette, { idSuffix: "hiw" });
      if (alive) setBadgeSvg(svg);
    })();
    return () => {
      alive = false;
    };
  }, []);

  return (
    <>
      {/* Section heading */}
      <div className="border-t pt-8" style={{ borderColor: color.rule }}>
        <span className="text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
          {heading}
        </span>
      </div>

      {/* The demo card — header, then tabs, then the active pane, all inside one
          bordered card. Theme-aware (follows the app's light/dark). ────────── */}
      <div className="mt-10 pb-12 pt-8 sm:pb-16 sm:pt-10">
        <div className="m-0 border" style={{ borderColor: color.rule, background: color.paper }}>
          {/* Card header — constant across tabs */}
          <div
            className="flex items-start justify-between gap-4 border-b px-4 py-3"
            style={{ borderColor: color.rule }}
          >
            <h2
              className="min-w-0 text-[19px] leading-tight sm:text-[22px]"
              style={{ ...sans, fontWeight: 600, letterSpacing: "-0.02em", color: color.ink }}
            >
              {demo.title}
            </h2>
            <span
              className="inline-flex shrink-0 items-center gap-2 pt-1 text-[10px] font-semibold uppercase tracking-[0.14em]"
              style={{ color: color.inkFaint, ...mono }}
            >
              <span className="h-1.5 w-1.5 animate-pulse rounded-full" style={{ background: color.orange }} />
              {demo.liveLabel}
            </span>
          </div>

          {/* Tabs — the three steps, inside the card below the header */}
          <div className="grid grid-cols-3 gap-px border-b" style={{ background: color.cell, borderColor: color.rule }}>
            {steps.map((s, i) => {
              const on = i === active;
              return (
                <button
                  key={s.title}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-selected={on}
                  className="flex items-baseline gap-2 px-3 py-3 text-left transition-colors sm:gap-3 sm:px-5 sm:py-4"
                  style={{
                    background: color.paper,
                    borderBottom: on ? `2px solid ${color.orange}` : "2px solid transparent",
                  }}
                >
                  <span
                    className="text-xl font-semibold leading-none tabular-nums sm:text-2xl"
                    style={{ color: on ? color.orange : color.inkWatermark }}
                  >
                    {NUMS[i]}
                  </span>
                  <span
                    className="text-[14px] font-semibold tracking-[-0.02em] sm:text-[15px]"
                    style={{ color: on ? color.ink : color.inkMuted }}
                  >
                    {s.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active step caption */}
          <p className="px-4 pt-4 text-[14px] leading-relaxed sm:px-5" style={{ color: color.inkMuted }}>
            {steps[active]?.body}
          </p>

          {/* Panes — all three stacked in one grid cell so the card height is
              fixed to the tallest (Define). Only the active pane is visible; the
              others hold their space (visibility, not display) to set the height. */}
          <div className="grid [&>*]:col-start-1 [&>*]:row-start-1">
            <div className={`h-full ${active === 0 ? "" : "invisible"}`} aria-hidden={active !== 0}>
              <BadgeBuilder chrome={false} />
            </div>
            <div className={`h-full ${active === 1 ? "" : "invisible"}`} aria-hidden={active !== 1}>
              <IssueDemo svg={badgeSvg} />
            </div>
            <div className={`h-full ${active === 2 ? "" : "invisible"}`} aria-hidden={active !== 2}>
              <VerifyDemo svg={badgeSvg} />
            </div>
          </div>

          {/* Shared footer — the ring-anatomy chips + address, on every tab. */}
          <BadgeInfoFooter />
        </div>
      </div>
    </>
  );
}

/* ── The static badge, rendered from the generated SVG (non-editable). ─────── */
function StaticBadge({ svg }: { svg: string }) {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[340px]">
      {svg ? (
        <div
          className="absolute inset-0 [&_svg]:block [&_svg]:h-full [&_svg]:w-full"
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      ) : null}
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
function IssueDemo({ svg }: { svg: string }) {
  const [issued, setIssued] = React.useState(false);
  return (
    <Pane>
      <div className="grid items-start gap-8 sm:grid-cols-2">
        {/* Left — the learner's evidence, inside a "your system" container so
            the private / off-Andamio boundary is tangible (diploma vs. exam). */}
        <div>
          <div className="border" style={{ borderColor: color.cell }}>
            <div className="flex items-center justify-between border-b px-3 py-2" style={{ borderColor: color.cell }}>
              <span className="text-[11px] uppercase tracking-[0.14em]" style={{ ...mono, color: color.inkFaint }}>
                Your system
              </span>
              <span className="text-[10px] uppercase tracking-[0.12em]" style={{ ...mono, color: color.inkFaint }}>
                private · not on Andamio
              </span>
            </div>
            <div className="p-4">
              <p className="text-[11px] uppercase tracking-[0.14em]" style={{ ...mono, color: color.inkFaint }}>
                Assignment commitment
              </p>
              <p className="mt-2 text-[14px] font-semibold" style={{ color: color.ink }}>
                Fix a Flat Tire — submitted evidence
              </p>
              <ul className="mt-2 space-y-1.5 text-[13px]" style={{ color: color.inkMuted }}>
                <li>• Photo — wheel removed and reseated</li>
                <li>• Photo — inner tube patched</li>
                <li>• Note — "Held 40 psi overnight."</li>
              </ul>
            </div>
          </div>
          <p className="mt-3 text-[12px] leading-relaxed" style={{ color: color.inkFaint }}>
            The evidence stays in your system, not on Andamio. Only the credential goes on-chain.
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
          <div className="transition-opacity duration-500" style={{ opacity: issued ? 1 : 0.15 }}>
            <StaticBadge svg={svg} />
          </div>
          <p className="mt-3 text-center text-[13px] font-semibold" style={{ color: issued ? BLUE : color.inkFaint }}>
            {issued ? (
              <>
                Issued ✓{" "}
                <span style={{ ...mono, color: color.inkMuted, fontWeight: 400 }}>9b8fa722…c26771</span>
              </>
            ) : (
              "Awaiting issue"
            )}
          </p>
        </div>
      </div>
    </Pane>
  );
}

/* ── 03 · Verify — look up the credential address, verify on-chain. ───────── */
function VerifyDemo({ svg }: { svg: string }) {
  const [verified, setVerified] = React.useState(false);
  return (
    <Pane>
      <div className="grid items-center gap-8 sm:grid-cols-2">
        {/* Left — verify (badge kept on the right to match Define + Issue) */}
        <div>
          <label className="text-[11px] uppercase tracking-[0.14em]" style={{ ...mono, color: color.inkFaint }}>
            Credential address
          </label>
          <input
            readOnly
            value="bike-repair.b1093d4f"
            className="mt-2 w-full border px-3 py-2 text-[13px]"
            style={{ ...mono, borderColor: color.cell, color: color.ink, background: color.paper }}
          />
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
              <p className="mt-4 text-[13px] font-semibold" style={{ color: BLUE }}>
                Verified on-chain ✓
              </p>
              <dl className="mt-3 border-t pt-3 text-[13px]" style={{ borderColor: color.cell }}>
                {[
                  ["Course", "Bike Repair Basics"],
                  ["Module", "Fix a Flat Tire"],
                  ["Holder", "addr1q9…"],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between py-1">
                    <dt style={{ color: color.inkMuted }}>{k}</dt>
                    <dd style={k === "Holder" ? { ...mono, color: color.ink } : { color: color.ink }}>{v}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-3 text-[12px] leading-relaxed" style={{ color: color.inkMuted }}>
                The holder can sign to prove they own it, so your applications can gate access on this credential.
              </p>
            </>
          )}
        </div>

        {/* Right — the badge + what the rings encode */}
        <div>
          <StaticBadge svg={svg} />
          <p className="mx-auto mt-4 max-w-[340px] text-center text-[12px] leading-relaxed" style={{ color: color.inkFaint }}>
            The rings encode the credential's identity: its{" "}
            <span style={{ ...mono, color: color.inkMuted }}>course_id</span> and{" "}
            <span style={{ ...mono, color: color.inkMuted }}>slt_hash</span>, the same address you verify.
          </p>
        </div>
      </div>
    </Pane>
  );
}
