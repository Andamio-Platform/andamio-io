"use client";

/**
 * StoryFork — the full-screen story flow (story-flows storyboard, 2026-07-02).
 * Lives at /show-me; the hero's "Show me" button navigates here. One locked
 * component that always fills the viewport (width and height) no matter which
 * door or chapter the visitor clicks through — screens swap in place, the
 * frame never moves.
 *
 * Composition rules (design pass, 2026-07-02 PM):
 *  - The doors ARE the screen: three full-height panels that take every pixel
 *    below the question. Number top-left, arrow top-right, statement anchored
 *    at the bottom — a gallery panel, not a card.
 *  - Path screens center their content; the issuer tour's chapter rail is
 *    pinned to the bottom edge like a slide deck's footer.
 *  - One orchestrated entrance: the question rises, the doors stagger in.
 *    Screen/chapter swaps get a short rise. Reduced motion zeroes it all.
 *  - Esc closes (keycap in the chrome says so); ✕ rotates a quarter turn on
 *    hover. Exits with an href leave the flow — the route hop is part of the
 *    story (the issuer journey lands on /issuer).
 */

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { lifecycles, storyFork } from "~/ui/explore/content";
import { color, font, motion as motionTok } from "./tokens";
import { Button, ButtonRow, Brand, Display, LogoWash } from "./kit";
import { readIntent, persistIntent } from "./funnel-intent";
import { directionalSlide, useMotionGate } from "./motion";
import { OrbitSteps } from "./instrument";

type PathKey = (typeof storyFork.statements)[number]["key"];

const mono = { fontFamily: font.mono };
const muted = { color: color.inkMuted };
const NUMS = ["01", "02", "03"] as const;

/** A full-width choice row inside a screen — routes away, or swaps the screen. */
function ChoiceRow({
  label,
  href,
  onClick,
}: {
  label: string;
  href?: string;
  onClick?: () => void;
}) {
  const className =
    "block w-full border p-5 text-left text-base font-medium leading-snug tracking-[-0.01em] transition-opacity hover:opacity-60 sm:text-lg";
  const style = { borderColor: color.cell };
  if (href) {
    return href.startsWith("/") ? (
      <Link href={href} className={className} style={style}>
        {label}
      </Link>
    ) : (
      <a href={href} className={className} style={style}>
        {label}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} className={className} style={style}>
      {label}
    </button>
  );
}

function ScreenHeading({ heading, body }: { heading: string; body?: string }) {
  return (
    <div>
      <h1 className="text-3xl font-semibold leading-[1.05] tracking-[-0.03em] sm:text-5xl">
        {heading}
      </h1>
      {body && (
        <p className="mt-6 text-lg leading-relaxed sm:text-xl" style={muted}>
          {body}
        </p>
      )}
    </div>
  );
}

type Chapter = "use" | "built" | "matters";
const CHAPTERS: Chapter[] = ["use", "built", "matters"];

export default function StoryFork() {
  const [active, setActive] = useState<PathKey | null>(null);
  const [cardano, setCardano] = useState(false);
  const [chapter, setChapter] = useState<Chapter>("use");
  const [ready, setReady] = useState(false);
  const router = useRouter();
  const reduce = useMotionGate();
  const [pathDir, setPathDir] = useState(1);

  // Esc closes the flow, as the keycap in the chrome promises.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") void router.push("/");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [router]);

  // Progressive continuation: if homepage already chose an intent, open that path.
  useEffect(() => {
    const stored = readIntent();
    if (stored === "issuer" || stored === "builder" || stored === "curious") {
      setActive(stored);
    }
    setReady(true);
  }, []);

  const pick = (key: PathKey) => {
    persistIntent(key);
    setCardano(false);
    setChapter("use");
    setPathDir(1);
    setActive(key);
  };

  const backToDoors = () => {
    setPathDir(-1);
    setActive(null);
    setCardano(false);
    setChapter("use");
  };

  // The entrance: question first, then the doors, one beat apart.
  const rise = {
    hidden: { opacity: 0, y: reduce ? 0 : 22 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: motionTok.duration.enterFast,
        ease: motionTok.ease,
      },
    },
  };
  const doorsStagger = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduce ? 0 : motionTok.stagger.children,
        delayChildren: reduce ? 0 : motionTok.stagger.delayChildren,
      },
    },
  };

  if (!ready) {
    return (
      <div
        className="flex h-[100svh] w-full items-center justify-center"
        style={{ background: color.paper, color: color.ink }}
      >
        <span className="sr-only">Loading story</span>
      </div>
    );
  }

  return (
    // The locked frame: always exactly one viewport, on every screen of the
    // flow. Inner content scrolls within the frame if it must (small phones);
    // the frame itself never grows.
    <div
      className="relative flex h-[100svh] w-full flex-col overflow-hidden px-6 sm:px-10"
      style={{ background: color.paper, color: color.ink }}
    >
      <LogoWash />
      {/* Frame chrome: brand home-link left; esc keycap + ✕ right. */}
      <a
        href="#show-me-main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:px-4 focus:py-2 focus:text-[13px] focus:font-semibold"
        style={{ background: color.ink, color: color.onInk }}
      >
        Skip to story
      </a>
      <header className="relative z-10 flex flex-none items-center justify-between py-5">
        <Brand />
        <Link
          href="/"
          aria-label="Close and return home"
          className="group inline-flex items-center gap-3 transition-opacity hover:opacity-70"
          style={{ color: color.ink }}
        >
          <span
            className="border px-2 py-1 text-[10px] uppercase tracking-[0.14em]"
            style={{ ...mono, color: color.inkFaint, borderColor: color.cell }}
          >
            esc
          </span>
          <X
            size={20}
            className="transition-transform duration-200 group-hover:rotate-90"
          />
        </Link>
      </header>

      <main
        id="show-me-main"
        className="relative z-10 min-h-0 flex-1 overflow-y-auto"
      >
        {/* ── Screen 1 — the three doors fill everything below the question. ── */}
        {!active && (
          <motion.div
            variants={doorsStagger}
            initial="hidden"
            animate="show"
            className="flex min-h-full flex-col"
          >
            <motion.div variants={rise} className="flex-none pb-8 pt-4 sm:pt-8">
              <Display as="h1" size="lg">
                {storyFork.bridge}
              </Display>
            </motion.div>

            <div className="grid min-h-0 flex-1 grid-cols-1 gap-4 pb-8 lg:grid-cols-3">
              {storyFork.statements.map((s, i) => (
                <motion.button
                  key={s.key}
                  variants={rise}
                  type="button"
                  onClick={() => pick(s.key)}
                  className="sys-control-press group flex cursor-pointer flex-col justify-between border p-6 text-left transition-colors duration-150 hover:[background:var(--sys-ink)] hover:[color:var(--sys-on-ink)] sm:p-8"
                  style={{
                    borderColor: color.ink,
                    boxShadow: color.controlShadow,
                  }}
                >
                  <span className="flex items-start justify-between">
                    {/* Watermark numeral — currentColor at low opacity, so it
                        inverts with the panel on hover. */}
                    <span
                      className="text-6xl font-semibold tabular-nums leading-none tracking-[-0.05em] opacity-[0.14] sm:text-8xl"
                      aria-hidden
                    >
                      {NUMS[i]}
                    </span>
                    <span
                      aria-hidden
                      className="text-2xl leading-none transition-transform duration-150 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </span>
                  {/* Statement vertically centered in the panel's remaining
                      space (James, 2026-07-02). */}
                  <span className="flex min-h-0 flex-1 items-center">
                    <span className="block max-w-[20ch] text-2xl font-semibold leading-[1.15] tracking-[-0.02em] sm:text-3xl">
                      {s.label}
                    </span>
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* ── Path screens — content centered, same locked frame. ────── */}
        <AnimatePresence mode="wait" custom={pathDir}>
          {active && (
            <motion.div
              key={`${active}-${cardano}-${chapter}`}
              custom={pathDir}
              variants={reduce ? undefined : directionalSlide}
              initial={reduce ? false : "enter"}
              animate={reduce ? undefined : "center"}
              exit={reduce ? undefined : "exit"}
              className="flex min-h-full flex-col"
            >
              <div className="flex-none pt-2">
                <button
                  type="button"
                  onClick={backToDoors}
                  className="inline-flex items-center gap-2 text-[12px] font-medium tracking-[-0.01em] transition-opacity hover:opacity-60"
                  style={{ color: color.inkFaint }}
                >
                  <span aria-hidden>←</span> {storyFork.bridge}
                </button>
              </div>

              {/* Path 1 — the issuer: a three-chapter tour in the promised
                order (use → built → matters). The routing question is the
                tour's LAST beat; the chapter rail is pinned to the bottom. */}
              {active === "issuer" && !cardano && (
                <>
                  <div className="flex min-h-0 flex-1 flex-col justify-center py-8">
                    <ScreenHeading heading={storyFork.issuer.heading} />

                    {chapter === "use" && (
                      <div className="mt-10">
                        <p
                          className="text-lg leading-relaxed sm:text-xl"
                          style={muted}
                        >
                          {storyFork.issuer.use.lead}
                        </p>
                        {/* The pattern, folded in from the landing (2026-07-02):
                          Define · Evidence · Review · Claim as the same
                          numbered list treatment as the layers. */}
                        <ol className="mt-8 space-y-5">
                          {storyFork.issuer.use.steps.map((st, i) => (
                            <li key={st.name} className="flex gap-6">
                              <span
                                className="pt-1.5 text-[12px] tabular-nums tracking-[0.1em]"
                                style={{ ...mono, color: color.inkFaint }}
                              >
                                {`0${i + 1}`}
                              </span>
                              <p
                                className="text-lg leading-relaxed sm:text-xl"
                                style={muted}
                              >
                                <strong
                                  className="font-semibold"
                                  style={{ color: color.ink }}
                                >
                                  {st.name}
                                </strong>{" "}
                                {st.body}
                              </p>
                            </li>
                          ))}
                        </ol>
                        <p
                          className="mt-8 text-lg leading-relaxed sm:text-xl"
                          style={muted}
                        >
                          {storyFork.issuer.use.close}
                        </p>
                        <div className="mt-10">
                          <ButtonRow>
                            <Button
                              variant="ink"
                              href={storyFork.issuer.use.cta.href}
                            >
                              {storyFork.issuer.use.cta.label}{" "}
                              <span aria-hidden>→</span>
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() => setChapter("built")}
                            >
                              {storyFork.issuer.use.advance}{" "}
                              <span aria-hidden>→</span>
                            </Button>
                          </ButtonRow>
                        </div>
                      </div>
                    )}

                    {chapter === "built" && (
                      <div className="mt-10">
                        <h2 className="text-xl font-semibold tracking-[-0.02em] sm:text-2xl">
                          {storyFork.issuer.built.heading}
                        </h2>
                        {/* One numbered vertical list — the layer name bolded
                          inline, the sentence flowing on; full width, no cards. */}
                        <ol className="mt-8 space-y-6">
                          {storyFork.issuer.built.layers.map((l, i) => (
                            <li key={l.name} className="flex gap-6">
                              <span
                                className="pt-1.5 text-[12px] tabular-nums tracking-[0.1em]"
                                style={{ ...mono, color: color.inkFaint }}
                              >
                                {`0${i + 1}`}
                              </span>
                              <p
                                className="text-lg leading-relaxed sm:text-xl"
                                style={muted}
                              >
                                <strong
                                  className="font-semibold"
                                  style={{ color: color.ink }}
                                >
                                  {l.name}
                                </strong>{" "}
                                {l.body}
                              </p>
                            </li>
                          ))}
                        </ol>
                        <div className="mt-10">
                          <Button
                            variant="outline"
                            onClick={() => setChapter("matters")}
                          >
                            {storyFork.issuer.built.advance}{" "}
                            <span aria-hidden>→</span>
                          </Button>
                        </div>
                      </div>
                    )}

                    {chapter === "matters" && (
                      <div className="mt-10">
                        <h2 className="text-xl font-semibold tracking-[-0.02em] sm:text-2xl">
                          {storyFork.issuer.matters.heading}
                        </h2>
                        <p
                          className="mt-4 text-lg leading-relaxed"
                          style={muted}
                        >
                          {storyFork.issuer.matters.lead}
                        </p>
                        {/* The three villains — the landing's retired problem
                          section, fully incorporated (2026-07-02). */}
                        <ol className="mt-6 space-y-4">
                          {storyFork.issuer.matters.villains.map((v, i) => (
                            <li key={v.name} className="flex gap-6">
                              <span
                                className="pt-1 text-[12px] tabular-nums tracking-[0.1em]"
                                style={{ ...mono, color: color.inkFaint }}
                              >
                                {`0${i + 1}`}
                              </span>
                              <p
                                className="text-base leading-relaxed sm:text-lg"
                                style={muted}
                              >
                                <strong
                                  className="font-semibold"
                                  style={{ color: color.ink }}
                                >
                                  {v.name}
                                </strong>{" "}
                                {v.body}
                                {"source" in v ? (
                                  <a
                                    href={v.source.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-1 block text-[12px] underline-offset-4 hover:underline"
                                    style={{ ...mono, color: color.cyan }}
                                  >
                                    Source: {v.source.label} ↗
                                  </a>
                                ) : null}
                              </p>
                            </li>
                          ))}
                        </ol>
                        <p className="mt-6 text-lg font-medium leading-snug tracking-[-0.01em]">
                          {storyFork.issuer.matters.close}
                        </p>
                        <p
                          className="mt-8 text-lg font-medium tracking-[-0.01em]"
                          style={muted}
                        >
                          {storyFork.issuer.matters.question}
                        </p>
                        <div className="mt-6 grid grid-cols-1 gap-3">
                          {storyFork.issuer.choices.map((c) =>
                            "href" in c ? (
                              <ChoiceRow
                                key={c.label}
                                label={c.label}
                                href={c.href}
                              />
                            ) : (
                              <ChoiceRow
                                key={c.label}
                                label={c.label}
                                onClick={() => setCardano(true)}
                              />
                            ),
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* The chapter rail — the promise as the screen's footer. */}
                  <nav className="flex flex-none flex-wrap gap-x-10 gap-y-2 pb-7">
                    {CHAPTERS.map((c, i) => {
                      const current = chapter === c;
                      return (
                        <button
                          key={c}
                          type="button"
                          aria-current={current}
                          onClick={() => setChapter(c)}
                          className="text-[12px] font-medium tracking-[-0.01em] transition-opacity hover:opacity-70"
                          style={{
                            color: current ? color.ink : color.inkFaint,
                          }}
                        >
                          {`0${i + 1}`} · {storyFork.issuer[c].label}
                        </button>
                      );
                    })}
                  </nav>
                </>
              )}

              {/* Path 1c — the Cardano neighbor (shared room with path 3's fast lane). */}
              {active === "issuer" && cardano && (
                <div className="flex min-h-0 flex-1 flex-col justify-center py-8">
                  <ScreenHeading
                    heading={storyFork.cardano.heading}
                    body={storyFork.cardano.body}
                  />
                  <OrbitSteps
                    className="mt-8 max-w-[520px]"
                    label={`${lifecycles.earner.label} lifecycle`}
                    steps={lifecycles.earner.steps}
                  />
                  <div className="mt-10">
                    <ButtonRow>
                      {storyFork.cardano.exits.map((e, i) => (
                        <Button
                          key={e.label}
                          variant={i === 0 ? "ink" : "outline"}
                          href={e.href}
                        >
                          {e.label} <span aria-hidden>→</span>
                        </Button>
                      ))}
                    </ButtonRow>
                  </div>
                </div>
              )}

              {/* Path 2 — the builder: which door. */}
              {active === "builder" && (
                <div className="flex min-h-0 flex-1 flex-col justify-center py-8">
                  <ScreenHeading
                    heading={storyFork.builder.heading}
                    body={storyFork.builder.body}
                  />
                  <div className="mt-10 grid grid-cols-1 gap-3">
                    {storyFork.builder.choices.map((c) => (
                      <ChoiceRow key={c.label} label={c.label} href={c.href} />
                    ))}
                  </div>
                </div>
              )}

              {/* Path 3 — the curious one: the assumptions, answered plainly. */}
              {active === "curious" && (
                <div className="flex min-h-0 flex-1 flex-col justify-center py-8">
                  <ScreenHeading
                    heading={storyFork.curious.heading}
                    body={storyFork.curious.lead}
                  />
                  <ol className="mt-10 space-y-6">
                    {storyFork.curious.assumptions.map((a, i) => (
                      <li key={a.term} className="flex gap-6">
                        <span
                          className="pt-1.5 text-[12px] tabular-nums tracking-[0.1em]"
                          style={{ ...mono, color: color.inkFaint }}
                        >
                          {`0${i + 1}`}
                        </span>
                        <p
                          className="text-lg leading-relaxed sm:text-xl"
                          style={muted}
                        >
                          {a.before}{" "}
                          <strong
                            className="font-semibold"
                            style={{ color: color.ink }}
                          >
                            {a.term}
                          </strong>
                          {a.after}
                        </p>
                      </li>
                    ))}
                  </ol>
                  <p
                    className="mt-10 text-lg font-medium tracking-[-0.01em]"
                    style={muted}
                  >
                    {storyFork.curious.close}
                  </p>
                  <div className="mt-6">
                    <ButtonRow>
                      {storyFork.curious.exits.map((e, i) => (
                        <Button
                          key={e.label}
                          variant={i === 0 ? "ink" : "outline"}
                          href={e.href}
                        >
                          {e.label} <span aria-hidden>→</span>
                        </Button>
                      ))}
                    </ButtonRow>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
