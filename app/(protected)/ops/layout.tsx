import type { ReactNode } from "react";
import { OpsSidebar } from "@src/components/ops/OpsSidebar";

// ----------------------
// Ops Layout Component
// Location: /app/(protected)/ops/layout.tsx
// Purpose: Provides left sidebar navigation for ops dashboard
// Note: Sidebar navigation with expandable sections and subsections
// Children: Ops page components rendered in main content area
// ----------------------
export default function OpsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-neutral-950 flex">
      {/* ----------------------
      // Left Sidebar Navigation
      // Purpose: Collapsible sidebar with main navigation and subsections
      // Features: Expandable sections, active state highlighting, icons
      // ---------------------- */}
      <OpsSidebar />
      
      {/* ----------------------
      // Main Content Area
      // Purpose: Page content with sidebar navigation on the left
      // Note: Full height with proper spacing and scrolling
      // ---------------------- */}
      <main className="flex-1 overflow-y-auto">
        <div className="h-full p-6">
          {children}
        </div>
      </main>
    </div>
  );
}