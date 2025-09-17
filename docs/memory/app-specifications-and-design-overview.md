# Fanzit App Specifications and Design Overview

## Overview
This document consolidates all app specifications, design system documentation, and architectural information for the Fanzit application. It serves as the central reference point for understanding the complete application structure and design requirements.

## 1. Application Architecture

### Project Structure
```
fanzit/
├── app/                          # Next.js App Router
│   ├── (public)/                 # Public routes (landing page)
│   └── (protected)/              # Protected routes (authenticated users)
│       ├── analytics/            # Analytics dashboard
│       ├── creator/              # Creator-specific pages
│       ├── explore/              # Content discovery
│       ├── liked/                # User's liked content
│       ├── messages/             # Messaging interface
│       ├── settings/             # User settings
│       ├── trending/             # Trending content
│       └── wallet/               # Payment/wallet features
├── src/                          # Source code
│   ├── components/               # Shared UI components
│   │   ├── app/                  # App-specific components
│   │   └── ui/                   # shadcn/ui primitives
│   ├── features/                 # Feature-based modules
│   │   ├── admin/                # Admin functionality
│   │   ├── auth/                 # Authentication
│   │   ├── consent/              # Cookie consent system
│   │   ├── creator/              # Creator features
│   │   ├── feed/                 # Content feed
│   │   ├── messaging/            # Messaging system
│   │   ├── navigation/           # Navigation components
│   │   ├── paywall/              # Premium content system
│   │   ├── post/                 # Post components
│   │   ├── post-actions/         # Post interaction system
│   │   └── right-rail/           # Right sidebar features
│   ├── hooks/                    # Custom React hooks
│   └── lib/                      # Utilities and configurations
├── docs/                         # Comprehensive documentation
└── public/                       # Static assets
```

### Technology Stack
- **Framework**: Next.js 15.5.3 (App Router)
- **Language**: TypeScript 5.x
- **Styling**: Tailwind CSS v3.4.17
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **State Management**: React hooks + localStorage
- **Theme**: Dark/Light mode support
- **Package Manager**: pnpm

## 2. Design System Specifications

### Core Design Principles
1. **Mobile-First Design** - Start with mobile, enhance for desktop
2. **Object-Oriented Programming** - Clean component architecture
3. **Accessibility First** - WCAG compliance standards
4. **Performance Conscious** - Optimized for speed and efficiency
5. **Consistent Naming** - Follow established conventions

### Color System
**Primary Colors:**
- `--primary` (Blue) - Main CTAs, links, focus states
- `--accent` (Teal) - Secondary actions, filter chips
- `--brand` (Gold) - Premium elements, verified badges
- `--background/foreground` - Neutral base colors (Zinc palette)

**Usage Guidelines:**
- Primary: Subscribe buttons, main CTAs, active navigation
- Accent: Filter chips, secondary actions, hover states
- Brand: Verified ticks, premium ribbons (use sparingly)
- Neutrals: Text, borders, backgrounds

### Component Architecture
**Base Components:**
- `BasePostCard` - Core card structure with slots
- `PostCard` - Standard content cards
- `AdminPostCard` - Admin promotional content
- `LockedPostShell` - Premium content previews

**UI Primitives (shadcn/ui):**
- 50+ components in `/src/components/ui/`
- Consistent styling with CSS variables
- Theme support with dark mode
- Accessibility built-in

### Layout Patterns
**Three-Column Shell:**
- Left: Sidebar navigation
- Center: Main content (variable)
- Right: Messaging panel

**Responsive Design:**
- Mobile: Single column with collapsible panels
- Tablet: Two-column layout
- Desktop: Full three-column layout

## 3. Feature Specifications

### Authentication System
**Location**: `/src/features/auth/`
- Demo login functionality
- Role-based access (Creator/Subscriber)
- Protected route system
- Session management

### Paywall System
**Location**: `/src/features/paywall/`
- Subscription tiers (Free, Premium, VIP)
- Locked content previews
- Upgrade prompts and dialogs
- Tier-specific styling and icons

### Messaging System
**Location**: `/src/features/messaging/`
- Real-time messaging interface
- Conversation management
- Minimize/maximize functionality
- Integration with main layout

### Content Management
**Location**: `/src/features/post/`
- Post creation and editing
- Media handling (images, videos)
- Engagement features (likes, comments, shares)
- Content filtering and discovery

### Admin Features
**Location**: `/src/features/admin/`
- Analytics dashboard
- User management
- Content moderation
- Promotional content system

## 4. Technical Specifications

### TypeScript Configuration
```json
{
  "compilerOptions": {
    "target": "ES6",
    "lib": ["dom", "dom.iterable", "esnext"],
    "strict": true,
    "jsx": "preserve",
    "moduleResolution": "bundler"
  },
  "paths": {
    "@app/*": ["./app/*"],
    "@src/*": ["./src/*"]
  }
}
```

### Tailwind Configuration
- **Style**: New York variant
- **Base Color**: Neutral (Zinc)
- **CSS Variables**: Enabled for theming
- **Icon Library**: Lucide React
- **Plugins**: Line clamp, animations

### Build Configuration
- **Development**: `pnpm dev` (port 3000 or ENV PORT)
- **Production**: `pnpm build && pnpm start`
- **Linting**: ESLint with Next.js config
- **Type Checking**: Strict TypeScript

## 5. Design Documentation Files

### Primary Design Documents
1. **Design System Specification**: `/docs/design/design-system-specification.md`
   - Complete color system and usage guidelines
   - Component recipes and patterns
   - Accessibility standards
   - Theme implementation

2. **Color Usage Guide**: `/docs/design/color_usage_guide.md`
   - Detailed color token usage
   - Theme-specific guidelines
   - Accessibility considerations

3. **Component Documentation**: `/docs/components/`
   - Card component breakdown
   - Implementation guides
   - UI action patterns

### Technical Documentation
1. **Project Requirements**: `/docs/project/Must_dos.md`
   - Development guidelines
   - Code standards
   - Component usage rules

2. **Troubleshooting Guides**: `/docs/troubleshooting/`
   - System fixes and solutions
   - Component implementations
   - Performance optimizations

3. **Memory Documentation**: `/docs/memory/`
   - Implementation history
   - Architectural decisions
   - Change logs

## 6. Development Guidelines

### Code Standards
- **Function-level comments** for all components
- **TypeScript interfaces** with JSDoc documentation
- **Consistent imports** using path aliases
- **Mobile-first responsive** design approach

### Component Development
- Use only `@/components/ui/*` primitives
- Extend via variants, not custom components
- Follow established naming conventions
- Implement proper accessibility features

### File Organization
```typescript
// Component structure example
// ----------------------
// 1. Component Purpose
// ----------------------
// Description of what this component does
// Location: /src/features/[feature]/components/[component].tsx
// Parent: [ParentComponent] in /src/features/[feature]/
// Children: [ChildComponent] in /src/components/ui/
```

## 7. Performance Specifications

### Optimization Strategies
- **CSS Optimization**: Tailwind purge configuration
- **Image Optimization**: SVG preferred, responsive images
- **Bundle Management**: Monitor CSS and JS bundle sizes
- **Lazy Loading**: Load non-critical resources asynchronously

### Accessibility Requirements
- **Focus Management**: Primary color focus rings
- **Contrast Ratios**: Minimum 4.5:1 for interactive text
- **Keyboard Navigation**: Full keyboard support
- **Screen Readers**: Proper ARIA labels and semantic markup

## 8. Deployment Specifications

### Environment Configuration
- **Development**: Local development server
- **Production**: Vercel deployment
- **Environment Variables**: Configured in `.env` files
- **Analytics**: Vercel Analytics integration

### Build Requirements
- **Node.js**: Latest LTS version
- **Package Manager**: pnpm (required)
- **Build Target**: Static export compatible
- **Browser Support**: Modern browsers with ES6+ support

## 9. Maintenance Guidelines

### Regular Reviews
- **Color usage audit** - Ensure consistent application
- **Component inventory** - Remove unused components
- **Performance monitoring** - Track bundle size and load times
- **Accessibility testing** - Regular a11y compliance checks

### Documentation Updates
- **Design tokens** - Version control for changes
- **Component versioning** - Track breaking changes
- **Migration guides** - Document upgrade paths
- **Changelog** - Record all system updates

## 10. Quick Reference

### Essential Configuration Files
- `package.json` - Dependencies and scripts
- `tailwind.config.ts` - Styling configuration
- `tsconfig.json` - TypeScript configuration
- `components.json` - shadcn/ui configuration
- `postcss.config.js` - PostCSS setup

### Key Documentation Locations
- **Design System**: `/docs/design/design-system-specification.md`
- **Project Rules**: `/docs/project/Must_dos.md`
- **Component Guides**: `/docs/components/`
- **Troubleshooting**: `/docs/troubleshooting/`
- **Implementation History**: `/docs/memory/`

### Development Commands
```bash
# Development
pnpm dev                 # Start development server
pnpm build              # Build for production
pnpm lint               # Run ESLint
pnpm start              # Start production server
```

---

**Last Updated**: Current as of latest commit  
**Maintainer**: Development Team  
**Status**: Active Development  

*This specification should be updated whenever architectural decisions are made or new features are implemented. All team members should reference this document before starting new development work.*