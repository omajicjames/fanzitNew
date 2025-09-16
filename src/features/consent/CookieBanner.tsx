"use client";

import { useConsent } from "./ConsentContext";
import { Button } from "@src/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@src/components/ui/card";
import { Switch } from "@src/components/ui/switch";
import { Label } from "@src/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@src/components/ui/dialog";
import { useState } from "react";
import Link from "next/link";
import { Settings } from "lucide-react";
import type { ConsentState } from "./types";

// ----------------------
// Cookie Banner Component
// Location: /src/features/consent/CookieBanner.tsx
// Parent: AppConsentProvider (/app/providers/consent-provider.tsx)
// Purpose: Display GDPR-compliant cookie consent banner with customization options
// ----------------------
export function CookieBanner() {
  const { consent, setConsent, acceptAll, acceptNecessaryOnly } = useConsent();
  const [showPreferences, setShowPreferences] = useState(false);

  // ----------------------
  // Don't render if consent already acknowledged
  // ----------------------
  if (consent.acknowledged) {
    return null;
  }

  // ----------------------
  // Handle individual consent category changes
  // Parameters: category - consent category to update
  // ----------------------
  // Handle individual consent category changes
  // ----------------------
  const handleConsentChange = (category: keyof ConsentState, value: boolean) => {
    if (category === 'acknowledged' || category === 'updatedAt') return; // Prevent direct modification
    const updatedConsent = {
      necessary: consent.necessary,
      analytics: consent.analytics,
      personalization: consent.personalization,
      ads: consent.ads,
      [category]: value,
    };
    setConsent(updatedConsent);
  };

  // ----------------------
  // Save current preferences and acknowledge
  // ----------------------
  const savePreferences = () => {
    acceptAll(); // This will handle acknowledgment and timestamp
    setShowPreferences(false);
  };

  return (
    <>
      {/* ---------------------- */}
      {/* Main Banner Card */}
      {/* Location: Fixed bottom of viewport */}
      {/* ---------------------- */}
      <div className="fixed bottom-4 left-4 right-4 z-70 md:left-auto md:right-4 md:max-w-md">
        <Card className="border-zinc-700 bg-zinc-900/95 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-zinc-100">Cookie Preferences</CardTitle>
            <CardDescription className="text-zinc-400">
              We use cookies to enhance your experience. You can customize your preferences or accept all.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* ---------------------- */}
            {/* Quick Action Buttons */}
            {/* ---------------------- */}
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button 
                variant="outline" 
                className="border-zinc-700 text-zinc-100 hover:bg-zinc-800 flex-1" 
                onClick={acceptNecessaryOnly}
              >
                Necessary Only
              </Button>
              <Button 
                className="bg-amber-500 text-zinc-950 hover:bg-amber-600 flex-1" 
                onClick={acceptAll}
              >
                Accept All
              </Button>
            </div>

            {/* ---------------------- */}
            {/* Preferences Dialog Trigger */}
            {/* ---------------------- */}
            <div className="flex items-center justify-between">
              <Dialog open={showPreferences} onOpenChange={setShowPreferences}>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-zinc-100">
                    <Settings className="mr-2 h-4 w-4" />
                    Customize
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-lg">
                   <DialogHeader>
                     <DialogTitle>Cookie Preferences</DialogTitle>
                     <DialogDescription>
                       Manage your cookie preferences. You can enable or disable different types of cookies below.
                     </DialogDescription>
                   </DialogHeader>
                   <div className="space-y-4">
                     <ConsentRow 
                       title="Strictly Necessary" 
                       description="Required for security and basic site functionality." 
                       checked={true} 
                       disabled={true}
                     />
                     <ConsentRow 
                       title="Analytics" 
                       description="Helps us understand usage to improve the product." 
                       checked={consent.analytics} 
                       onCheckedChange={(v) => handleConsentChange('analytics', v)}
                     />
                     <ConsentRow 
                       title="Personalization" 
                       description="Saves your viewing preferences to tailor content." 
                       checked={consent.personalization} 
                       onCheckedChange={(v) => handleConsentChange('personalization', v)}
                     />
                     <ConsentRow 
                       title="Advertising" 
                       description="Used to show you relevant ads based on your interests." 
                       checked={consent.ads} 
                       onCheckedChange={(v) => handleConsentChange('ads', v)}
                     />
                   </div>
                   <div className="flex flex-col gap-2 sm:flex-row">
                     <Button variant="outline" className="border-zinc-700" onClick={acceptNecessaryOnly}>Save minimal</Button>
                     <Button className="bg-amber-500 text-zinc-950" onClick={acceptAll}>Accept all</Button>
                   </div>
                 </DialogContent>
              </Dialog>
              
              <Link 
                href="/legal/cookies" 
                className="text-xs text-zinc-500 hover:text-zinc-400 underline"
              >
                Learn more
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

// ----------------------
// ConsentRow Component
// Location: /src/features/consent/CookieBanner.tsx
// Purpose: Individual consent category row with switch control
// ----------------------
function ConsentRow({ 
  title, 
  description, 
  checked, 
  onCheckedChange, 
  disabled 
}: { 
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
      <Switch 
        checked={checked} 
        onCheckedChange={onCheckedChange} 
        disabled={disabled}
      />
    </div>
  );
}

/* End of CookieBanner */