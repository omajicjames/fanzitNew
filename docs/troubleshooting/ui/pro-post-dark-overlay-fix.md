# PRO Post Dark Overlay Fix

## Issue
PRO tier posts were appearing completely dark instead of showing the proper locked content overlay with preview image and pricing information.

## Root Cause Analysis

### 1. Missing Price Data
- **Problem**: `LockedBranch` component was not passing `priceCents` prop to `LockedPostShell`
- **Impact**: PRO posts couldn't display pricing information correctly
- **Location**: `/src/features/paywall/LockedBranch.tsx`

### 2. Missing Preview Images
- **Problem**: PRO post mock data referenced non-existent image files
- **Files Referenced**: `/market-analysis.png`, `/trader-analysis.png`
- **Impact**: No preview image to display, causing dark/empty appearance
- **Location**: `/src/features/feed/components/main-feed.tsx`

## Solution Implemented

### 1. Fixed LockedBranch Props
**File**: `/src/features/paywall/LockedBranch.tsx`
- **Added**: `priceCents={priceCents}` prop to LockedPostShell
- **Result**: PRO posts now receive proper pricing data for display

```typescript
// Before
<LockedPostShell
  title={title}
  author={author}
  createdAt={createdAt}
  requiredTier={requiredTier}
  previewImage={previewUrl}
  onUpgrade={openPricingPlansModal}
  className={className}
/>

// After
<LockedPostShell
  title={title}
  author={author}
  createdAt={createdAt}
  requiredTier={requiredTier}
  previewImage={previewUrl}
  priceCents={priceCents}
  onUpgrade={openPricingPlansModal}
  className={className}
/>
```

### 2. Fixed Preview Image References
**File**: `/src/features/feed/components/main-feed.tsx`
- **Changed**: Non-existent image paths to existing SVG files
- **Avatar**: `/trader-analysis.png` → `/fitness-woman-avatar.svg`
- **Thumbnail**: `/market-analysis.png` → `/fitness-workout-banner.svg`
- **Preview URL**: `/market-analysis.png` → `/fitness-workout-banner.svg`

## Technical Details

### PRO Post Data Structure
```typescript
{
  creator: {
    name: "Pro Trader Alex",
    handle: "@protraderalex",
    avatar: "/fitness-woman-avatar.svg", // Fixed
    verified: true,
    tier: "pro",
  },
  content: {
    type: "text",
    thumbnail: "/fitness-workout-banner.svg", // Fixed
    title: "Advanced Market Analysis Techniques",
    description: "Exclusive pro-level trading strategies...",
    isLocked: true,
    price: "$9.99",
    requiredTier: "pro" as const,
  },
  price_cents: 999,
  preview_url: "/fitness-workout-banner.svg", // Fixed
}
```

### Component Flow
1. **MainFeed** → Creates PRO post data with proper image paths
2. **PostCard** → Processes data through `derivePresentation()`
3. **LockedBranch** → Passes all props including `priceCents`
4. **LockedPostShell** → Renders modern glass overlay with pricing

## Verification
- ✅ PRO posts now display proper preview images
- ✅ Pricing information ($9.99) shows correctly
- ✅ Modern glass overlay renders with tier badge
- ✅ No more completely dark posts

## Benefits
- Consistent visual experience for all tier levels
- Proper pricing display for PRO content
- Reliable preview image rendering
- Enhanced user understanding of content value

## Future Prevention
- Always verify image file existence in public directory
- Ensure all props are passed through wrapper components
- Test all subscription tiers during development
- Use existing placeholder images for mock data