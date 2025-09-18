'use client'

// ----------------------
// Mock Paywall Client
// ----------------------
// Simulates subscription management and content access control
// Used for demo purposes - replace with real payment provider integration
// Location: src/features/paywall/mock/paywallClient.ts
// ----------------------

import { logger } from '@src/lib/logger'

// ----------------------
// Type Definitions
// ----------------------
export type SubscriptionTier = 'free' | 'premium' | 'pro'

/**
 * User subscription status interface
 */
export interface UserSubscription {
  tier: SubscriptionTier
  isActive: boolean
  expiresAt?: Date
  features: string[]
}

/**
 * Content access level interface
 */
export interface ContentAccess {
  canView: boolean
  requiresUpgrade: boolean
  requiredTier: SubscriptionTier
  reason?: string
}

/**
 * PaywallClient class for managing subscription and content access
 * Implements localStorage-based mock functionality for development
 */
export class PaywallClient {
  private static instance: PaywallClient
  private readonly STORAGE_KEY = 'fanzit_user_subscription'
  private readonly DEFAULT_SUBSCRIPTION: UserSubscription = {
    tier: 'free',
    isActive: true,
    features: ['basic_content', 'public_posts']
  }

  // ----------------------
  // Singleton Pattern Implementation
  // Ensures single instance across the application
  // ----------------------
  private constructor() {
    this.initializeSubscription()
  }

  /**
   * Get singleton instance of PaywallClient
   * @returns PaywallClient instance
   */
  public static getInstance(): PaywallClient {
    if (!PaywallClient.instance) {
      PaywallClient.instance = new PaywallClient()
    }
    return PaywallClient.instance
  }

  // ----------------------
  // Subscription Management Methods
  // Handle user subscription state and persistence
  // ----------------------

  /**
   * Initialize subscription from localStorage or set default
   * SSR-safe implementation that skips localStorage during server rendering
   */
  private initializeSubscription(): void {
    // Skip localStorage access during SSR
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
      return
    }
    
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY)
      if (!stored) {
        this.setSubscription(this.DEFAULT_SUBSCRIPTION)
      }
    } catch (error) {
      logger.warn('Failed to initialize subscription from localStorage', 'PaywallClient', error)
      this.setSubscription(this.DEFAULT_SUBSCRIPTION)
    }
  }

  /**
   * Get current user subscription status
   * SSR-safe implementation that returns default during server rendering
   * @returns UserSubscription object
   */
  public getSubscription(): UserSubscription {
    // Return default subscription during SSR
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
      return this.DEFAULT_SUBSCRIPTION
    }
    
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY)
      if (stored) {
        const subscription = JSON.parse(stored) as UserSubscription
        // Convert expiresAt string back to Date if it exists
        if (subscription.expiresAt) {
          subscription.expiresAt = new Date(subscription.expiresAt)
        }
        return subscription
      }
    } catch (error) {
      logger.warn('Failed to get subscription from localStorage', 'PaywallClient', error)
    }
    return this.DEFAULT_SUBSCRIPTION
  }

  /**
   * Update user subscription status
   * SSR-safe implementation that skips localStorage during server rendering
   * @param subscription - New subscription data
   */
  public setSubscription(subscription: UserSubscription): void {
    // Skip localStorage access during SSR
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
      return
    }
    
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(subscription))
    } catch (error) {
      logger.error('Failed to save subscription to localStorage', 'PaywallClient', error)
    }
  }

  /**
   * Check if user has active subscription
   * @returns boolean indicating active subscription status
   */
  public hasActiveSubscription(): boolean {
    const subscription = this.getSubscription()
    if (!subscription.isActive) return false
    
    // Check expiration if set
    if (subscription.expiresAt) {
      return new Date() < subscription.expiresAt
    }
    
    return true
  }

  // ----------------------
  // Content Access Control Methods
  // Determine user access to premium content
  // ----------------------

  /**
   * Check if user can access specific content
   * @param requiredTier - Minimum subscription tier required
   * @returns ContentAccess object with access details
   */
  public checkContentAccess(requiredTier: SubscriptionTier): ContentAccess {
    const subscription = this.getSubscription()
    const tierHierarchy: Record<SubscriptionTier, number> = {
      free: 0,
      premium: 1,
      pro: 2
    }

    const userTierLevel = tierHierarchy[subscription.tier]
    const requiredTierLevel = tierHierarchy[requiredTier]
    const hasActiveSubscription = this.hasActiveSubscription()

    // Free content is always accessible
    if (requiredTier === 'free') {
      return {
        canView: true,
        requiresUpgrade: false,
        requiredTier
      }
    }

    // Check if user has sufficient tier and active subscription
    const canView = hasActiveSubscription && userTierLevel >= requiredTierLevel

    return {
      canView,
      requiresUpgrade: !canView,
      requiredTier,
      reason: !hasActiveSubscription 
        ? 'Subscription expired or inactive'
        : userTierLevel < requiredTierLevel 
        ? `Requires ${requiredTier} subscription`
        : undefined
    }
  }

  /**
   * Check if specific feature is available to user
   * @param feature - Feature name to check
   * @returns boolean indicating feature availability
   */
  public hasFeature(feature: string): boolean {
    const subscription = this.getSubscription()
    return subscription.features.includes(feature) && this.hasActiveSubscription()
  }

  // ----------------------
  // Mock Subscription Actions
  // Simulate subscription upgrade/downgrade for development
  // ----------------------

  /**
   * Simulate subscription upgrade
   * @param newTier - Target subscription tier
   * @returns Promise resolving to success status
   */
  public async upgradeSubscription(newTier: SubscriptionTier): Promise<boolean> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    const features = this.getFeaturesForTier(newTier)
    const expiresAt = new Date()
    expiresAt.setMonth(expiresAt.getMonth() + 1) // 1 month from now

    const newSubscription: UserSubscription = {
      tier: newTier,
      isActive: true,
      expiresAt,
      features
    }

    this.setSubscription(newSubscription)
    return true
  }

  /**
   * Simulate subscription cancellation
   * @returns Promise resolving to success status
   */
  public async cancelSubscription(): Promise<boolean> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))

    const currentSubscription = this.getSubscription()
    const cancelledSubscription: UserSubscription = {
      ...currentSubscription,
      isActive: false
    }

    this.setSubscription(cancelledSubscription)
    return true
  }

  // ----------------------
  // Helper Methods
  // Utility functions for subscription management
  // ----------------------

  /**
   * Get features available for specific tier
   * @param tier - Subscription tier
   * @returns Array of feature names
   */
  private getFeaturesForTier(tier: SubscriptionTier): string[] {
    const featureMap: Record<SubscriptionTier, string[]> = {
      free: ['basic_content', 'public_posts'],
      premium: [
        'basic_content', 
        'public_posts', 
        'premium_content', 
        'exclusive_posts',
        'early_access'
      ],
      pro: [
        'basic_content', 
        'public_posts', 
        'premium_content', 
        'exclusive_posts',
        'early_access',
        'pro_content',
        'direct_messaging',
        'priority_support'
      ]
    }

    return featureMap[tier] || featureMap.free
  }

  /**
   * Get subscription tier display name
   * @param tier - Subscription tier
   * @returns Formatted tier name
   */
  public getTierDisplayName(tier: SubscriptionTier): string {
    const displayNames: Record<SubscriptionTier, string> = {
      free: 'Free',
      premium: 'Premium',
      pro: 'Pro'
    }
    return displayNames[tier]
  }

  /**
   * Get subscription tier pricing (mock data)
   * @param tier - Subscription tier
   * @returns Price in cents
   */
  public getTierPrice(tier: SubscriptionTier): number {
    const pricing: Record<SubscriptionTier, number> = {
      free: 0,
      premium: 999, // $9.99
      pro: 1999     // $19.99
    }
    return pricing[tier]
  }

  /**
   * Reset subscription to default (for testing)
   */
  public resetToDefault(): void {
    this.setSubscription(this.DEFAULT_SUBSCRIPTION)
  }
}

// ----------------------
// Export singleton instance for easy access
// Usage: import { paywallClient } from '@/features/paywall/mock/paywallClient'
// ----------------------
export const paywallClient = PaywallClient.getInstance()

// ----------------------
// Export default class for direct instantiation if needed
// ----------------------
export default PaywallClient