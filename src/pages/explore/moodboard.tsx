import Head from "next/head";
import Link from "next/link";
import { hero, CREDENTIAL_BADGE_SRC } from "~/ui/explore/content";

/**
 * Round 2 — Mood Board.
 *
 * Decomposes the 10 Round-1 iterations into the dimensions we actually decide
 * on (type, scheme, accent, hero, badge treatment, layout, tone), so we can MIX
 * the best parts instead of voting for one page wholesale. Each row shows the
 * real candidates at full fidelity, links back to the iteration it came from,
 * and cites 1–2 external exemplars to aim above our own first drafts.
 *
 * As we converge, update SELECTION below — the "Direction (converging)" panel
 * reads from it. The filled-in version becomes the Round-3 brief.
 */

// ── The converging direction. Update as picks are made; null = undecided. ──
const SELECTION: Record<string, string | null> = {
  Typography: "Inter / Swiss",
  "Base scheme": "Light (leaning)",
  Accent: "Coral · Acid · Cool-blue (no orange)",
  "Hero composition": "Full-bleed — badge revealed below",
  "Badge treatment": "Museum specimen (leaning)",
  "Layout system": "Visible grid + Document/margin",
  Tone: "Authoritative · Protocol · Instrumental · Editorial · Humane",
};

const INK = "#16130F";
const PAPER = "#F4F1EA";
const ui = "'Inter', system-ui, sans-serif";

/* ── Small building blocks ─────────────────────────────────────────── */

function Row({
  n,
  title,
  caption,
  refs,
  children,
}: {
  n: string;
  title: string;
  caption: string;
  refs?: { label: string; href: string; why: string }[];
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-black/10 py-14">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex items-baseline gap-4">
          <span
            className="text-sm tabular-nums text-black/35"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            {n}
          </span>
          <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
          {SELECTION[title] ? (
            <span className="rounded-full bg-emerald-600/10 px-3 py-1 text-xs font-medium text-emerald-700">
              picked: {SELECTION[title]}
            </span>
          ) : (
            <span className="rounded-full bg-black/[0.05] px-3 py-1 text-xs font-medium text-black/40">
              undecided
            </span>
          )}
        </div>
        <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-black/55">
          {caption}
        </p>

        <div className="mt-7">{children}</div>

        {refs && (
          <p className="mt-6 text-[13px] leading-relaxed text-black/45">
            <span className="font-medium text-black/60">Aim higher: </span>
            {refs.map((r, i) => (
              <span key={r.label}>
                {i > 0 && " · "}
                <a
                  href={r.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-black/20 underline-offset-2 hover:decoration-black/60"
                >
                  {r.label}
                </a>{" "}
                <span className="text-black/40">({r.why})</span>
              </span>
            ))}
          </p>
        )}
      </div>
    </section>
  );
}

/** A labeled option tile linking back to the iterations that use it. */
function Tile({
  from,
  label,
  children,
  className = "",
  style,
}: {
  from?: string[];
  label: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`flex flex-col overflow-hidden rounded-xl border border-black/12 bg-white ${className}`}
      style={style}
    >
      <div className="flex-1">{children}</div>
      <div className="flex items-center justify-between border-t border-black/10 px-4 py-2.5">
        <span className="text-[13px] font-medium">{label}</span>
        {from && (
          <span className="flex gap-1">
            {from.map((f) => (
              <Link
                key={f}
                href={`/explore/${f}`}
                className="rounded bg-black/[0.05] px-1.5 py-0.5 font-mono text-[11px] text-black/55 hover:bg-black/10"
              >
                {f}
              </Link>
            ))}
          </span>
        )}
      </div>
    </div>
  );
}

const Badge = ({ size = 150 }: { size?: number }) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img src={CREDENTIAL_BADGE_SRC} alt="Andamio credential" width={size} height={size} />
);

/* ── Row data ──────────────────────────────────────────────────────── */

const TYPE = [
  { face: "Fraunces", body: "Inter", ff: "'Fraunces', serif", from: ["01", "08", "10"], note: "Editorial serif — warmth + authority" },
  { face: "Archivo (900)", body: "JetBrains Mono", ff: "'Archivo', sans-serif", w: 900, from: ["03", "06"], note: "Heavy grotesque — loud, confident" },
  { face: "Bricolage Grotesque", body: "Inter", ff: "'Bricolage Grotesque', sans-serif", from: ["04"], note: "Friendly, characterful sans" },
  { face: "Sora", body: "Inter", ff: "'Sora', sans-serif", from: ["05"], note: "Geometric, premium-neutral" },
  { face: "Space Grotesk", body: "JetBrains Mono", ff: "'Space Grotesk', sans-serif", from: ["07", "09"], note: "Technical, slightly quirky" },
  { face: "Inter (Swiss)", body: "Inter", ff: "'Inter', sans-serif", from: ["06"], note: "Neutral, rational, gets out of the way" },
  { face: "JetBrains Mono", body: "Inter", ff: "'JetBrains Mono', monospace", from: ["02"], note: "Mono as display — instrument feel" },
];

const ACCENTS = [
  { hex: "#B4451F", name: "Rust", from: ["01"] },
  { hex: "#FF6B35", name: "Andamio orange", from: ["02"] },
  { hex: "#E8FF00", name: "Acid yellow", from: ["03"] },
  { hex: "#FF6B4A", name: "Coral", from: ["04"] },
  { hex: "#5B8DEF", name: "Cool blue", from: ["05"] },
  { hex: "#E5322D", name: "Swiss red", from: ["06"] },
  { hex: "#2A3F7E", name: "Academic blue", from: ["08"] },
  { hex: "#22D3EE", name: "Cyan / Cardano", from: ["09"] },
  { hex: "#C8732B", name: "Ochre", from: ["10"] },
];

const SCHEMES = [
  { name: "Light", from: ["01", "04", "06", "08"], bg: "#FBFAF7", fg: "#16130F" },
  { name: "Dark", from: ["02", "05", "09"], bg: "#0A0A0B", fg: "#EDEDED" },
  { name: "Mixed (bands)", from: ["03", "07", "10"], bg: "linear-gradient(180deg,#FBFAF7 0 50%,#16130F 50% 100%)", fg: "#16130F" },
];

const TONES = [
  { name: "Authoritative document", from: ["08"] },
  { name: "Premium / quiet", from: ["05"] },
  { name: "Punk / brutalist", from: ["03"] },
  { name: "Humane / friendly", from: ["04"] },
  { name: "Technical instrument", from: ["02"] },
  { name: "Editorial / serif", from: ["01", "10"] },
  { name: "Swiss / rational", from: ["06"] },
  { name: "Product showcase", from: ["07"] },
  { name: "Protocol / kinetic", from: ["09"] },
];

export default function MoodBoard() {
  return (
    <div className="min-h-screen" style={{ background: PAPER, color: INK, fontFamily: ui }}>
      <Head>
        <title>Round 2 · Mood Board — Andamio</title>
      </Head>

      {/* Top bar + converging selection */}
      <header className="sticky top-0 z-50 border-b border-black/10 bg-[#F4F1EA]/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-3">
          <div className="flex items-center gap-3">
            <Link href="/explore" className="text-sm text-black/50 hover:text-black">
              ← Iterations
            </Link>
            <span className="text-sm font-semibold">Round 2 · Mood Board</span>
          </div>
          <div className="hidden flex-wrap items-center gap-1.5 md:flex">
            {Object.entries(SELECTION).map(([k, v]) => (
              <span
                key={k}
                className={`rounded-full px-2.5 py-1 text-[11px] ${
                  v ? "bg-emerald-600/15 text-emerald-700" : "bg-black/[0.05] text-black/40"
                }`}
              >
                {k}: {v ?? "—"}
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* Intro */}
      <section className="mx-auto max-w-6xl px-6 pt-14 pb-2">
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
          Mix the parts, don&apos;t vote for a page
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-black/60">
          Each of the ten iterations marries a typeface to a palette to a layout
          to a badge treatment. Decide each dimension on its own, then we
          assemble the winner in Round 3. Numbers link back to the iteration the
          specimen comes from. Tell me your pick per row and I&apos;ll lock it
          into the panel above.
        </p>
      </section>

      {/* 01 — Typography */}
      <Row
        n="01"
        title="Typography"
        caption="The display face sets the whole personality; body is almost always Inter or a mono. Same headline, seven faces."
        refs={[
          { label: "Stripe", href: "https://stripe.com", why: "sans discipline" },
          { label: "Stripe Press", href: "https://press.stripe.com", why: "serif authority" },
        ]}
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TYPE.map((t) => (
            <Tile key={t.face} from={t.from} label={`${t.face} + ${t.body}`}>
              <div className="px-5 pt-5 pb-4">
                <p
                  className="text-[28px] leading-[1.05] tracking-[-0.02em]"
                  style={{ fontFamily: t.ff, fontWeight: t.w ?? 700 }}
                >
                  Badges are due for an{" "}
                  <span style={{ color: "#B4451F" }}>upgrade</span>
                </p>
                <p className="mt-3 text-[13px] leading-relaxed text-black/55">
                  {t.note}
                </p>
              </div>
            </Tile>
          ))}
        </div>
      </Row>

      {/* 02 — Base scheme */}
      <Row
        n="02"
        title="Base scheme"
        caption="Light, dark, or mixed bands — decided separately from the accent. Light reads trustworthy/editorial; dark reads premium/technical; mixed gives rhythm."
      >
        <div className="grid gap-4 sm:grid-cols-3">
          {SCHEMES.map((s) => (
            <Tile key={s.name} from={s.from} label={s.name}>
              <div className="flex h-36 items-center justify-center" style={{ background: s.bg }}>
                <span
                  className="text-lg font-semibold"
                  style={{ color: s.name === "Mixed (bands)" ? "#16130F" : s.fg, fontFamily: "'Sora', sans-serif" }}
                >
                  {s.name}
                </span>
              </div>
            </Tile>
          ))}
        </div>
      </Row>

      {/* 03 — Accent */}
      <Row
        n="03"
        title="Accent"
        caption="One disciplined accent, used at roughly a 20% ratio. The current brand is Andamio orange; the badge itself is greens + gold, which several iterations sample."
        refs={[{ label: "Linear", href: "https://linear.app", why: "one-accent restraint" }]}
      >
        <div className="grid grid-cols-3 gap-4 sm:grid-cols-5 lg:grid-cols-9">
          {ACCENTS.map((a) => (
            <Tile key={a.hex} from={a.from} label={a.name}>
              <div className="h-20" style={{ background: a.hex }} />
              <div className="px-3 pt-2">
                <span className="font-mono text-[11px] text-black/45">{a.hex}</span>
              </div>
            </Tile>
          ))}
        </div>
      </Row>

      {/* 04 — Hero composition */}
      <Row
        n="04"
        title="Hero composition"
        caption="Where the credential sits relative to the headline. Schematic wireframes — the structural decision, not the styling."
      >
        <div className="grid gap-4 sm:grid-cols-3">
          <Tile from={["01", "02", "04", "05", "06", "08", "10"]} label="Split — type left, badge right">
            <div className="flex h-40 items-center gap-3 p-5">
              <div className="flex-1 space-y-2">
                <div className="h-3 w-4/5 rounded bg-black/70" />
                <div className="h-3 w-3/5 rounded bg-black/70" />
                <div className="mt-3 h-5 w-24 rounded bg-[#B4451F]" />
              </div>
              <div className="grid h-24 w-24 place-items-center rounded-full border-2 border-black/15">
                <Badge size={58} />
              </div>
            </div>
          </Tile>
          <Tile from={["07", "09"]} label="Centered — badge spotlight">
            <div className="grid h-40 place-items-center bg-[#0A0A0B] p-5">
              <div className="flex flex-col items-center gap-2">
                <Badge size={70} />
                <div className="h-3 w-32 rounded bg-white/70" />
              </div>
            </div>
          </Tile>
          <Tile from={["03"]} label="Full-bleed — type dominates">
            <div className="flex h-40 flex-col justify-center gap-2 p-5">
              <div className="h-6 w-full rounded bg-black" />
              <div className="h-6 w-11/12 rounded bg-black" />
              <div className="h-6 w-2/3 rounded bg-[#E8FF00]" />
            </div>
          </Tile>
        </div>
      </Row>

      {/* 05 — Badge treatment (the signature object) */}
      <Row
        n="05"
        title="Badge treatment"
        caption="The credential is Andamio's signature object — how it's framed may matter more than any other single choice. Five framings, same real SVG."
        refs={[
          { label: "Credly", href: "https://info.credly.com", why: "badge-as-trust-object" },
          { label: "Ledger", href: "https://www.ledger.com", why: "product-as-hero" },
        ]}
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Figure + caption */}
          <Tile from={["01"]} label="Figure + caption">
            <div className="flex flex-col items-center p-6">
              <Badge size={130} />
              <p className="mt-3 text-center text-[12px] italic text-black/50">
                {hero.badgeCaption}
              </p>
            </div>
          </Tile>

          {/* Window chrome */}
          <Tile from={["02"]} label="Window chrome — credential.svg">
            <div className="bg-[#0A0A0B] p-4">
              <div className="overflow-hidden rounded-lg border border-white/10">
                <div className="flex items-center justify-between border-b border-white/10 px-3 py-2">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-white/50">
                    credential.svg
                  </span>
                  <span className="flex gap-1">
                    <i className="h-1.5 w-1.5 rounded-full bg-white/30" />
                    <i className="h-1.5 w-1.5 rounded-full bg-white/30" />
                    <i className="h-1.5 w-1.5 rounded-full bg-[#FF6B35]" />
                  </span>
                </div>
                <div className="grid place-items-center bg-white py-4">
                  <Badge size={110} />
                </div>
              </div>
            </div>
          </Tile>

          {/* Museum specimen */}
          <Tile from={["03"]} label="Museum specimen">
            <div className="bg-white p-4">
              <div className="border-2 border-black">
                <div className="flex items-center justify-between border-b-2 border-black px-3 py-1.5">
                  <span className="font-mono text-[10px] font-bold uppercase">Specimen 001</span>
                  <span className="font-mono text-[10px] font-bold uppercase text-[#9A7B00]">On-chain</span>
                </div>
                <div className="grid place-items-center py-4">
                  <Badge size={110} />
                </div>
              </div>
            </div>
          </Tile>

          {/* Product-shoot callouts */}
          <Tile from={["07"]} label="Exploded product-shoot">
            <div className="relative grid h-[210px] place-items-center bg-[#0C140F] p-4">
              <div
                className="absolute inset-0"
                style={{ background: "radial-gradient(circle at 50% 45%, rgba(201,162,39,0.18), transparent 60%)" }}
              />
              <Badge size={120} />
              <span className="absolute left-3 top-6 font-mono text-[9px] uppercase tracking-wider text-white/45">
                ── outer ring · issuer
              </span>
              <span className="absolute bottom-8 right-3 font-mono text-[9px] uppercase tracking-wider text-white/45">
                inner · hash ──
              </span>
            </div>
          </Tile>

          {/* Fig plate */}
          <Tile from={["08", "10"]} label="Fig. plate">
            <div className="bg-white p-5">
              <div className="border border-black/20 p-4">
                <div className="grid place-items-center bg-[#FBFAF7] py-3">
                  <Badge size={110} />
                </div>
              </div>
              <p className="mt-3 text-[12px]">
                <span className="font-mono text-[#2A3F7E]">Fig 1.</span>{" "}
                <span className="text-black/55" style={{ fontFamily: "'Fraunces', serif" }}>
                  {hero.badgeCaption}
                </span>
              </p>
            </div>
          </Tile>
        </div>
      </Row>

      {/* 06 — Layout system */}
      <Row
        n="06"
        title="Layout system"
        caption="The structural grammar that carries the whole page — how sections are bounded and aligned."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Tile from={["06"]} label="Visible grid">
            <div className="relative h-32 bg-white">
              <div className="absolute inset-0 flex justify-between px-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="w-px bg-black/10" />
                ))}
              </div>
              <div className="absolute left-4 top-5 h-3 w-1/2 bg-black" />
              <div className="absolute left-4 top-10 h-2 w-1/3 bg-[#E5322D]" />
            </div>
          </Tile>
          <Tile from={["03", "10"]} label="Flipping bands">
            <div className="h-32">
              <div className="h-1/3 bg-[#F6EFE3]" />
              <div className="h-1/3 bg-[#211C18]" />
              <div className="h-1/3 bg-[#F6EFE3]" />
            </div>
          </Tile>
          <Tile from={["08"]} label="Document + margin notes">
            <div className="flex h-32 gap-3 bg-white p-4">
              <div className="w-10 space-y-1.5 border-r border-black/10 pr-2">
                <div className="h-1.5 w-full bg-black/20" />
                <div className="h-1.5 w-2/3 bg-black/20" />
              </div>
              <div className="flex-1 space-y-1.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="h-1.5 w-full bg-black/30" />
                ))}
              </div>
            </div>
          </Tile>
          <Tile from={["04"]} label="Soft cards">
            <div className="grid h-32 grid-cols-2 gap-2 bg-[#FFFDF8] p-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="rounded-lg bg-white shadow-[0_6px_20px_-8px_rgba(0,0,0,0.25)]" />
              ))}
            </div>
          </Tile>
        </div>
      </Row>

      {/* 07 — Tone */}
      <Row
        n="07"
        title="Tone"
        caption="The overall feeling — useful as a tiebreaker once the concrete dimensions narrow. Which adjective should a first-time visitor leave with?"
      >
        <div className="flex flex-wrap gap-2.5">
          {TONES.map((t) => (
            <div
              key={t.name}
              className="flex items-center gap-2 rounded-full border border-black/12 bg-white px-4 py-2"
            >
              <span className="text-sm">{t.name}</span>
              {t.from.map((f) => (
                <Link
                  key={f}
                  href={`/explore/${f}`}
                  className="rounded bg-black/[0.05] px-1.5 py-0.5 font-mono text-[11px] text-black/55 hover:bg-black/10"
                >
                  {f}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </Row>

      <footer className="border-t border-black/10 py-12 text-center">
        <p className="text-sm text-black/45">
          Pick per row → I lock the panel → that becomes the Round 3 brief.
        </p>
        <Link href="/explore" className="mt-3 inline-block text-sm font-medium text-[#B4451F]">
          ← Back to all iterations
        </Link>
      </footer>
    </div>
  );
}
