// ----------------------
// Enhanced Admin Dashboard Page
// Location: /app/(protected)/admin/page.tsx
// Purpose: Modern admin dashboard with enhanced UI, tab navigation, and comprehensive admin tools
// Protection: Requires admin authentication with requireAdminPage HOC
// Layout: AdminNav sidebar + EnhancedAdminPageClient with tab-based navigation
// Children: AdminKpis (/src/features/admin/components/AdminKpis.tsx)
//          SystemStatusWidget (/src/features/status/SystemStatusWidget.tsx)
//          EnhancedAdminPageClient (/src/features/admin/components/EnhancedAdminPageClient.tsx)
// ----------------------

"use client";

import requireAdminPage from "@src/features/admin/auth/requireAdminPage";
import EnhancedAdminPageClient from "@src/features/admin/components/EnhancedAdminPageClient";
import AdminNav from "@src/features/admin/components/AdminNav";

// ----------------------
// Admin Dashboard Layout Component
// Purpose: Layout wrapper with sidebar navigation and main content
// ----------------------
function AdminDashboardLayout() {
  return (
    <div className="flex min-h-screen bg-neutral-950">
      {/* ----------------------
      // Admin Navigation Sidebar
      // Purpose: Comprehensive admin navigation with 20+ sections
      // ---------------------- */}
      <AdminNav />

      {/* ----------------------
      // Main Content Area
      // Purpose: Enhanced admin page client with tab navigation
      // ---------------------- */}
      <main className="flex-1 lg:ml-64">
        <EnhancedAdminPageClient />
      </main>
    </div>
  );
}

// ----------------------
// Protected Admin Page Export
// Purpose: Admin page wrapped with authentication HOC
// ----------------------
export default requireAdminPage(AdminDashboardLayout);