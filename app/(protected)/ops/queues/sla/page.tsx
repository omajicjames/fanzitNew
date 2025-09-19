"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@src/components/ui/card";
import { Badge } from "@src/components/ui/badge";
import { Button } from "@src/components/ui/button";
import { Input } from "@src/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@src/components/ui/tabs";
import { 
  Clock, 
  Search, 
  Filter, 
  AlertTriangle, 
  CheckCircle, 
  Users, 
  MessageSquare,
  Activity,
  BarChart3,
  RefreshCw,
  Eye,
  Edit,
  MoreHorizontal,
  TrendingUp,
  TrendingDown,
  Timer
} from "lucide-react";

export default function SLABreachesPage() {
  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">SLA Breaches</h1>
            <p className="text-neutral-400">Monitor and manage tickets that have exceeded SLA targets</p>
          </div>
          <Badge className="bg-orange-500 text-white">Support Admin</Badge>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-2">SLA Performance Overview</h2>
        <p className="text-neutral-400 mb-6">SLA compliance, breach statistics, and response time metrics</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-neutral-800 border border-neutral-700 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-400 uppercase tracking-wide">Active Breaches</p>
                <p className="text-2xl font-bold text-white">3</p>
                <div className="flex items-center gap-1 text-sm text-red-500">
                  <AlertTriangle className="h-4 w-4" />
                  Requires immediate attention
                </div>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          </div>
          
          <div className="bg-neutral-800 border border-neutral-700 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-400 uppercase tracking-wide">SLA Compliance</p>
                <p className="text-2xl font-bold text-white">94.2%</p>
                <div className="flex items-center gap-1 text-sm text-green-500">
                  <TrendingUp className="h-4 w-4" />
                  +2.1% from last week
                </div>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </div>
          
          <div className="bg-neutral-800 border border-neutral-700 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-400 uppercase tracking-wide">Avg Response</p>
                <p className="text-2xl font-bold text-white">1.8h</p>
                <div className="flex items-center gap-1 text-sm text-blue-500">
                  <Clock className="h-4 w-4" />
                  -8.5% from last week
                </div>
              </div>
              <Clock className="h-8 w-8 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-neutral-800 border border-neutral-700 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-400 uppercase tracking-wide">Resolved Today</p>
                <p className="text-2xl font-bold text-white">42</p>
                <div className="flex items-center gap-1 text-sm text-purple-500">
                  <Timer className="h-4 w-4" />
                  +12.3% from yesterday
                </div>
              </div>
              <Timer className="h-8 w-8 text-purple-500" />
            </div>
          </div>
        </div>
      </div>

      {/* SLA Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="bg-neutral-800 border-neutral-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-green-500" />
              SLA Compliance Trends
            </CardTitle>
            <CardDescription className="text-neutral-400">SLA compliance rates and breach patterns over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-neutral-900/50 rounded-lg">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 text-neutral-400 mx-auto mb-2" />
                <p className="text-neutral-400">SLA compliance chart</p>
                <p className="text-sm text-neutral-500">Line chart showing compliance trends</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-neutral-800 border-neutral-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Activity className="h-5 w-5 text-blue-500" />
              Response Time Distribution
            </CardTitle>
            <CardDescription className="text-neutral-400">Response time distribution and breach analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-neutral-900/50 rounded-lg">
              <div className="text-center">
                <Activity className="h-12 w-12 text-neutral-400 mx-auto mb-2" />
                <p className="text-neutral-400">Response time chart</p>
                <p className="text-sm text-neutral-500">Histogram showing response time distribution</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
          <Input 
            placeholder="Search SLA breaches by ticket ID, user, or severity..."
            className="pl-10 bg-neutral-800 border-neutral-700 text-white"
          />
        </div>
        <Button variant="outline" className="flex items-center gap-2 bg-neutral-800 border-neutral-700 text-white hover:bg-neutral-700">
          <Filter className="h-4 w-4" />
          Filters
        </Button>
        <Button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white">
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
      </div>

      {/* SLA Breach Tabs */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 bg-neutral-800 border-neutral-700">
          <TabsTrigger value="all" className="data-[state=active]:bg-neutral-700 data-[state=active]:text-white text-neutral-400">All Breaches</TabsTrigger>
          <TabsTrigger value="critical" className="data-[state=active]:bg-neutral-700 data-[state=active]:text-white text-neutral-400">Critical</TabsTrigger>
          <TabsTrigger value="high" className="data-[state=active]:bg-neutral-700 data-[state=active]:text-white text-neutral-400">High</TabsTrigger>
          <TabsTrigger value="medium" className="data-[state=active]:bg-neutral-700 data-[state=active]:text-white text-neutral-400">Medium</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="space-y-4">
            {/* Sample SLA breach items */}
            <Card className="bg-neutral-800 border-neutral-700 hover:shadow-lg transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-white">Account suspension appeal</h3>
                      <p className="text-sm text-neutral-400">User #9012 • Ticket #T-2025-007 • Breached by 2h 15m</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge className="bg-red-500 text-white">Critical</Badge>
                        <Badge variant="outline" className="bg-neutral-700 border-neutral-600 text-neutral-300">SLA Breach</Badge>
                        <Badge variant="outline" className="bg-neutral-700 border-neutral-600 text-neutral-300">Account Issues</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="bg-neutral-700 border-neutral-600 text-white hover:bg-neutral-600">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button variant="outline" size="sm" className="bg-neutral-700 border-neutral-600 text-white hover:bg-neutral-600">
                      <Edit className="h-4 w-4 mr-1" />
                      Escalate
                    </Button>
                    <Button variant="outline" size="sm" className="bg-neutral-700 border-neutral-600 text-white hover:bg-neutral-600">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-neutral-800 border-neutral-700 hover:shadow-lg transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-white">Content removal request</h3>
                      <p className="text-sm text-neutral-400">User #3456 • Ticket #T-2025-008 • Breached by 45m</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge className="bg-orange-500 text-white">High</Badge>
                        <Badge variant="outline" className="bg-neutral-700 border-neutral-600 text-neutral-300">SLA Breach</Badge>
                        <Badge variant="outline" className="bg-neutral-700 border-neutral-600 text-neutral-300">Content Moderation</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="bg-neutral-700 border-neutral-600 text-white hover:bg-neutral-600">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button variant="outline" size="sm" className="bg-neutral-700 border-neutral-600 text-white hover:bg-neutral-600">
                      <Edit className="h-4 w-4 mr-1" />
                      Escalate
                    </Button>
                    <Button variant="outline" size="sm" className="bg-neutral-700 border-neutral-600 text-white hover:bg-neutral-600">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-neutral-800 border-neutral-700 hover:shadow-lg transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-white">Technical support request</h3>
                      <p className="text-sm text-neutral-400">User #7890 • Ticket #T-2025-009 • Breached by 15m</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge className="bg-yellow-500 text-white">Medium</Badge>
                        <Badge variant="outline" className="bg-neutral-700 border-neutral-600 text-neutral-300">SLA Breach</Badge>
                        <Badge variant="outline" className="bg-neutral-700 border-neutral-600 text-neutral-300">Technical</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="bg-neutral-700 border-neutral-600 text-white hover:bg-neutral-600">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button variant="outline" size="sm" className="bg-neutral-700 border-neutral-600 text-white hover:bg-neutral-600">
                      <Edit className="h-4 w-4 mr-1" />
                      Escalate
                    </Button>
                    <Button variant="outline" size="sm" className="bg-neutral-700 border-neutral-600 text-white hover:bg-neutral-600">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="critical" className="space-y-4">
          <div className="text-center py-8">
            <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <p className="text-neutral-400">Critical SLA breaches will be displayed here</p>
          </div>
        </TabsContent>

        <TabsContent value="high" className="space-y-4">
          <div className="text-center py-8">
            <TrendingUp className="h-12 w-12 text-orange-500 mx-auto mb-4" />
            <p className="text-neutral-400">High priority SLA breaches will be displayed here</p>
          </div>
        </TabsContent>

        <TabsContent value="medium" className="space-y-4">
          <div className="text-center py-8">
            <Clock className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
            <p className="text-neutral-400">Medium priority SLA breaches will be displayed here</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}