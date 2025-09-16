'use client'

import { useState, useRef, useEffect } from 'react'
import { Card, CardContent, CardHeader } from '@src/components/ui/card'
import { Button } from '@src/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@src/components/ui/avatar'
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
  onUnlock,
  onUpgrade,
  className,
  showPreview = true,
  previewLines = 3,
  blurIntensity = 'medium',
  children
}: LockedPostShellProps) {
  // ----------------------
  // Component State Management
  // Handles dialog state, hover effects, and user interactions
  // ----------------------
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [showFullPreview, setShowFullPreview] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

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
    const access = paywallClient.checkContentAccess(requiredTier)
    return access.canView
  }

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

  /**
   * Render post header with author info
   */
  const renderHeader = () => (
    <CardHeader className="pb-3">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <Avatar className="w-10 h-10 flex-shrink-0">
            <AvatarImage src={author.avatar} alt={author.name} />
            <AvatarFallback>
              {author.name.split(' ').map(n => n[0]).join('').toUpperCase()}
            </AvatarFallback>
          </Avatar>
          
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-semibold text-sm truncate">{author.name}</h3>
              {author.username && (
                <span className="text-xs text-muted-foreground">@{author.username}</span>
              )}
            </div>
            <p className="text-xs text-muted-foreground">{formatDate(createdAt)}</p>
          </div>
        </div>
        
        <PaywallPill
          requiredTier={requiredTier}
          variant="compact"
          size="sm"
          onClick={handleUpgrade}
        />
      </div>
    </CardHeader>
  )

  /**
   * Render media preview section
   */
  const renderMediaPreview = () => {
    if (!previewImage && !mediaCount) return null
    
    const mediaConfig = getMediaConfig()
    const MediaIcon = mediaConfig.icon
    
    return (
      <div className="relative mb-4">
        {previewImage ? (
          <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
            <img
              src={previewImage}
              alt="Content preview"
              className={cn(
                'w-full h-full object-cover transition-all duration-300',
                !hasAccess() && 'filter blur-sm scale-105'
              )}
            />
            
            {/* Media overlay */}
            {!hasAccess() && (
              <div className={cn(
                'absolute inset-0 bg-black/20 flex items-center justify-center',
                getBlurClasses()
              )}>
                <div className="text-center text-white">
                  <Lock className="w-8 h-8 mx-auto mb-2" />
                  <p className="text-sm font-medium">Premium Content</p>
                </div>
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
              <MediaIcon className={cn('w-12 h-12 mx-auto mb-2', mediaConfig.color)} />
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
            className="mt-2 text-xs"
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
      <div className="mt-4 p-4 rounded-lg bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20">
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
  // Main component JSX structure
  // ----------------------
  return (
    <>
      <Card 
        className={cn(
          'relative transition-all duration-300 hover:shadow-md',
          !hasAccess() && 'cursor-pointer',
          isHovered && !hasAccess() && 'shadow-lg transform scale-[1.02]',
          className
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={!hasAccess() ? handleUnlock : undefined}
      >
        {/* Locked indicator overlay */}
        {!hasAccess() && (
          <div className="absolute top-2 right-2 z-10">
            <Badge variant="secondary" className="bg-black/20 text-white backdrop-blur-sm">
              <Lock className="w-3 h-3 mr-1" />
              Locked
            </Badge>
          </div>
        )}
        
        {/* Header */}
        {renderHeader()}
        
        <CardContent className="pt-0">
          {/* Title */}
          <h2 className={cn(
            'text-lg font-bold mb-3 leading-tight',
            !hasAccess() && 'filter blur-[0.5px]'
          )}>
            {title}
          </h2>
          
          {/* Media preview */}
          {renderMediaPreview()}
          
          {/* Content preview */}
          {renderContentPreview()}
          
          {/* Unlock action */}
          {renderUnlockAction()}
        </CardContent>
      </Card>
      
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