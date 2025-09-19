"use client";

import React from "react";
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

interface MetricCardProps {
  title: string;
  value: number;
  growth: number;
  icon: React.ComponentType<any>;
  format?: 'number' | 'currency' | 'percentage';
}

function MetricCardComponent({ title, value, growth, icon: Icon, format = 'number' }: MetricCardProps) {
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
  
  return (
    <Card className="bg-neutral-800 border-neutral-700">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-neutral-400 uppercase tracking-wide">{title}</p>
            <p className="text-2xl font-bold text-white">{formatValue()}</p>
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
          <Icon className="h-8 w-8 text-neutral-400" />
        </div>
      </CardContent>
    </Card>
  );
}

class CohortTableComponent {
  private cohortData: CohortData[];

  constructor(cohortData: CohortData[]) {
    this.cohortData = cohortData;
  }

  public render() {
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
                {this.cohortData.map((cohort, index) => (
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
}

export default function AnalyticsPage() {
  const analyticsService = new AnalyticsService();
  const currentAnalytics = analyticsService.getCurrentAnalytics();
  const cohortData = analyticsService.getCohortData();

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Analytics Dashboard</h1>
            <p className="text-neutral-400">Platform performance and user insights</p>
          </div>
          <Badge className="bg-orange-500 text-white">Super Admin</Badge>
        </div>
      </div>

      {/* Analytics Overview Metrics */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-2">Analytics Overview</h2>
        <p className="text-neutral-400 mb-6">Platform performance and user insights</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCardComponent
            title="Page Views"
            value={2540000}
            growth={18.5}
            icon={Eye}
            format="number"
          />
          <MetricCardComponent
            title="Engagement Rate"
            value={78.5}
            growth={5.2}
            icon={Heart}
            format="percentage"
          />
          <MetricCardComponent
            title="Conversion Rate"
            value={12.3}
            growth={2.1}
            icon={TrendingUp}
            format="percentage"
          />
          <MetricCardComponent
            title="Avg. Session Time"
            value={4.2}
            growth={8.7}
            icon={Clock}
            format="number"
          />
        </div>
      </div>

      {/* Analytics Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-neutral-800 border-neutral-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-green-500" />
              Traffic Analytics
            </CardTitle>
            <CardDescription className="text-neutral-400">Page views and user sessions over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-neutral-900/50 rounded-lg">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 text-neutral-400 mx-auto mb-2" />
                <p className="text-neutral-400">Traffic analytics chart</p>
                <p className="text-sm text-neutral-500">Line chart showing daily page views</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-neutral-800 border-neutral-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-500" />
              Engagement Metrics
            </CardTitle>
            <CardDescription className="text-neutral-400">User engagement and interaction rates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-neutral-900/50 rounded-lg">
              <div className="text-center">
                <TrendingUp className="h-12 w-12 text-neutral-400 mx-auto mb-2" />
                <p className="text-neutral-400">Engagement metrics chart</p>
                <p className="text-sm text-neutral-500">Bar chart showing engagement rates</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Data Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-neutral-800 border-neutral-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Users className="h-5 w-5 text-purple-500" />
              Top Performing Content
            </CardTitle>
            <CardDescription className="text-neutral-400">Most viewed and engaged content</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-neutral-700/50 rounded-lg">
                <div>
                  <p className="text-white font-medium">Morning Workout Routine</p>
                  <p className="text-sm text-neutral-400">by sarah_fitness</p>
                </div>
                <div className="text-right">
                  <p className="text-green-500 font-semibold">15.4K views</p>
                  <p className="text-sm text-neutral-400">+12.5%</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-neutral-700/50 rounded-lg">
                <div>
                  <p className="text-white font-medium">Gourmet Pasta Recipe</p>
                  <p className="text-sm text-neutral-400">by chef_marco</p>
                </div>
                <div className="text-right">
                  <p className="text-green-500 font-semibold">8.9K views</p>
                  <p className="text-sm text-neutral-400">+8.2%</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-neutral-700/50 rounded-lg">
                <div>
                  <p className="text-white font-medium">Exclusive Behind-the-Scenes</p>
                  <p className="text-sm text-neutral-400">by sarah_fitness</p>
                </div>
                <div className="text-right">
                  <p className="text-green-500 font-semibold">6.2K views</p>
                  <p className="text-sm text-neutral-400">+15.3%</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-neutral-800 border-neutral-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-orange-500" />
              User Activity
            </CardTitle>
            <CardDescription className="text-neutral-400">Recent user interactions and activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-neutral-700/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <Users className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-medium">New user registration</p>
                    <p className="text-sm text-neutral-400">2 minutes ago</p>
                  </div>
                </div>
                <Badge className="bg-green-500 text-white">+1</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-neutral-700/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                    <Heart className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Content liked</p>
                    <p className="text-sm text-neutral-400">5 minutes ago</p>
                  </div>
                </div>
                <Badge className="bg-blue-500 text-white">+1</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-neutral-700/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                    <MessageCircle className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-medium">New comment posted</p>
                    <p className="text-sm text-neutral-400">8 minutes ago</p>
                  </div>
                </div>
                <Badge className="bg-orange-500 text-white">+1</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
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
            <Card>
              <CardHeader>
                <CardTitle>Revenue Growth</CardTitle>
                <CardDescription>Monthly revenue trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-muted/20 rounded-lg">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">Revenue chart placeholder</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* User Growth */}
            <Card>
              <CardHeader>
                <CardTitle>User Growth</CardTitle>
                <CardDescription>New user acquisition</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-muted/20 rounded-lg">
                  <div className="text-center">
                    <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">User growth chart placeholder</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Content Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Content Performance</CardTitle>
                <CardDescription>Views, likes, and engagement</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4 text-blue-600" />
                      <span className="text-sm">Total Views</span>
                    </div>
                    <span className="font-semibold">{currentAnalytics.contentViews.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Heart className="h-4 w-4 text-red-600" />
                      <span className="text-sm">Total Likes</span>
                    </div>
                    <span className="font-semibold">{currentAnalytics.contentLikes.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MessageCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Total Comments</span>
                    </div>
                    <span className="font-semibold">{currentAnalytics.contentComments.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Subscription Analytics */}
            <Card>
              <CardHeader>
                <CardTitle>Subscription Analytics</CardTitle>
                <CardDescription>Subscription metrics and growth</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Active Subscriptions</span>
                    <span className="font-semibold">{currentAnalytics.subscriptionCount.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Growth Rate</span>
                    <span className="font-semibold text-green-600">+{currentAnalytics.subscriptionGrowth}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">ARPU</span>
                    <span className="font-semibold">${currentAnalytics.averageRevenuePerUser}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="cohorts" className="space-y-4">
          <CohortTableComponent cohortData={cohortData} />
        </TabsContent>

        <TabsContent value="funnels" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Conversion Funnels</CardTitle>
              <CardDescription>User journey and conversion rates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-muted/20 rounded-lg">
                <div className="text-center">
                  <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">Funnel analysis chart placeholder</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="retention" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Retention Analysis</CardTitle>
              <CardDescription>User retention patterns and trends</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-muted/20 rounded-lg">
                <div className="text-center">
                  <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">Retention analysis chart placeholder</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}