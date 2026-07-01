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
  cliRepo: "https://github.com/Andamio-Platform/andamio-cli",
  cliReleases: "https://github.com/Andamio-Platform/andamio-cli/releases/latest",
  botRepo: "https://github.com/Andamio-Platform/andamio-bot",
  botQuickstart: "https://github.com/Andamio-Platform/andamio-bot/blob/main/docs/QUICKSTART.md",
  devRepo: "https://github.com/Andamio-Platform/andamio-dev",
  appTemplate: "https://github.com/Andamio-Platform/andamio-app-template",
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
        { name: "Andamio Issuer", desc: "Issue credentials your organization controls.", href: "/issuer" },
        { name: "Build on Andamio", desc: "The protocol, as REST endpoints.", href: "/developers" },
        { name: "Andamio CLI", desc: "Drive the protocol from your terminal.", href: "/cli" },
        { name: "Andamio Bot", desc: "Credential-gate your Discord.", href: "/bot" },
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
    { label: "Pricing", href: "/pricing" },
    { label: "Developers", href: "/developers" },
    { label: "Roadmap", href: "/roadmap" },
    { label: "Blog", href: "/blog" },
    { label: "About", href: "/about" },
  ],
  cta: { label: "Open the App", href: EXTERNAL_LINKS.app },
} as const;

export const hero = {
  // Hero headline: the badge/credential contrast (candidate #18). States what
  // Andamio provides, no trust-as-headline (which has confused people over the
  // years), no fear, no "future of". The trust story lives in subhead + close.
  headlineLead: "Your badge is a picture.",
  headlineAccent: "This is a credential.",
  subhead: "You're building something real in a world short on trust. Andamio makes the credentials you issue believable: permanent, useful, and yours.",
  primaryCta: { label: "Andamio Issuer", href: "#issuer" },
  // Developer CTA: a value prop, not the product name (team feedback). Points at
  // the builder-movement section, which funnels to the /developers page.
  secondaryCta: { label: "Build on Andamio", href: "#products" },
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
  // Lead into the builder movement (candidate #6): the credential is active,
  // not static — which is why there's something to build on.
  lead: "Credentials that do more than sit there.",
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
      name: "Build on Andamio",
      mode: "For developers · Build your own",
      blurb:
        "Build your own apps on Andamio — across courses and projects — with the protocol as REST endpoints.",
      cta: "Explore the developer platform",
      href: "/developers",
    },
  ],
  foundationNote:
    "Two independent products, both built on the same audited on-chain primitives.",
} as const;

export const issuer = {
  title: "Andamio Issuer",
  // The transformation tagline under the product title (candidate #11).
  lead: "From badges to building blocks.",
  intro:
    "A credential is only as good as the trust people put in it. Andamio turns the badges you already issue into credentials you control, on the courses you already run: everything a blockchain guarantees, and none of the blockchain to learn.",
  decisionsHeading: "A new kind of credential",
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
  // Landing teaser → the dedicated /issuer page (demo + full product funnel).
  learnMoreCta: "See how Andamio Issuer works",
  // /issuer page-level framing.
  page: {
    overviewCta: "← Andamio overview",
    demoLead:
      "Three steps to a credential your organization controls. Try each one.",
  },
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

/**
 * /developers — "Build on Andamio", distilled from the Building on Andamio
 * paper (ecosystem-enterprise/papers/building-on-andamio.md, canonical). The
 * landing retires its "Andamio API" deep-dive into a CTA that funnels here;
 * this page carries the depth. The technical proof block (capabilities + a real
 * call + resources) reuses the `api` export above.
 */
export const developers = {
  hero: {
    eyebrow: "For developers",
    headline: "Build on Andamio.",
    sub: "Andamio is a protocol made to be built upon. Issue, verify, and gate on credentials from your own stack — you query plain REST, and Cardano validators enforce the rules underneath. Your stack never touches crypto.",
    primaryCta: { label: "Read the docs", href: EXTERNAL_LINKS.docs },
    secondaryCta: { label: "API reference", href: EXTERNAL_LINKS.apiReference },
  },
  levels: {
    heading: "Two levels to build on",
    items: [
      {
        heading: "The on-chain layer",
        body: "Cardano validators and minting policies enforce who can issue a credential, who can review work, and what has to be true before a badge is earned. On-chain, a credential is a hashed artifact on a public ledger — not a picture, not a database row.",
      },
      {
        heading: "The Andamio API",
        body: "REST endpoints that wrap those primitives. You query for data and for ready-to-sign transactions; the blockchain enforces the rules. Nothing to build from scratch.",
      },
    ],
  },
  loop: {
    heading: "One loop, every credential",
    sub: "Course assignment or Project task — every credential runs the same three steps, and a validator checks each role's authority on every transaction.",
    steps: [
      {
        heading: "Commit",
        body: "An Access Token holder commits to a piece of work. The definition is hashed at that moment, so the on-chain record is what they agreed to do.",
      },
      {
        heading: "Review",
        body: "The holder submits evidence; an on-chain-authorized reviewer accepts it, or refuses with specific feedback, against the work's learning targets.",
      },
      {
        heading: "Claim",
        body: "On a pass, the credential attaches to the holder's identity — carrying who committed, what they agreed to, who reviewed, and when.",
      },
    ],
  },
  paths: {
    heading: "Two ways to build",
    items: [
      {
        name: "Create your own",
        body: "Call the API to create a Course or Project. You get an ID that's yours and published on-chain — now you're an issuer: you define what credentials mean, and every one earned against them carries your policy. Start from the app template.",
        cta: "andamio-app-template",
        href: "https://github.com/Andamio-Platform/andamio-app-template",
      },
      {
        name: "Build on existing work",
        body: "You don't have to own a Course or Project to build on one. Build a dashboard over a partner's credentials, a verifier, a directory, or an agent that commits on someone's behalf. Credentials are public and composable by design.",
        cta: "Read the API reference",
        href: EXTERNAL_LINKS.apiReference,
      },
    ],
  },
  agent: {
    heading: "Hand it to your agent",
    body: "Andamio's developer surface is small enough to give to an agent. Point it at andamio-dev — the knowledge layer that teaches it the protocol and estimates costs — and it drives the Andamio CLI to build, sign, and submit transactions for you.",
  },
  resourcesHeading: "Everything you need",
  resources: [
    { name: "Docs", desc: "Guides and protocol", href: EXTERNAL_LINKS.docs },
    { name: "API Reference", desc: "Generated from the spec", href: EXTERNAL_LINKS.apiReference },
    { name: "The app", desc: "Runs on the same API you build on", href: EXTERNAL_LINKS.app },
    { name: "andamio-dev", desc: "The agent knowledge layer", href: "https://github.com/Andamio-Platform/andamio-dev" },
    { name: "andamio-cli", desc: "The full transaction lifecycle", href: "https://github.com/Andamio-Platform/andamio-cli" },
    { name: "GitHub", desc: "All the source", href: EXTERNAL_LINKS.github },
  ],
  cta: { label: "Read the docs", href: EXTERNAL_LINKS.docs },
} as const;

/**
 * /cli — the Andamio CLI product page. Grounded in the andamio-cli README:
 * runs the transaction lifecycle, authors courses/projects, authenticates by
 * wallet signing. Cross-platform (Homebrew · release binary · go install).
 */
export const cli = {
  hero: {
    eyebrow: "Developer tool",
    headline: "The Andamio CLI.",
    sub: "Interact with the Andamio Protocol from your terminal — build, sign, and submit transactions, author courses and projects, and authenticate with your wallet. It's the source of truth for what an Andamio transaction looks like.",
    primaryCta: { label: "Install", href: EXTERNAL_LINKS.cliReleases },
    secondaryCta: { label: "View on GitHub", href: EXTERNAL_LINKS.cliRepo },
  },
  install: {
    heading: "Install",
    note: "macOS, Linux, and Windows — via Homebrew, a prebuilt release binary, or Go.",
    snippets: [
      { label: "Homebrew (macOS)", code: "brew install Andamio-Platform/tap/andamio-cli" },
      { label: "Go", code: "go install github.com/Andamio-Platform/andamio-cli/cmd/andamio@latest" },
    ],
    verify: "andamio --version",
  },
  does: {
    heading: "What it does",
    items: [
      {
        heading: "Run the transaction lifecycle",
        body: "Build, sign, submit, register, and confirm Andamio transactions on-chain — the full loop from one tool.",
      },
      {
        heading: "Author courses & projects",
        body: "Create courses and projects, register modules and tasks, and import lesson content, straight from the terminal.",
      },
      {
        heading: "Authenticate",
        body: "Log in by signing with your wallet to prove ownership of your Access Token, and get a JWT for the API.",
      },
    ],
  },
  agentNote:
    "The CLI is also how an agent acts on Andamio: point andamio-dev at it and it builds, signs, and submits transactions for you.",
  cta: { label: "Read the docs", href: EXTERNAL_LINKS.docs },
} as const;

/**
 * /bot — the AndamioBot product page. Grounded in the andamio-bot README: a
 * reusable Discord bot that reads members' credentials and gates roles, with no
 * wallet handling by adopters or members. Deployable as a template, no code.
 */
export const bot = {
  hero: {
    eyebrow: "Product",
    headline: "Credential-gate your Discord.",
    sub: "AndamioBot reads each member's on-chain Andamio credentials and grants Discord roles based on what they hold. No wallet handling — for you or your members. Login is delegated to the hosted Andamio app; the bot never touches a wallet, seed, or key.",
    primaryCta: { label: "Get the template", href: EXTERNAL_LINKS.botRepo },
    secondaryCta: { label: "Quickstart", href: EXTERNAL_LINKS.botQuickstart },
  },
  how: {
    heading: "How it works",
    items: [
      {
        heading: "Members log in",
        body: "A member runs /login and authenticates in their browser via the hosted Andamio app. The bot stores a Discord-to-alias link — never a wallet, seed, or key.",
      },
      {
        heading: "The bot reads credentials",
        body: "It reads each member's earned credentials from the authenticated Andamio API — /credentials shows their inventory, /available shows what your server gates on.",
      },
      {
        heading: "Roles gate automatically",
        body: "Members are granted Discord roles based on the credentials they hold. /check re-reads live and refreshes roles on demand.",
      },
    ],
  },
  commandsHeading: "The commands",
  commands: [
    { name: "/login", desc: "Link a Discord account to an Andamio alias." },
    { name: "/credentials", desc: "See the credentials you've earned." },
    { name: "/available", desc: "See what this server gates on, held or not." },
    { name: "/check", desc: "Re-read credentials live and refresh roles." },
    { name: "/faq", desc: "A get-started guide, always available." },
  ],
  noWallet:
    "What you don't need: no wallet, no ADA, no signing, no Cardano knowledge, and no Andamio account to deploy. It's a template — run it against your own Discord server with no code changes.",
  cta: { label: "Get the template", href: EXTERNAL_LINKS.botRepo },
} as const;

/** StoryBrand "avoid failure" beat — the stakes, one line before the close. */
export const stakes = {
  line: "Trust is expensive to earn and cheap to lose. A credential you don't control is a promise you can't keep.",
} as const;

export const closing = {
  // Philosophical close + movement: the manifesto payoff, then the invite.
  headlineLine1: "Greater trust is possible.",
  headlineLine2: "Let's build it.",
  body: "In an internet where anyone can claim anything, a credential people can verify is the foundation. Issue ones people believe, and join the teams building a more trustworthy internet. Twenty minutes, we'll scope a pilot on one of your programs. No slides.",
  cta: "Book a 20-minute walkthrough",
} as const;

/**
 * Pricing — two DISTINCT products, priced and sold separately (P-015). A tier
 * name that appears in both ("Starter", "Growth", "Enterprise") means different
 * things — the page always says which product.
 *
 * SOURCES OF TRUTH:
 *   Issuer → product-circle/pricing/product-and-pricing-summary.md (P-015, the
 *            consented model: Scale $30k, 5x badge allocations, Pilot/Starter
 *            self-serve TBD, Custom = "Contact us"). Sales-led, annual.
 *   API    → andamio-app-v2/src/config/billing.ts (LIVE, wired to Stripe).
 *            Self-serve, monthly. Mirror only — subscribe happens in the app.
 */
export const pricing = {
  hero: {
    kicker: "Pricing",
    headline: "Two products, priced separately.",
    sub: "Andamio Issuer is a managed credential layer for organizations, sold as an annual contract. The Andamio API is self-serve access to the protocol for developers. They share protocol internals — neither depends on the other.",
  },
  issuer: {
    audience: "For organizations",
    title: "Andamio Issuer",
    lead: "A managed course-credential layer. Sales-led, annual contract.",
    meteringHeading: "You pay for three things",
    meteringNote:
      "Defining credentials is free. You draw down an allocation only when a credential is actually earned, and top up if you exceed it.",
    levers: [
      { name: "Users", text: "Each learner, counted once when they first join." },
      { name: "Badges", text: "Credentials actually earned, counted on real issuance." },
      { name: "Courses", text: "A set of linked credentials — a learning pathway." },
    ],
    tiers: [
      { name: "Pilot", price: "Soon", priceNote: "self-serve", users: "—", badges: "—", courses: "—", muted: true },
      { name: "Starter", price: "Soon", priceNote: "self-serve", users: "—", badges: "—", courses: "—", muted: true },
      { name: "Growth", price: "$12,000", priceNote: "/ year", users: "250", badges: "~1,250", courses: "3", recommended: true },
      { name: "Scale", price: "$30,000", priceNote: "/ year", users: "1,000", badges: "~5,000", courses: "5" },
      { name: "Custom", price: "Contact us", priceNote: "", users: "—", badges: "—", courses: "—" },
    ],
    footnote:
      "Growth ($12k / 250 users) is where cohort programs land; Scale is priced so upgrading beats Growth-plus-top-ups from ~900 users. Every lever tops up — badges are a starting allocation, not a cap. Pilot and Starter self-serve tiers arrive with the in-app billing motion.",
    cta: { label: "Book a 20-minute walkthrough" },
  },
  api: {
    audience: "For developers",
    title: "Andamio API",
    lead: "Programmatic access to the protocol as REST endpoints. Self-serve via Stripe, monthly.",
    tiers: [
      { name: "Free", price: "$0", priceNote: "", limits: "15K req/mo · 500 req/day · 1 API key", muted: true },
      { name: "Starter", price: "$29", priceNote: "/ mo", limits: "75K req/mo · 2,500 req/day · 2 API keys" },
      { name: "Growth", price: "$129", priceNote: "/ mo", limits: "750K req/mo · 25,000 req/day · 5 API keys", recommended: true },
      { name: "Enterprise", price: "Custom", priceNote: "", limits: "Custom quota · priority support" },
    ],
    footnote:
      "Subscribe in the app after connecting your wallet. Usage is billed to you, the developer, not your end users.",
    cta: { label: "Open the app" },
  },
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
