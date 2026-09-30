# Backlog

Open follow-ups that are not scheduled in a current plan. Remove an item when it ships or is dropped.

## Copy and links

Carried over from the March 2026 copy review (`docs/archive/root/landing-page-copy-review.md`).

- Pricing copy is being reworked separately. Keep `/pricing` free of unconfirmed numbers until then.
- Confirm the Pioneer Program URL before linking it anywhere.
- Point the developer code example at a real API example (mainnet.api.andamio.io already has one).

## Deploy Umami on GCP

The site already loads Umami, and only when both variables are set. Nothing is collected until this deploy exists. The GitHub issue for it lives on `Andamio-Platform/andamio-io`, not on the personal fork.

- **Cloud Run** runs the Umami container. One service, min instances 0 or 1, a custom domain such as `analytics.andamio.io` with managed SSL.
- **Cloud SQL Postgres** is the database. Private IP, a dedicated database and user, automated backups. Connection from Cloud Run via the Cloud SQL connector, not a public IP.
- **Env on the collector:** `DATABASE_URL`, `APP_SECRET` (random, stored in Secret Manager). Create the Andamio website in the Umami UI and copy its website id.
- **Env on this site:** `NEXT_PUBLIC_UMAMI_URL` (the collector origin, no trailing path) and `NEXT_PUBLIC_UMAMI_WEBSITE_ID`. Set them in the hosting environment for production only.
- **Retention:** 12 months of pageviews and the seven funnel events (`show-me`, `look-inside`, `lifecycle-tab`, `proof-rail-click`, `walkthrough`, `start-issuing`, `docs`). No cookies, no consent banner, and no event payloads beyond the event name.
- **Do not send** badge inputs, wallet or credential addresses, email bodies, or free text. The `track` helper only accepts the enum above.
