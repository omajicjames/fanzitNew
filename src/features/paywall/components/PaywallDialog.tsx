'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@src/components/ui/dialog'
import { Button } from '@src/components/ui/button'
import { Badge } from '@src/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@src/components/ui/card'
import { Separator } from '@src/components/ui/separator'
import { cn } from '@src/lib/utils'
import { toast } from '@src/hooks/use-toast'
import { logger } from '@src/lib/logger'
import { 
  Crown, 
  Star, 
  Check, 
  Loader2,
  Sparkles,
  Shield,
  MessageCircle,
  Zap
} from 'lucide-react'
import { paywallClient, type SubscriptionTier, type UserSubscription } from '../mock/paywallClient'

// ----------------------
// PaywallDialog Component Props
// Location: /src/features/paywall/components/PaywallDialog.tsx
// Parent: MainFeed component and other content containers
// Children: Dialog, Card, Button components from shadcn/ui
// ----------------------
export interface PaywallDialogProps {
  isOpen: boolean
  onClose: () => void
  requiredTier?: SubscriptionTier
  contentTitle?: string
  onSubscriptionChange?: (subscription: UserSubscription) => void
}

// ----------------------
// Subscription Plan Interface
// Defines structure for subscription plan data
// ----------------------
interface SubscriptionPlan {
  tier: SubscriptionTier
  name: string
  price: number
  priceDisplay: string
  description: string
  features: string[]
  icon: React.ComponentType<{ className?: string }>
  popular?: boolean
  buttonText: string
  buttonVariant: 'default' | 'outline' | 'secondary'
}

/**
 * PaywallDialog Component
 * Displays subscription upgrade modal with tier selection
 * Implements mobile-first design with touch-friendly interactions
 */
export function PaywallDialog({
  isOpen,
  onClose,
  requiredTier = 'premium',
  contentTitle = 'Premium Content',
  onSubscriptionChange
}: PaywallDialogProps) {
  // ----------------------
  // Component State Management
  // Handles subscription state, loading states, and user interactions
  // ----------------------
  const [currentSubscription, setCurrentSubscription] = useState<UserSubscription | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedTier, setSelectedTier] = useState<SubscriptionTier>(requiredTier)

  // ----------------------
  // Subscription Plans Configuration
  // Defines available subscription tiers with features and pricing
  // ----------------------
  const subscriptionPlans: SubscriptionPlan[] = [
    {
      tier: 'premium',
      name: 'Premium',
      price: paywallClient.getTierPrice('premium'),
      priceDisplay: '$9.99',
      description: 'Access to premium content and exclusive posts',
      features: [
        'Premium content access',
        'Exclusive posts',
        'Early access to new content',
        'Ad-free experience',
        'Priority support'
      ],
      icon: Star,
      popular: true,
      buttonText: 'Upgrade to Premium',
      buttonVariant: 'default'
    },
    {
      tier: 'pro',
      name: 'Pro',
      price: paywallClient.getTierPrice('pro'),
      priceDisplay: '$19.99',
      description: 'Full access to all content and pro features',
      features: [
        'All Premium features',
        'Pro-exclusive content',
        'Direct messaging with creators',
        'Custom profile badges',
        'Advanced analytics',
        'Priority customer support'
      ],
      icon: Crown,
      buttonText: 'Upgrade to Pro',
      buttonVariant: 'default'
    }
  ]

  // ----------------------
  // Effect Hooks
  // Handle component initialization and subscription updates
  // ----------------------
  useEffect(() => {
    if (isOpen) {
      const subscription = paywallClient.getSubscription()
      setCurrentSubscription(subscription)
      
      // Set selected tier to required tier or next tier up from current
      if (subscription.tier === 'free') {
        setSelectedTier(requiredTier)
      } else {
        setSelectedTier(requiredTier === 'premium' ? 'premium' : 'pro')
      }
    }
  }, [isOpen, requiredTier])

  // ----------------------
  // Event Handlers
  // Handle user interactions and subscription actions
  // ----------------------

  /**
   * Handle subscription upgrade process
   * @param tier - Target subscription tier
   */
  const handleUpgrade = async (tier: SubscriptionTier) => {
    // Show processing toast
    toast({
      title: "Processing Subscription",
      description: `Setting up your ${paywallClient.getTierDisplayName(tier)} subscription...`,
    })
    
    setIsLoading(true)
    
    try {
      const success = await paywallClient.upgradeSubscription(tier)
      
      if (success) {
        const newSubscription = paywallClient.getSubscription()
        setCurrentSubscription(newSubscription)
        
        // Notify parent component of subscription change
        onSubscriptionChange?.(newSubscription)
        
        // Show success toast
        toast({
          title: 'Subscription Upgraded! 🎉',
          description: `Welcome to ${paywallClient.getTierDisplayName(tier)}! You now have access to premium content.`,
          duration: 5000
        })
        
        // Close dialog after short delay
        setTimeout(() => {
          onClose()
        }, 1500)
      } else {
        throw new Error('Upgrade failed')
      }
    } catch (error) {
      logger.error('Subscription upgrade failed', 'PaywallDialog', error)
      toast({
        title: 'Upgrade Failed',
        description: 'There was an issue upgrading your subscription. Please try again.',
        variant: 'destructive',
        duration: 5000
      })
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Handle dialog close with cleanup
   */
  const handleClose = () => {
    if (!isLoading) {
      onClose()
    }
  }

  /**
   * Check if user already has access to required tier
   */
  const hasRequiredAccess = () => {
    if (!currentSubscription) return false
    const access = paywallClient.checkContentAccess(requiredTier)
    return access.canView
  }

  // ----------------------
  // Render Helper Functions
  // Component rendering utilities
  // ----------------------

  /**
   * Render subscription plan card
   * @param plan - Subscription plan data
   */
  const renderPlanCard = (plan: SubscriptionPlan) => {
    const Icon = plan.icon
    const isCurrentTier = currentSubscription?.tier === plan.tier
    const isSelected = selectedTier === plan.tier
    
    return (
      <Card 
        key={plan.tier}
        className={cn(
          'relative cursor-pointer transition-all duration-200 hover:shadow-md',
          isSelected && 'ring-2 ring-primary ring-offset-2',
          plan.popular && 'border-primary shadow-sm',
          isCurrentTier && 'bg-muted/50'
        )}
        onClick={() => !isCurrentTier && setSelectedTier(plan.tier)}
      >
        {/* Popular badge */}
        {plan.popular && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <Badge className="bg-primary text-primary-foreground px-3 py-1">
              <Sparkles className="w-3 h-3 mr-1" />
              Most Popular
            </Badge>
          </div>
        )}
        
        {/* Current tier indicator */}
        {isCurrentTier && (
          <div className="absolute top-3 right-3">
            <Badge variant="secondary" className="text-xs">
              <Check className="w-3 h-3 mr-1" />
              Current
            </Badge>
          </div>
        )}

        <CardHeader className="text-center pb-4">
          <div className="flex justify-center mb-2">
            <div className={cn(
              'p-3 rounded-full',
              plan.popular ? 'bg-primary/10' : 'bg-muted'
            )}>
              <Icon className={cn(
                'w-6 h-6',
                plan.popular ? 'text-primary' : 'text-muted-foreground'
              )} />
            </div>
          </div>
          <CardTitle className="text-xl">{plan.name}</CardTitle>
          <div className="text-3xl font-bold text-primary">
            {plan.priceDisplay}
            <span className="text-sm font-normal text-muted-foreground">/month</span>
          </div>
          <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
        </CardHeader>

        <CardContent className="pt-0">
          {/* Features list */}
          <ul className="space-y-2 mb-6">
            {plan.features.map((feature) => (
              <li key={`${plan.tier}-${feature}`} className="flex items-center text-sm">
                <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          {/* Action button */}
          <Button
            className="w-full"
            variant={isCurrentTier ? 'outline' : plan.buttonVariant}
            disabled={isCurrentTier || isLoading}
            onClick={(e) => {
              e.stopPropagation()
              if (!isCurrentTier) {
                handleUpgrade(plan.tier)
              }
            }}
          >
            {isLoading && selectedTier === plan.tier ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : isCurrentTier ? (
              'Current Plan'
            ) : (
              plan.buttonText
            )}
          </Button>
        </CardContent>
      </Card>
    )
  }

  // ----------------------
  // Component Render
  // Main component JSX structure
  // ----------------------
  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-primary/10">
              <Shield className="w-8 h-8 text-primary" />
            </div>
          </div>
          
          <DialogTitle className="text-2xl font-bold">
            Unlock {contentTitle}
          </DialogTitle>
          
          <DialogDescription className="text-base mt-2">
            {hasRequiredAccess() ? (
              'You already have access to this content! The page will refresh shortly.'
            ) : (
              `Upgrade to ${paywallClient.getTierDisplayName(requiredTier)} or higher to access this exclusive content and unlock premium features.`
            )}
          </DialogDescription>
        </DialogHeader>

        {/* Current subscription status */}
        {currentSubscription && (
          <div className="bg-muted/50 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Current Plan</p>
                <p className="text-sm text-muted-foreground">
                  {paywallClient.getTierDisplayName(currentSubscription.tier)}
                  {currentSubscription.tier !== 'free' && currentSubscription.expiresAt && (
                    <span className="ml-2">
                      • Expires {new Date(currentSubscription.expiresAt).toLocaleDateString()}
                    </span>
                  )}
                </p>
              </div>
              <Badge 
                variant={currentSubscription.isActive ? 'default' : 'destructive'}
                className="ml-2"
              >
                {currentSubscription.isActive ? 'Active' : 'Inactive'}
              </Badge>
            </div>
          </div>
        )}

        {/* Subscription plans */}
        {!hasRequiredAccess() && (
          <>
            <Separator className="my-6" />
            
            <div className="grid gap-6 md:grid-cols-2">
              {subscriptionPlans.map(renderPlanCard)}
            </div>

            {/* Additional benefits section */}
            <div className="mt-8 p-6 bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg">
              <h3 className="font-semibold mb-4 flex items-center">
                <Zap className="w-5 h-5 mr-2 text-primary" />
                Why Upgrade?
              </h3>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="flex items-center text-sm">
                  <MessageCircle className="w-4 h-4 mr-2 text-primary" />
                  Direct creator interaction
                </div>
                <div className="flex items-center text-sm">
                  <Star className="w-4 h-4 mr-2 text-primary" />
                  Exclusive content access
                </div>
                <div className="flex items-center text-sm">
                  <Shield className="w-4 h-4 mr-2 text-primary" />
                  Ad-free experience
                </div>
                <div className="flex items-center text-sm">
                  <Crown className="w-4 h-4 mr-2 text-primary" />
                  Priority support
                </div>
              </div>
            </div>
          </>
        )}

        {/* Close button for users who already have access */}
        {hasRequiredAccess() && (
          <div className="flex justify-center mt-6">
            <Button onClick={handleClose} className="min-w-32">
              Continue
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

/* End of PaywallDialog Component */