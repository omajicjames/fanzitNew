"use client"

import { ThreeColumnShell } from "@src/components/app/layout/three-column-shell"
import { Sidebar } from "@src/components/app/layout/sidebar"
import { MessagingPanel } from "@src/features/messaging/components/messaging-panel"
import { Card, CardContent, CardHeader, CardTitle } from "@src/components/ui/card"
import { Button } from "@src/components/ui/button"
import { Input } from "@src/components/ui/input"
import { Label } from "@src/components/ui/label"
import { Switch } from "@src/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@src/components/ui/tabs"
import { Settings, User, Bell, Shield, Palette, CreditCard } from "lucide-react"

// ----------------------
// Settings Page Component
// Location: /app/(protected)/settings/page.tsx
// Parent: Protected route layout
// Children: ThreeColumnShell with Sidebar, SettingsContent, MessagingPanel
// ----------------------
function SettingsContent() {
  return (
    <div className="space-y-6 p-6">
      {/* ---------------------- */}
      {/* Page header with settings icon and description */}
      {/* ---------------------- */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
          <Settings className="h-8 w-8 text-primary" />
          Settings
        </h1>
        <p className="text-muted-foreground">
          Manage your account preferences and privacy settings
        </p>
      </div>

      {/* ---------------------- */}
      {/* Settings tabs navigation */}
      {/* Organizes different setting categories into tabs */}
      {/* ---------------------- */}
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>

        {/* ---------------------- */}
        {/* Profile Settings Tab */}
        {/* Contains user profile information and preferences */}
        {/* ---------------------- */}
        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="Your first name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Your last name" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="your.email@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" placeholder="@yourusername" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Input id="bio" placeholder="Tell us about yourself" />
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ---------------------- */}
        {/* Notifications Settings Tab */}
        {/* Controls notification preferences and delivery methods */}
        {/* ---------------------- */}
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive push notifications in browser</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>New Followers</Label>
                  <p className="text-sm text-muted-foreground">Get notified when someone follows you</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Content Likes</Label>
                  <p className="text-sm text-muted-foreground">Get notified when someone likes your content</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Messages</Label>
                  <p className="text-sm text-muted-foreground">Get notified about new messages</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ---------------------- */}
        {/* Privacy Settings Tab */}
        {/* Controls privacy and security settings */}
        {/* ---------------------- */}
        <TabsContent value="privacy" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Privacy & Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Profile Visibility</Label>
                  <p className="text-sm text-muted-foreground">Make your profile visible to everyone</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Show Online Status</Label>
                  <p className="text-sm text-muted-foreground">Let others see when you're online</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Allow Direct Messages</Label>
                  <p className="text-sm text-muted-foreground">Allow anyone to send you messages</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Change Password</Label>
                <Input id="password" type="password" placeholder="New password" />
              </div>
              <Button variant="outline">Update Security Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ---------------------- */}
        {/* Billing Settings Tab */}
        {/* Contains payment and subscription management */}
        {/* ---------------------- */}
        <TabsContent value="billing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Billing & Payments
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Current Plan</Label>
                <p className="text-lg font-semibold">Creator Pro</p>
                <p className="text-sm text-muted-foreground">$29.99/month - Next billing: Jan 15, 2024</p>
              </div>
              <div className="space-y-2">
                <Label>Payment Method</Label>
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  <span>•••• •••• •••• 4242</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">Change Plan</Button>
                <Button variant="outline">Update Payment Method</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default function SettingsPage() {
  return (
    <ThreeColumnShell 
      leftColumn={<Sidebar />} 
      centerColumn={<SettingsContent />} 
      rightColumn={<MessagingPanel />} 
    />
  )
}