---
date: 2026-07-02
topic: seo-improvements
---

# SEO Improvements — Requirements

## Summary

Bring the site up to baseline search-engine hygiene: make every public page crawlable and correctly described (sitemap, robots, canonicals, accurate metadata), and give blog posts their own titles, descriptions, and social cards so content marketing can compound. Keyword and content strategy are deferred until Search Console data informs them.

## Problem Frame

The site currently has no `sitemap.xml` and no `robots.txt`, so search engines discover pages only by following links. The shared metadata component hardcodes `og:type="article"` on every page — including the landing page — emits the deprecated `keywords` meta tag, and sets no canonical URLs. Only seven marketing pages use it at all; the rest render heads ad hoc.

The sharpest gap is the blog: individual posts have no per-post metadata, so every post appears in search results and social shares with the same generic "Andamio Blog" title and description. The blog is the natural SEO growth surface for this site, and right now each post is invisible as a distinct page. A Search Console verification file exists, so measurement infrastructure is partly in place but unused by the site itself.

The codebase splits across two Next.js routers (marketing pages in the Pages Router, blog/brand/customers in the App Router), which means metadata is managed by two different mechanisms and gaps hide easily.

## Key Decisions

- **Confirmed goal: build the baseline structure right the first time.** SEO work on this site hasn't started; this pass establishes correct structure (crawlability, metadata, blog discoverability) rather than chasing specific rankings.
- **Hygiene before strategy.** Fix crawlability and metadata correctness first; defer keyword research and new content until Search Console shows what the site already ranks or gets impressions for. Nothing content-strategic can work while posts share one title and no sitemap exists.
- **Fix metadata within each router as-is.** The Pages Router / App Router split stays; each side gets correct metadata using its native mechanism. Consolidating routers is a much larger refactor with no SEO payoff proportional to its cost.
- **Blog posts are first-class pages.** Per-post metadata is in scope for this pass (not deferred to a "blog phase") because it is the single largest gap and the frontmatter needed to drive it already exists.

## Requirements

**Crawlability**

- R1. A sitemap exists covering every public route in both routers (marketing pages, blog index and posts, brand, customers, whitepaper pages) and stays current as blog posts are added.
- R2. A robots file allows crawling of public pages, references the sitemap, and blocks non-public routes (at minimum the debug pages).
- R3. Every indexable page declares a canonical URL on the production domain (`www.andamio.io`).

**Metadata correctness**

- R4. Open Graph type reflects the page kind — website-type pages no longer claim to be articles; blog posts do claim article type.
- R5. Every public marketing page has a unique, intentional title and meta description; no public page falls through to a generic default.
- R6. The deprecated `keywords` meta tag is dropped.

**Blog discoverability**

- R7. Each blog post derives its own title, description, and social-card metadata (Open Graph and Twitter) from the post's frontmatter.
- R8. Each blog post has a social-share image; posts without a dedicated image fall back to a branded default rather than shipping no image.
- R9. Blog posts carry article structured data (JSON-LD) including headline, date, and author from frontmatter.

**Structured data**

- R10. The landing page carries organization structured data (name, logo, URL, social profiles).

**Maintainability**

- R11. The structure is easy to keep updating: the sitemap derives blog entries from the content source rather than a hand-maintained list, the production domain lives in one place, and adding a page or post requires at most one obvious edit to stay covered.

**Verification**

- R12. A post-deploy verification pass confirms: sitemap submitted in Search Console, social cards render correctly in at least one validator, and structured data passes a rich-results check.

## Acceptance Examples

- AE1. **Covers R7, R8.** Given a blog post whose frontmatter has a title and description but no image, when the post is shared on social media, then the card shows that post's title and description with the branded fallback image — not the generic "Andamio Blog" card.
- AE2. **Covers R2.** Given a crawler requesting a debug route, when it consults the robots file, then the route is disallowed while all marketing and blog routes remain allowed.

## Success Criteria

- Every public page shows a distinct title and description in search results and link previews.
- The sitemap is accepted by Search Console with no coverage errors on submitted URLs.
- Structured data on the landing page and a sample blog post passes Google's rich-results test.

## Scope Boundaries

- **Keyword research and content strategy** — deferred until Search Console data from the fixed site shows what queries already surface it.
- **New content production** (landing copy rewrites for keywords, new blog posts) — out of scope; this pass changes plumbing, not prose.
- **Performance / Core Web Vitals work** — deferred; not assessed in this brainstorm.
- **Router consolidation** — out of scope (see Key Decisions).
- **hreflang / multi-language** — not applicable; the site is English-only.

## Dependencies / Assumptions

- The primary SEO goal is baseline hygiene plus blog discoverability, serving the site's two audiences (enterprise credential buyers and developers). Confirmed with the site owner.
- **Assumption:** production domain is `www.andamio.io` (the hardcoded OG image host in the existing metadata component).
- Search Console access exists (verification file `public/google38bdd18472ca76e4.html` is deployed); pulling its data is a dependency for the deferred strategy work.
- Blog frontmatter already carries title, date, and author (used for on-page rendering), so R7/R9 have their data source.
- A local skill (`.claude/skills/seo-skill/`) automates much of this setup for Next.js sites; it targets client/local-business sites, so its keyword generation should be skipped, but its sitemap/robots/metadata/checklist steps are reusable during planning.

## Outstanding Questions

**Deferred to planning**

- Whether the interactive landing-page walkthrough's copy is present in server-rendered HTML or only mounts client-side (affects how much of the landing narrative crawlers can read).
- How the sitemap stays current (build-time generation vs. maintained list) — mechanism choice belongs to planning.
- Whether Search Console currently has meaningful query data worth reviewing before the strategy follow-up.

## Sources / Research

- `src/components/site/metatags.tsx` — shared metadata component; hardcoded `og:type="article"`, deprecated keywords tag, no canonical. Used by 7 pages only.
- `src/app/blog/[blogPostId]/page.tsx` — renders frontmatter on-page but exports no per-post metadata.
- `src/app/blog/layout.tsx` — the generic "Andamio Blog" metadata every post currently inherits.
- `src/pages/` — Pages Router routes including `debug/` (should be blocked from crawlers).
- No `sitemap.xml` or `robots.txt` anywhere in the project (verified by search).
- `public/google38bdd18472ca76e4.html` — Google Search Console verification.
