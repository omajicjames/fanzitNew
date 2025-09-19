"use client";

import { AdminPageTemplate, AdminCard } from "@src/components/admin/AdminPageTemplate";
import { AdminPillNavigationComponent } from "@src/components/admin/AdminPillNavigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@src/components/ui/card";
import { Badge } from "@src/components/ui/badge";
import { Button } from "@src/components/ui/button";
import { Input } from "@src/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@src/components/ui/tabs";
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
  Reply
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

class ModerationItemCardComponent {
  private item: ModerationItem;

  constructor(item: ModerationItem) {
    this.item = item;
  }

  private getStatusBadge() {
    const statusConfig = {
      pending: { variant: "secondary" as const, icon: Clock, text: "Pending" },
      approved: { variant: "default" as const, icon: CheckCircle, text: "Approved" },
      rejected: { variant: "destructive" as const, icon: XCircle, text: "Rejected" },
      escalated: { variant: "destructive" as const, icon: AlertTriangle, text: "Escalated" }
    };

    const config = statusConfig[this.item.status];
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {config.text}
      </Badge>
    );
  }

  private getPriorityBadge() {
    const priorityConfig = {
      low: { variant: "outline" as const, color: "text-gray-600", text: "Low" },
      medium: { variant: "secondary" as const, color: "text-yellow-600", text: "Medium" },
      high: { variant: "default" as const, color: "text-orange-600", text: "High" },
      urgent: { variant: "destructive" as const, color: "text-red-600", text: "Urgent" }
    };

    const config = priorityConfig[this.item.priority];

    return (
      <Badge variant={config.variant} className={`${config.color} border-current`}>
        {config.text}
      </Badge>
    );
  }

  private getTypeIcon() {
    const icons = {
      image: Image,
      video: Video,
      text: FileText,
      post: FileText,
      comment: MessageCircle,
      reply: Reply
    };
    const Icon = icons[this.item.type];
    return <Icon className="h-4 w-4" />;
  }

  public render() {
    return (
      <AdminCard
        title={this.item.content}
        description={`${this.item.type.toUpperCase()} by ${this.item.author.name}`}
        icon={this.getTypeIcon()}
        headerActions={
          <div className="flex gap-2">
            {this.getPriorityBadge()}
            {this.getStatusBadge()}
          </div>
        }
        className="group hover:shadow-lg transition-all duration-200"
      >
        
        <CardContent className="space-y-4">
          {/* Author Info */}
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
              <User className="h-4 w-4" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{this.item.author.name}</p>
              <p className="text-xs text-muted-foreground">{this.item.author.username}</p>
            </div>
            <div className="text-sm text-muted-foreground">
              {new Date(this.item.createdAt).toLocaleDateString()}
            </div>
          </div>

          {/* Media Preview */}
          {this.item.media && (
            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
              <div className="text-center">
                {this.getTypeIcon()}
                <p className="text-sm text-muted-foreground mt-2">
                  {this.item.media.type.toUpperCase()}
                </p>
              </div>
            </div>
          )}

          {/* Flags */}
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground">Flags:</p>
            <div className="flex flex-wrap gap-1">
              {this.item.flags.map((flag) => (
                <Badge key={flag} variant="destructive" className="text-xs">
                  {flag.replace('_', ' ')}
                </Badge>
              ))}
            </div>
          </div>

          {/* Reports */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <div className="flex items-center gap-2 text-red-800 mb-2">
              <Flag className="h-4 w-4" />
              <span className="text-sm font-medium">{this.item.reportCount} Reports</span>
            </div>
            <div className="space-y-1">
              {this.item.reportedBy.slice(0, 2).map((reporter, index) => (
                <p key={index} className="text-xs text-red-700">
                  {reporter.name}: {reporter.reason}
                </p>
              ))}
              {this.item.reportedBy.length > 2 && (
                <p className="text-xs text-red-600">
                  +{this.item.reportedBy.length - 2} more reports
                </p>
              )}
            </div>
          </div>

          {/* AI Confidence */}
          {this.item.aiConfidence && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-blue-800">AI Confidence</span>
                <span className="text-sm font-bold text-blue-600">
                  {Math.round(this.item.aiConfidence * 100)}%
                </span>
              </div>
              <div className="w-full bg-blue-200 rounded-full h-2 mt-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full" 
                  style={{ width: `${this.item.aiConfidence * 100}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Moderation Notes */}
          {this.item.moderationNotes && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <p className="text-xs font-medium text-yellow-800 mb-1">Moderation Notes:</p>
              <p className="text-xs text-yellow-700">{this.item.moderationNotes}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <Button variant="outline" size="sm" className="flex-1">
              <Eye className="h-4 w-4 mr-2" />
              Review
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              <CheckCircle className="h-4 w-4 mr-2" />
              Approve
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              <XCircle className="h-4 w-4 mr-2" />
              Reject
            </Button>
            <Button variant="outline" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </AdminCard>
    );
  }
}

export default function ModerationPage() {
  const moderationService = new ModerationService();
  const items = moderationService.getItems();
  const stats = moderationService.getModerationStats();

  const statsCards = (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-[var(--admin-card-bg)] border border-neutral-700 rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-neutral-400 uppercase tracking-wide">Pending Review</p>
            <p className="text-2xl font-bold text-white">{stats.pendingItems}</p>
            <p className="text-xs text-neutral-400">{stats.urgentItems} urgent</p>
          </div>
          <Clock className="h-8 w-8 text-neutral-400" />
        </div>
      </div>

      <div className="bg-[var(--admin-card-bg)] border border-neutral-700 rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-neutral-400 uppercase tracking-wide">Approved</p>
            <p className="text-2xl font-bold text-green-500">{stats.approvedItems}</p>
            <p className="text-xs text-neutral-400">Content approved</p>
          </div>
          <CheckCircle className="h-8 w-8 text-neutral-400" />
        </div>
      </div>

      <div className="bg-[var(--admin-card-bg)] border border-neutral-700 rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-neutral-400 uppercase tracking-wide">Rejected</p>
            <p className="text-2xl font-bold text-red-500">{stats.rejectedItems}</p>
            <p className="text-xs text-neutral-400">Content removed</p>
          </div>
          <XCircle className="h-8 w-8 text-neutral-400" />
        </div>
      </div>

      <div className="bg-[var(--admin-card-bg)] border border-neutral-700 rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-neutral-400 uppercase tracking-wide">AI Flagged</p>
            <p className="text-2xl font-bold text-white">{stats.autoFlaggedItems}</p>
            <p className="text-xs text-neutral-400">{Math.round(stats.averageConfidence * 100)}% avg confidence</p>
          </div>
          <Shield className="h-8 w-8 text-neutral-400" />
        </div>
      </div>
    </div>
  );

  return (
    <AdminPageTemplate
      title="Content Moderation"
      description="Review and moderate flagged content"
      icon={<Shield className="h-6 w-6" />}
      searchPlaceholder="Search content, authors, or flags..."
      showSearch={true}
      showFilters={true}
      showRefresh={true}
      showSettings={true}
      stats={statsCards}
    >
      {/* Moderation Items */}
      <div className="space-y-4">
        {items.map((item) => {
          const itemCard = new ModerationItemCardComponent(item);
          return <div key={item.id}>{itemCard.render()}</div>;
        })}
      </div>
    </AdminPageTemplate>
  );
}
