"use client";

import { useState, useEffect } from "react";
import { AdminPageTemplate, MetricCard } from "@src/components/admin/AdminPageTemplate";
import { SelectFilterSection } from "@src/components/admin/SelectFilterSection";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@src/components/ui/card";
import { Badge } from "@src/components/ui/badge";
import { Button } from "@src/components/ui/button";
import { Input } from "@src/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@src/components/ui/select";
import { 
  Shield, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Eye, 
  CheckCircle, 
  XCircle, 
  Clock,
  AlertTriangle,
  Image,
  Video,
  FileText,
  User,
  Flag,
  BarChart3,
  TrendingUp,
  Settings,
  Ban,
  CheckSquare,
  XSquare,
  MessageCircle,
  Reply,
  DollarSign,
  Star,
  Crown,
  FileImage,
  MapPin,
  Activity,
  Zap,
  Target,
  Award,
  Calendar,
  Phone,
  Globe,
  Mail,
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
  RotateCcw
} from "lucide-react";

// ----------------------
// Moderation Management Page
// Location: /app/(protected)/admin/moderation/page.tsx
// Purpose: Comprehensive content moderation and review system
// Features: Content review queue, moderation tools, analytics
// Note: Mobile-first design with object-oriented structure
// ----------------------

interface ModerationItem {
  id: string;
  type: 'image' | 'video' | 'text' | 'post' | 'comment' | 'reply';
  content: string;
  media?: {
    url: string;
    type: string;
    thumbnail?: string;
  };
  author: {
    id: string;
    name: string;
    username: string;
    avatar: string;
  };
  status: 'pending' | 'approved' | 'rejected' | 'escalated';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: 'inappropriate' | 'spam' | 'harassment' | 'copyright' | 'violence' | 'nudity' | 'other';
  flags: string[];
  reportCount: number;
  reportedBy: {
    id: string;
    name: string;
    reason: string;
  }[];
  createdAt: string;
  reviewedAt?: string;
  reviewedBy?: {
    id: string;
    name: string;
  };
  moderationNotes?: string;
  aiConfidence?: number;
  autoFlagged: boolean;
}

class ModerationService {
  private items: ModerationItem[] = [];

  constructor() {
    this.initializeMockData();
  }

  private initializeMockData() {
    this.items = [
      {
        id: "1",
        type: "image",
        content: "User uploaded image content",
        media: {
          url: "/placeholder.jpg",
          type: "image",
          thumbnail: "/placeholder-thumb.jpg"
        },
        author: {
          id: "1",
          name: "Sarah Johnson",
          username: "@sarahj",
          avatar: "/placeholder-user.jpg"
        },
        status: "pending",
        priority: "high",
        category: "nudity",
        flags: ["explicit_content", "inappropriate"],
        reportCount: 3,
        reportedBy: [
          { id: "1", name: "User A", reason: "Inappropriate content" },
          { id: "2", name: "User B", reason: "Explicit material" }
        ],
        createdAt: "2024-01-27T10:00:00Z",
        autoFlagged: true,
        aiConfidence: 0.85
      },
      {
        id: "2",
        type: "video",
        content: "User uploaded video content",
        media: {
          url: "/placeholder-video.mp4",
          type: "video",
          thumbnail: "/placeholder-thumb.jpg"
        },
        author: {
          id: "2",
          name: "Mike Chen",
          username: "@mikechen",
          avatar: "/placeholder-user.jpg"
        },
        status: "pending",
        priority: "medium",
        category: "copyright",
        flags: ["copyright_concern", "potential_dmca"],
        reportCount: 1,
        reportedBy: [
          { id: "3", name: "User C", reason: "Copyright violation" }
        ],
        createdAt: "2024-01-27T09:30:00Z",
        autoFlagged: false,
        aiConfidence: 0.65
      },
      {
        id: "3",
        type: "text",
        content: "This is inappropriate content that violates community guidelines!",
        author: {
          id: "3",
          name: "John Doe",
          username: "@johndoe",
          avatar: "/placeholder-user.jpg"
        },
        status: "escalated",
        priority: "urgent",
        category: "harassment",
        flags: ["harassment", "threats", "hate_speech"],
        reportCount: 5,
        reportedBy: [
          { id: "4", name: "User D", reason: "Harassment" },
          { id: "5", name: "User E", reason: "Hate speech" }
        ],
        createdAt: "2024-01-27T08:45:00Z",
        autoFlagged: true,
        aiConfidence: 0.92
      },
      {
        id: "4",
        type: "post",
        content: "Buy my course! Get 50% off! Link in bio!",
        author: {
          id: "4",
          name: "Spam User",
          username: "@spammer123",
          avatar: "/placeholder-user.jpg"
        },
        status: "rejected",
        priority: "low",
        category: "spam",
        flags: ["spam", "self_promotion", "commercial"],
        reportCount: 2,
        reportedBy: [
          { id: "6", name: "User F", reason: "Spam" }
        ],
        createdAt: "2024-01-26T15:20:00Z",
        reviewedAt: "2024-01-26T16:00:00Z",
        reviewedBy: {
          id: "mod1",
          name: "Moderator 1"
        },
        moderationNotes: "Clear spam content - rejected",
        autoFlagged: true,
        aiConfidence: 0.95
      }
    ];
  }

  public getItems(): ModerationItem[] {
    return this.items;
  }

  public getModerationStats() {
    const totalItems = this.items.length;
    const pendingItems = this.items.filter(i => i.status === 'pending').length;
    const approvedItems = this.items.filter(i => i.status === 'approved').length;
    const rejectedItems = this.items.filter(i => i.status === 'rejected').length;
    const escalatedItems = this.items.filter(i => i.status === 'escalated').length;
    const urgentItems = this.items.filter(i => i.priority === 'urgent').length;
    const autoFlaggedItems = this.items.filter(i => i.autoFlagged).length;
    const averageConfidence = totalItems > 0 ? this.items.reduce((sum, i) => sum + (i.aiConfidence || 0), 0) / totalItems : 0;

    return {
      totalItems,
      pendingItems,
      approvedItems,
      rejectedItems,
      escalatedItems,
      urgentItems,
      autoFlaggedItems,
      averageConfidence
    };
  }
}

// ----------------------
// Professional Moderation Card Component
// Purpose: Displays moderation item information in a structured, professional layout
// Note: Similar to verification card with moderation-specific data
// ----------------------
function ProfessionalModerationCard({
  item,
  onReview,
  onApprove,
  onReject,
  onMore,
  className = ""
}: {
  item: ModerationItem;
  onReview?: () => void;
  onApprove?: () => void;
  onReject?: () => void;
  onMore?: () => void;
  className?: string;
}) {
  const getStatusBadge = () => {
    const statusConfig = {
      pending: { variant: "secondary" as const, icon: Clock, text: "Pending", color: "text-yellow-600" },
      approved: { variant: "default" as const, icon: CheckCircle, text: "Approved", color: "text-green-600" },
      rejected: { variant: "destructive" as const, icon: XCircle, text: "Rejected", color: "text-red-600" },
      escalated: { variant: "destructive" as const, icon: AlertTriangle, text: "Escalated", color: "text-red-600" }
    };

    const config = statusConfig[item.status];
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
      low: { variant: "outline" as const, color: "text-gray-600", text: "Low" },
      medium: { variant: "secondary" as const, color: "text-yellow-600", text: "Medium" },
      high: { variant: "default" as const, color: "text-orange-600", text: "High" },
      urgent: { variant: "destructive" as const, color: "text-red-600", text: "Urgent" }
    };

    const config = priorityConfig[item.priority];

    return (
      <Badge variant={config.variant} className={`${config.color} border-current`}>
        {config.text}
      </Badge>
    );
  };

  const getTypeIcon = () => {
    const icons = {
      image: Image,
      video: Video,
      text: FileText,
      post: FileText,
      comment: MessageCircle,
      reply: Reply
    };
    const Icon = icons[item.type];
    return <Icon className="h-4 w-4" />;
  };

  const getCategoryBadge = () => {
    const categoryConfig = {
      inappropriate: { variant: "destructive" as const, text: "Inappropriate" },
      spam: { variant: "secondary" as const, text: "Spam" },
      harassment: { variant: "destructive" as const, text: "Harassment" },
      copyright: { variant: "outline" as const, text: "Copyright" },
      violence: { variant: "destructive" as const, text: "Violence" },
      nudity: { variant: "destructive" as const, text: "Nudity" },
      other: { variant: "outline" as const, text: "Other" }
    };

    const config = categoryConfig[item.category];

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
              {getTypeIcon()}
            </div>
            <div>
              <CardTitle className="text-lg text-text flex items-center gap-2">
                {item.type.toUpperCase()} Content
                {item.autoFlagged && (
                  <Shield className="h-4 w-4 text-blue-600" />
                )}
              </CardTitle>
              <CardDescription className="text-text-muted">by {item.author.name}</CardDescription>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            {getPriorityBadge()}
            {getStatusBadge()}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Content Preview */}
        <div className="bg-surface-elev2 rounded-lg p-4 border border-line-soft">
          <div className="flex items-center gap-2 mb-3">
            {getTypeIcon()}
            <span className="font-medium text-text">Content Preview</span>
          </div>
          <p className="text-sm text-text-muted line-clamp-3">{item.content}</p>
          {item.media && (
            <div className="aspect-video bg-surface-elev1 rounded-lg flex items-center justify-center mt-3 border border-line-soft">
              <div className="text-center">
                {getTypeIcon()}
                <p className="text-sm text-text-muted mt-2">
                  {item.media.type.toUpperCase()}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-surface-elev2 rounded-lg p-4 text-center border border-line-soft">
            <div className="flex items-center justify-center gap-1 text-text-muted mb-1">
              <Flag className="h-4 w-4" />
              <span className="text-xs font-medium">Reports</span>
            </div>
            <div className="text-lg font-bold text-text">
              {item.reportCount}
            </div>
          </div>
          <div className="bg-surface-elev2 rounded-lg p-4 text-center border border-line-soft">
            <div className="flex items-center justify-center gap-1 text-text-muted mb-1">
              <Shield className="h-4 w-4" />
              <span className="text-xs font-medium">AI Confidence</span>
            </div>
            <div className="text-lg font-bold text-text">
              {item.aiConfidence ? `${Math.round(item.aiConfidence * 100)}%` : 'N/A'}
            </div>
          </div>
          <div className="bg-surface-elev2 rounded-lg p-4 text-center border border-line-soft">
            <div className="flex items-center justify-center gap-1 text-text-muted mb-1">
              <Clock className="h-4 w-4" />
              <span className="text-xs font-medium">Age</span>
            </div>
            <div className="text-lg font-bold text-text">
              {Math.floor((Date.now() - new Date(item.createdAt).getTime()) / (1000 * 60 * 60 * 24))}d
            </div>
          </div>
        </div>

        {/* Author Information */}
        <div className="bg-surface-elev2 rounded-lg p-4 border border-line-soft">
          <div className="flex items-center gap-2 mb-3">
            <User className="h-5 w-5 text-text-muted" />
            <span className="font-medium text-text">Author Information</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-surface-elev1 flex items-center justify-center border border-line-soft">
              <User className="h-5 w-5 text-text-muted" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-text">{item.author.name}</p>
              <p className="text-xs text-text-muted">{item.author.username}</p>
            </div>
            <div className="text-sm text-text-muted">
              {new Date(item.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>

        {/* Moderation Details */}
        <div className="bg-surface-elev2 rounded-lg p-4 border border-line-soft">
          <div className="flex items-center gap-2 mb-3">
            <Shield className="h-5 w-5 text-text-muted" />
            <span className="font-medium text-text">Moderation Details</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-sm text-text-muted">Category:</span>
              <div className="mt-1">
                {getCategoryBadge()}
              </div>
            </div>
            <div>
              <span className="text-sm text-text-muted">Priority:</span>
              <div className="mt-1">
                {getPriorityBadge()}
              </div>
            </div>
            <div className="col-span-2">
              <span className="text-sm text-text-muted">Flags:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {item.flags.map((flag) => (
                  <Badge key={flag} variant="destructive" className="text-xs">
                    {flag.replace('_', ' ')}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Reports Section */}
        <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <Flag className="h-5 w-5 text-red-400" />
            <span className="font-medium text-red-300">{item.reportCount} Reports</span>
          </div>
          <div className="space-y-2">
            {item.reportedBy.slice(0, 3).map((reporter, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-red-900/30 rounded">
                <span className="text-sm text-red-200">{reporter.name}</span>
                <span className="text-xs text-red-300">{reporter.reason}</span>
              </div>
            ))}
            {item.reportedBy.length > 3 && (
              <p className="text-xs text-red-400 text-center">
                +{item.reportedBy.length - 3} more reports
              </p>
            )}
          </div>
        </div>

        {/* AI Analysis */}
        {item.aiConfidence && (
          <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <Shield className="h-5 w-5 text-blue-400" />
              <span className="font-medium text-blue-300">AI Analysis</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-blue-200">Confidence Level</span>
                <span className="text-sm font-bold text-blue-300">
                  {Math.round(item.aiConfidence * 100)}%
                </span>
              </div>
              <div className="w-full bg-blue-900/50 rounded-full h-2">
                <div 
                  className="bg-blue-400 h-2 rounded-full" 
                  style={{ width: `${item.aiConfidence * 100}%` }}
                ></div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-blue-300">Auto-flagged:</span>
                <Badge variant={item.autoFlagged ? "default" : "outline"} className="text-xs">
                  {item.autoFlagged ? "Yes" : "No"}
                </Badge>
              </div>
            </div>
          </div>
        )}

        {/* Moderation Notes */}
        {item.moderationNotes && (
          <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <MessageCircle className="h-5 w-5 text-yellow-400" />
              <span className="font-medium text-yellow-300">Moderation Notes</span>
            </div>
            <p className="text-sm text-yellow-200">{item.moderationNotes}</p>
          </div>
        )}

        {/* Review Information */}
        {item.reviewedAt && item.reviewedBy && (
          <div className="bg-surface-elev2 rounded-lg p-4 border border-line-soft">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="h-5 w-5 text-text-muted" />
              <span className="font-medium text-text">Review Information</span>
            </div>
            <div className="text-sm text-text-muted">
              <p>Reviewed: {new Date(item.reviewedAt).toLocaleDateString()}</p>
              <p>By: {item.reviewedBy.name}</p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2 border-t border-line-soft">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 bg-surface-elev2 border-line-soft text-text hover:bg-surface-elev1"
            onClick={onReview}
          >
            <Eye className="h-4 w-4 mr-2" />
            Review
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 bg-surface-elev2 border-line-soft text-text hover:bg-surface-elev1"
            onClick={onApprove}
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Approve
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 bg-surface-elev2 border-line-soft text-text hover:bg-surface-elev1"
            onClick={onReject}
          >
            <XCircle className="h-4 w-4 mr-2" />
            Reject
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
// Moderation Detail View Component
// Purpose: Single card view with filtering and quick stats
// Note: Similar to verification page with moderation-specific data
// ----------------------
function ModerationDetailView({
  items,
  selectedItemId,
  onItemSelect,
  onReview,
  onApprove,
  onReject,
  onMore,
  className = ""
}: {
  items: ModerationItem[];
  selectedItemId?: string;
  onItemSelect?: (itemId: string) => void;
  onReview?: (itemId: string) => void;
  onApprove?: (itemId: string) => void;
  onReject?: (itemId: string) => void;
  onMore?: (itemId: string) => void;
  className?: string;
}) {
  const selectedItem = items.find(i => i.id === selectedItemId) || items[0];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { variant: "secondary" as const, color: "text-yellow-600", bgColor: "bg-yellow-100" },
      approved: { variant: "default" as const, color: "text-green-600", bgColor: "bg-green-100" },
      rejected: { variant: "destructive" as const, color: "text-red-600", bgColor: "bg-red-100" },
      escalated: { variant: "destructive" as const, color: "text-red-600", bgColor: "bg-red-100" }
    };
    return statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
  };

  const getPriorityBadge = (priority: string) => {
    const priorityConfig = {
      low: { variant: "outline" as const, color: "text-gray-600", bgColor: "bg-gray-100" },
      medium: { variant: "secondary" as const, color: "text-yellow-600", bgColor: "bg-yellow-100" },
      high: { variant: "default" as const, color: "text-orange-600", bgColor: "bg-orange-100" },
      urgent: { variant: "destructive" as const, color: "text-red-600", bgColor: "bg-red-100" }
    };
    return priorityConfig[priority as keyof typeof priorityConfig] || priorityConfig.low;
  };

  const statusInfo = getStatusBadge(selectedItem?.status || 'pending');
  const priorityInfo = getPriorityBadge(selectedItem?.priority || 'low');

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Filter Section */}
      <SelectFilterSection
        title="Select Item"
        placeholder="Choose an item..."
        value={selectedItemId || items[0]?.id}
        onValueChange={onItemSelect || (() => {})}
        options={items.map((item) => ({
          id: item.id,
          label: item.type.toUpperCase(),
          icon: item.type === 'image' ? <Image className="h-4 w-4" /> :
                item.type === 'video' ? <Video className="h-4 w-4" /> :
                item.type === 'text' ? <FileText className="h-4 w-4" /> :
                item.type === 'post' ? <FileText className="h-4 w-4" /> :
                item.type === 'comment' ? <MessageCircle className="h-4 w-4" /> :
                <Reply className="h-4 w-4" />,
          status: item.status
        }))}
      />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Moderation Card */}
        <div className="lg:col-span-2">
          {selectedItem ? (
            <ProfessionalModerationCard
              item={selectedItem}
              onReview={() => onReview?.(selectedItem.id)}
              onApprove={() => onApprove?.(selectedItem.id)}
              onReject={() => onReject?.(selectedItem.id)}
              onMore={() => onMore?.(selectedItem.id)}
            />
          ) : (
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 text-center">
              <Shield className="h-12 w-12 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-400">No item selected</p>
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
                  {selectedItem?.status || 'N/A'}
                </div>
              </div>

              {/* Priority */}
              <div className="flex items-center justify-between p-3 bg-surface-elev2 rounded-lg">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-text-muted" />
                  <span className="text-sm font-medium text-text">Priority</span>
                </div>
                <div className={`px-2 py-1 rounded text-xs font-semibold ${priorityInfo.bgColor} ${priorityInfo.color}`}>
                  {selectedItem?.priority || 'N/A'}
                </div>
              </div>

              {/* Type */}
              <div className="flex items-center justify-between p-3 bg-surface-elev2 rounded-lg">
                <div className="flex items-center gap-2">
                  {selectedItem?.type === 'image' ? <Image className="h-4 w-4 text-text-muted" /> :
                   selectedItem?.type === 'video' ? <Video className="h-4 w-4 text-text-muted" /> :
                   selectedItem?.type === 'text' ? <FileText className="h-4 w-4 text-text-muted" /> :
                   selectedItem?.type === 'post' ? <FileText className="h-4 w-4 text-text-muted" /> :
                   selectedItem?.type === 'comment' ? <MessageCircle className="h-4 w-4 text-text-muted" /> :
                   <Reply className="h-4 w-4 text-text-muted" />}
                  <span className="text-sm font-medium text-text">Type</span>
                </div>
                <span className="text-sm font-semibold text-text">
                  {selectedItem?.type?.toUpperCase() || 'N/A'}
                </span>
              </div>

              {/* Reports */}
              <div className="flex items-center justify-between p-3 bg-surface-elev2 rounded-lg">
                <div className="flex items-center gap-2">
                  <Flag className="h-4 w-4 text-text-muted" />
                  <span className="text-sm font-medium text-text">Reports</span>
                </div>
                <span className="text-sm font-semibold text-text">
                  {selectedItem?.reportCount || 0}
                </span>
              </div>

              {/* AI Confidence */}
              <div className="flex items-center justify-between p-3 bg-surface-elev2 rounded-lg">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-text-muted" />
                  <span className="text-sm font-medium text-text">AI Confidence</span>
                </div>
                <span className="text-sm font-semibold text-text">
                  {selectedItem?.aiConfidence ? `${Math.round(selectedItem.aiConfidence * 100)}%` : 'N/A'}
                </span>
              </div>

              {/* Created Date */}
              <div className="flex items-center justify-between p-3 bg-surface-elev2 rounded-lg">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-text-muted" />
                  <span className="text-sm font-medium text-text">Created</span>
                </div>
                <span className="text-sm text-text-muted">
                  {selectedItem?.createdAt ? new Date(selectedItem.createdAt).toLocaleDateString() : 'N/A'}
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
                onClick={() => onReview?.(selectedItem?.id || '')}
              >
                <Eye className="h-4 w-4 mr-2" />
                Review Item
              </Button>
              <Button 
                variant="outline" 
                className="w-full bg-surface-elev2 border-line-soft text-text hover:bg-surface-elev1"
                onClick={() => onApprove?.(selectedItem?.id || '')}
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Approve Item
              </Button>
              <Button 
                variant="outline" 
                className="w-full bg-surface-elev2 border-line-soft text-text hover:bg-surface-elev1"
                onClick={() => onReject?.(selectedItem?.id || '')}
              >
                <XCircle className="h-4 w-4 mr-2" />
                Reject Item
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// ----------------------
// Moderation Page Client Component
// Purpose: Manages state and interactions for the moderation page
// ----------------------
function ModerationPageClient() {
  const [selectedItemId, setSelectedItemId] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const moderationService = new ModerationService();
  const allItems = moderationService.getItems();
  const stats = moderationService.getModerationStats();

  // Filter items based on search and status
  const filteredItems = allItems.filter(item => {
    const matchesSearch = item.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.author.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.author.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Set default selected item
  useEffect(() => {
    if (filteredItems.length > 0 && !selectedItemId) {
      setSelectedItemId(filteredItems[0].id);
    }
  }, [filteredItems, selectedItemId]);

  const handleItemSelect = (itemId: string) => {
    setSelectedItemId(itemId);
  };

  const handleReview = (itemId: string) => {
    console.log('Review item:', itemId);
  };

  const handleApprove = (itemId: string) => {
    console.log('Approve item:', itemId);
  };

  const handleReject = (itemId: string) => {
    console.log('Reject item:', itemId);
  };

  const handleMore = (itemId: string) => {
    console.log('More actions for item:', itemId);
  };

  const handleRefresh = () => {
    console.log('Refresh items');
  };

  const handleExport = () => {
    console.log('Export items');
  };

  const statsCards = (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard
        title="Pending Review"
        value={stats.pendingItems}
        growth={5}
        icon={Clock}
        format="number"
      />
      <MetricCard
        title="Approved"
        value={stats.approvedItems}
        growth={12}
        icon={CheckCircle}
        format="number"
      />
      <MetricCard
        title="Rejected"
        value={stats.rejectedItems}
        growth={-3}
        icon={XCircle}
        format="number"
      />
      <MetricCard
        title="AI Flagged"
        value={stats.autoFlaggedItems}
        growth={8}
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
          <SelectItem value="pending" className="text-text hover:bg-surface-elev1">Pending</SelectItem>
          <SelectItem value="approved" className="text-text hover:bg-surface-elev1">Approved</SelectItem>
          <SelectItem value="rejected" className="text-text hover:bg-surface-elev1">Rejected</SelectItem>
          <SelectItem value="escalated" className="text-text hover:bg-surface-elev1">Escalated</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );

  return (
    <AdminPageTemplate
      title="Content Moderation"
      description="Review and moderate flagged content"
      icon={<Shield className="h-6 w-6" />}
      searchPlaceholder="Search content, authors, or flags..."
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
      <ModerationDetailView
        items={filteredItems}
        selectedItemId={selectedItemId}
        onItemSelect={handleItemSelect}
        onReview={handleReview}
        onApprove={handleApprove}
        onReject={handleReject}
        onMore={handleMore}
      />
    </AdminPageTemplate>
  );
}

export default function ModerationPage() {
  return <ModerationPageClient />;
}
