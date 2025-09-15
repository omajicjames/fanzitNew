import { ContentUpload } from "@/components/creator/content-upload"
import { ProtectedRoute } from "@/components/auth/protected-route"

export default function UploadPage() {
  return (
    <ProtectedRoute requireCreator={true}>
      <ContentUpload />
    </ProtectedRoute>
  )
}
