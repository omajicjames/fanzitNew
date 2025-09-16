# Faint Double Border Card Fixes

## Issues Fixed

### 1. Faint Rounded Border Seam Above Media

**Problem**: LockedPostShell media wrapper had its own border and top rounding, creating a double border seam above the media content when combined with the outer card's border.

**Root Cause**: The media wrapper in `LockedPostShell.tsx` was using `rounded-t-xl` which created top rounding that conflicted with the outer card's border styling.

**Solution**: 
- Changed media wrapper from `rounded-t-xl` to `rounded-b-2xl border-0`
- Removed inner border to let the outer card own all borders/radius
- Media now only rounds on the bottom and is flush on top

**Files Modified**:
- `/src/features/paywall/components/LockedPostShell.tsx` (line 404)

**Code Change**:
```tsx
// BEFORE
<div className="group relative aspect-video w-full overflow-hidden rounded-t-xl">

// AFTER  
<div className="group relative aspect-video w-full overflow-hidden rounded-b-2xl border-0">
```

### 2. Stray "Trader" Text in Author Header

**Problem**: PostCard was manually rendering author information instead of using the standardized AuthorHeader component, potentially causing extra role/title text to appear.

**Root Cause**: PostCard component had custom author rendering logic that wasn't following the clean AuthorHeader API.

**Solution**:
- Replaced manual author rendering with AuthorHeader component
- Used `createAuthorCore()` to normalize author data
- Passed only required props: name, avatar, handle, verified, meta
- Removed any potential role/title/badge props that could cause extra text

**Files Modified**:
- `/src/features/post/PostCard.tsx` (lines 15-18, 119-139)

**Code Changes**:
```tsx
// Added import
import AuthorHeader, { createAuthorCore } from "@src/components/post/AuthorHeader";

// BEFORE (manual rendering)
<div className="flex items-center justify-between">
  <div className="flex items-center gap-3">
    {/* Manual avatar, name, verification, handle rendering */}
  </div>
</div>

// AFTER (standardized component)
<AuthorHeader
  author={createAuthorCore({
    name: p.author.name,
    username: p.author.handle,
    avatarUrl: p.author.avatar,
    verified: p.author.verified
  })}
  createdAt={p.createdAt}
  variant="regular"
  showVerified={true}
/>
```

## Testing Results

- ✅ Preview opened successfully at http://localhost:3000
- ✅ No browser errors detected
- ✅ Development server running without compilation errors
- ✅ Double border seam eliminated
- ✅ Clean author header display without extra text

## Implementation Notes

1. **Border/Radius Strategy**: Outer card owns all borders and radius; inner media components should be flush on top and only round on bottom if needed.

2. **AuthorHeader Standardization**: Always use the AuthorHeader component instead of manual author rendering to ensure consistent display and prevent extra text rendering.

3. **Props Discipline**: Only pass the core props (name, avatar, handle, verified, meta) to AuthorHeader. Avoid role, title, badge, or tier props in the header.

4. **Mobile-First Design**: Changes maintain mobile-first responsive design principles.

## Related Documentation

- Source: `docs/faint_double_border_card.md`
- Component: `/src/components/post/AuthorHeader.tsx`
- Component: `/src/features/paywall/components/LockedPostShell.tsx`
- Component: `/src/features/post/PostCard.tsx`