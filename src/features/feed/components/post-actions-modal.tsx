"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@src/components/ui/dialog"
import { Button } from "@src/components/ui/button"
import { Separator } from "@src/components/ui/separator"
import { cn } from "@src/lib/utils"
import { useToast } from "@src/hooks/use-toast"
import {
  Edit3,
  Trash2,
  Pin,
  Share2,
  Twitter,
  MessageCircleOff,
  AlertTriangle,
  RotateCcw,
  ExternalLink,
  Save,
  Shield,
  X
} from "lucide-react"

// ----------------------
// Types and Interfaces
// ----------------------
interface PostActionsModalProps {
  isOpen: boolean
  onClose: () => void
  post: {
    id: string
    creator: {
      id: string
      name: string
      handle: string
    }
    content: {
      title: string
      type: "image" | "video"
    }
    settings: {
      commentsEnabled: boolean
      isPinned: boolean
    }
  }
  currentUser: {
    id: string
    role: "creator" | "subscriber"
  }
  onAction: (action: string, data?: any) => void
}

// ----------------------
// Action Button Component
// ----------------------
interface ActionButtonProps {
  icon: React.ReactNode
  label: string
  onClick: () => void
  variant?: "default" | "destructive"
  className?: string
}

interface ActionButtonProps {
  icon: React.ReactNode
  label: string
  onClick: () => void
  variant?: "default" | "destructive"
  isDanger?: boolean
  className?: string
}

function ActionButton({ icon, label, onClick, variant = "default", isDanger = false, className }: ActionButtonProps) {
  return (
    <Button
      variant="ghost"
      className={cn(
        "w-full justify-start h-8 px-2 text-left font-medium rounded-md",
        "hover:bg-muted/50 active:bg-muted/70 transition-all duration-150",
        "border border-transparent hover:border-border/20",
        variant === "destructive" && "text-destructive hover:text-destructive hover:bg-destructive/10 hover:border-destructive/20",
        isDanger && "bg-destructive/5 border-destructive/20",
        className
      )}
      onClick={onClick}
    >
      <span className="mr-2 flex-shrink-0 text-sm">{icon}</span>
      <span className="text-xs">{label}</span>
    </Button>
  )
}

// ----------------------
// Main PostActionsModal Component
// ----------------------
export function PostActionsModal({ isOpen, onClose, post, currentUser, onAction }: PostActionsModalProps) {
  // ----------------------
  // State Management
  // ----------------------
  const [isAnimating, setIsAnimating] = useState(false)
  const [startY, setStartY] = useState(0)
  const [currentY, setCurrentY] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  
  // ----------------------
  // Toast notifications for user feedback
  // ----------------------
  const { toast } = useToast()
  
  // ----------------------
  // Determine if current user is the post creator
  // ----------------------
  const isCreator = currentUser.id === post.creator.id
  
  // ----------------------
  // Handle modal open/close animations
  // ----------------------
  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true)
    }
  }, [isOpen])
  
  // ----------------------
  // Touch gesture handlers for swipe down to dismiss
  // ----------------------
  const handleTouchStart = (e: React.TouchEvent) => {
    setStartY(e.touches[0].clientY)
    setIsDragging(true)
  }
  
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return
    
    const currentY = e.touches[0].clientY
    const deltaY = currentY - startY
    
    // Only allow downward swipes
    if (deltaY > 0) {
      setCurrentY(deltaY)
    }
  }
  
  const handleTouchEnd = () => {
    if (!isDragging) return
    
    setIsDragging(false)
    
    // If swiped down more than 100px, close the modal
    if (currentY > 100) {
      onClose()
    }
    
    // Reset position
    setCurrentY(0)
    setStartY(0)
  }
  
  // ----------------------
  // Handle backdrop click to close modal
  // ----------------------
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }
  
  // ----------------------
  // Action Handlers
  // ----------------------
  const handleAction = (actionType: string, data?: any) => {
    onAction(actionType, data)
    
    // Show success toast based on action
    const actionMessages = {
      edit: { title: 'Post Updated', description: 'Your post has been edited successfully' },
      delete: { title: 'Post Deleted', description: 'Your post has been removed' },
      pin: { title: 'Post Pinned', description: 'Post pinned to your profile' },
      share: { title: 'Link Copied', description: 'Share link copied to clipboard' },
      twitter: { title: 'Opening Twitter', description: 'Redirecting to Twitter composer' },
      toggleComments: { title: 'Comments Updated', description: 'Comment settings have been changed' },
      report: { title: 'Report Submitted', description: 'Thank you for helping keep our community safe' },
      repost: { title: 'Reposted', description: 'Post shared to your feed' },
      save: { title: 'Post Saved', description: 'Added to your saved posts' },
      block: { title: 'Creator Blocked', description: 'You will no longer see posts from this creator' },
      shareExternal: { title: 'Link Copied', description: 'Share link copied to clipboard' },
      pinToFavorites: { title: 'Post Pinned', description: 'Added to your pinned posts' }
    }
    
    const message = actionMessages[actionType as keyof typeof actionMessages]
    if (message) {
      toast({
        title: message.title,
        description: message.description,
      })
    }
    
    onClose()
  }
  
  // ----------------------
  // Creator Actions - Grouped by Priority (Top: frequent/positive, Middle: distribution, Bottom: danger/utility)
  // ----------------------
  const creatorActions = [
    // Top group: frequent, positive actions
    {
      icon: <Edit3 className="h-5 w-5" />,
      label: "Edit Post",
      action: () => handleAction("edit"),
      group: "frequent",
      priority: 1
    },
    {
      icon: <Pin className="h-5 w-5" />,
      label: post.settings.isPinned ? "Unpin from Profile" : "Pin to Profile",
      action: () => handleAction("pin", { isPinned: !post.settings.isPinned }),
      group: "frequent",
      priority: 2
    },
    // Middle group: distribution
    {
      icon: <Share2 className="h-5 w-5" />,
      label: "Share",
      action: () => handleAction("share"),
      group: "distribution",
      priority: 3
    },
    {
      icon: <Twitter className="h-5 w-5" />,
      label: "Manual Twitter",
      action: () => handleAction("twitter"),
      group: "distribution",
      priority: 4
    },
    // Danger zone: separated with red highlight
    {
      icon: <Trash2 className="h-5 w-5" />,
      label: "Delete Post",
      action: () => handleAction("delete"),
      variant: "destructive" as const,
      group: "danger",
      priority: 5
    },
    // Utility: small footer-style items
    {
      icon: <MessageCircleOff className="h-5 w-5" />,
      label: post.settings.commentsEnabled ? "Turn Off Comments" : "Turn On Comments",
      action: () => handleAction("toggleComments", { enabled: !post.settings.commentsEnabled }),
      group: "utility",
      priority: 6
    },
    {
      icon: <AlertTriangle className="h-5 w-5" />,
      label: "Report Problem",
      action: () => handleAction("report"),
      group: "utility",
      priority: 7
    }
  ]
  
  // ----------------------
  // Subscriber Actions - Grouped by Priority (Top: engagement, Middle: sharing, Bottom: danger)
  // ----------------------
  const subscriberActions = [
    // Top group: engagement actions
    {
      icon: <Save className="h-5 w-5" />,
      label: "Save Post",
      action: () => handleAction("save"),
      group: "engagement",
      priority: 1
    },
    {
      icon: <Pin className="h-5 w-5" />,
      label: "Pin/Favorite",
      action: () => handleAction("pinToFavorites"),
      group: "engagement",
      priority: 2
    },
    {
      icon: <RotateCcw className="h-5 w-5" />,
      label: "Repost",
      action: () => handleAction("repost"),
      group: "engagement",
      priority: 3
    },
    // Middle group: sharing
    {
      icon: <ExternalLink className="h-5 w-5" />,
      label: "Share Externally",
      action: () => handleAction("shareExternal"),
      group: "sharing",
      priority: 4
    },
    // Bottom group: danger actions
    {
      icon: <AlertTriangle className="h-5 w-5" />,
      label: "Report",
      action: () => handleAction("report"),
      group: "danger",
      priority: 5
    },
    {
      icon: <Shield className="h-5 w-5" />,
      label: "Block",
      action: () => handleAction("block"),
      variant: "destructive" as const,
      group: "danger",
      priority: 6
    }
  ]
  
  // ----------------------
  // Get actions based on user role
  // ----------------------
  const actions = isCreator ? creatorActions : subscriberActions
  
  // ----------------------
  // Group actions by category
  // ----------------------
  const groupedActions = actions.reduce((acc, action) => {
    if (!acc[action.group]) {
      acc[action.group] = []
    }
    acc[action.group].push(action)
    return acc
  }, {} as Record<string, typeof actions>)
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className={cn(
          "max-w-[240px] mx-auto p-0 gap-0 border-0 bg-transparent shadow-none",
          "fixed bottom-0 left-0 right-0 top-auto sm:bottom-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2",
          "data-[state=open]:animate-in data-[state=open]:slide-in-from-bottom-full data-[state=open]:duration-300",
          "data-[state=closed]:animate-out data-[state=closed]:slide-out-to-bottom-full data-[state=closed]:duration-200",
          "sm:data-[state=open]:slide-in-from-bottom-4 sm:data-[state=open]:fade-in-0",
          "sm:data-[state=closed]:slide-out-to-bottom-4 sm:data-[state=closed]:fade-out-0"
        )}
        onPointerDownOutside={onClose}
        onClick={handleBackdropClick}
      >
        {/* ---------------------- */}
        {/* Mobile-First Bottom Action Sheet Container */}
        {/* ---------------------- */}
        <div 
          className={cn(
            "bg-background border border-border rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden",
            "transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]",
            "backdrop-blur-sm relative z-30"
          )}
          style={{
            transform: `translateY(${currentY}px)`,
            opacity: isDragging ? Math.max(0.7, 1 - currentY / 300) : 1
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* ---------------------- */}
          {/* Drag Handle Indicator - Thin Gray Bar */}
          {/* ---------------------- */}
          <div className="flex justify-center py-1.5 bg-muted/20 cursor-grab active:cursor-grabbing">
            <div className="w-6 h-0.5 bg-muted-foreground/40 rounded-full" />
          </div>
          
          {/* ---------------------- */}
          {/* Actions Content - Grouped by Priority */}
          {/* ---------------------- */}
          <div className="px-2 pb-3">
            {Object.entries(groupedActions).map(([groupName, groupActions], groupIndex) => (
              <div key={groupName} className="mb-1 last:mb-0">
                {groupIndex > 0 && (
                  <Separator className={cn(
                    "my-1.5",
                    groupName === 'danger' && "bg-destructive/20"
                  )} />
                )}
                <div className="space-y-0.5">
                  {groupActions.map((action, index) => (
                    <ActionButton
                      key={index}
                      icon={action.icon}
                      label={action.label}
                      onClick={action.action}
                      variant={action.variant}
                      isDanger={groupName === 'danger'}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}