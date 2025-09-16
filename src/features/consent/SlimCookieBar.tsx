"use client";

import { useConsent } from "./ConsentContext";
import Link from "next/link";
import { Button } from "@src/components/ui/button";
import { useEffect, useState } from "react";

// ----------------------
// SlimCookieBar Component
// Location: /src/features/consent/SlimCookieBar.tsx
// Parent: AppConsentProvider (/app/providers/consent-provider.tsx)
// Purpose: Ultra-compact snackbar-style cookie consent bar (48–56px tall), bottom-left; minimal visual weight
// ----------------------
export function SlimCookieBar() {
  const { consent, acceptAll, acceptNecessaryOnly } = useConsent();
  const [visible, setVisible] = useState(false);

  // ----------------------
  // Show bar with delay if consent not acknowledged
  // ----------------------
  useEffect(() => {
    const id = setTimeout(() => setVisible(!consent.acknowledged), 150);
    return () => clearTimeout(id);
  }, [consent.acknowledged]);

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 z-70 max-w-sm">
      <div className="bg-zinc-900/95 backdrop-blur-sm border border-zinc-700 rounded-lg p-3 shadow-lg">
        <div className="flex items-center justify-between gap-3">
          <div className="flex-1">
            <p className="text-xs text-zinc-300 leading-tight">
              We use cookies to enhance your experience.
            </p>
            <Link 
              href="/legal/cookies" 
              className="text-xs text-zinc-500 hover:text-zinc-400 underline underline-offset-2"
            >
              Learn more
            </Link>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 text-xs px-2 py-1 h-auto"
              onClick={acceptNecessaryOnly}
            >
              Decline
            </Button>
            <Button 
              size="sm" 
              className="bg-amber-500 hover:bg-amber-600 text-zinc-950 text-xs px-2 py-1 h-auto font-medium"
              onClick={acceptAll}
            >
              Accept
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* End of SlimCookieBar */