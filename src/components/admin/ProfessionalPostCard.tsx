"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@src/components/ui/card";
import { Badge } from "@src/components/ui/badge";
import { Button } from "@src/components/ui/button";
import { 
  FileText, Eye, Edit, Trash2, Calendar, User, TrendingUp, BarChart3, 
  CheckCircle, Clock, AlertTriangle, Image, Video, Music, Heart, MessageCircle, 
  Share2, MoreHorizontal, Star, BookOpen, Target, Zap, Flag, Shield, ImageIcon
} from "lucide-react";

// ----------------------
// Professional Post Card Component
// Location: /src/components/admin/ProfessionalPostCard.tsx
// Purpose: Unified post card for all post types (image, video, text)
// Note: Single card design with conditional rendering based on post type
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

interface ProfessionalPostCardProps {
  post: Post;
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onMore?: () => void;
  onApprove?: () => void;
  onFlag?: () => void;
  onArchive?: () => void;
}

export function ProfessionalPostCard({ 
  post, 
  onView, 
  onEdit, 
  onDelete, 
  onMore, 
  onApprove, 
  onFlag, 
  onArchive 
}: ProfessionalPostCardProps) {
  
  const getStatusBadge = () => {
    const statusConfig = {
      published: { variant: "default" as const, icon: CheckCircle, text: "Published", color: "text-green-500" },
      pending: { variant: "secondary" as const, icon: Clock, text: "Pending", color: "text-yellow-500" },
      flagged: { variant: "destructive" as const, icon: Flag, text: "Flagged", color: "text-red-500" },
      removed: { variant: "destructive" as const, icon: AlertTriangle, text: "Removed", color: "text-red-500" },
      archived: { variant: "outline" as const, icon: Shield, text: "Archived", color: "text-gray-500" }
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

  const getTypeIcon = () => {
    const icons = {
      text: FileText,
      image: Image,
      video: Video,
      audio: Music,
      gallery: Image
    };
    const Icon = icons[post.type];
    return <Icon className="h-5 w-5 text-[var(--brand)]" />;
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Lifestyle': 'text-blue-500 bg-blue-900/20 border-blue-500/30',
      'Entertainment': 'text-purple-500 bg-purple-900/20 border-purple-500/30',
      'Motivation': 'text-green-500 bg-green-900/20 border-green-500/30',
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

  const renderMediaPreview = () => {
    if (post.media.length > 0) {
      const media = post.media[0];
      return (
        <div className="aspect-video bg-[var(--admin-surface)] rounded-lg flex items-center justify-center border border-[var(--admin-border-soft)] relative overflow-hidden">
          {media.type === 'image' ? (
            // Check if it's a placeholder image or empty string
            media.url.includes('placeholder') || media.url === '' ? (
              <div className="flex flex-col items-center gap-3 text-[var(--admin-text-primary)]-muted">
                <div className="p-4 bg-[var(--admin-card-bg)] rounded-full border border-[var(--admin-border-soft)]">
                  <ImageIcon className="h-8 w-8 text-[var(--brand)]" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-[var(--admin-text-primary)]">Image Content</p>
                  <p className="text-xs text-[var(--admin-text-primary)]-muted">Creative visual post</p>
                </div>
              </div>
            ) : (
              <img 
                src={media.url} 
                alt={post.title}
                className="w-full h-full object-cover rounded-lg"
                onError={(e) => {
                  // If image fails to load, show modern placeholder
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    parent.innerHTML = `
                      <div class="flex flex-col items-center gap-3 text-[var(--admin-text-primary)]-muted">
                        <div class="p-4 bg-[var(--admin-card-bg)] rounded-full border border-[var(--admin-border-soft)]">
                          <svg class="h-8 w-8 text-[var(--brand)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                          </svg>
                        </div>
                        <div class="text-center">
                          <p class="text-sm font-medium text-[var(--admin-text-primary)]">Image Content</p>
                          <p class="text-xs text-[var(--admin-text-primary)]-muted">Creative visual post</p>
                        </div>
                      </div>
                    `;
                  }
                }}
              />
            )
          ) : (
            <div className="flex flex-col items-center gap-3 text-[var(--admin-text-primary)]-muted">
              <div className="p-4 bg-[var(--admin-card-bg)] rounded-full border border-[var(--admin-border-soft)]">
                {getTypeIcon()}
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-[var(--admin-text-primary)]">{post.type.toUpperCase()} Content</p>
                <p className="text-xs text-[var(--admin-text-primary)]-muted">{post.media.length} file(s)</p>
              </div>
            </div>
          )}
          {post.isExplicit && (
            <div className="absolute top-2 right-2">
              <Badge variant="destructive" className="text-xs">18+</Badge>
            </div>
          )}
        </div>
      );
    } else {
      // Text post - no media
      return (
        <div className="aspect-video bg-[var(--admin-surface)] rounded-lg flex items-center justify-center border border-[var(--admin-border-soft)] relative overflow-hidden">
          <div className="flex flex-col items-center gap-3 text-[var(--admin-text-primary)]-muted">
            <div className="p-4 bg-[var(--admin-card-bg)] rounded-full border border-[var(--admin-border-soft)]">
              <FileText className="h-8 w-8 text-[var(--brand)]" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-[var(--admin-text-primary)]">Text Post</p>
              <p className="text-xs text-[var(--admin-text-primary)]-muted">No media attached</p>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <Card className="bg-[var(--admin-card-bg)] border border-[var(--admin-border-soft)] text-[var(--admin-text-primary)] hover:shadow-lg transition-all duration-200">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[var(--brand)]/20 rounded-lg">
              {getTypeIcon()}
            </div>
            <div className="flex-1 min-w-0">
              <CardTitle className="text-lg font-semibold text-[var(--admin-text-primary)] leading-tight line-clamp-2">
                {post.title}
              </CardTitle>
              <CardDescription className="text-[var(--admin-text-primary)]-muted line-clamp-2 mt-1">
                {post.content}
              </CardDescription>
            </div>
          </div>
          <div className="flex flex-col gap-2 ml-3">
            {post.isPremium && (
              <Badge variant="outline" className="text-yellow-500 border-yellow-500/30 bg-yellow-900/20">
                <Star className="h-3 w-3 mr-1" />
                Premium
              </Badge>
            )}
            {getStatusBadge()}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Media Preview */}
        {renderMediaPreview()}

        {/* Author and Date Information */}
        <div className="flex items-center gap-3 p-3 bg-[var(--admin-surface)] rounded-lg border border-[var(--admin-border-soft)]">
          <div className="h-10 w-10 rounded-full bg-[var(--admin-card-bg)] flex items-center justify-center border border-[var(--admin-border-soft)]">
            <User className="h-5 w-5 text-[var(--admin-text-primary)]-muted" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-[var(--admin-text-primary)]">{post.author.name}</p>
            <p className="text-xs text-[var(--admin-text-primary)]-muted">
              {post.author.username} • {post.publishedAt 
                ? `Published ${formatDate(post.publishedAt)}`
                : `Created ${formatDate(post.createdAt)}`
              }
            </p>
          </div>
          <div className="text-sm text-[var(--admin-text-primary)]-muted flex items-center gap-1">
            <BookOpen className="h-4 w-4" />
            {post.type.toUpperCase()}
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
              <span className="text-sm font-medium text-[var(--admin-text-primary)]">Earnings</span>
            </div>
            <div className="text-lg font-bold text-[var(--admin-text-primary)]">${post.earnings.toFixed(2)}</div>
            <div className="text-xs text-[var(--admin-text-primary)]-muted">Revenue</div>
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
            <span className="text-[var(--admin-text-primary)]">{getEngagementRate()}%</span>
          </div>
        </div>

        {/* Flags and Reports */}
        {post.reportCount > 0 && (
          <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-3">
            <div className="flex items-center gap-2 text-red-400 mb-2">
              <Flag className="h-4 w-4" />
              <span className="text-sm font-medium">{post.reportCount} Reports</span>
            </div>
            <div className="flex flex-wrap gap-1 mb-2">
              {post.flags.map((flag) => (
                <Badge key={flag} variant="destructive" className="text-xs">
                  {flag.replace('_', ' ')}
                </Badge>
              ))}
            </div>
            {post.moderationNotes && (
              <p className="text-xs text-red-300">{post.moderationNotes}</p>
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
          {post.status === 'pending' && (
            <Button
              variant="outline"
              size="sm"
              onClick={onApprove}
              className="bg-green-900/20 border-green-500/30 text-green-400 hover:bg-green-900/30"
            >
              <CheckCircle className="h-4 w-4" />
            </Button>
          )}
          {post.status === 'published' && (
            <Button
              variant="outline"
              size="sm"
              onClick={onFlag}
              className="bg-yellow-900/20 border-yellow-500/30 text-yellow-400 hover:bg-yellow-900/30"
            >
              <Flag className="h-4 w-4" />
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
