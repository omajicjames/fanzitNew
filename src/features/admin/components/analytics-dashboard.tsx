"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@src/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@src/components/ui/tabs"
import { Badge } from "@src/components/ui/badge"
import { Button } from "@src/components/ui/button"
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
} from "lucide-react"
import Image from "next/image"

export function AnalyticsDashboard() {
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

  const subscriptionTierData = [
    { name: "Basic", value: 45, color: "#8884d8" },
    { name: "Premium", value: 35, color: "#82ca9d" },
    { name: "VIP", value: 20, color: "#ffc658" },
  ]

  const topContent = [
    {
      id: 1,
      title: "Full Body HIIT Workout",
      type: "video",
      views: 12500,
      likes: 1247,
      revenue: 89.5,
      engagement: 92,
    },
    {
      id: 2,
      title: "Healthy Meal Prep Guide",
      type: "image",
      views: 8900,
      likes: 892,
      revenue: 67.2,
      engagement: 87,
    },
    {
      id: 3,
      title: "Morning Yoga Flow",
      type: "video",
      views: 7600,
      likes: 634,
      revenue: 45.8,
      engagement: 83,
    },
  ]

  const recentSubscribers = [
    {
      name: "Mike Johnson",
      avatar: "/user-profile-illustration.png",
      tier: "Premium",
      joinDate: "2 hours ago",
      revenue: 19.99,
    },
    {
      name: "Emma Davis",
      avatar: "/user-profile-illustration.png",
      tier: "Basic",
      joinDate: "5 hours ago",
      revenue: 9.99,
    },
    {
      name: "Alex Chen",
      avatar: "/user-profile-illustration.png",
      tier: "VIP",
      joinDate: "1 day ago",
      revenue: 49.99,
    },
  ]

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Analytics Dashboard</h1>
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

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">$12,847</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12.5%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Subscribers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">1,247</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+8.2%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">89,234</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+15.3%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">8.7%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+2.1%</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
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
        <Card>
          <CardHeader>
            <CardTitle>Weekly Engagement</CardTitle>
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
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="cohorts">Cohorts</TabsTrigger>
          <TabsTrigger value="funnels">Funnels</TabsTrigger>
          <TabsTrigger value="retention">Retention</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="space-y-6">
            {/* Platform-Wide Health Metrics */}
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
                    Daily Active Users
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Daily Active Creators</span>
                      <span className="text-2xl font-bold text-primary">1,247</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Daily Active Fans</span>
                      <span className="text-2xl font-bold text-primary">12,847</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Total Platform Users</span>
                      <span className="text-lg font-medium">45,392</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      <span className="text-green-600">+8.2%</span> from last month
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* New Sign-ups and Top Earners */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>New Sign-ups (Last 30 Days)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">New Creators</span>
                      <span className="text-xl font-bold text-primary">234</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">New Fans</span>
                      <span className="text-xl font-bold text-primary">2,847</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Creator/Fan Ratio</span>
                      <span className="text-lg font-medium">1:12.2</span>
                    </div>
                    <Progress value={75} className="w-full" />
                    <div className="text-xs text-muted-foreground">
                      <span className="text-green-600">+15.3%</span> creator growth
                          </div>
                            </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
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

        <TabsContent value="cohorts" className="mt-6">
          <div className="space-y-6">
            {/* Creator Cohorts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  Creator Cohorts Analysis
                </CardTitle>
                <p className="text-sm text-muted-foreground">
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
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="text-sm font-medium text-muted-foreground mb-2">{cohort.month}</div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-xs">Total Creators</span>
                            <span className="text-sm font-medium">{cohort.creators}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-xs">Still Active</span>
                            <span className="text-sm font-medium text-green-600">{cohort.active}</span>
                </div>
                          <div className="flex justify-between">
                            <span className="text-xs">Revenue Generated</span>
                            <span className="text-sm font-medium text-primary">{cohort.revenue}</span>
                  </div>
                          <div className="flex justify-between">
                            <span className="text-xs">Retention Rate</span>
                            <span className="text-sm font-medium">{cohort.retention}</span>
                  </div>
                </div>
                  </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Fan Cohorts */}
              <Card>
                <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Heart className="h-5 w-5" />
                  Fan Cohorts Analysis
                </CardTitle>
                <p className="text-sm text-muted-foreground">
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
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="text-sm font-medium text-muted-foreground mb-2">{cohort.month}</div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-xs">Total Fans</span>
                            <span className="text-sm font-medium">{cohort.fans}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-xs">Still Active</span>
                            <span className="text-sm font-medium text-green-600">{cohort.active}</span>
                            </div>
                          <div className="flex justify-between">
                            <span className="text-xs">Total Spending</span>
                            <span className="text-sm font-medium text-primary">{cohort.spending}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-xs">Retention Rate</span>
                            <span className="text-sm font-medium">{cohort.retention}</span>
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
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  Fan Sign-up & Onboarding Funnel
                </CardTitle>
                <p className="text-sm text-muted-foreground">
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
                        <span className="text-sm font-medium">{funnel.step}</span>
                      <div className="flex items-center space-x-2">
                          <span className="text-sm text-muted-foreground">{funnel.users.toLocaleString()}</span>
                          <span className="text-sm font-semibold">{funnel.percentage}%</span>
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
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Crown className="h-5 w-5" />
                  Creator Application Funnel
                </CardTitle>
                <p className="text-sm text-muted-foreground">
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
                        <span className="text-sm font-medium">{funnel.step}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-muted-foreground">{funnel.users.toLocaleString()}</span>
                          <span className="text-sm font-semibold">{funnel.percentage}%</span>
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
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <DollarSign className="h-5 w-5" />
                  Overall Monetization Funnel
                </CardTitle>
                <p className="text-sm text-muted-foreground">
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
                        <span className="text-sm font-medium">{funnel.step}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-muted-foreground">{funnel.users.toLocaleString()}</span>
                          <span className="text-sm font-semibold">{funnel.percentage}%</span>
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
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Heart className="h-5 w-5" />
                  Platform-Wide Fan Retention
                </CardTitle>
                <p className="text-sm text-muted-foreground">
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
                      <div key={index} className="p-4 border rounded-lg text-center">
                        <div className="text-2xl font-bold mb-1">{retention.retention}%</div>
                        <div className="text-sm text-muted-foreground mb-2">{retention.period} Retention</div>
                        <div className="text-sm font-medium text-primary">{retention.spending}</div>
                        <div className="text-xs text-muted-foreground">Avg. Spending</div>
                      </div>
                    ))}
                </div>

                  <div className="space-y-4">
                    <h4 className="font-medium">Retention Trends</h4>
                <div className="space-y-3">
                      {[
                        { metric: "New Fan Retention (30 days)", value: 78.5, target: 80, status: "warning" },
                        { metric: "Repeat Purchase Rate", value: 45.2, target: 50, status: "warning" },
                        { metric: "Average Revenue Per User", value: 89.50, target: 100, status: "warning" },
                        { metric: "Churn Rate", value: 21.5, target: 20, status: "error" },
                      ].map((trend, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">{trend.metric}</span>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-semibold">{trend.value}%</span>
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
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Crown className="h-5 w-5" />
                  Creator Retention
                </CardTitle>
                <p className="text-sm text-muted-foreground">
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
                      <div key={index} className="p-4 border rounded-lg text-center">
                        <div className="text-2xl font-bold mb-1">{retention.retention}%</div>
                        <div className="text-sm text-muted-foreground mb-2">{retention.period} Retention</div>
                        <div className="text-sm font-medium text-primary">{retention.earnings}</div>
                        <div className="text-xs text-muted-foreground">Avg. Earnings</div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-medium">Creator Health Metrics</h4>
                    <div className="space-y-3">
                      {[
                        { metric: "First Month Earnings > $100", value: 34.2, target: 50, status: "error" },
                        { metric: "Active Posting (Last 30 days)", value: 56.8, target: 70, status: "warning" },
                        { metric: "Creator Satisfaction Score", value: 7.2, target: 8.0, status: "warning" },
                        { metric: "Support Ticket Volume", value: 12.3, target: 10, status: "error" },
                      ].map((metric, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">{metric.metric}</span>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-semibold">{metric.value}%</span>
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
  )
}
