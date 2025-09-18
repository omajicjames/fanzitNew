"use client"

import { useEffect } from "react"
import { Button } from "@src/components/ui/button"
import PostCard from "@src/features/post/PostCard"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { PostDataAdapter, LegacyPost } from "@src/features/post/adapters/PostDataAdapter"

// ----------------------
// Custom Event Interfaces
// ----------------------
interface InlineActionsEscapeEvent extends CustomEvent {
  type: 'inline-actions-escape'
}

interface InlineActionsOutsideClickEvent extends CustomEvent {
  type: 'inline-actions-outside-click'
}

import { usePostActionsRegistry } from "@src/features/post-actions/registry"
import { toast } from "@src/hooks/use-toast"
import { logger } from "@src/lib/logger"

export function MainFeed() {
  // ----------------------
  // State Management
  // ----------------------

  
  // ----------------------
  // Post Actions Registry for inline actions
  // Manages which post has expanded actions (only one at a time)
  // ----------------------
  const { closeAll } = usePostActionsRegistry()
  
  // ----------------------
  // Handle ESC and outside-click events from InlineActions
  // ----------------------
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleEscape = (_event: InlineActionsEscapeEvent) => {
      closeAll()
    }
    
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleOutsideClick = (_event: InlineActionsOutsideClickEvent) => {
      closeAll()
    }
    
    window.addEventListener('inline-actions-escape', handleEscape as EventListener)
    window.addEventListener('inline-actions-outside-click', handleOutsideClick as EventListener)
    
    return () => {
      window.removeEventListener('inline-actions-escape', handleEscape as EventListener)
      window.removeEventListener('inline-actions-outside-click', handleOutsideClick as EventListener)
    }
  }, [closeAll])
  
  // ----------------------
  // Mock current user data (removed - not currently used)
  // ----------------------
  
  // ----------------------
  // Mock posts data
  // ----------------------
  const posts = [
    {
      id: "1",
      creator: {
        name: "Sarah Fitness",
        handle: "@sarahfit",
        avatar: "/fitness-woman-avatar.svg",
        verified: true,
        tier: "premium",
      },
      content: {
        type: "video",
        thumbnail: "/fitness-workout-video.svg",
        title: "Morning Yoga Flow - 20 Minutes",
        description:
          "Start your day with this energizing yoga sequence perfect for beginners and advanced practitioners.",
        duration: "20:15",
        isLocked: false,
      },
      engagement: {
        likes: 1247,
        comments: 89,
        shares: 23,
      },
      timestamp: "2 hours ago",
      has_premium: false,
      unlocked: true,
    },
    {
      id: "2",
      creator: {
        name: "Chef Marco",
        handle: "@chefmarco",
        avatar: "/chef-cooking.png",
        verified: true,
        tier: "premium",
      },
      content: {
        type: "image",
        thumbnail: "/gourmet-pasta.png",
        title: "Homemade Truffle Pasta Recipe",
        description: "Learn how to make restaurant-quality truffle pasta at home with simple ingredients.",
        isLocked: true,
        price: "$4.99",
        requiredTier: "premium" as const,
      },
      engagement: {
        likes: 892,
        comments: 156,
        shares: 45,
      },
      timestamp: "4 hours ago",
      has_premium: true,
      unlocked: false,
      price_cents: 499,
      preview_url: "/gourmet-pasta.png",
    },
    {
      id: "3",
      creator: {
        name: "Art by Luna",
        handle: "@artbyluna",
        avatar: "/artist-painting.png",
        verified: false,
        tier: "standard",
      },
      content: {
        type: "image",
        thumbnail: "/digital-art-portrait.png",
        title: "Digital Portrait Process",
        description: "Behind the scenes of creating a digital portrait from sketch to final render.",
        isLocked: false,
      },
      engagement: {
        likes: 634,
        comments: 67,
        shares: 12,
      },
      timestamp: "6 hours ago",
      has_premium: false,
      unlocked: true,
    },
    {
      id: "4",
      creator: {
        name: "Pro Trader Alex",
        handle: "@protraderalex",
        avatar: "/fitness-woman-avatar.svg",
        verified: true,
        tier: "pro",
      },
      content: {
        type: "text",
        thumbnail: "/fitness-workout-banner.svg",
        title: "Advanced Market Analysis Techniques",
        description: "Exclusive pro-level trading strategies and market analysis methods used by institutional traders.",
        isLocked: true,
        price: "$9.99",
        requiredTier: "pro" as const,
      },
      engagement: {
        likes: 2156,
        comments: 234,
        shares: 89,
      },
      timestamp: "8 hours ago",
      has_premium: true,
      unlocked: false,
      price_cents: 999,
      preview_url: "/fitness-workout-banner.svg",
    },
  ]
  
  // ----------------------
  // Action Handlers
  // ----------------------

  return (
    <div className="relative z-0 p-6">
      {/* Feed Header */}
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-sm border-b border-border pb-4 mb-6">
        <h2 className="text-2xl font-bold text-foreground">Your Feed</h2>
        <div className="flex space-x-2 mt-3">
          <Button variant="default" size="sm">
            Following
          </Button>
          <Button variant="outline" size="sm">
            Trending
          </Button>
          <Button variant="outline" size="sm">
            New
          </Button>
        </div>
      </div>

      {/* Posts */}
      {/* ---------------------- */}
      {/* V2 Feed List Container - Single source of spacing truth */}
      {/* Component: PostCard from /src/features/post/PostCard.tsx */}
      {/* Adapter: PostDataAdapter from /src/features/post/adapters/PostDataAdapter.ts */}
      {/* List owns ALL vertical spacing via gap-6, cards have no outer margins */}
      {/* ---------------------- */}
      <ul className="flex flex-col gap-6">
        {posts.map((post) => {
          // ----------------------
          // Convert legacy post data to PostView format
          // Uses PostDataAdapter to normalize data structure
          // ----------------------
          const postView = PostDataAdapter.fromLegacyPost(post)
          
          return (
            <li key={post.id}>
              <PostCard
                view={postView}
                openPricingPlansModal={() => {
                  logger.info(`Opening pricing plans modal for post: ${post.id}`, "MainFeed")
                  toast({
                    title: "Subscription Required",
                    description: "Opening subscription options...",
                  })
                }}
                size="default"
              />
            </li>
          )
        })}
      </ul>
      

    </div>
  )
}
