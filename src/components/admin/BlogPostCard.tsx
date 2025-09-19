"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@src/components/ui/card";
import { Badge } from "@src/components/ui/badge";
import { Button } from "@src/components/ui/button";
import { 
  PenTool, Eye, Edit, Trash2, Calendar, User, TrendingUp, BarChart3, 
  CheckCircle, Clock, AlertTriangle, FileText, Heart, MessageCircle, 
  Share2, MoreHorizontal, Star, BookOpen, Target, Zap, ImageIcon
} from "lucide-react";

// ----------------------
// Blog Post Card Component
// Location: /src/components/admin/BlogPostCard.tsx
// Purpose: Comprehensive blog post card with all necessary elements
// Note: Single card design with complete blog post information
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

interface BlogPostCardProps {
  post: BlogPost;
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onMore?: () => void;
  onFeature?: () => void;
  onPublish?: () => void;
}

export function BlogPostCard({ 
  post, 
  onView, 
  onEdit, 
  onDelete, 
  onMore, 
  onFeature, 
  onPublish 
}: BlogPostCardProps) {
  
  const getStatusBadge = () => {
    const statusConfig = {
      published: { variant: "default" as const, icon: CheckCircle, text: "Published", color: "text-green-500" },
      draft: { variant: "secondary" as const, icon: Edit, text: "Draft", color: "text-yellow-500" },
      scheduled: { variant: "outline" as const, icon: Clock, text: "Scheduled", color: "text-blue-500" },
      archived: { variant: "destructive" as const, icon: AlertTriangle, text: "Archived", color: "text-red-500" }
    };

    const config = statusConfig[post.status];
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {config.text}
      </Badge>
    );
  };

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
      month: 'short',
      day: 'numeric'
    });
  };

  const getEngagementRate = () => {
    if (post.views === 0) return 0;
    return ((post.likes + post.comments + post.shares) / post.views * 100).toFixed(1);
  };

  return (
    <Card className="bg-[var(--admin-card-bg)] border-[var(--admin-border-soft)] text-[var(--admin-text-primary)] hover:shadow-lg transition-all duration-200">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[var(--brand)]/20 rounded-lg">
              <PenTool className="h-5 w-5 text-[var(--brand)]" />
            </div>
            <div className="flex-1 min-w-0">
              <CardTitle className="text-lg font-semibold text-[var(--admin-text-primary)] leading-tight line-clamp-2">
                {post.title}
              </CardTitle>
              <CardDescription className="text-[var(--admin-text-primary)]-muted line-clamp-2 mt-1">
                {post.excerpt}
              </CardDescription>
            </div>
          </div>
          <div className="flex flex-col gap-2 ml-3">
            {post.featured && (
              <Badge variant="outline" className="text-yellow-500 border-yellow-500/30 bg-yellow-900/20">
                <Star className="h-3 w-3 mr-1" />
                Featured
              </Badge>
            )}
            {getStatusBadge()}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Featured Image */}
        <div className="aspect-video bg-[var(--admin-surface)] rounded-lg flex items-center justify-center border border-[var(--admin-border-soft)] relative overflow-hidden">
          {post.featuredImage ? (
            <img 
              src={post.featuredImage} 
              alt={post.title}
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

        {/* Author and Date Information */}
        <div className="flex items-center gap-3 p-3 bg-[var(--admin-surface)] rounded-lg border border-[var(--admin-border-soft)]">
          <div className="h-10 w-10 rounded-full bg-[var(--admin-card-bg)] flex items-center justify-center border border-[var(--admin-border-soft)]">
            <User className="h-5 w-5 text-[var(--admin-text-primary)]-muted" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-[var(--admin-text-primary)]">{post.author.name}</p>
            <p className="text-xs text-[var(--admin-text-primary)]-muted">
              {post.publishedAt 
                ? `Published ${formatDate(post.publishedAt)}`
                : `Created ${formatDate(post.createdAt)}`
              }
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
                className="text-xs bg-[var(--admin-surface)] border-[var(--admin-border-soft)] text-[var(--admin-text-primary)]-muted"
              >
                #{tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-[var(--admin-surface)] border border-[var(--admin-border-soft)] rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <Eye className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium text-[var(--admin-text-primary)]">Views</span>
            </div>
            <div className="text-lg font-bold text-[var(--admin-text-primary)]">{post.views.toLocaleString()}</div>
            <div className="text-xs text-[var(--admin-text-primary)]-muted">Total views</div>
          </div>

          <div className="bg-[var(--admin-surface)] border border-[var(--admin-border-soft)] rounded-lg p-3">
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
          <div className="flex items-center gap-1 p-2 bg-[var(--admin-surface)] rounded border border-[var(--admin-border-soft)]">
            <Heart className="h-3 w-3 text-red-500" />
            <span className="text-[var(--admin-text-primary)]">{post.likes}</span>
          </div>
          <div className="flex items-center gap-1 p-2 bg-[var(--admin-surface)] rounded border border-[var(--admin-border-soft)]">
            <MessageCircle className="h-3 w-3 text-blue-500" />
            <span className="text-[var(--admin-text-primary)]">{post.comments}</span>
          </div>
          <div className="flex items-center gap-1 p-2 bg-[var(--admin-surface)] rounded border border-[var(--admin-border-soft)]">
            <Share2 className="h-3 w-3 text-purple-500" />
            <span className="text-[var(--admin-text-primary)]">{post.shares}</span>
          </div>
          <div className="flex items-center gap-1 p-2 bg-[var(--admin-surface)] rounded border border-[var(--admin-border-soft)]">
            <Target className="h-3 w-3 text-orange-500" />
            <span className="text-[var(--admin-text-primary)]">{post.readingTime}m</span>
          </div>
        </div>

        {/* SEO Information */}
        {(post.seoTitle || post.seoDescription) && (
          <div className="bg-[var(--admin-surface)] border border-[var(--admin-border-soft)] rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="h-4 w-4 text-yellow-500" />
              <span className="text-sm font-medium text-[var(--admin-text-primary)]">SEO Information</span>
            </div>
            {post.seoTitle && (
              <div className="text-xs text-[var(--admin-text-primary)]-muted mb-1">
                <span className="font-medium">Title:</span> {post.seoTitle}
              </div>
            )}
            {post.seoDescription && (
              <div className="text-xs text-[var(--admin-text-primary)]-muted line-clamp-2">
                <span className="font-medium">Description:</span> {post.seoDescription}
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2 border-t border-[var(--admin-border-soft)]">
          <Button
            variant="outline"
            size="sm"
            onClick={onView}
            className="flex-1 bg-[var(--admin-surface)] border-[var(--admin-border-soft)] text-[var(--admin-text-primary)] hover:bg-[var(--admin-card-bg)]"
          >
            <Eye className="h-4 w-4 mr-2" />
            View
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onEdit}
            className="flex-1 bg-[var(--admin-surface)] border-[var(--admin-border-soft)] text-[var(--admin-text-primary)] hover:bg-[var(--admin-card-bg)]"
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          {post.status === 'draft' && (
            <Button
              variant="outline"
              size="sm"
              onClick={onPublish}
              className="bg-green-900/20 border-green-500/30 text-green-400 hover:bg-green-900/30"
            >
              <CheckCircle className="h-4 w-4" />
            </Button>
          )}
          {!post.featured && (
            <Button
              variant="outline"
              size="sm"
              onClick={onFeature}
              className="bg-yellow-900/20 border-yellow-500/30 text-yellow-400 hover:bg-yellow-900/30"
            >
              <Star className="h-4 w-4" />
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={onMore}
            className="text-[var(--admin-text-primary)]-muted hover:text-[var(--admin-text-primary)]"
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
