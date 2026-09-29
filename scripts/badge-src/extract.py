"""Extract the embedded PNG from andamio_badge_hybrid_editable.svg."""
import base64
import re
from pathlib import Path

root = Path(__file__).resolve().parents[2]
svg = (root / "andamio_badge_hybrid_editable.svg").read_text(encoding="utf8")
match = re.search(r'base64,([A-Za-z0-9+/=\s]+)"', svg)
assert match, "no embedded PNG"
out = Path(__file__).parent / "source.png"
out.write_bytes(base64.b64decode(re.sub(r"\s", "", match.group(1))))
print("wrote", out)
