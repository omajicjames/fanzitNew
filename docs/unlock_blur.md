
1) src/lib/flags.ts

// Tiny client-side flags. URL beats localStorage.
// Usage: ?paywall_v2=1&first_peek=1
export type FlagKey = "paywall_v2" | "first_peek";

const LS = "fx.flags.v1";

function readLS(): Record<string, string> {
  try { return JSON.parse(localStorage.getItem(LS) ?? "{}"); } catch { return {}; }
}
function writeLS(obj: Record<string, string>) {
  localStorage.setItem(LS, JSON.stringify(obj));
}

// Read a flag (client-only). Defaults false on SSR.
export function getFlag(name: FlagKey): boolean {
  if (typeof window === "undefined") return false;
  const params = new URLSearchParams(window.location.search);
  const urlVal = params.get(name);
  if (urlVal !== null) return urlVal === "1" || urlVal === "true";
  const ls = readLS();
  return ls[name] === "1";
}

export function setFlag(name: FlagKey, on: boolean) {
  const ls = readLS();
  ls[name] = on ? "1" : "0";
  writeLS(ls);
}
2) src/lib/analytics.ts

// Console-only analytics stub so you can see the funnel in dev.
type EventName =
  | "paywall_impression"
  | "paywall_cta_click"
  | "paywall_dialog_open"
  | "paywall_unlock_success"
  | "paywall_unlock_error"
  | "paywall_quick_peek";

export function track(name: EventName, props: Record<string, unknown> = {}) {
  // eslint-disable-next-line no-console
  console.log("[analytics]", name, props);
}
3) src/features/paywall/mock/paywallClient.ts

// Mock client: no DB, no Stripe. Persists unlocked posts in localStorage.
export type CheckoutResult = { ok: true } | { ok: false; error: string };

const KEY = "paywall.unlocked.v1";

function readUnlocked(): Set<string> {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return new Set();
    return new Set(JSON.parse(raw) as string[]);
  } catch { return new Set(); }
}
function writeUnlocked(set: Set<string>) {
  localStorage.setItem(KEY, JSON.stringify([...set]));
}

export function isUnlocked(postId: string): boolean {
  return readUnlocked().has(postId);
}

export async function simulateCheckout(postId: string, priceCents: number): Promise<CheckoutResult> {
  await new Promise((r) => setTimeout(r, 800 + Math.random() * 600)); // fake latency
  const fail = Math.random() < 0.1667; // ~1 in 6 declines to test errors
  if (fail) return { ok: false, error: "Payment declined. Try another method." };
  const set = readUnlocked();
  set.add(postId);
  writeUnlocked(set);
  return { ok: true };
}

export function grantOnePeek(_postId: string): number {
  // Return ms the preview is revealed. Front-end enforced only.
  return 1500;
}
4) src/features/paywall/mutex.ts

// Ensures only one floating pill is active at a time.
let currentOwner: string | null = null;

export function requestPill(id: string): boolean {
  if (currentOwner && currentOwner !== id) return false;
  currentOwner = id;
  return true;
}
export function releasePill(id: string) {
  if (currentOwner === id) currentOwner = null;
}
5) src/features/paywall/components/PaywallPill.tsx

"use client";

import { useEffect, useState } from "react";
import { cn } from "@/src/lib/utils";

type Props = {
  priceCents: number;
  visible: boolean;
  onClick: () => void;
};

export function PaywallPill({ priceCents, visible, onClick }: Props) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let t: any;
    if (visible) t = setTimeout(() => setShow(true), 120);
    else setShow(false);
    return () => t && clearTimeout(t);
  }, [visible]);

  return (
    <div
      aria-hidden={!show}
      className={cn(
        "pointer-events-none fixed inset-x-0 bottom-4 z-[70] flex justify-center transition-opacity",
        show ? "opacity-100" : "opacity-0"
      )}
    >
      <button
        onClick={onClick}
        className="pointer-events-auto rounded-full px-4 py-2 shadow-lg backdrop-blur border border-white/10 bg-background/70 hover:bg-background/90"
        aria-label={`Unlock for $${(priceCents / 100).toFixed(2)}`}
      >
        Unlock for ${(priceCents / 100).toFixed(2)}
      </button>
    </div>
  );
}
6) src/features/paywall/components/PaywallDialog.tsx

"use client";

import { useState } from "react";
import { toast } from "sonner";
import { simulateCheckout, grantOnePeek } from "../mock/paywallClient";
import { getFlag } from "@/src/lib/flags";
import { track } from "@/src/lib/analytics";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type Props = {
  postId: string;
  priceCents: number;
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onUnlocked: () => void;
  onPeek: (ms: number) => void;
  onOpenPlans?: () => void; // hook to your existing plans modal
};

export default function PaywallDialog({
  postId,
  priceCents,
  open,
  onOpenChange,
  onUnlocked,
  onPeek,
  onOpenPlans,
}: Props) {
  const [loading, setLoading] = useState<"unlock" | "invite" | null>(null);
  const peekEnabled = typeof window !== "undefined" && getFlag("first_peek");

  const price = (priceCents / 100).toFixed(2);

  const handleUnlock = async () => {
    setLoading("unlock");
    track("paywall_dialog_open", { postId, priceCents });
    const res = await simulateCheckout(postId, priceCents);
    setLoading(null);
    if (res.ok) {
      toast.success("Unlocked! Enjoy 🎉");
      track("paywall_unlock_success", { postId, priceCents });
      onUnlocked();
      onOpenChange(false);
    } else {
      toast.error(res.error);
      track("paywall_unlock_error", { postId, error: res.error });
    }
  };

  const handlePeek = () => {
    const ms = grantOnePeek(postId);
    track("paywall_quick_peek", { postId, ms });
    toast("Quick peek enabled…");
    onPeek(ms);
    onOpenChange(false);
  };

  const handleOpenPlans = () => {
    onOpenChange(false);
    onOpenPlans?.();
  };

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
            {peekEnabled && (
              <Button
                onClick={handlePeek}
                variant="secondary"
                disabled={loading !== null}
              >
                Quick Peek
              </Button>
            )}
            <Button
              onClick={handleOpenPlans}
              variant="outline"
              disabled={loading !== null}
            >
              View subscription plans
            </Button>
          </div>

          <Button
            onClick={handleUnlock}
            disabled={loading !== null}
            className="min-w-28"
            aria-label={`Unlock for $${price}`}
          >
            {loading === "unlock" ? "Processing…" : `Unlock $${price}`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
7) src/features/paywall/components/LockedPostShell.tsx

"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import PaywallDialog from "./PaywallDialog";
import { PaywallPill } from "./PaywallPill";
import { isUnlocked } from "../mock/paywallClient";
import { getFlag } from "@/src/lib/flags";
import { requestPill, releasePill } from "../mutex";
import { track } from "@/src/lib/analytics";

type Props = {
  postId: string;
  priceCents: number;
  previewUrl: string;
  title: string;
  // Hook for your existing pricing modal
  openPricingPlansModal: () => void;
};

export default function LockedPostShell({
  postId,
  priceCents,
  previewUrl,
  title,
  openPricingPlansModal,
}: Props) {
  const [open, setOpen] = useState(false);
  const [unlocked, setUnlocked] = useState<boolean>(false);
  const [inView, setInView] = useState(false);
  const [peekUntil, setPeekUntil] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  // On mount, see if mock unlocked
  useEffect(() => setUnlocked(isUnlocked(postId)), [postId]);

  // Observe viewport to toggle the floating pill
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
    if (!inView) { releasePill(postId); return; }
    if (!requestPill(postId)) setInView(false);
    return () => releasePill(postId);
  }, [inView, postId]);

  const useV2 = typeof window !== "undefined" && getFlag("paywall_v2");
  const reveal = unlocked || (peekUntil && Date.now() < peekUntil);

  // a11y labels
  const unlockLabel = useMemo(
    () => `Unlock post "${title}" for $${(priceCents / 100).toFixed(2)}`,
    [title, priceCents]
  );

  return (
    <div ref={ref} className="relative overflow-hidden rounded-2xl border border-border/50">
      {/* Media */}
      <div className="aspect-[16/9] bg-black">
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
              else openPricingPlansModal(); // fallback to your existing flow
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

      {/* Caption/footer (your content) */}
      <div className="p-4">
        <h3 className="text-sm font-semibold">{title}</h3>
        <p className="text-xs text-muted-foreground">
          Learn how to make restaurant-quality pasta at home.
        </p>
      </div>
    </div>
  );
}
