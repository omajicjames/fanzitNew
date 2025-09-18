// ----------------------
// Support System Type Definitions
// Location: /src/features/support/public/types.ts
// Purpose: Type definitions for public support system and admin dashboard
// Used by: PublicHelpCenter, SystemStatusWidget, AdminKpis components
// ----------------------

// ----------------------
// Public Support Types
// Purpose: Define structure for support topics and system status
// ----------------------
export type SupportTopic = {
  slug: "account" | "payments" | "creator-tools" | "content-safety" | "tech" | "policies";
  title: string;
  description: string;
};

export type PublicStatus = {
  service: "api" | "db" | "payments" | "cdn" | "email";
  state: "operational" | "degraded" | "maintenance";
};

// ----------------------
// Admin Dashboard Types
// Purpose: Define structure for admin KPIs and quick statistics
// ----------------------
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

// ----------------------
// Admin Authentication Types
// Purpose: Define admin profile structure for authentication
// ----------------------
export type AdminProfile = {
  id: string;
  is_admin: boolean;
  username: string | null;
  avatar_url: string | null;
};

// ----------------------
// System Status Widget Types
// Purpose: Define variants and extended status information
// ----------------------
export type SystemStatusVariant = "public" | "admin";

export type SystemStatusService = {
  name: string;
  service: PublicStatus["service"];
  state: PublicStatus["state"];
  lastUpdated?: string;
  description?: string;
};