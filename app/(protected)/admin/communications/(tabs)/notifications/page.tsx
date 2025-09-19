"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@src/components/ui/card";
import { Badge } from "@src/components/ui/badge";
import { Button } from "@src/components/ui/button";
import { Bell, Send, Clock, CheckCircle, Users, Smartphone } from "lucide-react";

// ----------------------
// Notifications Management Page
// Location: /app/(protected)/admin/communications/(tabs)/notifications/page.tsx
// Purpose: Manage push notifications and alerts
// ----------------------

export default function NotificationsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Push Notifications</h2>
          <p className="text-neutral-400">Manage push notifications and alerts</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Bell className="h-4 w-4 mr-2" />
          Send Notification
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Sent</p>
                <p className="text-2xl font-bold">45,678</p>
              </div>
              <Bell className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Delivery Rate</p>
                <p className="text-2xl font-bold">94%</p>
              </div>
              <Send className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Open Rate</p>
                <p className="text-2xl font-bold">23%</p>
              </div>
              <CheckCircle className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Devices</p>
                <p className="text-2xl font-bold">12,847</p>
              </div>
              <Smartphone className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Notifications List */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Notifications</CardTitle>
          <CardDescription>Latest push notifications and their performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <Bell className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <p className="font-semibold">New Creator Alert</p>
                  <p className="text-sm text-muted-foreground">Sent to 5,247 users • 23% open rate</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="default">Delivered</Badge>
                <Button size="sm" variant="outline">
                  View Details
                </Button>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <Bell className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <p className="font-semibold">Payment Processed</p>
                  <p className="text-sm text-muted-foreground">Scheduled for 2:00 PM • 1,247 recipients</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">Scheduled</Badge>
                <Button size="sm" variant="outline">
                  Edit
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
