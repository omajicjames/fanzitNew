import { CreatorProfile } from "@/components/creator/creator-profile"

interface CreatorProfilePageProps {
  params: {
    id: string
  }
}

export default function CreatorProfilePage({ params }: CreatorProfilePageProps) {
  return <CreatorProfile creatorId={params.id} />
}
