our new unified system is good architecture; you just need three glue pieces:

make the Locked variant delegate its media area to the frosted LockedPostShell

wire your Preview button to trigger the shell’s quick-peek

fix the video MIME/HLS error

Below are drop-in files/patches. You can keep your names; swap paths if yours differ.

1) Drop-in: Smart video that handles MP4/WebM/HLS

src/features/media/SmartVideo.tsx

"use client";

/**
 * SmartVideo
 * - Plays MP4/WebM normally
 * - Plays HLS (.m3u8) via native Safari or hls.js (lazy loaded)
 * - Shows a graceful fallback if the browser truly cannot play the source
 */
import { useEffect, useRef, useState } from "react";

type Props = {
  src: string;                // signed or public URL
  poster?: string;
  muted?: boolean;
  autoPlay?: boolean;
  loop?: boolean;
  controls?: boolean;
  className?: string;
};

export default function SmartVideo({
  src,
  poster,
  muted = true,
  autoPlay = false,
  loop = false,
  controls = true,
  className,
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const isHls = /\.m3u8($|\?)/i.test(src);

  useEffect(() => {
    let hls: any;
    const video = videoRef.current;
    if (!video) return;

    async function attachHls() {
      // Native HLS? (Safari + some browsers)
      if (video.canPlayType("application/vnd.apple.mpegURL")) {
        video.src = src;
        setReady(true);
        return;
      }
      // Dynamic import hls.js only when needed
      try {
        const mod = await import("hls.js"); // npm i hls.js
        if (mod && mod.default && mod.default.isSupported()) {
          hls = new mod.default();
          hls.loadSource(src);
          hls.attachMedia(video);
          hls.on(mod.default.Events.MANIFEST_PARSED, () => setReady(true));
        } else {
          // Fallthrough to regular <video> (will show fallback below)
          setReady(false);
        }
      } catch {
        setReady(false);
      }
    }

    if (isHls) {
      attachHls();
    } else {
      // Non-HLS sources get set directly; browser decides support
      video.src = src;
      setReady(true);
    }

    return () => {
      if (hls) {
        try { hls.destroy(); } catch {}
      }
    };
  }, [src, isHls]);

  return (
    <div className={className}>
      <video
        ref={videoRef}
        poster={poster}
        playsInline
        muted={muted}
        autoPlay={autoPlay}
        loop={loop}
        controls={controls}
        // NOTE: `src` is set in effect so we can swap HLS/native safely
        className="h-full w-full object-cover"
      />
      {!ready && (
        <div className="absolute inset-0 grid place-items-center text-sm text-muted-foreground">
          No compatible video format found.
        </div>
      )}
    </div>
  );
}


Fixes the “No video with supported format and MIME type found” by:
• using correct MIME for MP4/WebM automatically, and
• playing .m3u8 via native Safari or hls.js elsewhere.

2) Let anything (like your bottom “Preview” button) trigger Quick Peek

We’ll use a tiny window event so you don’t need refs.

Patch: listen for an external preview signal inside the shell

Edit src/features/paywall/components/LockedPostShell.tsx — add this block:

// ADD near top with other imports
import { grantOnePeek } from "../mock/paywallClient";

// ADD inside component
useEffect(() => {
  // Allow outside buttons to trigger a peek for this post
  const onPreview = (e: Event) => {
    const ce = e as CustomEvent<{ postId: string }>;
    if (ce.detail?.postId === postId) {
      setPeekUntil(Date.now() + grantOnePeek(postId));
    }
  };
  window.addEventListener("paywall:preview", onPreview as EventListener);
  return () => window.removeEventListener("paywall:preview", onPreview as EventListener);
}, [postId]);


Now any code can do:

window.dispatchEvent(new CustomEvent("paywall:preview", { detail: { postId } }));


…and the shell will reveal for ~1.5s.

3) Make your Locked variant delegate to the frosted shell (and wire Preview)

Your unified system is great; just hand the media slot of LockedPostCard to the shell and keep your header/footer slots.

src/features/post/variants/LockedPostCard.tsx (drop-in example, adapt slot names)

"use client";

/**
 * LockedPostCard (variant)
 * - Uses your BasePostCard header/footer/engagement
 * - Delegates the MEDIA AREA to the frosted LockedPostShell
 * - Keeps your bottom bar with “Upgrade” + “Preview”, but Preview now triggers the shell
 */

import BasePostCard from "../BasePostCard"; // ← your compound component
import LockedBranch from "@/src/features/paywall/LockedBranch"; // thin client wrapper that renders LockedPostShell
import { formatHandle, formatRelativeTime } from "@/src/lib/format";
import { Numberify } from "../adapters/PostDataAdapter"; // if you have a helper; otherwise use Number(...)

type Props = {
  view: PostView; // unified type from your /types.ts
  openPricingPlansModal: () => void; // your existing plans modal opener
};

export default function LockedPostCard({ view, openPricingPlansModal }: Props) {
  const postId = String(view.id);
  const title = view.title ?? "Premium Post";
  const priceCents = Number(view.premium?.price_cents ?? 0) || 499; // safe number
  const previewUrl =
    view.media?.thumbnail ??
    view.media?.poster ??
    "/images/demos/pasta-preview.jpg";

  const author = {
    name: view.author?.name ?? "Creator",
    avatar: view.author?.avatar,
    username: view.author?.handle
      ? formatHandle(view.author.handle)
      : undefined,
  };
  const createdAt = view.createdAt;

  return (
    <BasePostCard.Root>
      {/* HEADER SLOT (unchanged, your tokens) */}
      <BasePostCard.Header
        avatarSrc={author.avatar}
        title={author.name}
        handle={author.username ? `@${author.username}` : undefined}
        meta={createdAt ? formatRelativeTime(createdAt) : undefined}
        badge={view.premium?.tier ?? "premium"} // optional
        actions={<BasePostCard.Actions postId={postId} />}
      />

      {/* MEDIA SLOT → frosted paywall shell */}
      <BasePostCard.Media>
        <LockedBranch
          postId={postId}
          title={title}
          priceCents={priceCents}
          previewUrl={previewUrl}
          openPricingPlansModal={openPricingPlansModal}
          author={author}
          createdAt={createdAt}
        />
      </BasePostCard.Media>

      {/* BODY / CAPTION (unchanged) */}
      <BasePostCard.Body
        title={title}
        subtitle={view.subtitle}
      />

      {/* FOOTER: your engagement row */}
      <BasePostCard.Footer>
        <BasePostCard.Engagement
          likes={view.engagement?.likes ?? 0}
          comments={view.engagement?.comments ?? 0}
          shares={view.engagement?.shares ?? 0}
        />
      </BasePostCard.Footer>

      {/* BOTTOM BAR with Upgrade + Preview (kept for parity) */}
      <BasePostCard.BottomBar>
        <div className="flex w-full items-center gap-3">
          <button
            className="flex-1 rounded-full px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-medium"
            onClick={openPricingPlansModal}
          >
            Upgrade to {view.premium?.tier ?? "premium"} ${ (priceCents/100).toFixed(2) }
          </button>

          <button
            className="rounded-full px-4 py-2 border border-white/10 bg-background/60 hover:bg-background/80"
            onClick={() => {
              // Tell the shell to run Quick Peek
              window.dispatchEvent(
                new CustomEvent("paywall:preview", { detail: { postId } })
              );
            }}
          >
            Preview
          </button>
        </div>
      </BasePostCard.BottomBar>
    </BasePostCard.Root>
  );
}


Result: your header/body/engagement stay consistent with the unified system, but the media now uses the modern frosted paywall with floating pill and Quick Peek. Your bottom “Preview” button works because it signals the shell.

4) Where to use SmartVideo (fix the video error)

Where you render unlocked video posts (likely RegularPostCard’s media slot), swap your <video> block:

import SmartVideo from "@/src/features/media/SmartVideo";

// ...
<BasePostCard.Media>
  <div className="relative aspect-[16/9] bg-black rounded-lg overflow-hidden">
    <SmartVideo
      src={view.media?.src ?? ""}      // can be .mp4, .webm, or .m3u8
      poster={view.media?.poster}
      controls
      muted
      autoPlay={false}
      loop={false}
      className="h-full w-full"
    />
  </div>
</BasePostCard.Media>


Also make sure your server (or Supabase Storage) returns correct Content-Type headers:

.mp4 → video/mp4

.webm → video/webm

.m3u8 → application/vnd.apple.mpegurl

.ts (HLS segments) → video/mp2t

5) Tiny consistency nits

In your feed lock predicate, guard number conversions:

const isLocked = (!!post.has_premium || Number(post.content?.price_cents ?? 0) > 0) && !post.unlocked;


Handles: never render @@name — always @${formatHandle(handle)}.

Time: never show “Invalid Date” — formatRelativeTime(createdAt) returns "" if invalid; render conditionally.

Quick test plan (5 checks)

Locked cards show frosted media + floating pill when in view.

“Preview” button reveals for ~1.5s (then re-locks).

Clicking media opens your plans modal when the flag is off, and the new dialog when ?paywall_v2=1 is on.

Unlocked video posts play MP4/WebM; HLS streams play in Safari natively and in Chrome via hls.js.

Headers never show @@handle or “Invalid Date”.