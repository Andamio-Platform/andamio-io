"use client";

import { useRef } from "react";
import Head from "next/head";
import Link from "next/link";
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
 * Iteration 13 — "Acid Protocol".
 *
 * DARK (#0A0A0B) pressure-test of the Round-2 spine. A faint visible grid field
 * sits behind everything. Acid yellow (#E8FF00) is used with discipline — the
 * "upgrade" word, hairline highlights, the live pill, section index numbers, and
 * the emphasized API layer only. Inter is the primary face for display and body;
 * JetBrains Mono is reserved for labels, section numbers, and data readouts. The
 * controlled, Swiss-restrained cousin of brutalism — precise, not loud.
 *
 * Signature interaction: the section after the hero slides the credential
 * sideways into view on scroll and frames it as a glowing museum specimen under
 * glass on the dark field.
 */

const BG = "#0A0A0B";
const INK = "#F4F4F2";
const ACID = "#E8FF00";

const sans =
  "'Inter', system-ui, -apple-system, 'Helvetica Neue', Arial, sans-serif";
const mono = "'JetBrains Mono', ui-monospace, 'SFMono-Regular', monospace";

const NUMS = ["01", "02", "03", "04", "05", "06"];

function BadgeReveal() {
  const revealRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: revealRef,
    offset: ["start end", "center center"],
  });
  const badgeX = useTransform(scrollYProgress, [0, 1], ["60%", "0%"]);
  const badgeOpacity = useTransform(scrollYProgress, [0, 0.55], [0, 1]);
  const frameOpacity = useTransform(scrollYProgress, [0, 0.4], [0.25, 1]);

  return (
    <section
      ref={revealRef}
      id="how-it-works"
      className="border-b border-white/10"
    >
      <div className="mx-auto max-w-[1280px] px-6 sm:px-10">
        <div className="py-20 sm:py-28">
          {/* section header: kicker + live pill */}
          <div className="flex flex-wrap items-center gap-4">
            <span
              className="text-[12px] font-bold uppercase tracking-[0.18em]"
              style={{ color: ACID, fontFamily: mono }}
            >
              {demo.kicker}
            </span>
            <span
              className="inline-flex items-center gap-2 border px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em]"
              style={{ borderColor: ACID, color: ACID, fontFamily: mono }}
            >
              <span
                className="h-1.5 w-1.5 animate-pulse rounded-full"
                style={{ background: ACID }}
              />
              {demo.liveLabel}
            </span>
            <span className="h-px flex-1" style={{ background: "rgba(255,255,255,0.16)" }} />
            <span
              className="text-[11px] tabular-nums text-white/35"
              style={{ fontFamily: mono }}
            >
              SPECIMEN 001
            </span>
          </div>

          <div className="mt-12 grid grid-cols-12 gap-y-12 lg:gap-x-12">
            {/* left: demo copy */}
            <div className="col-span-12 lg:col-span-5">
              <h2 className="text-3xl font-bold leading-[1.02] tracking-[-0.035em] sm:text-[2.75rem]">
                {demo.title}
              </h2>
              <p className="mt-6 max-w-md text-[15px] leading-relaxed text-white/55">
                {demo.note}
              </p>
              <a
                href="#issuer"
                className="group mt-9 inline-flex items-center gap-2.5 text-[13px] font-bold uppercase tracking-[0.1em] transition-colors hover:text-[#E8FF00]"
                style={{ fontFamily: mono }}
              >
                <span
                  className="h-2 w-2 transition-transform group-hover:translate-x-1"
                  style={{ background: ACID }}
                />
                {demo.inspirationCta}
              </a>

              <p
                className="mt-12 max-w-sm text-[13px] leading-relaxed text-white/45"
                style={{ fontFamily: sans }}
              >
                {hero.badgeCaption}
              </p>
            </div>

            {/* right: museum specimen under glass */}
            <div className="col-span-12 lg:col-span-7">
              <motion.div
                style={{ opacity: frameOpacity }}
                className="relative border border-white/15"
              >
                {/* corner labels */}
                <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
                  <span
                    className="text-[10px] font-bold uppercase tracking-[0.18em]"
                    style={{ fontFamily: mono, color: ACID }}
                  >
                    Specimen 001
                  </span>
                  <span
                    className="text-[10px] uppercase tracking-[0.18em] text-white/40"
                    style={{ fontFamily: mono }}
                  >
                    On-chain
                  </span>
                </div>

                {/* the glass plate */}
                <div
                  className="relative flex items-center justify-center overflow-hidden px-6 py-14 sm:py-20"
                  style={{
                    background:
                      "radial-gradient(120% 100% at 70% 40%, rgba(232,255,0,0.06), rgba(255,255,255,0.01) 55%, transparent 75%)",
                  }}
                >
                  {/* faint specimen grid behind the badge */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0"
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
                      backgroundSize: "44px 44px",
                    }}
                  />
                  {/* crosshair guides */}
                  <span className="pointer-events-none absolute left-4 top-1/2 h-px w-6" style={{ background: "rgba(232,255,0,0.35)" }} />
                  <span className="pointer-events-none absolute right-4 top-1/2 h-px w-6" style={{ background: "rgba(232,255,0,0.35)" }} />

                  <motion.div
                    style={{ x: badgeX, opacity: badgeOpacity }}
                    className="relative"
                  >
                    <div
                      style={{
                        filter:
                          "drop-shadow(0 0 28px rgba(232,255,0,0.30)) drop-shadow(0 0 4px rgba(232,255,0,0.20))",
                      }}
                    >
                      <img
                        src={CREDENTIAL_BADGE_SRC}
                        alt={hero.badgeAlt}
                        width={520}
                        height={520}
                        className="w-full max-w-[360px]"
                      />
                    </div>
                  </motion.div>
                </div>

                {/* readout strip */}
                <div className="grid grid-cols-2 border-t border-white/10 sm:grid-cols-3">
                  {[
                    ["FORMAT", "SVG · on-chain"],
                    ["REGISTRY", "Cardano mainnet"],
                    ["STATUS", "Verifiable"],
                  ].map(([k, v], i) => (
                    <div
                      key={k}
                      className={`px-4 py-3 ${i > 0 ? "border-l border-white/10" : ""} ${i === 2 ? "col-span-2 sm:col-span-1" : ""}`}
                    >
                      <span
                        className="block text-[10px] uppercase tracking-[0.16em] text-white/35"
                        style={{ fontFamily: mono }}
                      >
                        {k}
                      </span>
                      <span
                        className="mt-1 block text-[12px] tabular-nums text-white/70"
                        style={{ fontFamily: mono }}
                      >
                        {v}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Explore13() {
  return (
    <div
      className="relative min-h-screen antialiased"
      style={{ background: BG, color: INK, fontFamily: sans }}
    >
      <Head>
        <title>13 · Acid Protocol — Andamio</title>
      </Head>

      {/* ── Faint global grid field ──────────────────────────── */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      {/* a single acid hairline anchoring the field */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 hidden justify-center md:flex"
      >
        <div className="grid h-full w-full max-w-[1280px] grid-cols-12 px-6 sm:px-10">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="border-l"
              style={{
                borderColor:
                  i === 0 ? "rgba(232,255,0,0.10)" : "rgba(255,255,255,0.02)",
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10">
        {/* ── Nav ───────────────────────────────────────────── */}
        <header
          className="sticky top-0 z-50 border-b border-white/10 backdrop-blur"
          style={{ background: "rgba(10,10,11,0.85)" }}
        >
          <div className="mx-auto flex max-w-[1280px] items-center justify-between px-6 py-3 sm:px-10">
            <a
              href="#top"
              className="flex items-baseline gap-2 text-lg font-bold tracking-[-0.04em]"
            >
              <span
                className="inline-block h-3 w-3 translate-y-[1px]"
                style={{ background: ACID }}
              />
              {nav.brand}
            </a>
            <nav className="hidden items-center gap-6 lg:flex">
              {nav.items.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-[12px] font-medium uppercase tracking-[0.08em] text-white/55 transition-colors hover:text-[#E8FF00]"
                  style={{ fontFamily: mono }}
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <a
              href={nav.cta.href}
              className="border px-4 py-2 text-[12px] font-bold uppercase tracking-[0.08em] transition-colors hover:bg-[#E8FF00] hover:text-[#0A0A0B]"
              style={{ borderColor: ACID, color: ACID, fontFamily: mono }}
            >
              {nav.cta.label}
            </a>
          </div>
        </header>

        {/* ── Hero (type only, badge withheld) ──────────────── */}
        <section id="top" className="border-b border-white/10">
          <div className="mx-auto max-w-[1280px] px-6 sm:px-10">
            <div className="py-20 sm:py-32">
              <div className="flex items-center gap-4">
                <span
                  className="text-[12px] font-bold uppercase tracking-[0.2em]"
                  style={{ color: ACID, fontFamily: mono }}
                >
                  Andamio / Credentialing
                </span>
                <span className="h-px flex-1" style={{ background: "rgba(255,255,255,0.16)" }} />
                <span
                  className="text-[11px] tabular-nums text-white/35"
                  style={{ fontFamily: mono }}
                >
                  PROTOCOL 13
                </span>
              </div>

              <h1 className="mt-12 max-w-[16ch] text-[clamp(3rem,9vw,8rem)] font-bold leading-[0.9] tracking-[-0.05em]">
                {hero.headlineLead}{" "}
                <span
                  className="relative inline-block"
                  style={{ color: ACID }}
                >
                  {hero.headlineAccent}
                  <span
                    className="absolute -bottom-1 left-0 h-[3px] w-full"
                    style={{ background: ACID }}
                  />
                </span>
              </h1>

              {/* CTA cluster */}
              <div className="mt-14 flex flex-wrap items-stretch border border-white/15">
                <span
                  className="flex items-center border-r border-white/15 px-5 py-3.5 text-[11px] font-bold uppercase tracking-[0.18em] text-white/45"
                  style={{ fontFamily: mono }}
                >
                  {hero.ctaEyebrow}
                </span>
                <a
                  href={hero.primaryCta.href}
                  className="flex items-center border-r border-white/15 px-6 py-3.5 text-[13px] font-bold uppercase tracking-[0.08em] transition-colors hover:bg-[#E8FF00] hover:text-[#0A0A0B]"
                  style={{ background: ACID, color: BG }}
                >
                  {hero.primaryCta.label}
                </a>
                <a
                  href={hero.secondaryCta.href}
                  className="flex items-center px-6 py-3.5 text-[13px] font-bold uppercase tracking-[0.08em] text-white/85 transition-colors hover:bg-white/10"
                >
                  {hero.secondaryCta.label}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── Badge reveal / specimen + demo ─────────────────── */}
        <BadgeReveal />

        {/* ── Problem ───────────────────────────────────────── */}
        <section className="border-b border-white/10">
          <div className="mx-auto max-w-[1280px] px-6 sm:px-10">
            <div className="grid grid-cols-12 gap-y-10 py-20 sm:py-28">
              <div className="col-span-12 lg:col-span-4 lg:pr-10">
                <p
                  className="text-[12px] font-bold uppercase tracking-[0.16em]"
                  style={{ color: ACID, fontFamily: mono }}
                >
                  {problem.kicker}
                </p>
                <h2 className="mt-5 text-4xl font-bold leading-[0.98] tracking-[-0.04em] sm:text-5xl">
                  {problem.heading}
                </h2>
              </div>
              <p className="col-span-12 self-end text-xl leading-snug tracking-[-0.01em] text-white/65 lg:col-span-7 lg:col-start-6">
                {problem.intro}
              </p>
            </div>

            <div className="grid grid-cols-12 border-t border-white/15">
              {problem.items.map((p, i) => (
                <div
                  key={p.headline}
                  className="col-span-12 py-10 sm:col-span-4 sm:[&:not(:first-child)]:border-l sm:[&:not(:first-child)]:border-white/10 sm:[&:not(:first-child)]:pl-8 lg:py-12 [&:not(:first-child)]:border-t [&:not(:first-child)]:border-white/10 [&:not(:first-child)]:pt-10 sm:[&:not(:first-child)]:border-t-0 sm:[&:not(:first-child)]:pt-12"
                >
                  <span
                    className="block text-6xl font-bold tabular-nums leading-none tracking-[-0.04em]"
                    style={{ color: ACID, fontFamily: mono }}
                  >
                    {NUMS[i]}
                  </span>
                  <h3 className="mt-6 text-xl font-bold leading-tight tracking-[-0.02em]">
                    {p.headline}
                  </h3>
                  <p className="mt-3 max-w-sm text-[14px] leading-relaxed text-white/55">
                    {p.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Issuer ────────────────────────────────────────── */}
        <section id="issuer" className="border-b border-white/10">
          <div className="mx-auto max-w-[1280px] px-6 sm:px-10">
            <div className="grid grid-cols-12 gap-y-8 py-20 sm:py-28">
              <div className="col-span-12 lg:col-span-7">
                <p
                  className="text-[12px] font-bold uppercase tracking-[0.16em]"
                  style={{ color: ACID, fontFamily: mono }}
                >
                  {issuer.productLabel}
                </p>
                <h2 className="mt-5 text-6xl font-bold leading-[0.88] tracking-[-0.05em] sm:text-8xl">
                  {issuer.title}
                </h2>
              </div>
              <p className="col-span-12 self-end text-lg leading-relaxed text-white/60 lg:col-span-5 lg:pl-8">
                {issuer.intro}
              </p>
            </div>

            <div className="border-t border-white/15 pt-8">
              <span className="text-2xl font-bold tracking-[-0.025em] sm:text-3xl">
                {issuer.decisionsHeading}
              </span>
            </div>

            <div className="mt-10 grid grid-cols-12 border-t border-white/15">
              {issuer.decisions.map((d, i) => (
                <div
                  key={d.title}
                  className="col-span-12 py-9 sm:col-span-6 sm:px-7 lg:col-span-4 [&:not(:nth-child(-n+1))]:border-t [&:not(:nth-child(-n+1))]:border-white/10 sm:[&:not(:nth-child(-n+2))]:border-t lg:[&:not(:nth-child(-n+3))]:border-t sm:[&:nth-child(even)]:border-l sm:[&:nth-child(even)]:border-white/10 lg:[&:nth-child(3n+2)]:border-l lg:[&:nth-child(3n+2)]:border-white/10 lg:[&:nth-child(3n)]:border-l lg:[&:nth-child(3n)]:border-white/10"
                >
                  <div className="flex items-baseline gap-4">
                    <span
                      className="text-4xl font-bold tabular-nums leading-none tracking-[-0.04em]"
                      style={{ color: ACID, fontFamily: mono }}
                    >
                      {NUMS[i]}
                    </span>
                    <span className="h-px flex-1 translate-y-[-6px]" style={{ background: "rgba(255,255,255,0.12)" }} />
                  </div>
                  <h3 className="mt-5 text-lg font-bold leading-snug tracking-[-0.02em]">
                    {d.title}
                  </h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-white/55">
                    {d.body}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-stretch border-t border-white/15 py-10">
              <span
                aria-disabled="true"
                className="flex cursor-not-allowed items-center border border-white/15 px-6 py-3.5 text-[13px] font-bold uppercase tracking-[0.08em] text-white/30"
                style={{ fontFamily: mono }}
              >
                {issuer.reportCta}
              </span>
              <a
                href={EXTERNAL_LINKS.walkthroughMailto}
                className="-ml-px flex items-center px-6 py-3.5 text-[13px] font-bold uppercase tracking-[0.08em] transition-colors hover:bg-[#E8FF00] hover:text-[#0A0A0B]"
                style={{ background: ACID, color: BG, fontFamily: mono }}
              >
                {issuer.walkthroughCta}
              </a>
            </div>
          </div>
        </section>

        {/* ── Ecosystem ─────────────────────────────────────── */}
        <section className="border-b border-white/10">
          <div className="mx-auto max-w-[1280px] px-6 sm:px-10">
            <div className="grid grid-cols-12 gap-y-10 py-20 sm:py-28">
              <div className="col-span-12 lg:col-span-5 lg:pr-10">
                <p
                  className="text-[12px] font-bold uppercase tracking-[0.16em]"
                  style={{ color: ACID, fontFamily: mono }}
                >
                  {ecosystem.kicker}
                </p>
                <p className="mt-6 text-3xl font-bold leading-[1.04] tracking-[-0.03em] sm:text-4xl">
                  {ecosystem.lead}
                </p>
              </div>
              <div className="col-span-12 grid grid-cols-1 self-end border-t border-white/15 sm:grid-cols-2 lg:col-span-7">
                {ecosystem.items.map((it, i) => (
                  <div
                    key={it.title}
                    className={`py-8 ${i === 1 ? "border-t border-white/10 pt-8 sm:border-l sm:border-t-0 sm:pl-7" : ""}`}
                  >
                    <p className="text-[13px] font-bold uppercase tracking-[0.1em]">
                      <span
                        className="mr-2 tabular-nums"
                        style={{ color: ACID, fontFamily: mono }}
                      >
                        {NUMS[i]}
                      </span>
                      {it.title}
                    </p>
                    <p className="mt-3 text-[14px] leading-relaxed text-white/55">
                      {it.body}
                    </p>
                  </div>
                ))}
                <p
                  className="col-span-1 border-t border-white/10 py-4 text-[12px] tabular-nums text-white/35 sm:col-span-2"
                  style={{ fontFamily: mono }}
                >
                  {ecosystem.footnote}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── API / Architecture ────────────────────────────── */}
        <section id="andamio-api" className="border-b border-white/10">
          <div className="mx-auto max-w-[1280px] px-6 sm:px-10">
            <div className="grid grid-cols-12 gap-y-8 py-20 sm:py-28">
              <div className="col-span-12 lg:col-span-7">
                <p
                  className="text-[12px] font-bold uppercase tracking-[0.16em]"
                  style={{ color: ACID, fontFamily: mono }}
                >
                  {api.zoneLabel}
                </p>
                <h2 className="mt-5 text-6xl font-bold leading-[0.88] tracking-[-0.05em] sm:text-8xl">
                  {api.zoneTitle}
                </h2>
              </div>
              <p className="col-span-12 self-end text-lg leading-relaxed text-white/60 lg:col-span-5 lg:pl-8">
                {api.zoneBlurb}
              </p>
            </div>

            <div className="grid grid-cols-12 border-t border-white/15">
              <div className="col-span-12 py-12 lg:col-span-5 lg:border-r lg:border-white/10 lg:pr-12">
                <p
                  className="text-[12px] font-bold uppercase tracking-[0.16em] text-white/40"
                  style={{ fontFamily: mono }}
                >
                  {api.kicker}
                </p>
                <h3 className="mt-4 text-3xl font-bold leading-[1.02] tracking-[-0.03em] sm:text-4xl">
                  {api.heading}
                </h3>
                <p className="mt-6 text-[15px] leading-relaxed text-white/65">
                  {api.body1}
                </p>
                <p className="mt-4 text-[14px] leading-relaxed text-white/50">
                  {api.body2}
                </p>
                <a
                  href={EXTERNAL_LINKS.apiReference}
                  className="group mt-8 inline-flex items-center gap-2.5 text-[13px] font-bold uppercase tracking-[0.08em] transition-colors hover:text-[#E8FF00]"
                  style={{ fontFamily: mono }}
                >
                  <span
                    className="h-2 w-2 transition-transform group-hover:translate-x-1"
                    style={{ background: ACID }}
                  />
                  {api.apiRefCta}
                </a>
              </div>

              <div className="col-span-12 lg:col-span-7">
                {api.stack.map((layer, i) => {
                  const emph = layer.emphasis;
                  return (
                    <div
                      key={layer.name}
                      className={`grid grid-cols-12 items-baseline gap-4 px-0 py-7 lg:px-10 ${
                        i > 0 ? "border-t border-white/10" : ""
                      } ${emph ? "relative" : ""}`}
                      style={
                        emph
                          ? { background: ACID, color: BG }
                          : undefined
                      }
                    >
                      {emph && (
                        <span
                          aria-hidden
                          className="absolute left-0 top-0 h-full w-1"
                          style={{ background: BG }}
                        />
                      )}
                      <div className="col-span-12 sm:col-span-3">
                        <span
                          className="text-[11px] uppercase tracking-[0.12em]"
                          style={{
                            fontFamily: mono,
                            color: emph ? "rgba(10,10,11,0.65)" : "rgba(255,255,255,0.4)",
                          }}
                        >
                          {layer.labelKicker}
                        </span>
                      </div>
                      <div className="col-span-12 sm:col-span-9">
                        <p className="text-lg font-bold leading-tight tracking-[-0.02em]">
                          {layer.name}
                        </p>
                        <p
                          className="mt-1.5 text-[14px] leading-relaxed"
                          style={{
                            color: emph ? "rgba(10,10,11,0.8)" : "rgba(255,255,255,0.55)",
                          }}
                        >
                          {layer.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ── Closing ───────────────────────────────────────── */}
        <section className="border-b border-white/10">
          <div className="mx-auto max-w-[1280px] px-6 sm:px-10">
            <div className="grid grid-cols-12 py-24 sm:py-32">
              <div className="col-span-12 lg:col-span-8">
                <p
                  className="text-[12px] font-bold uppercase tracking-[0.16em]"
                  style={{ color: ACID, fontFamily: mono }}
                >
                  {closing.eyebrow}
                </p>
                <h2 className="mt-6 text-[clamp(2.5rem,6.5vw,5.5rem)] font-bold leading-[0.9] tracking-[-0.05em]">
                  {closing.headlineLine1}
                  <br />
                  <span style={{ color: ACID }}>{closing.headlineLine2}</span>
                </h2>
                <p className="mt-8 max-w-lg text-lg leading-relaxed text-white/60">
                  {closing.body}
                </p>
                <a
                  href={EXTERNAL_LINKS.walkthroughMailto}
                  className="mt-10 inline-flex items-center px-7 py-4 text-[13px] font-bold uppercase tracking-[0.08em] transition-colors hover:bg-[#E8FF00] hover:text-[#0A0A0B]"
                  style={{ background: ACID, color: BG, fontFamily: mono }}
                >
                  {closing.cta}
                </a>
              </div>
              <div className="col-span-12 mt-12 flex items-end justify-end lg:col-span-4 lg:mt-0">
                <span
                  className="text-[8rem] font-bold leading-none tabular-nums tracking-[-0.05em] text-white/[0.06] sm:text-[11rem]"
                  style={{ fontFamily: mono }}
                >
                  13
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ── Footer ────────────────────────────────────────── */}
        <footer>
          <div className="mx-auto max-w-[1280px] px-6 sm:px-10">
            <div className="grid grid-cols-12 gap-y-10 py-14">
              <div className="col-span-12 lg:col-span-4 lg:pr-10">
                <span className="flex items-baseline gap-2 text-lg font-bold tracking-[-0.04em]">
                  <span className="inline-block h-3 w-3 translate-y-[1px]" style={{ background: ACID }} />
                  {nav.brand}
                </span>
                <p className="mt-4 max-w-xs text-[13px] leading-relaxed text-white/55">
                  {footer.tagline}
                </p>
                <p
                  className="mt-5 text-[11px] uppercase tracking-[0.1em] text-white/45"
                  style={{ fontFamily: mono }}
                >
                  {footer.meta}
                </p>
                <p
                  className="mt-2 text-[11px] tabular-nums text-white/40"
                  style={{ fontFamily: mono }}
                >
                  {footer.copyright}
                </p>
              </div>
              <div className="col-span-12 grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8 lg:pl-10">
                {Object.entries(footer.columns).map(([key, links]) => (
                  <div key={key}>
                    <h3
                      className="mb-4 border-b border-white/15 pb-2 text-[11px] font-bold uppercase tracking-[0.12em]"
                      style={{ fontFamily: mono }}
                    >
                      {key}
                    </h3>
                    <ul className="space-y-2.5">
                      {links.map((link) => (
                        <li key={link.name}>
                          <a
                            href={link.href}
                            className="text-[13px] text-white/55 transition-colors hover:text-[#E8FF00]"
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
            <div className="flex items-center justify-between border-t border-white/15 py-5">
              <Link
                href="/explore"
                className="text-[12px] font-bold uppercase tracking-[0.1em] text-white/50 transition-colors hover:text-[#E8FF00]"
                style={{ fontFamily: mono }}
              >
                ← Back to all iterations
              </Link>
              <span
                className="text-[11px] uppercase tracking-[0.12em] text-white/35"
                style={{ fontFamily: mono }}
              >
                Iteration 13 · Acid Protocol
              </span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
