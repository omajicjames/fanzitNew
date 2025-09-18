"use client";

// ----------------------
// Admin Post Card Component
// Location: /src/features/admin/components/AdminPostCard.tsx
// Purpose: Specialized card for admin promotional content with locked content support
// Parent: Timeline component with admin context
// Children: BasePostCard slots, AuthorHeader, AdminActions, LockedPostShell
// ----------------------

import React, { useRef } from 'react';
import { BasePostCard } from '@src/features/post/BasePostCard';
import { PostView } from '@src/features/post/types';
import { AdminPostView } from '@src/features/feed/types/timeline-types';
import { formatHandle, formatRelativeTime } from '@src/lib/format';
import AuthorHeader, { createAuthorCore } from '@src/components/post/AuthorHeader';
import { AspectRatio } from '@src/components/ui/aspect-ratio';
import SmartVideo from '@src/features/media/SmartVideo';
import { Pin, Share2, Flag, MoreHorizontal } from 'lucide-react';
import { cn } from '@src/lib/utils';
import { LockedPostShell } from '@src/features/paywall/components/LockedPostShell';
import { logger } from '@src/lib/logger';
import Image from 'next/image';

// ----------------------
// Admin Post Card Props
// Purpose: Props interface for admin promotional content
// ----------------------
interface AdminPostCardProps {
  /** Admin post data with promotional metadata */
  view: AdminPostView;
  /** Optional CSS class name */
  className?: string;
  /** Click handler for post interaction */
  onClick?: (post: AdminPostView) => void;
}

// ----------------------
// Admin Actions Component
// Purpose: Simplified action set for admin content (pin/share/report only)
// ----------------------
interface AdminActionsProps {
  postId: string;
  isPinned?: boolean;
  onPin?: (postId: string) => void;
  onShare?: (postId: string) => void;
  onReport?: (postId: string) => void;
}

function AdminActions({ postId, isPinned, onPin, onShare, onReport }: AdminActionsProps) {
  return (
    <div className="flex items-center justify-between">
      {/* ---------------------- */}
      {/* Admin Action Buttons */}
      {/* Purpose: Clean separation of admin actions (no paywall/engagement) */}
      {/* ---------------------- */}
      <div className="flex items-center space-x-6">
        {/* Pin Action */}
        <button
          type="button"
          onClick={() => onPin?.(postId)}
          className={cn(
            "flex items-center space-x-2 text-sm transition-colors",
            isPinned 
              ? "text-blue-600 hover:text-blue-700" 
              : "text-zinc-400 hover:text-zinc-100"
          )}
          aria-label={isPinned ? "Unpin post" : "Pin post"}
        >
          <Pin className={cn("h-4 w-4", isPinned && "fill-current")} />
          <span>{isPinned ? "Pinned" : "Pin"}</span>
        </button>

        {/* Share Action */}
        <button
          type="button"
          onClick={() => onShare?.(postId)}
          className="flex items-center space-x-2 text-sm text-zinc-400 hover:text-zinc-100 transition-colors"
          aria-label="Share post"
        >
          <Share2 className="h-4 w-4" />
          <span>Share</span>
        </button>
      </div>

      {/* ---------------------- */}
      {/* Admin Menu Button */}
      {/* Purpose: Additional admin options */}
      {/* ---------------------- */}
      <button
        type="button"
        onClick={() => onReport?.(postId)}
        className="inline-flex items-center justify-center rounded-full p-2 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500/60"
        aria-label="More admin options"
      >
        <MoreHorizontal className="h-5 w-5" />
      </button>
    </div>
  );
}

// ----------------------
// Admin Badge Component
// Purpose: Visual indicator for admin content
// ----------------------
interface AdminBadgeProps {
  category?: 'announcement' | 'promotion' | 'update' | 'feature';
  priority?: 'high' | 'medium' | 'low';
}

function AdminBadge({ category = 'announcement', priority = 'medium' }: AdminBadgeProps) {
  const badgeStyles = {
    announcement: "bg-blue-100 text-blue-800 border-blue-200",
    promotion: "bg-green-100 text-green-800 border-green-200",
    update: "bg-purple-100 text-purple-800 border-purple-200",
    feature: "bg-orange-100 text-orange-800 border-orange-200"
  };

  const priorityIndicator = priority === 'high' ? '🔥' : priority === 'medium' ? '📢' : '💬';

  return (
    <div className={cn(
      "inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border",
      badgeStyles[category]
    )}>
      <span>{priorityIndicator}</span>
      <span className="capitalize">{category}</span>
    </div>
  );
}

// ----------------------
// Presentation Logic
// Purpose: Normalize admin post data for display
// ----------------------
function deriveAdminPresentation(view: AdminPostView) {
  const id = String(view.id);
  const title = view.title ?? "Admin Announcement";
  const subtitle = view.subtitle ?? "";

  const author = {
    name: view.author?.name ?? "FanZit Team",
    avatar: view.author?.avatarUrl ?? "/placeholder-logo.svg",
    handle: view.author?.username ? formatHandle(view.author.username) : "@fanzit",
    verified: true, // Admin posts are always verified
  };

  const createdAt = view.createdAt;

  // Media handling with design system compliance
  const kind = view.media?.type ?? "image";
  const src = view.media?.url ?? "/placeholder.svg";
  const poster = view.media?.thumbnailUrl ?? "";
  const previewUrl = view.media?.thumbnailUrl ?? view.media?.url ?? "/placeholder.svg";

  // Admin metadata
  const adminMeta = view.adminMeta ?? {};
  const isPinned = adminMeta.pinned ?? false;
  const category = adminMeta.category ?? 'announcement';
  const priority = adminMeta.priority ?? 'medium';

  return {
    id,
    title,
    subtitle,
    author,
    createdAt,
    media: { kind, src, poster, previewUrl },
    admin: { isPinned, category, priority },
  };
}

// ----------------------
// Main AdminPostCard Component
// Purpose: Admin-optimized post card with promotional styling
// Design: Outer card owns border/radius; media is flush (no inner border)
// ----------------------
export default function AdminPostCard({ view, className, onClick }: AdminPostCardProps) {
  const p = deriveAdminPresentation(view);
  const postCardRef = useRef<HTMLElement>(null);

  // ----------------------
  // Locked Content Detection
  // Purpose: Check if admin post has locked content
  // ----------------------
  const isLocked = view.kind === "locked" || (view.premium?.locked ?? false);
  
  // ----------------------
  // Admin Action Handlers
  // Purpose: Handle admin-specific actions
  // ----------------------
  const handlePin = (postId: string) => {
    logger.info(`Admin pin action: ${postId}`, 'AdminPostCard');
    // TODO: Implement pin functionality
  };

  const handleShare = (postId: string) => {
    logger.info(`Admin share action: ${postId}`, 'AdminPostCard');
    // TODO: Implement share functionality
  };

  const handleReport = (postId: string) => {
    logger.info(`Admin report action: ${postId}`, 'AdminPostCard');
    // TODO: Implement admin options menu
  };

  // ----------------------
  // Locked Content Handlers
  // Purpose: Handle paywall interactions for locked admin content
  // ----------------------
  const handleUnlock = () => {
    logger.info(`Admin locked content unlock requested: ${view.id}`, 'AdminPostCard');
    onClick?.(view);
  };

  const handleUpgrade = () => {
    logger.info(`Admin locked content upgrade requested: ${view.id}`, 'AdminPostCard');
    // Open pricing modal or redirect to upgrade page
  };

  // ----------------------
  // Render Locked Content Shell
  // Purpose: Display locked admin content with admin styling
  // ----------------------
  if (isLocked) {
    return (
      <div className={cn(
        "border-2 border-blue-200/50 bg-gradient-to-br from-card to-blue-50/20",
        "shadow-sm hover:shadow-md transition-shadow duration-200 rounded-lg overflow-hidden",
        className
      )}>
        {/* Admin Badge for Locked Content */}
        <div className="px-4 pt-4 pb-2">
          <div className="flex items-center justify-between">
            <AdminBadge category={p.admin.category} priority={p.admin.priority} />
            <div className="text-xs text-muted-foreground font-medium">
              Admin Content
            </div>
          </div>
        </div>
        
        {/* Locked Post Shell with Admin Context */}
         <LockedPostShell
           postId={view.id}
           title={p.title}
           requiredTier={(view.premium?.tier === "pro" || view.premium?.tier === "vip") ? "premium" : (view.premium?.tier ?? "premium")}
           previewImage={p.media?.previewUrl}
           className="border-0 bg-transparent shadow-none"
         />
      </div>
    );
  }

  return (
    <BasePostCard.Root 
      ref={postCardRef} 
      post={view} 
      className={cn(
        // Admin card styling with enhanced border for prominence
        "border-2 border-blue-200/50 bg-gradient-to-br from-card to-blue-50/20",
        "shadow-sm hover:shadow-md transition-shadow duration-200",
        className
      )}
      onClick={() => onClick?.(view)}
    >
      {/* ---------------------- */}
      {/* Header Section with Admin Badge */}
      {/* Location: BasePostCard.Header compound component */}
      {/* ---------------------- */}
      <BasePostCard.Header 
        className="px-4 pt-4"
        actions={
          <div className="flex items-center gap-2">
            <AdminBadge category={p.admin.category} priority={p.admin.priority} />
          </div>
        }
      >
        {/* ---------------------- */}
        {/* AuthorHeader Component */}
        {/* Component: AuthorHeader from /src/components/post/AuthorHeader.tsx */}
        {/* Purpose: Admin author display with verification badge */}
        {/* ---------------------- */}
        <AuthorHeader
          author={createAuthorCore({
            name: p.author.name,
            username: p.author.handle,
            avatarUrl: p.author.avatar,
            verified: p.author.verified,
          })}
          createdAt={p.createdAt}
          showVerified={true}
          className="text-sm"
        />
      </BasePostCard.Header>

      {/* ---------------------- */}
      {/* Media Section */}
      {/* Design: Flush media with no inner border (design system compliance) */}
      {/* ---------------------- */}
      {p.media.src && (
        <BasePostCard.Media>
          <AspectRatio ratio={16 / 9} className="bg-muted">
            {p.media.kind === "video" ? (
              <SmartVideo
                src={p.media.src}
                poster={p.media.poster}
                className="w-full h-full object-cover"
                controls
              />
            ) : (
              <Image
                src={p.media.previewUrl}
                alt={p.title}
                fill
                className="object-cover"
              />
            )}
          </AspectRatio>
        </BasePostCard.Media>
      )}

      {/* ---------------------- */}
      {/* Body Section */}
      {/* Purpose: Title and description with admin styling */}
      {/* ---------------------- */}
      <BasePostCard.Body className="px-4 py-3">
        <BasePostCard.Title className="text-lg font-semibold text-foreground mb-2">
          {p.title}
        </BasePostCard.Title>
        {p.subtitle && (
          <BasePostCard.Description className="text-muted-foreground">
            {p.subtitle}
          </BasePostCard.Description>
        )}
      </BasePostCard.Body>

      {/* ---------------------- */}
      {/* Actions Section */}
      {/* Purpose: Admin-specific actions (pin/share/report only) */}
      {/* ---------------------- */}
      <BasePostCard.Actions className="px-4 pb-4">
        <AdminActions
          postId={p.id}
          isPinned={p.admin.isPinned}
          onPin={handlePin}
          onShare={handleShare}
          onReport={handleReport}
        />
      </BasePostCard.Actions>
    </BasePostCard.Root>
  );
}

// ----------------------
// Export Types
// ----------------------
export type { AdminPostCardProps };

/* End of AdminPostCard Component */