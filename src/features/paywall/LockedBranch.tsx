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
  postId,
  title,
  priceCents,
  previewUrl,
  openPricingPlansModal,
  author,
  createdAt,
  requiredTier = 'premium',
  className
}: Props) {
  return (
    <LockedPostShell
      title={title}
      author={author}
      createdAt={createdAt}
      requiredTier={requiredTier}
      previewImage={previewUrl}
      onUpgrade={openPricingPlansModal}
      className={className}
    />
  )
}