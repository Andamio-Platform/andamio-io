# Verification Matrix

- **as_of:** `2026-07-21`
- **Use:** QA fills Result/Evidence before release; N/A only with reason

| ID | Check | Routes | Command / method | Result | Evidence |
|---|---|---|---|---|---|
| V-BUILD | Lint + production build | — | `yarn next:lint && yarn build` | | |
| V-ROUTE | HTTP non-error | `/`, `/show-me`, `/issuer`, `/developers` | `yarn start` + curl/Playwright | | |
| V-HERO | Brand-first hero budget | `/` | Manual VIS/UX checklist | | |
| V-CTA | Issuer CTA hierarchy | `/`, `/issuer` | Manual + CTA ID inventory | | |
| V-SHOW | Show-me doors + recovery | `/show-me` | Playwright/manual keyboard | | |
| V-ISSUER | HowItWorks + BadgeBuilder present | `/issuer` | Manual + deep link `#how-it-works` | | |
| V-CLAIM | No real issue/verify claims | `/issuer` | Copy review CNT-02 | | |
| V-A11Y-STRUCT | main + skip | funnel | axe + keyboard | | |
| V-A11Y-TABS | WAI-ARIA tabs | `/issuer` | keyboard + SR note | | |
| V-A11Y-AXE | No Serious/Critical | `/`,`/issuer`,`/show-me` | axe-core | | |
| V-MOTION | reduced-motion OK | funnel | OS setting + MOT-02 | | |
| V-RESP | 320 px no overflow | funnel | DevTools 320/375/768/1024/1440 | | |
| V-CONTRAST | Orange/blue AA | CTAs/links | WebAIM | | |
| V-LH | Lighthouse median ≥90 ×4 cats | `/`,`/issuer`,`/show-me` | 3 cold mobile runs | | |
| V-JS | First-load JS budgets | build report | `yarn build` sizes | | |
| V-FONT | Bounded fonts | CSS | inventory vs globals.css | | |
| V-SEO-META | Unique meta + canonical | funnel + `/developers` | view-source / Playwright | | |
| V-SEO-SHOW | `/show-me` policy applied | sitemap/robots | SEO-01 | | |
| V-SEO-SOCIAL | Handle consistency | meta/footer/JSON-LD | SEO-02 | | |
| V-LINKS | Registry host agreement | content vs external-links | grep/tests | | |
| V-ANALYTICS | No sensitive payloads | if present | QA-07 fixtures | | |
| V-VISREG | Hero/issuer/show-me baselines | funnel | `yarn shoot` / reg-suit | | |
| V-LEGACY | No archived imports added | git diff | code review | | |

## Invalidation rules

- Concurrent `next dev` + `next build` corrupting `.next` → discard route 500s and rebuild clean.
- Unthrottled local DevTools “perf” → not a substitute for V-LH.
- Mailto click → not L4 conversion evidence.
