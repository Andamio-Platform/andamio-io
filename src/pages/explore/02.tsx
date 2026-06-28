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
 * Iteration 02 — "Terminal Protocol".
 *
 * A developer-console reading of the page. Near-black canvas, off-white text,
 * hairline borders, JetBrains Mono as the primary face against a tight sans for
 * prose. One accent — Andamio orange. Command-line motifs throughout: `$`
 * prompts, box-drawing rules, numbered [NN] section indexes, tabular readouts,
 * and a blinking cursor on the hero accent word. Treated like a precise
 * instrument: dense, exact, monospaced numerals — no gradients, no blobs.
 */

const BG = "#0A0A0B";
const SURFACE = "#0F0F11";
const LINE = "#1E1E20";
const LINE_SOFT = "#161618";
const TEXT = "#E8E8E5";
const MUTED = "#71717A";
const FAINT = "#48484E";
const AMBER = "#FF6B35";

const mono = "'JetBrains Mono', ui-monospace, 'SFMono-Regular', monospace";
const sans = "'Inter', system-ui, sans-serif";

/** small uppercase mono label */
function Tag({
  children,
  className = "",
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <span
      className={`text-[11px] uppercase tracking-[0.22em] ${className}`}
      style={{ fontFamily: mono, ...style }}
    >
      {children}
    </span>
  );
}

export default function Explore02() {
  return (
    <div
      className="min-h-screen antialiased"
      style={{ background: BG, color: TEXT, fontFamily: sans }}
    >
      <Head>
        <title>02 · Terminal Protocol — Andamio</title>
      </Head>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes tp-blink { 0%, 49% { opacity: 1 } 50%, 100% { opacity: 0 } }
        .tp-cursor { display:inline-block; animation: tp-blink 1.05s step-end infinite; }
        .tp-rule { background-image: repeating-linear-gradient(90deg, ${LINE} 0 8px, transparent 8px 14px); }
        .tp-link { position: relative; }
        .tp-link::after { content:""; position:absolute; left:0; right:100%; bottom:-2px; height:1px; background:${AMBER}; transition: right .25s ease; }
        .tp-link:hover::after { right:0; }
      `,
        }}
      />

      {/* ── Nav ─────────────────────────────────────────────── */}
      <header
        className="sticky top-0 z-50 backdrop-blur"
        style={{ background: "rgba(10,10,11,0.82)", borderBottom: `1px solid ${LINE}` }}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
          <span className="flex items-baseline gap-1.5" style={{ fontFamily: mono }}>
            <span style={{ color: AMBER }}>$</span>
            <span className="text-[15px] font-semibold tracking-tight">{nav.brand}</span>
          </span>
          <nav className="hidden items-center gap-6 md:flex">
            {nav.items.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="tp-link text-[12px] tracking-wide transition-colors"
                style={{ fontFamily: mono, color: MUTED }}
                onMouseEnter={(e) => (e.currentTarget.style.color = TEXT)}
                onMouseLeave={(e) => (e.currentTarget.style.color = MUTED)}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <a
            href={nav.cta.href}
            className="text-[12px] font-medium transition-colors"
            style={{
              fontFamily: mono,
              color: AMBER,
              border: `1px solid ${AMBER}`,
              padding: "7px 14px",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = AMBER;
              e.currentTarget.style.color = BG;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = AMBER;
            }}
          >
            {nav.cta.label} ↗
          </a>
        </div>
      </header>

      {/* ── Hero ────────────────────────────────────────────── */}
      <section className="relative">
        <div className="mx-auto max-w-6xl px-6 pt-16 pb-20 sm:pt-24">
          <Tag style={{ color: FAINT }} className="block">
            <span style={{ color: AMBER }}>andamio</span>@protocol:~$ cat ./manifest
          </Tag>

          <div className="mt-12 grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <h1
                className="text-[clamp(2.5rem,6.4vw,5rem)] font-medium leading-[1.04] tracking-[-0.03em]"
                style={{ fontFamily: mono }}
              >
                {hero.headlineLead}{" "}
                <span style={{ color: AMBER }}>
                  {hero.headlineAccent}
                  <span className="tp-cursor" style={{ color: AMBER }}>
                    _
                  </span>
                </span>
              </h1>

              <div className="mt-10 flex flex-col gap-px" style={{ background: LINE }}>
                <div className="flex flex-wrap items-stretch gap-px">
                  <a
                    href={hero.primaryCta.href}
                    className="group flex items-center gap-2 px-5 py-3 text-[13px] font-medium transition-colors"
                    style={{ fontFamily: mono, background: AMBER, color: BG }}
                  >
                    <span>→</span> {hero.primaryCta.label}
                  </a>
                  <a
                    href={hero.secondaryCta.href}
                    className="flex items-center gap-2 px-5 py-3 text-[13px] font-medium transition-colors"
                    style={{ fontFamily: mono, background: SURFACE, color: TEXT }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = AMBER)}
                    onMouseLeave={(e) => (e.currentTarget.style.color = TEXT)}
                  >
                    <span style={{ color: MUTED }}>→</span> {hero.secondaryCta.label}
                  </a>
                </div>
              </div>
              <p className="mt-4" style={{ fontFamily: mono }}>
                <Tag style={{ color: FAINT }}>{"// "}{hero.ctaEyebrow}</Tag>
              </p>
            </div>

            {/* framed badge specimen */}
            <figure
              className="relative"
              style={{ border: `1px solid ${LINE}`, background: SURFACE }}
            >
              <figcaption
                className="flex items-center justify-between px-4 py-2"
                style={{ borderBottom: `1px solid ${LINE}` }}
              >
                <Tag style={{ color: MUTED }}>credential.svg</Tag>
                <span className="flex gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: FAINT }} />
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: FAINT }} />
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: AMBER }} />
                </span>
              </figcaption>
              <div className="p-8">
                <img
                  src={CREDENTIAL_BADGE_SRC}
                  alt={hero.badgeAlt}
                  width={420}
                  height={420}
                  className="mx-auto w-full max-w-[280px]"
                />
              </div>
              <figcaption
                className="px-4 py-3 text-[12px] leading-relaxed"
                style={{ borderTop: `1px solid ${LINE}`, color: MUTED, fontFamily: mono }}
              >
                <span style={{ color: AMBER }}>#</span> {hero.badgeCaption}
              </figcaption>
            </figure>
          </div>
        </div>
        <div className="mx-auto max-w-6xl px-6">
          <div className="tp-rule h-px w-full" />
        </div>
      </section>

      {/* ── Problem ─────────────────────────────────────────── */}
      <section style={{ borderBottom: `1px solid ${LINE}` }}>
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="flex items-center gap-3">
            <Tag style={{ color: AMBER }}>[01]</Tag>
            <Tag style={{ color: MUTED }}>{problem.kicker}</Tag>
          </div>
          <h2
            className="mt-6 max-w-3xl text-3xl font-medium leading-[1.1] tracking-[-0.02em] sm:text-5xl"
            style={{ fontFamily: mono }}
          >
            {problem.heading}
          </h2>
          <p
            className="mt-6 max-w-2xl text-lg leading-relaxed"
            style={{ color: MUTED }}
          >
            {problem.intro}
          </p>

          <div className="mt-16" style={{ borderTop: `1px solid ${LINE}` }}>
            {problem.items.map((p, i) => (
              <div
                key={p.headline}
                className="grid gap-4 py-8 md:grid-cols-[auto_1fr_2fr]"
                style={{ borderBottom: `1px solid ${LINE}` }}
              >
                <span
                  className="text-2xl tabular-nums"
                  style={{ fontFamily: mono, color: AMBER }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3
                  className="text-lg font-medium leading-snug"
                  style={{ fontFamily: mono }}
                >
                  {p.headline}
                </h3>
                <p className="text-[15px] leading-relaxed" style={{ color: MUTED }}>
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Demo (framed specimen) ──────────────────────────── */}
      <section id="how-it-works" style={{ borderBottom: `1px solid ${LINE}` }}>
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="flex items-center gap-3">
            <Tag style={{ color: AMBER }}>[02]</Tag>
            <Tag style={{ color: MUTED }}>{demo.kicker}</Tag>
          </div>

          <div className="mt-8" style={{ border: `1px solid ${LINE}`, background: SURFACE }}>
            {/* window chrome */}
            <div
              className="flex items-center justify-between px-4 py-2.5"
              style={{ borderBottom: `1px solid ${LINE}` }}
            >
              <span className="flex items-center gap-2" style={{ fontFamily: mono }}>
                <span style={{ color: AMBER }}>$</span>
                <Tag style={{ color: MUTED }}>andamio issuer --build</Tag>
              </span>
              <span
                className="inline-flex items-center gap-1.5 px-2 py-0.5 text-[10px] uppercase tracking-[0.2em]"
                style={{ fontFamily: mono, color: AMBER, border: `1px solid ${AMBER}` }}
              >
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: AMBER, animation: "tp-blink 1.05s step-end infinite" }}
                />
                {demo.liveLabel}
              </span>
            </div>

            <div className="grid items-center gap-10 p-8 lg:grid-cols-[1fr_1fr] sm:p-12">
              <div>
                <h2
                  className="text-2xl font-medium leading-tight tracking-[-0.01em] sm:text-3xl"
                  style={{ fontFamily: mono }}
                >
                  {demo.title}
                </h2>
                <p className="mt-5 text-[15px] leading-relaxed" style={{ color: MUTED }}>
                  {demo.note}
                </p>

                {/* faux readout */}
                <div
                  className="mt-7 p-4 text-[12px] leading-relaxed"
                  style={{ fontFamily: mono, background: BG, border: `1px solid ${LINE}`, color: MUTED }}
                >
                  <div>
                    <span style={{ color: FAINT }}>hash.course</span>{" "}
                    <span style={{ color: TEXT }}>0x8f3a…c0de</span>
                  </div>
                  <div>
                    <span style={{ color: FAINT }}>hash.cert &nbsp;</span>{" "}
                    <span style={{ color: TEXT }}>0x21b7…ee90</span>
                  </div>
                  <div>
                    <span style={{ color: FAINT }}>state &nbsp;&nbsp;&nbsp;&nbsp;</span>{" "}
                    <span style={{ color: AMBER }}>verifiable ✓</span>
                  </div>
                </div>

                <a
                  href="#issuer"
                  className="tp-link mt-6 inline-block text-[13px] font-medium"
                  style={{ fontFamily: mono, color: AMBER }}
                >
                  {demo.inspirationCta} →
                </a>
              </div>

              <div
                className="flex items-center justify-center p-6"
                style={{ border: `1px solid ${LINE}`, background: BG }}
              >
                <img
                  src={CREDENTIAL_BADGE_SRC}
                  alt={hero.badgeAlt}
                  width={360}
                  height={360}
                  className="w-full max-w-[260px]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Issuer ──────────────────────────────────────────── */}
      <section id="issuer" style={{ borderBottom: `1px solid ${LINE}` }}>
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="flex items-center gap-3">
            <Tag style={{ color: AMBER }}>[03]</Tag>
            <Tag style={{ color: MUTED }}>{issuer.productLabel}</Tag>
          </div>

          <div className="mt-6 grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <h2
              className="text-5xl font-medium leading-[0.98] tracking-[-0.03em] sm:text-7xl"
              style={{ fontFamily: mono }}
            >
              {issuer.title}
            </h2>
            <p className="max-w-xl text-lg leading-relaxed" style={{ color: MUTED }}>
              {issuer.intro}
            </p>
          </div>

          <p className="mt-16 flex items-start gap-2 text-xl sm:text-2xl" style={{ fontFamily: mono }}>
            <span style={{ color: AMBER }}>&gt;</span>
            <span>{issuer.decisionsHeading}</span>
          </p>

          <div className="mt-10 grid gap-px sm:grid-cols-2 lg:grid-cols-3" style={{ background: LINE }}>
            {issuer.decisions.map((d, i) => (
              <div key={d.title} className="p-6" style={{ background: BG }}>
                <span className="text-sm tabular-nums" style={{ fontFamily: mono, color: AMBER }}>
                  {String(i + 1).padStart(2, "0")} /
                </span>
                <h3 className="mt-3 text-base font-medium leading-snug" style={{ fontFamily: mono }}>
                  {d.title}
                </h3>
                <p className="mt-2.5 text-[14px] leading-relaxed" style={{ color: MUTED }}>
                  {d.body}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-px" style={{ background: LINE }}>
            <span
              className="cursor-not-allowed px-6 py-3 text-[13px] font-medium"
              style={{ fontFamily: mono, background: SURFACE, color: FAINT }}
              title="Coming soon"
            >
              [ {issuer.reportCta} ]
            </span>
            <a
              href={EXTERNAL_LINKS.walkthroughMailto}
              className="px-6 py-3 text-[13px] font-medium transition-colors"
              style={{ fontFamily: mono, background: AMBER, color: BG }}
            >
              → {issuer.walkthroughCta}
            </a>
          </div>
        </div>
      </section>

      {/* ── Ecosystem ───────────────────────────────────────── */}
      <section style={{ borderBottom: `1px solid ${LINE}` }}>
        <div className="mx-auto max-w-5xl px-6 py-24">
          <div className="flex items-center gap-3">
            <Tag style={{ color: AMBER }}>[04]</Tag>
            <Tag style={{ color: MUTED }}>{ecosystem.kicker}</Tag>
          </div>
          <p
            className="mt-6 max-w-3xl text-2xl font-medium leading-[1.25] tracking-[-0.01em] sm:text-3xl"
            style={{ fontFamily: mono }}
          >
            {ecosystem.lead}
          </p>

          <div className="mt-12 grid gap-px sm:grid-cols-2" style={{ background: LINE, border: `1px solid ${LINE}` }}>
            {ecosystem.items.map((it) => (
              <div key={it.title} className="p-7" style={{ background: BG }}>
                <p className="flex items-center gap-2 text-[15px] font-semibold" style={{ fontFamily: mono }}>
                  <span style={{ color: AMBER }}>●</span> {it.title}
                </p>
                <p className="mt-3 text-[15px] leading-relaxed" style={{ color: MUTED }}>
                  {it.body}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-[12px]" style={{ fontFamily: mono, color: FAINT }}>
            {"// "}{ecosystem.footnote}
          </p>
        </div>
      </section>

      {/* ── API / Architecture ──────────────────────────────── */}
      <section id="andamio-api" style={{ background: SURFACE, borderBottom: `1px solid ${LINE}` }}>
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="flex items-center gap-3">
            <Tag style={{ color: AMBER }}>[05]</Tag>
            <Tag style={{ color: MUTED }}>{api.zoneLabel}</Tag>
          </div>
          <h2
            className="mt-6 text-5xl font-medium leading-[0.98] tracking-[-0.03em] sm:text-7xl"
            style={{ fontFamily: mono }}
          >
            {api.zoneTitle}
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed" style={{ color: MUTED }}>
            {api.zoneBlurb}
          </p>

          <div className="mt-16 grid gap-14 lg:grid-cols-[1fr_1fr] lg:items-start">
            <div>
              <Tag style={{ color: AMBER }} className="block">
                {api.kicker}
              </Tag>
              <h3
                className="mt-4 text-3xl font-medium leading-tight tracking-[-0.02em] sm:text-4xl"
                style={{ fontFamily: mono }}
              >
                {api.heading}
              </h3>
              <p className="mt-6 max-w-lg text-[15px] leading-relaxed" style={{ color: MUTED }}>
                {api.body1}
              </p>
              <p className="mt-4 max-w-lg text-[15px] leading-relaxed" style={{ color: MUTED }}>
                {api.body2}
              </p>
              <a
                href={EXTERNAL_LINKS.apiReference}
                className="tp-link mt-7 inline-block text-[13px] font-medium"
                style={{ fontFamily: mono, color: AMBER }}
              >
                {api.apiRefCta} →
              </a>
            </div>

            {/* stack readout */}
            <div style={{ border: `1px solid ${LINE}`, background: BG }}>
              <div
                className="flex items-center justify-between px-4 py-2.5"
                style={{ borderBottom: `1px solid ${LINE}` }}
              >
                <Tag style={{ color: MUTED }}>stack.trace</Tag>
                <Tag style={{ color: FAINT }}>4 layers</Tag>
              </div>
              {api.stack.map((layer, i) => {
                const emph = layer.emphasis;
                return (
                  <div
                    key={layer.name}
                    className="px-6 py-5"
                    style={{
                      borderTop: i > 0 ? `1px solid ${LINE}` : undefined,
                      background: emph ? AMBER : "transparent",
                      color: emph ? BG : TEXT,
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <Tag style={{ color: emph ? "rgba(10,10,11,0.7)" : FAINT }}>
                        {layer.labelKicker}
                      </Tag>
                      <Tag style={{ color: emph ? "rgba(10,10,11,0.55)" : FAINT }}>
                        L{i}
                      </Tag>
                    </div>
                    <p
                      className="mt-1.5 flex items-center gap-2 text-[15px] font-semibold"
                      style={{ fontFamily: mono }}
                    >
                      {emph && <span>→</span>}
                      {layer.name}
                    </p>
                    <p
                      className="mt-1.5 text-[13px] leading-relaxed"
                      style={{ color: emph ? "rgba(10,10,11,0.78)" : MUTED }}
                    >
                      {layer.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── Closing ─────────────────────────────────────────── */}
      <section style={{ background: BG, borderBottom: `1px solid ${LINE}` }}>
        <div className="mx-auto max-w-3xl px-6 py-28 text-center">
          <Tag style={{ color: AMBER }}>
            <span style={{ color: FAINT }}>~$</span> {closing.eyebrow}
          </Tag>
          <h2
            className="mt-8 text-4xl font-medium leading-[1.08] tracking-[-0.03em] sm:text-5xl"
            style={{ fontFamily: mono }}
          >
            {closing.headlineLine1}
            <br />
            <span style={{ color: AMBER }}>
              {closing.headlineLine2}
              <span className="tp-cursor">_</span>
            </span>
          </h2>
          <p className="mx-auto mt-7 max-w-xl text-[15px] leading-relaxed" style={{ color: MUTED }}>
            {closing.body}
          </p>
          <a
            href={EXTERNAL_LINKS.walkthroughMailto}
            className="mt-10 inline-block px-7 py-3.5 text-[13px] font-medium transition-colors"
            style={{ fontFamily: mono, background: AMBER, color: BG }}
          >
            → {closing.cta}
          </a>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────── */}
      <footer style={{ background: BG, color: MUTED }}>
        <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 py-14 md:flex-row md:justify-between">
          <div className="max-w-xs">
            <span className="flex items-baseline gap-1.5" style={{ fontFamily: mono }}>
              <span style={{ color: AMBER }}>$</span>
              <span className="text-base font-semibold" style={{ color: TEXT }}>
                {nav.brand}
              </span>
            </span>
            <p className="mt-4 text-[14px] leading-relaxed" style={{ color: MUTED }}>
              {footer.tagline}
            </p>
            <p className="mt-5 text-[12px]" style={{ fontFamily: mono, color: FAINT }}>
              {footer.meta}
            </p>
            <p className="mt-2 text-[12px]" style={{ fontFamily: mono, color: FAINT }}>
              {footer.copyright}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {Object.entries(footer.columns).map(([key, links]) => (
              <div key={key}>
                <Tag className="mb-4 block" style={{ color: TEXT }}>
                  {key}
                </Tag>
                <ul className="space-y-2.5">
                  {links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="tp-link text-[13px] transition-colors"
                        style={{ color: MUTED }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = TEXT)}
                        onMouseLeave={(e) => (e.currentTarget.style.color = MUTED)}
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
        <div className="py-5 text-center" style={{ borderTop: `1px solid ${LINE}` }}>
          <Link
            href="/explore"
            className="text-[12px]"
            style={{ fontFamily: mono, color: FAINT }}
          >
            ← Back to all iterations
          </Link>
        </div>
      </footer>
    </div>
  );
}
