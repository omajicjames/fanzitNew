"use client"

import { useState, useEffect } from "react"
import { Button } from "@src/components/ui/button"
import PostCard from "@src/features/post/PostCard"
import { PostDataAdapter } from "@src/features/post/adapters/PostDataAdapter"
import { PostActionsModal } from "./post-actions-modal"
import { usePostActionsRegistry, toggleActions } from "@src/features/post-actions/registry"
import { toast } from "@src/hooks/use-toast"

export function MainFeed() {
  // ----------------------
  // State Management
  // ----------------------
  const [selectedPost, setSelectedPost] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  // ----------------------
  // Post Actions Registry for inline actions
  // Manages which post has expanded actions (only one at a time)
  // ----------------------
  const { openPostId, openActions, closeAll, isOpen } = usePostActionsRegistry()
  
  // ----------------------
  // Handle ESC and outside-click events from InlineActions
  // ----------------------
  useEffect(() => {
    const handleEscape = (event: CustomEvent) => {
      closeAll()
    }
    
    const handleOutsideClick = (event: CustomEvent) => {
      closeAll()
    }
    
    window.addEventListener('inline-actions-escape' as any, handleEscape)
    window.addEventListener('inline-actions-outside-click' as any, handleOutsideClick)
    
    return () => {
      window.removeEventListener('inline-actions-escape' as any, handleEscape)
      window.removeEventListener('inline-actions-outside-click' as any, handleOutsideClick)
    }
  }, [closeAll])
  
  // ----------------------
  // Mock current user data
  // ----------------------
  const currentUser = {
    id: "user123",
    role: "subscriber" as const // Change to "creator" to test creator actions
  }
  
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
        avatar: "/trader-analysis.png",
        verified: true,
        tier: "pro",
      },
      content: {
        type: "text",
        thumbnail: "/market-analysis.png",
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
      preview_url: "/market-analysis.png",
    },
  ]
  
  // ----------------------
  // Action Handlers
  // ----------------------
  const handleOpenModal = (post: any) => {
    // Add settings to post data for modal
    const postWithSettings = {
      ...post,
      creator: {
        id: post.id === "1" ? "user123" : "creator456", // Make first post owned by current user for testing
        name: post.creator.name,
        handle: post.creator.handle
      },
      settings: {
        commentsEnabled: true,
        isPinned: false
      }
    }
    setSelectedPost(postWithSettings)
    setIsModalOpen(true)
  }
  
  // ----------------------
  // Handle toggling inline actions for a post
  // Uses the new functional registry with toggleActions
  // ----------------------
  const handleToggleInlineActions = (post: any) => {
    const postId = post.id.toString()
    const creatorId = post.id === "1" ? "user123" : "creator456" // Use the same logic as in handleOpenModal
    const wasOpen = isOpen(postId)
    
    // Toggle the actions using the new functional approach
    toggleActions(postId)
    
    // Analytics: track the action
    if (typeof window !== 'undefined' && window.analytics) {
      window.analytics.track(wasOpen ? 'post_actions_closed' : 'post_actions_opened', {
        postId,
        role: currentUser?.id === creatorId ? 'creator' : 'subscriber'
      })
    }
  }
  
  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedPost(null)
  }
  
  const handleAction = (action: string, data?: any) => {
    console.log(`Action: ${action}`, data)
    // Here you would implement the actual action logic
    // For now, just log the action
  }

  // ----------------------
  // Paywall Event Handlers
  // ----------------------
  const handlePaywallUnlock = (postId: string) => {
    console.log('Paywall unlock requested for post:', postId)
    toast({
      title: "Unlock Content",
      description: "Opening subscription options...",
    })
  }

  const handlePaywallUpgrade = (postId: string, tier: string) => {
    console.log('Paywall upgrade requested for post:', postId, 'tier:', tier)
    toast({
      title: "Subscription Upgrade",
      description: `Upgrading to ${tier} tier...`,
    })
  }

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
                  console.log('Opening pricing plans modal for post:', post.id)
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
      
      {/* ---------------------- */}
      {/* Post Actions Modal */}
      {/* ---------------------- */}
      {selectedPost && (
        <PostActionsModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          post={selectedPost}
          currentUser={currentUser}
          onAction={handleAction}
        />
      )}
    </div>
  )
}
