// src/config/nav.ts
// Single-source navigation configuration for admin and support interfaces
// Location: /Users/wizguy16/Downloads/fanzit/src/config/nav.ts
// Purpose: Centralized navigation system eliminating duplication

import type { LucideProps } from "lucide-react";
import {
  Gauge, Users, FileText, DollarSign, Shield, MessagesSquare, Wrench, Database,
  Bug, ClipboardList, Flag, ImageIcon, MessageSquareWarning, Quote, FileWarning, Scale,
  BadgeCheck, FolderKanban, Activity, BarChart3, Settings, Lock, Key, Calendar, Webhook,
  Package, ShoppingBag, Tags, Gift, ReceiptText, Banknote, TrendingUp, PenTool, MessageCircle, Reply, PlaySquare, Phone, Video, Bell
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
  icon?: LucideIcon;
};

export type PillItem = { label: string; href: string };

// ----------------------
// Admin Navigation Section Types
// Purpose: Define the 4 main navigation sections
// ----------------------
export type AdminNavSection = "dashboard" | "users" | "content" | "system";

export type AdminNavGroup = {
  section: AdminNavSection;
  title: string;
  icon: LucideIcon;
  items: NavItem[];
};

// ----------------------
// Single Source Admin Navigation Configuration
// Purpose: Unified admin sidebar navigation with 4 logical sections
// Location: Admin sidebar configuration
// ----------------------
export const ADMIN_NAV_GROUPS: readonly AdminNavGroup[] = [
  {
    section: "dashboard",
    title: "Dashboard & Analytics",
    icon: Gauge,
    items: [
      { label: "Dashboard", href: "/admin", scope: "admin", icon: Gauge },
      { label: "Analytics", href: "/admin/analytics", scope: "admin", icon: BarChart3 },
      { label: "Financial Management", href: "/admin/finance", scope: "admin", icon: DollarSign },
    ]
  },
  {
    section: "users",
    title: "User Management",
    icon: Users,
    items: [
      { label: "User Management", href: "/admin/users", scope: "admin", icon: Users },
      { label: "Verification", href: "/admin/verification", scope: "admin", icon: BadgeCheck },
      { label: "Members", href: "/admin/members", scope: "admin", icon: Users },
    ]
  },
  {
    section: "content",
    title: "Content & Commerce",
    icon: FileText,
    items: [
      { label: "Content Management", href: "/admin/content", scope: "admin", icon: FileText },
      { label: "Blog Management", href: "/admin/blog", scope: "admin", icon: PenTool },
      { label: "Posts Management", href: "/admin/posts", scope: "admin", icon: FileText },
      { label: "Comments Management", href: "/admin/comments", scope: "admin", icon: MessageCircle },
      { label: "Replies Management", href: "/admin/replies", scope: "admin", icon: Reply },
      { label: "Reels Management", href: "/admin/reels", scope: "admin", icon: PlaySquare },
      { label: "Products", href: "/admin/products", scope: "admin", icon: Package },
      { label: "Sales", href: "/admin/sales", scope: "admin", icon: ReceiptText },
      { label: "Shop", href: "/admin/shop", scope: "admin", icon: ShoppingBag },
      { label: "Shop Categories", href: "/admin/shop-categories", scope: "admin", icon: Tags },
      { label: "Gifts", href: "/admin/gifts", scope: "admin", icon: Gift },
    ]
  },
  {
    section: "system",
    title: "System & Operations",
    icon: Shield,
    items: [
      { label: "Content Moderation", href: "/admin/moderation", scope: "admin", icon: Shield },
      { label: "Communications", href: "/admin/communications", scope: "admin", icon: MessagesSquare },
      { label: "Announcements", href: "/admin/communications/announcements", scope: "admin", icon: Bell },
      { label: "System Management", href: "/admin/system", scope: "admin", icon: Shield },
      { label: "Security & Privacy", href: "/admin/security", scope: "admin", icon: Lock },
      { label: "Integrations", href: "/admin/integrations", scope: "admin", icon: Webhook },
      { label: "Events & Scheduling", href: "/admin/events", scope: "admin", icon: Calendar },
    ]
  }
] as const;

// Legacy flat array for backward compatibility
export const ADMIN_SIDEBAR: readonly NavItem[] = ADMIN_NAV_GROUPS.flatMap(group => group.items);

// ----------------------
// Admin Section Pill Navigation
// Purpose: Per-section tab navigation for admin subsections
// Location: Section header areas
// ----------------------
export type AdminSection =
  | "dashboard" | "analytics" | "users" | "content" | "finance"
  | "products" | "sales" | "shop" | "shop-categories" | "gifts"
  | "blog" | "posts" | "comments" | "replies" | "moderation" | "reels"
  | "verification" | "members" | "communications" | "announcements" | "system" | "security" | "integrations" | "events";

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
    { label: "Verification", href: "/admin/verification" },
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
  products: [
    { label: "All Products", href: "/admin/products" },
    { label: "Categories", href: "/admin/products/categories" },
    { label: "Inventory", href: "/admin/products/inventory" },
    { label: "Analytics", href: "/admin/products/analytics" },
  ],
  sales: [
    { label: "Overview", href: "/admin/sales" },
    { label: "Orders", href: "/admin/sales/orders" },
    { label: "Customers", href: "/admin/sales/customers" },
    { label: "Analytics", href: "/admin/sales/analytics" },
  ],
  shop: [
    { label: "Settings", href: "/admin/shop" },
    { label: "Products", href: "/admin/shop/products" },
    { label: "Orders", href: "/admin/shop/orders" },
    { label: "Analytics", href: "/admin/shop/analytics" },
  ],
  "shop-categories": [
    { label: "All Categories", href: "/admin/shop-categories" },
    { label: "Hierarchy", href: "/admin/shop-categories/hierarchy" },
    { label: "Analytics", href: "/admin/shop-categories/analytics" },
  ],
  gifts: [
    { label: "All Gifts", href: "/admin/gifts" },
    { label: "Categories", href: "/admin/gifts/categories" },
    { label: "Analytics", href: "/admin/gifts/analytics" },
    { label: "Settings", href: "/admin/gifts/settings" },
  ],
  blog: [
    { label: "All Posts", href: "/admin/blog" },
    { label: "Categories", href: "/admin/blog/categories" },
    { label: "Analytics", href: "/admin/blog/analytics" },
    { label: "Settings", href: "/admin/blog/settings" },
  ],
  posts: [
    { label: "All Posts", href: "/admin/posts" },
    { label: "Pending", href: "/admin/posts/pending" },
    { label: "Flagged", href: "/admin/posts/flagged" },
    { label: "Analytics", href: "/admin/posts/analytics" },
  ],
  comments: [
    { label: "All Comments", href: "/admin/comments" },
    { label: "Pending", href: "/admin/comments/pending" },
    { label: "Flagged", href: "/admin/comments/flagged" },
    { label: "Spam", href: "/admin/comments/spam" },
  ],
  replies: [
    { label: "All Replies", href: "/admin/replies" },
    { label: "Pending", href: "/admin/replies/pending" },
    { label: "Flagged", href: "/admin/replies/flagged" },
    { label: "Threads", href: "/admin/replies/threads" },
  ],
  moderation: [
    { label: "Queue", href: "/admin/moderation" },
    { label: "Pending", href: "/admin/moderation/pending" },
    { label: "Approved", href: "/admin/moderation/approved" },
    { label: "Rejected", href: "/admin/moderation/rejected" },
  ],
  reels: [
    { label: "All Reels", href: "/admin/reels" },
    { label: "Trending", href: "/admin/reels/trending" },
    { label: "Featured", href: "/admin/reels/featured" },
    { label: "Analytics", href: "/admin/reels/analytics" },
  ],
  verification: [
    { label: "All Requests", href: "/admin/verification" },
    { label: "Pending", href: "/admin/verification/pending" },
    { label: "Approved", href: "/admin/verification/approved" },
    { label: "Rejected", href: "/admin/verification/rejected" },
  ],
  members: [
    { label: "All Members", href: "/admin/members" },
    { label: "Creators", href: "/admin/members/creators" },
    { label: "Premium", href: "/admin/members/premium" },
    { label: "Moderators", href: "/admin/members/moderators" },
  ],
  communications: [
    { label: "All Communications", href: "/admin/communications" },
    { label: "Messages", href: "/admin/communications/messages" },
    { label: "Email", href: "/admin/communications/email" },
  ],
  announcements: [
    { label: "All Announcements", href: "/admin/communications/announcements" },
    { label: "Active", href: "/admin/communications/announcements/active" },
    { label: "Draft", href: "/admin/communications/announcements/draft" },
    { label: "Scheduled", href: "/admin/communications/announcements/scheduled" },
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
  if (path.startsWith("/admin/products")) return "products";
  if (path.startsWith("/admin/sales")) return "sales";
  if (path.startsWith("/admin/shop")) return "shop";
  if (path.startsWith("/admin/shop-categories")) return "shop-categories";
  if (path.startsWith("/admin/gifts")) return "gifts";
  if (path.startsWith("/admin/blog")) return "blog";
  if (path.startsWith("/admin/posts")) return "posts";
  if (path.startsWith("/admin/comments")) return "comments";
  if (path.startsWith("/admin/replies")) return "replies";
  if (path.startsWith("/admin/moderation")) return "moderation";
  if (path.startsWith("/admin/reels")) return "reels";
  if (path.startsWith("/admin/verification")) return "verification";
  if (path.startsWith("/admin/members")) return "members";
  if (path.startsWith("/admin/communications")) return "communications";
  if (path.startsWith("/admin/communications/announcements")) return "announcements";
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

// ----------------------
// System Pills Export
// Purpose: Export system pills for SystemPills component
// Location: SystemPills component
// ----------------------
export const SYSTEM_PILLS = ADMIN_SECTION_PILLS.system;