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
  // Two rich click-open dropdown cards (Products, Resources) + flat links.
  // A menu entry is a dropdown when it has `items`; otherwise it's a plain link.
  // `soon: true` marks a destination that isn't live yet (rendered non-clickable).
  items: [
    {
      label: "Products",
      items: [
        { name: "Andamio Issuer", desc: "Issue credentials your organization controls.", href: "/#issuer" },
        { name: "Andamio API", desc: "The protocol, as REST endpoints.", href: "/#andamio-api" },
        { name: "Andamio Bot", desc: "Credential-gate your Discord.", href: "#", soon: true },
        { name: "Credential Badges", desc: "Permanent, useful, yours.", href: "#", soon: true },
      ],
    },
    {
      label: "Resources",
      items: [
        { name: "Overview", desc: "Introducing Andamio.", href: "/whitepaper" },
        { name: "Docs", desc: "Guides and protocol.", href: EXTERNAL_LINKS.docs },
        { name: "API Reference", desc: "Interactive endpoint docs.", href: EXTERNAL_LINKS.apiReference },
        { name: "Use cases", desc: "How teams put Andamio to work.", href: "/use-cases" },
      ],
    },
    { label: "Roadmap", href: "/roadmap" },
    { label: "Blog", href: "/blog" },
    { label: "About", href: "/about" },
  ],
  cta: { label: "Open the App", href: EXTERNAL_LINKS.app },
} as const;

export const hero = {
  // StoryBrand working draft (headline still in exploration) — the Character
  // beat: the issuer whose mission is to be trusted. `Badges` is accented.
  headlineLead: "Own Your",
  headlineAccent: "Badges",
  subhead: "You issue credentials to be trusted. Andamio makes them permanent, useful, and yours.",
  primaryCta: { label: "Andamio Issuer", href: "#issuer" },
  // Developer CTA: a value prop, not the product name (team feedback).
  secondaryCta: { label: "Build on Andamio", href: "#andamio-api" },
  badgeAlt:
    "An Andamio credential, Getting Started with Andamio. Its rings encode the course it came from, and what it certifies.",
  badgeCaption:
    "A real Andamio credential. Its rings encode where it came from and what it certifies.",
} as const;

export const problem = {
  heading: "Badges don’t build trust",
  intro:
    "The digital credential most organizations issue is a badge, and it falls short in three ways.",
  items: [
    {
      headline: "It’s a rental",
      body: "A badge lives in your vendor’s database, so they can change it, switch it off, or lose it if they close their doors. They control the records, the rules, and whether any of it survives.",
    },
    {
      headline: "It’s a picture, not data",
      body: "A badge can be shared on LinkedIn, but no system can act on it. It isn’t structured data, so the automated screening that gates hiring can’t read it. Harvard Business School found 88% of employers say that screening already rejects qualified people who don’t exactly match.",
    },
    {
      headline: "It’s just a claim",
      body: "A badge you can’t independently verify is taken on faith, no better than the résumé beside it. Peer-reviewed research found 72% of people embellish their résumés, and 31% fabricate outright.",
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

/** StoryBrand "plan" beat — the three-step path that de-risks issuing. */
export const plan = {
  heading: "Issuing takes three steps",
  steps: [
    { title: "Define", body: "Say what the credential certifies. You own the meaning." },
    { title: "Issue", body: "A few API calls, integrated in minutes. No wallets or keys for your team to hold." },
    { title: "Verify", body: "Anyone can check it. No one, not even you, can switch it off." },
  ],
} as const;

/**
 * Two-product contrast — the map before the deep-dives. Issuer and API are
 * INDEPENDENT products on the same on-chain foundation (not a stack; the API is
 * not the layer Issuer is built on). Axis: Issuer = use it · API = build on it.
 * Differentiator: Issuer = courses · API = courses AND projects.
 */
export const products = {
  heading: "One foundation, two products",
  subheading: "You've met the Issuer. Developers build on the same protocol directly.",
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
    "A credential is only as good as the trust people put in it. Andamio turns the badges you already issue into credentials you control, on the courses you already run: everything a blockchain guarantees, and none of the blockchain to learn.",
  decisionsHeading: "Permanent, useful, and yours",
  // The three-pronged array, matching the Andamio Issuer paper: Composable +
  // Programmable fold into "useful"; Private + Portable fold into "yours".
  // One-word heading + a single tight line. Source prose lives in the paper.
  decisions: [
    { heading: "Permanent", text: "It outlives whoever issued it." },
    { heading: "Useful", text: "Software can act on it, not just look at it." },
    { heading: "Yours", text: "You define what it means. The earner keeps it." },
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

/** StoryBrand "avoid failure" beat — the stakes, one line before the close. */
export const stakes = {
  line: "Trust is expensive to earn and cheap to lose. A credential you don't control is a promise you can't keep.",
} as const;

export const closing = {
  headlineLine1: "Own the trust you build,",
  headlineLine2: "and watch it compound.",
  body: "Twenty minutes. We scope a pilot on one of your programs and show you the credentials working. No slides.",
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
