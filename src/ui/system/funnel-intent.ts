/** Session-local funnel intent (TECH-01: explicit choice only, no PII). */

export const INTENT_STORAGE_KEY = "andamio.funnel.intent";

export type FunnelIntent = "issuer" | "builder" | "curious";

export function persistIntent(key: string) {
  try {
    sessionStorage.setItem(INTENT_STORAGE_KEY, key);
  } catch {
    /* ignore quota / private mode */
  }
}

export function readIntent(): string | null {
  try {
    return sessionStorage.getItem(INTENT_STORAGE_KEY);
  } catch {
    return null;
  }
}
