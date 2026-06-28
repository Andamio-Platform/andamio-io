"use client";

import Head from "next/head";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
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
 * Iteration 18 — "Instrument Coral" (Round 3 convergence on 11 + 12 + 15).
 *
 * Donor that DOMINATES: 15 — the fixed right instrument rail is the identity.
 * It runs live readouts (policy_id / asset / status: VERIFIED) AND doubles as a
 * section outline / table-of-contents (12's bookmark FUNCTION in 15's right-side
 * floating FORM), with the current area subtly emphasized. On scroll the
 * museum-specimen reveal wires to live annotation readouts with thin blue
 * leader-lines — as if the instrument is reading the credential. The most alive
 * of the five.
 *
 * BASE (from 11): pure-white page, a faint fixed 12-column rule field behind
 * everything, generous vertical rhythm — full-width hairline rules with big
 * padding between sections, full-bleed type hero with the badge WITHHELD.
 *
 * TYPE (from 12): Inter semibold (600) for display, tracking ~-0.045em, leading
 * ~0.92; Inter for body; JetBrains Mono only for small labels / numerals /
 * readouts. No serif, no black slab weights.
 *
 * 3-COLOR THEME (orange sparing):
 *   BLUE   #2F6BFF — PRIMARY. The instrument: rail, readouts, kickers, data
 *                    leader-lines, CTA spark, emphasized API layer.
 *   CORAL  #FF6B4A — SECONDARY. Heading accent word + section numerals.
 *   ORANGE #FF6B35 — SPARK, rare. ONLY the "status: VERIFIED" indicator and the
 *                    live pulse dot. Never a heading/numeral workhorse.
 */

const PAPER = "#FFFFFF";
const INK = "#0C0E12";
const BLUE = "#2F6BFF";
const CORAL = "#FF6B4A";
const ORANGE = "#FF6B35";

const GRID = "rgba(12,14,18,0.05)";
const FAINT = "rgba(12,14,18,0.07)";
const HAIR = "rgba(12,14,18,0.13)";
const SUB = "rgba(12,14,18,0.62)";
const MUTE = "rgba(12,14,18,0.42)";

const sans = "'Inter', system-ui, -apple-system, sans-serif";
const mono = "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace";

const NUMS = ["01", "02", "03", "04", "05", "06"];

/** Section outline — 12's bookmark function, carried in 15's right rail form. */
const SECTIONS = [
  { id: "top", num: "00", label: "Hero" },
  { id: "how-it-works", num: "01", label: "How it works" },
  { id: "problem", num: "02", label: "The problem" },
  { id: "issuer", num: "03", label: "Issuer" },
  { id: "ecosystem", num: "04", label: "Ecosystem" },
  { id: "andamio-api", num: "05", label: "API" },
  { id: "closing", num: "06", label: "Upgrade" },
];

/** Live readouts wired down the rail. */
const RAIL_READOUTS: { k: string; v: string; verified?: boolean }[] = [
  { k: "policy_id", v: "a1f3…9c7e" },
  { k: "asset", v: "GettingStarted" },
  { k: "network", v: "mainnet" },
  { k: "status", v: "VERIFIED", verified: true },
];

/** Annotation readouts wired to the specimen via leader lines. */
const SPEC_ANNOTATIONS: { k: string; v: string; verified?: boolean }[] = [
  { k: "policy_id", v: "a1f3b2…0x9c7e" },
  { k: "asset_name", v: "GettingStarted" },
  { k: "issuer", v: "andamio.io" },
  { k: "rings", v: "course / target" },
  { k: "status", v: "VERIFIED", verified: true },
];

export default function Explore18() {
  const revealRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: revealRef,
    offset: ["start end", "center center"],
  });
  // Slides in from the RIGHT; deterministic at progress=0 for SSR/client match.
  const badgeX = useTransform(scrollYProgress, [0, 1], ["60%", "0%"]);
  const badgeOpacity = useTransform(scrollYProgress, [0, 0.55], [0, 1]);
  const leaderScale = useTransform(scrollYProgress, [0.35, 1], [0, 1]);
  const annOpacity = useTransform(scrollYProgress, [0.5, 1], [0, 1]);
  const stampOpacity = useTransform(scrollYProgress, [0.62, 1], [0, 1]);

  // Wayfinding: which section is in view. Deterministic initial value ("top").
  const [active, setActive] = useState("top");
  useEffect(() => {
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => Boolean(el),
    );
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div
      className="relative min-h-screen antialiased"
      style={{ background: PAPER, color: INK, fontFamily: sans }}
    >
      <Head>
        <title>18 · Instrument Coral — Andamio</title>
        <meta
          name="description"
          content="Andamio — verifiable credentials, read like a live instrument."
        />
      </Head>

      {/* ── Fixed faint 12-column rule field (from 11) ────────── */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 hidden justify-center md:flex"
      >
        <div
          className="grid h-full w-full max-w-[1400px] grid-cols-12 px-6 sm:px-10"
          style={{ borderRight: `1px solid ${GRID}` }}
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} style={{ borderLeft: `1px solid ${GRID}` }} />
          ))}
        </div>
      </div>

      {/* ── Fixed instrument rail: section outline + live readouts ─ */}
      <aside
        aria-hidden
        className="pointer-events-none fixed right-0 top-0 z-30 hidden h-screen w-[220px] flex-col justify-between py-24 pr-5 xl:flex"
        style={{
          borderLeft: `1px solid ${HAIR}`,
          background: "rgba(255,255,255,0.7)",
          backdropFilter: "blur(2px)",
        }}
      >
        {/* outline — current area subtly emphasized */}
        <div className="pl-5">
          <div
            className="mb-5 flex items-center gap-2 text-[10px] uppercase tracking-[0.22em]"
            style={{ fontFamily: mono, color: MUTE }}
          >
            <span
              className="inline-block h-1.5 w-1.5 animate-pulse rounded-full"
              style={{ background: ORANGE }}
            />
            outline
          </div>
          <ul className="space-y-2.5" style={{ fontFamily: mono }}>
            {SECTIONS.map((s) => {
              const on = active === s.id;
              return (
                <li key={s.id} className="flex items-center gap-2.5">
                  <span
                    className="h-3 w-px"
                    style={{
                      background: on ? BLUE : "transparent",
                    }}
                  />
                  <span
                    className="w-5 text-[11px] tabular-nums"
                    style={{ color: CORAL }}
                  >
                    {s.num}
                  </span>
                  <span
                    className="text-[11px] tracking-[0.02em] transition-colors"
                    style={{
                      color: on ? INK : MUTE,
                      fontWeight: on ? 600 : 400,
                    }}
                  >
                    {s.label}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        {/* live readouts */}
        <div className="pl-5">
          <div
            className="mb-4 flex items-center gap-2 text-[10px] uppercase tracking-[0.22em]"
            style={{ fontFamily: mono, color: MUTE }}
          >
            <span
              className="inline-block h-1.5 w-1.5 animate-pulse rounded-full"
              style={{ background: ORANGE }}
            />
            readout
          </div>
          <div className="space-y-3" style={{ fontFamily: mono }}>
            {RAIL_READOUTS.map((r) => (
              <div key={r.k} className="flex flex-col gap-0.5">
                <span
                  className="text-[9px] uppercase tracking-[0.16em]"
                  style={{ color: MUTE }}
                >
                  {r.k}
                </span>
                <span
                  className="flex items-center gap-1.5 text-[12px] tabular-nums"
                  style={{ color: r.verified ? ORANGE : BLUE }}
                >
                  {r.verified ? (
                    <span
                      className="inline-block h-1.5 w-1.5 rounded-full"
                      style={{ background: ORANGE }}
                    />
                  ) : null}
                  {r.v}
                </span>
              </div>
            ))}
          </div>
          <div
            className="mt-6 text-[9px] uppercase tracking-[0.18em]"
            style={{ fontFamily: mono, color: "rgba(12,14,18,0.3)" }}
          >
            andamio · instrument v3
          </div>
        </div>
      </aside>

      <div className="relative z-10 xl:pr-[220px]">
        {/* ── Nav ───────────────────────────────────────────────── */}
        <header
          className="sticky top-0 z-50 backdrop-blur"
          style={{
            borderBottom: `1px solid ${INK}`,
            background: "rgba(255,255,255,0.92)",
          }}
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
                className="ml-1 hidden text-[10px] uppercase tracking-[0.18em] sm:inline"
                style={{ fontFamily: mono, color: MUTE }}
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
                  style={{ color: SUB }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = BLUE)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = SUB)}
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <a
              href={nav.cta.href}
              className="rounded-md px-4 py-2 text-[12px] font-semibold tracking-[-0.01em] text-white transition-colors"
              style={{ background: INK }}
              onMouseEnter={(e) => (e.currentTarget.style.background = BLUE)}
              onMouseLeave={(e) => (e.currentTarget.style.background = INK)}
            >
              {nav.cta.label}
            </a>
          </div>
        </header>

        {/* ── Hero (full-bleed type, NO badge) ──────────────────── */}
        <section id="top" style={{ borderBottom: `1px solid ${INK}` }}>
          <div className="mx-auto max-w-[1190px] px-6 pb-20 pt-20 sm:px-10 sm:pb-28 sm:pt-28">
            <div
              className="flex items-center gap-4 text-[11px] uppercase tracking-[0.2em]"
              style={{ fontFamily: mono, color: BLUE }}
            >
              <span>{"// andamio · credential instrument"}</span>
              <span className="h-px flex-1" style={{ background: HAIR }} />
              <span className="hidden sm:inline" style={{ color: MUTE }}>
                No. 18 — Instrument Coral
              </span>
            </div>

            <h1 className="mt-10 max-w-[15ch] text-[clamp(2.9rem,8.5vw,7rem)] font-semibold leading-[0.92] tracking-[-0.045em]">
              {hero.headlineLead}{" "}
              <span style={{ color: CORAL }}>{hero.headlineAccent}</span>
            </h1>

            <div className="mt-12 flex flex-col gap-6 sm:flex-row sm:items-center">
              <span
                className="text-[11px] uppercase tracking-[0.18em]"
                style={{ fontFamily: mono, color: MUTE }}
              >
                {hero.ctaEyebrow} ↓
              </span>
              <div className="flex flex-wrap gap-3">
                <a
                  href={hero.primaryCta.href}
                  className="inline-flex items-center gap-2 rounded-md px-6 py-3 text-[13px] font-semibold tracking-[-0.01em] text-white transition-colors"
                  style={{ background: INK }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = BLUE)}
                  onMouseLeave={(e) => (e.currentTarget.style.background = INK)}
                >
                  <span
                    className="inline-block h-1.5 w-1.5 rounded-full"
                    style={{ background: BLUE }}
                  />
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

        {/* ── Badge reveal / specimen + demo (id="how-it-works") ── */}
        <section
          id="how-it-works"
          ref={revealRef}
          className="overflow-hidden"
          style={{ borderBottom: `1px solid ${INK}`, background: "#FBFCFE" }}
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
                style={{ border: `1px solid ${HAIR}`, color: INK }}
              >
                {/* the live pulse dot — one of the two orange touchpoints */}
                <span
                  className="h-1.5 w-1.5 animate-pulse rounded-full"
                  style={{ background: ORANGE }}
                />
                {demo.liveLabel}
              </span>
              <span className="h-px flex-1" style={{ background: HAIR }} />
              <span className="hidden sm:inline" style={{ color: MUTE }}>
                Specimen 001
              </span>
            </div>

            <div className="mt-12 grid grid-cols-12 gap-y-12 lg:gap-x-10">
              {/* left: demo copy + the wired annotation readouts */}
              <div className="col-span-12 lg:col-span-5">
                <span
                  className="block text-[6rem] font-semibold leading-[0.8] tracking-[-0.05em] tabular-nums sm:text-[8rem]"
                  style={{ color: CORAL }}
                >
                  01
                </span>
                <h2 className="mt-6 text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.0] tracking-[-0.035em]">
                  {demo.title}
                </h2>
                <p
                  className="mt-6 max-w-md text-[15px] leading-relaxed"
                  style={{ color: SUB }}
                >
                  {demo.note}
                </p>

                <a
                  href="#issuer"
                  className="mt-8 inline-flex items-center gap-2 text-[13px] font-semibold tracking-[-0.01em] transition-colors"
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

                {/* live readouts wired to the specimen (blue data) */}
                <motion.dl
                  style={{ opacity: annOpacity, fontFamily: mono }}
                  className="mt-12 space-y-3"
                >
                  {SPEC_ANNOTATIONS.map((a) => (
                    <div key={a.k} className="flex items-center gap-3">
                      <span
                        className="h-px w-6"
                        style={{
                          background: a.verified ? ORANGE : BLUE,
                        }}
                      />
                      <dt
                        className="w-[92px] text-[10px] uppercase tracking-[0.14em]"
                        style={{ color: MUTE }}
                      >
                        {a.k}
                      </dt>
                      <dd
                        className="flex items-center gap-1.5 text-[12px] tabular-nums"
                        style={{ color: a.verified ? ORANGE : "rgba(12,14,18,0.8)" }}
                      >
                        {a.verified ? (
                          <span
                            className="inline-block h-1.5 w-1.5 rounded-full"
                            style={{ background: ORANGE }}
                          />
                        ) : null}
                        {a.v}
                      </dd>
                    </div>
                  ))}
                </motion.dl>
              </div>

              {/* right: museum specimen, badge slides in from RIGHT */}
              <div className="col-span-12 lg:col-span-7">
                <div
                  className="relative"
                  style={{ border: `1px solid ${INK}`, background: PAPER }}
                >
                  {/* corner labels */}
                  <div
                    className="flex items-center justify-between px-5 py-2.5 text-[10px] uppercase tracking-[0.16em]"
                    style={{
                      fontFamily: mono,
                      borderBottom: `1px solid ${FAINT}`,
                      color: MUTE,
                    }}
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

                    {/* leader line: the instrument reading the specimen */}
                    <motion.div
                      aria-hidden
                      className="pointer-events-none absolute left-0 top-1/2 hidden h-px origin-left lg:block"
                      style={{
                        width: "100%",
                        background: `linear-gradient(90deg, ${BLUE}, transparent)`,
                        scaleX: leaderScale,
                      }}
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

                    {/* VERIFIED stamp — the second orange touchpoint */}
                    <motion.span
                      aria-hidden
                      style={{ opacity: stampOpacity, fontFamily: mono, borderColor: ORANGE, color: ORANGE }}
                      className="absolute right-4 top-4 z-20 inline-flex items-center gap-1.5 rounded-sm border px-2 py-1 text-[10px] uppercase tracking-[0.18em]"
                    >
                      <span
                        className="inline-block h-1.5 w-1.5 rounded-full"
                        style={{ background: ORANGE }}
                      />
                      Verified
                    </motion.span>

                    {/* corner ticks (blue, instrument) */}
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
                    style={{ borderTop: `1px solid ${FAINT}`, color: SUB }}
                  >
                    {hero.badgeCaption}
                  </figcaption>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Problem ───────────────────────────────────────────── */}
        <section id="problem" style={{ borderBottom: `1px solid ${INK}` }}>
          <div className="mx-auto max-w-[1190px] px-6 py-20 sm:px-10 sm:py-28">
            <div className="grid grid-cols-12 gap-y-8">
              <div className="col-span-12 lg:col-span-4 lg:pr-10">
                <p
                  className="text-[11px] uppercase tracking-[0.18em]"
                  style={{ fontFamily: mono, color: BLUE }}
                >
                  {problem.kicker}
                </p>
                <h2 className="mt-5 text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-[0.96] tracking-[-0.045em]">
                  {problem.heading}
                </h2>
              </div>
              <p
                className="col-span-12 self-end text-xl leading-snug tracking-[-0.01em] lg:col-span-7 lg:col-start-6"
                style={{ color: SUB }}
              >
                {problem.intro}
              </p>
            </div>

            <div
              className="mt-14 grid grid-cols-12"
              style={{ borderTop: `1px solid ${INK}` }}
            >
              {problem.items.map((p, i) => (
                <div
                  key={p.headline}
                  className="col-span-12 py-10 sm:col-span-4 sm:px-8 sm:py-12"
                  style={{
                    borderLeft: i > 0 ? `1px solid ${FAINT}` : "none",
                  }}
                >
                  <span
                    className="block text-5xl font-semibold leading-none tracking-[-0.05em] tabular-nums"
                    style={{ color: CORAL }}
                  >
                    {NUMS[i]}
                  </span>
                  <h3 className="mt-5 text-xl font-semibold leading-tight tracking-[-0.025em]">
                    {p.headline}
                  </h3>
                  <p
                    className="mt-3 max-w-sm text-[14px] leading-relaxed"
                    style={{ color: SUB }}
                  >
                    {p.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Issuer ────────────────────────────────────────────── */}
        <section id="issuer" style={{ borderBottom: `1px solid ${INK}` }}>
          <div className="mx-auto max-w-[1190px] px-6 py-20 sm:px-10 sm:py-28">
            <div className="grid grid-cols-12 gap-y-8">
              <div className="col-span-12 lg:col-span-7">
                <p
                  className="text-[11px] uppercase tracking-[0.18em]"
                  style={{ fontFamily: mono, color: BLUE }}
                >
                  {issuer.productLabel}
                </p>
                <h2 className="mt-5 text-[clamp(2.6rem,7vw,5.5rem)] font-semibold leading-[0.92] tracking-[-0.045em]">
                  {issuer.title}
                </h2>
              </div>
              <p
                className="col-span-12 self-end text-lg leading-relaxed lg:col-span-5 lg:pl-8"
                style={{ color: SUB }}
              >
                {issuer.intro}
              </p>
            </div>

            <div
              className="mt-14 pt-2"
              style={{ borderTop: `1px solid ${INK}` }}
            >
              <h3 className="mt-6 max-w-2xl text-2xl font-semibold leading-snug tracking-[-0.03em] sm:text-3xl">
                {issuer.decisionsHeading}
              </h3>
            </div>

            <div
              className="mt-10 grid grid-cols-12"
              style={{ borderTop: `1px solid ${INK}` }}
            >
              {issuer.decisions.map((d, i) => (
                <div
                  key={d.title}
                  className="col-span-12 py-9 sm:col-span-6 sm:px-7 lg:col-span-4"
                  style={{
                    borderTop: i > 0 ? `1px solid ${FAINT}` : "none",
                    borderLeft: i % 1 === 0 && i !== 0 ? `1px solid ${FAINT}` : undefined,
                  }}
                >
                  <div className="flex items-baseline gap-4">
                    <span
                      className="text-2xl font-semibold leading-none tracking-[-0.04em] tabular-nums"
                      style={{ color: CORAL }}
                    >
                      {NUMS[i]}
                    </span>
                    <span
                      className="h-px flex-1 translate-y-[-6px]"
                      style={{ background: FAINT }}
                    />
                  </div>
                  <h4 className="mt-5 text-lg font-semibold leading-snug tracking-[-0.025em]">
                    {d.title}
                  </h4>
                  <p
                    className="mt-3 text-[14px] leading-relaxed"
                    style={{ color: SUB }}
                  >
                    {d.body}
                  </p>
                </div>
              ))}
            </div>

            <div
              className="mt-12 flex flex-wrap items-center gap-3 pt-10"
              style={{ borderTop: `1px solid ${INK}` }}
            >
              <span
                aria-disabled="true"
                title="Coming soon"
                className="inline-flex cursor-not-allowed items-center gap-3 rounded-md px-6 py-3 text-[13px] font-semibold tracking-[-0.01em]"
                style={{ border: `1px solid ${HAIR}`, color: MUTE }}
              >
                {issuer.reportCta}
                <span
                  className="text-[10px] uppercase tracking-[0.14em]"
                  style={{ fontFamily: mono }}
                >
                  soon
                </span>
              </span>
              <a
                href={EXTERNAL_LINKS.walkthroughMailto}
                className="rounded-md px-6 py-3 text-[13px] font-semibold tracking-[-0.01em] text-white transition-colors"
                style={{ background: INK }}
                onMouseEnter={(e) => (e.currentTarget.style.background = BLUE)}
                onMouseLeave={(e) => (e.currentTarget.style.background = INK)}
              >
                {issuer.walkthroughCta}
              </a>
            </div>
          </div>
        </section>

        {/* ── Ecosystem ─────────────────────────────────────────── */}
        <section id="ecosystem" style={{ borderBottom: `1px solid ${INK}` }}>
          <div className="mx-auto max-w-[1190px] px-6 py-20 sm:px-10 sm:py-28">
            <div className="grid grid-cols-12 gap-y-10">
              <div className="col-span-12 lg:col-span-5 lg:pr-10">
                <p
                  className="text-[11px] uppercase tracking-[0.18em]"
                  style={{ fontFamily: mono, color: BLUE }}
                >
                  {ecosystem.kicker}
                </p>
                <p className="mt-6 text-[clamp(1.6rem,3.2vw,2.6rem)] font-semibold leading-[1.04] tracking-[-0.035em]">
                  {ecosystem.lead}
                </p>
              </div>
              <div
                className="col-span-12 grid grid-cols-1 self-end sm:grid-cols-2 lg:col-span-7"
                style={{ borderTop: `1px solid ${INK}` }}
              >
                {ecosystem.items.map((it, i) => (
                  <div
                    key={it.title}
                    className="py-8 sm:px-7"
                    style={{
                      borderLeft: i === 1 ? `1px solid ${FAINT}` : "none",
                    }}
                  >
                    <p className="flex items-baseline gap-2 text-[15px] font-semibold tracking-[-0.01em]">
                      <span
                        className="text-[12px] tabular-nums"
                        style={{ fontFamily: mono, color: CORAL }}
                      >
                        {NUMS[i]}
                      </span>
                      {it.title}
                    </p>
                    <p
                      className="mt-3 text-[14px] leading-relaxed"
                      style={{ color: SUB }}
                    >
                      {it.body}
                    </p>
                  </div>
                ))}
                <p
                  className="col-span-1 py-4 text-[11px] tracking-[0.04em] sm:col-span-2 sm:px-7"
                  style={{
                    fontFamily: mono,
                    borderTop: `1px solid ${FAINT}`,
                    color: MUTE,
                  }}
                >
                  {ecosystem.footnote}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── API / Architecture ────────────────────────────────── */}
        <section id="andamio-api" style={{ borderBottom: `1px solid ${INK}` }}>
          <div className="mx-auto max-w-[1190px] px-6 py-20 sm:px-10 sm:py-28">
            <div className="grid grid-cols-12 gap-y-8">
              <div className="col-span-12 lg:col-span-7">
                <p
                  className="text-[11px] uppercase tracking-[0.18em]"
                  style={{ fontFamily: mono, color: BLUE }}
                >
                  {api.zoneLabel}
                </p>
                <h2 className="mt-5 text-[clamp(2.6rem,7vw,5.5rem)] font-semibold leading-[0.92] tracking-[-0.045em]">
                  {api.zoneTitle}
                </h2>
              </div>
              <p
                className="col-span-12 self-end text-lg leading-relaxed lg:col-span-5 lg:pl-8"
                style={{ color: SUB }}
              >
                {api.zoneBlurb}
              </p>
            </div>

            <div
              className="mt-14 grid grid-cols-12"
              style={{ borderTop: `1px solid ${INK}` }}
            >
              {/* left: prose */}
              <div
                className="col-span-12 py-12 lg:col-span-5 lg:pr-12"
                style={{ borderRight: `1px solid ${FAINT}` }}
              >
                <p
                  className="text-[11px] uppercase tracking-[0.16em]"
                  style={{ fontFamily: mono, color: MUTE }}
                >
                  {api.kicker}
                </p>
                <h3 className="mt-4 text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-[1.02] tracking-[-0.035em]">
                  {api.heading}
                </h3>
                <p
                  className="mt-6 text-[15px] leading-relaxed"
                  style={{ color: SUB }}
                >
                  {api.body1}
                </p>
                <p
                  className="mt-4 text-[14px] leading-relaxed"
                  style={{ color: MUTE }}
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

              {/* right: stack — emphasis layer is the blue instrument layer */}
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
                            : MUTE,
                        }}
                      >
                        L{i} · {layer.labelKicker}
                      </span>
                    </div>
                    <div className="col-span-12 sm:col-span-8">
                      <p className="text-lg font-semibold leading-tight tracking-[-0.025em]">
                        {layer.name}
                      </p>
                      <p
                        className="mt-1.5 text-[14px] leading-relaxed"
                        style={{
                          color: layer.emphasis
                            ? "rgba(255,255,255,0.92)"
                            : SUB,
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

        {/* ── Closing ───────────────────────────────────────────── */}
        <section id="closing" style={{ borderBottom: `1px solid ${INK}` }}>
          <div className="mx-auto max-w-[1190px] px-6 py-24 sm:px-10 sm:py-32">
            <div className="grid grid-cols-12">
              <div className="col-span-12 lg:col-span-9">
                <p
                  className="text-[11px] uppercase tracking-[0.18em]"
                  style={{ fontFamily: mono, color: BLUE }}
                >
                  {closing.eyebrow}
                </p>
                <div className="relative mt-6">
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -top-10 right-0 select-none text-[7rem] font-semibold leading-none tracking-[-0.06em] sm:text-[11rem]"
                    style={{ color: "rgba(12,14,18,0.05)", fontFamily: mono }}
                  >
                    18
                  </span>
                  <h2 className="relative text-[clamp(2.5rem,6.5vw,5.5rem)] font-semibold leading-[0.92] tracking-[-0.045em]">
                    {closing.headlineLine1}
                    <br />
                    <span style={{ color: CORAL }}>{closing.headlineLine2}</span>
                  </h2>
                </div>
                <p
                  className="mt-8 max-w-lg text-lg leading-relaxed"
                  style={{ color: SUB }}
                >
                  {closing.body}
                </p>
                <a
                  href={EXTERNAL_LINKS.walkthroughMailto}
                  className="mt-10 inline-flex items-center gap-2 rounded-md px-7 py-4 text-[13px] font-semibold tracking-[-0.01em] text-white transition-colors"
                  style={{ background: INK }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = BLUE)}
                  onMouseLeave={(e) => (e.currentTarget.style.background = INK)}
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

        {/* ── Footer ────────────────────────────────────────────── */}
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
                  style={{ color: SUB }}
                >
                  {footer.tagline}
                </p>
                <p
                  className="mt-5 text-[11px] uppercase tracking-[0.1em]"
                  style={{ fontFamily: mono, color: MUTE }}
                >
                  {footer.meta}
                </p>
                <p
                  className="mt-2 text-[11px] tabular-nums"
                  style={{ fontFamily: mono, color: MUTE }}
                >
                  {footer.copyright}
                </p>
              </div>
              <div className="col-span-12 grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8 lg:pl-10">
                {Object.entries(footer.columns).map(([key, links]) => (
                  <div key={key}>
                    <h3
                      className="mb-4 pb-2 text-[11px] font-semibold uppercase tracking-[0.12em]"
                      style={{ borderBottom: `1px solid ${INK}` }}
                    >
                      {key}
                    </h3>
                    <ul className="space-y-2.5">
                      {links.map((link) => (
                        <li key={link.name}>
                          <a
                            href={link.href}
                            className="text-[13px] transition-colors"
                            style={{ color: SUB }}
                            onMouseEnter={(e) =>
                              (e.currentTarget.style.color = BLUE)
                            }
                            onMouseLeave={(e) => (e.currentTarget.style.color = SUB)}
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
              style={{ borderTop: `1px solid ${INK}` }}
            >
              <Link
                href="/explore"
                className="text-[12px] font-semibold uppercase tracking-[0.1em] transition-colors"
                style={{ color: SUB }}
                onMouseEnter={(e) => (e.currentTarget.style.color = BLUE)}
                onMouseLeave={(e) => (e.currentTarget.style.color = SUB)}
              >
                ← Back to all iterations
              </Link>
              <span
                className="text-[11px] uppercase tracking-[0.12em]"
                style={{ fontFamily: mono, color: MUTE }}
              >
                Iteration 18 · Instrument Coral
              </span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
