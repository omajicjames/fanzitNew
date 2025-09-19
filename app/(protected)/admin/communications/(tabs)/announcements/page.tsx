"use client";

import { useState, useEffect } from "react";
import { AdminPageTemplate, MetricCard } from "@src/components/admin/AdminPageTemplate";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@src/components/ui/card";
import { Badge } from "@src/components/ui/badge";
import { Button } from "@src/components/ui/button";
import { Input } from "@src/components/ui/input";
import { Textarea } from "@src/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@src/components/ui/select";
import { 
  Bell, 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Filter,
  Eye,
  CheckCircle,
  Clock,
  AlertTriangle,
  Calendar,
  Users,
  Target,
  MoreHorizontal,
  Mail,
  Send,
  MessageSquare,
  Smartphone,
  Star,
  Crown,
  FileImage,
  MapPin,
  Activity,
  Zap,
  Award,
  Phone,
  Globe,
  Heart,
  Share2,
  ThumbsUp,
  ThumbsDown,
  Play,
  Pause,
  Volume2,
  VolumeX,
  ExternalLink,
  BadgeCheck,
  UserCheck,
  UserX,
  Building,
  CreditCard,
  RotateCcw,
  BarChart3,
  Settings,
  Ban,
  CheckSquare,
  XSquare,
  Reply,
  User,
  TrendingUp,
  DollarSign,
  FileText
} from "lucide-react";
import AnnouncementModal from "@src/features/right-rail/AnnouncementModal";

// ----------------------
// Communications Management Page
// Location: /app/(protected)/admin/communications/(tabs)/announcements/page.tsx
// Purpose: Comprehensive communications management for admin users
// Features: Manage announcements, emails, messages, and notifications
// Note: Combined all communication types into one unified interface
// ----------------------

interface CommunicationData {
  id: string;
  title: string;
  description: string;
  content: string;
  link?: string;
  type: 'announcement' | 'email' | 'message' | 'notification';
  subtype: 'info' | 'warning' | 'success' | 'promo' | 'campaign' | 'conversation' | 'push' | 'alert';
  status: 'draft' | 'scheduled' | 'sent' | 'delivered' | 'failed' | 'active' | 'inactive';
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  views: number;
  clicks: number;
  opens?: number;
  replies?: number;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  targetAudience: 'all' | 'creators' | 'subscribers' | 'specific';
  scheduledFor?: string;
  expiresAt?: string;
  recipientCount?: number;
  deliveryRate?: number;
  openRate?: number;
  replyRate?: number;
}

class CommunicationsService {
  private communications: CommunicationData[] = [
    // Announcements
    {
      id: '1',
      title: 'Premium Trial Available',
      description: 'Try premium features free for 30 days. Unlock advanced analytics and tools.',
      content: 'Get access to premium features including advanced analytics, priority support, and exclusive tools. No credit card required for the first 30 days.',
      link: '/premium/trial',
      type: 'announcement',
      subtype: 'promo',
      status: 'active',
      isActive: true,
      createdAt: new Date('2025-01-25T10:00:00Z'),
      updatedAt: new Date('2025-01-25T10:00:00Z'),
      createdBy: 'admin',
      views: 12547,
      clicks: 892,
      priority: 'high',
      targetAudience: 'all',
      expiresAt: '2025-02-25T10:00:00Z'
    },
    {
      id: '2',
      title: 'Platform Maintenance Scheduled',
      description: 'We will be performing scheduled maintenance on January 30th from 2-4 AM EST.',
      content: 'Scheduled maintenance will include server updates, security patches, and performance improvements. Some features may be temporarily unavailable.',
      link: '/maintenance',
      type: 'announcement',
      subtype: 'warning',
      status: 'active',
      isActive: true,
      createdAt: new Date('2025-01-26T09:00:00Z'),
      updatedAt: new Date('2025-01-26T09:00:00Z'),
      createdBy: 'admin',
      views: 8943,
      clicks: 234,
      priority: 'medium',
      targetAudience: 'all',
      scheduledFor: '2025-01-30T02:00:00Z'
    },
    // Email Campaigns
    {
      id: '3',
      title: 'Welcome New Creators',
      description: 'Email campaign for new creator onboarding',
      content: 'Welcome to our platform! This email contains important information about getting started as a creator.',
      type: 'email',
      subtype: 'campaign',
      status: 'sent',
      isActive: true,
      createdAt: new Date('2025-01-24T14:00:00Z'),
      updatedAt: new Date('2025-01-24T14:00:00Z'),
      createdBy: 'admin',
      views: 0,
      clicks: 0,
      opens: 1247,
      priority: 'medium',
      targetAudience: 'creators',
      recipientCount: 1247,
      deliveryRate: 100,
      openRate: 68
    },
    {
      id: '4',
      title: 'Platform Updates Newsletter',
      description: 'Monthly newsletter with platform updates and new features',
      content: 'This month we\'ve added several new features including improved analytics and enhanced creator tools.',
      type: 'email',
      subtype: 'campaign',
      status: 'scheduled',
      isActive: true,
      createdAt: new Date('2025-01-23T16:00:00Z'),
      updatedAt: new Date('2025-01-23T16:00:00Z'),
      createdBy: 'admin',
      views: 0,
      clicks: 0,
      priority: 'low',
      targetAudience: 'all',
      recipientCount: 15420,
      scheduledFor: '2025-01-30T09:00:00Z'
    },
    // Messages
    {
      id: '5',
      title: 'Creator Support Inquiry',
      description: 'User inquiry about payout processing',
      content: 'Hey, when will my payout be processed? I submitted it 3 days ago and haven\'t heard anything.',
      type: 'message',
      subtype: 'conversation',
      status: 'active',
      isActive: true,
      createdAt: new Date('2025-01-27T11:30:00Z'),
      updatedAt: new Date('2025-01-27T11:30:00Z'),
      createdBy: 'creator123',
      views: 0,
      clicks: 0,
      replies: 0,
      priority: 'medium',
      targetAudience: 'specific'
    },
    {
      id: '6',
      title: 'Premium Content Access Issue',
      description: 'User reporting trouble accessing premium content',
      content: 'I\'m having trouble accessing premium content that I\'ve paid for. The content shows as locked even though I have an active subscription.',
      type: 'message',
      subtype: 'conversation',
      status: 'active',
      isActive: true,
      createdAt: new Date('2025-01-27T09:15:00Z'),
      updatedAt: new Date('2025-01-27T09:15:00Z'),
      createdBy: 'fan456',
      views: 0,
      clicks: 0,
      replies: 1,
      priority: 'high',
      targetAudience: 'specific'
    },
    // Notifications
    {
      id: '7',
      title: 'New Creator Alert',
      description: 'Push notification about new creator joining',
      content: 'A new creator has joined the platform! Check out their profile and content.',
      type: 'notification',
      subtype: 'push',
      status: 'delivered',
      isActive: true,
      createdAt: new Date('2025-01-26T15:45:00Z'),
      updatedAt: new Date('2025-01-26T15:45:00Z'),
      createdBy: 'admin',
      views: 0,
      clicks: 0,
      priority: 'low',
      targetAudience: 'all',
      recipientCount: 5247,
      deliveryRate: 94,
      openRate: 23
    },
    {
      id: '8',
      title: 'Payment Processed',
      description: 'Push notification for successful payment processing',
      content: 'Your payment has been successfully processed. You can now access premium features.',
      type: 'notification',
      subtype: 'push',
      status: 'scheduled',
      isActive: true,
      createdAt: new Date('2025-01-27T08:00:00Z'),
      updatedAt: new Date('2025-01-27T08:00:00Z'),
      createdBy: 'admin',
      views: 0,
      clicks: 0,
      priority: 'medium',
      targetAudience: 'subscribers',
      recipientCount: 1247,
      scheduledFor: '2025-01-27T14:00:00Z'
    }
  ];

  public getAllCommunications(): CommunicationData[] {
    return this.communications;
  }

  public getCommunicationsByType(type: string): CommunicationData[] {
    return this.communications.filter(c => c.type === type);
  }

  public getActiveCommunications(): CommunicationData[] {
    return this.communications.filter(c => c.isActive);
  }

  public getCommunicationsByStatus(status: string): CommunicationData[] {
    return this.communications.filter(c => c.status === status);
  }

  public getCommunicationsByPriority(priority: string): CommunicationData[] {
    return this.communications.filter(c => c.priority === priority);
  }

  public createCommunication(communication: Omit<CommunicationData, 'id' | 'createdAt' | 'updatedAt' | 'views' | 'clicks'>): CommunicationData {
    const newCommunication: CommunicationData = {
      ...communication,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
      views: 0,
      clicks: 0
    };
    this.communications.push(newCommunication);
    return newCommunication;
  }

  public updateCommunication(id: string, updates: Partial<CommunicationData>): CommunicationData | null {
    const index = this.communications.findIndex(c => c.id === id);
    if (index !== -1) {
      this.communications[index] = {
        ...this.communications[index],
        ...updates,
        updatedAt: new Date()
      };
      return this.communications[index];
    }
    return null;
  }

  public deleteCommunication(id: string): boolean {
    const index = this.communications.findIndex(c => c.id === id);
    if (index !== -1) {
      this.communications.splice(index, 1);
      return true;
    }
    return false;
  }

  public getStats() {
    const total = this.communications.length;
    const active = this.communications.filter(c => c.isActive).length;
    const totalViews = this.communications.reduce((sum, c) => sum + c.views, 0);
    const totalClicks = this.communications.reduce((sum, c) => sum + c.clicks, 0);
    const totalOpens = this.communications.reduce((sum, c) => sum + (c.opens || 0), 0);
    const totalReplies = this.communications.reduce((sum, c) => sum + (c.replies || 0), 0);

    return {
      total,
      active,
      totalViews,
      totalClicks,
      totalOpens,
      totalReplies
    };
  }
}

// ----------------------
// Professional Communication Card Component
// Purpose: Displays communication information in a structured, professional layout
// Note: Similar to verification card with communication-specific data
// ----------------------
function ProfessionalCommunicationCard({
  communication,
  onView,
  onEdit,
  onDelete,
  onMore,
  className = ""
}: {
  communication: CommunicationData;
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onMore?: () => void;
  className?: string;
}) {
  const getTypeIcon = () => {
    const typeIcons = {
      announcement: Bell,
      email: Mail,
      message: MessageSquare,
      notification: Smartphone
    };
    const Icon = typeIcons[communication.type];
    return <Icon className="h-4 w-4" />;
  };

  const getSubtypeBadge = () => {
    const subtypeConfig = {
      info: { variant: "default" as const, icon: Bell, text: "Info", color: "text-blue-600" },
      warning: { variant: "destructive" as const, icon: AlertTriangle, text: "Warning", color: "text-yellow-600" },
      success: { variant: "default" as const, icon: CheckCircle, text: "Success", color: "text-green-600" },
      promo: { variant: "default" as const, icon: Target, text: "Promotion", color: "text-purple-600" },
      campaign: { variant: "secondary" as const, icon: Send, text: "Campaign", color: "text-blue-600" },
      conversation: { variant: "outline" as const, icon: MessageSquare, text: "Conversation", color: "text-gray-600" },
      push: { variant: "default" as const, icon: Smartphone, text: "Push", color: "text-orange-600" },
      alert: { variant: "destructive" as const, icon: AlertTriangle, text: "Alert", color: "text-red-600" }
    };

    const config = subtypeConfig[communication.subtype] || subtypeConfig.info;
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {config.text}
      </Badge>
    );
  };

  const getStatusBadge = () => {
    const statusConfig = {
      draft: { variant: "secondary" as const, icon: Edit, text: "Draft", color: "text-gray-600" },
      scheduled: { variant: "secondary" as const, icon: Clock, text: "Scheduled", color: "text-yellow-600" },
      sent: { variant: "default" as const, icon: Send, text: "Sent", color: "text-blue-600" },
      delivered: { variant: "default" as const, icon: CheckCircle, text: "Delivered", color: "text-green-600" },
      failed: { variant: "destructive" as const, icon: AlertTriangle, text: "Failed", color: "text-red-600" },
      active: { variant: "default" as const, icon: CheckCircle, text: "Active", color: "text-green-600" },
      inactive: { variant: "secondary" as const, icon: Clock, text: "Inactive", color: "text-gray-600" }
    };

    const config = statusConfig[communication.status] || statusConfig.draft;
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {config.text}
      </Badge>
    );
  };

  const getPriorityBadge = () => {
    const priorityConfig = {
      low: { variant: "outline" as const, text: "Low", color: "text-gray-600" },
      medium: { variant: "secondary" as const, text: "Medium", color: "text-yellow-600" },
      high: { variant: "default" as const, text: "High", color: "text-orange-600" },
      urgent: { variant: "destructive" as const, text: "Urgent", color: "text-red-600" }
    };

    const config = priorityConfig[communication.priority] || priorityConfig.medium;
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
            <div className="h-12 w-12 rounded-lg bg-surface-elev2 flex items-center justify-center border border-line-soft">
              {getTypeIcon()}
            </div>
            <div>
              <CardTitle className="text-lg text-text flex items-center gap-2">
                {communication.title}
                {getSubtypeBadge()}
              </CardTitle>
              <CardDescription className="text-text-muted">{communication.description}</CardDescription>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            {getStatusBadge()}
            {getPriorityBadge()}
            </div>
          </div>
        </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Communication Overview */}
        <div className="bg-surface-elev2 rounded-lg p-4 border border-line-soft">
          <div className="flex items-center gap-2 mb-3">
            {getTypeIcon()}
            <span className="font-medium text-text">Communication Overview</span>
                </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-sm text-text-muted">Type:</span>
              <div className="mt-1 flex items-center gap-2">
                {getTypeIcon()}
                <span className="text-sm text-text capitalize">{communication.type}</span>
              </div>
            </div>
            <div>
              <span className="text-sm text-text-muted">Status:</span>
              <div className="mt-1">
                {getStatusBadge()}
              </div>
            </div>
            <div>
              <span className="text-sm text-text-muted">Priority:</span>
              <div className="mt-1">
                {getPriorityBadge()}
              </div>
            </div>
            <div>
              <span className="text-sm text-text-muted">Audience:</span>
              <div className="mt-1">
                <Badge variant="outline" className="text-xs">
                  {communication.targetAudience}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-surface-elev2 rounded-lg p-4 text-center border border-line-soft">
            <div className="flex items-center justify-center gap-1 text-text-muted mb-1">
              <Eye className="h-4 w-4" />
              <span className="text-xs font-medium">Views</span>
            </div>
            <div className="text-lg font-bold text-text">
              {communication.views.toLocaleString()}
            </div>
          </div>
          <div className="bg-surface-elev2 rounded-lg p-4 text-center border border-line-soft">
            <div className="flex items-center justify-center gap-1 text-text-muted mb-1">
              <Target className="h-4 w-4" />
              <span className="text-xs font-medium">Clicks</span>
            </div>
            <div className="text-lg font-bold text-text">
              {communication.clicks.toLocaleString()}
            </div>
          </div>
          <div className="bg-surface-elev2 rounded-lg p-4 text-center border border-line-soft">
            <div className="flex items-center justify-center gap-1 text-text-muted mb-1">
              {communication.type === 'email' ? <Mail className="h-4 w-4" /> :
               communication.type === 'message' ? <MessageSquare className="h-4 w-4" /> :
               communication.type === 'notification' ? <Smartphone className="h-4 w-4" /> :
               <Bell className="h-4 w-4" />}
              <span className="text-xs font-medium">
                {communication.type === 'email' ? 'Opens' :
                 communication.type === 'message' ? 'Replies' :
                 communication.type === 'notification' ? 'Delivered' : 'Active'}
              </span>
            </div>
            <div className="text-lg font-bold text-text">
              {communication.type === 'email' ? (communication.opens || 0).toLocaleString() :
               communication.type === 'message' ? (communication.replies || 0).toLocaleString() :
               communication.type === 'notification' ? (communication.deliveryRate || 0) + '%' :
               communication.isActive ? 'Yes' : 'No'}
            </div>
          </div>
        </div>

        {/* Creator Information */}
        <div className="bg-surface-elev2 rounded-lg p-4 border border-line-soft">
          <div className="flex items-center gap-2 mb-3">
            <User className="h-5 w-5 text-text-muted" />
            <span className="font-medium text-text">Creator Information</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-surface-elev1 flex items-center justify-center border border-line-soft">
              <User className="h-5 w-5 text-text-muted" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-text">{communication.createdBy}</p>
              <p className="text-xs text-text-muted">Created by</p>
            </div>
            <div className="text-sm text-text-muted">
              {communication.createdAt.toLocaleDateString()}
            </div>
          </div>
        </div>

        {/* Content Preview */}
        <div className="bg-surface-elev2 rounded-lg p-4 border border-line-soft">
          <div className="flex items-center gap-2 mb-3">
            <FileText className="h-5 w-5 text-text-muted" />
            <span className="font-medium text-text">Content Preview</span>
          </div>
          <p className="text-sm text-text-muted line-clamp-3">{communication.content}</p>
          {communication.link && (
            <div className="mt-2 flex items-center gap-2">
              <span className="text-sm text-text-muted">Link:</span>
              <code className="px-2 py-1 bg-surface-elev1 rounded text-xs text-text">{communication.link}</code>
            </div>
          )}
        </div>

        {/* Performance Metrics */}
        {(communication.recipientCount || communication.deliveryRate || communication.openRate) && (
          <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <BarChart3 className="h-5 w-5 text-blue-400" />
              <span className="font-medium text-blue-300">Performance Metrics</span>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              {communication.recipientCount && (
                <div className="flex items-center justify-between">
                  <span className="text-blue-200">Recipients:</span>
                  <span className="text-blue-300 font-semibold">{communication.recipientCount.toLocaleString()}</span>
                </div>
              )}
              {communication.deliveryRate && (
                <div className="flex items-center justify-between">
                  <span className="text-blue-200">Delivery Rate:</span>
                  <span className="text-blue-300 font-semibold">{communication.deliveryRate}%</span>
                </div>
              )}
              {communication.openRate && (
                <div className="flex items-center justify-between">
                  <span className="text-blue-200">Open Rate:</span>
                  <span className="text-blue-300 font-semibold">{communication.openRate}%</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Scheduling Information */}
        {(communication.scheduledFor || communication.expiresAt) && (
          <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="h-5 w-5 text-yellow-400" />
              <span className="font-medium text-yellow-300">Scheduling Information</span>
            </div>
            <div className="space-y-2 text-sm">
              {communication.scheduledFor && (
                <div className="flex items-center justify-between">
                  <span className="text-yellow-200">Scheduled For:</span>
                  <span className="text-yellow-300">{new Date(communication.scheduledFor).toLocaleString()}</span>
                </div>
              )}
              {communication.expiresAt && (
                <div className="flex items-center justify-between">
                  <span className="text-yellow-200">Expires At:</span>
                  <span className="text-yellow-300">{new Date(communication.expiresAt).toLocaleString()}</span>
                </div>
              )}
            </div>
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
            className="flex-1 bg-surface-elev2 border-line-soft text-text hover:bg-surface-elev1"
            onClick={onDelete}
          >
            <Trash2 className="h-4 w-4 mr-2" />
                  Delete
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
// Communications Detail View Component
// Purpose: Single card view with filtering and quick stats
// Note: Similar to verification page with communication-specific data
// ----------------------
function CommunicationsDetailView({
  communications,
  selectedCommunicationId,
  onCommunicationSelect,
  onView,
  onEdit,
  onDelete,
  onMore,
  className = ""
}: {
  communications: CommunicationData[];
  selectedCommunicationId?: string;
  onCommunicationSelect?: (communicationId: string) => void;
  onView?: (communicationId: string) => void;
  onEdit?: (communicationId: string) => void;
  onDelete?: (communicationId: string) => void;
  onMore?: (communicationId: string) => void;
  className?: string;
}) {
  const selectedCommunication = communications.find(c => c.id === selectedCommunicationId) || communications[0];

  const getTypeIcon = (type: string) => {
    const typeIcons = {
      announcement: Bell,
      email: Mail,
      message: MessageSquare,
      notification: Smartphone
    };
    const Icon = typeIcons[type as keyof typeof typeIcons];
    return Icon;
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      draft: { variant: "secondary" as const, color: "text-gray-600", bgColor: "bg-gray-100" },
      scheduled: { variant: "secondary" as const, color: "text-yellow-600", bgColor: "bg-yellow-100" },
      sent: { variant: "default" as const, color: "text-blue-600", bgColor: "bg-blue-100" },
      delivered: { variant: "default" as const, color: "text-green-600", bgColor: "bg-green-100" },
      failed: { variant: "destructive" as const, color: "text-red-600", bgColor: "bg-red-100" },
      active: { variant: "default" as const, color: "text-green-600", bgColor: "bg-green-100" },
      inactive: { variant: "secondary" as const, color: "text-gray-600", bgColor: "bg-gray-100" }
    };
    return statusConfig[status as keyof typeof statusConfig] || statusConfig.draft;
  };

  const statusInfo = getStatusBadge(selectedCommunication?.status || 'draft');

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Filter Section */}
      <div className="bg-surface-elev1 border border-line-soft rounded-lg p-4">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <label className="text-sm font-medium text-text-muted mb-2 block">Select Communication</label>
            <Select value={selectedCommunicationId || communications[0]?.id} onValueChange={onCommunicationSelect}>
              <SelectTrigger className="bg-surface-elev2 border-line-soft text-text">
                <SelectValue placeholder="Choose a communication..." />
              </SelectTrigger>
              <SelectContent className="bg-surface-elev2 border-line-soft">
                {communications.map((communication) => {
                  const Icon = getTypeIcon(communication.type);
                  return (
                    <SelectItem 
                      key={communication.id} 
                      value={communication.id}
                      className="text-text hover:bg-surface-elev1"
                    >
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4" />
                        <span>{communication.title}</span>
                        <Badge 
                          variant={communication.status === 'active' || communication.status === 'delivered' ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {communication.status}
                        </Badge>
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Communication Card */}
        <div className="lg:col-span-2">
          {selectedCommunication ? (
            <ProfessionalCommunicationCard
              communication={selectedCommunication}
              onView={() => onView?.(selectedCommunication.id)}
              onEdit={() => onEdit?.(selectedCommunication.id)}
              onDelete={() => onDelete?.(selectedCommunication.id)}
              onMore={() => onMore?.(selectedCommunication.id)}
            />
          ) : (
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 text-center">
              <Bell className="h-12 w-12 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-400">No communication selected</p>
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
              {/* Type */}
              <div className="flex items-center justify-between p-3 bg-surface-elev2 rounded-lg">
                <div className="flex items-center gap-2">
                  {selectedCommunication && (() => {
                    const Icon = getTypeIcon(selectedCommunication.type);
                    return <Icon className="h-4 w-4 text-text-muted" />;
                  })()}
                  <span className="text-sm font-medium text-text">Type</span>
                </div>
                <span className="text-sm font-semibold text-text">
                  {selectedCommunication?.type?.toUpperCase() || 'N/A'}
                </span>
              </div>

              {/* Status */}
              <div className="flex items-center justify-between p-3 bg-surface-elev2 rounded-lg">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-text-muted" />
                  <span className="text-sm font-medium text-text">Status</span>
                </div>
                <div className={`px-2 py-1 rounded text-xs font-semibold ${statusInfo.bgColor} ${statusInfo.color}`}>
                  {selectedCommunication?.status || 'N/A'}
                </div>
              </div>

              {/* Views */}
              <div className="flex items-center justify-between p-3 bg-surface-elev2 rounded-lg">
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4 text-text-muted" />
                  <span className="text-sm font-medium text-text">Views</span>
                </div>
                <span className="text-sm font-semibold text-text">
                  {selectedCommunication?.views?.toLocaleString() || 0}
                </span>
              </div>

              {/* Clicks */}
              <div className="flex items-center justify-between p-3 bg-surface-elev2 rounded-lg">
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-text-muted" />
                  <span className="text-sm font-medium text-text">Clicks</span>
                </div>
                <span className="text-sm font-semibold text-text">
                  {selectedCommunication?.clicks?.toLocaleString() || 0}
                </span>
              </div>

              {/* Priority */}
              <div className="flex items-center justify-between p-3 bg-surface-elev2 rounded-lg">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-text-muted" />
                  <span className="text-sm font-medium text-text">Priority</span>
                </div>
                <span className="text-sm font-semibold text-text">
                  {selectedCommunication?.priority?.toUpperCase() || 'N/A'}
                </span>
              </div>

              {/* Audience */}
              <div className="flex items-center justify-between p-3 bg-surface-elev2 rounded-lg">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-text-muted" />
                  <span className="text-sm font-medium text-text">Audience</span>
                </div>
                <span className="text-sm font-semibold text-text">
                  {selectedCommunication?.targetAudience?.toUpperCase() || 'N/A'}
                </span>
              </div>

              {/* Created Date */}
              <div className="flex items-center justify-between p-3 bg-surface-elev2 rounded-lg">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-text-muted" />
                  <span className="text-sm font-medium text-text">Created</span>
                </div>
                <span className="text-sm text-text-muted">
                  {selectedCommunication?.createdAt ? new Date(selectedCommunication.createdAt).toLocaleDateString() : 'N/A'}
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
                onClick={() => onView?.(selectedCommunication?.id || '')}
              >
                <Eye className="h-4 w-4 mr-2" />
                View Communication
              </Button>
              <Button 
                variant="outline" 
                className="w-full bg-surface-elev2 border-line-soft text-text hover:bg-surface-elev1"
                onClick={() => onEdit?.(selectedCommunication?.id || '')}
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Communication
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// ----------------------
// Communications Page Client Component
// Purpose: Manages state and interactions for the communications page
// ----------------------
function CommunicationsPageClient() {
  const [selectedCommunicationId, setSelectedCommunicationId] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const communicationsService = new CommunicationsService();
  const allCommunications = communicationsService.getAllCommunications();
  const stats = communicationsService.getStats();

  // Filter communications based on search, type, and status
  const filteredCommunications = allCommunications.filter(communication => {
    const matchesSearch = communication.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         communication.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         communication.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         communication.createdBy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || communication.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || communication.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  // Set default selected communication
  useEffect(() => {
    if (filteredCommunications.length > 0 && !selectedCommunicationId) {
      setSelectedCommunicationId(filteredCommunications[0].id);
    }
  }, [filteredCommunications, selectedCommunicationId]);

  const handleCommunicationSelect = (communicationId: string) => {
    setSelectedCommunicationId(communicationId);
  };

  const handleView = (communicationId: string) => {
    console.log('View communication:', communicationId);
  };

  const handleEdit = (communicationId: string) => {
    console.log('Edit communication:', communicationId);
  };

  const handleDelete = (communicationId: string) => {
    console.log('Delete communication:', communicationId);
  };

  const handleMore = (communicationId: string) => {
    console.log('More actions for communication:', communicationId);
  };

  const handleRefresh = () => {
    console.log('Refresh communications');
  };

  const handleExport = () => {
    console.log('Export communications');
  };

  const statsCards = (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard
        title="Total Communications"
        value={stats.total}
        growth={12.5}
        icon={Bell}
        format="number"
      />
      <MetricCard
        title="Active Communications"
        value={stats.active}
        growth={8.2}
        icon={CheckCircle}
        format="number"
      />
      <MetricCard
        title="Total Views"
        value={stats.totalViews}
        growth={15.3}
        icon={Eye}
        format="number"
      />
      <MetricCard
        title="Total Clicks"
        value={stats.totalClicks}
        growth={22.1}
        icon={Target}
        format="number"
      />
    </div>
  );

  const filters = (
    <div className="flex items-center gap-2">
      <Select value={typeFilter} onValueChange={setTypeFilter}>
        <SelectTrigger className="w-40 bg-surface-elev2 border-line-soft text-text">
          <SelectValue placeholder="Type" />
        </SelectTrigger>
        <SelectContent className="bg-surface-elev2 border-line-soft">
          <SelectItem value="all" className="text-text hover:bg-surface-elev1">All Types</SelectItem>
          <SelectItem value="announcement" className="text-text hover:bg-surface-elev1">Announcements</SelectItem>
          <SelectItem value="email" className="text-text hover:bg-surface-elev1">Email</SelectItem>
          <SelectItem value="message" className="text-text hover:bg-surface-elev1">Messages</SelectItem>
          <SelectItem value="notification" className="text-text hover:bg-surface-elev1">Notifications</SelectItem>
        </SelectContent>
      </Select>
      <Select value={statusFilter} onValueChange={setStatusFilter}>
        <SelectTrigger className="w-40 bg-surface-elev2 border-line-soft text-text">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent className="bg-surface-elev2 border-line-soft">
          <SelectItem value="all" className="text-text hover:bg-surface-elev1">All Status</SelectItem>
          <SelectItem value="active" className="text-text hover:bg-surface-elev1">Active</SelectItem>
          <SelectItem value="draft" className="text-text hover:bg-surface-elev1">Draft</SelectItem>
          <SelectItem value="scheduled" className="text-text hover:bg-surface-elev1">Scheduled</SelectItem>
          <SelectItem value="sent" className="text-text hover:bg-surface-elev1">Sent</SelectItem>
          <SelectItem value="delivered" className="text-text hover:bg-surface-elev1">Delivered</SelectItem>
          <SelectItem value="failed" className="text-text hover:bg-surface-elev1">Failed</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );

  return (
    <AdminPageTemplate
      title="Communications Management"
      description="Manage announcements, emails, messages, and notifications"
      icon={<Bell className="h-6 w-6" />}
      searchPlaceholder="Search communications by title, content, or creator..."
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
      <CommunicationsDetailView
        communications={filteredCommunications}
        selectedCommunicationId={selectedCommunicationId}
        onCommunicationSelect={handleCommunicationSelect}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onMore={handleMore}
      />
    </AdminPageTemplate>
  );
}

export default function AdminCommunicationsPage() {
  return <CommunicationsPageClient />;
}
