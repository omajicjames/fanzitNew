# Blog Page Cards Analysis

**Date:** Friday, September 19, 2025  
**Page:** http://localhost:3000/blog  
**Purpose:** Documentation of all card components and their CSS classes used on the blog page

## Overview

The blog page uses a single-card view layout with filtering and quick stats, similar to the verification page design. All cards use the `AdminCard` component with scoped CSS variables.

## Card Components Analysis

### **1. Main Blog Post Card (Left Column)**

**Component:** `AdminCard` with `BlogPostCard` content  
**Location:** Left column (lg:col-span-2)  
**Purpose:** Displays selected blog post with full details

#### **AdminCard Props:**
```typescript
<AdminCard
  title={post.title}
  description={post.excerpt}
  icon={<PenTool className="h-5 w-5 text-neutral-400" />}
  headerActions={
    <div className="flex flex-col gap-1">
      {/* Status badges */}
    </div>
  }
  className="group hover:shadow-lg transition-all duration-200"
  variant="data"
>
```

#### **CSS Classes Used:**
- **Card Container:** `AdminCard` component with `variant="data"`
- **Hover Effects:** `group hover:shadow-lg transition-all duration-200`
- **Icon:** `h-5 w-5 text-neutral-400`

#### **Content Sections:**

##### **Featured Image Section:**
```css
.aspect-video bg-surface-elev1 rounded-lg flex items-center justify-center border border-line-soft
```
- **Background:** `bg-surface-elev1` (scoped admin variable)
- **Border:** `border border-line-soft` (scoped admin variable)
- **Layout:** `aspect-video` for 16:9 ratio

##### **Author Information Section:**
```css
.flex items-center gap-3 p-3 bg-surface-elev1 rounded-lg border border-line-soft
```
- **Background:** `bg-surface-elev1`
- **Border:** `border border-line-soft`
- **Padding:** `p-3`

##### **Author Avatar:**
```css
.h-10 w-10 rounded-full bg-surface-elev2 flex items-center justify-center border border-line-soft
```
- **Background:** `bg-surface-elev2` (elevated surface)
- **Border:** `border border-line-soft`

##### **Text Colors:**
- **Author Name:** `text-sm font-medium text-text`
- **Author Bio:** `text-xs text-text-muted`
- **Date:** `text-xs text-text-muted mt-1`
- **Reading Time:** `text-sm text-text-muted`

##### **Category and Tags Section:**
```css
.flex items-center gap-2
```
- **Category Label:** `text-sm font-medium text-text-muted`
- **Category Badge:** `text-xs text-blue-500 bg-blue-900/20 border-blue-500/30`
- **Tag Badges:** `text-xs bg-surface-elev1 border-line-soft text-text-muted`

##### **Performance Metrics Grid:**
```css
.grid grid-cols-2 gap-3
```
- **Metric Cards:** `bg-surface-elev1 border border-line-soft rounded-lg p-3`
- **Metric Icons:** `h-4 w-4 text-blue-500` (views), `h-4 w-4 text-green-500` (engagement)
- **Metric Labels:** `text-sm font-medium text-text`
- **Metric Values:** `text-lg font-bold text-text`
- **Metric Descriptions:** `text-xs text-text-muted`

##### **Detailed Stats Grid:**
```css
.grid grid-cols-4 gap-2 text-sm
```
- **Stat Items:** `flex items-center gap-1 p-2 bg-surface-elev1 rounded border border-line-soft`
- **Stat Icons:** `h-3 w-3 text-red-500` (likes), `h-3 w-3 text-blue-500` (comments), etc.
- **Stat Values:** `text-text`

##### **Action Buttons:**
```css
.flex gap-2 pt-2 border-t border-line-soft
```
- **Primary Button:** `flex-1 bg-brand hover:bg-brand/90 text-white`
- **Secondary Buttons:** `flex-1 bg-surface-elev2 border-line-soft text-text hover:bg-surface-elev1`
- **Icon Button:** `bg-surface-elev2 border-line-soft text-text hover:bg-surface-elev1`

### **2. Post Selection Card (Right Column)**

**Component:** `AdminCard`  
**Location:** Right column, top  
**Purpose:** Dropdown to select which blog post to display

#### **AdminCard Props:**
```typescript
<AdminCard
  title="Browse Articles"
  description="Choose which article to read"
  className="mb-4"
>
```

#### **CSS Classes Used:**
- **Card Container:** `AdminCard` component
- **Spacing:** `mb-4`

#### **Select Component:**
```css
.bg-surface-elev1 border-line-soft text-text hover:bg-surface-elev2 focus:ring-2 focus:ring-brand/20
```
- **Background:** `bg-surface-elev1`
- **Border:** `border-line-soft`
- **Text:** `text-text`
- **Hover:** `hover:bg-surface-elev2`
- **Focus:** `focus:ring-2 focus:ring-brand/20`

#### **Select Content:**
```css
.bg-surface-elev1 border-line-soft shadow-lg z-50
```
- **Background:** `bg-surface-elev1`
- **Border:** `border-line-soft`
- **Shadow:** `shadow-lg`
- **Z-Index:** `z-50`

#### **Select Items:**
```css
.text-text hover:bg-surface-elev2 focus:bg-surface-elev2 cursor-pointer
```
- **Text:** `text-text`
- **Hover:** `hover:bg-surface-elev2`
- **Focus:** `focus:bg-surface-elev2`
- **Cursor:** `cursor-pointer`

### **3. Blog Statistics Card (Right Column)**

**Component:** `AdminCard`  
**Location:** Right column, second  
**Purpose:** Display overall blog performance metrics

#### **AdminCard Props:**
```typescript
<AdminCard
  title="Blog Statistics"
  description="Overall blog performance"
  className="mb-4"
>
```

#### **CSS Classes Used:**
- **Card Container:** `AdminCard` component
- **Spacing:** `mb-4`

#### **Statistics Items:**
```css
.flex items-center justify-between p-3 bg-surface-elev1 rounded-lg border border-line-soft
```
- **Layout:** `flex items-center justify-between`
- **Padding:** `p-3`
- **Background:** `bg-surface-elev1`
- **Border:** `border border-line-soft`
- **Border Radius:** `rounded-lg`

#### **Stat Icons:**
- **File Icon:** `h-4 w-4 text-blue-500`
- **Eye Icon:** `h-4 w-4 text-green-500`
- **Heart Icon:** `h-4 w-4 text-red-500`
- **Book Icon:** `h-4 w-4 text-purple-500`

#### **Stat Labels:**
```css
.text-sm font-medium text-text
```
- **Size:** `text-sm`
- **Weight:** `font-medium`
- **Color:** `text-text`

#### **Stat Descriptions:**
```css
.text-xs text-text-muted
```
- **Size:** `text-xs`
- **Color:** `text-text-muted`

#### **Stat Values:**
```css
.text-sm font-bold text-text
```
- **Size:** `text-sm`
- **Weight:** `font-bold`
- **Color:** `text-text`

### **4. Categories Card (Right Column)**

**Component:** `AdminCard`  
**Location:** Right column, third  
**Purpose:** Display blog categories with post counts

#### **AdminCard Props:**
```typescript
<AdminCard
  title="Categories"
  description="Browse by topic"
  className="mb-4"
>
```

#### **CSS Classes Used:**
- **Card Container:** `AdminCard` component
- **Spacing:** `mb-4`

#### **Category Items:**
```css
.flex items-center justify-between p-2 bg-surface-elev1 rounded-lg border border-line-soft hover:bg-surface-elev2 transition-colors cursor-pointer
```
- **Layout:** `flex items-center justify-between`
- **Padding:** `p-2`
- **Background:** `bg-surface-elev1`
- **Border:** `border border-line-soft`
- **Hover:** `hover:bg-surface-elev2`
- **Transitions:** `transition-colors`
- **Cursor:** `cursor-pointer`

#### **Category Color Dots:**
```css
.w-3 h-3 rounded-full
```
- **Size:** `w-3 h-3`
- **Shape:** `rounded-full`
- **Color:** Set via `style={{ backgroundColor: category.color }}`

#### **Category Names:**
```css
.text-sm font-medium text-text
```
- **Size:** `text-sm`
- **Weight:** `font-medium`
- **Color:** `text-text`

#### **Post Counts:**
```css
.text-xs text-text-muted
```
- **Size:** `text-xs`
- **Color:** `text-text-muted`

### **5. Quick Actions Card (Right Column)**

**Component:** `AdminCard`  
**Location:** Right column, bottom  
**Purpose:** Common blog management actions

#### **AdminCard Props:**
```typescript
<AdminCard
  title="Quick Actions"
  description="Common blog tasks"
>
```

#### **CSS Classes Used:**
- **Card Container:** `AdminCard` component

#### **Action Buttons:**
```css
.w-full flex items-center gap-2 p-3 text-sm font-medium text-text hover:bg-surface-elev1 rounded-lg border border-line-soft transition-colors
```
- **Width:** `w-full`
- **Layout:** `flex items-center gap-2`
- **Padding:** `p-3`
- **Text:** `text-sm font-medium text-text`
- **Hover:** `hover:bg-surface-elev1`
- **Border:** `border border-line-soft`
- **Transitions:** `transition-colors`

#### **Action Icons:**
```css
.h-4 w-4 text-brand
```
- **Size:** `h-4 w-4`
- **Color:** `text-brand` (scoped admin variable)

## CSS Variable Usage Summary

### **Scoped Admin Variables Used:**
- **Text Colors:** `text-text`, `text-text-muted`
- **Surface Colors:** `bg-surface-elev1`, `bg-surface-elev2`, `bg-admin-panel`
- **Border Colors:** `border-line-soft`
- **Brand Colors:** `text-brand`, `bg-brand`
- **Admin Specific:** `bg-admin-card` (via AdminCard component)

### **Standard Tailwind Classes:**
- **Layout:** `flex`, `grid`, `space-y-4`, `gap-3`
- **Sizing:** `h-4 w-4`, `h-5 w-5`, `text-sm`, `text-xs`
- **Spacing:** `p-2`, `p-3`, `mb-4`
- **Borders:** `rounded-lg`, `border`
- **Effects:** `hover:shadow-lg`, `transition-all`, `transition-colors`

### **Color Classes:**
- **Status Colors:** `text-blue-500`, `text-green-500`, `text-red-500`, `text-purple-500`
- **Badge Colors:** `text-yellow-500 border-yellow-500/30 bg-yellow-900/20`
- **Background Opacity:** `bg-blue-900/20`, `bg-green-900/20`

## Component Architecture

### **AdminCard Component:**
- **Base Component:** Reusable card with title, description, icon, and header actions
- **Variant:** `variant="data"` for content-heavy cards
- **Scoped Styling:** Uses scoped CSS variables automatically

### **Layout Structure:**
- **Main Container:** `admin-dashboard` class for scoped variables
- **Grid Layout:** `grid grid-cols-1 lg:grid-cols-3 gap-6`
- **Left Column:** `lg:col-span-2` for main content
- **Right Column:** `space-y-4` for stacked cards

### **Responsive Design:**
- **Mobile:** Single column layout
- **Desktop:** Three-column layout with main content and sidebar
- **Breakpoints:** Uses Tailwind's responsive prefixes

## Key Features

1. **Scoped CSS Variables:** All admin styling uses scoped variables
2. **Consistent Design:** All cards follow the same design pattern
3. **Hover Effects:** Interactive elements have hover states
4. **Color Coding:** Different colors for different types of information
5. **Responsive Layout:** Adapts to different screen sizes
6. **Accessibility:** Proper contrast and focus states

## Conclusion

The blog page uses a comprehensive set of scoped CSS variables and AdminCard components to create a consistent, professional interface that matches the admin dashboard design system. All styling is properly scoped to avoid affecting other parts of the site.

**Documentation created:** `docs/analysis/blog-page-cards-analysis-2025-09-19.md`
