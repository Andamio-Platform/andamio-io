# Accessibility, responsive, and performance validation

- **checked_as_of / verified_on:** `2026-07-21`
- **Category freshness:** `ui-ux = 180 days`
- **Accepted unique websites:** `15`
- **Method:** Official product/docs pages; pricing labeled free/freemium/paid/inspiration-only; Andamio use focuses on issuer-primary landing craft.

| ID | Name | URL | Access | What it is | Andamio use | Notes |
|---|---|---|---|---|---|---|
| `axe-devtools` | axe DevTools | https://www.deque.com/axe/devtools/ | `freemium` | Browser a11y scanner with low false positives. | Primary automated a11y pass on / /issuer /show-me. | Free extension; Pro paid. |
| `wave` | WAVE | https://wave.webaim.org/ | `freemium` | Visual accessibility evaluation tool. | Quick manual a11y sanity checks. | Free extension; API paid. |
| `accessibility-insights` | Accessibility Insights | https://accessibilityinsights.io/ | `free` | Microsoft guided accessibility testing. | FastPass + assessment for WCAG AA. | Free. |
| `lighthouse` | Chrome Lighthouse | https://developer.chrome.com/docs/lighthouse | `free` | Perf/a11y/SEO/best-practices audits. | Release gate profile from Phase 1. | Free. |
| `webpagetest` | WebPageTest | https://www.webpagetest.org/ | `freemium` | Lab performance testing with filmstrips. | Cold-load LCP evidence. | Free runs + paid. |
| `pagespeed` | PageSpeed Insights | https://pagespeed.web.dev/ | `free` | Lab + field CWV reports. | Field p75 when public URL available. | Free. |
| `browserstack` | BrowserStack | https://www.browserstack.com/ | `paid` | Cross-browser device cloud. | Optional real-device QA. | Paid; free trial. |
| `responsively` | Responsively App | https://responsively.app/ | `free` | Multi-viewport development browser. | 320-1440 responsive sweeps. | Open source. |
| `polypane` | Polypane | https://polypane.app/ | `paid` | Dev browser with a11y/overlays. | Optional premium responsive QA. | Paid. |
| `storybook` | Storybook | https://storybook.js.org/ | `free` | Component workshop and visual docs. | Document kit specimens beyond /explore/system. | MIT. |
| `chromatic` | Chromatic | https://www.chromatic.com/ | `freemium` | Visual testing for Storybook. | Visual regression if Storybook adopted. | Free tier + paid. |
| `playwright` | Playwright | https://playwright.dev/ | `free` | E2E/browser automation. | Already in repo for screenshots; expand tests. | Apache-2.0. |
| `pa11y` | Pa11y | https://pa11y.org/ | `free` | CLI accessibility testing. | CI a11y gate candidate. | Open source. |
| `wcag-quickref` | W3C WCAG 2.2 Quick Ref | https://www.w3.org/WAI/WCAG22/quickref/ | `free` | Authoritative WCAG criteria. | Acceptance criteria source. | Free. |
| `web-vitals` | web-vitals library | https://github.com/GoogleChrome/web-vitals | `free` | Field CWV JS library. | Privacy-approved RUM later. | Apache-2.0. |
