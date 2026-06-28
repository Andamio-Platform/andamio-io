/**
 * LOCKED landing-page content for Round 1 design exploration (/explore/01..10).
 *
 * This is the single source of truth for copy across all 10 design iterations.
 * It is lifted verbatim from the live V2Landing (src/ui/landing/V2Landing/*).
 * Designs may restyle, reorder visually, and re-lay-out freely — but the words
 * here must not change. If the live copy changes, update it here once.
 */

export const EXTERNAL_LINKS = {
  docs: "https://docs.andamio.io/docs",
  apiReference: "https://dev.api.andamio.io/reference",
  app: "https://mainnet.app.andamio.io",
  github: "https://github.com/Andamio-Platform",
  discord: "https://discord.gg/FtvpAYnBMU",
  linkedin: "https://www.linkedin.com/company/andamio-platform",
  twitter: "https://x.com/AndamioPlatform",
  walkthroughMailto:
    "mailto:hello@andamio.io?subject=Enterprise%20walkthrough%20request",
} as const;

/** The real credential SVG used in the live hero. Lives in /public. */
export const CREDENTIAL_BADGE_SRC = "/andamio-credential-badge.svg";

export const nav = {
  brand: "Andamio",
  items: [
    { label: "Issuer", href: "/#issuer" },
    { label: "API", href: "/#andamio-api" },
    { label: "Roadmap", href: "/roadmap" },
    { label: "Whitepaper", href: "/whitepaper" },
    { label: "Docs", href: EXTERNAL_LINKS.docs },
    { label: "Blog", href: "/blog" },
    { label: "About", href: "/about" },
  ],
  cta: { label: "Get Started", href: EXTERNAL_LINKS.app },
} as const;

export const hero = {
  // "Own Your Badges" — `Badges` is the accented word.
  headlineLead: "Own Your",
  headlineAccent: "Badges",
  subhead: "Andamio Credential Badges are permanent, programmable, and yours.",
  ctaEyebrow: "Learn how",
  primaryCta: { label: "Andamio Issuer", href: "#issuer" },
  secondaryCta: { label: "Andamio API", href: "#andamio-api" },
  badgeAlt:
    "An Andamio credential, Getting Started with Andamio. Its rings encode the course it came from, and what it certifies.",
  badgeCaption:
    "A real Andamio credential. Its rings encode where it came from and what it certifies.",
} as const;

export const problem = {
  kicker: "The problem with badges",
  heading: "Badges aren’t effective",
  intro:
    "The digital credential most organizations issue is a badge. And a badge falls short in three ways.",
  items: [
    {
      headline: "It’s a picture, not data",
      body: "A badge can be shared on LinkedIn, but your systems can’t act on it. In a 2025 survey, 91% of employers looked for digital credentials when hiring. Only 34% of issuers gave them data a system can read.",
    },
    {
      headline: "It lives in your vendor’s database",
      body: "It can be quietly changed, switched off, or lost if the vendor closes its doors. The proof your people earned goes with it.",
    },
    {
      headline: "The vendor controls it, not you",
      body: "Whoever runs the platform controls your credentialing system. The records, the rules, and whether any of it survives.",
    },
  ],
} as const;

export const demo = {
  kicker: "How it works",
  liveLabel: "Live",
  title: "Build a credential badge",
  inspirationCta: "Need inspiration? See ways to use it",
  // Stand-in note shown in design-only iterations where the wired widget is
  // represented as a framed specimen rather than re-built.
  note: "Type below — the rings encode the course_id and slt_hash that identify the credential.",
} as const;

export const issuer = {
  productLabel: "Product 01 · No code",
  title: "Andamio Issuer",
  intro:
    "Andamio turns the badge you already issue into a credential you control. It adds a verifiable layer on top of the programs you already run. You get everything a blockchain guarantees, and none of the blockchain to learn.",
  decisionsHeading: "Six design decisions set an Andamio credential apart.",
  decisions: [
    {
      title: "It outlives whoever issued it",
      body: "It’s immutable, on public infrastructure no single company owns. It can’t be altered, and it doesn’t disappear when a vendor does. You’re not locked in, and neither are the people you credential.",
    },
    {
      title: "It builds on other credentials",
      body: "Like a university prerequisite, one credential can be required before another. The chain enforces it, not an app. So a credential you issue can gate a program someone else runs.",
    },
    {
      title: "Software can act on it",
      body: "It’s machine-readable and programmable. An app can check that someone holds it and gate access on that.",
    },
    {
      title: "Proof is public; evidence is private",
      body: "Anyone can verify a credential is real. The work behind it stays with the earner and the issuer. A diploma is public. The exam papers are not.",
    },
    {
      title: "You own what it means",
      body: "Issuing is easy, and the credential makes no claim about its own value. You define what it certifies. Its value comes from the track record it earns. The infrastructure is ours. The meaning is yours.",
    },
    {
      title: "The earner keeps it",
      body: "It lives with the person who earned it, not your system. Everything they earn from you sits in one record they control. They can carry it anywhere, even if they leave your program.",
    },
  ],
  reportCta: "Get the report",
  walkthroughCta: "Book a 20-minute walkthrough",
} as const;

export const ecosystem = {
  kicker: "In the ecosystem",
  lead:
    "Organizations are already issuing Andamio credentials. They mean something inside their world first.",
  items: [
    {
      title: "Intersect",
      body: "The member body that stewards the Cardano ecosystem is issuing maintainer credentials to a live cohort on Andamio.",
    },
    {
      title: "Where it goes",
      body: "The same machinery that attests a person learned something can attest that knowledge is trustworthy. Put your expertise into a form software can read, and the credential record becomes a record of knowledge too.",
    },
  ],
  footnote: "Named organizations current as of June 2026.",
} as const;

export const api = {
  zoneLabel: "Product 02 · For builders",
  zoneTitle: "Andamio API",
  zoneBlurb:
    "The protocol you build on. The same credentials, as REST endpoints. Issue, verify, and gate on them from your own stack.",
  kicker: "How it fits your stack",
  heading: "Build on the same machinery",
  body1:
    "The Issuer runs on the same machinery you can build on directly. Andamio credentials are machine-readable. An app can check that someone holds one, then act on it. Gate access, unlock the next step, or drive what happens next.",
  body2:
    "Credentials are composable. One can gate another. The chain enforces the prerequisite, not an app, so it holds across organizations. Audited smart contracts on Cardano, called over REST. Your stack never touches crypto.",
  apiRefCta: "Read the API reference",
  stack: [
    {
      labelKicker: "Your surface",
      name: "What you already run",
      description: "Your LMS, CRM, or certification platform. Stays where it is.",
      emphasis: false,
    },
    {
      labelKicker: "Integration",
      name: "Andamio API",
      description:
        "REST endpoints to issue, verify, and gate on credentials from your own stack.",
      emphasis: true,
    },
    {
      labelKicker: "Protocol",
      name: "Andamio smart contracts",
      description:
        "Audited by TxPipe. On-chain credential registry. The full transaction lifecycle, wrapped as an API.",
      emphasis: false,
    },
    {
      labelKicker: "Settlement",
      name: "Cardano mainnet",
      description:
        "Permanence. Your credentials outlive every vendor, including us.",
      emphasis: false,
    },
  ],
} as const;

export const closing = {
  eyebrow: "Andamio Issuer",
  headlineLine1: "Upgrade your credentials",
  headlineLine2: "Issue ones that keep working",
  body: "Twenty minutes. We scope a pilot on one of your programs. We show you the credentials working. No slides.",
  cta: "Book a 20-minute walkthrough",
} as const;

export const footer = {
  tagline:
    "Verifiable credentials that keep working after you issue them. A credentialing company that happens to use blockchain.",
  meta: "Live on Cardano mainnet · Audited by TxPipe",
  copyright: "© 2026 Andamio",
  columns: {
    "For buyers": [
      { name: "Book a walkthrough", href: EXTERNAL_LINKS.walkthroughMailto },
      { name: "Use cases", href: "/use-cases" },
      { name: "Blog", href: "/blog" },
      { name: "About", href: "/about" },
    ],
    "For builders": [
      { name: "Docs", href: EXTERNAL_LINKS.docs },
      { name: "API Reference", href: EXTERNAL_LINKS.apiReference },
      { name: "GitHub", href: EXTERNAL_LINKS.github },
      { name: "App", href: EXTERNAL_LINKS.app },
    ],
    Connect: [
      { name: "hello@andamio.io", href: "mailto:hello@andamio.io" },
      { name: "LinkedIn", href: EXTERNAL_LINKS.linkedin },
      { name: "Twitter", href: EXTERNAL_LINKS.twitter },
      { name: "Discord", href: EXTERNAL_LINKS.discord },
    ],
    Legal: [
      { name: "Privacy", href: "/privacy-policy" },
      { name: "Terms", href: "/terms" },
    ],
  },
} as const;

/** Registry of the explore iterations — drives the /explore gallery. */
export interface VariantMeta {
  slug: string; // "01".."20"
  title: string;
  scheme: "light" | "dark" | "mixed";
  blurb: string;
  batch: 1 | 2 | 3;
}

export const VARIANTS: VariantMeta[] = [
  // ── Round 1 — broad exploration ──────────────────────────────────────
  { slug: "01", title: "Editorial Light", scheme: "light", batch: 1, blurb: "Serif display, newspaper whitespace, ink-on-paper restraint." },
  { slug: "02", title: "Terminal Protocol", scheme: "dark", batch: 1, blurb: "Monospace, hairline rules, a developer's-console reading of the page." },
  { slug: "03", title: "Brutalist Contrast", scheme: "mixed", batch: 1, blurb: "Hard black/white blocks, one loud accent, sections that flip." },
  { slug: "04", title: "Soft Warm SaaS", scheme: "light", batch: 1, blurb: "Warm off-white, rounded cards, friendly and approachable." },
  { slug: "05", title: "Midnight Premium", scheme: "dark", batch: 1, blurb: "Deep navy, subtle glow, enterprise-grade and quiet." },
  { slug: "06", title: "Swiss Grid", scheme: "light", batch: 1, blurb: "Strict international grid, red accent, typographic discipline." },
  { slug: "07", title: "Credential Showcase", scheme: "mixed", batch: 1, blurb: "Badge-forward, the credential as the hero object throughout." },
  { slug: "08", title: "Whitepaper Document", scheme: "light", batch: 1, blurb: "Reads like an authoritative spec — mono + serif, near-zero chrome." },
  { slug: "09", title: "Neon Protocol", scheme: "dark", batch: 1, blurb: "Cyber-Cardano, electric accents, grid field, kinetic." },
  { slug: "10", title: "Warm Magazine", scheme: "mixed", batch: 1, blurb: "Cream and charcoal spreads, Fraunces headlines, pull-quotes." },

  // ── Round 2 — informed by feedback. Shared spine: Inter/Swiss type, no
  //    orange, full-bleed hero with the badge withheld, then a scroll-driven
  //    sideways reveal into a museum-specimen frame. Vary accent/scheme/layout.
  { slug: "11", title: "Swiss Coral", scheme: "light", batch: 2, blurb: "Strict visible grid, coral accent, badge slides in from the right on scroll." },
  { slug: "12", title: "Spec Sheet", scheme: "light", batch: 2, blurb: "Document + margin-note rail, cool-blue, reads like a precise technical spec." },
  { slug: "13", title: "Acid Protocol", scheme: "dark", batch: 2, blurb: "Dark grid field, disciplined acid-yellow — the controlled cousin of brutalist." },
  { slug: "14", title: "Editorial Vault", scheme: "mixed", batch: 2, blurb: "Light editorial body; scroll drops into a charcoal vault where the badge reveals." },
  { slug: "15", title: "Instrument", scheme: "light", batch: 2, blurb: "Grid + margin data-rail hybrid; the badge reveal wires to live readouts." },

  // ── Round 3 — convergence on 11 + 12 + 15. Shared synthesis: 11's light
  //    grid + hero + vertical rhythm, 12's semibold-Inter type, 15's floating
  //    right-side outline rail. Each a 3-color theme (coral · cool-blue ·
  //    Andamio orange used sparingly), keeping the spine (full-bleed hero,
  //    withheld badge, sideways reveal into a museum specimen).
  { slug: "16", title: "Coral Index", scheme: "light", batch: 3, blurb: "11's grid leads; coral primary, blue rail, orange only on live/verified." },
  { slug: "17", title: "Blueprint Spec", scheme: "light", batch: 3, blurb: "12's data-sheet rigor on a right rail; cool-blue led, coral + orange spark." },
  { slug: "18", title: "Instrument Coral", scheme: "light", batch: 3, blurb: "15's instrument rail is the identity; blue readouts, coral heads, orange verified." },
  { slug: "19", title: "Warm Index", scheme: "light", batch: 3, blurb: "Swiss-monochrome; orange as the lead accent but used precisely, blue rail." },
  { slug: "20", title: "Tri-tone", scheme: "light", batch: 3, blurb: "Explicit 3-color system — coral display, blue data, orange for verified only." },

  // Rail-placement studies off the chosen direction (19 · Warm Index).
  { slug: "21", title: "Warm Index · Left rail", scheme: "light", batch: 3, blurb: "19, with the section index mirrored to the left. Minimal change — does left feel more expected?" },
  { slug: "22", title: "Warm Index · Editorial rail", scheme: "light", batch: 3, blurb: "19, rail kept right but de-chromed — floating chapter-marks in the margin, not an app panel." },
];
