// ----------------------
// Admin Dashboard Page
// Location: /app/(protected)/admin/dashboard/page.tsx
// Purpose: Alternative admin dashboard route
// Protection: Requires admin authentication with requireAdminPage HOC
// Layout: EnhancedAdminPageClient with unified navigation from layout
// Children: EnhancedAdminPageClient (/src/features/admin/components/EnhancedAdminPageClient.tsx)
// Note: Alternative route to main admin page, uses same component
// ----------------------

"use client";

import requireAdminPage from '@src/features/admin/auth/requireAdminPage';
import EnhancedAdminPageClient from '@src/features/admin/components/EnhancedAdminPageClient';
import { useEffect } from 'react';

// ----------------------
// Admin Dashboard Component
// Purpose: Renders the admin dashboard for /admin/dashboard route
// Note: Alternative to main /admin route, same functionality
// ----------------------
function AdminDashboardPage() {
  // Debug: Check localStorage on page load
  useEffect(() => {
    console.log('=== Admin Dashboard (/dashboard) Page Loaded ===');
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