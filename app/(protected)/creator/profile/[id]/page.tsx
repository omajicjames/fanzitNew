import { CreatorProfile } from "@src/features/creator/components/creator-profile"

interface CreatorProfilePageProps {
  params: Promise<{
    id: string
  }>
}

export default async function CreatorProfilePage(props: CreatorProfilePageProps) {
  const params = await props.params;
  return <CreatorProfile creatorId={params.id} />
}