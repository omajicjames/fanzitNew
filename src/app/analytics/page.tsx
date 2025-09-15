import { AnalyticsDashboard } from "@/components/admin/analytics-dashboard"
import { ProtectedRoute } from "@/components/auth/protected-route"

export default function AnalyticsPage() {
  return (
    <ProtectedRoute requireCreator={true}>
      <AnalyticsDashboard />
    </ProtectedRoute>
  )
}
