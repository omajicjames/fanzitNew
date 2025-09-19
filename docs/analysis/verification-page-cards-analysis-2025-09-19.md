# Verification Page Cards Analysis

**Date:** Friday, September 19, 2025  
**Page:** http://localhost:3000/admin/verification  
**Purpose:** Documentation of all card components and their CSS classes used on the verification page

## Overview

The verification page uses a single-card view layout with filtering and quick stats, featuring a main verification card on the left and control panels on the right. All cards use scoped CSS variables for consistent admin theming.

## Card Components Analysis

### **1. Main Verification Card (Left Column)**

**Component:** `VerificationCard` (extends `AdminCard`)  
**Location:** Left column (lg:col-span-2)  
**Purpose:** Displays selected verification request with full details

#### **VerificationCard Props:**
```typescript
<VerificationCard
  request={selectedRequest}
  onReview={() => onReview?.(selectedRequest.id)}
  onDownload={() => onDownload?.(selectedRequest.id)}
  onMore={() => onMore?.(selectedRequest.id)}
/>
```

#### **CSS Classes Used:**
- **Card Container:** `AdminCard` component with scoped admin variables
- **Base Styling:** Uses scoped CSS variables automatically

#### **Content Sections:**

##### **Header Section:**
```css
.flex items-start justify-between
```
- **Layout:** `flex items-start justify-between`
- **User Info:** Name, handle, location, date
- **Status Badges:** Dynamic status and W9 status badges

##### **User Information:**
```css
.flex items-center gap-3
```
- **Avatar:** `h-12 w-12 rounded-full bg-surface-elev2 border border-line-soft`
- **User Details:** Name, handle, location, submission date
- **Text Colors:** `text-text`, `text-text-muted`

##### **Status Badges:**
```css
.flex items-center gap-1
```
- **Status Badge:** Dynamic based on verification status
- **W9 Status Badge:** Dynamic based on W9 status
- **Colors:** Status-specific colors (blue, yellow, green, red)

##### **Document Information Section:**
```css
.bg-surface-elev2 rounded-lg p-4 border border-line-soft
```
- **Background:** `bg-surface-elev2`
- **Border:** `border border-line-soft`
- **Padding:** `p-4`
- **Border Radius:** `rounded-lg`

##### **Document Details:**
- **Document Type:** `text-sm font-medium text-text`
- **Document Number:** `text-sm text-text-muted`
- **Expiry Date:** `text-sm text-text-muted`
- **Document URL:** `text-sm text-brand hover:underline`

##### **Verification Level Section:**
```css
.flex items-center justify-between p-3 bg-surface-elev1 rounded-lg border border-line-soft
```
- **Background:** `bg-surface-elev1`
- **Border:** `border border-line-soft`
- **Layout:** `flex items-center justify-between`

##### **Risk Score Section:**
```css
.flex items-center justify-between p-3 bg-surface-elev1 rounded-lg border border-line-soft
```
- **Risk Level Badge:** Dynamic colors based on risk score
- **Risk Score Value:** `text-lg font-bold text-text`
- **Risk Level Text:** `text-sm text-text-muted`

##### **Compliance Status Section:**
```css
.flex items-center justify-between p-3 bg-surface-elev1 rounded-lg border border-line-soft
```
- **Compliance Badge:** Dynamic colors based on compliance status
- **Compliance Value:** `text-lg font-bold text-text`
- **Compliance Text:** `text-sm text-text-muted`

##### **Flags Section:**
```css
.flex flex-wrap gap-2
```
- **Flag Badges:** `px-2 py-1 rounded text-xs font-medium bg-red-900/20 text-red-400 border border-red-500/30`
- **No Flags:** `text-sm text-text-muted italic`

##### **Notes Section:**
```css
.bg-blue-900/20 border border-blue-500/30 rounded-lg p-4
```
- **Background:** `bg-blue-900/20`
- **Border:** `border border-blue-500/30`
- **Icon:** `h-5 w-5 text-blue-400`
- **Title:** `font-medium text-blue-300`
- **Content:** `text-sm text-blue-200`

##### **Supporting Documents Section:**
```css
.bg-surface-elev2 rounded-lg p-4 border border-line-soft
```
- **Background:** `bg-surface-elev2`
- **Border:** `border border-line-soft`
- **Icon:** `h-5 w-5 text-text-muted`
- **Title:** `font-medium text-text`

##### **Supporting Document Buttons:**
```css
.px-2 py-1 rounded text-xs font-medium bg-surface-elev1 border border-line-soft text-text hover:bg-surface-elev2
```
- **Background:** `bg-surface-elev1`
- **Border:** `border border-line-soft`
- **Hover:** `hover:bg-surface-elev2`

##### **Review Information Section:**
```css
.bg-surface-elev2 rounded-lg p-4 border border-line-soft
```
- **Background:** `bg-surface-elev2`
- **Border:** `border border-line-soft`
- **Icon:** `h-4 w-4 text-text-muted`
- **Title:** `font-medium text-text`
- **Content:** `text-sm text-text-muted`

##### **Action Buttons:**
```css
.flex gap-3 pt-2 border-t border-line-soft
```
- **Review Button:** `flex-1 bg-surface-elev2 border-line-soft text-text hover:bg-surface-elev1`
- **Download Button:** `flex-1 bg-surface-elev2 border-line-soft text-text hover:bg-surface-elev1`
- **More Button:** `bg-surface-elev2 border-line-soft text-text hover:bg-surface-elev1`

### **2. Quick Stats Card (Right Column)**

**Component:** `Card` with `CardHeader` and `CardContent`  
**Location:** Right column, top  
**Purpose:** Display key verification information at a glance

#### **Card Props:**
```typescript
<Card className="bg-admin-panel border-line-soft">
  <CardHeader className="pb-3">
    <CardTitle className="text-lg text-text">Quick Stats</CardTitle>
    <CardDescription className="text-text-muted">Key information at a glance</CardDescription>
  </CardHeader>
  <CardContent className="space-y-4">
```

#### **CSS Classes Used:**
- **Card Container:** `bg-admin-panel border-line-soft`
- **Header:** `pb-3`
- **Title:** `text-lg text-text`
- **Description:** `text-text-muted`
- **Content:** `space-y-4`

#### **Stat Items:**
```css
.flex items-center justify-between p-3 bg-surface-elev2 rounded-lg
```
- **Layout:** `flex items-center justify-between`
- **Padding:** `p-3`
- **Background:** `bg-surface-elev2`
- **Border Radius:** `rounded-lg`

#### **Stat Icons:**
- **Risk Score:** `h-4 w-4 text-text-muted`
- **Verification Level:** `h-4 w-4 text-text-muted`
- **Status:** `h-4 w-4 text-text-muted`
- **Supporting Docs:** `h-4 w-4 text-text-muted`
- **Location:** `h-4 w-4 text-text-muted`
- **Date:** `h-4 w-4 text-text-muted`

#### **Stat Labels:**
```css
.text-sm font-medium text-text
```
- **Size:** `text-sm`
- **Weight:** `font-medium`
- **Color:** `text-text`

#### **Stat Values:**
- **Risk Score:** Dynamic colors based on risk level
- **Verification Level:** `text-xs` badge
- **Status:** `text-xs` badge with status-specific styling
- **Supporting Docs:** `text-sm font-semibold text-text`
- **Location:** `text-sm text-text-muted`
- **Date:** `text-sm text-text-muted`

### **3. Quick Actions Card (Right Column)**

**Component:** `Card` with `CardHeader` and `CardContent`  
**Location:** Right column, bottom  
**Purpose:** Common verification management actions

#### **Card Props:**
```typescript
<Card className="bg-admin-panel border-line-soft">
  <CardHeader className="pb-3">
    <CardTitle className="text-lg text-text">Quick Actions</CardTitle>
  </CardHeader>
  <CardContent className="space-y-2">
```

#### **CSS Classes Used:**
- **Card Container:** `bg-admin-panel border-line-soft`
- **Header:** `pb-3`
- **Title:** `text-lg text-text`
- **Content:** `space-y-2`

#### **Action Buttons:**
```css
.w-full bg-surface-elev2 border-line-soft text-text hover:bg-surface-elev1
```
- **Width:** `w-full`
- **Background:** `bg-surface-elev2`
- **Border:** `border-line-soft`
- **Text:** `text-text`
- **Hover:** `hover:bg-surface-elev1`

#### **Button Icons:**
- **Review:** `h-4 w-4 mr-2`
- **Download:** `h-4 w-4 mr-2`
- **Approve:** `h-4 w-4 mr-2`
- **Reject:** `h-4 w-4 mr-2`
- **More:** `h-4 w-4 mr-2`

### **4. Request Selection Card (Right Column)**

**Component:** `Card` with `CardHeader` and `CardContent`  
**Location:** Right column, middle  
**Purpose:** Dropdown to select which verification request to display

#### **Card Props:**
```typescript
<Card className="bg-admin-panel border-line-soft">
  <CardHeader className="pb-3">
    <CardTitle className="text-lg text-text">Select Request</CardTitle>
    <CardDescription className="text-text-muted">Choose which request to review</CardDescription>
  </CardHeader>
  <CardContent>
```

#### **CSS Classes Used:**
- **Card Container:** `bg-admin-panel border-line-soft`
- **Header:** `pb-3`
- **Title:** `text-lg text-text`
- **Description:** `text-text-muted`

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
- **Spacing:** `p-2`, `p-3`, `p-4`, `mb-4`
- **Borders:** `rounded-lg`, `border`
- **Effects:** `hover:shadow-lg`, `transition-all`, `transition-colors`

### **Color Classes:**
- **Status Colors:** `text-blue-500`, `text-green-500`, `text-red-500`, `text-yellow-500`
- **Badge Colors:** `bg-red-900/20 text-red-400 border-red-500/30`
- **Background Opacity:** `bg-blue-900/20`, `bg-green-900/20`
- **Risk Level Colors:** Dynamic based on risk score (low, medium, high, critical)

## Component Architecture

### **VerificationCard Component:**
- **Base Component:** Extends `AdminCard` with verification-specific content
- **Scoped Styling:** Uses scoped CSS variables automatically
- **Dynamic Content:** Status badges, risk scores, compliance status

### **VerificationDetailView Component:**
- **Layout:** Single card view with filtering and quick stats
- **Grid Layout:** `grid grid-cols-1 lg:grid-cols-3 gap-6`
- **Left Column:** `lg:col-span-2` for main verification card
- **Right Column:** `space-y-4` for stacked control cards

### **Layout Structure:**
- **Main Container:** `admin-dashboard` class for scoped variables
- **Page Template:** Uses `AdminPageTemplate` for consistent layout
- **Responsive Design:** Adapts to different screen sizes

## Key Features

1. **Scoped CSS Variables:** All admin styling uses scoped variables
2. **Dynamic Status Badges:** Status-specific colors and icons
3. **Risk Assessment:** Color-coded risk levels and scores
4. **Compliance Tracking:** Visual compliance status indicators
5. **Document Management:** Support for multiple document types
6. **Action Buttons:** Contextual actions for each verification request
7. **Responsive Layout:** Adapts to different screen sizes
8. **Accessibility:** Proper contrast and focus states

## Status Badge System

### **Verification Status:**
- **Submitted:** Blue badge with clock icon
- **Pending:** Yellow badge with clock icon
- **Approved:** Green badge with check icon
- **Rejected:** Red badge with X icon
- **Disabled:** Gray badge with user-X icon

### **W9 Status:**
- **Not Applicable:** Gray badge
- **Pending:** Yellow badge
- **Approved:** Green badge
- **Rejected:** Red badge

### **Risk Levels:**
- **Low (0-25):** Green background
- **Medium (26-50):** Yellow background
- **High (51-75):** Orange background
- **Critical (76-100):** Red background

### **Compliance Status:**
- **Compliant:** Green badge
- **Non-Compliant:** Red badge
- **Under Review:** Yellow badge

## Conclusion

The verification page uses a comprehensive set of scoped CSS variables and specialized card components to create a professional, data-rich interface for verification management. The design emphasizes clarity, status visibility, and efficient workflow management.

**Documentation created:** `docs/analysis/verification-page-cards-analysis-2025-09-19.md`
