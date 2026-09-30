// Behavioral checks for ProofRingBadge on the live page:
// rings move while the face stays still, copy writes the full value, the
// Copied chip appears and clears, hover lights the linked ring arc, and
// motion stops under reduced motion.
import { chromium } from "playwright";
import { fileURLToPath } from "node:url";
import { mkdirSync } from "node:fs";
import path from "node:path";

const here = path.dirname(fileURLToPath(import.meta.url));
const base = process.argv[2] ?? "http://localhost:3100";
const outDir = path.join(here, "..", "..", "screenshots", "qa");
mkdirSync(outDir, { recursive: true });
const out = (n) => path.join(outDir, n);
const browser = await chromium.launch({ channel: process.env.PW_CHANNEL ?? "msedge" });
const results = [];
const check = (name, ok, detail = "") => results.push(`${ok ? "PASS" : "FAIL"} ${name}${detail ? ` — ${detail}` : ""}`);

try {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  await ctx.grantPermissions(["clipboard-read", "clipboard-write"], { origin: base });
  const page = await ctx.newPage();
  await page.goto(base, { waitUntil: "networkidle", timeout: 120000 });
  await page.addStyleTag({ content: "nextjs-portal{display:none!important}" });
  await page.waitForTimeout(2500);

  const angles = () =>
    page.evaluate(() => {
      const ang = (sel) => {
        const m = getComputedStyle(document.querySelector(sel)).transform;
        if (!m || m === "none") return 0;
        const [a, b] = m.slice(7, -1).split(",").map(Number);
        return (Math.atan2(b, a) * 180) / Math.PI;
      };
      const face = document.querySelector(".pb-face").getBoundingClientRect();
      return { a: ang(".pb-ring-a"), b: ang(".pb-ring-b"), faceTop: face.top, faceLeft: face.left };
    });
  const t0 = await angles();
  await page.waitForTimeout(2000);
  const t1 = await angles();
  check("ring A turns clockwise", t1.a > t0.a, `${t0.a.toFixed(2)}° → ${t1.a.toFixed(2)}°`);
  check("ring B turns counter-clockwise", t1.b < t0.b, `${t0.b.toFixed(2)}° → ${t1.b.toFixed(2)}°`);
  check("face does not move", t0.faceTop === t1.faceTop && t0.faceLeft === t1.faceLeft);

  const intro = await page.evaluate(() => document.querySelector(".pb-root").className);
  check("intro class removed after first view", !intro.includes("pb-intro"), intro);

  // Text is real, selectable DOM text.
  const text = await page.evaluate(() => document.querySelector(".pb-root").innerText);
  for (const s of ["Andamio Issuer", "About Andamio Issuer", "Jordan Smith", "did:web:", "2026-07-01 00:00", "Cardano mainnet", "ae1926", "e9b534"]) {
    check(`DOM text contains "${s}"`, text.includes(s));
  }
  check("issued text drops seconds", !text.includes("00:00:00Z"));
  const issuedAttr = await page.locator("#top .pb-face time").getAttribute("datetime");
  check("issued datetime keeps the full timestamp", issuedAttr === "2026-07-01T00:00:00Z", issuedAttr ?? "");
  const bars = await page.evaluate(() => ({
    outer: document.querySelectorAll("#top .pb-ring-a line").length,
    inner: document.querySelectorAll("#top .pb-ring-b line").length,
  }));
  check("outer ring has one bar per course-id bit", bars.outer === 56 * 4, String(bars.outer));
  check("inner ring has hash bars plus phrase separators", bars.inner === 64 * 4 + 10, String(bars.inner));

  const ringFilter = () =>
    page.evaluate(() => {
      const op = (sel) => Number(getComputedStyle(document.querySelector(sel)).opacity);
      return {
        hl: document.querySelector(".pb-root").dataset.hl ?? "",
        hlOuter: op(".pb-hl-a"),
        hlInner: op(".pb-hl-b"),
        outer: op(".pb-ring-a"),
        inner: op(".pb-ring-b"),
      };
    });
  // Hover SLT hash → only the inner ring's highlight shows; the outer ring dims.
  const hashBtn = page.locator("#top .pb-face .pb-mono .pb-copy").last();
  await hashBtn.hover();
  await page.waitForTimeout(350);
  const hl = await ringFilter();
  check("hover hash highlights only the inner ring", hl.hl === "hash" && hl.hlInner === 1 && hl.hlOuter === 0 && hl.outer < 0.5 && hl.inner === 1, JSON.stringify(hl));
  await page.locator("#top .pb-root").screenshot({ path: out("hover-hash.png") });

  await hashBtn.click();
  await page.waitForTimeout(150);
  const clip = await page.evaluate(() => navigator.clipboard.readText());
  check("click hash copies full 64-char hash", clip === "e9b5343186f83ed804a9fd87293a7378e3b237743b76d56da73b111d855631db", clip);
  check("Copied chip visible", (await page.locator("#top .pb-face .pb-copied").count()) === 1);
  const live = await page.evaluate(() => document.querySelector(".pb-root [aria-live]").textContent);
  check("aria-live announces copy", live === "SLT hash copied", live);
  await page.locator("#top .pb-root").screenshot({ path: out("copied-hash.png") });
  await page.waitForTimeout(1800);
  check("Copied chip clears", (await page.locator("#top .pb-face .pb-copied").count()) === 0);

  // Course ID: copy icon copies; the text is an Andamioscan link.
  await page.locator("#top .pb-face .pb-mono .pb-icon-btn").first().click();
  await page.waitForTimeout(150);
  const clip2 = await page.evaluate(() => navigator.clipboard.readText());
  check("course ID icon copies full id", clip2 === "ae192632aabe00ed2042eaef596bc15f3887fa32e75e8f9b8fa516df", clip2);
  const href = await page.locator("#top .pb-face .pb-mono .pb-link").first().getAttribute("href");
  check("course ID links to Andamioscan", href === "https://andamioscan.io/courses/ae192632aabe00ed2042eaef596bc15f3887fa32e75e8f9b8fa516df", href ?? "");

  await page.locator("#top .pb-face .pb-value .pb-copy").first().click();
  await page.waitForTimeout(150);
  check("DID copies", (await page.evaluate(() => navigator.clipboard.readText())) === "did:web:credentials.andamio.io");

  const courseBtn = page.locator("#top .pb-face .pb-mono .pb-link, #top .pb-face .pb-mono .pb-copy").first();
  await courseBtn.hover();
  await page.waitForTimeout(350);
  const courseHl = await ringFilter();
  check("hover course id highlights only the outer ring", courseHl.hl === "courseId" && courseHl.hlOuter === 1 && courseHl.hlInner === 0 && courseHl.inner < 0.5 && courseHl.outer === 1, JSON.stringify(courseHl));
  const claim = await page.locator("#top .pb-verify").getAttribute("href");
  check(
    "verify button opens the claim page",
    claim === "https://andamioscan.io/view/credential-claims/1d46be10006cd97fe6c157d8667db5f7bb0701f7a69f9ead331b59142f004505",
    claim ?? "",
  );
  check("verified chip is gone", (await page.locator("#top .pb-verified").count()) === 0);

  const qrHref = await page.locator("#top .pb-qr").getAttribute("href");
  check("QR links to verify URL", qrHref?.startsWith("https://credentials.andamio.io/badges/ae1926") ?? false, qrHref ?? "");

  // Seamless loop: the rotation keyframe ends where it starts (mod 360).
  const kf = await page.evaluate(() => {
    const anims = document.querySelector(".pb-ring-a").getAnimations();
    return anims.map((a) => ({ name: a.animationName, iter: a.effect.getTiming().iterations }));
  });
  check("ring A loops infinitely", kf.some((k) => k.name === "pb-spin-cw" && k.iter === Infinity), JSON.stringify(kf));

  // Off-screen pause.
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(600);
  const paused = await page.evaluate(() => {
    const a = document.querySelector(".pb-ring-a").getAnimations()[0];
    return { off: "offscreen" in document.querySelector(".pb-root").dataset, state: a?.playState };
  });
  check("pauses off-screen", paused.off && paused.state === "paused", JSON.stringify(paused));
  await ctx.close();

  // Reduced motion: no ring animations at all.
  const rctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
  const rp = await rctx.newPage();
  await rp.goto(base, { waitUntil: "networkidle", timeout: 120000 });
  await rp.waitForTimeout(1200);
  const ra = await rp.evaluate(() => document.querySelector(".pb-ring-a").getAnimations().length);
  check("reduced motion: rings static", ra === 0, `${ra} animations`);
  await rctx.close();

  // Mobile: badge fills the column, no identifier strip underneath.
  const mctx = await browser.newContext({ viewport: { width: 375, height: 812 }, deviceScaleFactor: 2 });
  const mp = await mctx.newPage();
  await mp.goto(base, { waitUntil: "networkidle", timeout: 120000 });
  await mp.addStyleTag({ content: "nextjs-portal{display:none!important}" });
  await mp.locator("#top .pb-frame").scrollIntoViewIfNeeded();
  await mp.waitForTimeout(2200);
  const m = await mp.evaluate(() => {
    const f = document.querySelector(".pb-frame").getBoundingClientRect();
    return { w: Math.round(f.width), readout: Boolean(document.querySelector(".pb-readout")), docW: document.documentElement.scrollWidth };
  });
  check("mobile badge width ≥ 350", m.w >= 350, `${m.w}px`);
  check("no identifier strip", !m.readout);
  check("no horizontal overflow", m.docW <= 375, `scrollWidth ${m.docW}`);
  await mp.locator("#top .pb-frame").screenshot({ path: out("mobile-frame.png") });
  await mctx.close();
} finally {
  await browser.close();
}
console.log(results.join("\n"));
