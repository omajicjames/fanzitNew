"use client"

import { ThreeColumnShell } from "@src/components/app/layout/three-column-shell"
import { Sidebar } from "@src/components/app/layout/sidebar"
import { MessagingPanel } from "@src/features/messaging/components/messaging-panel"
import { Card, CardContent, CardHeader, CardTitle } from "@src/components/ui/card"
import { Button } from "@src/components/ui/button"
import { Heart, Clock, User, Grid3X3 } from "lucide-react"

// ----------------------
// Liked Page Component
// Location: /app/(protected)/liked/page.tsx
// Parent: Protected route layout
// Children: ThreeColumnShell with Sidebar, LikedContent, MessagingPanel
// ----------------------
function LikedContent() {
  // ----------------------
  // Mock liked content data for demonstration
  // In a real app, this would come from user's liked posts API
  // ----------------------
  const likedContent = [
    { id: 1, title: "Morning Yoga Routine", creator: "Sarah Fitness", likedAt: "2 hours ago", thumbnail: "/placeholder.svg" },
    { id: 2, title: "Pasta Making Tutorial", creator: "Chef Marco", likedAt: "1 day ago", thumbnail: "/placeholder.svg" },
    { id: 3, title: "Digital Art Process", creator: "Art by Luna", likedAt: "3 days ago", thumbnail: "/placeholder.svg" },
    { id: 4, title: "Music Production Tips", creator: "BeatMaker Pro", likedAt: "1 week ago", thumbnail: "/placeholder.svg" },
  ]

  return (
    <div className="space-y-6 p-6">
      {/* ---------------------- */}
      {/* Page header with heart icon and description */}
      {/* ---------------------- */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
          <Heart className="h-8 w-8 text-red-500 fill-current" />
          Liked
        </h1>
        <p className="text-muted-foreground">
          Your favorite content and saved posts
        </p>
      </div>

      {/* ---------------------- */}
      {/* Liked content statistics */}
      {/* Shows overview of user's liked content */}
      {/* ---------------------- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Heart className="h-5 w-5 text-red-500" />
              Total Liked
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{likedContent.length}</p>
            <p className="text-sm text-muted-foreground">Posts you've liked</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg">
              <User className="h-5 w-5 text-blue-500" />
              Creators
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{new Set(likedContent.map(item => item.creator)).size}</p>
            <p className="text-sm text-muted-foreground">Different creators</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Clock className="h-5 w-5 text-green-500" />
              Recent
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">2</p>
            <p className="text-sm text-muted-foreground">Liked today</p>
          </CardContent>
        </Card>
      </div>

      {/* ---------------------- */}
      {/* View toggle buttons */}
      {/* Allows switching between different view modes */}
      {/* ---------------------- */}
      <div className="flex justify-center gap-2">
        <Button variant="outline" size="sm">
          <Grid3X3 className="h-4 w-4 mr-2" />
          Grid View
        </Button>
        <Button variant="outline" size="sm">
          <Clock className="h-4 w-4 mr-2" />
          Recent First
        </Button>
      </div>

      {/* ---------------------- */}
      {/* Liked content grid */}
      {/* Displays user's liked posts in a grid layout */}
      {/* ---------------------- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {likedContent.map((item) => (
          <Card key={item.id} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">by {item.creator}</p>
                </div>
                <Heart className="h-5 w-5 text-red-500 fill-current" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                Liked {item.likedAt}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ---------------------- */}
      {/* Empty state message when no liked content */}
      {/* ---------------------- */}
      {likedContent.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No liked content yet</h3>
            <p className="text-muted-foreground mb-4">
              Start exploring and like content to see it here
            </p>
            <Button>Explore Content</Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default function LikedPage() {
  return (
    <ThreeColumnShell 
      leftColumn={<Sidebar />} 
      centerColumn={<LikedContent />} 
      rightColumn={<MessagingPanel />} 
    />
  )
}