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
 * Iteration 14 — "Editorial Vault".
 *
 * MIXED + cinematic. A warm editorial light page (Inter, generous measure)
 * carries most of the story. As the reader scrolls past the hero the page
 * drops into a deep-charcoal "VAULT" band where the credential slides
 * sideways into view under glass as a spotlit museum specimen. The page
 * returns to light afterward, then closes on one final charcoal band.
 * One accent: Coral #FF6B4A. No orange. No serif display.
 */

const PAPER = "#FBF8F4"; // warm editorial white
const INK = "#1B1814"; // near-black charcoal (also the vault color)
const VAULT = "#1B1814";
const CORAL = "#FF6B4A";

const sans = "'Inter', system-ui, -apple-system, sans-serif";
const mono = "'JetBrains Mono', ui-monospace, SFMono-Regular, monospace";

const NUMS = ["01", "02", "03", "04", "05", "06"];

export default function Explore14() {
  const revealRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: revealRef,
    offset: ["start end", "center center"],
  });

  // Signature interaction: badge slides sideways into the vault.
  const badgeX = useTransform(scrollYProgress, [0, 1], ["62%", "0%"]);
  const badgeOpacity = useTransform(scrollYProgress, [0, 0.55], [0, 1]);
  const spotlight = useTransform(scrollYProgress, [0, 1], [0.12, 0.55]);
  const captionY = useTransform(scrollYProgress, [0.3, 1], [28, 0]);
  const captionOpacity = useTransform(scrollYProgress, [0.35, 0.9], [0, 1]);

  return (
    <div
      className="relative min-h-screen antialiased"
      style={{ background: PAPER, color: INK, fontFamily: sans }}
    >
      <Head>
        <title>14 · Editorial Vault — Andamio</title>
      </Head>

      {/* ── Nav ───────────────────────────────────────────────── */}
      <header
        className="sticky top-0 z-50 border-b backdrop-blur"
        style={{ borderColor: "rgba(27,24,20,0.12)", background: "rgba(251,248,244,0.86)" }}
      >
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-4 sm:px-10">
          <a href="#top" className="flex items-baseline gap-2 text-lg font-semibold tracking-[-0.03em]">
            <span className="inline-block h-2.5 w-2.5 translate-y-[1px] rounded-full" style={{ background: CORAL }} />
            {nav.brand}
          </a>
          <nav className="hidden items-center gap-7 lg:flex">
            {nav.items.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-[13px] font-medium tracking-[-0.01em] transition-colors"
                style={{ color: "rgba(27,24,20,0.62)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = CORAL)}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(27,24,20,0.62)")}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <a
            href={nav.cta.href}
            className="rounded-full px-5 py-2 text-[13px] font-semibold tracking-[-0.01em] text-white transition-transform hover:-translate-y-0.5"
            style={{ background: INK }}
          >
            {nav.cta.label}
          </a>
        </div>
      </header>

      {/* ── Hero — full-bleed editorial type, NO badge ────────── */}
      <section id="top" className="relative overflow-hidden">
        <div className="mx-auto max-w-[1200px] px-6 pb-24 pt-20 sm:px-10 sm:pb-32 sm:pt-28">
          <div className="flex items-center gap-4">
            <span
              className="text-[12px] font-semibold uppercase tracking-[0.2em]"
              style={{ fontFamily: mono, color: CORAL }}
            >
              The Andamio Credential
            </span>
            <span className="h-px flex-1" style={{ background: "rgba(27,24,20,0.18)" }} />
            <span className="text-[12px] tracking-[0.1em]" style={{ fontFamily: mono, color: "rgba(27,24,20,0.4)" }}>
              EST. 2026
            </span>
          </div>

          <h1 className="mt-12 max-w-[15ch] text-[clamp(3.25rem,11vw,9rem)] font-bold leading-[0.9] tracking-[-0.05em]">
            {hero.headlineLead}{" "}
            <span style={{ color: CORAL }}>{hero.headlineAccent}</span>
          </h1>

          <div className="mt-14 flex flex-col gap-6 sm:flex-row sm:items-center">
            <span
              className="text-[12px] font-semibold uppercase tracking-[0.18em]"
              style={{ fontFamily: mono, color: "rgba(27,24,20,0.45)" }}
            >
              {hero.ctaEyebrow}
            </span>
            <div className="flex flex-wrap gap-3">
              <a
                href={hero.primaryCta.href}
                className="rounded-full px-6 py-3 text-[14px] font-semibold tracking-[-0.01em] text-white transition-transform hover:-translate-y-0.5"
                style={{ background: CORAL }}
              >
                {hero.primaryCta.label}
              </a>
              <a
                href={hero.secondaryCta.href}
                className="rounded-full border px-6 py-3 text-[14px] font-semibold tracking-[-0.01em] transition-colors"
                style={{ borderColor: "rgba(27,24,20,0.25)", color: INK }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = INK;
                  e.currentTarget.style.color = PAPER;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = INK;
                }}
              >
                {hero.secondaryCta.label}
              </a>
            </div>
          </div>
        </div>

        {/* gradient transition into the vault */}
        <div
          aria-hidden
          className="h-24 w-full"
          style={{ background: `linear-gradient(to bottom, ${PAPER}, ${VAULT})` }}
        />
      </section>

      {/* ── BADGE REVEAL / VAULT — the cinematic centerpiece ──── */}
      <section
        ref={revealRef}
        id="how-it-works"
        className="relative overflow-hidden"
        style={{ background: VAULT, color: "#F4EEE6" }}
      >
        {/* moving spotlight */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 -z-0 h-[140%] w-[80%] -translate-x-1/4 -translate-y-1/2 rounded-full blur-3xl"
          style={{
            background: `radial-gradient(closest-side, rgba(255,107,74,0.22), transparent)`,
            opacity: spotlight,
          }}
        />

        <div className="relative mx-auto max-w-[1200px] px-6 py-24 sm:px-10 sm:py-32">
          <div className="flex items-center gap-4">
            <span
              className="text-[12px] font-semibold uppercase tracking-[0.2em]"
              style={{ fontFamily: mono, color: CORAL }}
            >
              {demo.kicker}
            </span>
            <span
              className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em]"
              style={{ borderColor: "rgba(244,238,230,0.25)", fontFamily: mono }}
            >
              <span className="h-1.5 w-1.5 animate-pulse rounded-full" style={{ background: CORAL }} />
              {demo.liveLabel}
            </span>
            <span className="h-px flex-1" style={{ background: "rgba(244,238,230,0.16)" }} />
          </div>

          <div className="mt-12 grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            {/* left: demo copy */}
            <div className="lg:col-span-5">
              <h2 className="text-[clamp(2rem,4vw,3.25rem)] font-bold leading-[1.02] tracking-[-0.035em]">
                {demo.title}
              </h2>
              <p className="mt-6 max-w-md text-[15px] leading-relaxed" style={{ color: "rgba(244,238,230,0.7)" }}>
                {demo.note}
              </p>
              <a
                href="#issuer"
                className="mt-8 inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.08em] transition-colors"
                style={{ fontFamily: mono, color: "#F4EEE6" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = CORAL)}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#F4EEE6")}
              >
                <span className="h-2 w-2 rounded-full" style={{ background: CORAL }} />
                {demo.inspirationCta}
              </a>
            </div>

            {/* right: museum specimen under glass */}
            <div className="lg:col-span-7">
              <figure
                className="relative overflow-hidden rounded-sm border"
                style={{
                  borderColor: "rgba(244,238,230,0.18)",
                  background:
                    "linear-gradient(160deg, rgba(244,238,230,0.06), rgba(244,238,230,0.01))",
                }}
              >
                {/* corner labels */}
                <div className="flex items-center justify-between border-b px-5 py-3" style={{ borderColor: "rgba(244,238,230,0.14)" }}>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.16em]" style={{ fontFamily: mono, color: CORAL }}>
                    Specimen 001
                  </span>
                  <span className="text-[11px] tracking-[0.14em]" style={{ fontFamily: mono, color: "rgba(244,238,230,0.5)" }}>
                    ON-CHAIN
                  </span>
                </div>

                {/* the badge — slides sideways into view */}
                <div className="relative flex min-h-[360px] items-center justify-center overflow-hidden p-10 sm:min-h-[460px]">
                  {/* glass sheen */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(115deg, transparent 40%, rgba(244,238,230,0.06) 50%, transparent 60%)",
                    }}
                  />
                  <motion.div style={{ x: badgeX, opacity: badgeOpacity }} className="relative">
                    <img
                      src={CREDENTIAL_BADGE_SRC}
                      alt={hero.badgeAlt}
                      width={520}
                      height={520}
                      className="w-full max-w-[420px] drop-shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
                    />
                  </motion.div>
                </div>

                {/* specimen caption */}
                <motion.figcaption
                  style={{ y: captionY, opacity: captionOpacity }}
                  className="border-t px-5 py-4 text-[13px] leading-relaxed"
                >
                  <span className="block border-t-0" style={{ borderColor: "rgba(244,238,230,0.14)", color: "rgba(244,238,230,0.72)" }}>
                    {hero.badgeCaption}
                  </span>
                </motion.figcaption>
              </figure>
            </div>
          </div>
        </div>

        {/* gradient back up into the light */}
        <div
          aria-hidden
          className="h-24 w-full"
          style={{ background: `linear-gradient(to bottom, ${VAULT}, ${PAPER})` }}
        />
      </section>

      {/* ── Problem ───────────────────────────────────────────── */}
      <section className="border-b" style={{ borderColor: "rgba(27,24,20,0.12)" }}>
        <div className="mx-auto max-w-[1200px] px-6 py-20 sm:px-10 sm:py-28">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="text-[12px] font-semibold uppercase tracking-[0.18em]" style={{ fontFamily: mono, color: CORAL }}>
                {problem.kicker}
              </p>
              <h2 className="mt-5 text-[clamp(2.25rem,4.5vw,3.5rem)] font-bold leading-[0.98] tracking-[-0.04em]">
                {problem.heading}
              </h2>
            </div>
            <p className="self-end text-xl leading-snug tracking-[-0.01em] lg:col-span-7 lg:col-start-6" style={{ color: "rgba(27,24,20,0.7)" }}>
              {problem.intro}
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-3">
            {problem.items.map((p, i) => (
              <div key={p.headline} className="border-t pt-7" style={{ borderColor: INK }}>
                <span className="block text-5xl font-bold tabular-nums leading-none tracking-[-0.04em]" style={{ color: CORAL }}>
                  {NUMS[i]}
                </span>
                <h3 className="mt-6 text-xl font-bold leading-tight tracking-[-0.02em]">
                  {p.headline}
                </h3>
                <p className="mt-3 text-[14px] leading-relaxed" style={{ color: "rgba(27,24,20,0.62)" }}>
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Issuer ────────────────────────────────────────────── */}
      <section id="issuer" className="border-b" style={{ borderColor: "rgba(27,24,20,0.12)" }}>
        <div className="mx-auto max-w-[1200px] px-6 py-20 sm:px-10 sm:py-28">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="text-[12px] font-semibold uppercase tracking-[0.18em]" style={{ fontFamily: mono, color: CORAL }}>
                {issuer.productLabel}
              </p>
              <h2 className="mt-5 text-[clamp(3rem,8vw,6.5rem)] font-bold leading-[0.9] tracking-[-0.05em]">
                {issuer.title}
              </h2>
            </div>
            <p className="self-end text-lg leading-relaxed lg:col-span-5 lg:pl-8" style={{ color: "rgba(27,24,20,0.66)" }}>
              {issuer.intro}
            </p>
          </div>

          <h3 className="mt-16 border-t pt-8 text-2xl font-bold tracking-[-0.025em] sm:text-3xl" style={{ borderColor: INK }}>
            {issuer.decisionsHeading}
          </h3>

          <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {issuer.decisions.map((d, i) => (
              <div key={d.title} className="border-t pt-6" style={{ borderColor: "rgba(27,24,20,0.18)" }}>
                <div className="flex items-baseline gap-4">
                  <span className="text-3xl font-bold tabular-nums leading-none tracking-[-0.04em]" style={{ color: CORAL }}>
                    {NUMS[i]}
                  </span>
                  <span className="h-px flex-1 translate-y-[-5px]" style={{ background: "rgba(27,24,20,0.18)" }} />
                </div>
                <h4 className="mt-5 text-lg font-bold leading-snug tracking-[-0.02em]">
                  {d.title}
                </h4>
                <p className="mt-3 text-[14px] leading-relaxed" style={{ color: "rgba(27,24,20,0.62)" }}>
                  {d.body}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap gap-3">
            <span
              aria-disabled="true"
              className="cursor-not-allowed rounded-full border px-6 py-3 text-[13px] font-semibold tracking-[-0.01em]"
              style={{ borderColor: "rgba(27,24,20,0.25)", color: "rgba(27,24,20,0.35)" }}
            >
              {issuer.reportCta}
            </span>
            <a
              href={EXTERNAL_LINKS.walkthroughMailto}
              className="rounded-full px-6 py-3 text-[13px] font-semibold tracking-[-0.01em] text-white transition-transform hover:-translate-y-0.5"
              style={{ background: INK }}
            >
              {issuer.walkthroughCta}
            </a>
          </div>
        </div>
      </section>

      {/* ── Ecosystem ─────────────────────────────────────────── */}
      <section className="border-b" style={{ borderColor: "rgba(27,24,20,0.12)" }}>
        <div className="mx-auto max-w-[1200px] px-6 py-20 sm:px-10 sm:py-28">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5 lg:pr-10">
              <p className="text-[12px] font-semibold uppercase tracking-[0.18em]" style={{ fontFamily: mono, color: CORAL }}>
                {ecosystem.kicker}
              </p>
              <p className="mt-6 text-[clamp(1.75rem,3.5vw,2.5rem)] font-bold leading-[1.05] tracking-[-0.03em]">
                {ecosystem.lead}
              </p>
            </div>
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 self-end sm:grid-cols-2 lg:col-span-7">
              {ecosystem.items.map((it, i) => (
                <div key={it.title} className="border-t pt-6" style={{ borderColor: INK }}>
                  <p className="text-[13px] font-bold uppercase tracking-[0.08em]">
                    <span className="mr-2 tabular-nums" style={{ fontFamily: mono, color: CORAL }}>
                      {NUMS[i]}
                    </span>
                    {it.title}
                  </p>
                  <p className="mt-3 text-[14px] leading-relaxed" style={{ color: "rgba(27,24,20,0.62)" }}>
                    {it.body}
                  </p>
                </div>
              ))}
              <p className="text-[12px] tracking-[0.04em] sm:col-span-2" style={{ fontFamily: mono, color: "rgba(27,24,20,0.42)" }}>
                {ecosystem.footnote}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── API / Architecture ────────────────────────────────── */}
      <section id="andamio-api" className="border-b" style={{ borderColor: "rgba(27,24,20,0.12)" }}>
        <div className="mx-auto max-w-[1200px] px-6 py-20 sm:px-10 sm:py-28">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="text-[12px] font-semibold uppercase tracking-[0.18em]" style={{ fontFamily: mono, color: CORAL }}>
                {api.zoneLabel}
              </p>
              <h2 className="mt-5 text-[clamp(3rem,8vw,6.5rem)] font-bold leading-[0.9] tracking-[-0.05em]">
                {api.zoneTitle}
              </h2>
            </div>
            <p className="self-end text-lg leading-relaxed lg:col-span-5 lg:pl-8" style={{ color: "rgba(27,24,20,0.66)" }}>
              {api.zoneBlurb}
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-12">
            {/* left prose */}
            <div className="lg:col-span-5">
              <p className="text-[12px] font-semibold uppercase tracking-[0.16em]" style={{ fontFamily: mono, color: "rgba(27,24,20,0.42)" }}>
                {api.kicker}
              </p>
              <h3 className="mt-4 text-[clamp(1.75rem,3.5vw,2.5rem)] font-bold leading-[1.04] tracking-[-0.03em]">
                {api.heading}
              </h3>
              <p className="mt-6 text-[15px] leading-relaxed" style={{ color: "rgba(27,24,20,0.66)" }}>
                {api.body1}
              </p>
              <p className="mt-4 text-[14px] leading-relaxed" style={{ color: "rgba(27,24,20,0.56)" }}>
                {api.body2}
              </p>
              <a
                href={EXTERNAL_LINKS.apiReference}
                className="mt-8 inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.08em] transition-colors"
                style={{ fontFamily: mono, color: INK }}
                onMouseEnter={(e) => (e.currentTarget.style.color = CORAL)}
                onMouseLeave={(e) => (e.currentTarget.style.color = INK)}
              >
                <span className="h-2 w-2 rounded-full" style={{ background: CORAL }} />
                {api.apiRefCta}
              </a>
            </div>

            {/* right: stack */}
            <div className="lg:col-span-7">
              <div className="overflow-hidden rounded-sm border" style={{ borderColor: "rgba(27,24,20,0.18)" }}>
                {api.stack.map((layer, i) => (
                  <div
                    key={layer.name}
                    className="grid grid-cols-1 gap-2 px-6 py-6 sm:grid-cols-12 sm:items-baseline sm:gap-4"
                    style={{
                      borderTop: i > 0 ? "1px solid rgba(27,24,20,0.14)" : undefined,
                      background: layer.emphasis ? CORAL : "transparent",
                      color: layer.emphasis ? "#FFFFFF" : INK,
                    }}
                  >
                    <div className="sm:col-span-3">
                      <span
                        className="text-[11px] uppercase tracking-[0.12em]"
                        style={{ fontFamily: mono, color: layer.emphasis ? "rgba(255,255,255,0.85)" : "rgba(27,24,20,0.42)" }}
                      >
                        {layer.labelKicker}
                      </span>
                    </div>
                    <div className="sm:col-span-9">
                      <p className="text-lg font-bold leading-tight tracking-[-0.02em]">
                        {layer.name}
                      </p>
                      <p
                        className="mt-1.5 text-[14px] leading-relaxed"
                        style={{ color: layer.emphasis ? "rgba(255,255,255,0.92)" : "rgba(27,24,20,0.58)" }}
                      >
                        {layer.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Closing — final charcoal band ─────────────────────── */}
      <section className="relative overflow-hidden" style={{ background: VAULT, color: "#F4EEE6" }}>
        <div
          aria-hidden
          className="pointer-events-none absolute -right-1/4 top-1/2 h-[120%] w-[60%] -translate-y-1/2 rounded-full blur-3xl"
          style={{ background: "radial-gradient(closest-side, rgba(255,107,74,0.18), transparent)" }}
        />
        <div className="relative mx-auto max-w-[1200px] px-6 py-24 sm:px-10 sm:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-9">
              <p className="text-[12px] font-semibold uppercase tracking-[0.18em]" style={{ fontFamily: mono, color: CORAL }}>
                {closing.eyebrow}
              </p>
              <h2 className="mt-6 text-[clamp(2.5rem,7vw,5.5rem)] font-bold leading-[0.92] tracking-[-0.05em]">
                {closing.headlineLine1}
                <br />
                <span style={{ color: CORAL }}>{closing.headlineLine2}</span>
              </h2>
              <p className="mt-8 max-w-lg text-lg leading-relaxed" style={{ color: "rgba(244,238,230,0.72)" }}>
                {closing.body}
              </p>
              <a
                href={EXTERNAL_LINKS.walkthroughMailto}
                className="mt-10 inline-flex rounded-full px-7 py-4 text-[14px] font-semibold tracking-[-0.01em] text-white transition-transform hover:-translate-y-0.5"
                style={{ background: CORAL }}
              >
                {closing.cta}
              </a>
            </div>
            <div className="hidden items-end justify-end lg:col-span-3 lg:flex">
              <span className="font-bold tabular-nums leading-none tracking-[-0.05em] text-[9rem]" style={{ color: "rgba(244,238,230,0.08)" }}>
                14
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────────── */}
      <footer style={{ background: PAPER }}>
        <div className="mx-auto max-w-[1200px] px-6 sm:px-10">
          <div className="grid grid-cols-1 gap-10 py-16 lg:grid-cols-12">
            <div className="lg:col-span-4 lg:pr-10">
              <span className="flex items-baseline gap-2 text-lg font-semibold tracking-[-0.03em]">
                <span className="inline-block h-2.5 w-2.5 translate-y-[1px] rounded-full" style={{ background: CORAL }} />
                {nav.brand}
              </span>
              <p className="mt-4 max-w-xs text-[13px] leading-relaxed" style={{ color: "rgba(27,24,20,0.58)" }}>
                {footer.tagline}
              </p>
              <p className="mt-5 text-[11px] uppercase tracking-[0.1em]" style={{ fontFamily: mono, color: "rgba(27,24,20,0.46)" }}>
                {footer.meta}
              </p>
              <p className="mt-2 text-[11px] tabular-nums" style={{ fontFamily: mono, color: "rgba(27,24,20,0.4)" }}>
                {footer.copyright}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8 lg:pl-10">
              {Object.entries(footer.columns).map(([key, links]) => (
                <div key={key}>
                  <h3 className="mb-4 border-b pb-2 text-[11px] font-bold uppercase tracking-[0.12em]" style={{ borderColor: INK }}>
                    {key}
                  </h3>
                  <ul className="space-y-2.5">
                    {links.map((link) => (
                      <li key={link.name}>
                        <a
                          href={link.href}
                          className="text-[13px] transition-colors"
                          style={{ color: "rgba(27,24,20,0.6)" }}
                          onMouseEnter={(e) => (e.currentTarget.style.color = CORAL)}
                          onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(27,24,20,0.6)")}
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
          <div className="flex items-center justify-between border-t py-5" style={{ borderColor: "rgba(27,24,20,0.14)" }}>
            <Link
              href="/explore"
              className="text-[12px] font-semibold uppercase tracking-[0.1em] transition-colors"
              style={{ color: "rgba(27,24,20,0.5)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = CORAL)}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(27,24,20,0.5)")}
            >
              ← Back to all iterations
            </Link>
            <span className="text-[11px] uppercase tracking-[0.12em]" style={{ fontFamily: mono, color: "rgba(27,24,20,0.36)" }}>
              Iteration 14 · Editorial Vault
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
