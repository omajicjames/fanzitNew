Love this direction. Ditch the carousel; use a compact “Spotlight Stack” that cycles items like a deck of cards (subtle, modern, no dot pagination). One banner is visible; the next two “peek” underneath so users see there’s more. Cycle with a chevron or auto-advance; hover/focus pauses.

Here’s a drop-in you can paste into your right rail. It uses your zinc/gold theme, one standardized banner color, and one button style. Height is compact so you still have room for two more widgets below.

```tsx
// src/features/right-rail/AnnouncementStack.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, PartyPopper, FireExtinguisher, Gem } from "lucide-react";
import { Button } from "@/components/ui/button";
import * as React from "react";

type Ann = {
  id: string;
  title: string;
  body: string;
  cta: string;
  icon: React.ReactNode;
  onClick: () => void;
};

const BANNER_CLASSES =
  // One standardized, muted banner surface (no neon gradients).
  // Dark zinc with a faint diagonal shimmer and a 1px gold keyline.
  "relative overflow-hidden rounded-2xl border border-[oklch(0.83_0.18_85)]/35 " + // gold keyline (subtle)
  "bg-[oklch(0.22_0.02_255)] " +                                                   // zinc base
  "before:absolute before:inset-0 before:bg-[linear-gradient(135deg,transparent,oklch(0.25_0.03_255/_0.35))] before:pointer-events-none " +
  "shadow-[0_0_0_1px_rgb(250_204_21/_0.03),0_16px_40px_-8px_rgb(0_0_0/_0.5)]";     // soft elevation

const TITLE_CLASSES = "text-white/95 text-lg font-semibold leading-tight";
const BODY_CLASSES = "text-white/70 text-sm leading-relaxed";
const GOLD_TEXT = "text-[oklch(0.83_0.18_85)]";
const GOLD_RING = "ring-1 ring-[oklch(0.83_0.18_85)]/60";

export default function AnnouncementStack() {
  const items: Ann[] = [
    {
      id: "reels",
      title: "New feature: Reels are live",
      body: "Create short-form videos and reach more fans.",
      cta: "Try Reels",
      icon: <PartyPopper className={GOLD_TEXT} size={18} />,
      onClick: () => window.location.assign("/reels"),
    },
    {
      id: "sale",
      title: "30% off subs this weekend",
      body: "Limited-time offer for new subscribers.",
      cta: "Learn More",
      icon: <FireExtinguisher className={GOLD_TEXT} size={18} />,
      onClick: () => window.location.assign("/promotions/weekend-sale"),
    },
    {
      id: "rewards",
      title: "Creator Rewards Program",
      body: "Earn bonuses for consistent posting.",
      cta: "Join Now",
      icon: <Gem className={GOLD_TEXT} size={18} />,
      onClick: () => window.location.assign("/rewards"),
    },
  ];

  const [idx, setIdx] = React.useState(0);
  const next = React.useCallback(() => setIdx((i) => (i + 1) % items.length), [items.length]);
  const prev = React.useCallback(() => setIdx((i) => (i - 1 + items.length) % items.length), [items.length]);

  // Auto-advance every 8s; pause on hover/focus for accessibility.
  const timer = React.useRef<NodeJS.Timeout | null>(null);
  const [paused, setPaused] = React.useState(false);
  React.useEffect(() => {
    if (paused) return;
    timer.current = setTimeout(next, 8000);
    return () => void (timer.current && clearTimeout(timer.current));
  }, [idx, paused, next]);

  const active = items[idx];

  return (
    <section
      aria-label="Spotlight"
      className="space-y-3"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Stack with peeking cards underneath (no carousel UI) */}
      <div className="relative h-[172px]">
        {/* Peek 2 */}
        <div className="absolute inset-x-2 bottom-2 top-8 scale-[0.985] opacity-60 blur-[0.3px]">
          <div className={`${BANNER_CLASSES}`} />
        </div>
        {/* Peek 1 */}
        <div className="absolute inset-x-1 bottom-1 top-4 scale-[0.993] opacity-80">
          <div className={`${BANNER_CLASSES}`} />
        </div>

        {/* Active card */}
        <AnimatePresence mode="popLayout">
          <motion.article
            key={active.id}
            layout
            initial={{ y: 18, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -18, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 40 }}
            className={`${BANNER_CLASSES} h-full`}
          >
            <div className="flex h-full flex-col justify-between p-4">
              <div className="flex items-start gap-2">
                <span aria-hidden>{active.icon}</span>
                <h3 className={TITLE_CLASSES}>{active.title}</h3>
              </div>
              <p className={BODY_CLASSES}>{active.body}</p>
              <div className="flex items-center justify-between">
                <Button
                  onClick={active.onClick}
                  className={`${GOLD_RING} rounded-xl bg-transparent px-4 py-2 text-sm font-medium ${GOLD_TEXT} hover:bg-[oklch(0.83_0.18_85/_0.08)]`}
                >
                  {active.cta}
                </Button>

                <div className="flex items-center gap-1">
                  <button
                    aria-label="Previous spotlight"
                    onClick={prev}
                    className="inline-flex size-8 items-center justify-center rounded-xl bg-white/5 hover:bg-white/10"
                  >
                    <ChevronLeft className="text-white/80" size={18} />
                  </button>
                  <button
                    aria-label="Next spotlight"
                    onClick={next}
                    className="inline-flex size-8 items-center justify-center rounded-xl bg-white/5 hover:bg-white/10"
                  >
                    <ChevronRight className="text-white/80" size={18} />
                  </button>
                </div>
              </div>
            </div>
          </motion.article>
        </AnimatePresence>
      </div>

      {/* Tiny progress bar (no dots) */}
      <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-white/10">
        <motion.div
          key={idx}
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 8, ease: "linear" }}
          className="absolute inset-y-0 left-0 bg-[oklch(0.83_0.18_85)]"
          aria-hidden
        />
      </div>
    </section>
  );
}
```

### Why this fits your brief

* One standardized look: muted dark-zinc banner with a faint shimmer; gold is used only for accents (text, ring, progress) so it matches your system without loud gradients.
* Modern interaction: a “deck/stack” pattern replaces the old carousel. Peeking layers convey depth and affordance; arrow buttons are optional.
* Accessibility: pause on hover/focus, keyboard-reachable buttons, reduced motion is handled by short spring animations.
* Compact: fixed 172px tall; leaves room for two more widgets underneath in the right rail.

### Usage

Place it in your right rail layout where the old carousel lived:

```tsx
// src/app/(protected)/layout/right-rail/RightRail.tsx
import AnnouncementStack from "@/features/right-rail/AnnouncementStack";

export function RightRail() {
  return (
    <aside className="w-[356px] space-y-6">
      <AnnouncementStack />
      {/* Reserve space for two more widgets */}
      <div id="rail-widget-2" className="min-h-[180px] rounded-2xl border border-white/10" />
      <div id="rail-widget-3" className="min-h-[180px] rounded-2xl border border-white/10" />
    </aside>
  );
}
```

### Tweak tokens (optional)

* Border/keyline gold: `oklch(0.83 0.18 85)` (your brand gold). If you ever want it even quieter, drop opacity to `/25`.
* Banner base: `oklch(0.22 0.02 255)` (dark zinc).
* Button is unified: transparent fill, gold ring, gold text, hover gold-wash.

