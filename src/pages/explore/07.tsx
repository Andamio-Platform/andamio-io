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
 * Iteration 07 — "Credential Showcase".
 *
 * The credential SVG is the hero object — treated like a product shoot. A dark
 * studio spotlight presents the badge large, centered and glowing, annotated
 * with spec-callout leader lines like an exploded product diagram. The body
 * opens into a light museum-cream gallery that explains the object, and the
 * page closes back into the dark studio. Space Grotesk throughout; JetBrains
 * Mono for the technical / diagram furniture. Self-contained palette, every
 * word pulled verbatim from content.ts.
 */

// ── Palette (harmonised with the badge's own greens / gold / mint) ──────────
const STUDIO = "#0B120E"; // dark studio backdrop (deep green-black)
const STUDIO_2 = "#0E1A14"; // elevated dark surface
const CREAM = "#FAF5EA"; // museum-wall light
const CREAM_2 = "#F1E9D8"; // alt light band
const GREEN = "#244236"; // deep credential green (headings on light)
const INKGREEN = "#19231D"; // body text on light
const GOLD = "#E9B23C"; // primary accent (annotation / CTA)
const MINT = "#46D6A0"; // verified / live accent

const display = "'Space Grotesk', system-ui, sans-serif";
const mono = "'JetBrains Mono', ui-monospace, monospace";

// Faint exploded-diagram leader callout (dot + line + mono tick).
function Callout({
  side,
  top,
  tick,
}: {
  side: "left" | "right";
  top: string;
  tick: string;
}) {
  const isLeft = side === "left";
  return (
    <div
      className="absolute hidden items-center gap-3 lg:flex"
      style={{
        top,
        [isLeft ? "left" : "right"]: 0,
        flexDirection: isLeft ? "row" : "row-reverse",
      }}
    >
      <span
        className="text-[10px] uppercase tracking-[0.3em]"
        style={{ fontFamily: mono, color: "rgba(250,245,234,0.5)" }}
      >
        {tick}
      </span>
      <span
        className="block h-px w-16"
        style={{ background: `linear-gradient(${isLeft ? "90deg" : "270deg"}, transparent, ${GOLD})` }}
      />
      <span
        className="block h-1.5 w-1.5 rounded-full"
        style={{ background: MINT, boxShadow: `0 0 10px ${MINT}` }}
      />
    </div>
  );
}

export default function Explore07() {
  return (
    <div
      className="min-h-screen antialiased"
      style={{ background: STUDIO, color: CREAM, fontFamily: display }}
    >
      <Head>
        <title>07 · Credential Showcase — Andamio</title>
      </Head>

      {/* ── Nav ─────────────────────────────────────────────── */}
      <header
        className="sticky top-0 z-50 border-b backdrop-blur"
        style={{ borderColor: "rgba(250,245,234,0.08)", background: "rgba(11,18,14,0.82)" }}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#top" className="flex items-center gap-2.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={CREDENTIAL_BADGE_SRC} alt="" width={26} height={26} className="h-6 w-6" />
            <span className="text-lg font-semibold tracking-tight">{nav.brand}</span>
          </a>
          <nav className="hidden items-center gap-7 lg:flex">
            {nav.items.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm transition-colors"
                style={{ color: "rgba(250,245,234,0.6)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = CREAM)}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(250,245,234,0.6)")}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <a
            href={nav.cta.href}
            className="rounded-full px-4 py-2 text-sm font-semibold transition-transform hover:-translate-y-0.5"
            style={{ background: GOLD, color: STUDIO }}
          >
            {nav.cta.label}
          </a>
        </div>
      </header>

      {/* ── Hero — the studio spotlight ─────────────────────── */}
      <section id="top" className="relative overflow-hidden">
        {/* single spotlight glow */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 65% 55% at 50% 42%, rgba(233,178,60,0.16), transparent 62%), radial-gradient(ellipse 40% 30% at 50% 38%, rgba(70,214,160,0.10), transparent 60%)`,
          }}
        />
        {/* grain */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />

        <div className="relative mx-auto max-w-5xl px-6 pt-20 pb-24 text-center sm:pt-28">
          <p
            className="text-[11px] uppercase tracking-[0.4em]"
            style={{ fontFamily: mono, color: "rgba(250,245,234,0.45)" }}
          >
            Fig. 07 — Specimen
          </p>
          <h1 className="mx-auto mt-7 max-w-3xl text-[clamp(2.75rem,7vw,5.5rem)] font-semibold leading-[0.98] tracking-[-0.035em]">
            {hero.headlineLead}{" "}
            <span className="relative inline-block" style={{ color: GOLD }}>
              {hero.headlineAccent}
              <span
                className="absolute -bottom-1 left-0 h-[3px] w-full rounded"
                style={{ background: MINT }}
              />
            </span>
          </h1>

          {/* exploded-diagram badge plate */}
          <div className="relative mx-auto mt-16 max-w-3xl">
            <Callout side="left" top="16%" tick="01 · Rings" />
            <Callout side="left" top="64%" tick="03 · Source" />
            <Callout side="right" top="30%" tick="02 · On-chain" />
            <Callout side="right" top="72%" tick="Ø 1024 · SVG" />

            <div className="relative mx-auto w-full max-w-[360px]">
              <div
                className="pointer-events-none absolute inset-0 -z-0 rounded-full blur-3xl"
                style={{ background: "rgba(233,178,60,0.25)" }}
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={CREDENTIAL_BADGE_SRC}
                alt={hero.badgeAlt}
                width={512}
                height={512}
                className="relative w-full drop-shadow-[0_30px_60px_rgba(0,0,0,0.55)]"
              />
            </div>
          </div>

          <p
            className="mx-auto mt-10 max-w-md text-[13px] leading-relaxed"
            style={{ color: "rgba(250,245,234,0.55)", fontFamily: mono }}
          >
            {hero.badgeCaption}
          </p>

          <p
            className="mt-12 text-[11px] uppercase tracking-[0.35em]"
            style={{ color: "rgba(250,245,234,0.4)", fontFamily: mono }}
          >
            {hero.ctaEyebrow}
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <a
              href={hero.primaryCta.href}
              className="rounded-full px-6 py-3 text-[15px] font-semibold transition-transform hover:-translate-y-0.5"
              style={{ background: GOLD, color: STUDIO }}
            >
              {hero.primaryCta.label}
            </a>
            <a
              href={hero.secondaryCta.href}
              className="rounded-full border px-6 py-3 text-[15px] font-medium transition-colors"
              style={{ borderColor: "rgba(250,245,234,0.25)", color: CREAM }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = MINT)}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(250,245,234,0.25)")}
            >
              {hero.secondaryCta.label}
            </a>
          </div>
        </div>
      </section>

      {/* ── Problem — light gallery wall ────────────────────── */}
      <section className="relative overflow-hidden" style={{ background: CREAM, color: INKGREEN }}>
        {/* faint rotated badge motif */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={CREDENTIAL_BADGE_SRC}
          alt=""
          aria-hidden
          width={420}
          height={420}
          className="pointer-events-none absolute -right-24 -top-20 w-[420px] rotate-[18deg] opacity-[0.06]"
        />
        <div className="relative mx-auto max-w-6xl px-6 py-24 sm:py-28">
          <p className="text-[11px] uppercase tracking-[0.35em]" style={{ fontFamily: mono, color: GREEN }}>
            {problem.kicker}
          </p>
          <h2 className="mt-5 max-w-3xl text-4xl font-semibold leading-[1.04] tracking-[-0.025em] sm:text-6xl" style={{ color: GREEN }}>
            {problem.heading}
          </h2>
          <p className="mt-6 max-w-2xl text-xl leading-relaxed" style={{ color: "rgba(25,35,29,0.7)" }}>
            {problem.intro}
          </p>
          <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border lg:grid-cols-3" style={{ borderColor: "rgba(36,66,54,0.18)", background: "rgba(36,66,54,0.18)" }}>
            {problem.items.map((p, i) => (
              <div key={p.headline} className="p-8" style={{ background: CREAM }}>
                <span className="text-3xl font-semibold tabular-nums" style={{ fontFamily: mono, color: GOLD }}>
                  0{i + 1}
                </span>
                <h3 className="mt-5 text-2xl font-semibold leading-snug tracking-[-0.01em]" style={{ color: GREEN }}>
                  {p.headline}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed" style={{ color: "rgba(25,35,29,0.7)" }}>
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Demo — framed specimen plate (dark studio band) ──── */}
      <section id="how-it-works" style={{ background: CREAM_2, color: INKGREEN }}>
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div
            className="relative overflow-hidden rounded-3xl p-8 sm:p-12"
            style={{ background: STUDIO, color: CREAM }}
          >
            <div
              className="pointer-events-none absolute inset-0"
              style={{ background: "radial-gradient(ellipse 50% 60% at 78% 50%, rgba(233,178,60,0.16), transparent 60%)" }}
            />
            <div className="relative flex items-center gap-3">
              <span className="text-[11px] uppercase tracking-[0.35em]" style={{ fontFamily: mono, color: "rgba(250,245,234,0.5)" }}>
                {demo.kicker}
              </span>
              <span
                className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
                style={{ borderColor: "rgba(70,214,160,0.4)", color: MINT }}
              >
                <span className="h-1.5 w-1.5 animate-pulse rounded-full" style={{ background: MINT }} />
                {demo.liveLabel}
              </span>
            </div>

            <div className="relative mt-8 grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <h2 className="text-3xl font-semibold leading-tight tracking-[-0.02em] sm:text-4xl">
                  {demo.title}
                </h2>
                <p className="mt-5 max-w-md text-[15px] leading-relaxed" style={{ color: "rgba(250,245,234,0.7)" }}>
                  {demo.note}
                </p>
                <p className="mt-7 text-[15px] font-semibold transition-colors hover:opacity-80" style={{ color: GOLD }}>
                  {demo.inspirationCta} →
                </p>
              </div>

              {/* framed badge specimen */}
              <div className="relative mx-auto w-full max-w-xs">
                <div
                  className="rounded-2xl border p-6"
                  style={{ borderColor: "rgba(250,245,234,0.14)", background: STUDIO_2 }}
                >
                  <div
                    className="pointer-events-none absolute inset-0 -z-0 m-auto h-3/4 w-3/4 rounded-full blur-2xl"
                    style={{ background: "rgba(70,214,160,0.18)" }}
                  />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={CREDENTIAL_BADGE_SRC}
                    alt={hero.badgeAlt}
                    width={420}
                    height={420}
                    className="relative w-full"
                  />
                  <div
                    className="mt-4 flex items-center justify-between border-t pt-3 text-[10px] uppercase tracking-[0.2em]"
                    style={{ borderColor: "rgba(250,245,234,0.12)", fontFamily: mono, color: "rgba(250,245,234,0.45)" }}
                  >
                    <span>Specimen 07</span>
                    <span style={{ color: MINT }}>Verifiable</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Issuer — light editorial ────────────────────────── */}
      <section id="issuer" style={{ background: CREAM, color: INKGREEN }}>
        <div className="mx-auto max-w-6xl px-6 py-24 sm:py-28">
          <p className="text-[11px] uppercase tracking-[0.35em]" style={{ fontFamily: mono, color: GOLD }}>
            {issuer.productLabel}
          </p>
          <div className="mt-5 grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <h2 className="text-6xl font-semibold leading-[0.92] tracking-[-0.03em] sm:text-7xl" style={{ color: GREEN }}>
              {issuer.title}
            </h2>
            <p className="max-w-xl text-xl leading-relaxed" style={{ color: "rgba(25,35,29,0.72)" }}>
              {issuer.intro}
            </p>
          </div>

          <p className="mt-16 text-2xl font-semibold tracking-[-0.01em] sm:text-3xl" style={{ color: GREEN }}>
            {issuer.decisionsHeading}
          </p>
          <dl className="mt-10 grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {issuer.decisions.map((d, i) => (
              <div key={d.title} className="border-t-2 pt-6" style={{ borderColor: GREEN }}>
                <span className="text-lg font-semibold tabular-nums" style={{ fontFamily: mono, color: GOLD }}>
                  0{i + 1}
                </span>
                <dt className="mt-3 text-xl font-semibold leading-snug tracking-[-0.01em]" style={{ color: GREEN }}>
                  {d.title}
                </dt>
                <dd className="mt-2 text-[14px] leading-relaxed" style={{ color: "rgba(25,35,29,0.7)" }}>
                  {d.body}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-14 flex flex-wrap items-center gap-3 border-t pt-8" style={{ borderColor: "rgba(36,66,54,0.18)" }}>
            <span
              className="cursor-not-allowed rounded-full border px-6 py-3 text-[15px] font-medium"
              style={{ borderColor: "rgba(36,66,54,0.3)", color: "rgba(25,35,29,0.4)" }}
              aria-disabled="true"
            >
              {issuer.reportCta}
            </span>
            <a
              href={EXTERNAL_LINKS.walkthroughMailto}
              className="rounded-full px-6 py-3 text-[15px] font-semibold transition-transform hover:-translate-y-0.5"
              style={{ background: GREEN, color: CREAM }}
            >
              {issuer.walkthroughCta}
            </a>
          </div>
        </div>
      </section>

      {/* ── Ecosystem — light, alt band ─────────────────────── */}
      <section style={{ background: CREAM_2, color: INKGREEN }}>
        <div className="mx-auto max-w-4xl px-6 py-24">
          <p className="text-[11px] uppercase tracking-[0.35em]" style={{ fontFamily: mono, color: GREEN }}>
            {ecosystem.kicker}
          </p>
          <p className="mt-6 max-w-2xl text-3xl font-medium leading-[1.18] tracking-[-0.015em] sm:text-4xl" style={{ color: GREEN }}>
            {ecosystem.lead}
          </p>
          <div className="mt-12 grid gap-10 border-t pt-8 sm:grid-cols-2" style={{ borderColor: "rgba(36,66,54,0.2)" }}>
            {ecosystem.items.map((it) => (
              <div key={it.title}>
                <p className="flex items-center gap-2 text-[15px] font-semibold" style={{ color: GREEN }}>
                  <span className="h-2 w-2 rounded-full" style={{ background: MINT }} />
                  {it.title}
                </p>
                <p className="mt-2 text-[15px] leading-relaxed" style={{ color: "rgba(25,35,29,0.7)" }}>
                  {it.body}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-xs" style={{ color: "rgba(25,35,29,0.45)", fontFamily: mono }}>
            {ecosystem.footnote}
          </p>
        </div>
      </section>

      {/* ── API — dark protocol zone ────────────────────────── */}
      <section id="andamio-api" className="relative overflow-hidden" style={{ background: STUDIO, color: CREAM }}>
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(250,245,234,0.06) 1px, transparent 1px)",
            backgroundSize: "26px 26px",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-6 py-24 sm:py-28">
          <p className="text-[11px] uppercase tracking-[0.35em]" style={{ fontFamily: mono, color: GOLD }}>
            {api.zoneLabel}
          </p>
          <h2 className="mt-4 text-6xl font-semibold leading-[0.92] tracking-[-0.03em] sm:text-7xl">
            {api.zoneTitle}
          </h2>
          <p className="mt-6 max-w-2xl text-xl leading-relaxed" style={{ color: "rgba(250,245,234,0.68)" }}>
            {api.zoneBlurb}
          </p>

          <div className="mt-16 grid gap-16 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-[11px] uppercase tracking-[0.35em]" style={{ fontFamily: mono, color: "rgba(250,245,234,0.45)" }}>
                {api.kicker}
              </p>
              <h3 className="mt-4 text-4xl font-semibold leading-tight tracking-[-0.025em] sm:text-5xl">
                {api.heading}
              </h3>
              <p className="mt-6 max-w-lg text-lg leading-relaxed" style={{ color: "rgba(250,245,234,0.7)" }}>
                {api.body1}
              </p>
              <p className="mt-4 max-w-lg text-[15px] leading-relaxed" style={{ color: "rgba(250,245,234,0.55)" }}>
                {api.body2}
              </p>
              <a
                href={EXTERNAL_LINKS.apiReference}
                className="mt-7 inline-block text-sm font-semibold transition-colors hover:opacity-80"
                style={{ color: GOLD }}
              >
                {api.apiRefCta} →
              </a>
            </div>

            {/* stack — vertical plates, emphasis layer distinct */}
            <div className="space-y-3">
              {api.stack.map((layer) => (
                <div
                  key={layer.name}
                  className="rounded-2xl border px-6 py-5 transition-transform hover:-translate-y-0.5"
                  style={
                    layer.emphasis
                      ? {
                          borderColor: GOLD,
                          background: "rgba(233,178,60,0.08)",
                          boxShadow: `0 0 0 1px ${GOLD}, 0 20px 40px -28px rgba(233,178,60,0.6)`,
                        }
                      : { borderColor: "rgba(250,245,234,0.12)", background: STUDIO_2 }
                  }
                >
                  <div className="flex items-center justify-between">
                    <p
                      className="text-[11px] uppercase tracking-[0.25em]"
                      style={{ fontFamily: mono, color: layer.emphasis ? GOLD : "rgba(250,245,234,0.45)" }}
                    >
                      {layer.labelKicker}
                    </p>
                    {layer.emphasis && (
                      <span
                        className="rounded-full px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider"
                        style={{ background: GOLD, color: STUDIO }}
                      >
                        {demo.liveLabel}
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-xl font-semibold tracking-[-0.01em]">{layer.name}</p>
                  <p className="mt-2 text-[14px] leading-relaxed" style={{ color: "rgba(250,245,234,0.62)" }}>
                    {layer.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Closing — back into the studio ──────────────────── */}
      <section className="relative overflow-hidden" style={{ background: STUDIO_2, color: CREAM }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={CREDENTIAL_BADGE_SRC}
          alt=""
          aria-hidden
          width={620}
          height={620}
          className="pointer-events-none absolute left-1/2 top-1/2 w-[620px] -translate-x-1/2 -translate-y-1/2 rotate-[12deg] opacity-[0.07]"
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(233,178,60,0.14), transparent 65%)" }}
        />
        <div className="relative mx-auto max-w-3xl px-6 py-28 text-center">
          <p className="text-[11px] uppercase tracking-[0.35em]" style={{ fontFamily: mono, color: GOLD }}>
            {closing.eyebrow}
          </p>
          <h2 className="mt-6 text-5xl font-semibold leading-[1.02] tracking-[-0.03em] sm:text-6xl">
            {closing.headlineLine1}
            <br />
            <span style={{ color: GOLD }}>{closing.headlineLine2}</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed" style={{ color: "rgba(250,245,234,0.68)" }}>
            {closing.body}
          </p>
          <a
            href={EXTERNAL_LINKS.walkthroughMailto}
            className="mt-10 inline-block rounded-full px-7 py-3.5 text-[15px] font-semibold transition-transform hover:-translate-y-0.5"
            style={{ background: GOLD, color: STUDIO }}
          >
            {closing.cta}
          </a>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────── */}
      <footer style={{ background: STUDIO, color: "rgba(250,245,234,0.7)" }}>
        <div
          className="mx-auto flex max-w-6xl flex-col gap-10 border-t px-6 py-14 md:flex-row md:justify-between"
          style={{ borderColor: "rgba(250,245,234,0.1)" }}
        >
          <div className="max-w-xs">
            <div className="flex items-center gap-2.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={CREDENTIAL_BADGE_SRC} alt="" width={24} height={24} className="h-6 w-6" />
              <span className="text-lg font-semibold" style={{ color: CREAM }}>
                {nav.brand}
              </span>
            </div>
            <p className="mt-3 text-sm leading-relaxed" style={{ color: "rgba(250,245,234,0.55)" }}>
              {footer.tagline}
            </p>
            <p className="mt-5 text-[13px]" style={{ color: "rgba(250,245,234,0.4)", fontFamily: mono }}>
              {footer.meta}
            </p>
            <p className="mt-3 text-[13px]" style={{ color: "rgba(250,245,234,0.35)" }}>
              {footer.copyright}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {Object.entries(footer.columns).map(([key, links]) => (
              <div key={key}>
                <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: "rgba(250,245,234,0.8)", fontFamily: mono }}>
                  {key}
                </h3>
                <ul className="space-y-2.5">
                  {links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-sm transition-colors"
                        style={{ color: "rgba(250,245,234,0.55)" }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = MINT)}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(250,245,234,0.55)")}
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
        <div className="border-t py-5 text-center" style={{ borderColor: "rgba(250,245,234,0.1)" }}>
          <Link
            href="/explore"
            className="text-xs transition-colors"
            style={{ color: "rgba(250,245,234,0.4)" }}
          >
            ← Back to all iterations
          </Link>
        </div>
      </footer>
    </div>
  );
}
