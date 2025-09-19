"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@src/components/ui/card";
import { Badge } from "@src/components/ui/badge";
import { Button } from "@src/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@src/components/ui/select";
import { AdminCard } from "@src/components/admin/AdminPageTemplate";
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
  ArrowRight,
  Calendar as CalendarIcon,
  Tag,
  Bookmark
} from "lucide-react";
import { useState, useEffect } from "react";

// ----------------------
// Public Blog Page
// Location: /app/blog/page.tsx
// Purpose: Public blog page with single comprehensive card design
// Features: Blog posts, categories, search, filtering, single-card view
// Note: Similar to verification page layout with card on left and stats on right
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
    bio: string;
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
  readTime: number;
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

class BlogService {
  private posts: BlogPost[] = [];
  private categories: BlogCategory[] = [];

  constructor() {
    this.initializeMockData();
  }

  private initializeMockData() {
    this.posts = [
      {
        id: "1",
        title: "Getting Started with Content Creation: A Complete Guide",
        slug: "getting-started-content-creation",
        excerpt: "Learn the fundamentals of creating engaging content for your audience. This comprehensive guide covers everything from ideation to publication.",
        content: "Full blog post content here...",
        author: {
          id: "1",
          name: "Sarah Johnson",
          avatar: "/placeholder-user.jpg",
          bio: "Content Creator & Marketing Expert"
        },
        category: "Tutorials",
        tags: ["content", "tutorial", "beginner", "marketing"],
        status: "published",
        featured: true,
        seoTitle: "Content Creation Guide - Complete Tutorial for Beginners",
        seoDescription: "Master content creation with our comprehensive guide covering strategy, tools, and best practices",
        featuredImage: "/placeholder.jpg",
        publishedAt: "2024-01-25T10:00:00Z",
        createdAt: "2024-01-20T08:00:00Z",
        updatedAt: "2024-01-25T10:00:00Z",
        views: 1250,
        likes: 89,
        comments: 23,
        shares: 45,
        readingTime: 8,
        readTime: 8
      },
      {
        id: "2",
        title: "Advanced Monetization Strategies for Digital Creators",
        slug: "advanced-monetization-strategies",
        excerpt: "Discover proven methods to maximize your earnings as a digital creator. Learn about multiple revenue streams and optimization techniques.",
        content: "Full blog post content here...",
        author: {
          id: "2",
          name: "Mike Chen",
          avatar: "/placeholder-user.jpg",
          bio: "Monetization Specialist & Business Coach"
        },
        category: "Monetization",
        tags: ["monetization", "earnings", "strategy", "business"],
        status: "published",
        featured: false,
        publishedAt: "2024-01-22T14:30:00Z",
        createdAt: "2024-01-18T09:00:00Z",
        updatedAt: "2024-01-22T14:30:00Z",
        views: 890,
        likes: 67,
        comments: 18,
        shares: 32,
        readingTime: 12,
        readTime: 12
      },
      {
        id: "3",
        title: "Building Your Community: Engagement Strategies That Work",
        slug: "building-your-community",
        excerpt: "Tips for growing and engaging your fanbase. Learn how to create meaningful connections with your audience and build a loyal community.",
        content: "Full blog post content here...",
        author: {
          id: "3",
          name: "Emma Rodriguez",
          avatar: "/placeholder-user.jpg",
          bio: "Community Manager & Social Media Expert"
        },
        category: "Community",
        tags: ["community", "engagement", "growth", "social"],
        status: "published",
        featured: false,
        publishedAt: "2024-01-20T16:00:00Z",
        createdAt: "2024-01-15T11:00:00Z",
        updatedAt: "2024-01-20T16:00:00Z",
        views: 2100,
        likes: 156,
        comments: 42,
        shares: 78,
        readingTime: 6,
        readTime: 6
      },
      {
        id: "4",
        title: "Platform Updates: New Features and Improvements",
        slug: "platform-updates-new-features",
        excerpt: "Stay up to date with the latest platform features and improvements. Learn about new tools and capabilities available to creators.",
        content: "Full blog post content here...",
        author: {
          id: "4",
          name: "Alex Thompson",
          avatar: "/placeholder-user.jpg",
          bio: "Product Manager & Platform Expert"
        },
        category: "News",
        tags: ["updates", "features", "platform", "news"],
        status: "published",
        featured: true,
        publishedAt: "2024-01-18T09:00:00Z",
        createdAt: "2024-01-15T14:00:00Z",
        updatedAt: "2024-01-18T09:00:00Z",
        views: 3200,
        likes: 234,
        comments: 67,
        shares: 123,
        readingTime: 5,
        readTime: 5
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
    const totalViews = this.posts.reduce((sum, p) => sum + p.views, 0);
    const totalLikes = this.posts.reduce((sum, p) => sum + p.likes, 0);
    const totalComments = this.posts.reduce((sum, p) => sum + p.comments, 0);
    const totalShares = this.posts.reduce((sum, p) => sum + p.shares, 0);
    const averageReadingTime = totalPosts > 0 ? this.posts.reduce((sum, p) => sum + p.readingTime, 0) / totalPosts : 0;

    return {
      totalPosts,
      publishedPosts,
      totalViews,
      totalLikes,
      totalComments,
      totalShares,
      averageReadingTime
    };
  }
}

// ----------------------
// Blog Post Card Component
// Location: /app/blog/page.tsx
// Purpose: Comprehensive blog post card for public display
// Note: Single card design with all necessary elements
// ----------------------
function BlogPostCard({ post }: { post: BlogPost }) {
  const getCategoryColor = (category: string) => {
    const colors = {
      'Tutorials': 'text-blue-500 bg-blue-900/20 border-blue-500/30',
      'Monetization': 'text-green-500 bg-green-900/20 border-green-500/30',
      'Community': 'text-orange-500 bg-orange-900/20 border-orange-500/30',
      'News': 'text-red-500 bg-red-900/20 border-red-500/30'
    };
    return colors[category as keyof typeof colors] || 'text-gray-500 bg-gray-900/20 border-gray-500/30';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getEngagementRate = () => {
    if (post.views === 0) return 0;
    return ((post.likes + post.comments + post.shares) / post.views * 100).toFixed(1);
  };

  return (
    <AdminCard
      title={post.title}
      description={post.excerpt}
      icon={<PenTool className="h-5 w-5 text-neutral-400" />}
      headerActions={
        <div className="flex flex-col gap-1">
          {post.featured && (
            <Badge variant="outline" className="text-yellow-500 border-yellow-500/30 bg-yellow-900/20">
              <Star className="h-3 w-3 mr-1" />
              Featured
            </Badge>
          )}
          <Badge variant="outline" className="text-green-500 border-green-500/30 bg-green-900/20">
            <CheckCircle className="h-3 w-3 mr-1" />
            Published
          </Badge>
        </div>
      }
      className="group hover:shadow-lg transition-all duration-200"
      variant="data"
    >
      <div className="space-y-4">
        {/* Featured Image */}
        <div className="aspect-video bg-[var(--admin-card-bg)] rounded-lg flex items-center justify-center border border-[var(--admin-border-soft)]">
          {post.featuredImage ? (
            <img 
              src={post.featuredImage} 
              alt={post.title}
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            <div className="flex flex-col items-center gap-2 text-[var(--admin-text-primary)]-muted">
              <FileText className="h-12 w-12" />
              <span className="text-sm">No featured image</span>
            </div>
          )}
        </div>

        {/* Author and Date Information */}
        <div className="flex items-center gap-3 p-3 bg-[var(--admin-card-bg)] rounded-lg border border-[var(--admin-border-soft)]">
          <div className="h-10 w-10 rounded-full bg-[var(--admin-surface)] flex items-center justify-center border border-[var(--admin-border-soft)]">
            <User className="h-5 w-5 text-[var(--admin-text-primary)]-muted" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-[var(--admin-text-primary)]">{post.author.name}</p>
            <p className="text-xs text-[var(--admin-text-primary)]-muted">{post.author.bio}</p>
            <p className="text-xs text-[var(--admin-text-primary)]-muted mt-1">
              Published {formatDate(post.publishedAt || post.createdAt)}
            </p>
          </div>
          <div className="text-sm text-[var(--admin-text-primary)]-muted flex items-center gap-1">
            <BookOpen className="h-4 w-4" />
            {post.readingTime} min read
          </div>
        </div>

        {/* Category and Tags */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-[var(--admin-text-primary)]-muted">Category:</span>
            <Badge 
              variant="outline" 
              className={`text-xs ${getCategoryColor(post.category)}`}
            >
              {post.category}
            </Badge>
          </div>
          <div className="flex flex-wrap gap-1">
            {post.tags.map((tag) => (
              <Badge 
                key={tag} 
                variant="outline" 
                className="text-xs bg-[var(--admin-card-bg)] border border-[var(--admin-border-soft)] text-[var(--admin-text-primary)]-muted"
              >
                #{tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-[var(--admin-card-bg)] border border-[var(--admin-border-soft)] rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <Eye className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium text-[var(--admin-text-primary)]">Views</span>
            </div>
            <div className="text-lg font-bold text-[var(--admin-text-primary)]">{post.views.toLocaleString()}</div>
            <div className="text-xs text-[var(--admin-text-primary)]-muted">Total views</div>
          </div>

          <div className="bg-[var(--admin-card-bg)] border border-[var(--admin-border-soft)] rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <span className="text-sm font-medium text-[var(--admin-text-primary)]">Engagement</span>
            </div>
            <div className="text-lg font-bold text-[var(--admin-text-primary)]">{getEngagementRate()}%</div>
            <div className="text-xs text-[var(--admin-text-primary)]-muted">Engagement rate</div>
          </div>
        </div>

        {/* Detailed Stats */}
        <div className="grid grid-cols-4 gap-2 text-sm">
          <div className="flex items-center gap-1 p-2 bg-[var(--admin-card-bg)] rounded border border-[var(--admin-border-soft)]">
            <Heart className="h-3 w-3 text-red-500" />
            <span className="text-[var(--admin-text-primary)]">{post.likes}</span>
          </div>
          <div className="flex items-center gap-1 p-2 bg-[var(--admin-card-bg)] rounded border border-[var(--admin-border-soft)]">
            <MessageCircle className="h-3 w-3 text-blue-500" />
            <span className="text-[var(--admin-text-primary)]">{post.comments}</span>
          </div>
          <div className="flex items-center gap-1 p-2 bg-[var(--admin-card-bg)] rounded border border-[var(--admin-border-soft)]">
            <Share2 className="h-3 w-3 text-purple-500" />
            <span className="text-[var(--admin-text-primary)]">{post.shares}</span>
          </div>
          <div className="flex items-center gap-1 p-2 bg-[var(--admin-card-bg)] rounded border border-[var(--admin-border-soft)]">
            <Target className="h-3 w-3 text-orange-500" />
            <span className="text-[var(--admin-text-primary)]">{post.readingTime}m</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2 border-t border-[var(--admin-border-soft)]">
          <Button
            className="flex-1 bg-brand hover:bg-brand/90 text-white"
          >
            <Eye className="h-4 w-4 mr-2" />
            Read Article
          </Button>
          <Button
            variant="outline"
            className="flex-1 bg-[var(--admin-surface)] border border-[var(--admin-border-soft)] text-[var(--admin-text-primary)] hover:bg-[var(--admin-card-bg)]"
          >
            <Bookmark className="h-4 w-4 mr-2" />
            Save
          </Button>
          <Button
            variant="outline"
            className="bg-[var(--admin-surface)] border border-[var(--admin-border-soft)] text-[var(--admin-text-primary)] hover:bg-[var(--admin-card-bg)]"
          >
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </AdminCard>
  );
}

// ----------------------
// Blog Detail View Component
// Location: /app/blog/page.tsx
// Purpose: Single-card view with filtering and stats
// Note: Similar to verification page layout
// ----------------------
function BlogDetailView({ 
  posts, 
  selectedPostId, 
  onPostSelect, 
  categories, 
  stats 
}: { 
  posts: BlogPost[]; 
  selectedPostId: string; 
  onPostSelect: (postId: string) => void; 
  categories: BlogCategory[];
  stats: any;
}) {
  const selectedPost = posts.find(post => post.id === selectedPostId) || posts[0];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Blog Post Card - Left Column */}
      <div className="lg:col-span-2">
        {selectedPost && <BlogPostCard post={selectedPost} />}
      </div>

      {/* Quick Stats and Controls - Right Column */}
      <div className="space-y-4">
        {/* Post Selection */}
        <AdminCard
          title="Browse Articles"
          description="Choose which article to read"
          className="mb-4"
        >
          <Select value={selectedPostId} onValueChange={onPostSelect}>
            <SelectTrigger className="bg-[var(--admin-surface)] border border-[var(--admin-border-soft)] text-[var(--admin-text-primary)] hover:bg-[var(--admin-card-bg)] focus:ring-2 focus:ring-brand/20">
              <SelectValue placeholder="Select article" />
            </SelectTrigger>
            <SelectContent className="bg-[var(--admin-surface)] border border-[var(--admin-border-soft)] shadow-lg z-50">
              {posts.map((post) => (
                <SelectItem
                  key={post.id}
                  value={post.id}
                  className="text-[var(--admin-text-primary)] hover:bg-[var(--admin-card-bg)] focus:bg-[var(--admin-card-bg)] cursor-pointer"
                >
                  <div className="flex flex-col py-1">
                    <span className="font-medium text-[var(--admin-text-primary)] line-clamp-1">{post.title}</span>
                    <span className="text-xs text-[var(--admin-text-primary)]-muted">{post.category} • {post.readingTime} min read</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </AdminCard>

        {/* Blog Stats */}
        <AdminCard
          title="Blog Statistics"
          description="Overall blog performance"
          className="mb-4"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-[var(--admin-surface)] rounded-lg border border-[var(--admin-border-soft)]">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-blue-500" />
                <div>
                  <div className="text-sm font-medium text-[var(--admin-text-primary)]">Total Articles</div>
                  <div className="text-xs text-[var(--admin-text-primary)]-muted">Published posts</div>
                </div>
              </div>
              <div className="text-sm font-bold text-[var(--admin-text-primary)]">
                {stats.totalPosts}
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-[var(--admin-surface)] rounded-lg border border-[var(--admin-border-soft)]">
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4 text-green-500" />
                <div>
                  <div className="text-sm font-medium text-[var(--admin-text-primary)]">Total Views</div>
                  <div className="text-xs text-[var(--admin-text-primary)]-muted">All articles</div>
                </div>
              </div>
              <div className="text-sm font-bold text-[var(--admin-text-primary)]">
                {stats.totalViews.toLocaleString()}
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-[var(--admin-surface)] rounded-lg border border-[var(--admin-border-soft)]">
              <div className="flex items-center gap-2">
                <Heart className="h-4 w-4 text-red-500" />
                <div>
                  <div className="text-sm font-medium text-[var(--admin-text-primary)]">Total Likes</div>
                  <div className="text-xs text-[var(--admin-text-primary)]-muted">Community engagement</div>
                </div>
              </div>
              <div className="text-sm font-bold text-[var(--admin-text-primary)]">
                {stats.totalLikes.toLocaleString()}
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-[var(--admin-surface)] rounded-lg border border-[var(--admin-border-soft)]">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-purple-500" />
                <div>
                  <div className="text-sm font-medium text-[var(--admin-text-primary)]">Avg Reading Time</div>
                  <div className="text-xs text-[var(--admin-text-primary)]-muted">Per article</div>
                </div>
              </div>
              <div className="text-sm font-bold text-[var(--admin-text-primary)]">
                {stats.averageReadingTime.toFixed(1)}m
              </div>
            </div>
          </div>
        </AdminCard>

        {/* Categories */}
        <AdminCard
          title="Categories"
          description="Browse by topic"
          className="mb-4"
        >
          <div className="space-y-2">
            {categories.map((category) => (
              <div
                key={category.id}
                className="flex items-center justify-between p-2 bg-[var(--admin-surface)] rounded-lg border border-[var(--admin-border-soft)] hover:bg-[var(--admin-card-bg)] transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: category.color }}
                  />
                  <span className="text-sm font-medium text-[var(--admin-text-primary)]">{category.name}</span>
                </div>
                <div className="text-xs text-[var(--admin-text-primary)]-muted">
                  {category.postCount} posts
                </div>
              </div>
            ))}
          </div>
        </AdminCard>

        {/* Quick Actions */}
        <AdminCard
          title="Quick Actions"
          description="Common blog tasks"
        >
          <div className="space-y-2">
            <button className="w-full flex items-center gap-2 p-3 text-sm font-medium text-[var(--admin-text-primary)] hover:bg-[var(--admin-surface)] rounded-lg border border-[var(--admin-border-soft)] transition-colors">
              <Search className="h-4 w-4 text-brand" />
              Search Articles
            </button>
            <button className="w-full flex items-center gap-2 p-3 text-sm font-medium text-[var(--admin-text-primary)] hover:bg-[var(--admin-surface)] rounded-lg border border-[var(--admin-border-soft)] transition-colors">
              <Filter className="h-4 w-4 text-brand" />
              Filter by Category
            </button>
            <button className="w-full flex items-center gap-2 p-3 text-sm font-medium text-[var(--admin-text-primary)] hover:bg-[var(--admin-surface)] rounded-lg border border-[var(--admin-border-soft)] transition-colors">
              <Bookmark className="h-4 w-4 text-brand" />
              Saved Articles
            </button>
            <button className="w-full flex items-center gap-2 p-3 text-sm font-medium text-[var(--admin-text-primary)] hover:bg-[var(--admin-surface)] rounded-lg border border-[var(--admin-border-soft)] transition-colors">
              <CalendarIcon className="h-4 w-4 text-brand" />
              Recent Posts
            </button>
          </div>
        </AdminCard>
      </div>
    </div>
  );
}

// ----------------------
// Main Blog Page Component
// Location: /app/blog/page.tsx
// Purpose: Public blog page with single-card layout
// Note: Similar to verification page design
// ----------------------
export default function BlogPage() {
  const [selectedPostId, setSelectedPostId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const blogService = new BlogService();
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
    const matchesCategory = categoryFilter === "all" || post.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  const handlePostSelect = (postId: string) => {
    setSelectedPostId(postId);
  };

  return (
    <div className="admin-dashboard min-h-screen bg-admin-panel">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-brand/20 rounded-lg">
              <PenTool className="h-6 w-6 text-brand" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-[var(--admin-text-primary)]">Blog</h1>
              <p className="text-[var(--admin-text-primary)]-muted">Discover insights, tutorials, and updates</p>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[var(--admin-text-primary)]-muted" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-[var(--admin-surface)] border border-[var(--admin-border-soft)] rounded-lg text-[var(--admin-text-primary)] placeholder-[var(--admin-text-primary)]-muted focus:ring-2 focus:ring-brand/20 focus:border-brand"
                />
              </div>
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-48 bg-[var(--admin-surface)] border border-[var(--admin-border-soft)] text-[var(--admin-text-primary)]">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent className="bg-[var(--admin-surface)] border border-[var(--admin-border-soft)]">
                <SelectItem value="all" className="text-[var(--admin-text-primary)]">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.name} className="text-[var(--admin-text-primary)]">
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Main Content */}
        <BlogDetailView
          posts={filteredPosts}
          selectedPostId={selectedPostId}
          onPostSelect={handlePostSelect}
          categories={categories}
          stats={stats}
        />
      </div>
    </div>
  );
}
