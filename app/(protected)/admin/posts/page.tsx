"use client";

import { AdminPageTemplate, MetricCard } from "@src/components/admin/AdminPageTemplate";
import { PostsDetailView } from "@src/components/admin/PostsDetailView";
import { CompactFilterCard } from "@src/components/admin/SelectionCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@src/components/ui/card";
import { Badge } from "@src/components/ui/badge";
import { Button } from "@src/components/ui/button";
import { Input } from "@src/components/ui/input";
import { 
  FileText, 
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
  Image,
  Video,
  Music,
  Heart,
  MessageCircle,
  Share2,
  Flag,
  Shield
} from "lucide-react";
import { useState, useEffect } from "react";

// ----------------------
// Posts Management Page
// Location: /app/(protected)/admin/posts/page.tsx
// Purpose: Comprehensive post management and moderation
// Features: Post moderation, analytics, content filtering
// Note: Mobile-first design with object-oriented structure
// ----------------------

interface Post {
  id: string;
  title: string;
  content: string;
  type: 'text' | 'image' | 'video' | 'audio' | 'gallery';
  author: {
    id: string;
    name: string;
    username: string;
    avatar: string;
  };
  status: 'published' | 'pending' | 'flagged' | 'removed' | 'archived';
  category: string;
  tags: string[];
  isExplicit: boolean;
  isPremium: boolean;
  price?: number;
  media: {
    url: string;
    type: string;
    thumbnail?: string;
  }[];
  createdAt: string;
  publishedAt?: string;
  updatedAt: string;
  views: number;
  likes: number;
  comments: number;
  shares: number;
  earnings: number;
  reportCount: number;
  flags: string[];
  moderationNotes?: string;
}

class PostsManagementService {
  private posts: Post[] = [];

  constructor() {
    this.initializeMockData();
  }

  private initializeMockData() {
    this.posts = [
      {
        id: "1",
        title: "Behind the Scenes: My Creative Process",
        content: "Sharing my creative process and inspiration...",
        type: "image",
        author: {
          id: "1",
          name: "Sarah Johnson",
          username: "@sarahj",
          avatar: "/placeholder-user.jpg"
        },
        status: "published",
        category: "Lifestyle",
        tags: ["creative", "process", "inspiration"],
        isExplicit: false,
        isPremium: true,
        price: 9.99,
        media: [
          { url: "placeholder", type: "image", thumbnail: "placeholder" }
        ],
        createdAt: "2024-01-25T10:00:00Z",
        publishedAt: "2024-01-25T10:30:00Z",
        updatedAt: "2024-01-25T10:30:00Z",
        views: 1250,
        likes: 89,
        comments: 23,
        shares: 45,
        earnings: 124.50,
        reportCount: 0,
        flags: []
      },
      {
        id: "2",
        title: "Exclusive Content for My Fans",
        content: "Special content just for my supporters...",
        type: "video",
        author: {
          id: "2",
          name: "Mike Chen",
          username: "@mikechen",
          avatar: "/placeholder-user.jpg"
        },
        status: "flagged",
        category: "Entertainment",
        tags: ["exclusive", "fans", "special"],
        isExplicit: true,
        isPremium: true,
        price: 19.99,
        media: [
          { url: "placeholder", type: "video", thumbnail: "placeholder" }
        ],
        createdAt: "2024-01-24T15:20:00Z",
        publishedAt: "2024-01-24T15:45:00Z",
        updatedAt: "2024-01-24T15:45:00Z",
        views: 890,
        likes: 67,
        comments: 18,
        shares: 32,
        earnings: 89.75,
        reportCount: 3,
        flags: ["inappropriate_content", "copyright_concern"],
        moderationNotes: "Content flagged for review - potential copyright issues"
      },
      {
        id: "3",
        title: "Daily Motivation",
        content: "Today's motivational message...",
        type: "text",
        author: {
          id: "3",
          name: "Emma Wilson",
          username: "@emmaw",
          avatar: "/placeholder-user.jpg"
        },
        status: "pending",
        category: "Motivation",
        tags: ["motivation", "daily", "inspiration"],
        isExplicit: false,
        isPremium: false,
        media: [],
        createdAt: "2024-01-26T08:00:00Z",
        updatedAt: "2024-01-26T08:00:00Z",
        views: 0,
        likes: 0,
        comments: 0,
        shares: 0,
        earnings: 0,
        reportCount: 0,
        flags: []
      }
    ];
  }

  public getPosts(): Post[] {
    return this.posts;
  }

  public getPostsStats() {
    const totalPosts = this.posts.length;
    const publishedPosts = this.posts.filter(p => p.status === 'published').length;
    const pendingPosts = this.posts.filter(p => p.status === 'pending').length;
    const flaggedPosts = this.posts.filter(p => p.status === 'flagged').length;
    const totalViews = this.posts.reduce((sum, p) => sum + p.views, 0);
    const totalEarnings = this.posts.reduce((sum, p) => sum + p.earnings, 0);
    const averageEngagement = totalPosts > 0 ? this.posts.reduce((sum, p) => sum + p.likes + p.comments + p.shares, 0) / totalPosts : 0;

    return {
      totalPosts,
      publishedPosts,
      pendingPosts,
      flaggedPosts,
      totalViews,
      totalEarnings,
      averageEngagement
    };
  }
}

class PostCardComponent {
  private post: Post;

  constructor(post: Post) {
    this.post = post;
  }

  private getStatusBadge() {
    const statusConfig = {
      published: { variant: "default" as const, icon: CheckCircle, text: "Published" },
      pending: { variant: "secondary" as const, icon: Clock, text: "Pending" },
      flagged: { variant: "destructive" as const, icon: Flag, text: "Flagged" },
      removed: { variant: "destructive" as const, icon: AlertTriangle, text: "Removed" },
      archived: { variant: "outline" as const, icon: Shield, text: "Archived" }
    };

    const config = statusConfig[this.post.status];
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {config.text}
      </Badge>
    );
  }

  private getTypeIcon() {
    const icons = {
      text: FileText,
      image: Image,
      video: Video,
      audio: Music,
      gallery: Image
    };
    const Icon = icons[this.post.type];
    return <Icon className="h-4 w-4" />;
  }

  public render() {
    return (
      <Card className="group hover:shadow-lg transition-all duration-200">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="space-y-1 flex-1">
              <CardTitle className="text-lg line-clamp-2">{this.post.title}</CardTitle>
              <CardDescription className="line-clamp-2">{this.post.content}</CardDescription>
            </div>
            <div className="flex flex-col gap-1 ml-2">
              {this.post.isPremium && (
                <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                  Premium
                </Badge>
              )}
              {this.getStatusBadge()}
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Media Preview */}
          <div className="aspect-video bg-muted rounded-lg flex items-center justify-center relative">
            {this.post.media.length > 0 ? (
              <div className="text-center">
                {this.getTypeIcon()}
                <p className="text-sm text-muted-foreground mt-2">
                  {this.post.media.length} {this.post.type}(s)
                </p>
              </div>
            ) : (
              <div className="text-center">
                <FileText className="h-12 w-12 text-muted-foreground" />
                <p className="text-sm text-muted-foreground mt-2">Text Post</p>
              </div>
            )}
            {this.post.isExplicit && (
              <div className="absolute top-2 right-2">
                <Badge variant="destructive" className="text-xs">18+</Badge>
              </div>
            )}
          </div>

          {/* Author Info */}
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
              <User className="h-4 w-4" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{this.post.author.name}</p>
              <p className="text-xs text-muted-foreground">{this.post.author.username}</p>
            </div>
            <div className="text-sm text-muted-foreground">
              {new Date(this.post.createdAt).toLocaleDateString()}
            </div>
          </div>

          {/* Category and Tags */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Category:</span>
              <Badge variant="outline" className="text-xs">
                {this.post.category}
              </Badge>
            </div>
            <div className="flex flex-wrap gap-1">
              {this.post.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  #{tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-muted-foreground" />
              <span>{this.post.views} views</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="h-4 w-4 text-muted-foreground" />
              <span>{this.post.likes} likes</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4 text-muted-foreground" />
              <span>{this.post.comments} comments</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
              <span>${this.post.earnings.toFixed(2)}</span>
            </div>
          </div>

          {/* Flags and Reports */}
          {this.post.reportCount > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <div className="flex items-center gap-2 text-red-800">
                <Flag className="h-4 w-4" />
                <span className="text-sm font-medium">{this.post.reportCount} Reports</span>
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                {this.post.flags.map((flag) => (
                  <Badge key={flag} variant="destructive" className="text-xs">
                    {flag.replace('_', ' ')}
                  </Badge>
                ))}
              </div>
              {this.post.moderationNotes && (
                <p className="text-xs text-red-700 mt-2">{this.post.moderationNotes}</p>
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

export default function PostsPage() {
  const [selectedPostId, setSelectedPostId] = useState("");
  const [selectedPostIdDetail, setSelectedPostIdDetail] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const postsService = new PostsManagementService();
  const posts = postsService.getPosts();
  const stats = postsService.getPostsStats();

  // Set default selected post
  useEffect(() => {
    if (posts.length > 0 && !selectedPostId) {
      setSelectedPostId(posts[0].id);
    }
    if (posts.length > 0 && !selectedPostIdDetail) {
      setSelectedPostIdDetail(posts[0].id);
    }
  }, [posts, selectedPostId, selectedPostIdDetail]);

  // Filter posts based on search and filters
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.author.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === "all" || post.status === statusFilter;
    const matchesType = typeFilter === "all" || post.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const handlePostSelect = (postId: string) => {
    setSelectedPostId(postId);
  };

  const handlePostSelectDetail = (postId: string) => {
    setSelectedPostIdDetail(postId);
  };

  const handleView = () => {
    console.log('View post');
    // Navigate to post view
  };

  const handleEdit = () => {
    console.log('Edit post');
    // Navigate to post editor
  };

  const handleDelete = () => {
    console.log('Delete post');
    // Delete post
  };

  const handleMore = () => {
    console.log('More options');
    // Show more options menu
  };

  const handleApprove = () => {
    console.log('Approve post');
    // Approve pending post
  };

  const handleFlag = () => {
    console.log('Flag post');
    // Flag post for review
  };

  const handleArchive = () => {
    console.log('Archive post');
    // Archive post
  };

  const handleNewPost = () => {
    console.log('Create new post');
    // Navigate to new post editor
  };

  const handleFilter = () => {
    console.log('Filter posts');
    // Show filter options
  };

  const statsCards = (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard
        title="Total Posts"
        value={stats.totalPosts}
        growth={12.5}
        icon={FileText}
        format="number"
      />
      <MetricCard
        title="Flagged Posts"
        value={stats.flaggedPosts}
        growth={-5.2}
        icon={Flag}
        format="number"
      />
      <MetricCard
        title="Total Views"
        value={stats.totalViews}
        growth={8.2}
        icon={Eye}
        format="number"
      />
      <MetricCard
        title="Total Earnings"
        value={stats.totalEarnings}
        growth={15.3}
        icon={TrendingUp}
        format="currency"
      />
    </div>
  );

  return (
    <AdminPageTemplate
      title="Posts Management"
      description="Comprehensive post management and moderation"
      icon={<FileText className="h-6 w-6" />}
      showSearch={true}
      showFilters={true}
      showRefresh={true}
      showExport={true}
      stats={statsCards}
    >
      <div className="space-y-6">
        {/* Filter Section */}
        <div className="bg-blue-200 p-2 rounded-lg border-2 border-blue-400">
          <CompactFilterCard
            title="Select Post"
            placeholder="Choose a post..."
            value={selectedPostId || filteredPosts[0]?.id || ''}
            onValueChange={handlePostSelect}
            options={filteredPosts.map(post => ({
              id: post.id,
              label: post.title,
              status: post.status,
              icon: <FileText className="h-4 w-4" />
            }))}
          />
        </div>

        <PostsDetailView
          posts={filteredPosts}
          selectedPostId={selectedPostIdDetail}
          onPostSelect={handlePostSelectDetail}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onMore={handleMore}
          onApprove={handleApprove}
          onFlag={handleFlag}
          onArchive={handleArchive}
          onNewPost={handleNewPost}
          onFilter={handleFilter}
        />
      </div>
    </AdminPageTemplate>
  );
}
