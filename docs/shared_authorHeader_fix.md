You’re right—the cards are each doing their own thing. That’s why you’re seeing two author/time rows and why handle/time styling drifts between cards. Fix it by centralizing the header into one shared component and making all cards consume it.

Here’s a tight, surgical plan you can drop in now:

# 1) Make a single shared AuthorHeader

Create `src/components/post/AuthorHeader.tsx` and move *all* author/handle/time logic into it. Give it a size knob so it can look “regular” (feed) or “compact” (locked).

```tsx
// src/components/post/AuthorHeader.tsx
import { Avatar, AvatarImage, AvatarFallback } from "@/src/components/ui/avatar";
import { formatHandle, formatRelativeTime } from "@/src/lib/format";

export type AuthorCore = {
  name?: string | null;
  username?: string | null; // raw, may have '@'
  avatarUrl?: string | null;
  verified?: boolean | null;
};

type Props = {
  author: AuthorCore;
  createdAt?: string | number | Date;
  variant?: "regular" | "compact"; // lets you match old or new look
  className?: string;
};

export default function AuthorHeader({ author, createdAt, variant = "regular", className }: Props) {
  const handle = author?.username ? `@${formatHandle(author.username)}` : "";
  const time = formatRelativeTime(createdAt);

  const isRegular = variant === "regular";
  const textSize = isRegular ? "text-base" : "text-sm";
  const avatarSize = isRegular ? "h-10 w-10" : "h-6 w-6";
  const gap = isRegular ? "gap-3" : "gap-2";
  const marginBottom = isRegular ? "mb-4" : "mb-3";

  return (
    <div className={`flex items-center ${gap} ${marginBottom} ${textSize} text-muted-foreground ${className ?? ""}`}>
      <Avatar className={avatarSize}>
        <AvatarImage src={author?.avatarUrl ?? undefined} alt={author?.name ?? "Author"} />
        <AvatarFallback className="text-xs">
          {(author?.name || author?.username || "U").charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>

      <div className="flex items-center min-w-0 gap-2">
        <div className="flex items-center min-w-0 gap-1">
          {author?.name ? (
            <span className="font-medium text-foreground truncate">{author.name}</span>
          ) : null}
          {handle ? <span className="truncate">{handle}</span> : null}
          {/* Optional: verified badge if you want parity with some cards */}
          {/* {author?.verified ? <Badge className="ml-1">Verified</Badge> : null} */}
        </div>

        {time && (author?.name || handle) ? <span>•</span> : null}
        {time ? <span className="whitespace-nowrap">{time}</span> : null}
      </div>
    </div>
  );
}
```

# 2) Use it everywhere (and delete duplicates)

## LockedPostShell

* Remove any old/legacy author/time JSX.
* Render `AuthorHeader` once, controlled by your `showAuthorHeader` prop.

```tsx
// BEFORE: (two separate places rendering author/time)
// AFTER:
{showAuthorHeader ? (
  <AuthorHeader
    author={{
      name: author?.name,
      username: author?.username,
      avatarUrl: author?.avatar,
      verified: author?.verified ?? false,
    }}
    createdAt={createdAt}
    variant="compact"  // matches your smaller paywalled look
  />
) : null}
```

## Regular feed card (Post card)

Replace the inline header block with:

```tsx
<AuthorHeader
  author={{
    name: post?.creator?.name,
    username: post?.creator?.handle,
    avatarUrl: post?.creator?.avatar,
    verified: !!post?.creator?.verified,
  }}
  createdAt={post?.timestamp}
  variant="regular"
/>
```

Now both card types show *the same* header component with only a variant switch for sizing.

# 3) Normalize props once

Pick a tiny “author core” interface (like `AuthorCore` above) and map everything to it at the edges (when you read data), not deep inside the components. That way:

* The header never needs to know which card called it.
* You can swap data sources later without touching UI.

# 4) Lock the style delta to variants only

If you want the “regular look” to be the default everywhere, make `variant="regular"` the default (as above) and set `variant="compact"` only in paywalled contexts. No more class-name drift.

# 5) Quick checks to verify it’s fixed

* Search your codebase for `@` + author/time blocks. Remove any leftover duplicates so only `AuthorHeader` renders that row.
* In LockedPostShell, confirm `showAuthorHeader` toggles exactly one header.
* In the feed, scroll a page of mixed cards. Header row should be visually identical across all non-locked posts, and consistently “compact” for locked posts.

# 6) Optional but smart

* Add a Jest/React Testing Library snapshot for `AuthorHeader` in both variants so future changes can’t re-introduce a second header.
* Make a tiny Storybook story with `regular` and `compact` knobs; designers can tweak spacing without touching multiple files.

---

Bottom line: one header component, two size variants, zero duplicates. That removes the visual double-stack and stops each card from freelancing its own author/time look. Next natural consolidation step is to do the same for engagement actions and premium badge so your cards become a base shell with slots rather than three independent snowflakes.
