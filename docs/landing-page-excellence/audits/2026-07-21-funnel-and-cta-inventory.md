# Issuer-primary/developer-secondary funnel and CTA audit

- **Date:** 2026-07-21
- **Status:** complete
- **Canonical commit:** `0890cc35a233f81efa2c33310b9b0f8c70fc7cb5`
- **Environment:** source inspection plus desktop localhost observation at approximately 1024 × 768 CSS px
- **Scope:** canonical `/`, `/show-me`, and `/issuer` journeys
- **Source authority:** `src/ui/explore/content.ts`, `src/ui/system/AndamioLanding.tsx`, `src/ui/system/StoryFork.tsx`, `src/ui/system/AndamioIssuer.tsx`, `src/ui/system/HowItWorks.tsx`, and `src/ui/system/kit.tsx`
- **Owner:** Landing Excellence Program

## Observed baseline

- The desktop homepage loaded with a clear visual hierarchy.
- Issuer content precedes developer content. The hero's single narrative CTA is **Show me** → `/show-me`.
- `/issuer` contains the canonical HowItWorks tabs and BadgeBuilder. The walkthrough action is a prefilled `mailto:` launch; it is intent, not confirmed conversion.
- No analytics exists, so exposure, click-through, progression, abandonment, qualification, and completed conversion rates are unknown.
- Mobile, keyboard-only, mail-client completion, outbound destinations, and full-route browser behavior remain unverified.

## Conversion ladder

| Level | Issuer-primary outcome | Developer-secondary outcome |
|---|---|---|
| L0 — orient | Understand permanent, useful, owned, and verifiable credentials | Understand that Andamio exposes credential primitives through REST APIs |
| L1 — self-select | Select `/show-me`, `/issuer`, or another issuer-labelled action | Select Developers, `/developers`, docs, API, CLI, bot, or app |
| L2 — evaluate | Complete the issuer story and inspect Define/Issue/Verify | Read owned developer guidance or inspect a supported tool |
| L3 — intent | Launch the walkthrough request or open the issuer app | Open an integration resource or begin setup |
| L4 — confirmed completion | Receive server-confirmed walkthrough submission/booking or create an issuer workspace | Create an API key and complete the first authenticated API request |

Current `mailto:` launch and outbound navigation stop at L3. L4 requires an owned, privacy-approved success signal; it must never be inferred from a click.

## CTA inventory conventions

- IDs below are stable analytics-contract candidates; copy may change without changing an ID.
- **Enabled** means actionable navigation; **internal** changes UI state; **disabled** has no destination; **utility** is navigational but not a conversion.
- `cta_clicked` fires only after an enabled navigation activation. Internal state controls use their named state event. Disabled controls emit nothing.
- Destinations are literal values from source, including encoded mailto subjects.

## Canonical navigation

The same canonical navigation renders on `/` and `/issuer`.

| Stable ID | Exact label | Literal destination | State | Audience / level | Proposed event |
|---|---|---|---|---|---|
| `nav.brand_home` | Andamio | `/` | utility | mixed / L0 | `cta_clicked` |
| `nav.issuer` | Issuer | `/issuer` | enabled | issuer / L1 | `cta_clicked` |
| `nav.dev_build` | Build on Andamio | `/developers` | enabled | developer / L1 | `cta_clicked` |
| `nav.dev_docs` | Docs | `https://docs.andamio.io/docs` | enabled | developer / L2 | `developer_resource_opened` |
| `nav.dev_api` | API Reference | `https://api.andamio.io/reference` | enabled | developer / L2 | `developer_resource_opened` |
| `nav.dev_template` | Reference app | `https://github.com/Andamio-Platform/andamio-app-template` | enabled | developer / L2 | `developer_resource_opened` |
| `nav.dev_cli` | Andamio CLI | `/cli` | enabled | developer / L2 | `developer_resource_opened` |
| `nav.dev_bot` | Andamio Discord Bot | `/bot` | enabled | developer/community / L2 | `developer_resource_opened` |
| `nav.resources_overview` | Overview | `/papers` | enabled | mixed / L2 | `cta_clicked` |
| `nav.resources_use_cases` | Use cases | `/use-cases` | enabled | issuer / L2 | `cta_clicked` |
| `nav.pricing` | Pricing | `/pricing` | enabled | issuer / L2 | `cta_clicked` |
| `nav.about` | About | `/about` | enabled | mixed / L0 | `cta_clicked` |
| `nav.try_app` | Try the App | `https://mainnet.app.andamio.io` | enabled | mixed/developer / L3 | `issuer_app_opened` |
| `nav.start_issuing` | Start issuing credentials | `https://issuer.andamio.io` | enabled | issuer / L3 | `issuer_app_opened` |

## Homepage hero, issuer, developer, ecosystem, and closing

| Stable ID | Surface / exact label | Literal destination | State | Audience / level | Proposed event |
|---|---|---|---|---|---|
| `home.hero_show_me` | Hero — Show me | `/show-me` | enabled | issuer-first mixed / L1 | `show_me_started` |
| `home.issuer_learn_more` | Issuer — See how Andamio Issuer works | `/issuer` | enabled | issuer / L2 | `cta_clicked` |
| `home.issuer_walkthrough` | Issuer — Book a 20-minute walkthrough | `mailto:hello@andamio.io?subject=Enterprise%20walkthrough%20request` | enabled | issuer / L3 | `walkthrough_intent_started` |
| `home.developer_build` | Developers — Build on Andamio | `/developers` | enabled | developer / L1 | `cta_clicked` |
| `home.developer_docs` | Developers — Docs | `https://docs.andamio.io/docs` | enabled | developer / L2 | `developer_resource_opened` |
| `home.ecosystem_api` | Portable — Build with the API | `https://api.andamio.io/reference` | enabled | developer / L2 | `developer_resource_opened` |
| `home.ecosystem_agent_soon` | Agent ready — Coming soon | none | disabled | developer / none | none |
| `home.ecosystem_pattern` | Your data — See the pattern | `/issuer#how-it-works` | enabled | issuer / L2 | `cta_clicked` |
| `home.ecosystem_discord` | Community — Join the Discord | `https://discord.gg/JKgckZGtf` | enabled | community / L3 | `cta_clicked` |
| `home.closing_discord` | Closing — Join us on Discord | `https://discord.gg/JKgckZGtf` | enabled | community / L3 | `cta_clicked` |

## Canonical footer

| Stable ID | Column / exact label | Literal destination | State | Audience / level | Proposed event |
|---|---|---|---|---|---|
| `footer.brand_home` | Brand — Andamio | `/` | utility | mixed / L0 | `cta_clicked` |
| `footer.buyer_walkthrough` | For buyers — Book a walkthrough | `mailto:hello@andamio.io?subject=Enterprise%20walkthrough%20request` | enabled | issuer / L3 | `walkthrough_intent_started` |
| `footer.buyer_use_cases` | For buyers — Use cases | `/use-cases` | enabled | issuer / L2 | `cta_clicked` |
| `footer.buyer_roadmap` | For buyers — Roadmap | `/roadmap` | enabled | mixed / L2 | `cta_clicked` |
| `footer.buyer_blog` | For buyers — Blog | `/blog` | enabled | mixed / L2 | `cta_clicked` |
| `footer.buyer_about` | For buyers — About | `/about` | enabled | mixed / L0 | `cta_clicked` |
| `footer.builder_docs` | For builders — Docs | `https://docs.andamio.io/docs` | enabled | developer / L2 | `developer_resource_opened` |
| `footer.builder_api` | For builders — API Reference | `https://api.andamio.io/reference` | enabled | developer / L2 | `developer_resource_opened` |
| `footer.builder_github` | For builders — GitHub | `https://github.com/Andamio-Platform` | enabled | developer / L2 | `developer_resource_opened` |
| `footer.builder_app` | For builders — App | `https://mainnet.app.andamio.io` | enabled | mixed/developer / L3 | `issuer_app_opened` |
| `footer.connect_email` | Connect — hello@andamio.io | `mailto:hello@andamio.io` | enabled | mixed / L3 | `cta_clicked` |
| `footer.connect_linkedin` | Connect — LinkedIn | `https://www.linkedin.com/company/andamio-teams` | enabled | mixed / L2 | `cta_clicked` |
| `footer.connect_twitter` | Connect — Twitter | `https://x.com/andamio_teams` | enabled | mixed / L2 | `cta_clicked` |
| `footer.connect_discord` | Connect — Discord | `https://discord.gg/JKgckZGtf` | enabled | community / L3 | `cta_clicked` |
| `footer.legal_privacy` | Legal — Privacy | `/privacy-policy` | utility | mixed / none | `cta_clicked` |
| `footer.legal_terms` | Legal — Terms | `/terms` | utility | mixed / none | `cta_clicked` |

On `/issuer`, the footer additionally renders `issuer.footer_back` — **← Andamio overview** → `/#issuer` as a utility `cta_clicked`.

## `/issuer` actions

| Stable ID | Exact label | Literal destination/action | State | Audience / level | Proposed event |
|---|---|---|---|---|---|
| `issuer.overview_back` | ← Andamio overview | `/#issuer` | utility | issuer / L1 | `cta_clicked` |
| `issuer.hero_walkthrough` | Book a 20-minute walkthrough | `mailto:hello@andamio.io?subject=Enterprise%20walkthrough%20request` | enabled | issuer / L3 | `walkthrough_intent_started` |
| `issuer.report_soon` | Get the report soon | none | disabled | issuer / none | none |
| `issuer.demo_define` | Define | select demo index 0 | internal | issuer / L2 | `issuer_demo_step_selected` |
| `issuer.demo_issue` | Issue | select demo index 1 | internal | issuer / L2 | `issuer_demo_step_selected` |
| `issuer.demo_verify` | Verify | select demo index 2 | internal | issuer / L2 | `issuer_demo_step_selected` |
| `issuer.demo_issue_credential` | Issue credential | illustrative issue state | internal | issuer / L2 | `issuer_demo_action_completed` |
| `issuer.demo_verify_action` | Verify | illustrative verify state | internal | issuer / L2 | `issuer_demo_action_completed` |
| `issuer.closing_walkthrough` | Book a 20-minute walkthrough | `mailto:hello@andamio.io?subject=Enterprise%20walkthrough%20request` | enabled | issuer / L3 | `walkthrough_intent_started` |

The Issue and Verify actions are illustrative and must not be reported as real credential issuance or verification.

## `/show-me` actions

| Stable ID | Exact label | Literal destination/action | State | Audience / level | Proposed event |
|---|---|---|---|---|---|
| `show.close` | Close and return home | `/` | utility | mixed / L0 | `cta_clicked` |
| `show.escape` | esc | `/` via `router.push` | utility | mixed / L0 | `cta_clicked` |
| `show.door_issuer` | I already issue digital credentials. I'm not satisfied with them. | activate `issuer` path | internal | issuer / L1 | `audience_path_selected` |
| `show.door_builder` | I am a developer, and I want to learn how to build on Andamio. | activate `builder` path | internal | developer / L1 | `audience_path_selected` |
| `show.door_curious` | What do you mean by “a unique set of principles”? | activate `curious` path | internal | curious / L1 | `audience_path_selected` |
| `show.back_doors` | Which of these sounds like you? | reset to doors | internal | mixed / L1 | `show_me_step_viewed` |
| `show.issuer_look_inside` | Look inside one | `/issuer` | enabled | issuer / L2 | `show_me_completed` |
| `show.issuer_next_built` | How it's built | activate `built` chapter | internal | issuer / L2 | `show_me_step_viewed` |
| `show.issuer_next_matters` | Why that matters | activate `matters` chapter | internal | issuer / L2 | `show_me_step_viewed` |
| `show.issuer_no_blockchain` | Don't show me the blockchain. I just need to issue better credentials. | `/issuer` | enabled | issuer / L2 | `show_me_completed` |
| `show.issuer_build` | I'm comfortable with the blockchain. I want to integrate and build. | `/developers` | enabled | developer / L2 | `show_me_completed` |
| `show.issuer_cardano` | I'm only here as a curious Cardano community member. | activate Cardano screen | internal | community / L2 | `show_me_step_viewed` |
| `show.cardano_live` | What's live? | `/roadmap` | enabled | community / L2 | `show_me_completed` |
| `show.cardano_app` | Try the app | `https://mainnet.app.andamio.io` | enabled | mixed / L3 | `show_me_completed` |
| `show.cardano_protocol` | The protocol story | `/papers/building-on-andamio` | enabled | developer/community / L2 | `show_me_completed` |
| `show.builder_existing` | I'm adding credentials to something that already exists. | `https://docs.andamio.io/docs` | enabled | developer / L2 | `show_me_completed` |
| `show.builder_new` | I'm building something new on the protocol. | `/developers` | enabled | developer / L2 | `show_me_completed` |
| `show.builder_community` | Neither. I run a community. | `/bot` | enabled | community/developer / L2 | `show_me_completed` |
| `show.curious_rules` | Write your own rules | `/papers` | enabled | issuer/curious / L2 | `show_me_completed` |
| `show.curious_users` | Who's already doing it | `/use-cases` | enabled | issuer/curious / L2 | `show_me_completed` |
| `show.curious_roadmap` | What's shipping next | `/roadmap` | enabled | curious / L2 | `show_me_completed` |

The issuer chapter rail also exposes **01 · How you can use it**, **02 · How it's built**, and **03 · Why that matters**. Use IDs `show.issuer_chapter_use`, `show.issuer_chapter_built`, and `show.issuer_chapter_matters`; each is an internal `show_me_step_viewed` action.

## Proposed event contract — no analytics code

- `landing_viewed`: after the canonical route is visible; properties `route`, `referrer_class`, `viewport_class`.
- `audience_path_selected`: after a `/show-me` door state changes; `path`, `cta_id`, `source`.
- `cta_clicked`: after activation and before navigation; `cta_id`, `route`, `section`, `audience`, `destination_class`.
- `show_me_started`: after navigation to `/show-me` is accepted; `entry_source`, `cta_id`.
- `show_me_step_viewed`: after the requested path/chapter becomes visible; `path`, `step_id`, `step_index`.
- `show_me_completed`: once per session when an enabled terminal exit is activated; `path`, `destination`, `cta_id`.
- `issuer_demo_step_selected`: after Define/Issue/Verify becomes active; `step`.
- `issuer_demo_action_completed`: after the illustrative local state confirms `build`, `illustrative_issue`, or `illustrative_verify`; never claim backend success.
- `walkthrough_intent_started`: on activation of the exact walkthrough mailto; `cta_id`, `source`. This is L3 only.
- `issuer_app_opened`: on issuer/app outbound activation; `cta_id`, `source`.
- `developer_resource_opened`: on developer-resource activation; `resource_id`, `cta_id`, `source`.
- `walkthrough_request_completed` (future): only after an owned form/booking service returns confirmed success; `conversion_id`, `source`. This is issuer L4.
- `issuer_workspace_created` (future): only after the issuer application confirms workspace creation; `conversion_id`, `source`. This is issuer L4.
- `developer_activation_completed` (future): only after API-key creation plus the first successful authenticated API request; `conversion_id`, `source`. This is developer L4.

Do not collect badge inputs, credential or wallet addresses, email content, or free text.

## Session, qualification, and deduplication

- A **qualified session** is a consented, non-bot session that renders a canonical route, remains visible for at least 2 seconds or records an interaction, and is not marked internal/test traffic.
- Session boundary: 30 minutes of inactivity. Use a random first-party session identifier with no identity payload. Cross-domain continuity requires explicit privacy approval; without it, report destination completion as unattributed.
- Raw clicks may repeat. KPI numerators deduplicate to one qualifying event per `session_id + KPI + audience`; L4 also deduplicates by non-sensitive `conversion_id`.
- A CTA trigger is user activation, not visibility. A state event fires only after the state is rendered. A completion trigger requires owned success confirmation; navigation, mail-client launch, and optimistic UI are not completion.
- Bot, synthetic, employee/test, duplicate conversion, and rejected/failed submission traffic is excluded from conversion KPIs and reported separately.

## KPI formulas and proposed thresholds

No analytics baseline exists. Thresholds below are **proposed, non-gating hypotheses** until a privacy-approved 28-day baseline with enough qualified sessions is reviewed.

| KPI | Formula and denominator | Proposed threshold |
|---|---|---:|
| Issuer path-selection rate | Distinct qualified homepage sessions with an issuer-designated L1+ action ÷ distinct qualified homepage sessions | ≥60% |
| Developer path-selection rate | Distinct qualified homepage sessions with a developer-designated L1+ action ÷ distinct qualified homepage sessions | Monitor; ≥15% floor while issuer remains primary |
| `/show-me` completion rate | Distinct qualified sessions with `show_me_completed` ÷ distinct qualified sessions with `show_me_started` | ≥50% |
| Issuer evaluation rate | Distinct qualified issuer sessions reaching `/issuer` or `/#issuer` evaluation ÷ distinct qualified sessions selecting an issuer path | ≥40% |
| Walkthrough-intent rate | Distinct qualified issuer sessions with `walkthrough_intent_started` ÷ distinct qualified issuer sessions reaching `/issuer` | ≥8% |
| Issuer L4 completion rate | Distinct qualified issuer sessions with `walkthrough_request_completed` or `issuer_workspace_created` ÷ distinct qualified issuer sessions reaching `/issuer` | Proposed ≥3% after owned completion exists |
| Developer resource activation | Distinct qualified developer sessions with `developer_resource_opened` ÷ distinct qualified sessions selecting a developer path | ≥25% |
| Developer L4 completion rate | Distinct qualified developer sessions with `developer_activation_completed` ÷ distinct qualified sessions selecting a developer path | Proposed ≥5% after cross-surface completion exists |

Report issuer and developer KPIs separately; do not combine them into one conversion rate or optimize developer volume at the expense of issuer-primary hierarchy.

## Findings

- **FUN-F01 / P1 / `REQ-CONV-01`:** approve the KPI/event/session contract before instrumentation.
- **FUN-F02 / P1 / `REQ-CONV-02`:** create an owned, accessible success-confirmed walkthrough flow before claiming issuer L4.
- **FUN-F03 / P1 / `REQ-LINK-01`:** consolidate external-link constants and resolve API-host drift.
- **FUN-F04 / P2 / `REQ-COPY-01`:** use baseline evidence to test whether duplicated Discord actions dilute issuer conversion.
- **FUN-F05 / P1 / `REQ-CONV-03`:** retain explicit `/show-me` continuation, recovery, and completion semantics.

## Unverified

No event implementation, consent design, analytics property, cross-domain attribution, baseline, outbound-status sweep, mail-client completion, or L4 destination instrumentation was verified. Proposed thresholds are not evidence of current performance.
