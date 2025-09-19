"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@src/components/ui/card";
import { Badge } from "@src/components/ui/badge";
import { Button } from "@src/components/ui/button";
import { 
  BarChart3, TrendingUp, Users, DollarSign, Activity, 
  Eye, MessageSquare, Heart, Share2, Calendar, 
  AlertTriangle, CheckCircle, Clock, Zap, Target,
  ArrowUpRight, ArrowDownRight, Minus, MoreHorizontal
} from "lucide-react";

// ----------------------
// Admin Dashboard Card Component
// Location: /src/components/admin/AdminDashboardCard.tsx
// Purpose: Comprehensive admin dashboard card with all necessary elements
// Note: Single card design with complete dashboard information
// ----------------------

interface DashboardMetrics {
  totalRevenue: number;
  activeUsers: number;
  contentViews: number;
  conversionRate: number;
  totalPosts: number;
  verifiedCreators: number;
  monthlyRevenue: number;
  engagementRate: number;
  newUsers: number;
  contentModeration: number;
  systemHealth: number;
  responseTime: number;
}

interface AdminDashboardCardProps {
  metrics: DashboardMetrics;
  onViewDetails?: () => void;
  onExport?: () => void;
  onRefresh?: () => void;
  onMore?: () => void;
}

export function AdminDashboardCard({ 
  metrics, 
  onViewDetails, 
  onExport, 
  onRefresh, 
  onMore 
}: AdminDashboardCardProps) {
  
  const getTrendIcon = (value: number) => {
    if (value > 0) return <ArrowUpRight className="h-4 w-4 text-green-500" />;
    if (value < 0) return <ArrowDownRight className="h-4 w-4 text-red-500" />;
    return <Minus className="h-4 w-4 text-neutral-400" />;
  };

  const getTrendColor = (value: number) => {
    if (value > 0) return "text-green-500";
    if (value < 0) return "text-red-500";
    return "text-neutral-400";
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const formatPercentage = (num: number) => {
    return `${num > 0 ? '+' : ''}${num.toFixed(1)}%`;
  };

  return (
    <Card className="bg-[var(--admin-card-bg)] border border-[var(--admin-border-soft)]">
      <CardHeader className="pb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-[var(--brand)]/20 rounded-lg flex-shrink-0">
              <BarChart3 className="h-5 w-5 text-[var(--brand)]" />
            </div>
            <div className="min-w-0 flex-1">
              <CardTitle className="text-lg font-semibold text-[var(--admin-text-primary)] leading-tight">
                Platform Overview
              </CardTitle>
              <CardDescription className="text-sm text-[var(--admin-text-primary)]-muted leading-relaxed mt-1">
                Key metrics and performance indicators
              </CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={onRefresh}
              className="bg-[var(--admin-surface)] border border-[var(--admin-border-soft)] text-[var(--admin-text-primary)] hover:bg-[var(--admin-card-bg)] text-xs px-3 py-1.5"
            >
              <Activity className="h-3 w-3 mr-1.5" />
              Refresh
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onExport}
              className="bg-[var(--admin-surface)] border border-[var(--admin-border-soft)] text-[var(--admin-text-primary)] hover:bg-[var(--admin-card-bg)] text-xs px-3 py-1.5"
            >
              <TrendingUp className="h-3 w-3 mr-1.5" />
              Export
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onMore}
              className="text-[var(--admin-text-primary)]-muted hover:text-[var(--admin-text-primary)] p-1.5"
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Primary Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Revenue Metrics */}
          <div className="bg-[var(--admin-surface)] border border-[var(--admin-border-soft)] rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5 min-w-0">
                <DollarSign className="h-3.5 w-3.5 text-green-500 flex-shrink-0" />
                <span className="text-xs font-medium text-[var(--admin-text-primary)]-muted truncate">Total Revenue</span>
              </div>
              <Badge variant="secondary" className="bg-green-900/20 text-green-400 border-green-500/30 text-xs px-1.5 py-0.5">
                <TrendingUp className="h-2.5 w-2.5 mr-0.5" />
                +12.5%
              </Badge>
            </div>
            <div className="text-xl font-bold text-[var(--admin-text-primary)] mb-1 leading-tight">
              {formatCurrency(metrics.totalRevenue)}
            </div>
            <div className="flex items-center gap-1 text-xs text-green-500">
              {getTrendIcon(12.5)}
              <span className="truncate">{formatPercentage(12.5)} from last month</span>
            </div>
          </div>

          {/* User Metrics */}
          <div className="bg-[var(--admin-surface)] border border-[var(--admin-border-soft)] rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5 min-w-0">
                <Users className="h-3.5 w-3.5 text-blue-500 flex-shrink-0" />
                <span className="text-xs font-medium text-[var(--admin-text-primary)]-muted truncate">Active Users</span>
              </div>
              <Badge variant="secondary" className="bg-blue-900/20 text-blue-400 border-blue-500/30 text-xs px-1.5 py-0.5">
                <Users className="h-2.5 w-2.5 mr-0.5" />
                +8.2%
              </Badge>
            </div>
            <div className="text-xl font-bold text-[var(--admin-text-primary)] mb-1 leading-tight">
              {formatNumber(metrics.activeUsers)}
            </div>
            <div className="flex items-center gap-1 text-xs text-green-500">
              {getTrendIcon(8.2)}
              <span className="truncate">{formatPercentage(8.2)} from last month</span>
            </div>
          </div>

          {/* Content Metrics */}
          <div className="bg-[var(--admin-surface)] border border-[var(--admin-border-soft)] rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5 min-w-0">
                <Eye className="h-3.5 w-3.5 text-purple-500 flex-shrink-0" />
                <span className="text-xs font-medium text-[var(--admin-text-primary)]-muted truncate">Content Views</span>
              </div>
              <Badge variant="secondary" className="bg-purple-900/20 text-purple-400 border-purple-500/30 text-xs px-1.5 py-0.5">
                <Eye className="h-2.5 w-2.5 mr-0.5" />
                +15.3%
              </Badge>
            </div>
            <div className="text-xl font-bold text-[var(--admin-text-primary)] mb-1 leading-tight">
              {formatNumber(metrics.contentViews)}
            </div>
            <div className="flex items-center gap-1 text-xs text-green-500">
              {getTrendIcon(15.3)}
              <span className="truncate">{formatPercentage(15.3)} from last month</span>
            </div>
          </div>

          {/* Conversion Metrics */}
          <div className="bg-[var(--admin-surface)] border border-[var(--admin-border-soft)] rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5 min-w-0">
                <Target className="h-3.5 w-3.5 text-orange-500 flex-shrink-0" />
                <span className="text-xs font-medium text-[var(--admin-text-primary)]-muted truncate">Conversion Rate</span>
              </div>
              <Badge variant="secondary" className="bg-red-900/20 text-red-400 border-red-500/30 text-xs px-1.5 py-0.5">
                <ArrowDownRight className="h-2.5 w-2.5 mr-0.5" />
                -0.5%
              </Badge>
            </div>
            <div className="text-xl font-bold text-[var(--admin-text-primary)] mb-1 leading-tight">
              {metrics.conversionRate}%
            </div>
            <div className="flex items-center gap-1 text-xs text-red-500">
              {getTrendIcon(-0.5)}
              <span className="truncate">{formatPercentage(-0.5)} from last month</span>
            </div>
          </div>
        </div>

        {/* Secondary Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Posts */}
          <div className="bg-[var(--admin-surface)] border border-[var(--admin-border-soft)] rounded-lg p-3">
            <div className="flex items-center gap-1.5 mb-2">
              <MessageSquare className="h-3.5 w-3.5 text-cyan-500 flex-shrink-0" />
              <span className="text-xs font-medium text-[var(--admin-text-primary)]-muted truncate">Total Posts</span>
            </div>
            <div className="text-lg font-bold text-[var(--admin-text-primary)] leading-tight">
              {formatNumber(metrics.totalPosts)}
            </div>
            <div className="text-xs text-[var(--admin-text-primary)]-muted">
              +15.3% from last month
            </div>
          </div>

          {/* Verified Creators */}
          <div className="bg-[var(--admin-surface)] border border-[var(--admin-border-soft)] rounded-lg p-3">
            <div className="flex items-center gap-1.5 mb-2">
              <CheckCircle className="h-3.5 w-3.5 text-emerald-500 flex-shrink-0" />
              <span className="text-xs font-medium text-[var(--admin-text-primary)]-muted truncate">Verified Creators</span>
            </div>
            <div className="text-lg font-bold text-[var(--admin-text-primary)] leading-tight">
              {formatNumber(metrics.verifiedCreators)}
            </div>
            <div className="text-xs text-[var(--admin-text-primary)]-muted">
              +8.2% from last month
            </div>
          </div>

          {/* Monthly Revenue */}
          <div className="bg-[var(--admin-surface)] border border-[var(--admin-border-soft)] rounded-lg p-3">
            <div className="flex items-center gap-1.5 mb-2">
              <Calendar className="h-3.5 w-3.5 text-indigo-500 flex-shrink-0" />
              <span className="text-xs font-medium text-[var(--admin-text-primary)]-muted truncate">Monthly Revenue</span>
            </div>
            <div className="text-lg font-bold text-[var(--admin-text-primary)] leading-tight">
              {formatCurrency(metrics.monthlyRevenue)}
            </div>
            <div className="text-xs text-[var(--admin-text-primary)]-muted">
              +23.1% from last month
            </div>
          </div>

          {/* Engagement Rate */}
          <div className="bg-[var(--admin-surface)] border border-[var(--admin-border-soft)] rounded-lg p-3">
            <div className="flex items-center gap-1.5 mb-2">
              <Heart className="h-3.5 w-3.5 text-pink-500 flex-shrink-0" />
              <span className="text-xs font-medium text-[var(--admin-text-primary)]-muted truncate">Engagement Rate</span>
            </div>
            <div className="text-lg font-bold text-[var(--admin-text-primary)] leading-tight">
              {metrics.engagementRate}%
            </div>
            <div className="text-xs text-[var(--admin-text-primary)]-muted">
              +5.7% from last month
            </div>
          </div>
        </div>

        {/* System Status Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* System Health */}
          <div className="bg-[var(--admin-surface)] border border-[var(--admin-border-soft)] rounded-lg p-3">
            <div className="flex items-center gap-1.5 mb-2">
              <Zap className="h-3.5 w-3.5 text-green-500 flex-shrink-0" />
              <span className="text-xs font-medium text-[var(--admin-text-primary)]-muted truncate">System Health</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-lg font-bold text-green-500 leading-tight">
                {metrics.systemHealth}%
              </div>
              <Badge variant="secondary" className="bg-green-900/20 text-green-400 border-green-500/30 text-xs px-1.5 py-0.5">
                Excellent
              </Badge>
            </div>
            <div className="text-xs text-[var(--admin-text-primary)]-muted">
              All systems operational
            </div>
          </div>

          {/* Response Time */}
          <div className="bg-[var(--admin-surface)] border border-[var(--admin-border-soft)] rounded-lg p-3">
            <div className="flex items-center gap-1.5 mb-2">
              <Clock className="h-3.5 w-3.5 text-blue-500 flex-shrink-0" />
              <span className="text-xs font-medium text-[var(--admin-text-primary)]-muted truncate">Response Time</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-lg font-bold text-[var(--admin-text-primary)] leading-tight">
                {metrics.responseTime}ms
              </div>
              <Badge variant="secondary" className="bg-blue-900/20 text-blue-400 border-blue-500/30 text-xs px-1.5 py-0.5">
                Fast
              </Badge>
            </div>
            <div className="text-xs text-[var(--admin-text-primary)]-muted">
              Average response time
            </div>
          </div>

          {/* Content Moderation */}
          <div className="bg-[var(--admin-surface)] border border-[var(--admin-border-soft)] rounded-lg p-3">
            <div className="flex items-center gap-1.5 mb-2">
              <AlertTriangle className="h-3.5 w-3.5 text-amber-500 flex-shrink-0" />
              <span className="text-xs font-medium text-[var(--admin-text-primary)]-muted truncate">Pending Moderation</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-lg font-bold text-[var(--admin-text-primary)] leading-tight">
                {metrics.contentModeration}
              </div>
              <Badge variant="secondary" className="bg-amber-900/20 text-amber-400 border-amber-500/30 text-xs px-1.5 py-0.5">
                {metrics.contentModeration > 10 ? 'High' : 'Low'}
              </Badge>
            </div>
            <div className="text-xs text-[var(--admin-text-primary)]-muted">
              Items awaiting review
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-4 border-t border-[var(--admin-border-soft)]">
          <div className="flex items-center gap-2">
            <Button
              onClick={onViewDetails}
              className="bg-[var(--brand)] hover:bg-[var(--brand)]/90 text-white text-sm px-4 py-2"
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              View Analytics
            </Button>
            <Button
              variant="outline"
              onClick={onExport}
              className="bg-[var(--admin-surface)] border border-[var(--admin-border-soft)] text-[var(--admin-text-primary)] hover:bg-[var(--admin-card-bg)] text-sm px-4 py-2"
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
          <div className="text-xs text-[var(--admin-text-primary)]-muted">
            Last updated: {new Date().toLocaleString()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
