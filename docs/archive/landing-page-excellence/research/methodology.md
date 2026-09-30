# Research Methodology

Use this process for tools, repositories, patterns, references, and services considered by the program.

## Normalized record schema

Store one record per candidate in the relevant research index or shortlist:

```yaml
id: stable-kebab-case-id
name: Display name
category: github-ai | ui-ux | other
status: proposed | researching | verified | shortlisted | rejected | adopted | superseded
summary: One factual sentence
use_case: The Andamio problem this may solve
audience: issuer | developer | both
license: SPDX identifier, proprietary, not-applicable, or unknown
source_availability: open-source | source-available | closed-source | not-applicable | unknown
pricing_model: free | freemium | paid | custom | not-applicable | unknown
free_scope: Limits of free access, or not-applicable
version_or_commit: Version, release, or commit checked
verified_on: YYYY-MM-DD
freshness:
  category_window_days: 30
  phase: research | shortlist
  phase_window_days: 45
  checked_as_of: YYYY-MM-DD
citations:
  - claim: One material, falsifiable claim
    url: Exact supporting page
    source_type: primary | secondary
    checked_on: YYYY-MM-DD
    result: supports | partially-supports | contradicts | inaccessible
scores: { relevance: 0, evidence: 0, quality: 0, fit: 0, cost: 0, risk: 0 }
total_score: 0
decision: Short rationale, including exclusions
```

Use `unknown` rather than inference. For a design pattern without a version, record the page revision date or `not-published`. Research status follows `proposed → researching → verified → shortlisted → adopted`; use `rejected` for an evaluated exclusion and `superseded` only for an adopted record with a named successor. Regression from `verified` or `shortlisted` to `researching` is required when evidence expires or a material claim changes.

## Verification and citations

1. Start with a **primary source**: official documentation, product page, repository, release, standard, or original research.
2. Add a **secondary source** when implementation behavior, interoperability, adoption, or limitations need corroboration.
3. Give every material claim its own citation entry. Reusing one URL is allowed, but each entry must state the claim, exact URL, source type, check date, and result.
4. A claim is verified only when a current citation result is `supports`; `partially-supports` requires narrowing the claim, while `contradicts` or `inaccessible` blocks verification.
5. Record `verified_on` on every verification pass and `version_or_commit` for mutable software.
6. Quote sparingly. Separate source facts from Andamio recommendations.
7. For repositories, verify owner, archival state, latest release or commit activity, license file, and relevant documentation.
8. For commercial services, verify current pricing and free-tier limits from official pricing documentation.

## Source and pricing terminology

- **Source availability:** `open-source` requires a recognized license granting use, modification, and redistribution; `source-available` exposes code without all those rights; `closed-source` does not expose implementation source.
- **Pricing:** `free` requires no payment for the evaluated scope; `freemium` has a limited no-cost tier; `paid` requires payment; `custom` requires a quote.

Record `license`, `source_availability`, and `pricing_model` independently. A product may be both open source and paid, or closed source and free.

## Freshness policy

Every record declares category and phase freshness metadata. Default category windows are `github-ai: 30 days`, `ui-ux: 180 days`, and `other: 90 days`. Phase windows are `research: 180 days` and `shortlist: 45 days`. The effective window is the smaller of the category and phase windows, measured inclusively from each citation's `checked_on` through `freshness.checked_as_of`.

An artifact may set a stricter window but never a looser one without an adopted decision. `verified_on` is the date the whole record passed; it does not replace claim-level `checked_on`.

## Inclusion and exclusion gates

A candidate is eligible only when:

- its use case maps to an identified issuer-primary or developer-secondary need;
- material claims have current, accessible primary citations;
- ownership, maintenance state, license, source availability, pricing model, and security implications are known;
- adoption does not conflict with the canonical `src/ui/system` boundary;
- accessibility, privacy, performance, and operational risks are acceptable or mitigable.

Exclude or hold a candidate when it is abandoned without a viable maintenance plan, lacks usable licensing, duplicates an adopted capability without a measurable benefit, requires unverifiable claims, introduces disproportionate cost or data exposure, or serves visual novelty without improving a defined outcome. Record the reason; do not silently delete evaluated candidates.

## Scoring rubric

Score each dimension from 0 (unacceptable/unknown) to 5 (excellent), then total out of 30:

- **Relevance:** direct contribution to issuer-primary or developer-secondary outcomes.
- **Evidence:** strength, currency, and reproducibility of supporting sources.
- **Quality:** accessibility, usability, technical maturity, and maintenance.
- **Fit:** compatibility with the canonical architecture and design system.
- **Cost:** total adoption and operating cost; 5 means low cost and low lock-in.
- **Risk:** security, privacy, legal, and delivery risk; 5 means low residual risk.

Any unknown license, unverifiable key claim, or critical unmitigated risk fails the gate regardless of score. Normally shortlist at 22+, with no dimension below 3; document exceptions.

## Mechanical verification

Before a research gate:

1. Count records and compare the count with index and shortlist totals.
2. Confirm every required schema field is present and every status is allowed.
3. Check each relative Markdown link resolves from its containing file.
4. Request each external citation and flag redirects, authentication walls, and non-success responses for manual review.
5. Check duplicate `id` values and duplicate normalized claims within a record.
6. Confirm `verified_on`, `checked_as_of`, and every citation `checked_on` are valid dates.
7. Set `freshness.phase` to `research`, `phase_window_days` to 180, and `checked_as_of` to the research-gate date.
8. Resolve the category window (`github-ai=30`, `ui-ux=180`, `other=90`) and compute `effective_window_days = min(category_window_days, 180)`.
9. For every material citation, calculate whole calendar days as `age_days = checked_as_of - checked_on`.
10. Apply the exact freshness rule: a record passes only when every material citation has `0 <= age_days <= effective_window_days`; one negative or over-window age fails the whole record and returns it to `researching`.
11. A failed record may pass only after explicit reverification: re-open the cited source, reassess the claim, and update `checked_on` and `result` to the actual recheck outcome. Advancing only the date without rechecking is invalid.
12. Recalculate score totals from the six dimensions.

Immediately before shortlist scoring, enforce freshness mechanically for every candidate:

1. Set `freshness.phase` to `shortlist`, `phase_window_days` to 45, and `checked_as_of` to the shortlist's `as_of` date.
2. Resolve the category window (`github-ai=30`, `ui-ux=180`, `other=90`) and compute `effective_window_days = min(category_window_days, 45)`.
3. For every material citation, calculate `age_days = checked_as_of - checked_on`; fail negative ages or `age_days > effective_window_days`.
4. Fail any citation whose URL is unreachable or whose result is not `supports`.
5. Move every failed candidate to `researching`; exclude it from candidate count, ranking, and scoring until reverified.
6. Record total, passed, stale, unreachable, and unsupported counts in the shortlist.

Mechanical success does not replace claim review; record both automated and manual verification in the phase artifact.
