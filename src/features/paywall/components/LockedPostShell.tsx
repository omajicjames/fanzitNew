'use client'

import { useState, useRef, useEffect } from 'react'
import { Card, CardContent, CardHeader } from '@src/components/ui/card'
import { Button } from '@src/components/ui/button'
import { Badge } from '@src/components/ui/badge'
import { cn } from '@src/lib/utils'
import { toast } from '@src/hooks/use-toast'
import {
  Lock,
  Unlock,
  Eye,
  EyeOff,
  Play,
  Image as ImageIcon,
  FileText,
  Zap,
  Star,
  Crown,
  ChevronRight
} from 'lucide-react'
import { paywallClient, type SubscriptionTier, type UserSubscription } from '../mock/paywallClient'
import { PaywallPill } from './PaywallPill'
import { PaywallDialog } from './PaywallDialog'
import { formatHandle, formatRelativeTime } from '@src/lib/format'
import AuthorHeader, { createAuthorCore } from '@src/components/post/AuthorHeader'

// ----------------------
// LockedPostShell Component Props
// Location: /src/features/paywall/components/LockedPostShell.tsx
// Parent: MainFeed component and other content containers
// Children: Card, PaywallPill, PaywallDialog components
// ----------------------
export interface LockedPostShellProps {
  // Content props
  title: string
  excerpt?: string
  author: {
    name: string
    avatar?: string
    username?: string
  }
  createdAt: string
  requiredTier: SubscriptionTier
  
  // Media props
  previewImage?: string
  mediaType?: 'image' | 'video' | 'text' | 'mixed'
  mediaCount?: number
  
  // Modern overlay props
  postId?: string
  priceCents?: number
  useV2?: boolean
  openPricingPlansModal?: () => void
  
  // Interaction props
  onUnlock?: () => void
  onUpgrade?: () => void
  className?: string
  
  // Preview settings
  showPreview?: boolean
  previewLines?: number
  blurIntensity?: 'light' | 'medium' | 'heavy'
  
  // Children content (the actual locked content)
  children?: React.ReactNode
  
  // Header display options
  showAuthorHeader?: boolean
}

// ----------------------
// Media Type Configuration
// Defines icons and styling for different content types
// ----------------------
interface MediaTypeConfig {
  icon: React.ComponentType<{ className?: string }>
  label: string
  color: string
  bgColor: string
}

/**
 * LockedPostShell Component
 * Wraps premium content with blur effects and upgrade prompts
 * Implements mobile-first design with touch-friendly interactions
 */
export function LockedPostShell({
  title,
  excerpt,
  author,
  createdAt,
  requiredTier,
  previewImage,
  mediaType = 'text',
  mediaCount = 1,
  postId,
  priceCents,
  useV2 = false,
  openPricingPlansModal,
  onUnlock,
  onUpgrade,
  className,
  showPreview = true,
  previewLines = 3,
  blurIntensity = 'medium',
  showAuthorHeader = true,
  children
}: LockedPostShellProps) {
  // ----------------------
  // Component State Management
  // Handles dialog state, hover effects, and user interactions
  // ----------------------
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [showFullPreview, setShowFullPreview] = useState(false)
  const [peekUntil, setPeekUntil] = useState<number | null>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  // ----------------------
  // Track Function for Analytics
  // Handles event tracking for user interactions
  // ----------------------
  const track = (event: string, properties?: Record<string, any>) => {
    // Analytics tracking implementation
    console.log('Track event:', event, properties)
  }

  // ----------------------
  // Media Type Configuration
  // Visual styling for different content types
  // ----------------------
  const mediaTypeConfigs: Record<string, MediaTypeConfig> = {
    image: {
      icon: ImageIcon,
      label: 'Image',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-950/20'
    },
    video: {
      icon: Play,
      label: 'Video',
      color: 'text-red-600',
      bgColor: 'bg-red-50 dark:bg-red-950/20'
    },
    text: {
      icon: FileText,
      label: 'Article',
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-950/20'
    },
    mixed: {
      icon: ImageIcon,
      label: 'Mixed Media',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-950/20'
    }
  }

  // ----------------------
  // Helper Functions
  // Utility functions for component logic
  // ----------------------

  /**
   * Check if user has access to content
   */
  const hasAccess = (): boolean => {
    // Check if peek is active
    if (peekUntil && Date.now() < peekUntil) {
      return true
    }
    const access = paywallClient.checkContentAccess(requiredTier)
    return access.canView
  }

  // ----------------------
  // Peek Timer Effect
  // Handles automatic peek expiration
  // ----------------------
  useEffect(() => {
    if (!peekUntil) return

    const timeRemaining = peekUntil - Date.now()
    if (timeRemaining <= 0) {
      setPeekUntil(null)
      return
    }

    const timer = setTimeout(() => {
      setPeekUntil(null)
      toast({
        title: "Peek Expired",
        description: "Preview time has ended. Upgrade to continue viewing.",
      })
    }, timeRemaining)

    return () => clearTimeout(timer)
  }, [peekUntil])

  /**
   * Get blur intensity classes
   */
  const getBlurClasses = () => {
    const blurMap = {
      light: 'backdrop-blur-sm',
      medium: 'backdrop-blur-md',
      heavy: 'backdrop-blur-lg'
    }
    return blurMap[blurIntensity]
  }

  /**
   * Get media type configuration
   */
  const getMediaConfig = (): MediaTypeConfig => {
    return mediaTypeConfigs[mediaType] || mediaTypeConfigs.text
  }

  /**
   * Format creation date
   */
  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
      })
    } catch {
      return dateString
    }
  }

  // ----------------------
  // Author Header Display Values
  // Safe formatting for handle and timestamp display
  // ----------------------
  const displayHandle = author?.username ? `@${formatHandle(author.username)}` : ''
  const displayTime = createdAt ? formatRelativeTime(createdAt) : ''
  const shouldShowAuthorHeader = showAuthorHeader && (author?.name || displayHandle || displayTime)

  // ----------------------
  // Render Functions
  // Component rendering helpers
  // ----------------------
  
  /**
   * Render author header using shared AuthorHeader component
   * Located in: src/features/paywall/components/LockedPostShell.tsx
   * Used by: LockedPostShell main component
   * Component: AuthorHeader from /src/components/post/AuthorHeader.tsx
   */
  const renderAuthorHeader = () => {
    if (!shouldShowAuthorHeader) return null

    return (
      <div className="flex items-center justify-between gap-3">
        {/* ---------------------- */}
        {/* Shared AuthorHeader Component */}
        {/* Component: AuthorHeader from /src/components/post/AuthorHeader.tsx */}
        {/* Variant: compact for locked posts */}
        {/* ---------------------- */}
        <div className="flex-1">
          <AuthorHeader
            author={createAuthorCore({
              name: author?.name,
              username: author?.username,
              avatarUrl: author?.avatar,
              verified: false // Locked posts don't show verification
            })}
            createdAt={createdAt}
            variant="compact"
            showVerified={false}
            className="" // No outer margins - spacing handled by parent container
          />
        </div>
        
        {/* ---------------------- */}
        {/* PaywallPill - Tier indicator and upgrade button */}
        {/* Component: PaywallPill from ./PaywallPill */}
        {/* ---------------------- */}
        <PaywallPill
          requiredTier={requiredTier}
          variant="compact"
          size="sm"
          onClick={handleUpgrade}
        />
      </div>
    )
  }

  // ----------------------
  // Event Handlers
  // Handle user interactions and state changes
  // ----------------------

  /**
   * Handle unlock attempt
   */
  const handleUnlock = () => {
    if (hasAccess()) {
      console.log('User already has access')
      toast({
        title: "Content Already Unlocked",
        description: "You already have access to this content!",
      })
      onUnlock?.()
      return
    }
    
    console.log('Unlock requested for tier:', requiredTier)
    toast({
      title: "Unlock Premium Content",
      description: `This content requires ${paywallClient.getTierDisplayName(requiredTier)} subscription.`,
    })
    setIsDialogOpen(true)
    onUnlock?.()
  }

  /**
   * Handle upgrade button click
   */
  const handleUpgrade = () => {
    setIsDialogOpen(true)
    onUpgrade?.()
  }

  /**
   * Handle preview toggle
   */
  const handlePreviewToggle = () => {
    if (hasAccess()) {
      setShowFullPreview(!showFullPreview)
    } else {
      setIsDialogOpen(true)
    }
  }

  /**
   * Handle subscription change from dialog
   * @param subscription - New user subscription object from PaywallDialog
   */
  const handleSubscriptionChange = (subscription: UserSubscription) => {
    console.log('Subscription changed to:', subscription.tier)
    
    // Show success toast
    toast({
      title: "Content Unlocked! 🔓",
      description: `You now have access to this ${paywallClient.getTierDisplayName(subscription.tier)} content.`,
      duration: 4000
    })
    
    // Refresh component state when subscription changes
    setIsDialogOpen(false)
    if (hasAccess()) {
      onUnlock?.()
    }
  }

  // ----------------------
  // Effect Hooks
  // Handle component lifecycle and updates
  // ----------------------
  useEffect(() => {
    // Auto-unlock if user gains access
    if (hasAccess() && onUnlock) {
      onUnlock()
    }
  }, [hasAccess, onUnlock])

  // ----------------------
  // Render Helper Functions
  // Component rendering utilities
  // ----------------------

  // ----------------------
  // Old renderHeader() function removed - using renderAuthorHeader() instead
  // This eliminates duplicate author headers and uses the new FormatUtils
  // ----------------------

  /**
   * Render modern glass overlay media preview
   */
  const renderMediaPreview = () => {
    if (!previewImage && !mediaCount) return null
    
    const mediaConfig = getMediaConfig()
    const MediaIcon = mediaConfig.icon
    
    const tierConfig = {
        free: { label: 'Free', color: 'bg-gray-500', price: 'Free' },
        premium: { label: 'Premium', color: 'bg-purple-500', price: '$4.99' },
        pro: { label: 'Pro', color: 'bg-amber-500', price: '$9.99' }
      }

    const currentTier = tierConfig[requiredTier] || tierConfig.premium
    const displayPrice = priceCents ? `$${(priceCents / 100).toFixed(2)}` : currentTier.price
    
    return (
      <div className="relative">
        {previewImage ? (
          <div className="group relative aspect-video w-full overflow-hidden rounded-b-2xl border-0">
            {/* Base Image */}
            <img
              src={previewImage}
              alt="Content preview"
              className="h-full w-full object-cover transition-all duration-300"
            />
            
            {/* Subtle Scrim - Lighter overlay for better transparency */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent" />
            
            {/* Radial Frosted Mask */}
            <div className="absolute inset-0 bg-gradient-radial from-transparent via-white/10 to-white/30 backdrop-blur-[2px]" />
            
            {/* Tier/Price Chip - Top Right */}
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <div className={cn(
                "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md",
                currentTier.color
              )}>
                <Crown className="h-3 w-3" />
                <span>{currentTier.label}</span>
              </div>
              <div className="rounded-full bg-white/20 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
                {displayPrice}
              </div>
            </div>
            
            {/* Center Glass CTA */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Button
                onClick={() => {
                  track('unlock_cta_clicked', { postId, tier: requiredTier, price: displayPrice })
                  if (openPricingPlansModal) {
                    openPricingPlansModal()
                  } else if (onUpgrade) {
                    onUpgrade()
                  }
                }}
                className="group/btn relative overflow-hidden rounded-2xl bg-white/10 px-8 py-4 text-white backdrop-blur-md transition-all duration-300 hover:bg-white/20 hover:scale-105 border border-white/20"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-white/20 p-2">
                    <Unlock className="h-5 w-5" />
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-semibold">Unlock Content</div>
                    <div className="text-xs opacity-80">Get instant access</div>
                  </div>
                  <ChevronRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                </div>
              </Button>
            </div>
            
            {/* Quick Peek Helper - Bottom Left */}
            {useV2 && (
              <div className="absolute bottom-4 left-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    track('quick_peek_clicked', { postId })
                    setPeekUntil(Date.now() + 10000) // 10 second peek
                    toast({
                      title: "Quick Peek Active",
                      description: "You have 10 seconds to preview this content",
                    })
                  }}
                  className="rounded-full bg-white/10 text-white backdrop-blur-md hover:bg-white/20 border border-white/20"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Quick Peek
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className={cn(
            'aspect-video rounded-lg flex items-center justify-center border-2 border-dashed',
            mediaConfig.bgColor,
            'border-current/20'
          )}>
            <div className="text-center">
              <MediaIcon className={cn('w-12 h-12 mx-auto', mediaConfig.color)} />
              <p className={cn('text-sm font-medium', mediaConfig.color)}>
                {mediaConfig.label}
                {mediaCount > 1 && ` (${mediaCount})`}
              </p>
            </div>
          </div>
        )}
      </div>
    )
  }

  /**
   * Render content preview with blur effect
   */
  const renderContentPreview = () => {
    if (!children && !excerpt) return null
    
    return (
      <div className="relative">
        {/* Content */}
        <div
          ref={contentRef}
          className={cn(
            'relative transition-all duration-300',
            !hasAccess() && !showFullPreview && [
              'max-h-20 overflow-hidden',
              'after:absolute after:bottom-0 after:left-0 after:right-0',
              'after:h-8 after:bg-gradient-to-t after:from-background after:to-transparent'
            ]
          )}
        >
          {children ? (
            <div className={cn(
              'prose prose-sm max-w-none',
              !hasAccess() && 'filter blur-[1px] select-none pointer-events-none'
            )}>
              {children}
            </div>
          ) : excerpt ? (
            <p className={cn(
              'text-sm text-muted-foreground leading-relaxed',
              !hasAccess() && 'filter blur-[1px] select-none'
            )}>
              {excerpt}
            </p>
          ) : null}
        </div>
        
        {/* Preview toggle button */}
        {showPreview && !hasAccess() && (
          <Button
            variant="ghost"
            size="sm"
            className="text-xs"
            onClick={handlePreviewToggle}
          >
            {showFullPreview ? (
              <>
                <EyeOff className="w-3 h-3 mr-1" />
                Show Less
              </>
            ) : (
              <>
                <Eye className="w-3 h-3 mr-1" />
                Show Preview
              </>
            )}
          </Button>
        )}
      </div>
    )
  }

  /**
   * Render unlock action section
   */
  const renderUnlockAction = () => {
    if (hasAccess()) return null
    
    const tierConfig = {
      free: { icon: Eye, color: 'text-muted-foreground', label: 'Free' },
      premium: { icon: Star, color: 'text-amber-600', label: 'Premium' },
      pro: { icon: Crown, color: 'text-purple-600', label: 'Pro' }
    }[requiredTier] || { icon: Star, color: 'text-amber-600', label: 'Premium' }
    
    const TierIcon = tierConfig.icon
    
    return (
      <div className="p-4 rounded-lg bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className="p-2 rounded-full bg-primary/10">
              <TierIcon className={cn('w-5 h-5', tierConfig.color)} />
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="font-semibold text-sm">Unlock {tierConfig.label} Content</h4>
              <p className="text-xs text-muted-foreground">
                Get access to exclusive content and premium features
              </p>
            </div>
          </div>
          
          <Button
            onClick={handleUnlock}
            className="flex-shrink-0"
            size="sm"
          >
            <Zap className="w-4 h-4 mr-1" />
            Unlock
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>
    )
  }

  // ----------------------
  // Component Render
  // Main component JSX structure with proper absolute positioning
  // Following docs/media_aspect_box.md specifications
  // ----------------------
  return (
    <>
      <div className={cn("relative h-full w-full overflow-hidden", className)}>
        {/* Background media always fills */}
        {previewImage && (
          <img
            src={previewImage}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />
        )}

        {/* Frosted/radial layers + chips + CTA go here, but keep them inside the absolute box */}
        <div className="absolute inset-0">
          {/* Subtle Scrim - Lighter overlay for better transparency */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent" />
          
          {/* Radial Frosted Mask */}
          <div className="absolute inset-0 bg-gradient-radial from-transparent via-white/10 to-white/30 backdrop-blur-[2px]" />
          
          {/* Tier/Price Chip - Top Right */}
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <div className={cn(
               "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md",
               requiredTier === 'free' ? 'bg-gray-500' : 
               requiredTier === 'premium' ? 'bg-purple-500' : 
               requiredTier === 'pro' ? 'bg-amber-500' : 'bg-purple-500'
             )}>
              <Crown className="h-3 w-3" />
              <span>{requiredTier === 'free' ? 'Free' : requiredTier === 'premium' ? 'Premium' : 'Pro'}</span>
            </div>
            <div className="rounded-full bg-white/20 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
              {priceCents ? `$${(priceCents / 100).toFixed(2)}` : requiredTier === 'free' ? 'Free' : requiredTier === 'premium' ? '$4.99' : '$9.99'}
            </div>
          </div>
          
          {/* Center Glass CTA */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Button
              onClick={() => {
                track('unlock_cta_clicked', { postId, tier: requiredTier })
                if (openPricingPlansModal) {
                  openPricingPlansModal()
                } else if (onUpgrade) {
                  onUpgrade()
                }
              }}
              className="group/btn relative overflow-hidden rounded-2xl bg-white/10 px-8 py-4 text-white backdrop-blur-md transition-all duration-300 hover:bg-white/20 hover:scale-105 border border-white/20"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-white/20 p-2">
                  <Unlock className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <div className="text-sm font-semibold">Unlock Content</div>
                  <div className="text-xs opacity-90">Get instant access</div>
                </div>
              </div>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Paywall dialog */}
      <PaywallDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        requiredTier={requiredTier}
        contentTitle={title}
        onSubscriptionChange={handleSubscriptionChange}
      />
    </>
  )
}

/* End of LockedPostShell Component */