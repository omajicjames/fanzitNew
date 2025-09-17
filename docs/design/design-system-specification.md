# Fanzit Design System Specification

## Overview
This document consolidates all design specifications and guidelines for maintaining visual consistency across the Fanzit application. It serves as the single source of truth for design decisions, component usage, and styling patterns.

## 1. Color System

### Color Tokens (from globals.css)
- `--primary / --primary-foreground` - Blue for interactions & focus
- `--accent / --accent-foreground` - Teal for supportive highlights
- `--brand / --brand-foreground` - Gold for prestige elements
- `--background, --foreground, --muted, --border, --ring` - Neutrals (zinc)

### Color Usage Guidelines

#### Primary (Blue)
**Use for:**
- Main CTAs: buttons, submit, "Subscribe", "Post", "Pay"
- Links, link hovers
- Focus rings, selected tabs/pills, active nav items
- Progress & key interactive indicators

**Classes:**
```css
bg-primary text-primary-foreground
text-primary hover:text-primary/80
ring-2 ring-primary
border-primary (sparingly; prefer neutral borders)
```

**Don't:**
- Use primary for every chip/badge (creates visual noise)

#### Accent (Teal)
**Use for:**
- Secondary actions (non-destructive)
- Filter chips, small info tags ("New", "Beta")
- Hover states on subtle elements
- Graph series, charts

**Classes:**
```css
bg-accent text-accent-foreground
text-accent
bg-accent/10 border-accent/30 (subtle fills)
```

#### Brand (Gold)
**Use for (sparingly!):**
- Verified ticks, crowns, premium ribbons
- "Creator of the Day" halo or small lines on paywalls
- Tiny decorations that signal prestige

**Classes:**
```css
text-brand (for icons/small text)
bg-brand/10 (for soft halo backgrounds)
border-brand/30 (for subtle brand edges)
```

**Don't:**
- Use brand for buttons, links, nav, focus states, global borders
- Use brand gradients and large fills (overpowers content)

#### Neutrals (Zinc)
- **Backgrounds:** `bg-background` (page), `bg-card` (surfaces)
- **Text:** `text-foreground` (primary), `text-muted-foreground` (meta)
- **Borders:** `border-border`
- **Disabled:** reduce alpha (/40, /20) on neutral tokens

## 2. Component Recipes

### Primary Button
```tsx
<button className="bg-primary text-primary-foreground hover:bg-primary/90 ring-1 ring-primary/20 rounded-lg px-4 py-2">
  Continue
</button>
```

### Secondary Button
```tsx
<button className="bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-lg px-4 py-2">
  View details
</button>
```

### Chip (Accent)
```tsx
<span className="bg-accent/10 text-accent border border-accent/30 rounded-full px-3 py-1 text-xs">
  Filter: Yoga
</span>
```

### Verified Badge (Brand)
```tsx
<span className="inline-flex items-center gap-1 text-brand">
  <svg className="size-4" /> <span className="text-xs">Verified</span>
</span>
```

### Card
```tsx
<div className="bg-card text-card-foreground border border-border rounded-2xl">
  {/* content */}
</div>
```

## 3. Design System Rules

### Component Usage
- **ONLY use `@/components/ui/*` primitives** (shadcn/ui suite)
- **No custom buttons/inputs** - extend via variants
- **Consistent imports** - Always use `@/components/ui/[component]`
- **No duplicate components** - Reuse existing UI primitives
- **Extend via variants** - Use `className` or `variant` props

### Styling Approach
- **Complete shadcn/ui suite** - 50+ components in `@/components/ui/`
- **Consistent styling** - New York style with CSS variables
- **Theme support** - Dark mode with theme provider
- **Icons** - Lucide React icon library

## 4. Layout Patterns

### Card Design
- **Outer card owns borders/radius** - Inner elements should be flush
- **No double borders** - Remove inner borders when nested in cards
- **Rounded corners** - Use `rounded-2xl` for cards, `rounded-b-2xl` for media
- **Proper overflow** - Use `overflow-hidden` for media containers

### Border Guidelines
```css
/* CORRECT - No inner border, no top rounding */
.media-wrapper {
  @apply relative overflow-hidden rounded-b-2xl border-0;
}

/* INCORRECT - Creates double border effect */
.media-wrapper {
  @apply relative overflow-hidden rounded-2xl border border-border/50;
}
```

## 5. Modern UI Patterns

### Paywall Design
- **Interactive layers** - Hover/click interactions that reveal content
- **Floating unlock pills** - Follow locked posts
- **Micro-preview teasers** - Show brief content snippets
- **Smooth animations** - Use Tailwind transition classes

### Profile Design
- **Modern banners** - Gradient backgrounds with overlay effects
- **Layered avatars** - Position over banners with negative margins
- **Collapsible sections** - Use chevron icons for expand/collapse
- **Mobile-first responsive** - Optimize for smaller screens first

## 6. Accessibility Standards

### Focus Management
- **Focus rings** - Use primary color: `focus:ring-2 focus:ring-primary`
- **Proper contrast** - Minimum 4.5:1 ratio for interactive text
- **Keyboard navigation** - Support for all interactive elements
- **ARIA labels** - Proper semantic markup

### Visual Feedback
- **Don't rely on color alone** - Keep shape/label hints
- **Loading states** - Clear indicators for async operations
- **Error states** - Use Sonner toasts for user feedback
- **Success states** - Confirm user actions

## 7. Theme Implementation

### Dark Mode Support
- **CSS custom properties** - Use semantic color tokens
- **Theme persistence** - Remember user choice in localStorage
- **System preference** - Respect user's OS setting on first visit
- **Smooth transitions** - Prevent flash of unstyled content (FOUC)

### Theme Classes
```css
/* Light theme (default) */
:root {
  --primary: 221.2 83.2% 53.3%;
  --primary-foreground: 210 40% 98%;
}

/* Dark theme */
.dark {
  --primary: 217.2 91.2% 59.8%;
  --primary-foreground: 222.2 84% 4.9%;
}
```

## 8. Z-Index Management

### Layer Hierarchy
```css
/* Navigation and fixed elements */
.navigation-button { z-index: 50; }
.page-navigator { z-index: 60; }

/* Overlays and modals */
.cookie-banner { z-index: 70; }
.dialog-overlay { z-index: 80; }
.toast-notifications { z-index: 90; }

/* Critical system alerts */
.emergency-overlay { z-index: 100; }
```

### Best Practices
- **Centralized management** - Define z-index values in one place
- **Logical grouping** - Group related elements in ranges
- **Avoid conflicts** - Leave gaps between layer groups
- **Mobile considerations** - Test on mobile devices

## 9. Animation Guidelines

### Transition Standards
- **Duration** - Use consistent timing (150ms, 300ms, 500ms)
- **Easing** - Prefer `ease-in-out` for most transitions
- **Performance** - Use `transform` and `opacity` for smooth animations
- **Reduced motion** - Respect user's motion preferences

### Common Patterns
```css
/* Hover transitions */
.interactive-element {
  @apply transition-colors duration-150 ease-in-out;
}

/* Modal animations */
.modal-enter {
  @apply transition-all duration-300 ease-in-out;
}

/* Loading states */
.loading-spinner {
  @apply animate-spin;
}
```

## 10. Mobile-First Design

### Responsive Breakpoints
- **Mobile** - Default styles (320px+)
- **Tablet** - `sm:` (640px+)
- **Desktop** - `lg:` (1024px+)
- **Large Desktop** - `xl:` (1280px+)

### Touch Targets
- **Minimum size** - 44px × 44px for touch elements
- **Spacing** - Adequate spacing between interactive elements
- **Gestures** - Support swipe, pinch, and tap interactions
- **Orientation** - Handle portrait/landscape changes

## 11. Performance Considerations

### CSS Optimization
- **Purge unused styles** - Tailwind's purge configuration
- **Critical CSS** - Inline critical styles
- **Lazy loading** - Load non-critical styles asynchronously
- **Bundle size** - Monitor CSS bundle size

### Image Optimization
- **SVG preferred** - Use SVG for icons and simple graphics
- **Responsive images** - Multiple sizes for different screens
- **Lazy loading** - Load images as needed
- **WebP format** - Modern image formats when supported

## 12. Documentation Standards

### Component Documentation
- **Function-level comments** - Explain component purpose
- **Props documentation** - TypeScript interfaces with JSDoc
- **Usage examples** - Show common use cases
- **File structure** - Clear directory organization

### Code Comments Format
```typescript
// ----------------------
// 1. Component Purpose
// ----------------------
// Description of what this component does
// Location: /src/features/[feature]/components/[component].tsx
// Parent: [ParentComponent] in /src/features/[feature]/
// Children: [ChildComponent] in /src/components/ui/
```

## 13. Maintenance Guidelines

### Regular Reviews
- **Color usage audit** - Ensure consistent color application
- **Component inventory** - Remove unused components
- **Performance monitoring** - Track bundle size and load times
- **Accessibility testing** - Regular a11y audits

### Version Control
- **Design tokens** - Version control for design system changes
- **Component versioning** - Track breaking changes
- **Migration guides** - Document upgrade paths
- **Changelog** - Record all design system updates

---

## Quick Reference

### Essential Files
- **Color Guide:** `/docs/design/color_usage_guide.md`
- **Component Rules:** `/docs/project/Must_dos.md`
- **Theme Setup:** `/docs/troubleshooting/system/theme-implementation-setup.md`
- **UI Patterns:** `/docs/design/modern_post.md`
- **Card Styling:** `/docs/design/faint_double_border_card.md`

### Key Principles
1. **Mobile-first design** - Start with mobile, enhance for desktop
2. **Object-oriented programming** - Clean component architecture
3. **Consistent naming** - Follow established conventions
4. **Accessibility first** - Design for all users
5. **Performance conscious** - Optimize for speed and efficiency

---

*This specification should be updated whenever design decisions are made or patterns are established. All team members should reference this document before implementing new features or modifying existing components.*