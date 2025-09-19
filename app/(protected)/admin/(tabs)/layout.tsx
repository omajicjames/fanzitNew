import type { ReactNode } from "react";
import { AdminMainPills } from "@src/components/admin/AdminMainPills";
import { AdminPills } from "@src/components/admin/AdminPills";

// ----------------------
// Admin Tabs Layout Component
// Location: /app/(protected)/admin/(tabs)/layout.tsx
// Purpose: Provides dual-row navigation header for admin dashboard
// Note: Row 1 - Main section pills, Row 2 - Contextual pills
// Children: Admin page components rendered in main content area
// ----------------------
export default function AdminTabsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-4">
          <h1 className="text-xl font-semibold">Admin</h1>

          {/* Row 1: main section pills (Dashboard · Analytics · Users · Content · Finance) */}
          <div className="mt-3">
            <AdminMainPills />
          </div>

          {/* Row 2: contextual pills for the current section (e.g., Overview · Revenue · ...) */}
          <div className="mt-2">
            <AdminPills />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
    </>
  );
}