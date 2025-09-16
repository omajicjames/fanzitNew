# Fast Refresh Issues

This directory contains solutions for Next.js Fast Refresh problems that cause full page reloads instead of hot module replacement.

## Available Solutions

### ✅ Mixed Exports Problem
**File:** [mixed-exports-solution.md](./mixed-exports-solution.md)

**Issue:** Fast Refresh performs full reloads when files export both React and non-React code

**Symptoms:**
- `⚠ Fast Refresh had to perform a full reload` warnings
- Slower development experience
- Loss of component state during development

**Solution:** Separate React hooks/components from utility functions into different files

---

## Common Fast Refresh Rules

### ✅ What Works
- Files that only export React components
- Files that only export React hooks
- Files that only export utility functions/constants
- Named function components (not anonymous)
- PascalCase component names

### ❌ What Breaks Fast Refresh
- Mixed exports (React + non-React in same file)
- Anonymous function components
- camelCase component names
- Exporting both default and named exports of React components

## Quick Fixes

### Mixed Exports
```typescript
// ❌ BAD: Mixed exports
export function MyComponent() { return <div /> }
export const utilityFunction = () => { /* utility */ }

// ✅ GOOD: Separate files
// components/my-component.tsx
export function MyComponent() { return <div /> }

// utils/my-utils.ts
export const utilityFunction = () => { /* utility */ }
```

### Anonymous Components
```typescript
// ❌ BAD: Anonymous function
export default () => <div>Hello</div>

// ✅ GOOD: Named function
export default function MyComponent() {
  return <div>Hello</div>
}
```

### Component Naming
```typescript
// ❌ BAD: camelCase
export function myComponent() { return <div /> }

// ✅ GOOD: PascalCase
export function MyComponent() { return <div /> }
```

---

**Last Updated:** January 2025