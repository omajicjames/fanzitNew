"use client";

/**
 * ONE CARD POLICY (READ THIS FIRST)
 * ---------------------------------------------------------------
 * - This is the ONLY post card. Do NOT create new card components.
 * - Do NOT import from `src/features/post/variants/*` anywhere.
 * - All visuals/states must be handled HERE by branching on `view`.
 * - Feed pages render THIS component exclusively.
 *
 * If you need a new look: add a prop or a branch; do not make a new file.
 * See the `derivePresentation(view)` function below—extend it there.
 */

import { BasePostCard } from "./BasePostCard";
import { formatHandle, formatRelativeTime } from "@src/lib/format";
import LockedBranch from "@src/features/paywall/LockedBranch";
import SmartVideo from "@src/features/media/SmartVideo";
import AuthorHeader, { createAuthorCore } from "@src/components/post/AuthorHeader";
import { AspectRatio } from "@src/components/ui/aspect-ratio";
import { toggleActions, usePostActionsOpen, closeAll } from "@src/features/post-actions/registry";
import { InlineActions } from "@src/features/post-actions/InlineActions";
import { MoreHorizontal } from "lucide-react";
import { useEffect, useRef } from "react";

import { PostView } from "./types";

// ----------------------
// PostView Type imported from types.ts
// Location: /src/features/post/types.ts
// Purpose: Single source of truth for post data structure
// ----------------------

// ----------------------
// Component Props
// Location: /src/features/post/PostCard.tsx
// Purpose: Props interface for unified PostCard component
// ----------------------
type Props = {
  view: PostView;
  openPricingPlansModal: () => void;     // your existing modal opener
  size?: "default" | "compact" | "featured"; // style tweak, no new files
};

// ----------------------
// Presentation Logic
// Location: /src/features/post/PostCard.tsx
// Purpose: Normalize everything the UI needs. Extend this instead of making variants.
// ----------------------
/** Normalize everything the UI needs. Extend this instead of making variants. */
function derivePresentation(view: PostView) {
  const id = String(view.id);
  const title = view.title ?? "Untitled";
  const subtitle = view.subtitle ?? "";

  const author = {
    name: view.author?.name ?? "Creator",
    avatar: view.author?.avatarUrl,
    handle: view.author?.username ? formatHandle(view.author.username) : undefined,
    verified: !!view.author?.verified,
  };

  const createdAt = view.createdAt;

  // Media
  const kind = view.media?.type ?? "image";
  const src = view.media?.url ?? "/fitness-workout-banner.svg"; // Mock fitness image for testing overlay transparency
  const poster = view.media?.thumbnailUrl ?? "";
  const previewUrl =
    view.media?.thumbnailUrl ??
    view.media?.url ??
    "/fitness-workout-banner.svg"; // Mock fitness image fallback

  // Gating
  const priceRaw = (view.premium?.priceCents ?? 0) as any;
  const priceCents = Number(priceRaw) || 0;
  const requiresTier = (view.premium?.tier ?? null) as null | string;

  // "Locked" if explicitly locked, or a tier beyond free, or an explicit price
  const locked =
    Boolean(view.premium?.locked) ||
    (!!requiresTier && requiresTier !== "free") ||
    priceCents > 0;

  return {
    id,
    title,
    subtitle,
    author,
    createdAt,
    media: { kind, src, poster, previewUrl },
    gate: {
      locked,
      priceCents,
      tier: requiresTier,
      priceLabel: priceCents ? `$${(priceCents / 100).toFixed(2)}` : undefined,
      tierLabel: requiresTier ?? undefined,
    },
  };
}

// ----------------------
// Unified PostCard Component
// Location: /src/features/post/PostCard.tsx
// Purpose: Single post card component handling all variants through conditional rendering
// Children: BasePostCard slots, AuthorHeader, EngagementRow, PostActions, LockedBranch, SmartVideo
// ----------------------
export default function PostCard({ view, openPricingPlansModal, size = "default" }: Props) {
  const p = derivePresentation(view);
  const compact = size === "compact";
  const featured = size === "featured";
  const isOwner = Boolean(view.author?.username); // Determine if current user owns this post - TODO: Add proper ownership logic
  const isOpen = usePostActionsOpen(view.id);
  const postCardRef = useRef<HTMLElement>(null);
  const longPressTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isLongPressRef = useRef(false);

  // unified spacing tokens (keep rhythm identical across states)
  const paddingX = compact ? "px-3" : "px-4";
  const headerPad = compact ? "pt-3" : "pt-4";
  const bodyPadT = compact ? "pt-1.5" : "pt-2";
  const footerPadB = compact ? "pb-3" : "pb-4";

  // ----------------------
  // Outside click detection
  // Closes inline actions when clicking outside the post card
  // ----------------------
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (isOpen && postCardRef.current && !postCardRef.current.contains(event.target as Node)) {
        closeAll();
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  // ----------------------
  // ESC key detection
  // Closes inline actions when ESC key is pressed
  // ----------------------
  useEffect(() => {
    function handleEscKey(event: KeyboardEvent) {
      if (event.key === 'Escape' && isOpen) {
        closeAll();
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
      return () => document.removeEventListener('keydown', handleEscKey);
    }
  }, [isOpen]);

  // ----------------------
  // Mobile long press handlers
  // Handles long press on mobile devices for 3-dots button
  // ----------------------
  const handleTouchStart = () => {
    isLongPressRef.current = false;
    longPressTimerRef.current = setTimeout(() => {
      isLongPressRef.current = true;
      toggleActions(view.id);
    }, 500); // 500ms for long press
  };

  const handleTouchEnd = () => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Only handle click if it wasn't a long press
    if (!isLongPressRef.current) {
      toggleActions(view.id);
    }
    isLongPressRef.current = false;
  };

  return (
    <BasePostCard.Root ref={postCardRef} post={view} className={featured ? "border-2 border-blue-200" : undefined}>
      {/* ---------------------- */}
      {/* Header Section */}
      {/* Location: BasePostCard.Header compound component */}
      {/* ---------------------- */}
      <BasePostCard.Header 
        className={`${paddingX} ${headerPad}`}
        actions={
          /* ---------------------- */
          /* 3-Dots Button */
          /* Purpose: Toggle inline actions menu */
          /* Component: Button with MoreHorizontal icon */
          /* ---------------------- */
          <button
            type="button"
            onClick={handleClick}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            aria-expanded={isOpen}
            aria-controls={`post-actions-${view.id}`}
            className="inline-flex items-center justify-center rounded-full p-2 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500/60"
          >
            <MoreHorizontal className="h-5 w-5" aria-hidden />
            <span className="sr-only">More actions</span>
          </button>
        }
      >
        {/* ---------------------- */}
        {/* AuthorHeader Component */}
        {/* Component: AuthorHeader from /src/components/post/AuthorHeader.tsx */}
        {/* Purpose: Clean author display without extra role/title text */}
        {/* ---------------------- */}
        <AuthorHeader
          author={createAuthorCore({
            name: p.author.name,
            username: p.author.handle,
            avatarUrl: p.author.avatar,
            verified: p.author.verified
          })}
          createdAt={p.createdAt}
          variant="regular"
          showVerified={true}
        />
      </BasePostCard.Header>

      {/* ---------------------- */}
      {/* Media Section */}
      {/* Purpose: Display media content or locked state with proper aspect ratio */}
      {/* Component: AspectRatio from /src/components/ui/aspect-ratio.tsx */}
      {/* ---------------------- */}
      <BasePostCard.Media>
        <div className="relative overflow-hidden">  {/* card owns rounding - removed rounded-b-2xl for square bottom */}
          <AspectRatio ratio={16 / 9}>                             {/* controls height */}
            {p.gate.locked ? (
              <LockedBranch
                postId={String(p.id)}
                title={p.title}
                priceCents={p.gate.priceCents || 499}
                previewUrl={p.media.previewUrl}
                openPricingPlansModal={openPricingPlansModal}
                author={{ name: p.author.name, avatar: p.author.avatar, username: p.author.handle }}
                createdAt={String(p.createdAt || new Date().toISOString())}
                requiredTier={p.gate.tier as any}
                className="absolute inset-0"
              />
            ) : (
              <div className="absolute inset-0">
                {p.media.kind === "video" ? (
                  <SmartVideo src={p.media.src} poster={p.media.poster} controls className="h-full w-full" />
                ) : p.media.src ? (
                  <img
                    src={p.media.src}
                    alt={p.title}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">No media</span>
                  </div>
                )}
              </div>
            )}
          </AspectRatio>
        </div>
      </BasePostCard.Media>

      {/* ---------------------- */}
      {/* Body Section */}
      {/* Location: BasePostCard.Title and BasePostCard.Description slots */}
      {/* Purpose: Post title and subtitle content */}
      {/* ---------------------- */}
      <BasePostCard.Body className={`${paddingX} ${bodyPadT}`}>
        <BasePostCard.Title>{p.title}</BasePostCard.Title>
        {p.subtitle && (
          <BasePostCard.Description>{p.subtitle}</BasePostCard.Description>
        )}
      </BasePostCard.Body>

      {/* ---------------------- */}
      {/* Engagement Section */}
      {/* Purpose: Like, comment, share interactions */}
      {/* ---------------------- */}
      <BasePostCard.Actions className={`${paddingX} ${footerPadB}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span className="text-sm">{view.engagement?.likes ?? 0}</span>
            </button>
            <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span className="text-sm">{view.engagement?.comments ?? 0}</span>
            </button>
            <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
              </svg>
              <span className="text-sm">{view.engagement?.shares ?? 0}</span>
            </button>
          </div>
        </div>
      </BasePostCard.Actions>

      {/* ---------------------- */}
      {/* Inline Actions Panel */}
      {/* Component: InlineActions from /src/features/post-actions/InlineActions.tsx */}
      {/* Purpose: Expandable inline actions menu - only shown when isOpen is true */}
      {/* ---------------------- */}
      {isOpen && (
        <div id={`post-actions-${view.id}`} className={`${paddingX} pb-3`}>
          <InlineActions
            postId={view.id}
            isOwner={isOwner}
            onAction={(event) => {
              switch (event.type) {
                case "pin":
                  console.log('Pin post:', view.id);
                  break;
                case "save":
                  console.log('Save post:', view.id);
                  break;
                case "share":
                  console.log('Share post:', view.id);
                  break;
                case "report":
                  console.log('Report post:', view.id);
                  break;
              }
            }}
          />
        </div>
      )}

    </BasePostCard.Root>
  );
}

/* End of Unified PostCard Component */