"use client";

import { AnalyticsDashboard } from "@src/features/admin/components/analytics-dashboard";

// ----------------------
// Analytics Funnels Page
// Location: /app/(protected)/admin/analytics/funnels/page.tsx
// Purpose: Analytics dashboard focused on funnels tab
// Features: User journey optimization and conversion funnels
// Note: Uses AnalyticsDashboard component with funnels tab active
// ----------------------

export default function AnalyticsFunnelsPage() {
  return <AnalyticsDashboard defaultTab="funnels" />;
}
