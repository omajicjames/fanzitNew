"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@src/components/ui/card";
import { ProfessionalPostCard } from "./ProfessionalPostCard";
import { PostSelectionCard } from "./SelectionCard";
import { 
  FileText, Eye, Edit, Trash2, Calendar, User, TrendingUp, BarChart3, 
  CheckCircle, Clock, AlertTriangle, Image, Video, Music, Heart, MessageCircle, 
  Share2, MoreHorizontal, Star, BookOpen, Target, Zap, Plus, Filter, Flag, Shield
} from "lucide-react";

// ----------------------
// Posts Detail View Component
// Location: /src/components/admin/PostsDetailView.tsx
// Purpose: Single-card view with filtering and quick stats for posts management
// Note: Similar to verification page design with card on left and stats on right
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

interface PostsDetailViewProps {
  posts: Post[];
  selectedPostId: string;
  onPostSelect: (postId: string) => void;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onMore: () => void;
  onApprove: () => void;
  onFlag: () => void;
  onArchive: () => void;
  onNewPost: () => void;
  onFilter: () => void;
}

export function PostsDetailView({
  posts,
  selectedPostId,
  onPostSelect,
  onView,
  onEdit,
  onDelete,
  onMore,
  onApprove,
  onFlag,
  onArchive,
  onNewPost,
  onFilter
}: PostsDetailViewProps) {

  const selectedPost = posts.find(post => post.id === selectedPostId) || posts[0];

  const getStatusCounts = () => {
    const statusCounts = {
      published: posts.filter(p => p.status === 'published').length,
      pending: posts.filter(p => p.status === 'pending').length,
      flagged: posts.filter(p => p.status === 'flagged').length,
      removed: posts.filter(p => p.status === 'removed').length,
      archived: posts.filter(p => p.status === 'archived').length
    };
    return statusCounts;
  };

  const getTypeCounts = () => {
    const typeCounts = {
      text: posts.filter(p => p.type === 'text').length,
      image: posts.filter(p => p.type === 'image').length,
      video: posts.filter(p => p.type === 'video').length,
      audio: posts.filter(p => p.type === 'audio').length,
      gallery: posts.filter(p => p.type === 'gallery').length,
    };
    return typeCounts;
  };

  const getTotalStats = () => {
    return {
      totalViews: posts.reduce((sum, p) => sum + p.views, 0),
      totalLikes: posts.reduce((sum, p) => sum + p.likes, 0),
      totalComments: posts.reduce((sum, p) => sum + p.comments, 0),
      totalShares: posts.reduce((sum, p) => sum + p.shares, 0),
      totalEarnings: posts.reduce((sum, p) => sum + p.earnings, 0),
      totalReports: posts.reduce((sum, p) => sum + p.reportCount, 0),
    };
  };

  const statusCounts = getStatusCounts();
  const typeCounts = getTypeCounts();
  const totalStats = getTotalStats();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Post Card - Left Column */}
      <div className="lg:col-span-2">
        {selectedPost && (
          <ProfessionalPostCard
            post={selectedPost}
            onView={onView}
            onEdit={onEdit}
            onDelete={onDelete}
            onMore={onMore}
            onApprove={onApprove}
            onFlag={onFlag}
            onArchive={onArchive}
          />
        )}
      </div>

      {/* Quick Stats and Controls - Right Column */}
      <div className="space-y-4">
        {/* Post Selection */}
        <PostSelectionCard
          value={selectedPostId}
          onValueChange={onPostSelect}
          posts={posts.map(post => ({
            id: post.id,
            title: post.title,
            category: post.category,
            status: post.status
          }))}
        />

        {/* Quick Stats */}
        <Card className="bg-admin-panel border border-[var(--admin-border-soft)] text-[var(--admin-text-primary)]">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold text-[var(--admin-text-primary)]">
              Quick Stats
            </CardTitle>
            <CardDescription className="text-[var(--admin-text-primary)]-muted">
              Post performance overview
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {/* Total Views */}
            <div className="flex items-center justify-between p-3 bg-[var(--admin-surface)] rounded-lg border border-[var(--admin-border-soft)] hover:bg-[var(--admin-card-bg)] transition-colors">
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

            {/* Total Earnings */}
            <div className="flex items-center justify-between p-3 bg-[var(--admin-surface)] rounded-lg border border-[var(--admin-border-soft)] hover:bg-[var(--admin-card-bg)] transition-colors">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-green-500 flex-shrink-0" />
                <div>
                  <div className="text-sm font-medium text-[var(--admin-text-primary)]">Total Earnings</div>
                  <div className="text-xs text-[var(--admin-text-primary)]-muted">From premium content</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-[var(--admin-text-primary)]">
                  ${totalStats.totalEarnings.toFixed(2)}
                </div>
                <div className="text-xs text-green-500 font-medium">+8.2%</div>
              </div>
            </div>

            {/* Total Engagement */}
            <div className="flex items-center justify-between p-3 bg-[var(--admin-surface)] rounded-lg border border-[var(--admin-border-soft)] hover:bg-[var(--admin-card-bg)] transition-colors">
              <div className="flex items-center gap-2">
                <Heart className="h-4 w-4 text-red-500 flex-shrink-0" />
                <div>
                  <div className="text-sm font-medium text-[var(--admin-text-primary)]">Total Engagement</div>
                  <div className="text-xs text-[var(--admin-text-primary)]-muted">Likes + Comments + Shares</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-[var(--admin-text-primary)]">
                  {(totalStats.totalLikes + totalStats.totalComments + totalStats.totalShares).toLocaleString()}
                </div>
                <div className="text-xs text-red-500 font-medium">+15.3%</div>
              </div>
            </div>

            {/* Total Reports */}
            <div className="flex items-center justify-between p-3 bg-[var(--admin-surface)] rounded-lg border border-[var(--admin-border-soft)] hover:bg-[var(--admin-card-bg)] transition-colors">
              <div className="flex items-center gap-2">
                <Flag className="h-4 w-4 text-orange-500 flex-shrink-0" />
                <div>
                  <div className="text-sm font-medium text-[var(--admin-text-primary)]">Total Reports</div>
                  <div className="text-xs text-[var(--admin-text-primary)]-muted">Flagged content</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-[var(--admin-text-primary)]">
                  {totalStats.totalReports.toLocaleString()}
                </div>
                <div className="text-xs text-orange-500 font-medium">-5.2%</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Post Status Overview */}
        <Card className="bg-admin-panel border border-[var(--admin-border-soft)] text-[var(--admin-text-primary)]">
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
            <div className="flex items-center justify-between p-2 bg-[var(--admin-surface)] rounded-lg border border-[var(--admin-border-soft)] hover:bg-[var(--admin-card-bg)] transition-colors">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                <span className="text-sm font-medium text-[var(--admin-text-primary)]">Published</span>
              </div>
              <div className="text-sm font-bold text-green-500">
                {statusCounts.published}
              </div>
            </div>

            {/* Pending Posts */}
            <div className="flex items-center justify-between p-2 bg-[var(--admin-surface)] rounded-lg border border-[var(--admin-border-soft)] hover:bg-[var(--admin-card-bg)] transition-colors">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-yellow-500 flex-shrink-0" />
                <span className="text-sm font-medium text-[var(--admin-text-primary)]">Pending</span>
              </div>
              <div className="text-sm font-bold text-yellow-500">
                {statusCounts.pending}
              </div>
            </div>

            {/* Flagged Posts */}
            <div className="flex items-center justify-between p-2 bg-[var(--admin-surface)] rounded-lg border border-[var(--admin-border-soft)] hover:bg-[var(--admin-card-bg)] transition-colors">
              <div className="flex items-center gap-2">
                <Flag className="h-4 w-4 text-red-500 flex-shrink-0" />
                <span className="text-sm font-medium text-[var(--admin-text-primary)]">Flagged</span>
              </div>
              <div className="text-sm font-bold text-red-500">
                {statusCounts.flagged}
              </div>
            </div>

            {/* Archived Posts */}
            <div className="flex items-center justify-between p-2 bg-[var(--admin-surface)] rounded-lg border border-[var(--admin-border-soft)] hover:bg-[var(--admin-card-bg)] transition-colors">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-gray-500 flex-shrink-0" />
                <span className="text-sm font-medium text-[var(--admin-text-primary)]">Archived</span>
              </div>
              <div className="text-sm font-bold text-gray-500">
                {statusCounts.archived}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Content Type Overview */}
        <Card className="bg-admin-panel border border-[var(--admin-border-soft)] text-[var(--admin-text-primary)]">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold text-[var(--admin-text-primary)]">
              Content Types
            </CardTitle>
            <CardDescription className="text-[var(--admin-text-primary)]-muted">
              Distribution by media type
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {/* Text Posts */}
            <div className="flex items-center justify-between p-2 bg-[var(--admin-surface)] rounded-lg border border-[var(--admin-border-soft)] hover:bg-[var(--admin-card-bg)] transition-colors">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-purple-500 flex-shrink-0" />
                <span className="text-sm font-medium text-[var(--admin-text-primary)]">Text Posts</span>
              </div>
              <div className="text-sm font-bold text-purple-500">
                {typeCounts.text}
              </div>
            </div>

            {/* Image Posts */}
            <div className="flex items-center justify-between p-2 bg-[var(--admin-surface)] rounded-lg border border-[var(--admin-border-soft)] hover:bg-[var(--admin-card-bg)] transition-colors">
              <div className="flex items-center gap-2">
                <Image className="h-4 w-4 text-blue-500 flex-shrink-0" />
                <span className="text-sm font-medium text-[var(--admin-text-primary)]">Image Posts</span>
              </div>
              <div className="text-sm font-bold text-blue-500">
                {typeCounts.image}
              </div>
            </div>

            {/* Video Posts */}
            <div className="flex items-center justify-between p-2 bg-[var(--admin-surface)] rounded-lg border border-[var(--admin-border-soft)] hover:bg-[var(--admin-card-bg)] transition-colors">
              <div className="flex items-center gap-2">
                <Video className="h-4 w-4 text-green-500 flex-shrink-0" />
                <span className="text-sm font-medium text-[var(--admin-text-primary)]">Video Posts</span>
              </div>
              <div className="text-sm font-bold text-green-500">
                {typeCounts.video}
              </div>
            </div>

            {/* Audio Posts */}
            <div className="flex items-center justify-between p-2 bg-[var(--admin-surface)] rounded-lg border border-[var(--admin-border-soft)] hover:bg-[var(--admin-card-bg)] transition-colors">
              <div className="flex items-center gap-2">
                <Music className="h-4 w-4 text-orange-500 flex-shrink-0" />
                <span className="text-sm font-medium text-[var(--admin-text-primary)]">Audio Posts</span>
              </div>
              <div className="text-sm font-bold text-orange-500">
                {typeCounts.audio}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-admin-panel border border-[var(--admin-border-soft)] text-[var(--admin-text-primary)]">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold text-[var(--admin-text-primary)]">
              Quick Actions
            </CardTitle>
            <CardDescription className="text-[var(--admin-text-primary)]-muted">
              Common post tasks
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <button
              onClick={onNewPost}
              className="w-full flex items-center gap-2 p-3 text-sm font-medium text-[var(--admin-text-primary)] hover:bg-[var(--admin-surface)] rounded-lg border border-[var(--admin-border-soft)] transition-colors"
            >
              <Plus className="h-4 w-4 text-[var(--brand)]" />
              Create New Post
            </button>
            <button
              onClick={onFilter}
              className="w-full flex items-center gap-2 p-3 text-sm font-medium text-[var(--admin-text-primary)] hover:bg-[var(--admin-surface)] rounded-lg border border-[var(--admin-border-soft)] transition-colors"
            >
              <Filter className="h-4 w-4 text-[var(--brand)]" />
              Filter Posts
            </button>
            <button
              onClick={onView}
              className="w-full flex items-center gap-2 p-3 text-sm font-medium text-[var(--admin-text-primary)] hover:bg-[var(--admin-surface)] rounded-lg border border-[var(--admin-border-soft)] transition-colors"
            >
              <Eye className="h-4 w-4 text-[var(--brand)]" />
              View Post
            </button>
            <button
              onClick={onEdit}
              className="w-full flex items-center gap-2 p-3 text-sm font-medium text-[var(--admin-text-primary)] hover:bg-[var(--admin-surface)] rounded-lg border border-[var(--admin-border-soft)] transition-colors"
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
