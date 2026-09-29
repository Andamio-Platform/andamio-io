// Render ProofRingBadge at native 1024 px (static, reduced motion) for
// overlay comparison with source.png, plus viewport shots at breakpoints.
// usage: node scripts/badge-src/shoot.mjs [baseUrl]
import { chromium } from "playwright";
import { fileURLToPath } from "node:url";
import path from "node:path";

const here = path.dirname(fileURLToPath(import.meta.url));
const base = process.argv[2] ?? "http://localhost:3100";
const out = (name) => path.join(here, "out", name);

const browser = await chromium.launch({ channel: process.env.PW_CHANNEL ?? "msedge" });
try {
  const page = await browser.newPage({ viewport: { width: 1600, height: 1400 }, reducedMotion: "reduce" });
  await page.goto(base, { waitUntil: "networkidle", timeout: 120000 });
  await page.addStyleTag({
    content: `.pb-frame{width:1024px!important;min-width:1024px!important;max-width:none!important}
      .credential-aura,nextjs-portal{display:none!important}`,
  });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(800);
  const badge = page.locator(".pb-root").first();
  await badge.scrollIntoViewIfNeeded();
  await badge.screenshot({ path: out("render-1024.png") });

  // Same badge with the artwork's own strings, for position/size overlay.
  await page.evaluate(() => {
    const root = document.querySelector(".pb-root");
    const set = (sel, text) => {
      const el = root.querySelector(sel);
      if (el) el.firstChild.textContent = text;
    };
    set(".pb-wordmark", "ANDAMIO");
    set(".pb-title", "Scaffolding Safety Excellence");
    set(".pb-module", "Advanced Erection & Inspection");
    set(".pb-earner", "Jordan Smith");
    root.querySelector(".pb-alias")?.remove();
    const did = root.querySelector(".pb-value .pb-copy > span");
    if (did) did.textContent = "did:andamio:8f3a7c1e";
    root.querySelector(".pb-value")?.parentElement && (root.querySelectorAll(".pb-value")[0].style.fontSize = "calc(var(--u) * 14.5)");
    set("time", "2025-06-03T10:30:00Z");
    const net = [...root.querySelectorAll(".pb-row")].find((n) => n.textContent.includes("Cardano"));
    if (net) net.lastChild.textContent = "Polygon";
    const monos = root.querySelectorAll(".pb-mono .pb-copy > span, .pb-mono .pb-link > span");
    if (monos[0]) monos[0].textContent = "AND-ADV-2025-0017";
    if (monos[1]) monos[1].textContent = "a9f3d2b7c4e6...";
  });
  await page.waitForTimeout(200);
  await badge.screenshot({ path: out("render-artwork-text.png") });

  for (const [w, h] of [
    [1440, 900],
    [820, 1180],
    [375, 812],
  ]) {
    const p = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 2 });
    await p.goto(base, { waitUntil: "networkidle", timeout: 120000 });
    await p.evaluate(() => document.fonts.ready);
    await p.waitForTimeout(2600);
    await p.locator(".pb-root").first().scrollIntoViewIfNeeded();
    await p.screenshot({ path: out(`view-${w}.png`) });
    const box = await p.locator(".pb-root").first().boundingBox();
    console.log(`viewport ${w}x${h} badge`, box && Math.round(box.width));
    await p.close();
  }
} finally {
  await browser.close();
}
