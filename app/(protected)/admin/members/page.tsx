"use client";

import { AdminPillNavigationComponent } from "@src/components/admin/AdminPillNavigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@src/components/ui/card";
import { Badge } from "@src/components/ui/badge";
import { Button } from "@src/components/ui/button";
import { Input } from "@src/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@src/components/ui/tabs";
import { 
  Users, 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Eye, 
  Edit, 
  Trash2, 
  Calendar,
  User,
  TrendingUp,
  BarChart3,
  CheckCircle,
  Clock,
  AlertTriangle,
  Shield,
  Crown,
  Star,
  Heart,
  MessageCircle,
  Share2,
  Flag,
  UserCheck,
  UserX,
  Building,
  CreditCard,
  FileImage,
  Globe,
  Mail,
  Phone,
  MapPin,
  Activity,
  Zap,
  Target,
  Award,
  DollarSign,
  Settings,
  Ban,
  Check,
  X,
  RotateCcw,
  BadgeCheck
} from "lucide-react";

// ----------------------
// Members Management Page
// Location: /app/(protected)/admin/members/page.tsx
// Purpose: Comprehensive member management and user administration
// Features: Member profiles, roles, permissions, activity tracking
// Note: Mobile-first design with object-oriented structure
// ----------------------

interface Member {
  id: string;
  username: string;
  name: string;
  email: string;
  avatar_url: string;
  bio: string;
  role: 'admin' | 'moderator' | 'creator' | 'subscriber' | 'user';
  status: 'active' | 'inactive' | 'banned' | 'suspended' | 'pending';
  is_verified: boolean;
  is_premium: boolean;
  created_at: string;
  updated_at: string;
  last_seen: string;
  location: string;
  website: string;
  social_links: {
    twitter?: string;
    instagram?: string;
    youtube?: string;
    tiktok?: string;
    linkedin?: string;
  };
  stats: {
    posts_count: number;
    followers_count: number;
    following_count: number;
    likes_received: number;
    comments_count: number;
    earnings: number;
    total_views: number;
  };
  subscription: {
    plan: 'free' | 'basic' | 'premium' | 'pro';
    status: 'active' | 'cancelled' | 'expired';
    expires_at?: string;
  };
  permissions: string[];
  flags: string[];
  notes?: string;
  last_activity: string;
  ip_address: string;
  user_agent: string;
  country: string;
  city: string;
  timezone: string;
}

interface MemberStats {
  totalMembers: number;
  activeMembers: number;
  newMembers: number;
  premiumMembers: number;
  bannedMembers: number;
  totalEarnings: number;
  averageActivity: number;
  topCreators: number;
  verifiedMembers: number;
  moderators: number;
}

class MembersManagementService {
  private members: Member[] = [];

  constructor() {
    this.initializeMockData();
  }

  private initializeMockData() {
    this.members = [
      {
        id: "1",
        username: "@sarahj",
        name: "Sarah Johnson",
        email: "sarah@example.com",
        avatar_url: "/placeholder-user.jpg",
        bio: "Fitness influencer and personal trainer helping people achieve their goals",
        role: "creator",
        status: "active",
        is_verified: true,
        is_premium: true,
        created_at: "2024-01-15T10:00:00Z",
        updated_at: "2024-01-27T14:30:00Z",
        last_seen: "2024-01-27T14:30:00Z",
        location: "Los Angeles, CA",
        website: "https://sarahfitness.com",
        social_links: {
          instagram: "@sarahfitness",
          youtube: "Sarah Fitness Channel",
          tiktok: "@sarahfitness"
        },
        stats: {
          posts_count: 156,
          followers_count: 12500,
          following_count: 890,
          likes_received: 45600,
          comments_count: 2340,
          earnings: 12500.50,
          total_views: 890000
        },
        subscription: {
          plan: "premium",
          status: "active",
          expires_at: "2024-12-31T23:59:59Z"
        },
        permissions: ["create_content", "monetize", "analytics"],
        flags: [],
        last_activity: "2024-01-27T14:30:00Z",
        ip_address: "192.168.1.100",
        user_agent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        country: "United States",
        city: "Los Angeles",
        timezone: "America/Los_Angeles"
      },
      {
        id: "2",
        username: "@mikechen",
        name: "Mike Chen",
        email: "mike@example.com",
        avatar_url: "/placeholder-user.jpg",
        bio: "Professional chef sharing cooking tips and recipes",
        role: "creator",
        status: "active",
        is_verified: true,
        is_premium: false,
        created_at: "2024-01-10T08:30:00Z",
        updated_at: "2024-01-26T16:45:00Z",
        last_seen: "2024-01-26T16:45:00Z",
        location: "Toronto, Canada",
        website: "https://mikechencooks.com",
        social_links: {
          instagram: "@mikechencooks",
          youtube: "Mike Chen Cooking",
          linkedin: "Mike Chen Chef"
        },
        stats: {
          posts_count: 89,
          followers_count: 8900,
          following_count: 450,
          likes_received: 23400,
          comments_count: 1200,
          earnings: 5600.25,
          total_views: 450000
        },
        subscription: {
          plan: "basic",
          status: "active"
        },
        permissions: ["create_content", "analytics"],
        flags: [],
        last_activity: "2024-01-26T16:45:00Z",
        ip_address: "192.168.1.101",
        user_agent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
        country: "Canada",
        city: "Toronto",
        timezone: "America/Toronto"
      },
      {
        id: "3",
        username: "@emmaw",
        name: "Emma Wilson",
        email: "emma@example.com",
        avatar_url: "/placeholder-user.jpg",
        bio: "Digital artist and creative designer",
        role: "user",
        status: "suspended",
        is_verified: false,
        is_premium: false,
        created_at: "2024-01-20T12:00:00Z",
        updated_at: "2024-01-25T09:15:00Z",
        last_seen: "2024-01-25T09:15:00Z",
        location: "London, UK",
        website: "",
        social_links: {
          instagram: "@emmawilsonart",
          twitter: "@emmawilson"
        },
        stats: {
          posts_count: 23,
          followers_count: 1200,
          following_count: 300,
          likes_received: 3400,
          comments_count: 180,
          earnings: 0,
          total_views: 45000
        },
        subscription: {
          plan: "free",
          status: "active"
        },
        permissions: ["create_content"],
        flags: ["inappropriate_content", "spam_behavior"],
        notes: "Account suspended for repeated policy violations",
        last_activity: "2024-01-25T09:15:00Z",
        ip_address: "192.168.1.102",
        user_agent: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15",
        country: "United Kingdom",
        city: "London",
        timezone: "Europe/London"
      },
      {
        id: "4",
        username: "@alexr",
        name: "Alex Rodriguez",
        email: "alex@example.com",
        avatar_url: "/placeholder-user.jpg",
        bio: "Tech entrepreneur and startup advisor",
        role: "moderator",
        status: "active",
        is_verified: true,
        is_premium: true,
        created_at: "2024-01-05T14:20:00Z",
        updated_at: "2024-01-27T11:30:00Z",
        last_seen: "2024-01-27T11:30:00Z",
        location: "Madrid, Spain",
        website: "https://alexrodriguez.tech",
        social_links: {
          linkedin: "Alex Rodriguez",
          twitter: "@alexrodriguez",
          youtube: "Alex Rodriguez Tech"
        },
        stats: {
          posts_count: 45,
          followers_count: 5600,
          following_count: 200,
          likes_received: 8900,
          comments_count: 450,
          earnings: 3200.75,
          total_views: 180000
        },
        subscription: {
          plan: "pro",
          status: "active",
          expires_at: "2024-11-30T23:59:59Z"
        },
        permissions: ["create_content", "moderate", "analytics", "admin_tools"],
        flags: [],
        last_activity: "2024-01-27T11:30:00Z",
        ip_address: "192.168.1.103",
        user_agent: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36",
        country: "Spain",
        city: "Madrid",
        timezone: "Europe/Madrid"
      }
    ];
  }

  public getMembers(): Member[] {
    return this.members;
  }

  public getStats(): MemberStats {
    const totalMembers = this.members.length;
    const activeMembers = this.members.filter(m => m.status === 'active').length;
    const newMembers = this.members.filter(m => {
      const createdDate = new Date(m.created_at);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return createdDate > thirtyDaysAgo;
    }).length;
    const premiumMembers = this.members.filter(m => m.is_premium).length;
    const bannedMembers = this.members.filter(m => m.status === 'banned').length;
    const totalEarnings = this.members.reduce((sum, m) => sum + m.stats.earnings, 0);
    const averageActivity = this.members.reduce((sum, m) => sum + m.stats.posts_count, 0) / totalMembers;
    const topCreators = this.members.filter(m => m.role === 'creator' && m.stats.followers_count > 5000).length;
    const verifiedMembers = this.members.filter(m => m.is_verified).length;
    const moderators = this.members.filter(m => m.role === 'moderator').length;

    return {
      totalMembers,
      activeMembers,
      newMembers,
      premiumMembers,
      bannedMembers,
      totalEarnings,
      averageActivity,
      topCreators,
      verifiedMembers,
      moderators
    };
  }
}

class MemberCardComponent {
  private member: Member;

  constructor(member: Member) {
    this.member = member;
  }

  private getStatusBadge() {
    const statusConfig = {
      active: { variant: "default" as const, icon: CheckCircle, text: "Active" },
      inactive: { variant: "secondary" as const, icon: Clock, text: "Inactive" },
      banned: { variant: "destructive" as const, icon: Ban, text: "Banned" },
      suspended: { variant: "destructive" as const, icon: AlertTriangle, text: "Suspended" },
      pending: { variant: "outline" as const, icon: Clock, text: "Pending" }
    };

    const config = statusConfig[this.member.status];
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
      admin: { variant: "default" as const, icon: Shield, text: "Admin" },
      moderator: { variant: "default" as const, icon: UserCheck, text: "Moderator" },
      creator: { variant: "default" as const, icon: Star, text: "Creator" },
      subscriber: { variant: "secondary" as const, icon: Heart, text: "Subscriber" },
      user: { variant: "outline" as const, icon: User, text: "User" }
    };

    const config = roleConfig[this.member.role];
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
      <Card className="group hover:shadow-lg transition-all duration-200">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="space-y-1 flex-1">
              <CardTitle className="text-lg flex items-center gap-2">
                {this.member.name}
                {this.member.is_verified && (
                  <BadgeCheck className="h-4 w-4 text-blue-600" />
                )}
                {this.member.is_premium && (
                  <Crown className="h-4 w-4 text-yellow-600" />
                )}
              </CardTitle>
              <CardDescription>@{this.member.username}</CardDescription>
            </div>
            <div className="flex flex-col gap-1 ml-2">
              {this.getStatusBadge()}
              {this.getRoleBadge()}
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Member Info */}
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
              <User className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{this.member.bio}</p>
              <div className="flex items-center gap-2 mt-1">
                <MapPin className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{this.member.location}</span>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <FileImage className="h-4 w-4 text-muted-foreground" />
              <span>{this.member.stats.posts_count} posts</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span>{this.member.stats.followers_count.toLocaleString()} followers</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="h-4 w-4 text-muted-foreground" />
              <span>{this.member.stats.likes_received.toLocaleString()} likes</span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <span>${this.member.stats.earnings.toFixed(2)}</span>
            </div>
          </div>

          {/* Subscription Info */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Crown className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Subscription:</span>
              <Badge variant="outline" className="text-xs">
                {this.member.subscription.plan.toUpperCase()}
              </Badge>
            </div>
            {this.member.subscription.expires_at && (
              <p className="text-xs text-muted-foreground">
                Expires: {new Date(this.member.subscription.expires_at).toLocaleDateString()}
              </p>
            )}
          </div>

          {/* Social Links */}
          {Object.keys(this.member.social_links).length > 0 && (
            <div className="space-y-2">
              <span className="text-sm font-medium">Social Links:</span>
              <div className="flex flex-wrap gap-1">
                {Object.entries(this.member.social_links).map(([platform, handle]) => (
                  <Badge key={platform} variant="outline" className="text-xs">
                    {platform}: {handle}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Flags */}
          {this.member.flags.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <div className="flex items-center gap-2 text-red-800 mb-2">
                <Flag className="h-4 w-4" />
                <span className="text-sm font-medium">Flags</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {this.member.flags.map((flag) => (
                  <Badge key={flag} variant="destructive" className="text-xs">
                    {flag.replace('_', ' ')}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Notes */}
          {this.member.notes && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="flex items-center gap-2 text-blue-800 mb-1">
                <MessageCircle className="h-4 w-4" />
                <span className="text-sm font-medium">Notes</span>
              </div>
              <p className="text-sm text-blue-700">{this.member.notes}</p>
            </div>
          )}

          {/* Last Activity */}
          <div className="text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <Activity className="h-3 w-3" />
              <span>Last seen: {new Date(this.member.last_seen).toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <Globe className="h-3 w-3" />
              <span>{this.member.country}, {this.member.city}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <Button variant="outline" size="sm" className="flex-1">
              <Eye className="h-4 w-4 mr-2" />
              View
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
            <Button variant="outline" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }
}

export default function MembersPage() {
  const membersService = new MembersManagementService();
  const members = membersService.getMembers();
  const stats = membersService.getStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Members Management</h1>
          <p className="text-muted-foreground">Manage platform members, roles, and permissions</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Member
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalMembers}</div>
            <p className="text-xs text-muted-foreground">
              {stats.activeMembers} active, {stats.newMembers} new this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Premium Members</CardTitle>
            <Crown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.premiumMembers}</div>
            <p className="text-xs text-muted-foreground">
              {stats.verifiedMembers} verified
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.totalEarnings.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              From {stats.topCreators} top creators
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Moderators</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.moderators}</div>
            <p className="text-xs text-muted-foreground">
              Platform moderators
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search members, emails, or usernames..."
                  className="pl-10"
                />
              </div>
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            <Button variant="outline">
              <RotateCcw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Members Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {members.map((member) => {
          const memberCard = new MemberCardComponent(member);
          return <div key={member.id}>{memberCard.render()}</div>;
        })}
      </div>
    </div>
  );
}
