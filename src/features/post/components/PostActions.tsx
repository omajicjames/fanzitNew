// ----------------------
// Post Actions Component
// Location: /src/features/post/components/PostActions.tsx
// Purpose: 3-dots trigger + inline panel with Save/Share/Report actions
// Parent: BasePostCard.Header (trigger) and BasePostCard.InlinePanel (panel)
// ----------------------

import React from 'react';
import {
  MoreHorizontal,
  Bookmark,
  Share,
  Flag,
  Copy,
  Download,
} from 'lucide-react';
import { Button } from '@src/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@src/components/ui/dropdown-menu';
import { cn } from '@src/lib/utils';
import { PostView, PostActionType } from '../types';
import { toggleActions } from '@src/features/post-actions/registry';

// ----------------------
// Post Action Interface
// ----------------------

interface PostAction {
  /** Action type identifier */
  type: PostActionType;
  /** Display label */
  label: string;
  /** Icon component */
  icon: React.ComponentType<{ className?: string }>;
  /** Action handler */
  onClick: () => void;
  /** Whether action is destructive */
  destructive?: boolean;
  /** Whether action requires confirmation */
  requiresConfirmation?: boolean;
}

// ----------------------
// Post Actions Props
// ----------------------

interface PostActionsProps {
  /** Post data */
  post: PostView;
  /** Save/bookmark handler */
  onSave?: () => void;
  /** Share handler */
  onShare?: () => void;
  /** Report handler */
  onReport?: () => void;
  /** Copy link handler */
  onCopyLink?: () => void;
  /** Download handler */
  onDownload?: () => void;
  /** Optional CSS class name */
  className?: string;
  /** Whether to show inline panel instead of dropdown */
  useInlinePanel?: boolean;
}

/**
 * Post actions component with 3-dots trigger and action menu
 * Provides Save/Share/Report functionality for all post variants
 */
export function PostActions({
  post,
  onSave,
  onShare,
  onReport,
  onCopyLink,
  onDownload,
  className,
  useInlinePanel = false,
}: PostActionsProps) {

  // ----------------------
  // Action Configuration
  // ----------------------
  
  const actions: PostAction[] = [
    {
      type: 'bookmark',
      label: 'Save post',
      icon: Bookmark,
      onClick: () => {
        onSave?.();
      },
    },
    {
      type: 'share',
      label: 'Share post',
      icon: Share,
      onClick: () => {
        onShare?.();
      },
    },
  ];

  // Add copy link if handler provided
  if (onCopyLink) {
    actions.push({
      type: 'share',
      label: 'Copy link',
      icon: Copy,
      onClick: () => {
        onCopyLink();
      },
    });
  }

  // Add download if handler provided and media exists
  if (onDownload && post.media?.url) {
    actions.push({
      type: 'share',
      label: 'Download',
      icon: Download,
      onClick: () => {
        onDownload();
      },
    });
  }

  // Add separator and report action
  if (onReport) {
    actions.push({
      type: 'report',
      label: 'Report post',
      icon: Flag,
      onClick: () => {
        onReport();
      },
      destructive: true,
      requiresConfirmation: true,
    });
  }

  // ----------------------
  // 3-Dots Trigger Component
  // ----------------------
  
  const ActionTrigger = ({ onClick: customOnClick }: { onClick?: () => void }) => (
    <Button
      variant="ghost"
      size="sm"
      className={cn(
        // Mobile-first styling
        'h-8 w-8 p-0',
        'text-muted-foreground hover:text-foreground',
        'hover:bg-accent',
        'transition-colors duration-200',
        // Touch-friendly on mobile
        'sm:h-6 sm:w-6',
        className
      )}
      onClick={customOnClick || (() => {
        if (useInlinePanel) {
          toggleActions(post.id);
        }
      })}
      aria-label="Post actions menu"
    >
      <MoreHorizontal className="h-4 w-4" />
    </Button>
  );

  // ----------------------
  // Dropdown Menu Component
  // ----------------------
  
  const ActionDropdown = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <ActionTrigger onClick={undefined} />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className={cn(
          // Mobile-first sizing
          'w-48 sm:w-40',
          'shadow-lg border border-gray-200',
        )}
      >
        {actions.map((action, index) => {
          const Icon = action.icon;
          const isLastBeforeReport = index === actions.length - 2 && actions[actions.length - 1].destructive;
          
          return (
            <React.Fragment key={action.type}>
              <DropdownMenuItem
                onClick={action.onClick}
                className={cn(
                  'flex items-center gap-2 px-3 py-2',
                  'text-sm cursor-pointer',
                  'hover:bg-gray-50',
                  action.destructive && 'text-red-600 hover:text-red-700 hover:bg-red-50',
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{action.label}</span>
              </DropdownMenuItem>
              {isLastBeforeReport && <DropdownMenuSeparator />}
            </React.Fragment>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );

  // ----------------------
  // Note: Inline Panel Component removed
  // The new inline system uses InlineActions component from post-actions registry
  // ----------------------

  // ----------------------
  // Main Render
  // ----------------------
  
  if (useInlinePanel) {
    return <ActionTrigger />;
  }

  return <ActionDropdown />;
}

// ----------------------
// Post Actions Variants
// ----------------------

/**
 * Inline panel variant of post actions
 */
export function PostActionsInlinePanel(props: Omit<PostActionsProps, 'useInlinePanel'>) {
  return <PostActions {...props} useInlinePanel={true} />;
}

/**
 * Dropdown variant of post actions (default)
 */
export function PostActionsDropdown(props: Omit<PostActionsProps, 'useInlinePanel'>) {
  return <PostActions {...props} useInlinePanel={false} />;
}

// ----------------------
// Default Export
// ----------------------

export default PostActions;