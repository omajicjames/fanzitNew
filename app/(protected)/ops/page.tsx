"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@src/components/ui/card";
import { Badge } from "@src/components/ui/badge";
import { Button } from "@src/components/ui/button";
import { 
  Ticket, 
  AlertTriangle, 
  TrendingUp, 
  Flag, 
  Clock, 
  CheckCircle, 
  Users, 
  MessageSquare,
  Activity,
  BarChart3,
  RefreshCw,
  Plus
} from "lucide-react";

export default function OpsDashboardPage() {
  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Support Operations</h1>
            <p className="text-neutral-400">Manage support tickets, escalations, and customer service operations</p>
          </div>
          <Badge className="bg-orange-500 text-white">Support Admin</Badge>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-2">Operations Overview</h2>
        <p className="text-neutral-400 mb-6">Support metrics, ticket status, and operational performance</p>
        
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
                <p className="text-sm font-medium text-neutral-400 uppercase tracking-wide">SLA Breaches</p>
                <p className="text-2xl font-bold text-white">3</p>
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
                <p className="text-sm font-medium text-neutral-400 uppercase tracking-wide">Escalations</p>
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
                <p className="text-sm font-medium text-neutral-400 uppercase tracking-wide">Flagged Items</p>
                <p className="text-2xl font-bold text-white">12</p>
                <div className="flex items-center gap-1 text-sm text-purple-500">
                  <Flag className="h-4 w-4" />
                  +5.2% from last week
                </div>
              </div>
              <Flag className="h-8 w-8 text-purple-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Operations Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="bg-neutral-800 border-neutral-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-green-500" />
              Ticket Volume Trends
            </CardTitle>
            <CardDescription className="text-neutral-400">Support ticket volume and resolution trends</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-neutral-900/50 rounded-lg">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 text-neutral-400 mx-auto mb-2" />
                <p className="text-neutral-400">Ticket volume chart</p>
                <p className="text-sm text-neutral-500">Line chart showing ticket trends over time</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-neutral-800 border-neutral-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Activity className="h-5 w-5 text-blue-500" />
              Response Time Analytics
            </CardTitle>
            <CardDescription className="text-neutral-400">Average response times and SLA performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-neutral-900/50 rounded-lg">
              <div className="text-center">
                <Activity className="h-12 w-12 text-neutral-400 mx-auto mb-2" />
                <p className="text-neutral-400">Response time chart</p>
                <p className="text-sm text-neutral-500">Bar chart showing response time metrics</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="bg-neutral-800 border-neutral-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-orange-500" />
            Recent Activity
          </CardTitle>
          <CardDescription className="text-neutral-400">Latest support activities and updates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-neutral-700/50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div>
                  <p className="font-medium text-white">New ticket from user #1234</p>
                  <p className="text-sm text-neutral-400">Cannot access premium features • 2 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-yellow-500 text-white">High Priority</Badge>
                <Badge variant="outline" className="bg-neutral-700 border-neutral-600 text-neutral-300">Open</Badge>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-neutral-700/50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div>
                  <p className="font-medium text-white">Post flagged for review</p>
                  <p className="text-sm text-neutral-400">Content moderation • 15 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-blue-500 text-white">Medium Priority</Badge>
                <Badge variant="outline" className="bg-neutral-700 border-neutral-600 text-neutral-300">Pending</Badge>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-neutral-700/50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div>
                  <p className="font-medium text-white">KYC verification completed</p>
                  <p className="text-sm text-neutral-400">User verification • 1 hour ago</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-green-500 text-white">Completed</Badge>
                <Badge variant="outline" className="bg-neutral-700 border-neutral-600 text-neutral-300">Verified</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}