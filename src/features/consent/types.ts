// ──────────────────────────────────────────────────────────────────────────────
// File: src/features/consent/types.ts
// Purpose: Core types and constants for cookie consent
// ──────────────────────────────────────────────────────────────────────────────

export type ConsentCategory = "necessary" | "analytics" | "ads" | "personalization";

export interface ConsentState {
  necessary: boolean;     // Always true, required for basic functionality
  analytics: boolean;     // Google Analytics, performance tracking
  personalization: boolean; // User preferences, customization
  ads: boolean;          // Advertising, marketing cookies
  acknowledged: boolean;  // Whether user has made a consent choice
  updatedAt: string | null; // when the user made their last choice (ISO string)
}

export const CONSENT_COOKIE = "fz-consent"; // stable cookie key
export const CONSENT_MAX_AGE_DAYS = 365; // one year

export const defaultConsent: ConsentState = {
  necessary: true,
  analytics: false,
  personalization: false,
  ads: false,
  acknowledged: false,
  updatedAt: null,
};

/* End of types */