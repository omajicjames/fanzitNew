// ----------------------
// Post View Model Types
// Location: /src/features/post/types.ts
// Purpose: Normalized data structures for post components
// ----------------------

/**
 * Author information interface
 * Used across all post variants for consistent author display
 */
export interface PostAuthor {
  /** Display name of the author */
  name?: string;
  /** Username/handle without @ symbol */
  username?: string;
  /** Profile avatar URL */
  avatarUrl?: string;
  /** Verification status badge */
  verified?: boolean;
}

/**
 * Media content interface
 * Supports images, videos, and empty states
 */
export interface PostMedia {
  /** Type of media content */
  type: "image" | "video" | "none";
  /** Media file URL */
  url?: string;
  /** Video duration in seconds (for video type only) */
  durationSec?: number;
  /** Alt text for accessibility */
  altText?: string;
  /** Thumbnail URL for videos */
  thumbnailUrl?: string;
}

/**
 * Engagement metrics interface
 * Tracks user interactions with posts
 */
export interface PostEngagement {
  /** Number of likes */
  likes: number;
  /** Number of comments */
  comments: number;
  /** Number of shares */
  shares: number;
  /** Current user's like status */
  isLiked?: boolean;
  /** Current user's bookmark status */
  isBookmarked?: boolean;
}

/**
 * Premium/paywall configuration interface
 * Controls access and monetization features
 */
export interface PostPremium {
  /** Whether content is locked behind paywall */
  locked: boolean;
  /** Subscription tier required */
  tier?: "premium" | "pro" | "vip";
  /** Price in cents for unlock */
  priceCents?: number;
  /** Preview text for locked content */
  previewText?: string;
}

/**
 * Post kind enumeration
 * Defines the type and behavior of post cards
 */
export type PostKind = "regular" | "locked" | "profile" | "featured";

/**
 * Main PostView interface
 * Normalized data structure consumed by all post components
 * This is the single source of truth for post data
 */
export interface PostView {
  /** Unique post identifier */
  id: string;
  /** Post type determining card variant */
  kind: PostKind;
  /** Author information */
  author: PostAuthor;
  /** Post creation timestamp */
  createdAt?: string | number | Date;
  /** Post title/headline */
  title?: string;
  /** Post description/body text */
  subtitle?: string;
  /** Media content */
  media?: PostMedia;
  /** Engagement metrics */
  engagement?: PostEngagement;
  /** Premium/paywall settings */
  premium?: PostPremium;
  /** Additional metadata */
  metadata?: {
    /** Post category/tag */
    category?: string;
    /** Reading time estimate */
    readTimeMinutes?: number;
    /** Content warning flags */
    contentWarnings?: string[];
  };
}

/**
 * Post adapter interface
 * Contract for converting backend data to PostView
 */
export interface PostAdapter<TBackendData = unknown> {
  /**
   * Converts backend post data to normalized PostView
   * @param data Raw backend post data
   * @returns Normalized PostView object
   */
  toPostView(data: TBackendData): PostView;
  
  /**
   * Validates backend data structure
   * @param data Raw backend post data
   * @returns True if data is valid
   */
  isValidData(data: unknown): data is TBackendData;
}

/**
 * Post card variant props interface
 * Base props for all post card components
 */
export interface PostCardProps {
  /** Normalized post data */
  post: PostView;
  /** Optional CSS class name */
  className?: string;
  /** Click handler for post interaction */
  onClick?: (post: PostView) => void;
  /** Whether to show inline actions panel */
  showInlineActions?: boolean;
}

/**
 * Post action types enumeration
 * Defines available post actions
 */
export type PostActionType = "like" | "comment" | "share" | "bookmark" | "report" | "block";

/**
 * Post action handler interface
 * Contract for handling post interactions
 */
export interface PostActionHandler {
  /**
   * Handles post action execution
   * @param action Type of action to perform
   * @param post Target post data
   * @returns Promise resolving to updated post data
   */
  handleAction(action: PostActionType, post: PostView): Promise<PostView>;
}