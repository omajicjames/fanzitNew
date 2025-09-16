# Card Implementation Analysis

## Overview
This document analyzes how different card types in the Fanzit application handle props, time displays, premium access, and user interactions. Each card type has distinct implementations and prop handling patterns.

## Card Types and Their Implementations

### 1. Regular Post Cards
**Location:** `/src/features/feed/components/main-feed.tsx` (lines 290-430)
**Component Type:** Standard Card with CardHeader and CardContent

#### Time Handle Implementation
- **Display Location:** CardHeader section
- **Format:** `{post.creator.handle} • {post.timestamp}`
- **Props Used:**
  - `post.creator.handle` (string) - Creator's @username
  - `post.timestamp` (string) - Relative time (e.g., "2 hours ago")
- **Styling:** `text-sm text-muted-foreground`

#### Author Information
- **Avatar:** 12x12 size with fallback initials
- **Name:** `post.creator.name` with semibold font
- **Verification:** Conditional Crown badge if `post.creator.verified`
- **Tier Display:** Badge showing creator tier (premium/pro)

#### Premium Access Handling
- **Detection Logic:** `(!!post.has_premium || Number(post.content?.price ?? 0) > 0) && !post.unlocked`
- **Fallback:** Renders as regular card if not locked
- **Props:**
  - `has_premium` (boolean)
  - `content.price` (string | number)
  - `unlocked` (boolean)
  - `price_cents` (number)

#### Engagement Actions
- **Like Button:** Heart icon + `post.engagement.likes` count
- **Comment Button:** MessageCircle icon + `post.engagement.comments` count
- **Share Button:** Share icon + `post.engagement.shares` count
- **Subscribe Button:** Outline variant, static text

#### Additional Actions
- **More Actions:** MoreHorizontal icon triggering InlineActions
- **Inline Actions:** Expandable menu with pin, save, share, report options
- **Modal Actions:** PostActionsModal for detailed actions

---

### 2. Locked Post Cards (Premium Content)
**Location:** `/src/features/paywall/LockedBranch.tsx` → `/src/features/paywall/components/LockedPostShell.tsx`
**Component Type:** Specialized locked content wrapper

#### Time Handle Implementation
- **Display Location:** Custom `renderAuthorHeader()` function (lines 210-250)
- **Format:** Uses `formatRelativeTime()` utility from `/src/lib/format.ts`
- **Props Used:**
  - `author.name` (string) - Required prop
  - `author.username` (string, optional) - Formatted with `formatHandle()`
  - `createdAt` (string) - Required prop, processed by `formatRelativeTime()`
- **Styling:** `text-base` (regular size), `gap-3` spacing

#### Author Information
- **Avatar:** 10x10 size (larger than regular cards)
- **Name:** `font-medium` weight
- **Handle:** Processed through `formatHandle()` utility
- **Verification:** Not displayed in locked cards

#### Premium Access Handling
- **Unique Props:**
  - `requiredTier` (SubscriptionTier) - "premium" | "pro"
  - `priceCents` (number) - Price in cents
  - `previewUrl` (string) - Preview image URL
  - `onUpgrade` (function) - Upgrade callback
- **PaywallPill:** Right-aligned premium indicator
- **Blur Effects:** Configurable blur intensity
- **Preview Settings:** Configurable preview lines and visibility

#### Engagement Actions
- **No Direct Engagement:** Locked cards don't show like/comment/share buttons
- **Upgrade Focus:** Primary action is subscription/upgrade
- **PaywallDialog:** Modal for subscription management

#### Unique Features
- **Media Type Support:** Icons for image/video/text/mixed content
- **Blur Overlay:** Visual indication of locked content
- **Subscription Tiers:** Different access levels (premium/pro)
- **Preview Control:** Configurable content preview

---

### 3. Creator Profile Cards
**Location:** `/src/features/creator/components/creator-profile.tsx`
**Component Type:** Grid-based post display

#### Time Handle Implementation
- **Display:** Not explicitly shown in profile grid view
- **Focus:** Content thumbnails and titles prioritized
- **Hover Effects:** Shadow transitions on card hover

#### Author Information
- **Context:** Creator is the profile owner, so author info is implicit
- **Display:** Creator details shown in profile header, not individual cards

#### Premium Access Handling
- **Subscription Tiers:** Dedicated tabs for tier management
- **Pricing Display:** `${tier.price}/month` format
- **Features List:** Bullet points with Star icons
- **Subscribe Buttons:** Tier-specific subscription actions

---

## Prop Sharing and Code Reuse Analysis

### Shared Components
1. **Card, CardContent, CardHeader** - UI components used across all card types
2. **Avatar, AvatarFallback, AvatarImage** - Consistent avatar display
3. **Button** - Standardized button component
4. **Badge** - Verification and tier indicators

### Unique Implementations

#### Regular Cards
- **Direct prop mapping** from post object
- **Inline engagement actions** embedded in card
- **Standard time display** in header

#### Locked Cards
- **Wrapper pattern** (LockedBranch → LockedPostShell)
- **Specialized prop interface** (LockedPostShellProps)
- **Custom time formatting** with utility functions
- **Premium-specific UI elements** (PaywallPill, blur effects)

#### Profile Cards
- **Grid layout** instead of feed layout
- **Minimal metadata** display
- **Hover interactions** for content preview

### Code Duplication Issues

1. **Time Display Logic:**
   - Regular cards: Direct string display
   - Locked cards: `formatRelativeTime()` utility
   - **Recommendation:** Standardize on utility function

2. **Author Header Rendering:**
   - Regular cards: Inline JSX in CardHeader
   - Locked cards: Dedicated `renderAuthorHeader()` function
   - **Recommendation:** Extract reusable AuthorHeader component

3. **Engagement Actions:**
   - Regular cards: Inline button definitions
   - Locked cards: No engagement actions
   - **Recommendation:** Create EngagementActions component

## Technical Recommendations

### 1. Create Shared Components
```typescript
// AuthorHeader component for consistent author display
// EngagementActions component for like/comment/share
// TimeDisplay component with standardized formatting
```

### 2. Standardize Prop Interfaces
```typescript
// Common author interface across all card types
// Consistent time prop handling
// Unified engagement data structure
```

### 3. Implement Composition Pattern
```typescript
// Base Card component with slots for header, content, actions
// Specialized variants for regular, locked, profile cards
// Shared logic in custom hooks
```

### 4. Consolidate Utility Functions
```typescript
// Single source of truth for time formatting
// Consistent handle formatting across components
// Shared premium access detection logic
```

## Current State Summary

- **3 distinct card implementations** with minimal code sharing
- **Different prop structures** for similar data
- **Inconsistent time handling** across card types
- **Duplicated author display logic** in multiple components
- **Specialized premium handling** only in locked cards
- **Engagement actions** only in regular cards

This analysis reveals opportunities for code consolidation while maintaining the unique functionality required by each card type.