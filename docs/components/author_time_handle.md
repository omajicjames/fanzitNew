Here’s a tight patch that:

adds an optional author/time header to LockedPostShell

fixes the @@handle issue

avoids the “Invalid Date” by safely formatting timestamps

1) Safe format helpers (new)

src/lib/format.ts

// Small, dependency-free helpers

// Strip leading @’s so you never render “@@chefmarco”
export function formatHandle(handle?: string): string {
  if (!handle) return "";
  return handle.replace(/^@+/, "");
}

// “4 hours ago” / “Yesterday” / “Sep 16”
export function formatRelativeTime(input?: string | number | Date): string {
  if (!input) return "";
  const d = new Date(input);
  if (isNaN(d.getTime())) return ""; // avoid "Invalid Date"

  const now = Date.now();
  const diff = Math.max(0, now - d.getTime());

  const sec = Math.floor(diff / 1000);
  const min = Math.floor(sec / 60);
  const hour = Math.floor(min / 60);
  const day = Math.floor(hour / 24);

  if (sec < 45) return "just now";
  if (min < 60) return `${min} ${min === 1 ? "minute" : "minutes"} ago`;
  if (hour < 24) return `${hour} ${hour === 1 ? "hour" : "hours"} ago`;
  if (day === 1) return "yesterday";
  if (day < 7) return `${day} days ago`;

  // Fallback to short date for older posts
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

2) LockedPostShell with optional header (drop-in replacement)

src/features/paywall/components/LockedPostShell.tsx

"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import PaywallDialog from "./PaywallDialog";
import { PaywallPill } from "./PaywallPill";
import { isUnlocked } from "../mock/paywallClient";
import { getFlag } from "@/src/lib/flags";
import { requestPill, releasePill } from "../mutex";
import { track } from "@/src/lib/analytics";

// NEW: helpers for handle/time
import { formatHandle, formatRelativeTime } from "@/src/lib/format";

type Author = { name: string; avatar?: string; username?: string };

type Props = {
  postId: string;
  priceCents: number;
  previewUrl: string;
  title: string;
  openPricingPlansModal: () => void;

  // NEW (optional): author/time for compact header
  author?: Author;
  createdAt?: string | number | Date;
};

export default function LockedPostShell({
  postId,
  priceCents,
  previewUrl,
  title,
  openPricingPlansModal,
  // NEW: optional
  author,
  createdAt,
}: Props) {
  const [open, setOpen] = useState(false);
  const [unlocked, setUnlocked] = useState<boolean>(false);
  const [inView, setInView] = useState(false);
  const [peekUntil, setPeekUntil] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  // Init unlocked from mock store
  useEffect(() => setUnlocked(isUnlocked(postId)), [postId]);

  // Observe viewport for floating pill
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => setInView(entries[0]?.isIntersecting ?? false),
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Pill mutex so only one shows
  useEffect(() => {
    if (!inView) {
      releasePill(postId);
      return;
    }
    if (!requestPill(postId)) setInView(false);
    return () => releasePill(postId);
  }, [inView, postId]);

  const useV2 = typeof window !== "undefined" && getFlag("paywall_v2");
  const reveal = unlocked || (peekUntil && Date.now() < (peekUntil ?? 0));

  // a11y label
  const unlockLabel = useMemo(
    () => `Unlock post "${title}" for $${(priceCents / 100).toFixed(2)}`,
    [title, priceCents]
  );

  // NEW: compute header display safely
  const displayHandle = author?.username ? `@${formatHandle(author.username)}` : "";
  const displayTime = createdAt ? formatRelativeTime(createdAt) : "";

  return (
    <div ref={ref} className="relative overflow-hidden rounded-2xl border border-border/50">
      {/* NEW: Compact author/time header (optional, only renders if data is present) */}
      {(author?.name || displayHandle || displayTime) && (
        <div className="flex items-center gap-3 px-4 pt-4">
          {/* avatar (optional) */}
          {author?.avatar ? (
            // You can swap to next/image
            <img
              src={author.avatar}
              alt={author.name}
              className="h-8 w-8 rounded-full object-cover"
            />
          ) : (
            <div className="h-8 w-8 rounded-full bg-muted" />
          )}

          <div className="min-w-0">
            <div className="flex items-center gap-2 text-sm">
              <span className="font-medium truncate">{author?.name ?? "Creator"}</span>
              {displayHandle && (
                <span className="text-muted-foreground truncate">{displayHandle}</span>
              )}
            </div>

            {/* Avoid "Invalid Date": only render if non-empty */}
            {displayTime && (
              <div className="text-xs text-muted-foreground">{displayTime}</div>
            )}
          </div>
        </div>
      )}

      {/* Media */}
      <div className="mt-3 aspect-[16/9] bg-black">
        <img
          src={previewUrl}
          alt={title}
          className={
            reveal
              ? "h-full w-full object-cover"
              : "h-full w-full object-cover blur-md scale-105 brightness-[.75]"
          }
        />
      </div>

      {/* Overlay when locked */}
      {!reveal && (
        <div className="absolute inset-0 grid place-items-center">
          <button
            onClick={() => {
              track("paywall_impression", { postId, priceCents });
              if (useV2) setOpen(true);
              else openPricingPlansModal(); // fallback to your existing plans modal
            }}
            aria-label={unlockLabel}
            className="pointer-events-auto rounded-2xl backdrop-blur-md bg-background/60 border border-white/10 p-4 text-center"
          >
            <div className="text-base font-medium">Premium content</div>
            <div className="text-xs text-muted-foreground">
              Unlock to view in full quality
            </div>
            <span className="mt-3 inline-flex rounded-full bg-primary px-4 py-2 text-primary-foreground">
              Unlock ${(priceCents / 100).toFixed(2)}
            </span>
          </button>
        </div>
      )}

      {/* Floating pill (v2 only) */}
      {useV2 && !reveal && (
        <PaywallPill
          priceCents={priceCents}
          visible={inView}
          onClick={() => {
            track("paywall_cta_click", { postId, priceCents, source: "pill" });
            setOpen(true);
          }}
        />
      )}

      {/* Dialog (v2 only) */}
      {useV2 && (
        <PaywallDialog
          postId={postId}
          priceCents={priceCents}
          open={open}
          onOpenChange={setOpen}
          onUnlocked={() => setUnlocked(true)}
          onPeek={(ms) => setPeekUntil(Date.now() + ms)}
          onOpenPlans={openPricingPlansModal}
        />
      )}

      {/* Footer – keep minimal so header has room */}
      <div className="px-4 pb-4 pt-3">
        <h3 className="text-sm font-semibold">{title}</h3>
      </div>
    </div>
  );
}

3) Forward the author/time from your wrapper (optional)

If you want this header to show, pass the fields through your wrapper:

src/features/paywall/LockedBranch.tsx (forwarding props)

"use client";

import LockedPostShell from "./components/LockedPostShell";

type Props = {
  postId: string;
  title: string;
  priceCents: number;
  previewUrl: string;
  openPricingPlansModal: () => void;
  author?: { name: string; avatar?: string; username?: string }; // NEW
  createdAt?: string | number | Date;                             // NEW
};

export default function LockedBranch(props: Props) {
  return <LockedPostShell {...props} />;
}


…and keep your feed mapping exactly as you had it (you were already collecting author and createdAt in the wrapper props).