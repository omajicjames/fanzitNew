"use client"

import { ThreeColumnShell } from "@/components/layout/three-column-shell"
import { MainFeed } from "@/components/feed/main-feed"
import { Sidebar } from "@/components/layout/sidebar"
import { MessagingPanel } from "@/components/messaging/messaging-panel"
import { PageNavigator } from "@/components/navigation/page-navigator"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Navigation, X } from "lucide-react"

export default function HomePage() {
  const [showNavigator, setShowNavigator] = useState(false)

  return (
    <ProtectedRoute>
      <div className="relative">
        <Button
          onClick={() => setShowNavigator(!showNavigator)}
          className="fixed top-4 right-4 z-50 shadow-lg"
          size="sm"
        >
          {showNavigator ? <X className="h-4 w-4" /> : <Navigation className="h-4 w-4" />}
          {showNavigator ? "Close" : "Navigate"}
        </Button>

        {showNavigator && (
          <div className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center p-4">
            <div className="bg-background rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-auto">
              <PageNavigator />
            </div>
          </div>
        )}

        <ThreeColumnShell leftColumn={<Sidebar />} centerColumn={<MainFeed />} rightColumn={<MessagingPanel />} />
      </div>
    </ProtectedRoute>
  )
}
