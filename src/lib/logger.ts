// ----------------------
// Logger Utility
// ----------------------
// Centralized logging system for the application
// Provides different log levels and environment-aware logging
// Location: src/lib/logger.ts

export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
  NONE = 4
}

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: Date;
  context?: string;
  data?: unknown;
}

class Logger {
  private currentLevel: LogLevel;
  private isDevelopment: boolean;

  constructor() {
    // ----------------------
    // Environment Detection
    // ----------------------
    this.isDevelopment = process.env.NODE_ENV === 'development';
    
    // Set log level based on environment
    this.currentLevel = this.isDevelopment ? LogLevel.DEBUG : LogLevel.WARN;
  }

  // ----------------------
  // Core Logging Method
  // ----------------------
  private log(level: LogLevel, message: string, context?: string, data?: unknown): void {
    if (level < this.currentLevel) {
      return;
    }

    const entry: LogEntry = {
      level,
      message,
      timestamp: new Date(),
      context,
      data
    };

    const prefix = this.getLogPrefix(level, context);
    const formattedMessage = `${prefix} ${message}`;

    // ----------------------
    // Console Output Based on Level
    // ----------------------
    switch (level) {
      case LogLevel.DEBUG:
        if (this.isDevelopment) {
          console.debug(formattedMessage, data || '');
        }
        break;
      case LogLevel.INFO:
        console.info(formattedMessage, data || '');
        break;
      case LogLevel.WARN:
        console.warn(formattedMessage, data || '');
        break;
      case LogLevel.ERROR:
        console.error(formattedMessage, data || '');
        break;
    }

    // ----------------------
    // Future: Send to External Service
    // ----------------------
    // In production, you might want to send logs to a service like:
    // - Sentry for error tracking
    // - LogRocket for session replay
    // - Custom analytics endpoint
    if (!this.isDevelopment && level >= LogLevel.ERROR) {
      this.sendToExternalService(entry);
    }
  }

  // ----------------------
  // Log Level Prefix Generator
  // ----------------------
  private getLogPrefix(level: LogLevel, context?: string): string {
    const timestamp = new Date().toISOString();
    const levelName = LogLevel[level];
    const contextStr = context ? `[${context}]` : '';
    
    return `[${timestamp}] [${levelName}]${contextStr}`;
  }

  // ----------------------
  // External Service Integration
  // ----------------------
  private sendToExternalService(entry: LogEntry): void {
    // Placeholder for external logging service integration
    // This could be Sentry, LogRocket, or custom analytics
    try {
      // Example: Send to analytics or error tracking service
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'exception', {
          description: entry.message,
          fatal: entry.level === LogLevel.ERROR
        });
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_error) {
      // Silently fail to avoid logging loops
    }
  }

  // ----------------------
  // Public API Methods
  // ----------------------
  
  /**
   * Debug level logging - only shown in development
   * @param message - The debug message
   * @param context - Optional context identifier
   * @param data - Optional additional data
   */
  debug(message: string, context?: string, data?: unknown): void {
    this.log(LogLevel.DEBUG, message, context, data);
  }

  /**
   * Info level logging - general information
   * @param message - The info message
   * @param context - Optional context identifier
   * @param data - Optional additional data
   */
  info(message: string, context?: string, data?: unknown): void {
    this.log(LogLevel.INFO, message, context, data);
  }

  /**
   * Warning level logging - potential issues
   * @param message - The warning message
   * @param context - Optional context identifier
   * @param data - Optional additional data
   */
  warn(message: string, context?: string, data?: unknown): void {
    this.log(LogLevel.WARN, message, context, data);
  }

  /**
   * Error level logging - serious issues
   * @param message - The error message
   * @param context - Optional context identifier
   * @param data - Optional additional data or Error object
   */
  error(message: string, context?: string, data?: unknown): void {
    this.log(LogLevel.ERROR, message, context, data);
  }

  // ----------------------
  // Utility Methods
  // ----------------------
  
  /**
   * Set the current log level
   * @param level - The minimum log level to display
   */
  setLevel(level: LogLevel): void {
    this.currentLevel = level;
  }

  /**
   * Get the current log level
   * @returns The current log level
   */
  getLevel(): LogLevel {
    return this.currentLevel;
  }

  /**
   * Check if a log level is enabled
   * @param level - The log level to check
   * @returns Whether the level is enabled
   */
  isLevelEnabled(level: LogLevel): boolean {
    return level >= this.currentLevel;
  }
}

// ----------------------
// Singleton Instance Export
// ----------------------
// Create and export a singleton instance
export const logger = new Logger();

// ----------------------
// Convenience Exports
// ----------------------
// Export individual methods for easier importing
export const { debug, info, warn, error } = logger;

// ----------------------
// Type Exports
// ----------------------
export type { LogEntry };