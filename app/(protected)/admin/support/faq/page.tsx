"use client";

import requireAdminPage from "@src/features/admin/auth/requireAdminPage";
import { AdminFaqClient } from "@src/features/admin/components/AdminFaqClient";

// ----------------------
// Admin FAQ Management Page
// ----------------------
// This page provides FAQ management functionality for admin users
// Located at: /app/(protected)/admin/support/faq/page.tsx
// Parent: AdminDashboardLayout (/app/(protected)/admin/page.tsx)
// Child Components: AdminFaqClient (/src/features/admin/components/AdminFaqClient.tsx)

/**
 * Admin FAQ Management Page Component
 * Provides interface for managing frequently asked questions
 * Protected route requiring admin authentication
 */
function AdminFaqPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-2xl font-bold text-gray-900">FAQ Management</h1>
        <p className="text-gray-600 mt-1">
          Manage frequently asked questions and their answers
        </p>
      </div>

      {/* FAQ Client Component */}
      <AdminFaqClient />
    </div>
  );
}

export default requireAdminPage(AdminFaqPage);