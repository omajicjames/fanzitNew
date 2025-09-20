"use client";

import { useState, useEffect } from "react";
import { AdminPageTemplate, MetricCard } from "@src/components/admin/AdminPageTemplate";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@src/components/ui/card";
import { Badge } from "@src/components/ui/badge";
import { Button } from "@src/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@src/components/ui/tabs";
import { Progress } from "@src/components/ui/progress";
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  CreditCard, 
  Banknote, 
  Search, 
  Filter,
  MoreHorizontal,
  Eye,
  Download,
  CheckCircle,
  Clock,
  AlertTriangle,
  Users,
  FileText,
  Calendar,
  PieChart,
  Star,
  Crown,
  FileImage,
  MapPin,
  Activity,
  Zap,
  Target,
  Award,
  Phone,
  Globe,
  Mail,
  Heart,
  Share2,
  ThumbsUp,
  ThumbsDown,
  Play,
  Pause,
  Volume2,
  VolumeX,
  ExternalLink,
  BadgeCheck,
  UserCheck,
  UserX,
  Building,
  RotateCcw,
  BarChart3,
  Settings,
  Ban,
  CheckSquare,
  XSquare,
  Reply,
  User,
  BarChart3 as BarChart3Icon,
  LineChart,
  PieChart as PieChartIcon
} from "lucide-react";

// ----------------------
// Financial Management Page
// Location: /app/(protected)/admin/finance/page.tsx
// Purpose: Comprehensive financial management with tabbed layout
// Features: Revenue tracking, payouts, taxes, subscription management
// Note: Follows analytics dashboard pattern with financial-specific content
// ----------------------

interface FinancialDashboardProps {
  defaultTab?: string;
}

// ----------------------
// Financial Dashboard Component
// Purpose: Main financial dashboard with tabbed layout
// Note: Follows analytics pattern with financial-specific content
// ----------------------
export function FinancialDashboard({ defaultTab = "overview" }: FinancialDashboardProps = {}) {
  const revenueData = [
    { month: "Jan", subscriptions: 4000, payPerView: 2400, tips: 800 },
    { month: "Feb", subscriptions: 3000, payPerView: 1398, tips: 600 },
    { month: "Mar", subscriptions: 5000, payPerView: 3800, tips: 1200 },
    { month: "Apr", subscriptions: 4500, payPerView: 3908, tips: 900 },
    { month: "May", subscriptions: 6000, payPerView: 4800, tips: 1500 },
    { month: "Jun", subscriptions: 7000, payPerView: 3800, tips: 1800 },
  ];

  const transactionData = [
    { day: "Mon", revenue: 1200, payouts: 800, fees: 120 },
    { day: "Tue", revenue: 1900, payouts: 1200, fees: 190 },
    { day: "Wed", revenue: 1600, payouts: 1000, fees: 160 },
    { day: "Thu", revenue: 2200, payouts: 1400, fees: 220 },
    { day: "Fri", revenue: 2800, payouts: 1800, fees: 280 },
    { day: "Sat", revenue: 3200, payouts: 2000, fees: 320 },
    { day: "Sun", revenue: 2400, payouts: 1500, fees: 240 },
  ];

  const paymentMethodData = [
    { name: "Stripe", value: 45, color: "#8884d8" },
    { name: "PayPal", value: 35, color: "#82ca9d" },
    { name: "Bank Transfer", value: 20, color: "#ffc658" },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Financial Dashboard</h1>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Last 30 Days
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Financial Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">$2,847,392</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+15.2%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Creator Payouts</CardTitle>
            <Banknote className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">$2,415,283</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12.8%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Platform Fees</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">$432,109</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+18.5%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Transactions</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">47</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-600">-5.2%</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Financial Analytics Tabs */}
      <Tabs defaultValue={defaultTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="payouts">Payouts</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="space-y-6">
            {/* Platform Financial Health */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <DollarSign className="h-5 w-5" />
                    Platform Revenue & Take Rate
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Total Platform Revenue</span>
                      <span className="text-2xl font-bold text-primary">$2,847,392</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Platform Take Rate</span>
                      <span className="text-xl font-semibold text-green-600">15.2%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Creator Payouts</span>
                      <span className="text-lg font-medium">$2,415,283</span>
                    </div>
                    <Progress value={15.2} className="w-full" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="h-5 w-5" />
                    Transaction Volume
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Total Transactions</span>
                      <span className="text-2xl font-bold text-primary">12,847</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Successful Transactions</span>
                      <span className="text-2xl font-bold text-primary">12,234</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Success Rate</span>
                      <span className="text-lg font-medium">95.2%</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      <span className="text-green-600">+2.1%</span> from last month
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Top Revenue Sources */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Sources (This Month)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Subscriptions</span>
                      <span className="text-xl font-bold text-primary">$1,847,392</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Pay-Per-View</span>
                      <span className="text-xl font-bold text-primary">$678,234</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Tips</span>
                      <span className="text-xl font-bold text-primary">$321,766</span>
                    </div>
                    <Progress value={75} className="w-full" />
                    <div className="text-xs text-muted-foreground">
                      <span className="text-green-600">+12.5%</span> subscription growth
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Crown className="h-5 w-5" />
                    Top Earning Creators (This Month)
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
                          <span className="text-sm font-medium">{creator.name}</span>
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

        <TabsContent value="revenue" className="mt-6">
          <div className="space-y-6">
            {/* Revenue Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <DollarSign className="h-5 w-5" />
                  Revenue Breakdown by Source
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Detailed breakdown of revenue streams and performance
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { source: "Subscriptions", amount: 1847392, percentage: 64.8, color: "bg-blue-500" },
                      { source: "Pay-Per-View", amount: 678234, percentage: 23.8, color: "bg-green-500" },
                      { source: "Tips", amount: 321766, percentage: 11.3, color: "bg-yellow-500" },
                    ].map((revenue, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="text-sm font-medium text-muted-foreground mb-2">{revenue.source}</div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-xs">Amount</span>
                            <span className="text-sm font-medium">${revenue.amount.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-xs">Percentage</span>
                            <span className="text-sm font-medium text-green-600">{revenue.percentage}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${revenue.color}`}
                              style={{ width: `${revenue.percentage}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Monthly Revenue Trends */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3Icon className="h-5 w-5" />
                  Monthly Revenue Trends
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Track revenue growth and seasonal patterns
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { month: "January", revenue: 2847392, growth: 15.2, status: "up" },
                    { month: "February", revenue: 2654321, growth: 8.7, status: "up" },
                    { month: "March", revenue: 2987654, growth: 12.5, status: "up" },
                    { month: "April", revenue: 3123456, growth: 4.5, status: "up" },
                    { month: "May", revenue: 2876543, growth: -7.9, status: "down" },
                    { month: "June", revenue: 3245678, growth: 12.8, status: "up" },
                  ].map((month, index) => (
                    <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                      <span className="text-sm font-medium">{month.month}</span>
                      <div className="flex items-center space-x-4">
                        <span className="text-sm font-semibold">${month.revenue.toLocaleString()}</span>
                        <Badge 
                          variant={month.status === "up" ? "default" : "destructive"}
                          className="text-xs"
                        >
                          {month.growth > 0 ? "+" : ""}{month.growth}%
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="payouts" className="mt-6">
          <div className="space-y-6">
            {/* Payout Status Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Banknote className="h-5 w-5" />
                  Payout Status Overview
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Track creator payouts and processing status
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {[
                      { status: "Completed", count: 1247, amount: 2415283, color: "text-green-600" },
                      { status: "Pending", count: 47, amount: 89432, color: "text-yellow-600" },
                      { status: "Processing", count: 23, amount: 45678, color: "text-blue-600" },
                      { status: "Failed", count: 8, amount: 12345, color: "text-red-600" },
                    ].map((payout, index) => (
                      <div key={index} className="p-4 border rounded-lg text-center">
                        <div className="text-2xl font-bold mb-1">{payout.count}</div>
                        <div className="text-sm text-muted-foreground mb-2">{payout.status}</div>
                        <div className={`text-sm font-medium ${payout.color}`}>
                          ${payout.amount.toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payout Methods */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CreditCard className="h-5 w-5" />
                  Payout Methods Distribution
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Breakdown of payout methods used by creators
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { method: "Bank Transfer", count: 856, percentage: 65.2, amount: 1847392 },
                    { method: "Stripe", count: 324, percentage: 24.7, amount: 678234 },
                    { method: "PayPal", count: 131, percentage: 10.1, amount: 321766 },
                  ].map((method, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{method.method}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-muted-foreground">{method.count} creators</span>
                          <span className="text-sm font-semibold">{method.percentage}%</span>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full bg-blue-500"
                          style={{ width: `${method.percentage}%` }}
                        />
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Total: ${method.amount.toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="mt-6">
          <div className="space-y-6">
            {/* Financial Health Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="h-5 w-5" />
                  Financial Health Metrics
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Key performance indicators for financial operations
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { metric: "Average Transaction Value", value: 221.50, target: 250, status: "warning" },
                      { metric: "Platform Take Rate", value: 15.2, target: 15, status: "good" },
                      { metric: "Payout Processing Time", value: 2.3, target: 2, status: "warning" },
                      { metric: "Transaction Success Rate", value: 95.2, target: 95, status: "good" },
                      { metric: "Chargeback Rate", value: 0.8, target: 1.0, status: "good" },
                      { metric: "Refund Rate", value: 3.2, target: 5.0, status: "good" },
                    ].map((metric, index) => (
                      <div key={index} className="p-4 border rounded-lg text-center">
                        <div className="text-2xl font-bold mb-1">{metric.value}{metric.metric.includes("Rate") ? "%" : metric.metric.includes("Time") ? " days" : "$"}</div>
                        <div className="text-sm text-muted-foreground mb-2">{metric.metric}</div>
                        <Badge 
                          variant={metric.status === "good" ? "default" : metric.status === "warning" ? "secondary" : "destructive"}
                          className="text-xs"
                        >
                          {metric.status === "good" ? "On Target" : metric.status === "warning" ? "Monitor" : "Needs Attention"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Revenue Forecasting */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5" />
                  Revenue Forecasting
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Projected revenue based on current trends and growth patterns
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { period: "Next Month", projected: 3123456, confidence: 85, trend: "up" },
                    { period: "Next Quarter", projected: 9876543, confidence: 78, trend: "up" },
                    { period: "Next 6 Months", projected: 18765432, confidence: 72, trend: "up" },
                    { period: "Next Year", projected: 36543210, confidence: 65, trend: "up" },
                  ].map((forecast, index) => (
                    <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                      <div>
                        <span className="text-sm font-medium">{forecast.period}</span>
                        <div className="text-xs text-muted-foreground">
                          {forecast.confidence}% confidence
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-semibold">${forecast.projected.toLocaleString()}</span>
                        <Badge variant="default" className="text-xs">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          {forecast.trend}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// ----------------------
// Financial Page Client Component
// Purpose: Manages state and interactions for the financial page
// ----------------------
function FinancialPageClient() {
  const [selectedTab, setSelectedTab] = useState("overview");

  const handleRefresh = () => {
    console.log('Refresh financial data');
  };

  const handleExport = () => {
    console.log('Export financial report');
  };

  const statsCards = (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard
        title="Total Revenue"
        value={2847392}
        growth={15.2}
        icon={DollarSign}
        format="currency"
      />
      <MetricCard
        title="Creator Payouts"
        value={2415283}
        growth={12.8}
        icon={Banknote}
        format="currency"
      />
      <MetricCard
        title="Platform Fees"
        value={432109}
        growth={18.5}
        icon={CreditCard}
        format="currency"
      />
      <MetricCard
        title="Pending Transactions"
        value={47}
        growth={-5.2}
        icon={Clock}
        format="number"
      />
    </div>
  );

  return (
    <AdminPageTemplate
      title="Financial Management"
      description="Track revenue, payouts, and financial analytics"
      icon={<DollarSign className="h-6 w-6" />}
      showSearch={false}
      showFilters={false}
      showRefresh={true}
      showExport={true}
      onRefresh={handleRefresh}
      onExport={handleExport}
      stats={statsCards}
    >
      <FinancialDashboard defaultTab={selectedTab} />
    </AdminPageTemplate>
  );
}

export default function FinancialManagementPage() {
  return <FinancialPageClient />;
}