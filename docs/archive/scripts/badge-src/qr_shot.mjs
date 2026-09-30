// Screenshot the badge QR element at high DPR for decode checks.
import { chromium } from "playwright";
import { fileURLToPath } from "node:url";
import path from "node:path";

const here = path.dirname(fileURLToPath(import.meta.url));
const browser = await chromium.launch({
  channel: process.env.PW_CHANNEL ?? "msedge",
});
for (const dpr of [1, 2, 4]) {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: dpr,
    reducedMotion: "reduce",
  });
  await page.goto(process.argv[2] ?? "http://localhost:3100", {
    waitUntil: "networkidle",
    timeout: 120000,
  });
  await page.addStyleTag({ content: "nextjs-portal{display:none!important}" });
  await page
    .locator(".pb-qr")
    .screenshot({ path: path.join(here, "out", `qr-el-${dpr}x.png`) });
  const b = await page.locator(".pb-qr").boundingBox();
  console.log(`dpr ${dpr}: qr box ${b && b.width.toFixed(1)} css px`);
  await page.close();
}
await browser.close();
