import type React from "react";
import V2VerifierDemo from "./V2VerifierDemo";

/* Registry mapping a step's `demoId` (declared in walkthrough-data.ts) to the
 * component rendered under that step's bullets.
 *
 * Adding a demo is three mechanical steps:
 *   1. Build the component (e.g., V2PrerequisiteGateDemo).
 *   2. Add its scenario data.
 *   3. Register it here and set `demoId` on the relevant step.
 * The render seam in V2WalkthroughSection never changes. */
export const STEP_DEMOS: Record<string, React.FC> = {
  "cert-verifier": V2VerifierDemo,
};
