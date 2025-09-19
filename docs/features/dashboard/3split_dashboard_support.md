PART 1 — PUBLIC HELP CENTER (Section tag: PUBLIC)

Goal: a truly public, self-service page. No agent metrics, no queues, no SLAs.

Route

app/(public)/support/page.tsx (no auth)

Files to create

app/(public)/support/page.tsx

src/features/support/public/PublicHelpCenter.tsx

src/features/status/SystemStatusWidget.tsx (shared, public-safe)

Build spec

Page shell: max-w-5xl, vertical rhythm via space-y-10.

Header: H1 “Help Center”, short blurb.

Search input (client): debounced q state. No API call yet; just wire to /support/search?q=....

Topics grid (6 buttons): Account, Payments, Creator Tools, Content & Safety, Technical Issues, Policies. Each button routes to /support/topics/[slug] (create links only; the topic pages can be stubs).

Contact CTA row: “Open a ticket” → /support/ticket/new, “Start live chat” → /support/chat, “View status history” → /support/status.

Status widget (public variant): 5 services with “Operational/Degraded/Maintenance”. No internals.

Types (no any)

// src/features/support/public/types.ts
export type SupportTopic = {
  slug: "account" | "payments" | "creator-tools" | "content-safety" | "tech" | "policies";
  title: string;
  description: string;
};
export type PublicStatus = {
  service: "api" | "db" | "payments" | "cdn" | "email";
  state: "operational" | "degraded" | "maintenance";
};


Acceptance tests (what “done” looks like)

Visiting /support when logged out shows the page (no redirect).

No elements labeled Queue, SLA, Escalation, Macros, or internal counts.

Each Topic button is focusable (keyboard) and links to the correct route.

Lighthouse a11y score ≥ 95; headings are ordered; buttons have discernible names.

Status widget shows states but no counts or “recent activity”.

PART 2 — ADMIN DASHBOARD (Section tag: ADMIN-DASH)

Goal: operator KPIs and quick stats. Not a helpdesk. Keep support tools out.

Route

app/(protected)/admin/page.tsx (admin-only)

Files to create

app/(protected)/admin/page.tsx

src/lib/auth/requireAdminPage.ts (server guard)

src/features/admin/components/AdminKpis.tsx

reuse src/features/status/SystemStatusWidget.tsx (admin variant allowed)

Build spec

Server guard: requireAdminPage() fetches profiles by user_id and ensures is_admin = true then returns { id, is_admin, username, avatar_url }. Non-admin → redirect /app.

Page content:

Greeting header: “Welcome back, {username}”.

KPI tiles grid (4): Total Users, Verified Creators, Total Posts, Monthly Revenue.

Quick stats card (optional): Active Users, Admin Users, Recent Posts count, System Status chip.

Status widget (admin variant) can be slightly more detailed than public, but still not agent-only details.

Strict split: Do not include Ticket Queue, SLAs, Macros, or Moderation tools here.

Types & contracts

// src/lib/auth/admin.ts
export type AdminProfile = {
  id: string;
  is_admin: boolean;
  username: string | null;
  avatar_url: string | null;
};

// src/features/admin/components/types.ts
export type Kpi =
  | { kind: "total_users"; value: number }
  | { kind: "verified_creators"; value: number }
  | { kind: "total_posts"; value: number }
  | { kind: "monthly_revenue"; value: number }; // cents in API, format in UI

export type QuickStats = {
  active_users: number;
  admin_users: number;
  recent_posts: number;
  system_status: "online" | "degraded" | "maintenance";
};


UI rules

Tiles are purely display; loading state uses skeletons (no spinners).

Format money via a util: formatCurrencyUSD(cents: number): string.

Responsive: 1 col on mobile, 4 on desktop.

Acceptance tests

Non-admin user hitting /admin is redirected to /app.

No elements mention Queue/SLA/Macros/Moderation.

KPI tiles render with correct aria labels and numbers.

If data fetch fails, tiles show — and a non-blocking toast (“Stats temporarily unavailable”).

Status widget present; shows service states, no agent “recent activity” feed.

PART 3 — ADMIN SUPPORT (Section tag: ADMIN-SUPPORT)

You said this remains unchanged. Keep it under app/(protected)/admin/support/page.tsx and ensure it imports your existing tools (Queues, SLAs, Canned Responses, Moderation, Audits, Announcements) and the internal “Recent Activity” + “System Status” sidebar. Guard it with the same requireAdminPage() used by the Admin Dashboard.

Collision rules (apply across the app)

Anything labeled Queue, SLA, Escalation, Canned Responses, Moderation, Audits → only lives in ADMIN-SUPPORT.

KPIs, revenue, users, posts → only live in ADMIN-DASH.

Public /support shows no privileged data or internal counts.

Minimal stubs (drop-in)
src/lib/auth/requireAdminPage.ts
import { redirect } from "next/navigation";
import { createSupabaseServer } from "@/src/lib/supabase/server";
import type { AdminProfile } from "./admin";

export async function requireAdminPage(): Promise<AdminProfile> {
  const supabase = await createSupabaseServer();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data, error } = await supabase
    .from("profiles")
    .select("id, is_admin, username, avatar_url")
    .eq("user_id", user.id)
    .single();

  if (error || !data?.is_admin) redirect("/app");
  return {
    id: data.id,
    is_admin: !!data.is_admin,
    username: data.username ?? null,
    avatar_url: data.avatar_url ?? null,
  };
}

app/(public)/support/page.tsx
import PublicHelpCenter from "@/src/features/support/public/PublicHelpCenter";
import SystemStatusWidget from "@/src/features/status/SystemStatusWidget";

export const metadata = { title: "Support • Help Center" };

export default function Page() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10 space-y-10">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Help Center</h1>
        <p className="text-sm text-muted-foreground">Search guides or contact support.</p>
      </header>
      <PublicHelpCenter />
      <SystemStatusWidget variant="public" />
    </main>
  );
}

app/(protected)/admin/page.tsx
import { requireAdminPage } from "@/src/lib/auth/requireAdminPage";
import AdminKpis from "@/src/features/admin/components/AdminKpis";
import SystemStatusWidget from "@/src/features/status/SystemStatusWidget";

export const metadata = { title: "Admin • Dashboard" };

export default async function Page() {
  const profile = await requireAdminPage();
  return (
    <main className="p-6 space-y-10">
      <header>
        <h1 className="text-2xl font-semibold">Welcome back, {profile.username ?? "Admin"}</h1>
        <p className="text-sm text-muted-foreground">Platform overview and recent stats.</p>
      </header>
      <AdminKpis />
      <SystemStatusWidget variant="admin" />
    </main>
  );
}
