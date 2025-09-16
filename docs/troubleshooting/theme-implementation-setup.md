# Theme Implementation Setup - Troubleshooting Guide

## Overview
Complete implementation of Tailwind CSS v4 theme system with dark mode support, following the color usage guide specifications.

## Issues Resolved

### 1. Tailwind Config TypeScript Error
**Issue**: `darkMode: ["class"]` array format caused TypeScript error
```
Type '["class"]' is not assignable to type 'DarkModeStrategy | undefined'
```

**Solution**: Changed to string format
```typescript
// Before (incorrect)
darkMode: ["class"]

// After (correct)
darkMode: "class"
```

**Location**: `/tailwind.config.ts`

### 2. Import Path Resolution Error
**Issue**: Cannot find module `@/features/theme/useTheme`

**Solution**: Updated to relative path from app directory
```typescript
// Before (incorrect)
import { useTheme } from "@/features/theme/useTheme";

// After (correct)
import { useTheme } from "../../src/features/theme/useTheme";
```

**Location**: `/app/theme-test/page.tsx`

## Implementation Summary

### Files Created/Modified

#### 1. Root Layout (`/app/layout.tsx`)
- ✅ Added `suppressHydrationWarning` to prevent hydration mismatch
- ✅ Removed hardcoded "dark" className
- ✅ Added theme prevention script in `<head>` to avoid flash of wrong theme
- ✅ Script detects system preference and localStorage theme

#### 2. Tailwind Configuration (`/tailwind.config.ts`)
- ✅ Created with class-based dark mode strategy
- ✅ Added content globs for app and src directories
- ✅ Fixed TypeScript compatibility issue

#### 3. PostCSS Configuration (`/postcss.config.mjs`)
- ✅ Updated plugin order: `tailwindcss` before `autoprefixer`
- ✅ Replaced `@tailwindcss/postcss` with standard plugins
- ✅ Added explanatory comments

#### 4. Theme Hook (`/src/features/theme/useTheme.ts`)
- ✅ Created custom hook for theme management
- ✅ Handles localStorage persistence
- ✅ Provides toggle functionality and theme state
- ✅ Updates DOM classes for theme switching

#### 5. Theme Test Page (`/app/theme-test/page.tsx`)
- ✅ Created comprehensive testing interface
- ✅ Tests all color usage guide requirements
- ✅ Validates dark mode toggle functionality
- ✅ Confirms primary button colors (blue)
- ✅ Verifies brand text usage (gold, prestige only)
- ✅ Checks neutral borders (not gold)

### Color System Validation

#### Primary Colors (Blue)
- ✅ Used for CTAs and interactions
- ✅ Classes: `bg-primary`, `text-primary-foreground`, `ring-primary`
- ✅ Proper hover states: `hover:bg-primary/90`

#### Brand Colors (Gold)
- ✅ Used only for prestige elements
- ✅ Classes: `text-brand`, `bg-brand/10`, `border-brand/30`
- ✅ Applied to verified badges, premium indicators

#### Neutral Colors
- ✅ Used for borders and backgrounds
- ✅ Classes: `border-border`, `bg-card`, `bg-background`
- ✅ Proper contrast in both light and dark modes

#### Accent Colors
- ✅ Used for filters and secondary highlights
- ✅ Classes: `text-accent`, `bg-accent/10`

### Accessibility Features

#### Focus Management
- ✅ Focus rings use primary color: `focus:ring-2 focus:ring-primary`
- ✅ Proper contrast ratios maintained
- ✅ Keyboard navigation support

#### Theme Persistence
- ✅ Respects system preference on first visit
- ✅ Remembers user choice in localStorage
- ✅ Prevents flash of unstyled content (FOUC)

## Testing Results

### Sanity Tests Completed ✅
1. **Dark Mode Toggle**: Cards properly change background when switching themes
2. **Primary Button Colors**: All CTAs use blue color scheme as specified
3. **Brand Text Usage**: Gold color only appears on prestige elements
4. **Border Colors**: All borders use neutral zinc, not gold
5. **Focus States**: Proper blue focus rings for accessibility

### Browser Compatibility
- ✅ No console errors in development
- ✅ Theme switching works smoothly
- ✅ CSS custom properties properly applied
- ✅ Mobile-first responsive design maintained

## Configuration Files Status

### VS Code Settings (Optional)
For suppressing unknown at-rule warnings:
```json
{
  "css.lint.unknownAtRules": "ignore",
  "postcss.validate": true
}
```

### Stylelint Configuration (Optional)
```json
{
  "extends": ["stylelint-config-standard", "stylelint-config-tailwindcss"],
  "rules": { "at-rule-no-unknown": null }
}
```

## Next Steps

### Integration Points
- Theme toggle can be integrated into navigation components
- useTheme hook ready for use across the application
- Color system follows established design tokens
- All components should use semantic color classes

### Maintenance Notes
- Keep brand colors (gold) limited to prestige elements only
- Primary colors (blue) for all CTAs and interactions
- Neutral colors for structural elements
- Test theme switching when adding new components

## Troubleshooting Tips

### Common Issues
1. **Theme not persisting**: Check localStorage key 'theme'
2. **Colors not switching**: Verify dark mode classes in Tailwind config
3. **Import errors**: Use relative paths from app directory to src
4. **Hydration warnings**: Ensure suppressHydrationWarning is set

### Debug Commands
```bash
# Check if development server is running
pnpm dev

# Test theme page
open http://localhost:3000/theme-test

# Verify Tailwind compilation
npx tailwindcss --help
```

---

**Implementation Date**: January 2025  
**Status**: ✅ Complete  
**Test Page**: `/theme-test`  
**Documentation**: Updated color usage guide compliance