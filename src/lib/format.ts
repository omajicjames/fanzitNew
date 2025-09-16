// ----------------------
// Format Utilities Module
// Location: /src/lib/format.ts
// Purpose: Dependency-free formatting helpers for handles and timestamps
// Used by: LockedPostShell, MainFeed, and other components requiring safe formatting
// ----------------------

/**
 * FormatUtils class - Object-oriented approach to formatting utilities
 * Provides static methods for consistent formatting across the application
 */
export class FormatUtils {
  // ----------------------
  // Handle Formatting Methods
  // ----------------------
  
  /**
   * Strip leading @'s from handles to prevent rendering "@@chefmarco"
   * @param handle - The handle string to format
   * @returns Cleaned handle without leading @ symbols
   */
  static formatHandle(handle?: string): string {
    if (!handle) return ""
    return handle.replace(/^@+/, "")
  }

  // ----------------------
  // Time Formatting Methods
  // ----------------------
  
  /**
   * Format timestamps into relative time strings ("4 hours ago", "Yesterday", "Sep 16")
   * Safely handles invalid dates to avoid "Invalid Date" rendering
   * @param input - Date input as string, number, or Date object
   * @returns Formatted relative time string or empty string for invalid input
   */
  static formatRelativeTime(input?: string | number | Date): string {
    if (!input) return ""
    
    const date = new Date(input)
    if (isNaN(date.getTime())) return "" // Prevent "Invalid Date" rendering

    const now = Date.now()
    const diff = Math.max(0, now - date.getTime())

    const seconds = Math.floor(diff / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    // ----------------------
    // Time Range Calculations
    // ----------------------
    if (seconds < 45) return "just now"
    if (minutes < 60) return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`
    if (hours < 24) return `${hours} ${hours === 1 ? "hour" : "hours"} ago`
    if (days === 1) return "yesterday"
    if (days < 7) return `${days} days ago`

    // Fallback to short date format for older posts
    return date.toLocaleDateString(undefined, { 
      month: "short", 
      day: "numeric" 
    })
  }

  // ----------------------
  // Validation Methods
  // ----------------------
  
  /**
   * Validate if a date input is valid
   * @param input - Date input to validate
   * @returns Boolean indicating if the date is valid
   */
  static isValidDate(input?: string | number | Date): boolean {
    if (!input) return false
    const date = new Date(input)
    return !isNaN(date.getTime())
  }

  /**
   * Validate if a handle is properly formatted
   * @param handle - Handle string to validate
   * @returns Boolean indicating if the handle is valid
   */
  static isValidHandle(handle?: string): boolean {
    if (!handle) return false
    const cleaned = this.formatHandle(handle)
    return cleaned.length > 0 && /^[a-zA-Z0-9_]+$/.test(cleaned)
  }
}

// ----------------------
// Convenience Export Functions
// For backward compatibility and simpler imports
// ----------------------

/**
 * Strip leading @'s so you never render "@@chefmarco"
 * @param handle - The handle string to format
 * @returns Cleaned handle without leading @ symbols
 */
export function formatHandle(handle?: string): string {
  return FormatUtils.formatHandle(handle)
}

/**
 * Format timestamps into relative time strings
 * @param input - Date input as string, number, or Date object
 * @returns Formatted relative time string
 */
export function formatRelativeTime(input?: string | number | Date): string {
  return FormatUtils.formatRelativeTime(input)
}

/* End of Format Utilities Module */