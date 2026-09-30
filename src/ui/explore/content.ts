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
  // Canonical API reference host (TECH-02 / UX-07 convergence with src/lib/external-links.ts).
  apiReference: "https://dev.api.andamio.io/reference",
  app: "https://mainnet.app.andamio.io",
  issuerApp: "https://issuer.andamio.io",
  github: "https://github.com/Andamio-Platform",
  cliRepo: "https://github.com/Andamio-Platform/andamio-cli",
  cliReleases:
    "https://github.com/Andamio-Platform/andamio-cli/releases/latest",
  botRepo: "https://github.com/Andamio-Platform/andamio-bot",
  botQuickstart:
    "https://github.com/Andamio-Platform/andamio-bot/blob/main/docs/QUICKSTART.md",
  devRepo: "https://github.com/Andamio-Platform/andamio-dev",
  appTemplate: "https://github.com/Andamio-Platform/andamio-app-template",
  discord: "https://discord.gg/JKgckZGtf",
  linkedin: "https://www.linkedin.com/company/andamio-teams",
  twitter: "https://x.com/andamio_teams",
  walkthroughMailto:
    "mailto:hello@andamio.io?subject=Enterprise%20walkthrough%20request",
} as const;

/** The real credential SVG used in the live hero. Lives in /public. */
export const CREDENTIAL_BADGE_SRC = "/andamio-credential-badge.svg";

export const nav = {
  brand: "Andamio",
  // Nav maps onto the two audiences: Issuer (organizations) + Developers (the
  // developer hub) as the primary entries, with Resources for reference. A menu
  // entry is a dropdown when it has `items`; otherwise it's a plain link. Roadmap
  // and Blog live in the footer only (follow-along content, not conversion paths).
  items: [
    { label: "Issuer", href: "/issuer" },
    {
      // The developer hub: the build-on overview + the two dev tools + reference.
      label: "Developers",
      items: [
        {
          name: "Build on Andamio",
          desc: "The protocol, as REST endpoints.",
          href: "/developers",
        },
        {
          name: "Docs",
          desc: "Guides and protocol.",
          href: EXTERNAL_LINKS.docs,
        },
        {
          name: "API Reference",
          desc: "Interactive endpoint docs.",
          href: EXTERNAL_LINKS.apiReference,
        },
        {
          name: "Reference app",
          desc: "Build from the app template.",
          href: EXTERNAL_LINKS.appTemplate,
        },
        {
          name: "Andamio CLI",
          desc: "Drive the protocol from your terminal.",
          href: "/cli",
        },
        {
          name: "Andamio Discord Bot",
          desc: "Credential-gate your Discord.",
          href: "/bot",
        },
      ],
    },
    {
      label: "Resources",
      items: [
        { name: "Overview", desc: "Introducing Andamio.", href: "/papers" },
        {
          name: "Use cases",
          desc: "How teams put Andamio to work.",
          href: "/use-cases",
        },
      ],
    },
    { label: "Pricing", href: "/pricing" },
    { label: "About", href: "/about" },
  ],
  cta: { label: "Start issuing credentials", href: EXTERNAL_LINKS.issuerApp },
  secondaryCta: { label: "Try the App", href: EXTERNAL_LINKS.app },
} as const;

export const hero = {
  // Hero v3 (2026-07-02, James's walk memo + post-voicemail notes): subvert the
  // StoryBrand form, self-aware — "we are songwriters, aware of the art form."
  // Multi-part on purpose, busier than v2: the artifact itself is the subject
  // ("This is an Andamio credential badge"), the manifesto breaks the fourth
  // wall about what a landing page is, and ONE cta opens the story on the panel
  // below — the page then applies the story as you scroll. Marketing is a power
  // play we didn't build Andamio for, so we don't dress it up; we tell you
  // about it. Prior hero ("Your badge is a picture. / This is a credential.")
  // retired to git history.
  headlineLead: "This is an Andamio",
  headlineAccent: "credential badge.",
  // Short support line for the credential-first hero (UX-02 budget).
  supportLine:
    "Not a picture in someone else's database — a credential you can read, own, and verify.",
  // The manifesto — the fourth-wall move, straight talk (James's wording, 2026-07-02).
  manifesto: [
    "It is a new kind of digital credential, built on a unique set of principles that we believe will change how people build trust on the internet.",
    "We'd like to show you how you can use it, how it's built, and why that matters. We trust that you'll have some good ideas for how to use it.",
  ],
  // The hero's one door: "Show me" navigates to /show-me, the locked
  // full-screen flow (the fork moved off the hero into its own route, 2026-07-02).
  showMeCta: { label: "Show me", href: "/show-me" },
  badgeAlt:
    "A live Andamio credential badge for About Andamio Issuer, anchored on Cardano mainnet. Its course ID and SLT hash are real and verifiable.",
  badgeCaption:
    "A real, verifiable, on-chain credential. The course ID and SLT hash are the Cardano record — copy them, open the course on Andamioscan, or scan to verify.",
} as const;

/** Concise “ordinary badges fail” beats — felt, not attack ads. */
export const ordinaryFail = {
  title: "Most digital badges are rented pictures.",
  lead: "They look finished. They rarely travel, prove, or outlive the vendor.",
  items: [
    {
      heading: "Rental",
      text: "If the platform goes away, the badge goes with it. Ownership was never yours.",
    },
    {
      heading: "Picture",
      text: "Software cannot act on a JPEG. A credential should be useful, not only decorative.",
    },
    {
      heading: "Noise",
      text: "Without proof of work and review inside, badges become wallpaper.",
    },
  ],
} as const;

/** How-path teaser toward /issuer#how-it-works */
export const howTeaser = {
  title: "See the credential take shape.",
  body: "Define targets, walk an illustrative issue and verify — then continue to the real product when you are ready.",
  cta: { label: "See how it works", href: "/issuer#how-it-works" },
} as const;

/**
 * The three lifecycles, one per audience. Home shows all three as sub-tabs;
 * /show-me uses the earner's, /issuer the organization's, /developers the
 * developer's. Steps map to real protocol actions.
 */
export const lifecycles = {
  earner: {
    label: "Earner",
    audience: "For the person who earns the credential",
    steps: [
      {
        id: "enroll",
        label: "Enroll",
        detail:
          "Join a course. Your Access Token is your identity across every Andamio course.",
      },
      {
        id: "submit",
        label: "Submit evidence",
        detail: "Show the work each learning target asks for.",
      },
      {
        id: "review",
        label: "Get reviewed",
        detail: "An authorized reviewer accepts it, or asks for another pass.",
      },
      {
        id: "claim",
        label: "Claim",
        detail:
          "Claim a credential that records what was done and who reviewed it.",
      },
      {
        id: "carry",
        label: "Carry it anywhere",
        detail:
          "It stays yours. Anyone can verify it on Cardano without calling the issuer.",
      },
    ],
  },
  organization: {
    label: "Organization",
    audience: "For the team that adopts and integrates Andamio",
    steps: [
      {
        id: "define",
        label: "Define",
        detail: "Write the skills, the standards and how people prove them.",
      },
      {
        id: "review",
        label: "Review",
        detail: "Your reviewers accept evidence against those standards.",
      },
      {
        id: "issue",
        label: "Issue",
        detail:
          "Accepted work becomes a credential under your issuer identity.",
      },
      {
        id: "verify",
        label: "Verify",
        detail: "Anyone checks it on-chain, from your systems or theirs.",
      },
    ],
  },
  developer: {
    label: "Developer",
    audience: "For the builder working with the API and protocol",
    steps: [
      {
        id: "commit",
        label: "Commit",
        detail: "A user commits to a task or course module through your app.",
      },
      {
        id: "review",
        label: "Review",
        detail: "Assessors accept or refuse the submission on-chain.",
      },
      {
        id: "claim",
        label: "Claim",
        detail:
          "The user claims the credential; your app builds the transaction through the API.",
      },
      {
        id: "gate",
        label: "Gate on it",
        detail:
          "Unlock roles, access or rewards when a wallet holds the credential.",
      },
    ],
  },
} as const;
export type LifecycleKey = keyof typeof lifecycles;

/** Two valid ways to adopt Andamio — shown side by side on home and /issuer. */
export const adoptionModes = {
  title: "Two ways to adopt",
  lead: "How visible the blockchain is to your people is your call.",
  modes: [
    {
      name: "Invisible",
      rows: [
        { k: "wallets", v: "Created for each user at sign-in" },
        { k: "fees", v: "Sponsored by the organization" },
        { k: "user sees", v: "Your product and your sign-in" },
        { k: "example", v: "Barça Fan Lab — fans sign in with BarçaID" },
      ],
      href: "/use-cases/BarcaFanLab",
    },
    {
      name: "Visible",
      rows: [
        { k: "wallets", v: "Earners connect their own Cardano wallet" },
        { k: "fees", v: "Paid by the wallet holder" },
        { k: "user sees", v: "Their wallet, their credential, on-chain" },
        { k: "example", v: "Contributor programs, Andamio app" },
      ],
      href: "/use-cases",
    },
  ],
} as const;

/** Partner marks under the hero; each opens the use case it proves. */
export const proofRail = [
  {
    name: "Intersect",
    src: "/customer/intersect/intersect-logo.png",
    href: "/use-cases/Intersect",
    caption: "Governance",
  },
  {
    name: "Syngenta",
    src: "/customer/syngenta/syngenta-logo.jpg",
    href: "/use-cases/Syngenta",
    caption: "Agronomy",
  },
  { name: "Toha", href: "/use-cases/Toha", caption: "Contributors" },
  {
    name: "Project Catalyst",
    href: "/use-cases/DecentralizedInnovation",
    caption: "Funding",
  },
  {
    name: "FC Barcelona",
    src: "/customer/fcbarcelona/fcbarcelona-logo.webp",
    href: "/use-cases/BarcaFanLab",
    caption: "Fan Lab",
  },
] as const;

/** The independent contract audit (public report on docs.andamio.io). */
export const audit = {
  kicker: "Independent audit",
  title: "Protocol V2 contracts audited by TxPipe",
  body: "Access-token and global-state validators, reviewed for token theft, protocol halting, datum malformation and double satisfaction. Six findings; five resolved, one acknowledged by design.",
  footer: "TxPipe · completed 31 Dec 2025 · read the report →",
  href: "https://docs.andamio.io/docs/security-audit",
} as const;

/** Problem section: a PDF certificate next to a credential, field by field. */
export const problemCompare = {
  pdf: {
    label: "PDF certificate",
    rows: [
      { k: "issuer", v: "A logo in the corner" },
      { k: "evidence", v: "None attached" },
      { k: "reviewer", v: "Unknown" },
      { k: "verify", v: "Email the issuer and wait" },
      { k: "lives in", v: "A vendor's database" },
    ],
  },
  badge: {
    label: "Andamio credential",
    rows: [
      { k: "issuer", v: "did:web:credentials.andamio.io" },
      { k: "evidence", v: "Learning targets, hashed into the badge" },
      { k: "reviewer", v: "Recorded with the claim" },
      { k: "verify", v: "Anyone, on-chain, any time" },
      { k: "lives in", v: "The earner's wallet" },
    ],
  },
} as const;

/** /issuer: what stays in the organization's hands. */
export const issuerControls = {
  title: "What your organization controls",
  lead: "Andamio runs the protocol. The meaning, the people and the data stay with you.",
  rows: [
    {
      k: "issuer identity",
      v: "Your organization, named as issuer on every credential",
    },
    {
      k: "meaning",
      v: "Your skills and learning targets, hashed into each badge (SLT hash)",
    },
    { k: "standard", v: "Open Badges 3.0 credential, anchored on Cardano" },
    { k: "reviewers", v: "Only people you authorize can accept evidence" },
    {
      k: "revocation",
      v: "None by design: a claimed credential can't be switched off, even by you",
    },
    {
      k: "analytics",
      v: "Yours. The protocol records define, evidence, review and claim only",
    },
  ],
} as const;

/** The closing quote: the Cardano Foundation's public launch post. */
export const partnerQuote = {
  text: "FC Barcelona has just launched Barça Fan Lab, developed with @Andamio_teams using Cardano. Fans will be able to learn about Barça's history and values, take part in community activities, and gain verifiable digital credentials…",
  name: "Cardano Foundation",
  role: "on X, 25 Sep 2026",
  href: "https://x.com/Cardano_CF",
} as const;

/**
 * The story fork — the hero's three doors (story-flows storyboard, 2026-07-02).
 * Three buttons, three registers: a statement of situation (the issuer), a
 * statement of intent (the builder), and a question (the curious one — it
 * quotes the manifesto's own first sentence, so the button lives and dies with
 * that line). Each opens a path panel in place below the hero; no gating, the
 * scroll story still runs. Stories may leave the page: issuer choices route to
 * /issuer and /developers directly. Hard rules hold: no "proof of work", no
 * "soulbound", rules language fenced to the programs you run, permanence never
 * leads.
 */
export const storyFork = {
  bridge: "When you are ready — which path fits what you need?",
  statements: [
    { key: "issuer", label: "I need to issue better credentials." },
    { key: "builder", label: "I want to build with this." },
    { key: "curious", label: "I want the principles / story." },
  ],
  // Journey 1 — a three-chapter mini-tour in the promised order (use → built →
  // matters). Chapter one is the panel's opening; the four-layer stack (James's
  // walk memo, 2026-07-02) is chapter two; the blockchain-comfort question
  // moved to the END of chapter three — the visitor routes after the story,
  // not before it. Rule (James): every door's FIRST heading is a sentence
  // starting "You can use Andamio to…". OB3 fence: interop claim only
  // (unsigned until v1.1 signing).
  issuer: {
    heading: "You can use Andamio to issue credentials with the work inside.",
    // No meta subline (James, 2026-07-02: "don't say things like this") — the
    // chapter rail shows the arc; the page doesn't narrate its own structure.
    use: {
      label: "How you can use it",
      // The pattern (Define · Evidence · Review · Claim) folded in from the
      // landing's standalone section (James, 2026-07-02: "fold it in") — the
      // flow is where the pattern is defined now; /issuer still demos it.
      // Rendered as the same numbered list as the layers, name bolded inline.
      lead: "There are no shortcuts, and there are always people in the loop.",
      steps: [
        {
          name: "Define.",
          body: "You say what the credential certifies by writing a set of skills, standards, or learning targets. Then, you define how people will prove that they can do these things.",
        },
        {
          name: "Evidence.",
          body: "Someone commits to the work and submits evidence of what they can do.",
        },
        {
          name: "Review.",
          body: "A reviewer you've authorized checks the work against your standards, and can accept it or ask the learner to re-submit.",
        },
        {
          name: "Claim.",
          body: "After approval, the learner claims a credential that carries what was done, who reviewed it, and what it proves.",
        },
      ],
      close:
        "Your team gets a login, your badges keep their reach, and nothing new lands on your learners.",
      cta: { label: "Look inside one", href: "/issuer" },
      advance: "How it's built",
    },
    built: {
      label: "How it's built",
      heading: "A four-layer stack, from the ground up.",
      // Rendered as one numbered vertical list; `name` is bolded inline and
      // the sentence continues into `body` (no separate headings).
      layers: [
        {
          name: "A blockchain layer",
          body: "validates what the credential represents: who earned it, who submitted the evidence, and who approved it. It also lets an application grant access to credential holders, in a targeted way.",
        },
        {
          name: "An OB3 layer",
          body: "makes your credentials interoperable with the badging systems you already use.",
        },
        {
          name: "A presentation layer",
          body: "is the badge people actually see and share: live, legible, and at home wherever badges already work.",
        },
        {
          name: "A network layer",
          body: "of applications built on the same primitives puts credentials to work.",
        },
      ],
      advance: "Why that matters",
    },
    matters: {
      label: "Why that matters",
      // The landing's "Badges don't build trust" section, fully incorporated
      // into the story (James, 2026-07-02: "deprecated and out of place" on
      // the scroll) — the three villains as the same numbered-list treatment,
      // the stakes line as the close.
      heading: "Badges don’t build trust.",
      lead: "You have good reasons to issue badges, and your badges should do real work. Instead, you’re renting space in a vendor’s database, passing around pictures with nothing inside, and drowning in noise that hides the signal.",
      villains: [
        {
          name: "It’s a rental.",
          body: "A badge lives in your vendor’s database, so they can change it, switch it off, or lose it if they close their doors. They control the records, the rules, and whether any of it survives.",
        },
        {
          name: "It’s a picture, not data.",
          body: "As marketing, badges work — people share them, and you shouldn’t lose that. But a picture is where it ends: no system can act on one, so the automated screening that gates hiring can’t read it. Harvard Business School found 88% of employers say that screening already rejects qualified people who don’t exactly match.",
          source: {
            label: "Fuller et al., Hidden Workers, HBS & Accenture (2021)",
            href: "https://www.hbs.edu/ris/Publication%20Files/hiddenworkers09032021%5FFuller%5Fwhite%5Fpaper%5F33a2047f-41dd-47b1-9a8d-bd08cf3bfa94.pdf",
          },
        },
        {
          name: "It’s just more noise.",
          body: "Badges are cheap to issue in bulk, so there’s no work behind them to check. One you can’t independently verify is taken on faith — no better than the résumé beside it. Peer-reviewed research found 72% of people embellish their résumés, and 31% fabricate outright.",
          source: {
            label:
              "Henle, Dineen & Duffy, Journal of Business and Psychology (2017)",
            href: "https://link.springer.com/article/10.1007/s10869-017-9527-4",
          },
        },
      ],
      close:
        "Trust is expensive to earn and cheap to lose. Bulk badges are noise — a credential only counts when there’s work behind it.",
      question: "So, which is true about you?",
    },
    choices: [
      {
        label:
          "Don't show me the blockchain. I just need to issue better credentials.",
        href: "/issuer",
      },
      {
        label:
          "I'm comfortable with the blockchain. I want to integrate and build.",
        href: "/developers",
      },
      {
        label: "I'm only here as a curious Cardano community member.",
        sub: "cardano",
      },
    ],
  },
  cardano: {
    heading: "Welcome. Here's the short version.",
    body: "Andamio is live on Cardano mainnet: credentials with the work hashed inside, earned one at a time through a commit, review, claim cycle. A credential here isn't an NFT; it's a hash your systems can validate against, and it travels with the person who earned it. Pick your lane.",
    exits: [
      { label: "What's live?", href: "/roadmap" },
      { label: "Try the app", href: EXTERNAL_LINKS.app },
      { label: "The protocol story", href: "/papers/building-on-andamio" },
    ],
  },
  builder: {
    heading:
      "You can use Andamio to build applications where credentials do the work.",
    // Claim softened (James, 2026-07-02): API builders still do wallet
    // integrations — what's abstracted is the transaction building. The real
    // pitch is new primitives, ready for the unimagined.
    body: "Every credential, course, and access rule on Andamio is reachable through one API. Transaction building is abstracted into a clean set of endpoints, so the hardest blockchain work is already done; your users bring a wallet or you sponsor one for them, and the primitives are ready for things we haven't imagined yet. Which door is yours?",
    choices: [
      {
        label: "I'm adding credentials to something that already exists.",
        href: EXTERNAL_LINKS.docs,
      },
      {
        label: "I'm building something new on the protocol.",
        href: "/developers",
      },
      { label: "Neither. I run a community.", href: "/bot" },
    ],
  },
  curious: {
    heading: "You can use Andamio to write your own rules.",
    lead: "We believe that digital badges should have these properties:",
    // Rendered as one numbered vertical list; `term` is bolded inline where it
    // falls in the sentence (no separate headings).
    assumptions: [
      {
        before: "A digital credential should be",
        term: "permanent",
        after: ", not locked in a company's database.",
      },
      {
        before: "A digital credential should be",
        term: "useful",
        after: ", not just a picture.",
      },
      {
        before: "A digital credential should be",
        term: "yours",
        after: ": uniquely defined by its issuer, and owned by its earner.",
      },
      {
        before: "A digital credential should",
        term: "carry proof",
        after:
          ": other people should be able to verify it, and trust that its holder really earned it.",
      },
    ],
    close: "If setting the rules sounds like the fun part, keep going.",
    exits: [
      { label: "Write your own rules", href: "/papers" },
      { label: "Who's already doing it", href: "/use-cases" },
      { label: "What's shipping next", href: "/roadmap" },
    ],
  },
} as const;

// The "Badges don't build trust" section retired from the scroll 2026-07-02
// (James: "deprecated and out of place" on the landing) — fully incorporated
// into the story flow as issuer chapter 3 (storyFork.issuer.matters: the three
// villains + the stakes close). Prose history in git.

export const demo = {
  liveLabel: "Demo",
  title: "Learn how an Andamio Credential Badge works",
  note: "Illustrative walkthrough — Issue and Verify are local UI, not live API success. Type below to see how rings encode course_id and slt_hash.",
} as const;

/**
 * The essential pattern — the work cycle that makes a credential signal.
 * James (2026-07-02): the pattern itself must be defined on the landing page —
 * you define what the credential means, people submit evidence, reviewers
 * review it, and only then is the credential claimed. Issuer-voiced
 * Commit/Review/Claim. The close carries the slow-to-move-fast paradox.
 */
// The standalone pattern section retired 2026-07-02 (James: "fold it in") \u2014
// Define \u00b7 Evidence \u00b7 Review \u00b7 Claim now lives in the story flow's issuer
// chapter 1 (storyFork.issuer.use.steps) and in the /issuer demo. Prose
// history in git.

/** StoryBrand "plan" beat — the three-step path that de-risks issuing. */
/**
 * The /issuer demo's three tabs. Vocabulary aligned to the canonical pattern
 * (define → evidence → review → claim, 2026-07-02 audit): the Issue tab
 * compresses evidence + review + claim into one demo beat, so its copy names
 * all three. A full four-tab restructure is the deeper option if wanted.
 */
export const plan = {
  heading: "Issuing takes three steps",
  steps: [
    {
      title: "Define",
      body: "Say what the credential certifies. You own the meaning.",
    },
    {
      title: "Issue",
      body: "Someone submits evidence, a reviewer you've authorized approves it, and only then is the credential claimed — a few API calls, integrated in minutes.",
    },
    {
      title: "Verify",
      body: "Anyone can check it. No one, not even you, can switch it off.",
    },
  ],
} as const;

/**
 * The developer persona CTA — replaces "One foundation, two products"
 * (James, 2026-07-02): "Build on Andamio" is not a product, and we don't
 * construct one-foundation-two-products. The landing highlights TWO USER
 * STORIES — Andamio Issuers and Andamio Developers. The Issuer section above
 * is story one; this compact CTA is story two, funneling to /developers.
 */
export const developersCta = {
  title: "Andamio Developers",
  lead: "Better digital credentials for a new class of apps.",
  // Claim softened (James, 2026-07-02): builders' users still hold a wallet;
  // the abstraction is the transaction building, and the pitch is the
  // primitives — ready for things we haven't imagined yet.
  body: "Every credential, course, and access rule on Andamio is reachable through one API. Transaction building is abstracted into a clean set of endpoints, so the hardest blockchain work is already done. Your users can connect their own wallet, or you create wallets and sponsor transactions so they never see one. Andamio API delivers a new set of primitives and leaves the creative parts to you.",
  ctas: [
    { label: "Build on Andamio", href: "/developers", variant: "ink" },
    { label: "Docs", href: EXTERNAL_LINKS.docs, variant: "outline" },
  ],
} as const;

export const issuer = {
  title: "Andamio Issuer",
  // The transformation tagline under the product title (candidate #11).
  lead: "From badges to building blocks.",
  // Opens on the both/and (the walk memo): the hero keeps marketing + analytics.
  intro:
    "Keep the signal, tune out the noise, and make every credential yours. Andamio Issuer is a lightweight API that integrates with your existing systems in minutes. You keep your existing infrastructure, get everything a blockchain guarantees, and decide how visible the blockchain is to your people.",
  decisionsHeading: "A new kind of credential",
  // The four-pronged array (fourth pillar "Proof" added 2026-07-02, James):
  // Composable + Programmable fold into "useful"; Private + Portable fold into
  // "yours". Proof = the critical differentiator (no competitor's badge
  // contains the work) + the tracks-vs-doesn't-track line. Paper still carries
  // three decisions pending its next pass — landing leads, paper follows.
  // One-word heading + a single tight line. Source prose lives in the paper.
  decisions: [
    { heading: "Permanent", text: "It outlives whoever issued it." },
    { heading: "Useful", text: "Software can act on it, not just look at it." },
    {
      heading: "Yours",
      text: "You define what it means. The earner keeps it.",
    },
    { heading: "Proof", text: "The work and its review travel inside it." },
  ],
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
  lead: "A credential badge means something in your world first, then it goes further than you do.",
  items: [
    {
      title: "Portable",
      body: "Andamio Credential Badges are owned by earners and verifiable anywhere — each one travels with the person who earned it, not from them. Other project teams, organizations, clubs, or coalitions can decide to make them useful in new ways.",
      cta: {
        label: "Build with the API",
        href: EXTERNAL_LINKS.apiReference,
        variant: "primary",
      },
    },
    {
      title: "Agent ready",
      body: "Credential Badges can be issued to agents that prove their capabilities, taking the guess-work out of agent delegation and access control.",
      status: "In research",
    },
    {
      // Analytics ownership (the walk memo): we don't do surveillance analytics;
      // what the protocol records is the credential loop. Fence: no dashboard
      // claims — "you can build that" keeps it honest.
      title: "Your data",
      body: "Andamio doesn't track how your badges are shared or viewed. That analytics layer is yours: keep the one you have, or build your own. What the protocol records are the interactions behind each credential — defined, evidenced, reviewed, claimed. Nothing more.",
      // Points at the /issuer demo — the pattern's home since the standalone
      // landing section folded into the story flow (2026-07-02).
      cta: {
        label: "See the pattern",
        href: "/issuer#how-it-works",
        variant: "outline",
      },
    },
    {
      title: "Community",
      body: "Andamio is built in the open, with the people using it. Join the conversation, help shape the roadmap, and build alongside other teams.",
      cta: {
        label: "Join the Discord",
        href: EXTERNAL_LINKS.discord,
        variant: "outline",
      },
    },
  ],
} as const;

export const api = {
  heading: "Issue, verify, and gate",
  lead: "The Andamio API backs all of it — courses, projects, and the credentials between them, all over plain REST. Audited smart contracts on Cardano, wrapped as an API — the transaction building is done for you.",
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
  // A real call — list the credentials a holder owns (the "gate" request).
  // Path, header, and response shape are the live v2 API (api.andamio.io).
  // Real Getting Started course, FULL hashes (rule, James 2026-07-02: never
  // truncate a credential address, an slt_hash, or a course_id — a truncated
  // hash can't be validated).
  snippet: {
    label: "Gate by credential",
    request:
      'curl -X POST https://api.andamio.io/api/v2/course/student/credentials/list \\\n  -H "X-API-Key: $ANDAMIO_KEY" \\\n  -H "Authorization: Bearer $USER_JWT"',
    response: `{
  "data": [
    {
      "course_id": "ab5d9217bbbac409ffbe7c8c65d9b358932245079a7f8547a28bc755",
      "course_title": "Getting Started with Andamio",
      "is_enrolled": true,
      "enrollment_status": "completed",
      "claimed_credentials": ["1b37e6b411bc614e9da67943124219053eafa717793e5424f4a33765e42328a3"],
      "modules": [
        { "slt_hash": "1b37e6b411bc614e9da67943124219053eafa717793e5424f4a33765e42328a3",
          "title": "Mint Access Token and Commit to Assignment" }
      ]
    }
  ]
}`,
  },
  // The public Verify endpoints (api.andamio.io/openapi/swagger.public.json):
  // prove a wallet holds an Access Token, get a JWT checkable offline via JWKS.
  // Values are the spec's own examples.
  verify: {
    heading: "Verify a holder",
    lead: "Two calls prove that a wallet holds an Andamio Access Token. The result is a signed JWT you can check offline against the public JWKS.",
    steps: [
      {
        label: "1 · Start a session",
        request: `curl -X POST https://api.andamio.io/api/v2/verify/session \\
  -H "X-API-Key: $ANDAMIO_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"alias": "alice"}'`,
        response: `{
  "session_id": "550e8400-e29b-41d4-a716-446655440000",
  "nonce": "Sign this message to verify Andamio Access Token ownership: a1b2c3d4...",
  "expires_at": "2026-03-10T12:05:00Z"
}`,
      },
      {
        label: "2 · Complete with the CIP-30 signature",
        request: `curl -X POST https://api.andamio.io/api/v2/verify/complete \\
  -H "X-API-Key: $ANDAMIO_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"session_id": "550e8400-...", "signature": { ...CIP-30 signData result... }}'`,
        response: `{
  "verified": true,
  "alias": "alice",
  "wallet_address": "addr1qx2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3jcu5d8ps7zex2k2xt3uqxgjqnnj83ws8lhrn648jjxtwq2ytjqp",
  "attestation_jwt": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9..."
}`,
      },
    ],
    note: "Example values from the public OpenAPI spec. Sessions expire after five minutes; failures return session_expired, invalid_signature or wallet_not_holder.",
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
    sub: "Andamio is a protocol made to be built upon. Every credential on it is backed by real, reviewed work, and your apps can act on that — you query plain REST, and Cardano validators enforce the rules underneath.",
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
        body: "The how behind everything you build here: REST endpoints that wrap those primitives. You query for data and for ready-to-sign transactions; the blockchain enforces the rules. Nothing to build from scratch.",
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
    {
      name: "API Reference",
      desc: "Generated from the spec",
      href: EXTERNAL_LINKS.apiReference,
    },
    {
      name: "The app",
      desc: "Runs on the same API you build on",
      href: EXTERNAL_LINKS.app,
    },
    {
      name: "andamio-dev",
      desc: "The agent knowledge layer",
      href: "https://github.com/Andamio-Platform/andamio-dev",
    },
    {
      name: "andamio-cli",
      desc: "The full transaction lifecycle",
      href: "https://github.com/Andamio-Platform/andamio-cli",
    },
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
    eyebrow: "For developers",
    headline: "The Andamio CLI.",
    sub: "Interact with the Andamio Protocol from your terminal — build, sign, and submit transactions, author courses and projects, and authenticate with your wallet. It's the source of truth for what an Andamio transaction looks like.",
    primaryCta: { label: "Install", href: EXTERNAL_LINKS.cliReleases },
    secondaryCta: { label: "View on GitHub", href: EXTERNAL_LINKS.cliRepo },
  },
  install: {
    heading: "Install",
    note: "macOS, Linux, and Windows — via Homebrew, a prebuilt release binary, or Go.",
    snippets: [
      {
        label: "Homebrew (macOS)",
        code: "brew install Andamio-Platform/tap/andamio-cli",
      },
      {
        label: "Windows (PowerShell)",
        code: `$v = "1.1.2"   # latest release
$dir = "$env:LOCALAPPDATA\\andamio"
Invoke-WebRequest "https://github.com/Andamio-Platform/andamio-cli/releases/download/v$v/andamio_$($v)_windows_amd64.zip" -OutFile andamio.zip
Expand-Archive andamio.zip -DestinationPath $dir -Force
[Environment]::SetEnvironmentVariable("Path", "$([Environment]::GetEnvironmentVariable('Path','User'));$dir", "User")`,
      },
      {
        label: "Linux / release binary",
        code: `VERSION=1.1.2
curl -sLO "https://github.com/Andamio-Platform/andamio-cli/releases/download/v\${VERSION}/andamio_\${VERSION}_linux_amd64.tar.gz"
tar xzf "andamio_\${VERSION}_linux_amd64.tar.gz" && sudo mv andamio /usr/local/bin/`,
      },
      {
        label: "Go",
        code: "go install github.com/Andamio-Platform/andamio-cli/cmd/andamio@latest",
      },
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
    eyebrow: "For communities",
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
    {
      name: "/progress",
      desc: "Your progress per course: accepted, claimed, in progress, not started.",
    },
    {
      name: "/preview",
      desc: "Preview a course's modules and lessons, before connecting.",
    },
    { name: "/logout", desc: "Unlink your Discord account from your alias." },
    { name: "/faq", desc: "A get-started guide, always available." },
    {
      name: "/deny · /allow · /denials",
      desc: "Moderators with Manage Roles can withhold a gated role from a member, and lift it.",
    },
  ],
  // An illustration of the /login → /check flow in Discord's layout. Replace
  // with a real capture when one exists (docs/backlog.md).
  flow: [
    { who: "member", text: "/login" },
    {
      who: "bot",
      text: "Connect your Andamio account: open the hosted login link. Only you can see this.",
    },
    { who: "member", text: "/check" },
    {
      who: "bot",
      text: "You hold 2 of 3 gated credentials. Granted: @Contributor, @Reviewer. Still needed for @Maintainer: Maintainer Onboarding.",
    },
  ],
  noWallet:
    "What you don't need: no wallet, no ADA, no signing, no Cardano knowledge, and no Andamio account to deploy. It's a template — run it against your own Discord server with no code changes.",
  cta: { label: "Get the template", href: EXTERNAL_LINKS.botRepo },
} as const;

// The stakes line moved into the story flow with the problem section
// (storyFork.issuer.matters.close, 2026-07-02).

export const closing = {
  // Philosophical close + movement: the manifesto payoff, then the invite.
  // Opens on the core concept (the walk memo): write your own rules — scoped to
  // your own programs (composability fence: no cross-org enforcement claim).
  headlineLine1: "People want to trust each other.",
  headlineLine2: "We are building an internet where they can.",
  // Two paragraphs, split at "In an internet" (James, 2026-07-02).
  body: [
    "At its core, Andamio is built on one idea: you should be able to write the rules. You say what a credential means, who reviews the work, and what it unlocks in your organization or the apps you are building.",
    "In an internet where anyone can claim anything, Andamio is scaffolding for people to be able to trust each other. We build in the open, and the conversation is happening now. Come get involved.",
  ],
  // Secondary community door. Primary close CTA is issuer.walkthroughCta →
  // EXTERNAL_LINKS.walkthroughMailto (Concept A / UX-03). Copy-only / CTA
  // hierarchy — brand guide §11.1.
  cta: "Join us on Discord",
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
    headline: "Pricing",
    sub: "Andamio offers products for organizations and developers.",
  },
  issuer: {
    audience: "For organizations",
    title: "Andamio Issuer",
    lead: "A plug and play digital credential layer that integrates seamlessly with your existing systems.",
    meteringHeading: "You pay for three things",
    meteringNote:
      "Defining credentials is free. You draw down an allocation only when a credential is actually earned, and top up if you exceed it.",
    levers: [
      {
        name: "Users",
        text: "Each learner, counted once when they first join.",
      },
      {
        name: "Badges",
        text: "Credentials actually earned, counted on real issuance.",
      },
      {
        name: "Courses",
        text: "A set of linked credentials that create a learning pathway.",
      },
    ],
    tiers: [
      {
        name: "Pilot",
        price: "Soon",
        priceNote: "self-serve",
        users: "—",
        badges: "—",
        courses: "—",
        muted: true,
      },
      {
        name: "Starter",
        price: "Soon",
        priceNote: "self-serve",
        users: "—",
        badges: "—",
        courses: "—",
        muted: true,
      },
      {
        name: "Growth",
        price: "$12,000",
        priceNote: "/ year",
        users: "250",
        badges: "1,250",
        courses: "3",
      },
      {
        name: "Scale",
        price: "$30,000",
        priceNote: "/ year",
        users: "1,000",
        badges: "5,000",
        courses: "5",
      },
      {
        name: "Custom",
        price: "Contact us",
        priceNote: "",
        users: "—",
        badges: "—",
        courses: "—",
      },
    ],
    footnote:
      "Every lever tops up. Badges are a starting allocation, not a cap. Pilot and Starter self-serve tiers arrive with the in-app billing motion.",
    cta: { label: "Book a walkthrough" },
  },
  api: {
    audience: "For developers",
    title: "Andamio API",
    lead: "Everything you need to build on Andamio: the protocol as REST endpoints. Self-serve via Stripe, monthly.",
    tiers: [
      {
        name: "Free",
        price: "$0",
        priceNote: "",
        limits: "15K req/mo · 500 req/day · 1 API key",
        muted: true,
      },
      {
        name: "Starter",
        price: "$29",
        priceNote: "/ mo",
        limits: "75K req/mo · 2,500 req/day · 2 API keys",
      },
      {
        name: "Growth",
        price: "$129",
        priceNote: "/ mo",
        limits: "750K req/mo · 25,000 req/day · 5 API keys",
      },
      {
        name: "Enterprise",
        price: "Custom",
        priceNote: "",
        limits: "Custom quota · priority support",
      },
    ],
    footnote:
      "Subscribe in the app after connecting your wallet. Usage is billed to you, the developer, not your end users.",
    cta: { label: "Open the app" },
  },
  // Rendered on the page and as FAQPage JSON-LD; keep answers plain text.
  faq: [
    {
      q: "Are Andamio Issuer and the Andamio API the same product?",
      a: "No. They are priced and sold separately. Issuer is managed credentials for organizations, billed annually. The API is self-serve protocol access for developers, billed monthly. A tier name that appears in both means different things.",
    },
    {
      q: "What counts as a badge?",
      a: "A credential someone actually earns. Defining credentials is free; your allocation is drawn down only on real issuance.",
    },
    {
      q: "What happens if we go over our allocation?",
      a: "You top up. Every lever (users, badges, courses) is a starting allocation, not a cap.",
    },
    {
      q: "Do our learners need a crypto wallet?",
      a: "Not necessarily. You choose how visible the blockchain is. In the invisible mode, as in Barça Fan Lab, people sign in with an account they already have, a wallet is created for them and transactions are sponsored.",
    },
    {
      q: "Who pays for API usage?",
      a: "You, the developer. Subscribe in the app after connecting your wallet; your end users are never billed.",
    },
    {
      q: "When do the Pilot and Starter tiers arrive?",
      a: "With the in-app billing for Issuer. Until then, book a walkthrough and we will size a plan with you.",
    },
  ],
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
      { name: "Roadmap", href: "/roadmap" },
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
