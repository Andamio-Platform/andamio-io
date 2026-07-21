# Rollout and Rollback

- **as_of:** `2026-07-21`
- **Status:** planned
- **Deploy context:** existing manual `.github/workflows/vercel-deploy.yml` (no quality gates yet)

## Preconditions to roll forward

1. Concept A + keep/reuse/archive remain adopted.
2. Prototype approval recorded (date, owner, artifact link).
3. Requirements for the change set are `approved`.
4. Relevant agent briefs `completed` with verification evidence.
5. Verification matrix P0/P1 rows for touched surfaces are Pass.
6. QA-01 build/lint green on the release commit.

## Rollout steps

1. Merge to the release branch per team process (`dev` → production path as used today).
2. Run isolated production build locally or in CI; attach Lighthouse medians if UI/perf touched.
3. Deploy via existing Vercel workflow (or successor with gates once QA-01 lands).
4. Smoke production: `/`, `/show-me`, `/issuer`, `/developers`, sitemap, critical OG image.
5. If analytics enabled: verify consent + payload allowlist in production debug.
6. Mark implementation artifact `released` with deploy URL and commit SHA.

## Rollback triggers

- P0 accessibility regression (keyboard trap, missing main/skip after ship)
- Broken critical CTA or wrong-host API/docs links
- Lighthouse Performance/Accessibility median <90 on a canonical route without exception
- Visual brand break (neon kit defaults, missing wordmark/specimen)
- Error rate / blank funnel routes in production

## Rollback procedure

1. Redeploy previous known-good Vercel production deployment (platform rollback).
2. Revert or forward-fix the git commit on `dev` as appropriate; do not force-push protected defaults.
3. Record `rolled-back` on the implementation note with cause, failing matrix IDs, and recovery SHA.
4. Open defect mapped to requirement IDs before re-attempting release.

## Partial rollback guidance

- Prefer feature-flag or content revert for copy/CTA mistakes when available.
- Font/perf-only changes: revert `globals.css` / asset commits without full narrative rollback when matrix shows isolation.
- Never “rollback” by wiring archived V2 walkthrough as a hotfix unless a new emergency decision is adopted.

## Post-release

- Attach production smoke notes to verification matrix.
- Schedule PERF-02 field CWV review when privacy-approved telemetry exists.
- Keep Discord vs walkthrough CTR as P2 experiment after baseline.
