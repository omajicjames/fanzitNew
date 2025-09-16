hree things happening at once:

the video element still can’t play some sources,

the locked variant now renders, but your bottom “upgrade/preview” bars and headers give each card different outer spacing,

the list itself isn’t controlling vertical rhythm, so items look “staggered.”

Here’s a clean, surgical fix set.

Fix 1 — Make SmartVideo bulletproof (and truly relative)

Problem: Chrome/Edge need hls.js for .m3u8; your current import may not resolve, and the fallback overlay needs a relative parent. Also if the server returns the wrong Content-Type, native <video> refuses to play and shows the “No video with supported format and MIME type found” message.

Drop-in replacement src/features/media/SmartVideo.tsx

"use client";

import { useEffect, useRef, useState } from "react";

// Minimal class joiner so we don't pull your utils here
function cx(...a: (string | false | null | undefined)[]) {
  return a.filter(Boolean).join(" ");
}

type Props = {
  src: string;                  // .mp4, .webm, or .m3u8
  poster?: string;
  muted?: boolean;
  autoPlay?: boolean;
  loop?: boolean;
  controls?: boolean;
  className?: string;           // wrapper class
  onErrorText?: string;         // optional custom message
};

export default function SmartVideo({
  src,
  poster,
  muted = true,
  autoPlay = false,
  loop = false,
  controls = true,
  className,
  onErrorText = "No compatible video format found.",
}: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [errored, setErrored] = useState(false);

  const isHls = /\.m3u8($|\?)/i.test(src);

  useEffect(() => {
    let hls: any;
    const video = ref.current;
    setReady(false);
    setErrored(false);
    if (!video || !src) return;

    async function attach() {
      try {
        if (isHls) {
          // Native HLS?
          if (video.canPlayType("application/vnd.apple.mpegURL")) {
            video.src = src;
            setReady(true);
            return;
          }
          // Lazy import hls.js only when required
          const { default: Hls } = await import("hls.js"); // pnpm add hls.js
          if (Hls.isSupported()) {
            hls = new Hls({ enableWorker: true });
            hls.loadSource(src);
            hls.attachMedia(video);
            hls.on(Hls.Events.MANIFEST_PARSED, () => setReady(true));
            hls.on(Hls.Events.ERROR, () => setErrored(true));
          } else {
            setErrored(true);
          }
        } else {
          // MP4/WebM
          video.src = src;
          setReady(true);
        }
      } catch {
        setErrored(true);
      }
    }
    attach();

    const onError = () => setErrored(true);
    video.addEventListener("error", onError);
    return () => {
      video.removeEventListener("error", onError);
      if (hls) try { hls.destroy(); } catch {}
    };
  }, [src, isHls]);

  return (
    <div className={cx("relative", className)}>
      <video
        ref={ref}
        poster={poster}
        playsInline
        muted={muted}
        autoPlay={autoPlay}
        loop={loop}
        controls={controls}
        crossOrigin="anonymous"
        className="h-full w-full object-cover"
      />
      {(!ready || errored) && (
        <div className="absolute inset-0 grid place-items-center text-sm text-muted-foreground">
          {onErrorText}
        </div>
      )}
    </div>
  );
}


Also verify the header of your video file:

Open DevTools → Network → click the video request → Headers. You want:

.mp4 → Content-Type: video/mp4

.webm → video/webm

.m3u8 → application/vnd.apple.mpegurl

If you see text/html or a 302/403, the browser won’t play it. For Supabase uploads, set the MIME when uploading:

// when you do wire it later
storage.from("videos").upload(path, file, { contentType: "video/mp4", upsert: true });


Where to use it (guaranteed):

In every place that renders unlocked video (RegularPostCard media slot).

If any other variant still uses <video>, replace it with SmartVideo.

Fix 2 — Single source of spacing truth (no more “staggered” cards)

Problem: some variants (locked vs regular) bring their own outer margins/padding. The feed list then adds its own spacing, producing different vertical rhythm and the “staggered” look.

Make the list own the spacing and keep cards marginless:

List container (where you map posts):

// feed list
<ul className="flex flex-col gap-6">   {/* the ONLY vertical spacing */}
  {views.map(v => (
    <li key={v.id}>
      <PostCard view={v} />
    </li>
  ))}
</ul>


Base card root: remove outer margins; keep only inner padding/border.

// BasePostCard.Root
<div className="rounded-2xl border border-border/50 bg-card overflow-hidden">
  {children}
</div>


Make sure none of the variants add mt-* / mb-* on their outermost wrapper. If you want a subtle divider, put it inside the card (e.g., before Footer) not outside.

Media blocks should not inject extra vertical gaps beyond their own aspect box. Typical:

<BasePostCard.Media>
  <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
    {/* image/video */}
  </div>
</BasePostCard.Media>

Fix 3 — “Preview” button reliably triggers Quick Peek

You already added the window event; make sure the ID matches the shell’s postId.

Button:

onClick={() => window.dispatchEvent(new CustomEvent("paywall:preview", { detail: { postId: String(view.id) } })) }


Shell listener (already added):

window.addEventListener("paywall:preview", onPreview as EventListener);


If your view.id is numeric anywhere, cast to string in both places to avoid mismatches.

Fix 4 — Make sure every video usage actually switched to SmartVideo

Do a quick search:

Find: <video in /src/features/post and /src/features/**/media

Replace any remaining with SmartVideo wrapper (remember to give the wrapper a relative parent; the component adds it now, but your outer media frame should still be relative aspect-[16/9] to reserve height).

Fix 5 — Keep locked media frosted, header/body consistent

In your LockedPostCard variant, ensure the media slot is only the shell; everything else (header/body/footer/bottom bar) remains in the base card. That keeps fonts/spacing identical across variants.

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

90-second validation checklist

Feed list is flex flex-col gap-6; no card has outer margins.

Every unlocked video uses SmartVideo.

A known-good HLS test URL plays in Chrome: https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8.

DevTools → Network → your real video URLs show correct Content-Type.

“Preview” reveals for ~1.5s; “Upgrade” still opens your existing plans modal.

Cards line up vertically with even 24px/32px gaps (whatever your gap-* is).