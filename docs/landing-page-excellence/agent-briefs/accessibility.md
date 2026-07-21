# Brief: Accessibility Agent

- **Status:** draft
- **Requirements:** A11Y-*, VIS-05, QA-04
- **Depends on:** frontend structural changes; can pair early on A11Y-01/02

## Inputs

- shared-context; [../requirements/06-accessibility-responsive.md](../requirements/06-accessibility-responsive.md)
- a11y baseline audit; axe + Playwright adopt-now

## Allowed files

`src/ui/system/kit.tsx`, `HowItWorks.tsx`, `StoryFork.tsx`, related funnel components, globals for focus/skip styles. Docs evidence under `implementation/` or `audits/`.

## Outputs

- Skip link + main landmark
- Complete tabs pattern on HowItWorks
- Keyboard + reduced-motion evidence notes
- axe reports for `/`, `/issuer`, `/show-me`

## Acceptance

- A11Y-01..05 P0 tests pass; A11Y-06..08 scheduled with evidence or tracked P1
- No Serious/Critical axe issues without adopted exception

## Verification commands

```bash
yarn build && yarn start
# Playwright+axe smoke (to be added) on /, /issuer, /show-me
# Manual keyboard pass on HowItWorks and /show-me
```

## Escalation

WCAG exception requests; third-party widget blocking AA; screen-reader bugs in BadgeBuilder SVG.
