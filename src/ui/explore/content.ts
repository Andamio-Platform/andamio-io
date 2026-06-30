/**
 * Landing-page content — the single source of truth for copy on the live page
 * (`AndamioLanding`) and the /explore design iterations.
 *
 * Fine-tuning phase: copy is actively being sculpted here. Source prose for the
 * vivid lines lives in the whitepapers; this file is where it's distilled.
 * Per the brand guide §11.1, a copy change is `copy-only` (no brand-guide
 * impact) unless it shifts a §1 voice/tone principle.
 */

export const EXTERNAL_LINKS = {
  docs: "https://docs.andamio.io/docs",
  apiReference: "https://api.andamio.io/reference",
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
  heading: "What can your badges actually do?",
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
  title: "Learn how an Andamio Credential Badge works",
  inspirationCta: "Need inspiration? See ways to use it",
  // Stand-in note shown in design-only iterations where the wired widget is
  // represented as a framed specimen rather than re-built.
  note: "Type below — the rings encode the course_id and slt_hash that identify the credential.",
} as const;

/**
 * Two-product contrast — the map before the deep-dives. Issuer and API are
 * INDEPENDENT products on the same on-chain foundation (not a stack; the API is
 * not the layer Issuer is built on). Axis: Issuer = use it · API = build on it.
 * Differentiator: Issuer = courses · API = courses AND projects.
 */
export const products = {
  heading: "Andamio ships two products",
  subheading: "Which one is for you?",
  items: [
    {
      name: "Andamio Issuer",
      mode: "For organizations · Integrate it",
      // CLAIM SCOPE: "OpenBadges 3.0" here = the credential *format* (live with Credential Badges 1.0).
      // Independent third-party OB3/VC verifiability needs the signing service + did:web, which ship
      // in v1.1 (product-circle#82, Q3). When v1.1 lands, strengthen this to claim verifiable-anywhere
      // interop. Tracked: orch task "Flip OB3 claims to independently-verifiable on v1.1 signing release".
      blurb:
        "Turn the courses you run into credentials you own — the full stack: Andamio’s on-chain protocol and OpenBadges 3.0, non-custodial, integrated with your systems.",
      cta: "Learn more",
      href: "#issuer-detail",
    },
    {
      name: "Andamio API",
      mode: "For developers · Build your own",
      blurb:
        "Build your own apps on Andamio — across courses and projects — with the protocol as REST endpoints.",
      cta: "Learn more",
      href: "#andamio-api",
    },
  ],
  foundationNote:
    "Two independent products, both built on the same audited on-chain primitives.",
} as const;

export const issuer = {
  title: "Andamio Issuer",
  intro:
    "Andamio turns the badges you already issue into credentials you control, on the courses you already run. You get everything a blockchain guarantees, and none of the blockchain to learn.",
  decisionsHeading: "What sets an Andamio credential apart",
  // One-word heading + a single tight line. Source prose lives in the
  // whitepapers; only lines that are already this terse make the cut here.
  decisions: [
    { heading: "Permanent", text: "It outlives whoever issued it." },
    { heading: "Composable", text: "It builds on other credentials." },
    { heading: "Programmable", text: "Software can act on it." },
    { heading: "Private", text: "A diploma is public. The exam papers are not." },
    { heading: "Yours", text: "You define what it certifies." },
    { heading: "Portable", text: "The earner keeps it." },
  ],
  reportCta: "Get the report",
  walkthroughCta: "Book a 20-minute walkthrough",
} as const;

export const ecosystem = {
  lead:
    "A credential means something in your world first, then it goes further than you do.",
  items: [
    {
      title: "Portable",
      body: "Andamio Credential Badges are owned by earners and verifiable anywhere. This means that other project teams, organizations, clubs, or coalitions can decide to make them useful in new ways.",
      cta: { label: "Build with the API", href: EXTERNAL_LINKS.apiReference, variant: "primary" },
    },
    {
      title: "Agent ready",
      body: "Credential Badges can be issued to agents that prove their capabilities, taking the guess-work out of agent delegation and access control.",
      cta: { label: "Coming soon", variant: "disabled" },
    },
    {
      title: "Community",
      body: "Andamio is built in the open, with the people using it. Join the conversation, help shape the roadmap, and build alongside other teams.",
      cta: { label: "Join the Discord", href: EXTERNAL_LINKS.discord, variant: "outline" },
    },
  ],
} as const;

export const api = {
  zoneTitle: "Andamio API",
  zoneBlurb:
    "Build your own apps on Andamio — across courses and projects — with the protocol as REST endpoints. Issue, verify, and gate on credentials from your own stack.",
  heading: "Issue, verify, and gate",
  lead:
    "Andamio is made for developers to build on — courses, projects, and the credentials between them, all over plain REST. Audited smart contracts on Cardano, wrapped as an API. Your stack never touches crypto.",
  // Verb-first capabilities — each maps to real API surface (see openapi).
  capabilities: [
    {
      verb: "Issue",
      text: "Run the credential lifecycle — commit, assess, claim — for courses and projects.",
    },
    {
      verb: "Verify",
      text: "Read the credentials any holder owns, from anywhere.",
    },
    { verb: "Gate", text: "Unlock features by who holds what." },
    {
      verb: "Query",
      text: "Courses, projects, modules, and SLTs as structured data.",
    },
  ],
  apiRefCta: "Read the API reference",
  galleryCta: "See what’s built on Andamio",
  galleryHref: "/showcase",
  // A real call — list the credentials a holder owns (the "gate" request).
  // Path, header, and response shape are the live v2 API (api.andamio.io).
  snippet: {
    label: "Gate by credential",
    request:
      'curl https://api.andamio.io/api/v2/course/student/credentials/list \\\n  -H "X-API-Key: $ANDAMIO_KEY"',
    response: `{
  "data": [
    {
      "course_id": "bike-repair",
      "course_title": "Bike Repair Basics",
      "is_enrolled": true,
      "enrollment_status": "completed",
      "claimed_credentials": ["9b8fa722eac8…"],
      "modules": [
        { "course_module_code": "fix-a-flat",
          "slt_hash": "b1093d4f…",
          "title": "Fix a Flat Tire" }
      ]
    }
  ]
}`,
  },
  // Real top-level resource groups (projects is first-class — the differentiator).
  resourcesLabel: "Resources",
  resources: [
    { name: "Credentials", ops: "list held · claim · assess" },
    { name: "Courses", ops: "modules · SLTs · lessons · assignments" },
    { name: "Projects", ops: "tasks · commitments · contributors" },
    { name: "Transactions", ops: "build & submit on-chain · sponsored" },
  ],
  authNote: "Authenticate with an API key or a wallet JWT.",
} as const;

export const closing = {
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
