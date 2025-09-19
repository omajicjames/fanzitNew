"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@src/components/ui/card";
import { Badge } from "@src/components/ui/badge";
import { Button } from "@src/components/ui/button";
import { Input } from "@src/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@src/components/ui/tabs";
import { 
  TrendingUp, 
  Search, 
  Filter, 
  Clock, 
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
  Shield,
  DollarSign,
  FileText
} from "lucide-react";

export default function EscalationsPage() {
  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Escalations</h1>
            <p className="text-neutral-400">Manage escalated tickets requiring senior support and specialized attention</p>
          </div>
          <Badge className="bg-orange-500 text-white">Support Admin</Badge>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-2">Escalation Overview</h2>
        <p className="text-neutral-400 mb-6">Escalated tickets, response times, and resolution metrics</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-neutral-800 border border-neutral-700 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-400 uppercase tracking-wide">Active Escalations</p>
                <p className="text-2xl font-bold text-white">7</p>
                <div className="flex items-center gap-1 text-sm text-orange-500">
                  <TrendingUp className="h-4 w-4" />
                  +8.2% from last week
                </div>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-500" />
            </div>
          </div>
          
          <div className="bg-neutral-800 border border-neutral-700 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-400 uppercase tracking-wide">Critical Issues</p>
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
                <p className="text-sm font-medium text-neutral-400 uppercase tracking-wide">Avg Resolution</p>
                <p className="text-2xl font-bold text-white">4.2h</p>
                <div className="flex items-center gap-1 text-sm text-green-500">
                  <Clock className="h-4 w-4" />
                  -12.5% from last week
                </div>
              </div>
              <Clock className="h-8 w-8 text-green-500" />
            </div>
          </div>
          
          <div className="bg-neutral-800 border border-neutral-700 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-400 uppercase tracking-wide">Resolved Today</p>
                <p className="text-2xl font-bold text-white">5</p>
                <div className="flex items-center gap-1 text-sm text-purple-500">
                  <CheckCircle className="h-4 w-4" />
                  +15.3% from yesterday
                </div>
              </div>
              <CheckCircle className="h-8 w-8 text-purple-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Escalation Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="bg-neutral-800 border-neutral-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-green-500" />
              Escalation Trends
            </CardTitle>
            <CardDescription className="text-neutral-400">Escalation volume and resolution trends over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-neutral-900/50 rounded-lg">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 text-neutral-400 mx-auto mb-2" />
                <p className="text-neutral-400">Escalation trends chart</p>
                <p className="text-sm text-neutral-500">Line chart showing escalation patterns</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-neutral-800 border-neutral-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Activity className="h-5 w-5 text-blue-500" />
              Department Distribution
            </CardTitle>
            <CardDescription className="text-neutral-400">Escalations by department and priority level</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-neutral-900/50 rounded-lg">
              <div className="text-center">
                <Activity className="h-12 w-12 text-neutral-400 mx-auto mb-2" />
                <p className="text-neutral-400">Department distribution chart</p>
                <p className="text-sm text-neutral-500">Pie chart showing escalation distribution</p>
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
            placeholder="Search escalations by ID, department, or issue..."
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

      {/* Escalation Tabs */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5 bg-neutral-800 border-neutral-700">
          <TabsTrigger value="all" className="data-[state=active]:bg-neutral-700 data-[state=active]:text-white text-neutral-400">All Escalations</TabsTrigger>
          <TabsTrigger value="critical" className="data-[state=active]:bg-neutral-700 data-[state=active]:text-white text-neutral-400">Critical</TabsTrigger>
          <TabsTrigger value="legal" className="data-[state=active]:bg-neutral-700 data-[state=active]:text-white text-neutral-400">Legal</TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-neutral-700 data-[state=active]:text-white text-neutral-400">Security</TabsTrigger>
          <TabsTrigger value="finance" className="data-[state=active]:bg-neutral-700 data-[state=active]:text-white text-neutral-400">Finance</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="space-y-4">
            {/* Sample escalation items */}
            <Card className="bg-neutral-800 border-neutral-700 hover:shadow-lg transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-white">Legal review required</h3>
                      <p className="text-sm text-neutral-400">Escalated from L1 • Ticket #T-2025-004 • 1 hour ago</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge className="bg-purple-500 text-white">Legal</Badge>
                        <Badge variant="outline" className="bg-neutral-700 border-neutral-600 text-neutral-300">High Priority</Badge>
                        <Badge variant="outline" className="bg-neutral-700 border-neutral-600 text-neutral-300">Pending Review</Badge>
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
                      Assign
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
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-white">Security incident</h3>
                      <p className="text-sm text-neutral-400">Escalated from L2 • Ticket #T-2025-005 • 3 hours ago</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge className="bg-red-500 text-white">Security</Badge>
                        <Badge variant="outline" className="bg-neutral-700 border-neutral-600 text-neutral-300">Critical</Badge>
                        <Badge variant="outline" className="bg-neutral-700 border-neutral-600 text-neutral-300">In Progress</Badge>
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
                      Update
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
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-white">Payment dispute</h3>
                      <p className="text-sm text-neutral-400">Escalated from L1 • Ticket #T-2025-006 • 5 hours ago</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge className="bg-blue-500 text-white">Finance</Badge>
                        <Badge variant="outline" className="bg-neutral-700 border-neutral-600 text-neutral-300">Medium Priority</Badge>
                        <Badge variant="outline" className="bg-neutral-700 border-neutral-600 text-neutral-300">Under Review</Badge>
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
                      Resolve
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
            <p className="text-neutral-400">Critical escalations will be displayed here</p>
          </div>
        </TabsContent>

        <TabsContent value="legal" className="space-y-4">
          <div className="text-center py-8">
            <FileText className="h-12 w-12 text-purple-500 mx-auto mb-4" />
            <p className="text-neutral-400">Legal escalations will be displayed here</p>
          </div>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <div className="text-center py-8">
            <Shield className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <p className="text-neutral-400">Security escalations will be displayed here</p>
          </div>
        </TabsContent>

        <TabsContent value="finance" className="space-y-4">
          <div className="text-center py-8">
            <DollarSign className="h-12 w-12 text-blue-500 mx-auto mb-4" />
            <p className="text-neutral-400">Finance escalations will be displayed here</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}