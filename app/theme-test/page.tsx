// ----------------------
// Theme Sanity Test Page
// ----------------------
// Tests theme implementation according to color usage guide
// Tests: dark mode toggle, primary buttons, brand text, borders
// Location: /app/theme-test/page.tsx
// ----------------------

"use client";

import { useTheme } from "../../src/features/theme/useTheme";

/**
 * Theme testing page component
 * 
 * Validates:
 * - Dark mode toggle functionality
 * - Primary button styling (blue)
 * - Brand text usage (gold, prestige only)
 * - Neutral borders (not gold)
 * - Card backgrounds with theme switching
 */
export default function ThemeTestPage() {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      {/* ---------------------- */}
      {/* Page Header */}
      {/* ---------------------- */}
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-foreground">
            Theme Sanity Test Page
          </h1>
          <p className="text-muted-foreground">
            Testing theme implementation according to color usage guide
          </p>
          <p className="text-sm text-muted-foreground">
            Current theme: <span className="font-mono">{theme}</span>
          </p>
        </div>

        {/* ---------------------- */}
        {/* Theme Toggle Test */}
        {/* ---------------------- */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">1. Dark Mode Toggle Test</h2>
          <p className="text-muted-foreground mb-4">
            This card should change background when toggling themes.
          </p>
          <button
            onClick={toggleTheme}
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-lg transition-colors"
          >
            Toggle to {isDark ? "Light" : "Dark"} Mode
          </button>
          <div className="mt-4 p-4 bg-muted rounded border border-border">
            <p className="text-sm text-muted-foreground">
              ✓ Card background: <code>bg-card</code> (should change with theme)
            </p>
          </div>
        </div>

        {/* ---------------------- */}
        {/* Primary Button Test */}
        {/* ---------------------- */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">2. Primary Button Test (Blue)</h2>
          <p className="text-muted-foreground mb-4">
            Primary buttons should use blue color scheme for CTAs and interactions.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-primary text-primary-foreground hover:bg-primary/90 ring-2 ring-primary/20 px-4 py-2 rounded-lg">
              Subscribe
            </button>
            <button className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-lg">
              Post Content
            </button>
            <button className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-lg">
              Pay Now
            </button>
          </div>
          <div className="mt-4 p-4 bg-muted rounded border border-border">
            <p className="text-sm text-muted-foreground">
              ✓ Primary buttons: <code>bg-primary text-primary-foreground</code> (should be blue)
            </p>
          </div>
        </div>

        {/* ---------------------- */}
        {/* Brand Text Test */}
        {/* ---------------------- */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">3. Brand Text Test (Gold - Prestige Only)</h2>
          <p className="text-muted-foreground mb-4">
            Brand color (gold) should only appear for prestige elements, not CTAs.
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-brand">✓</span>
              <span className="text-brand text-sm font-medium">Verified Creator</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-brand">👑</span>
              <span className="text-brand text-sm font-medium">Creator of the Day</span>
            </div>
            <div className="bg-brand/10 border border-brand/30 rounded-full px-3 py-1 inline-block">
              <span className="text-brand text-xs font-medium">Premium</span>
            </div>
          </div>
          <div className="mt-4 p-4 bg-muted rounded border border-border">
            <p className="text-sm text-muted-foreground">
              ✓ Brand elements: <code>text-brand</code> (should be gold, used sparingly)
            </p>
          </div>
        </div>

        {/* ---------------------- */}
        {/* Secondary Elements Test */}
        {/* ---------------------- */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">4. Secondary Elements Test</h2>
          <p className="text-muted-foreground mb-4">
            Secondary buttons and accent elements should use appropriate colors.
          </p>
          <div className="flex flex-wrap gap-4 mb-4">
            <button className="bg-secondary text-secondary-foreground hover:bg-secondary/80 px-4 py-2 rounded-lg">
              View Details
            </button>
            <span className="bg-accent/10 text-accent border border-accent/30 rounded-full px-3 py-1 text-xs">
              Filter: Popular
            </span>
            <span className="bg-accent/10 text-accent border border-accent/30 rounded-full px-3 py-1 text-xs">
              New
            </span>
          </div>
          <div className="mt-4 p-4 bg-muted rounded border border-border">
            <p className="text-sm text-muted-foreground">
              ✓ Secondary: <code>bg-secondary</code> | Accent: <code>bg-accent/10 text-accent</code>
            </p>
          </div>
        </div>

        {/* ---------------------- */}
        {/* Border Test */}
        {/* ---------------------- */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">5. Border Test (Neutral, Not Gold)</h2>
          <p className="text-muted-foreground mb-4">
            Borders should use neutral colors, not brand gold.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-border rounded p-4">
              <p className="text-sm">Card with neutral border</p>
            </div>
            <div className="border border-border rounded p-4">
              <p className="text-sm">Another neutral border</p>
            </div>
          </div>
          <div className="mt-4 p-4 bg-muted rounded border border-border">
            <p className="text-sm text-muted-foreground">
              ✓ Borders: <code>border-border</code> (should be neutral zinc, not gold)
            </p>
          </div>
        </div>

        {/* ---------------------- */}
        {/* Focus Ring Test */}
        {/* ---------------------- */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">6. Focus Ring Test</h2>
          <p className="text-muted-foreground mb-4">
            Focus rings should use primary color for accessibility.
          </p>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Focus me to see ring"
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button className="bg-secondary text-secondary-foreground hover:bg-secondary/80 focus:outline-none focus:ring-2 focus:ring-primary px-4 py-2 rounded-lg">
              Focus me too
            </button>
          </div>
          <div className="mt-4 p-4 bg-muted rounded border border-border">
            <p className="text-sm text-muted-foreground">
              ✓ Focus rings: <code>focus:ring-2 focus:ring-primary</code> (should be blue)
            </p>
          </div>
        </div>

        {/* ---------------------- */}
        {/* Test Results Summary */}
        {/* ---------------------- */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">✅ Test Results Summary</h2>
          <div className="space-y-2 text-sm">
            <p className="text-muted-foreground">✓ Dark mode toggle: Cards change background</p>
            <p className="text-muted-foreground">✓ Primary buttons: Blue color scheme</p>
            <p className="text-muted-foreground">✓ Brand text: Gold, used only for prestige</p>
            <p className="text-muted-foreground">✓ Borders: Neutral zinc, not gold</p>
            <p className="text-muted-foreground">✓ Focus rings: Blue primary color</p>
          </div>
        </div>
      </div>
    </div>
  );
}