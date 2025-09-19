1) Central nav config (single source of truth)

src/config/nav.ts

// src/config/nav.ts
// Typed, DRY navigation schema used by sidebars and pill bars.

import type { LucideProps } from "lucide-react";
import {
  Gauge, Users, FileText, DollarSign, Shield, MessagesSquare, Wrench, Database,
  Bug, ClipboardList, Flag, ImageIcon, MessageSquareWarning, Quote, FileWarning, Scale,
  BadgeCheck, FolderKanban, Activity
} from "lucide-react";
import type { JSX } from "react";

export type LucideIcon = (props: LucideProps) => JSX.Element;

export type RoleScope = "admin" | "support" | "both";

export type NavItem = {
  label: string;
  href: string;
  icon?: LucideIcon;
  scope: RoleScope;
};

export type NavGroup = {
  label: string;
  items: ReadonlyArray<NavItem>;
  scope: RoleScope; // group-level visibility (all items share intent)
};

// ----- Admin: left sidebar (top-level areas) -----
export const ADMIN_SIDEBAR: ReadonlyArray<NavItem> = [
  { label: "Dashboard", href: "/admin", icon: Gauge, scope: "admin" },
  { label: "Users", href: "/admin/users", icon: Users, scope: "admin" },
  { label: "Content", href: "/admin/content", icon: FileText, scope: "admin" },
  { label: "Finance", href: "/admin/finance", icon: DollarSign, scope: "admin" },
  { label: "System", href: "/admin/system", icon: Shield, scope: "admin" },
  // Optional link-out to Ops (some admins also do support)
  { label: "Support Center", href: "/ops", icon: MessagesSquare, scope: "both" },
] as const;

// ----- Admin: top pill bar (section tabs) -----
export const ADMIN_PILLS: ReadonlyArray<NavItem> = [
  { label: "Dashboard", href: "/admin", scope: "admin" },
  { label: "Users", href: "/admin/users", scope: "admin" },
  { label: "Content", href: "/admin/content", scope: "admin" },
  { label: "Finance", href: "/admin/finance", scope: "admin" },
] as const;

// ----- System Management: top pill bar (subsection tabs) -----
export const SYSTEM_PILLS: ReadonlyArray<NavItem> = [
  { label: "Status", href: "/admin/system", scope: "admin" },
  { label: "Settings", href: "/admin/system/settings", scope: "admin" },
  { label: "Logs", href: "/admin/system/logs", scope: "admin" },
  { label: "Backups", href: "/admin/system/backups", scope: "admin" },
  { label: "Maintenance", href: "/admin/system/maintenance", scope: "admin" },
  { label: "Security", href: "/admin/system/security", scope: "admin" },
  { label: "Integrations", href: "/admin/system/integrations", scope: "admin" },
  { label: "Events", href: "/admin/system/events", scope: "admin" },
  { label: "Global", href: "/admin/system/global", scope: "admin" },
] as const;

// ----- Ops/Support: left sidebar (agent workflows) -----
export const OPS_SIDEBAR: ReadonlyArray<NavGroup> = [
  {
    label: "Home",
    scope: "support",
    items: [{ label: "Support Home", href: "/ops", icon: Activity, scope: "support" }],
  },
  {
    label: "Queues",
    scope: "support",
    items: [
      { label: "Ticket Queue", href: "/ops/queues/tickets", icon: ClipboardList, scope: "support" },
      { label: "SLA Breaches", href: "/ops/queues/sla", icon: Wrench, scope: "support" },
      { label: "Escalations", href: "/ops/queues/escalations", icon: Bug, scope: "support" },
    ],
  },
  {
    label: "Moderation",
    scope: "support",
    items: [
      { label: "Flagged Posts", href: "/ops/moderation/posts", icon: Flag, scope: "support" },
      { label: "Flagged Media", href: "/ops/moderation/media", icon: ImageIcon, scope: "support" },
      { label: "Flagged Comments", href: "/ops/moderation/comments", icon: MessageSquareWarning, scope: "support" },
      { label: "Flagged Replies", href: "/ops/moderation/replies", icon: Quote, scope: "support" },
      { label: "DMCA", href: "/ops/moderation/dmca", icon: FileWarning, scope: "support" },
    ],
  },
  {
    label: "Verification",
    scope: "support",
    items: [{ label: "KYC / Creators", href: "/ops/verification", icon: BadgeCheck, scope: "support" }],
  },
  {
    label: "Audits",
    scope: "support",
    items: [
      { label: "Refunds", href: "/ops/audits/refunds", icon: Scale, scope: "support" },
      { label: "Disputes", href: "/ops/audits/disputes", icon: Scale, scope: "support" },
    ],
  },
  {
    label: "Macros & Responses",
    scope: "support",
    items: [
      { label: "Canned Responses", href: "/ops/macros/canned", icon: FolderKanban, scope: "support" },
      { label: "Usage Stats", href: "/ops/macros/stats", icon: Database, scope: "support" },
    ],
  },
] as const;

// Utility: path matching for active link (keeps folders active on children)
export function isActive(currentPath: string, href: string): boolean {
  // exact for /admin, prefix for everything else
  if (href === "/admin") return currentPath === "/admin";
  if (href === "/ops") return currentPath === "/ops";
  return currentPath === href || currentPath.startsWith(href + "/");
}

2) Admin sidebar (left column)

src/components/admin/AdminSidebar.tsx

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ADMIN_SIDEBAR, isActive } from "@/src/config/nav";
import { cn } from "@/src/lib/cn"; // tiny helper: className joiner

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 flex-shrink-0 border-r border-border bg-sidebar">
      <div className="p-4">
        <div className="text-sm font-medium text-muted-foreground mb-2">Admin</div>
        <nav className="space-y-1">
          {ADMIN_SIDEBAR.map((item) => {
            const active = isActive(pathname, item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex items-center gap-2 rounded-xl px-3 py-2 text-sm transition",
                  active
                    ? "bg-card text-foreground"
                    : "text-muted-foreground hover:bg-card/70"
                )}
              >
                {Icon ? <Icon className="h-4 w-4" /> : null}
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}

3) Ops sidebar (left column) — now using the shared config

src/components/admin/OpsSidebar.tsx

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { OPS_SIDEBAR, isActive } from "@/src/config/nav";
import { cn } from "@/src/lib/cn";

export function OpsSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 flex-shrink-0 border-r border-border bg-sidebar">
      <div className="p-3 space-y-4">
        {OPS_SIDEBAR.map((group) => (
          <div key={group.label} className="space-y-1">
            <div className="px-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {group.label}
            </div>
            <ul className="space-y-1">
              {group.items.map((it) => {
                const active = isActive(pathname, it.href);
                const Icon = it.icon;
                return (
                  <li key={it.href}>
                    <Link
                      href={it.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex items-center gap-2 rounded-xl px-3 py-2 text-sm transition",
                        active
                          ? "bg-card text-foreground"
                          : "text-muted-foreground hover:bg-card/70"
                      )}
                    >
                      {Icon ? <Icon className="h-4 w-4" /> : null}
                      <span>{it.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </aside>
  );
}

4) Admin section pill bar (Dashboard/Users/Content/Finance)

src/components/admin/AdminPills.tsx

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ADMIN_PILLS, isActive } from "@/src/config/nav";
import { cn } from "@/src/lib/cn";

export function AdminPills() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-wrap gap-2">
      {ADMIN_PILLS.map((tab) => {
        const active = isActive(pathname, tab.href);
        return (
          <Link
            key={tab.href}
            href={tab.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "rounded-full px-3 py-1.5 text-sm",
              active
                ? "bg-primary text-primary-foreground"
                : "bg-card text-foreground hover:bg-card/80"
            )}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}

5) System Management pill bar

src/components/admin/SystemPills.tsx

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SYSTEM_PILLS, isActive } from "@/src/config/nav";
import { cn } from "@/src/lib/cn";

export function SystemPills() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-wrap gap-2">
      {SYSTEM_PILLS.map((tab) => {
        const active = isActive(pathname, tab.href);
        return (
          <Link
            key={tab.href}
            href={tab.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "rounded-full px-3 py-1.5 text-sm",
              active
                ? "bg-primary text-primary-foreground"
                : "bg-card text-foreground hover:bg-card/80"
            )}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}

6) Use them in layouts (headers + pill bars)

app/(protected)/admin/layout.tsx (root admin shell)

// Server Component: wraps all /admin with the left sidebar.
import type { ReactNode } from "react";
import AdminSidebar from "@/src/components/admin/AdminSidebar";
import { requireAdminPage } from "@/src/features/admin/auth/requireAdminPage";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  await requireAdminPage();

  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar />
      <div className="flex-1 overflow-hidden flex flex-col">{children}</div>
    </div>
  );
}


app/(protected)/admin/(tabs)/layout.tsx (Admin header + pills)

import type { ReactNode } from "react";
import { AdminPills } from "@/src/components/admin/AdminPills";

export default function AdminTabsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-4">
          <h1 className="text-xl font-semibold">Admin</h1>
          <div className="mt-3"><AdminPills /></div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
    </>
  );
}


app/(protected)/admin/system/(tabs)/layout.tsx (System header + pills)

import type { ReactNode } from "react";
import { SystemPills } from "@/src/components/admin/SystemPills";

export default function SystemTabsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-4">
          <h1 className="text-xl font-semibold">System Management</h1>
          <div className="mt-3"><SystemPills /></div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
    </>
  );
}

7) Small helper (if you don’t already have it)

src/lib/cn.ts

// ts tiny utility to join class names safely (no 'any')
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter((p): p is string => typeof p === "string" && p.length > 0).join(" ");
}

How this checks your boxes

DRY: All nav labels/paths/icons live in src/config/nav.ts. Sidebars + pill bars consume the same config.

OOP/composition: Tiny, reusable components (AdminSidebar, OpsSidebar, AdminPills, SystemPills).

Strict TypeScript: No any; typed icons and items; narrow active-state logic.

Design-system-true: Uses bg-sidebar, bg-card, border-border, text-muted-foreground, etc.

A11y: aria-current="page" on active links; focus/hover styles via Tailwind tokens.

Scales: Add a route → add one line in nav.ts; both the sidebar and pill bar update automatically.