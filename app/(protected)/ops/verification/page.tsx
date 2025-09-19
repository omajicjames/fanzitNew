"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@src/components/ui/card";
import { Badge } from "@src/components/ui/badge";
import { Button } from "@src/components/ui/button";
import { Input } from "@src/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@src/components/ui/tabs";
import { 
  UserCheck, 
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
  XCircle
} from "lucide-react";

export default function VerificationPage() {
  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">KYC / Creator Verification</h1>
            <p className="text-neutral-400">Review and approve creator verification requests and identity documents</p>
          </div>
          <Badge className="bg-orange-500 text-white">Support Admin</Badge>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-2">Verification Overview</h2>
        <p className="text-neutral-400 mb-6">Verification requests, approval rates, and processing metrics</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-neutral-800 border border-neutral-700 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-400 uppercase tracking-wide">Pending Reviews</p>
                <p className="text-2xl font-bold text-white">24</p>
                <div className="flex items-center gap-1 text-sm text-blue-500">
                  <Clock className="h-4 w-4" />
                  +8.2% from last week
                </div>
              </div>
              <Clock className="h-8 w-8 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-neutral-800 border border-neutral-700 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-400 uppercase tracking-wide">Approved Today</p>
                <p className="text-2xl font-bold text-white">18</p>
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
                <p className="text-sm font-medium text-neutral-400 uppercase tracking-wide">Rejected Today</p>
                <p className="text-2xl font-bold text-white">3</p>
                <div className="flex items-center gap-1 text-sm text-red-500">
                  <XCircle className="h-4 w-4" />
                  -5.2% from yesterday
                </div>
              </div>
              <XCircle className="h-8 w-8 text-red-500" />
            </div>
          </div>
          
          <div className="bg-neutral-800 border border-neutral-700 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-400 uppercase tracking-wide">Avg Processing</p>
                <p className="text-2xl font-bold text-white">2.4h</p>
                <div className="flex items-center gap-1 text-sm text-purple-500">
                  <TrendingUp className="h-4 w-4" />
                  -15.3% from last week
                </div>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Verification Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="bg-neutral-800 border-neutral-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-green-500" />
              Verification Trends
            </CardTitle>
            <CardDescription className="text-neutral-400">Daily verification requests and approval rates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-neutral-900/50 rounded-lg">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 text-neutral-400 mx-auto mb-2" />
                <p className="text-neutral-400">Verification trends chart</p>
                <p className="text-sm text-neutral-500">Line chart showing verification patterns</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-neutral-800 border-neutral-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Activity className="h-5 w-5 text-blue-500" />
              Document Status
            </CardTitle>
            <CardDescription className="text-neutral-400">Document verification status and completion rates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-neutral-900/50 rounded-lg">
              <div className="text-center">
                <Activity className="h-12 w-12 text-neutral-400 mx-auto mb-2" />
                <p className="text-neutral-400">Document status chart</p>
                <p className="text-sm text-neutral-500">Pie chart showing document verification status</p>
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
            placeholder="Search verifications by username, type, or status..."
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

      {/* Verification Tabs */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 bg-neutral-800 border-neutral-700">
          <TabsTrigger value="all" className="data-[state=active]:bg-neutral-700 data-[state=active]:text-white text-neutral-400">All Requests</TabsTrigger>
          <TabsTrigger value="pending" className="data-[state=active]:bg-neutral-700 data-[state=active]:text-white text-neutral-400">Pending</TabsTrigger>
          <TabsTrigger value="approved" className="data-[state=active]:bg-neutral-700 data-[state=active]:text-white text-neutral-400">Approved</TabsTrigger>
          <TabsTrigger value="rejected" className="data-[state=active]:bg-neutral-700 data-[state=active]:text-white text-neutral-400">Rejected</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="space-y-4">
            {/* Sample verification items */}
            <Card className="bg-neutral-800 border-neutral-700 hover:shadow-lg transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-neutral-700 rounded-full flex items-center justify-center">
                      <UserCheck className="h-6 w-6 text-blue-500" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-white">@fitnesscoach_sarah</h3>
                      <p className="text-sm text-neutral-400">Fitness Coach • Submitted 2 days ago • Documents: 3/3</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge className="bg-blue-500 text-white">ID Verified</Badge>
                        <Badge className="bg-yellow-500 text-white">Pending Address</Badge>
                        <Badge variant="outline" className="bg-neutral-700 border-neutral-600 text-neutral-300">Fitness Coach</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Approve
                    </Button>
                    <Button variant="outline" size="sm" className="bg-red-600 hover:bg-red-700 text-white">
                      <XCircle className="h-4 w-4 mr-1" />
                      Reject
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
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-neutral-700 rounded-full flex items-center justify-center">
                      <UserCheck className="h-6 w-6 text-green-500" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-white">@nutritionexpert_mike</h3>
                      <p className="text-sm text-neutral-400">Nutritionist • Submitted 1 day ago • Documents: 2/3</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge className="bg-green-500 text-white">ID Verified</Badge>
                        <Badge className="bg-green-500 text-white">Certification Verified</Badge>
                        <Badge variant="outline" className="bg-neutral-700 border-neutral-600 text-neutral-300">Nutritionist</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="bg-yellow-600 hover:bg-yellow-700 text-white">
                      <FileText className="h-4 w-4 mr-1" />
                      Request More
                    </Button>
                    <Button variant="outline" size="sm" className="bg-neutral-700 border-neutral-600 text-white hover:bg-neutral-600">
                      <Eye className="h-4 w-4 mr-1" />
                      View
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
                    <div className="w-12 h-12 bg-neutral-700 rounded-full flex items-center justify-center">
                      <UserCheck className="h-6 w-6 text-purple-500" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-white">@yogainstructor_anna</h3>
                      <p className="text-sm text-neutral-400">Yoga Instructor • Submitted 3 hours ago • Documents: 1/3</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge className="bg-orange-500 text-white">Pending ID</Badge>
                        <Badge className="bg-orange-500 text-white">Pending Certification</Badge>
                        <Badge variant="outline" className="bg-neutral-700 border-neutral-600 text-neutral-300">Yoga Instructor</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                      <Clock className="h-4 w-4 mr-1" />
                      Wait
                    </Button>
                    <Button variant="outline" size="sm" className="bg-neutral-700 border-neutral-600 text-white hover:bg-neutral-600">
                      <Eye className="h-4 w-4 mr-1" />
                      View
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

        <TabsContent value="pending" className="space-y-4">
          <div className="text-center py-8">
            <Clock className="h-12 w-12 text-blue-500 mx-auto mb-4" />
            <p className="text-neutral-400">Pending verification requests will be displayed here</p>
          </div>
        </TabsContent>

        <TabsContent value="approved" className="space-y-4">
          <div className="text-center py-8">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <p className="text-neutral-400">Approved verifications will be displayed here</p>
          </div>
        </TabsContent>

        <TabsContent value="rejected" className="space-y-4">
          <div className="text-center py-8">
            <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <p className="text-neutral-400">Rejected verifications will be displayed here</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}