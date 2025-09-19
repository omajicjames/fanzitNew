// ----------------------
// Admin Dashboard Main Page
// Location: /app/(protected)/admin/page.tsx
// Purpose: Main admin dashboard with requireAdminPage authentication
// Protection: Wrapped with requireAdminPage HOC for admin-only access
// Layout: AdminLayout with dual-row navigation
// Children: EnhancedAdminPageClient component for dashboard content
// Note: This is the main admin dashboard after successful login
// ----------------------

"use client";

import requireAdminPage from '@src/features/admin/auth/requireAdminPage';
import EnhancedAdminPageClient from '@src/features/admin/components/EnhancedAdminPageClient';
import { AdminPageTemplate } from '@src/components/admin/AdminPageTemplate';
import { BarChart3, TrendingUp, Users, DollarSign } from 'lucide-react';
import { useEffect } from 'react';

// ----------------------
// Admin Dashboard Component
// Purpose: Renders the main admin dashboard with authentication
// Note: Uses EnhancedAdminPageClient for dashboard content and widgets
// ----------------------
function AdminDashboardPage() {
  // Debug: Check localStorage on page load
  useEffect(() => {
    console.log('=== Admin Dashboard Page Loaded ===');
    console.log('localStorage admin_token:', localStorage.getItem('admin_token'));
    console.log('localStorage user_role:', localStorage.getItem('user_role'));
    console.log('localStorage admin_session:', localStorage.getItem('admin_session'));
  }, []);

  const stats = (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-[var(--admin-card-bg)] border border-neutral-700 rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-neutral-400 uppercase tracking-wide">Total Revenue</p>
            <p className="text-2xl font-bold text-white">$124,567</p>
            <div className="flex items-center gap-1 text-sm text-green-500">
              <TrendingUp className="h-4 w-4" />
              +12.5% from last month
            </div>
          </div>
          <DollarSign className="h-8 w-8 text-neutral-400" />
        </div>
      </div>

      <div className="bg-[var(--admin-card-bg)] border border-neutral-700 rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-neutral-400 uppercase tracking-wide">Active Users</p>
            <p className="text-2xl font-bold text-white">12,847</p>
            <div className="flex items-center gap-1 text-sm text-green-500">
              <TrendingUp className="h-4 w-4" />
              +8.2% from last month
            </div>
          </div>
          <Users className="h-8 w-8 text-neutral-400" />
        </div>
      </div>

      <div className="bg-[var(--admin-card-bg)] border border-neutral-700 rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-neutral-400 uppercase tracking-wide">Content Views</p>
            <p className="text-2xl font-bold text-white">45,678</p>
            <div className="flex items-center gap-1 text-sm text-green-500">
              <TrendingUp className="h-4 w-4" />
              +15.3% from last month
            </div>
          </div>
          <BarChart3 className="h-8 w-8 text-neutral-400" />
        </div>
      </div>

      <div className="bg-[var(--admin-card-bg)] border border-neutral-700 rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-neutral-400 uppercase tracking-wide">Conversion Rate</p>
            <p className="text-2xl font-bold text-white">3.2%</p>
            <div className="flex items-center gap-1 text-sm text-red-500">
              <TrendingUp className="h-4 w-4 rotate-180" />
              -0.5% from last month
            </div>
          </div>
          <BarChart3 className="h-8 w-8 text-neutral-400" />
        </div>
      </div>
    </div>
  );

  return (
    <AdminPageTemplate
      title="Admin Dashboard"
      description="Overview of platform performance and key metrics"
      icon={<BarChart3 className="h-6 w-6" />}
      showSearch={false}
      showFilters={false}
      showRefresh={true}
      showExport={true}
      stats={stats}
    >
      <EnhancedAdminPageClient />
    </AdminPageTemplate>
  );
}

// ----------------------
// Protected Export
// Purpose: Wraps component with requireAdminPage HOC for authentication
// Note: Ensures only authenticated admins can access this page
// ----------------------
export default requireAdminPage(AdminDashboardPage);