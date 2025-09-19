"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@src/components/ui/card";
import { Badge } from "@src/components/ui/badge";
import { Button } from "@src/components/ui/button";
import { Input } from "@src/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@src/components/ui/tabs";
import { 
  DollarSign, 
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
  CreditCard
} from "lucide-react";

export default function RefundsPage() {
  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Refund Audits</h1>
            <p className="text-neutral-400">Review and process refund requests and financial disputes</p>
          </div>
          <Badge className="bg-orange-500 text-white">Support Admin</Badge>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-2">Refund Overview</h2>
        <p className="text-neutral-400 mb-6">Refund requests, approval rates, and financial impact metrics</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-neutral-800 border border-neutral-700 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-400 uppercase tracking-wide">Pending Refunds</p>
                <p className="text-2xl font-bold text-white">8</p>
                <div className="flex items-center gap-1 text-sm text-blue-500">
                  <Clock className="h-4 w-4" />
                  +12.5% from last week
                </div>
              </div>
              <Clock className="h-8 w-8 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-neutral-800 border border-neutral-700 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-400 uppercase tracking-wide">Approved Today</p>
                <p className="text-2xl font-bold text-white">5</p>
                <div className="flex items-center gap-1 text-sm text-green-500">
                  <CheckCircle className="h-4 w-4" />
                  +8.2% from yesterday
                </div>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </div>
          
          <div className="bg-neutral-800 border border-neutral-700 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-400 uppercase tracking-wide">Total Amount</p>
                <p className="text-2xl font-bold text-white">$2,450</p>
                <div className="flex items-center gap-1 text-sm text-purple-500">
                  <DollarSign className="h-4 w-4" />
                  +15.3% from last week
                </div>
              </div>
              <DollarSign className="h-8 w-8 text-purple-500" />
            </div>
          </div>
          
          <div className="bg-neutral-800 border border-neutral-700 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-400 uppercase tracking-wide">Avg Processing</p>
                <p className="text-2xl font-bold text-white">3.2h</p>
                <div className="flex items-center gap-1 text-sm text-orange-500">
                  <TrendingUp className="h-4 w-4" />
                  -22.5% from last week
                </div>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Refund Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="bg-neutral-800 border-neutral-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-green-500" />
              Refund Trends
            </CardTitle>
            <CardDescription className="text-neutral-400">Daily refund requests and approval patterns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-neutral-900/50 rounded-lg">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 text-neutral-400 mx-auto mb-2" />
                <p className="text-neutral-400">Refund trends chart</p>
                <p className="text-sm text-neutral-500">Line chart showing refund patterns</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-neutral-800 border-neutral-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Activity className="h-5 w-5 text-blue-500" />
              Refund Reasons
            </CardTitle>
            <CardDescription className="text-neutral-400">Refund reason breakdown and category distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-neutral-900/50 rounded-lg">
              <div className="text-center">
                <Activity className="h-12 w-12 text-neutral-400 mx-auto mb-2" />
                <p className="text-neutral-400">Refund reasons chart</p>
                <p className="text-sm text-neutral-500">Pie chart showing refund categories</p>
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
            placeholder="Search refunds by user, amount, or reason..."
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

      {/* Refund Tabs */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 bg-neutral-800 border-neutral-700">
          <TabsTrigger value="all" className="data-[state=active]:bg-neutral-700 data-[state=active]:text-white text-neutral-400">All Refunds</TabsTrigger>
          <TabsTrigger value="pending" className="data-[state=active]:bg-neutral-700 data-[state=active]:text-white text-neutral-400">Pending</TabsTrigger>
          <TabsTrigger value="approved" className="data-[state=active]:bg-neutral-700 data-[state=active]:text-white text-neutral-400">Approved</TabsTrigger>
          <TabsTrigger value="rejected" className="data-[state=active]:bg-neutral-700 data-[state=active]:text-white text-neutral-400">Rejected</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="space-y-4">
            {/* Sample refund items */}
            <Card className="bg-neutral-800 border-neutral-700 hover:shadow-lg transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-neutral-700 rounded-full flex items-center justify-center">
                        <DollarSign className="h-5 w-5 text-green-500" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">Premium subscription refund</h3>
                        <p className="text-sm text-neutral-400">User #1234 • Amount: $29.99 • Requested 1 day ago • Technical issues</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-yellow-500 text-white">Pending Review</Badge>
                      <Badge className="bg-blue-500 text-white">30-day policy</Badge>
                      <Badge variant="outline" className="bg-neutral-700 border-neutral-600 text-neutral-300">Subscription</Badge>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 ml-4">
                    <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Approve
                    </Button>
                    <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white">
                      <XCircle className="h-4 w-4 mr-1" />
                      Reject
                    </Button>
                    <Button variant="outline" size="sm" className="bg-neutral-700 border-neutral-600 text-white hover:bg-neutral-600">
                      <Eye className="h-4 w-4 mr-1" />
                      Details
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
                        <CreditCard className="h-5 w-5 text-purple-500" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">Creator payout dispute</h3>
                        <p className="text-sm text-neutral-400">User #5678 • Amount: $150.00 • Requested 3 days ago • Incorrect calculation</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-yellow-500 text-white">Pending Review</Badge>
                      <Badge className="bg-purple-500 text-white">Creator Dispute</Badge>
                      <Badge variant="outline" className="bg-neutral-700 border-neutral-600 text-neutral-300">Payout</Badge>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 ml-4">
                    <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Approve
                    </Button>
                    <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white">
                      <XCircle className="h-4 w-4 mr-1" />
                      Reject
                    </Button>
                    <Button variant="outline" size="sm" className="bg-neutral-700 border-neutral-600 text-white hover:bg-neutral-600">
                      <Eye className="h-4 w-4 mr-1" />
                      Details
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
                        <DollarSign className="h-5 w-5 text-orange-500" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">Duplicate charge refund</h3>
                        <p className="text-sm text-neutral-400">User #9012 • Amount: $19.99 • Requested 2 hours ago • Duplicate payment</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-500 text-white">Approved</Badge>
                      <Badge className="bg-blue-500 text-white">Processed</Badge>
                      <Badge variant="outline" className="bg-neutral-700 border-neutral-600 text-neutral-300">Payment Error</Badge>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 ml-4">
                    <Button variant="outline" size="sm" className="bg-neutral-700 border-neutral-600 text-white hover:bg-neutral-600">
                      <Eye className="h-4 w-4 mr-1" />
                      View Details
                    </Button>
                    <Button variant="outline" size="sm" className="bg-neutral-700 border-neutral-600 text-white hover:bg-neutral-600">
                      <FileText className="h-4 w-4 mr-1" />
                      Receipt
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
            <p className="text-neutral-400">Pending refund requests will be displayed here</p>
          </div>
        </TabsContent>

        <TabsContent value="approved" className="space-y-4">
          <div className="text-center py-8">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <p className="text-neutral-400">Approved refunds will be displayed here</p>
          </div>
        </TabsContent>

        <TabsContent value="rejected" className="space-y-4">
          <div className="text-center py-8">
            <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <p className="text-neutral-400">Rejected refunds will be displayed here</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}