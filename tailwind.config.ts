// ----------------------
// Tailwind CSS Configuration
// ----------------------
// Configures dark mode strategy and content scanning paths
// Used by: PostCSS plugin for processing Tailwind classes
// Location: /tailwind.config.ts (project root)
// ----------------------

import type { Config } from "tailwindcss";

export default {
  // ----------------------
  // Dark Mode Strategy
  // ----------------------
  // Uses class-based dark mode with .dark class on html element
  // Alternative: ['class', '[data-theme="dark"]'] for data-attribute strategy
  darkMode: "class",
  
  // ----------------------
  // Content Scanning Paths
  // ----------------------
  // Tells Tailwind where to look for class usage to include in final CSS
  // Covers all possible locations where Tailwind classes might be used
  content: [
    "./app/**/*.{ts,tsx,js,jsx,md,mdx}", 
    "./src/**/*.{ts,tsx,js,jsx,md,mdx}",
    "./components/**/*.{ts,tsx,js,jsx}", // If components directory exists
    "./pages/**/*.{ts,tsx,js,jsx}",     // If using pages directory
    "./components.json"                  // Shadcn component config
  ],
  
  // ----------------------
  // Theme Configuration
  // ----------------------
  // Extended in globals.css via @theme inline directive
  // Custom properties defined in CSS variables take precedence
  theme: {},
  
  // ----------------------
  // Plugins
  // ----------------------
  // Additional plugins can be added here
  // Current setup relies on CSS-based configuration in globals.css
  plugins: [],
} satisfies Config;