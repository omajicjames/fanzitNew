"use client";

// ----------------------
// Timeline Component
// Location: /src/features/feed/components/Timeline.tsx
// Purpose: Unified feed component with context-driven behavior
// Parent: Landing page, Creator profile, Creator self-view
// Children: PostCard, AdminPostCard components
// ----------------------

import React from 'react';
import PostCard from '@src/features/post/PostCard';
import { cn } from '@src/lib/utils';
import { 
  TimelineContext, 
  TimelineProps, 
  AdminPostView, 
  TIMELINE_CONTEXT_CONFIGS
} from '@src/features/feed/types/timeline-types';

// ----------------------
// Import AdminPostCard for admin context
// Component: AdminPostCard from /src/features/admin/components/AdminPostCard.tsx
// ----------------------
import AdminPostCard from '@src/features/admin/components/AdminPostCard';

// ----------------------
// Context Helper Functions
// Purpose: Determine rendering behavior based on context using centralized config
// Configuration: TIMELINE_CONTEXT_CONFIGS from /src/features/feed/types/timeline-types.ts
// ----------------------

/**
 * Determines if AdminPostCard should be used instead of PostCard
 * @param context Timeline context type
 * @returns boolean indicating card type to use
 */
function shouldUseAdminCard(context: TimelineContext): boolean {
  return TIMELINE_CONTEXT_CONFIGS[context].useAdminCard;
}



/**
 * Gets context-specific CSS classes for timeline container
 * @param context Timeline context type
 * @returns CSS class string
 */
function getContextClasses(context: TimelineContext): string {
  return TIMELINE_CONTEXT_CONFIGS[context].contextClasses;
}

// ----------------------
// Loading Skeleton Component
// Purpose: Consistent loading state across contexts
// ----------------------
function TimelineSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={`skeleton-${index}`} className="rounded-2xl border border-border/50 bg-card overflow-hidden animate-pulse">
          <div className="px-4 pt-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-muted rounded-full" />
            <div className="flex-1">
              <div className="h-4 bg-muted rounded w-24 mb-2" />
              <div className="h-3 bg-muted rounded w-16" />
            </div>
          </div>
          <div className="px-4 py-3">
            <div className="h-5 bg-muted rounded w-3/4 mb-2" />
            <div className="h-4 bg-muted rounded w-full" />
          </div>
          <div className="aspect-video bg-muted" />
          <div className="px-4 pb-4 pt-3">
            <div className="flex gap-6">
              <div className="h-4 bg-muted rounded w-12" />
              <div className="h-4 bg-muted rounded w-12" />
              <div className="h-4 bg-muted rounded w-12" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ----------------------
// Empty State Component
// Purpose: Consistent empty state across contexts
// ----------------------
interface EmptyStateProps {
  context: TimelineContext;
  message?: string;
}

function EmptyState({ context, message }: EmptyStateProps) {
  // ----------------------
  // Get default message from centralized configuration
  // Configuration: TIMELINE_CONTEXT_CONFIGS from /src/features/feed/types/timeline-types.ts
  // ----------------------
  const displayMessage = message || TIMELINE_CONTEXT_CONFIGS[context].defaultEmptyMessage;

  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
        <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012 2v2M7 7h10" />
        </svg>
      </div>
      <h3 className="text-lg font-medium text-foreground mb-2">No posts yet</h3>
      <p className="text-muted-foreground max-w-sm">
        {displayMessage}
      </p>
    </div>
  );
}

// ----------------------
// Main Timeline Component
// Purpose: Context-driven feed rendering with consistent spacing
// ----------------------
export default function Timeline({
  views,
  context,
  openPricingPlansModal,
  className,
  isLoading = false,
  emptyMessage
}: TimelineProps) {
  // ----------------------
  // Loading State
  // ----------------------
  if (isLoading) {
    return (
      <div className={cn("timeline-container", getContextClasses(context), className)}>
        <TimelineSkeleton />
      </div>
    );
  }

  // ----------------------
  // Empty State
  // ----------------------
  if (!views || views.length === 0) {
    return (
      <div className={cn("timeline-container", getContextClasses(context), className)}>
        <EmptyState context={context} message={emptyMessage} />
      </div>
    );
  }

  // ----------------------
  // Main Timeline Render
  // V2 Feed List Container - Single source of spacing truth
  // List owns ALL vertical spacing via gap-6, cards have no outer margins
  // ----------------------
  return (
    <div className={cn("timeline-container", getContextClasses(context), className)}>
      <ul className="flex flex-col gap-6">
        {views.map((view) => {
          // ----------------------
          // Context-Driven Card Rendering
          // Admin context uses AdminPostCard component
          // Profile/Self contexts use PostCard with context awareness
          // ----------------------
          
          if (shouldUseAdminCard(context)) {
            // ----------------------
            // Admin Context: Use AdminPostCard component
            // Component: AdminPostCard from /src/features/admin/components/AdminPostCard.tsx
            // ----------------------
            return (
              <li key={view.id}>
                <AdminPostCard
                  view={view as AdminPostView}
                />
              </li>
            );
          }

          // ----------------------
          // Standard PostCard Rendering
          // Profile and Self contexts use regular PostCard
          // Context passed for header visibility control
          // ----------------------
          return (
            <li key={view.id}>
              <PostCard
                view={view}
                openPricingPlansModal={openPricingPlansModal || (() => {})}
                size={context === "self" ? "compact" : "default"}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

// ----------------------
// Export Types for External Use
// ----------------------
export type { TimelineProps };

/* End of Timeline Component */