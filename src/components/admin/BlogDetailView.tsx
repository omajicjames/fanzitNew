"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@src/components/ui/card";
import { BlogPostCard } from "./BlogPostCard";
import { RightCompactDetail } from "./RightCompactDetail";
import { 
  PenTool, Eye, Edit, Trash2, Calendar, User, TrendingUp, BarChart3, 
  CheckCircle, Clock, AlertTriangle, FileText, Heart, MessageCircle, 
  Share2, MoreHorizontal, Star, BookOpen, Target, Zap, Plus, Filter
} from "lucide-react";

// ----------------------
// Blog Detail View Component
// Location: /src/components/admin/BlogDetailView.tsx
// Purpose: Single-card view with filtering and quick stats for blog management
// Note: Similar to verification page design with card on left and stats on right
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

interface BlogDetailViewProps {
  posts: BlogPost[];
  selectedPostId: string;
  onPostSelect: (postId: string) => void;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onMore: () => void;
  onFeature: () => void;
  onPublish: () => void;
  onNewPost: () => void;
  onFilter: () => void;
}

export function BlogDetailView({
  posts,
  selectedPostId,
  onPostSelect,
  onView,
  onEdit,
  onDelete,
  onMore,
  onFeature,
  onPublish,
  onNewPost,
  onFilter
}: BlogDetailViewProps) {

  const selectedPost = posts.find(post => post.id === selectedPostId) || posts[0];

  const getStatusCounts = () => {
    const statusCounts = {
      published: posts.filter(p => p.status === 'published').length,
      draft: posts.filter(p => p.status === 'draft').length,
      scheduled: posts.filter(p => p.status === 'scheduled').length,
      archived: posts.filter(p => p.status === 'archived').length
    };
    return statusCounts;
  };

  const getTotalStats = () => {
    return {
      totalViews: posts.reduce((sum, p) => sum + p.views, 0),
      totalLikes: posts.reduce((sum, p) => sum + p.likes, 0),
      totalComments: posts.reduce((sum, p) => sum + p.comments, 0),
      totalShares: posts.reduce((sum, p) => sum + p.shares, 0),
      averageReadingTime: posts.length > 0 ? posts.reduce((sum, p) => sum + p.readingTime, 0) / posts.length : 0
    };
  };

  const statusCounts = getStatusCounts();
  const totalStats = getTotalStats();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Blog Post Card - Left Column */}
      <div className="lg:col-span-2">
        {selectedPost && (
          <BlogPostCard
            post={selectedPost}
            onView={onView}
            onEdit={onEdit}
            onDelete={onDelete}
            onMore={onMore}
            onFeature={onFeature}
            onPublish={onPublish}
          />
        )}
      </div>

      {/* Quick Stats and Controls - Right Column */}
      <div className="space-y-4">
        {/* Post Selection */}
        <RightCompactDetail
          value={selectedPostId}
          onValueChange={onPostSelect}
          posts={posts}
        />

        {/* Quick Stats */}
        <Card className="bg-admin-panel border border border-[var(--admin-border-soft)] text-[var(--admin-text-primary)]">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold text-[var(--admin-text-primary)]">
              Quick Stats
            </CardTitle>
            <CardDescription className="text-[var(--admin-text-primary)]-muted">
              Blog performance overview
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {/* Total Views */}
            <div className="flex items-center justify-between p-3 bg-[var(--admin-surface)] rounded-lg border border border-[var(--admin-border-soft)] hover:bg-[var(--admin-card-bg)] transition-colors">
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4 text-blue-500 flex-shrink-0" />
                <div>
                  <div className="text-sm font-medium text-[var(--admin-text-primary)]">Total Views</div>
                  <div className="text-xs text-[var(--admin-text-primary)]-muted">All posts</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-[var(--admin-text-primary)]">
                  {totalStats.totalViews.toLocaleString()}
                </div>
                <div className="text-xs text-blue-500 font-medium">+12.5%</div>
              </div>
            </div>

            {/* Total Engagement */}
            <div className="flex items-center justify-between p-3 bg-[var(--admin-surface)] rounded-lg border border border-[var(--admin-border-soft)] hover:bg-[var(--admin-card-bg)] transition-colors">
              <div className="flex items-center gap-2">
                <Heart className="h-4 w-4 text-red-500 flex-shrink-0" />
                <div>
                  <div className="text-sm font-medium text-[var(--admin-text-primary)]">Total Engagement</div>
                  <div className="text-xs text-[var(--admin-text-primary)]-muted">Likes + Comments</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-[var(--admin-text-primary)]">
                  {(totalStats.totalLikes + totalStats.totalComments).toLocaleString()}
                </div>
                <div className="text-xs text-green-500 font-medium">+8.2%</div>
              </div>
            </div>

            {/* Average Reading Time */}
            <div className="flex items-center justify-between p-3 bg-[var(--admin-surface)] rounded-lg border border border-[var(--admin-border-soft)] hover:bg-[var(--admin-card-bg)] transition-colors">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-purple-500 flex-shrink-0" />
                <div>
                  <div className="text-sm font-medium text-[var(--admin-text-primary)]">Avg Reading Time</div>
                  <div className="text-xs text-[var(--admin-text-primary)]-muted">Per post</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-[var(--admin-text-primary)]">
                  {totalStats.averageReadingTime.toFixed(1)}m
                </div>
                <div className="text-xs text-purple-500 font-medium">+5.3%</div>
              </div>
            </div>

            {/* Total Shares */}
            <div className="flex items-center justify-between p-3 bg-[var(--admin-surface)] rounded-lg border border border-[var(--admin-border-soft)] hover:bg-[var(--admin-card-bg)] transition-colors">
              <div className="flex items-center gap-2">
                <Share2 className="h-4 w-4 text-orange-500 flex-shrink-0" />
                <div>
                  <div className="text-sm font-medium text-[var(--admin-text-primary)]">Total Shares</div>
                  <div className="text-xs text-[var(--admin-text-primary)]-muted">Social sharing</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-[var(--admin-text-primary)]">
                  {totalStats.totalShares.toLocaleString()}
                </div>
                <div className="text-xs text-orange-500 font-medium">+15.3%</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Post Status Overview */}
        <Card className="bg-admin-panel border border border-[var(--admin-border-soft)] text-[var(--admin-text-primary)]">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold text-[var(--admin-text-primary)]">
              Post Status
            </CardTitle>
            <CardDescription className="text-[var(--admin-text-primary)]-muted">
              Content status breakdown
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {/* Published Posts */}
            <div className="flex items-center justify-between p-2 bg-[var(--admin-surface)] rounded-lg border border border-[var(--admin-border-soft)] hover:bg-[var(--admin-card-bg)] transition-colors">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                <span className="text-sm font-medium text-[var(--admin-text-primary)]">Published</span>
              </div>
              <div className="text-sm font-bold text-green-500">
                {statusCounts.published}
              </div>
            </div>

            {/* Draft Posts */}
            <div className="flex items-center justify-between p-2 bg-[var(--admin-surface)] rounded-lg border border border-[var(--admin-border-soft)] hover:bg-[var(--admin-card-bg)] transition-colors">
              <div className="flex items-center gap-2">
                <Edit className="h-4 w-4 text-yellow-500 flex-shrink-0" />
                <span className="text-sm font-medium text-[var(--admin-text-primary)]">Drafts</span>
              </div>
              <div className="text-sm font-bold text-yellow-500">
                {statusCounts.draft}
              </div>
            </div>

            {/* Scheduled Posts */}
            <div className="flex items-center justify-between p-2 bg-[var(--admin-surface)] rounded-lg border border border-[var(--admin-border-soft)] hover:bg-[var(--admin-card-bg)] transition-colors">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-blue-500 flex-shrink-0" />
                <span className="text-sm font-medium text-[var(--admin-text-primary)]">Scheduled</span>
              </div>
              <div className="text-sm font-bold text-blue-500">
                {statusCounts.scheduled}
              </div>
            </div>

            {/* Archived Posts */}
            <div className="flex items-center justify-between p-2 bg-[var(--admin-surface)] rounded-lg border border border-[var(--admin-border-soft)] hover:bg-[var(--admin-card-bg)] transition-colors">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-red-500 flex-shrink-0" />
                <span className="text-sm font-medium text-[var(--admin-text-primary)]">Archived</span>
              </div>
              <div className="text-sm font-bold text-red-500">
                {statusCounts.archived}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-admin-panel border border border-[var(--admin-border-soft)] text-[var(--admin-text-primary)]">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold text-[var(--admin-text-primary)]">
              Quick Actions
            </CardTitle>
            <CardDescription className="text-[var(--admin-text-primary)]-muted">
              Common blog tasks
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <button
              onClick={onNewPost}
              className="w-full flex items-center gap-2 p-3 text-sm font-medium text-[var(--admin-text-primary)] hover:bg-[var(--admin-surface)] rounded-lg border border border-[var(--admin-border-soft)] transition-colors"
            >
              <Plus className="h-4 w-4 text-[var(--brand)]" />
              Create New Post
            </button>
            <button
              onClick={onFilter}
              className="w-full flex items-center gap-2 p-3 text-sm font-medium text-[var(--admin-text-primary)] hover:bg-[var(--admin-surface)] rounded-lg border border border-[var(--admin-border-soft)] transition-colors"
            >
              <Filter className="h-4 w-4 text-[var(--brand)]" />
              Filter Posts
            </button>
            <button
              onClick={onView}
              className="w-full flex items-center gap-2 p-3 text-sm font-medium text-[var(--admin-text-primary)] hover:bg-[var(--admin-surface)] rounded-lg border border border-[var(--admin-border-soft)] transition-colors"
            >
              <Eye className="h-4 w-4 text-[var(--brand)]" />
              View Post
            </button>
            <button
              onClick={onEdit}
              className="w-full flex items-center gap-2 p-3 text-sm font-medium text-[var(--admin-text-primary)] hover:bg-[var(--admin-surface)] rounded-lg border border border-[var(--admin-border-soft)] transition-colors"
            >
              <Edit className="h-4 w-4 text-[var(--brand)]" />
              Edit Post
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
