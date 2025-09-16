// ──────────────────────────────────────────────────────────────────────────────
// File: src/features/consent/cookies.ts
// Purpose: Small cookie helpers compatible with App Router RSC & Client
// ──────────────────────────────────────────────────────────────────────────────

import { ConsentState, CONSENT_COOKIE, CONSENT_MAX_AGE_DAYS } from "./types";

// ----------------------
// 1. Read Consent Cookie Function
// Location: /src/features/consent/cookies.ts
// Purpose: Safely read and parse consent cookie from document
// Returns: ConsentState object or null if not found/invalid
// ----------------------
export function readConsentCookie(): ConsentState | null {
  try {
    const raw = typeof document !== "undefined"
      ? document.cookie.split("; ").find((c) => c.startsWith(`${CONSENT_COOKIE}=`))?.split("=")[1]
      : null;
    if (!raw) return null;
    const parsed = JSON.parse(decodeURIComponent(raw)) as ConsentState;
    return parsed;
  } catch {
    return null;
  }
}

// ----------------------
// 2. Write Consent Cookie Function
// Location: /src/features/consent/cookies.ts
// Purpose: Persist consent state to browser cookie
// Parameters: value - ConsentState object to store
// ----------------------
export function writeConsentCookie(value: ConsentState) {
  const maxAge = CONSENT_MAX_AGE_DAYS * 24 * 60 * 60; // seconds
  const encoded = encodeURIComponent(JSON.stringify(value));
  document.cookie = `${CONSENT_COOKIE}=${encoded}; Path=/; Max-Age=${maxAge}; SameSite=Lax`;
}

// ----------------------
// 3. Erase Consent Cookie Function
// Location: /src/features/consent/cookies.ts
// Purpose: Remove consent cookie by setting Max-Age to 0
// ----------------------
export function eraseConsentCookie() {
  document.cookie = `${CONSENT_COOKIE}=; Path=/; Max-Age=0; SameSite=Lax`;
}

/* End of cookies */