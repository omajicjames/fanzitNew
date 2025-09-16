"use client"

import { Button } from "@src/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@src/components/ui/avatar"
import { Badge } from "@src/components/ui/badge"
import { Home, Search, Heart, MessageCircle, User, Settings, TrendingUp, Star, Crown } from "lucide-react"
import { useRouter } from "next/navigation"

// ----------------------
// Sidebar Navigation Component
// Location: /src/components/app/layout/sidebar.tsx
// Parent: ThreeColumnShell component in app/(public)/page.tsx
// Children: Navigation buttons, subscription list, user profile section
// ----------------------
export function Sidebar() {
  const router = useRouter()

  // ----------------------
  // Navigation handler function
  // Handles routing to different pages when navigation buttons are clicked
  // ----------------------
  const handleNavigation = (path: string) => {
    router.push(path)
  }

  return (
    <div className="flex flex-col h-full p-4 space-y-6">
      {/* Logo/Brand */}
      <div className="flex items-center space-x-2 px-2">
        <Crown className="h-8 w-8 text-primary" />
        <h1 className="text-xl font-bold text-sidebar-foreground">CreatorHub</h1>
      </div>

      {/* Navigation Menu */}
      {/* ---------------------- */}
      {/* Main navigation buttons with routing functionality */}
      {/* Routes to: Home (/), Explore (coming soon), Trending (coming soon), Liked (coming soon), Messages (/messages) */}
      {/* ---------------------- */}
      <nav className="space-y-2">
        <Button
          variant="ghost"
          className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          onClick={() => handleNavigation('/')}
        >
          <Home className="mr-3 h-5 w-5" />
          Home
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          onClick={() => handleNavigation('/explore')}
        >
          <Search className="mr-3 h-5 w-5" />
          Explore
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          onClick={() => handleNavigation('/trending')}
        >
          <TrendingUp className="mr-3 h-5 w-5" />
          Trending
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          onClick={() => handleNavigation('/liked')}
        >
          <Heart className="mr-3 h-5 w-5" />
          Liked
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          onClick={() => handleNavigation('/messages')}
        >
          <MessageCircle className="mr-3 h-5 w-5" />
          Messages
          <Badge variant="secondary" className="ml-auto">
            3
          </Badge>
        </Button>
      </nav>

      {/* Subscriptions Section */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-sidebar-muted-foreground px-2">Subscriptions</h3>
        {/* ---------------------- */}
        {/* Subscription creator buttons with profile navigation */}
        {/* Routes to: /creator/profile/[id] for each subscribed creator */}
        {/* ---------------------- */}
        <div className="space-y-2">
          {[
            { id: 2, name: "Sarah Fitness", avatar: "/fitness-woman.png", online: true },
            { id: 3, name: "Chef Marco", avatar: "/chef-cooking.png", online: false },
            { id: 4, name: "Art by Luna", avatar: "/artist-painting.png", online: true },
          ].map((creator) => (
            <Button
              key={creator.name}
              variant="ghost"
              className="w-full justify-start p-2 h-auto text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              onClick={() => handleNavigation(`/creator/profile/${creator.id}`)}
            >
              <div className="relative mr-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={creator.avatar || "/placeholder.svg"} alt={creator.name} />
                  <AvatarFallback>
                    {creator.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                {creator.online && (
                  <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 border-2 border-sidebar rounded-full" />
                )}
              </div>
              <span className="text-sm">{creator.name}</span>
              <Star className="ml-auto h-4 w-4 text-primary" />
            </Button>
          ))}
        </div>
      </div>

      {/* User Profile Section */}
      {/* ---------------------- */}
      {/* User profile and settings navigation */}
      {/* Routes to: Profile (/creator/profile/1), Settings (coming soon) */}
      {/* ---------------------- */}
      <div className="mt-auto space-y-3">
        <Button
          variant="ghost"
          className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          onClick={() => handleNavigation('/creator/profile/1')}
        >
          <User className="mr-3 h-5 w-5" />
          Profile
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          onClick={() => handleNavigation('/settings')}
        >
          <Settings className="mr-3 h-5 w-5" />
          Settings
        </Button>

        {/* Current User */}
        <div className="flex items-center space-x-3 p-2 rounded-lg bg-sidebar-accent">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/user-profile-illustration.png" alt="You" />
            <AvatarFallback>YU</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-sidebar-accent-foreground truncate">Your Name</p>
            <p className="text-xs text-sidebar-muted-foreground truncate">@yourhandle</p>
          </div>
        </div>
      </div>
    </div>
  )
}
