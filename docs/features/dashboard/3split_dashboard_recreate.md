# Admin Dashboard Complete Recreation Guide

## Overview
Complete guide for AI to recreate the admin dashboard at `http://localhost:3000/admin` with all links, panels, and functionality.

## Main Structure

### 1. Header Section
**Location:** Top of admin page
**Components:**
- **Title:** "Admin" (text-2xl font-semibold)
- **Subtitle:** "Operate and moderate your platform." (text-sm text-text-secondary)
- **Test Button:** Links to `/admin/test` with TestTube icon
- **Badge:** "Super Admin" (gold-themed badge)

### 2. Tab Navigation
**Location:** Below header
**Tabs:** 4 main tabs with pill-style design
- **Dashboard** (BarChart3 icon) - Default active
- **Users** (Users icon)
- **Content** (FileText icon) 
- **Finance** (DollarSign icon)

**Styling:** Rounded-full border with gold accent for active state

## Dashboard Tab Content

### 3. Statistics Cards Grid
**Layout:** 4-column grid (responsive: 1 col mobile, 2 col tablet, 4 col desktop)
**Cards:**
1. **Total Users** (Users icon, zinc tone)
2. **Verified Creators** (UserCheck icon, emerald tone)
3. **Total Posts** (FileText icon, violet tone)
4. **Monthly Revenue** (DollarSign icon, amber tone)

**Card Structure:**
- Icon in rounded container (h-10 w-10)
- Label (text-xs text-text-secondary)
- Value (text-xl font-semibold)

### 4. Analytics Panels
**Layout:** 2-column grid (lg:grid-cols-2)

#### Revenue Analytics Panel
- **Title:** "Revenue Analytics" (TrendingUp icon)
- **Content:** Chart placeholder (h-64)
- **Note:** "Chart placeholder (wire to Recharts later)"

#### Quick Stats Panel
- **Title:** "Quick Stats" (AlertTriangle icon)
- **Stats:**
  - Active Users: {stats.activeSubscriptions}
  - Admin Users: {adminUsersCount}
  - Recent Posts: {recentPosts.length}
  - System Status: "Online" (emerald-300)

### 5. Recent Users Table
**Structure:**
- **Header:** "Recent Users"
- **Columns:** User, Status, Joined, Actions
- **User Column:** Avatar + Name + Username
- **Status Column:** Status badge + Admin badge + Creator badge
- **Actions:** Suspend/Activate button + Verify Creator button

### 6. Recent Posts Section
**Structure:**
- **Header:** "Recent Posts" + "Latest content posted by users"
- **Content Cards:**
  - Icon (Image/Video/FileText based on kind)
  - Post type + Visibility badge
  - Description (line-clamp-2)
  - Posted date

## Users Tab Content

### 7. User Management Header
**Components:**
- **Title:** "User Management"
- **Subtitle:** "Manage users, creators, and their permissions"
- **Export Button:** Download icon
- **Add User Button:** UserPlus icon (emerald theme)

### 8. Search and Filters
**Search Bar:**
- Placeholder: "Search users by name, email, or username..."
- Search icon (left side)

**Filter Dropdowns:**
- **Status Filter:** All Users, Active, Suspended, Pending
- **Type Filter:** All Types, Creators, Subscribers, Admins
- **More Filters Button:** Filter icon

### 9. Users Table
**Columns:**
- Checkbox
- User (Avatar + Name + Username)
- Status (with status icons and colors)
- Type (Admin/Creator badges)
- Joined (date)
- Last Seen (date)
- Actions (View, Edit, Delete, More)

**Status Types:**
- Incomplete (zinc, Clock icon)
- Submitted (blue, Upload icon)
- Pending (amber, Clock icon)
- Approved (emerald, CheckCircle icon)
- Active (emerald, CheckCircle icon)
- Disabled (zinc, XCircle icon)
- Suspended (red, XCircle icon)
- Banned (red, Ban icon)

## Content Tab Content

### 10. Content Management Header
**Components:**
- **Title:** "Content Management"
- **Subtitle:** "Moderate posts, media, and reported content"
- **Export Button:** Download icon
- **Upload Content Button:** Upload icon (violet theme)

### 11. Content Search and Filters
**Search Bar:**
- Placeholder: "Search content by title, author, or tags..."

**Filter Dropdowns:**
- **Content Type:** All Content, Posts, Images, Videos
- **Status:** All Status, Published, Draft, Reported, Hidden
- **More Filters Button:** Filter icon

### 12. Content Table
**Columns:**
- Checkbox
- Content (Icon + Title + Type)
- Author
- Category (Visibility badge)
- Engagement (Heart + Message counts)
- Status (Published/Pending Review/Draft badges)
- Date
- Actions (View, Edit, Delete, More)

## Finance Tab Content

### 13. Financial Management Header
**Components:**
- **Title:** "Financial Management"
- **Subtitle:** "Monitor transactions, revenue, and payouts"
- **Export Button:** Download icon
- **Process Payouts Button:** DollarSign icon (emerald theme)

### 14. Financial Search and Filters
**Search Bar:**
- Placeholder: "Search transactions by ID, user, or amount..."

**Filter Dropdowns:**
- **Type:** All Types, Subscriptions, Tips, PPV, Withdrawals
- **Status:** All Status, Completed, Pending, Processing, Failed
- **Date Range:** Last 7 days, Last 30 days, Last 90 days, Custom
- **More Filters Button:** Filter icon

### 15. Transactions Table
**Columns:**
- Checkbox
- Transaction (ID + Processed date)
- User
- Amount (+/- with currency formatting)
- Type (subscription, tip, ppv, withdrawal)
- Status (Completed/Pending/Processing/Failed badges)
- Date
- Actions (View, Download, More)

**Sample Transaction Data:**
- TXN-001: Sarah Johnson, $29.99, subscription, completed
- TXN-002: Mike Chen, $150.00, withdrawal, pending
- TXN-003: Alex Rivera, $5.99, tip, completed
- TXN-004: Emma Wilson, $19.99, ppv, failed
- TXN-005: David Brown, $75.50, withdrawal, processing

### 16. Financial Analytics
**Layout:** 2-column grid

#### Revenue Trends Chart
- **Title:** "Revenue Trends" (TrendingUp icon)
- **Content:** Chart placeholder (h-64)
- **Note:** "Revenue chart placeholder (integrate with Recharts)"

#### Transaction Summary
- **Title:** "Transaction Summary" (DollarSign icon)
- **Stats:**
  - Completed: 1,156 (emerald dot)
  - Pending: 45 (amber dot)
  - Processing: 12 (violet dot)
  - Failed: 8 (red dot)

## Sidebar Navigation (AdminNav)

### 17. Navigation Items
**20+ Admin Sections:**
1. Dashboard (`/admin`)
2. General Settings (`/admin/settings`)
3. Reports (`/admin/reports`)
4. Categories (`/admin/categories`)
5. Products (`/admin/products`)
6. Sales (`/admin/sales`)
7. Deposits (`/admin/deposits`)
8. Withdrawals (`/admin/withdrawals`)
9. Verification Requests (`/admin/verification`)
10. Members (`/admin/members`)
11. Posts (`/admin/posts`)
12. Blog (`/admin/blog`)
13. Comments (`/admin/comments`)
14. Replies (`/admin/replies`)
15. Moderation (`/admin/moderation`)
16. Reels (`/admin/reels`)
17. Stories (`/admin/stories`)
18. Transactions (`/admin/transactions`)
19. Shop (`/admin/shop`)
20. Shop Categories (`/admin/shop-categories`)
21. Gifts (`/admin/gifts`)
22. Audio Calls (`/admin/audio-calls`)
23. Video Calls (`/admin/video-calls`)
24. Announcements (`/admin/announcements`)

## Color Scheme and Styling

### 18. Color Variables
- **Primary Text:** `text-text-primary`
- **Secondary Text:** `text-text-secondary`
- **Background:** `bg-page`
- **Cards:** `bg-card` with `border-line`
- **Overlay:** `bg-overlay`
- **Gold Accent:** `text-gold-400`, `bg-gold-700/20`, `border-gold-600/50`

### 19. Status Colors
- **Success/Active:** emerald (green)
- **Warning/Pending:** amber (yellow)
- **Error/Failed:** red
- **Info/Processing:** violet (purple)
- **Neutral/Disabled:** zinc (gray)

### 20. Component Styling
- **Cards:** `rounded-2xl` with `shadow-card`
- **Buttons:** Various sizes (sm, md) with ghost/primary variants
- **Badges:** `rounded-full` with status-specific colors
- **Tables:** Hover effects with `hover:bg-overlay/30`
- **Inputs:** Focus states with gold accent

## Data Sources

### 21. Database Queries
- **Users:** `profiles` table
- **Posts:** `posts` table
- **Transactions:** Mock data (to be connected to real DB)
- **Statistics:** Count queries on various tables

### 22. Real-time Updates
- Statistics refresh on component mount
- User data fetched from Supabase
- Recent posts and users displayed

## Responsive Design

### 23. Breakpoints
- **Mobile:** Single column layout
- **Tablet:** 2-column grid for analytics
- **Desktop:** 4-column grid for stats, 2-column for panels

### 24. Mobile Considerations
- Collapsible sidebar navigation
- Stacked layout for smaller screens
- Touch-friendly button sizes

## Key Features

### 25. Interactive Elements
- Tab switching with state management
- Search and filter functionality
- Action buttons for user management
- Status toggles and verification
- Export capabilities

### 26. Admin Functions
- User suspension/activation
- Creator verification
- Content moderation
- Transaction processing
- System monitoring

This guide provides complete information for recreating the admin dashboard with all its components, styling, and functionality.

