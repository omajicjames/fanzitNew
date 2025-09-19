"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@src/components/ui/card";
import { Badge } from "@src/components/ui/badge";
import { Button } from "@src/components/ui/button";
import { Input } from "@src/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@src/components/ui/tabs";
import { 
  MessageSquare, 
  Search, 
  Filter, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  Users, 
  Activity,
  BarChart3,
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
  Upload
} from "lucide-react";

export default function CannedResponsesPage() {
  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Canned Responses</h1>
            <p className="text-neutral-400">Manage pre-written responses for common support scenarios and macros</p>
          </div>
          <Badge className="bg-orange-500 text-white">Support Admin</Badge>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-2">Response Library Overview</h2>
        <p className="text-neutral-400 mb-6">Template usage, performance metrics, and response management</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-neutral-800 border border-neutral-700 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-400 uppercase tracking-wide">Total Templates</p>
                <p className="text-2xl font-bold text-white">42</p>
                <div className="flex items-center gap-1 text-sm text-blue-500">
                  <MessageSquare className="h-4 w-4" />
                  +8.2% from last week
                </div>
              </div>
              <MessageSquare className="h-8 w-8 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-neutral-800 border border-neutral-700 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-400 uppercase tracking-wide">Used Today</p>
                <p className="text-2xl font-bold text-white">156</p>
                <div className="flex items-center gap-1 text-sm text-green-500">
                  <CheckCircle className="h-4 w-4" />
                  +12.5% from yesterday
                </div>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </div>
          
          <div className="bg-neutral-800 border border-neutral-700 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-400 uppercase tracking-wide">Avg Usage</p>
                <p className="text-2xl font-bold text-white">3.7</p>
                <div className="flex items-center gap-1 text-sm text-purple-500">
                  <TrendingUp className="h-4 w-4" />
                  +5.2% from last week
                </div>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-500" />
            </div>
          </div>
          
          <div className="bg-neutral-800 border border-neutral-700 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-400 uppercase tracking-wide">Categories</p>
                <p className="text-2xl font-bold text-white">8</p>
                <div className="flex items-center gap-1 text-sm text-orange-500">
                  <FileText className="h-4 w-4" />
                  +1 new this week
                </div>
              </div>
              <FileText className="h-8 w-8 text-orange-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Response Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="bg-neutral-800 border-neutral-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-green-500" />
              Usage Trends
            </CardTitle>
            <CardDescription className="text-neutral-400">Template usage patterns and performance metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-neutral-900/50 rounded-lg">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 text-neutral-400 mx-auto mb-2" />
                <p className="text-neutral-400">Usage trends chart</p>
                <p className="text-sm text-neutral-500">Line chart showing template usage patterns</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-neutral-800 border-neutral-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Activity className="h-5 w-5 text-blue-500" />
              Category Distribution
            </CardTitle>
            <CardDescription className="text-neutral-400">Response templates by category and usage frequency</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-neutral-900/50 rounded-lg">
              <div className="text-center">
                <Activity className="h-12 w-12 text-neutral-400 mx-auto mb-2" />
                <p className="text-neutral-400">Category distribution chart</p>
                <p className="text-sm text-neutral-500">Pie chart showing category breakdown</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Actions */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
          <Input 
            placeholder="Search responses by title, category, or content..."
            className="pl-10 bg-neutral-800 border-neutral-700 text-white"
          />
        </div>
        <Button variant="outline" className="flex items-center gap-2 bg-neutral-800 border-neutral-700 text-white hover:bg-neutral-700">
          <Filter className="h-4 w-4" />
          Filters
        </Button>
        <Button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white">
          <Plus className="h-4 w-4" />
          New Response
        </Button>
        <Button variant="outline" className="flex items-center gap-2 bg-neutral-800 border-neutral-700 text-white hover:bg-neutral-700">
          <Download className="h-4 w-4" />
          Export
        </Button>
      </div>

      {/* Response Tabs */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5 bg-neutral-800 border-neutral-700">
          <TabsTrigger value="all" className="data-[state=active]:bg-neutral-700 data-[state=active]:text-white text-neutral-400">All Responses</TabsTrigger>
          <TabsTrigger value="general" className="data-[state=active]:bg-neutral-700 data-[state=active]:text-white text-neutral-400">General</TabsTrigger>
          <TabsTrigger value="billing" className="data-[state=active]:bg-neutral-700 data-[state=active]:text-white text-neutral-400">Billing</TabsTrigger>
          <TabsTrigger value="technical" className="data-[state=active]:bg-neutral-700 data-[state=active]:text-white text-neutral-400">Technical</TabsTrigger>
          <TabsTrigger value="account" className="data-[state=active]:bg-neutral-700 data-[state=active]:text-white text-neutral-400">Account</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="space-y-4">
            {/* Sample response items */}
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
                        <p className="text-sm text-neutral-400">Category: General • Usage: 245 times • Last used: 2 hours ago</p>
                      </div>
                    </div>
                    <div className="mt-2 p-3 bg-neutral-700/50 rounded text-sm text-neutral-300">
                      Hi there! Welcome to our support center. How can I help you today?
                    </div>
                    <div className="flex items-center gap-2 mt-3">
                      <Badge className="bg-blue-500 text-white">General</Badge>
                      <Badge variant="outline" className="bg-neutral-700 border-neutral-600 text-neutral-300">High Usage</Badge>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 ml-4">
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                      <Copy className="h-4 w-4 mr-1" />
                      Copy
                    </Button>
                    <Button variant="outline" size="sm" className="bg-neutral-700 border-neutral-600 text-white hover:bg-neutral-600">
                      <Eye className="h-4 w-4 mr-1" />
                      View
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
                        <p className="text-sm text-neutral-400">Category: Billing • Usage: 189 times • Last used: 1 hour ago</p>
                      </div>
                    </div>
                    <div className="mt-2 p-3 bg-neutral-700/50 rounded text-sm text-neutral-300">
                      I understand you're having trouble with your payment. Let me help you resolve this issue. 
                      Could you please provide your transaction ID so I can investigate further?
                    </div>
                    <div className="flex items-center gap-2 mt-3">
                      <Badge className="bg-green-500 text-white">Billing</Badge>
                      <Badge variant="outline" className="bg-neutral-700 border-neutral-600 text-neutral-300">Medium Usage</Badge>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 ml-4">
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                      <Copy className="h-4 w-4 mr-1" />
                      Copy
                    </Button>
                    <Button variant="outline" size="sm" className="bg-neutral-700 border-neutral-600 text-white hover:bg-neutral-600">
                      <Eye className="h-4 w-4 mr-1" />
                      View
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
                        <p className="text-sm text-neutral-400">Category: Technical • Usage: 156 times • Last used: 30 minutes ago</p>
                      </div>
                    </div>
                    <div className="mt-2 p-3 bg-neutral-700/50 rounded text-sm text-neutral-300">
                      Let's try some basic troubleshooting steps. First, please clear your browser cache 
                      and cookies, then restart your browser. If the issue persists, let me know what device and browser you're using.
                    </div>
                    <div className="flex items-center gap-2 mt-3">
                      <Badge className="bg-purple-500 text-white">Technical</Badge>
                      <Badge variant="outline" className="bg-neutral-700 border-neutral-600 text-neutral-300">Medium Usage</Badge>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 ml-4">
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                      <Copy className="h-4 w-4 mr-1" />
                      Copy
                    </Button>
                    <Button variant="outline" size="sm" className="bg-neutral-700 border-neutral-600 text-white hover:bg-neutral-600">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="general" className="space-y-4">
          <div className="text-center py-8">
            <MessageSquare className="h-12 w-12 text-blue-500 mx-auto mb-4" />
            <p className="text-neutral-400">General response templates will be displayed here</p>
          </div>
        </TabsContent>

        <TabsContent value="billing" className="space-y-4">
          <div className="text-center py-8">
            <MessageSquare className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <p className="text-neutral-400">Billing response templates will be displayed here</p>
          </div>
        </TabsContent>

        <TabsContent value="technical" className="space-y-4">
          <div className="text-center py-8">
            <MessageSquare className="h-12 w-12 text-purple-500 mx-auto mb-4" />
            <p className="text-neutral-400">Technical response templates will be displayed here</p>
          </div>
        </TabsContent>

        <TabsContent value="account" className="space-y-4">
          <div className="text-center py-8">
            <MessageSquare className="h-12 w-12 text-orange-500 mx-auto mb-4" />
            <p className="text-neutral-400">Account response templates will be displayed here</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}