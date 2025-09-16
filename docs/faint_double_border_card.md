The faint rounded border seam above the media

Cause: LockedPostShell (or the media wrapper inside <BasePostCard.Media>) still has its own border + top rounding. The outer card already has a border/radius, so the inner one shows up as a second, curved line.

Fix (one line change where the frosted shell wraps the image):

// BEFORE (common culprit)
<div className="relative overflow-hidden rounded-2xl border border-border/50">

// AFTER (no inner border, no top rounding)
<div className="group relative overflow-hidden rounded-b-2xl border-0">


If your media wrapper (in PostCard.tsx) also has rounding like rounded-lg, switch it to rounded-b-2xl and keep no border. The outer card owns borders/radius; inner media should be flush on top and only round on the bottom.

Quick grep targets:

src/features/paywall/components/LockedPostShell.tsx → remove border and top rounding

src/features/post/PostCard.tsx (Media wrapper) → use rounded-b-2xl, not rounded-* on all sides

2) The stray “Trader” word under the name

What it is: AuthorHeader is rendering an extra role/title string (e.g., role, title, badge, tier, category) in its meta row. That’s why you see Trader before @protraderalex.

Fix at the call site (PostCard header): only pass the props AuthorHeader should render—name, avatar, handle, verified, meta. Nothing else.

// PostCard.tsx (Header)
<AuthorHeader
  name={p.author.name}                       // "Pro Trader Alex"
  avatar={p.author.avatar}
  handle={p.author.handle ? `@${p.author.handle}` : undefined}
  verified={p.author.verified}
  meta={p.createdAt ? formatRelativeTime(p.createdAt) : undefined}
/>


Do NOT pass role, title, badge, tier, or any extra text props to AuthorHeader.
Keep tier/price chips inside the locked overlay (the frosted shell), not in the header.

If AuthorHeader itself supports a subtitle/role prop, hard-ignore it:

// AuthorHeader.tsx (tighten the API)
type Props = {
  name: string;
  avatar?: string;
  handle?: string;
  verified?: boolean;
  meta?: string;       // e.g., "4h ago"
  // ⚠️ deliberately no "role/title/badge" here
};

Quick checklist (takes 2 minutes)

 Remove border and top rounded-* from LockedPostShell outer wrapper.

 Ensure media wrapper in PostCard uses rounded-b-2xl (no top rounding, no border).

 In PostCard header, pass only { name, avatar, handle, verified, meta } to AuthorHeader.

 Don’t render tier/badge text in the header; keep chips in the locked overlay.

After this: the seam disappears, and the “Trader” label goes away. The header shows Pro Trader Alex + blue check + @protraderalex • time, and the locked media shows your modern glass overlay with Pro and $9.99 chips where they belong.