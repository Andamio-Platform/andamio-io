// Lists non-fixed elements that stick out past a 390px viewport, plus console errors.
// Usage: node scripts/qa/overflow.mjs baseUrl /route [/route...]
import { chromium } from "playwright";
const base = process.argv[2];
const routes = process.argv.slice(3);
const browser = await chromium.launch({ channel: process.env.PW_CHANNEL ?? "msedge" });
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
page.on("console", (m) => { if (m.type() === "error") console.log("CONSOLE", m.text().slice(0, 300)); });
page.on("pageerror", (e) => console.log("PAGEERROR", e.message.slice(0, 300)));
for (const r of routes) {
  console.log("==", r);
  await page.goto(base + r, { waitUntil: "load" });
  await page.waitForTimeout(1500);
  const offenders = await page.evaluate(() => {
    const W = document.documentElement.clientWidth;
    const out = [];
    for (const el of document.querySelectorAll("body *")) {
      const rect = el.getBoundingClientRect();
      if (rect.right > W + 1 && rect.width > 0) {
        const cs = getComputedStyle(el);
        if (cs.position === "fixed") continue;
        let p = el.parentElement, clipped = false;
        while (p && p !== document.body && p !== document.documentElement) { const ps = getComputedStyle(p); if (ps.overflowX === "hidden" || ps.overflowX === "clip" || ps.position === "fixed") { clipped = true; break; } p = p.parentElement; }
        if (!clipped) out.push(`${el.tagName.toLowerCase()}.${String(el.className).slice(0, 80)} right=${Math.round(rect.right)} w=${Math.round(rect.width)}`);
      }
    }
    const hs = getComputedStyle(document.documentElement).overflowX, bs = getComputedStyle(document.body).overflowX;
    return [`html overflow-x=${hs} body overflow-x=${bs} scrollWidth=${document.documentElement.scrollWidth}`, ...out.slice(0, 12)];
  });
  offenders.forEach((o) => console.log("  ", o));
}
await browser.close();
