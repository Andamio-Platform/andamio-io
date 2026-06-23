/**
 * Canonical cross-site URLs for the Andamio ecosystem.
 *
 * All cross-site links across components should reference these constants
 * instead of hardcoding URLs. This prevents URL drift across the codebase.
 *
 * Label vocabulary:
 *   "Docs"          → docs (guides, protocol, tutorials)
 *   "API Reference" → apiReference (interactive Scalar endpoint docs)
 *   "Get Started"   → app (wallet connection, API keys)
 */
export const EXTERNAL_LINKS = {
  docs: "https://docs.andamio.io/docs",
  // The whitepaper now lives on the landing site itself (/whitepaper), derived
  // from ecosystem-enterprise/papers/. Flipping this constant repoints every
  // reference (nav, footer, V2 sections, about) to the internal route.
  docsWhitepaper: "/whitepaper",
  docsGettingStarted: "https://docs.andamio.io/docs/guides/getting-started",
  apiReference: "https://dev.api.andamio.io/reference",
  app: "https://mainnet.app.andamio.io",
  github: "https://github.com/Andamio-Platform",
  discord: "https://discord.gg/FtvpAYnBMU",
  linkedin: "https://www.linkedin.com/company/andamio-platform",
  twitter: "https://x.com/AndamioPlatform",
} as const;
