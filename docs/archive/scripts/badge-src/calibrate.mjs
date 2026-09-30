// Solve face font sizes so the artwork's own strings reproduce their measured
// widths (text_boxes.py) in the chosen web fonts.
import { chromium } from "playwright";

const url = process.argv[2] ?? "http://localhost:3100";
const SPECS = [
  ["wordmark", "ANDAMIO", 231, "Montserrat", 600, 0.01],
  ["label", "COURSE", 55, "Inter", 600, 0.14],
  ["label", "NETWORK", 67, "Inter", 600, 0.14],
  ["course", "Scaffolding Safety Excellence", 421, "Inter", 600, -0.005],
  ["module", "Advanced Erection & Inspection", 274, "Inter", 400, 0],
  ["earner", "Jordan Smith", 204, "Inter", 700, 0],
  ["value", "did:andamio:8f3a7c1e", 155, "Inter", 400, 0],
  ["value", "2025-06-03T10:30:00Z", 158, "Inter", 400, 0],
  ["network", "Polygon", 65, "Inter", 400, 0],
  ["skill", "Scaffold Erection", 87, "Inter", 400, 0],
  ["skill", "Load Calculations", 89, "Inter", 400, 0],
  ["panelLabel", "COURSE__ID", 93, "JetBrains Mono", 600, 0.08],
  ["panelLabel", "SLT_HASH", 86, "JetBrains Mono", 600, 0.08],
  ["mono", "AND-ADV-2025-0017", 140, "JetBrains Mono", 400, 0.01],
  ["verify", "VERIFY CREDENTIAL", 116, "Inter", 600, 0.06],
];

const browser = await chromium.launch({ channel: process.env.PW_CHANNEL ?? "msedge" });
const page = await browser.newPage();
await page.goto(url, { waitUntil: "networkidle", timeout: 120000 });
await page.evaluate(() => document.fonts.ready);
const rows = await page.evaluate((specs) => {
  return specs.map(([key, text, target, family, weight, tracking]) => {
    const s = document.createElement("span");
    s.textContent = text;
    Object.assign(s.style, {
      position: "absolute",
      whiteSpace: "nowrap",
      fontFamily: `"${family}"`,
      fontWeight: String(weight),
      fontSize: "100px",
      letterSpacing: `${tracking}em`,
      lineHeight: "1",
    });
    document.body.appendChild(s);
    // Trailing tracking is not ink; remove it from the measured width.
    const w = s.getBoundingClientRect().width - tracking * 100;
    const loaded = document.fonts.check(`${weight} 100px "${family}"`);
    s.remove();
    return { key, text, size: +((target / w) * 100).toFixed(2), loaded };
  });
}, SPECS);
for (const r of rows) console.log(`${r.key.padEnd(11)} ${r.size.toString().padStart(6)}  ${r.loaded ? "" : "(font not loaded) "}${r.text}`);
await browser.close();
