"use client"

import { Avatar, AvatarImage, AvatarFallback } from "@src/components/ui/avatar"
import { Badge } from "@src/components/ui/badge"
import { Crown } from "lucide-react"
import { formatHandle, formatRelativeTime } from "@src/lib/format"
import { cn } from "@src/lib/utils"

// ----------------------
// AuthorHeader Component Types
// Location: /src/components/post/AuthorHeader.tsx
// Parent: Various card components (LockedPostShell, MainFeed cards)
// Children: Avatar, Badge components from /src/components/ui/
// Purpose: Centralized author information display with consistent styling
// ----------------------

/**
 * Core author information interface
 * Standardized across all card types for consistency
 */
export interface AuthorCore {
  name?: string | null
  username?: string | null // raw username, may include '@' prefix
  avatarUrl?: string | null
  verified?: boolean | null
}

/**
 * AuthorHeader component props interface
 * Supports multiple display variants for different contexts
 */
interface AuthorHeaderProps {
  author: AuthorCore
  createdAt?: string | number | Date
  variant?: "regular" | "compact" // controls sizing and spacing
  showVerified?: boolean // controls verification badge display
  className?: string
}

/**
 * Variant configuration class
 * Encapsulates styling logic for different display modes
 */
class VariantConfig {
  private readonly variant: "regular" | "compact"

  constructor(variant: "regular" | "compact") {
    this.variant = variant
  }

  /**
   * Gets text size class based on variant
   * @returns Tailwind text size class
   */
  getTextSize(): string {
    return this.variant === "regular" ? "text-base" : "text-sm"
  }

  /**
   * Gets avatar size class based on variant
   * @returns Tailwind size class for avatar
   */
  getAvatarSize(): string {
    return this.variant === "regular" ? "h-12 w-12" : "h-10 w-10"
  }

  /**
   * Gets gap spacing class based on variant
   * @returns Tailwind gap class
   */
  getGap(): string {
    return this.variant === "regular" ? "gap-3" : "gap-2"
  }

  /**
   * Gets margin bottom class based on variant
   * @returns Tailwind margin bottom class
   */
  getMarginBottom(): string {
    return this.variant === "regular" ? "mb-4" : "mb-3"
  }

  /**
   * Gets font weight for author name based on variant
   * @returns Tailwind font weight class
   */
  getNameFontWeight(): string {
    return this.variant === "regular" ? "font-semibold" : "font-medium"
  }
}

/**
 * AuthorHeader Component
 * Centralized author information display with consistent formatting
 * Eliminates duplicate author/time rendering across different card types
 * 
 * @param author - Author information object
 * @param createdAt - Post creation timestamp
 * @param variant - Display variant (regular for feed, compact for locked posts)
 * @param showVerified - Whether to show verification badge
 * @param className - Additional CSS classes
 * @returns JSX element with author header
 */
export default function AuthorHeader({
  author,
  createdAt,
  variant = "regular",
  showVerified = true,
  className
}: AuthorHeaderProps) {
  // ----------------------
  // Configuration and Data Processing
  // ----------------------
  const config = new VariantConfig(variant)
  const handle = author?.username ? formatHandle(author.username) : ""
  const time = formatRelativeTime(createdAt)
  const displayName = author?.name || ""
  const avatarFallback = (displayName || handle || "U").charAt(0).toUpperCase()

  // ----------------------
  // Validation: Early return if no author data
  // ----------------------
  if (!author?.name && !author?.username) {
    return null
  }

  return (
    <div 
      className={cn(
        "flex items-center",
        config.getGap(),
        config.getMarginBottom(),
        config.getTextSize(),
        "text-muted-foreground",
        className
      )}
    >
      {/* ---------------------- */}
      {/* Author Avatar */}
      {/* Component: Avatar from /src/components/ui/avatar */}
      {/* ---------------------- */}
      <Avatar className={cn(config.getAvatarSize(), "flex-shrink-0")}>
        <AvatarImage 
          src={author?.avatarUrl ?? undefined} 
          alt={displayName || "Author"} 
        />
        <AvatarFallback className="text-xs">
          {avatarFallback}
        </AvatarFallback>
      </Avatar>

      {/* ---------------------- */}
      {/* Author Information Container */}
      {/* Contains name, handle, verification, and timestamp */}
      {/* ---------------------- */}
      <div className="flex items-center min-w-0 gap-2 flex-1">
        {/* ---------------------- */}
        {/* Name and Handle Group */}
        {/* ---------------------- */}
        <div className="flex items-center min-w-0 gap-1">
          {displayName && (
            <span 
              className={cn(
                config.getNameFontWeight(),
                "text-foreground truncate"
              )}
            >
              {displayName}
            </span>
          )}
          
          {handle && (
            <span className="truncate">
              {handle}
            </span>
          )}
          
          {/* ---------------------- */}
          {/* Verification Badge */}
          {/* Component: Badge from /src/components/ui/badge */}
          {/* Conditional rendering based on showVerified prop */}
          {/* ---------------------- */}
          {showVerified && author?.verified && (
            <Badge variant="secondary" className="text-xs ml-1">
              <Crown className="h-3 w-3 mr-1" />
              Verified
            </Badge>
          )}
        </div>

        {/* ---------------------- */}
        {/* Time Separator and Display */}
        {/* Only shows if both author info and time are available */}
        {/* ---------------------- */}
        {time && (displayName || handle) && (
          <span className="text-muted-foreground">•</span>
        )}
        
        {time && (
          <span className="whitespace-nowrap text-muted-foreground">
            {time}
          </span>
        )}
      </div>
    </div>
  )
}

/**
 * Utility function to create AuthorCore from various data sources
 * Helps normalize different author data structures
 * 
 * @param authorData - Raw author data from API or props
 * @returns Normalized AuthorCore object
 */
export function createAuthorCore(authorData: any): AuthorCore {
  return {
    name: authorData?.name || authorData?.creator?.name || null,
    username: authorData?.username || authorData?.handle || authorData?.creator?.handle || null,
    avatarUrl: authorData?.avatarUrl || authorData?.avatar || authorData?.creator?.avatar || null,
    verified: Boolean(authorData?.verified || authorData?.creator?.verified)
  }
}

/**
 * Type guard to check if author data is valid
 * @param author - Author data to validate
 * @returns Boolean indicating if author has required data
 */
export function isValidAuthor(author: any): author is AuthorCore {
  return author && (author.name || author.username)
}