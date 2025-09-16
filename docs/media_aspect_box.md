the shell doesn’t have a fixed aspect box and the image/video isn’t absolutely filling its parent. Here’s a tight, copy-paste fix that makes the locked overlay responsive and perfectly clipped.

1) Wrap the media slot in a real aspect box

Edit PostCard.tsx where you render the locked branch:

import { AspectRatio } from "@/src/components/ui/aspect-ratio";

// …
<BasePostCard.Media>
  <div className="relative overflow-hidden rounded-b-2xl">  {/* card owns rounding */}
    <AspectRatio ratio={16 / 9}>                             {/* controls height */}
      <LockedBranch
        postId={p.id}
        title={p.title}
        priceCents={p.gate.priceCents || 499}
        previewUrl={p.media.previewUrl}
        openPricingPlansModal={openPricingPlansModal}
        author={{ name: p.author.name, avatar: p.author.avatar, username: p.author.handle }}
        createdAt={p.createdAt}
        requiredTier={p.gate.tier ?? undefined}
        className="absolute inset-0"                         {/* fill the box */}
      />
    </AspectRatio>
  </div>
</BasePostCard.Media>


The AspectRatio component (you already have it under components/ui/aspect-ratio.tsx) guarantees the height. The className="absolute inset-0" forces the shell to fill that box.

2) Let the shell accept className and actually fill

Add className?: string to LockedPostShell (and pass through from LockedBranch).

LockedBranch.tsx

export type LockedBranchProps = {
  // …existing props
  className?: string;
};

export default function LockedBranch(props: LockedBranchProps) {
  const { className, ...rest } = props;
  return <LockedPostShell {...rest} className={className} />;
}


LockedPostShell.tsx (key outer wrapper + image/video fit)

import { cn } from "@/src/lib/utils"; // or your class merge util

type Props = {
  // …existing props
  className?: string;
};

export function LockedPostShell({
  previewImage,
  // …rest,
  className,
}: Props) {
  return (
    <div className={cn("relative h-full w-full overflow-hidden", className)}>
      {/* Background media always fills */}
      <img
        src={previewImage}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
      />

      {/* Frosted/radial layers + chips + CTA go here, but keep them inside the absolute box */}
      <div className="absolute inset-0">
        {/* your blur/radial/CTA content */}
      </div>
    </div>
  );
}

3) Remove inner borders/top rounding (prevents seams)

Make sure neither LockedPostShell nor its immediate parent add borders or top rounding. You already fixed most of this; keep:

outer card border/radius on BasePostCard.Root

media wrapper: rounded-b-2xl overflow-hidden (no border)

shell: border-0 (default), relies on parent clipping

4) Unlocked media path matches the same geometry

Your unlocked path should mirror the wrapper so both states swap cleanly:

<BasePostCard.Media>
  <div className="relative overflow-hidden rounded-b-2xl">
    <AspectRatio ratio={16/9}>
      <div className="absolute inset-0">
        {p.media.kind === "video" ? (
          <SmartVideo src={p.media.src} poster={p.media.poster} controls className="h-full w-full" />
        ) : (
          <img src={p.media.src || p.media.poster || p.media.previewUrl} className="h-full w-full object-cover" />
        )}
      </div>
    </AspectRatio>
  </div>
</BasePostCard.Media>

5) 30-second verification

Inspect the media container in DevTools: it should have a fixed height from AspectRatio.

The shell’s outer div should be absolute inset-0 inside that box and the image object-cover.

No inner borders, only bottom rounding on the media wrapper.

Resize the window: the overlay scales smoothly with no cropping glitches or gaps.