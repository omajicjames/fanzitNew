# Fanzit Troubleshooting Guide

This directory contains solutions to common development issues encountered in the Fanzit project.

## Directory Structure

```
docs/troubleshooting/
├── README.md                    # This file - main troubleshooting index
├── components/                 # Component implementation and fixes
├── ui/                        # UI styling and visual fixes
├── system/                    # System-level features (auth, paywall, etc.)
├── fixes/                     # General bug fixes and patches
├── development/               # Development environment issues
├── auth/                      # Authentication related issues
├── fast-refresh/              # Fast Refresh and Hot Module Replacement issues
├── hydration-mismatch/        # Server-client rendering mismatches
├── build-errors/              # Production build failures
├── typescript/                # TypeScript compilation issues
├── typescript-errors/         # TypeScript compilation issues
├── performance-issues/        # Performance optimization solutions
├── navigation/                # Navigation and routing issues
├── ui-components/             # UI component specific issues
└── project-structure/         # Project organization and structure
```

## Issue Categories

### 🧩 Component Issues
**Location:** `components/`

- **Post Actions** - 3-dots menu, click handlers, dropdown functionality
- **Card Components** - Base cards, unified systems, stacking issues
- **Author Headers** - Shared components, time handles
- **Media Components** - Aspect boxes, image handling

**Current Solutions:**
- ✅ [Post Actions 3-dots Menu](./components/post-actions-3dots-menu-implementation.md)
- ✅ [Author Time Handle](./components/author-time-handle-implementation.md)
- ✅ [Card Stacking Cleanup](./components/card-stacking-cleanup.md)
- ✅ [Media Aspect Box](./components/media-aspect-box-implementation.md)
- ✅ [One Base Card Implementation](./components/one-base-card-implementation.md)
- ✅ [Unified Base Card System](./components/unified-base-card-system-implementation.md)

### 🎨 UI & Styling Issues
**Location:** `ui/`

- **Overlay Systems** - Modern overlays, legacy modernization
- **Border Styling** - Faint double borders, card styling
- **Z-index Management** - Layering, stacking contexts
- **Background Issues** - White background prevention

**Current Solutions:**
- ✅ [Modern Overlay Implementation](./ui/modern-overlay-implementation.md)
- ✅ [Overlay Standardization](./ui/overlay-standardization-fix.md)
- ✅ [Z-index Layering Fixes](./ui/z-index-layering-fixes.md)
- ✅ [White Background Prevention](./ui/white-background-prevention-fixes.md)

### ⚙️ System Features
**Location:** `system/`

- **Consent System** - Cookie consent, preferences
- **Paywall System** - Payment integration, type fixes
- **Theme System** - Theme implementation and setup
- **TypeScript Integration** - System-level type fixes

**Current Solutions:**
- ✅ [Consent System Fixes](./system/consent-system-fixes.md)
- ✅ [Paywall System Implementation](./system/paywall-system-implementation.md)
- ✅ [Theme Implementation Setup](./system/theme-implementation-setup.md)

### 🔧 General Fixes
**Location:** `fixes/`

- **Image Replacements** - Asset updates and fixes
- **Git Operations** - Commit and push issues
- **Component Removal** - Redundant element cleanup
- **Prop Fixes** - Component property issues

**Current Solutions:**
- ✅ [Fitness Image Replacement](./fixes/fitness-image-replacement-fix.md)
- ✅ [Git Commit Push Success](./fixes/git-commit-push-success.md)
- ✅ [Redundant Upgrade Button Removal](./fixes/redundant-upgrade-button-removal.md)

### 🔄 Fast Refresh Issues
**Location:** `fast-refresh/`

- **Mixed Exports Problem** - When files export both React and non-React code
- **Anonymous Components** - Components without proper names
- **Invalid Hook Usage** - Hooks used outside React components

**Current Solutions:**
- ✅ [Mixed Exports Solution](./fast-refresh/mixed-exports-solution.md)

### 🔀 Hydration Mismatch Issues
**Location:** `hydration-mismatch/`

- **Server-Client Rendering Differences** - When server and client render different content
- **localStorage Access** - Accessing browser APIs during SSR
- **Dynamic Content** - Time-sensitive or random content causing mismatches

### 🏗️ Build Errors
**Location:** `build-errors/`

- **Module Resolution** - Import/export issues
- **Missing Dependencies** - Package installation problems
- **Environment Variables** - Configuration issues

### 📝 TypeScript Errors
**Location:** `typescript-errors/`

- **Type Definitions** - Missing or incorrect types
- **Import/Export Types** - Module type issues
- **Configuration** - tsconfig.json problems

**Current Solutions:**
- 🔄 *Solutions will be documented as they occur*

### ⚡ Performance Issues
**Location:** `performance-issues/`

- **Bundle Size** - Large JavaScript bundles
- **Rendering Performance** - Slow component updates
- **Memory Leaks** - Unoptimized resource usage

**Current Solutions:**
- 🔄 *Solutions will be documented as they occur*

## How to Use This Guide

### When You Encounter an Issue:

1. **Identify the Category** - Determine which type of issue you're facing
2. **Check Existing Solutions** - Look in the appropriate directory
3. **Follow the Solution** - Apply the documented fix
4. **Document New Issues** - If it's a new problem, create a new solution file

### Creating New Solution Documents:

```markdown
# [Issue Name]

## Problem Description
- Error message
- Symptoms
- When it occurs

## Root Cause Analysis
- What happened
- Why it happened
- Technical details

## Solution Applied
- Step-by-step fix
- Code changes
- Configuration updates

## Verification
- Before/after comparison
- How to test the fix

## Prevention Guidelines
- Best practices
- What to avoid

## Date Resolved
```

## Quick Reference

### Common Commands
```bash
# Development server
pnpm dev

# Build for production
pnpm build

# Type checking
pnpm lint

# Add new shadcn component
npx shadcn@latest add [component-name]
```

### Common File Locations
- **Components**: `src/components/[feature]/`
- **Pages**: `src/app/[route]/`
- **Hooks**: `src/hooks/`
- **Utils**: `src/lib/`
- **Types**: `src/types/` (if needed)

### Import Patterns
```typescript
// Always use @/ alias
import { Button } from '@src/components/ui/button'
import { useAuth } from '@src/hooks/use-auth'
import { cn } from '@src/lib/utils'
```

## Contributing

When you solve a new issue:

1. Create a new markdown file in the appropriate category directory
2. Follow the solution document template above
3. Update this README.md to reference the new solution
4. Include code examples and screenshots when helpful

---

**Last Updated:** January 2025  
**Maintainer:** Fanzit Development Team