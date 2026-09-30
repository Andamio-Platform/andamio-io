import { createRequire } from "node:module";
import path from "node:path";

const require = createRequire(import.meta.url);
const dir = path.join(process.env.TEMP, "badge-hero");
const { buildBadgeSvg } = require(path.join(dir, "badge-generator.js"));
const { PALETTES } = require(path.join(dir, "palettes.js"));

const svg = buildBadgeSvg(
  {
    courseTitle: "Getting Started with Andamio",
    moduleTitle: "Mint Access Token and Commit to Assignment",
    courseId: "ab5d9217bbbac409ffbe7c8c65d9b358932245079a7f8547a28bc755",
    sltHash: "1b37e6b411bc614e9da67943124219053eafa717793e5424f4a33765e42328a3",
    network: "mainnet",
  },
  PALETTES[3],
  { idSuffix: "h", layout: "hero" },
);

console.log("font-size 20 count", (svg.match(/font-size="20"/g) || []).length);
console.log(
  "full courseId",
  svg.includes("ab5d9217bbbac4") && svg.includes("a28bc755"),
);
console.log(
  "full slt",
  svg.includes("1b37e6b411bc614e") && svg.includes("e42328a3"),
);
