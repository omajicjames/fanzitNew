here are some modern UI/UX patterns you could explore instead:

1. Micro-Preview Teasers

Instead of just a blur with a lock:

Show looping 1–2 second motion snippets (think TikTok style “sizzle reel”) or a pixelated but animated preview.

User feels like they’re almost tasting the content, which increases desire.

2. Interactive Paywall Layers

Hover/click interaction that peels away part of the blur, revealing a small portion of the locked content before snapping back.

Feels more alive than a static overlay.	
    •	Floating Unlock pill that follows the locked post.
	•	Paywall dialog with: Unlock, One-peek, and Share/Invite (stubbed).
	•	“Checkout” simulated via a mock API that returns success/failure after a delay.
	•	Local unlocked state per post saved in localStorage so refresh still shows it unlocked.
	•	Sonner toasts for feedback. Keyboard/A11y baked in.
	•	A tiny feature flag prop so you can A/B this against your current card.

1) Mock client (no Supabase; pure front-end)
src/features/paywall/mock/paywallClient.ts

// Lightweight mock of a paywall client. No DB. Safe to delete later.
// Uses localStorage for “unlocked posts”.

export type CheckoutResult = { ok: true } | { ok: false; error: string };

const KEY = "paywall.unlocked.v1"; // localStorage key for unlocked post IDs

function readUnlocked(): Set<string> {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return new Set();
    const arr = JSON.parse(raw) as string[];
    return new Set(arr);
  } catch {
    return new Set();
  }
}

function writeUnlocked(set: Set<string>) {
  localStorage.setItem(KEY, JSON.stringify([...set]));
}

export function isUnlocked(postId: string): boolean {
  return readUnlocked().has(postId);
}

export async function simulateCheckout(
  postId: string,
  priceCents: number
): Promise<CheckoutResult> {
  // “Network” lag
  await new Promise((r) => setTimeout(r, 800 + Math.random() * 600));

  // 1-in-6 chance of “payment” failure to test your error states
  const failed = Math.random() < 0.1667;
  if (failed) {
    return { ok: false, error: "Payment was declined. Try another method." };
  }

  const set = readUnlocked();
  set.add(postId);
  writeUnlocked(set);
  return { ok: true };
}

export function grantOnePeek(postId: string): number {
  // Return milliseconds of peek allowance (front-end enforced).
  // Keep it tiny for demo so you see it snap back.
  return 1500;
}

2) Paywall dialog (shadcn/ui + Tailwind)
src/features/paywall/components/PaywallDialog.tsx

"use client";

import { useState } from "react";
import { toast } from "sonner";
import { simulateCheckout, grantOnePeek } from "../mock/paywallClient";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type Props = {
  postId: string;
  priceCents: number; // e.g. 499
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onUnlocked: () => void;
  onPeek: (ms: number) => void; // grant a temporary reveal
};

export default function PaywallDialog({
  postId,
  priceCents,
  open,
  onOpenChange,
  onUnlocked,
  onPeek,
}: Props) {
  const [loading, setLoading] = useState<"unlock" | "invite" | null>(null);

  const handleUnlock = async () => {
    setLoading("unlock");
    const res = await simulateCheckout(postId, priceCents);
    setLoading(null);

    if (res.ok) {
      toast.success("Unlocked! Enjoy 🎉");
      onUnlocked();
      onOpenChange(false);
    } else {
      toast.error(res.error);
    }
  };

  const handlePeek = () => {
    const ms = grantOnePeek(postId);
    toast("You’ve got a quick peek…");
    onPeek(ms);
    onOpenChange(false);
  };

  const handleInvite = () => {
    setLoading("invite");
    // Stub: copy a referral link to clipboard (fake).
    const url = `${location.origin}/r/your-ref-code?post=${postId}`;
    navigator.clipboard.writeText(url).finally(() => {
      setLoading(null);
      toast.success("Referral link copied. Invite 3 friends to unlock!");
      onOpenChange(false);
    });
  };

  const price = (priceCents / 100).toFixed(2);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg">Premium content</DialogTitle>
          <DialogDescription>
            Support the creator and unlock the full post.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          <div className="rounded-2xl border border-border/50 p-3">
            <p className="text-sm text-muted-foreground">
              You’ll get HD media plus any attachments included.
            </p>
          </div>
        </div>

        <DialogFooter className="flex gap-2 sm:justify-between">
          <div className="flex gap-2">
            <Button
              onClick={handlePeek}
              variant="secondary"
              disabled={loading !== null}
            >
              Quick Peek
            </Button>
            <Button
              onClick={handleInvite}
              variant="outline"
              disabled={loading !== null}
            >
              {loading === "invite" ? "Copying…" : "Invite to Unlock"}
            </Button>
          </div>

          <Button
            onClick={handleUnlock}
            disabled={loading !== null}
            className="min-w-28"
          >
            {loading === "unlock" ? "Processing…" : `Unlock $${price}`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

3) Floating Unlock pill
src/features/paywall/components/PaywallPill.tsx

"use client";

import { useEffect, useState } from "react";
import { cn } from "@/src/lib/utils"; // your usual className helper

type Props = {
  priceCents: number;
  visible: boolean;
  onClick: () => void;
};

export function PaywallPill({ priceCents, visible, onClick }: Props) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // small delay so it feels “attached” to the post as it enters viewport
    let t: any;
    if (visible) t = setTimeout(() => setShow(true), 120);
    else setShow(false);
    return () => t && clearTimeout(t);
  }, [visible]);

  return (
    <div
      aria-hidden={!show}
      className={cn(
        "pointer-events-none fixed inset-x-0 bottom-4 z-40 flex justify-center transition-opacity",
        show ? "opacity-100" : "opacity-0"
      )}
    >
      <button
        onClick={onClick}
        className="pointer-events-auto rounded-full px-4 py-2 shadow-lg backdrop-blur border border-white/10 bg-background/70 hover:bg-background/90"
      >
        Unlock for ${(priceCents / 100).toFixed(2)}
      </button>
    </div>
  );
}

4) Wire it into a post card (no data work)
src/features/paywall/components/LockedPostShell.tsx

"use client";

import { useEffect, useRef, useState } from "react";
import { isUnlocked } from "../mock/paywallClient";
import PaywallDialog from "./PaywallDialog";
import { PaywallPill } from "./PaywallPill";

type Props = {
  postId: string;
  priceCents: number;
  previewUrl: string; // tiny, watermarked preview
  title: string;
  // Optional: feature flag to turn this UX on/off
  enableV2?: boolean;
};

/**
 * Wrap your media. When locked, shows overlay, dialog, and floating pill.
 * No DB reads/writes. Unlocks persist via localStorage only.
 */
export default function LockedPostShell({
  postId,
  priceCents,
  previewUrl,
  title,
  enableV2 = true,
}: Props) {
  const [open, setOpen] = useState(false);
  const [unlocked, setUnlocked] = useState(isUnlocked(postId));
  const [inView, setInView] = useState(false);
  const [peekUntil, setPeekUntil] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      setInView(entries[0]?.isIntersecting ?? false);
    }, { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // “peek” expiry
  const reveal = unlocked || (peekUntil && Date.now() < peekUntil);

  return (
    <div ref={ref} className="relative overflow-hidden rounded-2xl border border-border/50">
      {/* Media area */}
      <div className="aspect-[16/9] bg-black">
        {/* preview – you can swap to next/image */}
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

      {/* Overlay (locked) */}
      {!reveal && (
        <div className="pointer-events-none absolute inset-0 grid place-items-center">
          <div className="pointer-events-auto rounded-2xl backdrop-blur-md bg-background/60 border border-white/10 p-4 text-center">
            <div className="text-base font-medium">Premium content</div>
            <div className="text-xs text-muted-foreground">
              Unlock to view in full quality
            </div>
            <button
              onClick={() => setOpen(true)}
              className="mt-3 inline-flex rounded-full bg-primary px-4 py-2 text-primary-foreground"
            >
              Unlock ${(priceCents / 100).toFixed(2)}
            </button>
          </div>
        </div>
      )}

      {/* Floating pill – only for V2 and when locked + inView */}
      {enableV2 && !reveal && (
        <PaywallPill
          priceCents={priceCents}
          visible={inView}
          onClick={() => setOpen(true)}
        />
      )}

      {/* Dialog */}
      <PaywallDialog
        postId={postId}
        priceCents={priceCents}
        open={open}
        onOpenChange={setOpen}
        onUnlocked={() => setUnlocked(true)}
        onPeek={(ms) => setPeekUntil(Date.now() + ms)}
      />

      {/* Footer – your normal caption/metrics, unchanged */}
      <div className="p-4">
        <h3 className="text-sm font-semibold">{title}</h3>
        <p className="text-xs text-muted-foreground">
          Learn how to make restaurant-quality pasta at home.
        </p>
      </div>
    </div>
  );
}
Usage in a page or feed item

<LockedPostShell
  postId="post_abc123"
  priceCents={499}
  previewUrl="/images/demos/pasta-preview.jpg"
  title="Homemade Truffle Pasta Recipe"
  enableV2
/>


The pieces I need to see (so I slot the shell into your real feed)
	1	Your current post UI
	•	src/features/**/PostCard.tsx (or FanzitPost.tsx, FeedPost.tsx)
	•	If media is split out: PostMedia.tsx / VideoPlayer.tsx / ImageBlock.tsx
	•	Any existing lock/paywall layer you already have (even if unused)
	2	Where the feed maps posts
	•	src/features/**/FanzitFeed.tsx (or the page that does posts.map(...))
	•	The page that renders the feed: app/(protected)/page.tsx or app/home/page.tsx (whatever you use for the main feed)
	3	UI primitives used by the shell (to match your shadcn setup)
	•	src/components/ui/dialog.tsx
	•	src/components/ui/button.tsx
	•	src/components/ui/sonner.tsx (or where you mount <Toaster />)
	4	Global scaffolding
	•	app/layout.tsx (so I can confirm <Toaster /> is mounted once)
	•	app/globals.css and tailwind.config.js (for tokens/classes the shell uses)
	5	Small utilities
	•	src/lib/utils.ts (your cn() helper)
	•	If you have feature flags: src/lib/featureFlags.ts (or whatever you call it)
	6	Types & config
	•	Your Post type/interface: src/types/**/post*.ts (or wherever the post shape lives)
	•	next.config.(js|ts) (image remotePatterns—I’ll keep previews working)
	7	Optional (only if you already have these)
	•	Any existing paywall or purchase helpers (to avoid name collisions)
	•	Routing you want for a mock API: app/api/**/route.ts (if you want the “fake checkout” endpoint)

B) Where I’ll add new files (no DB)
I’ll place the mock + components here so they’re easy to delete later:

src/features/paywall/mock/paywallClient.ts
src/features/paywall/components/PaywallDialog.tsx
src/features/paywall/components/PaywallPill.tsx
src/features/paywall/components/LockedPostShell.tsx

C) Tiny assets I’ll reference
	•	One small preview image path you already have (e.g. /images/demos/pasta-preview.jpg) so the card renders immediately.

D) Quick sanity checks (don’t send, just confirm)
	•	You’re using Sonner and it’s mounted once in app/layout.tsx.
	•	shadcn/ui Dialog and Button exist (or I’ll adapt to your components).
	•	No blocking ESLint rules against localStorage in client components (this mock uses it).

