"use client";

import { AdminPillNavigationComponent } from "@src/components/admin/AdminPillNavigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@src/components/ui/card";
import { Badge } from "@src/components/ui/badge";
import { Button } from "@src/components/ui/button";
import { Input } from "@src/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@src/components/ui/tabs";
import { 
  Users, 
  UserCheck, 
  UserX, 
  Crown, 
  Shield, 
  Search, 
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  Ban,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  DollarSign
} from "lucide-react";

// ----------------------
// User Management Page
// Location: /app/(protected)/admin/users/page.tsx
// Purpose: Comprehensive user management for OnlyFans-like platform
// Features: Creator verification, subscription management, user segments
// Note: Mobile-first design with object-oriented structure
// ----------------------

interface UserData {
  id: string;
  username: string;
  email: string;
  role: 'creator' | 'subscriber' | 'admin';
  status: 'active' | 'suspended' | 'pending_verification';
  isVerified: boolean;
  subscriptionTier: 'free' | 'premium' | 'vip';
  earnings: number;
  subscribers: number;
  joinDate: string;
  lastActive: string;
  avatar: string;
}

class UserManagementService {
  private users: UserData[] = [
    {
      id: '1',
      username: 'sarah_fitness',
      email: 'sarah@example.com',
      role: 'creator',
      status: 'active',
      isVerified: true,
      subscriptionTier: 'premium',
      earnings: 15420,
      subscribers: 2847,
      joinDate: '2024-01-15',
      lastActive: '2025-01-27',
      avatar: '/placeholder-user.jpg'
    },
    {
      id: '2',
      username: 'chef_marco',
      email: 'marco@example.com',
      role: 'creator',
      status: 'pending_verification',
      isVerified: false,
      subscriptionTier: 'free',
      earnings: 0,
      subscribers: 0,
      joinDate: '2025-01-20',
      lastActive: '2025-01-26',
      avatar: '/placeholder-user.jpg'
    },
    {
      id: '3',
      username: 'john_doe',
      email: 'john@example.com',
      role: 'subscriber',
      status: 'active',
      isVerified: false,
      subscriptionTier: 'premium',
      earnings: 0,
      subscribers: 0,
      joinDate: '2024-12-01',
      lastActive: '2025-01-27',
      avatar: '/placeholder-user.jpg'
    }
  ];

  public getAllUsers(): UserData[] {
    return this.users;
  }

  public getUsersByRole(role: string): UserData[] {
    return this.users.filter(user => user.role === role);
  }

  public getUsersByStatus(status: string): UserData[] {
    return this.users.filter(user => user.status === status);
  }

  public getVerifiedUsers(): UserData[] {
    return this.users.filter(user => user.isVerified);
  }

  public getTopEarners(limit: number = 10): UserData[] {
    return this.users
      .filter(user => user.role === 'creator')
      .sort((a, b) => b.earnings - a.earnings)
      .slice(0, limit);
  }
}

class UserCardComponent {
  private user: UserData;

  constructor(user: UserData) {
    this.user = user;
  }

  private getStatusBadge() {
    const statusConfig = {
      active: { variant: 'default' as const, icon: CheckCircle, text: 'Active' },
      suspended: { variant: 'destructive' as const, icon: UserX, text: 'Suspended' },
      pending_verification: { variant: 'secondary' as const, icon: AlertTriangle, text: 'Pending' }
    };

    const config = statusConfig[this.user.status];
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {config.text}
      </Badge>
    );
  }

  private getRoleBadge() {
    const roleConfig = {
      creator: { variant: 'default' as const, icon: Crown, text: 'Creator' },
      subscriber: { variant: 'secondary' as const, icon: Users, text: 'Subscriber' },
      admin: { variant: 'destructive' as const, icon: Shield, text: 'Admin' }
    };

    const config = roleConfig[this.user.role];
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {config.text}
      </Badge>
    );
  }

  public render() {
    return (
      <Card className="bg-neutral-800 border-neutral-700 hover:shadow-lg transition-shadow duration-200">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-neutral-700 flex items-center justify-center overflow-hidden">
                <img 
                  src={this.user.avatar} 
                  alt={this.user.username}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <CardTitle className="text-lg flex items-center gap-2 text-white">
                  {this.user.username}
                  {this.user.isVerified && (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  )}
                </CardTitle>
                <CardDescription className="text-neutral-400">{this.user.email}</CardDescription>
              </div>
            </div>
            <div className="flex gap-2">
              {this.getStatusBadge()}
              {this.getRoleBadge()}
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {this.user.role === 'creator' && (
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-neutral-700/50 rounded-lg">
                <div className="flex items-center justify-center gap-1 text-green-500">
                  <DollarSign className="h-4 w-4" />
                  <span className="font-semibold">${this.user.earnings.toLocaleString()}</span>
                </div>
                <p className="text-xs text-neutral-400">Earnings</p>
              </div>
              <div className="text-center p-3 bg-neutral-700/50 rounded-lg">
                <div className="flex items-center justify-center gap-1 text-blue-500">
                  <Users className="h-4 w-4" />
                  <span className="font-semibold">{this.user.subscribers.toLocaleString()}</span>
                </div>
                <p className="text-xs text-neutral-400">Subscribers</p>
              </div>
            </div>
          )}
          
          <div className="flex items-center justify-between text-sm text-neutral-400">
            <span>Joined: {new Date(this.user.joinDate).toLocaleDateString()}</span>
            <span>Last active: {this.user.lastActive}</span>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1 bg-neutral-700 border-neutral-600 text-white hover:bg-neutral-600">
              <Eye className="h-4 w-4 mr-1" />
              View
            </Button>
            <Button variant="outline" size="sm" className="flex-1 bg-neutral-700 border-neutral-600 text-white hover:bg-neutral-600">
              <Edit className="h-4 w-4 mr-1" />
              Edit
            </Button>
            <Button variant="outline" size="sm" className="bg-neutral-700 border-neutral-600 text-white hover:bg-neutral-600">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }
}

export default function UserManagementPage() {
  const userService = new UserManagementService();
  const allUsers = userService.getAllUsers();
  const creators = userService.getUsersByRole('creator');
  const subscribers = userService.getUsersByRole('subscriber');
  const pendingVerification = userService.getUsersByStatus('pending_verification');
  const topEarners = userService.getTopEarners(5);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">User Management</h1>
            <p className="text-neutral-400">Manage creators, subscribers, and user verification</p>
          </div>
          <Badge className="bg-orange-500 text-white">Super Admin</Badge>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-2">Key Performance Indicators</h2>
        <p className="text-neutral-400 mb-6">User metrics and statistics</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-neutral-800 border border-neutral-700 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-400 uppercase tracking-wide">Total Users</p>
                <p className="text-2xl font-bold text-white">12,847</p>
                <div className="flex items-center gap-1 text-sm text-green-500">
                  <TrendingUp className="h-4 w-4" />
                  +12.5% from last month
                </div>
              </div>
              <Users className="h-8 w-8 text-neutral-400" />
            </div>
          </div>

          <div className="bg-neutral-800 border border-neutral-700 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-400 uppercase tracking-wide">Verified Creators</p>
                <p className="text-2xl font-bold text-white">1,234</p>
                <div className="flex items-center gap-1 text-sm text-green-500">
                  <TrendingUp className="h-4 w-4" />
                  +8.2% from last month
                </div>
              </div>
              <UserCheck className="h-8 w-8 text-neutral-400" />
            </div>
          </div>

          <div className="bg-neutral-800 border border-neutral-700 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-400 uppercase tracking-wide">Active Subscribers</p>
                <p className="text-2xl font-bold text-white">45,678</p>
                <div className="flex items-center gap-1 text-sm text-green-500">
                  <TrendingUp className="h-4 w-4" />
                  +15.3% from last month
                </div>
              </div>
              <Users className="h-8 w-8 text-neutral-400" />
            </div>
          </div>

          <div className="bg-neutral-800 border border-neutral-700 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-400 uppercase tracking-wide">Pending Verification</p>
                <p className="text-2xl font-bold text-white">89</p>
                <div className="flex items-center gap-1 text-sm text-red-500">
                  <AlertTriangle className="h-4 w-4" />
                  -5.2% from last month
                </div>
              </div>
              <AlertTriangle className="h-8 w-8 text-neutral-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
          <Input 
            placeholder="Search users by username or email..."
            className="pl-10 bg-neutral-800 border-neutral-700 text-white"
          />
        </div>
        <Button variant="outline" className="flex items-center gap-2 bg-neutral-800 border-neutral-700 text-white hover:bg-neutral-700">
          <Filter className="h-4 w-4" />
          Filters
        </Button>
      </div>

      {/* User Tabs */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 bg-neutral-800 border-neutral-700">
          <TabsTrigger value="all" className="data-[state=active]:bg-neutral-700 data-[state=active]:text-white text-neutral-400">All Users</TabsTrigger>
          <TabsTrigger value="creators" className="data-[state=active]:bg-neutral-700 data-[state=active]:text-white text-neutral-400">Creators</TabsTrigger>
          <TabsTrigger value="subscribers" className="data-[state=active]:bg-neutral-700 data-[state=active]:text-white text-neutral-400">Subscribers</TabsTrigger>
          <TabsTrigger value="pending" className="data-[state=active]:bg-neutral-700 data-[state=active]:text-white text-neutral-400">Pending</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {allUsers.map((user) => {
              const userCard = new UserCardComponent(user);
              return <div key={user.id}>{userCard.render()}</div>;
            })}
          </div>
        </TabsContent>

        <TabsContent value="creators" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {creators.map((user) => {
              const userCard = new UserCardComponent(user);
              return <div key={user.id}>{userCard.render()}</div>;
            })}
          </div>
        </TabsContent>

        <TabsContent value="subscribers" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {subscribers.map((user) => {
              const userCard = new UserCardComponent(user);
              return <div key={user.id}>{userCard.render()}</div>;
            })}
          </div>
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pendingVerification.map((user) => {
              const userCard = new UserCardComponent(user);
              return <div key={user.id}>{userCard.render()}</div>;
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
