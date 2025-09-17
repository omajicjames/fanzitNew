Where things stand

app/(protected)/creator/profile/[id]/page.tsx → today is your profile page.

app/(protected)/creator/upload/page.tsx → creator upload tool.

app/(public)/page.tsx → your current home page (the one you want to repurpose).

src/features/post/PostCard.tsx + BasePostCard.tsx → user/creator content cards.

src/features/feed/components/main-feed.tsx → current generic feed.

Refactor proposal

Add Timeline.tsx (reusable feed list) under src/features/feed/components/.

Handles mapping posts → correct card type.

Accepts a context prop ("admin" | "profile" | "self").

Add AdminPostCard.tsx under src/features/admin/components/.

Looks like PostCard but without paywalls, optimized for promos/announcements.

Wire contexts:

Landing page (app/(public)/page.tsx) → uses Timeline with context="admin".

Creator profile (subscriber view) (app/(protected)/creator/profile/[id]/page.tsx) → uses Timeline with context="profile".

Creator self-view (your existing profile implementation) → already has upload/editor layered in; keep it, but make it reuse Timeline with context="self".

Example Timeline
// src/features/feed/components/Timeline.tsx
"use client";

import PostCard from "@/src/features/post/PostCard";
import AdminPostCard from "@/src/features/admin/components/AdminPostCard";

type Props = {
  views: any[]; // Post data already adapted
  context: "admin" | "profile" | "self";
  openPricingPlansModal?: () => void;
};

export default function Timeline({ views, context, openPricingPlansModal }: Props) {
  return (
    <ul className="flex flex-col gap-6">
      {views.map((v) => (
        <li key={String(v.id)}>
          {context === "admin" ? (
            <AdminPostCard view={v} />
          ) : (
            <PostCard
              view={v}
              openPricingPlansModal={openPricingPlansModal}
              // You can pass context to PostCard if you want to hide headers in profile/self view
              // @ts-expect-error optional prop
              context={context}
            />
          )}
        </li>
      ))}
    </ul>
  );
}

Example routing usage

Admin landing page

// app/(public)/page.tsx
import Timeline from "@/src/features/feed/components/Timeline";
import { getAdminPosts } from "@/src/lib/data"; // stub

export default async function LandingPage() {
  const views = await getAdminPosts();
  return <Timeline views={views} context="admin" />;
}


Creator profile page (subscriber view)

// app/(protected)/creator/profile/[id]/page.tsx
import Timeline from "@/src/features/feed/components/Timeline";
import { getPostsByCreatorId } from "@/src/lib/data";

export default async function ProfilePage({ params }: { params: { id: string } }) {
  const views = await getPostsByCreatorId(params.id);
  return <Timeline views={views} context="profile" />;
}


Creator self-view (your current profile page)
Keep your upload/editor UI at the top, then drop in:

<Timeline views={views} context="self" />


This way:

One feed engine (Timeline).

One user card (PostCard).

One admin card (AdminPostCard).

Context decides behavior.