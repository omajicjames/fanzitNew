"use client";

import { AdminPillNavigationComponent } from "@src/components/admin/AdminPillNavigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@src/components/ui/card";
import { Badge } from "@src/components/ui/badge";
import { Button } from "@src/components/ui/button";
import { Input } from "@src/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@src/components/ui/tabs";
import { 
  FileText, 
  Image, 
  Video, 
  Music, 
  Search, 
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  AlertTriangle,
  Clock,
  Heart,
  MessageCircle,
  DollarSign,
  Flag,
  Shield
} from "lucide-react";

// ----------------------
// Content Management Page
// Location: /app/(protected)/admin/content/page.tsx
// Purpose: Comprehensive content management for OnlyFans-like platform
// Features: Post moderation, media management, content reports, DMCA handling
// Note: Mobile-first design with object-oriented structure
// ----------------------

interface ContentData {
  id: string;
  type: 'post' | 'image' | 'video' | 'audio';
  title: string;
  creator: string;
  creatorId: string;
  status: 'published' | 'pending' | 'flagged' | 'removed' | 'dmca';
  category: string;
  tags: string[];
  views: number;
  likes: number;
  comments: number;
  earnings: number;
  createdAt: string;
  updatedAt: string;
  thumbnail: string;
  isExplicit: boolean;
  reportCount: number;
  dmcaStatus?: 'none' | 'claimed' | 'disputed' | 'resolved';
}

class ContentManagementService {
  private content: ContentData[] = [
    {
      id: '1',
      type: 'video',
      title: 'Morning Workout Routine',
      creator: 'sarah_fitness',
      creatorId: '1',
      status: 'published',
      category: 'Fitness',
      tags: ['workout', 'fitness', 'morning'],
      views: 15420,
      likes: 2847,
      comments: 156,
      earnings: 1250,
      createdAt: '2025-01-25',
      updatedAt: '2025-01-26',
      thumbnail: '/placeholder.jpg',
      isExplicit: false,
      reportCount: 0
    },
    {
      id: '2',
      type: 'image',
      title: 'Gourmet Pasta Recipe',
      creator: 'chef_marco',
      creatorId: '2',
      status: 'flagged',
      category: 'Cooking',
      tags: ['cooking', 'pasta', 'recipe'],
      views: 8920,
      likes: 1205,
      comments: 89,
      earnings: 0,
      createdAt: '2025-01-20',
      updatedAt: '2025-01-27',
      thumbnail: '/placeholder.jpg',
      isExplicit: false,
      reportCount: 3
    },
    {
      id: '3',
      type: 'post',
      title: 'Exclusive Behind-the-Scenes',
      creator: 'sarah_fitness',
      creatorId: '1',
      status: 'dmca',
      category: 'Lifestyle',
      tags: ['exclusive', 'behind-scenes'],
      views: 0,
      likes: 0,
      comments: 0,
      earnings: 0,
      createdAt: '2025-01-15',
      updatedAt: '2025-01-20',
      thumbnail: '/placeholder.jpg',
      isExplicit: true,
      reportCount: 0,
      dmcaStatus: 'claimed'
    }
  ];

  public getAllContent(): ContentData[] {
    return this.content;
  }

  public getContentByType(type: string): ContentData[] {
    return this.content.filter(item => item.type === type);
  }

  public getContentByStatus(status: string): ContentData[] {
    return this.content.filter(item => item.status === status);
  }

  public getFlaggedContent(): ContentData[] {
    return this.content.filter(item => item.status === 'flagged' || item.reportCount > 0);
  }

  public getDMCAContent(): ContentData[] {
    return this.content.filter(item => item.dmcaStatus && item.dmcaStatus !== 'none');
  }

  public getTopEarningContent(limit: number = 10): ContentData[] {
    return this.content
      .sort((a, b) => b.earnings - a.earnings)
      .slice(0, limit);
  }
}

class ContentCardComponent {
  private content: ContentData;

  constructor(content: ContentData) {
    this.content = content;
  }

  private getStatusBadge() {
    const statusConfig = {
      published: { variant: 'default' as const, icon: CheckCircle, text: 'Published' },
      pending: { variant: 'secondary' as const, icon: Clock, text: 'Pending' },
      flagged: { variant: 'destructive' as const, icon: Flag, text: 'Flagged' },
      removed: { variant: 'destructive' as const, icon: Trash2, text: 'Removed' },
      dmca: { variant: 'destructive' as const, icon: Shield, text: 'DMCA' }
    };

    const config = statusConfig[this.content.status];
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {config.text}
      </Badge>
    );
  }

  private getTypeIcon() {
    const typeIcons = {
      post: FileText,
      image: Image,
      video: Video,
      audio: Music
    };

    const Icon = typeIcons[this.content.type];
    return <Icon className="h-4 w-4" />;
  }

  public render() {
    return (
      <Card className="bg-neutral-800 border-neutral-700 hover:shadow-lg transition-shadow duration-200">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 rounded-lg bg-neutral-700 flex items-center justify-center overflow-hidden">
                <img 
                  src={this.content.thumbnail} 
                  alt={this.content.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <CardTitle className="text-lg truncate flex items-center gap-2 text-white">
                  {this.getTypeIcon()}
                  {this.content.title}
                </CardTitle>
                <CardDescription className="text-neutral-400">by {this.content.creator}</CardDescription>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="text-xs bg-neutral-700 border-neutral-600 text-neutral-300">
                    {this.content.category}
                  </Badge>
                  {this.content.isExplicit && (
                    <Badge variant="destructive" className="text-xs">
                      Explicit
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              {this.getStatusBadge()}
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Engagement Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-neutral-700/50 rounded-lg">
              <div className="flex items-center justify-center gap-1 text-blue-500">
                <Eye className="h-4 w-4" />
                <span className="font-semibold">{this.content.views.toLocaleString()}</span>
              </div>
              <p className="text-xs text-neutral-400">Views</p>
            </div>
            <div className="text-center p-3 bg-neutral-700/50 rounded-lg">
              <div className="flex items-center justify-center gap-1 text-green-500">
                <DollarSign className="h-4 w-4" />
                <span className="font-semibold">${this.content.earnings.toLocaleString()}</span>
              </div>
              <p className="text-xs text-neutral-400">Earnings</p>
            </div>
          </div>

          {/* Additional Stats */}
          <div className="flex items-center justify-between text-sm text-neutral-400">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Heart className="h-3 w-3" />
                {this.content.likes}
              </div>
              <div className="flex items-center gap-1">
                <MessageCircle className="h-3 w-3" />
                {this.content.comments}
              </div>
            </div>
            <span>{new Date(this.content.createdAt).toLocaleDateString()}</span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1">
            {this.content.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs bg-neutral-700 text-neutral-300">
                #{tag}
              </Badge>
            ))}
            {this.content.tags.length > 3 && (
              <Badge variant="secondary" className="text-xs bg-neutral-700 text-neutral-300">
                +{this.content.tags.length - 3} more
              </Badge>
            )}
          </div>

          {/* Report Count */}
          {this.content.reportCount > 0 && (
            <div className="flex items-center gap-1 text-red-500 text-sm">
              <AlertTriangle className="h-4 w-4" />
              {this.content.reportCount} reports
            </div>
          )}

          {/* DMCA Status */}
          {this.content.dmcaStatus && this.content.dmcaStatus !== 'none' && (
            <div className="flex items-center gap-1 text-orange-500 text-sm">
              <Shield className="h-4 w-4" />
              DMCA: {this.content.dmcaStatus}
            </div>
          )}
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1 bg-neutral-700 border-neutral-600 text-white hover:bg-neutral-600">
              <Eye className="h-4 w-4 mr-1" />
              View
            </Button>
            <Button variant="outline" size="sm" className="flex-1 bg-neutral-700 border-neutral-600 text-white hover:bg-neutral-600">
              <Edit className="h-4 w-4 mr-1" />
              Edit
            </Button>
            <Button variant="outline" size="sm" className="bg-neutral-700 border-neutral-600 text-white hover:bg-neutral-600">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }
}

export default function ContentManagementPage() {
  const contentService = new ContentManagementService();
  const allContent = contentService.getAllContent();
  const posts = contentService.getContentByType('post');
  const images = contentService.getContentByType('image');
  const videos = contentService.getContentByType('video');
  const flaggedContent = contentService.getFlaggedContent();
  const dmcaContent = contentService.getDMCAContent();

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Content Management</h1>
            <p className="text-neutral-400">Manage posts, media, and content moderation</p>
          </div>
          <Badge className="bg-orange-500 text-white">Super Admin</Badge>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-2">Key Performance Indicators</h2>
        <p className="text-neutral-400 mb-6">Content metrics and statistics</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-neutral-800 border border-neutral-700 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-400 uppercase tracking-wide">Total Content</p>
                <p className="text-2xl font-bold text-white">45,678</p>
                <div className="flex items-center gap-1 text-sm text-green-500">
                  <FileText className="h-4 w-4" />
                  +15.3% from last month
                </div>
              </div>
              <FileText className="h-8 w-8 text-neutral-400" />
            </div>
          </div>

          <div className="bg-neutral-800 border border-neutral-700 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-400 uppercase tracking-wide">Flagged Content</p>
                <p className="text-2xl font-bold text-white">89</p>
                <div className="flex items-center gap-1 text-sm text-red-500">
                  <Flag className="h-4 w-4" />
                  -5.2% from last month
                </div>
              </div>
              <Flag className="h-8 w-8 text-neutral-400" />
            </div>
          </div>

          <div className="bg-neutral-800 border border-neutral-700 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-400 uppercase tracking-wide">DMCA Claims</p>
                <p className="text-2xl font-bold text-white">12</p>
                <div className="flex items-center gap-1 text-sm text-orange-500">
                  <Shield className="h-4 w-4" />
                  +2.1% from last month
                </div>
              </div>
              <Shield className="h-8 w-8 text-neutral-400" />
            </div>
          </div>

          <div className="bg-neutral-800 border border-neutral-700 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-400 uppercase tracking-wide">Content Revenue</p>
                <p className="text-2xl font-bold text-white">$89,432</p>
                <div className="flex items-center gap-1 text-sm text-green-500">
                  <DollarSign className="h-4 w-4" />
                  +23.1% from last month
                </div>
              </div>
              <DollarSign className="h-8 w-8 text-neutral-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
          <Input 
            placeholder="Search content by title or creator..."
            className="pl-10 bg-neutral-800 border-neutral-700 text-white"
          />
        </div>
        <Button variant="outline" className="flex items-center gap-2 bg-neutral-800 border-neutral-700 text-white hover:bg-neutral-700">
          <Filter className="h-4 w-4" />
          Filters
        </Button>
      </div>

      {/* Content Tabs */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className="grid w-full grid-cols-6 bg-neutral-800 border-neutral-700">
          <TabsTrigger value="all" className="data-[state=active]:bg-neutral-700 data-[state=active]:text-white text-neutral-400">All Content</TabsTrigger>
          <TabsTrigger value="posts" className="data-[state=active]:bg-neutral-700 data-[state=active]:text-white text-neutral-400">Posts</TabsTrigger>
          <TabsTrigger value="images" className="data-[state=active]:bg-neutral-700 data-[state=active]:text-white text-neutral-400">Images</TabsTrigger>
          <TabsTrigger value="videos" className="data-[state=active]:bg-neutral-700 data-[state=active]:text-white text-neutral-400">Videos</TabsTrigger>
          <TabsTrigger value="flagged" className="data-[state=active]:bg-neutral-700 data-[state=active]:text-white text-neutral-400">Flagged</TabsTrigger>
          <TabsTrigger value="dmca" className="data-[state=active]:bg-neutral-700 data-[state=active]:text-white text-neutral-400">DMCA</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {allContent.map((content) => {
              const contentCard = new ContentCardComponent(content);
              return <div key={content.id}>{contentCard.render()}</div>;
            })}
          </div>
        </TabsContent>

        <TabsContent value="posts" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {posts.map((content) => {
              const contentCard = new ContentCardComponent(content);
              return <div key={content.id}>{contentCard.render()}</div>;
            })}
          </div>
        </TabsContent>

        <TabsContent value="images" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {images.map((content) => {
              const contentCard = new ContentCardComponent(content);
              return <div key={content.id}>{contentCard.render()}</div>;
            })}
          </div>
        </TabsContent>

        <TabsContent value="videos" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {videos.map((content) => {
              const contentCard = new ContentCardComponent(content);
              return <div key={content.id}>{contentCard.render()}</div>;
            })}
          </div>
        </TabsContent>

        <TabsContent value="flagged" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {flaggedContent.map((content) => {
              const contentCard = new ContentCardComponent(content);
              return <div key={content.id}>{contentCard.render()}</div>;
            })}
          </div>
        </TabsContent>

        <TabsContent value="dmca" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {dmcaContent.map((content) => {
              const contentCard = new ContentCardComponent(content);
              return <div key={content.id}>{contentCard.render()}</div>;
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
