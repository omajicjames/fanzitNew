# Complete Card Components Breakdown

## Overview
This document provides a comprehensive breakdown of every card component in the Fanzit application, detailing each element that makes up every card type.

## Card Architecture

The application uses a unified base card system with the following structure:
- **BasePostCard**: Core compound component with named slots
- **PostCard Factory**: Selects appropriate variant based on post properties
- **Card Variants**: RegularPostCard and LockedPostCard implementations
- **Shared Components**: AuthorHeader, EngagementRow, PostActions

---

## Card 1: BasePostCard (Foundation Component)

**Location**: `/src/features/post/BasePostCard.tsx`
**Purpose**: Composable base card with named slots for all post variants

### Elements:

#### 1. Root Container (`BasePostCardRoot`)
- **Element**: `<article>`
- **Classes**: `rounded-2xl border border-border/50 bg-card overflow-hidden`
- **Attributes**: `role="article"`, `aria-labelledby`
- **Context**: Provides PostCardContext with post data

#### 2. Header Slot (`Header`)
- **Element**: `<header>`
- **Classes**: `flex items-center justify-between p-4 pb-0`
- **Children**: Left content (AuthorHeader) + Right actions (3-dots menu)
- **Purpose**: Contains author info and post actions

#### 3. Media Slot (`Media`)
- **Element**: `<div>`
- **Classes**: `relative w-full aspect-video bg-muted overflow-hidden`
- **Purpose**: Container for images, videos, or other media content
- **Features**: Aspect ratio maintained, overflow hidden

#### 4. Body Slot (`Body`)
- **Element**: `<div>`
- **Classes**: `p-4 pt-2 space-y-2`
- **Purpose**: Contains title, description, and metadata
- **Spacing**: Consistent padding with vertical spacing

#### 5. Actions Slot (`Actions`)
- **Element**: `<div>`
- **Classes**: `px-4 pb-4 pt-2`
- **Purpose**: Contains engagement actions (like, comment, share)
- **Layout**: Horizontal button row

#### 6. InlinePanel Slot (`InlinePanel`)
- **Element**: `<div>`
- **Classes**: `px-4 pb-4 border-t border-border/50` (when visible)
- **Purpose**: Expandable panel for additional actions
- **State**: Conditionally rendered based on `isVisible` prop

#### 7. Title Component (`Title`)
- **Element**: `<h2>`
- **Classes**: `text-lg font-semibold text-foreground leading-tight`
- **Attributes**: `id="post-title-{post.id}"`
- **Purpose**: Post title with semantic heading

#### 8. Description Component (`Description`)
- **Element**: `<p>`
- **Classes**: `text-sm text-muted-foreground leading-relaxed`
- **Purpose**: Post subtitle or description text

---

## Card 2: RegularPostCard (Standard Posts)

**Location**: `/src/features/post/variants/RegularPostCard.tsx`
**Purpose**: Standard post card variant for regular (non-locked) content
**Composition**: Uses BasePostCard slots with specific content

### Elements:

#### 1. Container (BasePostCard.Root)
- **Classes**: `w-full max-w-md mx-auto sm:max-w-lg md:max-w-xl cursor-pointer hover:shadow-lg transition-shadow duration-200`
- **Features**: Mobile-first responsive, hover effects

#### 2. Header Section (BasePostCard.Header)
- **Left Content**: AuthorHeader component
- **Right Content**: PostActions (3-dots menu)

##### AuthorHeader Elements:
- **Avatar**: `<Avatar>` with `h-10 w-10` sizing
  - **Image**: `<AvatarImage>` with author photo
  - **Fallback**: `<AvatarFallback>` with initials
- **Author Info Container**: `<div>` with flex layout
  - **Name**: `<span>` with `font-semibold text-sm`
  - **Verification Badge**: `<Badge>` (if verified)
  - **Username**: `<span>` with `text-muted-foreground text-xs`
  - **Timestamp**: `<span>` with relative time

##### PostActions Elements:
- **Trigger Button**: `<Button>` with `<MoreHorizontal>` icon
- **Dropdown Menu**: `<DropdownMenu>` with action items

#### 3. Media Section (BasePostCard.Media)
- **Image Content**: `<img>` with responsive classes
  - **Classes**: `w-full h-full object-cover transition-transform duration-200 hover:scale-105`
  - **Attributes**: `loading="lazy"`, `alt` text
- **Video Content**: SmartVideo component
  - **Video Element**: `<SmartVideo>` with HLS support
  - **Duration Badge**: `<Badge>` with time display
  - **Classes**: `absolute bottom-2 right-2 bg-black/70 text-white text-xs px-1.5 py-0.5`

#### 4. Body Section (BasePostCard.Body)
- **Title**: BasePostCard.Title component
- **Description**: BasePostCard.Description component
- **Category Badge**: `<Badge>` (if category exists)
  - **Classes**: `mt-2 text-xs text-gray-600 border-gray-300`
  - **Variant**: `outline`

#### 5. Actions Section (BasePostCard.Actions)
- **EngagementRow Component**: Full engagement actions

##### EngagementRow Elements:
- **Container**: `<div>` with `flex items-center justify-between`
- **Like Button**: `<Button>` with `<Heart>` icon
  - **Icon**: `h-4 w-4` sizing
  - **Count**: Formatted number display
  - **State**: Active styling when liked
- **Comment Button**: `<Button>` with `<MessageCircle>` icon
- **Share Button**: `<Button>` with `<Share>` icon
- **Bookmark Button**: `<Button>` with `<Bookmark>` icon (optional)

#### 6. Inline Panel (BasePostCard.InlinePanel)
- **PostActions Component**: Extended action menu
- **Visibility**: Controlled by `showActionsPanel` state

---

## Card 3: LockedPostCard (Premium Posts)

**Location**: `/src/features/post/variants/LockedPostCard.tsx`
**Purpose**: Locked/premium post variant with paywall UI
**Composition**: Uses BasePostCard with LockedBranch for media

### Elements:

#### 1. Container (BasePostCard.Root)
- **Same base structure as RegularPostCard**
- **Additional**: Premium-specific styling

#### 2. Header Section (BasePostCard.Header)
- **AuthorHeader**: Same structure as regular cards
- **Premium Badge**: `<span>` with Crown icon
  - **Icon**: `<Crown>` with `w-3 h-3 mr-1`
  - **Classes**: `inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800`
  - **Text**: Tier name ("premium", "pro", etc.)

#### 3. Media Section (BasePostCard.Media)
- **LockedBranch Component**: Delegates to LockedPostShell

##### LockedPostShell Elements:
- **Preview Container**: `<div>` with blur effects
- **Blur Overlay**: CSS backdrop-filter with intensity levels
- **Lock Icon**: `<Lock>` centered overlay
- **Preview Image**: Blurred background image
- **Media Type Badge**: Icon indicating content type
  - **Image**: `<ImageIcon>` with blue styling
  - **Video**: `<Play>` with red styling
  - **Text**: `<FileText>` with green styling
  - **Mixed**: `<ImageIcon>` with purple styling

#### 4. Body Section (BasePostCard.Body)
- **Title**: BasePostCard.Title (same as regular)
- **Description**: BasePostCard.Description (same as regular)
- **Premium Indicator**: Additional premium content hints

#### 5. Actions Section (BasePostCard.Actions)
- **Upgrade Button**: `<Button>` with premium styling
  - **Classes**: `w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600`
  - **Text**: "Upgrade to premium $X.XX"
- **Preview Button**: `<Button>` with outline variant
  - **Classes**: `w-full border-amber-200 text-amber-700 hover:bg-amber-50`
  - **Text**: "Preview"

#### 6. Inline Panel (BasePostCard.InlinePanel)
- **Premium Info**: Additional subscription details
- **Member Count**: Display of premium subscribers
- **Join CTA**: Call-to-action for premium membership

---

## Card 4: CompactRegularPostCard (Grid Variant)

**Location**: `/src/features/post/variants/RegularPostCard.tsx` (export)
**Purpose**: Compact regular post card for grid layouts
**Composition**: RegularPostCard with size constraints

### Elements:

#### All elements same as RegularPostCard with modifications:
- **Container**: Additional `max-w-sm` class
- **Compact Mode**: Smaller text and spacing
- **Grid Layout**: Optimized for grid display

---

## Card 5: CompactLockedPostCard (Grid Variant)

**Location**: `/src/features/post/variants/LockedPostCard.tsx` (export)
**Purpose**: Compact locked post card for grid layouts
**Composition**: LockedPostCard with size constraints

### Elements:

#### All elements same as LockedPostCard with modifications:
- **Container**: Additional `max-w-sm` class
- **Compact Styling**: Reduced padding and text sizes
- **Grid Optimization**: Suitable for sidebar or grid layouts

---

## Card 6: FeaturedRegularPostCard (Highlighted Variant)

**Location**: `/src/features/post/variants/RegularPostCard.tsx` (export)
**Purpose**: Featured regular post card with enhanced styling
**Composition**: RegularPostCard with featured styling

### Elements:

#### All elements same as RegularPostCard with additions:
- **Featured Border**: `border-2 border-blue-200` class
- **Featured Badge**: `<Badge>` with "Featured" text
- **Enhanced Shadow**: `shadow-lg` for prominence
- **Gradient Background**: Subtle gradient overlay

---

## Shared Components Breakdown

### AuthorHeader Component
**Location**: `/src/components/post/AuthorHeader.tsx`

#### Elements:
1. **Container**: `<div>` with flex layout and gap spacing
2. **Avatar**: `<Avatar>` component
   - **Image**: `<AvatarImage>` with author photo
   - **Fallback**: `<AvatarFallback>` with initials
3. **Info Container**: `<div>` with author details
   - **Name Row**: Author name + verification badge
   - **Meta Row**: Username + timestamp

### EngagementRow Component
**Location**: `/src/features/post/components/EngagementRow.tsx`

#### Elements:
1. **Container**: `<div>` with flex layout
2. **Action Buttons**: Array of `<Button>` elements
   - **Like**: Heart icon + count
   - **Comment**: MessageCircle icon + count
   - **Share**: Share icon + count
   - **Bookmark**: Bookmark icon (no count)

### PostActions Component
**Location**: `/src/features/post/components/PostActions.tsx`

#### Elements:
1. **Trigger**: `<Button>` with MoreHorizontal icon
2. **Dropdown Menu**: `<DropdownMenu>` with items:
   - **Save**: Bookmark icon + "Save post"
   - **Share**: Share icon + "Share post"
   - **Copy Link**: Copy icon + "Copy link"
   - **Report**: Flag icon + "Report post"
   - **Download**: Download icon + "Download" (if available)

---

## CSS Classes Reference

### Layout Classes
- `rounded-2xl`: Card border radius
- `border border-border/50`: Card border
- `bg-card`: Card background
- `overflow-hidden`: Prevents content overflow
- `aspect-video`: 16:9 aspect ratio for media

### Spacing Classes
- `p-4`: Standard padding
- `gap-3`: Standard gap between elements
- `space-y-2`: Vertical spacing between children

### Typography Classes
- `text-lg font-semibold`: Title styling
- `text-sm text-muted-foreground`: Description styling
- `text-xs`: Small text (timestamps, metadata)

### Interactive Classes
- `hover:shadow-lg`: Hover shadow effect
- `transition-shadow duration-200`: Smooth transitions
- `cursor-pointer`: Clickable cursor

### Responsive Classes
- `w-full max-w-md mx-auto`: Mobile-first container
- `sm:max-w-lg md:max-w-xl`: Responsive breakpoints
- `min-h-[2.5rem] sm:min-h-[2rem]`: Touch-friendly sizing

---

## Mobile-First Design Principles

1. **Touch Targets**: Minimum 44px (2.5rem) for interactive elements
2. **Responsive Breakpoints**: sm:, md:, lg: classes for scaling
3. **Flexible Layouts**: Flex and grid with responsive adjustments
4. **Scalable Typography**: Text sizes that work across devices
5. **Optimized Spacing**: Consistent padding and margins

---

## Object-Oriented Architecture

1. **Inheritance**: Variants extend BasePostCard functionality
2. **Composition**: Components composed of smaller, reusable parts
3. **Encapsulation**: Clear separation of concerns between components
4. **Polymorphism**: Factory pattern for variant selection
5. **Abstraction**: Unified PostView interface for data consistency

---

## Summary

The Fanzit card system consists of:
- **6 main card variants** with specific use cases
- **3 shared components** for consistency
- **Unified base architecture** with slot-based composition
- **Mobile-first responsive design** throughout
- **Object-oriented structure** for maintainability

Each card maintains consistent structure while allowing for variant-specific customization through the BasePostCard slot system.