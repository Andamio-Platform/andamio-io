"""Median / max radial profile over an angle sweep (suppresses ticks and text).

usage: python profile.py a0 a1 [cx cy]
"""
import math
import sys
from pathlib import Path

import numpy as np
from PIL import Image

here = Path(__file__).parent
im = np.asarray(Image.open(here / "source.png").convert("RGB")).astype(float)
a0, a1 = float(sys.argv[1]), float(sys.argv[2])
cx = float(sys.argv[3]) if len(sys.argv) > 3 else 512
cy = float(sys.argv[4]) if len(sys.argv) > 4 else 512
angles = np.radians(np.arange(a0, a1, 0.5))
for r in range(370, 512):
    xs = np.clip((cx + r * np.cos(angles)).round().astype(int), 0, 1023)
    ys = np.clip((cy + r * np.sin(angles)).round().astype(int), 0, 1023)
    px = im[ys, xs]
    lum = px @ np.array([0.2126, 0.7152, 0.0722])
    med = np.median(px, 0).astype(int)
    print(f"r={r} med={tuple(med)} L50={np.median(lum):5.1f} L90={np.percentile(lum, 90):5.1f} " + "#" * int(np.median(lum) / 12))
