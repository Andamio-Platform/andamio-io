// Screenshot harness for visual self-review of the landing page.
//
// Captures a target section at a real laptop viewport, including interaction
// states, so changes can be reviewed without a human re-screenshotting by hand.
//
// Usage:
//   npm run dev                      # in one terminal (or any running server)
//   npm run shoot                    # default: #how-it-works demo @ 1440x900
//
// Env overrides:
//   SHOOT_URL   target URL              (default http://localhost:3000)
//   SHOOT_OUT   output directory        (default ./screenshots)
//   SHOOT_W     viewport width          (default 1440)
//   SHOOT_H     viewport height         (default 900)
//   SHOOT_SEL   section CSS selector    (default #how-it-works)
//   SHOOT_DPR   device scale factor     (default 1)

import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const URL = process.env.SHOOT_URL ?? "http://localhost:3000";
const OUT = process.env.SHOOT_OUT ?? "screenshots";
const W = parseInt(process.env.SHOOT_W ?? "1440", 10);
const H = parseInt(process.env.SHOOT_H ?? "900", 10);
const SEL = process.env.SHOOT_SEL ?? "#how-it-works";
const DPR = parseFloat(process.env.SHOOT_DPR ?? "1");

mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: W, height: H },
  deviceScaleFactor: DPR,
});

const shots = [];
async function snap(name, section) {
  const path = `${OUT}/${name}.png`;
  await section.screenshot({ path });
  shots.push(path);
  console.log(`  ✓ ${path}`);
}

try {
  console.log(`→ ${URL} @ ${W}x${H} (dpr ${DPR})`);
  await page.goto(URL, { waitUntil: "load", timeout: 30000 });

  const section = page.locator(SEL).first();
  await section.scrollIntoViewIfNeeded();
  // Badge SVG renders client-side on a 150ms debounce; give it room + fonts.
  await page.waitForTimeout(800);

  await snap("demo-default", section);

  // Interaction state: focus a course field → outer-ring / identity highlight.
  const course = page.locator("#bb-course");
  if (await course.count()) {
    await course.click();
    await page.waitForTimeout(500);
    await snap("demo-focus-identity", section);
  }

  // Interaction state: focus a learning target → inner-ring / targets highlight.
  const slt = page.locator("#bb-slt-0");
  if (await slt.count()) {
    await slt.click();
    await page.waitForTimeout(500);
    await snap("demo-focus-targets", section);
  }

  // Open an info popover to check its theming/placement.
  const info = page.getByRole("button", { name: /what changes/i }).first();
  if (await info.count()) {
    await info.click();
    await page.waitForTimeout(350);
    await snap("demo-popover", section);
  }

  console.log(`\nDone — ${shots.length} shot(s) in ${OUT}/`);
} catch (err) {
  console.error("Screenshot run failed:", err.message);
  process.exitCode = 1;
} finally {
  await browser.close();
}
