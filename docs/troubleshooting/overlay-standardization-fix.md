# Overlay Standardization Fix

## Issue
Post components across the application were using inconsistent overlay opacity values, creating confusing visual experiences where some posts appeared darker than others despite having the same locked/unlocked status.

## Root Cause
- Multiple components were implementing their own overlay styling instead of using the centralized `LockedPostShell` component
- Inconsistent `bg-black` opacity values ranging from `/40` to `/70`
- Duration badges and other overlays using different opacity levels

## Solution Implemented

### 1. Centralized Overlay System
- All locked content now uses `LockedPostShell` component via `LockedBranch`
- Standardized overlay opacity to `bg-black/30` across all components
- Removed custom overlay implementations in favor of centralized approach

### 2. Files Modified

#### `/src/features/creator/components/creator-profile.tsx`
- **Added**: Import for `LockedBranch` component
- **Replaced**: Custom overlay div with conditional `LockedBranch` rendering
- **Fixed**: Duration badge opacity from `bg-black/60` to `bg-black/30`
- **Removed**: Inconsistent `bg-black/40` and `bg-black/70` classes

#### `/src/features/payments/components/pay-per-view-modal.tsx`
- **Fixed**: Preview thumbnail overlay from `bg-black/50` to `bg-black/30`

### 3. Standardized Approach
- **Locked Content**: Uses `LockedBranch` component which wraps `LockedPostShell`
- **Unlocked Content**: No overlay or minimal `bg-black/30` for UI elements
- **Duration Badges**: Consistent `bg-black/30` opacity
- **Preview Thumbnails**: Consistent `bg-black/30` opacity

## Verification
- Searched codebase for remaining inconsistent overlay patterns
- Confirmed all post components now delegate to centralized system
- All overlay opacities standardized to `/30` level

## Benefits
- Consistent visual experience across all post types
- Single source of truth for overlay styling
- Easier maintenance and future updates
- Reduced confusion for users regarding post accessibility

## Future Maintenance
- Always use `LockedBranch` for locked content overlays
- Use `bg-black/30` for any additional UI overlays
- Avoid custom overlay implementations
- Reference `LockedPostShell` component for overlay standards