// ----------------------
// Admin Dashboard Main Page
// Location: /app/(protected)/admin/page.tsx
// Purpose: Main admin dashboard with requireAdminPage authentication
// Protection: Wrapped with requireAdminPage HOC for admin-only access
// Layout: AdminLayout with dual-row navigation
// Children: AdminDashboardDetailView component for single-card layout
// Note: This is the main admin dashboard after successful login
// ----------------------

"use client";

import requireAdminPage from '@src/features/admin/auth/requireAdminPage';
import { AdminPageTemplate } from '@src/components/admin/AdminPageTemplate';
import { AdminDashboardDetailView } from '@src/components/admin/AdminDashboardDetailView';
import { BarChart3, TrendingUp, Users, DollarSign, Activity, Eye, MessageSquare, Heart, Target, CheckCircle, Calendar, Zap, Clock, AlertTriangle } from 'lucide-react';
import { useEffect, useState } from 'react';

// ----------------------
// Admin Dashboard Component
// Purpose: Renders the main admin dashboard with single-card layout
// Note: Uses AdminDashboardDetailView for comprehensive dashboard display
// ----------------------
function AdminDashboardPage() {
  const [selectedMetricId, setSelectedMetricId] = useState("overview");

  // Debug: Check localStorage on page load
  useEffect(() => {
    console.log('=== Admin Dashboard Page Loaded ===');
    console.log('localStorage admin_token:', localStorage.getItem('admin_token'));
    console.log('localStorage user_role:', localStorage.getItem('user_role'));
    console.log('localStorage admin_session:', localStorage.getItem('admin_session'));
  }, []);

  // Mock dashboard metrics data
  const dashboardMetrics = {
    totalRevenue: 124567,
    activeUsers: 12847,
    contentViews: 45678,
    conversionRate: 3.2,
    totalPosts: 45678,
    verifiedCreators: 1234,
    monthlyRevenue: 89432,
    engagementRate: 12.5,
    newUsers: 2341,
    contentModeration: 23,
    systemHealth: 98,
    responseTime: 145
  };

  const handleMetricSelect = (metricId: string) => {
    setSelectedMetricId(metricId);
  };

  const handleViewDetails = () => {
    console.log('View detailed analytics');
    // Navigate to detailed analytics page
  };

  const handleExport = () => {
    console.log('Export dashboard data');
    // Export dashboard data
  };

  const handleRefresh = () => {
    console.log('Refresh dashboard data');
    // Refresh dashboard data
  };

  const handleMore = () => {
    console.log('More options');
    // Show more options menu
  };

  return (
    <AdminPageTemplate
      title="Admin Dashboard"
      description="Comprehensive platform overview with key performance indicators"
      icon={<BarChart3 className="h-6 w-6" />}
      showSearch={false}
      showFilters={false}
      showRefresh={true}
      showExport={true}
    >
      <AdminDashboardDetailView
        metrics={dashboardMetrics}
        selectedMetricId={selectedMetricId}
        onMetricSelect={handleMetricSelect}
        onViewDetails={handleViewDetails}
        onExport={handleExport}
        onRefresh={handleRefresh}
        onMore={handleMore}
      />
    </AdminPageTemplate>
  );
}

// ----------------------
// Protected Export
// Purpose: Wraps component with requireAdminPage HOC for authentication
// Note: Ensures only authenticated admins can access this page
// ----------------------
export default requireAdminPage(AdminDashboardPage);