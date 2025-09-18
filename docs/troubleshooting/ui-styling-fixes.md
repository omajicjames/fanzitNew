# UI Styling Fixes - Admin System Pages

## Issue
The admin system pages for backups and maintenance had inconsistent styling with light theme elements that didn't match the dark theme used throughout the application.

## Pages Affected
- `/admin/system/backups` - System Backups page
- `/admin/system/maintenance` - System Maintenance page

## Problems Identified
1. **Background styling**: Pages were using light backgrounds instead of dark theme
2. **Card components**: Cards had white backgrounds with light borders
3. **Text colors**: Text was using gray colors meant for light theme
4. **Button styling**: Action buttons had incorrect color schemes
5. **Table styling**: Tables had light theme backgrounds and borders
6. **Alert components**: Maintenance alerts used light theme colors

## Solutions Implemented

### System Backups Page (`/app/(protected)/admin/system/backups/page.tsx`)
- Updated main container to use `min-h-screen bg-neutral-950 text-white`
- Changed page header text from `text-gray-900` to `text-white`
- Updated subtitle from `text-gray-600` to `text-neutral-400`
- Modified backups table:
  - Container: `bg-white` → `bg-neutral-900`, `border-gray-200` → `border-neutral-800`
  - Header: `bg-gray-50` → `bg-neutral-800`, `text-gray-500` → `text-neutral-400`
  - Rows: Added `hover:bg-neutral-800 transition-colors`
  - Text: `text-gray-900` → `text-neutral-300`
  - Action buttons: Updated to use `text-blue-400`/`text-red-400` with hover transitions
- Fixed empty state styling with proper dark theme colors

### System Maintenance Page (`/app/(protected)/admin/system/maintenance/page.tsx`)
- Updated main container to use dark theme background
- Fixed page header text colors
- Updated maintenance mode alert:
  - Background: `bg-orange-50` → `bg-orange-900/20`
  - Border: `border-orange-200` → `border-orange-800`
  - Text: `text-orange-800` → `text-orange-300`
- Modified stats cards:
  - Background: `bg-white` → `bg-neutral-900`
  - Border: `border-gray-200` → `border-neutral-800`
  - Text: Updated to use neutral colors for dark theme
  - Icons: Added colored background containers
- Updated actions and controls section with dark theme styling
- Fixed maintenance tasks table with proper dark backgrounds and borders
- Updated action buttons with consistent color scheme and transitions

## Technical Details
- Used Tailwind CSS neutral color palette for consistency
- Added transition effects for better user experience
- Maintained accessibility with proper contrast ratios
- Followed existing design patterns from other admin pages

## Testing
- Verified both pages load correctly without errors
- Confirmed styling consistency with other admin pages
- Tested responsive behavior on different screen sizes
- Validated dark theme implementation across all components

## Files Modified
1. `/app/(protected)/admin/system/backups/page.tsx`
2. `/app/(protected)/admin/system/maintenance/page.tsx`

## Outcome
Both admin system pages now have consistent dark theme styling that matches the rest of the application. All components including tables, cards, buttons, and alerts properly follow the established design system.