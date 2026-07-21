# Issuer-primary/developer-secondary funnel and CTA audit

- **Date:** 2026-07-21
- **Status:** complete
- **Canonical commit:** `0890cc35a233f81efa2c33310b9b0f8c70fc7cb5`
- **Environment:** source inspection plus desktop localhost browser observation
- **Scope:** canonical `/`, `/show-me`, and `/issuer` journeys
- **Owner:** Landing Excellence Program

## Baseline

- **Observed in desktop browser:** the homepage loaded and presented a clear visual hierarchy.
- **Source inspection:** the hero's single narrative CTA is **Show me** → `/show-me`.
- **Source inspection:** issuer is presented before developers, matching the documented issuer-primary/developer-secondary priority.
- **Source inspection:** `/issuer` contains the canonical HowItWorks tabs and BadgeBuilder; its principal conversion is a prefilled `mailto:` walkthrough request.
- **Source inspection:** developer paths lead to `/developers`, documentation, API reference, repositories, CLI, and bot surfaces.
- **Unknown:** no analytics exists, so CTA exposure, click-through, progression, abandonment, and completed-contact rates are unmeasured.

## Conversion ladder

| Level | Issuer-primary outcome | Developer-secondary outcome |
|---|---|---|
| L0 — orient | Understand that Andamio credentials are permanent, useful, owned, and verifiable | Understand that the protocol exposes credential primitives through APIs |
| L1 — self-select | Choose **Show me** or the Issuer route | Choose the developer branch or `/developers` |
| L2 — evaluate | Complete `/show-me`, inspect `/issuer`, and interact with Define/Issue/Verify | Open docs/API reference or inspect developer tools |
| L3 — intent | Click **Book a 20-minute walkthrough** or **Start issuing credentials** | Click **Get Started**, API Reference, repository, CLI, or bot quickstart |
| L4 — conversion | Successfully send/submit a qualified walkthrough request or start an issuer workflow | Successfully begin a documented integration workflow |

`mailto:` launch is intent, not a confirmed conversion. A future measurable contact flow must define success and privacy boundaries before implementation.

## CTA inventory

| Surface | CTA | Destination | Audience | Ladder | Assessment |
|---|---|---|---|---|---|
| Global nav | Start issuing credentials | `https://issuer.andamio.io` | issuer | L3 | Strong primary action; external availability unverified |
| Global nav | Try the App | `https://mainnet.app.andamio.io` | mixed/developer | L3 | Secondary utility; role in funnel needs validation |
| Home hero | Show me | `/show-me` | issuer first, mixed | L1 | Canonical narrative entry; absent from sitemap |
| Home issuer | See how Andamio Issuer works | `/issuer` | issuer | L2 | Correct deep-evaluation route |
| Home issuer | Book a 20-minute walkthrough | prefilled `mailto:hello@andamio.io` | issuer | L3 | No measurable completion; mail-client dependency |
| Home developers | Build on Andamio | `/developers` | developer | L1/L2 | Correct secondary branch |
| Home developers | Docs | `https://docs.andamio.io/docs` | developer | L2 | External status unverified |
| Home ecosystem | Build with the API | API reference | developer | L2 | Host conflicts with the second link registry |
| Home ecosystem | See the pattern | `/issuer#how-it-works` | issuer | L2 | Reinforces canonical demo |
| Home closing | Join the Discord | Discord invite | community | L3 | Competes with walkthrough as final action |
| `/issuer` hero/close | Book a 20-minute walkthrough | prefilled `mailto:` | issuer | L3 | Repeated primary intent action |
| `/issuer` hero | Get the report — soon | disabled | issuer | none | Honest unavailable state; must not be tracked as conversion |

## Findings and requirement seeds

- **FUN-F01 / P1 / `REQ-CONV-01`:** define one issuer-primary success metric and preserve developer-secondary paths without equal visual weight.
- **FUN-F02 / P1 / `REQ-CONV-02`:** replace or instrument the mail-client-dependent handoff only after privacy, consent, failure, and success states are specified.
- **FUN-F03 / P1 / `REQ-LINK-01`:** consolidate external link constants and resolve API host drift before measuring CTA performance.
- **FUN-F04 / P2 / `REQ-COPY-01`:** validate whether the homepage closing Discord action weakens issuer conversion.
- **FUN-F05 / P2 / `REQ-CONV-03`:** define explicit continuation and recovery states from `/show-me` to `/issuer`, `/developers`, and back.

## Proposed event vocabulary — definition only

No analytics is implemented by this audit. Event names should remain stable and carry only approved, non-sensitive properties.

- `landing_viewed` — properties: `route`, `referrer_class`, `viewport_class`
- `audience_path_selected` — `issuer | developer | curious`, `source`
- `cta_clicked` — `cta_id`, `destination_class`, `route`, `section`, `audience`
- `show_me_started` — `entry_source`
- `show_me_step_viewed` — `path`, `step_index`
- `show_me_completed` — `path`, `destination`
- `issuer_demo_step_selected` — `define | issue | verify`
- `issuer_demo_action_completed` — `build | illustrative_issue | illustrative_verify`
- `walkthrough_intent_started` — `source`; a mailto launch only
- `issuer_app_opened` — `source`
- `developer_resource_opened` — `resource_id`, `source`
- `outbound_link_failed` — `link_id`, `status_class`, collected only by approved synthetic checks

Do not collect badge input, credential addresses, wallet addresses, email content, or free text.

## Unverified checks

Mobile funnel comprehension, keyboard-only progression, mail-client completion, all outbound destinations, and production conversion behavior were not tested. The browser disconnected before mobile, keyboard, and full-route testing; none of these checks passes by inference.
