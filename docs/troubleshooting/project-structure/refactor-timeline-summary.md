# Refactor Timeline Summary

## Overview
This document summarizes the refactoring plan outlined in `docs/refactor_timeline.md` for creating a unified Timeline component system that handles different contexts across the application.

## Current State Analysis

### Existing Components
- **Profile Page**: `app/(protected)/creator/profile/[id]/page.tsx` - Current creator profile implementation
- **Upload Tool**: `app/(protected)/creator/upload/page.tsx` - Creator content upload functionality
- **Home Page**: `app/(public)/page.tsx` - Current landing page (to be repurposed)
- **Post Cards**: `src/features/post/PostCard.tsx` + `BasePostCard.tsx` - User/creator content display
- **Main Feed**: `src/features/feed/components/main-feed.tsx` - Generic feed component

## Proposed Refactoring Plan

### 1. Create Timeline Component
**Location**: `src/features/feed/components/Timeline.tsx`

**Purpose**: 
- Reusable feed list component
- Maps posts to correct card types based on context
- Accepts context prop to determine behavior

**Context Types**:
- `"admin"` - For landing page admin posts
- `"profile"` - For creator profile subscriber view
- `"self"` - For creator's own profile view

### 2. Create AdminPostCard Component
**Location**: `src/features/admin/components/AdminPostCard.tsx`

**Purpose**:
- Similar to PostCard but optimized for admin content
- No paywalls, designed for promotions/announcements
- Used specifically for landing page admin posts

### 3. Context-Based Routing Implementation

#### Landing Page Refactor
**File**: `app/(public)/page.tsx`
- Use Timeline component with `context="admin"`
- Fetch admin posts via `getAdminPosts()` function
- Display promotional/announcement content

#### Creator Profile Page (Subscriber View)
**File**: `app/(protected)/creator/profile/[id]/page.tsx`
- Use Timeline component with `context="profile"`
- Fetch posts by creator ID via `getPostsByCreatorId()`
- Show creator's content from subscriber perspective

#### Creator Self-View
**Current Implementation**: Keep existing upload/editor UI
- Add Timeline component with `context="self"`
- Maintain current functionality while reusing Timeline
- Show creator's own content with self-management capabilities

## Technical Implementation Details

### Timeline Component Structure
```typescript
type Props = {
  views: any[]; // Post data already adapted
  context: "admin" | "profile" | "self";
  openPricingPlansModal?: () => void;
};
```

### Context-Driven Rendering Logic
- **Admin Context**: Renders `AdminPostCard` components
- **Profile/Self Context**: Renders `PostCard` components with context-specific behavior
- **Conditional Props**: Pass context to PostCard for header visibility control

## Benefits of This Refactor

### Code Reusability
- Single Timeline component handles all feed scenarios
- Reduces code duplication across different pages
- Consistent feed behavior throughout application

### Maintainability
- Centralized feed logic in one component
- Context-driven behavior makes changes predictable
- Clear separation between admin and user content

### Scalability
- Easy to add new contexts in the future
- Modular card system allows for new card types
- Flexible data fetching per context

## Implementation Strategy

### Phase 1: Component Creation
1. Create `Timeline.tsx` component with context logic
2. Create `AdminPostCard.tsx` for admin content
3. Set up proper TypeScript interfaces

### Phase 2: Data Layer
1. Implement `getAdminPosts()` function
2. Ensure `getPostsByCreatorId()` is available
3. Adapt existing data structures for Timeline

### Phase 3: Page Integration
1. Refactor landing page to use Timeline with admin context
2. Update creator profile page for subscriber view
3. Integrate Timeline into creator self-view

### Phase 4: Testing & Optimization
1. Test all three contexts thoroughly
2. Ensure proper responsive behavior
3. Optimize performance for different data loads

## Key Principle
**"Context decides behavior"** - The Timeline component's behavior is entirely driven by the context prop, ensuring consistent yet flexible functionality across different use cases.

## Files to be Created/Modified

### New Files
- `src/features/feed/components/Timeline.tsx`
- `src/features/admin/components/AdminPostCard.tsx`
- Data fetching utilities (if not existing)

### Modified Files
- `app/(public)/page.tsx` - Landing page refactor
- `app/(protected)/creator/profile/[id]/page.tsx` - Profile page integration
- Creator self-view page - Timeline integration

## Success Criteria
- Single Timeline component handles all feed scenarios
- Context-driven rendering works correctly
- Admin content displays properly on landing page
- Creator profiles show appropriate content based on viewer
- Existing functionality preserved while reducing code duplication

## Bulletproof Implementation Guidelines

### Route-Context Mapping (Explicit)
- `(public)/page.tsx` → Timeline `context="admin"` (admin promos)
- `(protected)/creator/profile/[id]/page.tsx` → Timeline `context="profile"` (subscriber view)
- Creator self-view stays current profile-with-tools page; just drop Timeline `context="self"` under existing upload/editor chrome

### File Placement Standards
- `AdminPostCard.tsx` under `src/features/admin/components/`
- `Timeline.tsx` under `src/features/feed/components/`
- Keep creator cards at `src/features/post/*`
- Maintains existing project structure conventions

### Design System Guardrails
- Ensure admin card follows "outer card owns border/radius; media is flush (no inner border)" rule
- Prevents double-border appearance per design specification
- Consistent with existing card component patterns

### Types & Props Sanity
- Give Timeline narrow Context union type
- Use typed views: `PostView[] | AdminPostView[]` to prevent context spills
- Make PostCard context prop optional, default to "profile"/"feed" internally
- Prevents breaking existing imports when adding context awareness

### Data Adapters
- Stub `getAdminPosts()` and `getPostsByCreatorId()` as adapters
- Return view-models that cards expect, not raw DB rows
- Keeps Timeline component dumb and reusable
- Clean separation between data layer and UI components

### Pitfalls to Watch
- **Pagination/infinite scroll parity** across all contexts
- **Skeletons/empty states** shared by Timeline component
- **Action sets separation**: 
  - Admin actions: pin/share/report only
  - Creator cards: paywall + engagement actions
  - Clean separation prevents action bleeding between contexts