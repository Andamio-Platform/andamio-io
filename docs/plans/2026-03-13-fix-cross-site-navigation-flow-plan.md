---
title: "fix: Cross-Site Navigation Flow (Landing → API → Docs)"
type: fix
status: active
date: 2026-03-13
deepened: 2026-03-13
---

# fix: Cross-Site Navigation Flow (Landing → API → Docs)

## Enhancement Summary

**Deepened on:** 2026-03-13
**Research agents used:** best-practices-researcher, framework-docs-researcher, architecture-strategist, security-sentinel, code-simplicity-reviewer, pattern-recognition-specialist

### Key Improvements from Research
1. **Corrected tab behavior** — API Reference should open same-tab (same ecosystem), not new-tab as originally proposed
2. **Added link constants file** — `src/lib/external-links.ts` to prevent future URL drift across 40+ hardcoded references
3. **Refined label vocabulary** — "API Docs" retired everywhere, replaced with "Docs" + "API Reference" as canonical terms
4. **Scoped down** — Removed scope creep items (footer addition, Swagger deprecation, stub pages) into separate tasks
5. **Added security hardening** — `rel` attribute strategy, Referrer-Policy headers, API gateway CSP headers as prerequisite
6. **Fumadocs implementation details** — Specific API for logo external URL, nav links, sidebar external links

### New Considerations Discovered
- API gateway static HTML has NO security headers — should be fixed before/alongside navigation changes
- `rel="noreferrer"` on same-org subdomain links breaks analytics tracking — use `rel="noopener"` only
- Industry consensus (NN/g, Stripe, Vercel): docs landing pages should be category hubs, not redirects
- Three navigation components exist in the landing page repo — only V2Navigation is active

---

## Overview

The three Andamio web properties (andamio.io, api.andamio.io, docs.andamio.io) have fragmented navigation that creates circular loops, misleading labels, dead-end pages, and inconsistent URLs. A developer clicking "API Docs" from the landing page ends up on an empty docs gateway, clicks through to the API site, clicks "Docs" there, and lands back on the same empty page. The interactive API reference at `dev.api.andamio.io/reference` is undiscoverable from any other site.

## Problem Statement / Motivation

Developers evaluating or integrating the Andamio API face unnecessary friction:
- **7 distinct links** on the landing page all point to `docs.andamio.io` (root) regardless of context
- The docs root is an empty gateway page requiring an extra click
- The actual API reference (Scalar at `/reference`) has **zero inbound links** from the landing page
- Neither docs nor API site links back to andamio.io
- Inconsistent app URLs and Discord invite links erode trust

This directly impacts developer conversion — every unnecessary click or confusing redirect is a potential drop-off point.

## Proposed Solution

### Domain Role Clarity

| Domain | Role | Primary Content |
|---|---|---|
| `andamio.io` | Marketing & product | Pricing, use cases, blog, about |
| `docs.andamio.io` | Documentation | Guides, protocol docs, SDK reference |
| `api.andamio.io` | Developer gateway | Signpost page + interactive API reference (`/reference`) |
| `app.andamio.io` | Application | Wallet connection, API keys, courses |

### Canonical Label Vocabulary

**Never use "API Docs"** — it is ambiguous. Use these canonical labels consistently across all three properties:

| Canonical Label | Destination | Meaning |
|---|---|---|
| **Docs** | `docs.andamio.io/docs` | Guides, protocol docs, tutorials |
| **API Reference** | `dev.api.andamio.io/reference` | Interactive Scalar endpoint reference |
| **Get Started** | `app.andamio.io` | Primary conversion CTA |
| **App** | `app.andamio.io` | For existing users |
| **GitHub** | `github.com/Andamio-Platform` | Source code |
| **Discord** | `discord.gg/FtvpAYnBMU` | Community (single canonical invite) |

**Contextual CTA variants** (longer phrases on landing page sections):

| Label | Context | Destination |
|---|---|---|
| "Explore the Docs" | Hero section | `docs.andamio.io/docs` |
| "View Full API Reference" | Code/curl section | `dev.api.andamio.io/reference` |
| "Read the Getting Started Guide" | Architecture "Developer" card | `docs.andamio.io/docs/guides/getting-started` |
| "Read the Docs" | CTA footer | `docs.andamio.io/docs` |

### Research Insights: Label Conventions

**Best practices (Stripe, Vercel, Supabase, Cloudflare):**
- "API Reference" is the overwhelming industry standard for interactive endpoint docs (not "API Explorer" or "API Docs")
- Footer should mirror nav — add "API Reference" to footer alongside "Docs"
- Logo on sub-sites should link to parent domain (`andamio.io`), not to `/`

### Link Destination Map (Proposed)

| Label | Current Target | Correct Target | Location |
|---|---|---|---|
| ~~"API Docs"~~ → "Docs" (nav) | `docs.andamio.io` | `docs.andamio.io/docs` | V2Navigation.tsx |
| NEW: "API Reference" (nav) | — | `dev.api.andamio.io/reference` | V2Navigation.tsx |
| "Explore the Docs" (hero) | `docs.andamio.io` | `docs.andamio.io/docs` | V2HeroSection.tsx |
| "View Full API Reference" (code) | `docs.andamio.io` | `dev.api.andamio.io/reference` | V2CodeSection.tsx |
| ~~"Read the Docs"~~ → "Read the Getting Started Guide" (arch) | `docs.andamio.io` | `docs.andamio.io/docs/guides/getting-started` | V2ArchitectureSection.tsx |
| "Read the Docs" (CTA footer) | `docs.andamio.io` | `docs.andamio.io/docs` | V2CTAFooter.tsx |
| "Docs" (footer) | `docs.andamio.io` | `docs.andamio.io/docs` | Footer.tsx |
| NEW: "API Reference" (footer) | — | `dev.api.andamio.io/reference` | Footer.tsx |
| "Docs" (API header) | `docs.andamio.io` | `docs.andamio.io/docs` | index.html (andamio-api) |
| "Explore the Docs" (API hero) | `docs.andamio.io` | `docs.andamio.io/docs` | index.html (andamio-api) |
| ~~"API Docs"~~ → "API Reference" (docs nav) | `api.andamio.io` | `dev.api.andamio.io/reference` | layout.config.tsx (andamio-docs) |
| "App" (API footer) | `mainnet.app.andamio.io` | `app.andamio.io` | index.html (andamio-api) |

### Tab & Rel Attribute Convention

**Rule: Same tab for same-org properties. New tab only for truly external sites.**

| Link Target | Tab | `rel` Attribute | Reason |
|---|---|---|---|
| docs.andamio.io | Same | none | Same ecosystem; preserves back button |
| dev.api.andamio.io/reference | Same | none | Same ecosystem (per NN/g, WCAG 3.2.5) |
| app.andamio.io | New | `noopener noreferrer` | Different application context (wallet) |
| github.com | New | `noopener noreferrer` | External |
| discord.gg | New | `noopener noreferrer` | External |

### Research Insights: Tab Behavior

**Industry consensus (WCAG 2.2, NN/g, SensioLabs 2025):**
- Links between your own properties should **always** open in the same tab
- `target="_blank"` disorients users and breaks the back button (WCAG 3.2.5)
- Users who want a new tab can Ctrl/Cmd+Click themselves
- **Correction from original plan:** API Reference should be same-tab, not new-tab — it's part of the same developer journey

### Research Insights: Rel Attributes

**Security research findings:**
- `rel="noopener"` — required on all `target="_blank"` links (prevents `window.opener` tabnapping)
- `rel="noreferrer"` — do NOT use on same-org subdomain links; it strips referrer data from your own analytics. Only use on truly external links.
- For same-tab same-org links (docs, API Reference): no `rel` attribute needed
- For new-tab external links (app, GitHub, Discord): use `rel="noopener noreferrer"`
- Modern browsers auto-apply `noopener` on `target="_blank"`, but set explicitly for older browsers

## Implementation Phases

### Phase 0: Link Constants File (landing-page-and-blog)

**Priority: P0 — Do first, before any link changes**

#### 0a. Create centralized link constants

**File:** `src/lib/external-links.ts` (NEW)

```typescript
export const EXTERNAL_LINKS = {
  docs: "https://docs.andamio.io/docs",
  docsGettingStarted: "https://docs.andamio.io/docs/guides/getting-started",
  apiReference: "https://dev.api.andamio.io/reference",
  app: "https://app.andamio.io",
  github: "https://github.com/Andamio-Platform",
  discord: "https://discord.gg/FtvpAYnBMU",
  linkedin: "https://www.linkedin.com/company/andamio-platform",
  twitter: "https://x.com/AndamioPlatform",
} as const;
```

Then replace the 40+ hardcoded URL occurrences across V2Navigation, V2HeroSection, V2CodeSection, V2ArchitectureSection, V2CTAFooter, and Footer with references to this constant.

### Research Insights: Preventing Future Drift

**Architecture strategist recommendation:**
- Without a centralized link source, hardcoded URLs will drift again (exactly the problem we're fixing)
- A constants file is the minimum viable solution for a single repo
- For cross-repo consistency: duplicate the constants file in each repo with a comment pointing to the canonical source
- A more ambitious approach (future): CDN-hosted web component for shared nav (Jim Nielsen pattern, 2025)

---

### Phase 1: Landing Page Fixes (repo: `landing-page-and-blog`)

**Priority: P0 — Fix immediately**

#### 1a. Fix V2Navigation link labels and destinations

**File:** `src/ui/landing/V2Landing/V2Navigation.tsx`

- Rename "API Docs" → "Docs", point to `EXTERNAL_LINKS.docs`
- Add new nav item "API Reference" → `EXTERNAL_LINKS.apiReference`
- Remove `external: true` / `target="_blank"` from both Docs and API Reference links (same-tab for all same-org properties)
- Remove `rel="noopener noreferrer"` from same-org links

#### 1b. Fix V2CodeSection API reference link

**File:** `src/ui/landing/V2Landing/V2CodeSection.tsx`

- Change "View Full API Reference" href to `EXTERNAL_LINKS.apiReference`
- Remove `target="_blank"` (same ecosystem, same tab)

#### 1c. Deep-link all docs references and update labels

**Files:**
- `src/ui/landing/V2Landing/V2HeroSection.tsx` — "Explore the Docs" → `EXTERNAL_LINKS.docs`, remove `target="_blank"` if present
- `src/ui/landing/V2Landing/V2ArchitectureSection.tsx` — Rename "Read the Docs" → "Read the Getting Started Guide", point to `EXTERNAL_LINKS.docsGettingStarted`, remove `target="_blank"`
- `src/ui/landing/V2Landing/V2CTAFooter.tsx` — "Read the Docs" → `EXTERNAL_LINKS.docs`
- `src/ui/landing/Footer.tsx` — "Docs" → `EXTERNAL_LINKS.docs`, add new "API Reference" → `EXTERNAL_LINKS.apiReference`

#### 1d. Normalize rel attributes

**Files:** All V2 landing components

- Same-org links (docs, API Reference): remove `target="_blank"`, remove `rel="noopener noreferrer"`
- External links (app, GitHub, Discord): keep `target="_blank"`, use `rel="noopener noreferrer"`

---

### Phase 2: API Gateway Fixes (repo: `andamio-api`)

**Priority: P0 — Deploy within days of Phase 1**

#### 2a. Fix header/footer links in gateway HTML

**File:** `web/public/index.html`

- "Docs" nav link → `https://docs.andamio.io/docs` (add `/docs` suffix)
- "Explore the Docs" CTA → `https://docs.andamio.io/docs`
- "Follow the guide" → `https://docs.andamio.io/docs/guides/getting-started` (already correct)
- "App" footer link → `https://app.andamio.io` (standardize from `mainnet.app.andamio.io`)
- Discord footer link → `https://discord.gg/FtvpAYnBMU` (standardize)
- Add "API Reference" to footer alongside "Docs"

#### 2b. Make logo link to andamio.io

**File:** `web/public/index.html`

- Change logo `href` from `/` to `https://andamio.io`
- This follows the universal convention: logo on sub-sites = link to parent brand

### Research Insights: Logo Linking

**NN/g Universal Navigation guidelines:**
- "Position the home link near the logo, upper left — label it with the domain name"
- Logo on a subdomain property should navigate to the parent brand site
- If preserving access to the API gateway root is needed, add a breadcrumb or secondary "API Home" link

---

### Phase 3: Docs Site Fixes (repo: `andamio-docs`)

**Priority: P0**

#### 3a. Redirect docs root to /docs

**File:** `app/(home)/page.tsx`

**Recommended implementation** (simplest, per Fumadocs research):

```tsx
import { redirect } from 'next/navigation';

export default function HomePage() {
  redirect('/docs');
}
```

**Alternative** (better for SEO — permanent redirect):

```js
// next.config.mjs
const config = {
  redirects: async () => [
    { source: '/', destination: '/docs', permanent: true },
  ],
};
```

**Future enhancement** (separate task): Replace redirect with a category hub landing page (like Stripe docs, Supabase docs). Include: Getting Started quickstart, product category cards, search, client library links.

### Research Insights: Docs Landing Pages

**Industry consensus (Stripe, Vercel, Supabase, Cloudflare):**
- Top docs sites use a **category hub** landing page, not a redirect
- Common elements: hero, "Getting Started" CTA, product/feature category cards, search, framework quickstarts
- A redirect is the right short-term fix, but a proper hub page should follow
- The redirect should be hardcoded (no query parameter input) to avoid open redirect vulnerabilities

#### 3b. Fix nav links and logo

**File:** `app/layout.config.tsx`

```tsx
export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (<Image src="/andamio-logo.svg" alt="Andamio" width={120} height={30} />),
      url: 'https://andamio.io',  // Logo links to main site
    },
    links: [
      { text: 'Guides', url: '/docs/guides' },
      { text: 'Protocol', url: '/docs/protocol' },
      { text: 'API Reference', url: 'https://dev.api.andamio.io/reference', external: true },
    ],
  };
}
```

### Research Insights: Fumadocs Configuration

**Fumadocs v15.x API details:**
- `nav.url` accepts any URL string including external domains — use `'https://andamio.io'` to make logo link to main site
- `links` array supports types: standard (default), `'icon'`, `'menu'` (dropdown), `'custom'` (any React component)
- `external: true` on a link item opens in new tab — but per our tab convention, API Reference should be same-tab, so omit this flag
- Sidebar external links in `meta.json` use syntax: `"[andamio.io](https://andamio.io)"` or `"external:[GitHub](https://github.com/Andamio-Platform)"`

#### 3c. Add andamio.io to sidebar external links

**File:** `content/docs/meta.json`

Add to the `pages` array in the External section:
```json
"[andamio.io](https://andamio.io)"
```

**Priority: P1**

#### 3d. Fix empty SDK meta.json

**File:** `content/docs/sdk/meta.json`

- Add proper page ordering for SDK section
- Currently 0 bytes — sidebar for SDK section may render incorrectly or auto-generate without ordering

---

## Security Considerations

### Research Insights: Security Review Findings

**HIGH priority (recommended as prerequisite):**
- API gateway static HTML currently receives NO security headers (no CSP, no X-Frame-Options, no HSTS). Adding navigation links increases the attack surface. Recommended fix in Go/Fiber:

```go
app.Use(func(c *fiber.Ctx) error {
    c.Set("Content-Security-Policy", "default-src 'self'; frame-ancestors 'none'")
    c.Set("X-Content-Type-Options", "nosniff")
    c.Set("X-Frame-Options", "DENY")
    c.Set("Strict-Transport-Security", "max-age=31536000; includeSubDomains")
    c.Set("Referrer-Policy", "strict-origin-when-cross-origin")
    return c.Next()
})
```

**MEDIUM priority:**
- Add `Referrer-Policy: strict-origin-when-cross-origin` header to all three web properties
- Audit cookie scope — cookies on `.andamio.io` are sent to all subdomains; restrict to narrowest necessary domain
- Verify HSTS enforcement across all subdomains

**LOW priority:**
- Open redirect in docs root redirect is safe IF destination is hardcoded (no user input)
- Discord links: use direct `discord.gg` URLs, never URL shorteners (phishing risk)

---

## System-Wide Impact

### Interaction Graph

Changes span three independently deployed sites. No shared component library or navigation config exists — each site maintains its own links. The link constants file (Phase 0) prevents drift within the landing page repo. For cross-repo consistency, duplicate the constants with a canonical-source comment.

### Research Insights: Shared Navigation

**Architecture strategist assessment:**
- "No shared navigation component" is correct at this scale — the three sites use different tech stacks (Next.js, Go/Fiber static HTML, Fumadocs/Next.js)
- A shared web component (CDN-hosted) would be the next step if link drift recurs
- The link constants file is the minimum viable solution for now

### Error Propagation

No runtime errors. All changes are static link updates (HTML href attributes, React component props). Worst case: a link points to a page that doesn't exist yet. Mitigation: `docs.andamio.io/docs` already works — the redirect just eliminates the extra step for users who land on the root.

### Deployment Coordination

**Architecture strategist recommendation:** Phase 2 (API gateway) should deploy within days of Phase 1 (landing page) to minimize the temporal inconsistency window. The API gateway changes are trivial (static HTML edits) and should not be delayed.

### State Lifecycle Risks

None. No database, session, or cache state involved.

---

## Acceptance Criteria

### Functional Requirements

- [x] Developer clicking "Docs" from andamio.io lands on docs.andamio.io/docs (actual content)
- [x] Developer clicking "API Reference" from andamio.io lands on dev.api.andamio.io/reference (Scalar)
- [x] Developer clicking "View Full API Reference" from code section lands on dev.api.andamio.io/reference
- [x] docs.andamio.io root redirects to /docs (no empty gateway)
- [x] api.andamio.io logo links to andamio.io
- [x] docs.andamio.io logo links to andamio.io
- [x] All app.andamio.io references use consistent URL (not mainnet.app.andamio.io)
- [x] All Discord links use `discord.gg/FtvpAYnBMU`
- [x] No circular navigation loops exist between any two sites
- [x] Footer includes both "Docs" and "API Reference" links
- [x] Link constants file exists at `src/lib/external-links.ts` with all cross-site URLs centralized

### Non-Functional Requirements

- [x] Same-org cross-site links (docs, API Reference) open in same tab — no `target="_blank"`
- [x] External links (app, GitHub, Discord) open in new tab with `rel="noopener noreferrer"`
- [x] Same-org links do NOT have `rel="noreferrer"` (preserves analytics referrer data)

---

## Dependencies & Risks

| Risk | Impact | Mitigation |
|---|---|---|
| Deployment ordering | Landing page deep-links to `/docs` before redirect is live | `/docs` path already works — no breakage |
| Temporal inconsistency | API site has stale links between Phase 1 and Phase 2 | Deploy Phase 2 within days of Phase 1 |
| Fiber route ordering | API redirects must be registered before `app.Static()` | Institutional learning documented; verify in PR review |
| Analytics referrer loss | Using `rel="noreferrer"` on same-org links breaks tracking | Use `rel="noopener"` only for same-org `target="_blank"` |
| API gateway security headers | Static HTML has no CSP/HSTS | File separate issue; prioritize alongside Phase 2 |
| V2Navigation changes propagate | All pages using V2Navigation get new nav | This is desired — single source of truth |

---

## Out of Scope (Separate Tasks)

| Item | Reason | Separate Task? |
|---|---|---|
| Add standard Footer to V2 homepage | Layout/design task, not navigation | Yes |
| Deprecate old Swagger UI (`/api/v1/docs/*`) | Strategic API docs decision | Yes |
| Fix stub docs pages (protocol, tokenomics) | Content problem, not navigation | Yes |
| Redesign docs.andamio.io landing page as category hub | Enhancement after redirect | Yes |
| Remove deprecated nav components (NavigationBar, ModernLanding) | Tech debt cleanup | Yes |
| Update hardcoded version badge in Footer (`v0.3.3`) | Cosmetic | No |
| CSP headers for API static files | Security task (but HIGH priority) | Yes — deploy alongside Phase 2 |
| Shared cross-repo navigation web component | Future architectural improvement | Only if drift recurs |

---

## Sources & References

### Internal References

- Existing API gateway brainstorm: `andamio-api/docs/brainstorms/2026-03-09-api-developer-gateway-brainstorm.md`
- Existing API gateway plan: `andamio-api/docs/plans/2026-03-10-feat-api-developer-gateway-plan.md`
- V2 landing design: `landing-page-and-blog/docs/plans/2026-03-04-landing-page-v2-design.md`

### External References

- [Universal Navigation: NN/g](https://www.nngroup.com/articles/universal-navigation/) — 6 design guidelines for cross-site nav
- [Consistent Nav Across Inconsistent Sites (Jim Nielsen, 2025)](https://blog.jim-nielsen.com/2025/consistent-nav-across-inconsistent-sites-pt-ii/) — CDN web component pattern
- [The Tab Trap: Why Forcing New Tabs Is Bad UX (SensioLabs, 2025)](https://sensiolabs.com/blog/2025/the-tab-trap-why-forcing-new-tabs-is-bad-ux)
- [WCAG 2.2 Guideline 3.2.5: Change on Request](https://www.w3.org/WAI/WCAG22/Understanding/change-on-request.html)
- [Cloudflare: Subdomains vs Subdirectories](https://blog.cloudflare.com/subdomains-vs-subdirectories-best-practices-workers-part-1/)
- [Fumadocs Layout API](https://fumadocs.dev/docs/ui/layouts) — nav.url, links array, meta.json external links

### Key Files per Repository

**landing-page-and-blog:**
- `src/lib/external-links.ts` — NEW: centralized link constants
- `src/ui/landing/V2Landing/V2Navigation.tsx` — primary nav (lines 11-18: navItems)
- `src/ui/landing/V2Landing/V2CodeSection.tsx` — API reference link (line 31)
- `src/ui/landing/V2Landing/V2HeroSection.tsx` — hero CTA (line 81)
- `src/ui/landing/V2Landing/V2ArchitectureSection.tsx` — developer card link (line 66)
- `src/ui/landing/V2Landing/V2CTAFooter.tsx` — developer CTA (line 39)
- `src/ui/landing/Footer.tsx` — shared footer (line 8: docs link)

**andamio-api:**
- `web/public/index.html` — gateway HTML (header + footer nav)
- `web/public/reference.html` — Scalar API reference
- `internal/router/main_router.go` — route registration (redirect order matters)

**andamio-docs:**
- `app/(home)/page.tsx` — empty gateway home page → redirect
- `app/layout.config.tsx` — header nav links + logo URL
- `content/docs/meta.json` — sidebar structure + external links
- `content/docs/sdk/meta.json` — empty (0 bytes)
