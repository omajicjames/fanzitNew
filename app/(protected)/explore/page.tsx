"use client"

import { ThreeColumnShell } from "@src/components/app/layout/three-column-shell"
import { Sidebar } from "@src/components/app/layout/sidebar"
import { MessagingPanel } from "@src/features/messaging/components/messaging-panel"
import { Card, CardContent, CardHeader, CardTitle } from "@src/components/ui/card"
import { Search, TrendingUp, Users, Hash } from "lucide-react"

// ----------------------
// Explore Page Component
// Location: /app/(protected)/explore/page.tsx
// Parent: Protected route layout
// Children: ThreeColumnShell with Sidebar, ExploreContent, MessagingPanel
// ----------------------
function ExploreContent() {
  return (
    <div className="space-y-6 p-6">
      {/* ---------------------- */}
      {/* Page header with title and description */}
      {/* ---------------------- */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
          <Search className="h-8 w-8 text-primary" />
          Explore
        </h1>
        <p className="text-muted-foreground">
          Discover new creators and trending content
        </p>
      </div>

      {/* ---------------------- */}
      {/* Explore categories grid */}
      {/* Contains different content discovery sections */}
      {/* ---------------------- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Trending Now
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              See what's popular across the platform
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              New Creators
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Find fresh talent and emerging creators
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Hash className="h-5 w-5" />
              Categories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Browse content by topic and interest
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Search
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Find specific creators or content
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function ExplorePage() {
  return (
    <ThreeColumnShell 
      leftColumn={<Sidebar />} 
      centerColumn={<ExploreContent />} 
      rightColumn={<MessagingPanel />} 
    />
  )
}