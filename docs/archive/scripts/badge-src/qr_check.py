"""Decode the badge QR from renders to confirm it is really scannable."""
from pathlib import Path

import cv2

here = Path(__file__).parent / "out"
det = cv2.QRCodeDetector()
for name in ["render-1024.png", "view-1440.png", "view-375.png"]:
    img = cv2.imread(str(here / name))
    if img is None:
        continue
    text, pts, _ = det.detectAndDecode(img)
    print(f"{name:18s} {'OK ' + text if text else 'not decoded'}")

# Tight crop of the QR box at native scale, padded with white and upscaled.
img = cv2.imread(str(here / "render-1024.png"))
crop = img[766:872, 459:565]
crop = cv2.copyMakeBorder(crop, 30, 30, 30, 30, cv2.BORDER_CONSTANT, value=(255, 255, 255))
crop = cv2.resize(crop, None, fx=4, fy=4, interpolation=cv2.INTER_NEAREST)
cv2.imwrite(str(here / "qr-crop.png"), crop)
text, _, _ = det.detectAndDecode(crop)
print("crop+quiet zone   ", "OK " + text if text else "not decoded")
