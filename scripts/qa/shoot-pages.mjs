// Full-page screenshots of the live routes at desktop and phone widths.
// Usage: node scripts/qa/shoot-pages.mjs [baseUrl] [label]
// Writes screenshots/<label>/<route>-<width>.png and reports horizontal overflow.
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const base = process.argv[2] ?? "http://127.0.0.1:3000";
const label = process.argv[3] ?? "latest";
const routes = (process.env.SHOOT_ROUTES ?? "/,/issuer,/show-me,/use-cases,/developers,/pricing,/about")
  .split(",")
  .filter(Boolean);
const widths = [
  { w: 1440, h: 900 },
  { w: 390, h: 844 },
];
const out = `screenshots/${label}`;
mkdirSync(out, { recursive: true });

const browser = await chromium.launch({ channel: process.env.PW_CHANNEL ?? "msedge" });
for (const { w, h } of widths) {
  const page = await browser.newPage({ viewport: { width: w, height: h } });
  page.on("response", (res) => {
    if (res.status() === 404 && res.url().startsWith(base)) console.log(`404      ${res.url()}`);
  });
  for (const route of routes) {
    await page.goto(base + route, { waitUntil: "load", timeout: 60000 });
    await page.waitForTimeout(1200);
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const name = (route === "/" ? "home" : route.slice(1).replace(/\//g, "_")) + `-${w}`;
    await page.screenshot({ path: `${out}/${name}.png`, fullPage: true });
    console.log(`${scrollWidth > w ? "OVERFLOW" : "ok      "} ${route} @${w} scrollWidth=${scrollWidth}`);
  }
  await page.close();
}
await browser.close();
