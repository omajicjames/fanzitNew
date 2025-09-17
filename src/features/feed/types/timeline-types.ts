// ----------------------
// Timeline Types and Interfaces
// Location: /src/features/feed/types/timeline-types.ts
// Purpose: Centralized type definitions for Timeline component system
// Used by: Timeline.tsx, PostCard.tsx, AdminPostCard.tsx
// ----------------------

import { PostView } from '@src/features/post/types'

// ----------------------
// Timeline Context Types
// Purpose: Define behavior contexts for different page implementations
// Usage: Determines rendering logic and component selection
// ----------------------
export type TimelineContext = "admin" | "profile" | "self"

// ----------------------
// Context Configuration Interface
// Purpose: Type-safe configuration for each context type
// ----------------------
export interface TimelineContextConfig {
  /** Whether to use AdminPostCard instead of PostCard */
  useAdminCard: boolean
  /** Whether to hide the timeline header */
  hideHeader: boolean
  /** CSS classes specific to this context */
  contextClasses: string
  /** Default empty state message */
  defaultEmptyMessage: string
}

// ----------------------
// Admin Post View Interface
// Purpose: Extended PostView for admin promotional content
// Context: Used specifically in "admin" timeline context
// ----------------------
export interface AdminPostView extends PostView {
  /** Admin-specific metadata for promotional content */
  adminMeta?: {
    /** Whether post is pinned to top */
    pinned?: boolean
    /** Promotional category for content classification */
    category?: 'announcement' | 'promotion' | 'update' | 'feature'
    /** Priority level for display order */
    priority?: 'high' | 'medium' | 'low'
    /** Call-to-action button text */
    ctaText?: string
    /** Call-to-action button URL */
    ctaUrl?: string
    /** Badge text for promotional content */
    badgeText?: string
    /** Badge variant for styling */
    badgeVariant?: 'default' | 'secondary' | 'destructive' | 'outline'
  }
}

// ----------------------
// Timeline Props Interface
// Purpose: Type-safe props with context-driven behavior
// Component: Timeline from /src/features/feed/components/Timeline.tsx
// ----------------------
export interface TimelineProps {
  /** Post data adapted for display - can be regular or admin posts */
  views: PostView[] | AdminPostView[]
  /** Context determines rendering behavior and component selection */
  context: TimelineContext
  /** Modal opener for pricing plans (required for profile/self contexts) */
  openPricingPlansModal?: () => void
  /** Optional CSS class name for custom styling */
  className?: string
  /** Loading state indicator */
  isLoading?: boolean
  /** Custom empty state message */
  emptyMessage?: string
  /** Optional header title (overrides context default) */
  title?: string
  /** Optional header subtitle */
  subtitle?: string
}

// ----------------------
// Timeline Data Provider Interface
// Purpose: Type-safe data fetching functions for different contexts
// ----------------------
export interface TimelineDataProvider {
  /** Get admin posts for public landing page */
  getAdminPosts(): PostView[]
  /** Get posts by creator ID for profile context */
  getPostsByCreatorId(creatorId: string): PostView[]
  /** Get posts for creator self-view context */
  getSelfPosts(creatorId: string): PostView[]
}

// ----------------------
// Timeline Action Handlers Interface
// Purpose: Type-safe event handlers for timeline interactions
// ----------------------
export interface TimelineActionHandlers {
  /** Handle post like action */
  onLike?: (postId: string) => void
  /** Handle post comment action */
  onComment?: (postId: string) => void
  /** Handle post share action */
  onShare?: (postId: string) => void
  /** Handle post unlock/purchase action */
  onUnlock?: (postId: string, priceCents: number) => void
  /** Handle pricing plans modal opening */
  onOpenPricingPlans?: () => void
}

// ----------------------
// Context Helper Functions Type
// Purpose: Type definitions for context utility functions
// ----------------------
export type ContextHelpers = {
  /** Determine if admin card should be used */
  shouldUseAdminCard: (context: TimelineContext) => boolean
  /** Determine if header should be hidden */
  shouldHideHeader: (context: TimelineContext) => boolean
  /** Get context-specific CSS classes */
  getContextClasses: (context: TimelineContext) => string
  /** Get context configuration */
  getContextConfig: (context: TimelineContext) => TimelineContextConfig
}

// ----------------------
// Timeline State Interface
// Purpose: Type-safe state management for Timeline component
// ----------------------
export interface TimelineState {
  /** Current posts being displayed */
  posts: PostView[] | AdminPostView[]
  /** Loading state */
  isLoading: boolean
  /** Error state */
  error: string | null
  /** Current context */
  context: TimelineContext
  /** Whether pricing modal is open */
  isPricingModalOpen: boolean
}

// ----------------------
// Export all types for external use
// ----------------------
export type {
  PostView,
  AdminPostView as AdminPost
}

// ----------------------
// Context Configuration Constants
// Purpose: Default configurations for each timeline context
// ----------------------
export const TIMELINE_CONTEXT_CONFIGS: Record<TimelineContext, TimelineContextConfig> = {
  admin: {
    useAdminCard: true,
    hideHeader: false,
    contextClasses: 'space-y-8 max-w-2xl mx-auto',
    defaultEmptyMessage: 'No announcements at this time. Check back later for updates!'
  },
  profile: {
    useAdminCard: false,
    hideHeader: true,
    contextClasses: 'space-y-6',
    defaultEmptyMessage: 'No posts yet. Check back later for new content!'
  },
  self: {
    useAdminCard: false,
    hideHeader: true,
    contextClasses: 'space-y-6',
    defaultEmptyMessage: 'You haven\'t posted anything yet. Create your first post to get started!'
  }
}