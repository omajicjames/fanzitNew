# LockedPostShell Surgical Patch Implementation

## Issue
**Problem:** Feed was not routing into the new LockedPostShell, showing old purple "upgrade" card instead of the frosted look for locked posts.

**Root Cause:** Direct conditional rendering logic was bypassing the LockedPostShell component for certain locked post scenarios.

## Solution
**Approach:** Surgical patch that always renders LockedPostShell for locked posts through a client wrapper component.

**Key Benefits:**
- Guarantees frosted look shows up for all locked content
- Maintains existing modal routing logic
- Minimal code changes required
- Preserves server component architecture

## Implementation Details

### Files Created

#### 1. LockedBranch Client Wrapper
**Location:** `/src/features/paywall/LockedBranch.tsx`
**Purpose:** Client-side wrapper to avoid converting entire PostCard to "use client"

```typescript
"use client"

import { LockedPostShell } from "./components/LockedPostShell"
import type { SubscriptionTier } from "./mock/paywallClient"

type Props = {
  postId: string
  title: string
  priceCents: number
  previewUrl: string
  openPricingPlansModal: () => void
  author?: {
    name: string
    avatar?: string
    username?: string
  }
  createdAt?: string
  requiredTier?: SubscriptionTier
}

export default function LockedBranch({
  postId,
  title,
  priceCents,
  previewUrl,
  openPricingPlansModal,
  author = { name: 'Anonymous' },
  createdAt = new Date().toISOString(),
  requiredTier = 'premium'
}: Props) {
  return (
    <LockedPostShell
      title={title}
      author={author}
      createdAt={createdAt}
      requiredTier={requiredTier}
      previewImage={previewUrl}
      onUpgrade={openPricingPlansModal}
    />
  )
}
```

### Files Modified

#### 1. Main Feed Component
**Location:** `/src/features/feed/components/main-feed.tsx`
**Changes Made:**
- Replaced direct LockedPostShell import with LockedBranch wrapper
- Updated locked post detection logic for better coverage
- Simplified prop mapping through wrapper component

**Key Changes:**
```typescript
// OLD: Direct LockedPostShell usage
if (post.has_premium && !post.unlocked) {
  return <LockedPostShell ... />
}

// NEW: Always render through LockedBranch wrapper
const isLocked = 
  (!!post.has_premium || (post.content?.price_cents ?? 0) > 0) && !post.unlocked

if (isLocked) {
  return (
    <LockedBranch
      key={post.id}
      postId={String(post.id)}
      title={post.content.title ?? "Premium Post"}
      priceCents={post.content?.price_cents ?? 499}
      previewUrl={post.content.thumbnail ?? "/images/demos/pasta-preview.jpg"}
      openPricingPlansModal={() => (window as any).__openPlans?.()}
      author={{
        name: post.creator.name,
        avatar: post.creator.avatar,
        username: post.creator.handle
      }}
      createdAt={post.timestamp}
      requiredTier={post.content.requiredTier ?? "premium"}
    />
  )
}
```

## Technical Benefits

### 1. Object-Oriented Programming
- Clean component encapsulation
- Clear separation of concerns
- Reusable wrapper pattern
- Type-safe prop interfaces

### 2. Mobile-First Design
- Maintains responsive behavior
- Preserves touch interactions
- Optimized for mobile viewports
- Consistent UI patterns

### 3. Architecture Improvements
- Server component compatibility
- Client-side rendering only where needed
- Minimal bundle impact
- Backward compatibility maintained

## Behavior Changes

### Before Patch
- Some locked posts showed old purple upgrade card
- Inconsistent frosted look application
- Feature flag dependency for UI consistency

### After Patch
- **All locked posts always render LockedPostShell**
- Guaranteed frosted look for premium content
- Consistent user experience across all scenarios
- Feature flags control dialog behavior, not shell rendering

## User Experience Flow

1. **Locked Post Detection:** Enhanced logic catches all premium content scenarios
2. **Shell Rendering:** LockedBranch wrapper ensures LockedPostShell always renders
3. **User Interaction:** Clicking locked content opens appropriate modal based on feature flags
4. **Fallback Behavior:** Existing pricing modal integration preserved

## Testing Verification

### Quick Checks
1. **Frosted Look:** Verify all locked posts show blur overlay
2. **Fallback Image:** Confirm `/images/demos/pasta-preview.jpg` exists
3. **Client Wrapper:** Ensure LockedBranch has "use client" directive
4. **Cache Refresh:** Hard refresh (Cmd-Shift-R) to bust cached CSS
5. **Z-Index:** Verify floating pill shows above sticky headers (z-[70])

### Test Scenarios
- Posts with `has_premium: true`
- Posts with `price_cents > 0`
- Posts with both premium flags
- Posts with missing thumbnail images
- Mobile viewport interactions

## Status
✅ **Implemented** - Surgical patch successfully applied

**Date:** December 2024
**Impact:** High - Resolves core UX issue with locked post rendering
**Risk:** Low - Minimal changes, backward compatible