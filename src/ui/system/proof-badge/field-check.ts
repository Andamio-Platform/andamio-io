/** Client-only checks for the badge builder. Nothing here leaves the browser. */

export const FIELD_MAX = {
  course: 80,
  module: 120,
  target: 160,
  earner: 60,
  did: 128,
  skill: 24,
  skills: 140,
} as const;

export type FieldErrors = {
  course?: string;
  module?: string;
  targets?: string;
  earner?: string;
  did?: string;
  issued?: string;
  skills?: string;
};

/** Drop control characters and markup, then cap length. */
export function sanitizeField(value: string, max: number): string {
  return value
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .replace(/[<>]/g, "")
    .slice(0, max);
}

const NAME = /^[\p{L}\p{M}][\p{L}\p{M} .'\u2019-]*$/u;
const DID = /^did:[a-z0-9]+:[a-zA-Z0-9._:%-]+$/;
const ISSUED =
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(?::\d{2}(?:\.\d+)?)?(?:Z|[+-]\d{2}:\d{2})?$/;

export function checkFields(input: {
  course: string;
  module: string;
  targets: readonly string[];
  earner: string;
  did: string;
  issued: string;
  skills: string;
}): FieldErrors {
  const errors: FieldErrors = {};
  if (!input.course.trim()) errors.course = "Enter a course name.";
  if (!input.module.trim()) errors.module = "Enter a credential name.";
  if (input.targets.length === 0) {
    errors.targets = "Add at least one learning target.";
  } else if (input.targets.some((line) => !line.trim())) {
    errors.targets = "Each learning target needs a line.";
  }
  const earner = input.earner.trim();
  if (earner && !NAME.test(earner)) {
    errors.earner = "Use a name: letters, spaces, hyphens, or apostrophes.";
  }
  const did = input.did.trim();
  if (did && !DID.test(did)) {
    errors.did = "A DID looks like did:andamio:…";
  }
  const issued = input.issued.trim();
  if (!issued || !ISSUED.test(issued) || Number.isNaN(Date.parse(issued))) {
    errors.issued = "Use a date and time, such as 2025-06-03T10:30:00Z.";
  }
  const labels = input.skills
    .split(",")
    .map((label) => label.trim())
    .filter(Boolean);
  if (labels.length > 4) errors.skills = "Up to four labels.";
  else if (labels.some((label) => label.length > FIELD_MAX.skill)) {
    errors.skills = `Each skill is at most ${FIELD_MAX.skill} characters.`;
  }
  return errors;
}

export function fieldsAreValid(errors: FieldErrors): boolean {
  return Object.keys(errors).length === 0;
}
