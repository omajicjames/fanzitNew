"use client"

import React, { useState } from "react"
import { CreatorProfile } from "@src/features/creator/components/creator-profile"
import { ThreeColumnShell } from "@src/components/app/layout/three-column-shell"
import { Sidebar } from "@src/components/app/layout/sidebar"
import { MessagingPanel } from "@src/features/messaging/components/messaging-panel"
import RightRailNavigator from "@src/features/navigation/components/right-rail-navigator"

import { Button } from "@src/components/ui/button"
import { Menu, X } from "lucide-react"

interface CreatorProfilePageProps {
  params: Promise<{
    id: string
  }>
}

export default function CreatorProfilePage(props: CreatorProfilePageProps) {
  const [params, setParams] = useState<{ id: string } | null>(null)
  const [showNavigator, setShowNavigator] = useState(false)

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

  // ----------------------
  // Toggle Navigator Function
  // Handles opening and closing of the RightRailNavigator
  // ----------------------
  const toggleNavigator = () => {
    setShowNavigator(!showNavigator)
  }

  // ----------------------
  // Right Column Content
  // Combines toggleable RightRailNavigator, AnnouncementStack, and MessagingPanel
  // Location: /src/features/navigation/components/right-rail-navigator.tsx
  // Location: /src/features/right-rail/AnnouncementStack.tsx
  // Location: /src/features/messaging/components/messaging-panel.tsx
  // ----------------------
  const rightColumnContent = (
    <div className="flex flex-col h-full relative space-y-4">
      {/* ----------------------
      // Navigator Toggle Button
      // Fixed position button to open/close navigator
      // ---------------------- */}
      <div className="absolute top-4 right-4 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={toggleNavigator}
          className="h-8 w-8 p-0 bg-background/80 backdrop-blur border-border/60 hover:bg-background/90"
        >
          {showNavigator ? (
            <X className="h-4 w-4" />
          ) : (
            <Menu className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* ----------------------
      // Conditional Navigator Display
      // Shows/hides based on showNavigator state
      // ---------------------- */}
      {showNavigator && (
        <div className="mb-4">
          <RightRailNavigator />
        </div>
      )}
      

      
      <div className="flex-1">
        <MessagingPanel />
      </div>
    </div>
  )

  return (
    <div className="relative">
      {/* ----------------------
      // Main Layout Shell
      // Three-column layout with sidebar, profile content, and right rail navigation + messaging
      // ---------------------- */}
      <ThreeColumnShell 
        leftColumn={<Sidebar />} 
        centerColumn={<CreatorProfile creatorId={params.id} />} 
        rightColumn={rightColumnContent} 
      />
    </div>
  )
}