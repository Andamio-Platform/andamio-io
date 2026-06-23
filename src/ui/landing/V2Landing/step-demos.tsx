import type React from "react";
import V2VerifierDemo from "./V2VerifierDemo";
import BadgeBuilderDemo from "./BadgeBuilderDemo";

/* Registry mapping a step's `demoId` (declared in walkthrough-data.ts) to the
 * component rendered under that step's bullets.
 *
 * Adding a demo is three mechanical steps:
 *   1. Build the component (e.g., V2PrerequisiteGateDemo).
 *   2. Add its scenario data.
 *   3. Register it here and set `demoId` on the relevant step.
 * The render seam in V2WalkthroughSection never changes. */
export const STEP_DEMOS = {
  "cert-verifier": V2VerifierDemo,
  "badge-builder": BadgeBuilderDemo,
} satisfies Record<string, React.FC>;

/** The set of registered demo ids. A step's `demoId` must be one of these, so a
 *  typo is a compile error instead of a silently-missing demo. */
export type DemoId = keyof typeof STEP_DEMOS;
