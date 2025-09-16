"use client"

import { useState, useEffect, useRef, forwardRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

// ----------------------
// Global analytics type extension
// ----------------------
declare global {
  interface Window {
    analytics?: {
      track: (event: string, properties?: Record<string, any>) => void
    }
  }
}
import { Button } from "@src/components/ui/button"
import { Separator } from "@src/components/ui/separator"
import { cn } from "@src/lib/utils"
import { useToast } from "@src/hooks/use-toast"
import {
  Pin,
  Share2,
  AlertTriangle,
  Save
} from "lucide-react"

// ----------------------
// Types and Interfaces
// Component props for InlineActions - embedded post action menu
// Location: /src/features/post-actions/InlineActions.tsx
// ----------------------
export type InlineActionsProps = {
  postId: string
  isOwner: boolean
  onAction?: (event:
    | { type: "pin" }
    | { type: "save" }
    | { type: "share" }
    | { type: "report" }
  ) => void
}

// ----------------------
// Action Button Component
// Individual action row with icon and label
// ----------------------
interface ActionButtonProps {
  icon: React.ReactNode
  label: string
  onClick: () => void
  variant?: "default" | "destructive"
  className?: string
}

const ActionButton = forwardRef<HTMLButtonElement, ActionButtonProps>(
  ({ icon, label, onClick, variant = "default", className }, ref) => {
    return (
      <Button
        ref={ref}
        variant="ghost"
        size="lg"
        className={cn(
          "w-full justify-start gap-4 h-12 px-4 text-left font-medium rounded-lg",
          "hover:bg-accent/50 transition-colors duration-150",
          "touch-manipulation min-h-[48px]", // Ensures 48px minimum for thumb-friendly tapping
          variant === "destructive" && "text-destructive hover:text-destructive hover:bg-destructive/10",
          className
        )}
        onClick={onClick}
      >
        <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center">{icon}</span>
        <span className="text-sm">{label}</span>
      </Button>
    )
  }
)
ActionButton.displayName = "ActionButton"

// ----------------------
// Removed SectionLabel - using compact design without headers
// ----------------------

// ----------------------
// Main InlineActions Component
// Expandable action menu embedded within post cards
// ----------------------
export function InlineActions({
  postId,
  isOwner,
  onAction
}: InlineActionsProps) {
  // ----------------------
  // State Management
  // Component is always "open" when rendered (controlled by parent)
  // ----------------------
  const containerRef = useRef<HTMLDivElement>(null)
  const firstButtonRef = useRef<HTMLButtonElement>(null)
  const isOpen = true // Always open when component is rendered
  
  // ----------------------
  // Toast notifications for user feedback
  // Uses existing toast system from shadcn/ui
  // ----------------------
  const { toast } = useToast()

  // ----------------------
  // Handle action execution
  // Processes user actions and provides feedback
  // ----------------------
  const handleAction = (actionType: string, data?: any) => {
    // Analytics tracking if available
    if (typeof window !== 'undefined' && window.analytics) {
      window.analytics.track('post_action_clicked', {
        postId,
        action: actionType,
        role: isOwner ? 'creator' : 'subscriber'
      })
    }

    // Execute the action callback
    if (onAction) {
      onAction({ type: actionType as any, ...data })
    }

    // Show success toast based on action
    const actionMessages = {
      edit: { title: 'Opening Editor', description: 'Redirecting to post editor' },
      delete: { title: 'Post Deleted', description: 'Your post has been removed' },
      pin: { title: 'Post Pinned', description: 'Post pinned to your profile' },
      share: { title: 'Link Copied', description: 'Share link copied to clipboard' },
      twitter: { title: 'Opening Twitter', description: 'Redirecting to Twitter composer' },
      report: { title: 'Report Submitted', description: 'Thank you for helping keep our community safe' },
      save: { title: 'Post Saved', description: 'Added to your saved posts' },
      favorite: { title: 'Post Favorited', description: 'Added to your favorites' },
      block: { title: 'Creator Blocked', description: 'You will no longer see posts from this creator' }
    }

    const message = actionMessages[actionType as keyof typeof actionMessages]
    if (message) {
      toast({
        title: message.title,
        description: message.description,
      })
    }

    // Parent will handle closing via onAction callback
  }

  // ----------------------
  // Keyboard event handling
  // ESC to close, focus management
  // ----------------------
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        // Let parent handle closing via registry
        const escapeEvent = new CustomEvent('inline-actions-escape', { detail: { postId } })
        window.dispatchEvent(escapeEvent)
        event.preventDefault()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    // Focus first action when mounted
    setTimeout(() => {
      firstButtonRef.current?.focus()
    }, 100)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [postId])

  // ----------------------
  // Outside click detection
  // Close menu when clicking outside the container
  // ----------------------
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        // Let parent handle closing via registry
        const clickEvent = new CustomEvent('inline-actions-outside-click', { detail: { postId } })
        window.dispatchEvent(clickEvent)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [postId])

  // ----------------------
  // Analytics tracking for menu open/close
  // Tracks user engagement with post actions
  // ----------------------
  useEffect(() => {
    if (typeof window !== 'undefined' && window.analytics) {
      if (isOpen) {
        window.analytics.track('post_actions_opened', {
          postId,
          role: isOwner ? 'creator' : 'subscriber'
        })
      } else {
        window.analytics.track('post_actions_closed', {
          postId,
          role: isOwner ? 'creator' : 'subscriber'
        })
      }
    }
  }, [isOpen, postId, isOwner])

  // ----------------------
  // Build role-based action menu
  // Core actions only: Pin/Save, Share, Report
  // ----------------------
  const buildActionMenu = () => {
    if (isOwner) {
      // Creator core actions: Pin to Profile, Share, Report Problem
      return (
        <>
          <ActionButton
            ref={firstButtonRef}
            icon={<Pin />}
            label="Pin to Profile"
            onClick={() => handleAction('pin')}
          />
          <ActionButton
            icon={<Share2 />}
            label="Share"
            onClick={() => handleAction('share')}
          />
          <ActionButton
            icon={<AlertTriangle />}
            label="Report a Problem"
            onClick={() => handleAction('report')}
          />
        </>
      )
    } else {
      // Subscriber core actions: Save/Pin, Share, Report
      return (
        <>
          <ActionButton
            ref={firstButtonRef}
            icon={<Save />}
            label="Save"
            onClick={() => handleAction('save')}
          />
          <ActionButton
            icon={<Share2 />}
            label="Share"
            onClick={() => handleAction('share')}
          />
          <ActionButton
            icon={<AlertTriangle />}
            label="Report"
            onClick={() => handleAction('report')}
          />
        </>
      )
    }
  }

  return (
    <div ref={containerRef} className="w-full">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ scale: 0.95, opacity: 0, height: 0 }}
            animate={{ scale: 1, opacity: 1, height: "auto" }}
            exit={{ scale: 0.95, opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="overflow-hidden relative z-10"
          >
            <div
              role="group"
              aria-label="Post actions"
              className="bg-card border border-border rounded-xl p-4 mt-3 shadow-lg space-y-2"
            >
              {buildActionMenu()}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ----------------------
// Export hook for toggling actions
// Provides external control over the inline actions state
// ----------------------
export function useInlineActions(postId: string) {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => setIsOpen(prev => !prev)
  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)

  return {
    isOpen,
    toggle,
    open,
    close
  }
}