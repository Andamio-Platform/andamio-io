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
 * Iteration 09 — "Neon Protocol".
 *
 * Tasteful cyber-Cardano. Near-black canvas with a faint perspective dot-grid
 * field, electric accents (Cardano blue + cyan, restrained magenta) used as
 * GLOW rather than fill. Space Grotesk display against JetBrains Mono data
 * readouts. Gradient text on the hero accent word, glowing hairline borders on
 * cards, numbered [01] section indexes. Disciplined neon — no kitsch.
 *
 * Self-contained palette: sets its own background + text, never touches the
 * app's global CSS variables.
 */

const INK = "#050507";
const SURFACE = "#0B0B10";
const ELEVATED = "#101018";
const TEXT = "#F4F5FA";
const MUTED = "#7A7C8C";
const BLUE = "#2E73E8";
const CYAN = "#22D3EE";
const MAGENTA = "#D946EF";

const display = "'Space_Grotesk', system-ui, sans-serif";
const mono = "'JetBrains_Mono', ui-monospace, monospace";

// Faint perspective dot-grid + a single hero glow, painted once as the page bg.
const fieldBackground = [
  `radial-gradient(circle at 50% -10%, rgba(46,115,232,0.18), transparent 55%)`,
  `radial-gradient(circle at 85% 8%, rgba(34,211,238,0.10), transparent 45%)`,
  `radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)`,
  INK,
].join(", ");

function Idx({ n }: { n: string }) {
  return (
    <span
      className="text-[12px]"
      style={{ fontFamily: mono, color: CYAN, letterSpacing: "0.1em" }}
    >
      [{n}]
    </span>
  );
}

export default function Explore09() {
  return (
    <div
      className="min-h-screen antialiased"
      style={{
        background: fieldBackground,
        backgroundSize: "auto, auto, 26px 26px, auto",
        backgroundAttachment: "fixed",
        color: TEXT,
        fontFamily: display,
      }}
    >
      <Head>
        <title>09 · Neon Protocol — Andamio</title>
      </Head>

      {/* ── Nav ─────────────────────────────────────────────── */}
      <header
        className="sticky top-0 z-50 border-b backdrop-blur-md"
        style={{
          borderColor: "rgba(255,255,255,0.07)",
          background: "rgba(5,5,7,0.72)",
        }}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <span className="flex items-center gap-2.5 text-lg font-bold tracking-tight">
            <span
              className="inline-block h-2 w-2 rounded-full"
              style={{ background: CYAN, boxShadow: `0 0 10px ${CYAN}` }}
            />
            {nav.brand}
          </span>
          <nav className="hidden items-center gap-7 lg:flex">
            {nav.items.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-[13px] transition-colors duration-200"
                style={{ color: MUTED, fontFamily: mono }}
                onMouseEnter={(e) => (e.currentTarget.style.color = CYAN)}
                onMouseLeave={(e) => (e.currentTarget.style.color = MUTED)}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <a
            href={nav.cta.href}
            className="rounded-md border px-4 py-2 text-[13px] font-semibold transition-all duration-200"
            style={{
              borderColor: "rgba(46,115,232,0.5)",
              color: TEXT,
              boxShadow: `0 0 0 rgba(46,115,232,0)`,
              fontFamily: mono,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = `0 0 22px rgba(46,115,232,0.45)`;
              e.currentTarget.style.borderColor = BLUE;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = `0 0 0 rgba(46,115,232,0)`;
              e.currentTarget.style.borderColor = "rgba(46,115,232,0.5)";
            }}
          >
            {nav.cta.label}
          </a>
        </div>
      </header>

      {/* ── Hero ────────────────────────────────────────────── */}
      <section className="relative mx-auto max-w-6xl px-6 pt-24 pb-28 sm:pt-32">
        <div className="grid items-center gap-16 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p
              className="mb-8 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] uppercase"
              style={{
                borderColor: "rgba(34,211,238,0.3)",
                color: CYAN,
                fontFamily: mono,
                letterSpacing: "0.18em",
              }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: CYAN, boxShadow: `0 0 8px ${CYAN}` }}
              />
              Live on Cardano mainnet
            </p>
            <h1
              className="text-[clamp(2.75rem,7vw,5.5rem)] font-bold leading-[0.98]"
              style={{ letterSpacing: "-0.03em" }}
            >
              {hero.headlineLead}{" "}
              <span
                style={{
                  background: `linear-gradient(105deg, ${BLUE}, ${CYAN} 55%, ${MAGENTA})`,
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  textShadow: `0 0 40px rgba(34,211,238,0.35)`,
                }}
              >
                {hero.headlineAccent}
              </span>
            </h1>

            <p
              className="mt-10 text-[12px] uppercase"
              style={{ color: MUTED, fontFamily: mono, letterSpacing: "0.22em" }}
            >
              {hero.ctaEyebrow}
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href={hero.primaryCta.href}
                className="rounded-md px-6 py-3 text-[14px] font-semibold transition-all duration-200"
                style={{
                  background: BLUE,
                  color: "#fff",
                  boxShadow: `0 0 24px rgba(46,115,232,0.5)`,
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.boxShadow = `0 0 38px rgba(46,115,232,0.8)`)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.boxShadow = `0 0 24px rgba(46,115,232,0.5)`)
                }
              >
                {hero.primaryCta.label}
              </a>
              <a
                href={hero.secondaryCta.href}
                className="rounded-md border px-6 py-3 text-[14px] font-semibold transition-all duration-200"
                style={{ borderColor: "rgba(255,255,255,0.15)", color: TEXT }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = CYAN;
                  e.currentTarget.style.boxShadow = `0 0 22px rgba(34,211,238,0.35)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {hero.secondaryCta.label}
              </a>
            </div>
          </div>

          <figure className="relative mx-auto w-full max-w-sm">
            <div
              className="pointer-events-none absolute inset-0 -z-10 rounded-full blur-3xl"
              style={{
                background: `radial-gradient(circle, rgba(46,115,232,0.35), transparent 70%)`,
              }}
            />
            <div
              className="rounded-2xl border p-6"
              style={{
                borderColor: "rgba(34,211,238,0.22)",
                background: "rgba(11,11,16,0.55)",
                boxShadow: `0 0 50px -12px rgba(34,211,238,0.4)`,
              }}
            >
              <img
                src={CREDENTIAL_BADGE_SRC}
                alt={hero.badgeAlt}
                width={420}
                height={420}
                className="mx-auto w-full"
              />
            </div>
            <figcaption
              className="mt-4 text-center text-[12px] leading-relaxed"
              style={{ color: MUTED, fontFamily: mono }}
            >
              {hero.badgeCaption}
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ── Problem ─────────────────────────────────────────── */}
      <section className="border-t" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="flex items-center gap-3">
            <Idx n="01" />
            <p
              className="text-[12px] uppercase"
              style={{ color: MUTED, fontFamily: mono, letterSpacing: "0.2em" }}
            >
              {problem.kicker}
            </p>
          </div>
          <h2
            className="mt-6 max-w-3xl text-4xl font-bold leading-[1.02] sm:text-6xl"
            style={{ letterSpacing: "-0.025em" }}
          >
            {problem.heading}
          </h2>
          <p className="mt-6 max-w-2xl text-xl leading-relaxed" style={{ color: MUTED }}>
            {problem.intro}
          </p>

          <div className="mt-16 grid gap-5 lg:grid-cols-3">
            {problem.items.map((p, i) => (
              <div
                key={p.headline}
                className="group rounded-xl border p-7 transition-all duration-300"
                style={{ borderColor: "rgba(255,255,255,0.09)", background: SURFACE }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(46,115,232,0.5)";
                  e.currentTarget.style.boxShadow = `0 0 30px -8px rgba(46,115,232,0.5)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <span
                  className="text-[13px]"
                  style={{ fontFamily: mono, color: CYAN }}
                >
                  0{i + 1} / 03
                </span>
                <h3 className="mt-5 text-xl font-semibold leading-snug">
                  {p.headline}
                </h3>
                <p className="mt-3 text-[14px] leading-relaxed" style={{ color: MUTED }}>
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Demo (framed specimen) ──────────────────────────── */}
      <section
        id="how-it-works"
        className="border-t"
        style={{ borderColor: "rgba(255,255,255,0.07)", background: SURFACE }}
      >
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div
            className="overflow-hidden rounded-2xl border"
            style={{
              borderColor: "rgba(34,211,238,0.28)",
              background: ELEVATED,
              boxShadow: `0 0 60px -24px rgba(34,211,238,0.55)`,
            }}
          >
            {/* console chrome bar */}
            <div
              className="flex items-center justify-between border-b px-6 py-3"
              style={{ borderColor: "rgba(255,255,255,0.08)" }}
            >
              <div className="flex items-center gap-3">
                <Idx n="02" />
                <span
                  className="text-[12px] uppercase"
                  style={{ color: MUTED, fontFamily: mono, letterSpacing: "0.2em" }}
                >
                  {demo.kicker}
                </span>
              </div>
              <span
                className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] uppercase"
                style={{
                  borderColor: "rgba(217,70,239,0.45)",
                  color: MAGENTA,
                  fontFamily: mono,
                  letterSpacing: "0.15em",
                }}
              >
                <span
                  className="h-1.5 w-1.5 animate-pulse rounded-full"
                  style={{ background: MAGENTA, boxShadow: `0 0 8px ${MAGENTA}` }}
                />
                {demo.liveLabel}
              </span>
            </div>

            <div className="grid items-center gap-10 p-8 lg:grid-cols-[1fr_1fr] sm:p-12">
              <div>
                <h2
                  className="text-3xl font-bold leading-tight sm:text-4xl"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  {demo.title}
                </h2>
                <p className="mt-5 text-[15px] leading-relaxed" style={{ color: MUTED }}>
                  {demo.note}
                </p>
                {/* mock readout to make the specimen feel live */}
                <div
                  className="mt-7 rounded-lg border p-4 text-[12px] leading-relaxed"
                  style={{
                    borderColor: "rgba(255,255,255,0.1)",
                    background: INK,
                    fontFamily: mono,
                  }}
                >
                  <span style={{ color: MUTED }}>policy_id </span>
                  <span style={{ color: CYAN }}>0x8f3a…c204</span>
                  <br />
                  <span style={{ color: MUTED }}>asset </span>
                  <span style={{ color: BLUE }}>GettingStartedWithAndamio</span>
                  <br />
                  <span style={{ color: MUTED }}>status </span>
                  <span style={{ color: "#34D399" }}>verified ✓</span>
                </div>
                <a
                  href="#issuer"
                  className="mt-6 inline-block text-[14px] font-semibold transition-colors"
                  style={{ color: CYAN }}
                >
                  {demo.inspirationCta} →
                </a>
              </div>
              <div className="relative">
                <div
                  className="pointer-events-none absolute inset-0 -z-10 rounded-full blur-3xl"
                  style={{
                    background: `radial-gradient(circle, rgba(34,211,238,0.3), transparent 70%)`,
                  }}
                />
                <img
                  src={CREDENTIAL_BADGE_SRC}
                  alt={hero.badgeAlt}
                  width={380}
                  height={380}
                  className="mx-auto w-full max-w-xs"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Issuer ──────────────────────────────────────────── */}
      <section id="issuer" className="border-t" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="flex items-center gap-3">
            <Idx n="03" />
            <p
              className="text-[12px] uppercase"
              style={{ color: MUTED, fontFamily: mono, letterSpacing: "0.2em" }}
            >
              {issuer.productLabel}
            </p>
          </div>

          <div className="mt-6 grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <h2
              className="text-6xl font-bold leading-[0.92] sm:text-7xl"
              style={{
                letterSpacing: "-0.03em",
                background: `linear-gradient(180deg, ${TEXT}, ${BLUE})`,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {issuer.title}
            </h2>
            <p className="max-w-xl text-lg leading-relaxed" style={{ color: MUTED }}>
              {issuer.intro}
            </p>
          </div>

          <p className="mt-16 text-2xl font-semibold sm:text-3xl">
            {issuer.decisionsHeading}
          </p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {issuer.decisions.map((d, i) => (
              <div
                key={d.title}
                className="rounded-xl border p-6 transition-all duration-300"
                style={{ borderColor: "rgba(255,255,255,0.09)", background: SURFACE }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(34,211,238,0.5)";
                  e.currentTarget.style.boxShadow = `0 0 28px -10px rgba(34,211,238,0.55)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <span className="text-[13px]" style={{ fontFamily: mono, color: CYAN }}>
                  0{i + 1}
                </span>
                <h3 className="mt-3 text-lg font-semibold leading-snug">{d.title}</h3>
                <p className="mt-2 text-[13.5px] leading-relaxed" style={{ color: MUTED }}>
                  {d.body}
                </p>
              </div>
            ))}
          </div>

          <div
            className="mt-14 flex flex-wrap items-center gap-3 border-t pt-8"
            style={{ borderColor: "rgba(255,255,255,0.08)" }}
          >
            <span
              className="cursor-not-allowed rounded-md border px-6 py-3 text-[14px] font-semibold"
              style={{
                borderColor: "rgba(255,255,255,0.1)",
                color: "rgba(244,245,250,0.35)",
                fontFamily: mono,
              }}
            >
              {issuer.reportCta}
            </span>
            <a
              href={EXTERNAL_LINKS.walkthroughMailto}
              className="rounded-md px-6 py-3 text-[14px] font-semibold transition-all duration-200"
              style={{ background: BLUE, color: "#fff", boxShadow: `0 0 24px rgba(46,115,232,0.5)` }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.boxShadow = `0 0 38px rgba(46,115,232,0.8)`)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.boxShadow = `0 0 24px rgba(46,115,232,0.5)`)
              }
            >
              {issuer.walkthroughCta}
            </a>
          </div>
        </div>
      </section>

      {/* ── Ecosystem ───────────────────────────────────────── */}
      <section
        className="border-t"
        style={{ borderColor: "rgba(255,255,255,0.07)", background: SURFACE }}
      >
        <div className="mx-auto max-w-4xl px-6 py-24">
          <div className="flex items-center gap-3">
            <Idx n="04" />
            <p
              className="text-[12px] uppercase"
              style={{ color: MUTED, fontFamily: mono, letterSpacing: "0.2em" }}
            >
              {ecosystem.kicker}
            </p>
          </div>
          <p
            className="mt-6 max-w-2xl text-3xl font-semibold leading-[1.2] sm:text-4xl"
            style={{ letterSpacing: "-0.015em" }}
          >
            {ecosystem.lead}
          </p>
          <div
            className="mt-12 grid gap-6 border-t pt-10 sm:grid-cols-2"
            style={{ borderColor: "rgba(255,255,255,0.1)" }}
          >
            {ecosystem.items.map((it) => (
              <div
                key={it.title}
                className="rounded-xl border p-6"
                style={{ borderColor: "rgba(255,255,255,0.09)", background: ELEVATED }}
              >
                <p
                  className="text-[15px] font-bold"
                  style={{ color: CYAN, fontFamily: mono }}
                >
                  {it.title}
                </p>
                <p className="mt-3 text-[14px] leading-relaxed" style={{ color: MUTED }}>
                  {it.body}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-xs" style={{ color: MUTED, fontFamily: mono }}>
            {ecosystem.footnote}
          </p>
        </div>
      </section>

      {/* ── API / Architecture ──────────────────────────────── */}
      <section
        id="andamio-api"
        className="border-t"
        style={{ borderColor: "rgba(255,255,255,0.07)" }}
      >
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="flex items-center gap-3">
            <Idx n="05" />
            <p
              className="text-[12px] uppercase"
              style={{ color: MUTED, fontFamily: mono, letterSpacing: "0.2em" }}
            >
              {api.zoneLabel}
            </p>
          </div>
          <h2
            className="mt-6 text-6xl font-bold leading-[0.92] sm:text-7xl"
            style={{
              letterSpacing: "-0.03em",
              background: `linear-gradient(105deg, ${CYAN}, ${BLUE})`,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: `0 0 50px rgba(34,211,238,0.25)`,
            }}
          >
            {api.zoneTitle}
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed" style={{ color: MUTED }}>
            {api.zoneBlurb}
          </p>

          <div className="mt-16 grid gap-14 lg:grid-cols-2 lg:items-center">
            <div>
              <p
                className="text-[12px] uppercase"
                style={{ color: CYAN, fontFamily: mono, letterSpacing: "0.2em" }}
              >
                {api.kicker}
              </p>
              <h3
                className="mt-4 text-4xl font-bold leading-tight sm:text-5xl"
                style={{ letterSpacing: "-0.025em" }}
              >
                {api.heading}
              </h3>
              <p className="mt-6 max-w-lg text-base leading-relaxed" style={{ color: MUTED }}>
                {api.body1}
              </p>
              <p className="mt-4 max-w-lg text-[14px] leading-relaxed" style={{ color: MUTED }}>
                {api.body2}
              </p>
              <a
                href={EXTERNAL_LINKS.apiReference}
                className="mt-7 inline-block text-[14px] font-semibold"
                style={{ color: CYAN, fontFamily: mono }}
              >
                {api.apiRefCta} →
              </a>
            </div>

            {/* Stack — node/edge schematic, accent layer glows distinctly */}
            <div className="flex flex-col gap-3">
              {api.stack.map((layer, i) => {
                const emph = layer.emphasis;
                return (
                  <div key={layer.name} className="relative">
                    <div
                      className="rounded-xl border px-6 py-5 transition-all duration-300"
                      style={
                        emph
                          ? {
                              borderColor: BLUE,
                              background: "rgba(46,115,232,0.08)",
                              boxShadow: `0 0 34px -8px rgba(46,115,232,0.7)`,
                            }
                          : {
                              borderColor: "rgba(255,255,255,0.1)",
                              background: SURFACE,
                            }
                      }
                    >
                      <p
                        className="text-[11px] uppercase"
                        style={{
                          color: emph ? CYAN : MUTED,
                          fontFamily: mono,
                          letterSpacing: "0.18em",
                        }}
                      >
                        {layer.labelKicker}
                      </p>
                      <p className="mt-1.5 text-lg font-semibold">{layer.name}</p>
                      <p
                        className="mt-2 text-[13.5px] leading-relaxed"
                        style={{ color: emph ? "rgba(244,245,250,0.85)" : MUTED }}
                      >
                        {layer.description}
                      </p>
                    </div>
                    {i < api.stack.length - 1 && (
                      <div
                        className="mx-auto h-3 w-px"
                        style={{ background: "rgba(34,211,238,0.4)" }}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── Closing ─────────────────────────────────────────── */}
      <section
        className="relative border-t"
        style={{ borderColor: "rgba(255,255,255,0.07)", background: SURFACE }}
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-0 -z-0 h-64"
          style={{
            background: `radial-gradient(ellipse 60% 100% at 50% 0%, rgba(46,115,232,0.22), transparent 70%)`,
          }}
        />
        <div className="relative mx-auto max-w-3xl px-6 py-28 text-center">
          <p
            className="text-[13px] font-semibold uppercase"
            style={{ color: CYAN, fontFamily: mono, letterSpacing: "0.18em" }}
          >
            {closing.eyebrow}
          </p>
          <h2
            className="mt-6 text-5xl font-bold leading-tight sm:text-6xl"
            style={{ letterSpacing: "-0.03em" }}
          >
            {closing.headlineLine1}
            <br />
            <span
              style={{
                background: `linear-gradient(105deg, ${BLUE}, ${CYAN} 60%, ${MAGENTA})`,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {closing.headlineLine2}
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed" style={{ color: MUTED }}>
            {closing.body}
          </p>
          <a
            href={EXTERNAL_LINKS.walkthroughMailto}
            className="mt-10 inline-block rounded-md px-7 py-3.5 text-[15px] font-semibold transition-all duration-200"
            style={{ background: BLUE, color: "#fff", boxShadow: `0 0 28px rgba(46,115,232,0.6)` }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.boxShadow = `0 0 44px rgba(46,115,232,0.9)`)
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.boxShadow = `0 0 28px rgba(46,115,232,0.6)`)
            }
          >
            {closing.cta}
          </a>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────── */}
      <footer style={{ background: INK }}>
        <div
          className="mx-auto flex max-w-6xl flex-col gap-10 border-t px-6 py-14 md:flex-row md:justify-between"
          style={{ borderColor: "rgba(255,255,255,0.08)" }}
        >
          <div className="max-w-xs">
            <span className="flex items-center gap-2.5 text-lg font-bold">
              <span
                className="inline-block h-2 w-2 rounded-full"
                style={{ background: CYAN, boxShadow: `0 0 10px ${CYAN}` }}
              />
              {nav.brand}
            </span>
            <p className="mt-4 text-sm leading-relaxed" style={{ color: MUTED }}>
              {footer.tagline}
            </p>
            <p className="mt-5 text-[12px]" style={{ color: CYAN, fontFamily: mono }}>
              {footer.meta}
            </p>
            <p className="mt-3 text-[12px]" style={{ color: MUTED, fontFamily: mono }}>
              {footer.copyright}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {Object.entries(footer.columns).map(([key, links]) => (
              <div key={key}>
                <h3
                  className="mb-4 text-[12px] font-semibold uppercase"
                  style={{ color: MUTED, fontFamily: mono, letterSpacing: "0.1em" }}
                >
                  {key}
                </h3>
                <ul className="space-y-2.5">
                  {links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-sm transition-colors duration-200"
                        style={{ color: "rgba(244,245,250,0.6)" }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = CYAN)}
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.color = "rgba(244,245,250,0.6)")
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
          className="border-t py-5 text-center"
          style={{ borderColor: "rgba(255,255,255,0.08)" }}
        >
          <Link
            href="/explore"
            className="text-xs transition-colors"
            style={{ color: MUTED, fontFamily: mono }}
          >
            ← Back to all iterations
          </Link>
        </div>
      </footer>
    </div>
  );
}
