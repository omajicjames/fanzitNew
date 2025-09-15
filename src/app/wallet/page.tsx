import { WalletDashboard } from "@/components/payments/wallet-dashboard"
import { ProtectedRoute } from "@/components/auth/protected-route"

export default function WalletPage() {
  return (
    <ProtectedRoute requireCreator={true}>
      <WalletDashboard />
    </ProtectedRoute>
  )
}
