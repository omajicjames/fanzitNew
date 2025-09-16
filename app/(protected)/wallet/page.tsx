import { WalletDashboard } from "@src/features/payments/components/wallet-dashboard"
import { ProtectedRoute } from "@src/features/auth/components/protected-route"

export default function WalletPage() {
  return (
    <ProtectedRoute requireCreator={true}>
      <WalletDashboard />
    </ProtectedRoute>
  )
}