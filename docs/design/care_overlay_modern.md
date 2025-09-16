Patch: modern locked overlay
1) Add icons at the top of LockedPostShell.tsx
import { Lock, Crown } from "lucide-react";

2) Make the media wrapper a hover “group”

Find the <img …> in LockedPostShell and give its wrapper the group class (or add it to the outer div that contains the media):

<div ref={ref} className="group relative overflow-hidden rounded-2xl border border-border/50">
  {/* … */}
  <img
    src={previewUrl}
    alt={title}
    className={
      reveal
        ? "h-full w-full object-cover"
        : "h-full w-full object-cover scale-105 blur-[1.5px] brightness-[.78] transition-transform duration-500 group-hover:scale-110"
    }
  />
  {/* … */}
</div>

3) Replace the old lock overlay with this modern glass layer

Locate the block that renders when !reveal and swap it for the following:

{!reveal && (
  <>
    {/* Subtle scrims + radial frosted mask */}
    <div className="pointer-events-none absolute inset-0">
      {/* bottom-to-top gradient for legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/25 to-transparent" />
      {/* frosted spot in the center using a radial mask */}
      <div
        className="absolute inset-0 backdrop-blur-[3px]"
        style={{
          WebkitMaskImage:
            "radial-gradient(55% 55% at 50% 50%, rgba(0,0,0,1) 0%, rgba(0,0,0,.5) 60%, transparent 78%)",
          maskImage:
            "radial-gradient(55% 55% at 50% 50%, rgba(0,0,0,1) 0%, rgba(0,0,0,.5) 60%, transparent 78%)",
        }}
      />
    </div>

    {/* Tier + price chips */}
    {typeof priceCents === "number" && priceCents > 0 && (
      <div className="absolute right-3 top-3 rounded-full border border-white/15 bg-black/45 px-2.5 py-1 text-xs text-white backdrop-blur-sm">
        ${(priceCents / 100).toFixed(2)}
      </div>
    )}
    {typeof (props as any).requiredTier === "string" && (props as any).requiredTier !== "free" && (
      <div className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full border border-white/15 bg-black/45 px-2.5 py-1 text-xs text-white backdrop-blur-sm">
        <Crown className="h-3 w-3" />
        {(props as any).requiredTier}
      </div>
    )}

    {/* Center glass CTA */}
    <div className="absolute inset-0 grid place-items-center">
      <button
        onClick={() => {
          track("paywall_cta_click", { postId, priceCents, source: "overlay" });
          if (useV2) setOpen(true);
          else openPricingPlansModal();
        }}
        aria-label={`Unlock "${title}"`}
        className="relative inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/12 px-5 py-2.5 text-white backdrop-blur-md transition-colors hover:bg-white/16 focus:outline-none focus:ring-2 focus:ring-white/30"
      >
        {/* soft glow ring behind the icon */}
        <span className="pointer-events-none absolute -inset-2 -z-10 rounded-full bg-white/10 blur-xl" />
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/12 ring-1 ring-white/20">
          <Lock className="h-4 w-4" />
        </span>
        <span className="text-sm font-medium">
          Premium content · Unlock {typeof priceCents === "number" && priceCents > 0 ? `$${(priceCents/100).toFixed(2)}` : ""}
        </span>
      </button>
    </div>

    {/* Quick Peek helper (optional) */}
    <div className="absolute bottom-3 left-3 text-[11px] text-white/80">
      <button
        className="rounded-full border border-white/15 bg-black/35 px-2 py-1 backdrop-blur-sm hover:bg-black/45"
        onClick={() => setPeekUntil(Date.now() + 1500)}
      >
        Try quick peek
      </button>
    </div>
  </>
)}


That’s it. You now have:

edge-to-edge media with subtle parallax on hover

radial frosted mask (feels “glass,” not just blur)

tier + price chips

clean, in-image glass CTA (no chunky purple bar)

an optional “Quick peek” that uses your existing setPeekUntil

Optional: remove the bottom purple bar

Since the overlay now contains the CTA, you can hide the BottomBar in PostCard.tsx:



The feed will feel cleaner and more modern when the primary CTA lives in the media itself.

Optional tiny fit & finish

Round only the top corners of the media if your card header is dark:

<div className="relative aspect-[16/9] overflow-hidden rounded-t-2xl bg-black">


Ensure the outer card doesn’t add extra margins; keep rhythm in the list (gap-6 on the <ul>).

Quick test flow

Visit a locked post in your feed.

Hover: image scales subtly; center glass CTA appears; chips visible.

Click CTA: if ?paywall_v2=1 it opens the new dialog; otherwise it opens your existing plans modal.

Click “Try quick peek”: reveals for ~1.5s then relocks.

If you want a version with a tiny skeleton shimmer while images load, I can add that as a 10-line variant inside the same shell.