// ----------------------
// Post Data Adapter
// Converts backend/legacy data formats to unified PostView interface
// Location: /src/features/post/adapters/PostDataAdapter.ts
// ----------------------

import { PostView, PostAuthor, PostMedia, PostEngagement, PostPremium } from '../types'
import { formatRelativeTime } from '@src/lib/format'

// ----------------------
// Legacy Post Interface (from main-feed.tsx)
// Represents the current data structure used in the application
// ----------------------
interface LegacyPost {
  id: string
  creator: {
    name: string
    handle: string
    avatar: string
    verified: boolean
    tier: string
  }
  content: {
    type: string // Changed from union type to string to match actual data
    thumbnail?: string
    title: string
    description: string
    duration?: string
    isLocked?: boolean
    price?: string
    requiredTier?: 'standard' | 'premium' | 'pro'
  }
  engagement: {
    likes: number
    comments: number
    shares: number
  }
  timestamp: string
  has_premium?: boolean
  unlocked?: boolean
  price_cents?: number
  preview_url?: string
}

// ----------------------
// Backend API Post Interface
// Represents the expected structure from API responses
// ----------------------
interface ApiPost {
  id: string
  authorId: string
  authorName: string
  authorUsername: string
  authorAvatar: string
  authorVerified: boolean
  authorTier: string
  title: string
  subtitle?: string
  description?: string
  mediaType: 'video' | 'image' | 'text' | 'audio'
  mediaUrl?: string
  thumbnailUrl?: string
  duration?: number
  likesCount: number
  commentsCount: number
  sharesCount: number
  createdAt: string | Date
  isPremium: boolean
  isUnlocked: boolean
  priceCents?: number
  previewText?: string
  requiredTier?: 'standard' | 'premium' | 'pro' | 'vip'
}

// ----------------------
// Post Data Adapter Class
// Handles conversion between different data formats and PostView
// ----------------------
export class PostDataAdapter {
  // ----------------------
  // Convert Legacy Post to PostView
  // Used for migrating existing main-feed data structure
  // ----------------------
  static fromLegacyPost(legacyPost: LegacyPost): PostView {
    const author: PostAuthor = {
      name: legacyPost.creator.name,
      username: legacyPost.creator.handle.replace('@', ''),
      avatarUrl: legacyPost.creator.avatar,
      verified: legacyPost.creator.verified
    }

    const media: PostMedia = {
      type: legacyPost.content.type === 'text' ? 'none' : 
            (legacyPost.content.type === 'video' || legacyPost.content.type === 'image') ? 
            legacyPost.content.type as 'video' | 'image' : 'none',
      url: legacyPost.content.thumbnail || '/placeholder.svg',
      thumbnailUrl: legacyPost.content.thumbnail,
      durationSec: legacyPost.content.duration ? this.parseDuration(legacyPost.content.duration) : undefined,
      altText: legacyPost.content.title
    }

    const engagement: PostEngagement = {
      likes: legacyPost.engagement.likes,
      comments: legacyPost.engagement.comments,
      shares: legacyPost.engagement.shares
    }

    const premium: PostPremium | undefined = (legacyPost.has_premium || legacyPost.content.isLocked) ? {
      locked: !legacyPost.unlocked,
      priceCents: legacyPost.price_cents || this.parsePrice(legacyPost.content.price),
      tier: (legacyPost.content.requiredTier === 'standard' ? undefined : legacyPost.content.requiredTier) as 'premium' | 'pro' | 'vip' | undefined,
      previewText: legacyPost.content.description.substring(0, 100) + '...'
    } : undefined

    return {
      id: legacyPost.id,
      kind: premium?.locked ? 'locked' : 'regular',
      title: legacyPost.content.title,
      subtitle: legacyPost.content.description,
      author,
      media,
      engagement,
      premium,
      createdAt: legacyPost.timestamp
    }
  }

  // ----------------------
  // Convert API Post to PostView
  // Used for processing backend API responses
  // ----------------------
  static fromApiPost(apiPost: ApiPost): PostView {
    const author: PostAuthor = {
      name: apiPost.authorName,
      username: apiPost.authorUsername.replace('@', ''),
      avatarUrl: apiPost.authorAvatar,
      verified: apiPost.authorVerified
    }

    const media: PostMedia = {
      type: apiPost.mediaType === 'text' || apiPost.mediaType === 'audio' ? 'none' : apiPost.mediaType,
      url: apiPost.mediaUrl || apiPost.thumbnailUrl || '/placeholder.svg',
      thumbnailUrl: apiPost.thumbnailUrl,
      durationSec: apiPost.duration,
      altText: apiPost.title
    }

    const engagement: PostEngagement = {
      likes: apiPost.likesCount,
      comments: apiPost.commentsCount,
      shares: apiPost.sharesCount
    }

    const premium: PostPremium | undefined = apiPost.isPremium ? {
      locked: !apiPost.isUnlocked,
      priceCents: apiPost.priceCents || 0,
      tier: (apiPost.requiredTier === 'standard' ? undefined : apiPost.requiredTier) as 'premium' | 'pro' | 'vip' | undefined,
      previewText: apiPost.previewText || apiPost.subtitle?.substring(0, 100) + '...' || ''
    } : undefined

    const createdAt = typeof apiPost.createdAt === 'string' 
      ? apiPost.createdAt 
      : apiPost.createdAt.toISOString()

    return {
      id: apiPost.id,
      kind: premium?.locked ? 'locked' : 'regular',
      title: apiPost.title,
      subtitle: apiPost.subtitle || apiPost.description || '',
      author,
      media,
      engagement,
      premium,
      createdAt
    }
  }

  // ----------------------
  // Convert PostView back to Legacy format
  // Used for backward compatibility with existing components
  // ----------------------
  static toLegacyPost(postView: PostView): LegacyPost {
    return {
      id: postView.id,
      creator: {
        name: postView.author.name || '',
        handle: `@${postView.author.username || ''}`,
        avatar: postView.author.avatarUrl || '',
        verified: postView.author.verified || false,
        tier: 'standard' // Default tier since not available in PostAuthor
      },
      content: {
        type: postView.media?.type === 'none' ? 'text' : (postView.media?.type || 'text') as string,
        thumbnail: postView.media?.thumbnailUrl,
        title: postView.title || '',
        description: postView.subtitle || '',
        duration: postView.media?.durationSec ? this.formatDuration(postView.media.durationSec) : undefined,
        isLocked: postView.premium?.locked || false,
        price: postView.premium?.priceCents ? this.formatPrice(postView.premium.priceCents) : undefined,
        requiredTier: postView.premium?.tier === 'vip' ? 'pro' : (postView.premium?.tier || 'premium')
      },
      engagement: {
        likes: postView.engagement?.likes || 0,
        comments: postView.engagement?.comments || 0,
        shares: postView.engagement?.shares || 0
      },
      timestamp: typeof postView.createdAt === 'string' ? postView.createdAt : (postView.createdAt?.toString() || ''),
      has_premium: !!postView.premium,
      unlocked: !postView.premium?.locked,
      price_cents: postView.premium?.priceCents,
      preview_url: postView.media?.thumbnailUrl
    }
  }

  // ----------------------
  // Batch conversion utilities
  // ----------------------
  static fromLegacyPosts(legacyPosts: LegacyPost[]): PostView[] {
    return legacyPosts.map(post => this.fromLegacyPost(post))
  }

  static fromApiPosts(apiPosts: ApiPost[]): PostView[] {
    return apiPosts.map(post => this.fromApiPost(post))
  }

  static toLegacyPosts(postViews: PostView[]): LegacyPost[] {
    return postViews.map(post => this.toLegacyPost(post))
  }

  // ----------------------
  // Helper Methods
  // ----------------------
  
  /**
   * Parse duration string (e.g., "20:15") to seconds
   */
  private static parseDuration(duration: string): number {
    const parts = duration.split(':')
    if (parts.length === 2) {
      return parseInt(parts[0]) * 60 + parseInt(parts[1])
    }
    return 0
  }

  /**
   * Format duration seconds to string (e.g., 1215 -> "20:15")
   */
  private static formatDuration(seconds: number): string {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  /**
   * Parse price string (e.g., "$4.99") to cents
   */
  private static parsePrice(price?: string): number {
    if (!price) return 0
    const numericPrice = price.replace(/[^0-9.]/g, '')
    return Math.round(parseFloat(numericPrice) * 100)
  }

  /**
   * Format price cents to string (e.g., 499 -> "$4.99")
   */
  private static formatPrice(cents: number): string {
    return `$${(cents / 100).toFixed(2)}`
  }

  /**
   * Validate PostView data integrity
   */
  static validatePostView(postView: PostView): boolean {
    try {
      // Required fields validation
      if (!postView.id || !postView.author) {
        return false
      }

      // Author validation (at least name or username required)
      if (!postView.author.name && !postView.author.username) {
        return false
      }

      // Media validation (if present)
      if (postView.media && !postView.media.type) {
        return false
      }

      // Premium validation (if present)
      if (postView.premium && typeof postView.premium.locked !== 'boolean') {
        return false
      }

      return true
    } catch (error) {
      console.error('PostView validation error:', error)
      return false
    }
  }
}

// ----------------------
// Export types for external use
// ----------------------
export type { LegacyPost, ApiPost }

// ----------------------
// Default export
// ----------------------
export default PostDataAdapter