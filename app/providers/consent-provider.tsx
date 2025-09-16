"use client";

import { ConsentProvider } from "@src/features/consent/ConsentContext";
import { CookieBanner } from "@src/features/consent/CookieBanner";
import { SlimCookieBar } from "@src/features/consent/SlimCookieBar";
import { GatedScripts } from "@src/features/consent/GatedScripts";

// ----------------------
// AppConsentProvider Component
// Location: /app/providers/consent-provider.tsx
// Parent: App layout (/app/layout.tsx)
// Children: All app components that need consent context
// Purpose: App-level provider composition for easy import in layout
// ----------------------
export default function AppConsentProvider({ children }: { children: React.ReactNode }) {
  const variant: "slim" | "standard" = "slim"; // set to "standard" for the bigger banner
  
  return (
    <ConsentProvider>
      {children}
      {/* Ensure banner renders above your right rail; sits at bottom */}
      {variant === "slim" ? <SlimCookieBar /> : <CookieBanner />}
      <GatedScripts />
    </ConsentProvider>
  );
}

/* End of AppConsentProvider */