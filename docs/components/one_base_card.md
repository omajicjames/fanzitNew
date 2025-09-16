Migration: One Base Card + Thin Variants (Uniform Header/Actions)

Goal: Replace all ad-hoc post cards with one composable BasePostCard and thin variants. Normalize data via a PostView model. Keep title, description, like/comment/share row, 3-dots menu, and inline actions panel in consistent slots. Use the shared AuthorHeader.

1) Create a normalized view model

Create src/features/post/types.ts:

export type PostView = {
  id: string;
  kind: "regular" | "locked" | "profile";
  author: { name?: string; username?: string; avatarUrl?: string; verified?: boolean };
  createdAt?: string | number | Date;
  title?: string;
  subtitle?: string;
  media?: { type: "image" | "video" | "none"; url?: string; durationSec?: number };
  engagement?: { likes: number; comments: number; shares: number };
  premium?: { locked: boolean; tier?: "premium" | "pro"; priceCents?: number };
};


Implement adapters (one file per backend shape) mapping DB rows → PostView. Cards must consume only PostView (never raw DB).

2) Add Base shell with slots (compound components)

Create src/features/post/BasePostCard.tsx with these named slots:

Header (left: AuthorHeader, right: 3-dots trigger)

Media (image/video or empty)

Body (title + description)

Actions (either EngagementRow OR Subscribe/Unlock CTA)

PostActions.InlinePanel (Save/Share/Report panel mounted once, below Actions)

Use the exact container paddings from the snippet: px-4 pt-4, px-4 py-3, px-4 pb-4.

3) Centralize shared bits

AuthorHeader (already implemented): import and use as the only source of truth for author/handle/time; use variant="regular" for feed, variant="compact" for locked. Keep formatting via /src/lib/format.ts.

EngagementRow: one component taking {likes, comments, shares}.

PostActions: 3-dots trigger + inline panel with Save/Share/Report.

PaywallPill / PaywallOverlay: one implementation, gated by post.premium.

4) Build thin variants by composition (no custom layout)

Create:

src/features/post/variants/RegularPostCard.tsx

src/features/post/variants/LockedPostCard.tsx

Both compose BasePostCard and only decide which slots render (e.g., locked swaps EngagementRow for Subscribe/Unlock). No variant may change padding, spacing, or header placement.

5) One factory for selection

Create src/features/post/PostCard.tsx:

export function PostCard({ post }: { post: PostView }) {
  return post.premium?.locked ? <LockedPostCard post={post}/> : <RegularPostCard post={post}/>;
}

6) Replace call sites

In the feed and any grids, construct PostView via adapters, then render <PostCard post={postView} />.

Delete any inline author/time JSX or duplicate headers in existing cards (e.g., remove renderAuthorHeader() in LockedPostShell, and any hand-rolled header in feed cards). Keep only the shared AuthorHeader.

7) Acceptance criteria (must pass)

Every card shows one author row rendered by AuthorHeader, with matching typography/spacing across variants.

Regular cards: Actions slot shows the EngagementRow (like/comment/share). Locked cards: Actions slot shows Subscribe/Unlock. The 3-dots trigger is in the Header for all cards; the inline panel mounts once below Actions.

Time/handle formatting always uses /src/lib/format.ts. No “Invalid Date”, no @@handle edge cases.

No component reads raw DB post shapes; all props flow through PostView.

Snapshot tests for Regular vs Locked confirm identical header structure; Storybook stories exist for both.