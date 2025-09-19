"use client";

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
  RefreshCw
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

class MetricCardComponent {
  private title: string;
  private value: number;
  private growth: number;
  private icon: React.ComponentType<any>;
  private format: 'number' | 'currency' | 'percentage';

  constructor(
    title: string, 
    value: number, 
    growth: number, 
    icon: React.ComponentType<any>,
    format: 'number' | 'currency' | 'percentage' = 'number'
  ) {
    this.title = title;
    this.value = value;
    this.growth = growth;
    this.icon = icon;
    this.format = format;
  }

  private formatValue(): string {
    switch (this.format) {
      case 'currency':
        return `$${this.value.toLocaleString()}`;
      case 'percentage':
        return `${this.value}%`;
      default:
        return this.value.toLocaleString();
    }
  }

  public render() {
    const Icon = this.icon;
    const isPositive = this.growth > 0;
    
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">{this.title}</p>
              <p className="text-2xl font-bold">{this.formatValue()}</p>
              <div className={`flex items-center gap-1 text-sm ${
                isPositive ? 'text-green-600' : 'text-red-600'
              }`}>
                {isPositive ? (
                  <TrendingUp className="h-4 w-4" />
                ) : (
                  <TrendingDown className="h-4 w-4" />
                )}
                {Math.abs(this.growth)}%
              </div>
            </div>
            <Icon className="h-8 w-8 text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
    );
  }
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
    <div className="space-y-6">
      {/* Header with Pills */}
      <div className="space-y-4">
        <div>
          <h1 className="text-3xl font-bold">Analytics</h1>
          <p className="text-muted-foreground">Platform performance and user insights</p>
        </div>
        <AdminPillNavigationComponent />
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Last 30 days
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
        <div className="flex-1" />
        <Button variant="outline" className="flex items-center gap-2">
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCardComponent
          title="Total Users"
          value={currentAnalytics.totalUsers}
          growth={12.5}
          icon={Users}
          format="number"
        />
        <MetricCardComponent
          title="Active Users"
          value={currentAnalytics.activeUsers}
          growth={8.3}
          icon={Eye}
          format="number"
        />
        <MetricCardComponent
          title="Total Revenue"
          value={currentAnalytics.totalRevenue}
          growth={currentAnalytics.revenueGrowth}
          icon={DollarSign}
          format="currency"
        />
        <MetricCardComponent
          title="Retention Rate"
          value={currentAnalytics.retentionRate}
          growth={3.3}
          icon={TrendingUp}
          format="percentage"
        />
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