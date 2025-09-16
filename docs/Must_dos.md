# FANZIT - MUST_DOS

**Fanzit** is a Next.js 14 App Router application for creators to share premium content with subscription/PPV paywalls, messaging, and analytics.  
This document is the source of truth for architecture, security, and implementation patterns.

---

## 🚨 CRITICAL RULES

- **PRODUCTION READY ONLY** - No workarounds or bypasses
- **NO SERVICE ROLE IN CLIENT** - Never put `SUPABASE_SERVICE_ROLE_KEY` in client bundles
- **USE @/ IMPORTS** - Consistent alias usage throughout the codebase
- **SUPABASE DB IS SOURCE OF TRUTH** - Extend DB types, don't redefine
- **NO `supabase db reset`** - Use safe SQL commands to avoid data loss

## 0) TL;DR (Golden Rules)

- **Server stays server.** Do not import `next/headers`, server Supabase, service keys, or repositories into any `"use client"` file.
- **Client stays client.** Client hooks/components must only call client-safe helpers or API routes.
- **Validate at the edge.** Parse & clamp inputs with Zod in route handlers; never trust client pricing or IDs.
- **RLS on.** Supabase RLS for every table; admin is whitelisted by policy, not by code.
- **One design system.** Use **only** `@/components/ui/*` primitives (shadcn + Tailwind). No ad-hoc `Button`s.

---

## 1) Stack

- **Framework:** Next.js 15 (App Router)
- **Data:** Supabase (Postgres, Auth, Storage) with RLS
- **UI:** TailwindCSS + shadcn/ui, Radix, Icons
- **Types/Validation:** TypeScript + Zod
- **UX:** Sonner toasts, optimistic updates
- **Pay:** Server-first validation, money in **cents**

---

## 2) Current Directory Structure

```
src/
├─ app/                    # Next.js App Router pages
│  ├─ analytics/           # Analytics dashboard
│  ├─ auth/               # Authentication pages
│  ├─ creator/            # Creator profile & upload
│  │  ├─ profile/
│  │  └─ upload/
│  ├─ messages/           # Messaging interface
│  ├─ wallet/             # Payment & wallet management
│  ├─ globals.css         # Global styles
│  ├─ layout.tsx          # Root layout with AuthProvider
│  └─ page.tsx            # Home page
├─ components/            # Feature & UI components
│  ├─ admin/              # Admin dashboard components
│  │  └─ analytics-dashboard.tsx
│  ├─ auth/               # Authentication components
│  │  ├─ auth-provider.tsx
│  │  ├─ login-form.tsx
│  │  └─ protected-route.tsx
│  ├─ creator/            # Creator-specific components
│  │  ├─ content-upload.tsx
│  │  └─ creator-profile.tsx
│  ├─ feed/               # Content feed components
│  │  └─ main-feed.tsx
│  ├─ layout/             # Layout components
│  │  ├─ sidebar.tsx
│  │  └─ three-column-shell.tsx
│  ├─ messaging/          # Messaging components
│  │  ├─ full-messaging-interface.tsx
│  │  └─ messaging-panel.tsx
│  ├─ navigation/         # Navigation components
│  │  └─ page-navigator.tsx
│  ├─ payments/           # Payment components
│  │  ├─ pay-per-view-modal.tsx
│  │  ├─ subscription-modal.tsx
│  │  └─ wallet-dashboard.tsx
│  ├─ theme-provider.tsx  # Theme management
│  └─ ui/                 # shadcn/ui primitives
├─ hooks/                 # Custom React hooks
│  ├─ use-mobile.ts
│  └─ use-toast.ts
├─ lib/                   # Utilities and configurations
│  └─ utils.ts            # Utility functions
└─ styles/                # Additional styles
    └─ globals.css
```


---

## 3) Fanzit Feature Implementation Flow

### Current Features:
- **Authentication** → Login/logout with AuthProvider
- **Creator Tools** → Content upload and profile management
- **Content Feed** → Main feed for content discovery
- **Messaging** → Direct messaging between users
- **Payments** → PPV and subscription modals
- **Analytics** → Creator analytics dashboard
- **Wallet** → Payment and earnings management

### Implementation Pattern:
1. **Component Structure** → Feature components in `@/components/[feature]/`
2. **Page Routes** → App router pages in `@/app/[feature]/`
3. **UI Primitives** → Only use `@/components/ui/*` (shadcn)
4. **Styling** → TailwindCSS with CSS variables
5. **State Management** → React hooks and context providers

> **Always use @/ imports** for consistency across the codebase.

---

## 4) Client/Server Architecture

### Current Implementation:
- **Client Components** → All components in `@/components/` are client-side
- **Server Components** → App router pages are server-side by default
- **AuthProvider** → Wraps the entire app for authentication state
- **Theme Provider** → Manages dark/light theme switching

### Rules:
- Use `"use client"` directive only when necessary
- Keep server logic in page components and API routes
- Client components should only handle UI interactions
- Use proper TypeScript imports with `@/` alias

## 5) Design System (shadcn/ui)

### Current UI Components:
- **Complete shadcn/ui suite** → 50+ components in `@/components/ui/`
- **Consistent styling** → New York style with CSS variables
- **Theme support** → Dark mode with theme provider
- **Icons** → Lucide React icon library

### Rules:
- **ONLY use `@/components/ui/*` primitives** → No custom buttons/inputs
- **Extend via variants** → Use `className` or `variant` props
- **Consistent imports** → Always use `@/components/ui/[component]`
- **No duplicate components** → Reuse existing UI primitives

## 6) Monetization Features

### Current Payment Components:
- **PPV Modal** → `@/components/payments/pay-per-view-modal.tsx`
- **Subscription Modal** → `@/components/payments/subscription-modal.tsx`
- **Wallet Dashboard** → `@/components/payments/wallet-dashboard.tsx`

### Implementation Rules:
- **Money in cents** → Store as integers, convert at UI boundaries
- **Server validation** → Validate all pricing on server-side
- **Payment security** → Never trust client-side pricing
- **User experience** → Clear CTAs for Subscribe/Unlock/Login flows

## 7) Error Handling & UX

### Current Implementation:
- **Sonner Toasts** → `@/components/ui/sonner.tsx` for notifications
- **Loading States** → `@/app/analytics/loading.tsx` example
- **Theme Provider** → Dark mode support throughout app

### Best Practices:
- **Client errors** → Use Sonner toasts for user feedback
- **Loading states** → Add `loading.tsx` in route folders
- **Error boundaries** → Add `error.tsx` for graceful fallbacks
- **No sensitive data** → Never log secrets or payment info

## 8) Security & Environment

### Current Security Measures:
- **Environment Variables** → Proper separation of public/private keys
- **Authentication** → AuthProvider wraps entire application
- **Protected Routes** → `@/components/auth/protected-route.tsx`

### Security Checklist:
- **CSP Headers** → Lock down script-src, img-src, media-src
- **Rate Limiting** → Implement on auth and payment endpoints
- **XSS Prevention** → Never use `dangerouslySetInnerHTML`
- **Environment Security** → Service keys server-only, minimal NEXT_PUBLIC_*

```typescript
// middleware.ts (recommended)
const csp = [
  "default-src 'self'",
  "script-src 'self' 'wasm-unsafe-eval'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "media-src 'self' https://*.supabase.co",
  "connect-src 'self' https://*.supabase.co"
].join('; ');
```

## 9) Utilities and Helpers

### Current Implementation:
- **Utils** → `@/lib/utils.ts` (cn function for className merging)
- **Hooks** → `@/hooks/use-mobile.ts` and `@/hooks/use-toast.ts`
- **Theme** → `@/components/theme-provider.tsx`

### Recommended Additions:
```typescript
// @/lib/api.ts
export function getBaseUrl() {
  if (typeof window !== 'undefined') return window.location.origin;
  return process.env.NEXT_PUBLIC_BASE_URL
      ?? (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');
}

// @/lib/money.ts
export const toCents = (dollars: number) => Math.round(dollars * 100);
export const fromCents = (cents: number) => (cents ?? 0) / 100;
```

## 10) Data Management

### Current Features:
- **Analytics Dashboard** → `@/components/admin/analytics-dashboard.tsx`
- **Content Feed** → `@/components/feed/main-feed.tsx`
- **Creator Profile** → `@/components/creator/creator-profile.tsx`

### Implementation Guidelines:
- **Pagination** → Limit results ≤ 100 per page
- **Search Safety** → Whitelist sort fields, sanitize inputs
- **Performance** → Use keyset pagination for large datasets
- **Caching** → Implement proper data caching strategies

## 11) Development Workflow

### Current Setup:
- **Package Manager** → pnpm (see `pnpm-lock.yaml`)
- **TypeScript** → Strict mode enabled
- **Linting** → Next.js ESLint configuration
- **Styling** → TailwindCSS with PostCSS

### Git Workflow:
- **Conventional Commits** → Use standard commit message format
- **Feature Branches** → One branch per feature/component
- **PR Requirements** → Screenshots, component changes, type updates
- **CI Checks** → ESLint, TypeScript, build verification

## 12) Feature Development Checklist

### For Each New Feature:
- [ ] **Component Structure** → Create in appropriate `@/components/[feature]/`
- [ ] **Page Route** → Add to `@/app/[feature]/`
- [ ] **UI Components** → Use only `@/components/ui/*` primitives
- [ ] **TypeScript** → Proper type definitions
- [ ] **Styling** → TailwindCSS classes, consistent with theme
- [ ] **Error Handling** → Add `error.tsx` and `loading.tsx`
- [ ] **Authentication** → Integrate with AuthProvider if needed
- [ ] **Navigation** → Update navigation components
- [ ] **Testing** → Verify all CRUD operations
- [ ] **Mobile Responsive** → Test with `use-mobile` hook

## 13) Payment Flow

### Current Payment Components:
- **Wallet Dashboard** → `@/components/payments/wallet-dashboard.tsx`
- **PPV Modal** → `@/components/payments/pay-per-view-modal.tsx`
- **Subscription Modal** → `@/components/payments/subscription-modal.tsx`

### Payment Flow Logic:
1. **Unauthenticated** → Redirect to `/auth`
2. **No Payment Method** → Show wallet setup modal
3. **Payment Success** → Refresh payment methods and unlock content
4. **Error Handling** → Clear error messages with Sonner toasts

## 14) Performance Optimization

### Current Implementation:
- **Fonts** → Geist Sans & Mono from `geist/font`
- **Analytics** → Vercel Analytics integration
- **Lazy Loading** → Suspense wrapper in root layout
- **Theme** → CSS variables for efficient theme switching

### Performance Guidelines:
- **Font Loading** → Use `next/font` (already implemented)
- **Code Splitting** → Lazy load heavy components
- **Image Optimization** → Use Next.js Image component
- **Bundle Analysis** → Monitor bundle size regularly

## 15) Admin Features

### Current Admin Components:
- **Analytics Dashboard** → `@/components/admin/analytics-dashboard.tsx`
- **Admin Routes** → `/analytics` page for admin users

### Admin Implementation:
- **Role-based Access** → Integrate with AuthProvider
- **Data Management** → Proper CRUD operations
- **Audit Trails** → Track user actions and changes
- **Security** → Admin-only routes and components

## 16) Developer Experience

### Current Utilities:
- **Utils** → `@/lib/utils.ts` with `cn()` function
- **Hooks** → `@/hooks/use-mobile.ts` and `@/hooks/use-toast.ts`
- **Components** → Comprehensive UI component library

### Recommended Helper Functions:
```typescript
// @/lib/money.ts
export const toCents = (dollars: number) => Math.round(dollars * 100);
export const fromCents = (cents: number) => (cents ?? 0) / 100;

// @/lib/optimistic.ts
export async function optimisticToggle<T>(
  initial: T,
  next: T,
  action: () => Promise<void>,
  onError: (e: unknown) => void
) {
  try { 
    await action(); 
  } catch (e) { 
    onError(e); 
  }
}
```

## 17) Critical Don'ts ❌

### Architecture:
- **DON'T** import server code into `"use client"` files
- **DON'T** use service role keys in client bundles
- **DON'T** bypass RLS policies with workarounds
- **DON'T** create custom UI components (use `@/components/ui/*`)

### Security:
- **DON'T** store money as floats (use integer cents)
- **DON'T** leak secrets in logs or browser
- **DON'T** use `dangerouslySetInnerHTML` with untrusted content
- **DON'T** use `supabase db reset` in production

### Code Quality:
- **DON'T** skip TypeScript types
- **DON'T** ignore ESLint warnings
- **DON'T** hardcode API URLs
- **DON'T** forget `@/` import aliases

## 18) ESLint Configuration

### Recommended Rules:
```javascript
// .eslintrc.js
module.exports = {
  extends: ['next/core-web-vitals'],
  rules: {
    'no-restricted-imports': ['error', {
      patterns: [
        { group: ['../'], message: 'Use @/ imports instead of relative paths' },
        { group: ['next/headers'], message: 'next/headers is server-only' }
      ]
    }]
  }
}
```

## 19) External Domains & CSP

### Current Integrations:
- **Vercel Analytics** → `@vercel/analytics/next`
- **Fonts** → Geist from `geist/font`
- **Icons** → Lucide React

### CSP Domains to Allow:
- **Supabase** → `*.supabase.co`
- **Vercel** → `*.vercel.app`, `*.vercel-analytics.com`
- **Payment Providers** → Add as needed
- **CDN/Media** → Add video/image domains as required

---

## 20) Pull Request Template

Create `.github/pull_request_template.md`:

```markdown
## Summary
<!-- What changed and why? Include screenshots or short video. -->

## Type
- [ ] Feature
- [ ] Bug Fix
- [ ] Refactor
- [ ] Documentation

## Fanzit Checklist
- [ ] **Components**: Used only `@/components/ui/*` primitives
- [ ] **Imports**: All imports use `@/` alias consistently
- [ ] **TypeScript**: Proper types, no `any` usage
- [ ] **Styling**: TailwindCSS classes, follows theme
- [ ] **Authentication**: Integrates with AuthProvider if needed
- [ ] **Mobile**: Responsive design tested
- [ ] **Performance**: No unnecessary re-renders or heavy imports
- [ ] **Error Handling**: Proper error states and loading states
- [ ] **Security**: No sensitive data exposed to client
- [ ] **Testing**: Manual testing of all user flows

## Screenshots
<!-- Before/after screenshots or video demo -->

## Breaking Changes
<!-- List any breaking changes -->
```

---

## 21) Quick Setup Commands

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Run linting
pnpm lint

# Add new shadcn/ui component
npx shadcn@latest add [component-name]
```

---

## 22) Component Creation Template

```typescript
// @/components/[feature]/[component-name].tsx
"use client"

import { Button } from "@src/components/ui/button"
import { Card } from "@src/components/ui/card"
import { cn } from "@src/lib/utils"

// ----------------------
// [Component Name] Component
// Location: @/components/[feature]/[component-name].tsx
// Purpose: [Brief description]
// ----------------------

interface ComponentNameProps {
  className?: string
  // Add other props
}

export function ComponentName({ className, ...props }: ComponentNameProps) {
  return (
    <Card className={cn("p-4", className)}>
      {/* Component content */}
    </Card>
  )
}
```

---

**Last Updated**: December 2024  
**Version**: 2.0 - Updated for current Fanzit implementation