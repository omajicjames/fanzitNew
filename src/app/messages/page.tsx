import { FullMessagingInterface } from "@/components/messaging/full-messaging-interface"
import { ProtectedRoute } from "@/components/auth/protected-route"

export default function MessagesPage() {
  return (
    <ProtectedRoute>
      <FullMessagingInterface />
    </ProtectedRoute>
  )
}
