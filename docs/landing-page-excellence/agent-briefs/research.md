# Brief: Research Agent

- **Status:** draft
- **Requirements:** supports all; refreshes shortlists
- **Audience:** issuer-primary insights; developer-secondary tooling

## Inputs

- [shared-context.md](shared-context.md)
- [../research/methodology.md](../research/methodology.md)
- [../research/shortlists/](../research/shortlists/)
- Audits under [../audits/](../audits/)

## Allowed files

`docs/landing-page-excellence/research/**`, `docs/landing-page-excellence/audits/**` (evidence only), shortlist updates. No `src/**`.

## Outputs

- Freshness re-check notes when citations age out
- Gap list mapped to requirement IDs
- Escalations for license-unknown or stale adopt-now tools

## Acceptance

- Methodology schema followed; unknown not invented
- Shortlist changes cite primary URLs and freshness counts
- No application code edits

## Verification commands

```bash
# Docs-only; optional catalog validators if present
python docs/landing-page-excellence/research/github-ai-resources/validate_catalogs.py
```

## Escalation

Unknown license seeking adopt-now; vendor pricing change; conflict with Concept A or Warm Index.
