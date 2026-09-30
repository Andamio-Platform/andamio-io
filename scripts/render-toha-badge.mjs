import sharp from "sharp";
import { readFileSync } from "fs";

const src = readFileSync("public/customer/toha/toha-logo.svg", "utf8");
const svg = src.replace(/<circle[^>]*\/>/, "");
await sharp(Buffer.from(svg), { density: 384 })
  .png()
  .toFile("public/customer/toha/toha-badge.png");
const meta = await sharp("public/customer/toha/toha-badge.png").metadata();
console.log(meta.width, meta.height, meta.hasAlpha);
