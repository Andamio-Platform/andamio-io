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
 * Iteration 12 — "Spec Sheet".
 *
 * Light. Reads like a precise technical specification: Inter throughout (no
 * serif), a left margin-note gutter carrying mono section numbers + kickers
 * (JetBrains Mono) beside the running Inter column, hairline rules, quiet
 * data-sheet rigor. Cool-blue (#5B8DEF) is the only accent. The credential is
 * withheld from the hero; the first section after it slides the badge sideways
 * into a "Specimen" plate as you scroll, framed as a museum specimen.
 */

const SANS = "'Inter', system-ui, sans-serif";
const MONO = "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace";

const PAPER = "#FCFCFB";
const INK = "#16181D";
const SUB = "rgba(22,24,29,0.62)";
const FAINT = "rgba(22,24,29,0.42)";
const HAIR = "rgba(22,24,29,0.14)";
const BLUE = "#5B8DEF";
const BLUE_FAINT = "rgba(91,141,239,0.10)";

/* ── Margin-note gutter: the running rail of section numbers + mono kickers ─ */
function Gutter({
  num,
  kicker,
  children,
}: {
  num: string;
  kicker: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="col-span-12 mb-8 lg:col-span-3 lg:mb-0 lg:self-start lg:pr-6 lg:[position:sticky] lg:top-28">
      <div
        className="flex items-baseline gap-3 border-t pt-3 lg:flex-col lg:items-start lg:gap-2"
        style={{ borderColor: INK }}
      >
        <span
          className="text-[13px] tabular-nums"
          style={{ fontFamily: MONO, color: BLUE }}
        >
          §&nbsp;{num}
        </span>
        <span
          className="text-[11px] uppercase tracking-[0.16em]"
          style={{ fontFamily: MONO, color: FAINT }}
        >
          {kicker}
        </span>
      </div>
      {children ? (
        <div className="mt-3 hidden lg:block" style={{ color: FAINT }}>
          {children}
        </div>
      ) : null}
    </div>
  );
}

export default function Explore12() {
  const revealRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: revealRef,
    offset: ["start end", "center center"],
  });
  const badgeX = useTransform(scrollYProgress, [0, 1], ["60%", "0%"]);
  const badgeOpacity = useTransform(scrollYProgress, [0, 0.55], [0, 1]);
  const plateLine = useTransform(scrollYProgress, [0, 1], ["18%", "0%"]);

  return (
    <div
      className="relative min-h-screen antialiased"
      style={{ background: PAPER, color: INK, fontFamily: SANS }}
    >
      <Head>
        <title>12 · Spec Sheet — Andamio</title>
      </Head>

      {/* ── Nav ─────────────────────────────────────────────── */}
      <header
        className="sticky top-0 z-50 border-b backdrop-blur"
        style={{ borderColor: INK, background: "rgba(252,252,251,0.92)" }}
      >
        <div className="mx-auto flex max-w-[1180px] items-center justify-between px-6 py-3.5 sm:px-10">
          <a
            href="#top"
            className="flex items-baseline gap-2.5 text-[17px] font-semibold tracking-[-0.03em]"
          >
            <span
              aria-hidden
              className="inline-block h-2.5 w-2.5 translate-y-[1px] rounded-[1px]"
              style={{ background: BLUE }}
            />
            {nav.brand}
            <span
              className="ml-1 hidden text-[10px] tracking-[0.14em] sm:inline"
              style={{ fontFamily: MONO, color: FAINT }}
            >
              SPEC&nbsp;/&nbsp;REV.12
            </span>
          </a>
          <nav className="hidden items-center gap-6 lg:flex">
            {nav.items.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-[12px] tracking-[0.04em] transition-colors"
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
            className="border px-4 py-2 text-[12px] font-medium tracking-[0.04em] transition-colors"
            style={{ borderColor: INK, color: PAPER, background: INK }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = BLUE;
              e.currentTarget.style.borderColor = BLUE;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = INK;
              e.currentTarget.style.borderColor = INK;
            }}
          >
            {nav.cta.label}
          </a>
        </div>
      </header>

      {/* ── Hero — full-bleed type, badge withheld ───────────── */}
      <section id="top" className="border-b" style={{ borderColor: INK }}>
        <div className="mx-auto max-w-[1180px] px-6 sm:px-10">
          {/* spec-sheet header strip */}
          <div
            className="flex flex-wrap items-center justify-between gap-y-2 border-b py-3 text-[11px] uppercase tracking-[0.14em]"
            style={{ borderColor: HAIR, fontFamily: MONO, color: FAINT }}
          >
            <span>Document — Credentialing</span>
            <span>Issue 01 · Andamio</span>
            <span style={{ color: BLUE }}>Live on Cardano mainnet</span>
          </div>

          <div className="grid grid-cols-12 gap-x-8">
            <div className="col-span-12 pb-14 pt-14 lg:col-span-3 lg:self-start lg:pt-20">
              <p
                className="text-[11px] uppercase tracking-[0.16em]"
                style={{ fontFamily: MONO, color: BLUE }}
              >
                § 00 / Abstract
              </p>
              <p
                className="mt-4 max-w-[16rem] text-[13.5px] leading-relaxed"
                style={{ color: SUB }}
              >
                A specification for credentials that keep working after you
                issue them.
              </p>
            </div>

            <div className="col-span-12 pb-16 pt-2 lg:col-span-9 lg:pt-20">
              <h1
                className="text-[clamp(2.9rem,8.5vw,7rem)] font-semibold leading-[0.92] tracking-[-0.045em]"
              >
                {hero.headlineLead}{" "}
                <span style={{ color: BLUE }}>{hero.headlineAccent}</span>
              </h1>

              <div className="mt-12 flex flex-col gap-0 sm:flex-row sm:flex-wrap sm:items-stretch">
                <span
                  className="flex items-center border px-5 py-3 text-[11px] uppercase tracking-[0.16em]"
                  style={{
                    borderColor: INK,
                    fontFamily: MONO,
                    color: FAINT,
                  }}
                >
                  {hero.ctaEyebrow}
                </span>
                <a
                  href={hero.primaryCta.href}
                  className="-mt-px flex items-center justify-between gap-4 border px-6 py-3 text-[13px] font-medium tracking-[0.02em] transition-colors sm:-mt-0 sm:-ml-px"
                  style={{ borderColor: INK, background: INK, color: PAPER }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = BLUE;
                    e.currentTarget.style.borderColor = BLUE;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = INK;
                    e.currentTarget.style.borderColor = INK;
                  }}
                >
                  {hero.primaryCta.label}
                  <span style={{ fontFamily: MONO }}>→</span>
                </a>
                <a
                  href={hero.secondaryCta.href}
                  className="-mt-px flex items-center justify-between gap-4 border px-6 py-3 text-[13px] font-medium tracking-[0.02em] transition-colors sm:-mt-0 sm:-ml-px"
                  style={{ borderColor: INK, color: INK }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = BLUE_FAINT;
                    e.currentTarget.style.color = BLUE;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = INK;
                  }}
                >
                  {hero.secondaryCta.label}
                  <span style={{ fontFamily: MONO }}>→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── §01 — Badge reveal / specimen + demo (scroll-driven) ─ */}
      <section
        ref={revealRef}
        id="how-it-works"
        className="border-b"
        style={{ borderColor: INK }}
      >
        <div className="mx-auto max-w-[1180px] px-6 sm:px-10">
          <div className="grid grid-cols-12 gap-x-8 py-16 sm:py-24">
            <Gutter num="01" kicker={demo.kicker}>
              <span
                className="inline-flex items-center gap-2 border px-2.5 py-1 text-[10px] uppercase tracking-[0.14em]"
                style={{ borderColor: BLUE, color: BLUE, fontFamily: MONO }}
              >
                <span
                  className="h-1.5 w-1.5 animate-pulse rounded-full"
                  style={{ background: BLUE }}
                />
                {demo.liveLabel}
              </span>
            </Gutter>

            <div className="col-span-12 lg:col-span-9">
              <div className="grid grid-cols-1 gap-x-10 gap-y-12 lg:grid-cols-2">
                {/* running column — the demo copy */}
                <div className="order-2 lg:order-1">
                  <h2 className="text-[clamp(1.9rem,4vw,2.9rem)] font-semibold leading-[1.02] tracking-[-0.03em]">
                    {demo.title}
                  </h2>
                  <p
                    className="mt-6 max-w-md text-[15px] leading-relaxed"
                    style={{ color: SUB }}
                  >
                    {demo.note}
                  </p>

                  {/* mono read-out block, data-sheet rigor */}
                  <dl
                    className="mt-8 max-w-md border-t text-[12px]"
                    style={{ borderColor: HAIR, fontFamily: MONO }}
                  >
                    {[
                      ["format", "SVG · machine-readable"],
                      ["registry", "On-chain · Cardano"],
                      ["status", "Verifiable"],
                    ].map(([k, v]) => (
                      <div
                        key={k}
                        className="flex items-center justify-between border-b py-2.5"
                        style={{ borderColor: HAIR }}
                      >
                        <dt
                          className="uppercase tracking-[0.12em]"
                          style={{ color: FAINT }}
                        >
                          {k}
                        </dt>
                        <dd style={{ color: INK }}>{v}</dd>
                      </div>
                    ))}
                  </dl>

                  <a
                    href="#issuer"
                    className="mt-8 inline-flex items-center gap-2 text-[13px] font-medium tracking-[0.02em] transition-colors"
                    style={{ color: INK }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = BLUE)}
                    onMouseLeave={(e) => (e.currentTarget.style.color = INK)}
                  >
                    <span
                      className="inline-block h-2 w-2 rounded-[1px]"
                      style={{ background: BLUE }}
                    />
                    {demo.inspirationCta}
                  </a>
                </div>

                {/* specimen plate — badge slides in sideways */}
                <figure className="order-1 lg:order-2">
                  <div
                    className="relative overflow-hidden border"
                    style={{ borderColor: INK }}
                  >
                    {/* corner labels */}
                    <div
                      className="flex items-center justify-between border-b px-4 py-2.5 text-[10px] uppercase tracking-[0.14em]"
                      style={{ borderColor: HAIR, fontFamily: MONO }}
                    >
                      <span style={{ color: INK }}>Specimen 001</span>
                      <span style={{ color: BLUE }}>On-chain</span>
                    </div>

                    <div
                      className="relative flex items-center justify-center px-6 py-12 sm:px-10 sm:py-16"
                      style={{ background: "#FFFFFF" }}
                    >
                      {/* registration crosshair, faint */}
                      <motion.span
                        aria-hidden
                        className="absolute left-0 top-1/2 h-px"
                        style={{ width: plateLine, background: HAIR }}
                      />
                      <motion.div
                        style={{ x: badgeX, opacity: badgeOpacity }}
                        className="w-full max-w-[300px]"
                      >
                        <img
                          src={CREDENTIAL_BADGE_SRC}
                          alt={hero.badgeAlt}
                          width={520}
                          height={520}
                          className="w-full"
                        />
                      </motion.div>
                    </div>

                    <figcaption
                      className="border-t px-4 py-3 text-[12px] leading-relaxed"
                      style={{ borderColor: HAIR, color: SUB }}
                    >
                      {hero.badgeCaption}
                    </figcaption>
                  </div>
                  <p
                    className="mt-2 text-right text-[10px] uppercase tracking-[0.14em]"
                    style={{ fontFamily: MONO, color: FAINT }}
                  >
                    Fig. 01 — Credential, plated
                  </p>
                </figure>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── §02 — Problem ────────────────────────────────────── */}
      <section className="border-b" style={{ borderColor: INK }}>
        <div className="mx-auto max-w-[1180px] px-6 sm:px-10">
          <div className="grid grid-cols-12 gap-x-8 py-16 sm:py-24">
            <Gutter num="02" kicker={problem.kicker} />

            <div className="col-span-12 lg:col-span-9">
              <h2 className="max-w-3xl text-[clamp(2rem,4.5vw,3.4rem)] font-semibold leading-[1.0] tracking-[-0.035em]">
                {problem.heading}
              </h2>
              <p
                className="mt-6 max-w-2xl text-lg leading-relaxed"
                style={{ color: SUB }}
              >
                {problem.intro}
              </p>

              <div className="mt-12 border-t" style={{ borderColor: INK }}>
                {problem.items.map((p, i) => (
                  <div
                    key={p.headline}
                    className="grid grid-cols-12 gap-x-6 gap-y-3 border-b py-8"
                    style={{ borderColor: HAIR }}
                  >
                    <div className="col-span-12 sm:col-span-3">
                      <span
                        className="text-[13px] tabular-nums"
                        style={{ fontFamily: MONO, color: BLUE }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="mt-2 text-lg font-semibold leading-snug tracking-[-0.02em]">
                        {p.headline}
                      </h3>
                    </div>
                    <p
                      className="col-span-12 max-w-xl text-[14.5px] leading-relaxed sm:col-span-9"
                      style={{ color: SUB }}
                    >
                      {p.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── §03 — Issuer ─────────────────────────────────────── */}
      <section id="issuer" className="border-b" style={{ borderColor: INK }}>
        <div className="mx-auto max-w-[1180px] px-6 sm:px-10">
          <div className="grid grid-cols-12 gap-x-8 py-16 sm:py-24">
            <Gutter num="03" kicker={issuer.productLabel} />

            <div className="col-span-12 lg:col-span-9">
              <h2 className="text-[clamp(2.6rem,7vw,5.5rem)] font-semibold leading-[0.92] tracking-[-0.045em]">
                {issuer.title}
              </h2>
              <p
                className="mt-7 max-w-2xl text-lg leading-relaxed"
                style={{ color: SUB }}
              >
                {issuer.intro}
              </p>

              <h3 className="mt-14 max-w-2xl text-2xl font-semibold leading-snug tracking-[-0.025em] sm:text-3xl">
                {issuer.decisionsHeading}
              </h3>

              <div
                className="mt-10 grid grid-cols-1 border-t sm:grid-cols-2"
                style={{ borderColor: INK }}
              >
                {issuer.decisions.map((d, i) => (
                  <div
                    key={d.title}
                    className="border-b py-9 sm:[&:nth-child(odd)]:pr-8 sm:[&:nth-child(even)]:border-l sm:[&:nth-child(even)]:pl-8"
                    style={{ borderColor: HAIR }}
                  >
                    <div className="flex items-baseline gap-3">
                      <span
                        className="text-[13px] tabular-nums"
                        style={{ fontFamily: MONO, color: BLUE }}
                      >
                        D-{String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className="h-px flex-1 translate-y-[-3px]"
                        style={{ background: HAIR }}
                      />
                    </div>
                    <h4 className="mt-4 text-lg font-semibold leading-snug tracking-[-0.02em]">
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

              <div className="mt-12 flex flex-col sm:flex-row sm:flex-wrap sm:items-stretch">
                <span
                  aria-disabled="true"
                  className="flex cursor-not-allowed items-center justify-center border px-6 py-3.5 text-[13px] font-medium tracking-[0.02em]"
                  style={{ borderColor: HAIR, color: FAINT }}
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
                  className="-mt-px flex items-center justify-center border px-6 py-3.5 text-[13px] font-medium tracking-[0.02em] transition-colors sm:-mt-0 sm:-ml-px"
                  style={{ borderColor: INK, background: INK, color: PAPER }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = BLUE;
                    e.currentTarget.style.borderColor = BLUE;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = INK;
                    e.currentTarget.style.borderColor = INK;
                  }}
                >
                  {issuer.walkthroughCta}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── §04 — Ecosystem ──────────────────────────────────── */}
      <section className="border-b" style={{ borderColor: INK }}>
        <div className="mx-auto max-w-[1180px] px-6 sm:px-10">
          <div className="grid grid-cols-12 gap-x-8 py-16 sm:py-24">
            <Gutter num="04" kicker={ecosystem.kicker} />

            <div className="col-span-12 lg:col-span-9">
              <p className="max-w-3xl text-[clamp(1.6rem,3.4vw,2.6rem)] font-semibold leading-[1.06] tracking-[-0.03em]">
                {ecosystem.lead}
              </p>

              <div
                className="mt-12 grid grid-cols-1 border-t sm:grid-cols-2"
                style={{ borderColor: INK }}
              >
                {ecosystem.items.map((it, i) => (
                  <div
                    key={it.title}
                    className="border-b py-9 sm:[&:nth-child(odd)]:pr-8 sm:[&:nth-child(even)]:border-l sm:[&:nth-child(even)]:pl-8"
                    style={{ borderColor: HAIR }}
                  >
                    <p className="flex items-baseline gap-3 text-[15px] font-semibold tracking-[-0.01em]">
                      <span
                        className="text-[12px] tabular-nums"
                        style={{ fontFamily: MONO, color: BLUE }}
                      >
                        {String(i + 1).padStart(2, "0")}
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
              </div>

              <p
                className="mt-4 text-[11px] uppercase tracking-[0.14em]"
                style={{ fontFamily: MONO, color: FAINT }}
              >
                {ecosystem.footnote}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── §05 — API / Architecture ─────────────────────────── */}
      <section id="andamio-api" className="border-b" style={{ borderColor: INK }}>
        <div className="mx-auto max-w-[1180px] px-6 sm:px-10">
          <div className="grid grid-cols-12 gap-x-8 py-16 sm:py-24">
            <Gutter num="05" kicker={api.zoneLabel} />

            <div className="col-span-12 lg:col-span-9">
              <h2 className="text-[clamp(2.6rem,7vw,5.5rem)] font-semibold leading-[0.92] tracking-[-0.045em]">
                {api.zoneTitle}
              </h2>
              <p
                className="mt-7 max-w-2xl text-lg leading-relaxed"
                style={{ color: SUB }}
              >
                {api.zoneBlurb}
              </p>

              <div
                className="mt-14 grid grid-cols-12 gap-x-10 gap-y-10 border-t pt-12"
                style={{ borderColor: INK }}
              >
                {/* prose */}
                <div className="col-span-12 lg:col-span-5">
                  <p
                    className="text-[11px] uppercase tracking-[0.16em]"
                    style={{ fontFamily: MONO, color: BLUE }}
                  >
                    {api.kicker}
                  </p>
                  <h3 className="mt-4 text-2xl font-semibold leading-snug tracking-[-0.025em] sm:text-3xl">
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
                    style={{ color: SUB }}
                  >
                    {api.body2}
                  </p>
                  <a
                    href={EXTERNAL_LINKS.apiReference}
                    className="mt-8 inline-flex items-center gap-2 text-[13px] font-medium tracking-[0.02em] transition-colors"
                    style={{ color: INK }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = BLUE)}
                    onMouseLeave={(e) => (e.currentTarget.style.color = INK)}
                  >
                    <span
                      className="inline-block h-2 w-2 rounded-[1px]"
                      style={{ background: BLUE }}
                    />
                    {api.apiRefCta}
                  </a>
                </div>

                {/* stack — layered data sheet */}
                <div className="col-span-12 lg:col-span-7">
                  <div className="border" style={{ borderColor: INK }}>
                    {api.stack.map((layer, i) => (
                      <div
                        key={layer.name}
                        className="grid grid-cols-12 items-baseline gap-x-4 gap-y-1 px-5 py-6"
                        style={{
                          borderTop:
                            i > 0 ? `1px solid ${HAIR}` : "none",
                          background: layer.emphasis ? BLUE : "transparent",
                          color: layer.emphasis ? "#FFFFFF" : INK,
                        }}
                      >
                        <div className="col-span-12 sm:col-span-4">
                          <span
                            className="text-[11px] uppercase tracking-[0.12em]"
                            style={{
                              fontFamily: MONO,
                              color: layer.emphasis
                                ? "rgba(255,255,255,0.82)"
                                : FAINT,
                            }}
                          >
                            L{i} · {layer.labelKicker}
                          </span>
                        </div>
                        <div className="col-span-12 sm:col-span-8">
                          <p className="text-[16px] font-semibold leading-tight tracking-[-0.02em]">
                            {layer.name}
                          </p>
                          <p
                            className="mt-1.5 text-[13.5px] leading-relaxed"
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
            </div>
          </div>
        </div>
      </section>

      {/* ── §06 — Closing ────────────────────────────────────── */}
      <section className="border-b" style={{ borderColor: INK }}>
        <div className="mx-auto max-w-[1180px] px-6 sm:px-10">
          <div className="grid grid-cols-12 gap-x-8 py-20 sm:py-28">
            <Gutter num="06" kicker={closing.eyebrow} />

            <div className="col-span-12 lg:col-span-9">
              <div className="relative">
                <span
                  aria-hidden
                  className="pointer-events-none absolute -top-10 right-0 select-none text-[7rem] font-semibold leading-none tracking-[-0.06em] sm:text-[11rem]"
                  style={{ color: "rgba(22,24,29,0.05)", fontFamily: MONO }}
                >
                  12
                </span>
                <h2 className="relative text-[clamp(2.4rem,6vw,5rem)] font-semibold leading-[0.94] tracking-[-0.045em]">
                  {closing.headlineLine1}
                  <br />
                  <span style={{ color: BLUE }}>{closing.headlineLine2}</span>
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
                className="mt-10 inline-flex items-center gap-3 border px-7 py-4 text-[13px] font-medium tracking-[0.02em] transition-colors"
                style={{ borderColor: INK, background: INK, color: PAPER }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = BLUE;
                  e.currentTarget.style.borderColor = BLUE;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = INK;
                  e.currentTarget.style.borderColor = INK;
                }}
              >
                {closing.cta}
                <span style={{ fontFamily: MONO }}>→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────── */}
      <footer>
        <div className="mx-auto max-w-[1180px] px-6 sm:px-10">
          <div className="grid grid-cols-12 gap-x-8 gap-y-10 py-14">
            <div className="col-span-12 lg:col-span-4 lg:pr-10">
              <span className="flex items-baseline gap-2.5 text-[17px] font-semibold tracking-[-0.03em]">
                <span
                  aria-hidden
                  className="inline-block h-2.5 w-2.5 translate-y-[1px] rounded-[1px]"
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
                className="mt-5 text-[11px] uppercase tracking-[0.12em]"
                style={{ fontFamily: MONO, color: FAINT }}
              >
                {footer.meta}
              </p>
              <p
                className="mt-2 text-[11px] tabular-nums"
                style={{ fontFamily: MONO, color: FAINT }}
              >
                {footer.copyright}
              </p>
            </div>

            <div className="col-span-12 grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8 lg:pl-10">
              {Object.entries(footer.columns).map(([key, links]) => (
                <div key={key}>
                  <h3
                    className="mb-4 border-b pb-2 text-[11px] uppercase tracking-[0.12em]"
                    style={{ borderColor: INK }}
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
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.color = SUB)
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
            className="flex flex-col items-start justify-between gap-3 border-t py-5 sm:flex-row sm:items-center"
            style={{ borderColor: INK }}
          >
            <Link
              href="/explore"
              className="text-[12px] font-medium uppercase tracking-[0.1em] transition-colors"
              style={{ color: SUB }}
              onMouseEnter={(e) => (e.currentTarget.style.color = BLUE)}
              onMouseLeave={(e) => (e.currentTarget.style.color = SUB)}
            >
              ← Back to all iterations
            </Link>
            <span
              className="text-[11px] uppercase tracking-[0.12em]"
              style={{ fontFamily: MONO, color: FAINT }}
            >
              Iteration 12 · Spec Sheet
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
