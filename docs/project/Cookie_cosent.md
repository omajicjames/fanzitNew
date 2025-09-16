// ──────────────────────────────────────────────────────────────────────────────
// File: src/features/consent/types.ts
// Purpose: Core types and constants for cookie consent
// ──────────────────────────────────────────────────────────────────────────────

export type ConsentCategory = "necessary" | "analytics" | "ads" | "personalization";

export type ConsentState = Record<ConsentCategory, boolean> & {
  // when the user made their last choice (ISO string)
  updatedAt: string | null;
  // whether user has made an explicit choice at least once
  acknowledged: boolean;
};

export const CONSENT_COOKIE = "fz-consent"; // stable cookie key
export const CONSENT_MAX_AGE_DAYS = 365; // one year

export const defaultConsent: ConsentState = {
  necessary: true, // always true; we never allow toggling this off
  analytics: false,
  ads: false,
  personalization: false,
  updatedAt: null,
  acknowledged: false,
};

// ──────────────────────────────────────────────────────────────────────────────
// File: src/features/consent/cookies.ts
// Purpose: Small cookie helpers compatible with App Router RSC & Client
// ──────────────────────────────────────────────────────────────────────────────

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

export function writeConsentCookie(value: ConsentState) {
  const maxAge = CONSENT_MAX_AGE_DAYS * 24 * 60 * 60; // seconds
  const encoded = encodeURIComponent(JSON.stringify(value));
  document.cookie = `${CONSENT_COOKIE}=${encoded}; Path=/; Max-Age=${maxAge}; SameSite=Lax`;
}

export function eraseConsentCookie() {
  document.cookie = `${CONSENT_COOKIE}=; Path=/; Max-Age=0; SameSite=Lax`;
}

// ──────────────────────────────────────────────────────────────────────────────
// File: src/features/consent/ConsentContext.tsx
// Purpose: Global context + provider; single source of truth on the client
// ──────────────────────────────────────────────────────────────────────────────

"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { ConsentState, defaultConsent, readConsentCookie, writeConsentCookie } from "./cookies";

export type ConsentContextValue = {
  consent: ConsentState;
  setConsent: (next: Omit<ConsentState, "updatedAt" | "acknowledged">) => void;
  acceptAll: () => void;
  acceptNecessaryOnly: () => void;
  hasAcknowledged: boolean;
};

const ConsentContext = createContext<ConsentContextValue | null>(null);

export function useConsent() {
  const ctx = useContext(ConsentContext);
  if (!ctx) throw new Error("useConsent must be used within <ConsentProvider>");
  return ctx;
}

export function ConsentProvider({ children }: { children: React.ReactNode }) {
  const [consent, setConsentState] = useState<ConsentState>(() => {
    return readConsentCookie() ?? defaultConsent;
  });

  // persist to cookie whenever consent changes
  useEffect(() => {
    writeConsentCookie(consent);
  }, [consent]);

  const setConsent = useCallback((next: Omit<ConsentState, "updatedAt" | "acknowledged">) => {
    setConsentState((prev) => ({
      ...prev,
      ...next,
      updatedAt: new Date().toISOString(),
      acknowledged: true,
      necessary: true,
    }));
  }, []);

  const acceptAll = useCallback(() => {
    setConsent({ necessary: true, analytics: true, ads: true, personalization: true });
  }, [setConsent]);

  const acceptNecessaryOnly = useCallback(() => {
    setConsent({ necessary: true, analytics: false, ads: false, personalization: false });
  }, [setConsent]);

  const value = useMemo<ConsentContextValue>(() => ({
    consent,
    setConsent,
    acceptAll,
    acceptNecessaryOnly,
    hasAcknowledged: !!consent.acknowledged,
  }), [consent, setConsent, acceptAll, acceptNecessaryOnly]);

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>;
}

// ──────────────────────────────────────────────────────────────────────────────
// File: src/features/consent/CookieBanner.tsx
// Purpose: Bottom sticky "Accept all" / "Only necessary" banner
// Notes: Uses your Zinc/Gold theme, compact mobile-first; accessible
// ──────────────────────────────────────────────────────────────────────────────

"use client";

import { useConsent } from "./ConsentContext";
import Link from "next/link";
import { Button } from "@/components/ui/button"; // shadcn/ui button
import { useEffect, useState } from "react";

export function CookieBanner() {
  const { acceptAll, acceptNecessaryOnly, hasAcknowledged } = useConsent();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // delay to avoid CLS and feel intentional
    const id = setTimeout(() => setVisible(!hasAcknowledged), 400);
    return () => clearTimeout(id);
  }, [hasAcknowledged]);

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Cookie notice"
      className="fixed inset-x-0 bottom-0 z-[60] mx-auto w-full sm:max-w-screen-md sm:rounded-t-2xl border-t sm:border sm:border-zinc-800/60 bg-zinc-950/95 backdrop-blur supports-[backdrop-filter]:bg-zinc-950/80 shadow-2xl"
    >
      <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-3">
        <p className="text-sm text-zinc-300 leading-5">
          We use cookies to power core features and improve the experience. See our {" "}
          <Link href="/legal/cookies" className="underline underline-offset-2 text-zinc-100 hover:text-white">Cookie Notice</Link>.
        </p>
        <div className="flex gap-2 sm:ml-auto">
          <Button variant="outline" className="border-zinc-700 hover:bg-zinc-800" onClick={acceptNecessaryOnly}>
            Only necessary
          </Button>
          <Button className="bg-amber-500 text-zinc-950 hover:bg-amber-400" onClick={acceptAll}>
            Accept all
          </Button>
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// File: src/features/consent/PreferencesDialog.tsx
// Purpose: Full preferences panel accessible from footer/link
// ──────────────────────────────────────────────────────────────────────────────

"use client";

import { useConsent } from "./ConsentContext";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export function ConsentPreferences({ triggerClassName }: { triggerClassName?: string }) {
  const { consent, setConsent, acceptAll, acceptNecessaryOnly } = useConsent();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className={triggerClassName ?? "text-xs text-zinc-400 underline underline-offset-2 hover:text-zinc-200"}>
          Cookie preferences
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Cookie preferences</DialogTitle>
        </DialogHeader>
        <div className="space-y-5">
          <Row title="Strictly necessary" description="Required for security and basic site functionality." disabled checked />
          <Row
            title="Analytics"
            description="Helps us understand usage to improve the product."
            checked={consent.analytics}
            onCheckedChange={(v) => setConsent({ ...consent, analytics: Boolean(v) })}
          />
          <Row
            title="Personalization"
            description="Saves your viewing preferences to tailor content."
            checked={consent.personalization}
            onCheckedChange={(v) => setConsent({ ...consent, personalization: Boolean(v) })}
          />
          <Row
            title="Advertising"
            description="Used for measuring ad performance and limiting frequency."
            checked={consent.ads}
            onCheckedChange={(v) => setConsent({ ...consent, ads: Boolean(v) })}
          />
          <div className="flex gap-2 justify-end pt-2">
            <Button variant="outline" className="border-zinc-700" onClick={acceptNecessaryOnly}>Save minimal</Button>
            <Button className="bg-amber-500 text-zinc-950" onClick={acceptAll}>Accept all</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Row({ title, description, checked, onCheckedChange, disabled }: {
  title: string;
  description: string;
  checked?: boolean;
  onCheckedChange?: (v: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <Label className="text-zinc-100">{title}</Label>
        <p className="text-xs text-zinc-400 mt-1 max-w-prose">{description}</p>
      </div>
      <Switch checked={checked} onCheckedChange={onCheckedChange} disabled={disabled} />
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// File: src/features/consent/GatedScripts.tsx
// Purpose: Example of gating scripts/SDKs by consent categories
// ──────────────────────────────────────────────────────────────────────────────

"use client";

import Script from "next/script";
import { useConsent } from "./ConsentContext";

export function GatedScripts() {
  const { consent } = useConsent();

  return (
    <>
      {/* Analytics example (only loads if Analytics consent granted) */}
      {consent.analytics && (
        <Script id="fz-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({ event: 'consent_ok' });
            // Your analytics bootstrap here
          `}
        </Script>
      )}
      {/* Ads / personalization would be similar, gated by consent.ads / consent.personalization */}
    </>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// File: app/providers/consent-provider.tsx
// Purpose: App-level provider composition for easy import in layout
// ──────────────────────────────────────────────────────────────────────────────

"use client";

import { ConsentProvider } from "@/src/features/consent/ConsentContext";
import { CookieBanner } from "@/src/features/consent/CookieBanner";
import { GatedScripts } from "@/src/features/consent/GatedScripts";

export default function AppConsentProvider({ children }: { children: React.ReactNode }) {
  return (
    <ConsentProvider>
      {children}
      {/* Ensure banner renders above your right rail; sits at bottom */}
      <CookieBanner />
      <GatedScripts />
    </ConsentProvider>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// File: app/layout.tsx (PATCH SNIPPET)
// Purpose: Show how to wrap the entire app with the consent provider
// NOTE: Integrate with your existing layout—this snippet shows only the relevant lines.
// ──────────────────────────────────────────────────────────────────────────────

// import AppConsentProvider from "./providers/consent-provider"; // ← add this import
//
// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <body>
//         <AppConsentProvider>
//           {children}
//         </AppConsentProvider>
//       </body>
//     </html>
//   );
// }

// ──────────────────────────────────────────────────────────────────────────────
// File: app/(public)/legal/cookies/page.tsx (Optional)
// Purpose: Minimal cookie notice page your banner links to
// ──────────────────────────────────────────────────────────────────────────────

export default function CookieNoticePage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10 prose prose-invert">
      <h1>Cookie Notice</h1>
      <p>
        We use strictly necessary cookies for security and core functionality. With your
        consent we also use analytics, personalization, and advertising cookies. You can
        change your preference at any time via the footer link “Cookie preferences”.
      </p>
    </main>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// Usage note:
// - Place <ConsentPreferences /> in your footer or account settings page to let users revisit choices.
//   Example: <ConsentPreferences triggerClassName="text-xs text-zinc-400" />
// - The CookieBanner appears automatically until the user acknowledges a choice.
// - GatedScripts shows how to conditionally load SDKs based on consent state.
How to wire it in (2 quick steps)

Wrap the app
Open app/layout.tsx and wrap your body with the provider:

import AppConsentProvider from "./providers/consent-provider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AppConsentProvider>{children}</AppConsentProvider>
      </body>
    </html>
  );
}


Add a link to preferences
In your site footer or Settings page:

import { ConsentPreferences } from "@/src/features/consent/PreferencesDialog";

<ConsentPreferences triggerClassName="text-xs text-zinc-400 underline underline-offset-2 ho