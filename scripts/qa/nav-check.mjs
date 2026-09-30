// One-off: internal top-menu routes render; external links respond.
import { chromium } from "playwright";

const base = process.argv[2] ?? "http://127.0.0.1:3000";
const routes = [
  "/",
  "/issuer",
  "/developers",
  "/cli",
  "/bot",
  "/papers",
  "/use-cases",
  "/pricing",
  "/about",
];

const browser = await chromium.launch({
  channel: process.env.PW_CHANNEL ?? "msedge",
});
const page = await browser.newPage();
for (const route of routes) {
  const res = await page.goto(base + route, {
    waitUntil: "domcontentloaded",
    timeout: 60000,
  });
  const title = await page.title();
  const err = await page.locator("text=Unhandled Runtime Error").count();
  const badge =
    route === "/issuer" ? await page.locator(".pb-root").count() : "";
  console.log(
    `${res?.status() ?? "?"} ${route} title="${title}" errors=${err}${badge === "" ? "" : ` badges=${badge}`}`,
  );
}
await browser.close();
