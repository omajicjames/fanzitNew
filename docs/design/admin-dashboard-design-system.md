# Admin Dashboard Design System & Templates

## 🎯 Overview
This document outlines the standardized templates, components, and design patterns that all admin dashboard pages should follow for consistency and maintainability.

## 📋 Core Templates

### 1. AdminPageTemplate
**Location:** `src/components/admin/AdminPageTemplate.tsx`
**Purpose:** Main template wrapper for all admin pages

```tsx
<AdminPageTemplate
  title="Page Title"
  description="Page description"
  icon={<IconComponent className="h-6 w-6" />}
  showSearch={true}
  showFilters={true}
  showRefresh={true}
  showExport={false}
  stats={statsComponent}
>
  {/* Page content */}
</AdminPageTemplate>
```

**Features:**
- Consistent header with title, description, and icon
- Optional search bar, filters, refresh, and export buttons
- Stats section for key metrics
- Responsive layout with proper spacing

### 2. AdminCard
**Location:** `src/components/admin/AdminPageTemplate.tsx`
**Purpose:** Standardized card component for content

```tsx
<AdminCard
  title="Card Title"
  description="Card description"
  icon={<IconComponent className="h-5 w-5" />}
  variant="default" // "default" | "metric" | "chart" | "data"
  headerActions={<Button>Action</Button>}
>
  {/* Card content */}
</AdminCard>
```

**Variants:**
- `default`: Standard content card
- `metric`: Optimized for KPIs and metrics
- `chart`: For data visualizations
- `data`: For tables and lists

### 3. MetricCard
**Location:** `src/components/admin/AdminPageTemplate.tsx`
**Purpose:** Specialized card for analytics metrics

```tsx
<MetricCard
  title="Total Revenue"
  value={1250000}
  growth={15.3}
  icon={DollarSign}
  format="currency" // "number" | "currency" | "percentage"
/>
```

## 🎨 Design System

### CSS Variables (Admin Dashboard Scoped)
**Location:** `app/globals.css` (`.admin-dashboard` scope)

#### Colors
```css
/* Text Colors */
--text: 240 14% 98%;           /* Primary text (near-white) */
--text-muted: 240 6% 75%;      /* Secondary text */
--text-subtle: 240 6% 60%;     /* Subtle text */

/* Surfaces */
--surface-canvas: 220 14% 8%;  /* Main dark canvas */
--surface-elev-1: 220 12% 12%; /* Cards on canvas */
--surface-elev-2: 220 12% 16%; /* Popovers, modals */
--surface-panel: 220 20% 18%;  /* Side panels */

/* Admin-specific */
--admin-card-bg: #1c1e30;      /* Card background */
--admin-panel-bg: #1a1a1a;     /* Panel background */
--admin-border-soft: #3a3d42;  /* Soft borders */
--admin-border-strong: #4a4d52; /* Strong borders */

/* Brand & Accent */
--brand: 259 83% 65%;          /* Purple for admin interface */
--accent-gold: 45 92% 64%;     /* Gold for badges/highlights */

/* Semantic Status */
--success: 152 53% 45%;        /* Green */
--warning: 40 96% 56%;         /* Yellow */
--danger: 0 85% 62%;           /* Red */
--info: 213 94% 68%;           /* Blue */
```

#### Typography
```css
/* Font Sizes */
--admin-font-size-xs: 0.75rem;    /* 12px */
--admin-font-size-sm: 0.875rem;   /* 14px */
--admin-font-size-base: 1rem;     /* 16px */
--admin-font-size-lg: 1.125rem;   /* 18px */
--admin-font-size-xl: 1.25rem;    /* 20px */
--admin-font-size-2xl: 1.5rem;    /* 24px */

/* Font Weights */
--admin-font-weight-normal: 400;
--admin-font-weight-medium: 500;
--admin-font-weight-semibold: 600;
--admin-font-weight-bold: 700;
```

#### Spacing
```css
/* Spacing System */
--admin-space-1: 0.25rem;   /* 4px */
--admin-space-2: 0.5rem;    /* 8px */
--admin-space-3: 0.75rem;   /* 12px */
--admin-space-4: 1rem;      /* 16px */
--admin-space-6: 1.5rem;    /* 24px */
--admin-space-8: 2rem;      /* 32px */
```

## 📐 Layout Patterns

### 1. Single-Card View (Detail Pages)
**Use Case:** Pages showing detailed information about a specific item

```tsx
<AdminPageTemplate title="User Details" icon={<User className="h-6 w-6" />}>
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
    {/* Main content - 2/3 width */}
    <div className="lg:col-span-2">
      <AdminCard title="User Information" variant="data">
        {/* User details */}
      </AdminCard>
    </div>
    
    {/* Sidebar - 1/3 width */}
    <div className="space-y-6">
      <AdminCard title="Quick Actions" variant="default">
        {/* Action buttons */}
      </AdminCard>
      <AdminCard title="Statistics" variant="metric">
        {/* User stats */}
      </AdminCard>
    </div>
  </div>
</AdminPageTemplate>
```

### 2. Grid Layout (List Pages)
**Use Case:** Pages showing lists of items with filters

```tsx
<AdminPageTemplate 
  title="All Users" 
  icon={<Users className="h-6 w-6" />}
  showSearch={true}
  showFilters={true}
  stats={statsComponent}
>
  {/* Stats Grid */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
    <MetricCard title="Total Users" value={1250} growth={12.5} icon={Users} />
    <MetricCard title="Active Users" value={890} growth={8.2} icon={UserCheck} />
    <MetricCard title="New This Month" value={45} growth={15.3} icon={UserPlus} />
    <MetricCard title="Conversion Rate" value={3.2} growth={-2.1} icon={TrendingUp} />
  </div>

  {/* Content Grid */}
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <AdminCard title="Recent Users" variant="data">
      {/* User list */}
    </AdminCard>
    <AdminCard title="User Activity" variant="chart">
      {/* Activity chart */}
    </AdminCard>
  </div>
</AdminPageTemplate>
```

### 3. Tabbed Layout (Complex Pages)
**Use Case:** Pages with multiple related sections

```tsx
<AdminPageTemplate title="Analytics" icon={<BarChart3 className="h-6 w-6" />}>
  <Tabs defaultValue="overview" className="w-full">
    <TabsList className="grid w-full grid-cols-4">
      <TabsTrigger value="overview">Overview</TabsTrigger>
      <TabsTrigger value="cohorts">Cohorts</TabsTrigger>
      <TabsTrigger value="funnels">Funnels</TabsTrigger>
      <TabsTrigger value="retention">Retention</TabsTrigger>
    </TabsList>

    <TabsContent value="overview" className="mt-6">
      {/* Overview content */}
    </TabsContent>
    {/* Other tab contents */}
  </Tabs>
</AdminPageTemplate>
```

## 🧩 Reusable Components

### Selection Components
- `SelectionCard` - For dropdown selections
- `PostSelectionCard` - For post-specific selections
- `CompactFilterCard` - For filter dropdowns
- `SelectFilterSection` - For top filter sections
- `RightCompactDetail` - For right-side detail views

### Professional Cards
- `ProfessionalMemberCard` - For member listings
- `ProfessionalPostCard` - For post listings
- `ProfessionalCommentCard` - For comment listings
- `ProfessionalProductCard` - For product listings

### Detail Views
- `MembersDetailView` - Member detail information
- `PostsDetailView` - Post detail information
- `CommentsDetailView` - Comment detail information
- `ProductsDetailView` - Product detail information

## 🎯 Implementation Guidelines

### 1. Page Structure
```tsx
export default function PageName() {
  return (
    <AdminPageTemplate
      title="Page Title"
      description="Page description"
      icon={<IconComponent className="h-6 w-6" />}
      showSearch={true}
      showFilters={true}
      showRefresh={true}
      stats={statsComponent}
    >
      {/* Page content using AdminCard components */}
    </AdminPageTemplate>
  );
}
```

### 2. Card Usage
- Use `AdminCard` for all content containers
- Choose appropriate variant based on content type
- Include icons for visual hierarchy
- Use `headerActions` for card-level actions

### 3. Color Usage
- Always use CSS variables: `var(--admin-text-primary)`, `var(--admin-card-bg)`, etc.
- Use semantic colors for status: `text-green-600`, `text-red-500`, etc.
- Maintain consistent color hierarchy

### 4. Spacing
- Use CSS variables: `var(--admin-space-4)`, `var(--admin-space-6)`, etc.
- Follow grid system: `grid grid-cols-1 lg:grid-cols-2 gap-6`
- Maintain consistent padding and margins

### 5. Typography
- Use CSS variables: `var(--admin-font-size-lg)`, `var(--admin-font-weight-semibold)`
- Maintain consistent text hierarchy
- Use appropriate text colors for different contexts

## 📱 Responsive Design

### Breakpoints
- Mobile: Default (no prefix)
- Tablet: `sm:` (640px+)
- Desktop: `lg:` (1024px+)
- Large Desktop: `xl:` (1280px+)

### Grid Patterns
```tsx
{/* Mobile: 1 column, Desktop: 2 columns */}
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

{/* Mobile: 1 column, Tablet: 2 columns, Desktop: 4 columns */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

{/* Main content + sidebar */}
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
  <div className="lg:col-span-2">{/* Main content */}</div>
  <div>{/* Sidebar */}</div>
</div>
```

## ✅ Checklist for New Pages

- [ ] Use `AdminPageTemplate` as wrapper
- [ ] Include appropriate icon and description
- [ ] Use `AdminCard` for all content containers
- [ ] Apply correct CSS variables for colors and spacing
- [ ] Implement responsive grid layout
- [ ] Include stats/metrics if applicable
- [ ] Use semantic colors for status indicators
- [ ] Follow consistent typography hierarchy
- [ ] Test on mobile and desktop
- [ ] Ensure proper accessibility

## 🔗 Related Files

- `src/components/admin/AdminPageTemplate.tsx` - Main template component
- `src/components/admin/AdminCard.tsx` - Card component
- `src/components/admin/MetricCard.tsx` - Metric card component
- `app/globals.css` - CSS variables and styling
- `src/components/admin/SelectionCard.tsx` - Selection components
- `src/components/admin/Professional*.tsx` - Professional card components
