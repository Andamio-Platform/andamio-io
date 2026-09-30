# Unified Issuer Explorer — Requirements

**Date:** 2026-06-22
**Repo / branch:** landing-page-and-blog / feat/enterprise-landing-page
**Status:** Ready for planning or build

## Summary

Merge the two adjacent Issuer sections of the landing page into one full-height
"Issuer explorer." A visitor picks one of three archetypes and the deeper story
for that archetype reveals inline. One section, depth on demand. Replaces the
redundant pair of `V2PartnersSection` and `V2WalkthroughSection`.

## Problem

The two sections cover the same ground twice. `V2PartnersSection` ("Who Andamio
Issuer is for") shows three archetype cards (Certification, Partner programs,
Cohort training), each linking down to `V2WalkthroughSection` ("Choose your
archetype"), which then repeats the same three-way pick and adds the deeper
step-by-step story. The visitor chooses an archetype twice, and the page spends
two full sections on one idea.

## Goal

One cohesive experience for a visitor who wants to click a little deeper into the
Issuer product. Pick your world, see how getting started looks for it.

## The experience

- **One full-height section** (snap panel, full-bleed), replacing both sections.
- **Pick-to-reveal.** The three archetypes are the entry. Selecting one reveals
  its deeper story inline. One archetype is open by default so the panel is never
  empty.
- **Default open: Certification** (first archetype).
- Each archetype selector carries its **name plus a one-line qualifier**, so the
  "who it's for" job still gets done at a glance.
- Selecting a different archetype swaps the revealed story in place. No page jump,
  no second picker.
- Remove the old "See the 4-step walkthrough" link and the duplicate picker.

## The deeper story: four steps to get started

When an archetype is selected, the reveal is **the four steps to get started**
with Andamio Issuer for that archetype.

- **Four steps, named by what happens, not when.** No time framing. Drop the old
  "Today / The shift / First month / Six months in" labels and the "first six
  months" header. Nothing about timelines or durations.
- Working stage names (exact copy set in the rewrite): the starting point → the
  shift → your first credential → what you're left with.
- Each step keeps a short lede and a few supporting points.

## CTA ladder

The ask escalates with the visitor's depth, it does not repeat. Across the four
steps:

1. **Explore + hands-on** (steps one to three). The primary action is "Try it
   yourself", pointing at the live app (`app.andamio.io`), so a visitor can feel
   the product before they consider talking to anyone.
2. **Share email, get the report** (future). A "Get the report" action captures an
   email and sends a one-page PDF. Folded into the design now as a disabled
   placeholder; wired up when the feature ships.
3. **Book a walkthrough** (step four only). The conversion CTA lands at the end of
   the journey, not the start.

So the flow is: click through and explore, try it live, share your email for the
report, then book a walkthrough.

## Copy rewrite (in scope)

All copy in the merged section is rewritten to the established voice:

- Simple sentences. Fewer words.
- No em-dashes. Fewer colons. Comma before "and". No sentence-initial "And".
- No periods on headings.
- No internal-sales language (the "Buyer: VP Certification" lines are already
  gone and do not return).
- No orange eyebrows. Sora display font, bigger and bolder, consistent with the
  rest of the page.

## Archetypes — aligned to the canonical personas

Source: `andamio-circles/product-circle/personas/ei-buyer-personas.md` (canonical,
reviewed 2026-06-09). The three archetypes map to the top three buyer personas, in
priority order:

1. **Cohort training → Theo, the Practicum Founder** (funded core, Q2). Default-open.
   The credential is the product. Employer-verifiable proof of shipped work.
2. **Certification → Carmen, the Certification Lead** (Q2, gated). Coexistence not
   rip-and-replace. Own the data and the certs. Not a JPEG.
3. **Platform operators → Marcus, the Platform Operator** (Q3). Replaced the old
   "Partner programs" bucket, which matched no validated persona. Mission first,
   recognition that travels beyond the platform.

Copy draws pain / job / payoff language straight from the personas doc, vendor-
neutral, no crypto jargon, verbs ("anyone can verify") not the noun "verifiable".

## Hard guardrail — no cross-issuer composability claim

Per the personas doc (open question 3, RESOLVED 2026-06-01) and the ee#54 gate:
a credential from one org automatically enforced as a prerequisite in another
org's pathway is **not shipped**. The copy keeps gating claims **within your own
pathways or platform**, and frames cross-org value only as portability ("anyone
can verify it", "others can choose to honor it"), never automatic enforcement.

## Non-goals

- No changes to the other sections (hero, problem, Issuer overview, Andamio API,
  footer).
- No new archetypes beyond the existing three.
- No time-based or calendar framing anywhere in the steps.

## Success criteria

- A visitor picks an archetype once and sees the deeper steps without a page jump.
- The page no longer presents the archetype choice twice.
- No step references a timeline, month, or "six months".
- All copy passes the voice rules above.
- Reads as one designed section, not two stitched together.

## Affected files

- `src/ui/landing/V2Landing/V2PartnersSection.tsx` — folds into the new section.
- `src/ui/landing/V2Landing/V2WalkthroughSection.tsx` — folds into the new section.
- `src/ui/landing/V2Landing/walkthrough-data.ts` — archetype + step content,
  rewritten and de-timed.
- `src/ui/landing/V2Landing/index.tsx` — render the one new section in place of
  the two.
- New component for the merged explorer (name set at build time).

## Open questions

- Exact step names and the one-line archetype qualifiers (resolved during the
  copy rewrite).
- Whether the step navigation stays as the current numbered stepper or becomes
  something lighter (a build-time design call).
