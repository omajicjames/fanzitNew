# Incorrect Directory Structure - App and Src Coexistence

## Issue Summary
The project currently has both `app/` and `src/` directories, which is not the correct structure for Next.js 13+ with app router.

## Problem Analysis

### Current Incorrect Structure
```
fanzit/
├── app/                    # Next.js 13+ app router (routes only)
│   ├── (protected)/
│   ├── (public)/
│   ├── globals.css
│   └── layout.tsx
└── src/                    # Source code (components, features, etc.)
    ├── components/
    ├── features/
    ├── hooks/
    └── lib/
```

### Root Cause
Next.js 13+ with app router follows this pattern:
- `app/` directory: Contains ONLY routes, layouts, loading, error, and page components
- `src/` directory: Contains reusable components, features, hooks, utilities, and business logic
- These should NOT coexist with mixed responsibilities

## Correct Structure Should Be

### Option 1: App Router with Src (Recommended)
```
fanzit/
├── app/                    # Routes and app-specific files only
│   ├── (protected)/
│   │   ├── analytics/page.tsx
│   │   ├── creator/page.tsx
│   │   └── messages/page.tsx
│   ├── (public)/
│   │   └── auth/page.tsx
│   ├── globals.css
│   └── layout.tsx
└── src/                    # All reusable code
    ├── components/
    ├── features/
    ├── hooks/
    └── lib/
```

### Option 2: App Router without Src
```
fanzit/
├── app/                    # Everything in app directory
│   ├── (protected)/
│   ├── (public)/
│   ├── components/
│   ├── features/
│   ├── hooks/
│   ├── lib/
│   ├── globals.css
│   └── layout.tsx
```

## Current Issues
1. ✗ Mixed responsibilities between app/ and src/
2. ✗ Import path confusion (@/ vs @src/ vs relative paths)
3. ✗ Unclear component organization
4. ✗ Potential build and routing conflicts

## Recommended Solution
Move all reusable components, features, hooks, and utilities to src/ directory and keep app/ for routes only.

### Required Actions
1. Verify no route components are in src/
2. Verify no reusable components are in app/
3. Update import paths consistently
4. Update tsconfig.json paths if needed
5. Test build and routing

## Impact
- High: Affects entire project structure
- Requires careful migration to avoid breaking changes
- All import statements need review

## Status
- ❌ Issue identified
- ⏳ Solution planning required
- ⏳ Migration strategy needed

Date: $(date)
Priority: High
Category: Architecture