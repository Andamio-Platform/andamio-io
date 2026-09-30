---
title: How SEO works on this site
date: 2026-07-02
category: seo
module: site-wide (landing-page-and-blog)
problem_type: architecture_reference
component: metadata
severity: medium
applies_when:
  - Adding a new page, blog post, customer page, or paper and wanting it indexed correctly
  - Changing the domain, default title/description, or social-share defaults
  - Debugging why a page shows the wrong title, description, or social card
  - Planning the next round of SEO investment
tags: [seo, nextjs, sitemap, robots, open-graph, json-ld, metadata, pages-router, app-router]
---

# How SEO works on this site

## Context

The site is a hybrid Next.js app: marketing pages live in the **Pages Router**
(`src/pages/`), while blog, brand, and customers live in the **App Router**
(`src/app/`). That means there are two metadata mechanisms, and the design
goal of the 2026-07 SEO pass was to make each one correct while keeping a
single source of truth so refinement stays cheap. Requirements:
`docs/archive/brainstorms/2026-07-02-seo-improvements-requirements.md`.

## The architecture

**One source of truth: `src/lib/seo.ts`.** Domain (`SITE_URL`), site name,
default title/description, default OG image, Twitter handle, `absoluteUrl()`
helper, and the Organization JSON-LD object all live here. Every other SEO
surface imports from it. Change the domain or a default in exactly one place.

**Pages Router: `src/components/site/metatags.tsx` is the only SEO surface.**
- Emits title, meta description, canonical (computed from `useRouter().asPath`
  against `SITE_URL` — no per-page URL wiring), Open Graph, Twitter card,
  favicon, viewport, charset.
- Every tag carries a `key`, so `next/head` dedupes: `_app.tsx` renders
  `<Metatags />` as a site-wide fallback, and any page-level `<Metatags>`
  overrides it cleanly. **Never add a raw `<title>` or `<meta>` SEO tag to a
  page — render `<Metatags>` with props instead.** Raw tags don't carry the
  dedupe keys and will duplicate the fallback tags.
- The `title` prop gets `" — Andamio"` appended; don't include the brand in it.
- `ogType` defaults to `"website"` (the old component hardcoded `"article"`
  everywhere — that was a bug).

**App Router: `generateMetadata` + layout defaults.**
- `src/app/blog/[blogPostId]/page.tsx` and
  `src/app/customers/[customerId]/page.tsx` derive per-page metadata (title,
  description, canonical, OG article tags, Twitter card) from markdoc
  frontmatter. Description falls back to `extractExcerpt()`
  (`src/utils/markdown.ts`) — the first substantial body paragraph — when
  frontmatter has no `description` field. Frontmatter now supports an optional
  `"description"` key; prefer setting it on new posts.
- Layouts (`blog/layout.tsx`, `customers/layout.tsx`, `brand/layout.tsx`) set
  `metadataBase`, a title template (`%s — Andamio`), and segment defaults.
  Don't set `alternates.canonical` in a layout whose child pages can't
  override it (client-component pages can't export metadata — that's why
  brand has no canonical).

**Discovery: `src/app/sitemap.ts` + `src/app/robots.ts`.**
- The sitemap derives blog entries from `getBlogPostData()`, customer pages
  from `getCustomerPages()` (`src/lib/customers.ts`), and papers from
  `SUB_PAPERS` (`src/lib/papers.ts`) — content additions appear automatically.
  Posts/pages with `redirectTo` frontmatter are excluded.
- **Adding a new top-level page requires one edit:** append the route to
  `STATIC_ROUTES` in `src/app/sitemap.ts`. That's the only manual step.
- `robots.ts` allows everything except `/debug` and `/explore` (internal
  tooling / design-system reference) and points at the sitemap.

**Structured data (JSON-LD).**
- Organization schema on the landing page (`src/pages/index.tsx`, object in
  `src/lib/seo.ts`).
- Article schema on blog posts (inline in the post page component).

## Gotchas learned during the pass

- The old `Metatags` produced `"Andamio - Andamio"` as the homepage title
  (defaultProps + unconditional suffix). Watch for title composition when
  touching the component.
- Markdoc frontmatter here is **JSON between `---` fences**, not YAML.
  `parseBlogMarkdocFrontmatter` returns `undefined` on malformed JSON — pages
  render, but metadata silently degrades. Validate frontmatter when a post's
  card looks generic.
- `src/app/*` segments are parallel root layouts (each renders `<html>`);
  `metadataBase` must be set per layout, not once globally.

## What to improve next (ranked)

1. **Post-deploy verification** (R12 in the requirements doc): submit
   `https://www.andamio.io/sitemap.xml` in Google Search Console (verification
   file already deployed), run a social-card validator on `/` and one blog
   post, and check a post in Google's rich-results test.
2. **A real default OG image.** The fallback is `/andamio.png` (1024×1024
   square); social cards want 1200×630. Create `public/og-default.png` and
   change `DEFAULT_OG_IMAGE` in `src/lib/seo.ts` — one line.
3. **Per-post OG images.** Frontmatter already supports `"image"`; almost no
   posts set it. Either backfill key posts or generate images per post.
4. **Verify the landing walkthrough copy is server-rendered.** If the
   archetype walkthrough's narrative copy only mounts client-side, crawlers
   miss the landing page's main story. Check `curl`'d HTML for walkthrough text.
5. **Keyword/content phase.** Once Search Console accumulates data on the
   fixed site, review queries with impressions and decide what content to
   build. Deliberately deferred from this pass.
6. **Blog index ordering** sorts by filename (`localeCompare` on the numeric
   slug), not date — works while posts stay zero-padded; will break at other
   naming schemes.
7. **RSS feed** for the blog — cheap distribution/discoverability win.
8. **`generateStaticParams`** on blog/customer dynamic pages so they render at
   build time (performance; indirectly SEO).
