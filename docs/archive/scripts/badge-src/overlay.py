"""Overlay render-artwork-text.png on source.png: 50/50 blend + diff heatmap."""
from pathlib import Path

import numpy as np
from PIL import Image

here = Path(__file__).parent / "out"
src = Image.open(here.parent / "source.png").convert("RGB")
ren = Image.open(here / "render-artwork-text.png").convert("RGB").resize(src.size)
Image.blend(src, ren, 0.5).save(here / "overlay-50.png")
a, b = np.asarray(src).astype(int), np.asarray(ren).astype(int)
d = np.abs(a - b).max(-1)
Image.fromarray(np.clip(d * 2, 0, 255).astype(np.uint8)).save(here / "overlay-diff.png")
yy, xx = np.mgrid[0:1024, 0:1024]
rad = np.hypot(xx - 512, yy - 512)
for name, m in {"face": rad < 410, "rings": (rad >= 427) & (rad < 502), "corners": rad >= 512}.items():
    print(f"{name:8s} mean abs diff {d[m].mean():5.1f}")
# Side-by-side crops of the text column.
box = (280, 180, 750, 930)
w = box[2] - box[0]
sbs = Image.new("RGB", (w * 2 + 10, box[3] - box[1]), "white")
sbs.paste(src.crop(box), (0, 0))
sbs.paste(ren.crop(box), (w + 10, 0))
sbs.save(here / "side-by-side.png")
