# Brief: SEO / Analytics Agent

- **Status:** draft
- **Requirements:** SEO-*, TECH-01..02, CNT social identity
- **Depends on:** identity owner for SEO-02; privacy owner for TECH-01

## Inputs

- shared-context; [../requirements/07-technical-seo-analytics.md](../requirements/07-technical-seo-analytics.md)
- funnel event contract; `seo.ts`, `metatags.tsx`, `sitemap.ts`

## Allowed files

`src/lib/seo.ts`, `src/components/site/metatags.tsx`, `src/app/sitemap.ts`, `src/app/robots.ts` (if present), content/footer social URLs, docs decisions for indexability/privacy. **No analytics vendor code until TECH-01 approved.**

## Outputs

- `/show-me` indexability decision draft → decisions/
- Centralized social handle change list
- Metadata uniqueness checklist
- Analytics implementation plan (post-privacy), not premature code

## Acceptance

- SEO-01 decision adopted before sitemap change
- SEO-02/04 acceptance tests pass
- TECH-01 blocks instrumentation until signed off

## Verification commands

```bash
yarn build && yarn start
curl -I http://localhost:3000/sitemap.xml
# validate titles/canonicals on /, /issuer, /show-me, /developers
```

## Escalation

Conflicting social handles from marketing; privacy rejects event schema; production-only OG failures.
