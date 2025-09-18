'use client'

import { useState } from 'react'
import { Button } from '@src/components/ui/button'
import { cn } from '@src/lib/utils'
import { toast } from '@src/hooks/use-toast'
import { 
  Lock, 
  Crown, 
  Star, 
  Sparkles,
  Eye,
  Zap
} from 'lucide-react'
import { paywallClient, type SubscriptionTier } from '../mock/paywallClient'

// ----------------------
// PaywallPill Component Props
// Location: /src/features/paywall/components/PaywallPill.tsx
// Parent: LockedPostShell, MainFeed, and other content containers
// Children: Badge, Button components from shadcn/ui
// ----------------------
export interface PaywallPillProps {
  requiredTier: SubscriptionTier
  variant?: 'default' | 'compact' | 'floating' | 'inline'
  size?: 'sm' | 'md' | 'lg'
  showUpgradeButton?: boolean
  className?: string
  onClick?: () => void
  onUpgradeClick?: () => void
}

// ----------------------
// Tier Configuration Interface
// Defines visual styling and content for each subscription tier
// ----------------------
interface TierConfig {
  icon: React.ComponentType<{ className?: string }>
  label: string
  color: string
  bgColor: string
  borderColor: string
  description: string
  upgradeText: string
}

/**
 * PaywallPill Component
 * Displays locked content indicators with tier-specific styling
 * Implements mobile-first design with touch-friendly interactions
 */
export function PaywallPill({
  requiredTier,
  variant = 'default',
  size = 'md',
  showUpgradeButton = false,
  className,
  onClick,
  onUpgradeClick
}: PaywallPillProps) {
  // ----------------------
  // Component State Management
  // Handles hover states and user interactions
  // ----------------------
  const [isHovered, setIsHovered] = useState(false)

  // ----------------------
  // Tier Configuration
  // Visual styling and content for each subscription tier
  // ----------------------
  const tierConfigs: Record<SubscriptionTier, TierConfig> = {
    free: {
      icon: Eye,
      label: 'Free',
      color: 'text-muted-foreground',
      bgColor: 'bg-muted/50',
      borderColor: 'border-muted',
      description: 'Free content',
      upgradeText: 'View Content'
    },
    premium: {
      icon: Star,
      label: 'Premium',
      color: 'text-amber-600',
      bgColor: 'bg-amber-50 dark:bg-amber-950/20',
      borderColor: 'border-amber-200 dark:border-amber-800',
      description: 'Premium subscribers only',
      upgradeText: 'Upgrade to Premium'
    },
    pro: {
      icon: Crown,
      label: 'Pro',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-950/20',
      borderColor: 'border-purple-200 dark:border-purple-800',
      description: 'Pro subscribers only',
      upgradeText: 'Upgrade to Pro'
    }
  }

  // ----------------------
  // Helper Functions
  // Utility functions for component logic
  // ----------------------

  /**
   * Get current tier configuration
   */
  const getTierConfig = (): TierConfig => {
    return tierConfigs[requiredTier] || tierConfigs.premium
  }

  /**
   * Check if user has access to content
   */
  const hasAccess = (): boolean => {
    const access = paywallClient.checkContentAccess(requiredTier)
    return access.canView
  }

  /**
   * Get size-specific classes
   */
  const getSizeClasses = () => {
    const sizeMap = {
      sm: {
        container: 'text-xs px-2 py-1',
        icon: 'w-3 h-3',
        button: 'text-xs px-2 py-1 h-6'
      },
      md: {
        container: 'text-sm px-3 py-1.5',
        icon: 'w-4 h-4',
        button: 'text-sm px-3 py-1.5 h-8'
      },
      lg: {
        container: 'text-base px-4 py-2',
        icon: 'w-5 h-5',
        button: 'text-sm px-4 py-2 h-10'
      }
    }
    return sizeMap[size]
  }

  /**
   * Get variant-specific classes
   */
  const getVariantClasses = () => {
    const config = getTierConfig()
    const sizeClasses = getSizeClasses()
    
    const baseClasses = cn(
      'inline-flex items-center gap-1.5 font-medium transition-all duration-200',
      config.color,
      sizeClasses.container
    )

    switch (variant) {
      case 'compact':
        return cn(
          baseClasses,
          'rounded-full border',
          config.bgColor,
          config.borderColor,
          'hover:shadow-sm'
        )
      
      case 'floating':
        return cn(
          baseClasses,
          'rounded-lg border shadow-sm backdrop-blur-sm',
          config.bgColor,
          config.borderColor,
          'hover:shadow-md transform hover:scale-105'
        )
      
      case 'inline':
        return cn(
          baseClasses,
          'rounded border-l-4 pl-3',
          config.bgColor,
          config.borderColor.replace('border-', 'border-l-')
        )
      
      default: // 'default'
        return cn(
          baseClasses,
          'rounded-md border',
          config.bgColor,
          config.borderColor,
          'hover:shadow-sm'
        )
    }
  }

  // ----------------------
  // Event Handlers
  // Handle user interactions
  // ----------------------

  /**
   * Handle pill click
   */
  const handleClick = () => {
    if (onClick) {
      onClick()
    } else if (onUpgradeClick && !hasAccess()) {
      const config = getTierConfig()
      
      // Show informative toast
      toast({
        title: `${config.label} Content`,
        description: `This content requires a ${config.label} subscription to access.`,
        duration: 3000
      })
      
      onUpgradeClick()
    }
  }

  /**
   * Handle upgrade button click
   */
  const handleUpgradeClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    onUpgradeClick?.()
  }

  // ----------------------
  // Component Render
  // Main component JSX structure
  // ----------------------
  const config = getTierConfig()
  const sizeClasses = getSizeClasses()
  const Icon = hasAccess() ? Eye : config.icon
  const userHasAccess = hasAccess()

  // If user has access and it's free content, don't show the pill
  if (userHasAccess && requiredTier === 'free') {
    return null
  }

  return (
    <div className={cn('flex items-center gap-2', className)}>
      {/* Main pill */}
      <div
        className={cn(
          getVariantClasses(),
          (onClick || (!userHasAccess && onUpgradeClick)) && 'cursor-pointer',
          'select-none'
        )}
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        role={onClick || onUpgradeClick ? 'button' : undefined}
        tabIndex={onClick || onUpgradeClick ? 0 : undefined}
        onKeyDown={(e) => {
          if ((e.key === 'Enter' || e.key === ' ') && (onClick || onUpgradeClick)) {
            e.preventDefault()
            handleClick()
          }
        }}
      >
        {/* Icon */}
        <Icon className={cn(sizeClasses.icon, 'flex-shrink-0')} />
        
        {/* Label */}
        <span className="font-medium">
          {userHasAccess ? (
            requiredTier === 'free' ? 'Free' : `${config.label} Access`
          ) : (
            `${config.label} Only`
          )}
        </span>
        
        {/* Lock icon for locked content */}
        {!userHasAccess && (
          <Lock className={cn(sizeClasses.icon, 'flex-shrink-0 opacity-70')} />
        )}
        
        {/* Premium indicator */}
        {requiredTier !== 'free' && variant !== 'compact' && (
          <Sparkles className={cn(
            sizeClasses.icon, 
            'flex-shrink-0 opacity-60',
            isHovered && 'animate-pulse'
          )} />
        )}
      </div>

      {/* Upgrade button */}
      {showUpgradeButton && !userHasAccess && onUpgradeClick && (
        <Button
          size={size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : 'sm'}
          variant="outline"
          className={cn(
            sizeClasses.button,
            'flex-shrink-0 border-current',
            config.color,
            'hover:bg-current hover:text-white'
          )}
          onClick={handleUpgradeClick}
        >
          <Zap className={cn(sizeClasses.icon, 'mr-1')} />
          {size === 'sm' ? 'Upgrade' : config.upgradeText}
        </Button>
      )}
    </div>
  )
}

// ----------------------
// PaywallPill Variants Export
// Pre-configured pill variants for common use cases
// ----------------------

/**
 * Compact pill variant for tight spaces
 */
export function PaywallPillCompact(props: Omit<PaywallPillProps, 'variant'>) {
  return <PaywallPill {...props} variant="compact" />
}

/**
 * Floating pill variant for overlay content
 */
export function PaywallPillFloating(props: Omit<PaywallPillProps, 'variant'>) {
  return <PaywallPill {...props} variant="floating" />
}

/**
 * Inline pill variant for text content
 */
export function PaywallPillInline(props: Omit<PaywallPillProps, 'variant'>) {
  return <PaywallPill {...props} variant="inline" />
}

/**
 * Small pill variant
 */
export function PaywallPillSmall(props: Omit<PaywallPillProps, 'size'>) {
  return <PaywallPill {...props} size="sm" />
}

/**
 * Large pill variant
 */
export function PaywallPillLarge(props: Omit<PaywallPillProps, 'size'>) {
  return <PaywallPill {...props} size="lg" />
}

/* End of PaywallPill Component */