"use client";

import { useState, useEffect } from "react";
import { AdminPageTemplate, MetricCard, UserCard } from "@src/components/admin/AdminPageTemplate";
import { SelectFilterSection } from "@src/components/admin/SelectFilterSection";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@src/components/ui/card";
import { Badge } from "@src/components/ui/badge";
import { Button } from "@src/components/ui/button";
import { Input } from "@src/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@src/components/ui/select";
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
  role: 'admin' | 'moderator' | 'creator' | 'subscriber' | 'user' | 'normal';
  status: 'active' | 'inactive' | 'banned' | 'suspended' | 'pending';
  is_verified: boolean;
  is_premium: boolean;
  created_at: string;
  updated_at: string;
  last_seen: string;
  last_login: string;
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
  financial: {
    balance: number;
    wallet: number;
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
  verification_status: 'verified' | 'pending' | 'rejected' | 'not_required';
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
        id: "267",
        username: "@donron",
        name: "Donron",
        email: "donron@example.com",
        avatar_url: "/placeholder-user.jpg",
        bio: "Creative content creator and digital artist",
        role: "normal",
        status: "active",
        is_verified: false,
        is_premium: false,
        created_at: "2025-09-16T10:00:00Z",
        updated_at: "2025-09-16T14:30:00Z",
        last_seen: "2025-09-16T14:30:00Z",
        last_login: "2025-09-16T14:30:00Z",
        location: "New York, NY",
        website: "",
        social_links: {},
        stats: {
          posts_count: 0,
          followers_count: 0,
          following_count: 0,
          likes_received: 0,
          comments_count: 0,
          earnings: 0,
          total_views: 0
        },
        financial: {
          balance: 0.00,
          wallet: 0.00
        },
        subscription: {
          plan: "free",
          status: "active"
        },
        permissions: ["create_content"],
        flags: [],
        last_activity: "2025-09-16T14:30:00Z",
        ip_address: "72.27.20.240",
        user_agent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        country: "United States",
        city: "New York",
        timezone: "America/New_York",
        verification_status: "pending"
      },
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
        last_login: "2024-01-27T14:30:00Z",
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
        financial: {
          balance: 1250.50,
          wallet: 890.25
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
        timezone: "America/Los_Angeles",
        verification_status: "verified"
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
        last_login: "2024-01-26T16:45:00Z",
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
        financial: {
          balance: 560.25,
          wallet: 320.10
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
        timezone: "America/Toronto",
        verification_status: "verified"
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
        last_login: "2024-01-25T09:15:00Z",
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
        financial: {
          balance: 0,
          wallet: 0
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
        timezone: "Europe/London",
        verification_status: "not_required"
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
        last_login: "2024-01-27T11:30:00Z",
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
        financial: {
          balance: 3200.75,
          wallet: 150.25
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
        timezone: "Europe/Madrid",
        verification_status: "verified"
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

// ----------------------
// Professional Member Card Component
// Purpose: Displays member information in a structured, professional layout
// Note: Similar to verification card with member-specific data
// ----------------------
function ProfessionalMemberCard({
  member,
  onView,
  onEdit,
  onMore,
  className = ""
}: {
  member: Member;
  onView?: () => void;
  onEdit?: () => void;
  onMore?: () => void;
  className?: string;
}) {
  const getStatusBadge = () => {
    const statusConfig = {
      active: { variant: "default" as const, icon: CheckCircle, text: "Active", color: "text-green-600" },
      inactive: { variant: "secondary" as const, icon: Clock, text: "Inactive", color: "text-gray-600" },
      banned: { variant: "destructive" as const, icon: Ban, text: "Banned", color: "text-red-600" },
      suspended: { variant: "destructive" as const, icon: AlertTriangle, text: "Suspended", color: "text-red-600" },
      pending: { variant: "outline" as const, icon: Clock, text: "Pending", color: "text-yellow-600" }
    };

    const config = statusConfig[member.status];
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {config.text}
      </Badge>
    );
  };

  const getRoleBadge = () => {
    const roleConfig = {
      admin: { variant: "default" as const, icon: Shield, text: "Admin", color: "text-red-600" },
      moderator: { variant: "default" as const, icon: UserCheck, text: "Moderator", color: "text-blue-600" },
      creator: { variant: "default" as const, icon: Star, text: "Creator", color: "text-purple-600" },
      subscriber: { variant: "secondary" as const, icon: Heart, text: "Subscriber", color: "text-pink-600" },
      user: { variant: "outline" as const, icon: User, text: "User", color: "text-gray-600" },
      normal: { variant: "outline" as const, icon: User, text: "Normal", color: "text-gray-600" }
    };

    const config = roleConfig[member.role];
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {config.text}
      </Badge>
    );
  };

  const getVerificationBadge = () => {
    const verificationConfig = {
      verified: { variant: "default" as const, text: "Verified", color: "text-green-600" },
      pending: { variant: "secondary" as const, text: "Pending", color: "text-yellow-600" },
      rejected: { variant: "destructive" as const, text: "Rejected", color: "text-red-600" },
      not_required: { variant: "outline" as const, text: "Not Required", color: "text-gray-600" }
    };

    const config = verificationConfig[member.verification_status];

    return (
      <Badge variant={config.variant} className="text-xs">
        {config.text}
      </Badge>
    );
  };

  return (
    <Card className={`bg-admin-card border-line-soft hover:shadow-lg transition-all duration-200 ${className}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-surface-elev2 flex items-center justify-center border border-line-soft">
              <User className="h-6 w-6 text-text-muted" />
            </div>
            <div>
              <CardTitle className="text-lg text-text flex items-center gap-2">
                {member.name}
                {member.is_verified && (
                  <BadgeCheck className="h-4 w-4 text-blue-600" />
                )}
                {member.is_premium && (
                  <Crown className="h-4 w-4 text-yellow-600" />
                )}
              </CardTitle>
              <CardDescription className="text-text-muted">@{member.username}</CardDescription>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            {getStatusBadge()}
            {getRoleBadge()}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Key Metrics Grid */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-surface-elev2 rounded-lg p-4 text-center border border-line-soft">
            <div className="flex items-center justify-center gap-1 text-text-muted mb-1">
              <DollarSign className="h-4 w-4" />
              <span className="text-xs font-medium">Balance</span>
            </div>
            <div className="text-lg font-bold text-text">
              ${member.financial.balance.toFixed(2)}
            </div>
          </div>
          <div className="bg-surface-elev2 rounded-lg p-4 text-center border border-line-soft">
            <div className="flex items-center justify-center gap-1 text-text-muted mb-1">
              <CreditCard className="h-4 w-4" />
              <span className="text-xs font-medium">Wallet</span>
            </div>
            <div className="text-lg font-bold text-text">
              ${member.financial.wallet.toFixed(2)}
            </div>
          </div>
          <div className="bg-surface-elev2 rounded-lg p-4 text-center border border-line-soft">
            <div className="flex items-center justify-center gap-1 text-text-muted mb-1">
              <FileImage className="h-4 w-4" />
              <span className="text-xs font-medium">Posts</span>
            </div>
            <div className="text-lg font-bold text-text">
              {member.stats.posts_count}
            </div>
          </div>
        </div>

        {/* Member Information */}
        <div className="bg-surface-elev2 rounded-lg p-4 border border-line-soft">
          <div className="flex items-center gap-2 mb-3">
            <User className="h-5 w-5 text-text-muted" />
            <span className="font-medium text-text">Member Information</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-sm text-text-muted">ID:</span>
              <span className="ml-2 text-sm font-mono text-text">{member.id}</span>
            </div>
            <div>
              <span className="text-sm text-text-muted">Email:</span>
              <span className="ml-2 text-sm text-text">{member.email}</span>
            </div>
            <div>
              <span className="text-sm text-text-muted">Location:</span>
              <span className="ml-2 text-sm text-text">{member.location}</span>
            </div>
            <div>
              <span className="text-sm text-text-muted">Bio:</span>
              <span className="ml-2 text-sm text-text">{member.bio}</span>
            </div>
          </div>
        </div>

        {/* Activity Information */}
        <div className="bg-surface-elev2 rounded-lg p-4 border border-line-soft">
          <div className="flex items-center gap-2 mb-3">
            <Activity className="h-5 w-5 text-text-muted" />
            <span className="font-medium text-text">Activity Information</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-sm text-text-muted">Join Date:</span>
              <span className="ml-2 text-sm text-text">
                {new Date(member.created_at).toLocaleDateString()}
              </span>
            </div>
            <div>
              <span className="text-sm text-text-muted">Last Login:</span>
              <span className="ml-2 text-sm text-text">
                {new Date(member.last_login).toLocaleDateString()}
              </span>
            </div>
            <div>
              <span className="text-sm text-text-muted">IP Address:</span>
              <span className="ml-2 text-sm font-mono text-text">{member.ip_address}</span>
            </div>
            <div>
              <span className="text-sm text-text-muted">Timezone:</span>
              <span className="ml-2 text-sm text-text">{member.timezone}</span>
            </div>
          </div>
        </div>

        {/* Status & Verification */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-surface-elev2 rounded-lg p-4 border border-line-soft">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="h-4 w-4 text-text-muted" />
              <span className="text-sm font-medium text-text">Role</span>
            </div>
            {getRoleBadge()}
          </div>
          <div className="bg-surface-elev2 rounded-lg p-4 border border-line-soft">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="h-4 w-4 text-text-muted" />
              <span className="text-sm font-medium text-text">Verification</span>
            </div>
            {getVerificationBadge()}
          </div>
        </div>

        {/* Social Links */}
        {Object.keys(member.social_links).length > 0 && (
          <div className="bg-surface-elev2 rounded-lg p-4 border border-line-soft">
            <div className="flex items-center gap-2 mb-3">
              <Share2 className="h-5 w-5 text-text-muted" />
              <span className="font-medium text-text">Social Links</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {Object.entries(member.social_links).map(([platform, handle]) => (
                <Badge key={platform} variant="outline" className="text-xs">
                  {platform}: {handle}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Flags */}
        {member.flags.length > 0 && (
          <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <Flag className="h-5 w-5 text-red-400" />
              <span className="font-medium text-red-300">Flags & Issues</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {member.flags.map((flag) => (
                <Badge key={flag} variant="destructive" className="text-xs">
                  {flag.replace('_', ' ')}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Notes */}
        {member.notes && (
          <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <MessageCircle className="h-5 w-5 text-blue-400" />
              <span className="font-medium text-blue-300">Notes</span>
            </div>
            <p className="text-sm text-blue-200">{member.notes}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2 border-t border-line-soft">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 bg-surface-elev2 border-line-soft text-text hover:bg-surface-elev1"
            onClick={onView}
          >
            <Eye className="h-4 w-4 mr-2" />
            View
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 bg-surface-elev2 border-line-soft text-text hover:bg-surface-elev1"
            onClick={onEdit}
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="bg-surface-elev2 border-line-soft text-text hover:bg-surface-elev1"
            onClick={onMore}
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// ----------------------
// Members Detail View Component
// Purpose: Single card view with filtering and quick stats
// Note: Similar to verification page with member-specific data
// ----------------------
function MembersDetailView({
  members,
  selectedMemberId,
  onMemberSelect,
  onView,
  onEdit,
  onMore,
  className = ""
}: {
  members: Member[];
  selectedMemberId?: string;
  onMemberSelect?: (memberId: string) => void;
  onView?: (memberId: string) => void;
  onEdit?: (memberId: string) => void;
  onMore?: (memberId: string) => void;
  className?: string;
}) {
  const selectedMember = members.find(m => m.id === selectedMemberId) || members[0];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { variant: "default" as const, color: "text-green-600", bgColor: "bg-green-100" },
      inactive: { variant: "secondary" as const, color: "text-gray-600", bgColor: "bg-gray-100" },
      banned: { variant: "destructive" as const, color: "text-red-600", bgColor: "bg-red-100" },
      suspended: { variant: "destructive" as const, color: "text-red-600", bgColor: "bg-red-100" },
      pending: { variant: "outline" as const, color: "text-yellow-600", bgColor: "bg-yellow-100" }
    };
    return statusConfig[status as keyof typeof statusConfig] || statusConfig.inactive;
  };

  const getRoleBadge = (role: string) => {
    const roleConfig = {
      admin: { variant: "default" as const, color: "text-red-600", bgColor: "bg-red-100" },
      moderator: { variant: "default" as const, color: "text-blue-600", bgColor: "bg-blue-100" },
      creator: { variant: "default" as const, color: "text-purple-600", bgColor: "bg-purple-100" },
      subscriber: { variant: "secondary" as const, color: "text-pink-600", bgColor: "bg-pink-100" },
      user: { variant: "outline" as const, color: "text-gray-600", bgColor: "bg-gray-100" }
    };
    return roleConfig[role as keyof typeof roleConfig] || roleConfig.user;
  };

  const statusInfo = getStatusBadge(selectedMember?.status || 'inactive');
  const roleInfo = getRoleBadge(selectedMember?.role || 'user');

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Filter Section */}
      <SelectFilterSection
        title="Select Member"
        placeholder="Choose a member..."
        value={selectedMemberId || members[0]?.id}
        onValueChange={onMemberSelect || (() => {})}
        options={members.map((member) => ({
          id: member.id,
          label: member.name,
          icon: <User className="h-4 w-4" />,
          status: member.status
        }))}
      />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Member Card */}
        <div className="lg:col-span-2">
          {selectedMember ? (
            <ProfessionalMemberCard
              member={selectedMember}
              onView={() => onView?.(selectedMember.id)}
              onEdit={() => onEdit?.(selectedMember.id)}
              onMore={() => onMore?.(selectedMember.id)}
            />
          ) : (
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 text-center">
              <User className="h-12 w-12 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-400">No member selected</p>
            </div>
          )}
        </div>

        {/* Right: Quick Stats */}
        <div className="space-y-4">
          <Card className="bg-admin-panel border-line-soft">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-text">Quick Stats</CardTitle>
              <CardDescription className="text-text-muted">Key information at a glance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Status */}
              <div className="flex items-center justify-between p-3 bg-surface-elev2 rounded-lg">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-text-muted" />
                  <span className="text-sm font-medium text-text">Status</span>
                </div>
                <div className={`px-2 py-1 rounded text-xs font-semibold ${statusInfo.bgColor} ${statusInfo.color}`}>
                  {selectedMember?.status || 'N/A'}
                </div>
              </div>

              {/* Role */}
              <div className="flex items-center justify-between p-3 bg-surface-elev2 rounded-lg">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-text-muted" />
                  <span className="text-sm font-medium text-text">Role</span>
                </div>
                <div className={`px-2 py-1 rounded text-xs font-semibold ${roleInfo.bgColor} ${roleInfo.color}`}>
                  {selectedMember?.role || 'N/A'}
                </div>
              </div>

              {/* Posts Count */}
              <div className="flex items-center justify-between p-3 bg-surface-elev2 rounded-lg">
                <div className="flex items-center gap-2">
                  <FileImage className="h-4 w-4 text-text-muted" />
                  <span className="text-sm font-medium text-text">Posts</span>
                </div>
                <span className="text-sm font-semibold text-text">
                  {selectedMember?.stats?.posts_count || 0}
                </span>
              </div>

              {/* Followers */}
              <div className="flex items-center justify-between p-3 bg-surface-elev2 rounded-lg">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-text-muted" />
                  <span className="text-sm font-medium text-text">Followers</span>
                </div>
                <span className="text-sm font-semibold text-text">
                  {selectedMember?.stats?.followers_count?.toLocaleString() || 0}
                </span>
              </div>

              {/* Earnings */}
              <div className="flex items-center justify-between p-3 bg-surface-elev2 rounded-lg">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-text-muted" />
                  <span className="text-sm font-medium text-text">Earnings</span>
                </div>
                <span className="text-sm font-semibold text-text">
                  ${selectedMember?.stats?.earnings?.toFixed(2) || '0.00'}
                </span>
              </div>

              {/* Location */}
              <div className="flex items-center justify-between p-3 bg-surface-elev2 rounded-lg">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-text-muted" />
                  <span className="text-sm font-medium text-text">Location</span>
                </div>
                <span className="text-sm text-text-muted">
                  {selectedMember?.city}, {selectedMember?.country}
                </span>
              </div>

              {/* Join Date */}
              <div className="flex items-center justify-between p-3 bg-surface-elev2 rounded-lg">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-text-muted" />
                  <span className="text-sm font-medium text-text">Joined</span>
                </div>
                <span className="text-sm text-text-muted">
                  {selectedMember?.created_at ? new Date(selectedMember.created_at).toLocaleDateString() : 'N/A'}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Additional Actions */}
          <Card className="bg-admin-panel border-line-soft">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-text">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button 
                variant="outline" 
                className="w-full bg-surface-elev2 border-line-soft text-text hover:bg-surface-elev1"
                onClick={() => onView?.(selectedMember?.id || '')}
              >
                <Eye className="h-4 w-4 mr-2" />
                View Profile
              </Button>
              <Button 
                variant="outline" 
                className="w-full bg-surface-elev2 border-line-soft text-text hover:bg-surface-elev1"
                onClick={() => onEdit?.(selectedMember?.id || '')}
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Member
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// ----------------------
// Members Page Client Component
// Purpose: Manages state and interactions for the members page
// ----------------------
function MembersPageClient() {
  const [selectedMemberId, setSelectedMemberId] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const membersService = new MembersManagementService();
  const allMembers = membersService.getMembers();
  const stats = membersService.getStats();

  // Filter members based on search and status
  const filteredMembers = allMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || member.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Set default selected member
  useEffect(() => {
    if (filteredMembers.length > 0 && !selectedMemberId) {
      setSelectedMemberId(filteredMembers[0].id);
    }
  }, [filteredMembers, selectedMemberId]);

  const handleMemberSelect = (memberId: string) => {
    setSelectedMemberId(memberId);
  };

  const handleView = (memberId: string) => {
    console.log('View member:', memberId);
  };

  const handleEdit = (memberId: string) => {
    console.log('Edit member:', memberId);
  };

  const handleMore = (memberId: string) => {
    console.log('More actions for member:', memberId);
  };

  const handleRefresh = () => {
    console.log('Refresh members');
  };

  const handleExport = () => {
    console.log('Export members');
  };

  const statsCards = (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard
        title="Total Members"
        value={stats.totalMembers}
        growth={12}
        icon={Users}
        format="number"
      />
      <MetricCard
        title="Premium Members"
        value={stats.premiumMembers}
        growth={8}
        icon={Crown}
        format="number"
      />
      <MetricCard
        title="Total Earnings"
        value={stats.totalEarnings}
        growth={15}
        icon={DollarSign}
        format="currency"
      />
      <MetricCard
        title="Moderators"
        value={stats.moderators}
        growth={0}
        icon={Shield}
        format="number"
      />
    </div>
  );

  const filters = (
    <div className="flex items-center gap-2">
      <Select value={statusFilter} onValueChange={setStatusFilter}>
        <SelectTrigger className="w-40 bg-surface-elev2 border-line-soft text-text">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent className="bg-surface-elev2 border-line-soft">
          <SelectItem value="all" className="text-text hover:bg-surface-elev1">All Status</SelectItem>
          <SelectItem value="active" className="text-text hover:bg-surface-elev1">Active</SelectItem>
          <SelectItem value="inactive" className="text-text hover:bg-surface-elev1">Inactive</SelectItem>
          <SelectItem value="banned" className="text-text hover:bg-surface-elev1">Banned</SelectItem>
          <SelectItem value="suspended" className="text-text hover:bg-surface-elev1">Suspended</SelectItem>
          <SelectItem value="pending" className="text-text hover:bg-surface-elev1">Pending</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );

  return (
    <AdminPageTemplate
      title="Members Management"
      description="Manage platform members, roles, and permissions"
      icon={<Users className="h-6 w-6" />}
      searchPlaceholder="Search members, emails, or usernames..."
      searchValue={searchTerm}
      onSearchChange={setSearchTerm}
      showSearch={true}
      showFilters={true}
      showRefresh={true}
      showExport={true}
      onRefresh={handleRefresh}
      onExport={handleExport}
      filters={filters}
      stats={statsCards}
    >
      <MembersDetailView
        members={filteredMembers}
        selectedMemberId={selectedMemberId}
        onMemberSelect={handleMemberSelect}
        onView={handleView}
        onEdit={handleEdit}
        onMore={handleMore}
      />
    </AdminPageTemplate>
  );
}

export default function MembersPage() {
  return <MembersPageClient />;
}
