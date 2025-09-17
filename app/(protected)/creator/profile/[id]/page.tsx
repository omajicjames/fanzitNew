"use client"

import React, { useState } from "react"
import { CreatorProfile } from "@src/features/creator/components/creator-profile"
import { ThreeColumnShell } from "@src/components/app/layout/three-column-shell"
import { Sidebar } from "@src/components/app/layout/sidebar"
import { MessagingPanel } from "@src/features/messaging/components/messaging-panel"
import { PageNavigator } from "@src/features/navigation/components/page-navigator"
import { Button } from "@src/components/ui/button"
import { Navigation, X } from "lucide-react"

interface CreatorProfilePageProps {
  params: Promise<{
    id: string
  }>
}

export default function CreatorProfilePage(props: CreatorProfilePageProps) {
  const [showNavigator, setShowNavigator] = useState(false)
  const [params, setParams] = useState<{ id: string } | null>(null)

  // ----------------------
  // Async params resolution
  // Handles the Promise-based params from Next.js
  // ----------------------
  React.useEffect(() => {
    props.params.then(setParams)
  }, [props.params])

  if (!params) {
    return <div>Loading...</div>
  }

  return (
    <div className="relative">
      {/* ----------------------
      // Navigation Button
      // Location: Fixed position top-right
      // Opens PageNavigator component for quick page access
      // ---------------------- */}
      <Button
        onClick={() => setShowNavigator(!showNavigator)}
        className="fixed top-4 right-4 z-50 shadow-lg"
        size="sm"
      >
        {showNavigator ? <X className="h-4 w-4" /> : <Navigation className="h-4 w-4" />}
        {showNavigator ? "Close" : "Navigate"}
      </Button>

      {/* ----------------------
      // Navigation Overlay
      // Modal overlay containing PageNavigator component
      // Provides quick access to all platform pages
      // ---------------------- */}
      {showNavigator && (
        <div className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center p-4">
          <div className="bg-background rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-auto">
            <PageNavigator />
          </div>
        </div>
      )}

      {/* ----------------------
      // Main Layout Shell
      // Three-column layout with sidebar, profile content, and messaging
      // ---------------------- */}
      <ThreeColumnShell 
        leftColumn={<Sidebar />} 
        centerColumn={<CreatorProfile creatorId={params.id} />} 
        rightColumn={<MessagingPanel />} 
      />
    </div>
  )
}