// ----------------------
// Engagement Row Component
// Location: /src/features/post/components/EngagementRow.tsx
// Purpose: Centralized like/comment/share actions for all post variants
// Parent: BasePostCard.Actions slot
// ----------------------

import React from 'react';
import { Heart, MessageCircle, Share, Bookmark } from 'lucide-react';
import { Button } from '@src/components/ui/button';
import { cn } from '@src/lib/utils';
import { PostEngagement, PostActionType } from '../types';

// ----------------------
// Engagement Action Interface
// ----------------------

interface EngagementAction {
  /** Action type identifier */
  type: PostActionType;
  /** Display label */
  label: string;
  /** Icon component */
  icon: React.ComponentType<{ className?: string }>;
  /** Current count */
  count: number;
  /** Whether action is active/selected */
  isActive?: boolean;
  /** Click handler */
  onClick: () => void;
}

// ----------------------
// Engagement Row Props
// ----------------------

interface EngagementRowProps {
  /** Engagement metrics */
  engagement: PostEngagement;
  /** Action handlers */
  onLike?: () => void;
  onComment?: () => void;
  onShare?: () => void;
  onBookmark?: () => void;
  /** Optional CSS class name */
  className?: string;
  /** Compact mode for smaller displays */
  compact?: boolean;
  /** Show bookmark action */
  showBookmark?: boolean;
}

/**
 * Centralized engagement row component
 * Provides consistent like/comment/share/bookmark actions across all post variants
 */
export function EngagementRow({
  engagement,
  onLike,
  onComment,
  onShare,
  onBookmark,
  className,
  compact = false,
  showBookmark = true,
}: EngagementRowProps) {
  // ----------------------
  // Action Configuration
  // ----------------------
  
  const actions: EngagementAction[] = [
    {
      type: 'like',
      label: 'Like',
      icon: Heart,
      count: engagement.likes,
      isActive: engagement.isLiked,
      onClick: onLike || (() => {}),
    },
    {
      type: 'comment',
      label: 'Comment',
      icon: MessageCircle,
      count: engagement.comments,
      onClick: onComment || (() => {}),
    },
    {
      type: 'share',
      label: 'Share',
      icon: Share,
      count: engagement.shares,
      onClick: onShare || (() => {}),
    },
  ];

  // Add bookmark action if enabled
  if (showBookmark && onBookmark) {
    actions.push({
      type: 'bookmark',
      label: 'Bookmark',
      icon: Bookmark,
      count: 0, // Bookmarks don't show count
      isActive: engagement.isBookmarked,
      onClick: onBookmark,
    });
  }

  // ----------------------
  // Format Count Helper
  // ----------------------
  
  const formatCount = (count: number): string => {
    if (count === 0) return '';
    if (count < 1000) return count.toString();
    if (count < 1000000) return `${(count / 1000).toFixed(1)}K`;
    return `${(count / 1000000).toFixed(1)}M`;
  };

  // ----------------------
  // Action Button Component
  // ----------------------
  
  const ActionButton = ({ action }: { action: EngagementAction }) => {
    const Icon = action.icon;
    const showCount = action.type !== 'bookmark' && action.count > 0;
    
    return (
      <Button
        variant="ghost"
        size={compact ? "sm" : "default"}
        className={cn(
          // Mobile-first base styles
          'flex items-center gap-1.5 px-2 py-1.5',
          'text-muted-foreground hover:text-foreground',
          'transition-colors duration-200',
          // Responsive sizing
          compact ? 'text-xs' : 'text-sm',
          // Active state styling
          action.isActive && [
            action.type === 'like' && 'text-red-600 hover:text-red-700',
            action.type === 'bookmark' && 'text-blue-600 hover:text-blue-700',
          ],
          // Touch-friendly sizing on mobile
          'min-h-[2.5rem] sm:min-h-[2rem]',
        )}
        onClick={action.onClick}
        aria-label={`${action.label} (${action.count})`}
      >
        <Icon
          className={cn(
            // Mobile-first icon sizing
            compact ? 'h-4 w-4' : 'h-4 w-4 sm:h-5 sm:w-5',
            // Fill for active states
            action.isActive && action.type === 'like' && 'fill-current',
            action.isActive && action.type === 'bookmark' && 'fill-current',
          )}
        />
        {showCount && (
          <span
            className={cn(
              'font-medium',
              compact ? 'text-xs' : 'text-sm',
            )}
          >
            {formatCount(action.count)}
          </span>
        )}
        {/* Screen reader only text */}
        <span className="sr-only">
          {action.label}
          {showCount && ` (${action.count})`}
        </span>
      </Button>
    );
  };

  // ----------------------
  // Main Render
  // ----------------------
  
  return (
    <div
      className={cn(
        // Mobile-first layout
        'flex items-center justify-between w-full',
        // Responsive spacing
        compact ? 'gap-1' : 'gap-2 sm:gap-4',
        className
      )}
      role="toolbar"
      aria-label="Post engagement actions"
    >
      {/* Left side: Like, Comment, Share */}
      <div
        className={cn(
          'flex items-center',
          compact ? 'gap-1' : 'gap-2'
        )}
      >
        {actions.slice(0, 3).map((action) => (
          <ActionButton key={action.type} action={action} />
        ))}
      </div>

      {/* Right side: Bookmark (if enabled) */}
      {showBookmark && actions.length > 3 && (
        <div className="flex items-center">
          <ActionButton action={actions[3]} />
        </div>
      )}
    </div>
  );
}

// ----------------------
// Engagement Row Variants
// ----------------------

/**
 * Compact engagement row for smaller spaces
 */
export function CompactEngagementRow(props: Omit<EngagementRowProps, 'compact'>) {
  return <EngagementRow {...props} compact={true} />;
}

/**
 * Minimal engagement row without bookmark
 */
export function MinimalEngagementRow(props: Omit<EngagementRowProps, 'showBookmark'>) {
  return <EngagementRow {...props} showBookmark={false} />;
}

// ----------------------
// Default Export
// ----------------------

export default EngagementRow;