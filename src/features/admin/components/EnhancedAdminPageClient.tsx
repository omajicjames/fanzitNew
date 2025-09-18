// ----------------------
// Enhanced Admin Page Client Component
// Location: /src/features/admin/components/EnhancedAdminPageClient.tsx
// Purpose: Main admin dashboard with tab navigation and comprehensive admin tools
// Parent: Admin page component
// Children: AdminKpis, SystemStatusWidget, various admin panels
// ----------------------

"use client";

import { useState } from "react";
import { BarChart3, Users, FileText, DollarSign, TestTube } from "lucide-react";
import AdminKpis from "./AdminKpis";
import SystemStatusWidget from "@src/features/status/SystemStatusWidget";

// ----------------------
// Tab Configuration
// Purpose: Define available admin dashboard tabs
// ----------------------
type AdminTab = "dashboard" | "users" | "content" | "finance";

interface TabConfig {
  id: AdminTab;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const ADMIN_TABS: TabConfig[] = [
  { id: "dashboard", label: "Dashboard", icon: BarChart3 },
  { id: "users", label: "Users", icon: Users },
  { id: "content", label: "Content", icon: FileText },
  { id: "finance", label: "Finance", icon: DollarSign },
];

// ----------------------
// Tab Navigation Component
// Purpose: Pill-style tab navigation with active state
// ----------------------
interface TabNavigationProps {
  activeTab: AdminTab;
  onTabChange: (tab: AdminTab) => void;
}

function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  return (
    <div className="flex space-x-1 rounded-full border border-white/10 bg-white/5 p-1">
      {ADMIN_TABS.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`
              flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all
              ${isActive 
                ? "bg-amber-500/20 text-amber-400 shadow-sm" 
                : "text-white/70 hover:text-white hover:bg-white/5"
              }
            `}
          >
            <Icon className="h-4 w-4" />
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

// ----------------------
// Dashboard Tab Content
// Purpose: Main dashboard view with KPIs and system status
// ----------------------
function DashboardTab() {
  return (
    <div className="space-y-8">
      {/* ----------------------
      // KPIs Section
      // Purpose: Display key performance indicators
      // ---------------------- */}
      <AdminKpis />

      {/* ----------------------
      // Analytics Panels
      // Purpose: Revenue and user analytics
      // ---------------------- */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-white/5 bg-white/5 p-6">
          <div className="mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-emerald-400" />
            <h3 className="text-lg font-semibold text-white">Revenue Analytics</h3>
          </div>
          <div className="h-64 rounded-lg bg-white/5 flex items-center justify-center">
            <p className="text-white/60">Chart placeholder - Revenue trends</p>
          </div>
        </div>

        <div className="rounded-2xl border border-white/5 bg-white/5 p-6">
          <div className="mb-4 flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-400" />
            <h3 className="text-lg font-semibold text-white">User Growth</h3>
          </div>
          <div className="h-64 rounded-lg bg-white/5 flex items-center justify-center">
            <p className="text-white/60">Chart placeholder - User growth</p>
          </div>
        </div>
      </div>

      {/* ----------------------
      // System Status Widget
      // Purpose: Display system status for admin monitoring
      // ---------------------- */}
      <SystemStatusWidget variant="admin" />
    </div>
  );
}

// ----------------------
// Users Tab Content
// Purpose: User management interface
// ----------------------
function UsersTab() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-white">User Management</h2>
        <p className="text-sm text-white/60">Manage user accounts, permissions, and verification</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-2xl border border-white/5 bg-white/5 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">User Accounts</h3>
          <div className="space-y-3">
            <button className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500">
              View All Users
            </button>
            <button className="w-full rounded-lg bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/20">
              Search Users
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-white/5 bg-white/5 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Creator Verification</h3>
          <div className="space-y-3">
            <button className="w-full rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500">
              Pending Requests
            </button>
            <button className="w-full rounded-lg bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/20">
              Verification History
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-white/5 bg-white/5 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">User Actions</h3>
          <div className="space-y-3">
            <button className="w-full rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-500">
              Ban/Suspend Users
            </button>
            <button className="w-full rounded-lg bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/20">
              User Reports
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ----------------------
// Content Tab Content
// Purpose: Content moderation interface
// ----------------------
function ContentTab() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-white">Content Management</h2>
        <p className="text-sm text-white/60">Moderate content, handle reports, and manage policies</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-2xl border border-white/5 bg-white/5 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Content Moderation</h3>
          <div className="space-y-3">
            <button className="w-full rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-white hover:bg-amber-500">
              Flagged Content
            </button>
            <button className="w-full rounded-lg bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/20">
              Review Queue
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-white/5 bg-white/5 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">DMCA & Reports</h3>
          <div className="space-y-3">
            <button className="w-full rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-500">
              DMCA Claims
            </button>
            <button className="w-full rounded-lg bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/20">
              User Reports
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-white/5 bg-white/5 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Content Policies</h3>
          <div className="space-y-3">
            <button className="w-full rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-500">
              Policy Management
            </button>
            <button className="w-full rounded-lg bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/20">
              Guidelines
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ----------------------
// Finance Tab Content
// Purpose: Financial tracking and management
// ----------------------
function FinanceTab() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-white">Financial Management</h2>
        <p className="text-sm text-white/60">Track revenue, manage payouts, and handle financial operations</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-2xl border border-white/5 bg-white/5 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Revenue Tracking</h3>
          <div className="space-y-3">
            <button className="w-full rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500">
              Revenue Reports
            </button>
            <button className="w-full rounded-lg bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/20">
              Transaction History
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-white/5 bg-white/5 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Creator Payouts</h3>
          <div className="space-y-3">
            <button className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500">
              Pending Payouts
            </button>
            <button className="w-full rounded-lg bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/20">
              Payout History
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-white/5 bg-white/5 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Financial Operations</h3>
          <div className="space-y-3">
            <button className="w-full rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-white hover:bg-amber-500">
              Refunds & Credits
            </button>
            <button className="w-full rounded-lg bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/20">
              Payment Audits
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ----------------------
// Main Enhanced Admin Page Client Component
// Purpose: Complete admin dashboard with tab navigation
// ----------------------
export default function EnhancedAdminPageClient() {
  // ----------------------
  // State Management
  // Purpose: Track active tab and handle tab switching
  // ----------------------
  const [activeTab, setActiveTab] = useState<AdminTab>("dashboard");

  // ----------------------
  // Tab Content Renderer
  // Purpose: Render content based on active tab
  // ----------------------
  const renderTabContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardTab />;
      case "users":
        return <UsersTab />;
      case "content":
        return <ContentTab />;
      case "finance":
        return <FinanceTab />;
      default:
        return <DashboardTab />;
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* ----------------------
        // Header Section
        // Purpose: Page title, subtitle, and test button
        // ---------------------- */}
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-white">Admin</h1>
            <p className="text-sm text-muted-foreground">Operate and moderate your platform.</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-amber-500/20 px-3 py-1 text-xs font-medium text-amber-400">
              Super Admin
            </div>
            <button className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-sm text-white hover:bg-white/20">
              <TestTube className="h-4 w-4" />
              Test
            </button>
          </div>
        </header>

        {/* ----------------------
        // Tab Navigation
        // Purpose: Switch between different admin sections
        // ---------------------- */}
        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

        {/* ----------------------
        // Tab Content
        // Purpose: Display content based on selected tab
        // ---------------------- */}
        <div className="min-h-[600px]">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}