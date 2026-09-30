import Script from "next/script";

/**
 * Umami. Renders nothing until both public env vars are set, so local and
 * preview builds do not call a collector that does not exist yet.
 */
export function Analytics() {
  const base = process.env.NEXT_PUBLIC_UMAMI_URL?.replace(/\/$/, "");
  const websiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;
  if (!base || !websiteId) return null;
  return <Script src={`${base}/script.js`} data-website-id={websiteId} strategy="afterInteractive" />;
}
