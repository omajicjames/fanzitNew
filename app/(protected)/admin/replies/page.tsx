"use client";

import { useState, useEffect } from "react";
import { AdminPageTemplate, MetricCard } from "@src/components/admin/AdminPageTemplate";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@src/components/ui/card";
import { Badge } from "@src/components/ui/badge";
import { Button } from "@src/components/ui/button";
import { Input } from "@src/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@src/components/ui/select";
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
  Download,
  FileText,
  Globe,
  Star,
  Crown,
  Building,
  RotateCcw,
  Settings,
  Ban,
  CheckSquare,
  XSquare
} from "lucide-react";

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

// ----------------------
// Professional Reply Card Component
// Purpose: Displays reply information in a structured, professional layout
// Note: Similar to verification card with reply-specific data
// ----------------------
function ProfessionalReplyCard({
  reply,
  onView,
  onEdit,
  onMore,
  className = ""
}: {
  reply: Reply;
  onView?: () => void;
  onEdit?: () => void;
  onMore?: () => void;
  className?: string;
}) {
  const getStatusBadge = () => {
    const statusConfig = {
      approved: { variant: "default" as const, icon: CheckCircle, text: "Approved", color: "text-green-600" },
      pending: { variant: "secondary" as const, icon: Clock, text: "Pending", color: "text-yellow-600" },
      flagged: { variant: "destructive" as const, icon: Flag, text: "Flagged", color: "text-red-600" },
      spam: { variant: "destructive" as const, icon: AlertTriangle, text: "Spam", color: "text-red-600" },
      removed: { variant: "outline" as const, icon: Shield, text: "Removed", color: "text-gray-600" }
    };

    const config = statusConfig[reply.status];
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {config.text}
      </Badge>
    );
  };

  const getTypeIcon = () => {
    return <Reply className="h-4 w-4" />;
  };

  const getTypeBadge = () => {
    return (
      <Badge variant="outline" className="text-xs">
        Level {reply.threadLevel}
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
                {reply.content.length > 50 ? `${reply.content.substring(0, 50)}...` : reply.content}
                {getTypeBadge()}
              </CardTitle>
              <CardDescription className="text-text-muted">
                {reply.author.name} • {reply.author.username}
              </CardDescription>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-text">
              {reply.likes}
            </div>
            <div className="text-sm text-text-muted">
              likes
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Reply Overview */}
        <div className="bg-surface-elev2 rounded-lg p-4 border border-line-soft">
          <div className="flex items-center gap-2 mb-3">
            {getTypeIcon()}
            <span className="font-medium text-text">Reply Overview</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-sm text-text-muted">Type:</span>
              <div className="mt-1">
                {getTypeBadge()}
              </div>
            </div>
            <div>
              <span className="text-sm text-text-muted">Status:</span>
              <div className="mt-1">
                {getStatusBadge()}
              </div>
            </div>
            <div>
              <span className="text-sm text-text-muted">Author:</span>
              <div className="mt-1">
                <Badge variant="outline" className="text-xs">
                  {reply.author.username}
                </Badge>
              </div>
            </div>
            <div>
              <span className="text-sm text-text-muted">Reports:</span>
              <div className="mt-1 flex items-center gap-1">
                <Flag className="h-4 w-4" />
                <span className="text-sm text-text">{reply.reportCount}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Engagement Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-surface-elev2 rounded-lg p-4 text-center border border-line-soft">
            <div className="flex items-center justify-center gap-1 text-text-muted mb-1">
              <ThumbsUp className="h-4 w-4" />
              <span className="text-xs font-medium">Likes</span>
            </div>
            <div className="text-lg font-bold text-text">
              {reply.likes}
            </div>
          </div>
          <div className="bg-surface-elev2 rounded-lg p-4 text-center border border-line-soft">
            <div className="flex items-center justify-center gap-1 text-text-muted mb-1">
              <ArrowRight className="h-4 w-4" />
              <span className="text-xs font-medium">Thread Level</span>
            </div>
            <div className="text-lg font-bold text-text">
              {reply.threadLevel}
            </div>
          </div>
          <div className="bg-surface-elev2 rounded-lg p-4 text-center border border-line-soft">
            <div className="flex items-center justify-center gap-1 text-text-muted mb-1">
              <Flag className="h-4 w-4" />
              <span className="text-xs font-medium">Reports</span>
            </div>
            <div className="text-lg font-bold text-text">
              {reply.reportCount}
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
              <p className="text-sm font-medium text-text">{reply.author.name}</p>
              <p className="text-xs text-text-muted">{reply.author.username}</p>
            </div>
            <div className="text-sm text-text-muted">
              {new Date(reply.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>

        {/* Post Context */}
        <div className="bg-surface-elev2 rounded-lg p-4 border border-line-soft">
          <div className="flex items-center gap-2 mb-3">
            <FileText className="h-5 w-5 text-text-muted" />
            <span className="font-medium text-text">Post Context</span>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium text-text">{reply.post.title}</p>
            <p className="text-xs text-text-muted">by {reply.post.author}</p>
          </div>
        </div>

        {/* Parent Comment */}
        <div className="bg-surface-elev2 rounded-lg p-4 border border-line-soft">
          <div className="flex items-center gap-2 mb-3">
            <MessageCircle className="h-5 w-5 text-text-muted" />
            <span className="font-medium text-text">Replying to Comment</span>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-text line-clamp-2">
              "{reply.parentComment.content}"
            </p>
            <p className="text-xs text-text-muted">by {reply.parentComment.author}</p>
          </div>
        </div>

        {/* Parent Reply (if nested) */}
        {reply.parentReply && (
          <div className="bg-surface-elev2 rounded-lg p-4 border border-line-soft">
            <div className="flex items-center gap-2 mb-3">
              <ArrowRight className="h-5 w-5 text-text-muted" />
              <span className="font-medium text-text">Replying to Reply</span>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-text line-clamp-2">
                "{reply.parentReply.content}"
              </p>
              <p className="text-xs text-text-muted">by {reply.parentReply.author}</p>
            </div>
          </div>
        )}

        {/* Flags and Reports */}
        {reply.reportCount > 0 && (
          <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <Flag className="h-5 w-5 text-red-400" />
              <span className="font-medium text-red-300">Reports & Flags</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-red-200">Report Count:</span>
                <span className="text-sm font-bold text-red-300">
                  {reply.reportCount}
                </span>
              </div>
              <div className="flex flex-wrap gap-1">
                {reply.flags.map((flag) => (
                  <Badge key={flag} variant="destructive" className="text-xs">
                    {flag.replace('_', ' ')}
                  </Badge>
                ))}
              </div>
              {reply.moderationNotes && (
                <p className="text-xs text-red-300 mt-2">{reply.moderationNotes}</p>
              )}
            </div>
          </div>
        )}

        {/* Spam Detection */}
        {reply.isSpam && (
          <div className="bg-orange-900/20 border border-orange-500/30 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="h-5 w-5 text-orange-400" />
              <span className="font-medium text-orange-300">Spam Detection</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-orange-200">Spam Score:</span>
                <span className="text-sm font-bold text-orange-300">
                  {Math.round(reply.spamScore * 100)}%
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-orange-200">Status:</span>
                <span className="text-sm font-bold text-orange-300">
                  {reply.isSpam ? 'Detected' : 'Clean'}
                </span>
              </div>
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
// Replies Detail View Component
// Purpose: Single card view with filtering and quick stats
// Note: Similar to verification page with reply-specific data
// ----------------------
function RepliesDetailView({
  replies,
  selectedReplyId,
  onReplySelect,
  onView,
  onEdit,
  onMore,
  className = ""
}: {
  replies: Reply[];
  selectedReplyId?: string;
  onReplySelect?: (replyId: string) => void;
  onView?: (replyId: string) => void;
  onEdit?: (replyId: string) => void;
  onMore?: (replyId: string) => void;
  className?: string;
}) {
  const selectedReply = replies.find(r => r.id === selectedReplyId) || replies[0];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      approved: { variant: "default" as const, color: "text-green-600", bgColor: "bg-green-100" },
      pending: { variant: "secondary" as const, color: "text-yellow-600", bgColor: "bg-yellow-100" },
      flagged: { variant: "destructive" as const, color: "text-red-600", bgColor: "bg-red-100" },
      spam: { variant: "destructive" as const, color: "text-red-600", bgColor: "bg-red-100" },
      removed: { variant: "outline" as const, color: "text-gray-600", bgColor: "bg-gray-100" }
    };
    return statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
  };

  const getTypeIcon = () => {
    return <Reply className="h-4 w-4" />;
  };

  const statusInfo = getStatusBadge(selectedReply?.status || 'pending');

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Filter Section */}
      <div className="bg-surface-elev1 border border-line-soft rounded-lg p-4">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <label className="text-sm font-medium text-text-muted mb-2 block">Select Reply</label>
            <Select value={selectedReplyId || replies[0]?.id} onValueChange={onReplySelect}>
              <SelectTrigger className="bg-surface-elev2 border-line-soft text-text">
                <SelectValue placeholder="Choose a reply..." />
              </SelectTrigger>
              <SelectContent className="bg-surface-elev2 border-line-soft">
                {replies.map((reply) => {
                  const Icon = getTypeIcon();
                  return (
                    <SelectItem 
                      key={reply.id} 
                      value={reply.id}
                      className="text-text hover:bg-surface-elev1"
                    >
                      <div className="flex items-center gap-2">
                        {Icon}
                        <span>{reply.content.length > 30 ? `${reply.content.substring(0, 30)}...` : reply.content}</span>
                        <Badge 
                          variant={reply.status === 'approved' ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {reply.status}
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
        {/* Left: Reply Card */}
        <div className="lg:col-span-2">
          {selectedReply ? (
            <ProfessionalReplyCard
              reply={selectedReply}
              onView={() => onView?.(selectedReply.id)}
              onEdit={() => onEdit?.(selectedReply.id)}
              onMore={() => onMore?.(selectedReply.id)}
            />
          ) : (
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 text-center">
              <Reply className="h-12 w-12 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-400">No reply selected</p>
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
                  {selectedReply?.status || 'N/A'}
                </div>
              </div>

              {/* Type */}
              <div className="flex items-center justify-between p-3 bg-surface-elev2 rounded-lg">
                <div className="flex items-center gap-2">
                  <Reply className="h-4 w-4 text-text-muted" />
                  <span className="text-sm font-medium text-text">Type</span>
                </div>
                <span className="text-sm font-semibold text-text">
                  REPLY
                </span>
              </div>

              {/* Likes */}
              <div className="flex items-center justify-between p-3 bg-surface-elev2 rounded-lg">
                <div className="flex items-center gap-2">
                  <ThumbsUp className="h-4 w-4 text-text-muted" />
                  <span className="text-sm font-medium text-text">Likes</span>
                </div>
                <span className="text-sm font-semibold text-text">
                  {selectedReply?.likes || '0'}
                </span>
              </div>

              {/* Thread Level */}
              <div className="flex items-center justify-between p-3 bg-surface-elev2 rounded-lg">
                <div className="flex items-center gap-2">
                  <ArrowRight className="h-4 w-4 text-text-muted" />
                  <span className="text-sm font-medium text-text">Thread Level</span>
                </div>
                <span className="text-sm font-semibold text-text">
                  {selectedReply?.threadLevel || '0'}
                </span>
              </div>

              {/* Reports */}
              <div className="flex items-center justify-between p-3 bg-surface-elev2 rounded-lg">
                <div className="flex items-center gap-2">
                  <Flag className="h-4 w-4 text-text-muted" />
                  <span className="text-sm font-medium text-text">Reports</span>
                </div>
                <span className="text-sm font-semibold text-text">
                  {selectedReply?.reportCount || '0'}
                </span>
              </div>

              {/* Spam Score */}
              <div className="flex items-center justify-between p-3 bg-surface-elev2 rounded-lg">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-text-muted" />
                  <span className="text-sm font-medium text-text">Spam Score</span>
                </div>
                <span className="text-sm font-semibold text-text">
                  {selectedReply ? `${Math.round(selectedReply.spamScore * 100)}%` : 'N/A'}
                </span>
              </div>

              {/* Date */}
              <div className="flex items-center justify-between p-3 bg-surface-elev2 rounded-lg">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-text-muted" />
                  <span className="text-sm font-medium text-text">Date</span>
                </div>
                <span className="text-sm text-text-muted">
                  {selectedReply?.createdAt ? new Date(selectedReply.createdAt).toLocaleDateString() : 'N/A'}
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
                onClick={() => onView?.(selectedReply?.id || '')}
              >
                <Eye className="h-4 w-4 mr-2" />
                View Reply
              </Button>
              <Button 
                variant="outline" 
                className="w-full bg-surface-elev2 border-line-soft text-text hover:bg-surface-elev1"
                onClick={() => onEdit?.(selectedReply?.id || '')}
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Reply
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// ----------------------
// Replies Page Client Component
// Purpose: Manages state and interactions for the replies page
// ----------------------
function RepliesPageClient() {
  const [selectedReplyId, setSelectedReplyId] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const repliesService = new RepliesManagementService();
  const allReplies = repliesService.getReplies();
  const stats = repliesService.getRepliesStats();

  // Filter replies based on search and status
  const filteredReplies = allReplies.filter(reply => {
    const matchesSearch = reply.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reply.author.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reply.author.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reply.post.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || reply.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Set default selected reply
  useEffect(() => {
    if (filteredReplies.length > 0 && !selectedReplyId) {
      setSelectedReplyId(filteredReplies[0].id);
    }
  }, [filteredReplies, selectedReplyId]);

  const handleReplySelect = (replyId: string) => {
    setSelectedReplyId(replyId);
  };

  const handleView = (replyId: string) => {
    console.log('View reply:', replyId);
  };

  const handleEdit = (replyId: string) => {
    console.log('Edit reply:', replyId);
  };

  const handleMore = (replyId: string) => {
    console.log('More actions for reply:', replyId);
  };

  const handleRefresh = () => {
    console.log('Refresh replies');
  };

  const handleExportAll = () => {
    console.log('Export all replies');
  };

  const statsCards = (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard
        title="Total Replies"
        value={stats.totalReplies}
        growth={0}
        icon={Reply}
        format="number"
      />
      <MetricCard
        title="Flagged Replies"
        value={stats.flaggedReplies}
        growth={0}
        icon={Flag}
        format="number"
      />
      <MetricCard
        title="Spam Replies"
        value={stats.spamReplies}
        growth={0}
        icon={AlertTriangle}
        format="number"
      />
      <MetricCard
        title="Avg Thread Level"
        value={stats.averageThreadLevel}
        growth={0}
        icon={BarChart3}
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
          <SelectItem value="approved" className="text-text hover:bg-surface-elev1">Approved</SelectItem>
          <SelectItem value="pending" className="text-text hover:bg-surface-elev1">Pending</SelectItem>
          <SelectItem value="flagged" className="text-text hover:bg-surface-elev1">Flagged</SelectItem>
          <SelectItem value="spam" className="text-text hover:bg-surface-elev1">Spam</SelectItem>
          <SelectItem value="removed" className="text-text hover:bg-surface-elev1">Removed</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );

  return (
    <AdminPageTemplate
      title="Replies Management"
      description="Moderate and manage reply threads across the platform"
      icon={<Reply className="h-6 w-6" />}
      searchPlaceholder="Search replies, authors, or content..."
      searchValue={searchTerm}
      onSearchChange={setSearchTerm}
      showSearch={true}
      showFilters={true}
      showRefresh={true}
      showExport={true}
      onRefresh={handleRefresh}
      onExport={handleExportAll}
      filters={filters}
      stats={statsCards}
    >
      <RepliesDetailView
        replies={filteredReplies}
        selectedReplyId={selectedReplyId}
        onReplySelect={handleReplySelect}
        onView={handleView}
        onEdit={handleEdit}
        onMore={handleMore}
      />
    </AdminPageTemplate>
  );
}

export default function RepliesPage() {
  return <RepliesPageClient />;
}
