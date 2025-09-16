# Fast Refresh Mixed Exports Issue

## Problem Description

**Error Message:**
```
⚠ Fast Refresh had to perform a full reload. Read more: https://nextjs.org/docs/messages/fast-refresh-reload
```

**Symptoms:**
- Development server performs full page reloads instead of hot module replacement
- Slower development experience
- Loss of component state during development
- Warning appears repeatedly in terminal logs

## Root Cause Analysis

### What Happened
The Fast Refresh issue was caused by **mixed exports** in the toast system files:

1. **Duplicate Files**: Both `/src/hooks/use-toast.ts` and `/src/components/ui/use-toast.ts` contained identical code
2. **Mixed Export Pattern**: These files exported both:
   - React hooks (`useToast`, `toast`) 
   - Non-React functions (`reducer`)
   - Type definitions and utility functions

### Why This Causes Issues
Next.js Fast Refresh has strict rules:
- Files should export **either** React components/hooks **OR** other functions
- **Never both** in the same file
- This ensures Fast Refresh can properly track and update React components

## Solution Applied

### Step 1: Remove Duplicate Files
```bash
# Removed duplicate file
rm /src/components/ui/use-toast.ts
```

### Step 2: Separate Concerns
Created `/src/hooks/toast-reducer.ts` to contain all non-React logic:

```typescript
// ----------------------
// Toast Reducer
// Location: @/hooks/toast-reducer.ts
// Purpose: Handles toast state management logic
// ----------------------

// Moved all non-React exports here:
- toastReducer function
- Type definitions (ToasterToast, Action, State)
- Utility functions (addToRemoveQueue, toastTimeouts)
```

### Step 3: Clean React Hook File
Updated `/src/hooks/use-toast.ts` to only export React hooks:

```typescript
// ----------------------
// Toast Hook
// Location: @/hooks/use-toast.ts
// Purpose: React hook for toast notifications
// ----------------------

// Only exports React-related functions:
- useToast hook
- toast function
- Imports reducer logic from separate file
```

## File Structure After Fix

```
src/hooks/
├── toast-reducer.ts     # Non-React logic (reducer, types, utilities)
├── use-toast.ts         # React hooks only
└── use-mobile.ts

src/components/ui/
├── toaster.tsx          # Imports from @/hooks/use-toast
└── toast.tsx
```

## Verification

### Before Fix
```bash
⚠ Fast Refresh had to perform a full reload. Read more: https://nextjs.org/docs/messages/fast-refresh-reload
✓ Compiled in 679ms (719 modules)
⚠ Fast Refresh had to perform a full reload. Read more: https://nextjs.org/docs/messages/fast-refresh-reload
```

### After Fix
```bash
✓ Compiled in 502ms (467 modules)
✓ Compiled in 362ms (467 modules)
✓ Compiled in 240ms (467 modules)
# No more Fast Refresh warnings!
```

## Prevention Guidelines

### ✅ Good Practices
- **Separate React and non-React exports** into different files
- **Use consistent import paths** with `@/` alias
- **Remove duplicate files** that serve the same purpose
- **Follow single responsibility principle** for file exports

### ❌ Avoid These Patterns
```typescript
// BAD: Mixed exports in same file
export function MyComponent() { /* React component */ }
export const utilityFunction = () => { /* Non-React utility */ }
export const CONSTANT = 'value' // Non-React constant
```

```typescript
// GOOD: Separate files
// components/my-component.tsx
export function MyComponent() { /* React component */ }

// utils/my-utils.ts
export const utilityFunction = () => { /* Non-React utility */ }
export const CONSTANT = 'value'
```

## Related Documentation

- [Next.js Fast Refresh Documentation](https://nextjs.org/docs/messages/fast-refresh-reload)
- [React Fast Refresh Rules](https://nextjs.org/docs/architecture/fast-refresh)

## Date Resolved
**January 2025** - Fixed mixed exports in toast system files

---

*This documentation helps prevent similar Fast Refresh issues in the future by following proper file organization and export patterns.*