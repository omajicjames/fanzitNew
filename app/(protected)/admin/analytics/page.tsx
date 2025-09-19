"use client";

import React from "react";
import { AdminPageTemplate, AdminCard, MetricCard } from "@src/components/admin/AdminPageTemplate";
import { AdminPillNavigationComponent } from "@src/components/admin/AdminPillNavigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@src/components/ui/card";
import { Badge } from "@src/components/ui/badge";
import { Button } from "@src/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@src/components/ui/tabs";
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Eye, 
  Heart, 
  MessageCircle, 
  DollarSign,
  Calendar,
  Download,
  Filter,
  RefreshCw,
  Clock
} from "lucide-react";

// ----------------------
// Analytics Page
// Location: /app/(protected)/analytics/page.tsx
// Purpose: Comprehensive analytics for OnlyFans-like platform
// Features: User analytics, content performance, revenue analytics, cohort analysis
// Note: Mobile-first design with object-oriented structure
// ----------------------

interface AnalyticsData {
  period: string;
  totalUsers: number;
  activeUsers: number;
  newUsers: number;
  totalRevenue: number;
  revenueGrowth: number;
  contentViews: number;
  contentLikes: number;
  contentComments: number;
  subscriptionCount: number;
  subscriptionGrowth: number;
  retentionRate: number;
  averageRevenuePerUser: number;
}

interface CohortData {
  cohort: string;
  size: number;
  retention: number[];
  revenue: number[];
}

class AnalyticsService {
  private analyticsData: AnalyticsData[] = [
    {
      period: '2025-01',
      totalUsers: 125847,
      activeUsers: 89432,
      newUsers: 15420,
      totalRevenue: 1250000,
      revenueGrowth: 15.3,
      contentViews: 2540000,
      contentLikes: 125000,
      contentComments: 45000,
      subscriptionCount: 45000,
      subscriptionGrowth: 12.5,
      retentionRate: 78.5,
      averageRevenuePerUser: 9.95
    },
    {
      period: '2024-12',
      totalUsers: 110427,
      activeUsers: 78932,
      newUsers: 12800,
      totalRevenue: 1085000,
      revenueGrowth: 8.7,
      contentViews: 2100000,
      contentLikes: 98000,
      contentComments: 38000,
      subscriptionCount: 40000,
      subscriptionGrowth: 5.2,
      retentionRate: 75.2,
      averageRevenuePerUser: 9.82
    }
  ];

  private cohortData: CohortData[] = [
    {
      cohort: '2024-01',
      size: 5000,
      retention: [100, 85, 78, 72, 68, 65, 62, 60, 58, 56, 54, 52],
      revenue: [0, 25000, 45000, 62000, 78000, 92000, 105000, 118000, 130000, 141000, 151000, 160000]
    },
    {
      cohort: '2024-02',
      size: 4800,
      retention: [100, 82, 75, 70, 66, 63, 60, 58, 56, 54, 52, 50],
      revenue: [0, 24000, 43000, 59000, 74000, 87000, 99000, 110000, 120000, 129000, 137000, 144000]
    }
  ];

  public getAnalyticsData(): AnalyticsData[] {
    return this.analyticsData;
  }

  public getCurrentAnalytics(): AnalyticsData {
    return this.analyticsData[0];
  }

  public getCohortData(): CohortData[] {
    return this.cohortData;
  }

  public getTopMetrics() {
    const current = this.getCurrentAnalytics();
    return {
      totalUsers: current.totalUsers,
      activeUsers: current.activeUsers,
      totalRevenue: current.totalRevenue,
      retentionRate: current.retentionRate
    };
  }
}


function CohortTableComponent({ cohortData }: { cohortData: CohortData[] }) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Cohort Analysis</CardTitle>
          <CardDescription>User retention and revenue by cohort</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Cohort</th>
                  <th className="text-right p-2">Size</th>
                  {Array.from({ length: 12 }, (_, i) => (
                    <th key={i} className="text-right p-2">Month {i + 1}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {cohortData.map((cohort, index) => (
                  <tr key={cohort.cohort} className="border-b">
                    <td className="p-2 font-medium">{cohort.cohort}</td>
                    <td className="text-right p-2">{cohort.size.toLocaleString()}</td>
                    {cohort.retention.map((rate, monthIndex) => (
                      <td key={monthIndex} className="text-right p-2">
                        <div className="flex flex-col">
                          <span className="font-medium">{rate}%</span>
                          <span className="text-xs text-muted-foreground">
                            ${cohort.revenue[monthIndex]?.toLocaleString() || '0'}
                          </span>
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    );
}

export default function AnalyticsPage() {
  const analyticsService = new AnalyticsService();
  const currentAnalytics = analyticsService.getCurrentAnalytics();
  const cohortData = analyticsService.getCohortData();

  const stats = (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <MetricCard
        title="Page Views"
        value={2540000}
        growth={18.5}
        icon={Eye}
        format="number"
      />
      <MetricCard
        title="Engagement Rate"
        value={78.5}
        growth={5.2}
        icon={Heart}
        format="percentage"
      />
      <MetricCard
        title="Conversion Rate"
        value={12.3}
        growth={2.1}
        icon={TrendingUp}
        format="percentage"
      />
      <MetricCard
        title="Avg. Session Time"
        value={4.2}
        growth={8.7}
        icon={Clock}
        format="number"
      />
    </div>
  );

  return (
    <AdminPageTemplate
      title="Analytics Dashboard"
      description="Platform performance and user insights"
      icon={<BarChart3 className="h-6 w-6" />}
      showSearch={false}
      showFilters={true}
      showRefresh={true}
      showExport={true}
      stats={stats}
    >

      {/* Analytics Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AdminCard
          title="Traffic Analytics"
          description="Page views and user sessions over time"
          icon={<BarChart3 className="h-5 w-5 text-green-500" />}
          variant="chart"
        >
          <div className="h-64 flex items-center justify-center bg-neutral-900/50 rounded-lg">
            <div className="text-center">
              <BarChart3 className="h-12 w-12 text-[var(--admin-text-secondary)] mx-auto mb-2" />
              <p className="text-[var(--admin-text-secondary)]">Traffic analytics chart</p>
              <p className="text-sm text-[var(--admin-text-secondary)]">Line chart showing daily page views</p>
            </div>
          </div>
        </AdminCard>

        <AdminCard
          title="Engagement Metrics"
          description="User engagement and interaction rates"
          icon={<TrendingUp className="h-5 w-5 text-blue-500" />}
          variant="chart"
        >
          <div className="h-64 flex items-center justify-center bg-neutral-900/50 rounded-lg">
            <div className="text-center">
              <TrendingUp className="h-12 w-12 text-[var(--admin-text-secondary)] mx-auto mb-2" />
              <p className="text-[var(--admin-text-secondary)]">Engagement metrics chart</p>
              <p className="text-sm text-[var(--admin-text-secondary)]">Bar chart showing engagement rates</p>
            </div>
          </div>
        </AdminCard>
      </div>

      {/* Analytics Data Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AdminCard
          title="Top Performing Content"
          description="Most viewed and engaged content"
          icon={<Users className="h-5 w-5 text-purple-500" />}
          variant="data"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-[var(--admin-surface)]/50 rounded-lg">
              <div>
                <p className="text-[var(--admin-text-primary)] font-medium">Morning Workout Routine</p>
                <p className="text-sm text-[var(--admin-text-secondary)]">by sarah_fitness</p>
              </div>
              <div className="text-right">
                <p className="text-green-500 font-semibold">15.4K views</p>
                <p className="text-sm text-[var(--admin-text-secondary)]">+12.5%</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-[var(--admin-surface)]/50 rounded-lg">
              <div>
                <p className="text-[var(--admin-text-primary)] font-medium">Gourmet Pasta Recipe</p>
                <p className="text-sm text-[var(--admin-text-secondary)]">by chef_marco</p>
              </div>
              <div className="text-right">
                <p className="text-green-500 font-semibold">8.9K views</p>
                <p className="text-sm text-[var(--admin-text-secondary)]">+8.2%</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-[var(--admin-surface)]/50 rounded-lg">
              <div>
                <p className="text-[var(--admin-text-primary)] font-medium">Exclusive Behind-the-Scenes</p>
                <p className="text-sm text-[var(--admin-text-secondary)]">by sarah_fitness</p>
              </div>
              <div className="text-right">
                <p className="text-green-500 font-semibold">6.2K views</p>
                <p className="text-sm text-[var(--admin-text-secondary)]">+15.3%</p>
              </div>
            </div>
          </div>
        </AdminCard>

        <AdminCard
          title="User Activity"
          description="Recent user interactions and activity"
          icon={<MessageCircle className="h-5 w-5 text-orange-500" />}
          variant="data"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-[var(--admin-surface)]/50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <Users className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-[var(--admin-text-primary)] font-medium">New user registration</p>
                  <p className="text-sm text-[var(--admin-text-secondary)]">2 minutes ago</p>
                </div>
              </div>
              <Badge className="bg-green-500 text-white">+1</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-[var(--admin-surface)]/50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                  <Heart className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-[var(--admin-text-primary)] font-medium">Content liked</p>
                  <p className="text-sm text-[var(--admin-text-secondary)]">5 minutes ago</p>
                </div>
              </div>
              <Badge className="bg-blue-500 text-white">+1</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-[var(--admin-surface)]/50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                  <MessageCircle className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-[var(--admin-text-primary)] font-medium">New comment posted</p>
                  <p className="text-sm text-[var(--admin-text-secondary)]">8 minutes ago</p>
                </div>
              </div>
              <Badge className="bg-orange-500 text-white">+1</Badge>
            </div>
          </div>
        </AdminCard>
      </div>

      {/* Detailed Analytics Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="cohorts">Cohorts</TabsTrigger>
          <TabsTrigger value="funnels">Funnels</TabsTrigger>
          <TabsTrigger value="retention">Retention</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue Growth */}
            <AdminCard
              title="Revenue Growth"
              description="Monthly revenue trends"
              icon={<BarChart3 className="h-5 w-5 text-green-500" />}
              variant="chart"
            >
              <div className="h-64 flex items-center justify-center bg-neutral-900/50 rounded-lg">
                <div className="text-center">
                  <BarChart3 className="h-12 w-12 text-[var(--admin-text-secondary)] mx-auto mb-2" />
                  <p className="text-[var(--admin-text-secondary)]">Revenue chart placeholder</p>
                </div>
              </div>
            </AdminCard>

            {/* User Growth */}
            <AdminCard
              title="User Growth"
              description="New user acquisition"
              icon={<TrendingUp className="h-5 w-5 text-blue-500" />}
              variant="chart"
            >
              <div className="h-64 flex items-center justify-center bg-neutral-900/50 rounded-lg">
                <div className="text-center">
                  <TrendingUp className="h-12 w-12 text-[var(--admin-text-secondary)] mx-auto mb-2" />
                  <p className="text-[var(--admin-text-secondary)]">User growth chart placeholder</p>
                </div>
              </div>
            </AdminCard>

            {/* Content Performance */}
            <AdminCard
              title="Content Performance"
              description="Views, likes, and engagement"
              icon={<Eye className="h-5 w-5 text-purple-500" />}
              variant="data"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4 text-blue-600" />
                    <span className="text-sm text-[var(--admin-text-primary)]">Total Views</span>
                  </div>
                  <span className="font-semibold text-[var(--admin-text-primary)]">{currentAnalytics.contentViews.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Heart className="h-4 w-4 text-red-600" />
                    <span className="text-sm text-[var(--admin-text-primary)]">Total Likes</span>
                  </div>
                  <span className="font-semibold text-[var(--admin-text-primary)]">{currentAnalytics.contentLikes.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MessageCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-[var(--admin-text-primary)]">Total Comments</span>
                  </div>
                  <span className="font-semibold text-[var(--admin-text-primary)]">{currentAnalytics.contentComments.toLocaleString()}</span>
                </div>
              </div>
            </AdminCard>

            {/* Subscription Analytics */}
            <AdminCard
              title="Subscription Analytics"
              description="Subscription metrics and growth"
              icon={<DollarSign className="h-5 w-5 text-green-500" />}
              variant="data"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[var(--admin-text-primary)]">Active Subscriptions</span>
                  <span className="font-semibold text-[var(--admin-text-primary)]">{currentAnalytics.subscriptionCount.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[var(--admin-text-primary)]">Growth Rate</span>
                  <span className="font-semibold text-green-600">+{currentAnalytics.subscriptionGrowth}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[var(--admin-text-primary)]">ARPU</span>
                  <span className="font-semibold text-[var(--admin-text-primary)]">${currentAnalytics.averageRevenuePerUser}</span>
                </div>
              </div>
            </AdminCard>
          </div>
        </TabsContent>

        <TabsContent value="cohorts" className="space-y-4">
          <CohortTableComponent cohortData={cohortData} />
        </TabsContent>

        <TabsContent value="funnels" className="space-y-4">
          <AdminCard
            title="Conversion Funnels"
            description="User journey and conversion rates"
            icon={<BarChart3 className="h-5 w-5 text-orange-500" />}
            variant="chart"
          >
            <div className="h-64 flex items-center justify-center bg-neutral-900/50 rounded-lg">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 text-[var(--admin-text-secondary)] mx-auto mb-2" />
                <p className="text-[var(--admin-text-secondary)]">Funnel analysis chart placeholder</p>
              </div>
            </div>
          </AdminCard>
        </TabsContent>

        <TabsContent value="retention" className="space-y-4">
          <AdminCard
            title="Retention Analysis"
            description="User retention patterns and trends"
            icon={<TrendingUp className="h-5 w-5 text-purple-500" />}
            variant="chart"
          >
            <div className="h-64 flex items-center justify-center bg-neutral-900/50 rounded-lg">
              <div className="text-center">
                <TrendingUp className="h-12 w-12 text-[var(--admin-text-secondary)] mx-auto mb-2" />
                <p className="text-[var(--admin-text-secondary)]">Retention analysis chart placeholder</p>
              </div>
            </div>
          </AdminCard>
        </TabsContent>
      </Tabs>
    </AdminPageTemplate>
  );
}