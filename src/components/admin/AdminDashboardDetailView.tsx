"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@src/components/ui/card";
import { AdminDashboardCard } from "./AdminDashboardCard";
import { MetricSelectionCard } from "./SelectionCard";
import { BarChart3, TrendingUp, Users, DollarSign, Activity, Eye, MessageSquare, Heart, Target, CheckCircle, Calendar, Zap, Clock, AlertTriangle } from "lucide-react";

// ----------------------
// Admin Dashboard Detail View Component
// Location: /src/components/admin/AdminDashboardDetailView.tsx
// Purpose: Single-card view with filtering and quick stats for admin dashboard
// Note: Similar to verification page design with card on left and stats on right
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

interface AdminDashboardDetailViewProps {
  metrics: DashboardMetrics;
  selectedMetricId: string;
  onMetricSelect: (metricId: string) => void;
  onViewDetails: () => void;
  onExport: () => void;
  onRefresh: () => void;
  onMore: () => void;
}

export function AdminDashboardDetailView({
  metrics,
  selectedMetricId,
  onMetricSelect,
  onViewDetails,
  onExport,
  onRefresh,
  onMore
}: AdminDashboardDetailViewProps) {

  // Metric options are now handled by MetricSelectionCard component

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Dashboard Card - Left Column */}
      <div className="lg:col-span-2">
        <AdminDashboardCard
          metrics={metrics}
          onViewDetails={onViewDetails}
          onExport={onExport}
          onRefresh={onRefresh}
          onMore={onMore}
        />
      </div>

      {/* Quick Stats and Controls - Right Column */}
      <div className="space-y-4">
        {/* Metric Selection */}
        <MetricSelectionCard
          value={selectedMetricId}
          onValueChange={onMetricSelect}
        />

        {/* Quick Stats */}
        <Card className="bg-admin-panel border border-[var(--admin-border-soft)] shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-[var(--admin-text-primary)]">Quick Stats</CardTitle>
            <CardDescription className="text-[var(--admin-text-primary)]-muted">Key performance indicators</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {/* Revenue Stats */}
            <div className="flex items-center justify-between p-3 bg-[var(--admin-surface)] rounded-lg border border-[var(--admin-border-soft)] hover:bg-[var(--admin-card-bg)] transition-colors">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-green-500 flex-shrink-0" />
                <div>
                  <div className="text-sm font-medium text-[var(--admin-text-primary)]">Total Revenue</div>
                  <div className="text-xs text-[var(--admin-text-primary)]-muted">All time</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-[var(--admin-text-primary)]">
                  ${metrics.totalRevenue.toLocaleString()}
                </div>
                <div className="text-xs text-green-500 font-medium">+12.5%</div>
              </div>
            </div>

            {/* User Stats */}
            <div className="flex items-center justify-between p-3 bg-[var(--admin-surface)] rounded-lg border border-[var(--admin-border-soft)] hover:bg-[var(--admin-card-bg)] transition-colors">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-blue-500 flex-shrink-0" />
                <div>
                  <div className="text-sm font-medium text-[var(--admin-text-primary)]">Active Users</div>
                  <div className="text-xs text-[var(--admin-text-primary)]-muted">Currently online</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-[var(--admin-text-primary)]">
                  {metrics.activeUsers.toLocaleString()}
                </div>
                <div className="text-xs text-green-500 font-medium">+8.2%</div>
              </div>
            </div>

            {/* Content Stats */}
            <div className="flex items-center justify-between p-3 bg-[var(--admin-surface)] rounded-lg border border-[var(--admin-border-soft)] hover:bg-[var(--admin-card-bg)] transition-colors">
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4 text-purple-500 flex-shrink-0" />
                <div>
                  <div className="text-sm font-medium text-[var(--admin-text-primary)]">Content Views</div>
                  <div className="text-xs text-[var(--admin-text-primary)]-muted">This month</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-[var(--admin-text-primary)]">
                  {metrics.contentViews.toLocaleString()}
                </div>
                <div className="text-xs text-green-500 font-medium">+15.3%</div>
              </div>
            </div>

            {/* Conversion Stats */}
            <div className="flex items-center justify-between p-3 bg-[var(--admin-surface)] rounded-lg border border-[var(--admin-border-soft)] hover:bg-[var(--admin-card-bg)] transition-colors">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-orange-500 flex-shrink-0" />
                <div>
                  <div className="text-sm font-medium text-[var(--admin-text-primary)]">Conversion Rate</div>
                  <div className="text-xs text-[var(--admin-text-primary)]-muted">Overall</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-[var(--admin-text-primary)]">
                  {metrics.conversionRate}%
                </div>
                <div className="text-xs text-red-500 font-medium">-0.5%</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* System Status */}
        <Card className="bg-admin-panel border border-[var(--admin-border-soft)] shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-[var(--admin-text-primary)]">System Status</CardTitle>
            <CardDescription className="text-[var(--admin-text-primary)]-muted">Platform health indicators</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {/* System Health */}
            <div className="flex items-center justify-between p-2 bg-[var(--admin-surface)] rounded-lg border border-[var(--admin-border-soft)] hover:bg-[var(--admin-card-bg)] transition-colors">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-green-500 flex-shrink-0" />
                <span className="text-sm font-medium text-[var(--admin-text-primary)]">System Health</span>
              </div>
              <div className="text-sm font-bold text-green-500">
                {metrics.systemHealth}%
              </div>
            </div>

            {/* Response Time */}
            <div className="flex items-center justify-between p-2 bg-[var(--admin-surface)] rounded-lg border border-[var(--admin-border-soft)] hover:bg-[var(--admin-card-bg)] transition-colors">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-blue-500 flex-shrink-0" />
                <span className="text-sm font-medium text-[var(--admin-text-primary)]">Response Time</span>
              </div>
              <div className="text-sm font-bold text-[var(--admin-text-primary)]">
                {metrics.responseTime}ms
              </div>
            </div>

            {/* Content Moderation */}
            <div className="flex items-center justify-between p-2 bg-[var(--admin-surface)] rounded-lg border border-[var(--admin-border-soft)] hover:bg-[var(--admin-card-bg)] transition-colors">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-500 flex-shrink-0" />
                <span className="text-sm font-medium text-[var(--admin-text-primary)]">Pending Moderation</span>
              </div>
              <div className="text-sm font-bold text-[var(--admin-text-primary)]">
                {metrics.contentModeration}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-admin-panel border border-[var(--admin-border-soft)] shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-[var(--admin-text-primary)]">Quick Actions</CardTitle>
            <CardDescription className="text-[var(--admin-text-primary)]-muted">Common admin tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <button
              onClick={onViewDetails}
              className="w-full flex items-center gap-2 p-3 text-sm font-medium text-[var(--admin-text-primary)] hover:bg-[var(--admin-surface)] rounded-lg border border-[var(--admin-border-soft)] transition-colors"
            >
              <BarChart3 className="h-4 w-4 text-[var(--brand)]" />
              View Detailed Analytics
            </button>
            <button
              onClick={onExport}
              className="w-full flex items-center gap-2 p-3 text-sm font-medium text-[var(--admin-text-primary)] hover:bg-[var(--admin-surface)] rounded-lg border border-[var(--admin-border-soft)] transition-colors"
            >
              <TrendingUp className="h-4 w-4 text-[var(--brand)]" />
              Export Report
            </button>
            <button
              onClick={onRefresh}
              className="w-full flex items-center gap-2 p-3 text-sm font-medium text-[var(--admin-text-primary)] hover:bg-[var(--admin-surface)] rounded-lg border border-[var(--admin-border-soft)] transition-colors"
            >
              <Activity className="h-4 w-4 text-[var(--brand)]" />
              Refresh Data
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
