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
 * Iteration 10 — "Warm Magazine".
 *
 * An editorial print spread. Full-bleed sections alternate warm cream and deep
 * charcoal like the pages of a commissioned feature article. Fraunces display
 * headlines at large optical sizes, a drop-cap opening the issuer essay,
 * oversized pull-quotes set between sections, multi-column reading rhythm, and a
 * single warm-ochre accent. Self-contained palette — no global theme tokens.
 */

const CREAM = "#F6EFE3";
const CARD = "#FBF7EE"; // lifted cream panel
const RULE_CREAM = "#E3D8C4";
const INK = "#211C18";
const INK_SOFT = "#3A322B";
const OCHRE = "#C8732B";

const display = "'Fraunces', Georgia, serif";
const body = "'Archivo', 'Inter', system-ui, sans-serif";
const mono = "'JetBrains Mono', ui-monospace, monospace";

/** Small editorial kicker — uppercase, tracked, mono. */
function Kicker({ children, light }: { children: React.ReactNode; light?: boolean }) {
  return (
    <span
      className="inline-block text-[11px] font-medium uppercase"
      style={{
        fontFamily: mono,
        letterSpacing: "0.28em",
        color: light ? "rgba(246,239,227,0.55)" : "rgba(33,28,24,0.5)",
      }}
    >
      {children}
    </span>
  );
}

export default function Explore10() {
  const dropFirst = issuer.intro.charAt(0);
  const dropRest = issuer.intro.slice(1);

  return (
    <div
      className="min-h-screen antialiased"
      style={{ background: CREAM, color: INK, fontFamily: body }}
    >
      <Head>
        <title>10 · Warm Magazine — Andamio</title>
      </Head>

      {/* ── Masthead / Nav ──────────────────────────────────── */}
      <header
        className="sticky top-0 z-50 backdrop-blur"
        style={{
          background: "rgba(246,239,227,0.88)",
          borderBottom: `1px solid ${INK}`,
        }}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-baseline gap-3">
            <span
              className="text-2xl font-semibold tracking-tight"
              style={{ fontFamily: display }}
            >
              {nav.brand}
            </span>
            <span
              className="hidden text-[10px] uppercase sm:inline"
              style={{ fontFamily: mono, letterSpacing: "0.24em", color: OCHRE }}
            >
              The Credential Issue
            </span>
          </div>
          <nav className="hidden items-center gap-6 lg:flex">
            {nav.items.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-[13px] transition-colors"
                style={{ color: INK_SOFT }}
                onMouseEnter={(e) => (e.currentTarget.style.color = OCHRE)}
                onMouseLeave={(e) => (e.currentTarget.style.color = INK_SOFT)}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <a
            href={nav.cta.href}
            className="rounded-none px-4 py-2 text-[13px] font-medium uppercase tracking-wide transition-transform hover:-translate-y-0.5"
            style={{
              background: INK,
              color: CREAM,
              fontFamily: mono,
              letterSpacing: "0.1em",
            }}
          >
            {nav.cta.label}
          </a>
        </div>
      </header>

      {/* ── Hero (cream) ────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-6 pt-16 pb-20 sm:pt-24">
          <div className="flex items-center gap-4">
            <Kicker>Issue Nº 01</Kicker>
            <span className="h-px flex-1" style={{ background: RULE_CREAM }} />
            <Kicker>Andamio · 2026</Kicker>
          </div>

          <div className="mt-10 grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <h1
                className="font-light leading-[0.94] tracking-[-0.02em]"
                style={{
                  fontFamily: display,
                  fontSize: "clamp(3rem,8vw,7rem)",
                  fontVariationSettings: "'opsz' 144",
                }}
              >
                {hero.headlineLead}{" "}
                <em className="italic" style={{ color: OCHRE }}>
                  {hero.headlineAccent}
                </em>
              </h1>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <span
                  className="text-[11px] uppercase"
                  style={{ fontFamily: mono, letterSpacing: "0.24em", color: INK_SOFT }}
                >
                  {hero.ctaEyebrow}
                </span>
                <a
                  href={hero.primaryCta.href}
                  className="px-6 py-3 text-[14px] font-medium transition-transform hover:-translate-y-0.5"
                  style={{ background: OCHRE, color: CREAM, fontFamily: body }}
                >
                  {hero.primaryCta.label}
                </a>
                <a
                  href={hero.secondaryCta.href}
                  className="px-6 py-3 text-[14px] font-medium transition-colors"
                  style={{ border: `1px solid ${INK}`, color: INK }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = INK;
                    e.currentTarget.style.color = CREAM;
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

            <figure className="relative mx-auto w-full max-w-sm">
              <div
                className="p-6"
                style={{ background: CARD, border: `1px solid ${INK}` }}
              >
                <img
                  src={CREDENTIAL_BADGE_SRC}
                  alt={hero.badgeAlt}
                  width={420}
                  height={420}
                  className="w-full"
                />
              </div>
              <figcaption
                className="mt-4 flex gap-3 text-[13px] italic leading-snug"
                style={{ fontFamily: display, color: INK_SOFT }}
              >
                <span
                  className="not-italic"
                  style={{ fontFamily: mono, color: OCHRE }}
                >
                  Fig.1
                </span>
                {hero.badgeCaption}
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* ── Problem (charcoal) ──────────────────────────────── */}
      <section style={{ background: INK, color: CREAM }}>
        <div className="mx-auto max-w-6xl px-6 py-24">
          <Kicker light>{problem.kicker}</Kicker>
          <div className="mt-6 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <h2
              className="font-light leading-[0.98] tracking-[-0.02em]"
              style={{ fontFamily: display, fontSize: "clamp(2.5rem,5vw,4.5rem)" }}
            >
              {problem.heading}
            </h2>
            <p
              className="text-lg leading-relaxed"
              style={{ color: "rgba(246,239,227,0.7)" }}
            >
              {problem.intro}
            </p>
          </div>

          <div
            className="mt-16 grid gap-x-12 gap-y-12 md:grid-cols-3"
            style={{ borderTop: `1px solid rgba(246,239,227,0.2)` }}
          >
            {problem.items.map((p, i) => (
              <div key={p.headline} className="pt-8">
                <span
                  className="block text-3xl tabular-nums"
                  style={{ fontFamily: display, color: OCHRE }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3
                  className="mt-4 text-2xl leading-snug"
                  style={{ fontFamily: display }}
                >
                  {p.headline}
                </h3>
                <p
                  className="mt-3 text-[15px] leading-relaxed"
                  style={{ color: "rgba(246,239,227,0.66)" }}
                >
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Demo / framed specimen (cream) ──────────────────── */}
      <section id="how-it-works">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="flex items-center gap-4">
            <Kicker>{demo.kicker}</Kicker>
            <span
              className="inline-flex items-center gap-2 px-2.5 py-1 text-[10px] font-medium uppercase"
              style={{
                fontFamily: mono,
                letterSpacing: "0.2em",
                color: OCHRE,
                border: `1px solid ${OCHRE}`,
              }}
            >
              <span
                className="h-1.5 w-1.5 animate-pulse rounded-full"
                style={{ background: OCHRE }}
              />
              {demo.liveLabel}
            </span>
          </div>

          <div className="mt-10 grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
            {/* The specimen plate */}
            <figure
              className="relative p-8"
              style={{ background: CARD, border: `1px solid ${INK}` }}
            >
              <span
                className="absolute left-4 top-4 text-[10px] uppercase"
                style={{ fontFamily: mono, letterSpacing: "0.22em", color: INK_SOFT }}
              >
                Specimen
              </span>
              <img
                src={CREDENTIAL_BADGE_SRC}
                alt={hero.badgeAlt}
                width={460}
                height={460}
                className="mx-auto w-full max-w-xs"
              />
              <figcaption
                className="mt-6 border-t pt-4 text-[13px] italic leading-snug"
                style={{ fontFamily: display, color: INK_SOFT, borderColor: RULE_CREAM }}
              >
                {demo.note}
              </figcaption>
            </figure>

            <div>
              <h2
                className="font-light leading-[1.02] tracking-[-0.015em]"
                style={{ fontFamily: display, fontSize: "clamp(2rem,4vw,3.5rem)" }}
              >
                {demo.title}
              </h2>
              <a
                href="#issuer"
                className="mt-8 inline-flex items-center gap-2 text-[15px] font-medium transition-colors"
                style={{ color: OCHRE }}
              >
                {demo.inspirationCta}
                <span aria-hidden>→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Pull-quote band (charcoal) ──────────────────────── */}
      <section style={{ background: INK, color: CREAM }}>
        <div className="mx-auto max-w-5xl px-6 py-24 text-center">
          <span
            className="text-6xl leading-none"
            style={{ fontFamily: display, color: OCHRE }}
            aria-hidden
          >
            “
          </span>
          <blockquote
            className="mt-2 font-light italic leading-[1.08] tracking-[-0.02em]"
            style={{ fontFamily: display, fontSize: "clamp(2rem,5vw,4rem)" }}
          >
            {issuer.decisions[0].title}
          </blockquote>
          <p
            className="mt-8 text-[11px] uppercase"
            style={{ fontFamily: mono, letterSpacing: "0.26em", color: OCHRE }}
          >
            On what an Andamio credential is
          </p>
        </div>
      </section>

      {/* ── Issuer (cream) — the feature essay with drop-cap ── */}
      <section id="issuer">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <Kicker>{issuer.productLabel}</Kicker>
          <h2
            className="mt-5 font-light leading-[0.9] tracking-[-0.03em]"
            style={{
              fontFamily: display,
              fontSize: "clamp(3rem,9vw,8rem)",
              fontVariationSettings: "'opsz' 144",
            }}
          >
            {issuer.title}
          </h2>

          {/* Drop-cap essay intro, two-column on desktop */}
          <p
            className="mt-10 max-w-4xl text-xl leading-relaxed md:columns-2 md:gap-12"
            style={{ color: INK_SOFT }}
          >
            <span
              className="float-left mr-3 mt-2 leading-[0.7]"
              style={{
                fontFamily: display,
                color: OCHRE,
                fontSize: "5.5rem",
              }}
            >
              {dropFirst}
            </span>
            {dropRest}
          </p>

          <p
            className="mt-16 max-w-3xl text-3xl font-light italic leading-[1.15] tracking-[-0.01em]"
            style={{ fontFamily: display }}
          >
            {issuer.decisionsHeading}
          </p>

          <dl
            className="mt-12 grid gap-x-12 gap-y-12 sm:grid-cols-2 lg:grid-cols-3"
            style={{ borderTop: `1px solid ${INK}` }}
          >
            {issuer.decisions.map((d, i) => (
              <div key={d.title} className="pt-7">
                <span
                  className="text-2xl tabular-nums"
                  style={{ fontFamily: display, color: OCHRE }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <dt
                  className="mt-3 text-xl leading-snug"
                  style={{ fontFamily: display }}
                >
                  {d.title}
                </dt>
                <dd
                  className="mt-2 text-[14px] leading-relaxed"
                  style={{ color: INK_SOFT }}
                >
                  {d.body}
                </dd>
              </div>
            ))}
          </dl>

          <div
            className="mt-14 flex flex-wrap items-center gap-4 pt-8"
            style={{ borderTop: `1px solid ${RULE_CREAM}` }}
          >
            <span
              className="cursor-not-allowed px-6 py-3 text-[14px] font-medium"
              style={{ border: `1px solid ${RULE_CREAM}`, color: "rgba(33,28,24,0.4)" }}
              aria-disabled="true"
            >
              {issuer.reportCta}
            </span>
            <a
              href={EXTERNAL_LINKS.walkthroughMailto}
              className="px-6 py-3 text-[14px] font-medium transition-transform hover:-translate-y-0.5"
              style={{ background: INK, color: CREAM }}
            >
              {issuer.walkthroughCta}
            </a>
          </div>
        </div>
      </section>

      {/* ── Ecosystem (charcoal) ────────────────────────────── */}
      <section style={{ background: INK, color: CREAM }}>
        <div className="mx-auto max-w-5xl px-6 py-24">
          <Kicker light>{ecosystem.kicker}</Kicker>
          <p
            className="mt-6 max-w-3xl text-3xl font-light leading-[1.2] tracking-[-0.01em] sm:text-4xl"
            style={{ fontFamily: display }}
          >
            {ecosystem.lead}
          </p>

          <div
            className="mt-14 grid gap-10 pt-8 sm:grid-cols-2"
            style={{ borderTop: `1px solid rgba(246,239,227,0.2)` }}
          >
            {ecosystem.items.map((it, i) => (
              <div key={it.title}>
                <p
                  className="text-[11px] uppercase"
                  style={{ fontFamily: mono, letterSpacing: "0.22em", color: OCHRE }}
                >
                  {String(i + 1).padStart(2, "0")} — {it.title}
                </p>
                <p
                  className="mt-3 text-[15px] leading-relaxed"
                  style={{ color: "rgba(246,239,227,0.7)" }}
                >
                  {it.body}
                </p>
              </div>
            ))}
          </div>
          <p
            className="mt-10 text-xs"
            style={{ color: "rgba(246,239,227,0.4)", fontFamily: mono }}
          >
            {ecosystem.footnote}
          </p>
        </div>
      </section>

      {/* ── API / Architecture (cream) ──────────────────────── */}
      <section id="andamio-api">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <Kicker>{api.zoneLabel}</Kicker>
          <h2
            className="mt-5 font-light leading-[0.9] tracking-[-0.03em]"
            style={{
              fontFamily: display,
              fontSize: "clamp(3rem,9vw,8rem)",
              fontVariationSettings: "'opsz' 144",
            }}
          >
            {api.zoneTitle}
          </h2>
          <p className="mt-6 max-w-2xl text-xl leading-relaxed" style={{ color: INK_SOFT }}>
            {api.zoneBlurb}
          </p>

          <div className="mt-16 grid gap-16 lg:grid-cols-2 lg:items-start">
            <div>
              <Kicker>{api.kicker}</Kicker>
              <h3
                className="mt-4 font-light leading-[1.02] tracking-[-0.02em]"
                style={{ fontFamily: display, fontSize: "clamp(2rem,4vw,3.25rem)" }}
              >
                {api.heading}
              </h3>
              <p className="mt-6 max-w-lg text-lg leading-relaxed" style={{ color: INK_SOFT }}>
                {api.body1}
              </p>
              <p
                className="mt-4 max-w-lg text-[15px] leading-relaxed"
                style={{ color: "rgba(33,28,24,0.65)" }}
              >
                {api.body2}
              </p>
              <a
                href={EXTERNAL_LINKS.apiReference}
                className="mt-7 inline-flex items-center gap-2 text-[15px] font-medium"
                style={{ color: OCHRE }}
              >
                {api.apiRefCta}
                <span aria-hidden>→</span>
              </a>
            </div>

            {/* The stack, as a layered diagram */}
            <div style={{ border: `1px solid ${INK}` }}>
              {api.stack.map((layer, i) => {
                const emph = layer.emphasis;
                return (
                  <div
                    key={layer.name}
                    style={{
                      borderTop: i > 0 ? `1px solid ${emph ? OCHRE : RULE_CREAM}` : undefined,
                      background: emph ? OCHRE : CARD,
                      color: emph ? CREAM : INK,
                    }}
                  >
                    <div className="px-7 py-6">
                      <p
                        className="text-[10px] uppercase"
                        style={{
                          fontFamily: mono,
                          letterSpacing: "0.22em",
                          color: emph ? "rgba(246,239,227,0.85)" : INK_SOFT,
                        }}
                      >
                        {layer.labelKicker}
                      </p>
                      <p className="mt-2 text-xl" style={{ fontFamily: display }}>
                        {layer.name}
                      </p>
                      <p
                        className="mt-2 text-[14px] leading-relaxed"
                        style={{ color: emph ? "rgba(246,239,227,0.9)" : "rgba(33,28,24,0.65)" }}
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

      {/* ── Closing (charcoal — the back cover) ─────────────── */}
      <section style={{ background: INK, color: CREAM }}>
        <div className="mx-auto max-w-3xl px-6 py-28 text-center">
          <p
            className="text-[11px] uppercase"
            style={{ fontFamily: mono, letterSpacing: "0.26em", color: OCHRE }}
          >
            {closing.eyebrow}
          </p>
          <h2
            className="mt-6 font-light leading-[1.0] tracking-[-0.02em]"
            style={{ fontFamily: display, fontSize: "clamp(2.5rem,6vw,5rem)" }}
          >
            {closing.headlineLine1}
            <br />
            <em className="italic" style={{ color: OCHRE }}>
              {closing.headlineLine2}
            </em>
          </h2>
          <p
            className="mx-auto mt-7 max-w-xl text-lg leading-relaxed"
            style={{ color: "rgba(246,239,227,0.7)" }}
          >
            {closing.body}
          </p>
          <a
            href={EXTERNAL_LINKS.walkthroughMailto}
            className="mt-10 inline-block px-8 py-4 text-[15px] font-medium transition-transform hover:-translate-y-0.5"
            style={{ background: OCHRE, color: CREAM }}
          >
            {closing.cta}
          </a>
        </div>
      </section>

      {/* ── Footer (charcoal — colophon) ────────────────────── */}
      <footer style={{ background: INK, color: "rgba(246,239,227,0.7)" }}>
        <div
          className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-14 md:flex-row md:justify-between"
          style={{ borderTop: `1px solid rgba(246,239,227,0.15)` }}
        >
          <div className="max-w-xs">
            <span className="text-2xl" style={{ fontFamily: display, color: CREAM }}>
              {nav.brand}
            </span>
            <p className="mt-3 text-sm leading-relaxed" style={{ color: "rgba(246,239,227,0.55)" }}>
              {footer.tagline}
            </p>
            <p
              className="mt-5 text-[12px]"
              style={{ fontFamily: mono, color: "rgba(246,239,227,0.45)" }}
            >
              {footer.meta}
            </p>
            <p className="mt-3 text-[12px]" style={{ color: "rgba(246,239,227,0.4)" }}>
              {footer.copyright}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {Object.entries(footer.columns).map(([key, links]) => (
              <div key={key}>
                <h3
                  className="mb-4 text-[11px] uppercase"
                  style={{ fontFamily: mono, letterSpacing: "0.18em", color: "rgba(246,239,227,0.8)" }}
                >
                  {key}
                </h3>
                <ul className="space-y-2.5">
                  {links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-sm transition-colors"
                        style={{ color: "rgba(246,239,227,0.6)" }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = OCHRE)}
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.color = "rgba(246,239,227,0.6)")
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
          className="py-5 text-center"
          style={{ borderTop: `1px solid rgba(246,239,227,0.15)` }}
        >
          <Link
            href="/explore"
            className="text-xs"
            style={{ color: "rgba(246,239,227,0.4)", fontFamily: mono }}
          >
            ← Back to all iterations
          </Link>
        </div>
      </footer>
    </div>
  );
}
