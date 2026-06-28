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
 * Iteration 05 — "Midnight Premium".
 *
 * Quiet enterprise gravitas. A deep navy-to-black canvas, Sora display type,
 * refined slate body text, and a single cool-blue accent used at roughly a 20%
 * ratio. Permanence is signalled through calm: one soft radial glow behind the
 * hero credential, hairline translucent borders, and glassy elevated cards on
 * a sea of negative space. Apple-keynote-dark, premium-fintech restraint.
 *
 * Self-contained palette — sets its own background + text, never touches the
 * app's global CSS variables.
 */

const BG = "#060912"; // near-black base
const BG_NAVY = "#0B1020"; // deep navy lift
const SURFACE = "rgba(255,255,255,0.025)"; // glassy card fill
const HAIRLINE = "rgba(255,255,255,0.09)"; // thin border
const TEXT = "#EEF2FA"; // primary
const SLATE = "#A9B2C7"; // body
const MUTED = "#6B7488"; // tertiary
const ACCENT = "#5B8DEF"; // cool electric blue — the single accent

const display = "'Sora', system-ui, sans-serif";
const body = "'Inter', system-ui, sans-serif";
const mono = "'JetBrains Mono', ui-monospace, monospace";

export default function Explore05() {
  return (
    <div
      className="min-h-screen antialiased"
      style={{ background: BG, color: TEXT, fontFamily: body }}
    >
      <Head>
        <title>05 · Midnight Premium — Andamio</title>
      </Head>

      {/* ── Nav ─────────────────────────────────────────────── */}
      <header
        className="sticky top-0 z-50 backdrop-blur-xl"
        style={{
          borderBottom: `1px solid ${HAIRLINE}`,
          background: "rgba(6,9,18,0.72)",
        }}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <span
            className="text-lg font-semibold tracking-[-0.01em]"
            style={{ fontFamily: display }}
          >
            {nav.brand}
          </span>
          <nav className="hidden items-center gap-8 lg:flex">
            {nav.items.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-[13px] tracking-tight transition-colors"
                style={{ color: SLATE }}
                onMouseEnter={(e) => (e.currentTarget.style.color = TEXT)}
                onMouseLeave={(e) => (e.currentTarget.style.color = SLATE)}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <a
            href={nav.cta.href}
            className="rounded-full px-4 py-2 text-[13px] font-medium transition-all hover:-translate-y-px"
            style={{
              color: TEXT,
              border: `1px solid ${HAIRLINE}`,
              background: SURFACE,
            }}
          >
            {nav.cta.label}
          </a>
        </div>
      </header>

      {/* ── Hero ────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        {/* single radial glow — used only here */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 55% 50% at 72% 38%, rgba(91,141,239,0.18), transparent 70%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[1px]"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(91,141,239,0.4), transparent)",
          }}
        />
        <div className="relative mx-auto grid max-w-6xl items-center gap-16 px-6 pb-28 pt-24 sm:pt-32 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div
              className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.22em]"
              style={{
                color: SLATE,
                border: `1px solid ${HAIRLINE}`,
                background: SURFACE,
              }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: ACCENT }}
              />
              Live on Cardano mainnet
            </div>
            <h1
              className="mt-8 text-[clamp(2.75rem,6.4vw,5.25rem)] font-semibold leading-[0.98] tracking-[-0.035em]"
              style={{ fontFamily: display }}
            >
              {hero.headlineLead}{" "}
              <span style={{ color: ACCENT }}>{hero.headlineAccent}</span>
            </h1>
            <p
              className="mt-9 text-[11px] font-medium uppercase tracking-[0.28em]"
              style={{ color: MUTED }}
            >
              {hero.ctaEyebrow}
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href={hero.primaryCta.href}
                className="rounded-full px-6 py-3 text-[14px] font-medium transition-all hover:-translate-y-px"
                style={{
                  background: ACCENT,
                  color: "#08101F",
                  boxShadow: "0 12px 40px -12px rgba(91,141,239,0.6)",
                }}
              >
                {hero.primaryCta.label}
              </a>
              <a
                href={hero.secondaryCta.href}
                className="rounded-full px-6 py-3 text-[14px] font-medium transition-colors"
                style={{
                  color: TEXT,
                  border: `1px solid ${HAIRLINE}`,
                  background: SURFACE,
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.borderColor = "rgba(91,141,239,0.45)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.borderColor = HAIRLINE)
                }
              >
                {hero.secondaryCta.label}
              </a>
            </div>
          </div>

          <figure className="relative mx-auto w-full max-w-md">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 -z-10 blur-3xl"
              style={{
                background:
                  "radial-gradient(circle at 50% 45%, rgba(91,141,239,0.28), transparent 65%)",
              }}
            />
            <img
              src={CREDENTIAL_BADGE_SRC}
              alt={hero.badgeAlt}
              width={512}
              height={512}
              className="w-full drop-shadow-[0_30px_60px_rgba(0,0,0,0.55)]"
            />
            <figcaption
              className="mx-auto mt-6 max-w-sm text-center text-[13px] leading-relaxed"
              style={{ color: MUTED }}
            >
              {hero.badgeCaption}
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ── Problem ─────────────────────────────────────────── */}
      <section style={{ borderTop: `1px solid ${HAIRLINE}` }}>
        <div className="mx-auto max-w-6xl px-6 py-28">
          <p
            className="text-[11px] font-medium uppercase tracking-[0.28em]"
            style={{ color: ACCENT }}
          >
            {problem.kicker}
          </p>
          <h2
            className="mt-6 max-w-2xl text-4xl font-semibold leading-[1.04] tracking-[-0.03em] sm:text-5xl"
            style={{ fontFamily: display }}
          >
            {problem.heading}
          </h2>
          <p
            className="mt-6 max-w-2xl text-lg leading-relaxed"
            style={{ color: SLATE }}
          >
            {problem.intro}
          </p>
          <div className="mt-16 grid gap-6 lg:grid-cols-3">
            {problem.items.map((p, i) => (
              <div
                key={p.headline}
                className="rounded-2xl p-7 transition-colors"
                style={{
                  border: `1px solid ${HAIRLINE}`,
                  background: SURFACE,
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.borderColor = "rgba(91,141,239,0.3)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.borderColor = HAIRLINE)
                }
              >
                <span
                  className="text-[13px] tabular-nums tracking-[0.2em]"
                  style={{ fontFamily: mono, color: ACCENT }}
                >
                  [0{i + 1}]
                </span>
                <h3
                  className="mt-5 text-xl font-medium leading-snug tracking-[-0.01em]"
                  style={{ fontFamily: display }}
                >
                  {p.headline}
                </h3>
                <p
                  className="mt-3 text-[14px] leading-relaxed"
                  style={{ color: SLATE }}
                >
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
        style={{ borderTop: `1px solid ${HAIRLINE}`, background: BG_NAVY }}
      >
        <div className="mx-auto max-w-6xl px-6 py-28">
          <div
            className="overflow-hidden rounded-3xl"
            style={{
              border: `1px solid ${HAIRLINE}`,
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.012))",
              boxShadow: "0 40px 100px -50px rgba(0,0,0,0.8)",
            }}
          >
            <div
              className="flex items-center justify-between px-8 py-4"
              style={{ borderBottom: `1px solid ${HAIRLINE}` }}
            >
              <span
                className="text-[11px] uppercase tracking-[0.24em]"
                style={{ fontFamily: mono, color: MUTED }}
              >
                {demo.kicker}
              </span>
              <span
                className="inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em]"
                style={{
                  color: ACCENT,
                  border: `1px solid rgba(91,141,239,0.3)`,
                  background: "rgba(91,141,239,0.08)",
                }}
              >
                <span
                  className="h-1.5 w-1.5 animate-pulse rounded-full"
                  style={{ background: ACCENT }}
                />
                {demo.liveLabel}
              </span>
            </div>
            <div className="grid items-center gap-12 p-8 sm:p-12 lg:grid-cols-[1fr_0.85fr]">
              <div>
                <h2
                  className="text-3xl font-semibold leading-tight tracking-[-0.025em] sm:text-[2.4rem]"
                  style={{ fontFamily: display }}
                >
                  {demo.title}
                </h2>
                <p
                  className="mt-6 text-[15px] leading-relaxed"
                  style={{ color: SLATE }}
                >
                  {demo.note}
                </p>
                <p
                  className="mt-7 text-[14px] font-medium transition-opacity hover:opacity-80"
                  style={{ color: ACCENT }}
                >
                  {demo.inspirationCta} →
                </p>
              </div>
              <div className="relative">
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 -z-10 blur-2xl"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 50%, rgba(91,141,239,0.22), transparent 60%)",
                  }}
                />
                <img
                  src={CREDENTIAL_BADGE_SRC}
                  alt={hero.badgeAlt}
                  width={400}
                  height={400}
                  className="mx-auto w-full max-w-[18rem] drop-shadow-[0_24px_50px_rgba(0,0,0,0.5)]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Issuer ──────────────────────────────────────────── */}
      <section id="issuer" style={{ borderTop: `1px solid ${HAIRLINE}` }}>
        <div className="mx-auto max-w-6xl px-6 py-28">
          <p
            className="text-[11px] font-medium uppercase tracking-[0.28em]"
            style={{ fontFamily: mono, color: ACCENT }}
          >
            {issuer.productLabel}
          </p>
          <div className="mt-6 grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <h2
              className="text-5xl font-semibold leading-[0.95] tracking-[-0.035em] sm:text-7xl"
              style={{ fontFamily: display }}
            >
              {issuer.title}
            </h2>
            <p
              className="max-w-xl text-lg leading-relaxed"
              style={{ color: SLATE }}
            >
              {issuer.intro}
            </p>
          </div>

          <p
            className="mt-20 max-w-2xl text-2xl font-medium leading-snug tracking-[-0.02em] sm:text-3xl"
            style={{ fontFamily: display }}
          >
            {issuer.decisionsHeading}
          </p>
          <dl className="mt-12 grid gap-px overflow-hidden rounded-2xl sm:grid-cols-2 lg:grid-cols-3"
            style={{ border: `1px solid ${HAIRLINE}`, background: HAIRLINE }}
          >
            {issuer.decisions.map((d, i) => (
              <div
                key={d.title}
                className="p-7 transition-colors"
                style={{ background: BG }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "rgba(91,141,239,0.04)")
                }
                onMouseLeave={(e) => (e.currentTarget.style.background = BG)}
              >
                <span
                  className="text-[12px] tabular-nums tracking-[0.2em]"
                  style={{ fontFamily: mono, color: ACCENT }}
                >
                  0{i + 1}
                </span>
                <dt
                  className="mt-4 text-lg font-medium leading-snug tracking-[-0.01em]"
                  style={{ fontFamily: display }}
                >
                  {d.title}
                </dt>
                <dd
                  className="mt-3 text-[14px] leading-relaxed"
                  style={{ color: SLATE }}
                >
                  {d.body}
                </dd>
              </div>
            ))}
          </dl>

          <div
            className="mt-14 flex flex-wrap items-center gap-3 pt-10"
            style={{ borderTop: `1px solid ${HAIRLINE}` }}
          >
            <span
              className="cursor-not-allowed rounded-full px-6 py-3 text-[14px] font-medium"
              style={{
                color: MUTED,
                border: `1px solid ${HAIRLINE}`,
              }}
            >
              {issuer.reportCta}
            </span>
            <a
              href={EXTERNAL_LINKS.walkthroughMailto}
              className="rounded-full px-6 py-3 text-[14px] font-medium transition-all hover:-translate-y-px"
              style={{
                background: ACCENT,
                color: "#08101F",
                boxShadow: "0 12px 40px -14px rgba(91,141,239,0.6)",
              }}
            >
              {issuer.walkthroughCta}
            </a>
          </div>
        </div>
      </section>

      {/* ── Ecosystem ───────────────────────────────────────── */}
      <section
        style={{ borderTop: `1px solid ${HAIRLINE}`, background: BG_NAVY }}
      >
        <div className="mx-auto max-w-4xl px-6 py-28">
          <p
            className="text-[11px] font-medium uppercase tracking-[0.28em]"
            style={{ color: ACCENT }}
          >
            {ecosystem.kicker}
          </p>
          <p
            className="mt-7 max-w-2xl text-2xl font-medium leading-[1.25] tracking-[-0.02em] sm:text-3xl"
            style={{ fontFamily: display, color: TEXT }}
          >
            {ecosystem.lead}
          </p>
          <div
            className="mt-14 grid gap-10 pt-10 sm:grid-cols-2"
            style={{ borderTop: `1px solid ${HAIRLINE}` }}
          >
            {ecosystem.items.map((it) => (
              <div key={it.title}>
                <p
                  className="text-[15px] font-semibold tracking-tight"
                  style={{ fontFamily: display }}
                >
                  {it.title}
                </p>
                <p
                  className="mt-3 text-[14px] leading-relaxed"
                  style={{ color: SLATE }}
                >
                  {it.body}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-10 text-[12px]" style={{ color: MUTED }}>
            {ecosystem.footnote}
          </p>
        </div>
      </section>

      {/* ── API / Architecture ──────────────────────────────── */}
      <section
        id="andamio-api"
        style={{ borderTop: `1px solid ${HAIRLINE}` }}
      >
        <div className="mx-auto max-w-6xl px-6 py-28">
          <p
            className="text-[11px] font-medium uppercase tracking-[0.28em]"
            style={{ fontFamily: mono, color: ACCENT }}
          >
            {api.zoneLabel}
          </p>
          <h2
            className="mt-6 text-5xl font-semibold leading-[0.95] tracking-[-0.035em] sm:text-7xl"
            style={{ fontFamily: display }}
          >
            {api.zoneTitle}
          </h2>
          <p
            className="mt-6 max-w-2xl text-lg leading-relaxed"
            style={{ color: SLATE }}
          >
            {api.zoneBlurb}
          </p>

          <div className="mt-20 grid gap-16 lg:grid-cols-2 lg:items-start">
            <div>
              <p
                className="text-[11px] font-medium uppercase tracking-[0.28em]"
                style={{ color: MUTED }}
              >
                {api.kicker}
              </p>
              <h3
                className="mt-5 text-3xl font-semibold leading-tight tracking-[-0.03em] sm:text-4xl"
                style={{ fontFamily: display }}
              >
                {api.heading}
              </h3>
              <p
                className="mt-6 max-w-lg text-[15px] leading-relaxed"
                style={{ color: SLATE }}
              >
                {api.body1}
              </p>
              <p
                className="mt-4 max-w-lg text-[14px] leading-relaxed"
                style={{ color: MUTED }}
              >
                {api.body2}
              </p>
              <a
                href={EXTERNAL_LINKS.apiReference}
                className="mt-8 inline-block text-[14px] font-medium transition-opacity hover:opacity-80"
                style={{ color: ACCENT }}
              >
                {api.apiRefCta} →
              </a>
            </div>

            <div className="space-y-3">
              {api.stack.map((layer, i) => (
                <div
                  key={layer.name}
                  className="rounded-2xl p-6 transition-colors"
                  style={
                    layer.emphasis
                      ? {
                          border: `1px solid rgba(91,141,239,0.45)`,
                          background:
                            "linear-gradient(180deg, rgba(91,141,239,0.14), rgba(91,141,239,0.04))",
                          boxShadow:
                            "0 20px 60px -30px rgba(91,141,239,0.55)",
                        }
                      : {
                          border: `1px solid ${HAIRLINE}`,
                          background: SURFACE,
                        }
                  }
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="text-[11px] tabular-nums tracking-[0.2em]"
                      style={{ fontFamily: mono, color: MUTED }}
                    >
                      L{i + 1}
                    </span>
                    <span
                      className="text-[11px] font-medium uppercase tracking-[0.2em]"
                      style={{
                        fontFamily: mono,
                        color: layer.emphasis ? ACCENT : MUTED,
                      }}
                    >
                      {layer.labelKicker}
                    </span>
                  </div>
                  <p
                    className="mt-3 text-lg font-medium tracking-[-0.01em]"
                    style={{ fontFamily: display }}
                  >
                    {layer.name}
                  </p>
                  <p
                    className="mt-2 text-[14px] leading-relaxed"
                    style={{ color: layer.emphasis ? "#C7D4F0" : SLATE }}
                  >
                    {layer.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Closing ─────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{ borderTop: `1px solid ${HAIRLINE}`, background: BG_NAVY }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 50% 60% at 50% 0%, rgba(91,141,239,0.16), transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-3xl px-6 py-32 text-center">
          <p
            className="text-[11px] font-medium uppercase tracking-[0.28em]"
            style={{ color: ACCENT }}
          >
            {closing.eyebrow}
          </p>
          <h2
            className="mt-7 text-4xl font-semibold leading-[1.05] tracking-[-0.035em] sm:text-6xl"
            style={{ fontFamily: display }}
          >
            {closing.headlineLine1}
            <br />
            <span style={{ color: SLATE }}>{closing.headlineLine2}</span>
          </h2>
          <p
            className="mx-auto mt-7 max-w-xl text-[16px] leading-relaxed"
            style={{ color: SLATE }}
          >
            {closing.body}
          </p>
          <a
            href={EXTERNAL_LINKS.walkthroughMailto}
            className="mt-10 inline-block rounded-full px-8 py-4 text-[15px] font-medium transition-all hover:-translate-y-px"
            style={{
              background: ACCENT,
              color: "#08101F",
              boxShadow: "0 16px 50px -16px rgba(91,141,239,0.65)",
            }}
          >
            {closing.cta}
          </a>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────── */}
      <footer style={{ borderTop: `1px solid ${HAIRLINE}`, background: BG }}>
        <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 py-16 md:flex-row md:justify-between">
          <div className="max-w-xs">
            <span
              className="text-lg font-semibold tracking-[-0.01em]"
              style={{ fontFamily: display }}
            >
              {nav.brand}
            </span>
            <p
              className="mt-4 text-[14px] leading-relaxed"
              style={{ color: SLATE }}
            >
              {footer.tagline}
            </p>
            <p
              className="mt-6 text-[12px] tracking-tight"
              style={{ fontFamily: mono, color: MUTED }}
            >
              {footer.meta}
            </p>
            <p className="mt-3 text-[12px]" style={{ color: MUTED }}>
              {footer.copyright}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {Object.entries(footer.columns).map(([key, links]) => (
              <div key={key}>
                <h3
                  className="mb-4 text-[12px] font-semibold uppercase tracking-[0.16em]"
                  style={{ color: TEXT }}
                >
                  {key}
                </h3>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-[13px] transition-colors"
                        style={{ color: SLATE }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.color = TEXT)
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.color = SLATE)
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
          className="py-6 text-center"
          style={{ borderTop: `1px solid ${HAIRLINE}` }}
        >
          <Link
            href="/explore"
            className="text-[12px] transition-colors"
            style={{ color: MUTED }}
          >
            ← Back to all iterations
          </Link>
        </div>
      </footer>
    </div>
  );
}
