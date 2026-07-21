from pathlib import Path

ROOT = Path(__file__).resolve().parent
SHORT = ROOT.parent / "shortlists"
TODAY = "2026-07-21"

components = [
    ("aceternity-ui", "Aceternity UI", "https://ui.aceternity.com/", "freemium", "Copy-paste React/Next Tailwind + Framer Motion landing components with free and paid blocks.", "Issuer hero/reveal patterns; adapt sparsely to Warm Index (avoid dark neon default).", "Free components usable; Pro blocks paid."),
    ("magic-ui", "Magic UI", "https://magicui.design/", "freemium", "Animated React marketing components built with Tailwind and Motion.", "Micro-interactions for CTAs, beams, and section polish.", "Many free; Pro tiers exist."),
    ("react-bits", "React Bits", "https://www.reactbits.dev/", "free", "Open animated React components with multiple styling variants.", "Lightweight motion primitives without heavy Three.js.", "MIT / free source."),
    ("shadcn-ui", "shadcn/ui", "https://ui.shadcn.com/", "free", "Accessible copy-paste Radix + Tailwind component system.", "Already in repo; source of form/dialog patterns, not brand chrome.", "MIT; free."),
    ("shadcn-io-examples", "shadcn.io Examples", "https://www.shadcn.io/examples", "freemium", "Large gallery of free shadcn/ui pattern examples.", "Reference interaction patterns for secondary UI.", "Free examples; Pro support exists."),
    ("radix-primitives", "Radix Primitives", "https://www.radix-ui.com/primitives", "free", "Unstyled accessible React primitives.", "Canonical a11y behavior for tabs/dialogs already used via shadcn.", "MIT."),
    ("headless-ui", "Headless UI", "https://headlessui.com/", "free", "Unstyled accessible components for React/Vue by Tailwind Labs.", "Compare menu/disclosure patterns for TopNav.", "MIT."),
    ("ark-ui", "Ark UI", "https://ark-ui.com/", "free", "Headless component library with React support.", "Alternative accessible primitives if Radix gaps appear.", "MIT."),
    ("park-ui", "Park UI", "https://park-ui.com/", "free", "Styled components built on Ark UI + Panda CSS.", "Design-system comparison; not a drop-in for Andamio tokens.", "Free/open."),
    ("daisyui", "daisyUI", "https://daisyui.com/", "freemium", "Tailwind component class library.", "Quick layout experiments only; brand must stay Warm Index.", "Free core; Pro themes."),
    ("flowbite", "Flowbite", "https://flowbite.com/", "freemium", "Tailwind UI components and sections.", "Section composition ideas; restyle to brand.", "Free + Pro."),
    ("preline", "Preline UI", "https://preline.co/", "freemium", "Tailwind UI components with examples.", "Nav/footer/CTA section references.", "Free + Pro."),
    ("hyperui", "HyperUI", "https://www.hyperui.dev/", "free", "Free open-source Tailwind components.", "Simple marketing blocks for rapid composition tests.", "MIT."),
    ("tailwind-ui", "Tailwind UI", "https://tailwindui.com/", "paid", "Official Tailwind marketing/app component kit.", "Inspiration only unless licensed.", "Paid product."),
    ("tailgrids", "Tailgrids", "https://tailgrids.com/", "freemium", "Tailwind UI components and templates.", "Landing section references.", "Free + paid."),
    ("launch-ui", "Launch UI", "https://www.launchuicomponents.com/", "freemium", "Landing kits built with React, shadcn/ui, Tailwind.", "Closest stack match for issuer landing sections.", "Free + Pro."),
    ("cult-ui", "Cult UI", "https://www.cult-ui.com/", "free", "Animated React components for modern sites.", "Motion pattern reference for CTAs and cards.", "Free/open."),
    ("origin-ui", "Origin UI", "https://originui.com/", "free", "Free open-source Tailwind + React components.", "Compact form/control patterns.", "Free."),
    ("kokonut-ui", "Kokonut UI", "https://kokonutui.com/", "free", "Animated Tailwind/React components.", "Subtle marketing motion ideas.", "Free."),
    ("animate-ui", "Animate UI", "https://animate-ui.com/", "free", "Animated component primitives for React.", "Reduced-motion-aware animation patterns.", "Free/open."),
    ("eldoraui", "Eldora UI", "https://www.eldoraui.site/", "free", "Animated UI components for Next.js.", "Background/hero effect experiments.", "Free."),
    ("syntaxui", "SyntaxUI", "https://syntaxui.com/", "free", "Animated Tailwind components and effects.", "Text/CTA animation references.", "Free."),
    ("farmui", "FarmUI", "https://farmui.com/", "freemium", "Modern UI kits and animated sections.", "Landing section inspiration.", "Free + paid."),
    ("heroui", "HeroUI (NextUI)", "https://www.heroui.com/", "free", "React component library with theming.", "Compare accessible component APIs.", "MIT."),
    ("mantine", "Mantine", "https://mantine.dev/", "free", "Full React component library.", "App-density patterns; marketing use selective.", "MIT."),
    ("chakra-ui", "Chakra UI", "https://chakra-ui.com/", "free", "Accessible React component system.", "A11y/API reference; do not replace brand kit.", "MIT."),
]

animation = [
    ("motion-dev", "Motion (Framer Motion)", "https://motion.dev/", "freemium", "Official Motion docs and APIs for React animation.", "Current stack dependency; canonical motion API.", "Open source + commercial features."),
    ("motion-score", "MotionScore", "https://score.motion.dev/", "free", "Free animation performance auditing for live pages.", "Audit issuer landing motion cost before shipping.", "Free audits."),
    ("gsap", "GSAP", "https://gsap.com/", "freemium", "Industry animation library with ScrollTrigger.", "Optional advanced scroll choreography if Motion is insufficient.", "Free core; Club plugins paid."),
    ("animejs", "anime.js", "https://animejs.com/", "free", "Lightweight JavaScript animation library.", "Alternative micro-animation engine.", "MIT."),
    ("auto-animate", "FormKit AutoAnimate", "https://auto-animate.formkit.com/", "free", "Zero-config DOM transition helper.", "Simple list/state transitions without custom keyframes.", "MIT."),
    ("lottiefiles", "LottieFiles", "https://lottiefiles.com/", "freemium", "Lottie animation hosting and free assets.", "Optional credential/verify micro-illustrations; keep sparse.", "Free + Pro; check asset licenses."),
    ("rive", "Rive", "https://rive.app/", "freemium", "Interactive runtime animations for web.", "Interactive badge/demo moments if justified.", "Free + paid; runtime free."),
    ("spline", "Spline", "https://spline.design/", "freemium", "3D web scenes and interactive objects.", "Hero experiments only; watch bundle/perf.", "Free + paid."),
    ("theatrejs", "Theatre.js", "https://www.theatrejs.com/", "free", "Animation sequencing toolkit for web.", "Complex demo timelines if needed.", "Apache-2.0."),
    ("lenis", "Lenis", "https://lenis.darkroom.engineering/", "free", "Smooth scroll library.", "Only if scroll feel needs polish; respect reduced motion.", "MIT."),
    ("locomotive-scroll", "Locomotive Scroll", "https://scroll.locomotive.ca/", "free", "Smooth scrolling and parallax library.", "Inspiration; prefer lighter Motion scroll.", "MIT."),
    ("aos", "AOS - Animate on Scroll", "https://michalsnik.github.io/aos/", "free", "Simple scroll-reveal library.", "Legacy pattern; prefer Motion tokens.", "MIT."),
    ("css-tricks-animation", "CSS-Tricks Animation Guides", "https://css-tricks.com/tag/animation/", "free", "Practical CSS/JS animation articles.", "Motion craft and reduced-motion guidance.", "Editorial free."),
    ("web-animations-api", "MDN Web Animations API", "https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API", "free", "Browser-native animation API reference.", "Prefer compositor-friendly properties.", "Free docs."),
    ("prefers-reduced-motion", "MDN prefers-reduced-motion", "https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion", "free", "Spec/docs for reduced-motion media query.", "Required for Andamio motion acceptance.", "Free docs."),
]

inspiration = [
    ("lapa-ninja", "Lapa Ninja", "https://www.lapa.ninja/", "freemium", "Large curated landing-page screenshot gallery.", "Issuer-first layout pattern mining.", "Free browsing; Pro extras."),
    ("landingfolio", "Landingfolio", "https://www.landingfolio.com/", "freemium", "Landing inspiration plus components/templates.", "CTA/hero structure references.", "Free + Pro."),
    ("landing-gallery", "Landing.Gallery", "https://www.landing.gallery/", "free", "Curated landing-page inspiration library.", "Visual hierarchy and section rhythm study.", "Free browse."),
    ("saaslandingpage", "SaaS Landing Page", "https://saaslandingpage.com/", "free", "SaaS landing inspiration gallery.", "Enterprise issuer funnel comparisons.", "Free."),
    ("land-book", "Land-book", "https://land-book.com/", "freemium", "Website design inspiration gallery.", "Overall composition taste checks.", "Free + Pro."),
    ("awwwards", "Awwwards", "https://www.awwwards.com/", "freemium", "Awarded site inspiration and trends.", "Motion/quality bar; avoid trend-chasing.", "Free browse; paid features."),
    ("godly", "Godly", "https://godly.website/", "free", "High-craft website inspiration gallery.", "Memorable-but-professional references.", "Free."),
    ("refero", "Refero", "https://refero.design/", "freemium", "Product UI pattern screenshots.", "App/issuer product-page patterns.", "Free + Pro."),
    ("mobbin", "Mobbin", "https://mobbin.com/", "freemium", "Mobile/web product flow screenshots.", "Mobile issuer funnel UX.", "Free limited + paid."),
    ("screenlane", "Screenlane", "https://www.screenlane.com/", "freemium", "Product UX pattern library.", "CTA and onboarding flow ideas.", "Free + Pro."),
    ("pageflows", "Page Flows", "https://pageflows.com/", "paid", "UX flow recordings and screenshots.", "Conversion-path research if budget allows.", "Paid."),
    ("stripe", "Stripe", "https://stripe.com/", "inspiration-only", "Reference-quality product marketing site.", "Tone, proof, and developer-secondary depth.", "Inspiration only."),
    ("linear-app", "Linear", "https://linear.app/", "inspiration-only", "Product marketing with strong craft.", "Restraint, typography, motion discipline.", "Inspiration only."),
    ("vercel", "Vercel", "https://vercel.com/", "inspiration-only", "Developer-facing marketing site.", "Developer path clarity without hero competition.", "Inspiration only."),
    ("clerk", "Clerk", "https://clerk.com/", "inspiration-only", "Auth product marketing with demos.", "Interactive proof patterns for issuer demo.", "Inspiration only."),
    ("credly", "Credly", "https://www.credly.com/", "inspiration-only", "Credential/badge issuer competitor marketing.", "Competitive messaging contrast for Andamio.", "Inspiration only."),
    ("accredible", "Accredible", "https://www.accredible.com/", "inspiration-only", "Digital credentialing platform marketing.", "Enterprise issuer buyer journey comparison.", "Inspiration only."),
    ("open-badges", "1EdTech Open Badges", "https://www.1edtech.org/program/openbadges", "free", "Open Badges standard and ecosystem docs.", "Interoperability claims must stay accurate.", "Free standards."),
]

assets = [
    ("lucide", "Lucide Icons", "https://lucide.dev/", "free", "Open icon set used widely with shadcn.", "Already aligned with stack; keep stroke consistency.", "ISC/MIT family."),
    ("heroicons", "Heroicons", "https://heroicons.com/", "free", "Tailwind Labs icon set.", "Secondary icon source already in deps.", "MIT."),
    ("phosphor", "Phosphor Icons", "https://phosphoricons.com/", "free", "Flexible icon family with many weights.", "Only if a semantic icon is missing elsewhere.", "MIT."),
    ("google-fonts", "Google Fonts", "https://fonts.google.com/", "free", "Hosted webfont catalog.", "Inter/JetBrains already used; avoid new sprawl.", "OFL/fonts free; hosting tradeoffs."),
    ("fontsource", "Fontsource", "https://fontsource.org/", "free", "Self-hostable open fonts as packages.", "Prefer self-host for perf/privacy vs Google CSS import.", "OFL via packages."),
    ("undraw", "unDraw", "https://undraw.co/", "free", "Customizable open illustrations.", "Optional secondary visuals; badge remains hero.", "Open license; attribution culture."),
    ("humaaans", "Humaaans", "https://www.humaaans.com/", "free", "Mix-and-match people illustrations.", "People/community visuals if needed.", "Free with terms."),
    ("blobmaker", "Blobmaker", "https://www.blobmaker.app/", "free", "Organic SVG blob generator.", "Background atmosphere only.", "Free tool."),
    ("haikei", "Haikei", "https://app.haikei.app/", "freemium", "SVG background/generator tool.", "Subtle paper textures/grids.", "Free + Pro."),
    ("svgomg", "SVGOMG", "https://jakearchibald.github.io/svgomg/", "free", "SVG optimization tool.", "Compress badge/logo SVGs for LCP.", "Free."),
    ("squoosh", "Squoosh", "https://squoosh.app/", "free", "Image compression web app.", "Optimize OG/social images.", "Free."),
    ("coolors", "Coolors", "https://coolors.co/", "freemium", "Palette generator.", "Not for inventing brand; only contrast checks.", "Free + Pro."),
    ("contrast-checker", "WebAIM Contrast Checker", "https://webaim.org/resources/contrastchecker/", "free", "WCAG contrast calculator.", "Validate ink/orange/blue usage.", "Free."),
]

testing = [
    ("axe-devtools", "axe DevTools", "https://www.deque.com/axe/devtools/", "freemium", "Browser a11y scanner with low false positives.", "Primary automated a11y pass on / /issuer /show-me.", "Free extension; Pro paid."),
    ("wave", "WAVE", "https://wave.webaim.org/", "freemium", "Visual accessibility evaluation tool.", "Quick manual a11y sanity checks.", "Free extension; API paid."),
    ("accessibility-insights", "Accessibility Insights", "https://accessibilityinsights.io/", "free", "Microsoft guided accessibility testing.", "FastPass + assessment for WCAG AA.", "Free."),
    ("lighthouse", "Chrome Lighthouse", "https://developer.chrome.com/docs/lighthouse", "free", "Perf/a11y/SEO/best-practices audits.", "Release gate profile from Phase 1.", "Free."),
    ("webpagetest", "WebPageTest", "https://www.webpagetest.org/", "freemium", "Lab performance testing with filmstrips.", "Cold-load LCP evidence.", "Free runs + paid."),
    ("pagespeed", "PageSpeed Insights", "https://pagespeed.web.dev/", "free", "Lab + field CWV reports.", "Field p75 when public URL available.", "Free."),
    ("browserstack", "BrowserStack", "https://www.browserstack.com/", "paid", "Cross-browser device cloud.", "Optional real-device QA.", "Paid; free trial."),
    ("responsively", "Responsively App", "https://responsively.app/", "free", "Multi-viewport development browser.", "320-1440 responsive sweeps.", "Open source."),
    ("polypane", "Polypane", "https://polypane.app/", "paid", "Dev browser with a11y/overlays.", "Optional premium responsive QA.", "Paid."),
    ("storybook", "Storybook", "https://storybook.js.org/", "free", "Component workshop and visual docs.", "Document kit specimens beyond /explore/system.", "MIT."),
    ("chromatic", "Chromatic", "https://www.chromatic.com/", "freemium", "Visual testing for Storybook.", "Visual regression if Storybook adopted.", "Free tier + paid."),
    ("playwright", "Playwright", "https://playwright.dev/", "free", "E2E/browser automation.", "Already in repo for screenshots; expand tests.", "Apache-2.0."),
    ("pa11y", "Pa11y", "https://pa11y.org/", "free", "CLI accessibility testing.", "CI a11y gate candidate.", "Open source."),
    ("wcag-quickref", "W3C WCAG 2.2 Quick Ref", "https://www.w3.org/WAI/WCAG22/quickref/", "free", "Authoritative WCAG criteria.", "Acceptance criteria source.", "Free."),
    ("web-vitals", "web-vitals library", "https://github.com/GoogleChrome/web-vitals", "free", "Field CWV JS library.", "Privacy-approved RUM later.", "Apache-2.0."),
]

FILES = {
    "components-and-design-systems.md": ("Components and design systems", components),
    "animation-and-interaction.md": ("Animation and interaction", animation),
    "landing-patterns-and-inspiration.md": ("Landing-page patterns and inspiration", inspiration),
    "icons-illustrations-type-and-visuals.md": ("Icons, illustrations, type, and visual materials", assets),
    "accessibility-responsive-and-performance.md": ("Accessibility, responsive, and performance validation", testing),
}


def write_table(path: Path, title: str, rows: list[tuple]) -> None:
    lines = [
        f"# {title}",
        "",
        f"- **checked_as_of / verified_on:** `{TODAY}`",
        "- **Category freshness:** `ui-ux = 180 days`",
        f"- **Accepted unique websites:** `{len(rows)}`",
        "- **Method:** Official product/docs pages; pricing labeled free/freemium/paid/inspiration-only; Andamio use focuses on issuer-primary landing craft.",
        "",
        "| ID | Name | URL | Access | What it is | Andamio use | Notes |",
        "|---|---|---|---|---|---|---|",
    ]
    for id_, name, url, access, what, use, notes in rows:
        lines.append(f"| `{id_}` | {name} | {url} | `{access}` | {what} | {use} | {notes} |")
    lines.append("")
    path.write_text("\n".join(lines), encoding="utf-8")


def main() -> None:
    SHORT.mkdir(parents=True, exist_ok=True)
    total = 0
    for fname, (title, rows) in FILES.items():
        write_table(ROOT / fname, title, rows)
        total += len(rows)

    readme = f"""# UI/UX Resources

Phase 4 catalog of websites and tools for improving the Andamio landing page. Prefer free/open/freemium resources with strong animation or component value that can be adapted to the Warm Index system.

## Mechanical inventory

- **checked_as_of / verified_on:** `{TODAY}`
- **Freshness:** category `ui-ux = 180 days`; research phase `180 days`; effective window `180 days`.
- **Accepted unique websites/tools:** `{total}`
- **Category counts:** components `{len(components)}`; animation `{len(animation)}`; inspiration `{len(inspiration)}`; visuals `{len(assets)}`; testing `{len(testing)}`.

## Catalogs

- [Components and design systems](components-and-design-systems.md) — {len(components)}
- [Animation and interaction](animation-and-interaction.md) — {len(animation)}
- [Landing-page patterns and inspiration](landing-patterns-and-inspiration.md) — {len(inspiration)}
- [Icons, illustrations, type, and visuals](icons-illustrations-type-and-visuals.md) — {len(assets)}
- [Accessibility, responsive, and performance](accessibility-responsive-and-performance.md) — {len(testing)}
- [Andamio shortlist](../shortlists/ui-ux-shortlist.md)

## Fit rules for Andamio

1. Issuer-primary conversion beats visual novelty.
2. Preserve Warm Index brand: ink/paper, disciplined orange, blue wayfinding only, square geometry, Inter + JetBrains Mono.
3. Prefer copy-paste/composable ideas over wholesale aesthetic cloning.
4. Motion must support credential reveal/proof; honor `prefers-reduced-motion`.
5. Paid/inspiration-only resources are references unless separately licensed.
"""
    (ROOT / "README.md").write_text(readme, encoding="utf-8")

    shortlist = f"""# UI/UX Resource Shortlist

- **as_of:** `{TODAY}`
- **Source pool:** `{total}` cataloged websites/tools
- **Focus:** free/open/freemium resources that improve issuer-primary landing craft without breaking Warm Index

| Rank | Resource | Bucket | Why for Andamio | How to use |
|---:|---|---|---|---|
| 1 | [Motion](https://motion.dev/) | `adopt-now` | Already in stack; controls reveal/scroll motion | Keep tokenized motion; audit with MotionScore |
| 2 | [shadcn/ui](https://ui.shadcn.com/) | `adopt-now` | Existing accessible primitives | Use for interaction, not brand chrome |
| 3 | [Playwright](https://playwright.dev/) | `adopt-now` | Already installed for screenshots | Expand route/a11y smoke tests |
| 4 | [Lighthouse](https://developer.chrome.com/docs/lighthouse) | `adopt-now` | Release quality floor | Median of 3 mobile runs on canonical routes |
| 5 | [axe DevTools](https://www.deque.com/axe/devtools/) | `adopt-now` | Low-noise a11y scanning | Gate WCAG issues on / /issuer /show-me |
| 6 | [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) | `adopt-now` | Brand accent contrast risks | Validate orange/blue usage |
| 7 | [SVGOMG](https://jakearchibald.github.io/svgomg/) | `adopt-now` | Hero badge/logo payload | Compress LCP SVG assets |
| 8 | [Launch UI](https://www.launchuicomponents.com/) | `evaluate` | Closest React/shadcn landing kit | Steal section structure, restyle to Warm Index |
| 9 | [Magic UI](https://magicui.design/) | `evaluate` | Strong freemium motion components | Trial 1-2 micro-interactions max |
| 10 | [Aceternity UI](https://ui.aceternity.com/) | `evaluate` | High-craft animated blocks | Inspiration + selective free components; avoid neon/dark defaults |
| 11 | [React Bits](https://www.reactbits.dev/) | `evaluate` | Lighter animated primitives | Prefer over heavy 3D effects |
| 12 | [Fontsource](https://fontsource.org/) | `evaluate` | Self-host fonts | Replace broad Google Fonts import |
| 13 | [Credly](https://www.credly.com/) / [Accredible](https://www.accredible.com/) | `reference-only` | Competitor issuer journeys | Differentiate ownership/proof narrative |
| 14 | [Lapa Ninja](https://www.lapa.ninja/) | `reference-only` | Broad landing inspiration | Pattern mining only |
| 15 | [prefers-reduced-motion (MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion) | `adopt-now` | Required motion acceptance | Every animation needs an equivalent |

## Recommendation

Adopt deterministic quality and stack-aligned tools first. Evaluate animated component libraries only as composable ideas that survive brand, accessibility, and performance gates. Do not clone dark neon marketing aesthetics onto Andamio.
"""
    (SHORT / "ui-ux-shortlist.md").write_text(shortlist, encoding="utf-8")
    print(f"Wrote {total} UI/UX resources")


if __name__ == "__main__":
    main()
