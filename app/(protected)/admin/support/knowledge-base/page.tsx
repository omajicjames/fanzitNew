"use client";

import requireAdminPage from "@src/features/admin/auth/requireAdminPage";
import { AdminKnowledgeBaseClient } from "@src/features/admin/components/AdminKnowledgeBaseClient";

// ----------------------
// Admin Knowledge Base Page
// ----------------------
// This page provides knowledge base management functionality for admin users
// Located at: /app/(protected)/admin/support/knowledge-base/page.tsx
// Parent: AdminDashboardLayout (/app/(protected)/admin/page.tsx)
// Child Components: AdminKnowledgeBaseClient (/src/features/admin/components/AdminKnowledgeBaseClient.tsx)

/**
 * Admin Knowledge Base Page Component
 * Provides interface for managing support articles, documentation, and knowledge base content
 * Protected route requiring admin authentication
 */
function AdminKnowledgeBasePage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-2xl font-bold text-gray-900">Knowledge Base Management</h1>
        <p className="text-gray-600 mt-1">
          Manage support articles, documentation, and knowledge base content
        </p>
      </div>

      {/* Knowledge Base Client Component */}
      <AdminKnowledgeBaseClient />
    </div>
  );
}

export default requireAdminPage(AdminKnowledgeBasePage);