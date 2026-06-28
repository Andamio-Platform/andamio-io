"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Head from "next/head";
import Link from "next/link";
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
 * Iteration 19 — "Warm Index".
 *
 * The most Swiss-monochrome of the convergence set. Ink on pure white carries
 * everything: 11's faint fixed 12-column grid field, 11's generous vertical
 * rhythm (full-width hairline rules with big padding between sections), and
 * 12's refined type cut — Inter semibold (600), tracking ~-0.045em, leading
 * ~0.92. JetBrains Mono only for small labels, section numbers, and readouts.
 *
 * Wayfinding: a FIXED FLOATING OUTLINE RAIL pinned to the RIGHT (15's placement
 * + floating form) carrying 12's section-bookmark FUNCTION — a compact section
 * index / table-of-contents with the current area subtly emphasized, plus one
 * live VERIFIED readout. Rail is cool-blue. Hidden below xl.
 *
 * Three-color theme, orange disciplined: ORANGE (#FF6B35) is the LEAD accent
 * but used PRECISELY — the "upgrade" word, the single primary CTA, the live
 * pulse dot, the VERIFIED stamp. COOL-BLUE (#2F6BFF) is secondary, confined to
 * the right rail. CORAL (#FF6B4A) is a soft tertiary tint behind exactly one
 * zone — the specimen plate. Everything else is ink-heavy monochrome.
 *
 * Spine (kept): full-bleed type hero with the badge WITHHELD; the first section
 * after it (id="how-it-works") slides the credential in sideways on scroll,
 * framed as a museum specimen, and doubles as the "how it works" demo.
 */

const SANS = "'Inter', system-ui, -apple-system, sans-serif";
const MONO = "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace";

const PAPER = "#FFFFFF";
const INK = "#0A0A0A";
const ORANGE = "#FF6B35"; // lead accent — sparing
const BLUE = "#2F6BFF"; // secondary — rail only
const CORAL_TINT = "rgba(255,107,74,0.055)"; // tertiary — specimen plate only

const NUMS = ["01", "02", "03", "04", "05", "06"];

/** The page outline — drives both the floating rail and section ids. */
const SECTIONS = [
  { id: "top", num: "00", label: "Hero" },
  { id: "how-it-works", num: "01", label: "How it works" },
  { id: "problem", num: "02", label: "The problem" },
  { id: "issuer", num: "03", label: "Issuer" },
  { id: "ecosystem", num: "04", label: "Ecosystem" },
  { id: "andamio-api", num: "05", label: "API" },
  { id: "closing", num: "06", label: "Upgrade" },
] as const;

export default function Explore19() {
  const revealRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: revealRef,
    offset: ["start end", "center center"],
  });
  // Slides in from the RIGHT; deterministic at progress=0 for SSR/client match.
  const badgeX = useTransform(scrollYProgress, [0, 1], ["60%", "0%"]);
  const badgeOpacity = useTransform(scrollYProgress, [0, 0.55], [0, 1]);
  const frameWidth = useTransform(scrollYProgress, [0, 1], ["44%", "100%"]);

  // Wayfinding: track the current section. Deterministic initial value ("top")
  // so SSR and first client render agree; updates are client-only.
  const [active, setActive] = useState<string>("top");
  useEffect(() => {
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => el !== null,
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
      style={{ background: PAPER, color: INK, fontFamily: SANS }}
    >
      <Head>
        <title>21 · Warm Index · Left rail — Andamio</title>
        <meta
          name="description"
          content="Andamio — verifiable credentials, indexed. Swiss-monochrome, one warm signature."
        />
      </Head>

      {/* ── Fixed faint 12-column rule field (from 11) ─────────── */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 hidden justify-center md:flex"
      >
        <div className="grid h-full w-full max-w-[1320px] grid-cols-12 border-r border-black/[0.05] px-6 sm:px-10">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="border-l border-black/[0.05]" />
          ))}
        </div>
      </div>

      {/* ── Fixed floating OUTLINE RAIL, right side (15's form, 12's function) ─ */}
      <aside
        className="pointer-events-none fixed left-0 top-0 z-30 hidden h-screen w-[220px] flex-col justify-between py-24 pl-6 xl:flex"
        style={{
          borderRight: "1px solid rgba(10,10,10,0.10)",
          background: "rgba(255,255,255,0.62)",
          backdropFilter: "blur(2px)",
        }}
      >
        {/* index / table-of-contents */}
        <nav className="pointer-events-auto pl-5" aria-label="Section index">
          <div
            className="mb-5 flex items-center gap-2 text-[10px] uppercase tracking-[0.22em]"
            style={{ fontFamily: MONO, color: "rgba(10,10,10,0.45)" }}
          >
            <span
              className="inline-block h-1.5 w-1.5 rounded-full"
              style={{ background: BLUE }}
            />
            index
          </div>
          <ol className="space-y-2.5">
            {SECTIONS.map((s) => {
              const isActive = active === s.id;
              return (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="group flex items-center gap-3 transition-colors"
                    style={{ fontFamily: MONO }}
                  >
                    <span
                      className="inline-block h-px transition-all"
                      style={{
                        width: isActive ? 20 : 10,
                        background: isActive ? BLUE : "rgba(10,10,10,0.25)",
                      }}
                    />
                    <span
                      className="text-[10px] tabular-nums"
                      style={{ color: isActive ? BLUE : "rgba(10,10,10,0.35)" }}
                    >
                      {s.num}
                    </span>
                    <span
                      className="text-[11px] tracking-[0.02em] transition-colors"
                      style={{
                        color: isActive ? INK : "rgba(10,10,10,0.45)",
                        fontWeight: isActive ? 600 : 400,
                      }}
                    >
                      {s.label}
                    </span>
                  </a>
                </li>
              );
            })}
          </ol>
        </nav>

        {/* one live readout + console footer */}
        <div className="pl-5" style={{ fontFamily: MONO }}>
          <div className="flex flex-col gap-0.5">
            <span
              className="text-[9px] uppercase tracking-[0.16em]"
              style={{ color: "rgba(10,10,10,0.38)" }}
            >
              status
            </span>
            <span
              className="flex items-center gap-2 text-[12px] tabular-nums"
              style={{ color: BLUE }}
            >
              <span
                className="inline-block h-1.5 w-1.5 animate-pulse rounded-full"
                style={{ background: ORANGE }}
              />
              VERIFIED
            </span>
          </div>
          <p
            className="mt-4 text-[9px] uppercase tracking-[0.18em]"
            style={{ color: "rgba(10,10,10,0.3)" }}
          >
            andamio · index v3
          </p>
        </div>
      </aside>

      <div className="relative z-10 xl:pl-[220px]">
        {/* ── Nav ─────────────────────────────────────────────── */}
        <header className="sticky top-0 z-50 border-b border-[#0A0A0A] bg-white/95 backdrop-blur">
          <div className="mx-auto flex max-w-[1320px] items-center justify-between px-6 py-3.5 sm:px-10">
            <a
              href="#top"
              className="flex items-baseline gap-2.5 text-[17px] font-semibold tracking-[-0.04em]"
            >
              <span
                aria-hidden
                className="inline-block h-2.5 w-2.5 translate-y-[1px]"
                style={{ background: ORANGE }}
              />
              {nav.brand}
            </a>
            <nav className="hidden items-center gap-6 lg:flex">
              {nav.items.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-[12px] tracking-[0.02em] text-black/55 transition-colors hover:text-[#0A0A0A]"
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <a
              href={nav.cta.href}
              className="border border-[#0A0A0A] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-white transition-colors hover:border-[#FF6B35] hover:bg-[#FF6B35]"
              style={{ background: INK, fontFamily: MONO }}
            >
              {nav.cta.label}
            </a>
          </div>
        </header>

        {/* ── Hero (full-bleed type, NO badge) ────────────────── */}
        <section id="top" className="border-b border-[#0A0A0A]">
          <div className="mx-auto max-w-[1320px] px-6 sm:px-10">
            <div className="flex items-center gap-4 pt-16 sm:pt-24">
              <span
                className="text-[11px] uppercase tracking-[0.2em] text-black/55"
                style={{ fontFamily: MONO }}
              >
                Andamio / Credentialing
              </span>
              <span className="h-px flex-1 bg-[#0A0A0A]" />
              <span
                className="hidden text-[11px] uppercase tracking-[0.16em] text-black/35 tabular-nums sm:inline"
                style={{ fontFamily: MONO }}
              >
                Index No. 21
              </span>
            </div>

            <h1 className="mt-12 max-w-[15ch] text-[clamp(2.9rem,8.5vw,7rem)] font-semibold leading-[0.92] tracking-[-0.045em]">
              {hero.headlineLead}{" "}
              <span style={{ color: ORANGE }}>{hero.headlineAccent}</span>
            </h1>

            {/* CTA cluster — single primary CTA in orange, secondary in ink */}
            <div className="mb-16 mt-12 flex flex-col sm:mb-24 sm:flex-row sm:flex-wrap sm:items-stretch">
              <span
                className="flex items-center border border-[#0A0A0A] px-5 py-3 text-[10px] uppercase tracking-[0.18em] text-black/50"
                style={{ fontFamily: MONO }}
              >
                {hero.ctaEyebrow}
              </span>
              <a
                href={hero.primaryCta.href}
                className="-mt-px flex items-center justify-between gap-4 border px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.1em] text-white transition-transform hover:-translate-y-px sm:-mt-0 sm:-ml-px"
                style={{ background: ORANGE, borderColor: ORANGE, fontFamily: MONO }}
              >
                {hero.primaryCta.label}
                <span aria-hidden>→</span>
              </a>
              <a
                href={hero.secondaryCta.href}
                className="-mt-px flex items-center justify-between gap-4 border border-[#0A0A0A] px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.1em] transition-colors hover:bg-[#0A0A0A] hover:text-white sm:-mt-0 sm:-ml-px"
                style={{ fontFamily: MONO }}
              >
                {hero.secondaryCta.label}
                <span aria-hidden>→</span>
              </a>
            </div>
          </div>
        </section>

        {/* ── Badge reveal / specimen + demo (id="how-it-works") ─ */}
        <section
          ref={revealRef}
          id="how-it-works"
          className="border-b border-[#0A0A0A]"
        >
          <div className="mx-auto max-w-[1320px] px-6 sm:px-10">
            <div className="flex flex-wrap items-center gap-4 pt-16 sm:pt-24">
              <span
                className="text-[11px] uppercase tracking-[0.18em] text-black/55"
                style={{ fontFamily: MONO }}
              >
                {demo.kicker}
              </span>
              <span
                className="inline-flex items-center gap-2 border border-[#0A0A0A] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em]"
                style={{ fontFamily: MONO }}
              >
                <span
                  className="h-1.5 w-1.5 animate-pulse"
                  style={{ background: ORANGE }}
                />
                {demo.liveLabel}
              </span>
              <span className="h-px flex-1 bg-[#0A0A0A]" />
              <span
                className="hidden text-[11px] uppercase tracking-[0.16em] text-black/35 tabular-nums sm:inline"
                style={{ fontFamily: MONO }}
              >
                Specimen 001
              </span>
            </div>

            <div className="grid grid-cols-12 gap-y-12 py-14 sm:py-20">
              {/* left: demo copy, snapped hard-left */}
              <div className="col-span-12 lg:col-span-5 lg:pr-12">
                <span
                  className="block text-[7rem] font-semibold leading-[0.8] tracking-[-0.05em] tabular-nums text-black/[0.12] sm:text-[9rem]"
                >
                  01
                </span>
                <h2 className="mt-6 text-[clamp(1.9rem,4vw,2.9rem)] font-semibold leading-[1.0] tracking-[-0.035em]">
                  {demo.title}
                </h2>
                <p className="mt-6 max-w-md text-[15px] leading-relaxed text-black/60">
                  {demo.note}
                </p>

                {/* mono read-out block — data-sheet rigor, monochrome */}
                <dl
                  className="mt-8 max-w-md border-t border-black/15 text-[12px]"
                  style={{ fontFamily: MONO }}
                >
                  {[
                    ["format", "SVG · machine-readable"],
                    ["registry", "On-chain · Cardano"],
                    ["status", "Verifiable"],
                  ].map(([k, v]) => (
                    <div
                      key={k}
                      className="flex items-center justify-between border-b border-black/15 py-2.5"
                    >
                      <dt className="uppercase tracking-[0.12em] text-black/45">
                        {k}
                      </dt>
                      <dd className="text-[#0A0A0A]">{v}</dd>
                    </div>
                  ))}
                </dl>

                <a
                  href="#issuer"
                  className="mt-8 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.1em] transition-colors hover:text-black/55"
                  style={{ fontFamily: MONO }}
                >
                  <span className="h-2 w-2" style={{ background: INK }} />
                  {demo.inspirationCta}
                </a>
              </div>

              {/* right: specimen plate — coral-tinted, badge slides in from RIGHT */}
              <div className="col-span-12 lg:col-span-7">
                <motion.figure
                  style={{ width: frameWidth }}
                  className="ml-auto border border-[#0A0A0A]"
                >
                  {/* top corner labels */}
                  <div className="flex items-center justify-between border-b border-[#0A0A0A]">
                    <span
                      className="px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.14em]"
                      style={{ fontFamily: MONO }}
                    >
                      Specimen 001
                    </span>
                    <span
                      className="inline-flex items-center gap-2 border-l border-[#0A0A0A] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.14em]"
                      style={{ color: ORANGE, fontFamily: MONO }}
                    >
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ background: ORANGE }}
                      />
                      Verified
                    </span>
                  </div>

                  {/* specimen body — the one coral-tinted zone */}
                  <div
                    className="overflow-hidden"
                    style={{ background: CORAL_TINT }}
                  >
                    <motion.div
                      style={{ x: badgeX, opacity: badgeOpacity }}
                      className="flex items-center justify-center px-8 py-12 sm:px-12 sm:py-16"
                    >
                      <img
                        src={CREDENTIAL_BADGE_SRC}
                        alt={hero.badgeAlt}
                        width={520}
                        height={520}
                        className="w-full max-w-[360px]"
                      />
                    </motion.div>
                  </div>

                  {/* caption + bottom corner labels */}
                  <figcaption className="border-t border-[#0A0A0A]">
                    <p className="px-4 py-4 text-[13px] leading-relaxed text-black/60">
                      {hero.badgeCaption}
                    </p>
                    <div className="flex items-center justify-between border-t border-black/15">
                      <span
                        className="px-4 py-2 text-[10px] uppercase tracking-[0.14em] text-black/40 tabular-nums"
                        style={{ fontFamily: MONO }}
                      >
                        SVG · Cardano mainnet
                      </span>
                      <span
                        className="border-l border-black/15 px-4 py-2 text-[10px] uppercase tracking-[0.14em] text-black/40"
                        style={{ fontFamily: MONO }}
                      >
                        Fig. 001
                      </span>
                    </div>
                  </figcaption>
                </motion.figure>
              </div>
            </div>
          </div>
        </section>

        {/* ── Problem ─────────────────────────────────────────── */}
        <section id="problem" className="border-b border-[#0A0A0A]">
          <div className="mx-auto max-w-[1320px] px-6 sm:px-10">
            <div className="grid grid-cols-12 gap-y-10 py-16 sm:py-24">
              <div className="col-span-12 lg:col-span-4 lg:pr-10">
                <p
                  className="text-[11px] uppercase tracking-[0.18em] text-black/55"
                  style={{ fontFamily: MONO }}
                >
                  {problem.kicker}
                </p>
                <h2 className="mt-5 text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-[0.95] tracking-[-0.045em]">
                  {problem.heading}
                </h2>
              </div>
              <p className="col-span-12 self-end text-xl leading-snug tracking-[-0.015em] text-black/70 lg:col-span-7 lg:col-start-6">
                {problem.intro}
              </p>
            </div>

            <div className="grid grid-cols-12 border-t border-[#0A0A0A]">
              {problem.items.map((p, i) => (
                <div
                  key={p.headline}
                  className="col-span-12 py-10 sm:col-span-4 sm:[&:not(:first-child)]:border-l sm:[&:not(:first-child)]:border-black/15 sm:[&:not(:first-child)]:pl-8 lg:py-12 [&:not(:first-child)]:border-t [&:not(:first-child)]:border-black/15 [&:not(:first-child)]:pt-10 sm:[&:not(:first-child)]:border-t-0 sm:[&:not(:first-child)]:pt-12"
                >
                  <span
                    className="block text-6xl font-semibold leading-none tracking-[-0.05em] tabular-nums text-black/[0.14]"
                  >
                    {NUMS[i]}
                  </span>
                  <h3 className="mt-6 text-xl font-semibold leading-tight tracking-[-0.03em]">
                    {p.headline}
                  </h3>
                  <p className="mt-3 max-w-sm text-[14px] leading-relaxed text-black/60">
                    {p.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Issuer ──────────────────────────────────────────── */}
        <section id="issuer" className="border-b border-[#0A0A0A]">
          <div className="mx-auto max-w-[1320px] px-6 sm:px-10">
            <div className="grid grid-cols-12 gap-y-8 py-16 sm:py-24">
              <div className="col-span-12 lg:col-span-7">
                <p
                  className="text-[11px] uppercase tracking-[0.18em] text-black/55"
                  style={{ fontFamily: MONO }}
                >
                  {issuer.productLabel}
                </p>
                <h2 className="mt-5 text-[clamp(2.6rem,7vw,5.5rem)] font-semibold leading-[0.92] tracking-[-0.045em]">
                  {issuer.title}
                </h2>
              </div>
              <p className="col-span-12 self-end text-lg leading-relaxed text-black/65 lg:col-span-5 lg:pl-8">
                {issuer.intro}
              </p>
            </div>

            <div className="border-t border-[#0A0A0A] pt-8">
              <span className="text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
                {issuer.decisionsHeading}
              </span>
            </div>

            <div className="mt-10 grid grid-cols-12 border-t border-[#0A0A0A]">
              {issuer.decisions.map((d, i) => (
                <div
                  key={d.title}
                  className="col-span-12 py-9 sm:col-span-6 sm:px-7 lg:col-span-4 [&:not(:nth-child(-n+1))]:border-t [&:not(:nth-child(-n+1))]:border-black/15 sm:[&:not(:nth-child(-n+2))]:border-t lg:[&:not(:nth-child(-n+3))]:border-t sm:[&:nth-child(even)]:border-l sm:[&:nth-child(even)]:border-black/15 lg:[&:nth-child(3n+2)]:border-l lg:[&:nth-child(3n)]:border-l lg:[&:nth-child(3n+2)]:border-black/15 lg:[&:nth-child(3n)]:border-black/15"
                >
                  <div className="flex items-baseline gap-4">
                    <span
                      className="text-[12px] uppercase tracking-[0.14em] tabular-nums text-black/45"
                      style={{ fontFamily: MONO }}
                    >
                      D-{NUMS[i]}
                    </span>
                    <span className="h-px flex-1 translate-y-[-4px] bg-black/15" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold leading-snug tracking-[-0.03em]">
                    {d.title}
                  </h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-black/60">
                    {d.body}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-col border-t border-[#0A0A0A] py-10 sm:flex-row sm:flex-wrap sm:items-stretch">
              <span
                aria-disabled="true"
                className="flex cursor-not-allowed items-center justify-center border border-black/25 px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.1em] text-black/35"
                style={{ fontFamily: MONO }}
              >
                {issuer.reportCta}
                <span
                  className="ml-3 text-[10px] uppercase tracking-[0.14em]"
                  style={{ fontFamily: MONO }}
                >
                  soon
                </span>
              </span>
              <a
                href={EXTERNAL_LINKS.walkthroughMailto}
                className="-mt-px flex items-center justify-center border border-[#0A0A0A] px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.1em] text-white transition-colors hover:border-[#FF6B35] hover:bg-[#FF6B35] sm:-mt-0 sm:-ml-px"
                style={{ background: INK, fontFamily: MONO }}
              >
                {issuer.walkthroughCta}
              </a>
            </div>
          </div>
        </section>

        {/* ── Ecosystem ───────────────────────────────────────── */}
        <section id="ecosystem" className="border-b border-[#0A0A0A]">
          <div className="mx-auto max-w-[1320px] px-6 sm:px-10">
            <div className="grid grid-cols-12 gap-y-10 py-16 sm:py-24">
              <div className="col-span-12 lg:col-span-5 lg:pr-10">
                <p
                  className="text-[11px] uppercase tracking-[0.18em] text-black/55"
                  style={{ fontFamily: MONO }}
                >
                  {ecosystem.kicker}
                </p>
                <p className="mt-6 text-[clamp(1.6rem,3.4vw,2.6rem)] font-semibold leading-[1.05] tracking-[-0.04em]">
                  {ecosystem.lead}
                </p>
              </div>
              <div className="col-span-12 grid grid-cols-1 self-end border-t border-[#0A0A0A] sm:grid-cols-2 lg:col-span-7">
                {ecosystem.items.map((it, i) => (
                  <div
                    key={it.title}
                    className={`py-8 ${
                      i === 1
                        ? "border-t border-black/15 pt-8 sm:border-l sm:border-t-0 sm:pl-7"
                        : ""
                    }`}
                  >
                    <p className="flex items-baseline gap-2 text-[13px] font-semibold uppercase tracking-[0.1em]">
                      <span
                        className="text-[12px] tabular-nums text-black/45"
                        style={{ fontFamily: MONO }}
                      >
                        {NUMS[i]}
                      </span>
                      {it.title}
                    </p>
                    <p className="mt-3 text-[14px] leading-relaxed text-black/60">
                      {it.body}
                    </p>
                  </div>
                ))}
                <p
                  className="col-span-1 border-t border-black/15 py-4 text-[12px] tabular-nums text-black/40 sm:col-span-2"
                  style={{ fontFamily: MONO }}
                >
                  {ecosystem.footnote}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── API / Architecture ──────────────────────────────── */}
        <section id="andamio-api" className="border-b border-[#0A0A0A]">
          <div className="mx-auto max-w-[1320px] px-6 sm:px-10">
            <div className="grid grid-cols-12 gap-y-8 py-16 sm:py-24">
              <div className="col-span-12 lg:col-span-7">
                <p
                  className="text-[11px] uppercase tracking-[0.18em] text-black/55"
                  style={{ fontFamily: MONO }}
                >
                  {api.zoneLabel}
                </p>
                <h2 className="mt-5 text-[clamp(2.6rem,7vw,5.5rem)] font-semibold leading-[0.92] tracking-[-0.045em]">
                  {api.zoneTitle}
                </h2>
              </div>
              <p className="col-span-12 self-end text-lg leading-relaxed text-black/65 lg:col-span-5 lg:pl-8">
                {api.zoneBlurb}
              </p>
            </div>

            <div className="grid grid-cols-12 border-t border-[#0A0A0A]">
              <div className="col-span-12 py-12 lg:col-span-5 lg:border-r lg:border-black/15 lg:pr-12">
                <p
                  className="text-[11px] uppercase tracking-[0.18em] text-black/40"
                  style={{ fontFamily: MONO }}
                >
                  {api.kicker}
                </p>
                <h3 className="mt-4 text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-[1.04] tracking-[-0.035em]">
                  {api.heading}
                </h3>
                <p className="mt-6 text-[15px] leading-relaxed text-black/65">
                  {api.body1}
                </p>
                <p className="mt-4 text-[14px] leading-relaxed text-black/55">
                  {api.body2}
                </p>
                <a
                  href={EXTERNAL_LINKS.apiReference}
                  className="mt-8 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.1em] transition-colors hover:text-black/55"
                  style={{ fontFamily: MONO }}
                >
                  <span className="h-2 w-2" style={{ background: INK }} />
                  {api.apiRefCta}
                </a>
              </div>

              <div className="col-span-12 lg:col-span-7">
                {api.stack.map((layer, i) => (
                  <div
                    key={layer.name}
                    className={`grid grid-cols-12 items-baseline gap-4 py-7 lg:px-10 ${
                      i > 0 ? "border-t border-black/15" : ""
                    }`}
                    style={
                      layer.emphasis
                        ? { background: INK, color: "#fff" }
                        : undefined
                    }
                  >
                    <div className="col-span-12 sm:col-span-3">
                      <span
                        className={`text-[11px] uppercase tracking-[0.12em] ${
                          layer.emphasis ? "text-white/85" : "text-black/40"
                        }`}
                        style={{ fontFamily: MONO }}
                      >
                        L{i} · {layer.labelKicker}
                      </span>
                    </div>
                    <div className="col-span-12 sm:col-span-9">
                      <p className="flex items-center gap-3 text-lg font-semibold leading-tight tracking-[-0.03em]">
                        {layer.name}
                        {layer.emphasis ? (
                          <span
                            aria-hidden
                            className="inline-block h-2 w-2"
                            style={{ background: ORANGE }}
                          />
                        ) : null}
                      </p>
                      <p
                        className={`mt-1.5 text-[14px] leading-relaxed ${
                          layer.emphasis ? "text-white/90" : "text-black/55"
                        }`}
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
        <section id="closing" className="border-b border-[#0A0A0A]">
          <div className="mx-auto max-w-[1320px] px-6 sm:px-10">
            <div className="grid grid-cols-12 py-20 sm:py-28">
              <div className="col-span-12 lg:col-span-8">
                <p
                  className="text-[11px] uppercase tracking-[0.18em] text-black/55"
                  style={{ fontFamily: MONO }}
                >
                  {closing.eyebrow}
                </p>
                <h2 className="mt-6 text-[clamp(2.5rem,7vw,5.5rem)] font-semibold leading-[0.92] tracking-[-0.045em]">
                  {closing.headlineLine1}
                  <br />
                  {closing.headlineLine2}
                </h2>
                <p className="mt-8 max-w-lg text-lg leading-relaxed text-black/65">
                  {closing.body}
                </p>
                <a
                  href={EXTERNAL_LINKS.walkthroughMailto}
                  className="mt-10 inline-flex items-center gap-3 border border-[#0A0A0A] px-7 py-4 text-[12px] font-semibold uppercase tracking-[0.1em] text-white transition-colors hover:border-[#FF6B35] hover:bg-[#FF6B35]"
                  style={{ background: INK, fontFamily: MONO }}
                >
                  {closing.cta}
                  <span aria-hidden>→</span>
                </a>
              </div>
              <div className="col-span-12 mt-12 flex items-end justify-end lg:col-span-4 lg:mt-0">
                <span className="text-[8rem] font-semibold leading-none tracking-[-0.06em] tabular-nums text-black/[0.08] sm:text-[11rem]">
                  21
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ── Footer ──────────────────────────────────────────── */}
        <footer>
          <div className="mx-auto max-w-[1320px] px-6 sm:px-10">
            <div className="grid grid-cols-12 gap-y-10 py-14">
              <div className="col-span-12 lg:col-span-4 lg:pr-10">
                <span className="flex items-baseline gap-2.5 text-[17px] font-semibold tracking-[-0.04em]">
                  <span
                    aria-hidden
                    className="inline-block h-2.5 w-2.5 translate-y-[1px]"
                    style={{ background: ORANGE }}
                  />
                  {nav.brand}
                </span>
                <p className="mt-4 max-w-xs text-[13px] leading-relaxed text-black/55">
                  {footer.tagline}
                </p>
                <p
                  className="mt-5 text-[11px] uppercase tracking-[0.1em] text-black/45"
                  style={{ fontFamily: MONO }}
                >
                  {footer.meta}
                </p>
                <p
                  className="mt-2 text-[11px] tabular-nums text-black/40"
                  style={{ fontFamily: MONO }}
                >
                  {footer.copyright}
                </p>
              </div>
              <div className="col-span-12 grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8 lg:pl-10">
                {Object.entries(footer.columns).map(([key, links]) => (
                  <div key={key}>
                    <h3
                      className="mb-4 border-b border-[#0A0A0A] pb-2 text-[11px] font-semibold uppercase tracking-[0.12em]"
                      style={{ fontFamily: MONO }}
                    >
                      {key}
                    </h3>
                    <ul className="space-y-2.5">
                      {links.map((link) => (
                        <li key={link.name}>
                          <a
                            href={link.href}
                            className="text-[13px] text-black/60 transition-colors hover:text-[#0A0A0A]"
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
            <div className="flex flex-col items-start justify-between gap-3 border-t border-[#0A0A0A] py-5 sm:flex-row sm:items-center">
              <Link
                href="/explore"
                className="text-[12px] font-semibold uppercase tracking-[0.1em] text-black/50 transition-colors hover:text-[#0A0A0A]"
                style={{ fontFamily: MONO }}
              >
                ← Back to all iterations
              </Link>
              <span
                className="text-[11px] uppercase tracking-[0.12em] text-black/35"
                style={{ fontFamily: MONO }}
              >
                Iteration 21 · Warm Index · Left rail
              </span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
