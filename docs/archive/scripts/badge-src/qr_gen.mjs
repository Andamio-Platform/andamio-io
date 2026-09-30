// Render the badge QR (with and without `swap`) to PNG for decoding.
import QRCode from "@pjaudiomv/qrcode-svg";
import sharp from "sharp";
import { fileURLToPath } from "node:url";
import path from "node:path";

const here = path.dirname(fileURLToPath(import.meta.url));
const url =
  "https://credentials.andamio.io/badges/ae192632aabe00ed2042eaef596bc15f3887fa32e75e8f9b8fa516df.e9b5343186f83ed804a9fd87293a7378e3b237743b76d56da73b111d855631db.svg";
for (const swap of [false, true]) {
  for (const ecl of ["L", "M"]) {
    const svg = new QRCode({
      content: url,
      padding: 4,
      width: 512,
      height: 512,
      ecl,
      join: true,
      swap,
      xmlDeclaration: false,
    }).svg();
    const file = path.join(
      here,
      "out",
      `qr-${ecl}-${swap ? "swap" : "plain"}.png`,
    );
    await sharp(Buffer.from(svg)).png().toFile(file);
    console.log(file);
  }
}
