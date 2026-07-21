# Brief: Performance Agent

- **Status:** draft
- **Requirements:** PERF-*, QA-05
- **Depends on:** clean isolated builds; coordinates fonts with frontend

## Inputs

- shared-context; [../requirements/08-performance.md](../requirements/08-performance.md)
- performance baseline; Lighthouse + SVGOMG + Fontsource evaluate

## Allowed files

`src/styles/globals.css` font imports, image/SVG assets under `public/` used by funnel, dynamic import boundaries in `src/ui/system/**`, docs evidence. Avoid drive-by refactors outside budgets.

## Outputs

- Isolated baseline Lighthouse set (3×3)
- Font inventory + bounded loading PR
- SVG optimization for LCP candidates
- Budget ratification note

## Acceptance

- PERF-01, PERF-03..05 met or exception decision filed
- Invalid `.next` runs discarded
- No field CWV claims without PERF-02 telemetry

## Verification commands

```bash
# Stop conflicting next processes; clean .next if needed
yarn build
npx lighthouse http://localhost:3000/ --preset=desktop # use mobile profile per audit; 3 runs
# repeat /issuer /show-me; retain JSON/HTML
```

## Escalation

Need to raise JS ceilings; font self-host blocked; third-party script mandatory.
