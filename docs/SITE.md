# Andamio site handbook

The marketing site for [andamio.io](https://www.andamio.io/). It explains the credential, shows who already uses it, and routes organizations to a walkthrough and developers to the docs.

## Repos

| Remote | Repo | Role |
| --- | --- | --- |
| `org` | [Andamio-Platform/andamio-io](https://github.com/Andamio-Platform/andamio-io) | Canonical home. Not a fork of andamio-platform. |
| `origin` | [MIxAxIM/landing-page-and-blog](https://github.com/MIxAxIM/landing-page-and-blog) | Personal backup. |
| `upstream` | Andamio-Platform/landing-page-and-blog | The old fork. Push is disabled. Rename, point its README here, then archive it ([issue 2](https://github.com/Andamio-Platform/andamio-io/issues/2)). |

`dev` is the working branch. It is also published as `main` on `andamio-io`.

## Sitemap

Live routes, and only these, are in `src/app/sitemap.ts`.

| Route | What it is |
| --- | --- |
| `/` | The credential, the proof rail, the problem, issuer, developers, ecosystem |
| `/show-me` | The earner's story |
| `/issuer` | How an organization issues |
| `/pricing` | Issuer (annual) and API (monthly), plus the FAQ |
| `/use-cases` | Sector filter, then one template per partner |
| `/use-cases/BarcaFanLab` | FC Barcelona, launched 25 Sep 2026 |
| `/use-cases/Intersect` | Maintainer retainers |
| `/use-cases/Syngenta` | Field experts. Outcomes are targets |
| `/use-cases/Toha` | Nature regeneration. Email sign-up |
| `/use-cases/DecentralizedInnovation` | A proposed reviewer ladder, not a live deployment |
| `/use-cases/LeadGenDAO` | LeadGen DAO, created by ELK |
| `/developers`, `/cli`, `/bot` | Build on the API, the CLI, the Discord bot |
| `/papers` and `/papers/[slug]` | Introducing Andamio, Issuer, Building on Andamio, glossary |
| `/blog` | Journal, newest first |
| `/roadmap` | Product releases, then Catalyst history |
| `/community` | Discord, calendar, Funds 10–14 |
| `/about` | Timeline, audit, team, `#contact` |
| `/privacy-policy`, `/terms` | Legal |

`/brand`, `/brand/developers`, and `/brand/flyer` stay in the repo for local development (`npm run dev`). A production build returns 404 for that tree.

### Redirects

Permanent, in `next.config.js`.

| From | To |
| --- | --- |
| `/contact` | `/about#contact` |
| `/customers` and `/customers/*` | `/use-cases` |
| `/explore/concept-a` | `/` |
| `/explore/system` | `/brand` |
| `/about/whitepaper` | `/papers` |
| `/about/our-team` | `/about#team` |
| `/about/our-technology` | `/about#technology` |
| `/summit` | `/community` |
| `/calendar` | `/community#calendar` |
| `/fund/12`, `/fund/14` | `/community#catalyst` |
| `/use-cases/FanEngagement` | `/use-cases/BarcaFanLab` |
| `/use-cases/CatalystReviewers` | `/use-cases/DecentralizedInnovation` |
| `/use-cases/LeadGenerator` | `/use-cases/LeadGenDAO` |
| `/whitepaper` and `/whitepaper/*` | `/papers` |

### Nav and footer

Defined together in `src/ui/explore/content.ts`.

- **Issuer** and **Pricing** are top-level.
- **Developers:** Build on Andamio, Docs, API reference, the app template, CLI, Discord bot.
- **Resources:** Papers, Use cases, Blog, Roadmap, Community.
- **About:** About, Contact (`/about#contact`), Brand and press.
- The nav call to action is **Start issuing credentials** (`issuer.andamio.io`).
- The footer repeats Product, Developers, Resources, and About, and adds Discord, X, Privacy, and Terms.

## Journeys

Three lifecycles, in `lifecycles` inside `src/ui/explore/content.ts`. Home shows all three. Each other page shows the one for its audience.

- **Earner** (`/`, `/show-me`): Enroll, Submit evidence, Get reviewed, Claim, Carry it anywhere.
- **Organization** (`/issuer`): Define, Review, Issue, Verify.
- **Developer** (`/developers`): Commit, Review, Claim, Gate on it.

Two ways to adopt, on home and `/issuer`:

- **Invisible.** The organization sponsors transactions and a wallet is created at sign-in. Public example: Barça Fan Lab, where fans use BarçaID.
- **Visible.** The person connects their own Cardano wallet.

Say which mode a partner uses only when they have said so in public. Syngenta, Intersect, and LeadGen DAO do not carry a mode.

## Design language

Dark only. Tokens are the `--sys-*` variables in `src/styles/globals.css` and the `color` map in `src/ui/system/tokens.ts`.

- Paper `#0b121b`, surface `#122131`, ink `#efe9dd`.
- Orange `#f7a54a` is the one primary action on a view. It is not used on headings.
- Cyan `#3fd9e8` is for links, data, and focus.
- No gradient text, no glass, no three-icon grids.

Page chrome (nav, type, buttons) is `src/ui/system/kit.tsx`. The proof parts (TickRule, ArcHeading, Readout, ProofCard, OrbitSteps, MiniBadge, CtaBand, LogoRail) are `src/ui/system/instrument/`. The live badge is `src/ui/system/proof-badge/`.

## Where copy lives

| Change | File |
| --- | --- |
| Nav, footer, home and product copy | `src/ui/explore/content.ts` |
| A use case | `src/ui/use-cases/cases.ts` (one record; the page is `[slug].tsx`) |
| A paper | Synced into `src/content/papers/`. Do not hand-edit. Registry is `src/lib/papers.ts` |
| A blog post | `src/blog/NNN.md`, JSON frontmatter. The index sorts by `date` |
| Roadmap | `src/roadmap.ts` |
| Cross-site URLs | `src/lib/external-links.ts` |
| Share title, description, X handle | `src/lib/seo.ts` and `src/components/site/metatags.tsx` |

### Editing the hero badge

The credential rendered on the homepage is `DEFAULT_CREDENTIAL` in `src/ui/system/proof-badge/`. Course id and SLT hash are real mainnet values. Do not truncate them.

### Editing a use case

Add a `CaseStudy` to `CASES`. Every outcome row is `result` (measured), `target` (a goal), or `fact` (published). No adoption numbers the partner has not published. Old slugs redirect; do not reuse a retired slug for a different story.

## Proof and partners

The rail under the hero is `proofRail` in `content.ts`. Each mark links to a use case. Toha Network uses the header icon from toha.network. Project Catalyst uses the header lockup from projectcatalyst.io.

Barça Fan Lab, public facts only: launched 25 September 2026, built with Andamio on Cardano, BarçaID sign-in creates a wallet, transactions are sponsored, four program areas with Web3 labeled experimental, funded by Catalyst Fund 13. The quote is the Cardano Foundation post, not a named person at the club. The case says adoption is not disclosed.

The TxPipe audit (completed 31 Dec 2025, six findings, five resolved) is `audit` in `content.ts` and links to the docs report.

## Analytics

Umami, self-hosted. `src/components/site/Analytics.tsx` loads the script only when `NEXT_PUBLIC_UMAMI_URL` and `NEXT_PUBLIC_UMAMI_WEBSITE_ID` are both set. Until then the page makes no analytics request.

`track` in `src/lib/analytics.ts` accepts only: `show-me`, `look-inside`, `lifecycle-tab`, `proof-rail-click`, `walkthrough`, `start-issuing`, `docs`. No badge fields, wallet addresses, or free text.

Deploy is [andamio-io issue 3](https://github.com/Andamio-Platform/andamio-io/issues/3). The GCP brief is in `docs/backlog.md`. Hosting and DNS move is [issue 1](https://github.com/Andamio-Platform/andamio-io/issues/1).

Share images are `GET /og?title=` at 1200×630, from `src/app/og/route.tsx`.

## History

Older docs, including the light-theme guides, are in `docs/archive/`. The binding direction for this site is `docs/landing-page-excellence/decisions/2026-09-30-proof-instrument-dark.md`.
