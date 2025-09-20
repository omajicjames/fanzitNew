"use client";

import { AnalyticsDashboard } from "@src/features/admin/components/analytics-dashboard";

// ----------------------
// Analytics Page
// Location: /app/(protected)/admin/analytics/page.tsx
// Purpose: Admin analytics dashboard with comprehensive platform metrics
// Features: Overview, Cohorts, Funnels, and Retention tabs
// Note: Uses the comprehensive AnalyticsDashboard component
// ----------------------

export default function AnalyticsPage() {
  return <AnalyticsDashboard />;
}