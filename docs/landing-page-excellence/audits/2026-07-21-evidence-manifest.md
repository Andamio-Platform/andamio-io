# Phase 1 evidence and reproducibility manifest

- **Evidence date:** 2026-07-21
- **Manifest capture timestamp:** `2026-07-21T22:06:33.3895628+03:30`
- **Source commit audited:** `0890cc35a233f81efa2c33310b9b0f8c70fc7cb5`
- **Documentation correction base:** `698e4d091b5a7785027d530ea549327450cc32dd`
- **Branch:** `dev`
- **Host:** Windows 10 (`win32 10.0.19045`)
- **Local origin:** `http://localhost:3000`
- **Owner:** Landing Excellence Program

## Tool versions

Captured with `node --version; yarn --version; git --version`:

- Node.js: `v20.17.0`
- Yarn: `1.22.22`
- Git: `2.31.1.windows.1`
- Repository declaration: `package.json` specifies `yarn@1.22.19`; the installed Yarn version differs.
- Next.js: `package.json` declares `^14.0.4`; the exact installed resolution was not separately captured.
- Browser name/version and Lighthouse version: not captured.

## Evidence inventory

| Evidence | Exact method or command | Runs | Result | Durable report location |
|---|---|---:|---|---|
| Clean production build | `yarn build` | 1 supplied successful run | Passed on 2026-07-21; `/` 1.66 kB page, 160 kB first-load JS, 125 kB shared | Console output only; no retained report path was supplied |
| Local runtime sample | Browser performance tooling against `http://localhost:3000/` | Run count not captured | FCP/LCP 296 ms, CLS 0, encoded HTML 5.7 KB, one 50 ms long task | No exported trace/report location was supplied |
| Source commit | `git rev-parse HEAD` before documentation work | 1 | `0890cc35a233f81efa2c33310b9b0f8c70fc7cb5` | Git object database |
| Critical tracked assets | `git ls-files public \| rg "(^|/)(andamio\\.png|andamio-credential-badge\\.svg|andamio-logo\\.svg|logo-with-typography[^/]*\\.svg)$"` | 1 | All referenced PNG/badge/wordmark assets listed as tracked | Git index; command output only |
| Route GET status | `curl.exe -sS -o NUL -w "%{http_code}" --max-time 10 "http://localhost:3000<path>"` for `/`, `/issuer`, `/show-me`, `/developers` | 1 final batch plus an earlier supplied successful batch | Earlier batch 200; final batch 500 during `.next` interference | Console output only |
| Route/asset HEAD status | PowerShell `Invoke-WebRequest -Method Head -UseBasicParsing -TimeoutSec 5` against canonical routes, sitemap, and critical assets | 1 final batch | Page routes 500 during `.next` interference; sitemap and assets 200 with expected XML/image content types | Console output only |
| Sitemap membership | `(Invoke-WebRequest -Uri 'http://localhost:3000/sitemap.xml' -UseBasicParsing -TimeoutSec 10).Content -match '/show-me'` | 1 | `False` | Console output only; source authority is `src/app/sitemap.ts` |
| Markdown links | Enumerated Markdown destinations and resolved each repository-relative target | 1 | Passed for the Phase 1 audit set | No standalone report |
| Patch whitespace | `git diff --cached --check` | Run for each Phase 1 documentation commit | Passed | Git diff; console output only |

## Browser and measurement profile

- The only completed browser observation was desktop at approximately **1024 × 768 CSS px**.
- Local runtime numbers came from an **unthrottled development server** on localhost. CPU throttling: none. Network throttling: none.
- Cache state was not captured. Cold/warm cache parity was not tested.
- Runtime measurement repetition count was not captured; no median, variance, or percentile can be calculated.
- The homepage loaded during the completed desktop observation. Mobile, keyboard-only, reduced-motion, screen-reader, zoom/reflow, and full-route browser checks were interrupted and remain unverified.
- No Lighthouse run was completed. No Lighthouse JSON/HTML, HAR, browser trace export, screenshot set, bundle-analyzer report, or field Core Web Vitals report exists for this phase.
- The local numbers are **non-representative diagnostics**, not evidence of production Lighthouse or Core Web Vitals performance.

## `.next` interference and route 500s

The later page-route 500 responses were caused by tooling interference: a development server and a build/rebuild were run concurrently against the same `.next` directory. The rebuild reported `EPERM` opening `.next/trace` while the dev process owned build output, and generated state was no longer safe for route verification. This is a shared-output-directory failure, **not evidence of an application route defect**.

Reproduction safety rule:

1. Stop every `next dev`, `next start`, and `next build` process using the repository.
2. Use a clean output directory for one mode at a time; never run build and dev concurrently against `.next`.
3. Run `yarn build` to completion.
4. Start the intended server from that completed artifact, then probe routes.
5. If isolation cannot be guaranteed, label route status inconclusive and do not attribute failures to application code.

No further build was attempted in Phase 1 because preserving the running environment and avoiding more shared `.next` mutation took precedence.

## Evidence boundaries

- Facts tied to `0890cc35a233f81efa2c33310b9b0f8c70fc7cb5` remain the source baseline even though the audits were committed later.
- `Glob` results respect ignore rules and are not filesystem or Git-tracking evidence. Asset conclusions use `git ls-files` and HTTP responses instead.
- Production deployment, CDN behavior, field traffic, Search Console, analytics, outbound destinations, and CI run history were not inspected.
