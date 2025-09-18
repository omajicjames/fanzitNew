"use client";

// ----------------------
// SmartVideo Component
// ----------------------
// Bulletproof video player for MP4/WebM/HLS with proper error handling
// - Plays MP4/WebM via native browser support
// - Plays HLS (.m3u8) via native Safari or hls.js (lazy loaded)
// - Handles server Content-Type mismatches gracefully
// - Provides relative positioning wrapper for overlays
// Location: /src/features/media/SmartVideo.tsx
// Parent: Used in RegularPostCard and other media slots
// ----------------------

import { useEffect, useRef, useState } from "react";

// ----------------------
// HLS.js Type (using unknown to avoid interface conflicts)
// ----------------------

// ----------------------
// Minimal Class Utility
// ----------------------
// Lightweight class joiner to avoid pulling full utils
function cx(...a: (string | false | null | undefined)[]) {
  return a.filter(Boolean).join(" ");
}

// ----------------------
// Component Props Interface
// ----------------------
type Props = {
  src: string;                  // .mp4, .webm, or .m3u8 URL
  poster?: string;             // thumbnail/poster image
  muted?: boolean;             // audio muted state
  autoPlay?: boolean;          // auto-play on load
  loop?: boolean;              // loop playback
  controls?: boolean;          // show video controls
  className?: string;          // wrapper class for positioning
  onErrorText?: string;        // custom error message
};

// ----------------------
// Main SmartVideo Component
// ----------------------
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

  // ----------------------
  // HLS Detection
  // ----------------------
  const isHls = /\.m3u8($|\?)/i.test(src);

  // ----------------------
  // Video Setup Effect
  // ----------------------
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let hls: any = null;
    const video = ref.current;
    setReady(false);
    setErrored(false);
    if (!video || !src) return;

    async function attach() {
      try {
        if (isHls) {
           // Native HLS support check (Safari)
           if (video && video.canPlayType("application/vnd.apple.mpegURL")) {
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
           // MP4/WebM standard playback
           if (video) {
             video.src = src;
             setReady(true);
           }
         }
      } catch {
        setErrored(true);
      }
    }
    attach();

    // ----------------------
     // Error Handling
     // ----------------------
     const onError = () => setErrored(true);
     if (video) {
       video.addEventListener("error", onError);
     }
     return () => {
       if (video) {
         video.removeEventListener("error", onError);
       }
       if (hls) try { hls.destroy(); } catch {}
     };
  }, [src, isHls]);

  // ----------------------
  // Render Video with Bulletproof Fallback
  // ----------------------
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

/* End of SmartVideo Component */