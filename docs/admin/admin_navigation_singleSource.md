src/config/nav.ts — one config to rule them all

// Canonical nav + per-section pills for Admin (/admin) and Support (/ops)

export type Scope = "admin" | "support";

export type NavItem = {
  label: string;
  href: string;
  scope: Scope;
  icon?: (props: { className?: string }) => JSX.Element; // optional
};

export type PillItem = { label: string; href: string };

// ---------- ADMIN: sidebar ----------
export const ADMIN_SIDEBAR: readonly NavItem[] = [
  { label: "Dashboard",            href: "/admin",                scope: "admin" },
  { label: "Analytics",            href: "/analytics",            scope: "admin" }, // keep as /analytics if that's your route
  { label: "User Management",      href: "/admin/users",          scope: "admin" },
  { label: "Content Management",   href: "/admin/content",        scope: "admin" },
  { label: "Financial Management", href: "/admin/finance",        scope: "admin" },
  { label: "Communications",       href: "/admin/communications", scope: "admin" },
  { label: "System Management",    href: "/admin/system",         scope: "admin" },
  { label: "Security & Privacy",   href: "/admin/security",       scope: "admin" },
  { label: "Integrations",         href: "/admin/integrations",   scope: "admin" },
  { label: "Events & Scheduling",  href: "/admin/events",         scope: "admin" },
] as const;

// ---------- ADMIN: per-section pills ----------
export type AdminSection =
  | "dashboard" | "analytics" | "users" | "content" | "finance"
  | "communications" | "system" | "security" | "integrations" | "events";

export const ADMIN_SECTION_PILLS: Record<AdminSection, readonly PillItem[]> = {
  dashboard: [
    { label: "Overview",     href: "/admin" },
    { label: "Revenue",      href: "/admin/revenue" },
    { label: "User Growth",  href: "/admin/user-growth" },
    { label: "Top Content",  href: "/admin/content-insights" },
  ],
  analytics: [
    { label: "Overview",  href: "/analytics" },
    { label: "Cohorts",   href: "/analytics/cohorts" },
    { label: "Funnels",   href: "/analytics/funnels" },
    { label: "Retention", href: "/analytics/retention" },
  ],
  users: [
    { label: "All Users", href: "/admin/users" },
    { label: "Segments",  href: "/admin/users/segments" },
    { label: "Roles",     href: "/admin/users/roles" },
    { label: "Flags",     href: "/admin/users/flags" },
  ],
  content: [
    { label: "Posts",      href: "/admin/content/posts" },
    { label: "Media",      href: "/admin/content/media" },
    { label: "Categories", href: "/admin/content/categories" },
    { label: "Reports",    href: "/admin/content/reports" },
  ],
  finance: [
    { label: "Revenue",  href: "/admin/finance/revenue" },
    { label: "Payouts",  href: "/admin/finance/payouts" },
    { label: "Taxes",    href: "/admin/finance/taxes" },
    { label: "Invoices", href: "/admin/finance/invoices" },
  ],
  communications: [
    { label: "Announcements", href: "/admin/communications/announcements" },
    { label: "Messages",      href: "/admin/communications/messages" },
    { label: "Email",         href: "/admin/communications/email" },
  ],
  system: [
    { label: "Status",       href: "/admin/system" },
    { label: "Settings",     href: "/admin/system/settings" },
    { label: "Logs",         href: "/admin/system/logs" },
    { label: "Backups",      href: "/admin/system/backups" },
    { label: "Maintenance",  href: "/admin/system/maintenance" },
    { label: "Security",     href: "/admin/system/security" },
    { label: "Integrations", href: "/admin/system/integrations" },
    { label: "Events",       href: "/admin/system/events" },
    { label: "Global",       href: "/admin/system/global" },
  ],
  security: [
    { label: "Policies",  href: "/admin/security/policies" },
    { label: "Audit Log", href: "/admin/security/audit-log" },
    { label: "Access",    href: "/admin/security/access" },
  ],
  integrations: [
    { label: "Catalog",  href: "/admin/integrations" },
    { label: "Webhooks", href: "/admin/integrations/webhooks" },
    { label: "API Keys", href: "/admin/integrations/keys" },
  ],
  events: [
    { label: "Calendar",   href: "/admin/events" },
    { label: "Broadcasts", href: "/admin/events/broadcasts" },
    { label: "Jobs",       href: "/admin/events/jobs" },
  ],
};

// Map pathname → AdminSection
export function getAdminSection(path: string): AdminSection {
  if (path.startsWith("/admin/system")) return "system";
  if (path.startsWith("/admin/users")) return "users";
  if (path.startsWith("/admin/content")) return "content";
  if (path.startsWith("/admin/finance")) return "finance";
  if (path.startsWith("/admin/communications")) return "communications";
  if (path.startsWith("/admin/security")) return "security";
  if (path.startsWith("/admin/integrations")) return "integrations";
  if (path.startsWith("/admin/events")) return "events";
  if (path.startsWith("/analytics")) return "analytics"; // external analytics section
  return "dashboard";
}

// ---------- SUPPORT/OPS: sidebar ----------
export type OpsGroup = "home" | "queues" | "moderation" | "verification" | "audits" | "macros";

export const OPS_SIDEBAR: readonly { label: string; href: string; group: OpsGroup }[] = [
  { label: "Support Home", href: "/ops",                    group: "home" },
  { label: "Queues",       href: "/ops/queues/tickets",     group: "queues" },
  { label: "Moderation",   href: "/ops/moderation/posts",   group: "moderation" },
  { label: "Verification", href: "/ops/verification",       group: "verification" },
  { label: "Audits",       href: "/ops/audits/refunds",     group: "audits" },
  { label: "Macros",       href: "/ops/macros/canned",      group: "macros" },
];

// ---------- SUPPORT/OPS: per-group pills ----------
export const OPS_SECTION_PILLS: Record<OpsGroup, readonly PillItem[]> = {
  home: [
    { label: "Overview",  href: "/ops" },
    { label: "Ops Status", href: "/ops/ops" },
  ],
  queues: [
    { label: "Tickets",    href: "/ops/queues/tickets" },
    { label: "SLA",        href: "/ops/queues/sla" },
    { label: "Escalations",href: "/ops/queues/escalations" },
  ],
  moderation: [
    { label: "Posts",    href: "/ops/moderation/posts" },
    { label: "Media",    href: "/ops/moderation/media" },
    { label: "Comments", href: "/ops/moderation/comments" },
    { label: "Replies",  href: "/ops/moderation/replies" },
    { label: "DMCA",     href: "/ops/moderation/dmca" },
  ],
  verification: [
    { label: "Requests", href: "/ops/verification" },
  ],
  audits: [
    { label: "Refunds",  href: "/ops/audits/refunds" },
    { label: "Disputes", href: "/ops/audits/disputes" },
  ],
  macros: [
    { label: "Canned", href: "/ops/macros/canned" },
    { label: "Stats",  href: "/ops/macros/stats" },
  ],
};

export function getOpsGroup(path: string): OpsGroup {
  if (path.startsWith("/ops/queues")) return "queues";
  if (path.startsWith("/ops/moderation")) return "moderation";
  if (path.startsWith("/ops/verification")) return "verification";
  if (path.startsWith("/ops/audits")) return "audits";
  if (path.startsWith("/ops/macros")) return "macros";
  return "home";
}

// ---------- tiny active helper ----------
export function isActive(current: string, href: string): boolean {
  if (href === "/admin") return current === "/admin";
  if (href === "/ops")   return current === "/ops";
  return current === href || current.startsWith(href + "/");
}

src/components/nav/SectionPills.tsx — one pill bar for both scopes

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { isActive,
  getAdminSection, ADMIN_SECTION_PILLS,
  getOpsGroup,    OPS_SECTION_PILLS
} from "@/src/config/nav";

export function SectionPills({ scope }: { scope: "admin" | "support" }) {
  const path = usePathname();
  const pills = scope === "admin"
    ? ADMIN_SECTION_PILLS[getAdminSection(path)]
    : OPS_SECTION_PILLS[getOpsGroup(path)];

  if (!pills || pills.length <= 1) return null; // no pills if only one item

  return (
    <nav className="flex flex-wrap gap-2">
      {pills.map((p) => {
        const active = isActive(path, p.href);
        return (
          <Link
            key={p.href}
            href={p.href}
            aria-current={active ? "page" : undefined}
            className={`rounded-full px-3 py-1.5 text-sm transition
            ${active ? "bg-primary text-primary-foreground"
                     : "bg-card text-foreground hover:bg-card/80"}`}
          >
            {p.label}
          </Link>
        );
      })}
    </nav>
  );
}

Use it in headers (replace previous pill components)
Admin header layout (where you currently render pills)

// app/(protected)/admin/(tabs)/layout.tsx  (or your admin header layout)
import type { ReactNode } from "react";
import { SectionPills } from "@/src/components/nav/SectionPills";

export default function AdminHeaderLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-4">
          <h1 className="text-xl font-semibold">Admin</h1>
          <div className="mt-3"><SectionPills scope="admin" /></div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
    </>
  );
}
Support header layout

// app/(protected)/ops/layout.tsx
import type { ReactNode } from "react";
import { SectionPills } from "@/src/components/nav/SectionPills";
import { requireSupportAgentPage } from "@/src/features/ops/auth/requireSupportAgentPage";
import { OpsSidebar } from "@/src/components/admin/OpsSidebar";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function OpsLayout({ children }: { children: ReactNode }) {
  await requireSupportAgentPage();
  return (
    <div className="grid min-h-dvh grid-cols-[300px_1fr] bg-background">
      <aside className="border-r border-border"><OpsSidebar /></aside>
      <section className="flex min-h-dvh flex-col">
        <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
          <div className="mx-auto max-w-6xl px-4 py-4">
            <h1 className="text-lg font-semibold">Support Center</h1>
            <div className="mt-3"><SectionPills scope="support" /></div>
          </div>
        </header>
        <main className="flex-1 mx-auto max-w-6xl px-4 py-6">{children}</main>
      </section>
    </div>
  );
}

——————
“Generate minimal page stubs for every href in src/config/nav.ts that doesn’t exist, using our existing layouts and guards (requireAdminPage, requireSupportAgentPage), and add loading.tsx/error.tsx where missing.”
Pattern for a stub (example):

// app/(protected)/admin/finance/taxes/page.tsx
import { requireAdminPage } from "@/src/features/admin/auth/requireAdminPage";
export const metadata = { title: "Taxes • Admin" };
export default async function Page() {
  await requireAdminPage();
  return <div className="rounded-2xl border border-border p-6">Taxes dashboard goes here.</div>;
}

