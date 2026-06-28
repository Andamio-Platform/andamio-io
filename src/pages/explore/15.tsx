"use client";

import Head from "next/head";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  nav,
  hero,
  problem,
  demo,
  issuer,
  ecosystem,
  api,
  closing,
  footer,
  CREDENTIAL_BADGE_SRC,
  EXTERNAL_LINKS,
} from "~/ui/explore/content";

/**
 * Iteration 15 — "Instrument".
 *
 * Light, a hybrid of the two favorite layouts: a visible hairline grid PLUS a
 * monospace margin RAIL of live-looking instrument readouts (policy_id, asset,
 * status: VERIFIED) running down the right side in JetBrains Mono. Reads like a
 * precise instrument/console on a clean white page. Cool-blue #5B8DEF accent.
 *
 * Signature interaction: the badge reveal (id="how-it-works") slides the
 * credential in from the RIGHT as you scroll into the section, framed as a
 * museum specimen, and connects to live readouts with thin annotation leader
 * lines — as if the instrument is reading the specimen.
 */

const PAPER = "#FFFFFF";
const INK = "#0C0E12";
const BLUE = "#5B8DEF";
const FAINT = "rgba(12,14,18,0.07)";
const HAIR = "rgba(12,14,18,0.12)";

const sans = "'Inter', system-ui, -apple-system, sans-serif";
const mono =
  "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace";

const NUMS = ["01", "02", "03", "04", "05", "06"];

/** Live-looking instrument readouts for the fixed margin rail. */
const RAIL_READOUTS: { k: string; v: string; live?: boolean }[] = [
  { k: "instrument", v: "andamio.scope" },
  { k: "network", v: "mainnet" },
  { k: "policy_id", v: "a1f3…9c7e" },
  { k: "asset", v: "GettingStarted" },
  { k: "block", v: "11,482,309" },
  { k: "audit", v: "TxPipe" },
  { k: "status", v: "VERIFIED", live: true },
  { k: "uptime", v: "100.0%" },
];

/** Annotation readouts wired to the specimen via leader lines. */
const SPEC_ANNOTATIONS = [
  { k: "policy_id", v: "a1f3b2…0x9c7e" },
  { k: "asset_name", v: "GettingStarted" },
  { k: "issuer", v: "andamio.io" },
  { k: "rings", v: "course / target" },
  { k: "status", v: "VERIFIED", live: true },
];

export default function Explore15() {
  const revealRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: revealRef,
    offset: ["start end", "center center"],
  });
  const badgeX = useTransform(scrollYProgress, [0, 1], ["60%", "0%"]);
  const badgeOpacity = useTransform(scrollYProgress, [0, 0.55], [0, 1]);
  const leaderScale = useTransform(scrollYProgress, [0.35, 1], [0, 1]);
  const annOpacity = useTransform(scrollYProgress, [0.5, 1], [0, 1]);

  return (
    <div
      className="relative min-h-screen antialiased"
      style={{ background: PAPER, color: INK, fontFamily: sans }}
    >
      <Head>
        <title>15 · Instrument — Andamio</title>
        <meta
          name="description"
          content="Andamio — verifiable credentials read like a precise instrument."
        />
      </Head>

      {/* ── Hairline grid field ───────────────────────────────── */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 hidden justify-center md:flex"
      >
        <div
          className="grid h-full w-full max-w-[1400px] grid-cols-12 px-6 sm:px-10"
          style={{ borderRight: `1px solid ${FAINT}` }}
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} style={{ borderLeft: `1px solid ${FAINT}` }} />
          ))}
        </div>
      </div>

      {/* ── Fixed instrument margin rail (right side, desktop) ─── */}
      <aside
        aria-hidden
        className="pointer-events-none fixed right-0 top-0 z-30 hidden h-screen w-[210px] flex-col justify-between py-24 pr-5 xl:flex"
        style={{ borderLeft: `1px solid ${HAIR}`, background: "rgba(255,255,255,0.65)", backdropFilter: "blur(2px)" }}
      >
        <div className="pl-5">
          <div
            className="mb-5 flex items-center gap-2 text-[10px] uppercase tracking-[0.22em]"
            style={{ fontFamily: mono, color: "rgba(12,14,18,0.45)" }}
          >
            <span
              className="inline-block h-1.5 w-1.5 animate-pulse rounded-full"
              style={{ background: BLUE }}
            />
            readout
          </div>
          <div className="space-y-3">
            {RAIL_READOUTS.map((r) => (
              <div
                key={r.k}
                className="flex flex-col gap-0.5"
                style={{ fontFamily: mono }}
              >
                <span className="text-[9px] uppercase tracking-[0.16em]" style={{ color: "rgba(12,14,18,0.38)" }}>
                  {r.k}
                </span>
                <span
                  className="text-[12px] tabular-nums"
                  style={{ color: r.live ? BLUE : "rgba(12,14,18,0.78)" }}
                >
                  {r.v}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div
          className="pl-5 text-[9px] uppercase tracking-[0.18em]"
          style={{ fontFamily: mono, color: "rgba(12,14,18,0.3)" }}
        >
          andamio · console v2
        </div>
      </aside>

      <div className="relative z-10 xl:pr-[210px]">
        {/* ── Nav ─────────────────────────────────────────────── */}
        <header
          className="sticky top-0 z-50 backdrop-blur"
          style={{ borderBottom: `1px solid ${HAIR}`, background: "rgba(255,255,255,0.92)" }}
        >
          <div className="mx-auto flex max-w-[1190px] items-center justify-between px-6 py-3.5 sm:px-10">
            <a
              href="#top"
              className="flex items-baseline gap-2.5 text-[17px] font-semibold tracking-[-0.04em]"
            >
              <span
                className="inline-block h-2.5 w-2.5 translate-y-[1px] rounded-sm"
                style={{ background: BLUE }}
              />
              {nav.brand}
              <span
                className="ml-1 text-[10px] uppercase tracking-[0.18em]"
                style={{ fontFamily: mono, color: "rgba(12,14,18,0.4)" }}
              >
                instrument
              </span>
            </a>
            <nav className="hidden items-center gap-6 lg:flex">
              {nav.items.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-[12px] font-medium tracking-[-0.01em] transition-colors"
                  style={{ color: "rgba(12,14,18,0.62)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = BLUE)}
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "rgba(12,14,18,0.62)")
                  }
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <a
              href={nav.cta.href}
              className="rounded-md px-4 py-2 text-[12px] font-semibold tracking-[-0.01em] text-white transition-transform hover:-translate-y-px"
              style={{ background: INK }}
            >
              {nav.cta.label}
            </a>
          </div>
        </header>

        {/* ── Hero (full-bleed type, NO badge) ────────────────── */}
        <section id="top" style={{ borderBottom: `1px solid ${HAIR}` }}>
          <div className="mx-auto max-w-[1190px] px-6 pb-20 pt-20 sm:px-10 sm:pb-28 sm:pt-28">
            <div
              className="flex items-center gap-4 text-[11px] uppercase tracking-[0.2em]"
              style={{ fontFamily: mono, color: BLUE }}
            >
              <span>{"// andamio · credential instrument"}</span>
              <span className="h-px flex-1" style={{ background: HAIR }} />
              <span style={{ color: "rgba(12,14,18,0.4)" }}>lat 0.0ms</span>
            </div>

            <h1 className="mt-10 max-w-[14ch] text-[clamp(3rem,9vw,8rem)] font-semibold leading-[0.9] tracking-[-0.05em]">
              {hero.headlineLead}{" "}
              <span style={{ color: BLUE }}>{hero.headlineAccent}</span>
            </h1>

            <div className="mt-12 flex flex-col gap-6 sm:flex-row sm:items-center">
              <span
                className="text-[11px] uppercase tracking-[0.18em]"
                style={{ fontFamily: mono, color: "rgba(12,14,18,0.45)" }}
              >
                {hero.ctaEyebrow} ↓
              </span>
              <div className="flex flex-wrap gap-3">
                <a
                  href={hero.primaryCta.href}
                  className="rounded-md px-6 py-3 text-[13px] font-semibold tracking-[-0.01em] text-white transition-transform hover:-translate-y-px"
                  style={{ background: INK }}
                >
                  {hero.primaryCta.label}
                </a>
                <a
                  href={hero.secondaryCta.href}
                  className="rounded-md px-6 py-3 text-[13px] font-semibold tracking-[-0.01em] transition-colors"
                  style={{ border: `1px solid ${INK}`, color: INK }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = BLUE;
                    e.currentTarget.style.borderColor = BLUE;
                    e.currentTarget.style.color = "#fff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.borderColor = INK;
                    e.currentTarget.style.color = INK;
                  }}
                >
                  {hero.secondaryCta.label}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── Badge reveal / specimen + demo (signature) ──────── */}
        <section
          id="how-it-works"
          ref={revealRef}
          className="overflow-hidden"
          style={{ borderBottom: `1px solid ${HAIR}`, background: "#FBFCFE" }}
        >
          <div className="mx-auto max-w-[1190px] px-6 py-20 sm:px-10 sm:py-28">
            {/* demo header */}
            <div
              className="flex flex-wrap items-center gap-4 text-[11px] uppercase tracking-[0.18em]"
              style={{ fontFamily: mono }}
            >
              <span style={{ color: BLUE }}>{demo.kicker}</span>
              <span
                className="inline-flex items-center gap-2 rounded-full px-3 py-1"
                style={{ border: `1px solid ${BLUE}`, color: BLUE }}
              >
                <span
                  className="h-1.5 w-1.5 animate-pulse rounded-full"
                  style={{ background: BLUE }}
                />
                {demo.liveLabel}
              </span>
              <span className="h-px flex-1" style={{ background: HAIR }} />
            </div>

            <div className="mt-10 grid grid-cols-12 gap-y-12 lg:gap-x-10">
              {/* left: demo copy */}
              <div className="col-span-12 lg:col-span-5">
                <h2 className="text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.02] tracking-[-0.035em]">
                  {demo.title}
                </h2>
                <p
                  className="mt-6 max-w-md text-[15px] leading-relaxed"
                  style={{ color: "rgba(12,14,18,0.62)" }}
                >
                  {demo.note}
                </p>

                <a
                  href="#issuer"
                  className="group mt-8 inline-flex items-center gap-2 text-[13px] font-semibold tracking-[-0.01em] transition-colors"
                  style={{ color: INK }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = BLUE)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = INK)}
                >
                  <span
                    className="inline-block h-1.5 w-1.5 rounded-full"
                    style={{ background: BLUE }}
                  />
                  {demo.inspirationCta}
                </a>

                {/* live readouts wired to the specimen */}
                <motion.dl
                  style={{ opacity: annOpacity, fontFamily: mono }}
                  className="mt-12 space-y-3"
                >
                  {SPEC_ANNOTATIONS.map((a) => (
                    <div
                      key={a.k}
                      className="flex items-center gap-3"
                    >
                      <span
                        className="h-px w-6 origin-left"
                        style={{ background: BLUE }}
                      />
                      <dt
                        className="w-[92px] text-[10px] uppercase tracking-[0.14em]"
                        style={{ color: "rgba(12,14,18,0.42)" }}
                      >
                        {a.k}
                      </dt>
                      <dd
                        className="text-[12px] tabular-nums"
                        style={{ color: a.live ? BLUE : "rgba(12,14,18,0.8)" }}
                      >
                        {a.v}
                      </dd>
                    </div>
                  ))}
                </motion.dl>
              </div>

              {/* right: museum specimen frame, badge slides in from right */}
              <div className="col-span-12 lg:col-span-7">
                <div
                  className="relative"
                  style={{ border: `1px solid ${HAIR}`, background: PAPER }}
                >
                  {/* corner labels */}
                  <div
                    className="flex items-center justify-between px-5 py-2.5 text-[10px] uppercase tracking-[0.16em]"
                    style={{ fontFamily: mono, borderBottom: `1px solid ${FAINT}`, color: "rgba(12,14,18,0.45)" }}
                  >
                    <span>Specimen 001</span>
                    <span style={{ color: BLUE }}>On-chain</span>
                  </div>

                  {/* specimen body */}
                  <div className="relative flex min-h-[360px] items-center justify-center overflow-hidden px-6 py-12">
                    {/* faint grid behind specimen */}
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0"
                      style={{
                        backgroundImage: `linear-gradient(${FAINT} 1px, transparent 1px), linear-gradient(90deg, ${FAINT} 1px, transparent 1px)`,
                        backgroundSize: "32px 32px",
                      }}
                    />

                    {/* leader line across the frame, animates with scroll */}
                    <motion.div
                      aria-hidden
                      className="pointer-events-none absolute left-0 top-1/2 hidden h-px origin-left lg:block"
                      style={{ width: "100%", background: `linear-gradient(90deg, ${BLUE}, transparent)`, scaleX: leaderScale }}
                    />

                    <motion.div
                      style={{ x: badgeX, opacity: badgeOpacity }}
                      className="relative z-10"
                    >
                      <img
                        src={CREDENTIAL_BADGE_SRC}
                        alt={hero.badgeAlt}
                        width={520}
                        height={520}
                        className="w-full max-w-[300px] drop-shadow-sm sm:max-w-[360px]"
                      />
                    </motion.div>

                    {/* corner ticks */}
                    {[
                      "left-3 top-3 border-l border-t",
                      "right-3 top-3 border-r border-t",
                      "left-3 bottom-3 border-l border-b",
                      "right-3 bottom-3 border-r border-b",
                    ].map((pos) => (
                      <span
                        key={pos}
                        aria-hidden
                        className={`absolute h-4 w-4 ${pos}`}
                        style={{ borderColor: BLUE }}
                      />
                    ))}
                  </div>

                  {/* caption */}
                  <figcaption
                    className="px-5 py-4 text-[12px] leading-relaxed"
                    style={{ borderTop: `1px solid ${FAINT}`, color: "rgba(12,14,18,0.6)" }}
                  >
                    {hero.badgeCaption}
                  </figcaption>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Problem ─────────────────────────────────────────── */}
        <section style={{ borderBottom: `1px solid ${HAIR}` }}>
          <div className="mx-auto max-w-[1190px] px-6 py-20 sm:px-10 sm:py-28">
            <div className="grid grid-cols-12 gap-y-8">
              <div className="col-span-12 lg:col-span-4 lg:pr-10">
                <p
                  className="text-[11px] uppercase tracking-[0.18em]"
                  style={{ fontFamily: mono, color: BLUE }}
                >
                  {problem.kicker}
                </p>
                <h2 className="mt-5 text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-[0.98] tracking-[-0.04em]">
                  {problem.heading}
                </h2>
              </div>
              <p
                className="col-span-12 self-end text-xl leading-snug tracking-[-0.01em] lg:col-span-7 lg:col-start-6"
                style={{ color: "rgba(12,14,18,0.66)" }}
              >
                {problem.intro}
              </p>
            </div>

            <div
              className="mt-14 grid grid-cols-12"
              style={{ borderTop: `1px solid ${HAIR}` }}
            >
              {problem.items.map((p, i) => (
                <div
                  key={p.headline}
                  className="col-span-12 py-10 sm:col-span-4 sm:px-8 sm:py-12"
                  style={{
                    borderTop: i === 0 ? "none" : undefined,
                    borderLeft: i > 0 ? `1px solid ${FAINT}` : "none",
                  }}
                >
                  <span
                    className="block text-[11px] uppercase tracking-[0.16em]"
                    style={{ fontFamily: mono, color: BLUE }}
                  >
                    err.{NUMS[i]}
                  </span>
                  <h3 className="mt-5 text-xl font-semibold leading-tight tracking-[-0.02em]">
                    {p.headline}
                  </h3>
                  <p
                    className="mt-3 max-w-sm text-[14px] leading-relaxed"
                    style={{ color: "rgba(12,14,18,0.6)" }}
                  >
                    {p.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Issuer ──────────────────────────────────────────── */}
        <section id="issuer" style={{ borderBottom: `1px solid ${HAIR}` }}>
          <div className="mx-auto max-w-[1190px] px-6 py-20 sm:px-10 sm:py-28">
            <div className="grid grid-cols-12 gap-y-8">
              <div className="col-span-12 lg:col-span-7">
                <p
                  className="text-[11px] uppercase tracking-[0.18em]"
                  style={{ fontFamily: mono, color: BLUE }}
                >
                  {issuer.productLabel}
                </p>
                <h2 className="mt-5 text-[clamp(2.75rem,7vw,6rem)] font-semibold leading-[0.9] tracking-[-0.05em]">
                  {issuer.title}
                </h2>
              </div>
              <p
                className="col-span-12 self-end text-lg leading-relaxed lg:col-span-5 lg:pl-8"
                style={{ color: "rgba(12,14,18,0.66)" }}
              >
                {issuer.intro}
              </p>
            </div>

            <div
              className="mt-14 flex items-center gap-5 pt-2"
              style={{ borderTop: `1px solid ${HAIR}` }}
            >
              <h3 className="mt-6 text-2xl font-semibold tracking-[-0.025em] sm:text-3xl">
                {issuer.decisionsHeading}
              </h3>
            </div>

            <div
              className="mt-10 grid grid-cols-12"
              style={{ borderTop: `1px solid ${HAIR}` }}
            >
              {issuer.decisions.map((d, i) => (
                <div
                  key={d.title}
                  className="col-span-12 py-9 sm:col-span-6 sm:px-7 lg:col-span-4"
                  style={{
                    borderTop:
                      i > 0 ? `1px solid ${FAINT}` : "none",
                    borderLeft:
                      i % 1 === 0 && i !== 0 ? `1px solid ${FAINT}` : undefined,
                  }}
                >
                  <div className="flex items-baseline gap-4">
                    <span
                      className="text-[12px] uppercase tracking-[0.14em] tabular-nums"
                      style={{ fontFamily: mono, color: BLUE }}
                    >
                      {NUMS[i]}
                    </span>
                    <span
                      className="h-px flex-1 translate-y-[-4px]"
                      style={{ background: FAINT }}
                    />
                  </div>
                  <h4 className="mt-5 text-lg font-semibold leading-snug tracking-[-0.02em]">
                    {d.title}
                  </h4>
                  <p
                    className="mt-3 text-[14px] leading-relaxed"
                    style={{ color: "rgba(12,14,18,0.6)" }}
                  >
                    {d.body}
                  </p>
                </div>
              ))}
            </div>

            <div
              className="mt-12 flex flex-wrap items-center gap-3 pt-10"
              style={{ borderTop: `1px solid ${HAIR}` }}
            >
              <span
                aria-disabled="true"
                title="Coming soon"
                className="cursor-not-allowed rounded-md px-6 py-3 text-[13px] font-semibold tracking-[-0.01em]"
                style={{ border: `1px solid ${HAIR}`, color: "rgba(12,14,18,0.32)" }}
              >
                {issuer.reportCta}
              </span>
              <a
                href={EXTERNAL_LINKS.walkthroughMailto}
                className="rounded-md px-6 py-3 text-[13px] font-semibold tracking-[-0.01em] text-white transition-transform hover:-translate-y-px"
                style={{ background: INK }}
              >
                {issuer.walkthroughCta}
              </a>
            </div>
          </div>
        </section>

        {/* ── Ecosystem ───────────────────────────────────────── */}
        <section style={{ borderBottom: `1px solid ${HAIR}` }}>
          <div className="mx-auto max-w-[1190px] px-6 py-20 sm:px-10 sm:py-28">
            <div className="grid grid-cols-12 gap-y-10">
              <div className="col-span-12 lg:col-span-5 lg:pr-10">
                <p
                  className="text-[11px] uppercase tracking-[0.18em]"
                  style={{ fontFamily: mono, color: BLUE }}
                >
                  {ecosystem.kicker}
                </p>
                <p className="mt-6 text-[clamp(1.6rem,3vw,2.5rem)] font-semibold leading-[1.05] tracking-[-0.03em]">
                  {ecosystem.lead}
                </p>
              </div>
              <div
                className="col-span-12 grid grid-cols-1 self-end sm:grid-cols-2 lg:col-span-7"
                style={{ borderTop: `1px solid ${HAIR}` }}
              >
                {ecosystem.items.map((it, i) => (
                  <div
                    key={it.title}
                    className="py-8 sm:px-7"
                    style={{
                      borderLeft: i === 1 ? `1px solid ${FAINT}` : "none",
                    }}
                  >
                    <p className="flex items-baseline gap-2 text-[14px] font-semibold tracking-[-0.01em]">
                      <span
                        className="text-[11px] tabular-nums"
                        style={{ fontFamily: mono, color: BLUE }}
                      >
                        {NUMS[i]}
                      </span>
                      {it.title}
                    </p>
                    <p
                      className="mt-3 text-[14px] leading-relaxed"
                      style={{ color: "rgba(12,14,18,0.6)" }}
                    >
                      {it.body}
                    </p>
                  </div>
                ))}
                <p
                  className="col-span-1 py-4 text-[11px] tracking-[0.04em] sm:col-span-2 sm:px-7"
                  style={{ fontFamily: mono, borderTop: `1px solid ${FAINT}`, color: "rgba(12,14,18,0.4)" }}
                >
                  {ecosystem.footnote}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── API / Architecture ──────────────────────────────── */}
        <section id="andamio-api" style={{ borderBottom: `1px solid ${HAIR}` }}>
          <div className="mx-auto max-w-[1190px] px-6 py-20 sm:px-10 sm:py-28">
            <div className="grid grid-cols-12 gap-y-8">
              <div className="col-span-12 lg:col-span-7">
                <p
                  className="text-[11px] uppercase tracking-[0.18em]"
                  style={{ fontFamily: mono, color: BLUE }}
                >
                  {api.zoneLabel}
                </p>
                <h2 className="mt-5 text-[clamp(2.75rem,7vw,6rem)] font-semibold leading-[0.9] tracking-[-0.05em]">
                  {api.zoneTitle}
                </h2>
              </div>
              <p
                className="col-span-12 self-end text-lg leading-relaxed lg:col-span-5 lg:pl-8"
                style={{ color: "rgba(12,14,18,0.66)" }}
              >
                {api.zoneBlurb}
              </p>
            </div>

            <div
              className="mt-14 grid grid-cols-12"
              style={{ borderTop: `1px solid ${HAIR}` }}
            >
              {/* left: prose */}
              <div
                className="col-span-12 py-12 lg:col-span-5 lg:pr-12"
                style={{ borderRight: `1px solid ${FAINT}` }}
              >
                <p
                  className="text-[11px] uppercase tracking-[0.16em]"
                  style={{ fontFamily: mono, color: "rgba(12,14,18,0.42)" }}
                >
                  {api.kicker}
                </p>
                <h3 className="mt-4 text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-[1.04] tracking-[-0.03em]">
                  {api.heading}
                </h3>
                <p
                  className="mt-6 text-[15px] leading-relaxed"
                  style={{ color: "rgba(12,14,18,0.68)" }}
                >
                  {api.body1}
                </p>
                <p
                  className="mt-4 text-[14px] leading-relaxed"
                  style={{ color: "rgba(12,14,18,0.55)" }}
                >
                  {api.body2}
                </p>
                <a
                  href={EXTERNAL_LINKS.apiReference}
                  className="mt-8 inline-flex items-center gap-2 text-[13px] font-semibold tracking-[-0.01em] transition-colors"
                  style={{ color: INK }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = BLUE)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = INK)}
                >
                  <span
                    className="inline-block h-1.5 w-1.5 rounded-full"
                    style={{ background: BLUE }}
                  />
                  {api.apiRefCta}
                </a>
              </div>

              {/* right: stack */}
              <div className="col-span-12 lg:col-span-7">
                {api.stack.map((layer, i) => (
                  <div
                    key={layer.name}
                    className="grid grid-cols-12 items-baseline gap-3 px-0 py-7 lg:px-10"
                    style={{
                      borderTop: i > 0 ? `1px solid ${FAINT}` : "none",
                      background: layer.emphasis ? BLUE : undefined,
                      color: layer.emphasis ? "#fff" : undefined,
                    }}
                  >
                    <div className="col-span-12 sm:col-span-4">
                      <span
                        className="text-[10px] uppercase tracking-[0.14em]"
                        style={{
                          fontFamily: mono,
                          color: layer.emphasis
                            ? "rgba(255,255,255,0.85)"
                            : "rgba(12,14,18,0.42)",
                        }}
                      >
                        {layer.labelKicker}
                      </span>
                    </div>
                    <div className="col-span-12 sm:col-span-8">
                      <p className="text-lg font-semibold leading-tight tracking-[-0.02em]">
                        {layer.name}
                      </p>
                      <p
                        className="mt-1.5 text-[14px] leading-relaxed"
                        style={{
                          color: layer.emphasis
                            ? "rgba(255,255,255,0.92)"
                            : "rgba(12,14,18,0.55)",
                        }}
                      >
                        {layer.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Closing ─────────────────────────────────────────── */}
        <section style={{ borderBottom: `1px solid ${HAIR}` }}>
          <div className="mx-auto max-w-[1190px] px-6 py-24 sm:px-10 sm:py-32">
            <div className="grid grid-cols-12">
              <div className="col-span-12 lg:col-span-9">
                <p
                  className="text-[11px] uppercase tracking-[0.18em]"
                  style={{ fontFamily: mono, color: BLUE }}
                >
                  {closing.eyebrow}
                </p>
                <h2 className="mt-6 text-[clamp(2.5rem,6.5vw,5.5rem)] font-semibold leading-[0.92] tracking-[-0.05em]">
                  {closing.headlineLine1}
                  <br />
                  <span style={{ color: BLUE }}>{closing.headlineLine2}</span>
                </h2>
                <p
                  className="mt-8 max-w-lg text-lg leading-relaxed"
                  style={{ color: "rgba(12,14,18,0.66)" }}
                >
                  {closing.body}
                </p>
                <a
                  href={EXTERNAL_LINKS.walkthroughMailto}
                  className="mt-10 inline-flex items-center gap-2 rounded-md px-7 py-4 text-[13px] font-semibold tracking-[-0.01em] text-white transition-transform hover:-translate-y-px"
                  style={{ background: INK }}
                >
                  <span
                    className="inline-block h-1.5 w-1.5 rounded-full"
                    style={{ background: BLUE }}
                  />
                  {closing.cta}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── Footer ──────────────────────────────────────────── */}
        <footer>
          <div className="mx-auto max-w-[1190px] px-6 py-16 sm:px-10">
            <div className="grid grid-cols-12 gap-y-10">
              <div className="col-span-12 lg:col-span-4 lg:pr-10">
                <span className="flex items-baseline gap-2.5 text-[17px] font-semibold tracking-[-0.04em]">
                  <span
                    className="inline-block h-2.5 w-2.5 translate-y-[1px] rounded-sm"
                    style={{ background: BLUE }}
                  />
                  {nav.brand}
                </span>
                <p
                  className="mt-4 max-w-xs text-[13px] leading-relaxed"
                  style={{ color: "rgba(12,14,18,0.55)" }}
                >
                  {footer.tagline}
                </p>
                <p
                  className="mt-5 text-[11px] uppercase tracking-[0.1em]"
                  style={{ fontFamily: mono, color: "rgba(12,14,18,0.45)" }}
                >
                  {footer.meta}
                </p>
                <p
                  className="mt-2 text-[11px] tabular-nums"
                  style={{ fontFamily: mono, color: "rgba(12,14,18,0.4)" }}
                >
                  {footer.copyright}
                </p>
              </div>
              <div className="col-span-12 grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8 lg:pl-10">
                {Object.entries(footer.columns).map(([key, links]) => (
                  <div key={key}>
                    <h3
                      className="mb-4 pb-2 text-[11px] font-semibold uppercase tracking-[0.12em]"
                      style={{ borderBottom: `1px solid ${HAIR}` }}
                    >
                      {key}
                    </h3>
                    <ul className="space-y-2.5">
                      {links.map((link) => (
                        <li key={link.name}>
                          <a
                            href={link.href}
                            className="text-[13px] transition-colors"
                            style={{ color: "rgba(12,14,18,0.6)" }}
                            onMouseEnter={(e) =>
                              (e.currentTarget.style.color = BLUE)
                            }
                            onMouseLeave={(e) =>
                              (e.currentTarget.style.color =
                                "rgba(12,14,18,0.6)")
                            }
                          >
                            {link.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            <div
              className="mt-12 flex items-center justify-between py-5"
              style={{ borderTop: `1px solid ${HAIR}` }}
            >
              <Link
                href="/explore"
                className="text-[12px] font-semibold uppercase tracking-[0.1em] transition-colors"
                style={{ color: "rgba(12,14,18,0.5)" }}
              >
                ← Back to all iterations
              </Link>
              <span
                className="text-[11px] uppercase tracking-[0.12em]"
                style={{ fontFamily: mono, color: "rgba(12,14,18,0.35)" }}
              >
                Iteration 15 · Instrument
              </span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
