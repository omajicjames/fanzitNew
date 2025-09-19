"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@src/components/ui/card";
import { Badge } from "@src/components/ui/badge";
import { Button } from "@src/components/ui/button";
import { Input } from "@src/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@src/components/ui/tabs";
import { 
  Flag, 
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
  TrendingUp,
  FileText,
  Shield,
  XCircle,
  Trash2
} from "lucide-react";

export default function FlaggedPostsPage() {
  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Flagged Posts</h1>
            <p className="text-neutral-400">Review and moderate flagged content and community reports</p>
          </div>
          <Badge className="bg-orange-500 text-white">Support Admin</Badge>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-2">Moderation Overview</h2>
        <p className="text-neutral-400 mb-6">Content moderation, flag statistics, and review metrics</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-neutral-800 border border-neutral-700 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-400 uppercase tracking-wide">Pending Review</p>
                <p className="text-2xl font-bold text-white">12</p>
                <div className="flex items-center gap-1 text-sm text-blue-500">
                  <Clock className="h-4 w-4" />
                  +5.2% from last week
                </div>
              </div>
              <Clock className="h-8 w-8 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-neutral-800 border border-neutral-700 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-400 uppercase tracking-wide">Approved Today</p>
                <p className="text-2xl font-bold text-white">8</p>
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
                <p className="text-sm font-medium text-neutral-400 uppercase tracking-wide">Removed Today</p>
                <p className="text-2xl font-bold text-white">4</p>
                <div className="flex items-center gap-1 text-sm text-red-500">
                  <Trash2 className="h-4 w-4" />
                  -8.2% from yesterday
                </div>
              </div>
              <Trash2 className="h-8 w-8 text-red-500" />
            </div>
          </div>
          
          <div className="bg-neutral-800 border border-neutral-700 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-400 uppercase tracking-wide">Avg Review Time</p>
                <p className="text-2xl font-bold text-white">1.2h</p>
                <div className="flex items-center gap-1 text-sm text-purple-500">
                  <TrendingUp className="h-4 w-4" />
                  -18.5% from last week
                </div>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Moderation Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="bg-neutral-800 border-neutral-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-green-500" />
              Flag Trends
            </CardTitle>
            <CardDescription className="text-neutral-400">Content flagging trends and moderation patterns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-neutral-900/50 rounded-lg">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 text-neutral-400 mx-auto mb-2" />
                <p className="text-neutral-400">Flag trends chart</p>
                <p className="text-sm text-neutral-500">Line chart showing flagging patterns</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-neutral-800 border-neutral-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Activity className="h-5 w-5 text-blue-500" />
              Violation Types
            </CardTitle>
            <CardDescription className="text-neutral-400">Content violation breakdown and category distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-neutral-900/50 rounded-lg">
              <div className="text-center">
                <Activity className="h-12 w-12 text-neutral-400 mx-auto mb-2" />
                <p className="text-neutral-400">Violation types chart</p>
                <p className="text-sm text-neutral-500">Pie chart showing violation categories</p>
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
            placeholder="Search flagged posts by content, user, or violation type..."
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

      {/* Moderation Tabs */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 bg-neutral-800 border-neutral-700">
          <TabsTrigger value="all" className="data-[state=active]:bg-neutral-700 data-[state=active]:text-white text-neutral-400">All Posts</TabsTrigger>
          <TabsTrigger value="pending" className="data-[state=active]:bg-neutral-700 data-[state=active]:text-white text-neutral-400">Pending</TabsTrigger>
          <TabsTrigger value="approved" className="data-[state=active]:bg-neutral-700 data-[state=active]:text-white text-neutral-400">Approved</TabsTrigger>
          <TabsTrigger value="removed" className="data-[state=active]:bg-neutral-700 data-[state=active]:text-white text-neutral-400">Removed</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="space-y-4">
            {/* Sample flagged post items */}
            <Card className="bg-neutral-800 border-neutral-700 hover:shadow-lg transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-neutral-700 rounded-full flex items-center justify-center">
                        <Flag className="h-5 w-5 text-red-500" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">Inappropriate content in fitness post</h3>
                        <p className="text-sm text-neutral-400">Post by @fitnessguru123 • Flagged for: Spam, Misleading content • 2 hours ago</p>
                      </div>
                    </div>
                    <p className="text-sm text-neutral-300 mb-4 line-clamp-2">
                      Check out this amazing workout routine that will transform your body in just 7 days! 
                      No diet, no exercise needed! Click the link below...
                    </p>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-red-500 text-white">Spam</Badge>
                      <Badge className="bg-orange-500 text-white">Misleading</Badge>
                      <Badge variant="outline" className="bg-neutral-700 border-neutral-600 text-neutral-300">Fitness</Badge>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 ml-4">
                    <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Approve
                    </Button>
                    <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white">
                      <Trash2 className="h-4 w-4 mr-1" />
                      Remove
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
                        <Flag className="h-5 w-5 text-orange-500" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">Harassment in comment section</h3>
                        <p className="text-sm text-neutral-400">Post by @user456 • Flagged for: Harassment, Hate speech • 4 hours ago</p>
                      </div>
                    </div>
                    <p className="text-sm text-neutral-300 mb-4 line-clamp-2">
                      This user keeps posting negative comments on my workout videos and sending 
                      me threatening messages. Please help.
                    </p>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-red-500 text-white">Harassment</Badge>
                      <Badge className="bg-red-500 text-white">Hate Speech</Badge>
                      <Badge variant="outline" className="bg-neutral-700 border-neutral-600 text-neutral-300">Comments</Badge>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 ml-4">
                    <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Approve
                    </Button>
                    <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white">
                      <Trash2 className="h-4 w-4 mr-1" />
                      Remove
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
                        <Flag className="h-5 w-5 text-yellow-500" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">Copyright infringement</h3>
                        <p className="text-sm text-neutral-400">Post by @contentcreator789 • Flagged for: Copyright, DMCA • 6 hours ago</p>
                      </div>
                    </div>
                    <p className="text-sm text-neutral-300 mb-4 line-clamp-2">
                      This post contains copyrighted music without permission. The user has been 
                      notified but continues to post similar content.
                    </p>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-yellow-500 text-white">Copyright</Badge>
                      <Badge className="bg-yellow-500 text-white">DMCA</Badge>
                      <Badge variant="outline" className="bg-neutral-700 border-neutral-600 text-neutral-300">Music</Badge>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 ml-4">
                    <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Approve
                    </Button>
                    <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white">
                      <Trash2 className="h-4 w-4 mr-1" />
                      Remove
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

        <TabsContent value="pending" className="space-y-4">
          <div className="text-center py-8">
            <Clock className="h-12 w-12 text-blue-500 mx-auto mb-4" />
            <p className="text-neutral-400">Pending review posts will be displayed here</p>
          </div>
        </TabsContent>

        <TabsContent value="approved" className="space-y-4">
          <div className="text-center py-8">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <p className="text-neutral-400">Approved posts will be displayed here</p>
          </div>
        </TabsContent>

        <TabsContent value="removed" className="space-y-4">
          <div className="text-center py-8">
            <Trash2 className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <p className="text-neutral-400">Removed posts will be displayed here</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}