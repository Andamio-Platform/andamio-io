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
source_url: Canonical issuer or maintainer URL
secondary_url: Optional independent or developer-oriented source
license: SPDX identifier, proprietary, or unknown
access_model: free | freemium | paid | open-source
free_scope: Limits of free access, or not-applicable
version_or_commit: Version, release, or commit checked
verified_on: YYYY-MM-DD
scores: { relevance: 0, evidence: 0, quality: 0, fit: 0, cost: 0, risk: 0 }
total_score: 0
decision: Short rationale, including exclusions
```

Use `unknown` rather than inference. For a design pattern without a version, record the page revision date or `not-published`.

## Verification and citations

1. Start with the **issuer-primary source**: official documentation, product page, repository, release, standard, or original research.
2. Add a **developer-secondary source** when implementation behavior, interoperability, adoption, or limitations need corroboration.
3. Cite the exact page supporting each material claim; do not cite a homepage when a license, pricing, release, or feature page exists.
4. Record `verified_on` on every verification pass and `version_or_commit` for mutable software.
5. Quote sparingly. Separate source facts from Andamio recommendations.
6. For repositories, verify owner, archival state, latest release or commit activity, license file, and relevant documentation.
7. For commercial services, verify current pricing and free-tier limits from official pricing documentation.

## Access-model terminology

- **Free:** usable for the stated scope without payment; may still be proprietary.
- **Freemium:** a no-cost tier exists but material features, volume, or usage require payment.
- **Open source:** source is available under a recognized license granting use, modification, and redistribution. Public source without a license is not open source.
- **Paid:** the evaluated use requires payment.

Record both `license` and `access_model`; these are independent properties.

## Inclusion and exclusion gates

A candidate is eligible only when:

- its use case maps to an identified issuer-primary or developer-secondary need;
- material claims have current, accessible primary citations;
- ownership, maintenance state, license, pricing/access model, and security implications are known;
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
5. Check duplicate `id` values and duplicate canonical `source_url` values.
6. Confirm every `verified_on` is a valid date and refresh records older than the phase's stated freshness window.
7. Recalculate score totals from the six dimensions.

Mechanical success does not replace claim review; record both automated and manual verification in the phase artifact.
