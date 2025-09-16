"use client"

import React, { useEffect } from "react"
import { useConsent } from "./ConsentContext"
import type { ConsentState } from "./types"
import Script from "next/script"

// ----------------------
// 1. Script Configuration Interface
// Location: /src/features/consent/GatedScripts.tsx
// Purpose: Define structure for conditional scripts
// ----------------------
interface ConditionalScript {
  id: string
  src?: string
  innerHTML?: string
  consentType: keyof ConsentState
  strategy?: "beforeInteractive" | "afterInteractive" | "lazyOnload"
  onLoad?: () => void
  onError?: () => void
}

// ----------------------
// 2. Analytics Configuration
// Location: /src/features/consent/GatedScripts.tsx
// Purpose: Define Google Analytics and other analytics scripts
// ----------------------
const ANALYTICS_SCRIPTS: ConditionalScript[] = [
  {
    id: "gtag-config",
    src: "https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID",
    consentType: "analytics",
    strategy: "afterInteractive",
    onLoad: () => {
      console.log("[GatedScripts] Google Analytics loaded")
    }
  },
  {
    id: "gtag-init",
    innerHTML: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'GA_MEASUREMENT_ID', {
        page_title: document.title,
        page_location: window.location.href
      });
    `,
    consentType: "analytics",
    strategy: "afterInteractive"
  }
]

// ----------------------
// 3. Marketing/Ads Scripts Configuration
// Location: /src/features/consent/GatedScripts.tsx
// Purpose: Define advertising and marketing tracking scripts
// ----------------------
const MARKETING_SCRIPTS: ConditionalScript[] = [
  {
    id: "facebook-pixel",
    innerHTML: `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', 'YOUR_PIXEL_ID');
      fbq('track', 'PageView');
    `,
    consentType: "ads",
    strategy: "afterInteractive",
    onLoad: () => {
      console.log("[GatedScripts] Facebook Pixel loaded")
    }
  },
  {
    id: "google-ads",
    src: "https://www.googletagmanager.com/gtag/js?id=AW-CONVERSION_ID",
    consentType: "ads",
    strategy: "lazyOnload"
  }
]

// ----------------------
// 4. Personalization Scripts Configuration
// Location: /src/features/consent/GatedScripts.tsx
// Purpose: Define personalization and user experience scripts
// ----------------------
const PERSONALIZATION_SCRIPTS: ConditionalScript[] = [
  {
    id: "hotjar",
    innerHTML: `
      (function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:YOUR_HOTJAR_ID,hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
      })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
    `,
    consentType: "personalization",
    strategy: "lazyOnload",
    onLoad: () => {
      console.log("[GatedScripts] Hotjar loaded")
    }
  }
]

// ----------------------
// 5. Script Manager Class
// Location: /src/features/consent/GatedScripts.tsx
// Purpose: Manage loading and unloading of conditional scripts
// ----------------------
class ScriptManager {
  private static loadedScripts = new Set<string>()
  
  /**
   * Load a script if consent is given and not already loaded
   * @param script - Script configuration
   * @param hasConsent - Whether user has given consent for this script type
   */
  static loadScript(script: ConditionalScript, hasConsent: boolean): void {
    if (!hasConsent || this.loadedScripts.has(script.id)) {
      return
    }

    try {
      if (script.src) {
        // External script
        const scriptElement = document.createElement("script")
        scriptElement.src = script.src
        scriptElement.async = true
        scriptElement.id = script.id
        
        if (script.onLoad) {
          scriptElement.onload = script.onLoad
        }
        
        if (script.onError) {
          scriptElement.onerror = script.onError
        }
        
        document.head.appendChild(scriptElement)
      } else if (script.innerHTML) {
        // Inline script
        const scriptElement = document.createElement("script")
        scriptElement.innerHTML = script.innerHTML
        scriptElement.id = script.id
        
        document.head.appendChild(scriptElement)
        
        if (script.onLoad) {
          script.onLoad()
        }
      }
      
      this.loadedScripts.add(script.id)
      console.log(`[ScriptManager] Loaded script: ${script.id}`)
    } catch (error) {
      console.error(`[ScriptManager] Failed to load script ${script.id}:`, error)
      if (script.onError) {
        script.onError()
      }
    }
  }
  
  /**
   * Remove a script from the DOM
   * @param scriptId - ID of the script to remove
   */
  static removeScript(scriptId: string): void {
    const scriptElement = document.getElementById(scriptId)
    if (scriptElement) {
      scriptElement.remove()
      this.loadedScripts.delete(scriptId)
      console.log(`[ScriptManager] Removed script: ${scriptId}`)
    }
  }
  
  /**
   * Check if a script is already loaded
   * @param scriptId - ID of the script to check
   */
  static isScriptLoaded(scriptId: string): boolean {
    return this.loadedScripts.has(scriptId)
  }
}

// ----------------------
// GatedScripts Component
// Location: /src/features/consent/GatedScripts.tsx
// Parent: AppConsentProvider (/app/providers/consent-provider.tsx)
// Purpose: Conditionally load third-party scripts based on user consent
// ----------------------
export function GatedScripts() {
  const { consent } = useConsent();

  return (
    <>
      {/* ---------------------- */}
      {/* Analytics Scripts - Only load if analytics consent given */}
      {/* ---------------------- */}
      {consent.analytics && (
        <Script
          id="analytics-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              // Your analytics bootstrap here
              console.log('Analytics enabled');
            `,
          }}
        />
      )}

      {/* ---------------------- */}
      {/* Personalization Scripts - Only load if personalization consent given */}
      {/* ---------------------- */}
      {consent.personalization && (
        <Script
          id="personalization-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              // Your personalization bootstrap here
              console.log('Personalization enabled');
            `,
          }}
        />
      )}

      {/* ---------------------- */}
      {/* Advertising Scripts - Only load if ads consent given */}
      {/* ---------------------- */}
      {consent.ads && (
        <Script
          id="advertising-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              // Your advertising bootstrap here
              console.log('Advertising enabled');
            `,
          }}
        />
      )}
    </>
  );
}

// ----------------------
// 7. Analytics Helper Functions
// Location: /src/features/consent/GatedScripts.tsx
// Purpose: Provide helper functions for analytics tracking
// ----------------------
export const AnalyticsHelpers = {
  /**
   * Track a custom event if analytics consent is given
   * @param eventName - Name of the event
   * @param parameters - Event parameters
   */
  trackEvent: (eventName: string, parameters?: Record<string, any>) => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", eventName, parameters)
    }
  },
  
  /**
   * Track a page view if analytics consent is given
   * @param pagePath - Path of the page
   * @param pageTitle - Title of the page
   */
  trackPageView: (pagePath: string, pageTitle?: string) => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("config", "GA_MEASUREMENT_ID", {
        page_path: pagePath,
        page_title: pageTitle || document.title
      })
    }
  },
  
  /**
   * Track a conversion if ads consent is given
   * @param conversionId - Conversion ID
   * @param conversionLabel - Conversion label
   * @param value - Conversion value
   */
  trackConversion: (conversionId: string, conversionLabel: string, value?: number) => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "conversion", {
        send_to: `${conversionId}/${conversionLabel}`,
        value: value,
        currency: "USD"
      })
    }
  }
}

/* End of GatedScripts */