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

      {/* Detailed Analytics Tabs */}
      <Tabs defaultValue="content" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="content">Content Performance</TabsTrigger>
          <TabsTrigger value="subscribers">Subscribers</TabsTrigger>
          <TabsTrigger value="revenue">Revenue Breakdown</TabsTrigger>
          <TabsTrigger value="goals">Goals & Targets</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Content</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topContent.map((content) => (
                      <div key={content.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            {content.type === "video" ? (
                              <Play className="h-4 w-4 text-primary" />
                            ) : (
                              <Eye className="h-4 w-4 text-primary" />
                            )}
                          </div>
                          <div>
                            <h4 className="font-semibold">{content.title}</h4>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              <span>{content.views.toLocaleString()} views</span>
                              <span>{content.likes} likes</span>
                              <span>${content.revenue} revenue</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">{content.engagement}% engagement</div>
                          <Progress value={content.engagement} className="w-20 mt-1" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Content Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">342</div>
                  <p className="text-sm text-muted-foreground">Total Posts</p>
                </div>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-lg font-semibold">89.2K</div>
                    <p className="text-xs text-muted-foreground">Total Views</p>
                  </div>
                  <div>
                    <div className="text-lg font-semibold">12.5K</div>
                    <p className="text-xs text-muted-foreground">Total Likes</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Videos</span>
                    <span>156 (45.6%)</span>
                  </div>
                  <Progress value={45.6} />
                  <div className="flex justify-between text-sm">
                    <span>Images</span>
                    <span>186 (54.4%)</span>
                  </div>
                  <Progress value={54.4} />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="subscribers" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Subscribers</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-96">
                    <div className="space-y-4">
                      {recentSubscribers.map((subscriber, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <img
                              src={subscriber.avatar || "/placeholder.svg"}
                              alt={subscriber.name}
                              className="h-10 w-10 rounded-full"
                            />
                            <div>
                              <h4 className="font-semibold">{subscriber.name}</h4>
                              <p className="text-sm text-muted-foreground">{subscriber.joinDate}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge variant="outline">{subscriber.tier}</Badge>
                            <p className="text-sm font-medium text-green-600 mt-1">${subscriber.revenue}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Subscription Tiers</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={subscriptionTierData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {subscriptionTierData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-2 mt-4">
                  {subscriptionTierData.map((tier) => (
                    <div key={tier.name} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: tier.color }} />
                        <span className="text-sm">{tier.name}</span>
                      </div>
                      <span className="text-sm font-medium">{tier.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="revenue" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Sources</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span>Subscriptions</span>
                    <span className="font-semibold">$8,247 (64.2%)</span>
                  </div>
                  <Progress value={64.2} />
                  <div className="flex items-center justify-between">
                    <span>Pay-per-view</span>
                    <span className="font-semibold">$3,420 (26.6%)</span>
                  </div>
                  <Progress value={26.6} />
                  <div className="flex items-center justify-between">
                    <span>Tips & Gifts</span>
                    <span className="font-semibold">$1,180 (9.2%)</span>
                  </div>
                  <Progress value={9.2} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Monthly Targets</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span>Revenue Goal</span>
                    <span className="font-semibold">$12,847 / $15,000</span>
                  </div>
                  <Progress value={85.6} />
                  <div className="flex items-center justify-between">
                    <span>Subscriber Goal</span>
                    <span className="font-semibold">1,247 / 1,500</span>
                  </div>
                  <Progress value={83.1} />
                  <div className="flex items-center justify-between">
                    <span>Content Goal</span>
                    <span className="font-semibold">28 / 30 posts</span>
                  </div>
                  <Progress value={93.3} />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="goals" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5" />
                  <span>Monthly Goals</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Revenue Target</span>
                    <Badge variant="secondary">85.6% Complete</Badge>
                  </div>
                  <Progress value={85.6} />
                  <p className="text-sm text-muted-foreground">$12,847 of $15,000 goal</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">New Subscribers</span>
                    <Badge variant="secondary">83.1% Complete</Badge>
                  </div>
                  <Progress value={83.1} />
                  <p className="text-sm text-muted-foreground">1,247 of 1,500 goal</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Content Posts</span>
                    <Badge variant="default">93.3% Complete</Badge>
                  </div>
                  <Progress value={93.3} />
                  <p className="text-sm text-muted-foreground">28 of 30 posts goal</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                  <div className="flex items-center space-x-2 mb-2">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <span className="font-medium text-green-800 dark:text-green-200">Strong Performance</span>
                  </div>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    Your engagement rate is 15% higher than the platform average
                  </p>
                </div>

                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center space-x-2 mb-2">
                    <Crown className="h-4 w-4 text-blue-600" />
                    <span className="font-medium text-blue-800 dark:text-blue-200">Premium Growth</span>
                  </div>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    Premium subscribers increased by 23% this month
                  </p>
                </div>

                <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
                  <div className="flex items-center space-x-2 mb-2">
                    <MessageCircle className="h-4 w-4 text-orange-600" />
                    <span className="font-medium text-orange-800 dark:text-orange-200">Engagement Opportunity</span>
                  </div>
                  <p className="text-sm text-orange-700 dark:text-orange-300">
                    Consider posting more interactive content to boost comments
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
