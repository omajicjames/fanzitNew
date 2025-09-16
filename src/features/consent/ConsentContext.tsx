"use client"

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"
import { ConsentState, defaultConsent } from "./types"
import { readConsentCookie, writeConsentCookie } from "./cookies"

// Re-export ConsentState for other components
export type { ConsentState } from "./types"

// ----------------------
// 1. Global Type Declarations
// Location: /src/features/consent/ConsentContext.tsx
// Purpose: Extend Window interface for analytics scripts
// ----------------------
declare global {
  interface Window {
    dataLayer?: any[]
    gtag?: (...args: any[]) => void
    fbq?: (...args: any[]) => void
    hj?: (...args: any[]) => void
  }
}

// ----------------------
// 2. Context Value Type
// Location: /src/features/consent/ConsentContext.tsx
// Purpose: Define the shape of consent context value
// ----------------------
export type ConsentContextValue = {
  consent: ConsentState
  setConsent: (next: Omit<ConsentState, "updatedAt" | "acknowledged">) => void
  acceptAll: () => void
  acceptNecessaryOnly: () => void
}

// ----------------------
// 3. Context Creation
// Location: /src/features/consent/ConsentContext.tsx
// Purpose: Create React context for consent state
// ----------------------
const ConsentContext = createContext<ConsentContextValue | null>(null)

// ----------------------
// 4. ConsentProvider Component
// Location: /src/features/consent/ConsentContext.tsx
// Parent: App layout wrapper
// Children: All app components that need consent state
// Purpose: Provide consent state and management functions to the app
// ----------------------
export function ConsentProvider({ children }: { children: React.ReactNode }) {
  // ----------------------
  // Initialize consent state from cookie or defaults
  // ----------------------
  const [consent, setConsentState] = useState<ConsentState>(() => readConsentCookie() || defaultConsent)

  // ----------------------
  // Update consent state and persist to cookie
  // ----------------------
  useEffect(() => {
    if (consent.acknowledged) {
      writeConsentCookie(consent)
    }
  }, [consent])

  // ----------------------
  // Set consent function (for partial updates)
  // ----------------------
  const setConsent = useCallback(
    (next: Omit<ConsentState, "updatedAt" | "acknowledged">) => {
      setConsentState(prev => ({
        ...prev,
        ...next,
        updatedAt: new Date().toISOString(),
      }))
    },
    []
  )

  // ----------------------
  // Accept all cookies (analytics, personalization, ads)
  // ----------------------
  const acceptAll = useCallback(() => {
    setConsentState({
      necessary: true,
      analytics: true,
      personalization: true,
      ads: true,
      acknowledged: true,
      updatedAt: new Date().toISOString(),
    });
  }, []);

  // ----------------------
  // Accept only necessary cookies
  // ----------------------
  const acceptNecessaryOnly = useCallback(() => {
    setConsentState({
      necessary: true,
      analytics: false,
      personalization: false,
      ads: false,
      acknowledged: true,
      updatedAt: new Date().toISOString(),
    });
  }, []);

  // ----------------------
  // Memoized context value
  // ----------------------
  const value = useMemo<ConsentContextValue>(() => ({
    consent,
    setConsent,
    acceptAll,
    acceptNecessaryOnly,
  }), [consent, setConsent, acceptAll, acceptNecessaryOnly])

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>
}

// ----------------------
// 5. Custom Hook for Consent Context
// Location: /src/features/consent/ConsentContext.tsx
// Purpose: Provide type-safe access to consent context
// ----------------------
export function useConsent() {
  const ctx = useContext(ConsentContext)
  if (!ctx) throw new Error("useConsent must be used within <ConsentProvider>")
  return ctx
}

// ----------------------
// 7. Utility Hook for Consent Checks
// Location: /src/features/consent/ConsentContext.tsx
// Purpose: Provide convenient boolean checks for consent categories
// ----------------------
export function useConsentChecks() {
  const { consent } = useConsent()
  
  return {
    canUseAnalytics: consent.acknowledged && consent.analytics,
    canUsePersonalization: consent.acknowledged && consent.personalization,
    canUseAds: consent.acknowledged && consent.ads,
    hasGivenConsent: consent.acknowledged,
  }
}

/* End of ConsentContext */