"""Exact ink bounding boxes and ink colors per text box (source vs clean plate)."""
from pathlib import Path

import cv2
import numpy as np

here = Path(__file__).parent
src = cv2.imread(str(here / "source.png")).astype(int)
plate = cv2.imread(str(here / "out" / "plate.png")).astype(int)
d = np.abs(src - plate).max(-1)

BOXES = {
    "wordmark": (468, 205, 712, 254),
    "courseLabel": (478, 296, 548, 314),
    "course": (300, 326, 738, 362),
    "moduleLabel": (476, 377, 550, 395),
    "module": (364, 404, 656, 432),
    "earnerLabel": (478, 444, 548, 462),
    "earner": (404, 472, 622, 510),
    "didLabel": (362, 528, 424, 547),
    "did": (290, 550, 482, 573),
    "issuedLabel": (600, 528, 670, 547),
    "issued": (542, 550, 742, 573),
    "networkLabel": (470, 593, 554, 611),
    "network": (446, 609, 560, 643),
    "skillsLabel": (480, 653, 546, 671),
    "skillIcons": (308, 670, 718, 710),
    "skillText": (308, 710, 718, 734),
    "courseIdLabel": (312, 768, 412, 790),
    "courseId": (280, 793, 428, 816),
    "hashLabel": (598, 768, 690, 790),
    "hash": (598, 793, 744, 816),
    "verify": (452, 888, 574, 910),
}
for name, (x0, y0, x1, y1) in BOXES.items():
    sub = d[y0:y1, x0:x1]
    ys, xs = np.nonzero(sub > 45)
    if len(xs) == 0:
        print(name, "none")
        continue
    bx0, bx1, by0, by1 = x0 + xs.min(), x0 + xs.max(), y0 + ys.min(), y0 + ys.max()
    px = src[y0:y1, x0:x1][sub > 45]
    # ink = pixels most different from the plate
    strong = px[d[y0:y1, x0:x1][sub > 45] >= np.percentile(d[y0:y1, x0:x1][sub > 45], 75)]
    b, g, r = np.median(strong, 0).astype(int)
    print(f"{name:14s} x {bx0}-{bx1} y {by0}-{by1} h={by1 - by0 + 1} cx={(bx0 + bx1) / 2:.0f} cy={(by0 + by1) / 2:.1f} ink=#{r:02x}{g:02x}{b:02x}")

# Column histogram for the skills row (icon centers).
sub = d[670:710, 308:718] > 45
cols = sub.sum(0)
runs, on, s = [], False, 0
for i, v in enumerate(cols):
    if v > 0 and not on:
        on, s = True, i
    elif v == 0 and on:
        on = False
        if i - s > 8:
            runs.append((308 + s, 308 + i))
print("skill icon runs", runs)
