/**
 * Funnel events only. No badge inputs, wallet addresses, emails, or free text.
 * `track` is a no-op until the Umami script has loaded.
 */
export const FUNNEL_EVENTS = [
  "show-me",
  "look-inside",
  "lifecycle-tab",
  "proof-rail-click",
  "walkthrough",
  "start-issuing",
  "docs",
] as const;

export type FunnelEvent = (typeof FUNNEL_EVENTS)[number];

type UmamiWindow = Window & { umami?: { track: (event: string) => void } };

export function track(event: FunnelEvent): void {
  if (typeof window === "undefined") return;
  (window as UmamiWindow).umami?.track(event);
}

/** Maps a destination the kit already links to onto a funnel event. */
export function trackHref(href: string | undefined): void {
  if (!href) return;
  if (href.includes("issuer.andamio.io")) track("start-issuing");
  else if (href === "/show-me" || href.startsWith("/show-me#") || href.startsWith("/show-me?")) track("show-me");
  else if (href.includes("walkthrough")) track("walkthrough");
  else if (href.startsWith("https://docs.andamio.io")) track("docs");
}
