// ----------------------
// Enhanced Admin Page Client Component
// Location: /src/features/admin/components/EnhancedAdminPageClient.tsx
// Purpose: Main admin dashboard content with unified navigation system
// Parent: Admin dashboard page with SectionPills navigation
// Children: AdminKpis, SystemStatusWidget, various admin panels
// Note: Removed internal tab navigation - now uses SectionPills from single-source config
// ----------------------

"use client";

import { usePathname } from "next/navigation";
import { TestTube, BarChart3, Users } from "lucide-react";
import AdminKpis from "./AdminKpis";
import SystemStatusWidget from "@src/features/status/SystemStatusWidget";

// ----------------------
// Admin Section Content Renderer
// Purpose: Display content based on current admin section from URL
// Note: Uses single-source navigation - no internal tab management
// ----------------------

// ----------------------
// Dashboard Tab Content
// Purpose: Main dashboard view with KPIs and system status
// ----------------------
function DashboardTab() {
  return (
    <div className="space-y-8">
      {/* ----------------------
      // Key Performance Indicators
      // Purpose: Display key performance indicators matching photo design
      // ---------------------- */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-2">Key Performance Indicators</h2>
        <p className="text-neutral-400 mb-6">Platform metrics and statistics</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-neutral-800 border border-neutral-700 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-400 uppercase tracking-wide">Total Users</p>
                <p className="text-2xl font-bold text-white">12,847</p>
                <div className="flex items-center gap-1 text-sm text-green-500">
                  <BarChart3 className="h-4 w-4" />
                  +12.5% from last month
                </div>
              </div>
              <Users className="h-8 w-8 text-neutral-400" />
            </div>
          </div>

          <div className="bg-neutral-800 border border-neutral-700 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-400 uppercase tracking-wide">Verified Creators</p>
                <p className="text-2xl font-bold text-white">1,234</p>
                <div className="flex items-center gap-1 text-sm text-green-500">
                  <BarChart3 className="h-4 w-4" />
                  +8.2% from last month
                </div>
              </div>
              <Users className="h-8 w-8 text-neutral-400" />
            </div>
          </div>

          <div className="bg-neutral-800 border border-neutral-700 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-400 uppercase tracking-wide">Total Posts</p>
                <p className="text-2xl font-bold text-white">45,678</p>
                <div className="flex items-center gap-1 text-sm text-green-500">
                  <BarChart3 className="h-4 w-4" />
                  +15.3% from last month
                </div>
              </div>
              <BarChart3 className="h-8 w-8 text-neutral-400" />
            </div>
          </div>

          <div className="bg-neutral-800 border border-neutral-700 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-400 uppercase tracking-wide">Monthly Revenue</p>
                <p className="text-2xl font-bold text-white">$89,432</p>
                <div className="flex items-center gap-1 text-sm text-green-500">
                  <BarChart3 className="h-4 w-4" />
                  +23.1% from last month
                </div>
              </div>
              <BarChart3 className="h-8 w-8 text-neutral-400" />
            </div>
          </div>
        </div>
      </div>

      {/* ----------------------
      // Analytics Panels
      // Purpose: Revenue and user analytics matching photo design
      // ---------------------- */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="bg-neutral-800 border border-neutral-700 rounded-lg p-6">
          <div className="mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-green-500" />
            <h3 className="text-lg font-semibold text-white">Revenue Analytics</h3>
          </div>
          <div className="h-64 rounded-lg bg-neutral-900/50 flex items-center justify-center">
            <p className="text-neutral-400">Chart placeholder - Revenue trends</p>
          </div>
        </div>

        <div className="bg-neutral-800 border border-neutral-700 rounded-lg p-6">
          <div className="mb-4 flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-500" />
            <h3 className="text-lg font-semibold text-white">User Growth</h3>
          </div>
          <div className="h-64 rounded-lg bg-neutral-900/50 flex items-center justify-center">
            <p className="text-neutral-400">Chart placeholder - User growth</p>
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
// Purpose: Complete admin dashboard content using URL-based navigation
// Note: Navigation handled by SectionPills from single-source config
// ----------------------
export default function EnhancedAdminPageClient() {
  // ----------------------
  // URL-based Navigation
  // Purpose: Determine current admin section from URL path
  // Note: No internal state - uses unified navigation system
  // ----------------------
  const path = usePathname();
  
  // ----------------------
  // Content Renderer
  // Purpose: Display content based on current URL section
  // Note: Default to dashboard content for /admin/dashboard
  // ----------------------
  const renderContent = () => {
    // Check if we're on a specific admin section
    if (path.includes("/admin/users")) return <UsersTab />;
    if (path.includes("/admin/content")) return <ContentTab />;
    if (path.includes("/admin/finance")) return <FinanceTab />;
    
    // Default to dashboard content
    return <DashboardTab />;
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* ----------------------
        // Header Section
        // Purpose: Page title, subtitle, and admin badge matching photo design
        // Note: Updated to match the dashboard photo layout
        // ---------------------- */}
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-neutral-400">Platform management and operations</p>
          </div>
          
          <div className="rounded-full bg-orange-500 px-3 py-1 text-xs font-medium text-white">
            Super Admin
          </div>
        </header>

        {/* ----------------------
        // Main Content
        // Purpose: Display content based on current URL section
        // Note: Navigation handled by SectionPills component above
        // ---------------------- */}
        <div className="min-h-[600px]">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}