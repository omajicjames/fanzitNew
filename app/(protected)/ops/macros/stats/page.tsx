"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@src/components/ui/card";
import { Badge } from "@src/components/ui/badge";
import { Button } from "@src/components/ui/button";
import { Input } from "@src/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@src/components/ui/tabs";
import { 
  BarChart3, 
  Search, 
  Filter, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  Users, 
  Activity,
  RefreshCw,
  Eye,
  Edit,
  MoreHorizontal,
  TrendingUp,
  FileText,
  Shield,
  XCircle,
  Copy,
  Plus,
  Download,
  Upload,
  MessageSquare,
  Target,
  Zap
} from "lucide-react";

export default function MacrosStatsPage() {
  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Macro Statistics</h1>
            <p className="text-neutral-400">Analytics and performance metrics for canned responses and macros</p>
          </div>
          <Badge className="bg-orange-500 text-white">Support Admin</Badge>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-2">Macro Performance Overview</h2>
        <p className="text-neutral-400 mb-6">Usage statistics, efficiency metrics, and performance analytics</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-neutral-800 border border-neutral-700 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-400 uppercase tracking-wide">Total Usage</p>
                <p className="text-2xl font-bold text-white">2,847</p>
                <div className="flex items-center gap-1 text-sm text-blue-500">
                  <MessageSquare className="h-4 w-4" />
                  +18.2% from last week
                </div>
              </div>
              <MessageSquare className="h-8 w-8 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-neutral-800 border border-neutral-700 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-400 uppercase tracking-wide">Time Saved</p>
                <p className="text-2xl font-bold text-white">127h</p>
                <div className="flex items-center gap-1 text-sm text-green-500">
                  <Clock className="h-4 w-4" />
                  +22.5% from last week
                </div>
              </div>
              <Clock className="h-8 w-8 text-green-500" />
            </div>
          </div>
          
          <div className="bg-neutral-800 border border-neutral-700 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-400 uppercase tracking-wide">Efficiency Rate</p>
                <p className="text-2xl font-bold text-white">94.2%</p>
                <div className="flex items-center gap-1 text-sm text-purple-500">
                  <Target className="h-4 w-4" />
                  +5.2% from last week
                </div>
              </div>
              <Target className="h-8 w-8 text-purple-500" />
            </div>
          </div>
          
          <div className="bg-neutral-800 border border-neutral-700 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-400 uppercase tracking-wide">Avg Response Time</p>
                <p className="text-2xl font-bold text-white">2.3m</p>
                <div className="flex items-center gap-1 text-sm text-orange-500">
                  <Zap className="h-4 w-4" />
                  -12.5% from last week
                </div>
              </div>
              <Zap className="h-8 w-8 text-orange-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Macro Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="bg-neutral-800 border-neutral-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-green-500" />
              Usage Trends
            </CardTitle>
            <CardDescription className="text-neutral-400">Macro usage patterns and performance over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-neutral-900/50 rounded-lg">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 text-neutral-400 mx-auto mb-2" />
                <p className="text-neutral-400">Usage trends chart</p>
                <p className="text-sm text-neutral-500">Line chart showing macro usage patterns</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-neutral-800 border-neutral-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Activity className="h-5 w-5 text-blue-500" />
              Category Performance
            </CardTitle>
            <CardDescription className="text-neutral-400">Macro performance by category and efficiency metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-neutral-900/50 rounded-lg">
              <div className="text-center">
                <Activity className="h-12 w-12 text-neutral-400 mx-auto mb-2" />
                <p className="text-neutral-400">Category performance chart</p>
                <p className="text-sm text-neutral-500">Bar chart showing category efficiency</p>
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
            placeholder="Search macro statistics by name, category, or performance..."
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

      {/* Macro Stats Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 bg-neutral-800 border-neutral-700">
          <TabsTrigger value="overview" className="data-[state=active]:bg-neutral-700 data-[state=active]:text-white text-neutral-400">Overview</TabsTrigger>
          <TabsTrigger value="performance" className="data-[state=active]:bg-neutral-700 data-[state=active]:text-white text-neutral-400">Performance</TabsTrigger>
          <TabsTrigger value="usage" className="data-[state=active]:bg-neutral-700 data-[state=active]:text-white text-neutral-400">Usage</TabsTrigger>
          <TabsTrigger value="efficiency" className="data-[state=active]:bg-neutral-700 data-[state=active]:text-white text-neutral-400">Efficiency</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="space-y-4">
            {/* Sample macro stats items */}
            <Card className="bg-neutral-800 border-neutral-700 hover:shadow-lg transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-neutral-700 rounded-full flex items-center justify-center">
                        <MessageSquare className="h-5 w-5 text-blue-500" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">Welcome Message</h3>
                        <p className="text-sm text-neutral-400">Category: General • Usage: 245 times • Efficiency: 98.2%</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mt-4">
                      <div className="text-center p-3 bg-neutral-700/50 rounded-lg">
                        <div className="text-2xl font-bold text-white">245</div>
                        <div className="text-sm text-neutral-400">Total Uses</div>
                      </div>
                      <div className="text-center p-3 bg-neutral-700/50 rounded-lg">
                        <div className="text-2xl font-bold text-white">98.2%</div>
                        <div className="text-sm text-neutral-400">Efficiency</div>
                      </div>
                      <div className="text-center p-3 bg-neutral-700/50 rounded-lg">
                        <div className="text-2xl font-bold text-white">12.5h</div>
                        <div className="text-sm text-neutral-400">Time Saved</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-3">
                      <Badge className="bg-blue-500 text-white">High Performance</Badge>
                      <Badge variant="outline" className="bg-neutral-700 border-neutral-600 text-neutral-300">General</Badge>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 ml-4">
                    <Button variant="outline" size="sm" className="bg-neutral-700 border-neutral-600 text-white hover:bg-neutral-600">
                      <Eye className="h-4 w-4 mr-1" />
                      View Details
                    </Button>
                    <Button variant="outline" size="sm" className="bg-neutral-700 border-neutral-600 text-white hover:bg-neutral-600">
                      <BarChart3 className="h-4 w-4 mr-1" />
                      Analytics
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-neutral-800 border-neutral-700 hover:shadow-lg transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-neutral-700 rounded-full flex items-center justify-center">
                        <MessageSquare className="h-5 w-5 text-green-500" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">Payment Issue Resolution</h3>
                        <p className="text-sm text-neutral-400">Category: Billing • Usage: 189 times • Efficiency: 95.8%</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mt-4">
                      <div className="text-center p-3 bg-neutral-700/50 rounded-lg">
                        <div className="text-2xl font-bold text-white">189</div>
                        <div className="text-sm text-neutral-400">Total Uses</div>
                      </div>
                      <div className="text-center p-3 bg-neutral-700/50 rounded-lg">
                        <div className="text-2xl font-bold text-white">95.8%</div>
                        <div className="text-sm text-neutral-400">Efficiency</div>
                      </div>
                      <div className="text-center p-3 bg-neutral-700/50 rounded-lg">
                        <div className="text-2xl font-bold text-white">9.2h</div>
                        <div className="text-sm text-neutral-400">Time Saved</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-3">
                      <Badge className="bg-green-500 text-white">High Performance</Badge>
                      <Badge variant="outline" className="bg-neutral-700 border-neutral-600 text-neutral-300">Billing</Badge>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 ml-4">
                    <Button variant="outline" size="sm" className="bg-neutral-700 border-neutral-600 text-white hover:bg-neutral-600">
                      <Eye className="h-4 w-4 mr-1" />
                      View Details
                    </Button>
                    <Button variant="outline" size="sm" className="bg-neutral-700 border-neutral-600 text-white hover:bg-neutral-600">
                      <BarChart3 className="h-4 w-4 mr-1" />
                      Analytics
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-neutral-800 border-neutral-700 hover:shadow-lg transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-neutral-700 rounded-full flex items-center justify-center">
                        <MessageSquare className="h-5 w-5 text-purple-500" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">Technical Troubleshooting</h3>
                        <p className="text-sm text-neutral-400">Category: Technical • Usage: 156 times • Efficiency: 92.1%</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mt-4">
                      <div className="text-center p-3 bg-neutral-700/50 rounded-lg">
                        <div className="text-2xl font-bold text-white">156</div>
                        <div className="text-sm text-neutral-400">Total Uses</div>
                      </div>
                      <div className="text-center p-3 bg-neutral-700/50 rounded-lg">
                        <div className="text-2xl font-bold text-white">92.1%</div>
                        <div className="text-sm text-neutral-400">Efficiency</div>
                      </div>
                      <div className="text-center p-3 bg-neutral-700/50 rounded-lg">
                        <div className="text-2xl font-bold text-white">7.8h</div>
                        <div className="text-sm text-neutral-400">Time Saved</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-3">
                      <Badge className="bg-purple-500 text-white">Good Performance</Badge>
                      <Badge variant="outline" className="bg-neutral-700 border-neutral-600 text-neutral-300">Technical</Badge>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 ml-4">
                    <Button variant="outline" size="sm" className="bg-neutral-700 border-neutral-600 text-white hover:bg-neutral-600">
                      <Eye className="h-4 w-4 mr-1" />
                      View Details
                    </Button>
                    <Button variant="outline" size="sm" className="bg-neutral-700 border-neutral-600 text-white hover:bg-neutral-600">
                      <BarChart3 className="h-4 w-4 mr-1" />
                      Analytics
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="text-center py-8">
            <BarChart3 className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <p className="text-neutral-400">Performance analytics will be displayed here</p>
          </div>
        </TabsContent>

        <TabsContent value="usage" className="space-y-4">
          <div className="text-center py-8">
            <Activity className="h-12 w-12 text-blue-500 mx-auto mb-4" />
            <p className="text-neutral-400">Usage statistics will be displayed here</p>
          </div>
        </TabsContent>

        <TabsContent value="efficiency" className="space-y-4">
          <div className="text-center py-8">
            <Target className="h-12 w-12 text-purple-500 mx-auto mb-4" />
            <p className="text-neutral-400">Efficiency metrics will be displayed here</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

