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

  return (
    <div className="container mx-auto px-4 py-6">
      <EnhancedAdminPageClient />
    </div>
  );
}

// ----------------------
// Protected Export
// Purpose: Wraps component with requireAdminPage HOC for authentication
// Note: Ensures only authenticated admins can access this page
// ----------------------
export default requireAdminPage(AdminDashboardPage);