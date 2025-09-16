import { ContentUpload } from "@src/features/creator/components/content-upload"
import { ProtectedRoute } from "@src/features/auth/components/protected-route"

export default function UploadPage() {
  return (
    <ProtectedRoute requireCreator={true}>
      <ContentUpload />
    </ProtectedRoute>
  )
}