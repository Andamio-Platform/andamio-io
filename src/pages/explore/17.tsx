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
 * Iteration 17 — "Blueprint Spec".
 *
 * Convergence on 11 + 12 + 15, leaning on 12 (Spec Sheet). A precise technical-
 * blueprint data-sheet on near-white paper: FORMAT / REGISTRY / STATUS metadata
 * rows, hairline rules, 11's generous vertical rhythm and faint fixed 12-column
 * grid field (drawn in cool-blue). Type is 12's cut — Inter semibold (600),
 * tracking -0.045em, leading ~0.9–0.92; JetBrains Mono only for labels and
 * readouts. The credential is withheld from the hero; the first section after it
 * (id="how-it-works") slides the badge sideways into a museum-specimen plate.
 *
 * Wayfinding: 12's section-bookmark FUNCTION on 15's right-side floating FORM —
 * a fixed outline rail pinned right (xl+), a compact section index with the
 * current area emphasized, plus one live readout.
 *
 * Three-color theme: COOL-BLUE #2F6BFF = primary (grid lines, section marks,
 * links, the emphasized API layer). CORAL #FF6B4A = secondary (specimen frame
 * accents, problem numerals). ORANGE #FF6B35 = sparing spark — only the live
 * pulse and the reveal's VERIFIED / on-chain highlight.
 */

const SANS = "'Inter', system-ui, -apple-system, sans-serif";
const MONO = "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace";

const PAPER = "#FCFCFD";
const INK = "#14171D";
const SUB = "rgba(20,23,29,0.62)";
const FAINT = "rgba(20,23,29,0.42)";
const HAIR = "rgba(20,23,29,0.14)";

const BLUE = "#2F6BFF"; // primary
const BLUE_FAINT = "rgba(47,107,255,0.07)"; // grid lines / wash
const CORAL = "#FF6B4A"; // secondary
const ORANGE = "#FF6B35"; // sparing spark

const NUMS = ["01", "02", "03", "04", "05", "06"];

/** Section index for the right floating rail (12's bookmark function). */
const RAIL_SECTIONS = [
  { id: "top", num: "00", label: "Hero" },
  { id: "how-it-works", num: "01", label: "How it works" },
  { id: "problem", num: "02", label: "Problem" },
  { id: "issuer", num: "03", label: "Issuer" },
  { id: "ecosystem", num: "04", label: "Ecosystem" },
  { id: "andamio-api", num: "05", label: "Andamio API" },
  { id: "closing", num: "06", label: "Get started" },
];

export default function Explore17() {
  const revealRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: revealRef,
    offset: ["start end", "center center"],
  });
  // Slides in from the RIGHT; deterministic at progress=0 for SSR/client match.
  const badgeX = useTransform(scrollYProgress, [0, 1], ["62%", "0%"]);
  const badgeOpacity = useTransform(scrollYProgress, [0, 0.55], [0, 1]);
  const plateLine = useTransform(scrollYProgress, [0, 1], ["16%", "0%"]);
  const stampOpacity = useTransform(scrollYProgress, [0.6, 1], [0, 1]);

  // Scroll-spy for the rail; deterministic default ("top") on the server.
  const [active, setActive] = useState("top");
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    RAIL_SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <div
      className="relative min-h-screen antialiased"
      style={{ background: PAPER, color: INK, fontFamily: SANS }}
    >
      <Head>
        <title>17 · Blueprint Spec — Andamio</title>
        <meta
          name="description"
          content="Andamio — verifiable credentials, drawn as a precise blueprint spec."
        />
      </Head>

      {/* ── Fixed faint 12-column rule field (cool-blue) ──────── */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 hidden justify-center md:flex"
      >
        <div
          className="grid h-full w-full max-w-[1320px] grid-cols-12 px-6 sm:px-10"
          style={{ borderRight: `1px solid ${BLUE_FAINT}` }}
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} style={{ borderLeft: `1px solid ${BLUE_FAINT}` }} />
          ))}
        </div>
      </div>

      {/* ── Fixed floating wayfinding rail (right, xl+) ───────── */}
      <aside
        className="pointer-events-none fixed right-0 top-0 z-30 hidden h-screen w-[228px] flex-col justify-between py-24 pr-6 xl:flex"
        style={{
          borderLeft: `1px solid ${HAIR}`,
          background: "rgba(252,252,253,0.7)",
          backdropFilter: "blur(2px)",
        }}
      >
        <div className="pl-6">
          <div
            className="mb-5 flex items-center justify-between text-[9px] uppercase tracking-[0.22em]"
            style={{ fontFamily: MONO, color: FAINT }}
          >
            <span>Drawing No. 17</span>
            <span style={{ color: BLUE }}>Index</span>
          </div>
          <nav className="space-y-1.5">
            {RAIL_SECTIONS.map((s) => {
              const on = active === s.id;
              return (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="pointer-events-auto flex items-center gap-3 py-1 transition-colors"
                  style={{ fontFamily: MONO }}
                >
                  <span
                    className="h-px transition-all"
                    style={{
                      width: on ? 22 : 10,
                      background: on ? BLUE : HAIR,
                    }}
                  />
                  <span
                    className="text-[10px] tabular-nums"
                    style={{ color: on ? BLUE : FAINT }}
                  >
                    {s.num}
                  </span>
                  <span
                    className="text-[11px] tracking-[0.02em] transition-colors"
                    style={{
                      color: on ? INK : "rgba(20,23,29,0.5)",
                      fontWeight: on ? 600 : 400,
                    }}
                  >
                    {s.label}
                  </span>
                </a>
              );
            })}
          </nav>
        </div>

        {/* one live readout — the spark lives here (orange pulse) */}
        <div className="pl-6" style={{ fontFamily: MONO }}>
          <div
            className="border-t pt-4"
            style={{ borderColor: HAIR }}
          >
            <div
              className="flex items-center gap-2 text-[9px] uppercase tracking-[0.18em]"
              style={{ color: FAINT }}
            >
              <span
                className="inline-block h-1.5 w-1.5 animate-pulse rounded-full"
                style={{ background: ORANGE }}
              />
              status
            </div>
            <div
              className="mt-1.5 text-[12px] tabular-nums"
              style={{ color: ORANGE }}
            >
              VERIFIED
            </div>
            <div
              className="mt-3 text-[9px] uppercase tracking-[0.16em]"
              style={{ color: "rgba(20,23,29,0.32)" }}
            >
              andamio · blueprint
            </div>
          </div>
        </div>
      </aside>

      <div className="relative z-10 xl:pr-[228px]">
        {/* ── Nav ─────────────────────────────────────────────── */}
        <header
          className="sticky top-0 z-50 backdrop-blur"
          style={{
            borderBottom: `1px solid ${INK}`,
            background: "rgba(252,252,253,0.92)",
          }}
        >
          <div className="mx-auto flex max-w-[1180px] items-center justify-between px-6 py-3.5 sm:px-10">
            <a
              href="#top"
              className="flex items-baseline gap-2.5 text-[17px] font-semibold tracking-[-0.04em]"
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
                BLUEPRINT&nbsp;/&nbsp;REV.17
              </span>
            </a>
            <nav className="hidden items-center gap-6 lg:flex">
              {nav.items.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-[12px] tracking-[0.02em] transition-colors"
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
              className="border px-4 py-2 text-[12px] font-medium tracking-[0.02em] transition-colors"
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

        {/* ── Hero (full-bleed type, NO badge) ────────────────── */}
        <section id="top" style={{ borderBottom: `1px solid ${INK}` }}>
          <div className="mx-auto max-w-[1180px] px-6 sm:px-10">
            {/* blueprint header strip — FORMAT / REGISTRY / STATUS */}
            <div
              className="flex flex-wrap items-center justify-between gap-y-2 border-b py-3 text-[11px] uppercase tracking-[0.14em]"
              style={{ borderColor: HAIR, fontFamily: MONO, color: FAINT }}
            >
              <span>
                Format —{" "}
                <span style={{ color: BLUE }}>Credential spec</span>
              </span>
              <span>Sheet 01 · Andamio</span>
              <span className="flex items-center gap-2">
                <span
                  className="inline-block h-1.5 w-1.5 animate-pulse rounded-full"
                  style={{ background: ORANGE }}
                />
                Live on Cardano mainnet
              </span>
            </div>

            <div className="pb-16 pt-16 sm:pt-24 lg:pb-24">
              <div
                className="flex items-center gap-4 text-[11px] uppercase tracking-[0.2em]"
                style={{ fontFamily: MONO, color: BLUE }}
              >
                <span>§ 00 / Abstract — Credentialing</span>
                <span className="h-px flex-1" style={{ background: HAIR }} />
                <span
                  className="hidden tabular-nums sm:inline"
                  style={{ color: FAINT }}
                >
                  No. 17 — Blueprint Spec
                </span>
              </div>

              <h1 className="mt-10 max-w-[15ch] text-[clamp(2.9rem,8.5vw,7rem)] font-semibold leading-[0.92] tracking-[-0.045em]">
                {hero.headlineLead}{" "}
                <span style={{ color: BLUE }}>{hero.headlineAccent}</span>
              </h1>

              <div className="mt-12 flex flex-col sm:flex-row sm:flex-wrap sm:items-stretch">
                <span
                  className="flex items-center border px-5 py-3 text-[11px] uppercase tracking-[0.16em]"
                  style={{ borderColor: INK, fontFamily: MONO, color: FAINT }}
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
        </section>

        {/* ── §01 — Badge reveal / specimen + demo (scroll-driven) ─ */}
        <section
          ref={revealRef}
          id="how-it-works"
          style={{ borderBottom: `1px solid ${INK}` }}
        >
          <div className="mx-auto max-w-[1180px] px-6 sm:px-10">
            <div
              className="flex flex-wrap items-center gap-4 pt-16 text-[11px] uppercase tracking-[0.18em] sm:pt-24"
              style={{ fontFamily: MONO }}
            >
              <span style={{ color: BLUE }}>§ 01 / {demo.kicker}</span>
              <span
                className="inline-flex items-center gap-2 border px-2.5 py-1 text-[10px] tracking-[0.14em]"
                style={{ borderColor: ORANGE, color: ORANGE }}
              >
                <span
                  className="h-1.5 w-1.5 animate-pulse rounded-full"
                  style={{ background: ORANGE }}
                />
                {demo.liveLabel}
              </span>
              <span className="h-px flex-1" style={{ background: INK }} />
              <span
                className="hidden tabular-nums sm:inline"
                style={{ color: FAINT }}
              >
                Specimen 001
              </span>
            </div>

            <div className="grid grid-cols-12 gap-x-8 gap-y-12 py-14 sm:py-20">
              {/* left: demo copy + data-sheet readout block */}
              <div className="col-span-12 lg:col-span-5 lg:pr-10">
                <h2 className="text-[clamp(1.9rem,4vw,2.9rem)] font-semibold leading-[1.0] tracking-[-0.035em]">
                  {demo.title}
                </h2>
                <p
                  className="mt-6 max-w-md text-[15px] leading-relaxed"
                  style={{ color: SUB }}
                >
                  {demo.note}
                </p>

                {/* mono data-sheet — FORMAT / REGISTRY / STATUS */}
                <dl
                  className="mt-8 max-w-md border-t text-[12px]"
                  style={{ borderColor: HAIR, fontFamily: MONO }}
                >
                  {[
                    ["format", "SVG · machine-readable", false],
                    ["registry", "On-chain · Cardano", false],
                    ["status", "VERIFIED", true],
                  ].map(([k, v, spark]) => (
                    <div
                      key={k as string}
                      className="flex items-center justify-between border-b py-2.5"
                      style={{ borderColor: HAIR }}
                    >
                      <dt
                        className="uppercase tracking-[0.12em]"
                        style={{ color: FAINT }}
                      >
                        {k}
                      </dt>
                      <dd style={{ color: spark ? ORANGE : INK }}>{v}</dd>
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

              {/* right: museum specimen plate — coral frame, badge slides in */}
              <div className="col-span-12 lg:col-span-7">
                <figure>
                  <div
                    className="relative overflow-hidden border"
                    style={{ borderColor: INK }}
                  >
                    {/* corner labels — coral frame accents */}
                    <div
                      className="flex items-center justify-between border-b px-4 py-2.5 text-[10px] uppercase tracking-[0.14em]"
                      style={{ borderColor: HAIR, fontFamily: MONO }}
                    >
                      <span style={{ color: CORAL }}>Specimen 001</span>
                      <span style={{ color: FAINT }}>Plate · 1:1</span>
                    </div>

                    <div
                      className="relative flex min-h-[340px] items-center justify-center px-6 py-12 sm:px-10 sm:py-16"
                      style={{ background: "#FFFFFF" }}
                    >
                      {/* registration line, draws in on scroll */}
                      <motion.span
                        aria-hidden
                        className="absolute left-0 top-1/2 h-px"
                        style={{ width: plateLine, background: CORAL }}
                      />

                      {/* coral corner ticks — specimen frame accent */}
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
                          style={{ borderColor: CORAL }}
                        />
                      ))}

                      <motion.div
                        style={{ x: badgeX, opacity: badgeOpacity }}
                        className="relative z-10 w-full max-w-[320px]"
                      >
                        <img
                          src={CREDENTIAL_BADGE_SRC}
                          alt={hero.badgeAlt}
                          width={520}
                          height={520}
                          className="w-full"
                        />
                      </motion.div>

                      {/* VERIFIED stamp — the orange spark, settles in late */}
                      <motion.span
                        aria-hidden
                        style={{ opacity: stampOpacity, fontFamily: MONO }}
                        className="absolute bottom-5 right-5 z-20 -rotate-6 border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em]"
                      >
                        <span
                          className="flex items-center gap-1.5"
                          style={{ color: ORANGE }}
                        >
                          <span
                            className="inline-block h-1.5 w-1.5 rounded-full"
                            style={{ background: ORANGE }}
                          />
                          Verified · On-chain
                        </span>
                      </motion.span>
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
        </section>

        {/* ── §02 — Problem ────────────────────────────────────── */}
        <section id="problem" style={{ borderBottom: `1px solid ${INK}` }}>
          <div className="mx-auto max-w-[1180px] px-6 sm:px-10">
            <div className="grid grid-cols-12 gap-y-10 py-16 sm:py-24">
              <div className="col-span-12 lg:col-span-4 lg:pr-10">
                <p
                  className="text-[11px] uppercase tracking-[0.18em]"
                  style={{ fontFamily: MONO, color: BLUE }}
                >
                  § 02 / {problem.kicker}
                </p>
                <h2 className="mt-5 text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-[0.95] tracking-[-0.045em]">
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
              className="grid grid-cols-12"
              style={{ borderTop: `1px solid ${INK}` }}
            >
              {problem.items.map((p, i) => (
                <div
                  key={p.headline}
                  className="col-span-12 py-10 sm:col-span-4 sm:py-12"
                  style={{
                    borderLeft: i > 0 ? `1px solid ${HAIR}` : "none",
                    paddingLeft: i > 0 ? undefined : undefined,
                  }}
                >
                  <div className={i > 0 ? "sm:pl-8" : "sm:pr-8"}>
                    {/* coral problem numerals — secondary */}
                    <span
                      className="block text-6xl font-semibold leading-none tabular-nums tracking-[-0.05em]"
                      style={{ color: CORAL }}
                    >
                      {NUMS[i]}
                    </span>
                    <h3 className="mt-6 text-xl font-semibold leading-tight tracking-[-0.03em]">
                      {p.headline}
                    </h3>
                    <p
                      className="mt-3 max-w-sm text-[14px] leading-relaxed"
                      style={{ color: SUB }}
                    >
                      {p.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── §03 — Issuer ─────────────────────────────────────── */}
        <section id="issuer" style={{ borderBottom: `1px solid ${INK}` }}>
          <div className="mx-auto max-w-[1180px] px-6 sm:px-10">
            <div className="grid grid-cols-12 gap-y-8 py-16 sm:py-24">
              <div className="col-span-12 lg:col-span-7">
                <p
                  className="text-[11px] uppercase tracking-[0.18em]"
                  style={{ fontFamily: MONO, color: BLUE }}
                >
                  § 03 / {issuer.productLabel}
                </p>
                <h2 className="mt-5 text-[clamp(2.75rem,7vw,6rem)] font-semibold leading-[0.9] tracking-[-0.045em]">
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

            <div className="border-t pt-8" style={{ borderColor: INK }}>
              <h3 className="max-w-3xl text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
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
                    borderTop:
                      i > 0 ? `1px solid ${HAIR}` : "none",
                    borderLeft:
                      i !== 0 ? `1px solid ${HAIR}` : "none",
                  }}
                >
                  <div className="flex items-baseline gap-3">
                    {/* blue section mark */}
                    <span
                      className="text-[13px] tabular-nums"
                      style={{ fontFamily: MONO, color: BLUE }}
                    >
                      D-{NUMS[i]}
                    </span>
                    <span
                      className="h-px flex-1 translate-y-[-3px]"
                      style={{ background: HAIR }}
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
              className="flex flex-col py-10 sm:flex-row sm:flex-wrap sm:items-stretch"
              style={{ borderTop: `1px solid ${INK}` }}
            >
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
        </section>

        {/* ── §04 — Ecosystem ──────────────────────────────────── */}
        <section id="ecosystem" style={{ borderBottom: `1px solid ${INK}` }}>
          <div className="mx-auto max-w-[1180px] px-6 sm:px-10">
            <div className="grid grid-cols-12 gap-y-10 py-16 sm:py-24">
              <div className="col-span-12 lg:col-span-5 lg:pr-10">
                <p
                  className="text-[11px] uppercase tracking-[0.18em]"
                  style={{ fontFamily: MONO, color: BLUE }}
                >
                  § 04 / {ecosystem.kicker}
                </p>
                <p className="mt-6 text-[clamp(1.6rem,3.4vw,2.6rem)] font-semibold leading-[1.05] tracking-[-0.035em]">
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
                      borderLeft: i === 1 ? `1px solid ${HAIR}` : "none",
                    }}
                  >
                    <p className="flex items-baseline gap-3 text-[15px] font-semibold tracking-[-0.01em]">
                      <span
                        className="text-[12px] tabular-nums"
                        style={{ fontFamily: MONO, color: BLUE }}
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
                  className="col-span-1 py-4 text-[11px] uppercase tracking-[0.14em] sm:col-span-2 sm:px-7"
                  style={{
                    fontFamily: MONO,
                    borderTop: `1px solid ${HAIR}`,
                    color: FAINT,
                  }}
                >
                  {ecosystem.footnote}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── §05 — API / Architecture ─────────────────────────── */}
        <section id="andamio-api" style={{ borderBottom: `1px solid ${INK}` }}>
          <div className="mx-auto max-w-[1180px] px-6 sm:px-10">
            {/* zone header strip — blueprint */}
            <div
              className="flex flex-wrap items-center justify-between gap-y-2 border-b py-3 text-[11px] uppercase tracking-[0.14em]"
              style={{ borderColor: HAIR, fontFamily: MONO, color: FAINT }}
            >
              <span style={{ color: BLUE }}>{api.zoneLabel}</span>
              <span>Architecture · 4 layers</span>
              <span>Audited by TxPipe</span>
            </div>

            <div className="grid grid-cols-12 gap-y-8 py-16 sm:py-24">
              <div className="col-span-12 lg:col-span-7">
                <p
                  className="text-[11px] uppercase tracking-[0.18em]"
                  style={{ fontFamily: MONO, color: BLUE }}
                >
                  § 05 / {api.kicker}
                </p>
                <h2 className="mt-5 text-[clamp(2.75rem,7vw,6rem)] font-semibold leading-[0.9] tracking-[-0.045em]">
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
              className="grid grid-cols-12"
              style={{ borderTop: `1px solid ${INK}` }}
            >
              {/* prose */}
              <div
                className="col-span-12 py-12 lg:col-span-5 lg:pr-12"
                style={{ borderRight: `1px solid ${HAIR}` }}
              >
                <h3 className="text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-[1.04] tracking-[-0.035em]">
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

              {/* stack — layered data sheet; emphasized layer in BLUE */}
              <div className="col-span-12 lg:col-span-7">
                {api.stack.map((layer, i) => (
                  <div
                    key={layer.name}
                    className="grid grid-cols-12 items-baseline gap-x-4 gap-y-1 px-0 py-7 lg:px-10"
                    style={{
                      borderTop: i > 0 ? `1px solid ${HAIR}` : "none",
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
                      <p className="text-[17px] font-semibold leading-tight tracking-[-0.025em]">
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
        </section>

        {/* ── §06 — Closing ────────────────────────────────────── */}
        <section id="closing" style={{ borderBottom: `1px solid ${INK}` }}>
          <div className="mx-auto max-w-[1180px] px-6 sm:px-10">
            <div className="grid grid-cols-12 py-20 sm:py-28">
              <div className="col-span-12 lg:col-span-9">
                <p
                  className="text-[11px] uppercase tracking-[0.18em]"
                  style={{ fontFamily: MONO, color: BLUE }}
                >
                  § 06 / {closing.eyebrow}
                </p>
                <div className="relative mt-6">
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -top-10 right-0 select-none text-[7rem] font-semibold leading-none tracking-[-0.06em] tabular-nums sm:text-[11rem]"
                    style={{ color: "rgba(20,23,29,0.05)", fontFamily: MONO }}
                  >
                    17
                  </span>
                  <h2 className="relative text-[clamp(2.5rem,7vw,5.5rem)] font-semibold leading-[0.92] tracking-[-0.045em]">
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
            <div className="grid grid-cols-12 gap-y-10 py-14">
              <div className="col-span-12 lg:col-span-4 lg:pr-10">
                <span className="flex items-baseline gap-2.5 text-[17px] font-semibold tracking-[-0.04em]">
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
                      className="mb-4 border-b pb-2 text-[11px] font-semibold uppercase tracking-[0.12em]"
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
                Iteration 17 · Blueprint Spec
              </span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
