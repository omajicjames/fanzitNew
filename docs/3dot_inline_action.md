This pack replaces the old 3-dots modal with a compact inline expanding card that shows three actions:

📌 Pin (or Save/Favorite for non-owners)

🔗 Share

⚠️ Report

It is role-aware (creator vs subscriber), mobile-thumb friendly, closes on outside click / ESC / after action, and ensures only one post is open at a time.

1) Add the tiny React-safe registry (no this, no classes)

File: src/features/post-actions/registry.ts

// Lightweight, React-safe store for post action state.
// Ensures only one card is open at a time across the feed.

import { useSyncExternalStore } from "react";

type PostId = string | null;

let openPostId: PostId = null;
const listeners = new Set<() => void>();

function emit() {
  for (const l of listeners) l();
}

// --- Mutators ---
export function openActions(id: string) {
  if (openPostId === id) return;
  openPostId = id;
  emit();
}

export function closeAll() {
  if (openPostId === null) return;
  openPostId = null;
  emit();
}

export function toggleActions(id: string) {
  openPostId === id ? closeAll() : openActions(id);
}

// --- Subscriptions for React ---
function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

function getSnapshot() {
  return openPostId;
}

function getServerSnapshot() {
  return null as PostId; // SSR: nothing open
}

export function usePostActionsOpen(id: string) {
  const current = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return current === id;
}

export function useOpenPostId() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

2) Add the Inline Actions component (3 options, role-aware)

File: src/features/post-actions/InlineActions.tsx

"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { closeAll } from "./registry";
import { toast } from "sonner";

// You can swap these for your shadcn icons or lucide-react icons
import { Pin, Share2, Flag } from "lucide-react";

export type InlineActionsProps = {
  postId: string;
  isOwner: boolean;          // true if viewer owns this post (creator)
  isOpen: boolean;           // from usePostActionsOpen(postId)
  onPin?: () => Promise<void> | void;
  onShare?: () => Promise<void> | void;
  onReport?: () => Promise<void> | void;
};

export default function InlineActions({
  postId,
  isOwner,
  isOpen,
  onPin,
  onShare,
  onReport,
}: InlineActionsProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Close on ESC
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeAll();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target as Node)) {
        closeAll();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen]);

  // Action wrappers with auto-close + toast
  async function handlePin() {
    try {
      await onPin?.();
      toast.success(isOwner ? "Pinned to profile" : "Saved to your favorites");
    } catch {
      toast.error("Could not complete action");
    } finally {
      closeAll();
    }
  }

  async function handleShare() {
    try {
      await onShare?.();
      // Optional: try native share if available
      if (typeof navigator !== "undefined" && "share" in navigator) {
        // Replace with your canonical URL builder
        await (navigator as any).share?.({ url: window.location.href });
      }
      toast.success("Share dialog opened");
    } catch {
      toast.error("Share failed");
    } finally {
      closeAll();
    }
  }

  async function handleReport() {
    try {
      await onReport?.();
      toast.success("Thanks—your report was submitted");
    } catch {
      toast.error("Report failed");
    } finally {
      closeAll();
    }
  }

  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          ref={containerRef}
          key={`actions-${postId}`}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          role="group"
          aria-label="Post actions"
          className="mt-2 rounded-xl border border-zinc-800/60 bg-zinc-900/80 backdrop-blur p-1 shadow-lg"
        >
          <ActionRow icon={<Pin className="h-4 w-4" aria-hidden />} label={isOwner ? "Pin to Profile" : "Save"} onClick={handlePin} />
          <ActionRow icon={<Share2 className="h-4 w-4" aria-hidden />} label="Share" onClick={handleShare} />
          <ActionRow icon={<Flag className="h-4 w-4" aria-hidden />} label="Report" onClick={handleReport} variant="danger" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ActionRow({
  icon,
  label,
  onClick,
  variant = "default",
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void | Promise<void>;
  variant?: "default" | "danger";
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "w-full flex items-center gap-3 rounded-lg px-3 py-2 text-left",
        "transition-colors",
        variant === "danger"
          ? "text-red-400 hover:bg-red-500/10 hover:text-red-300"
          : "text-zinc-200 hover:bg-zinc-800/70 hover:text-white",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500/60",
      ].join(" ")}
    >
      <span className="shrink-0">{icon}</span>
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}

3) Wire it into your post card

Update your post card component (where the 3-dots button lives). Replace the modal logic with the inline version.

Edit: src/components/PostCard.tsx (or your equivalent)

"use client";

import { toggleActions, usePostActionsOpen } from "@/src/features/post-actions/registry";
import InlineActions from "@/src/features/post-actions/InlineActions";
import { MoreHorizontal } from "lucide-react";

type PostCardProps = {
  post: { id: string; ownerId: string; /* ... */ };
  currentUserId?: string | null;
  // handlers that call your real mutations/endpoints:
  onPin?: (postId: string) => Promise<void> | void;
  onShare?: (postId: string) => Promise<void> | void;
  onReport?: (postId: string) => Promise<void> | void;
};

export default function PostCard({ post, currentUserId, onPin, onShare, onReport }: PostCardProps) {
  const isOwner = Boolean(currentUserId && currentUserId === post.ownerId);
  const isOpen = usePostActionsOpen(post.id);

  return (
    <article className="rounded-2xl border border-zinc-800 bg-zinc-900/60">
      {/* header / media / caption here */}

      {/* 3-dots button — make sure it doesn't get blocked by overlays */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation(); // don’t trigger outside-click closers on the card
          toggleActions(post.id);
        }}
        aria-expanded={isOpen}
        aria-controls={`post-actions-${post.id}`}
        className="absolute top-3 right-3 inline-flex items-center justify-center rounded-full p-2 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500/60"
      >
        <MoreHorizontal className="h-5 w-5" aria-hidden />
        <span className="sr-only">More actions</span>
      </button>

      {/* Inline expanding actions */}
      <div id={`post-actions-${post.id}`} className="px-3 pb-3">
        <InlineActions
          postId={post.id}
          isOwner={isOwner}
          isOpen={isOpen}
          onPin={() => onPin?.(post.id)}
          onShare={() => onShare?.(post.id)}
          onReport={() => onReport?.(post.id)}
        />
      </div>
    </article>
  );
}


Notes

Keep the 3-dots button above other layers (z-index) and call e.stopPropagation() to avoid immediate close.

The inline panel mounts inside the card under your caption/media area.

Each action auto-closes and shows a toast.

4) Remove the old modal logic (no dual patterns)

Delete/retire any post-action modal files, hooks, or contexts, e.g.:

src/components/PostActionModal.*

src/hooks/usePostActionModal.*

Remove imports/usage everywhere:

Feed, profile grid, single post page.

If a leftover import is still required by other feature code, temporary shim:

// src/components/PostActionModal.tsx (temporary)
export default function PostActionModal() {
  if (process.env.NODE_ENV !== "production") {
    console.warn("[DEPRECATED] PostActionModal is retired. Use InlineActions instead.");
  }
  return null;
}


Then plan a follow-up commit to delete it entirely.

5) QA checklist

3-dots opens inline menu; only one card can be open (opening another closes the previous).

Tap outside / ESC closes.

After tapping an action, the menu auto-closes and shows a toast.

Creator sees Pin (to profile); subscriber sees Save/Favorite label.

No references to modal remain (grep -R "PostActionModal" → none).

On mobile, thumb can open/close easily; no layout shift pushes content off-screen.

Axe/Lighthouse: no new a11y issues; focus ring appears on keyboard nav.

6) Optional: native share fallback

If you want richer share behavior, in InlineActions.tsx replace the share handler with your canonical URL and metadata logic. The current code already attempts navigator.share when available.

7) Commit message (suggested)
feat(ui): replace post actions modal with inline expanding card (Pin/Share/Report)

- Add React-safe post actions registry (useSyncExternalStore)
- Add InlineActions component with role-aware labels and a11y
- Wire into PostCard and remove legacy modal logic
- Close on outside/ESC and after action; Sonner toasts for feedback