"use client"

import { ThreeColumnShell } from "@src/components/app/layout/three-column-shell"
import Timeline from "@src/features/feed/components/Timeline"
import { Sidebar } from "@src/components/app/layout/sidebar"
import AnnouncementStack from "@src/features/right-rail/AnnouncementStack"

import { ProtectedRoute } from "@src/features/auth/components/protected-route"
import { PostDataAdapter } from "@src/features/post/adapters/PostDataAdapter"

// ----------------------
// HomePage Component
// Location: /app/(public)/page.tsx
// Parent: App Router
// Children: ThreeColumnShell with Sidebar, Timeline (admin context), AnnouncementStack (read-only)
// Purpose: Landing page with admin promotional content and read-only announcements
// ----------------------
export default function HomePage() {
  // ----------------------
  // Admin Posts Data
  // Purpose: Get admin promotional content for landing page display
  // ----------------------
  const adminPosts = PostDataAdapter.getAdminPosts();

  return (
    <ProtectedRoute>
      {/* ----------------------
      // Main Layout Shell
      // Three-column layout with sidebar, timeline (admin context), and read-only announcements
      // Location: /src/components/app/layout/three-column-shell.tsx
      // ---------------------- */}
      <ThreeColumnShell 
        leftColumn={<Sidebar />} 
        centerColumn={
          <Timeline 
            views={adminPosts}
            context="admin"
            className="p-6"
            emptyMessage="No announcements at this time"
          />
        } 
        rightColumn={
          <div className="h-full p-4">
            {/* ----------------------
            // AnnouncementStack Component (Read-Only)
            // Location: /src/features/right-rail/AnnouncementStack.tsx
            // Purpose: Display announcements without admin controls
            // ---------------------- */}
            <AnnouncementStack
              className="h-full"
              isAdmin={false}
            />
          </div>
        } 
      />
    </ProtectedRoute>
  );
}