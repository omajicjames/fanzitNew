import { AnalyticsDashboard } from "@src/features/admin/components/analytics-dashboard"
import { ProtectedRoute } from "@src/features/auth/components/protected-route"

// ----------------------
// Analytics Page
// Location: /app/(protected)/analytics/page.tsx
// Purpose: Performance metrics dashboard for creators
// Protection: Requires authentication (not admin-specific)
// ----------------------

export default function AnalyticsPage() {
  return (
    <ProtectedRoute>
      <AnalyticsDashboard />
    </ProtectedRoute>
  )
}
