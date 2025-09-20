# Admin Dashboard Quick Reference

## 🚀 Quick Start Templates

### 1. Basic Page Template
```tsx
"use client";

import { AdminPageTemplate, AdminCard, MetricCard } from "@src/components/admin/AdminPageTemplate";
import { Users, DollarSign, TrendingUp } from "lucide-react";

export default function PageName() {
  const stats = (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <MetricCard title="Total Users" value={1250} growth={12.5} icon={Users} />
      <MetricCard title="Revenue" value={125000} growth={8.2} icon={DollarSign} />
      <MetricCard title="Growth" value={15.3} growth={5.1} icon={TrendingUp} />
    </div>
  );

  return (
    <AdminPageTemplate
      title="Page Title"
      description="Page description"
      icon={<Users className="h-6 w-6" />}
      showSearch={true}
      showFilters={true}
      stats={stats}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AdminCard title="Content Card" icon={<Users className="h-5 w-5" />}>
          {/* Content */}
        </AdminCard>
      </div>
    </AdminPageTemplate>
  );
}
```

### 2. Detail Page Template
```tsx
<AdminPageTemplate title="User Details" icon={<User className="h-6 w-6" />}>
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
    {/* Main content - 2/3 width */}
    <div className="lg:col-span-2">
      <AdminCard title="User Information" variant="data">
        {/* Main content */}
      </AdminCard>
    </div>
    
    {/* Sidebar - 1/3 width */}
    <div className="space-y-6">
      <AdminCard title="Quick Actions" variant="default">
        {/* Actions */}
      </AdminCard>
    </div>
  </div>
</AdminPageTemplate>
```

### 3. Tabbed Page Template
```tsx
<AdminPageTemplate title="Analytics" icon={<BarChart3 className="h-6 w-6" />}>
  <Tabs defaultValue="overview" className="w-full">
    <TabsList className="grid w-full grid-cols-4">
      <TabsTrigger value="overview">Overview</TabsTrigger>
      <TabsTrigger value="details">Details</TabsTrigger>
    </TabsList>
    
    <TabsContent value="overview" className="mt-6">
      {/* Overview content */}
    </TabsContent>
  </Tabs>
</AdminPageTemplate>
```

## 🎨 CSS Variables Quick Reference

### Text Colors
```css
color: hsl(var(--text));                    /* Primary text */
color: hsl(var(--text-muted));              /* Secondary text */
color: hsl(var(--text-subtle));             /* Subtle text */
```

### Backgrounds
```css
background-color: hsl(var(--surface-canvas));  /* Main background */
background-color: hsl(var(--surface-elev-1));  /* Card background */
background-color: hsl(var(--surface-panel));   /* Panel background */
```

### Admin-Specific
```css
background-color: var(--admin-card-bg);        /* Card background */
border: 1px solid var(--admin-border-soft);    /* Soft border */
color: var(--admin-text-primary);              /* Primary text */
```

### Semantic Colors
```css
text-green-600    /* Success */
text-red-500      /* Error */
text-yellow-500   /* Warning */
text-blue-500     /* Info */
```

## 📐 Common Grid Patterns

### Stats Grid
```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
  {/* 4 metric cards */}
</div>
```

### Content Grid
```tsx
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
  {/* 2 content cards */}
</div>
```

### Main + Sidebar
```tsx
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
  <div className="lg:col-span-2">
    {/* Main content */}
  </div>
  <div>
    {/* Sidebar */}
  </div>
</div>
```

## 🧩 Common Components

### Metric Card
```tsx
<MetricCard
  title="Total Revenue"
  value={1250000}
  growth={15.3}
  icon={DollarSign}
  format="currency"
/>
```

### Admin Card
```tsx
<AdminCard
  title="Card Title"
  description="Card description"
  icon={<Icon className="h-5 w-5" />}
  variant="default" // "default" | "metric" | "chart" | "data"
>
  {/* Content */}
</AdminCard>
```

### Selection Card
```tsx
<SelectionCard
  title="Select Option"
  placeholder="Choose an option..."
  value={selectedValue}
  onValueChange={setSelectedValue}
  options={options}
/>
```

## 📱 Responsive Classes

### Grid Responsive
- `grid-cols-1` - Mobile: 1 column
- `sm:grid-cols-2` - Tablet: 2 columns
- `lg:grid-cols-3` - Desktop: 3 columns
- `xl:grid-cols-4` - Large: 4 columns

### Spacing Responsive
- `gap-4` - Mobile spacing
- `lg:gap-6` - Desktop spacing
- `p-4` - Mobile padding
- `lg:p-6` - Desktop padding

## 🎯 Icon Usage

### Common Icons
```tsx
import { 
  Users, User, UserCheck, UserPlus, UserX,
  DollarSign, CreditCard, TrendingUp, TrendingDown,
  BarChart3, PieChart, Activity, Eye, Heart,
  MessageSquare, FileText, Image, Video, Music,
  Settings, Filter, Search, RefreshCw, Download,
  Edit, Trash2, MoreHorizontal, ChevronDown,
  CheckCircle, XCircle, AlertTriangle, Info
} from "lucide-react";
```

### Icon Sizes
- `h-4 w-4` - Small icons (buttons, badges)
- `h-5 w-5` - Medium icons (card headers)
- `h-6 w-6` - Large icons (page headers)
- `h-8 w-8` - Extra large icons (metric cards)

## ✅ Page Checklist

- [ ] Use `AdminPageTemplate` wrapper
- [ ] Include page icon and description
- [ ] Use `AdminCard` for content containers
- [ ] Apply CSS variables for colors
- [ ] Use responsive grid classes
- [ ] Include stats if applicable
- [ ] Test mobile and desktop
- [ ] Use semantic colors for status
- [ ] Follow consistent spacing
