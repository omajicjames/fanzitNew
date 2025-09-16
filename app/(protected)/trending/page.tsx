"use client"

import { ThreeColumnShell } from "@src/components/app/layout/three-column-shell"
import { Sidebar } from "@src/components/app/layout/sidebar"
import { MessagingPanel } from "@src/features/messaging/components/messaging-panel"
import { Card, CardContent, CardHeader, CardTitle } from "@src/components/ui/card"
import { Badge } from "@src/components/ui/badge"
import { TrendingUp, Flame, Clock, Eye, Heart } from "lucide-react"

// ----------------------
// Trending Page Component
// Location: /app/(protected)/trending/page.tsx
// Parent: Protected route layout
// Children: ThreeColumnShell with Sidebar, TrendingContent, MessagingPanel
// ----------------------
function TrendingContent() {
  // ----------------------
  // Mock trending data for demonstration
  // In a real app, this would come from an API
  // ----------------------
  const trendingContent = [
    { id: 1, title: "Fitness Challenge Day 30", creator: "Sarah Fitness", views: "12.5K", likes: "2.1K", trend: "+45%" },
    { id: 2, title: "Cooking Masterclass: Italian Pasta", creator: "Chef Marco", views: "8.9K", likes: "1.8K", trend: "+32%" },
    { id: 3, title: "Digital Art Speed Paint", creator: "Art by Luna", views: "15.2K", likes: "3.2K", trend: "+67%" },
    { id: 4, title: "Music Production Tutorial", creator: "BeatMaker Pro", views: "6.7K", likes: "1.2K", trend: "+28%" },
  ]

  return (
    <div className="space-y-6 p-6">
      {/* ---------------------- */}
      {/* Page header with trending icon and description */}
      {/* ---------------------- */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
          <TrendingUp className="h-8 w-8 text-primary" />
          Trending
        </h1>
        <p className="text-muted-foreground">
          See what's hot and gaining momentum right now
        </p>
      </div>

      {/* ---------------------- */}
      {/* Trending metrics overview cards */}
      {/* Shows different trending categories and timeframes */}
      {/* ---------------------- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Flame className="h-5 w-5 text-red-500" />
              Hot Now
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">127</p>
            <p className="text-sm text-muted-foreground">Trending posts</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Clock className="h-5 w-5 text-blue-500" />
              Last 24h
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">89</p>
            <p className="text-sm text-muted-foreground">New trending</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg">
              <TrendingUp className="h-5 w-5 text-green-500" />
              Rising Fast
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">43</p>
            <p className="text-sm text-muted-foreground">Rapid growth</p>
          </CardContent>
        </Card>
      </div>

      {/* ---------------------- */}
      {/* Trending content list */}
      {/* Displays trending posts with metrics and growth indicators */}
      {/* ---------------------- */}
      <Card>
        <CardHeader>
          <CardTitle>Top Trending Content</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {trendingContent.map((item, index) => (
              <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">by {item.creator}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    {item.views}
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="h-4 w-4" />
                    {item.likes}
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    {item.trend}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function TrendingPage() {
  return (
    <ThreeColumnShell 
      leftColumn={<Sidebar />} 
      centerColumn={<TrendingContent />} 
      rightColumn={<MessagingPanel />} 
    />
  )
}