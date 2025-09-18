'use client'

import { useState } from 'react'
import { Button } from '@src/components/ui/button'
import { cn } from '@src/lib/utils'
import { toast } from '@src/hooks/use-toast'
import { Unlock, Crown } from 'lucide-react'
import { type SubscriptionTier, type UserSubscription } from '../mock/paywallClient'
import { PaywallDialog } from './PaywallDialog'
import { logger } from '@src/lib/logger'
import Image from 'next/image'

// ----------------------
// LockedPostShell Component Props
// Location: /src/features/paywall/components/LockedPostShell.tsx
// Parent: MainFeed component and other content containers
// Children: Card, PaywallPill, PaywallDialog components
// ----------------------
export interface LockedPostShellProps {
  // Content metadata
  title: string
  requiredTier: SubscriptionTier
  
  // Media configuration
  previewImage?: string
  
  // Paywall configuration
  postId?: string
  priceCents?: number
  openPricingPlansModal?: () => void
  className?: string
}

/**
 * LockedPostShell Component
 * Wraps premium content with blur effects and upgrade prompts
 * Implements mobile-first design with touch-friendly interactions
 */
export function LockedPostShell({
  title,
  requiredTier,
  previewImage,
  postId,
  priceCents,
  openPricingPlansModal,
  className
}: LockedPostShellProps) {
  // ----------------------
  // Component State Management
  // Handles dialog state for paywall
  // ----------------------
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // ----------------------
  // Track Function for Analytics
  // Handles event tracking for user interactions
  // ----------------------
  const track = (event: string, properties?: Record<string, unknown>) => {
    // Analytics tracking implementation
    logger.info(`Track event: ${event}`, 'LockedPostShell', properties)
  }

  // ----------------------
  // Subscription Management
  // Handles subscription state changes
  // ----------------------
  const handleSubscriptionChange = (subscription: UserSubscription) => {
    if (subscription) {
      setIsDialogOpen(false)
      toast({
        title: "Content Unlocked! 🔓",
        description: "You now have access to this content.",
      })
    }
  }

  // ----------------------
  // Render Helper Functions
  // Component rendering utilities
  // ----------------------

  // ----------------------
  // Old renderHeader() function removed - using renderAuthorHeader() instead
  // This eliminates duplicate author headers and uses the new FormatUtils
  // ----------------------



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
          <Image
            src={previewImage}
            alt=""
            fill
            className="object-cover"
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
                } else {
                  setIsDialogOpen(true)
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