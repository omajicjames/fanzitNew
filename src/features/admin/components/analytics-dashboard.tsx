"use client"

import { useState, useEffect } from "react";
import { AdminPageTemplate, MetricCard } from "@src/components/admin/AdminPageTemplate";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@src/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@src/components/ui/tabs"
import { Badge } from "@src/components/ui/badge"
import { Button } from "@src/components/ui/button"
import { Input } from "@src/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@src/components/ui/select"
import { Progress } from "@src/components/ui/progress"
import { ScrollArea } from "@src/components/ui/scroll-area"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import {
  TrendingUp,
  Users,
  DollarSign,
  Eye,
  Heart,
  MessageCircle,
  Download,
  Calendar,
  Target,
  Crown,
  Play,
  BarChart3,
  MoreHorizontal,
  CheckCircle,
  Clock,
  AlertTriangle,
  TrendingDown
} from "lucide-react"
import Image from "next/image"

// ----------------------
// Analytics Management Page
// Location: /src/features/admin/components/analytics-dashboard.tsx
// Purpose: Comprehensive analytics management for OnlyFans-like platform
// Features: User analytics, engagement tracking, revenue analytics, retention analysis
// Note: Mobile-first design with object-oriented structure
// ----------------------

interface AnalyticsData {
  id: string;
  type: 'user' | 'engagement' | 'revenue' | 'retention' | 'cohort';
  metric: string;
  value: number;
  period: string;
  description: string;
  status: 'active' | 'inactive' | 'pending' | 'completed';
  date: string;
  category: string;
  growth: number;
  target: number;
  unit: string;
}

interface RevenueAnalyticsData {
  period: string;
  totalRevenue: number;
  subscriptions: number;
  payPerView: number;
  tips: number;
  growth: number;
  activeUsers: number;
  engagementRate: number;
}

class AnalyticsManagementService {
  private analyticsData: AnalyticsData[] = [
    {
      id: '1',
      type: 'user',
      metric: 'Daily Active Users',
      value: 12847,
      period: '2025-01-25',
      description: 'Users who logged in today',
      status: 'active',
      date: '2025-01-25',
      category: 'engagement',
      growth: 8.2,
      target: 15000,
      unit: 'users'
    },
    {
      id: '2',
      type: 'revenue',
      metric: 'Total Revenue',
      value: 2847392,
      period: '2025-01',
      description: 'Platform revenue this month',
      status: 'active',
      date: '2025-01-25',
      category: 'financial',
      growth: 15.2,
      target: 3000000,
      unit: 'USD'
    },
    {
      id: '3',
      type: 'engagement',
      metric: 'Engagement Rate',
      value: 8.7,
      period: '2025-01-25',
      description: 'User engagement percentage',
      status: 'active',
      date: '2025-01-25',
      category: 'interaction',
      growth: 2.1,
      target: 10.0,
      unit: '%'
    }
  ];

  private revenueData: RevenueAnalyticsData[] = [
    {
      period: '2025-01',
      totalRevenue: 2847392,
      subscriptions: 1847392,
      payPerView: 678234,
      tips: 321766,
      growth: 15.2,
      activeUsers: 12847,
      engagementRate: 8.7
    },
    {
      period: '2024-12',
      totalRevenue: 2471234,
      subscriptions: 1600000,
      payPerView: 600000,
      tips: 271234,
      growth: 8.7,
      activeUsers: 11847,
      engagementRate: 7.8
    }
  ];

  public getAllAnalytics(): AnalyticsData[] {
    return this.analyticsData;
  }

  public getAnalyticsByType(type: string): AnalyticsData[] {
    return this.analyticsData.filter(a => a.type === type);
  }

  public getAnalyticsByStatus(status: string): AnalyticsData[] {
    return this.analyticsData.filter(a => a.status === status);
  }

  public getRevenueData(): RevenueAnalyticsData[] {
    return this.revenueData;
  }

  public getTotalRevenue(): number {
    return this.revenueData[0]?.totalRevenue || 0;
  }

  public getActiveUsers(): number {
    return this.analyticsData.find(a => a.metric === 'Daily Active Users')?.value || 0;
  }

  public getEngagementRate(): number {
    return this.analyticsData.find(a => a.metric === 'Engagement Rate')?.value || 0;
  }
}

// ----------------------
// Professional Analytics Card Component
// Purpose: Displays analytics information in a structured, professional layout
// Note: Similar to finance card with analytics-specific data
// ----------------------
function ProfessionalAnalyticsCard({
  analytics,
  onView,
  onExport,
  onMore,
  className = ""
}: {
  analytics: AnalyticsData;
  onView?: () => void;
  onExport?: () => void;
  onMore?: () => void;
  className?: string;
}) {
  const getStatusBadge = () => {
    const statusConfig = {
      active: { variant: "default" as const, icon: CheckCircle, text: "Active", color: "text-green-600" },
      inactive: { variant: "secondary" as const, icon: Clock, text: "Inactive", color: "text-yellow-600" },
      pending: { variant: "secondary" as const, icon: Clock, text: "Pending", color: "text-blue-600" },
      completed: { variant: "default" as const, icon: CheckCircle, text: "Completed", color: "text-green-600" }
    };

    const config = statusConfig[analytics.status];
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {config.text}
      </Badge>
    );
  };

  const getTypeIcon = () => {
    const typeIcons = {
      user: Users,
      engagement: Heart,
      revenue: DollarSign,
      retention: Target,
      cohort: BarChart3
    };

    const Icon = typeIcons[analytics.type];
    return <Icon className="h-4 w-4" />;
  };

  const getValueColor = () => {
    if (analytics.growth > 0) return 'text-green-600';
    if (analytics.growth < 0) return 'text-red-600';
    return 'text-text-muted';
  };

  const getTypeBadge = () => {
    const typeConfig = {
      user: { variant: "default" as const, text: "User", color: "text-blue-600" },
      engagement: { variant: "secondary" as const, text: "Engagement", color: "text-purple-600" },
      revenue: { variant: "default" as const, text: "Revenue", color: "text-green-600" },
      retention: { variant: "outline" as const, text: "Retention", color: "text-orange-600" },
      cohort: { variant: "secondary" as const, text: "Cohort", color: "text-cyan-600" }
    };

    const config = typeConfig[analytics.type];
    return (
      <Badge variant={config.variant} className="text-xs">
        {config.text}
      </Badge>
    );
  };

  const formatValue = () => {
    if (analytics.unit === 'USD') return `$${analytics.value.toLocaleString()}`;
    if (analytics.unit === '%') return `${analytics.value}%`;
    return analytics.value.toLocaleString();
  };

  return (
    <Card className={`bg-admin-card border-line-soft hover:shadow-lg transition-all duration-200 ${className}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-lg bg-surface-elev2 flex items-center justify-center border border-line-soft">
              {getTypeIcon()}
            </div>
            <div>
              <CardTitle className="text-lg text-text flex items-center gap-2">
                {analytics.metric}
                {getTypeBadge()}
              </CardTitle>
              <CardDescription className="text-text-muted">
                {analytics.description} • {analytics.period}
              </CardDescription>
            </div>
          </div>
          <div className="text-right">
            <div className={`text-2xl font-bold ${getValueColor()}`}>
              {formatValue()}
            </div>
            <div className="text-sm text-text-muted">
              Target: {analytics.unit === 'USD' ? `$${analytics.target.toLocaleString()}` : `${analytics.target}${analytics.unit}`}
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Analytics Overview */}
        <div className="bg-surface-elev2 rounded-lg p-4 border border-line-soft">
          <div className="flex items-center gap-2 mb-3">
            {getTypeIcon()}
            <span className="font-medium text-text">Analytics Overview</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-sm text-text-muted">Type:</span>
              <div className="mt-1">
                {getTypeBadge()}
              </div>
            </div>
            <div>
              <span className="text-sm text-text-muted">Status:</span>
              <div className="mt-1">
                {getStatusBadge()}
              </div>
            </div>
            <div>
              <span className="text-sm text-text-muted">Category:</span>
              <div className="mt-1">
                <Badge variant="outline" className="text-xs">
                  {analytics.category}
                </Badge>
              </div>
            </div>
            <div>
              <span className="text-sm text-text-muted">Growth:</span>
              <div className="mt-1 flex items-center gap-1">
                {analytics.growth > 0 ? (
                  <TrendingUp className="h-4 w-4 text-green-600" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-600" />
                )}
                <span className={`text-sm font-medium ${getValueColor()}`}>
                  {analytics.growth > 0 ? '+' : ''}{analytics.growth}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-surface-elev2 rounded-lg p-4 text-center border border-line-soft">
            <div className="flex items-center justify-center gap-1 text-text-muted mb-1">
              <Target className="h-4 w-4" />
              <span className="text-xs font-medium">Current</span>
            </div>
            <div className={`text-lg font-bold ${getValueColor()}`}>
              {formatValue()}
            </div>
          </div>
          <div className="bg-surface-elev2 rounded-lg p-4 text-center border border-line-soft">
            <div className="flex items-center justify-center gap-1 text-text-muted mb-1">
              <Target className="h-4 w-4" />
              <span className="text-xs font-medium">Target</span>
            </div>
            <div className="text-lg font-bold text-text">
              {analytics.unit === 'USD' ? `$${analytics.target.toLocaleString()}` : `${analytics.target}${analytics.unit}`}
            </div>
          </div>
          <div className="bg-surface-elev2 rounded-lg p-4 text-center border border-line-soft">
            <div className="flex items-center justify-center gap-1 text-text-muted mb-1">
              <TrendingUp className="h-4 w-4" />
              <span className="text-xs font-medium">Growth</span>
            </div>
            <div className={`text-lg font-bold ${getValueColor()}`}>
              {analytics.growth > 0 ? '+' : ''}{analytics.growth}%
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2 border-t border-line-soft">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 bg-surface-elev2 border-line-soft text-text hover:bg-surface-elev1"
            onClick={onView}
          >
            <Eye className="h-4 w-4 mr-2" />
            View
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 bg-surface-elev2 border-line-soft text-text hover:bg-surface-elev1"
            onClick={onExport}
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="bg-surface-elev2 border-line-soft text-text hover:bg-surface-elev1"
            onClick={onMore}
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// ----------------------
// Analytics Detail View Component
// Purpose: Single card view with filtering and quick stats
// Note: Similar to finance page with analytics-specific data
// ----------------------
function AnalyticsDetailView({
  analyticsData,
  selectedAnalyticsId,
  onAnalyticsSelect,
  onView,
  onExport,
  onMore,
  className = ""
}: {
  analyticsData: AnalyticsData[];
  selectedAnalyticsId?: string;
  onAnalyticsSelect?: (analyticsId: string) => void;
  onView?: (analyticsId: string) => void;
  onExport?: (analyticsId: string) => void;
  onMore?: (analyticsId: string) => void;
  className?: string;
}) {
  const selectedAnalytics = analyticsData.find(a => a.id === selectedAnalyticsId) || analyticsData[0];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { variant: "default" as const, color: "text-green-600", bgColor: "bg-green-100" },
      inactive: { variant: "secondary" as const, color: "text-yellow-600", bgColor: "bg-yellow-100" },
      pending: { variant: "secondary" as const, color: "text-blue-600", bgColor: "bg-blue-100" },
      completed: { variant: "default" as const, color: "text-green-600", bgColor: "bg-green-100" }
    };
    return statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
  };

  const getTypeIcon = (type: string) => {
    const typeIcons = {
      user: Users,
      engagement: Heart,
      revenue: DollarSign,
      retention: Target,
      cohort: BarChart3
    };
    const Icon = typeIcons[type as keyof typeof typeIcons];
    return Icon;
  };

  const statusInfo = getStatusBadge(selectedAnalytics?.status || 'pending');

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Filter Section */}
      <div className="bg-surface-elev1 border border-line-soft rounded-lg p-4">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <label className="text-sm font-medium text-text-muted mb-2 block">Select Analytics Metric</label>
            <Select value={selectedAnalyticsId || analyticsData[0]?.id} onValueChange={onAnalyticsSelect}>
              <SelectTrigger className="bg-surface-elev2 border-line-soft text-text">
                <SelectValue placeholder="Choose a metric..." />
              </SelectTrigger>
              <SelectContent className="bg-surface-elev2 border-line-soft">
                {analyticsData.map((analytics) => {
                  const Icon = getTypeIcon(analytics.type);
                  return (
                    <SelectItem 
                      key={analytics.id} 
                      value={analytics.id}
                      className="text-text hover:bg-surface-elev1"
                    >
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4" />
                        <span>{analytics.metric}</span>
                        <Badge 
                          variant={analytics.status === 'active' ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {analytics.status}
                        </Badge>
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Analytics Card */}
        <div className="lg:col-span-2">
          {selectedAnalytics ? (
            <ProfessionalAnalyticsCard
              analytics={selectedAnalytics}
              onView={() => onView?.(selectedAnalytics.id)}
              onExport={() => onExport?.(selectedAnalytics.id)}
              onMore={() => onMore?.(selectedAnalytics.id)}
            />
          ) : (
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 text-center">
              <BarChart3 className="h-12 w-12 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-400">No analytics metric selected</p>
            </div>
          )}
        </div>

        {/* Right: Quick Stats */}
        <div className="space-y-4">
          <Card className="bg-admin-panel border-line-soft">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-text">Quick Stats</CardTitle>
              <CardDescription className="text-text-muted">Key information at a glance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Status */}
              <div className="flex items-center justify-between p-3 bg-surface-elev2 rounded-lg">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-text-muted" />
                  <span className="text-sm font-medium text-text">Status</span>
                </div>
                <div className={`px-2 py-1 rounded text-xs font-semibold ${statusInfo.bgColor} ${statusInfo.color}`}>
                  {selectedAnalytics?.status || 'N/A'}
                </div>
              </div>

              {/* Type */}
              <div className="flex items-center justify-between p-3 bg-surface-elev2 rounded-lg">
                <div className="flex items-center gap-2">
                  {selectedAnalytics && (() => {
                    const Icon = getTypeIcon(selectedAnalytics.type);
                    return <Icon className="h-4 w-4 text-text-muted" />;
                  })()}
                  <span className="text-sm font-medium text-text">Type</span>
                </div>
                <span className="text-sm font-semibold text-text">
                  {selectedAnalytics?.type?.toUpperCase() || 'N/A'}
                </span>
              </div>

              {/* Value */}
              <div className="flex items-center justify-between p-3 bg-surface-elev2 rounded-lg">
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-text-muted" />
                  <span className="text-sm font-medium text-text">Value</span>
                </div>
                <span className="text-sm font-semibold text-text">
                  {selectedAnalytics?.unit === 'USD' ? `$${selectedAnalytics?.value?.toLocaleString()}` : 
                   selectedAnalytics?.unit === '%' ? `${selectedAnalytics?.value}%` : 
                   selectedAnalytics?.value?.toLocaleString() || '0'}
                </span>
              </div>

              {/* Growth */}
              <div className="flex items-center justify-between p-3 bg-surface-elev2 rounded-lg">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-text-muted" />
                  <span className="text-sm font-medium text-text">Growth</span>
                </div>
                <span className={`text-sm font-semibold ${selectedAnalytics?.growth && selectedAnalytics.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {selectedAnalytics?.growth ? (selectedAnalytics.growth > 0 ? '+' : '') + selectedAnalytics.growth + '%' : '0%'}
                </span>
              </div>

              {/* Target */}
              <div className="flex items-center justify-between p-3 bg-surface-elev2 rounded-lg">
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-text-muted" />
                  <span className="text-sm font-medium text-text">Target</span>
                </div>
                <span className="text-sm font-semibold text-text">
                  {selectedAnalytics?.unit === 'USD' ? `$${selectedAnalytics?.target?.toLocaleString()}` : 
                   selectedAnalytics?.unit === '%' ? `${selectedAnalytics?.target}%` : 
                   selectedAnalytics?.target?.toLocaleString() || '0'}
                </span>
              </div>

              {/* Period */}
              <div className="flex items-center justify-between p-3 bg-surface-elev2 rounded-lg">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-text-muted" />
                  <span className="text-sm font-medium text-text">Period</span>
                </div>
                <span className="text-sm text-text-muted">
                  {selectedAnalytics?.period || 'N/A'}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Additional Actions */}
          <Card className="bg-admin-panel border-line-soft">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-text">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button 
                variant="outline" 
                className="w-full bg-surface-elev2 border-line-soft text-text hover:bg-surface-elev1"
                onClick={() => onView?.(selectedAnalytics?.id || '')}
              >
                <Eye className="h-4 w-4 mr-2" />
                View Analytics
              </Button>
              <Button 
                variant="outline" 
                className="w-full bg-surface-elev2 border-line-soft text-text hover:bg-surface-elev1"
                onClick={() => onExport?.(selectedAnalytics?.id || '')}
              >
                <Download className="h-4 w-4 mr-2" />
                Export Analytics
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

interface AnalyticsDashboardProps {
  defaultTab?: string;
}

// ----------------------
// Analytics Page Client Component
// Purpose: Manages state and interactions for the analytics page
// ----------------------
function AnalyticsPageClient() {
  const [selectedAnalyticsId, setSelectedAnalyticsId] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const analyticsService = new AnalyticsManagementService();
  const allAnalytics = analyticsService.getAllAnalytics();

  // Filter analytics based on search, type, and status
  const filteredAnalytics = allAnalytics.filter(analytics => {
    const matchesSearch = analytics.metric.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         analytics.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         analytics.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || analytics.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || analytics.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  // Set default selected analytics
  useEffect(() => {
    if (filteredAnalytics.length > 0 && !selectedAnalyticsId) {
      setSelectedAnalyticsId(filteredAnalytics[0].id);
    }
  }, [filteredAnalytics, selectedAnalyticsId]);

  const handleAnalyticsSelect = (analyticsId: string) => {
    setSelectedAnalyticsId(analyticsId);
  };

  const handleView = (analyticsId: string) => {
    console.log('View analytics:', analyticsId);
  };

  const handleExport = (analyticsId: string) => {
    console.log('Export analytics:', analyticsId);
  };

  const handleMore = (analyticsId: string) => {
    console.log('More actions for analytics:', analyticsId);
  };

  const handleRefresh = () => {
    console.log('Refresh analytics');
  };

  const handleExportAll = () => {
    console.log('Export all analytics');
  };

  const statsCards = (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard
        title="Total Revenue"
        value={analyticsService.getTotalRevenue()}
        growth={15.2}
        icon={DollarSign}
        format="currency"
      />
      <MetricCard
        title="Active Users"
        value={analyticsService.getActiveUsers()}
        growth={8.2}
        icon={Users}
        format="number"
      />
      <MetricCard
        title="Engagement Rate"
        value={analyticsService.getEngagementRate()}
        growth={2.1}
        icon={Heart}
        format="percentage"
      />
      <MetricCard
        title="Total Metrics"
        value={allAnalytics.length}
        growth={12.5}
        icon={BarChart3}
        format="number"
      />
    </div>
  );

  const filters = (
    <div className="flex items-center gap-2">
      <Select value={typeFilter} onValueChange={setTypeFilter}>
        <SelectTrigger className="w-40 bg-surface-elev2 border-line-soft text-text">
          <SelectValue placeholder="Type" />
        </SelectTrigger>
        <SelectContent className="bg-surface-elev2 border-line-soft">
          <SelectItem value="all" className="text-text hover:bg-surface-elev1">All Types</SelectItem>
          <SelectItem value="user" className="text-text hover:bg-surface-elev1">User</SelectItem>
          <SelectItem value="engagement" className="text-text hover:bg-surface-elev1">Engagement</SelectItem>
          <SelectItem value="revenue" className="text-text hover:bg-surface-elev1">Revenue</SelectItem>
          <SelectItem value="retention" className="text-text hover:bg-surface-elev1">Retention</SelectItem>
          <SelectItem value="cohort" className="text-text hover:bg-surface-elev1">Cohort</SelectItem>
        </SelectContent>
      </Select>
      <Select value={statusFilter} onValueChange={setStatusFilter}>
        <SelectTrigger className="w-40 bg-surface-elev2 border-line-soft text-text">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent className="bg-surface-elev2 border-line-soft">
          <SelectItem value="all" className="text-text hover:bg-surface-elev1">All Status</SelectItem>
          <SelectItem value="active" className="text-text hover:bg-surface-elev1">Active</SelectItem>
          <SelectItem value="inactive" className="text-text hover:bg-surface-elev1">Inactive</SelectItem>
          <SelectItem value="pending" className="text-text hover:bg-surface-elev1">Pending</SelectItem>
          <SelectItem value="completed" className="text-text hover:bg-surface-elev1">Completed</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );

  return (
    <AdminPageTemplate
      title="Analytics Management"
      description="Track user analytics, engagement, and platform performance"
      icon={<BarChart3 className="h-6 w-6" />}
      searchPlaceholder="Search analytics by metric, description, or category..."
      searchValue={searchTerm}
      onSearchChange={setSearchTerm}
      showSearch={true}
      showFilters={true}
      showRefresh={true}
      showExport={true}
      onRefresh={handleRefresh}
      onExport={handleExportAll}
      filters={filters}
      stats={statsCards}
    >
      <AnalyticsDetailView
        analyticsData={filteredAnalytics}
        selectedAnalyticsId={selectedAnalyticsId}
        onAnalyticsSelect={handleAnalyticsSelect}
        onView={handleView}
        onExport={handleExport}
        onMore={handleMore}
      />
    </AdminPageTemplate>
  );
}

export function AnalyticsDashboard({ defaultTab = "overview" }: AnalyticsDashboardProps = {}) {
  const revenueData = [
    { month: "Jan", subscriptions: 4000, payPerView: 2400, tips: 800 },
    { month: "Feb", subscriptions: 3000, payPerView: 1398, tips: 600 },
    { month: "Mar", subscriptions: 5000, payPerView: 3800, tips: 1200 },
    { month: "Apr", subscriptions: 4500, payPerView: 3908, tips: 900 },
    { month: "May", subscriptions: 6000, payPerView: 4800, tips: 1500 },
    { month: "Jun", subscriptions: 7000, payPerView: 3800, tips: 1800 },
  ]

  const engagementData = [
    { day: "Mon", views: 1200, likes: 340, comments: 89 },
    { day: "Tue", views: 1900, likes: 520, comments: 156 },
    { day: "Wed", views: 1600, likes: 480, comments: 134 },
    { day: "Thu", views: 2200, likes: 680, comments: 201 },
    { day: "Fri", views: 2800, likes: 890, comments: 267 },
    { day: "Sat", views: 3200, likes: 1020, comments: 312 },
    { day: "Sun", views: 2400, likes: 760, comments: 198 },
  ]

  return (
    <AdminPageTemplate
      title="Analytics Dashboard"
      description="Comprehensive platform analytics with detailed insights"
      icon={<BarChart3 className="h-6 w-6" />}
      showSearch={false}
      showFilters={false}
      showRefresh={true}
      showExport={true}
      onRefresh={() => console.log('Refresh analytics')}
      onExport={() => console.log('Export analytics')}
    >
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-admin-card border-line-soft">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-text">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-text-muted" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">$12,847</div>
              <p className="text-xs text-text-muted">
                <span className="text-green-600">+12.5%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-admin-card border-line-soft">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-text">Active Subscribers</CardTitle>
              <Users className="h-4 w-4 text-text-muted" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">1,247</div>
              <p className="text-xs text-text-muted">
                <span className="text-green-600">+8.2%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-admin-card border-line-soft">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-text">Total Views</CardTitle>
              <Eye className="h-4 w-4 text-text-muted" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">89,234</div>
              <p className="text-xs text-text-muted">
                <span className="text-green-600">+15.3%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-admin-card border-line-soft">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-text">Engagement Rate</CardTitle>
              <Heart className="h-4 w-4 text-text-muted" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">8.7%</div>
              <p className="text-xs text-text-muted">
                <span className="text-green-600">+2.1%</span> from last month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts and Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Chart */}
          <Card className="bg-admin-card border-line-soft">
            <CardHeader>
              <CardTitle className="text-text">Revenue Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="subscriptions" stackId="a" fill="#8884d8" />
                  <Bar dataKey="payPerView" stackId="a" fill="#82ca9d" />
                  <Bar dataKey="tips" stackId="a" fill="#ffc658" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Engagement Chart */}
          <Card className="bg-admin-card border-line-soft">
            <CardHeader>
              <CardTitle className="text-text">Weekly Engagement</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={engagementData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="views" stroke="#8884d8" strokeWidth={2} />
                  <Line type="monotone" dataKey="likes" stroke="#82ca9d" strokeWidth={2} />
                  <Line type="monotone" dataKey="comments" stroke="#ffc658" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Admin Analytics Tabs */}
        <Tabs defaultValue={defaultTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-surface-elev1 border-line-soft">
            <TabsTrigger value="overview" className="text-text data-[state=active]:bg-surface-elev2">Overview</TabsTrigger>
            <TabsTrigger value="cohorts" className="text-text data-[state=active]:bg-surface-elev2">Cohorts</TabsTrigger>
            <TabsTrigger value="funnels" className="text-text data-[state=active]:bg-surface-elev2">Funnels</TabsTrigger>
            <TabsTrigger value="retention" className="text-text data-[state=active]:bg-surface-elev2">Retention</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="space-y-6">
              {/* Platform-Wide Health Metrics */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-admin-card border-line-soft">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-text">
                      <DollarSign className="h-5 w-5" />
                      Platform Revenue & Take Rate
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-text-muted">Total Platform Revenue</span>
                        <span className="text-2xl font-bold text-primary">$2,847,392</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-text-muted">Platform Take Rate</span>
                        <span className="text-xl font-semibold text-green-600">15.2%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-text-muted">Creator Payouts</span>
                        <span className="text-lg font-medium text-text">$2,415,283</span>
                      </div>
                      <Progress value={15.2} className="w-full" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-admin-card border-line-soft">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-text">
                      <Users className="h-5 w-5" />
                      Daily Active Users
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-text-muted">Daily Active Creators</span>
                        <span className="text-2xl font-bold text-primary">1,247</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-text-muted">Daily Active Fans</span>
                        <span className="text-2xl font-bold text-primary">12,847</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-text-muted">Total Platform Users</span>
                        <span className="text-lg font-medium text-text">45,392</span>
                      </div>
                      <div className="text-xs text-text-muted">
                        <span className="text-green-600">+8.2%</span> from last month
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* New Sign-ups and Top Earners */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-admin-card border-line-soft">
                  <CardHeader>
                    <CardTitle className="text-text">New Sign-ups (Last 30 Days)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-text-muted">New Creators</span>
                        <span className="text-xl font-bold text-primary">234</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-text-muted">New Fans</span>
                        <span className="text-xl font-bold text-primary">2,847</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-text-muted">Creator/Fan Ratio</span>
                        <span className="text-lg font-medium text-text">1:12.2</span>
                      </div>
                      <Progress value={75} className="w-full" />
                      <div className="text-xs text-text-muted">
                        <span className="text-green-600">+15.3%</span> creator growth
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-admin-card border-line-soft">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-text">
                      <Crown className="h-5 w-5" />
                      Top Earners (This Month)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { name: "Sarah Johnson", earnings: "$12,847", tier: "VIP" },
                        { name: "Mike Chen", earnings: "$9,234", tier: "Premium" },
                        { name: "Emma Davis", earnings: "$7,891", tier: "Premium" },
                        { name: "Alex Rodriguez", earnings: "$6,543", tier: "Basic" },
                        { name: "Lisa Wang", earnings: "$5,432", tier: "Basic" },
                      ].map((creator, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                              <span className="text-xs font-medium">{index + 1}</span>
                            </div>
                            <span className="text-sm font-medium text-text">{creator.name}</span>
                            <Badge variant="outline" className="text-xs">
                              {creator.tier}
                            </Badge>
                          </div>
                          <span className="text-sm font-semibold text-primary">
                            {creator.earnings}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="cohorts" className="mt-6">
            <div className="space-y-6">
              {/* Creator Cohorts */}
              <Card className="bg-admin-card border-line-soft">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-text">
                    <Users className="h-5 w-5" />
                    Creator Cohorts Analysis
                  </CardTitle>
                  <p className="text-sm text-text-muted">
                    Analyze the performance of creators who joined in a given month
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        { month: "Jan 2024", creators: 45, active: 38, revenue: "$12,847", retention: "84.4%" },
                        { month: "Feb 2024", creators: 52, active: 41, revenue: "$15,234", retention: "78.8%" },
                        { month: "Mar 2024", creators: 38, active: 32, revenue: "$9,876", retention: "84.2%" },
                        { month: "Apr 2024", creators: 61, active: 48, revenue: "$18,543", retention: "78.7%" },
                        { month: "May 2024", creators: 47, active: 39, revenue: "$14,567", retention: "83.0%" },
                        { month: "Jun 2024", creators: 55, active: 44, revenue: "$16,789", retention: "80.0%" },
                      ].map((cohort, index) => (
                        <div key={index} className="p-4 border border-line-soft rounded-lg bg-surface-elev1">
                          <div className="text-sm font-medium text-text-muted mb-2">{cohort.month}</div>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-xs text-text-muted">Total Creators</span>
                              <span className="text-sm font-medium text-text">{cohort.creators}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-xs text-text-muted">Still Active</span>
                              <span className="text-sm font-medium text-green-600">{cohort.active}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-xs text-text-muted">Revenue Generated</span>
                              <span className="text-sm font-medium text-primary">{cohort.revenue}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-xs text-text-muted">Retention Rate</span>
                              <span className="text-sm font-medium text-text">{cohort.retention}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Fan Cohorts */}
              <Card className="bg-admin-card border-line-soft">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-text">
                    <Heart className="h-5 w-5" />
                    Fan Cohorts Analysis
                  </CardTitle>
                  <p className="text-sm text-text-muted">
                    Analyze the spending behavior and retention of fans who sign up in a given month
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        { month: "Jan 2024", fans: 234, active: 189, spending: "$45,678", retention: "80.8%" },
                        { month: "Feb 2024", fans: 287, active: 221, spending: "$52,134", retention: "77.0%" },
                        { month: "Mar 2024", fans: 198, active: 156, spending: "$38,945", retention: "78.8%" },
                        { month: "Apr 2024", fans: 312, active: 234, spending: "$61,789", retention: "75.0%" },
                        { month: "May 2024", fans: 256, active: 198, spending: "$48,567", retention: "77.3%" },
                        { month: "Jun 2024", fans: 298, active: 223, spending: "$56,234", retention: "74.8%" },
                      ].map((cohort, index) => (
                        <div key={index} className="p-4 border border-line-soft rounded-lg bg-surface-elev1">
                          <div className="text-sm font-medium text-text-muted mb-2">{cohort.month}</div>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-xs text-text-muted">Total Fans</span>
                              <span className="text-sm font-medium text-text">{cohort.fans}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-xs text-text-muted">Still Active</span>
                              <span className="text-sm font-medium text-green-600">{cohort.active}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-xs text-text-muted">Total Spending</span>
                              <span className="text-sm font-medium text-primary">{cohort.spending}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-xs text-text-muted">Retention Rate</span>
                              <span className="text-sm font-medium text-text">{cohort.retention}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="funnels" className="mt-6">
            <div className="space-y-6">
              {/* Fan Sign-up & Onboarding Funnel */}
              <Card className="bg-admin-card border-line-soft">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-text">
                    <Users className="h-5 w-5" />
                    Fan Sign-up & Onboarding Funnel
                  </CardTitle>
                  <p className="text-sm text-text-muted">
                    Track where potential fans abandon the registration process
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { step: "Site Visit", users: 10000, percentage: 100, color: "bg-blue-500" },
                      { step: "Registration Started", users: 7500, percentage: 75, color: "bg-blue-400" },
                      { step: "Email Verification", users: 6800, percentage: 68, color: "bg-blue-300" },
                      { step: "Profile Setup", users: 5200, percentage: 52, color: "bg-blue-200" },
                      { step: "Payment Method Added", users: 3800, percentage: 38, color: "bg-blue-100" },
                      { step: "First Subscription", users: 2847, percentage: 28.5, color: "bg-green-500" },
                    ].map((funnel, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-text">{funnel.step}</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-text-muted">{funnel.users.toLocaleString()}</span>
                            <span className="text-sm font-semibold text-text">{funnel.percentage}%</span>
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${funnel.color}`}
                            style={{ width: `${funnel.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Creator Application Funnel */}
              <Card className="bg-admin-card border-line-soft">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-text">
                    <Crown className="h-5 w-5" />
                    Creator Application Funnel
                  </CardTitle>
                  <p className="text-sm text-text-muted">
                    Track the journey from applicant to verified, active creator
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { step: "Application Started", users: 500, percentage: 100, color: "bg-purple-500" },
                      { step: "Documents Uploaded", users: 420, percentage: 84, color: "bg-purple-400" },
                      { step: "Identity Verification", users: 380, percentage: 76, color: "bg-purple-300" },
                      { step: "Content Review", users: 320, percentage: 64, color: "bg-purple-200" },
                      { step: "Approved & Verified", users: 280, percentage: 56, color: "bg-green-500" },
                      { step: "First Post Published", users: 234, percentage: 46.8, color: "bg-green-400" },
                    ].map((funnel, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-text">{funnel.step}</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-text-muted">{funnel.users.toLocaleString()}</span>
                            <span className="text-sm font-semibold text-text">{funnel.percentage}%</span>
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${funnel.color}`}
                            style={{ width: `${funnel.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Overall Monetization Funnel */}
              <Card className="bg-admin-card border-line-soft">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-text">
                    <DollarSign className="h-5 w-5" />
                    Overall Monetization Funnel
                  </CardTitle>
                  <p className="text-sm text-text-muted">
                    Site Visit → Sign Up → First Subscription → First Tip/PPV Purchase
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { step: "Site Visit", users: 50000, percentage: 100, color: "bg-orange-500" },
                      { step: "Sign Up", users: 2847, percentage: 5.7, color: "bg-orange-400" },
                      { step: "First Subscription", users: 1200, percentage: 2.4, color: "bg-orange-300" },
                      { step: "First Tip/PPV", users: 800, percentage: 1.6, color: "bg-green-500" },
                      { step: "Repeat Purchase", users: 650, percentage: 1.3, color: "bg-green-400" },
                    ].map((funnel, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-text">{funnel.step}</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-text-muted">{funnel.users.toLocaleString()}</span>
                            <span className="text-sm font-semibold text-text">{funnel.percentage}%</span>
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${funnel.color}`}
                            style={{ width: `${funnel.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="retention" className="mt-6">
            <div className="space-y-6">
              {/* Platform-Wide Fan Retention */}
              <Card className="bg-admin-card border-line-soft">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-text">
                    <Heart className="h-5 w-5" />
                    Platform-Wide Fan Retention
                  </CardTitle>
                  <p className="text-sm text-text-muted">
                    Are fans staying on the platform and spending money month-over-month?
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        { period: "1 Month", retention: 78.5, spending: "$45,678", color: "text-green-600" },
                        { period: "3 Months", retention: 65.2, spending: "$38,945", color: "text-blue-600" },
                        { period: "6 Months", retention: 52.8, spending: "$28,567", color: "text-orange-600" },
                        { period: "12 Months", retention: 41.3, spending: "$18,234", color: "text-red-600" },
                      ].map((retention, index) => (
                        <div key={index} className="p-4 border border-line-soft rounded-lg text-center bg-surface-elev1">
                          <div className="text-2xl font-bold mb-1 text-text">{retention.retention}%</div>
                          <div className="text-sm text-text-muted mb-2">{retention.period} Retention</div>
                          <div className="text-sm font-medium text-primary">{retention.spending}</div>
                          <div className="text-xs text-text-muted">Avg. Spending</div>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-medium text-text">Retention Trends</h4>
                      <div className="space-y-3">
                        {[
                          { metric: "New Fan Retention (30 days)", value: 78.5, target: 80, status: "warning" },
                          { metric: "Repeat Purchase Rate", value: 45.2, target: 50, status: "warning" },
                          { metric: "Average Revenue Per User", value: 89.50, target: 100, status: "warning" },
                          { metric: "Churn Rate", value: 21.5, target: 20, status: "error" },
                        ].map((trend, index) => (
                          <div key={index} className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-medium text-text">{trend.metric}</span>
                              <div className="flex items-center space-x-2">
                                <span className="text-sm font-semibold text-text">{trend.value}%</span>
                                <Badge 
                                  variant={trend.status === "error" ? "destructive" : trend.status === "warning" ? "secondary" : "default"}
                                  className="text-xs"
                                >
                                  {trend.status === "error" ? "Below Target" : trend.status === "warning" ? "Near Target" : "On Target"}
                                </Badge>
                              </div>
                            </div>
                            <Progress value={(trend.value / trend.target) * 100} className="w-full" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Creator Retention */}
              <Card className="bg-admin-card border-line-soft">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-text">
                    <Crown className="h-5 w-5" />
                    Creator Retention
                  </CardTitle>
                  <p className="text-sm text-text-muted">
                    Are new creators staying active, or are they churning after the first month due to lack of earnings?
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        { period: "1 Month", retention: 68.2, earnings: "$1,247", color: "text-orange-600" },
                        { period: "3 Months", retention: 45.8, earnings: "$2,456", color: "text-red-600" },
                        { period: "6 Months", retention: 32.1, earnings: "$3,789", color: "text-red-600" },
                        { period: "12 Months", retention: 24.7, earnings: "$5,234", color: "text-red-600" },
                      ].map((retention, index) => (
                        <div key={index} className="p-4 border border-line-soft rounded-lg text-center bg-surface-elev1">
                          <div className="text-2xl font-bold mb-1 text-text">{retention.retention}%</div>
                          <div className="text-sm text-text-muted mb-2">{retention.period} Retention</div>
                          <div className="text-sm font-medium text-primary">{retention.earnings}</div>
                          <div className="text-xs text-text-muted">Avg. Earnings</div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="font-medium text-text">Creator Health Metrics</h4>
                      <div className="space-y-3">
                        {[
                          { metric: "First Month Earnings > $100", value: 34.2, target: 50, status: "error" },
                          { metric: "Active Posting (Last 30 days)", value: 56.8, target: 70, status: "warning" },
                          { metric: "Creator Satisfaction Score", value: 7.2, target: 8.0, status: "warning" },
                          { metric: "Support Ticket Volume", value: 12.3, target: 10, status: "error" },
                        ].map((metric, index) => (
                          <div key={index} className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-medium text-text">{metric.metric}</span>
                              <div className="flex items-center space-x-2">
                                <span className="text-sm font-semibold text-text">{metric.value}%</span>
                                <Badge 
                                  variant={metric.status === "error" ? "destructive" : metric.status === "warning" ? "secondary" : "default"}
                                  className="text-xs"
                                >
                                  {metric.status === "error" ? "Needs Attention" : metric.status === "warning" ? "Monitor" : "Good"}
                                </Badge>
                              </div>
                            </div>
                            <Progress value={(metric.value / metric.target) * 100} className="w-full" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminPageTemplate>
  );
}