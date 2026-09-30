// Lab Web Vitals (LCP, CLS, TBT) per route, desktop and throttled mobile.
// Usage: node scripts/qa/vitals.mjs [baseUrl]
// Run against `next start`, not `next dev`. Reports the median of 3 loads.
import { chromium } from "playwright";

const base = process.argv[2] ?? "http://127.0.0.1:3000";
const routes = (
  process.env.VITALS_ROUTES ?? "/,/issuer,/show-me,/use-cases"
).split(",");
const profiles = [
  { name: "desktop", viewport: { width: 1440, height: 900 }, cpu: 1 },
  {
    name: "mobile",
    viewport: { width: 390, height: 844 },
    cpu: 4,
    mobile: true,
  },
];
const RUNS = 3;

const observe = () => {
  window.__v = { lcp: 0, cls: 0, tbt: 0 };
  new PerformanceObserver((l) => {
    for (const e of l.getEntries()) window.__v.lcp = e.startTime;
  }).observe({ type: "largest-contentful-paint", buffered: true });
  new PerformanceObserver((l) => {
    for (const e of l.getEntries())
      if (!e.hadRecentInput) window.__v.cls += e.value;
  }).observe({ type: "layout-shift", buffered: true });
  new PerformanceObserver((l) => {
    for (const e of l.getEntries())
      window.__v.tbt += Math.max(0, e.duration - 50);
  }).observe({ type: "longtask", buffered: true });
};

const median = (xs) => [...xs].sort((a, b) => a - b)[Math.floor(xs.length / 2)];
const browser = await chromium.launch({
  channel: process.env.PW_CHANNEL ?? "msedge",
});
for (const p of profiles) {
  for (const route of routes) {
    const runs = [];
    for (let i = 0; i < RUNS; i++) {
      const ctx = await browser.newContext({
        viewport: p.viewport,
        isMobile: p.mobile ?? false,
      });
      const page = await ctx.newPage();
      const cdp = await ctx.newCDPSession(page);
      await cdp.send("Emulation.setCPUThrottlingRate", { rate: p.cpu });
      await page.addInitScript(observe);
      await page.goto(base + route, { waitUntil: "load", timeout: 60000 });
      await page.waitForTimeout(3000);
      runs.push(await page.evaluate(() => window.__v));
      await ctx.close();
    }
    const lcp = median(runs.map((r) => r.lcp));
    const cls = median(runs.map((r) => r.cls));
    const tbt = median(runs.map((r) => r.tbt));
    console.log(
      `${p.name.padEnd(7)} ${route.padEnd(12)} LCP ${Math.round(lcp)}ms  CLS ${cls.toFixed(3)}  TBT ${Math.round(tbt)}ms`,
    );
  }
}
await browser.close();
