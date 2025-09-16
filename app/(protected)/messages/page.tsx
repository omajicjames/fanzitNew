import { FullMessagingInterface } from "@src/features/messaging/components/full-messaging-interface"
import { ProtectedRoute } from "@src/features/auth/components/protected-route"

export default function MessagesPage() {
  return (
    <ProtectedRoute>
      <FullMessagingInterface />
    </ProtectedRoute>
  )
}