"use client";

import { useState, useEffect } from "react";
import { AdminPageTemplate, MetricCard } from "@src/components/admin/AdminPageTemplate";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@src/components/ui/card";
import { Badge } from "@src/components/ui/badge";
import { Button } from "@src/components/ui/button";
import { Input } from "@src/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@src/components/ui/select";
import { 
  MessageCircle, 
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
  Reply,
  Flag,
  Shield,
  ThumbsUp,
  ThumbsDown,
  FileText,
  Download,
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
// Comments Management Page
// Location: /app/(protected)/admin/comments/page.tsx
// Purpose: Comprehensive comment moderation and management
// Features: Comment moderation, analytics, filtering, spam detection
// Note: Mobile-first design with object-oriented structure
// ----------------------

interface Comment {
  id: string;
  content: string;
  author: {
    id: string;
    name: string;
    username: string;
    avatar: string;
  };
  post: {
    id: string;
    title: string;
    author: string;
  };
  parentComment?: {
    id: string;
    content: string;
    author: string;
  };
  status: 'approved' | 'pending' | 'flagged' | 'spam' | 'removed';
  isEdited: boolean;
  editedAt?: string;
  createdAt: string;
  updatedAt: string;
  likes: number;
  dislikes: number;
  replies: number;
  reportCount: number;
  flags: string[];
  moderationNotes?: string;
  isSpam: boolean;
  spamScore: number;
}

class CommentsManagementService {
  private comments: Comment[] = [];

  constructor() {
    this.initializeMockData();
  }

  private initializeMockData() {
    this.comments = [
      {
        id: "1",
        content: "This is amazing content! Keep up the great work! 🔥",
        author: {
          id: "1",
          name: "Sarah Johnson",
          username: "@sarahj",
          avatar: "/placeholder-user.jpg"
        },
        post: {
          id: "1",
          title: "Behind the Scenes: My Creative Process",
          author: "Mike Chen"
        },
        status: "approved",
        isEdited: false,
        createdAt: "2024-01-25T10:30:00Z",
        updatedAt: "2024-01-25T10:30:00Z",
        likes: 12,
        dislikes: 0,
        replies: 3,
        reportCount: 0,
        flags: [],
        isSpam: false,
        spamScore: 0.1
      },
      {
        id: "2",
        content: "Check out my profile for more content! Link in bio!",
        author: {
          id: "2",
          name: "Spam User",
          username: "@spammer123",
          avatar: "/placeholder-user.jpg"
        },
        post: {
          id: "2",
          title: "Exclusive Content for My Fans",
          author: "Emma Wilson"
        },
        status: "spam",
        isEdited: false,
        createdAt: "2024-01-24T15:45:00Z",
        updatedAt: "2024-01-24T15:45:00Z",
        likes: 0,
        dislikes: 5,
        replies: 0,
        reportCount: 8,
        flags: ["spam", "self_promotion"],
        moderationNotes: "Automatically flagged as spam - high spam score",
        isSpam: true,
        spamScore: 0.95
      },
      {
        id: "3",
        content: "I think this content violates the community guidelines. This is inappropriate.",
        author: {
          id: "3",
          name: "John Doe",
          username: "@johndoe",
          avatar: "/placeholder-user.jpg"
        },
        post: {
          id: "3",
          title: "Daily Motivation",
          author: "Sarah Johnson"
        },
        status: "flagged",
        isEdited: false,
        createdAt: "2024-01-26T08:15:00Z",
        updatedAt: "2024-01-26T08:15:00Z",
        likes: 2,
        dislikes: 1,
        replies: 1,
        reportCount: 3,
        flags: ["inappropriate_content", "harassment"],
        moderationNotes: "Content flagged for potential harassment",
        isSpam: false,
        spamScore: 0.2
      },
      {
        id: "4",
        content: "Great post! I learned so much from this. Thank you for sharing your knowledge.",
        author: {
          id: "4",
          name: "Lisa Chen",
          username: "@lisachen",
          avatar: "/placeholder-user.jpg"
        },
        post: {
          id: "1",
          title: "Behind the Scenes: My Creative Process",
          author: "Mike Chen"
        },
        parentComment: {
          id: "1",
          content: "This is amazing content! Keep up the great work! 🔥",
          author: "Sarah Johnson"
        },
        status: "approved",
        isEdited: true,
        editedAt: "2024-01-25T11:00:00Z",
        createdAt: "2024-01-25T10:45:00Z",
        updatedAt: "2024-01-25T11:00:00Z",
        likes: 8,
        dislikes: 0,
        replies: 0,
        reportCount: 0,
        flags: [],
        isSpam: false,
        spamScore: 0.05
      }
    ];
  }

  public getComments(): Comment[] {
    return this.comments;
  }

  public getCommentsStats() {
    const totalComments = this.comments.length;
    const approvedComments = this.comments.filter(c => c.status === 'approved').length;
    const pendingComments = this.comments.filter(c => c.status === 'pending').length;
    const flaggedComments = this.comments.filter(c => c.status === 'flagged').length;
    const spamComments = this.comments.filter(c => c.status === 'spam').length;
    const totalLikes = this.comments.reduce((sum, c) => sum + c.likes, 0);
    const totalReports = this.comments.reduce((sum, c) => sum + c.reportCount, 0);
    const averageSpamScore = totalComments > 0 ? this.comments.reduce((sum, c) => sum + c.spamScore, 0) / totalComments : 0;

    return {
      totalComments,
      approvedComments,
      pendingComments,
      flaggedComments,
      spamComments,
      totalLikes,
      totalReports,
      averageSpamScore
    };
  }
}

// ----------------------
// Professional Comment Card Component
// Purpose: Displays comment information in a structured, professional layout
// Note: Similar to verification card with comment-specific data
// ----------------------
function ProfessionalCommentCard({
  comment,
  onView,
  onEdit,
  onMore,
  className = ""
}: {
  comment: Comment;
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

    const config = statusConfig[comment.status];
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {config.text}
      </Badge>
    );
  };

  const getTypeIcon = () => {
    if (comment.parentComment) return <Reply className="h-4 w-4" />;
    return <MessageCircle className="h-4 w-4" />;
  };

  const getTypeBadge = () => {
    if (comment.parentComment) {
      return (
        <Badge variant="outline" className="text-xs">
          Reply
        </Badge>
      );
    }
    return (
      <Badge variant="default" className="text-xs">
        Comment
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
                {comment.content.length > 50 ? `${comment.content.substring(0, 50)}...` : comment.content}
                {getTypeBadge()}
              </CardTitle>
              <CardDescription className="text-text-muted">
                {comment.author.name} • {comment.author.username}
              </CardDescription>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-text">
              {comment.likes}
            </div>
            <div className="text-sm text-text-muted">
              likes
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Comment Overview */}
        <div className="bg-surface-elev2 rounded-lg p-4 border border-line-soft">
          <div className="flex items-center gap-2 mb-3">
            {getTypeIcon()}
            <span className="font-medium text-text">Comment Overview</span>
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
                  {comment.author.username}
                </Badge>
              </div>
            </div>
            <div>
              <span className="text-sm text-text-muted">Reports:</span>
              <div className="mt-1 flex items-center gap-1">
                <Flag className="h-4 w-4" />
                <span className="text-sm text-text">{comment.reportCount}</span>
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
              {comment.likes}
            </div>
          </div>
          <div className="bg-surface-elev2 rounded-lg p-4 text-center border border-line-soft">
            <div className="flex items-center justify-center gap-1 text-text-muted mb-1">
              <Reply className="h-4 w-4" />
              <span className="text-xs font-medium">Replies</span>
            </div>
            <div className="text-lg font-bold text-text">
              {comment.replies}
            </div>
          </div>
          <div className="bg-surface-elev2 rounded-lg p-4 text-center border border-line-soft">
            <div className="flex items-center justify-center gap-1 text-text-muted mb-1">
              <Flag className="h-4 w-4" />
              <span className="text-xs font-medium">Reports</span>
            </div>
            <div className="text-lg font-bold text-text">
              {comment.reportCount}
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
              <p className="text-sm font-medium text-text">{comment.author.name}</p>
              <p className="text-xs text-text-muted">{comment.author.username}</p>
            </div>
            <div className="text-sm text-text-muted">
              {new Date(comment.createdAt).toLocaleDateString()}
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
            <p className="text-sm font-medium text-text">{comment.post.title}</p>
            <p className="text-xs text-text-muted">by {comment.post.author}</p>
          </div>
        </div>

        {/* Parent Comment (if reply) */}
        {comment.parentComment && (
          <div className="bg-surface-elev2 rounded-lg p-4 border border-line-soft">
            <div className="flex items-center gap-2 mb-3">
              <Reply className="h-5 w-5 text-text-muted" />
              <span className="font-medium text-text">Replying To</span>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-text line-clamp-2">
                "{comment.parentComment.content}"
              </p>
              <p className="text-xs text-text-muted">by {comment.parentComment.author}</p>
            </div>
          </div>
        )}

        {/* Flags and Reports */}
        {comment.reportCount > 0 && (
          <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <Flag className="h-5 w-5 text-red-400" />
              <span className="font-medium text-red-300">Reports & Flags</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-red-200">Report Count:</span>
                <span className="text-sm font-bold text-red-300">
                  {comment.reportCount}
                </span>
              </div>
              <div className="flex flex-wrap gap-1">
                {comment.flags.map((flag) => (
                  <Badge key={flag} variant="destructive" className="text-xs">
                    {flag.replace('_', ' ')}
                  </Badge>
                ))}
              </div>
              {comment.moderationNotes && (
                <p className="text-xs text-red-300 mt-2">{comment.moderationNotes}</p>
              )}
            </div>
          </div>
        )}

        {/* Spam Detection */}
        {comment.isSpam && (
          <div className="bg-orange-900/20 border border-orange-500/30 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="h-5 w-5 text-orange-400" />
              <span className="font-medium text-orange-300">Spam Detection</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-orange-200">Spam Score:</span>
                <span className="text-sm font-bold text-orange-300">
                  {Math.round(comment.spamScore * 100)}%
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-orange-200">Status:</span>
                <span className="text-sm font-bold text-orange-300">
                  {comment.isSpam ? 'Detected' : 'Clean'}
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
// Comments Detail View Component
// Purpose: Single card view with filtering and quick stats
// Note: Similar to verification page with comment-specific data
// ----------------------
function CommentsDetailView({
  comments,
  selectedCommentId,
  onCommentSelect,
  onView,
  onEdit,
  onMore,
  className = ""
}: {
  comments: Comment[];
  selectedCommentId?: string;
  onCommentSelect?: (commentId: string) => void;
  onView?: (commentId: string) => void;
  onEdit?: (commentId: string) => void;
  onMore?: (commentId: string) => void;
  className?: string;
}) {
  const selectedComment = comments.find(c => c.id === selectedCommentId) || comments[0];

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

  const getTypeIcon = (comment: Comment) => {
    return comment.parentComment ? <Reply className="h-4 w-4" /> : <MessageCircle className="h-4 w-4" />;
  };

  const statusInfo = getStatusBadge(selectedComment?.status || 'pending');

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Filter Section */}
      <div className="bg-surface-elev1 border border-line-soft rounded-lg p-4">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <label className="text-sm font-medium text-text-muted mb-2 block">Select Comment</label>
            <Select value={selectedCommentId || comments[0]?.id} onValueChange={onCommentSelect}>
              <SelectTrigger className="bg-surface-elev2 border-line-soft text-text">
                <SelectValue placeholder="Choose a comment..." />
              </SelectTrigger>
              <SelectContent className="bg-surface-elev2 border-line-soft">
                {comments.map((comment) => {
                  const Icon = getTypeIcon(comment);
                  return (
                    <SelectItem 
                      key={comment.id} 
                      value={comment.id}
                      className="text-text hover:bg-surface-elev1"
                    >
                      <div className="flex items-center gap-2">
                        {Icon}
                        <span>{comment.content.length > 30 ? `${comment.content.substring(0, 30)}...` : comment.content}</span>
                        <Badge 
                          variant={comment.status === 'approved' ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {comment.status}
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
        {/* Left: Comment Card */}
        <div className="lg:col-span-2">
          {selectedComment ? (
            <ProfessionalCommentCard
              comment={selectedComment}
              onView={() => onView?.(selectedComment.id)}
              onEdit={() => onEdit?.(selectedComment.id)}
              onMore={() => onMore?.(selectedComment.id)}
            />
          ) : (
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 text-center">
              <MessageCircle className="h-12 w-12 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-400">No comment selected</p>
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
                  {selectedComment?.status || 'N/A'}
                </div>
              </div>

              {/* Type */}
              <div className="flex items-center justify-between p-3 bg-surface-elev2 rounded-lg">
                <div className="flex items-center gap-2">
                  {selectedComment && (() => {
                    const Icon = getTypeIcon(selectedComment);
                    return <div className="text-text-muted">{Icon}</div>;
                  })()}
                  <span className="text-sm font-medium text-text">Type</span>
                </div>
                <span className="text-sm font-semibold text-text">
                  {selectedComment?.parentComment ? 'REPLY' : 'COMMENT'}
                </span>
              </div>

              {/* Likes */}
              <div className="flex items-center justify-between p-3 bg-surface-elev2 rounded-lg">
                <div className="flex items-center gap-2">
                  <ThumbsUp className="h-4 w-4 text-text-muted" />
                  <span className="text-sm font-medium text-text">Likes</span>
                </div>
                <span className="text-sm font-semibold text-text">
                  {selectedComment?.likes || '0'}
                </span>
              </div>

              {/* Replies */}
              <div className="flex items-center justify-between p-3 bg-surface-elev2 rounded-lg">
                <div className="flex items-center gap-2">
                  <Reply className="h-4 w-4 text-text-muted" />
                  <span className="text-sm font-medium text-text">Replies</span>
                </div>
                <span className="text-sm font-semibold text-text">
                  {selectedComment?.replies || '0'}
                </span>
              </div>

              {/* Reports */}
              <div className="flex items-center justify-between p-3 bg-surface-elev2 rounded-lg">
                <div className="flex items-center gap-2">
                  <Flag className="h-4 w-4 text-text-muted" />
                  <span className="text-sm font-medium text-text">Reports</span>
                </div>
                <span className="text-sm font-semibold text-text">
                  {selectedComment?.reportCount || '0'}
                </span>
              </div>

              {/* Spam Score */}
              <div className="flex items-center justify-between p-3 bg-surface-elev2 rounded-lg">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-text-muted" />
                  <span className="text-sm font-medium text-text">Spam Score</span>
                </div>
                <span className="text-sm font-semibold text-text">
                  {selectedComment ? `${Math.round(selectedComment.spamScore * 100)}%` : 'N/A'}
                </span>
              </div>

              {/* Date */}
              <div className="flex items-center justify-between p-3 bg-surface-elev2 rounded-lg">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-text-muted" />
                  <span className="text-sm font-medium text-text">Date</span>
                </div>
                <span className="text-sm text-text-muted">
                  {selectedComment?.createdAt ? new Date(selectedComment.createdAt).toLocaleDateString() : 'N/A'}
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
                onClick={() => onView?.(selectedComment?.id || '')}
              >
                <Eye className="h-4 w-4 mr-2" />
                View Comment
              </Button>
              <Button 
                variant="outline" 
                className="w-full bg-surface-elev2 border-line-soft text-text hover:bg-surface-elev1"
                onClick={() => onEdit?.(selectedComment?.id || '')}
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Comment
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// ----------------------
// Comments Page Client Component
// Purpose: Manages state and interactions for the comments page
// ----------------------
function CommentsPageClient() {
  const [selectedCommentId, setSelectedCommentId] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const commentsService = new CommentsManagementService();
  const allComments = commentsService.getComments();
  const stats = commentsService.getCommentsStats();

  // Filter comments based on search and status
  const filteredComments = allComments.filter(comment => {
    const matchesSearch = comment.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         comment.author.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         comment.author.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         comment.post.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || comment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Set default selected comment
  useEffect(() => {
    if (filteredComments.length > 0 && !selectedCommentId) {
      setSelectedCommentId(filteredComments[0].id);
    }
  }, [filteredComments, selectedCommentId]);

  const handleCommentSelect = (commentId: string) => {
    setSelectedCommentId(commentId);
  };

  const handleView = (commentId: string) => {
    console.log('View comment:', commentId);
  };

  const handleEdit = (commentId: string) => {
    console.log('Edit comment:', commentId);
  };

  const handleMore = (commentId: string) => {
    console.log('More actions for comment:', commentId);
  };

  const handleRefresh = () => {
    console.log('Refresh comments');
  };

  const handleExportAll = () => {
    console.log('Export all comments');
  };

  const statsCards = (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard
        title="Total Comments"
        value={stats.totalComments}
        growth={0}
        icon={MessageCircle}
        format="number"
      />
      <MetricCard
        title="Flagged Comments"
        value={stats.flaggedComments}
        growth={0}
        icon={Flag}
        format="number"
      />
      <MetricCard
        title="Spam Comments"
        value={stats.spamComments}
        growth={0}
        icon={AlertTriangle}
        format="number"
      />
      <MetricCard
        title="Total Reports"
        value={stats.totalReports}
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
      title="Comments Management"
      description="Moderate and manage user comments across the platform"
      icon={<MessageCircle className="h-6 w-6" />}
      searchPlaceholder="Search comments, authors, or content..."
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
      <CommentsDetailView
        comments={filteredComments}
        selectedCommentId={selectedCommentId}
        onCommentSelect={handleCommentSelect}
        onView={handleView}
        onEdit={handleEdit}
        onMore={handleMore}
      />
    </AdminPageTemplate>
  );
}

export default function CommentsPage() {
  return <CommentsPageClient />;
}
