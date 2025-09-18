// ----------------------
// Theme Toggle Utility Hook
// ----------------------
// Provides runtime theme switching functionality
// Manages localStorage persistence and DOM class updates
// Used by: Theme toggle components throughout the app
// Location: /src/features/theme/useTheme.ts
// ----------------------

import { useEffect, useState } from "react";
import { logger } from "@src/lib/logger";

/**
 * Custom hook for managing application theme state
 * 
 * Features:
 * - Persists theme preference to localStorage
 * - Updates DOM class for immediate visual changes
 * - Provides theme state and setter function
 * - Handles initial theme detection from storage or system preference
 * 
 * @returns Object containing current theme and setter function
 */
export function useTheme() {
  // ----------------------
  // Theme State Management
  // ----------------------
  // Initialize with dark theme as default
  // Will be updated by useEffect based on stored preference
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  
  // ----------------------
  // Theme Application Effect
  // ----------------------
  // Updates DOM and localStorage whenever theme changes
  useEffect(() => {
    const root = document.documentElement;
    const isDark = theme === "dark";
    
    // Apply theme class to document root
    root.classList.toggle("dark", isDark);
    
    // Persist theme preference to localStorage
    localStorage.setItem("theme", theme);
  }, [theme]);
  
  // ----------------------
  // Initial Theme Detection Effect
  // ----------------------
  // Runs once on mount to detect saved or system preference
  useEffect(() => {
    try {
      const saved = localStorage.getItem("theme");
      if (saved && (saved === "light" || saved === "dark")) {
        setTheme(saved);
      } else {
        // Fallback to system preference if no saved theme
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        setTheme(prefersDark ? "dark" : "light");
      }
    } catch (error) {
      // Fallback to dark theme if localStorage access fails
      logger.warn("Failed to access localStorage for theme preference", "useTheme", error);
      setTheme("dark");
    }
  }, []);
  
  // ----------------------
  // Public API
  // ----------------------
  // Returns current theme state and setter function
  return { 
    theme, 
    setTheme,
    // Convenience methods for common operations
    toggleTheme: () => setTheme(prev => prev === "dark" ? "light" : "dark"),
    isDark: theme === "dark",
    isLight: theme === "light"
  };
}

// ----------------------
// Theme Toggle Component Example
// ----------------------
// Usage example for implementing theme toggle buttons:
// 
// import { useTheme } from "@/features/theme/useTheme";
// 
// function ThemeToggle() {
//   const { theme, setTheme, toggleTheme } = useTheme();
//   
//   return (
//     <button 
//       onClick={toggleTheme}
//       className="bg-primary text-primary-foreground px-4 py-2 rounded-lg"
//     >
//       {theme === "dark" ? "Light Mode" : "Dark Mode"}
//     </button>
//   );
// }
// ----------------------