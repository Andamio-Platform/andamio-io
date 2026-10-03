/**
 * One self-contained SVG of a Proof Ring badge: the plate, both rings, the
 * binary bars, the face, and the verify QR. Ring A spins clockwise and ring B
 * counter-clockwise. Images are inlined so the file still opens after it is
 * pinned to IPFS. The JSON-LD block is an OpenBadges 3.0 preview, not a
 * signed credential.
 */

import {
  arcPath,
  BADGE_SIZE,
  CENTER,
  FACE,
  GLYPH_EM,
  hueAt,
  INK,
  MARKERS,
  polar,
  RING,
  RING_COLORS,
  type HueBand,
} from "./geometry";
import {
  middleTruncate,
  type ProofCredential,
  type ProofSkill,
  type ProofTheme,
  type SkillIcon,
} from "./credential";

const PLATE_SRC = "/images/landing/proof-badge-plate.webp";
const PLATE_OPEN_SRC = "/images/landing/proof-badge-plate-open.webp";

type Rgb = [number, number, number];

function hexToRgb(hex: string): Rgb {
  const h = hex.replace("#", "");
  const full =
    h.length === 3
      ? h
          .split("")
          .map((c) => c + c)
          .join("")
      : h;
  const n = Number.parseInt(full, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function rgbToHex([r, g, b]: Rgb): string {
  const c = (n: number) =>
    Math.max(0, Math.min(255, Math.round(n)))
      .toString(16)
      .padStart(2, "0");
  return `#${c(r)}${c(g)}${c(b)}`;
}

/** `weight` is how much of `toward` is mixed in. */
function mixHex(base: string, toward: string, weight: number): string {
  const a = hexToRgb(base);
  const b = hexToRgb(toward);
  const w = Math.max(0, Math.min(1, weight));
  return rgbToHex([
    a[0] + (b[0] - a[0]) * w,
    a[1] + (b[1] - a[1]) * w,
    a[2] + (b[2] - a[2]) * w,
  ]);
}

function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function fitSize(text: string, base: number, maxW: number, em: number): number {
  const natural = text.length * em * base;
  return natural > maxW
    ? Math.max(base * 0.62, maxW / (text.length * em))
    : base;
}

function formatIssued(iso: string): string {
  const match = /^(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2})/.exec(iso);
  return match ? `${match[1]} ${match[2]}` : iso;
}

function hexBytes(hex: string): number[] {
  const bytes: number[] = [];
  for (let i = 0; i + 1 < hex.length; i += 2) {
    const pair = hex.slice(i, i + 2);
    if (!/^[0-9a-fA-F]{2}$/.test(pair)) continue;
    bytes.push(Number.parseInt(pair, 16));
  }
  return bytes;
}

type Palette = {
  cyan: string;
  cyanHot: string;
  orange: string;
  orangeHot: string;
  bandCool: string;
  bandWarm: string;
};

function paletteOf(theme: ProofTheme | undefined): Palette {
  return {
    cyan: theme?.cyan ?? RING_COLORS.cyan,
    cyanHot: theme?.cyanHot ?? RING_COLORS.cyanHot,
    orange: theme?.orange ?? RING_COLORS.orange,
    orangeHot: theme?.orangeHot ?? RING_COLORS.orangeHot,
    bandCool: theme?.bandCool ?? RING_COLORS.bandCool,
    bandWarm: theme?.bandWarm ?? RING_COLORS.bandWarm,
  };
}

function huePaint(palette: Palette, hot: boolean) {
  return (weight: number) =>
    mixHex(
      hot ? palette.cyanHot : palette.cyan,
      hot ? palette.orangeHot : palette.orange,
      weight,
    );
}

function bandPaint(palette: Palette) {
  return (weight: number) => mixHex(palette.bandCool, palette.bandWarm, weight);
}

/** Stroke-width annulus, one arc per 5 degrees, matching the page's hue table. */
function annulus(
  r0: number,
  r1: number,
  band: HueBand,
  paint: (weight: number) => string,
  opacity = 1,
): string {
  const radius = (r0 + r1) / 2;
  const width = r1 - r0;
  const parts: string[] = [];
  for (let deg = 0; deg < 360; deg += 5) {
    const color = paint(hueAt(band, deg + 2.5));
    const d = arcPath(radius, deg - 0.2, deg + 5.2);
    parts.push(
      `<path d="${d}" fill="none" stroke="${color}" stroke-width="${width.toFixed(2)}" stroke-linecap="butt" opacity="${opacity}"/>`,
    );
  }
  return parts.join("");
}

function bars(
  hex: string,
  radius: number,
  band: HueBand,
  palette: Palette,
): string {
  const bytes = hexBytes(hex);
  if (bytes.length === 0) return "";
  const paint = huePaint(palette, false);
  const paintHot = huePaint(palette, true);
  const group = 360 / bytes.length;
  const lead = (group - 8) / 2;
  const lines: string[] = [];
  bytes.forEach((value, index) => {
    const start = -90 + index * group;
    for (let bit = 0; bit < 8; bit++) {
      const on = ((value >> (7 - bit)) & 1) === 1;
      const head = bit === 0;
      const deg = start + lead + (bit + 0.5);
      const len = on ? (head ? 16 : 12) : head ? 7 : 4.5;
      const width = on ? (head ? 2.6 : 2) : 1.5;
      const inner = polar(radius - len / 2, deg);
      const outer = polar(radius + len / 2, deg);
      const colored = mixHex(
        head && on
          ? paintHot(1 - hueAt(band, deg))
          : paint(1 - hueAt(band, deg)),
        "#ffffff",
        on ? 0.14 : 0.22,
      );
      const edge = on ? 1 : 0.72;
      lines.push(
        `<line x1="${inner.x.toFixed(2)}" y1="${inner.y.toFixed(2)}" x2="${outer.x.toFixed(2)}" y2="${outer.y.toFixed(2)}" stroke="#f7f8f8" stroke-width="${(width + 0.7).toFixed(2)}" stroke-linecap="butt"/>`,
        `<line x1="${inner.x.toFixed(2)}" y1="${inner.y.toFixed(2)}" x2="${outer.x.toFixed(2)}" y2="${outer.y.toFixed(2)}" stroke="${colored}" stroke-width="${width.toFixed(2)}" stroke-linecap="butt" opacity="${edge}"/>`,
      );
    }
  });
  return lines.join("");
}

function text(
  value: string,
  x: number,
  y: number,
  size: number,
  fill: string,
  extra = "",
): string {
  return `<text x="${x}" y="${y}" text-anchor="middle" dominant-baseline="central" fill="${fill}" font-size="${size}" ${extra}>${esc(value)}</text>`;
}

const SKILL_PATHS: Record<SkillIcon, string> = {
  scaffold:
    '<path d="M8 31V4M26 31V4M8 11h18M8 20h18M8 29h18M8 11l18 9M26 11L8 20M8 20l18 9M26 20L8 29M5 31h24"/>',
  warning: '<path d="M17 4L31 29H3z"/><path d="M17 13v8M17 24.5v.5"/>',
  calculator:
    '<rect x="7" y="3" width="20" height="28" rx="2"/><rect x="10.5" y="6.5" width="13" height="5.5"/><path d="M11 16h2M16 16h2M21 16h2M11 20.5h2M16 20.5h2M21 20.5h2M11 25h2M16 25h2M21 25h2"/>',
  checklist:
    '<rect x="7" y="5" width="20" height="26" rx="2"/><path d="M13 3.5h8v4h-8zM11 13l1.5 1.5L15 12M18 13.5h6M11 19l1.5 1.5L15 18M18 19.5h6M11 25l1.5 1.5L15 24M18 25.5h6"/>',
  badge:
    '<circle cx="17" cy="13" r="8"/><path d="M12 19.5L9.5 31l7.5-4 7.5 4L22 19.5M14 13l2 2 4-4"/>',
};

/** Same 32px stroke icons the face uses, centered on the skill column. */
function skillIcon(skill: ProofSkill, x: number, y: number): string {
  const size = 32;
  const scale = size / 34;
  return `<g transform="translate(${(x - size / 2).toFixed(2)} ${(y - size / 2).toFixed(2)}) scale(${scale.toFixed(4)})" fill="none" stroke="#1e3a53" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${SKILL_PATHS[skill.icon]}</g>`;
}

/**
 * `x` and `y` are the top-left of the plate's printed QR. The white tile
 * covers that static code, and the real QR is drawn inside it.
 */
function qrMarkup(qr: string, x: number, y: number, size: number): string {
  const pad = 5;
  const inner = size - pad * 2;
  return `<g>
    <rect x="${x}" y="${y}" width="${size}" height="${size}" rx="7" fill="#ffffff"/>
    <g transform="translate(${x + pad} ${y + pad}) scale(${(inner / 256).toFixed(6)})">${qr}</g>
  </g>`;
}

/** Clickable hex, same idea as the verify link. The script copies the full value. */
function copyValue(
  id: string,
  value: string,
  x: number,
  labelY: number,
  valueY: number,
  labelText: string,
  mono: string,
): string {
  return `<g style="cursor:pointer" onclick="pbCopy(event,'${id}')">
    <rect x="${x - 78}" y="${labelY - 14}" width="156" height="46" fill="transparent"/>
    ${text(labelText, x, labelY, 14.5, INK.panelLabel, `font-weight="600" letter-spacing="1.2" ${mono}`)}
    ${text(middleTruncate(value), x, valueY, 13.5, INK.panelValue, `${mono} id="pb-${id}-label" data-copy="${esc(value)}"`)}
    <text id="pb-${id}-copied" x="${x}" y="${valueY + 16}" text-anchor="middle" fill="${INK.verify}" font-size="11" font-family="ui-monospace, monospace" opacity="0">Copied</text>
  </g>`;
}

const COPY_SCRIPT = `<script><![CDATA[
function pbCopy(event, id) {
  if (event) event.preventDefault();
  var label = document.getElementById("pb-" + id + "-label");
  var note = document.getElementById("pb-" + id + "-copied");
  var value = label ? label.getAttribute("data-copy") : "";
  var show = function () {
    if (!note) return;
    note.setAttribute("opacity", "1");
    clearTimeout(note._pbTimer);
    note._pbTimer = setTimeout(function () { note.setAttribute("opacity", "0"); }, 1200);
  };
  var fallback = function () {
    var area = document.createElement("textarea");
    area.value = value;
    document.body.appendChild(area);
    area.select();
    try { document.execCommand("copy"); } catch (err) {}
    document.body.removeChild(area);
    show();
  };
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(value).then(show).catch(fallback);
  } else {
    fallback();
  }
}
]]></script>`;

const CARDANO_MARK =
  "M6.5765 11.92c-.0488.8906.6316 1.653 1.5219 1.7056h.0934c.8928-.0006 1.6161-.725 1.6155-1.6178-.0006-.8928-.725-1.6161-1.6178-1.6155-.8578.0006-1.5658.6711-1.613 1.5277Zm-6.025-.416c-.288-.0161-.5345.2042-.5507.4922-.0161.288.2042.5345.4922.5507.2878.0161.5343-.204.5506-.4918.0167-.2876-.2029-.5343-.4905-.5509H.5514Zm5.9226-8.9645c.257-.1309.3593-.4453.2284-.7024-.1309-.257-.4453-.3593-.7024-.2284-.2558.1302-.3585.4424-.2301.6991.13.2582.4448.3622.703.2322.0003-.0002.0007-.0003.001-.0005Zm1.6397 2.8589c.398-.2006.558-.6859.3573-1.0839-.2006-.398-.6859-.558-1.0839-.3573-.3978.2006-.5579.6856-.3575 1.0835.2007.398.686.5581 1.0842.3578ZM2.597 7.3645c.3072.2013.7194.1154.9206-.1918.2013-.3072.1154-.7194-.1918-.9206-.3072-.2013-.7194-.1154-.9206.1918 0 .0001-.0001.0002-.0002.0003-.201.3072-.1151.7191.192.9203Zm.9824 3.8515c-.4453-.0254-.827.3149-.8524.7603s.3149.827.7603.8524c.4453.0254.827-.3149.8524-.7603v-.0006c.0251-.4451-.3152-.8264-.7603-.8518Zm-.8915 5.4221c-.328.1652-.46.565-.2948.893.1652.328.565.46.893.2948.328-.1652.46-.565.2948-.893l-.0002-.0004c-.1645-.3276-.5633-.4598-.8909-.2954-.0006.0003-.0013.0006-.0019.001Zm3.136-7.0931c.4386.2876 1.0274.1653 1.315-.2734.2876-.4386.1653-1.0274-.2734-1.315-.4386-.2876-1.0273-.1653-1.3149.2732-.2878.4381-.166 1.0266.2721 1.3144.0004.0003.0008.0005.0012.0008Zm9.9501-4.2106c.3729.2447.8737.1408 1.1184-.2321.2447-.3729.1408-.8737-.2321-1.1184-.3729-.2447-.8737-.1408-1.1184.2321 0 .0001-.0001.0002-.0002.0003-.2447.3726-.141.8729.2316 1.1176.0003.0002.0005.0003.0008.0005Zm1.6563-2.8499c.2413.1579.565.0904.723-.151s.0904-.565-.151-.723c-.241-.1577-.5642-.0906-.7224.1501-.1584.241-.0915.5648.1495.7233l.0009.0006Zm-1.5296 7.8938c-.8911-.0507-1.6546.6305-1.7053 1.5216-.0507.8911.6305 1.6546 1.5216 1.7053h.0928c.8925 0 1.616-.7235 1.616-1.616 0-.8572-.6693-1.5652-1.5251-1.6134v.0026ZM8.645 9.433c.2737.5459.8331.8896 1.4438.887.8925-.0002 1.6159-.7238 1.6157-1.6163 0-.2526-.0593-.5018-.1731-.7273-.4017-.7971-1.3735-1.1176-2.1706-.7158-.7971.4017-1.1176 1.3735-.7158 2.1706v.0019Zm12.6669-2.0704c.3273-.1666.4575-.567.2909-.8943-.1666-.3273-.567-.4575-.8943-.2909-.3259.1659-.4567.5639-.2927.8908.1652.3284.5653.4607.8937.2956.0008-.0004.0015-.0008.0023-.0012Zm-4.096.5146c-.4683.2362-.6565.8074-.4203 1.2757.2362.4683.8074.6565 1.2757.4203.468-.2361.6563-.8066.4207-1.2749-.2364-.4683-.8074-.6568-1.2762-.4211Zm-5.2768-5.6365c.3667.0205.6806-.2601.7011-.6267s-.2601-.6806-.6267-.7011c-.3655-.0205-.6789.2584-.7009.6238-.0225.3662.2562.6813.6224.7038.0014 0 .0028.0002.0042.0002Zm-.0077 4.1837c.5237.0288.9717-.3724 1.0006-.8961.0288-.5237-.3723-.9717-.8961-1.0006-.5231-.0288-.9707.3714-1.0005.8944-.0298.5237.3706.9724.8943 1.0021h.0017Zm-5.1475 9.6992c.4685-.2359.657-.807.421-1.2755-.2359-.4685-.807-.657-1.2755-.421-.4684.2359-.6569.8069-.4211 1.2754.2362.4682.807.6567 1.2755.4211Zm5.76-8.313c-.4881.7459-.2792 1.7463.4667 2.2344s1.7463.2792 2.2344-.4667.2792-1.7463-.4667-2.2344c-.262-.1715-.5683-.263-.8815-.2635-.5452-.0001-1.0538.2744-1.353.7302Zm2.8109 6.7571c-.4015-.7975-1.3735-1.1185-2.171-.7169-.7975.4015-1.1185 1.3735-.7169 2.171.4015.7975 1.3735 1.1185 2.171.7169.0005-.0002.0009-.0005.0014-.0007.7947-.3952 1.1186-1.3598.7235-2.1545-.0026-.0053-.0053-.0105-.0079-.0158Zm2.8211-.112c-.4386-.2876-1.0274-.1653-1.315.2734-.2876.4386-.1653 1.0274.2734 1.315.4386.2876 1.0273.1653 1.3149-.2732.2877-.4386.1654-1.0274-.2731-1.3151h-.0002Zm3.0963-2.4282c.0254-.4453-.3149-.827-.7603-.8524-.4453-.0254-.827.3149-.8524.7603-.0254.4453.3149.827.7603.8524h.0006c.4451.0251.8264-.3152.8518-.7603Zm2.2349-.5741c-.288-.0161-.5345.2042-.5507.4922s.2042.5345.4922.5507c.2878.0161.5343-.204.5506-.4918.016-.288-.2042-.5345-.4922-.551Zm-2.1043 5.1821c-.3073-.2011-.7194-.115-.9205.1923-.2011.3073-.115.7194.1923.9205.3071.201.719.1151.9202-.1918.2013-.3071.1156-.7193-.1916-.9207l-.0004-.0003ZM6.5695 21.5161c-.2411-.1584-.5649-.0913-.7232.1497-.1584.2411-.0913.5649.1497.7232.2411.1584.5649.0913.7232-.1497.158-.2411.091-.5646-.1498-.7232Zm10.9555-.055c-.257.1309-.3593.4453-.2284.7024.1309.257.4453.3593.7023.2284.2558-.1302.3585-.4424.2301-.6991-.1291-.2579-.4428-.3624-.7007-.2333-.0011.0005-.0022.0011-.0033.0016Zm-6.0691-5.2717c.4892-.7465.2806-1.7482-.4659-2.2374-.7465-.4892-1.7482-.2806-2.2374.4659s-.2806 1.7482.4659 2.2374c.2628.1722.5702.2641.8844.2644.5458.0022 1.0553-.2728 1.353-.7302Zm-3.2301 2.4768c-.3729-.2447-.8737-.1408-1.1184.2321-.2447.3729-.1408.8737.2321 1.1184s.8737.1408 1.1184-.2321c0-.0001.0001-.0002.0002-.0003.2445-.3729.1405-.8734-.2323-1.1181Zm3.7664 3.0931c-.3667-.0209-.6808.2594-.7017.6261s.2594.6808.6261.7017c.3658.0208.6795-.2581.7016-.6238.0222-.3666-.2571-.6817-.6236-.7039-.0008 0-.0015 0-.0023-.0001Zm.007-4.1837c-.5237-.0288-.9717.3724-1.0005.8961-.0288.5237.3724.9717.8961 1.0005.5228.0288.9703-.371 1.0004-.8938.0298-.524-.3709-.973-.8949-1.0028h-.0011Zm3.8861 1.0259c-.3976.2022-.556.6884-.3539 1.086.2022.3976.6884.556 1.086.3539.3961-.2014.5551-.685.3558-1.0821-.2-.3987-.6854-.5598-1.0841-.3597-.0013.0007-.0026.0013-.0039.002Z";

/** Width of face text in badge units, using the same font stack the file declares. */
function measureFaceText(value: string, size: number): number {
  const fallback = value.length * GLYPH_EM.value * size;
  if (typeof document === "undefined") return fallback;
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return fallback;
  ctx.font = `400 ${size}px Inter, system-ui, sans-serif`;
  const width = ctx.measureText(value).width;
  return width > 0 ? width : fallback;
}

/** Icon plus network name, centered as one row the way the page does. */
function networkRow(label: string, x: number, y: number, size: number): string {
  const icon = 34;
  const gap = 8;
  const textW = measureFaceText(label, size);
  const left = x - (icon + gap + textW) / 2;
  return `<g transform="translate(${left.toFixed(2)} ${(y - icon / 2).toFixed(2)}) scale(${(icon / 24).toFixed(4)})"><path fill="#0033AD" d="${CARDANO_MARK}"/></g><text x="${(left + icon + gap).toFixed(2)}" y="${y}" text-anchor="start" dominant-baseline="central" fill="${INK.body}" font-size="${size}" font-family="Inter, system-ui, sans-serif">${esc(label)}</text>`;
}

function faceMarkup(c: ProofCredential): string {
  const f = FACE;
  const earner = c.holder.displayName ?? c.holder.alias;
  const showAlias = Boolean(c.holder.displayName && c.holder.alias);
  const courseSize = fitSize(
    c.course,
    f.course.size,
    f.course.maxW,
    GLYPH_EM.course,
  );
  const moduleSize = fitSize(
    c.module,
    f.module.size,
    f.module.maxW,
    GLYPH_EM.module,
  );
  const earnerSize = fitSize(
    earner,
    f.earner.size,
    f.earner.maxW,
    GLYPH_EM.earner,
  );
  const label = `font-weight="600" letter-spacing="1.5" font-family="Inter, system-ui, sans-serif"`;
  const sans = `font-family="Inter, system-ui, sans-serif"`;
  const mono = `font-family="ui-monospace, monospace"`;
  const skills = c.skills.slice(0, 4);
  const skillX = (i: number) =>
    skills.length === 4
      ? (f.skills.columns[i] ?? 512)
      : f.skills.span[0] +
        ((i + 0.5) * (f.skills.span[1] - f.skills.span[0])) / skills.length;
  const didX = (f.didBox.x0 + f.didBox.x1) / 2;
  const issuedX = (f.issuedBox.x0 + f.issuedBox.x1) / 2;
  const parts = [
    text("COURSE", f.courseLabel.x, f.courseLabel.y, 12.5, INK.teal, label),
    text(
      c.course,
      f.course.x,
      f.course.y,
      courseSize,
      INK.navy,
      `font-weight="600" ${sans}`,
    ),
    text("MODULE", f.moduleLabel.x, f.moduleLabel.y, 12.5, INK.teal, label),
    text(c.module, f.module.x, f.module.y, moduleSize, INK.body, sans),
  ];
  if (earner.trim()) {
    parts.push(
      text("EARNER", f.earnerLabel.x, f.earnerLabel.y, 12.5, INK.orange, label),
      text(
        earner,
        f.earner.x,
        f.earner.y - (showAlias ? 3 : 0),
        earnerSize,
        INK.navy,
        `font-weight="700" ${sans}`,
      ),
    );
    if (showAlias) {
      parts.push(text(c.holder.alias, f.earner.x, 511, 11, "#4d6173", mono));
    }
  }
  if (c.issuerDid.trim()) {
    parts.push(
      text("ISSUER DID", didX, f.boxLabelY, 12.5, INK.teal, label),
      text(c.issuerDid, didX, f.boxValueY, 13, INK.value, mono),
    );
  }
  parts.push(
    text("ISSUED", issuedX, f.boxLabelY, 12.5, INK.teal, label),
    text(formatIssued(c.issuedAt), issuedX, f.boxValueY, 14.5, INK.value, sans),
    text("NETWORK", f.networkLabel.x, f.networkLabel.y, 12.5, INK.teal, label),
    networkRow(c.network, f.network.x + 4, f.network.y + 6, f.network.size),
  );
  if (skills.length > 0) {
    parts.push(
      text("SKILLS", f.skillsLabel.x, f.skillsLabel.y, 12.5, INK.orange, label),
    );
    skills.forEach((skill, i) => {
      const x = skillX(i);
      parts.push(
        skillIcon(skill, x, f.skills.iconY),
        text(skill.label, x, f.skills.textY, 11.5, "#2a3441", sans),
      );
    });
  }
  parts.push(
    copyValue(
      "course",
      c.courseId,
      f.courseIdPanel.x,
      f.courseIdPanel.labelY,
      f.courseIdPanel.valueY,
      "COURSE ID",
      mono,
    ),
    copyValue(
      "hash",
      c.sltHash,
      f.hashPanel.x,
      f.hashPanel.labelY,
      f.hashPanel.valueY,
      "SLT HASH",
      mono,
    ),
    `<a href="${esc(c.claimUrl ?? c.verifyUrl)}">`,
    `<rect x="${f.verifyTab.x - 78}" y="${f.verifyTab.y - 14}" width="156" height="28" rx="5" fill="#081c24" fill-opacity="0.78" stroke="#5ee2e9" stroke-opacity="0.75"/>`,
    text(
      "VERIFY CREDENTIAL",
      f.verifyTab.x,
      f.verifyTab.y,
      11,
      INK.verify,
      `font-weight="600" letter-spacing="0.7" ${sans}`,
    ),
    `</a>`,
  );
  return parts.join("");
}

function metadata(c: ProofCredential): string {
  const earner = c.holder.displayName ?? c.holder.alias;
  const doc = {
    "@context": [
      "https://www.w3.org/2018/credentials/v1",
      "https://purl.imsglobal.org/spec/ob/v3p0/context-3.0.3.json",
    ],
    type: ["VerifiableCredential", "OpenBadgeCredential"],
    name: c.course,
    validFrom: c.issuedAt,
    issuer: {
      id: c.issuerDid,
      type: "Profile",
      name: c.brand,
    },
    credentialSubject: {
      type: "AchievementSubject",
      name: earner,
      achievement: {
        type: "Achievement",
        name: c.module,
        description: c.course,
      },
    },
    "andamio:preview": true,
    "andamio:module": c.module,
    "andamio:holder": {
      alias: c.holder.alias,
      displayName: c.holder.displayName ?? earner,
    },
    "andamio:issuerDid": c.issuerDid,
    "andamio:issuedAt": c.issuedAt,
    "andamio:network": c.network,
    "andamio:skills": c.skills.map((skill) => skill.label),
    "andamio:courseId": c.courseId,
    "andamio:sltHash": c.sltHash,
    "andamio:theme": c.theme ?? {
      cyan: RING_COLORS.cyan,
      cyanHot: RING_COLORS.cyanHot,
      orange: RING_COLORS.orange,
      orangeHot: RING_COLORS.orangeHot,
      bandCool: RING_COLORS.bandCool,
      bandWarm: RING_COLORS.bandWarm,
    },
    "andamio:verifyUrl": c.verifyUrl,
  };
  const json = JSON.stringify(doc, null, 2).replace(/]]>/g, "]]]]><![CDATA[>");
  return `<metadata><![CDATA[\n${json}\n]]></metadata>`;
}

/** Safe download name from the course and credential the visitor typed. */
function badgeSlug(value: string): string {
  const slug = value
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48)
    .replace(/-+$/g, "");
  return slug || "badge";
}

function spin(dur: string, clockwise: boolean, body: string): string {
  const to = clockwise ? "360" : "-360";
  return `<g><animateTransform attributeName="transform" type="rotate" from="0 ${CENTER} ${CENTER}" to="${to} ${CENTER} ${CENTER}" dur="${dur}" repeatCount="indefinite"/>${body}</g>`;
}

/** Opacity along the scan, 0 at the tail and 1 at the bright tip. */
function tailOpacity(t: number): number {
  if (t <= 0) return 0;
  if (t >= 1) return 0.9;
  if (t < 0.83) return (t / 0.83) * 0.55 * 0.9;
  return (0.55 + ((t - 0.83) / 0.17) * 0.45) * 0.9;
}

/**
 * The page's moving dash: a short arc with a fading tail and round ends.
 * `tipDeg` leads; `tailDeg` is the faint end. The group around it spins.
 */
function comet(
  radius: number,
  tipDeg: number,
  tailDeg: number,
  color: string,
): string {
  const steps = 14;
  const width = 14;
  const slices: Array<{ d: string; opacity: number; cap: "round" | "butt" }> =
    [];
  for (let i = 0; i < steps; i++) {
    const t0 = i / steps;
    const t1 = (i + 1) / steps;
    const opacity = tailOpacity((t0 + t1) / 2);
    if (opacity < 0.03) continue;
    const at = (t: number) => tipDeg + (tailDeg - tipDeg) * (1 - t);
    const pad = 0.3;
    const a = at(t1);
    const b = at(t0);
    const from = Math.min(a, b) - (i === 0 ? 0 : pad);
    const to = Math.max(a, b) + (i === steps - 1 ? 0 : pad);
    slices.push({
      d: arcPath(radius, from, to),
      opacity,
      cap: "butt",
    });
  }
  if (slices.length > 0) {
    slices[0]!.cap = "round";
    slices[slices.length - 1]!.cap = "round";
  }
  return slices
    .map(
      (slice) =>
        `<path d="${slice.d}" fill="none" stroke="${color}" stroke-width="${width}" stroke-linecap="${slice.cap}" opacity="${slice.opacity.toFixed(3)}"/>`,
    )
    .join("");
}

export type BadgeSvgAssets = {
  plate: string;
  mark?: string;
  /** Inner markup of the QR, in a 256 viewBox. */
  qr: string;
};

/** Assemble the SVG. Callers inline the plate, logo, and QR first. */
export function renderBadgeSvg(
  credential: ProofCredential,
  assets: BadgeSvgAssets,
): string {
  const palette = paletteOf(credential.theme);
  const hue = huePaint(palette, false);
  const hueHot = huePaint(palette, true);
  const band = bandPaint(palette);
  const b = RING.b;
  const a = RING.a;
  const q = FACE.qr;
  const ringB = [
    annulus(b.band.from, b.band.to, "dashes", band),
    annulus(b.outer - 1.5, b.outer + 1.5, "edgeOuter", hue, 0.55),
    annulus(b.inner - 0.8, b.inner + 0.8, "edgeInner", hue),
    annulus(b.outer - 1, b.outer + 1, "edgeOuter", hue),
    bars(credential.sltHash, b.track, "dashes", palette),
  ].join("");
  const ringA = [
    annulus(a.band.from, a.band.to, "ticks", band),
    annulus(a.innerLine - 0.6, a.innerLine + 0.6, "ticks", hue, 0.55),
    `<g filter="url(#pb-glow)" opacity="0.75">${annulus(a.rim - 1, a.rim + 2, "rim", hue)}</g>`,
    annulus(a.rim - 0.9, a.rim + 0.9, "rim", hueHot),
    bars(credential.courseId, a.ticks, "ticks", palette),
  ].join("");
  const mark = assets.mark
    ? `<image href="${assets.mark}" x="${FACE.mark.x - FACE.mark.w / 2}" y="${FACE.mark.y - FACE.mark.h / 2}" width="${FACE.mark.w}" height="${FACE.mark.h}" preserveAspectRatio="xMidYMid meet"/>`
    : `<text x="${FACE.wordmark.x}" y="${FACE.wordmark.y}" text-anchor="start" dominant-baseline="central" fill="${INK.wordmark}" font-size="${fitSize(credential.brand, FACE.wordmark.size, FACE.wordmark.maxW, GLYPH_EM.wordmark)}" font-weight="600" font-family="Inter, system-ui, sans-serif">${esc(credential.brand.toUpperCase())}</text>`;
  const markers = [
    `<polygon points="${MARKERS.top.points}" fill="${palette.orange}"/>`,
    `<polygon points="${MARKERS.bottom.points}" fill="${palette.orange}"/>`,
    `<rect x="${MARKERS.left.x}" y="${MARKERS.left.y}" width="${MARKERS.left.w}" height="${MARKERS.left.h}" rx="3" fill="${palette.cyanHot}"/>`,
    `<rect x="${MARKERS.right.x}" y="${MARKERS.right.y}" width="${MARKERS.right.w}" height="${MARKERS.right.h}" rx="3" fill="${palette.orange}"/>`,
  ].join("");
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 ${BADGE_SIZE} ${BADGE_SIZE}" width="${BADGE_SIZE}" height="${BADGE_SIZE}" role="img" aria-label="${esc(`${credential.module}, ${credential.course}`)}">
${metadata(credential)}
<defs>
  <filter id="pb-glow" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="4"/></filter>
  <clipPath id="pb-disc"><circle cx="${CENTER}" cy="${CENTER}" r="${CENTER}"/></clipPath>
</defs>
<g clip-path="url(#pb-disc)">
  <circle cx="${CENTER}" cy="${CENTER}" r="${CENTER}" fill="${RING_COLORS.deep}"/>
  <image href="${assets.plate}" x="0" y="0" width="${BADGE_SIZE}" height="${BADGE_SIZE}" preserveAspectRatio="xMidYMid slice"/>
  ${spin("112s", false, ringB)}
  ${spin("84s", true, ringA)}
  ${spin("9s", true, comet(a.ticks, 360, 336, palette.cyanHot))}
  ${spin("9s", false, comet(b.track, 0, 24, palette.cyanHot))}
  ${markers}
  ${mark}
  ${faceMarkup(credential)}
  ${qrMarkup(assets.qr, q.x, q.y, q.size)}
</g>
${COPY_SCRIPT}
</svg>`;
}

async function toDataUrl(src: string): Promise<string> {
  if (src.startsWith("data:")) return src;
  const response = await fetch(src);
  if (!response.ok) throw new Error(`Could not read ${src}`);
  const blob = await response.blob();
  return await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () =>
      reject(reader.error ?? new Error("Could not read image"));
    reader.readAsDataURL(blob);
  });
}

function qrInner(markup: string): string {
  return markup.replace(/^<\?xml[^>]*>/, "").replace(/<\/?svg[^>]*>/g, "");
}

/** Fetch the plate, logo, and QR, then build the downloadable file. */
export async function buildBadgeSvg(
  credential: ProofCredential,
): Promise<string> {
  const plateSrc = credential.mark ? PLATE_OPEN_SRC : PLATE_SRC;
  const [plate, mark, QRCode] = await Promise.all([
    toDataUrl(plateSrc),
    credential.mark ? toDataUrl(credential.mark) : Promise.resolve(undefined),
    import("@pjaudiomv/qrcode-svg").then((mod) => mod.default),
  ]);
  const qr = new QRCode({
    content: credential.verifyUrl || "https://andamio.io",
    padding: 0,
    width: 256,
    height: 256,
    ecl: "L",
    join: true,
    container: "none",
    color: "#0b121b",
    background: "#ffffff",
    pretty: false,
    xmlDeclaration: false,
  }).svg();
  return renderBadgeSvg(credential, { plate, mark, qr: qrInner(qr) });
}

export function badgeSvgFilename(credential: ProofCredential): string {
  const course = badgeSlug(credential.course).replace(/^andamio-?/, "");
  const moduleName = badgeSlug(credential.module).replace(/^andamio-?/, "");
  const parts = [
    ...new Set([course, moduleName].filter((part) => part.length > 0)),
  ];
  return parts.length > 0 ? `andamio-${parts.join("-")}.svg` : "andamio.svg";
}
