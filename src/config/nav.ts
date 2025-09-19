// src/config/nav.ts
// Single-source navigation configuration for admin and support interfaces
// Location: /Users/wizguy16/Downloads/fanzit/src/config/nav.ts
// Purpose: Centralized navigation system eliminating duplication

import type { LucideProps } from "lucide-react";
import {
  Gauge, Users, FileText, DollarSign, Shield, MessagesSquare, Wrench, Database,
  Bug, ClipboardList, Flag, ImageIcon, MessageSquareWarning, Quote, FileWarning, Scale,
  BadgeCheck, FolderKanban, Activity, BarChart3, Settings, Lock, Key, Calendar, Webhook
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { JSX } from "react";

// ----------------------
// Type Definitions - Single Source Navigation
// Purpose: Unified navigation data structures for both admin and support
// Location: Type declarations section
// ----------------------
export type Scope = "admin" | "support";

export type NavItem = {
  label: string;
  href: string;
  scope: Scope;
  icon?: (props: { className?: string }) => JSX.Element;
};

export type PillItem = { label: string; href: string };

// ----------------------
// Single Source Admin Navigation Configuration
// Purpose: Unified admin sidebar navigation eliminating duplication
// Location: Admin sidebar configuration
// ----------------------
export const ADMIN_SIDEBAR: readonly NavItem[] = [
  { label: "Dashboard", href: "/admin", scope: "admin", icon: Gauge },
  { label: "Analytics", href: "/admin/analytics", scope: "admin", icon: BarChart3 },
  { label: "User Management", href: "/admin/users", scope: "admin", icon: Users },
  { label: "Content Management", href: "/admin/content", scope: "admin", icon: FileText },
  { label: "Financial Management", href: "/admin/finance", scope: "admin", icon: DollarSign },
  { label: "Communications", href: "/admin/communications", scope: "admin", icon: MessagesSquare },
  { label: "System Management", href: "/admin/system", scope: "admin", icon: Shield },
  { label: "Security & Privacy", href: "/admin/security", scope: "admin", icon: Lock },
  { label: "Integrations", href: "/admin/integrations", scope: "admin", icon: Webhook },
  { label: "Events & Scheduling", href: "/admin/events", scope: "admin", icon: Calendar },
] as const;

// ----------------------
// Admin Section Pill Navigation
// Purpose: Per-section tab navigation for admin subsections
// Location: Section header areas
// ----------------------
export type AdminSection =
  | "dashboard" | "analytics" | "users" | "content" | "finance"
  | "communications" | "system" | "security" | "integrations" | "events";

export const ADMIN_SECTION_PILLS: Record<AdminSection, readonly PillItem[]> = {
  dashboard: [
    { label: "Overview", href: "/admin" },
    { label: "Revenue", href: "/admin/revenue" },
    { label: "User Growth", href: "/admin/user-growth" },
    { label: "Top Content", href: "/admin/content-insights" },
  ],
  analytics: [
    { label: "Overview", href: "/admin/analytics" },
    { label: "Cohorts", href: "/admin/analytics/cohorts" },
    { label: "Funnels", href: "/admin/analytics/funnels" },
    { label: "Retention", href: "/admin/analytics/retention" },
  ],
  users: [
    { label: "All Users", href: "/admin/users" },
    { label: "Segments", href: "/admin/users/segments" },
    { label: "Roles", href: "/admin/users/roles" },
    { label: "Flags", href: "/admin/users/flags" },
  ],
  content: [
    { label: "Posts", href: "/admin/content/posts" },
    { label: "Media", href: "/admin/content/media" },
    { label: "Categories", href: "/admin/content/categories" },
    { label: "Reports", href: "/admin/content/reports" },
  ],
  finance: [
    { label: "Revenue", href: "/admin/finance/revenue" },
    { label: "Payouts", href: "/admin/finance/payouts" },
    { label: "Taxes", href: "/admin/finance/taxes" },
    { label: "Invoices", href: "/admin/finance/invoices" },
  ],
  communications: [
    { label: "Announcements", href: "/admin/communications/announcements" },
    { label: "Messages", href: "/admin/communications/messages" },
    { label: "Email", href: "/admin/communications/email" },
  ],
  system: [
    { label: "Status", href: "/admin/system" },
    { label: "Settings", href: "/admin/system/settings" },
    { label: "Logs", href: "/admin/system/logs" },
    { label: "Backups", href: "/admin/system/backups" },
    { label: "Maintenance", href: "/admin/system/maintenance" },
    { label: "Security", href: "/admin/system/security" },
    { label: "Integrations", href: "/admin/system/integrations" },
    { label: "Events", href: "/admin/system/events" },
    { label: "Global", href: "/admin/system/global" },
  ],
  security: [
    { label: "Policies", href: "/admin/security/policies" },
    { label: "Audit Log", href: "/admin/security/audit-log" },
    { label: "Access", href: "/admin/security/access" },
  ],
  integrations: [
    { label: "Catalog", href: "/admin/integrations" },
    { label: "Webhooks", href: "/admin/integrations/webhooks" },
    { label: "API Keys", href: "/admin/integrations/keys" },
  ],
  events: [
    { label: "Calendar", href: "/admin/events" },
    { label: "Broadcasts", href: "/admin/events/broadcasts" },
    { label: "Jobs", href: "/admin/events/jobs" },
  ],
} as const;

// ----------------------
// Admin Section Detection Utility
// Purpose: Determine current admin section from pathname
// Location: Navigation components
// Parameters: path - current URL path
// Returns: AdminSection type for the current path
// ----------------------
export function getAdminSection(path: string): AdminSection {
  if (path.startsWith("/admin/system")) return "system";
  if (path.startsWith("/admin/users")) return "users";
  if (path.startsWith("/admin/content")) return "content";
  if (path.startsWith("/admin/finance")) return "finance";
  if (path.startsWith("/admin/communications")) return "communications";
  if (path.startsWith("/admin/security")) return "security";
  if (path.startsWith("/admin/integrations")) return "integrations";
  if (path.startsWith("/admin/events")) return "events";
  if (path.startsWith("/admin/analytics")) return "analytics";
  return "dashboard";
}

// ----------------------
// Single Source Support/OPS Navigation Configuration
// Purpose: Unified support sidebar navigation
// Location: Support/ops interface configuration
// ----------------------
export type OpsGroup = "home" | "queues" | "moderation" | "verification" | "audits" | "macros";

export const OPS_SIDEBAR: readonly { label: string; href: string; group: OpsGroup }[] = [
  { label: "Support Home", href: "/ops", group: "home" },
  { label: "Queues", href: "/ops/queues/tickets", group: "queues" },
  { label: "Moderation", href: "/ops/moderation/posts", group: "moderation" },
  { label: "Verification", href: "/ops/verification", group: "verification" },
  { label: "Audits", href: "/ops/audits/refunds", group: "audits" },
  { label: "Macros", href: "/ops/macros/canned", group: "macros" },
] as const;

// ----------------------
// Support/OPS Section Pill Navigation
// Purpose: Per-group tab navigation for support subsections
// Location: Support section header areas
// ----------------------
export const OPS_SECTION_PILLS: Record<OpsGroup, readonly PillItem[]> = {
  home: [
    { label: "Overview", href: "/ops" },
    { label: "Ops Status", href: "/ops/ops" },
  ],
  queues: [
    { label: "Tickets", href: "/ops/queues/tickets" },
    { label: "SLA", href: "/ops/queues/sla" },
    { label: "Escalations", href: "/ops/queues/escalations" },
  ],
  moderation: [
    { label: "Posts", href: "/ops/moderation/posts" },
    { label: "Media", href: "/ops/moderation/media" },
    { label: "Comments", href: "/ops/moderation/comments" },
    { label: "Replies", href: "/ops/moderation/replies" },
    { label: "DMCA", href: "/ops/moderation/dmca" },
  ],
  verification: [
    { label: "Requests", href: "/ops/verification" },
  ],
  audits: [
    { label: "Refunds", href: "/ops/audits/refunds" },
    { label: "Disputes", href: "/ops/audits/disputes" },
  ],
  macros: [
    { label: "Canned", href: "/ops/macros/canned" },
    { label: "Stats", href: "/ops/macros/stats" },
  ],
} as const;

// ----------------------
// Support Section Detection Utility
// Purpose: Determine current support section from pathname
// Location: Navigation components
// Parameters: path - current URL path
// Returns: OpsGroup type for the current path
// ----------------------
export function getOpsGroup(path: string): OpsGroup {
  if (path.startsWith("/ops/queues")) return "queues";
  if (path.startsWith("/ops/moderation")) return "moderation";
  if (path.startsWith("/ops/verification")) return "verification";
  if (path.startsWith("/ops/audits")) return "audits";
  if (path.startsWith("/ops/macros")) return "macros";
  return "home";
}

// ----------------------
// Universal Active Path Detection
// Purpose: Determine if a navigation link is currently active
// Location: All navigation components
// Parameters: current - current URL path, href - navigation link href
// Returns: boolean indicating if the link should be marked as active
// ----------------------
export function isActive(current: string, href: string): boolean {
  if (href === "/admin") return current === "/admin";
  if (href === "/ops") return current === "/ops";
  return current === href || current.startsWith(href + "/");
}