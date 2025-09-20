"use client";

import { AnalyticsDashboard } from "@src/features/admin/components/analytics-dashboard";

// ----------------------
// Analytics Cohorts Page
// Location: /app/(protected)/admin/analytics/cohorts/page.tsx
// Purpose: Analytics dashboard focused on cohorts tab
// Features: Creator and fan cohort analysis
// Note: Uses AnalyticsDashboard component with cohorts tab active
// ----------------------

export default function AnalyticsCohortsPage() {
  return <AnalyticsDashboard defaultTab="cohorts" />;
}
