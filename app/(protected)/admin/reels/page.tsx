"use client";

import { useState, useEffect } from "react";
import { AdminPageTemplate, MetricCard } from "@src/components/admin/AdminPageTemplate";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@src/components/ui/card";
import { Badge } from "@src/components/ui/badge";
import { Button } from "@src/components/ui/button";
import { Input } from "@src/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@src/components/ui/select";
import { 
  PlaySquare, 
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
  Video,
  Heart,
  MessageCircle,
  Share2,
  Flag,
  Shield,
  ThumbsUp,
  ThumbsDown,
  Play,
  Pause,
  Volume2,
  VolumeX,
  DollarSign,
  Star,
  Crown,
  FileImage,
  MapPin,
  Activity,
  Zap,
  Target,
  Award,
  Settings,
  Ban,
  Check,
  X,
  RotateCcw,
  BadgeCheck,
  ExternalLink
} from "lucide-react";

// ----------------------
// Reels Management Page
// Location: /app/(protected)/admin/reels/page.tsx
// Purpose: Comprehensive reels management for short-form video content
// Features: Reel moderation, analytics, content management
// Note: Mobile-first design with object-oriented structure
// ----------------------

interface Reel {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  duration: number;
  author: {
    id: string;
    name: string;
    username: string;
    avatar: string;
  };
  status: 'published' | 'pending' | 'flagged' | 'removed' | 'draft';
  category: string;
  tags: string[];
  isExplicit: boolean;
  isPremium: boolean;
  price?: number;
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
  featured: boolean;
  trending: boolean;
  hasAudio: boolean;
  audioTitle?: string;
  audioArtist?: string;
}

interface ReelStats {
  totalReels: number;
  publishedReels: number;
  pendingReels: number;
  flaggedReels: number;
  totalViews: number;
  totalLikes: number;
  totalEarnings: number;
  averageDuration: number;
  trendingReels: number;
  featuredReels: number;
}

class ReelsManagementService {
  private reels: Reel[] = [];

  constructor() {
    this.initializeMockData();
  }

  private initializeMockData() {
    this.reels = [
      {
        id: "1",
        title: "Morning Workout Routine",
        description: "Quick 5-minute morning workout to start your day right",
        videoUrl: "/reels/workout-routine.mp4",
        thumbnailUrl: "/reels/workout-thumb.jpg",
        duration: 300, // 5 minutes
        author: {
          id: "1",
          name: "Sarah Johnson",
          username: "@sarahj",
          avatar: "/placeholder-user.jpg"
        },
        status: "published",
        category: "Fitness",
        tags: ["workout", "morning", "fitness", "routine"],
        isExplicit: false,
        isPremium: false,
        createdAt: "2024-01-25T08:00:00Z",
        publishedAt: "2024-01-25T08:30:00Z",
        updatedAt: "2024-01-25T08:30:00Z",
        views: 15420,
        likes: 892,
        comments: 156,
        shares: 234,
        earnings: 0,
        reportCount: 0,
        flags: [],
        featured: true,
        trending: true,
        hasAudio: true,
        audioTitle: "Upbeat Workout Music",
        audioArtist: "Fitness Beats"
      },
      {
        id: "2",
        title: "Cooking Tips & Tricks",
        description: "Professional cooking techniques you can use at home",
        videoUrl: "/reels/cooking-tips.mp4",
        thumbnailUrl: "/reels/cooking-thumb.jpg",
        duration: 180, // 3 minutes
        author: {
          id: "2",
          name: "Mike Chen",
          username: "@mikechen",
          avatar: "/placeholder-user.jpg"
        },
        status: "published",
        category: "Cooking",
        tags: ["cooking", "tips", "techniques", "food"],
        isExplicit: false,
        isPremium: true,
        price: 4.99,
        createdAt: "2024-01-24T14:20:00Z",
        publishedAt: "2024-01-24T15:00:00Z",
        updatedAt: "2024-01-24T15:00:00Z",
        views: 8930,
        likes: 456,
        comments: 78,
        shares: 123,
        earnings: 89.75,
        reportCount: 0,
        flags: [],
        featured: false,
        trending: false,
        hasAudio: true,
        audioTitle: "Kitchen Sounds",
        audioArtist: "Ambient Audio"
      },
      {
        id: "3",
        title: "Dance Challenge",
        description: "Join the latest dance challenge trend",
        videoUrl: "/reels/dance-challenge.mp4",
        thumbnailUrl: "/reels/dance-thumb.jpg",
        duration: 60, // 1 minute
        author: {
          id: "3",
          name: "Emma Wilson",
          username: "@emmaw",
          avatar: "/placeholder-user.jpg"
        },
        status: "flagged",
        category: "Entertainment",
        tags: ["dance", "challenge", "trending", "fun"],
        isExplicit: false,
        isPremium: false,
        createdAt: "2024-01-26T16:30:00Z",
        publishedAt: "2024-01-26T17:00:00Z",
        updatedAt: "2024-01-26T17:00:00Z",
        views: 2340,
        likes: 123,
        comments: 45,
        shares: 67,
        earnings: 0,
        reportCount: 3,
        flags: ["inappropriate_content", "copyright_concern"],
        moderationNotes: "Content flagged for potential copyright issues with background music",
        featured: false,
        trending: false,
        hasAudio: true,
        audioTitle: "Trending Song",
        audioArtist: "Popular Artist"
      },
      {
        id: "4",
        title: "Art Tutorial",
        description: "Learn to draw realistic portraits",
        videoUrl: "/reels/art-tutorial.mp4",
        thumbnailUrl: "/reels/art-thumb.jpg",
        duration: 420, // 7 minutes
        author: {
          id: "4",
          name: "Alex Rodriguez",
          username: "@alexr",
          avatar: "/placeholder-user.jpg"
        },
        status: "pending",
        category: "Education",
        tags: ["art", "tutorial", "drawing", "portrait"],
        isExplicit: false,
        isPremium: true,
        price: 9.99,
        createdAt: "2024-01-27T10:15:00Z",
        updatedAt: "2024-01-27T10:15:00Z",
        views: 0,
        likes: 0,
        comments: 0,
        shares: 0,
        earnings: 0,
        reportCount: 0,
        flags: [],
        featured: false,
        trending: false,
        hasAudio: false
      }
    ];
  }

  public getReels(): Reel[] {
    return this.reels;
  }

  public getReelStats(): ReelStats {
    const totalReels = this.reels.length;
    const publishedReels = this.reels.filter(r => r.status === 'published').length;
    const pendingReels = this.reels.filter(r => r.status === 'pending').length;
    const flaggedReels = this.reels.filter(r => r.status === 'flagged').length;
    const totalViews = this.reels.reduce((sum, r) => sum + r.views, 0);
    const totalLikes = this.reels.reduce((sum, r) => sum + r.likes, 0);
    const totalEarnings = this.reels.reduce((sum, r) => sum + r.earnings, 0);
    const averageDuration = totalReels > 0 ? this.reels.reduce((sum, r) => sum + r.duration, 0) / totalReels : 0;
    const trendingReels = this.reels.filter(r => r.trending).length;
    const featuredReels = this.reels.filter(r => r.featured).length;

    return {
      totalReels,
      publishedReels,
      pendingReels,
      flaggedReels,
      totalViews,
      totalLikes,
      totalEarnings,
      averageDuration,
      trendingReels,
      featuredReels
    };
  }
}

// ----------------------
// Professional Reel Card Component
// Purpose: Displays reel information in a structured, professional layout
// Note: Similar to verification card with reel-specific data
// ----------------------
function ProfessionalReelCard({
  reel,
  onView,
  onEdit,
  onMore,
  className = ""
}: {
  reel: Reel;
  onView?: () => void;
  onEdit?: () => void;
  onMore?: () => void;
  className?: string;
}) {
  const getStatusBadge = () => {
    const statusConfig = {
      published: { variant: "default" as const, icon: CheckCircle, text: "Published", color: "text-green-600" },
      pending: { variant: "secondary" as const, icon: Clock, text: "Pending", color: "text-yellow-600" },
      flagged: { variant: "destructive" as const, icon: Flag, text: "Flagged", color: "text-red-600" },
      removed: { variant: "destructive" as const, icon: AlertTriangle, text: "Removed", color: "text-red-600" },
      draft: { variant: "outline" as const, icon: Edit, text: "Draft", color: "text-gray-600" }
    };

    const config = statusConfig[reel.status];
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {config.text}
      </Badge>
    );
  };

  const formatDuration = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <Card className={`bg-admin-card border-line-soft hover:shadow-lg transition-all duration-200 ${className}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-surface-elev2 flex items-center justify-center border border-line-soft">
              <PlaySquare className="h-6 w-6 text-text-muted" />
            </div>
            <div>
              <CardTitle className="text-lg text-text flex items-center gap-2">
                {reel.title}
                {reel.featured && (
                  <Crown className="h-4 w-4 text-yellow-600" />
                )}
                {reel.trending && (
                  <TrendingUp className="h-4 w-4 text-red-600" />
                )}
              </CardTitle>
              <CardDescription className="text-text-muted">{reel.description}</CardDescription>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            {getStatusBadge()}
            {reel.isPremium && (
              <Badge variant="outline" className="text-xs text-yellow-600 border-yellow-600">
                Premium
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Video Thumbnail */}
        <div className="aspect-video bg-surface-elev2 rounded-lg flex items-center justify-center relative overflow-hidden border border-line-soft">
          <div className="text-center">
            <PlaySquare className="h-12 w-12 text-text-muted" />
            <p className="text-sm text-text-muted mt-2">Video Reel</p>
          </div>
          <div className="absolute top-2 left-2 flex gap-1">
            <Badge variant="secondary" className="text-xs bg-surface-elev1 text-text">
              {formatDuration(reel.duration)}
            </Badge>
            {reel.isExplicit && (
              <Badge variant="destructive" className="text-xs">18+</Badge>
            )}
          </div>
          <div className="absolute top-2 right-2 flex gap-1">
            {reel.hasAudio ? (
              <Volume2 className="h-4 w-4 text-text" />
            ) : (
              <VolumeX className="h-4 w-4 text-text-muted" />
            )}
          </div>
          <div className="absolute bottom-2 left-2 right-2">
            <div className="flex items-center justify-between text-text text-sm">
              <span className="flex items-center gap-1">
                <Play className="h-3 w-3" />
                {reel.views.toLocaleString()} views
              </span>
              <span className="flex items-center gap-1">
                <Heart className="h-3 w-3" />
                {reel.likes}
              </span>
            </div>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-surface-elev2 rounded-lg p-4 text-center border border-line-soft">
            <div className="flex items-center justify-center gap-1 text-text-muted mb-1">
              <Eye className="h-4 w-4" />
              <span className="text-xs font-medium">Views</span>
            </div>
            <div className="text-lg font-bold text-text">
              {reel.views.toLocaleString()}
            </div>
          </div>
          <div className="bg-surface-elev2 rounded-lg p-4 text-center border border-line-soft">
            <div className="flex items-center justify-center gap-1 text-text-muted mb-1">
              <Heart className="h-4 w-4" />
              <span className="text-xs font-medium">Likes</span>
            </div>
            <div className="text-lg font-bold text-text">
              {reel.likes}
            </div>
          </div>
          <div className="bg-surface-elev2 rounded-lg p-4 text-center border border-line-soft">
            <div className="flex items-center justify-center gap-1 text-text-muted mb-1">
              <DollarSign className="h-4 w-4" />
              <span className="text-xs font-medium">Earnings</span>
            </div>
            <div className="text-lg font-bold text-text">
              ${reel.earnings.toFixed(2)}
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
              <p className="text-sm font-medium text-text">{reel.author.name}</p>
              <p className="text-xs text-text-muted">{reel.author.username}</p>
            </div>
            <div className="text-sm text-text-muted">
              {new Date(reel.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>

        {/* Content Information */}
        <div className="bg-surface-elev2 rounded-lg p-4 border border-line-soft">
          <div className="flex items-center gap-2 mb-3">
            <Video className="h-5 w-5 text-text-muted" />
            <span className="font-medium text-text">Content Information</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-sm text-text-muted">Category:</span>
              <Badge variant="outline" className="ml-2 text-xs">
                {reel.category}
              </Badge>
            </div>
            <div>
              <span className="text-sm text-text-muted">Duration:</span>
              <span className="ml-2 text-sm text-text">{formatDuration(reel.duration)}</span>
            </div>
            <div className="col-span-2">
              <span className="text-sm text-text-muted">Tags:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {reel.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Audio Information */}
        {reel.hasAudio && reel.audioTitle && (
          <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Volume2 className="h-5 w-5 text-blue-400" />
              <span className="font-medium text-blue-300">Audio Track</span>
            </div>
            <p className="text-sm text-blue-200">{reel.audioTitle}</p>
            {reel.audioArtist && (
              <p className="text-xs text-blue-300">by {reel.audioArtist}</p>
            )}
          </div>
        )}

        {/* Engagement Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-surface-elev2 rounded-lg p-4 border border-line-soft">
            <div className="flex items-center gap-2 mb-2">
              <MessageCircle className="h-4 w-4 text-text-muted" />
              <span className="text-sm font-medium text-text">Comments</span>
            </div>
            <div className="text-lg font-bold text-text">{reel.comments}</div>
          </div>
          <div className="bg-surface-elev2 rounded-lg p-4 border border-line-soft">
            <div className="flex items-center gap-2 mb-2">
              <Share2 className="h-4 w-4 text-text-muted" />
              <span className="text-sm font-medium text-text">Shares</span>
            </div>
            <div className="text-lg font-bold text-text">{reel.shares}</div>
          </div>
        </div>

        {/* Flags and Reports */}
        {reel.reportCount > 0 && (
          <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <Flag className="h-5 w-5 text-red-400" />
              <span className="font-medium text-red-300">{reel.reportCount} Reports</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {reel.flags.map((flag) => (
                <Badge key={flag} variant="destructive" className="text-xs">
                  {flag.replace('_', ' ')}
                </Badge>
              ))}
            </div>
            {reel.moderationNotes && (
              <p className="text-sm text-red-200 mt-2">{reel.moderationNotes}</p>
            )}
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
// Reels Detail View Component
// Purpose: Single card view with filtering and quick stats
// Note: Similar to verification page with reel-specific data
// ----------------------
function ReelsDetailView({
  reels,
  selectedReelId,
  onReelSelect,
  onView,
  onEdit,
  onMore,
  className = ""
}: {
  reels: Reel[];
  selectedReelId?: string;
  onReelSelect?: (reelId: string) => void;
  onView?: (reelId: string) => void;
  onEdit?: (reelId: string) => void;
  onMore?: (reelId: string) => void;
  className?: string;
}) {
  const selectedReel = reels.find(r => r.id === selectedReelId) || reels[0];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      published: { variant: "default" as const, color: "text-green-600", bgColor: "bg-green-100" },
      pending: { variant: "secondary" as const, color: "text-yellow-600", bgColor: "bg-yellow-100" },
      flagged: { variant: "destructive" as const, color: "text-red-600", bgColor: "bg-red-100" },
      removed: { variant: "destructive" as const, color: "text-red-600", bgColor: "bg-red-100" },
      draft: { variant: "outline" as const, color: "text-gray-600", bgColor: "bg-gray-100" }
    };
    return statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
  };

  const statusInfo = getStatusBadge(selectedReel?.status || 'pending');

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Filter Section */}
      <div className="bg-surface-elev1 border border-line-soft rounded-lg p-4">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <label className="text-sm font-medium text-text-muted mb-2 block">Select Reel</label>
            <Select value={selectedReelId || reels[0]?.id} onValueChange={onReelSelect}>
              <SelectTrigger className="bg-surface-elev2 border-line-soft text-text">
                <SelectValue placeholder="Choose a reel..." />
              </SelectTrigger>
              <SelectContent className="bg-surface-elev2 border-line-soft">
                {reels.map((reel) => (
                  <SelectItem 
                    key={reel.id} 
                    value={reel.id}
                    className="text-text hover:bg-surface-elev1"
                  >
                    <div className="flex items-center gap-2">
                      <PlaySquare className="h-4 w-4" />
                      <span>{reel.title}</span>
                      <Badge 
                        variant={reel.status === 'published' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {reel.status}
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Reel Card */}
        <div className="lg:col-span-2">
          {selectedReel ? (
            <ProfessionalReelCard
              reel={selectedReel}
              onView={() => onView?.(selectedReel.id)}
              onEdit={() => onEdit?.(selectedReel.id)}
              onMore={() => onMore?.(selectedReel.id)}
            />
          ) : (
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 text-center">
              <PlaySquare className="h-12 w-12 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-400">No reel selected</p>
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
                  {selectedReel?.status || 'N/A'}
                </div>
              </div>

              {/* Category */}
              <div className="flex items-center justify-between p-3 bg-surface-elev2 rounded-lg">
                <div className="flex items-center gap-2">
                  <Video className="h-4 w-4 text-text-muted" />
                  <span className="text-sm font-medium text-text">Category</span>
                </div>
                <Badge variant="outline" className="text-xs">
                  {selectedReel?.category || 'N/A'}
                </Badge>
              </div>

              {/* Duration */}
              <div className="flex items-center justify-between p-3 bg-surface-elev2 rounded-lg">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-text-muted" />
                  <span className="text-sm font-medium text-text">Duration</span>
                </div>
                <span className="text-sm font-semibold text-text">
                  {selectedReel ? `${Math.floor(selectedReel.duration / 60)}:${(selectedReel.duration % 60).toString().padStart(2, '0')}` : 'N/A'}
                </span>
              </div>

              {/* Views */}
              <div className="flex items-center justify-between p-3 bg-surface-elev2 rounded-lg">
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4 text-text-muted" />
                  <span className="text-sm font-medium text-text">Views</span>
                </div>
                <span className="text-sm font-semibold text-text">
                  {selectedReel?.views?.toLocaleString() || 0}
                </span>
              </div>

              {/* Likes */}
              <div className="flex items-center justify-between p-3 bg-surface-elev2 rounded-lg">
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4 text-text-muted" />
                  <span className="text-sm font-medium text-text">Likes</span>
                </div>
                <span className="text-sm font-semibold text-text">
                  {selectedReel?.likes || 0}
                </span>
              </div>

              {/* Earnings */}
              <div className="flex items-center justify-between p-3 bg-surface-elev2 rounded-lg">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-text-muted" />
                  <span className="text-sm font-medium text-text">Earnings</span>
                </div>
                <span className="text-sm font-semibold text-text">
                  ${selectedReel?.earnings?.toFixed(2) || '0.00'}
                </span>
              </div>

              {/* Created Date */}
              <div className="flex items-center justify-between p-3 bg-surface-elev2 rounded-lg">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-text-muted" />
                  <span className="text-sm font-medium text-text">Created</span>
                </div>
                <span className="text-sm text-text-muted">
                  {selectedReel?.createdAt ? new Date(selectedReel.createdAt).toLocaleDateString() : 'N/A'}
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
                onClick={() => onView?.(selectedReel?.id || '')}
              >
                <Eye className="h-4 w-4 mr-2" />
                View Reel
              </Button>
              <Button 
                variant="outline" 
                className="w-full bg-surface-elev2 border-line-soft text-text hover:bg-surface-elev1"
                onClick={() => onEdit?.(selectedReel?.id || '')}
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Reel
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// ----------------------
// Reels Page Client Component
// Purpose: Manages state and interactions for the reels page
// ----------------------
function ReelsPageClient() {
  const [selectedReelId, setSelectedReelId] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const reelsService = new ReelsManagementService();
  const allReels = reelsService.getReels();
  const stats = reelsService.getReelStats();

  // Filter reels based on search and status
  const filteredReels = allReels.filter(reel => {
    const matchesSearch = reel.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reel.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reel.author.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reel.author.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reel.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || reel.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Set default selected reel
  useEffect(() => {
    if (filteredReels.length > 0 && !selectedReelId) {
      setSelectedReelId(filteredReels[0].id);
    }
  }, [filteredReels, selectedReelId]);

  const handleReelSelect = (reelId: string) => {
    setSelectedReelId(reelId);
  };

  const handleView = (reelId: string) => {
    console.log('View reel:', reelId);
  };

  const handleEdit = (reelId: string) => {
    console.log('Edit reel:', reelId);
  };

  const handleMore = (reelId: string) => {
    console.log('More actions for reel:', reelId);
  };

  const handleRefresh = () => {
    console.log('Refresh reels');
  };

  const handleExport = () => {
    console.log('Export reels');
  };

  const statsCards = (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard
        title="Total Reels"
        value={stats.totalReels}
        growth={8}
        icon={PlaySquare}
        format="number"
      />
      <MetricCard
        title="Total Views"
        value={stats.totalViews}
        growth={15}
        icon={Eye}
        format="number"
      />
      <MetricCard
        title="Total Earnings"
        value={stats.totalEarnings}
        growth={12}
        icon={DollarSign}
        format="currency"
      />
      <MetricCard
        title="Trending"
        value={stats.trendingReels}
        growth={5}
        icon={TrendingUp}
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
          <SelectItem value="published" className="text-text hover:bg-surface-elev1">Published</SelectItem>
          <SelectItem value="pending" className="text-text hover:bg-surface-elev1">Pending</SelectItem>
          <SelectItem value="flagged" className="text-text hover:bg-surface-elev1">Flagged</SelectItem>
          <SelectItem value="removed" className="text-text hover:bg-surface-elev1">Removed</SelectItem>
          <SelectItem value="draft" className="text-text hover:bg-surface-elev1">Draft</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );

  return (
    <AdminPageTemplate
      title="Reels Management"
      description="Manage short-form video content and reels"
      icon={<PlaySquare className="h-6 w-6" />}
      searchPlaceholder="Search reels, authors, or content..."
      searchValue={searchTerm}
      onSearchChange={setSearchTerm}
      showSearch={true}
      showFilters={true}
      showRefresh={true}
      showExport={true}
      onRefresh={handleRefresh}
      onExport={handleExport}
      filters={filters}
      stats={statsCards}
    >
      <ReelsDetailView
        reels={filteredReels}
        selectedReelId={selectedReelId}
        onReelSelect={handleReelSelect}
        onView={handleView}
        onEdit={handleEdit}
        onMore={handleMore}
      />
    </AdminPageTemplate>
  );
}

export default function ReelsPage() {
  return <ReelsPageClient />;
}
