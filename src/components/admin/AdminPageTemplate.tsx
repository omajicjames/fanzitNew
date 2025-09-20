// ----------------------
// Admin Page Template Component
// Location: /src/components/admin/AdminPageTemplate.tsx
// Purpose: Standardized template for all admin pages
// Features: Consistent header, search, filters, and content structure
// Note: Mobile-first design with CSS variables
// ----------------------

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@src/components/ui/card";
import { Input } from "@src/components/ui/input";
import { Button } from "@src/components/ui/button";
import { Badge } from "@src/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@src/components/ui/select";
import { SelectFilterSection } from "./SelectFilterSection";
import { Search, Filter, RefreshCw, Download, Settings, TrendingUp, TrendingDown, Users, CheckCircle, DollarSign, Eye, Edit, MoreHorizontal, User, FileText, MapPin, Shield, Flag, MessageSquare, FileImage, Clock, XCircle, UserX, AlertTriangle, Calendar } from "lucide-react";
import { ReactNode } from "react";

interface AdminPageTemplateProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  showSearch?: boolean;
  showFilters?: boolean;
  showRefresh?: boolean;
  showExport?: boolean;
  showSettings?: boolean;
  onRefresh?: () => void;
  onExport?: () => void;
  onSettings?: () => void;
  filters?: ReactNode;
  stats?: ReactNode;
  children: ReactNode;
  className?: string;
}

// ----------------------
// Admin Header Component
// Purpose: Consistent header across all admin pages
// Note: Uses CSS variables for theming
// ----------------------
function AdminHeader({ 
  title, 
  description, 
  icon,
  searchPlaceholder = "Search...",
  searchValue,
  onSearchChange,
  showSearch = true,
  showFilters = true,
  showRefresh = true,
  showExport = false,
  showSettings = false,
  onRefresh,
  onExport,
  onSettings,
  filters,
  stats
}: Omit<AdminPageTemplateProps, 'children' | 'className'>) {
  return (
    <div className="admin-header">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Title Section */}
        <div className="flex items-center gap-3">
          {icon && (
            <div className="p-2 bg-[var(--admin-card-bg)] rounded-lg border border-[var(--admin-border-soft)]">
              {icon}
            </div>
          )}
          <div>
            <h1 className="text-3xl font-bold text-white">{title}</h1>
            {description && (
              <p className="text-neutral-400 mt-1">{description}</p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {showRefresh && onRefresh && (
            <Button
              variant="outline"
              size="sm"
              onClick={onRefresh}
              className="bg-neutral-800 border-neutral-700 text-white hover:bg-neutral-700"
            >
              <RefreshCw className="h-4 w-4 mr-1" />
              Refresh
            </Button>
          )}
          
          {showExport && onExport && (
            <Button
              variant="outline"
              size="sm"
              onClick={onExport}
              className="bg-neutral-800 border-neutral-700 text-white hover:bg-neutral-700"
            >
              <Download className="h-4 w-4 mr-1" />
              Export
            </Button>
          )}
          
          {showSettings && onSettings && (
            <Button
              variant="outline"
              size="sm"
              onClick={onSettings}
              className="bg-neutral-800 border-neutral-700 text-white hover:bg-neutral-700"
            >
              <Settings className="h-4 w-4 mr-1" />
              Settings
            </Button>
          )}
        </div>
      </div>

      {/* Stats Section */}
      {stats && (
        <div className="mt-4">
          {stats}
        </div>
      )}

      {/* Search and Filters */}
      {(showSearch || showFilters) && (
        <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-center">
          {showSearch && (
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
              <Input
                type="text"
                placeholder={searchPlaceholder}
                value={searchValue}
                onChange={(e) => onSearchChange?.(e.target.value)}
                className="pl-10 bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-400 focus:border-neutral-600 focus:ring-neutral-600"
              />
            </div>
          )}
          
          {showFilters && filters && (
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-neutral-400" />
              {filters}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ----------------------
// Admin Content Component
// Purpose: Standardized content wrapper
// Note: Provides consistent spacing and styling
// ----------------------
function AdminContent({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`p-6 ${className}`}>
      {children}
    </div>
  );
}

// ----------------------
// Main Admin Page Template
// Purpose: Complete template for admin pages
// Note: Combines header, content, and consistent styling
// ----------------------
export function AdminPageTemplate({
  title,
  description,
  icon,
  searchPlaceholder,
  searchValue,
  onSearchChange,
  showSearch = true,
  showFilters = true,
  showRefresh = true,
  showExport = false,
  showSettings = false,
  onRefresh,
  onExport,
  onSettings,
  filters,
  stats,
  children,
  className = ""
}: AdminPageTemplateProps) {
  return (
    <div className="admin-page bg-surface-canvas text-[var(--admin-text-primary)] min-h-screen">
      <AdminHeader
        title={title}
        description={description}
        icon={icon}
        searchPlaceholder={searchPlaceholder}
        searchValue={searchValue}
        onSearchChange={onSearchChange}
        showSearch={showSearch}
        showFilters={showFilters}
        showRefresh={showRefresh}
        showExport={showExport}
        showSettings={showSettings}
        onRefresh={onRefresh}
        onExport={onExport}
        onSettings={onSettings}
        filters={filters}
        stats={stats}
      />
      
      <AdminContent className={className}>
        {children}
      </AdminContent>
    </div>
  );
}

// ----------------------
// Admin Card Component
// Purpose: Standardized card for admin content
// Note: Uses CSS variables for consistent theming
// ----------------------
export function AdminCard({
  title,
  description,
  icon,
  children,
  className = "",
  headerActions,
  variant = "default"
}: {
  title?: string;
  description?: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
  headerActions?: ReactNode;
  variant?: "default" | "metric" | "chart" | "data";
}) {
  const getVariantStyles = () => {
    switch (variant) {
      case "metric":
        return "p-6";
      case "chart":
        return "p-0";
      case "data":
        return "p-4";
      default:
        return "p-6";
    }
  };

  return (
    <Card className={`bg-[var(--admin-card-bg)] border border-[var(--admin-border-soft)] hover:shadow-lg transition-shadow duration-200 ${className}`}>
      {(title || description) && (
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {icon && (
                <div className="p-2 bg-[var(--admin-surface)] rounded-lg border border-[var(--admin-border-soft)]">
                  {icon}
                </div>
              )}
              <div>
                {title && <CardTitle className="text-lg text-[var(--admin-text-primary)]">{title}</CardTitle>}
                {description && <CardDescription className="text-[var(--admin-text-secondary)]">{description}</CardDescription>}
              </div>
            </div>
            {headerActions && (
              <div className="flex items-center gap-2">
                {headerActions}
              </div>
            )}
          </div>
        </CardHeader>
      )}
      <CardContent className={`text-[var(--admin-text-primary)] ${getVariantStyles()}`}>
        {children}
      </CardContent>
    </Card>
  );
}

// ----------------------
// Metric Card Component
// Purpose: Specialized card for analytics metrics
// Note: Optimized for displaying key performance indicators
// ----------------------
export function MetricCard({
  title,
  value,
  growth,
  icon,
  format = 'number',
  className = ""
}: {
  title: string;
  value: number;
  growth: number;
  icon: React.ComponentType<any>;
  format?: 'number' | 'currency' | 'percentage';
  className?: string;
}) {
  const formatValue = (): string => {
    switch (format) {
      case 'currency':
        return `$${value.toLocaleString()}`;
      case 'percentage':
        return `${value}%`;
      default:
        return value.toLocaleString();
    }
  };

  const isPositive = growth > 0;
  const Icon = icon;
  
  return (
    <AdminCard variant="metric" className={className}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-[var(--admin-text-secondary)] uppercase tracking-wide">{title}</p>
          <p className="text-2xl font-bold text-[var(--admin-text-primary)]">{formatValue()}</p>
          <div className={`flex items-center gap-1 text-sm ${
            isPositive ? 'text-green-500' : 'text-red-500'
          }`}>
            {isPositive ? (
              <TrendingUp className="h-4 w-4" />
            ) : (
              <TrendingDown className="h-4 w-4" />
            )}
            +{Math.abs(growth)}% from last month
          </div>
        </div>
        <Icon className="h-8 w-8 text-[var(--admin-text-secondary)]" />
      </div>
    </AdminCard>
  );
}

// ----------------------
// User Card Component
// Purpose: Specialized card for displaying user information
// Note: Optimized for user management with avatar, stats, and actions
// ----------------------
export function UserCard({
  user,
  onView,
  onEdit,
  onMore,
  className = ""
}: {
  user: {
    id: string;
    username: string;
    email: string;
    role: 'creator' | 'subscriber' | 'admin';
    status: 'active' | 'suspended' | 'pending_verification';
    isVerified: boolean;
    subscriptionTier: 'free' | 'premium' | 'vip';
    earnings: number;
    subscribers: number;
    joinDate: string;
    lastActive: string;
    avatar: string;
  };
  onView?: () => void;
  onEdit?: () => void;
  onMore?: () => void;
  className?: string;
}) {
  const getStatusBadge = () => {
    const statusConfig = {
      active: { variant: 'default' as const, icon: 'CheckCircle', text: 'Active', color: 'text-green-500' },
      suspended: { variant: 'destructive' as const, icon: 'UserX', text: 'Suspended', color: 'text-red-500' },
      pending_verification: { variant: 'secondary' as const, icon: 'AlertTriangle', text: 'Pending', color: 'text-yellow-500' }
    };

    const config = statusConfig[user.status];
    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <span className={`h-3 w-3 ${config.color}`}>●</span>
        {config.text}
      </Badge>
    );
  };

  const getRoleBadge = () => {
    const roleConfig = {
      creator: { variant: 'default' as const, icon: 'Crown', text: 'Creator', color: 'text-purple-500' },
      subscriber: { variant: 'secondary' as const, icon: 'Users', text: 'Subscriber', color: 'text-blue-500' },
      admin: { variant: 'destructive' as const, icon: 'Shield', text: 'Admin', color: 'text-red-500' }
    };

    const config = roleConfig[user.role];
    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <span className={`h-3 w-3 ${config.color}`}>●</span>
        {config.text}
      </Badge>
    );
  };

  return (
    <AdminCard
      title={user.username}
      description={user.email}
      icon={<Users className="h-5 w-5 text-neutral-400" />}
      headerActions={
        <div className="flex gap-2">
          {getStatusBadge()}
          {getRoleBadge()}
        </div>
      }
      className={`group hover:shadow-lg transition-all duration-200 ${className}`}
      variant="data"
    >
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-neutral-700 flex items-center justify-center overflow-hidden">
            <img 
              src={user.avatar} 
              alt={user.username}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-[var(--admin-text-primary)]">{user.username}</span>
              {user.isVerified && (
                <CheckCircle className="h-4 w-4 text-green-500" />
              )}
            </div>
            <p className="text-sm text-[var(--admin-text-primary)]-muted">{user.email}</p>
          </div>
        </div>

        {user.role === 'creator' && (
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-[var(--admin-card-bg)]/50 rounded-lg">
              <div className="flex items-center justify-center gap-1 text-green-500">
                <DollarSign className="h-4 w-4" />
                <span className="font-semibold">${user.earnings.toLocaleString()}</span>
              </div>
              <p className="text-xs text-[var(--admin-text-primary)]-muted">Earnings</p>
            </div>
            <div className="text-center p-3 bg-[var(--admin-card-bg)]/50 rounded-lg">
              <div className="flex items-center justify-center gap-1 text-blue-500">
                <Users className="h-4 w-4" />
                <span className="font-semibold">{user.subscribers.toLocaleString()}</span>
              </div>
              <p className="text-xs text-[var(--admin-text-primary)]-muted">Subscribers</p>
            </div>
          </div>
        )}
        
        <div className="flex items-center justify-between text-sm text-[var(--admin-text-primary)]-muted">
          <span>Joined: {new Date(user.joinDate).toLocaleDateString()}</span>
          <span>Last active: {user.lastActive}</span>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 bg-[var(--admin-surface)] border border-[var(--admin-border-soft)] text-[var(--admin-text-primary)] hover:bg-[var(--admin-card-bg)]"
            onClick={onView}
          >
            <Eye className="h-4 w-4 mr-1" />
            View
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 bg-[var(--admin-surface)] border border-[var(--admin-border-soft)] text-[var(--admin-text-primary)] hover:bg-[var(--admin-card-bg)]"
            onClick={onEdit}
          >
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="bg-[var(--admin-surface)] border border-[var(--admin-border-soft)] text-[var(--admin-text-primary)] hover:bg-[var(--admin-card-bg)]"
            onClick={onMore}
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </AdminCard>
  );
}

// ----------------------
// Verification Card Component
// Purpose: Specialized card for verification requests
// Note: Optimized for verification management with document info, risk scores, and compliance
// ----------------------
export function VerificationCard({
  request,
  onReview,
  onDownload,
  onMore,
  className = ""
}: {
  request: {
    id: string;
    user: {
      id: string;
      username: string;
      name: string;
      bio: string;
      avatar_url: string;
      email: string;
      role: string;
      is_verified: boolean;
      created_at: string;
      updated_at: string;
      country: string;
      city: string;
      profession: string;
      status: string;
    };
    address: string;
    city: string;
    country: string;
    postalCode: string;
    documentUrl: string;
    w9Status: 'not_applicable' | 'pending' | 'approved' | 'rejected';
    status: 'submitted' | 'pending' | 'approved' | 'rejected' | 'disabled';
    submittedAt: string;
    reviewedAt?: string;
    reviewedBy?: string;
    notes?: string;
    documentType: 'passport' | 'drivers_license' | 'national_id' | 'other';
    documentNumber: string;
    expiryDate?: string;
    verificationLevel: 'basic' | 'enhanced' | 'premium';
    complianceStatus: 'compliant' | 'non_compliant' | 'under_review';
    riskScore: number;
    flags: string[];
    supportingDocuments: string[];
  };
  onReview?: () => void;
  onDownload?: () => void;
  onMore?: () => void;
  className?: string;
}) {
  const getStatusBadge = () => {
    const statusConfig = {
      submitted: { variant: "secondary" as const, icon: "Clock", text: "Submitted", color: "text-blue-500" },
      pending: { variant: "default" as const, icon: "Clock", text: "Pending", color: "text-yellow-500" },
      approved: { variant: "default" as const, icon: "CheckCircle", text: "Approved", color: "text-green-500" },
      rejected: { variant: "destructive" as const, icon: "XCircle", text: "Rejected", color: "text-red-500" },
      disabled: { variant: "outline" as const, icon: "UserX", text: "Disabled", color: "text-gray-500" }
    };

    const config = statusConfig[request.status];
    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <span className={`h-3 w-3 ${config.color}`}>●</span>
        {config.text}
      </Badge>
    );
  };

  const getW9StatusBadge = () => {
    const w9Config = {
      not_applicable: { variant: "outline" as const, text: "N/A" },
      pending: { variant: "secondary" as const, text: "W9 Pending" },
      approved: { variant: "default" as const, text: "W9 Approved" },
      rejected: { variant: "destructive" as const, text: "W9 Rejected" }
    };

    const config = w9Config[request.w9Status];
    return (
      <Badge variant={config.variant} className="text-xs">
        {config.text}
      </Badge>
    );
  };

  const getRiskLevel = () => {
    if (request.riskScore <= 25) return { level: "Low", color: "text-green-600" };
    if (request.riskScore <= 50) return { level: "Medium", color: "text-yellow-600" };
    return { level: "High", color: "text-red-600" };
  };

  const riskLevel = getRiskLevel();

  return (
    <AdminCard
      title={request.user.name}
      description={`@${request.user.username}`}
      icon={<User className="h-5 w-5 text-neutral-400" />}
      headerActions={
        <div className="flex flex-col gap-1">
          {getStatusBadge()}
          {getW9StatusBadge()}
        </div>
      }
      className={`group hover:shadow-lg transition-all duration-200 ${className}`}
      variant="data"
    >
      <div className="space-y-6">
        {/* Header Section - User Info & Key Stats */}
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div>
              <p className="text-lg font-semibold text-[var(--admin-text-primary)]">{request.user.name}</p>
              <p className="text-sm text-[var(--admin-text-primary)]-muted">{request.user.profession}</p>
              <p className="text-sm text-[var(--admin-text-primary)]-muted">{request.user.country}, {request.user.city}</p>
              <p className="text-xs text-[var(--admin-text-primary)]-subtle">Submitted: {new Date(request.submittedAt).toLocaleDateString()}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 mb-1">
              <Shield className="h-4 w-4 text-[var(--admin-text-primary)]-muted" />
              <span className="text-sm font-medium text-[var(--admin-text-primary)]">Verification Level</span>
            </div>
            <Badge variant="outline" className="text-xs">
              {request.verificationLevel.toUpperCase()}
            </Badge>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-[var(--admin-surface)] rounded-lg p-4 text-center border border-[var(--admin-border-soft)]">
            <div className="flex items-center justify-center gap-1 text-[var(--admin-text-primary)]-muted mb-1">
              <AlertTriangle className="h-4 w-4" />
              <span className="text-xs font-medium">Risk Score</span>
            </div>
            <div className={`text-lg font-bold ${riskLevel.color}`}>
              {request.riskScore}
            </div>
            <div className={`text-xs ${riskLevel.color}`}>
              {riskLevel.level}
            </div>
          </div>
          <div className="bg-[var(--admin-surface)] rounded-lg p-4 text-center border border-[var(--admin-border-soft)]">
            <div className="flex items-center justify-center gap-1 text-[var(--admin-text-primary)]-muted mb-1">
              <FileImage className="h-4 w-4" />
              <span className="text-xs font-medium">Documents</span>
            </div>
            <div className="text-lg font-bold text-[var(--admin-text-primary)]">
              {request.supportingDocuments.length}
            </div>
            <div className="text-xs text-[var(--admin-text-primary)]-subtle">
              Supporting
            </div>
          </div>
          <div className="bg-[var(--admin-surface)] rounded-lg p-4 text-center border border-[var(--admin-border-soft)]">
            <div className="flex items-center justify-center gap-1 text-[var(--admin-text-primary)]-muted mb-1">
              <Flag className="h-4 w-4" />
              <span className="text-xs font-medium">Flags</span>
            </div>
            <div className="text-lg font-bold text-[var(--admin-text-primary)]">
              {request.flags.length}
            </div>
            <div className="text-xs text-[var(--admin-text-primary)]-subtle">
              Issues
            </div>
          </div>
        </div>

        {/* Document Information */}
        <div className="bg-[var(--admin-surface)] rounded-lg p-4 border border-[var(--admin-border-soft)]">
          <div className="flex items-center gap-2 mb-3">
            <FileText className="h-5 w-5 text-[var(--admin-text-primary)]-muted" />
            <span className="font-medium text-[var(--admin-text-primary)]">Document Information</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-sm text-[var(--admin-text-primary)]-muted">Type:</span>
              <Badge variant="outline" className="ml-2 text-xs">
                {request.documentType.replace('_', ' ').toUpperCase()}
              </Badge>
            </div>
            <div>
              <span className="text-sm text-[var(--admin-text-primary)]-muted">Number:</span>
              <span className="ml-2 text-sm font-mono text-[var(--admin-text-primary)]">{request.documentNumber}</span>
            </div>
            {request.expiryDate && (
              <div className="col-span-2">
                <span className="text-sm text-[var(--admin-text-primary)]-muted">Expires:</span>
                <span className="ml-2 text-sm text-[var(--admin-text-primary)]">{new Date(request.expiryDate).toLocaleDateString()}</span>
              </div>
            )}
          </div>
        </div>

        {/* Address Information */}
        <div className="bg-[var(--admin-surface)] rounded-lg p-4 border border-[var(--admin-border-soft)]">
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="h-5 w-5 text-[var(--admin-text-primary)]-muted" />
            <span className="font-medium text-[var(--admin-text-primary)]">Address</span>
          </div>
          <p className="text-sm text-[var(--admin-text-primary)]">
            {request.address}, {request.city}, {request.country} {request.postalCode}
          </p>
        </div>

        {/* Compliance & Status */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-[var(--admin-surface)] rounded-lg p-4 border border-[var(--admin-border-soft)]">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="h-4 w-4 text-[var(--admin-text-primary)]-muted" />
              <span className="text-sm font-medium text-[var(--admin-text-primary)]">Compliance</span>
            </div>
            <Badge 
              variant={request.complianceStatus === 'compliant' ? 'default' : 'destructive'}
              className="text-xs"
            >
              {request.complianceStatus.replace('_', ' ').toUpperCase()}
            </Badge>
          </div>
          <div className="bg-[var(--admin-surface)] rounded-lg p-4 border border-[var(--admin-border-soft)]">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="h-4 w-4 text-[var(--admin-text-primary)]-muted" />
              <span className="text-sm font-medium text-[var(--admin-text-primary)]">Status</span>
            </div>
            <Badge 
              variant={request.status === 'approved' ? 'default' : 'secondary'}
              className="text-xs"
            >
              {request.status.toUpperCase()}
            </Badge>
          </div>
        </div>

        {/* Flags Section */}
        {request.flags.length > 0 && (
          <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <Flag className="h-5 w-5 text-red-400" />
              <span className="font-medium text-red-300">Flags & Issues</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {request.flags.map((flag) => (
                <Badge key={flag} variant="destructive" className="text-xs">
                  {flag.replace('_', ' ')}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Notes Section */}
        {request.notes && (
          <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <MessageSquare className="h-5 w-5 text-blue-400" />
              <span className="font-medium text-blue-300">Notes</span>
            </div>
            <p className="text-sm text-blue-200">{request.notes}</p>
          </div>
        )}

        {/* Supporting Documents */}
        {request.supportingDocuments.length > 0 && (
          <div className="bg-[var(--admin-surface)] rounded-lg p-4 border border-[var(--admin-border-soft)]">
            <div className="flex items-center gap-2 mb-3">
              <FileImage className="h-5 w-5 text-[var(--admin-text-primary)]-muted" />
              <span className="font-medium text-[var(--admin-text-primary)]">Supporting Documents</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {request.supportingDocuments.map((doc, index) => (
                <Button key={index} variant="outline" size="sm" className="text-xs">
                  <FileImage className="h-3 w-3 mr-1" />
                  Doc {index + 1}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Review Information */}
        {request.reviewedAt && (
          <div className="bg-[var(--admin-surface)] rounded-lg p-4 border border-[var(--admin-border-soft)]">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-4 w-4 text-[var(--admin-text-primary)]-muted" />
              <span className="font-medium text-[var(--admin-text-primary)]">Review Information</span>
            </div>
            <div className="text-sm text-[var(--admin-text-primary)]-muted">
              <p>Reviewed: {new Date(request.reviewedAt).toLocaleDateString()}</p>
              {request.reviewedBy && (
                <p>By: {request.reviewedBy}</p>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2 border-t border-[var(--admin-border-soft)]">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 bg-[var(--admin-surface)] border border-[var(--admin-border-soft)] text-[var(--admin-text-primary)] hover:bg-[var(--admin-card-bg)]"
            onClick={onReview}
          >
            <Eye className="h-4 w-4 mr-2" />
            Review
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 bg-[var(--admin-surface)] border border-[var(--admin-border-soft)] text-[var(--admin-text-primary)] hover:bg-[var(--admin-card-bg)]"
            onClick={onDownload}
          >
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="bg-[var(--admin-surface)] border border-[var(--admin-border-soft)] text-[var(--admin-text-primary)] hover:bg-[var(--admin-card-bg)]"
            onClick={onMore}
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </AdminCard>
  );
}

// ----------------------
// Verification Detail View Component
// Purpose: Single card view with filtering and quick stats
// Note: Optimized for detailed verification management with dark/gray theme
// ----------------------
export function VerificationDetailView({
  requests,
  selectedRequestId,
  onRequestSelect,
  onReview,
  onDownload,
  onMore,
  className = ""
}: {
  requests: Array<{
    id: string;
    user: {
      id: string;
      username: string;
      name: string;
      bio: string;
      avatar_url: string;
      email: string;
      role: string;
      is_verified: boolean;
      created_at: string;
      updated_at: string;
      country: string;
      city: string;
      profession: string;
      status: string;
    };
    address: string;
    city: string;
    country: string;
    postalCode: string;
    documentUrl: string;
    w9Status: 'not_applicable' | 'pending' | 'approved' | 'rejected';
    status: 'submitted' | 'pending' | 'approved' | 'rejected' | 'disabled';
    submittedAt: string;
    reviewedAt?: string;
    reviewedBy?: string;
    notes?: string;
    documentType: 'passport' | 'drivers_license' | 'national_id' | 'other';
    documentNumber: string;
    expiryDate?: string;
    verificationLevel: 'basic' | 'enhanced' | 'premium';
    complianceStatus: 'compliant' | 'non_compliant' | 'under_review';
    riskScore: number;
    flags: string[];
    supportingDocuments: string[];
  }>;
  selectedRequestId?: string;
  onRequestSelect?: (requestId: string) => void;
  onReview?: (requestId: string) => void;
  onDownload?: (requestId: string) => void;
  onMore?: (requestId: string) => void;
  className?: string;
}) {
  const selectedRequest = requests.find(r => r.id === selectedRequestId) || requests[0];

  const getRiskLevel = (riskScore: number) => {
    if (riskScore <= 25) return { level: "Low", color: "text-green-600", bgColor: "bg-green-100" };
    if (riskScore <= 50) return { level: "Medium", color: "text-yellow-600", bgColor: "bg-yellow-100" };
    return { level: "High", color: "text-red-600", bgColor: "bg-red-100" };
  };

  const riskLevel = getRiskLevel(selectedRequest?.riskScore || 0);

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Filter Section */}
      <SelectFilterSection
        title="Select Verification Request"
        placeholder="Choose a verification request..."
        value={selectedRequestId || requests[0]?.id}
        onValueChange={onRequestSelect || (() => {})}
        options={requests.map((request) => ({
          id: request.id,
          label: request.user.name,
          icon: <User className="h-4 w-4" />,
          status: request.status
        }))}
      />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Verification Card */}
        <div className="lg:col-span-2">
          {selectedRequest ? (
            <VerificationCard
              request={selectedRequest}
              onReview={() => onReview?.(selectedRequest.id)}
              onDownload={() => onDownload?.(selectedRequest.id)}
              onMore={() => onMore?.(selectedRequest.id)}
            />
          ) : (
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 text-center">
              <User className="h-12 w-12 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-400">No verification request selected</p>
            </div>
          )}
        </div>

        {/* Right: Quick Stats */}
        <div className="space-y-4">
          <Card className="bg-admin-panel border border-[var(--admin-border-soft)]">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-[var(--admin-text-primary)]">Quick Stats</CardTitle>
              <CardDescription className="text-[var(--admin-text-primary)]-muted">Key information at a glance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Risk Score */}
              <div className="flex items-center justify-between p-3 bg-[var(--admin-surface)] rounded-lg">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-[var(--admin-text-primary)]-muted" />
                  <span className="text-sm font-medium text-[var(--admin-text-primary)]">Risk Score</span>
                </div>
                <div className={`px-2 py-1 rounded text-xs font-semibold ${riskLevel.bgColor} ${riskLevel.color}`}>
                  {selectedRequest?.riskScore || 0} ({riskLevel.level})
                </div>
              </div>

              {/* Verification Level */}
              <div className="flex items-center justify-between p-3 bg-[var(--admin-surface)] rounded-lg">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-[var(--admin-text-primary)]-muted" />
                  <span className="text-sm font-medium text-[var(--admin-text-primary)]">Verification Level</span>
                </div>
                <Badge variant="outline" className="text-xs">
                  {selectedRequest?.verificationLevel?.toUpperCase() || 'N/A'}
                </Badge>
              </div>

              {/* Status */}
              <div className="flex items-center justify-between p-3 bg-[var(--admin-surface)] rounded-lg">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-[var(--admin-text-primary)]-muted" />
                  <span className="text-sm font-medium text-[var(--admin-text-primary)]">Status</span>
                </div>
                <Badge 
                  variant={selectedRequest?.status === 'approved' ? 'default' : 'secondary'}
                  className="text-xs"
                >
                  {selectedRequest?.status || 'N/A'}
                </Badge>
              </div>

              {/* Supporting Documents Count */}
              <div className="flex items-center justify-between p-3 bg-[var(--admin-surface)] rounded-lg">
                <div className="flex items-center gap-2">
                  <FileImage className="h-4 w-4 text-[var(--admin-text-primary)]-muted" />
                  <span className="text-sm font-medium text-[var(--admin-text-primary)]">Supporting Docs</span>
                </div>
                <span className="text-sm font-semibold text-[var(--admin-text-primary)]">
                  {selectedRequest?.supportingDocuments?.length || 0}
                </span>
              </div>

              {/* Location */}
              <div className="flex items-center justify-between p-3 bg-[var(--admin-surface)] rounded-lg">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-[var(--admin-text-primary)]-muted" />
                  <span className="text-sm font-medium text-[var(--admin-text-primary)]">Location</span>
                </div>
                <span className="text-sm text-[var(--admin-text-primary)]-muted">
                  {selectedRequest?.user?.city}, {selectedRequest?.user?.country}
                </span>
              </div>

              {/* Submitted Date */}
              <div className="flex items-center justify-between p-3 bg-[var(--admin-surface)] rounded-lg">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-[var(--admin-text-primary)]-muted" />
                  <span className="text-sm font-medium text-[var(--admin-text-primary)]">Submitted</span>
                </div>
                <span className="text-sm text-[var(--admin-text-primary)]-muted">
                  {selectedRequest?.submittedAt ? new Date(selectedRequest.submittedAt).toLocaleDateString() : 'N/A'}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Additional Actions */}
          <Card className="bg-admin-panel border border-[var(--admin-border-soft)]">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-[var(--admin-text-primary)]">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button 
                variant="outline" 
                className="w-full bg-[var(--admin-surface)] border border-[var(--admin-border-soft)] text-[var(--admin-text-primary)] hover:bg-[var(--admin-card-bg)]"
                onClick={() => onReview?.(selectedRequest?.id || '')}
              >
                <Eye className="h-4 w-4 mr-2" />
                Review Request
              </Button>
              <Button 
                variant="outline" 
                className="w-full bg-[var(--admin-surface)] border border-[var(--admin-border-soft)] text-[var(--admin-text-primary)] hover:bg-[var(--admin-card-bg)]"
                onClick={() => onDownload?.(selectedRequest?.id || '')}
              >
                <Download className="h-4 w-4 mr-2" />
                Download Documents
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}