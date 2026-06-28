"use client";

import { useRef } from "react";
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
 * Iteration 11 — "Swiss Coral".
 *
 * Strictest International Typographic discipline on pure white. A faint, fixed
 * 12-column rule field runs behind the whole page; every block snaps hard-left
 * to that grid. Inter for display and body with tight negative tracking; big
 * tabular section numerals mark each section; 1px black rules bound everything.
 * Coral (#FF6B4A) is the only accent — the "upgrade" word, the live pill,
 * emphasis, the emphasized API layer. No shadows, no rounding, no orange.
 *
 * Signature interaction: the credential is WITHHELD from the hero. In the first
 * section after the hero (id="how-it-works"), the badge slides in sideways from
 * the RIGHT into a grid-anchored specimen cell on the right columns as the user
 * scrolls into the section, framed as "Specimen 001 / On-chain". The reveal
 * section also carries the demo copy, so it is both the badge reveal and the
 * "how it works" demo.
 */

const PAPER = "#FFFFFF";
const INK = "#0A0A0A";
const CORAL = "#FF6B4A";

const sans = "'Inter', system-ui, -apple-system, sans-serif";
const mono =
  "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace";

const NUMS = ["01", "02", "03", "04", "05", "06"];

export default function Explore11() {
  const revealRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: revealRef,
    offset: ["start end", "center center"],
  });
  // Slides in from the RIGHT; deterministic at progress=0 for SSR/client match.
  const badgeX = useTransform(scrollYProgress, [0, 1], ["64%", "0%"]);
  const badgeOpacity = useTransform(scrollYProgress, [0, 0.55], [0, 1]);
  const frameWidth = useTransform(scrollYProgress, [0, 1], ["40%", "100%"]);

  return (
    <div
      className="relative min-h-screen antialiased"
      style={{ background: PAPER, color: INK, fontFamily: sans }}
    >
      <Head>
        <title>11 · Swiss Coral — Andamio</title>
      </Head>

      {/* ── Fixed faint 12-column rule field ──────────────────── */}
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

      <div className="relative z-10">
        {/* ── Nav ─────────────────────────────────────────────── */}
        <header className="sticky top-0 z-50 border-b border-[#0A0A0A] bg-white/95 backdrop-blur">
          <div className="mx-auto flex max-w-[1320px] items-center justify-between px-6 py-3 sm:px-10">
            <a
              href="#top"
              className="flex items-baseline gap-2 text-lg font-bold tracking-[-0.05em]"
            >
              <span
                className="inline-block h-3 w-3 translate-y-[1px]"
                style={{ background: CORAL }}
              />
              {nav.brand}
            </a>
            <nav className="hidden items-center gap-6 lg:flex">
              {nav.items.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-[11px] font-semibold uppercase tracking-[0.1em] text-black/55 transition-colors hover:text-[#FF6B4A]"
                  style={{ fontFamily: mono }}
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <a
              href={nav.cta.href}
              className="border border-[#0A0A0A] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.1em] text-white transition-colors hover:bg-[#FF6B4A] hover:border-[#FF6B4A]"
              style={{ background: INK, fontFamily: mono }}
            >
              {nav.cta.label}
            </a>
          </div>
        </header>

        {/* ── Hero (full-bleed type, NO badge) ────────────────── */}
        <section id="top" className="border-b border-[#0A0A0A]">
          <div className="mx-auto max-w-[1320px] px-6 sm:px-10">
            <div className="grid grid-cols-12">
              <div className="col-span-12 pb-14 pt-16 sm:pt-24 lg:pb-24">
                <div className="flex items-center gap-4">
                  <span
                    className="text-[11px] font-bold uppercase tracking-[0.2em]"
                    style={{ color: CORAL, fontFamily: mono }}
                  >
                    Andamio / Credentialing
                  </span>
                  <span className="h-px flex-1 bg-[#0A0A0A]" />
                  <span
                    className="hidden text-[11px] uppercase tracking-[0.16em] text-black/35 sm:inline tabular-nums"
                    style={{ fontFamily: mono }}
                  >
                    No. 11 — Swiss Coral
                  </span>
                </div>
                <h1 className="mt-10 max-w-[16ch] text-[clamp(3.25rem,11vw,9.5rem)] font-bold leading-[0.86] tracking-[-0.055em]">
                  {hero.headlineLead}{" "}
                  <span style={{ color: CORAL }}>{hero.headlineAccent}</span>
                </h1>

                {/* CTA cluster only */}
                <div className="mt-14 flex flex-wrap items-stretch border border-[#0A0A0A]">
                  <span
                    className="flex items-center border-b border-[#0A0A0A] px-5 py-3 text-[10px] font-bold uppercase tracking-[0.18em] text-black/50 sm:border-b-0 sm:border-r"
                    style={{ fontFamily: mono }}
                  >
                    {hero.ctaEyebrow}
                  </span>
                  <a
                    href={hero.primaryCta.href}
                    className="flex flex-1 items-center justify-center border-b border-[#0A0A0A] px-6 py-3 text-[12px] font-bold uppercase tracking-[0.1em] text-white transition-colors hover:bg-[#FF6B4A] sm:flex-none sm:border-b-0 sm:border-r"
                    style={{ background: INK, fontFamily: mono }}
                  >
                    {hero.primaryCta.label}
                  </a>
                  <a
                    href={hero.secondaryCta.href}
                    className="flex flex-1 items-center justify-center px-6 py-3 text-[12px] font-bold uppercase tracking-[0.1em] transition-colors hover:bg-[#0A0A0A] hover:text-white sm:flex-none"
                    style={{ fontFamily: mono }}
                  >
                    {hero.secondaryCta.label}
                  </a>
                </div>
              </div>
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
            <div className="flex items-center gap-4 pt-16 sm:pt-24">
              <span
                className="text-[11px] font-bold uppercase tracking-[0.18em]"
                style={{ color: CORAL, fontFamily: mono }}
              >
                {demo.kicker}
              </span>
              <span
                className="inline-flex items-center gap-2 border border-[#0A0A0A] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em]"
                style={{ fontFamily: mono }}
              >
                <span
                  className="h-1.5 w-1.5 animate-pulse"
                  style={{ background: CORAL }}
                />
                {demo.liveLabel}
              </span>
              <span className="h-px flex-1 bg-[#0A0A0A]" />
              <span
                className="hidden text-[11px] uppercase tracking-[0.16em] text-black/35 sm:inline tabular-nums"
                style={{ fontFamily: mono }}
              >
                Specimen 001
              </span>
            </div>

            <div className="grid grid-cols-12 gap-y-10 py-12 sm:py-16">
              {/* left: demo copy, snapped hard-left */}
              <div className="col-span-12 lg:col-span-5 lg:pr-12">
                <span
                  className="block text-[7rem] font-bold leading-[0.8] tracking-[-0.06em] tabular-nums sm:text-[9rem]"
                  style={{ color: CORAL }}
                >
                  01
                </span>
                <h2 className="mt-6 text-3xl font-bold leading-[1.0] tracking-[-0.04em] sm:text-[2.75rem]">
                  {demo.title}
                </h2>
                <p className="mt-6 max-w-md text-[15px] leading-relaxed text-black/60">
                  {demo.note}
                </p>
                <a
                  href="#issuer"
                  className="mt-8 inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.1em] transition-colors hover:text-[#FF6B4A]"
                  style={{ fontFamily: mono }}
                >
                  <span className="h-2 w-2" style={{ background: CORAL }} />
                  {demo.inspirationCta}
                </a>
              </div>

              {/* right: grid-anchored specimen cell — badge slides in from RIGHT */}
              <div className="col-span-12 lg:col-span-7">
                <motion.div
                  style={{ width: frameWidth }}
                  className="ml-auto border border-[#0A0A0A]"
                >
                  {/* top corner labels */}
                  <div className="flex items-center justify-between border-b border-[#0A0A0A]">
                    <span
                      className="px-4 py-2 text-[10px] font-bold uppercase tracking-[0.14em]"
                      style={{ color: CORAL, fontFamily: mono }}
                    >
                      Specimen 001
                    </span>
                    <span
                      className="border-l border-[#0A0A0A] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.14em] text-black/45"
                      style={{ fontFamily: mono }}
                    >
                      On-chain
                    </span>
                  </div>

                  {/* specimen body */}
                  <div className="overflow-hidden">
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
                        style={{ fontFamily: mono }}
                      >
                        SVG · Cardano mainnet
                      </span>
                      <span
                        className="border-l border-black/15 px-4 py-2 text-[10px] uppercase tracking-[0.14em] text-black/40"
                        style={{ fontFamily: mono }}
                      >
                        Fig. 001
                      </span>
                    </div>
                  </figcaption>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Problem ─────────────────────────────────────────── */}
        <section className="border-b border-[#0A0A0A]">
          <div className="mx-auto max-w-[1320px] px-6 sm:px-10">
            <div className="grid grid-cols-12 gap-y-10 py-16 sm:py-24">
              <div className="col-span-12 lg:col-span-4 lg:pr-10">
                <p
                  className="text-[11px] font-bold uppercase tracking-[0.18em]"
                  style={{ color: CORAL, fontFamily: mono }}
                >
                  {problem.kicker}
                </p>
                <h2 className="mt-5 text-4xl font-bold leading-[0.95] tracking-[-0.045em] sm:text-6xl">
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
                    className="block text-6xl font-bold tabular-nums leading-none tracking-[-0.05em]"
                    style={{ color: CORAL }}
                  >
                    {NUMS[i]}
                  </span>
                  <h3 className="mt-6 text-xl font-bold leading-tight tracking-[-0.03em]">
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
                  className="text-[11px] font-bold uppercase tracking-[0.18em]"
                  style={{ color: CORAL, fontFamily: mono }}
                >
                  {issuer.productLabel}
                </p>
                <h2 className="mt-5 text-6xl font-bold leading-[0.86] tracking-[-0.055em] sm:text-8xl">
                  {issuer.title}
                </h2>
              </div>
              <p className="col-span-12 self-end text-lg leading-relaxed text-black/65 lg:col-span-5 lg:pl-8">
                {issuer.intro}
              </p>
            </div>

            <div className="border-t border-[#0A0A0A] pt-8">
              <span className="text-2xl font-bold tracking-[-0.035em] sm:text-3xl">
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
                      className="text-4xl font-bold tabular-nums leading-none tracking-[-0.05em]"
                      style={{ color: CORAL }}
                    >
                      {NUMS[i]}
                    </span>
                    <span className="h-px flex-1 translate-y-[-6px] bg-black/15" />
                  </div>
                  <h3 className="mt-5 text-lg font-bold leading-snug tracking-[-0.03em]">
                    {d.title}
                  </h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-black/60">
                    {d.body}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-stretch border-t border-[#0A0A0A] py-10">
              <span
                aria-disabled="true"
                className="flex cursor-not-allowed items-center border border-black/25 px-6 py-3 text-[12px] font-bold uppercase tracking-[0.1em] text-black/35"
                style={{ fontFamily: mono }}
              >
                {issuer.reportCta}
              </span>
              <a
                href={EXTERNAL_LINKS.walkthroughMailto}
                className="-ml-px flex items-center border border-[#0A0A0A] px-6 py-3 text-[12px] font-bold uppercase tracking-[0.1em] text-white transition-colors hover:bg-[#FF6B4A] hover:border-[#FF6B4A]"
                style={{ background: INK, fontFamily: mono }}
              >
                {issuer.walkthroughCta}
              </a>
            </div>
          </div>
        </section>

        {/* ── Ecosystem ───────────────────────────────────────── */}
        <section className="border-b border-[#0A0A0A]">
          <div className="mx-auto max-w-[1320px] px-6 sm:px-10">
            <div className="grid grid-cols-12 gap-y-10 py-16 sm:py-24">
              <div className="col-span-12 lg:col-span-5 lg:pr-10">
                <p
                  className="text-[11px] font-bold uppercase tracking-[0.18em]"
                  style={{ color: CORAL, fontFamily: mono }}
                >
                  {ecosystem.kicker}
                </p>
                <p className="mt-6 text-3xl font-bold leading-[1.04] tracking-[-0.04em] sm:text-4xl">
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
                    <p className="text-[13px] font-bold uppercase tracking-[0.1em]">
                      <span
                        className="mr-2 tabular-nums"
                        style={{ color: CORAL }}
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
                  style={{ fontFamily: mono }}
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
                  className="text-[11px] font-bold uppercase tracking-[0.18em]"
                  style={{ color: CORAL, fontFamily: mono }}
                >
                  {api.zoneLabel}
                </p>
                <h2 className="mt-5 text-6xl font-bold leading-[0.86] tracking-[-0.055em] sm:text-8xl">
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
                  className="text-[11px] font-bold uppercase tracking-[0.18em] text-black/40"
                  style={{ fontFamily: mono }}
                >
                  {api.kicker}
                </p>
                <h3 className="mt-4 text-3xl font-bold leading-[1.0] tracking-[-0.04em] sm:text-4xl">
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
                  className="mt-8 inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.1em] transition-colors hover:text-[#FF6B4A]"
                  style={{ fontFamily: mono }}
                >
                  <span className="h-2 w-2" style={{ background: CORAL }} />
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
                        ? { background: CORAL, color: "#fff" }
                        : undefined
                    }
                  >
                    <div className="col-span-12 sm:col-span-3">
                      <span
                        className={`text-[11px] uppercase tracking-[0.12em] ${
                          layer.emphasis ? "text-white/85" : "text-black/40"
                        }`}
                        style={{ fontFamily: mono }}
                      >
                        {layer.labelKicker}
                      </span>
                    </div>
                    <div className="col-span-12 sm:col-span-9">
                      <p className="text-lg font-bold leading-tight tracking-[-0.03em]">
                        {layer.name}
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
        <section className="border-b border-[#0A0A0A]">
          <div className="mx-auto max-w-[1320px] px-6 sm:px-10">
            <div className="grid grid-cols-12 py-20 sm:py-28">
              <div className="col-span-12 lg:col-span-8">
                <p
                  className="text-[11px] font-bold uppercase tracking-[0.18em]"
                  style={{ color: CORAL, fontFamily: mono }}
                >
                  {closing.eyebrow}
                </p>
                <h2 className="mt-6 text-[clamp(2.5rem,7vw,5.5rem)] font-bold leading-[0.88] tracking-[-0.055em]">
                  {closing.headlineLine1}
                  <br />
                  <span style={{ color: CORAL }}>{closing.headlineLine2}</span>
                </h2>
                <p className="mt-8 max-w-lg text-lg leading-relaxed text-black/65">
                  {closing.body}
                </p>
                <a
                  href={EXTERNAL_LINKS.walkthroughMailto}
                  className="mt-10 inline-flex items-center border border-[#0A0A0A] px-7 py-4 text-[12px] font-bold uppercase tracking-[0.1em] text-white transition-colors hover:bg-[#FF6B4A] hover:border-[#FF6B4A]"
                  style={{ background: INK, fontFamily: mono }}
                >
                  {closing.cta}
                </a>
              </div>
              <div className="col-span-12 mt-12 flex items-end justify-end lg:col-span-4 lg:mt-0">
                <span className="text-[8rem] font-bold tabular-nums leading-none tracking-[-0.06em] text-black/10 sm:text-[11rem]">
                  11
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
                <span className="flex items-baseline gap-2 text-lg font-bold tracking-[-0.05em]">
                  <span
                    className="inline-block h-3 w-3 translate-y-[1px]"
                    style={{ background: CORAL }}
                  />
                  {nav.brand}
                </span>
                <p className="mt-4 max-w-xs text-[13px] leading-relaxed text-black/55">
                  {footer.tagline}
                </p>
                <p
                  className="mt-5 text-[11px] uppercase tracking-[0.1em] text-black/45"
                  style={{ fontFamily: mono }}
                >
                  {footer.meta}
                </p>
                <p
                  className="mt-2 text-[11px] tabular-nums text-black/40"
                  style={{ fontFamily: mono }}
                >
                  {footer.copyright}
                </p>
              </div>
              <div className="col-span-12 grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8 lg:pl-10">
                {Object.entries(footer.columns).map(([key, links]) => (
                  <div key={key}>
                    <h3
                      className="mb-4 border-b border-[#0A0A0A] pb-2 text-[11px] font-bold uppercase tracking-[0.12em]"
                      style={{ fontFamily: mono }}
                    >
                      {key}
                    </h3>
                    <ul className="space-y-2.5">
                      {links.map((link) => (
                        <li key={link.name}>
                          <a
                            href={link.href}
                            className="text-[13px] text-black/60 transition-colors hover:text-[#FF6B4A]"
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
            <div className="flex items-center justify-between border-t border-[#0A0A0A] py-5">
              <Link
                href="/explore"
                className="text-[12px] font-bold uppercase tracking-[0.1em] text-black/50 transition-colors hover:text-[#FF6B4A]"
                style={{ fontFamily: mono }}
              >
                ← Back to all iterations
              </Link>
              <span
                className="text-[11px] uppercase tracking-[0.12em] text-black/35"
                style={{ fontFamily: mono }}
              >
                Iteration 11 · Swiss Coral
              </span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
