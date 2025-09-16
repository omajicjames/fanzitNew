# Inline Actions Behavior Fix

## Issue Description
The inline actions 3-dot menu was showing permanently instead of only appearing when the three-dot icon is clicked. The menu also lacked proper interaction behaviors like closing on outside clicks, re-clicks, and mobile long-press support.

## Root Cause
1. **Always Visible**: The `InlineActions` component was always rendered regardless of the `isOpen` state
2. **No Outside Click Detection**: Missing event listeners to close the menu when clicking outside
3. **No ESC Key Support**: Missing keyboard navigation support
4. **No Mobile Long Press**: Missing touch event handlers for mobile devices
5. **Ref Type Mismatch**: BasePostCard component needed forwardRef support

## Solution Implemented

### 1. Conditional Rendering
**File**: `/src/features/post/PostCard.tsx`
- Wrapped `InlineActions` component with conditional rendering: `{isOpen && (...)}`
- Only renders the inline actions panel when `isOpen` state is true

### 2. Outside Click Detection
**File**: `/src/features/post/PostCard.tsx`
- Added `useEffect` hook with `mousedown` event listener
- Detects clicks outside the post card container
- Automatically closes inline actions when clicking outside

### 3. ESC Key Support
**File**: `/src/features/post/PostCard.tsx`
- Added `useEffect` hook with `keydown` event listener
- Closes inline actions when ESC key is pressed
- Improves accessibility and user experience

### 4. Mobile Long Press Support
**File**: `/src/features/post/PostCard.tsx`
- Added touch event handlers: `onTouchStart`, `onTouchEnd`
- Implemented 500ms timer for long press detection
- Prevents conflicts between click and long press events
- Mobile-first design approach

### 5. BasePostCard forwardRef Support
**File**: `/src/features/post/BasePostCard.tsx`
- Modified `BasePostCardRoot` to use `forwardRef`
- Allows ref attachment to the article element
- Enables outside click detection functionality

## Technical Implementation

### Event Handlers
```typescript
// Click handler with long press detection
const handleClick = (e: React.MouseEvent) => {
  e.stopPropagation();
  if (!isLongPressRef.current) {
    toggleActions(view.id);
  }
  isLongPressRef.current = false;
};

// Mobile long press handlers
const handleTouchStart = () => {
  isLongPressRef.current = false;
  longPressTimerRef.current = setTimeout(() => {
    isLongPressRef.current = true;
    toggleActions(view.id);
  }, 500);
};
```

### Outside Click Detection
```typescript
useEffect(() => {
  function handleClickOutside(event: MouseEvent) {
    if (isOpen && postCardRef.current && !postCardRef.current.contains(event.target as Node)) {
      closeAll();
    }
  }

  if (isOpen) {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }
}, [isOpen]);
```

## Files Modified
1. `/src/features/post/PostCard.tsx`
   - Added conditional rendering for InlineActions
   - Added outside click detection
   - Added ESC key support
   - Added mobile long press functionality
   - Updated imports and refs

2. `/src/features/post/BasePostCard.tsx`
   - Added forwardRef support to BasePostCardRoot
   - Updated imports to include forwardRef

## Testing Results
✅ **Click to Open/Close**: 3-dot button toggles inline actions correctly
✅ **Outside Click**: Clicking outside the post card closes the menu
✅ **ESC Key**: Pressing ESC key closes the menu
✅ **Mobile Long Press**: Long press on mobile devices opens the menu
✅ **No Conflicts**: Click and long press events work independently
✅ **Accessibility**: Proper ARIA attributes and keyboard navigation

## User Experience Improvements
- **Mobile-First Design**: Optimized touch interactions for mobile devices
- **Intuitive Behavior**: Menu behaves as expected in modern web applications
- **Accessibility**: Keyboard navigation support for screen readers
- **Performance**: Event listeners only active when menu is open
- **Clean UI**: Menu only appears when needed, reducing visual clutter

## Status
**COMPLETED** ✅

All inline actions behavior issues have been resolved. The 3-dot menu now:
- Only shows when clicked
- Closes on outside clicks
- Closes on re-clicking the 3-dot button
- Supports mobile long press
- Includes ESC key support
- Maintains proper accessibility standards

The application is ready for production with improved user experience across all devices.