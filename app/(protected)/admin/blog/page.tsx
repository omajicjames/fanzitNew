"use client";

import { AdminPageTemplate, MetricCard } from "@src/components/admin/AdminPageTemplate";
import { BlogDetailView } from "@src/components/admin/BlogDetailView";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@src/components/ui/card";
import { Badge } from "@src/components/ui/badge";
import { Button } from "@src/components/ui/button";
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
  Share2,
  BookOpen,
  Target,
  Zap,
  Star,
  ImageIcon
} from "lucide-react";
import { useState, useEffect } from "react";

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
        // featuredImage: "/placeholder.jpg", // Removed to show modern placeholder
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
      <Card className="group hover:shadow-lg transition-all duration-200 bg-[var(--admin-card-bg)] border border-[var(--admin-border-soft)] text-[var(--admin-text-primary)]">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="space-y-1 flex-1">
              <CardTitle className="text-lg line-clamp-2 text-[var(--admin-text-primary)]">{this.post.title}</CardTitle>
              <CardDescription className="line-clamp-2 text-[var(--admin-text-secondary)]">{this.post.excerpt}</CardDescription>
            </div>
            <div className="flex flex-col gap-1 ml-2">
              {this.post.featured && (
                <Badge variant="outline" className="text-yellow-500 border-yellow-500/30 bg-yellow-900/20">
                  Featured
                </Badge>
              )}
              {this.getStatusBadge()}
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Featured Image */}
          <div className="aspect-video bg-[var(--admin-surface)] rounded-lg flex items-center justify-center border border-[var(--admin-border-soft)] relative overflow-hidden">
            {this.post.featuredImage ? (
              <img 
                src={this.post.featuredImage} 
                alt={this.post.title}
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <div className="flex flex-col items-center gap-3 text-[var(--admin-text-primary)]-muted">
                <div className="p-4 bg-[var(--admin-card-bg)] rounded-full border border-[var(--admin-border-soft)]">
                  <ImageIcon className="h-8 w-8 text-[var(--brand)]" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-[var(--admin-text-primary)]">No Featured Image</p>
                  <p className="text-xs text-[var(--admin-text-primary)]-muted">Add an image to enhance this post</p>
                </div>
              </div>
            )}
          </div>

          {/* Author and Date */}
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-[var(--admin-surface)] flex items-center justify-center border border-[var(--admin-border-soft)]">
              <User className="h-4 w-4" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-[var(--admin-text-primary)]">{this.post.author.name}</p>
              <p className="text-xs text-[var(--admin-text-secondary)]">
                {this.post.publishedAt 
                  ? new Date(this.post.publishedAt).toLocaleDateString()
                  : new Date(this.post.createdAt).toLocaleDateString()
                }
              </p>
            </div>
            <div className="text-sm text-[var(--admin-text-secondary)]">
              {this.post.readingTime} min read
            </div>
          </div>

          {/* Category and Tags */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-[var(--admin-text-primary)]">Category:</span>
              <Badge variant="outline" className="text-xs bg-[var(--admin-card-bg)] border border-[var(--admin-border-soft)] text-[var(--admin-text-secondary)]">
                {this.post.category}
              </Badge>
            </div>
            <div className="flex flex-wrap gap-1">
              {this.post.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs bg-[var(--admin-card-bg)] border border-[var(--admin-border-soft)] text-[var(--admin-text-secondary)]">
                  #{tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-[var(--admin-text-secondary)]" />
              <span className="text-[var(--admin-text-primary)]">{this.post.views} views</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="h-4 w-4 text-[var(--admin-text-secondary)]" />
              <span className="text-[var(--admin-text-primary)]">{this.post.likes} likes</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4 text-[var(--admin-text-secondary)]" />
              <span className="text-[var(--admin-text-primary)]">{this.post.comments} comments</span>
            </div>
            <div className="flex items-center gap-2">
              <Share2 className="h-4 w-4 text-[var(--admin-text-secondary)]" />
              <span className="text-[var(--admin-text-primary)]">{this.post.shares} shares</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-2 border-t border-[var(--admin-border-soft)]">
            <Button variant="outline" size="sm" className="flex-1 bg-[var(--admin-surface)] border border-[var(--admin-border-soft)] text-[var(--admin-text-primary)] hover:bg-[var(--admin-card-bg)]">
              <Eye className="h-4 w-4 mr-2" />
              View
            </Button>
            <Button variant="outline" size="sm" className="flex-1 bg-[var(--admin-surface)] border border-[var(--admin-border-soft)] text-[var(--admin-text-primary)] hover:bg-[var(--admin-card-bg)]">
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
            <Button variant="outline" size="sm" className="bg-[var(--admin-surface)] border border-[var(--admin-border-soft)] text-[var(--admin-text-primary)] hover:bg-[var(--admin-card-bg)]">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }
}

export default function BlogPage() {
  const [selectedPostId, setSelectedPostId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const blogService = new BlogManagementService();
  const posts = blogService.getPosts();
  const categories = blogService.getCategories();
  const stats = blogService.getBlogStats();

  // Set default selected post
  useEffect(() => {
    if (posts.length > 0 && !selectedPostId) {
      setSelectedPostId(posts[0].id);
    }
  }, [posts, selectedPostId]);

  // Filter posts based on search and filters
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === "all" || post.status === statusFilter;
    const matchesCategory = categoryFilter === "all" || post.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handlePostSelect = (postId: string) => {
    setSelectedPostId(postId);
  };

  const handleView = () => {
    console.log('View blog post');
    // Navigate to blog post view
  };

  const handleEdit = () => {
    console.log('Edit blog post');
    // Navigate to blog post editor
  };

  const handleDelete = () => {
    console.log('Delete blog post');
    // Delete blog post
  };

  const handleMore = () => {
    console.log('More options');
    // Show more options menu
  };

  const handleFeature = () => {
    console.log('Feature blog post');
    // Toggle featured status
  };

  const handlePublish = () => {
    console.log('Publish blog post');
    // Publish blog post
  };

  const handleNewPost = () => {
    console.log('Create new blog post');
    // Navigate to new post editor
  };

  const handleFilter = () => {
    console.log('Filter blog posts');
    // Show filter options
  };

  const statsCards = (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard
        title="Total Posts"
        value={stats.totalPosts}
        growth={12.5}
        icon={PenTool}
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
        title="Total Engagement"
        value={stats.totalLikes + stats.totalComments}
        growth={15.3}
        icon={Heart}
        format="number"
      />
      <MetricCard
        title="Avg Reading Time"
        value={stats.averageReadingTime}
        growth={5.7}
        icon={Clock}
        format="number"
      />
    </div>
  );

  return (
    <AdminPageTemplate
      title="Blog Management"
      description="Comprehensive blog management for content creators"
      icon={<PenTool className="h-6 w-6" />}
      showSearch={true}
      showFilters={true}
      showRefresh={true}
      showExport={true}
      stats={statsCards}
    >
      <BlogDetailView
        posts={filteredPosts}
        selectedPostId={selectedPostId}
        onPostSelect={handlePostSelect}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onMore={handleMore}
        onFeature={handleFeature}
        onPublish={handlePublish}
        onNewPost={handleNewPost}
        onFilter={handleFilter}
      />
    </AdminPageTemplate>
  );
}
