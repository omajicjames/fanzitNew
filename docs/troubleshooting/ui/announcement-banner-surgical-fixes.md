# Announcement Banner Surgical Fixes

## Issue Resolution
Applied surgical fixes to resolve two critical UI issues in the AnnouncementStack component:

### 1. Banner Shimmer Double Edge Line
**Problem**: The shimmer overlay was using `before:inset-0`, causing it to touch the border and create a second "edge" line.

**Solution**: Updated BANNER_CLASSES to inset the shimmer overlay by 1px:
```typescript
// BEFORE (problematic)
"before:absolute before:inset-0",
"before:bg-[linear-gradient(135deg,transparent,hsl(var(--muted)/_0.35))]",

// AFTER (fixed)
"before:absolute before:inset-[1px] before:rounded-[calc(theme(borderRadius.2xl)-1px)]",
"before:bg-[linear-gradient(135deg,transparent,hsl(var(--muted)/_0.35))]",
```

### 2. Title Link Underline Issue
**Problem**: Using `<h3><a>...</a></h3>` structure caused link underlines to appear via upstream typography styles.

**Solution**: Implemented overlay Link approach:
- Replaced `<h3><a>` with plain `<h3>` 
- Added invisible overlay `<Link>` on the card
- Applied `not-prose` class to opt out of typography styles

```tsx
<motion.article 
  className={`${BANNER_CLASSES} not-prose h-full relative`}
  data-spotlight
>
  {/* Overlay link owns click/focus; prevents heading underline */}
  <Link 
    href={activeHref}
    aria-label={activeItem.title}
    className="absolute inset-0 rounded-2xl z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand" 
  />

  <div className="flex h-full flex-col justify-between p-4 pointer-events-none">
    <div className="flex items-start gap-2">
      <span aria-hidden className="pointer-events-none">{activeItem.icon}</span>
      <h3 className="text-foreground text-lg font-semibold leading-tight select-none">
        {activeItem.title}
      </h3>
    </div>
    {/* ... rest of content ... */}
  </div>
</motion.article>
```

## Additional Cleanup
- Removed unused `TITLE_LINK_CLASSES` constant since overlay approach eliminates need for link-specific styling
- Maintained single border ownership with proper shimmer positioning
- Preserved accessibility with proper `aria-label` and focus management

## Files Modified
- `/src/features/right-rail/AnnouncementStack.tsx`

## Verification
- ✅ No double edge lines from shimmer overlay
- ✅ No link underlines on title text
- ✅ Clean compilation with no errors
- ✅ Proper focus management and accessibility
- ✅ Maintained all existing functionality

## Technical Details
- **Shimmer Fix**: `before:inset-[1px]` ensures overlay never touches border pixel
- **Link Structure**: Overlay approach prevents any text decoration inheritance
- **Typography**: `not-prose` class prevents upstream prose styles from affecting component
- **Focus Management**: Overlay Link handles all click/focus interactions cleanly