# Admin Reusable Components Reference

**Date:** September 19, 2025  
**Purpose:** Comprehensive reference for all reusable admin components  
**Location:** `/docs/components/admin-reusable-components-reference-2025-09-19.md`

---

## 1. AdminPageTemplate

**What it is:** Main template component for all admin pages  
**Purpose:** Provides consistent layout, header, search, filters, and content structure across all admin pages

### Component Features:
- **Title:** Dynamic page title with optional icon
- **Description:** Page description and context
- **Search:** Integrated search functionality with placeholder text
- **Filters:** Customizable filter section for page-specific filtering
- **Stats:** Metric cards display area
- **Actions:** Refresh, export, and settings buttons
- **Content:** Main content area for page-specific components

### Key Features:
- **Consistent Layout:** Standardized header and content structure
- **CSS Variables:** Uses admin design system variables
- **Mobile-First:** Responsive design for all screen sizes
- **Flexible Content:** Supports any child components
- **Action Integration:** Built-in refresh, export, and settings functionality

### Used On Pages:
- **Main Dashboard:** [http://localhost:3000/admin](http://localhost:3000/admin)
- **Sales Management:** [http://localhost:3000/admin/sales](http://localhost:3000/admin/sales)
- **Events Management:** [http://localhost:3000/admin/events](http://localhost:3000/admin/events)
- **Users Management:** [http://localhost:3000/admin/users](http://localhost:3000/admin/users)
- **Products Management:** [http://localhost:3000/admin/products](http://localhost:3000/admin/products)
- **Members Management:** [http://localhost:3000/admin/members](http://localhost:3000/admin/members)
- **Reels Management:** [http://localhost:3000/admin/reels](http://localhost:3000/admin/reels)
- **Content Management:** [http://localhost:3000/admin/content](http://localhost:3000/admin/content)
- **Finance Management:** [http://localhost:3000/admin/finance](http://localhost:3000/admin/finance)

---

## 2. AdminCard

**What it is:** Standardized card component for admin content  
**Purpose:** Provides consistent card styling and structure across all admin pages

### Component Features:
- **Title:** Optional card title with icon support
- **Description:** Optional card description
- **Icon:** Optional header icon with background styling
- **Header Actions:** Customizable action buttons in header
- **Variants:** Different styles for metric, chart, data, and default content
- **Content:** Flexible content area

### Key Features:
- **Consistent Styling:** Uses admin CSS variables for theming
- **Hover Effects:** Smooth shadow transitions on hover
- **Flexible Layout:** Supports different content types
- **Icon Integration:** Built-in icon support with background styling
- **Action Support:** Header action buttons for additional functionality

### Used On Pages:
- **All Admin Pages:** Used as base card component across all admin interfaces
- **Dashboard Cards:** [http://localhost:3000/admin](http://localhost:3000/admin)
- **Content Cards:** [http://localhost:3000/admin/content](http://localhost:3000/admin/content)
- **Product Cards:** [http://localhost:3000/admin/products](http://localhost:3000/admin/products)

---

## 3. MetricCard

**What it is:** Specialized card for displaying analytics metrics  
**Purpose:** Optimized for displaying key performance indicators with growth indicators

### Component Features:
- **Title:** Metric name (e.g., "Total Revenue", "Active Users")
- **Value:** Current metric value with formatting
- **Growth:** Growth percentage with trend indicator
- **Icon:** Metric-specific icon
- **Format:** Number, currency, or percentage formatting

### Key Features:
- **Growth Indicators:** Visual trend arrows and percentage display
- **Format Support:** Automatic formatting for different data types
- **Icon Integration:** Metric-specific icons for visual context
- **Consistent Styling:** Matches admin design system
- **Responsive Design:** Adapts to different screen sizes

### Used On Pages:
- **Dashboard Stats:** [http://localhost:3000/admin](http://localhost:3000/admin)
- **Sales Metrics:** [http://localhost:3000/admin/sales](http://localhost:3000/admin/sales)
- **User Analytics:** [http://localhost:3000/admin/users](http://localhost:3000/admin/users)
- **Product Stats:** [http://localhost:3000/admin/products](http://localhost:3000/admin/products)
- **Member Stats:** [http://localhost:3000/admin/members](http://localhost:3000/admin/members)

---

## 4. SelectionCard

**What it is:** Reusable dropdown selection card with modern styling  
**Purpose:** Provides consistent selection interfaces across admin pages

### Component Features:
- **Title:** Selection card title
- **Description:** Optional description text
- **Placeholder:** Dropdown placeholder text
- **Options:** Array of selectable options with icons and descriptions
- **Value:** Currently selected value
- **onValueChange:** Selection change handler

### Key Features:
- **Transparent Dropdown:** Uses backdrop-blur-sm for modern glass effect
- **Rich Options:** Each option shows icon, label, and description
- **Consistent Styling:** Matches admin design system
- **Enhanced UX:** Better visual hierarchy and informative display
- **Modern Design:** Clean, professional appearance with hover effects

### Selection Options:
Each option displays:
- **Icon:** Visual indicator for the option
- **Label:** Primary option text
- **Description:** Additional context or details

### Used On Pages:
- **Member Selection:** [http://localhost:3000/admin/members](http://localhost:3000/admin/members)
- **Post Selection:** [http://localhost:3000/admin/posts](http://localhost:3000/admin/posts)
- **Content Selection:** [http://localhost:3000/admin/content](http://localhost:3000/admin/content)
- **Transaction Selection:** [http://localhost:3000/admin/finance](http://localhost:3000/admin/finance)

---

## 5. MetricSelectionCard

**What it is:** Pre-configured selection card for dashboard metrics  
**Purpose:** Specialized selection for choosing which metrics to display

### Component Features:
- **Title:** "Metric Selection"
- **Description:** "Choose which metrics to display"
- **Options:** Platform Overview, Revenue Analytics, User Analytics, Content Analytics, System Status
- **Transparent Styling:** Modern glass effect with backdrop blur

### Key Features:
- **Pre-configured Options:** Ready-to-use metric selection options
- **Rich Descriptions:** Each option includes helpful descriptions
- **Consistent Styling:** Matches other selection components
- **Dashboard Integration:** Specifically designed for dashboard use

### Used On Pages:
- **Main Dashboard:** [http://localhost:3000/admin](http://localhost:3000/admin)
- **Dashboard Detail View:** Used within AdminDashboardDetailView component

---

## 6. PostSelectionCard

**What it is:** Pre-configured selection card for post management  
**Purpose:** Specialized selection for choosing posts to review and manage

### Component Features:
- **Title:** "Select Post"
- **Description:** "Choose a post to review and manage"
- **Options:** Dynamic list of posts with titles and categories
- **Transparent Styling:** Modern glass effect with backdrop blur

### Key Features:
- **Dynamic Options:** Populated with actual post data
- **Post Information:** Shows post title and category
- **Management Focus:** Designed for post moderation workflows
- **Consistent Styling:** Matches admin design system

### Used On Pages:
- **Posts Management:** [http://localhost:3000/admin/posts](http://localhost:3000/admin/posts) (Note: Currently uses CompactFilterCard)
- **Content Management:** [http://localhost:3000/admin/content](http://localhost:3000/admin/content)

---

## 7. TransactionSelectionCard

**What it is:** Pre-configured selection card for financial transactions  
**Purpose:** Specialized selection for choosing transactions to review

### Component Features:
- **Title:** "Select Transaction"
- **Description:** "Choose a transaction to review"
- **Options:** Dynamic list of transactions with amounts and status
- **Transparent Styling:** Modern glass effect with backdrop blur

### Key Features:
- **Financial Focus:** Designed for transaction management
- **Status Indicators:** Shows transaction status and amounts
- **Rich Information:** Each option includes transaction details
- **Consistent Styling:** Matches admin design system

### Used On Pages:
- **Finance Management:** [http://localhost:3000/admin/finance](http://localhost:3000/admin/finance)
- **Sales Management:** [http://localhost:3000/admin/sales](http://localhost:3000/admin/sales)

---

## 8. CompactFilterCard

**What it is:** Compact filter section for consistent filtering  
**Purpose:** Provides a standardized, compact filter interface

### Component Features:
- **Title:** Filter section title
- **Description:** Optional filter description
- **Options:** Filter options with labels and descriptions
- **Compact Design:** Space-efficient layout
- **Transparent Styling:** Modern glass effect

### Key Features:
- **Space Efficient:** Compact design for sidebar or header use
- **Consistent Styling:** Matches other filter components
- **Flexible Options:** Supports various filter types
- **Modern Design:** Clean, professional appearance

### Used On Pages:
- **Posts Management:** [http://localhost:3000/admin/posts](http://localhost:3000/admin/posts) (Primary usage - "Select Post" dropdown)
- **Comments Management:** [http://localhost:3000/admin/comments](http://localhost:3000/admin/comments)
- **Replies Management:** [http://localhost:3000/admin/replies](http://localhost:3000/admin/replies)

---

## 9. ProfessionalPostCard

**What it is:** Unified post card for all post types  
**Purpose:** Displays post information in a structured, professional layout

### Component Features:
- **Title:** Post title with type icon
- **Content:** Post content preview
- **Author:** Author information with avatar
- **Status:** Post status with appropriate badges
- **Media Preview:** Image, video, or text content preview
- **Metrics:** Views, likes, comments, shares, earnings
- **Actions:** View, edit, delete, approve, flag buttons

### Key Features:
- **Unified Design:** Handles all post types (text, image, video, audio, gallery)
- **Media Preview:** Smart preview based on post type
- **Status Indicators:** Visual status badges and flags
- **Engagement Metrics:** Comprehensive post performance data
- **Action Integration:** Built-in action buttons for post management
- **Modern Placeholders:** Icon-based placeholders for missing media

### Used On Pages:
- **Posts Management:** [http://localhost:3000/admin/posts](http://localhost:3000/admin/posts)
- **Content Management:** [http://localhost:3000/admin/content](http://localhost:3000/admin/content)
- **Reels Management:** [http://localhost:3000/admin/reels](http://localhost:3000/admin/reels)

---

## 10. VerificationCard

**What it is:** Specialized card for verification requests  
**Purpose:** Displays verification request information in a structured layout

### Component Features:
- **User Info:** Name, username, profession, location
- **Document Details:** Document type, number, expiry date
- **Status:** Verification status and W9 status badges
- **Risk Assessment:** Risk score and compliance status
- **Timeline:** Submission and review dates
- **Actions:** Review, download, more options

### Key Features:
- **Comprehensive Info:** All verification details in one card
- **Status Tracking:** Multiple status indicators
- **Risk Assessment:** Visual risk scoring
- **Document Management:** Document download and review
- **Professional Layout:** Clean, organized information display

### Used On Pages:
- **Verification Management:** [http://localhost:3000/admin/verification](http://localhost:3000/admin/verification)
- **User Verification:** Used within verification detail views

---

## 11. BlogPostCard

**What it is:** Specialized card for blog post management  
**Purpose:** Displays blog post information with reading metrics

### Component Features:
- **Title:** Blog post title
- **Content:** Post content preview
- **Author:** Author information
- **Category:** Post category and tags
- **Reading Time:** Estimated reading time
- **Metrics:** Views, likes, comments, shares
- **Status:** Publication status

### Key Features:
- **Reading Metrics:** Reading time and engagement data
- **Category System:** Post categorization and tagging
- **Content Preview:** Rich content preview
- **Author Integration:** Author information display
- **Status Management:** Publication status tracking

### Used On Pages:
- **Blog Management:** [http://localhost:3000/blog](http://localhost:3000/blog)
- **Admin Blog:** [http://localhost:3000/admin/blog](http://localhost:3000/admin/blog)

---

## 12. AdminDashboardCard

**What it is:** Comprehensive dashboard card with all metrics  
**Purpose:** Single card displaying complete dashboard information

### Component Features:
- **Revenue Metrics:** Total and monthly revenue
- **User Metrics:** Active users, new users, verified creators
- **Content Metrics:** Total posts, content views, engagement rate
- **System Metrics:** System health, response time, content moderation
- **Visual Indicators:** Charts and trend indicators

### Key Features:
- **Comprehensive Data:** All dashboard metrics in one card
- **Visual Indicators:** Charts and trend displays
- **Real-time Data:** Current system and user metrics
- **Performance Tracking:** System health and response times
- **Engagement Metrics:** Content and user engagement data

### Used On Pages:
- **Main Dashboard:** [http://localhost:3000/admin](http://localhost:3000/admin)
- **Dashboard Detail View:** Used within AdminDashboardDetailView component

---

## 13. AdminDashboardDetailView

**What it is:** Single-card view with filtering for admin dashboard  
**Purpose:** Manages dashboard display with metric selection

### Component Features:
- **Metric Selection:** Choose which metrics to display
- **Dashboard Card:** Main dashboard metrics display
- **Quick Stats:** Key performance indicators
- **Quick Actions:** Common dashboard actions

### Key Features:
- **Metric Filtering:** Select specific metrics to display
- **Single Card Layout:** Focused dashboard view
- **Quick Access:** Fast access to key metrics
- **Action Integration:** Built-in dashboard actions

### Used On Pages:
- **Main Dashboard:** [http://localhost:3000/admin](http://localhost:3000/admin)
- **Dashboard Management:** Used within AdminPageTemplate

---

## 14. PostsDetailView

**What it is:** Single-card view with filtering for posts management  
**Purpose:** Manages post display with selection and stats

### Component Features:
- **Post Selection:** Choose which post to display
- **Post Card:** Main post information display
- **Quick Stats:** Post performance metrics
- **Quick Actions:** Post management actions

### Key Features:
- **Post Filtering:** Select specific posts to review
- **Single Card Layout:** Focused post view
- **Performance Metrics:** Post engagement data
- **Management Actions:** Post moderation tools

### Used On Pages:
- **Posts Management:** [http://localhost:3000/admin/posts](http://localhost:3000/admin/posts)
- **Content Management:** [http://localhost:3000/admin/content](http://localhost:3000/admin/content)

---

## 15. BlogDetailView

**What it is:** Single-card view with filtering for blog management  
**Purpose:** Manages blog post display with selection and stats

### Component Features:
- **Blog Selection:** Choose which blog post to display
- **Blog Card:** Main blog post information display
- **Quick Stats:** Blog performance metrics
- **Quick Actions:** Blog management actions

### Key Features:
- **Blog Filtering:** Select specific blog posts to review
- **Single Card Layout:** Focused blog view
- **Reading Metrics:** Blog engagement data
- **Content Management:** Blog post management tools

### Used On Pages:
- **Blog Management:** [http://localhost:3000/blog](http://localhost:3000/blog)
- **Admin Blog:** [http://localhost:3000/admin/blog](http://localhost:3000/admin/blog)

---

## 16. AdminSidebar

**What it is:** Main navigation sidebar for admin interface  
**Purpose:** Provides organized navigation to all admin sections

### Component Features:
- **Navigation Groups:** Organized sections (Overview, Content, Commerce, etc.)
- **Section Titles:** Clear section headers
- **Navigation Items:** Individual page links with icons
- **Active States:** Current page highlighting
- **Responsive Design:** Mobile-friendly navigation

### Key Features:
- **Organized Structure:** Logical grouping of admin functions
- **Visual Hierarchy:** Clear section separation
- **Icon Integration:** Visual navigation indicators
- **Active States:** Current page indication
- **Responsive Design:** Works on all screen sizes

### Used On Pages:
- **All Admin Pages:** Present on every admin page via layout
- **Main Dashboard:** [http://localhost:3000/admin](http://localhost:3000/admin)
- **All Management Pages:** [http://localhost:3000/admin/*](http://localhost:3000/admin/*)

---

## 17. SystemPills

**What it is:** System status indicator pills  
**Purpose:** Displays system health and status information

### Component Features:
- **Status Indicators:** System health status
- **Color Coding:** Visual status representation
- **Real-time Updates:** Current system status
- **Compact Design:** Space-efficient display

### Key Features:
- **Status Monitoring:** Real-time system status
- **Visual Indicators:** Color-coded status display
- **Compact Layout:** Efficient space usage
- **System Integration:** Connected to system monitoring

### Used On Pages:
- **System Status Pages:** Used in system monitoring interfaces
- **Admin Dashboard:** [http://localhost:3000/admin](http://localhost:3000/admin)

---

## 18. AdminMainPills

**What it is:** Main navigation pills for admin sections  
**Purpose:** Provides quick access to main admin areas

### Component Features:
- **Main Sections:** Primary admin areas
- **Icon Integration:** Section-specific icons
- **Active States:** Current section highlighting
- **Responsive Design:** Mobile-friendly layout

### Key Features:
- **Quick Navigation:** Fast access to main areas
- **Visual Indicators:** Icon-based navigation
- **Active States:** Current section indication
- **Responsive Design:** Works on all devices

### Used On Pages:
- **Admin Navigation:** Used in admin navigation interfaces
- **Main Dashboard:** [http://localhost:3000/admin](http://localhost:3000/admin)
- **Admin Sections:** Various admin section pages

---

## CSS Variables Used

All components use the following admin CSS variables for consistent theming:

- `--admin-card-bg`: Card background color
- `--admin-panel-bg`: Panel background color
- `--admin-surface`: Surface background color
- `--admin-border-soft`: Soft border color
- `--admin-text-primary`: Primary text color
- `--admin-text-secondary`: Secondary text color
- `--admin-text-muted`: Muted text color
- `--brand`: Brand color for accents
- `--surface-elev1`: Elevated surface color
- `--surface-elev2`: Higher elevated surface color

---

## Usage Patterns

### Standard Admin Page Structure:
1. **AdminPageTemplate** - Main page wrapper
2. **AdminCard** or **Professional*Card** - Content display
3. **SelectionCard** or **CompactFilterCard** - Filtering
4. **MetricCard** - Statistics display
5. **AdminSidebar** - Navigation

### Component Hierarchy:
- **Templates** → **Cards** → **Detail Views** → **Selection Components**
- **Consistent Styling** → **CSS Variables** → **Responsive Design**
- **Modern Design** → **Transparent Effects** → **Hover States**

---

**Last Updated:** September 19, 2025  
**Maintained By:** Admin Development Team  
**Version:** 1.0.0
