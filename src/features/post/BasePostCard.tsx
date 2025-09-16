// ----------------------
// Base Post Card Component
// Location: /src/features/post/BasePostCard.tsx
// Purpose: Composable base card with named slots for all post variants
// Children: Header, Media, Body, Actions, InlinePanel slots
// ----------------------

import React, { createContext, useContext, ReactNode } from 'react';
import { cn } from '@src/lib/utils';
import { PostView } from './types';

// ----------------------
// Context for Post Data
// ----------------------

interface PostCardContextValue {
  post: PostView;
  showInlineActions: boolean;
  onPostClick?: (post: PostView) => void;
}

const PostCardContext = createContext<PostCardContextValue | null>(null);

/**
 * Hook to access post data within card components
 * @returns Post card context value
 */
export const usePostCard = (): PostCardContextValue => {
  const context = useContext(PostCardContext);
  if (!context) {
    throw new Error('usePostCard must be used within a BasePostCard');
  }
  return context;
};

// ----------------------
// Base Card Container
// ----------------------

interface BasePostCardProps {
  /** Normalized post data */
  post: PostView;
  /** Child slot components */
  children: ReactNode;
  /** Optional CSS class name */
  className?: string;
  /** Click handler for post interaction */
  onClick?: (post: PostView) => void;
  /** Whether to show inline actions panel */
  showInlineActions?: boolean;
}

/**
 * Base post card container with context provider
 * Provides consistent styling and data access for all variants
 */
function BasePostCardRoot({
  post,
  children,
  className,
  onClick,
  showInlineActions = false,
}: BasePostCardProps) {
  const contextValue: PostCardContextValue = {
    post,
    showInlineActions,
    onPostClick: onClick,
  };

  return (
    <PostCardContext.Provider value={contextValue}>
      <article
        className={cn(
          // V2 Base card root: no outer margins, consistent inner styling
          'rounded-2xl border border-border/50 bg-card overflow-hidden',
          className
        )}
        onClick={() => onClick?.(post)}
        role="article"
        aria-labelledby={post?.id ? `post-title-${post.id}` : undefined}
      >
        {children}
      </article>
    </PostCardContext.Provider>
  );
}

// ----------------------
// Header Slot Component
// Location: /src/features/post/BasePostCard.tsx
// Purpose: Contains AuthorHeader and 3-dots menu
// ----------------------

interface HeaderProps {
  /** Left side content (typically AuthorHeader) */
  children: ReactNode;
  /** Right side content (typically 3-dots menu) */
  actions?: ReactNode;
  /** Optional CSS class name */
  className?: string;
}

/**
 * Header slot with author info and actions
 * Uses exact padding: px-4 pt-4
 */
function Header({ children, actions, className }: HeaderProps) {
  return (
    <header
      className={cn(
        // Exact container padding as specified
        'px-4 pt-4',
        'flex items-center justify-between',
        'min-h-[3rem]', // Ensure consistent height
        className
      )}
    >
      <div className="flex-1 min-w-0">
        {children}
      </div>
      {actions && (
        <div className="flex-shrink-0 ml-3">
          {actions}
        </div>
      )}
    </header>
  );
}

// ----------------------
// Media Slot Component
// Location: /src/features/post/BasePostCard.tsx
// Purpose: Image/video content or empty state
// ----------------------

interface MediaProps {
  /** Media content */
  children?: ReactNode;
  /** Optional CSS class name */
  className?: string;
}

/**
 * Media slot for images, videos, or empty state
 * No padding - media extends to card edges
 */
function Media({ children, className }: MediaProps) {
  if (!children) return null;

  return (
    <div
      className={cn(
        // Full width media container
        'relative w-full',
        // Mobile-first responsive aspect ratios
        'aspect-video sm:aspect-[4/3] md:aspect-video',
        'overflow-hidden',
        className
      )}
    >
      {children}
    </div>
  );
}

// ----------------------
// Body Slot Component
// Location: /src/features/post/BasePostCard.tsx
// Purpose: Title and description content
// ----------------------

interface BodyProps {
  /** Body content (title, description) */
  children: ReactNode;
  /** Optional CSS class name */
  className?: string;
}

/**
 * Body slot for title and description
 * Uses exact padding: px-4 py-3
 */
function Body({ children, className }: BodyProps) {
  return (
    <div
      className={cn(
        // Exact container padding as specified
        'px-4 py-3',
        'space-y-2',
        className
      )}
    >
      {children}
    </div>
  );
}

// ----------------------
// Actions Slot Component
// Location: /src/features/post/BasePostCard.tsx
// Purpose: Engagement row or CTA buttons
// ----------------------

interface ActionsProps {
  /** Action content (engagement row or CTAs) */
  children: ReactNode;
  /** Optional CSS class name */
  className?: string;
}

/**
 * Actions slot for engagement or CTA buttons
 * Uses exact padding: px-4 pb-4
 */
function Actions({ children, className }: ActionsProps) {
  return (
    <div
      className={cn(
        // Exact container padding as specified
        'px-4 pb-4',
        'flex items-center justify-between',
        className
      )}
    >
      {children}
    </div>
  );
}

// ----------------------
// Inline Panel Slot Component
// Location: /src/features/post/BasePostCard.tsx
// Purpose: Save/Share/Report panel (mounted once)
// ----------------------

interface InlinePanelProps {
  /** Panel content */
  children: ReactNode;
  /** Whether panel is visible */
  isVisible?: boolean;
  /** Optional CSS class name */
  className?: string;
}

/**
 * Inline panel for additional actions
 * Mounted once below Actions slot
 */
function InlinePanel({ children, isVisible = false, className }: InlinePanelProps) {
  if (!isVisible) return null;

  return (
    <div
      className={cn(
        // Consistent padding with other slots
        'px-4 pb-4',
        'border-t border-gray-100',
        'bg-gray-50',
        // Smooth animation
        'animate-in slide-in-from-top-2 duration-200',
        className
      )}
    >
      {children}
    </div>
  );
}

// ----------------------
// Title Component
// Location: /src/features/post/BasePostCard.tsx
// Purpose: Standardized post title styling
// ----------------------

interface TitleProps {
  /** Title text */
  children: ReactNode;
  /** Optional CSS class name */
  className?: string;
}

/**
 * Standardized title component for consistent typography
 */
function Title({ children, className }: TitleProps) {
  const { post } = usePostCard();
  
  return (
    <h2
      id={`post-title-${post.id}`}
      className={cn(
        // Mobile-first typography
        'text-base font-semibold text-gray-900',
        'sm:text-lg',
        'line-clamp-2',
        'leading-tight',
        className
      )}
    >
      {children}
    </h2>
  );
}

// ----------------------
// Description Component
// Location: /src/features/post/BasePostCard.tsx
// Purpose: Standardized post description styling
// ----------------------

interface DescriptionProps {
  /** Description text */
  children: ReactNode;
  /** Optional CSS class name */
  className?: string;
}

/**
 * Standardized description component for consistent typography
 */
function Description({ children, className }: DescriptionProps) {
  return (
    <p
      className={cn(
        // Mobile-first typography
        'text-sm text-gray-600',
        'sm:text-base',
        'line-clamp-3',
        'leading-relaxed',
        className
      )}
    >
      {children}
    </p>
  );
}



// ----------------------
// Compound Component Export
// ----------------------

/**
 * BasePostCard compound component with named slots
 * Provides consistent structure and styling for all post variants
 */
export const BasePostCard = {
  Root: BasePostCardRoot,
  Header,
  Media,
  Body,
  Actions,
  InlinePanel,
  Title,
  Description,
};

// Default export for convenience
export default BasePostCard;