"""Build the clean plate for ProofRingBadge from the concept-40 PNG.

Removes the face text, icons, and ring phrases by inpainting inside measured
boxes, flattens the ring annulus (covered by the vector rings), and softens the
fixed cyan/orange halo so it does not fight the rotating rings. Writes:

  public/images/landing/proof-badge-plate.webp
  scripts/badge-src/out/plate-mask.png   (debug)
  scripts/badge-src/out/plate-diff.png   (changed pixels outside the mask)
"""
from pathlib import Path

import cv2
import numpy as np

here = Path(__file__).parent
root = here.parents[1]
src = cv2.imread(str(here / "source.png"))
H, W = src.shape[:2]
yy, xx = np.mgrid[0:H, 0:W]
rad = np.hypot(xx - 512, yy - 512)

# Text / icon boxes in 1024 space: (x0, y0, x1, y1, mode)
# mode "ink": only pixels that differ from the local background are masked.
# mode "all": the whole box is masked (flat dark panels).
BOXES = [
    (468, 205, 712, 254, "ink"),  # ANDAMIO wordmark
    (478, 296, 548, 314, "ink"),  # COURSE label
    (300, 326, 738, 362, "ink"),  # course title
    (476, 377, 550, 395, "ink"),  # MODULE label
    (364, 404, 656, 432, "ink"),  # module name
    (478, 444, 548, 462, "ink"),  # EARNER label
    (404, 472, 622, 510, "ink"),  # earner name
    (362, 528, 424, 547, "ink"),  # DID label
    (290, 550, 482, 573, "ink"),  # DID value + copy icon
    (600, 528, 670, 547, "ink"),  # ISSUED label
    (542, 550, 742, 573, "ink"),  # issued value + calendar
    (470, 593, 554, 611, "ink"),  # NETWORK label
    (446, 609, 560, 643, "ink"),  # network mark + name
    (480, 653, 546, 671, "ink"),  # SKILLS label
    (308, 670, 718, 734, "ink"),  # skill icons + labels
    (312, 768, 412, 790, "all"),  # COURSE_ID label
    (280, 793, 428, 816, "all"),  # course id value
    (598, 768, 690, 790, "all"),  # SLT_HASH label
    (598, 793, 744, 816, "all"),  # hash value + copy
    (452, 888, 574, 910, "all"),  # VERIFY CREDENTIAL label
]

mask = np.zeros((H, W), np.uint8)
gray = cv2.cvtColor(src, cv2.COLOR_BGR2GRAY).astype(np.int16)
bg = cv2.medianBlur(cv2.cvtColor(src, cv2.COLOR_BGR2GRAY), 31).astype(np.int16)
hsv = cv2.cvtColor(src, cv2.COLOR_BGR2HSV)
for x0, y0, x1, y1, mode in BOXES:
    if mode == "all":
        mask[y0:y1, x0:x1] = 255
        continue
    diff = np.abs(gray[y0:y1, x0:x1] - bg[y0:y1, x0:x1])
    sat = hsv[y0:y1, x0:x1, 1]
    ink = ((diff > 18) | (sat > 70)).astype(np.uint8) * 255
    mask[y0:y1, x0:x1] = np.maximum(mask[y0:y1, x0:x1], ink)

mask = cv2.dilate(mask, np.ones((5, 5), np.uint8), iterations=2)
# Keep the edit inside the face; the ring annulus is handled separately.
mask[rad > 415] = 0

plate = cv2.inpaint(src, mask, 6, cv2.INPAINT_TELEA)

# Ring annulus: flat deep ink, fully covered by the opaque vector ring bands.
annulus = (rad >= 414) & (rad <= 503)
deep = np.array([27, 18, 11], np.uint8)  # BGR of #0B121B
plate[annulus] = deep

# Soften the baked halo just outside the rim (it would not rotate).
halo = (rad > 503) & (rad < 540)
t = np.clip((rad - 503) / 37.0, 0, 1)[..., None]
dark = np.full_like(plate, deep)
blend = (plate.astype(float) * t + dark.astype(float) * (1 - t) * 0.85 + plate.astype(float) * (1 - t) * 0.15)
plate[halo] = blend[halo].astype(np.uint8)

out_dir = root / "public" / "images" / "landing"
out_dir.mkdir(parents=True, exist_ok=True)
cv2.imwrite(str(out_dir / "proof-badge-plate.webp"), plate, [cv2.IMWRITE_WEBP_QUALITY, 88])
(here / "out").mkdir(exist_ok=True)
cv2.imwrite(str(here / "out" / "plate-mask.png"), mask)
cv2.imwrite(str(here / "out" / "plate.png"), plate)

edited = (mask > 0) | annulus | halo
d = np.abs(plate.astype(int) - src.astype(int)).max(-1)
print("max diff outside edited regions:", int(d[~edited].max()))
print("masked px:", int((mask > 0).sum()))
