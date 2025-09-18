// ----------------------
// Analytics Tracking System
// ----------------------
// Console-only analytics stub so you can see the funnel in dev.
// Location: /src/lib/analytics.ts
// Parent: Core library utilities
// Children: Used by paywall components for event tracking
// ----------------------

import { logger } from "@src/lib/logger";

// ----------------------
// Event Type Definitions
// ----------------------
// Defines all trackable paywall-related events
// for monitoring user interaction funnel
// ----------------------

type EventName =
  | "paywall_impression"     // When locked content is viewed
  | "paywall_cta_click"      // When unlock button is clicked
  | "paywall_dialog_open"    // When paywall dialog opens
  | "paywall_unlock_success" // When payment succeeds
  | "paywall_unlock_error"   // When payment fails
  | "paywall_quick_peek";    // When quick peek is used

// ----------------------
// Event Tracking Function
// ----------------------
// Logs events to console for development monitoring
// In production, this would integrate with analytics services
// like Google Analytics, Mixpanel, or custom tracking
// ----------------------

export function track(name: EventName, props: Record<string, unknown> = {}) {
  logger.info(`Analytics event: ${name}`, "analytics", props);
  
  // TODO: In production, replace with actual analytics service:
  // - Google Analytics 4
  // - Mixpanel
  // - PostHog
  // - Custom analytics endpoint
}

/* End of analytics.ts */