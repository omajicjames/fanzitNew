# Post Actions UI Refactor - Chunk 1

## Overview
Refactored post "more actions" UI from modal-based to inline expanding card system. This is Chunk 1 of the migration, focusing on the main feed implementation.

## Changes Made

### Files Created
- `src/features/post-actions/registry.ts` - Global state management for inline actions
- `src/features/post-actions/InlineActions.tsx` - Main inline actions component

### Files Modified
- `src/features/feed/components/main-feed.tsx` - Integrated inline actions system
- `package.json` - Added framer-motion dependency

## Technical Implementation

### PostActionsRegistry
**Location:** `src/features/post-actions/registry.ts`

- **Purpose:** Ensures only one post card has expanded actions at a time
- **Features:**
  - Singleton pattern for global state management
  - Event-driven architecture with listeners
  - React hook integration with `usePostActionsRegistry`
  - Automatic cleanup and memory management

### InlineActions Component
**Location:** `src/features/post-actions/InlineActions.tsx`

- **Purpose:** Renders role-based action menus inline within post cards
- **Features:**
  - Role-aware action rendering (Creator vs Subscriber)
  - Framer Motion animations (250-300ms slide/height)
  - Keyboard navigation and ESC handling
  - Outside-click detection
  - Analytics tracking integration
  - Accessibility compliance (ARIA labels, focus management)
  - Toast notifications via Sonner

### Main Feed Integration
**Location:** `src/features/feed/components/main-feed.tsx`

- **Changes:**
  - Added `usePostActionsRegistry` hook
  - Replaced three-dots modal handler with inline actions toggle
  - Added event listeners for ESC and outside-click events
  - Integrated analytics tracking for open/close events
  - Added `InlineActions` component rendering below post content

## Architecture Decisions

### State Management
- **Registry Pattern:** Global singleton ensures only one expanded card at a time
- **Event-Driven:** Custom events handle ESC and outside-click from child components
- **Controlled Components:** Parent manages open/close state via registry

### Performance Optimizations
- **No Portals:** DOM confined to post cards for better performance
- **Conditional Rendering:** Actions only render when expanded
- **Event Delegation:** Efficient event handling with cleanup

### Accessibility
- **Focus Management:** Auto-focus first action when opened
- **Keyboard Navigation:** ESC key closes expanded actions
- **ARIA Attributes:** Proper labeling and expanded states
- **Screen Reader Support:** Section roles and descriptive labels

## Role-Based Actions

### Creator (Post Owner)
- Edit Post
- Pin to Profile
- Share
- Manual Twitter
- Toggle Comments (On/Off)
- Delete (Destructive action)
- Report a Problem

### Subscriber (Non-Owner)
- Save Post
- Favorite/Pin to Collection
- Repost (if feature flag enabled)
- Share
- Report Post
- Block Creator (if feature flag enabled)

## Animation & UX
- **Timing:** 250-300ms slide and height animations
- **Easing:** Smooth transitions using Framer Motion
- **Mobile-First:** Responsive design with touch-friendly targets
- **Fast Feel:** Immediate visual feedback and optimistic updates

## Analytics Integration
- **Events Tracked:**
  - `post_actions_opened` - When actions expand
  - `post_actions_closed` - When actions collapse
  - `post_action_clicked` - Individual action interactions
- **Context:** Includes postId, action type, and user role

## Testing Checklist
- [x] Creator sees Delete action, subscriber does not
- [x] Opening one inline menu closes others
- [x] ESC key collapses expanded actions
- [x] Outside-click collapses expanded actions
- [x] Focus management works correctly
- [x] Analytics events fire properly
- [x] No TypeScript/linting errors
- [ ] Mobile responsiveness verified
- [ ] Accessibility audit passed

## Next Steps (Chunk 2)
- Roll out to profile posts and single post page
- Remove all imports of old PostActionModal
- Add comprehensive testing
- Performance optimization review

## Dependencies Added
- `framer-motion@12.23.12` - Animation library for smooth transitions

## Breaking Changes
None in this chunk - old modal system remains functional but unused in main feed.

---
*Generated: Chunk 1 Implementation - Main Feed Inline Actions*