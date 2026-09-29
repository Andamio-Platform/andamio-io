"""Sample the cyan-vs-orange weight around each ring band.

For each 5-degree step, takes the brightest pixels in a small radial window and
reports w = orange / (orange + cyan) in [0, 1]. Output is a JSON object keyed by
band name, ready to paste into geometry.ts.
"""
import json
import math
from pathlib import Path

import numpy as np
from PIL import Image

here = Path(__file__).parent
im = np.asarray(Image.open(here / "source.png").convert("RGB")).astype(float)

BANDS = {"rim": (495, 501), "ticks": (482, 494), "dashes": (438, 458), "edgeOuter": (464, 469), "edgeInner": (426, 431)}
out = {}
for name, (r0, r1) in BANDS.items():
    ws = []
    for deg in range(0, 360, 5):
        samples = []
        for a in np.linspace(deg - 2.5, deg + 2.5, 11):
            for r in range(r0, r1 + 1):
                x = int(round(512 + r * math.cos(math.radians(a))))
                y = int(round(512 + r * math.sin(math.radians(a))))
                if 0 <= x < 1024 and 0 <= y < 1024:
                    samples.append(im[y, x])
        px = np.array(samples)
        lum = px @ np.array([0.2126, 0.7152, 0.0722])
        top = px[lum >= np.percentile(lum, 80)]
        rr, gg, bb = top.mean(0)
        orange = max(rr - bb, 0)
        cyan = max((gg + bb) / 2 - rr, 0)
        ws.append(round(orange / (orange + cyan + 1e-6), 2))
    out[name] = ws
print(json.dumps(out))
