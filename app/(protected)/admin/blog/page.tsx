"use client";

import { AdminPillNavigationComponent } from "@src/components/admin/AdminPillNavigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@src/components/ui/card";
import { Badge } from "@src/components/ui/badge";
import { Button } from "@src/components/ui/button";
import { Input } from "@src/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@src/components/ui/tabs";
import { 
  PenTool, 
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
  FileText,
  Heart,
  MessageCircle,
  Share2
} from "lucide-react";

// ----------------------
// Blog Management Page
// Location: /app/(protected)/admin/blog/page.tsx
// Purpose: Comprehensive blog management for content creators
// Features: Blog posts, categories, analytics, SEO management
// Note: Mobile-first design with object-oriented structure
// ----------------------

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  category: string;
  tags: string[];
  status: 'published' | 'draft' | 'scheduled' | 'archived';
  featured: boolean;
  seoTitle?: string;
  seoDescription?: string;
  featuredImage?: string;
  publishedAt?: string;
  scheduledAt?: string;
  createdAt: string;
  updatedAt: string;
  views: number;
  likes: number;
  comments: number;
  shares: number;
  readingTime: number;
}

interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  postCount: number;
  color: string;
  status: 'active' | 'inactive';
}

class BlogManagementService {
  private posts: BlogPost[] = [];
  private categories: BlogCategory[] = [];

  constructor() {
    this.initializeMockData();
  }

  private initializeMockData() {
    this.posts = [
      {
        id: "1",
        title: "Getting Started with Content Creation",
        slug: "getting-started-content-creation",
        excerpt: "Learn the fundamentals of creating engaging content for your audience",
        content: "Full blog post content here...",
        author: {
          id: "1",
          name: "Admin User",
          avatar: "/placeholder-user.jpg"
        },
        category: "Tutorials",
        tags: ["content", "tutorial", "beginner"],
        status: "published",
        featured: true,
        seoTitle: "Content Creation Guide - Complete Tutorial",
        seoDescription: "Master content creation with our comprehensive guide",
        featuredImage: "/placeholder.jpg",
        publishedAt: "2024-01-25T10:00:00Z",
        createdAt: "2024-01-20T08:00:00Z",
        updatedAt: "2024-01-25T10:00:00Z",
        views: 1250,
        likes: 89,
        comments: 23,
        shares: 45,
        readingTime: 8
      },
      {
        id: "2",
        title: "Advanced Monetization Strategies",
        slug: "advanced-monetization-strategies",
        excerpt: "Discover proven methods to maximize your earnings",
        content: "Full blog post content here...",
        author: {
          id: "1",
          name: "Admin User",
          avatar: "/placeholder-user.jpg"
        },
        category: "Monetization",
        tags: ["monetization", "earnings", "strategy"],
        status: "published",
        featured: false,
        publishedAt: "2024-01-22T14:30:00Z",
        createdAt: "2024-01-18T09:00:00Z",
        updatedAt: "2024-01-22T14:30:00Z",
        views: 890,
        likes: 67,
        comments: 18,
        shares: 32,
        readingTime: 12
      },
      {
        id: "3",
        title: "Building Your Community",
        slug: "building-your-community",
        excerpt: "Tips for growing and engaging your fanbase",
        content: "Full blog post content here...",
        author: {
          id: "1",
          name: "Admin User",
          avatar: "/placeholder-user.jpg"
        },
        category: "Community",
        tags: ["community", "engagement", "growth"],
        status: "draft",
        featured: false,
        createdAt: "2024-01-26T11:00:00Z",
        updatedAt: "2024-01-26T11:00:00Z",
        views: 0,
        likes: 0,
        comments: 0,
        shares: 0,
        readingTime: 6
      }
    ];

    this.categories = [
      { id: "1", name: "Tutorials", slug: "tutorials", description: "Educational content and guides", postCount: 15, color: "#3B82F6", status: "active" },
      { id: "2", name: "Monetization", slug: "monetization", description: "Earning strategies and tips", postCount: 8, color: "#10B981", status: "active" },
      { id: "3", name: "Community", slug: "community", description: "Community building and engagement", postCount: 12, color: "#F59E0B", status: "active" },
      { id: "4", name: "News", slug: "news", description: "Platform updates and news", postCount: 5, color: "#EF4444", status: "active" }
    ];
  }

  public getPosts(): BlogPost[] {
    return this.posts;
  }

  public getCategories(): BlogCategory[] {
    return this.categories;
  }

  public getBlogStats() {
    const totalPosts = this.posts.length;
    const publishedPosts = this.posts.filter(p => p.status === 'published').length;
    const draftPosts = this.posts.filter(p => p.status === 'draft').length;
    const totalViews = this.posts.reduce((sum, p) => sum + p.views, 0);
    const totalLikes = this.posts.reduce((sum, p) => sum + p.likes, 0);
    const totalComments = this.posts.reduce((sum, p) => sum + p.comments, 0);
    const averageReadingTime = totalPosts > 0 ? this.posts.reduce((sum, p) => sum + p.readingTime, 0) / totalPosts : 0;

    return {
      totalPosts,
      publishedPosts,
      draftPosts,
      totalViews,
      totalLikes,
      totalComments,
      averageReadingTime
    };
  }
}

class BlogPostCardComponent {
  private post: BlogPost;

  constructor(post: BlogPost) {
    this.post = post;
  }

  private getStatusBadge() {
    const statusConfig = {
      published: { variant: "default" as const, icon: CheckCircle, text: "Published" },
      draft: { variant: "secondary" as const, icon: Edit, text: "Draft" },
      scheduled: { variant: "outline" as const, icon: Clock, text: "Scheduled" },
      archived: { variant: "destructive" as const, icon: AlertTriangle, text: "Archived" }
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

  public render() {
    return (
      <Card className="group hover:shadow-lg transition-all duration-200">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="space-y-1 flex-1">
              <CardTitle className="text-lg line-clamp-2">{this.post.title}</CardTitle>
              <CardDescription className="line-clamp-2">{this.post.excerpt}</CardDescription>
            </div>
            <div className="flex flex-col gap-1 ml-2">
              {this.post.featured && (
                <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                  Featured
                </Badge>
              )}
              {this.getStatusBadge()}
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Featured Image */}
          <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
            <FileText className="h-12 w-12 text-muted-foreground" />
          </div>

          {/* Author and Date */}
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
              <User className="h-4 w-4" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{this.post.author.name}</p>
              <p className="text-xs text-muted-foreground">
                {this.post.publishedAt 
                  ? new Date(this.post.publishedAt).toLocaleDateString()
                  : new Date(this.post.createdAt).toLocaleDateString()
                }
              </p>
            </div>
            <div className="text-sm text-muted-foreground">
              {this.post.readingTime} min read
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
              <Share2 className="h-4 w-4 text-muted-foreground" />
              <span>{this.post.shares} shares</span>
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

export default function BlogPage() {
  const blogService = new BlogManagementService();
  const posts = blogService.getPosts();
  const categories = blogService.getCategories();
  const stats = blogService.getBlogStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Blog Management</h1>
          <p className="text-muted-foreground">Manage blog posts, categories, and content</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Categories
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Post
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
            <PenTool className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalPosts}</div>
            <p className="text-xs text-muted-foreground">
              {stats.publishedPosts} published, {stats.draftPosts} drafts
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalViews.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Across all posts
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Engagement</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalLikes + stats.totalComments}</div>
            <p className="text-xs text-muted-foreground">
              {stats.totalLikes} likes, {stats.totalComments} comments
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Reading Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.averageReadingTime.toFixed(1)}m</div>
            <p className="text-xs text-muted-foreground">
              Per post
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
                  placeholder="Search blog posts..."
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

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => {
          const postCard = new BlogPostCardComponent(post);
          return <div key={post.id}>{postCard.render()}</div>;
        })}
      </div>
    </div>
  );
}
