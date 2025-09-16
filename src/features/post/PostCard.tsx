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
  const kind = view.media?.type ?? "none";
  const src = view.media?.url ?? "";
  const poster = view.media?.thumbnailUrl ?? "";
  const previewUrl =
    view.media?.thumbnailUrl ??
    view.media?.url ??
    "/placeholder.svg"; // safe fallback

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

  // unified spacing tokens (keep rhythm identical across states)
  const paddingX = compact ? "px-3" : "px-4";
  const headerPad = compact ? "pt-3" : "pt-4";
  const bodyPadT = compact ? "pt-1.5" : "pt-2";
  const footerPadB = compact ? "pb-3" : "pb-4";

  return (
    <BasePostCard.Root post={view} className={featured ? "border-2 border-blue-200" : undefined}>
      {/* ---------------------- */}
      {/* Header Section */}
      {/* Location: BasePostCard.Header compound component */}
      {/* ---------------------- */}
      <BasePostCard.Header className={`${paddingX} ${headerPad}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {p.author.avatar && (
              <img
                src={p.author.avatar}
                alt={p.author.name}
                className="w-10 h-10 rounded-full object-cover"
              />
            )}
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-foreground">{p.author.name}</span>
                {p.author.verified && (
                  <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              {p.author.handle && (
                <span className="text-sm text-muted-foreground">{p.author.handle}</span>
              )}
              {p.createdAt && (
                <span className="text-sm text-muted-foreground"> • {formatRelativeTime(p.createdAt)}</span>
              )}
            </div>
          </div>
        </div>
      </BasePostCard.Header>

      {/* ---------------------- */}
      {/* Media Section */}
      {/* Purpose: Display media content or locked state */}
      {/* ---------------------- */}
      <BasePostCard.Media>
        {p.gate.locked ? (
          <div className="relative aspect-[16/9] overflow-hidden rounded-lg bg-gradient-to-br from-gray-900 to-gray-800">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
              <div className="w-12 h-12 mb-4 rounded-full bg-white/20 flex items-center justify-center">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Premium Content</h3>
              <p className="text-sm text-gray-300 mb-4 text-center px-4">
                {p.gate.priceLabel ? `Unlock for ${p.gate.priceLabel}` : 'Subscription required'}
              </p>
            </div>
            {p.media.previewUrl && (
              <img
                src={p.media.previewUrl}
                alt={p.title}
                className="h-full w-full object-cover opacity-30"
                loading="lazy"
              />
            )}
          </div>
        ) : (
          <div className="relative aspect-[16/9] overflow-hidden rounded-lg bg-black">
            {p.media.kind === "video" ? (
              <video
                src={p.media.src}
                poster={p.media.poster}
                controls
                className="h-full w-full"
                preload="metadata"
              />
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



    </BasePostCard.Root>
  );
}

/* End of Unified PostCard Component */