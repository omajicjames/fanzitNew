"use client";

import { AdminPillNavigationComponent } from "@src/components/admin/AdminPillNavigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@src/components/ui/card";
import { Badge } from "@src/components/ui/badge";
import { Button } from "@src/components/ui/button";
import { Input } from "@src/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@src/components/ui/tabs";
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
  FileText
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

class CommentCardComponent {
  private comment: Comment;

  constructor(comment: Comment) {
    this.comment = comment;
  }

  private getStatusBadge() {
    const statusConfig = {
      approved: { variant: "default" as const, icon: CheckCircle, text: "Approved" },
      pending: { variant: "secondary" as const, icon: Clock, text: "Pending" },
      flagged: { variant: "destructive" as const, icon: Flag, text: "Flagged" },
      spam: { variant: "destructive" as const, icon: AlertTriangle, text: "Spam" },
      removed: { variant: "outline" as const, icon: Shield, text: "Removed" }
    };

    const config = statusConfig[this.comment.status];
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
              <CardTitle className="text-sm line-clamp-3">{this.comment.content}</CardTitle>
              {this.comment.isEdited && (
                <Badge variant="outline" className="text-xs w-fit">
                  Edited
                </Badge>
              )}
            </div>
            <div className="flex flex-col gap-1 ml-2">
              {this.comment.isSpam && (
                <Badge variant="destructive" className="text-xs">
                  Spam ({Math.round(this.comment.spamScore * 100)}%)
                </Badge>
              )}
              {this.getStatusBadge()}
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Author Info */}
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
              <User className="h-4 w-4" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{this.comment.author.name}</p>
              <p className="text-xs text-muted-foreground">{this.comment.author.username}</p>
            </div>
            <div className="text-sm text-muted-foreground">
              {new Date(this.comment.createdAt).toLocaleDateString()}
            </div>
          </div>

          {/* Post Context */}
          <div className="bg-muted/50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">On Post:</span>
            </div>
            <p className="text-sm font-medium">{this.comment.post.title}</p>
            <p className="text-xs text-muted-foreground">by {this.comment.post.author}</p>
          </div>

          {/* Parent Comment (if reply) */}
          {this.comment.parentComment && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <Reply className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-800">Replying to:</span>
              </div>
              <p className="text-sm text-blue-700 line-clamp-2">
                "{this.comment.parentComment.content}"
              </p>
              <p className="text-xs text-blue-600 mt-1">by {this.comment.parentComment.author}</p>
            </div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <ThumbsUp className="h-4 w-4 text-muted-foreground" />
              <span>{this.comment.likes} likes</span>
            </div>
            <div className="flex items-center gap-2">
              <ThumbsDown className="h-4 w-4 text-muted-foreground" />
              <span>{this.comment.dislikes} dislikes</span>
            </div>
            <div className="flex items-center gap-2">
              <Reply className="h-4 w-4 text-muted-foreground" />
              <span>{this.comment.replies} replies</span>
            </div>
            <div className="flex items-center gap-2">
              <Flag className="h-4 w-4 text-muted-foreground" />
              <span>{this.comment.reportCount} reports</span>
            </div>
          </div>

          {/* Flags and Reports */}
          {this.comment.reportCount > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <div className="flex items-center gap-2 text-red-800 mb-2">
                <Flag className="h-4 w-4" />
                <span className="text-sm font-medium">{this.comment.reportCount} Reports</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {this.comment.flags.map((flag) => (
                  <Badge key={flag} variant="destructive" className="text-xs">
                    {flag.replace('_', ' ')}
                  </Badge>
                ))}
              </div>
              {this.comment.moderationNotes && (
                <p className="text-xs text-red-700 mt-2">{this.comment.moderationNotes}</p>
              )}
            </div>
          )}

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

export default function CommentsPage() {
  const commentsService = new CommentsManagementService();
  const comments = commentsService.getComments();
  const stats = commentsService.getCommentsStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Comments Management</h1>
          <p className="text-muted-foreground">Moderate and manage user comments</p>
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
            <CardTitle className="text-sm font-medium">Total Comments</CardTitle>
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalComments}</div>
            <p className="text-xs text-muted-foreground">
              {stats.approvedComments} approved, {stats.pendingComments} pending
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Flagged Comments</CardTitle>
            <Flag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.flaggedComments}</div>
            <p className="text-xs text-muted-foreground">
              Require review
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Spam Comments</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{stats.spamComments}</div>
            <p className="text-xs text-muted-foreground">
              Auto-detected
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalReports}</div>
            <p className="text-xs text-muted-foreground">
              User reports
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
                  placeholder="Search comments, authors, or content..."
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

      {/* Comments List */}
      <div className="space-y-4">
        {comments.map((comment) => {
          const commentCard = new CommentCardComponent(comment);
          return <div key={comment.id}>{commentCard.render()}</div>;
        })}
      </div>
    </div>
  );
}
