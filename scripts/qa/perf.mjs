// Main-thread cost of the idle badge animation over 4 s (CDP Performance).
import { chromium } from "playwright";

const browser = await chromium.launch({
  channel: process.env.PW_CHANNEL ?? "msedge",
});
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(process.argv[2] ?? "http://localhost:3100", {
  waitUntil: "networkidle",
  timeout: 120000,
});
if (process.env.NO_BADGE)
  await page.addStyleTag({ content: ".pb-frame{display:none!important}" });
if (process.env.ONLY_BADGE)
  await page.addStyleTag({
    content:
      "[class*='sys-'],.credential-aura,[class*='ambient']{animation:none!important;display:none!important}",
  });
if (process.env.DISABLE)
  await page.addStyleTag({
    content: `${process.env.DISABLE}{animation:none!important}`,
  });
await page.waitForTimeout(3000);
const cdp = await page.context().newCDPSession(page);
await cdp.send("Performance.enable");
const pick = (m) =>
  Object.fromEntries(
    m.metrics
      .filter((x) => /Duration|LayoutCount|RecalcStyleCount/.test(x.name))
      .map((x) => [x.name, x.value]),
  );
const a = pick(await cdp.send("Performance.getMetrics"));
await page.waitForTimeout(4000);
const b = pick(await cdp.send("Performance.getMetrics"));
for (const k of Object.keys(b)) {
  const d = b[k] - (a[k] ?? 0);
  console.log(
    k.padEnd(22),
    k.endsWith("Duration") ? `${(d * 1000).toFixed(1)} ms` : d,
  );
}
await browser.close();
