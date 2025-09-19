// Server Component: wraps authenticated /admin pages with sidebar navigation
import type { ReactNode } from "react";
import { AdminSidebar } from "@src/components/admin/AdminSidebar";

// ----------------------
// Admin Layout Component
// Location: /app/(protected)/admin/layout.tsx
// Purpose: Wraps authenticated admin pages with left sidebar navigation
// Note: Sidebar navigation with expandable sections and subsections
// Children: Admin page components rendered in main content area
// ----------------------

export default async function AdminLayout({ children }: { children: ReactNode }) {
  // Note: Authentication is handled by individual pages using requireAdminPage HOC

  return (
    <div className="admin-dashboard min-h-screen bg-admin-panel text-text">
      <div className="flex">
        {/* ----------------------
        // Left Sidebar Navigation
        // Purpose: Collapsible sidebar with main navigation and subsections
        // Features: Expandable sections, active state highlighting, icons
        // Note: Now uses scoped CSS variables for consistent theming
        // ---------------------- */}
        <AdminSidebar />
        
        {/* ----------------------
        // Main Content Area
        // Purpose: Page content with sidebar navigation on the left
        // Note: Uses scoped admin CSS variables for consistent styling
        // Children: Admin page components with unified design system
        // ---------------------- */}
        <main className="flex-1 overflow-y-auto">
          <div className="admin-container h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}