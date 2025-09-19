"use client";

import { AdminPillNavigationComponent } from "@src/components/admin/AdminPillNavigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@src/components/ui/card";
import { Badge } from "@src/components/ui/badge";
import { Button } from "@src/components/ui/button";
import { Input } from "@src/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@src/components/ui/tabs";
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
  VolumeX
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

class ReelCardComponent {
  private reel: Reel;

  constructor(reel: Reel) {
    this.reel = reel;
  }

  private getStatusBadge() {
    const statusConfig = {
      published: { variant: "default" as const, icon: CheckCircle, text: "Published" },
      pending: { variant: "secondary" as const, icon: Clock, text: "Pending" },
      flagged: { variant: "destructive" as const, icon: Flag, text: "Flagged" },
      removed: { variant: "destructive" as const, icon: AlertTriangle, text: "Removed" },
      draft: { variant: "outline" as const, icon: Edit, text: "Draft" }
    };

    const config = statusConfig[this.reel.status];
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {config.text}
      </Badge>
    );
  }

  private formatDuration(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  public render() {
    return (
      <Card className="group hover:shadow-lg transition-all duration-200">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="space-y-1 flex-1">
              <CardTitle className="text-lg line-clamp-2">{this.reel.title}</CardTitle>
              <CardDescription className="line-clamp-2">{this.reel.description}</CardDescription>
            </div>
            <div className="flex flex-col gap-1 ml-2">
              {this.reel.featured && (
                <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                  Featured
                </Badge>
              )}
              {this.reel.trending && (
                <Badge variant="outline" className="text-red-600 border-red-600">
                  Trending
                </Badge>
              )}
              {this.getStatusBadge()}
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Video Thumbnail */}
          <div className="aspect-video bg-muted rounded-lg flex items-center justify-center relative overflow-hidden">
            <div className="text-center">
              <PlaySquare className="h-12 w-12 text-muted-foreground" />
              <p className="text-sm text-muted-foreground mt-2">Video Reel</p>
            </div>
            <div className="absolute top-2 left-2 flex gap-1">
              <Badge variant="secondary" className="text-xs">
                {this.formatDuration(this.reel.duration)}
              </Badge>
              {this.reel.isExplicit && (
                <Badge variant="destructive" className="text-xs">18+</Badge>
              )}
            </div>
            <div className="absolute top-2 right-2 flex gap-1">
              {this.reel.hasAudio ? (
                <Volume2 className="h-4 w-4 text-white" />
              ) : (
                <VolumeX className="h-4 w-4 text-white" />
              )}
            </div>
            <div className="absolute bottom-2 left-2 right-2">
              <div className="flex items-center justify-between text-white text-sm">
                <span className="flex items-center gap-1">
                  <Play className="h-3 w-3" />
                  {this.reel.views.toLocaleString()} views
                </span>
                <span className="flex items-center gap-1">
                  <Heart className="h-3 w-3" />
                  {this.reel.likes}
                </span>
              </div>
            </div>
          </div>

          {/* Author Info */}
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
              <User className="h-4 w-4" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{this.reel.author.name}</p>
              <p className="text-xs text-muted-foreground">{this.reel.author.username}</p>
            </div>
            <div className="text-sm text-muted-foreground">
              {new Date(this.reel.createdAt).toLocaleDateString()}
            </div>
          </div>

          {/* Category and Tags */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Category:</span>
              <Badge variant="outline" className="text-xs">
                {this.reel.category}
              </Badge>
            </div>
            <div className="flex flex-wrap gap-1">
              {this.reel.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  #{tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Audio Info */}
          {this.reel.hasAudio && this.reel.audioTitle && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="flex items-center gap-2 text-blue-800">
                <Volume2 className="h-4 w-4" />
                <span className="text-sm font-medium">Audio Track</span>
              </div>
              <p className="text-sm text-blue-700">{this.reel.audioTitle}</p>
              {this.reel.audioArtist && (
                <p className="text-xs text-blue-600">by {this.reel.audioArtist}</p>
              )}
            </div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-muted-foreground" />
              <span>{this.reel.views.toLocaleString()} views</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="h-4 w-4 text-muted-foreground" />
              <span>{this.reel.likes} likes</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4 text-muted-foreground" />
              <span>{this.reel.comments} comments</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
              <span>${this.reel.earnings.toFixed(2)}</span>
            </div>
          </div>

          {/* Flags and Reports */}
          {this.reel.reportCount > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <div className="flex items-center gap-2 text-red-800 mb-2">
                <Flag className="h-4 w-4" />
                <span className="text-sm font-medium">{this.reel.reportCount} Reports</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {this.reel.flags.map((flag) => (
                  <Badge key={flag} variant="destructive" className="text-xs">
                    {flag.replace('_', ' ')}
                  </Badge>
                ))}
              </div>
              {this.reel.moderationNotes && (
                <p className="text-xs text-red-700 mt-2">{this.reel.moderationNotes}</p>
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

export default function ReelsPage() {
  const reelsService = new ReelsManagementService();
  const reels = reelsService.getReels();
  const stats = reelsService.getReelStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Reels Management</h1>
          <p className="text-muted-foreground">Manage short-form video content and reels</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Reel
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reels</CardTitle>
            <PlaySquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalReels}</div>
            <p className="text-xs text-muted-foreground">
              {stats.publishedReels} published, {stats.pendingReels} pending
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
              Across all reels
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.totalEarnings.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              From premium reels
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Trending</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.trendingReels}</div>
            <p className="text-xs text-muted-foreground">
              {stats.featuredReels} featured
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
                  placeholder="Search reels, authors, or content..."
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

      {/* Reels Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reels.map((reel) => {
          const reelCard = new ReelCardComponent(reel);
          return <div key={reel.id}>{reelCard.render()}</div>;
        })}
      </div>
    </div>
  );
}
