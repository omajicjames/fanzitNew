"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@src/components/ui/card";
import { Badge } from "@src/components/ui/badge";
import { Button } from "@src/components/ui/button";
import { Input } from "@src/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@src/components/ui/tabs";
import { 
  Ticket, 
  Search, 
  Filter, 
  Plus, 
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
  MoreHorizontal
} from "lucide-react";

export default function TicketQueuePage() {
  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Ticket Queue</h1>
            <p className="text-neutral-400">Manage and respond to user support tickets</p>
          </div>
          <Badge className="bg-orange-500 text-white">Support Admin</Badge>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-2">Queue Overview</h2>
        <p className="text-neutral-400 mb-6">Ticket status, priority distribution, and response metrics</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-neutral-800 border border-neutral-700 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-400 uppercase tracking-wide">Open Tickets</p>
                <p className="text-2xl font-bold text-white">24</p>
                <div className="flex items-center gap-1 text-sm text-blue-500">
                  <Ticket className="h-4 w-4" />
                  +12.5% from last week
                </div>
              </div>
              <Ticket className="h-8 w-8 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-neutral-800 border border-neutral-700 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-400 uppercase tracking-wide">High Priority</p>
                <p className="text-2xl font-bold text-white">8</p>
                <div className="flex items-center gap-1 text-sm text-red-500">
                  <AlertTriangle className="h-4 w-4" />
                  Requires attention
                </div>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          </div>
          
          <div className="bg-neutral-800 border border-neutral-700 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-400 uppercase tracking-wide">Avg Response</p>
                <p className="text-2xl font-bold text-white">2.4h</p>
                <div className="flex items-center gap-1 text-sm text-green-500">
                  <Clock className="h-4 w-4" />
                  -15.3% from last week
                </div>
              </div>
              <Clock className="h-8 w-8 text-green-500" />
            </div>
          </div>
          
          <div className="bg-neutral-800 border border-neutral-700 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-400 uppercase tracking-wide">Resolved Today</p>
                <p className="text-2xl font-bold text-white">18</p>
                <div className="flex items-center gap-1 text-sm text-purple-500">
                  <CheckCircle className="h-4 w-4" />
                  +8.2% from yesterday
                </div>
              </div>
              <CheckCircle className="h-8 w-8 text-purple-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Queue Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="bg-neutral-800 border-neutral-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-green-500" />
              Ticket Volume Trends
            </CardTitle>
            <CardDescription className="text-neutral-400">Daily ticket volume and resolution rates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-neutral-900/50 rounded-lg">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 text-neutral-400 mx-auto mb-2" />
                <p className="text-neutral-400">Ticket volume chart</p>
                <p className="text-sm text-neutral-500">Line chart showing daily ticket trends</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-neutral-800 border-neutral-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Activity className="h-5 w-5 text-blue-500" />
              Priority Distribution
            </CardTitle>
            <CardDescription className="text-neutral-400">Ticket priority breakdown and distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-neutral-900/50 rounded-lg">
              <div className="text-center">
                <Activity className="h-12 w-12 text-neutral-400 mx-auto mb-2" />
                <p className="text-neutral-400">Priority distribution chart</p>
                <p className="text-sm text-neutral-500">Pie chart showing priority breakdown</p>
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
            placeholder="Search tickets by ID, user, or subject..."
            className="pl-10 bg-neutral-800 border-neutral-700 text-white"
          />
        </div>
        <Button variant="outline" className="flex items-center gap-2 bg-neutral-800 border-neutral-700 text-white hover:bg-neutral-700">
          <Filter className="h-4 w-4" />
          Filters
        </Button>
        <Button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white">
          <Plus className="h-4 w-4" />
          New Ticket
        </Button>
      </div>

      {/* Ticket Tabs */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5 bg-neutral-800 border-neutral-700">
          <TabsTrigger value="all" className="data-[state=active]:bg-neutral-700 data-[state=active]:text-white text-neutral-400">All Tickets</TabsTrigger>
          <TabsTrigger value="open" className="data-[state=active]:bg-neutral-700 data-[state=active]:text-white text-neutral-400">Open</TabsTrigger>
          <TabsTrigger value="high" className="data-[state=active]:bg-neutral-700 data-[state=active]:text-white text-neutral-400">High Priority</TabsTrigger>
          <TabsTrigger value="assigned" className="data-[state=active]:bg-neutral-700 data-[state=active]:text-white text-neutral-400">Assigned</TabsTrigger>
          <TabsTrigger value="resolved" className="data-[state=active]:bg-neutral-700 data-[state=active]:text-white text-neutral-400">Resolved</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="space-y-4">
            {/* Sample ticket items */}
            <Card className="bg-neutral-800 border-neutral-700 hover:shadow-lg transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-white">Cannot access premium features</h3>
                      <p className="text-sm text-neutral-400">User #1234 • Ticket #T-2025-001 • 2 hours ago</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge className="bg-yellow-500 text-white">High Priority</Badge>
                        <Badge variant="outline" className="bg-neutral-700 border-neutral-600 text-neutral-300">Open</Badge>
                        <Badge variant="outline" className="bg-neutral-700 border-neutral-600 text-neutral-300">Payment</Badge>
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
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-white">Payment processing issue</h3>
                      <p className="text-sm text-neutral-400">User #5678 • Ticket #T-2025-002 • 4 hours ago</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge className="bg-blue-500 text-white">Medium Priority</Badge>
                        <Badge variant="outline" className="bg-neutral-700 border-neutral-600 text-neutral-300">Open</Badge>
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
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-white">Account verification request</h3>
                      <p className="text-sm text-neutral-400">User #9012 • Ticket #T-2025-003 • 6 hours ago</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge className="bg-green-500 text-white">Low Priority</Badge>
                        <Badge variant="outline" className="bg-neutral-700 border-neutral-600 text-neutral-300">In Progress</Badge>
                        <Badge variant="outline" className="bg-neutral-700 border-neutral-600 text-neutral-300">Verification</Badge>
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
          </div>
        </TabsContent>

        <TabsContent value="open" className="space-y-4">
          <div className="text-center py-8">
            <Ticket className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
            <p className="text-neutral-400">Open tickets will be displayed here</p>
          </div>
        </TabsContent>

        <TabsContent value="high" className="space-y-4">
          <div className="text-center py-8">
            <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <p className="text-neutral-400">High priority tickets will be displayed here</p>
          </div>
        </TabsContent>

        <TabsContent value="assigned" className="space-y-4">
          <div className="text-center py-8">
            <Users className="h-12 w-12 text-blue-500 mx-auto mb-4" />
            <p className="text-neutral-400">Assigned tickets will be displayed here</p>
          </div>
        </TabsContent>

        <TabsContent value="resolved" className="space-y-4">
          <div className="text-center py-8">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <p className="text-neutral-400">Resolved tickets will be displayed here</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}