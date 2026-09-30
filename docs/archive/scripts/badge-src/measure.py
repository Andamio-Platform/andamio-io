"""Measure ring geometry, colors and text boxes from the concept-40 PNG.

Prints radial profiles (brightness / cyan / orange) along several rays from the
badge center, the cream face radius, and row-wise dark-ink bounding boxes for
the text block, so geometry.ts can be filled with measured numbers.
"""
import math
import sys
from pathlib import Path

import numpy as np
from PIL import Image

here = Path(__file__).parent
im = np.asarray(Image.open(here / "source.png").convert("RGB")).astype(float)
H, W, _ = im.shape
R, G, B = im[..., 0], im[..., 1], im[..., 2]
lum = 0.2126 * R + 0.7152 * G + 0.0722 * B
cyan = np.clip((G + B) / 2 - R, 0, None)
orange = np.clip(R - B, 0, None) * (R > 150)


def center_of_mass():
    # Face = bright low-saturation pixels.
    mask = (lum > 215) & ((im.max(-1) - im.min(-1)) < 30)
    ys, xs = np.nonzero(mask)
    return xs.mean(), ys.mean(), mask


def ray(cx, cy, deg, r0=300, r1=512):
    rad = math.radians(deg)
    rows = []
    for r in range(r0, r1):
        x = int(round(cx + r * math.cos(rad)))
        y = int(round(cy + r * math.sin(rad)))
        if 0 <= x < W and 0 <= y < H:
            rows.append((r, lum[y, x], cyan[y, x], orange[y, x], tuple(int(v) for v in im[y, x])))
    return rows


def main():
    cx, cy, face = center_of_mass()
    print(f"face centroid {cx:.1f},{cy:.1f}")
    # face radius: along horizontal, find last bright-cream pixel from center
    for deg in (0, 90, 180, 270, 45, 135, 225, 315):
        prof = ray(512, 512, deg, 250, 512)
        bright = [r for r, l, *_ in prof if l > 200]
        print(f"deg {deg:3d} last bright r={max(bright) if bright else None}")
    mode = sys.argv[1] if len(sys.argv) > 1 else "rays"
    if mode == "rays":
        for deg in [float(a) for a in sys.argv[2:]] or [180.0, 0.0]:
            print(f"--- ray {deg}")
            for r, l, c, o, rgb in ray(512, 512, deg, 380, 512):
                bar = "#" * int(l / 16)
                print(f"r={r:3d} L={l:5.1f} C={c:5.1f} O={o:5.1f} {rgb} {bar}")
    elif mode == "ring":
        # Mean ring color vs angle at radius r (argv[2]).
        rr = float(sys.argv[2])
        for deg in range(0, 360, 10):
            rad = math.radians(deg)
            x = int(512 + rr * math.cos(rad))
            y = int(512 + rr * math.sin(rad))
            patch = im[y - 2 : y + 3, x - 2 : x + 3].reshape(-1, 3).max(0)
            print(f"{deg:3d} {tuple(int(v) for v in patch)}")
    elif mode == "text":
        # Dark ink rows inside the face column x in [260, 764].
        ink = (lum < 120) & (np.arange(W)[None, :] > 250) & (np.arange(W)[None, :] < 774)
        rows = ink.sum(1)
        inrun, start = False, 0
        for y in range(H):
            on = rows[y] > 3
            if on and not inrun:
                inrun, start = True, y
            elif not on and inrun:
                inrun = False
                xs = np.nonzero(ink[start:y].any(0))[0]
                print(f"y {start}-{y} h={y - start} x {xs.min()}-{xs.max()}")


main()
