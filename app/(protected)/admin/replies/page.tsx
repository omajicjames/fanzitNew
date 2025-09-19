"use client";

import { AdminPageTemplate, AdminCard } from "@src/components/admin/AdminPageTemplate";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@src/components/ui/card";
import { Badge } from "@src/components/ui/badge";
import { Button } from "@src/components/ui/button";
import { Input } from "@src/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@src/components/ui/tabs";
import { 
  Reply, 
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
  Heart,
  MessageCircle,
  Flag,
  Shield,
  ThumbsUp,
  ThumbsDown,
  ArrowRight,
  RefreshCw,
  Download
} from "lucide-react";
import { useState } from "react";

// ----------------------
// Replies Management Page
// Location: /app/(protected)/admin/replies/page.tsx
// Purpose: Comprehensive reply moderation and management
// Features: Reply moderation, thread management, analytics
// Note: Mobile-first design with object-oriented structure
// ----------------------

interface Reply {
  id: string;
  content: string;
  author: {
    id: string;
    name: string;
    username: string;
    avatar: string;
  };
  parentComment: {
    id: string;
    content: string;
    author: string;
  };
  post: {
    id: string;
    title: string;
    author: string;
  };
  status: 'approved' | 'pending' | 'flagged' | 'spam' | 'removed';
  isEdited: boolean;
  editedAt?: string;
  createdAt: string;
  updatedAt: string;
  likes: number;
  dislikes: number;
  reportCount: number;
  flags: string[];
  moderationNotes?: string;
  isSpam: boolean;
  spamScore: number;
  threadLevel: number;
  parentReply?: {
    id: string;
    content: string;
    author: string;
  };
}

class RepliesManagementService {
  private replies: Reply[] = [];

  constructor() {
    this.initializeMockData();
  }

  private initializeMockData() {
    this.replies = [
      {
        id: "1",
        content: "I totally agree with this! This is exactly what I was thinking too.",
        author: {
          id: "1",
          name: "Lisa Chen",
          username: "@lisachen",
          avatar: "/placeholder-user.jpg"
        },
        parentComment: {
          id: "1",
          content: "This is amazing content! Keep up the great work! 🔥",
          author: "Sarah Johnson"
        },
        post: {
          id: "1",
          title: "Behind the Scenes: My Creative Process",
          author: "Mike Chen"
        },
        status: "approved",
        isEdited: false,
        createdAt: "2024-01-25T10:45:00Z",
        updatedAt: "2024-01-25T10:45:00Z",
        likes: 8,
        dislikes: 0,
        reportCount: 0,
        flags: [],
        isSpam: false,
        spamScore: 0.05,
        threadLevel: 1
      },
      {
        id: "2",
        content: "Thanks for sharing! I learned so much from this post.",
        author: {
          id: "2",
          name: "Alex Rodriguez",
          username: "@alexr",
          avatar: "/placeholder-user.jpg"
        },
        parentComment: {
          id: "1",
          content: "This is amazing content! Keep up the great work! 🔥",
          author: "Sarah Johnson"
        },
        post: {
          id: "1",
          title: "Behind the Scenes: My Creative Process",
          author: "Mike Chen"
        },
        status: "approved",
        isEdited: false,
        createdAt: "2024-01-25T11:00:00Z",
        updatedAt: "2024-01-25T11:00:00Z",
        likes: 5,
        dislikes: 0,
        reportCount: 0,
        flags: [],
        isSpam: false,
        spamScore: 0.1,
        threadLevel: 1
      },
      {
        id: "3",
        content: "You're absolutely right! I had the same experience last week.",
        author: {
          id: "3",
          name: "Emma Wilson",
          username: "@emmaw",
          avatar: "/placeholder-user.jpg"
        },
        parentComment: {
          id: "1",
          content: "This is amazing content! Keep up the great work! 🔥",
          author: "Sarah Johnson"
        },
        post: {
          id: "1",
          title: "Behind the Scenes: My Creative Process",
          author: "Mike Chen"
        },
        parentReply: {
          id: "1",
          content: "I totally agree with this! This is exactly what I was thinking too.",
          author: "Lisa Chen"
        },
        status: "approved",
        isEdited: false,
        createdAt: "2024-01-25T11:15:00Z",
        updatedAt: "2024-01-25T11:15:00Z",
        likes: 3,
        dislikes: 0,
        reportCount: 0,
        flags: [],
        isSpam: false,
        spamScore: 0.08,
        threadLevel: 2
      },
      {
        id: "4",
        content: "This is inappropriate and violates community guidelines!",
        author: {
          id: "4",
          name: "John Doe",
          username: "@johndoe",
          avatar: "/placeholder-user.jpg"
        },
        parentComment: {
          id: "2",
          content: "Check out my profile for more content! Link in bio!",
          author: "Spam User"
        },
        post: {
          id: "2",
          title: "Exclusive Content for My Fans",
          author: "Emma Wilson"
        },
        status: "flagged",
        isEdited: false,
        createdAt: "2024-01-24T16:00:00Z",
        updatedAt: "2024-01-24T16:00:00Z",
        likes: 1,
        dislikes: 2,
        reportCount: 2,
        flags: ["inappropriate_content", "harassment"],
        moderationNotes: "Reply flagged for potential harassment",
        isSpam: false,
        spamScore: 0.3,
        threadLevel: 1
      },
      {
        id: "5",
        content: "Buy my course! Get 50% off! Link in bio!",
        author: {
          id: "5",
          name: "Spam User 2",
          username: "@spammer456",
          avatar: "/placeholder-user.jpg"
        },
        parentComment: {
          id: "3",
          content: "Great post! I learned so much from this.",
          author: "Mike Chen"
        },
        post: {
          id: "3",
          title: "Daily Motivation",
          author: "Sarah Johnson"
        },
        status: "spam",
        isEdited: false,
        createdAt: "2024-01-26T09:30:00Z",
        updatedAt: "2024-01-26T09:30:00Z",
        likes: 0,
        dislikes: 3,
        reportCount: 5,
        flags: ["spam", "self_promotion"],
        moderationNotes: "Automatically flagged as spam - promotional content",
        isSpam: true,
        spamScore: 0.92,
        threadLevel: 1
      }
    ];
  }

  public getReplies(): Reply[] {
    return this.replies;
  }

  public getRepliesStats() {
    const totalReplies = this.replies.length;
    const approvedReplies = this.replies.filter(r => r.status === 'approved').length;
    const pendingReplies = this.replies.filter(r => r.status === 'pending').length;
    const flaggedReplies = this.replies.filter(r => r.status === 'flagged').length;
    const spamReplies = this.replies.filter(r => r.status === 'spam').length;
    const totalLikes = this.replies.reduce((sum, r) => sum + r.likes, 0);
    const totalReports = this.replies.reduce((sum, r) => sum + r.reportCount, 0);
    const averageSpamScore = totalReplies > 0 ? this.replies.reduce((sum, r) => sum + r.spamScore, 0) / totalReplies : 0;
    const averageThreadLevel = totalReplies > 0 ? this.replies.reduce((sum, r) => sum + r.threadLevel, 0) / totalReplies : 0;

    return {
      totalReplies,
      approvedReplies,
      pendingReplies,
      flaggedReplies,
      spamReplies,
      totalLikes,
      totalReports,
      averageSpamScore,
      averageThreadLevel
    };
  }
}

class ReplyCardComponent {
  private reply: Reply;

  constructor(reply: Reply) {
    this.reply = reply;
  }

  private getStatusBadge() {
    const statusConfig = {
      approved: { variant: "default" as const, icon: CheckCircle, text: "Approved" },
      pending: { variant: "secondary" as const, icon: Clock, text: "Pending" },
      flagged: { variant: "destructive" as const, icon: Flag, text: "Flagged" },
      spam: { variant: "destructive" as const, icon: AlertTriangle, text: "Spam" },
      removed: { variant: "outline" as const, icon: Shield, text: "Removed" }
    };

    const config = statusConfig[this.reply.status];
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
      <AdminCard
        title={this.reply.content}
        description={`Reply to "${this.reply.parentComment.content}" by ${this.reply.parentComment.author}`}
        icon={<Reply className="h-5 w-5 text-[var(--admin-text-secondary)]" />}
        headerActions={
          <div className="flex items-center gap-2">
            {this.reply.isSpam && (
              <Badge variant="destructive" className="text-xs">
                Spam ({Math.round(this.reply.spamScore * 100)}%)
              </Badge>
            )}
            {this.getStatusBadge()}
          </div>
        }
        className="group hover:shadow-lg transition-all duration-200"
      >
        <div className="space-y-4">
          {/* Author Info */}
          <div className="flex items-center gap-3 p-3 bg-[var(--admin-surface)] rounded-lg border border-[var(--admin-border)]">
            <div className="h-8 w-8 rounded-full bg-[var(--admin-bg-alt)] flex items-center justify-center">
              <User className="h-4 w-4 text-[var(--admin-text-secondary)]" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-[var(--admin-text-primary)]">{this.reply.author.name}</p>
              <p className="text-xs text-[var(--admin-text-secondary)]">{this.reply.author.username}</p>
            </div>
            <div className="text-sm text-[var(--admin-text-muted)]">
              {new Date(this.reply.createdAt).toLocaleDateString()}
            </div>
          </div>

          {/* Thread Context */}
          <div className="space-y-3">
            {/* Post Context */}
            <div className="bg-[var(--admin-surface)] border border-[var(--admin-border)] rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <MessageCircle className="h-4 w-4 text-[var(--admin-text-secondary)]" />
                <span className="text-sm font-medium text-[var(--admin-text-primary)]">On Post:</span>
              </div>
              <p className="text-sm font-medium text-[var(--admin-text-primary)]">{this.reply.post.title}</p>
              <p className="text-xs text-[var(--admin-text-secondary)]">by {this.reply.post.author}</p>
            </div>

            {/* Parent Comment */}
            <div className="bg-[var(--admin-surface)] border border-[var(--admin-border-light)] rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <Reply className="h-4 w-4 text-[var(--admin-text-secondary)]" />
                <span className="text-sm font-medium text-[var(--admin-text-primary)]">Replying to Comment:</span>
              </div>
              <p className="text-sm text-[var(--admin-text-primary)] line-clamp-2">
                "{this.reply.parentComment.content}"
              </p>
              <p className="text-xs text-[var(--admin-text-secondary)] mt-1">by {this.reply.parentComment.author}</p>
            </div>

            {/* Parent Reply (if nested) */}
            {this.reply.parentReply && (
              <div className="bg-[var(--admin-surface)] border border-[var(--admin-border-light)] rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <ArrowRight className="h-4 w-4 text-[var(--admin-text-secondary)]" />
                  <span className="text-sm font-medium text-[var(--admin-text-primary)]">Replying to Reply:</span>
                </div>
                <p className="text-sm text-[var(--admin-text-primary)] line-clamp-2">
                  "{this.reply.parentReply.content}"
                </p>
                <p className="text-xs text-[var(--admin-text-secondary)] mt-1">by {this.reply.parentReply.author}</p>
              </div>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2 text-[var(--admin-text-secondary)]">
              <ThumbsUp className="h-4 w-4" />
              <span className="text-[var(--admin-text-primary)]">{this.reply.likes} likes</span>
            </div>
            <div className="flex items-center gap-2 text-[var(--admin-text-secondary)]">
              <ThumbsDown className="h-4 w-4" />
              <span className="text-[var(--admin-text-primary)]">{this.reply.dislikes} dislikes</span>
            </div>
            <div className="flex items-center gap-2 text-[var(--admin-text-secondary)]">
              <Flag className="h-4 w-4" />
              <span className="text-[var(--admin-text-primary)]">{this.reply.reportCount} reports</span>
            </div>
            <div className="flex items-center gap-2 text-[var(--admin-text-secondary)]">
              <Shield className="h-4 w-4" />
              <span className="text-[var(--admin-text-primary)]">Level {this.reply.threadLevel}</span>
            </div>
          </div>

          {/* Flags and Reports */}
          {this.reply.reportCount > 0 && (
            <div className="bg-[var(--admin-surface)] border border-[var(--admin-status-flagged)] rounded-lg p-3">
              <div className="flex items-center gap-2 text-[var(--admin-status-flagged)] mb-2">
                <Flag className="h-4 w-4" />
                <span className="text-sm font-medium">{this.reply.reportCount} Reports</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {this.reply.flags.map((flag) => (
                  <Badge key={flag} variant="destructive" className="text-xs">
                    {flag.replace('_', ' ')}
                  </Badge>
                ))}
              </div>
              {this.reply.moderationNotes && (
                <p className="text-xs text-[var(--admin-text-secondary)] mt-2">{this.reply.moderationNotes}</p>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1 bg-[var(--admin-btn-secondary-bg)] text-[var(--admin-btn-secondary-text)] border-[var(--admin-border)] hover:bg-[var(--admin-surface-hover)]"
            >
              <Eye className="h-4 w-4 mr-2" />
              View
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1 bg-[var(--admin-btn-secondary-bg)] text-[var(--admin-btn-secondary-text)] border-[var(--admin-border)] hover:bg-[var(--admin-surface-hover)]"
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="bg-[var(--admin-btn-secondary-bg)] text-[var(--admin-btn-secondary-text)] border-[var(--admin-border)] hover:bg-[var(--admin-surface-hover)]"
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </AdminCard>
    );
  }
}

export default function RepliesPage() {
  const repliesService = new RepliesManagementService();
  const replies = repliesService.getReplies();
  const stats = repliesService.getRepliesStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Replies Management</h1>
          <p className="text-muted-foreground">Moderate and manage reply threads</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button variant="outline">
            <Shield className="h-4 w-4 mr-2" />
            Spam Filter
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Replies</CardTitle>
            <Reply className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalReplies}</div>
            <p className="text-xs text-muted-foreground">
              {stats.approvedReplies} approved, {stats.pendingReplies} pending
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Flagged Replies</CardTitle>
            <Flag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.flaggedReplies}</div>
            <p className="text-xs text-muted-foreground">
              Require review
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Spam Replies</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{stats.spamReplies}</div>
            <p className="text-xs text-muted-foreground">
              Auto-detected
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Thread Level</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.averageThreadLevel.toFixed(1)}</div>
            <p className="text-xs text-muted-foreground">
              Nesting depth
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
                  placeholder="Search replies, authors, or content..."
                  className="pl-10"
                />
              </div>
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Replies List */}
      <div className="space-y-4">
        {replies.map((reply) => {
          const replyCard = new ReplyCardComponent(reply);
          return <div key={reply.id}>{replyCard.render()}</div>;
        })}
      </div>
    </div>
  );
}
