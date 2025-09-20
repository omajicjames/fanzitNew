"use client";

import { AnalyticsDashboard } from "@src/features/admin/components/analytics-dashboard";

// ----------------------
// Analytics Retention Page
// Location: /app/(protected)/admin/analytics/retention/page.tsx
// Purpose: Analytics dashboard focused on retention tab
// Features: Platform-wide fan and creator retention metrics
// Note: Uses AnalyticsDashboard component with retention tab active
// ----------------------

export default function AnalyticsRetentionPage() {
  return <AnalyticsDashboard defaultTab="retention" />;
}
