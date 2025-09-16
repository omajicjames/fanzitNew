"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader } from "@src/components/ui/card"
import { Button } from "@src/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@src/components/ui/avatar"
import { Badge } from "@src/components/ui/badge"
import { Heart, MessageCircle, Share, MoreHorizontal, Play, Lock, Crown } from "lucide-react"
import { PostActionsModal } from "./post-actions-modal"
import { InlineActions } from "@src/features/post-actions/InlineActions"
import { usePostActionsRegistry, toggleActions } from "@src/features/post-actions/registry"

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
      id: 1,
      creator: {
        name: "Sarah Fitness",
        handle: "@sarahfit",
        avatar: "/fitness-woman.png",
        verified: true,
        tier: "premium",
      },
      content: {
        type: "video",
        thumbnail: "/fitness-workout-video.png",
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
    },
    {
      id: 2,
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
      },
      engagement: {
        likes: 892,
        comments: 156,
        shares: 45,
      },
      timestamp: "4 hours ago",
    },
    {
      id: 3,
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
        id: post.id === 1 ? "user123" : "creator456", // Make first post owned by current user for testing
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
    const creatorId = post.id === 1 ? "user123" : "creator456" // Use the same logic as in handleOpenModal
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

  return (
    <div className="space-y-6 p-6">
      {/* Feed Header */}
      <div className="sticky top-0 bg-background/80 backdrop-blur-sm border-b border-border pb-4 mb-6">
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
      {posts.map((post) => (
        <Card key={post.id} className="overflow-hidden">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={post.creator.avatar || "/placeholder.svg"} alt={post.creator.name} />
                  <AvatarFallback>
                    {post.creator.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold text-card-foreground">{post.creator.name}</h3>
                    {post.creator.verified && (
                      <Badge variant="secondary" className="text-xs">
                        <Crown className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {post.creator.handle} • {post.timestamp}
                  </p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => handleToggleInlineActions(post)}
                aria-label="More actions"
                aria-expanded={isOpen(post.id.toString())}
                aria-haspopup="menu"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            {/* Content Preview */}
            <div className="relative">
              <img
                src={post.content.thumbnail || "/placeholder.svg"}
                alt={post.content.title}
                className="w-full h-80 object-cover"
              />

              {/* Content Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Play Button for Videos */}
              {post.content.type === "video" && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button size="lg" className="rounded-full bg-primary/90 hover:bg-primary">
                    <Play className="h-6 w-6 ml-1" />
                  </Button>
                </div>
              )}

              {/* Lock Overlay for Premium Content */}
              {post.content.isLocked && (
                <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Lock className="h-12 w-12 mx-auto mb-3" />
                    <p className="text-lg font-semibold">Premium Content</p>
                    <p className="text-sm opacity-90">Unlock for {post.content.price}</p>
                    <Button className="mt-3" variant="secondary">
                      Unlock Now
                    </Button>
                  </div>
                </div>
              )}

              {/* Duration Badge for Videos */}
              {post.content.type === "video" && post.content.duration && (
                <Badge className="absolute bottom-3 right-3 bg-black/70 text-white">{post.content.duration}</Badge>
              )}
            </div>

            {/* Content Info */}
            <div className="p-4">
              <h4 className="font-semibold text-card-foreground mb-2">{post.content.title}</h4>
              <p className="text-sm text-muted-foreground mb-4">{post.content.description}</p>

              {/* Engagement Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-red-500">
                    <Heart className="h-4 w-4 mr-2" />
                    {post.engagement.likes}
                  </Button>
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-blue-500">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    {post.engagement.comments}
                  </Button>
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-green-500">
                    <Share className="h-4 w-4 mr-2" />
                    {post.engagement.shares}
                  </Button>
                </div>

                {!post.content.isLocked && (
                  <Button variant="outline" size="sm">
                    Subscribe
                  </Button>
                )}
              </div>
            </div>
            
            {/* ---------------------- */}
            {/* Inline Post Actions */}
            {/* Embedded expandable actions below post content */}
            {/* Location: /src/features/post-actions/InlineActions.tsx */}
            {/* ---------------------- */}
            {isOpen(post.id.toString()) && (
              <div className="px-4 pb-4">
                <InlineActions
                  postId={post.id.toString()}
                  isOwner={post.id === 1} // First post is owned by current user for testing
                  onAction={(event) => {
                    console.log('Inline action:', event)
                    handleAction(event.type, event)
                    // Auto-collapse after action selection for better mobile UX
                    toggleActions(post.id.toString())
                  }}
                />
              </div>
            )}
          </CardContent>
        </Card>
      ))}
      
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
