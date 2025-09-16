import { AnalyticsDashboard } from "@src/features/admin/components/analytics-dashboard"
import { ProtectedRoute } from "@src/features/auth/components/protected-route"

export default function AnalyticsPage() {
  return (
    <ProtectedRoute requireCreator={true}>
      <AnalyticsDashboard />
    </ProtectedRoute>
  )
}
