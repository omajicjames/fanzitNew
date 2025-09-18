"use client"

import { LockedPostShell } from "./components/LockedPostShell"
import type { SubscriptionTier } from "./mock/paywallClient"

// ----------------------
// LockedBranch Client Wrapper Component
// ----------------------
// Location: /src/features/paywall/LockedBranch.tsx
// Parent: PostCard components in main-feed.tsx
// Child: LockedPostShell from /src/features/paywall/components/LockedPostShell.tsx
// Purpose: Client-side wrapper to avoid converting entire PostCard to "use client"
// ----------------------

type Props = {
  postId: string
  title: string
  priceCents: number
  previewUrl: string
  openPricingPlansModal: () => void
  author: {
    name: string
    avatar?: string
    username?: string
  }
  createdAt: string
  requiredTier?: SubscriptionTier
  className?: string
}

/**
 * Client-side wrapper component for LockedPostShell
 * Allows server components to render locked posts without client conversion
 * @param props - Props to pass through to LockedPostShell
 * @returns LockedPostShell component with passed props
 */
export default function LockedBranch({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  postId: _postId,
  title,
  requiredTier = 'premium',
  previewUrl,
  priceCents,
  openPricingPlansModal,
  className
}: Props) {
  return (
    <LockedPostShell
      title={title}
      requiredTier={requiredTier}
      previewImage={previewUrl}
      priceCents={priceCents}
      openPricingPlansModal={openPricingPlansModal}
      className={className}
    />
  )
}