"use client"

import { ThreeColumnShell } from "@src/components/app/layout/three-column-shell"
import Timeline from "@src/features/feed/components/Timeline"
import { Sidebar } from "@src/components/app/layout/sidebar"
import { MessagingPanel } from "@src/features/messaging/components/messaging-panel"
import { ProtectedRoute } from "@src/features/auth/components/protected-route"
import { PostDataAdapter } from "@src/features/post/adapters/PostDataAdapter"

// ----------------------
// HomePage Component
// Location: /app/(public)/page.tsx
// Parent: App Router
// Children: ThreeColumnShell with Sidebar, Timeline (admin context), MessagingPanel
// Purpose: Landing page with admin promotional content and user feed
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
      // Three-column layout with sidebar, timeline (admin context), and messaging panel
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
        rightColumn={<MessagingPanel />} 
      />
    </ProtectedRoute>
  )
}