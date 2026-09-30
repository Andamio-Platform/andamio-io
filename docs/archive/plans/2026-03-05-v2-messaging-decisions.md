# V2 Landing Page — Messaging Decisions

**Date:** 2026-03-05
**Branch:** `landing-page-v2-api-first`
**Status:** In progress — testing on localhost:3002

---

## Target Audiences

### Primary: Program Owners / Decision Makers
- People at organizations (NGOs, enterprises, DAOs, universities) who need credentialing
- They evaluate tools, sign contracts, care about: cost, trust, compliance, ease of adoption
- They do NOT know what "eUTXO" or "self-sovereign" means — and shouldn't have to

### Secondary: Developers / Technical Integrators
- Engineers tasked with evaluating or building the integration
- They care about: API quality, documentation, smart contract transparency, SDK maturity
- They DO want to see the curl example, the architecture diagram, the audit details

---

## Page Scroll Strategy

The page is structured as a funnel — program owners read top-to-bottom, developers skip to their sections:

| Section | Primary Audience | Role |
|---------|-----------------|------|
| Hero | Program Owners | Hook on the outcome |
| Pillars (Onboard/Track/Reward) | Program Owners | Value chain in their language |
| Architecture | Both | Bridge — simple for buyers, detailed for devs |
| Code Section | Developers | Technical proof — "this is real, this is clean" |
| Comparison | Program Owners | Competitive positioning in business terms |
| Partners | Program Owners | Social proof |
| Pricing | Both | Business terms (buyers), API call limits (devs) |
| FAQ | Both | Address objections from both sides |
| Status | Both | Transparency builds trust with everyone |
| CTA Footer | Split | Two cards — one per audience |

---

## Hero Headline Decision

### Final choice
> **The credentialing protocol for verifiable work**

### Subtitle
> Issue credentials via API. Portable, permanent, and owned by the people who earned them.

### Why this headline

The value proposition is deeper than "trustable credentials." The real differentiator is:

1. **Verified skills automate access to work** — no background checks, no reference calls, no manual verification. Because credentials are on-chain and auditable, access to tasks and opportunities can be automated.

2. **Shared protocol = full portability** — credentials work across every app on the protocol. Users aren't locked into one platform. What they learn in your app is usable everywhere.

3. **Two-sided network effect** — organizations get access to a growing pool of verified contributors. Users are incentivized to join because your opportunities are just one node in a larger network.

4. **Network dynamics reduce fraud** — at scale, the reputation system makes gaming the system economically irrational, reducing the need for centralized trust checks.

"The credentialing protocol for verifiable work" captures this by emphasizing:
- **"Protocol"** — shared infrastructure, not a walled garden
- **"Credentialing"** — the process/activity (not a technical spec)
- **"Verifiable work"** — the outcome that matters (proof you can act on)

### Rejected alternatives and why

| Headline | Why rejected |
|----------|-------------|
| "Decentralized Credentialing Infrastructure" | Feature-descriptive, not outcome-oriented. Tells what Andamio *is*, not what it *does for you*. |
| "Credentials that belong to your people" | "Your people" sounds paternalistic/weird. |
| "Build credentials anyone can trust" | Sounds like telling the user to build something. Doesn't communicate the protocol/network value. |
| "Verified skills. Trusted everywhere." | Good but doesn't convey the "work" outcome. |
| "Verified once. Recognized everywhere." | Close, but too generic — could describe any certification. |

---

## Key Copy Principles Applied

### From brand guidelines
- **Use "you" more than "we"** — FAQ answers rewritten to lead with "your credentials", "your users", "your organization"
- **Focus on outcomes** — pillars describe what changes for the org, not the technical mechanism
- **No jargon walls** — "self-sovereign" replaced with "owned by the people who earned them"; "primitives" replaced with "building blocks"
- **Don't overpromise** — "15 minutes" claim removed; cost figures marked with asterisks

### Audience-specific language
- **For program owners:** "No more lost certificates", "built-in accountability", "private by design"
- **For developers:** Accurate API examples (X-API-Key, CBOR response, 2-step flow), architecture diagram, audit details

---

## Copy Editing Constraints (Accuracy & Legal)

These changes were made to ensure accuracy and reduce legal risk:

| Change | Reason |
|--------|--------|
| Removed FC Barcelona from everywhere | Need written permission to use their name |
| Removed "no blockchain expertise required" | Was used in Hero and Pricing — overpromises |
| Removed all commission percentages | Not finalized |
| Removed Transaction Sponsorship Bundles table | Details not confirmed |
| Removed "Course & project hosting" from free tier | Not confirmed as included |
| Cost figures ($0.17, $17K) marked with asterisks | Approximate — depends on tx complexity and network conditions |
| "GDPR compliant" → "Private by design" | GDPR compliance is a legal claim that requires formal verification |
| "Open source" claims softened | Smart contracts are not yet open source |
| "SDK" removed from Architecture card | SDK V2 is under development (per Status section) |
| API examples updated to accurate format | X-API-Key auth (not Bearer), CBOR response (not JSON), 2-step flow (not single call) |
| Partner statuses updated | Intersect → "Enterprise Trial (V2)", Toha → "Planning Phase" |
| Andamioscan → "Live" | Was listed as "coming soon" but is actually live |
| SDK V2 → "Under development" | Was listed as "seeking funding" |
| CTA links fixed | `/customers` and `/contact` pages don't exist — replaced with `#partners` anchor and `mailto:hello@andamio.io` |

---

## Status Section Language

Changed from "We believe in transparency" to "Full transparency" — reduces "we" usage per brand guidelines while maintaining the same meaning.
