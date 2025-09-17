"use client"

import { ThreeColumnShell } from "@src/components/app/layout/three-column-shell"
import { MainFeed } from "@src/features/feed/components/main-feed"
import { Sidebar } from "@src/components/app/layout/sidebar"
import { MessagingPanel } from "@src/features/messaging/components/messaging-panel"
import { ProtectedRoute } from "@src/features/auth/components/protected-route"

// ----------------------
// HomePage Component
// Location: /app/(public)/page.tsx
// Parent: App Router
// Children: ThreeColumnShell with Sidebar, MainFeed, MessagingPanel
// ----------------------
export default function HomePage() {
  return (
    <ProtectedRoute>
      {/* ----------------------
      // Main Layout Shell
      // Three-column layout with sidebar, main feed, and messaging panel
      // Location: /src/components/app/layout/three-column-shell.tsx
      // ---------------------- */}
      <ThreeColumnShell 
        leftColumn={<Sidebar />} 
        centerColumn={<MainFeed />} 
        rightColumn={<MessagingPanel />} 
      />
    </ProtectedRoute>
  )
}