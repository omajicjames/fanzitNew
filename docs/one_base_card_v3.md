src/features/post/PostCard.tsx
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

import BasePostCard from "@/src/features/post/BasePostCard";
import LockedBranch from "@/src/features/paywall/LockedBranch";
import SmartVideo from "@/src/features/media/SmartVideo";
import AuthorHeader from "@/src/components/post/AuthorHeader";
import EngagementRow from "@/src/features/post/components/EngagementRow";
import PostActions from "@/src/features/post/components/PostActions";
import { formatHandle, formatRelativeTime } from "@/src/lib/format";

// If you already have PostView types elsewhere, you can import and delete this.
// Keeping it here makes the file self-sufficient for AI edits.
export type PostView = {
  id: string | number;
  title?: string;
  subtitle?: string;

  author?: {
    name?: string;
    avatar?: string;
    handle?: string;        // with or without "@"
    verified?: boolean;
  };

  createdAt?: string | number | Date;

  media?: {
    kind?: "image" | "video" | "gallery" | "text";
    src?: string;           // image or video URL
    poster?: string;        // video poster
    thumbnail?: string;     // preview/fallback
  };

  engagement?: {
    likes?: number;
    comments?: number;
    shares?: number;
  };

  premium?: {
    locked?: boolean;                 // true if user hasn't unlocked
    price_cents?: number | string | null; // one-off price (cents)
    tier?: "free" | "premium" | "pro" | string | null; // required tier
  };
};

type Props = {
  view: PostView;
  openPricingPlansModal: () => void;     // your existing modal opener
  size?: "default" | "compact" | "featured"; // style tweak, no new files
};

/** Normalize everything the UI needs. Extend this instead of making variants. */
function derivePresentation(view: PostView) {
  const id = String(view.id);
  const title = view.title ?? "Untitled";
  const subtitle = view.subtitle ?? "";

  const author = {
    name: view.author?.name ?? "Creator",
    avatar: view.author?.avatar,
    handle: view.author?.handle ? formatHandle(view.author.handle) : undefined,
    verified: !!view.author?.verified,
  };

  const createdAt = view.createdAt;

  // Media
  const kind = view.media?.kind ?? (view.media?.src ? "image" : undefined);
  const src = view.media?.src ?? "";
  const poster = view.media?.poster ?? view.media?.thumbnail ?? "";
  const previewUrl =
    view.media?.thumbnail ??
    view.media?.poster ??
    view.media?.src ??
    "/placeholder.svg"; // safe fallback

  // Gating
  const priceRaw = (view.premium?.price_cents ?? 0) as any;
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
    <BasePostCard.Root className={featured ? "border-2 border-blue-200" : undefined}>
      {/* Header */}
      <BasePostCard.Header className={`${paddingX} ${headerPad}`}>
        <AuthorHeader
          name={p.author.name}
          avatar={p.author.avatar}
          handle={p.author.handle ? `@${p.author.handle}` : undefined}
          verified={p.author.verified}
          meta={p.createdAt ? formatRelativeTime(p.createdAt) : undefined}
        />
        <PostActions postId={p.id} />
      </BasePostCard.Header>

      {/* Media: locked uses frosted shell; unlocked renders image/video */}
      <BasePostCard.Media>
        {p.gate.locked ? (
          <LockedBranch
            postId={p.id}
            title={p.title}
            priceCents={p.gate.priceCents || 499} // safe default in dev
            previewUrl={p.media.previewUrl}
            openPricingPlansModal={openPricingPlansModal}
            author={{
              name: p.author.name,
              avatar: p.author.avatar,
              username: p.author.handle,
            }}
            createdAt={p.createdAt}
            requiredTier={p.gate.tier}
          />
        ) : (
          <div className="relative aspect-[16/9] overflow-hidden rounded-lg bg-black">
            {p.media.kind === "video" ? (
              <SmartVideo
                src={p.media.src}
                poster={p.media.poster}
                controls
                className="h-full w-full"
              />
            ) : (
              <img
                src={p.media.src || p.media.poster || p.media.previewUrl}
                alt={p.title}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            )}
          </div>
        )}
      </BasePostCard.Media>

      {/* Body */}
      <BasePostCard.Body className={`${paddingX} ${bodyPadT}`}>
        <BasePostCard.Title>{p.title}</BasePostCard.Title>
        {p.subtitle && (
          <BasePostCard.Description>{p.subtitle}</BasePostCard.Description>
        )}
      </BasePostCard.Body>

      {/* Engagement / actions */}
      <BasePostCard.Actions className={`${paddingX} ${footerPadB}`}>
        <EngagementRow
          postId={p.id}
          likes={view.engagement?.likes ?? 0}
          comments={view.engagement?.comments ?? 0}
          shares={view.engagement?.shares ?? 0}
        />
      </BasePostCard.Actions>

      {/* Optional bottom bar for locked content (kept outside shell for layout parity) */}
      {p.gate.locked && (
        <BasePostCard.BottomBar className={`${paddingX} ${footerPadB}`}>
          <div className="flex w-full items-center gap-3">
            <button
              className="flex-1 rounded-full px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-medium"
              onClick={openPricingPlansModal}
              aria-label={`Upgrade to ${p.gate.tierLabel ?? "premium"} ${p.gate.priceLabel ?? ""}`.trim()}
            >
              {`Upgrade to ${p.gate.tierLabel ?? "premium"} ${p.gate.priceLabel ?? ""}`.trim()}
            </button>
            <button
              className="rounded-full px-4 py-2 border border-white/10 bg-background/60 hover:bg-background/80"
              onClick={() =>
                window.dispatchEvent(new CustomEvent("paywall:preview", { detail: { postId: p.id } }))
              }
              aria-label="Preview"
            >
              Preview
            </button>
          </div>
        </BasePostCard.BottomBar>
      )}
    </BasePostCard.Root>
  );
}

Use this everywhere (one-liner)

In your feed map src/features/feed/components/main-feed.tsx, render only this:

import PostCard from "@/src/features/post/PostCard";

<ul className="flex flex-col gap-6">
  {views.map((v) => (
    <li key={v.id}>
      <PostCard
        view={v}
        openPricingPlansModal={() => (window as any).__openPlans?.()}
      />
    </li>
  ))}
</ul>


That’s it. Now you truly have one card. If AI needs to change the card, it must edit this file, not invent new ones. If you later want hard guards (lint/CI) to forbid variants/*, say the word and I’ll give you the 3-line ESLint rule and stub that make it impossible to regress.