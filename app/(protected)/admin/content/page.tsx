"use client";

import { useState, useEffect } from "react";
import { AdminPageTemplate, MetricCard } from "@src/components/admin/AdminPageTemplate";
import { ContentSelectionCard } from "@src/components/admin/ContentSelectionCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@src/components/ui/card";
import { Badge } from "@src/components/ui/badge";
import { Button } from "@src/components/ui/button";
import { Input } from "@src/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@src/components/ui/select";
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
  Shield,
  Star,
  Crown,
  FileImage,
  MapPin,
  Activity,
  Zap,
  Target,
  Award,
  Calendar,
  Phone,
  Globe,
  Mail,
  Share2,
  ThumbsUp,
  ThumbsDown,
  Play,
  Pause,
  Volume2,
  VolumeX,
  ExternalLink,
  BadgeCheck,
  UserCheck,
  UserX,
  Building,
  CreditCard,
  RotateCcw,
  TrendingUp,
  BarChart3,
  Settings,
  Ban,
  CheckSquare,
  XSquare,
  Reply,
  User
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

// ----------------------
// Professional Content Card Component
// Purpose: Displays content information in a structured, professional layout
// Note: Similar to verification card with content-specific data
// ----------------------
function ProfessionalContentCard({
  content,
  onView,
  onEdit,
  onMore,
  className = ""
}: {
  content: ContentData;
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
      removed: { variant: "destructive" as const, icon: Trash2, text: "Removed", color: "text-red-600" },
      dmca: { variant: "destructive" as const, icon: Shield, text: "DMCA", color: "text-orange-600" }
    };

    const config = statusConfig[content.status];
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {config.text}
      </Badge>
    );
  };

  const getTypeIcon = () => {
    const typeIcons = {
      post: FileText,
      image: Image,
      video: Video,
      audio: Music
    };

    const Icon = typeIcons[content.type];
    return <Icon className="h-4 w-4" />;
  };

  const getDMCAStatusBadge = () => {
    if (!content.dmcaStatus || content.dmcaStatus === 'none') return null;
    
    const dmcaConfig = {
      claimed: { variant: "destructive" as const, text: "Claimed", color: "text-red-600" },
      disputed: { variant: "secondary" as const, text: "Disputed", color: "text-yellow-600" },
      resolved: { variant: "default" as const, text: "Resolved", color: "text-green-600" }
    };

    const config = dmcaConfig[content.dmcaStatus];
    return (
      <Badge variant={config.variant} className="text-xs">
        {config.text}
      </Badge>
    );
  };

  return (
    <Card className={`bg-admin-card border-line-soft hover:shadow-lg transition-all duration-200 ${className}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-lg bg-surface-elev2 flex items-center justify-center border border-line-soft overflow-hidden">
              {content.thumbnail ? (
                <img 
                  src={content.thumbnail} 
                  alt={content.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                getTypeIcon()
              )}
            </div>
            <div>
              <CardTitle className="text-lg text-text flex items-center gap-2">
                {content.title}
                {content.isExplicit && (
                  <Badge variant="destructive" className="text-xs">
                    18+
                  </Badge>
                )}
              </CardTitle>
              <CardDescription className="text-text-muted">by {content.creator}</CardDescription>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            {getStatusBadge()}
            {getDMCAStatusBadge()}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Content Preview */}
        <div className="bg-surface-elev2 rounded-lg p-4 border border-line-soft">
          <div className="flex items-center gap-2 mb-3">
            {getTypeIcon()}
            <span className="font-medium text-text">Content Preview</span>
          </div>
          <div className="aspect-video bg-surface-elev1 rounded-lg flex items-center justify-center border border-line-soft">
            <div className="text-center">
              {getTypeIcon()}
              <p className="text-sm text-text-muted mt-2">
                {content.type.toUpperCase()}
              </p>
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
              {content.views.toLocaleString()}
            </div>
          </div>
          <div className="bg-surface-elev2 rounded-lg p-4 text-center border border-line-soft">
            <div className="flex items-center justify-center gap-1 text-text-muted mb-1">
              <DollarSign className="h-4 w-4" />
              <span className="text-xs font-medium">Earnings</span>
            </div>
            <div className="text-lg font-bold text-text">
              ${content.earnings.toLocaleString()}
            </div>
          </div>
          <div className="bg-surface-elev2 rounded-lg p-4 text-center border border-line-soft">
            <div className="flex items-center justify-center gap-1 text-text-muted mb-1">
              <Heart className="h-4 w-4" />
              <span className="text-xs font-medium">Likes</span>
            </div>
            <div className="text-lg font-bold text-text">
              {content.likes}
            </div>
          </div>
        </div>

        {/* Creator Information */}
        <div className="bg-surface-elev2 rounded-lg p-4 border border-line-soft">
          <div className="flex items-center gap-2 mb-3">
            <User className="h-5 w-5 text-text-muted" />
            <span className="font-medium text-text">Creator Information</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-surface-elev1 flex items-center justify-center border border-line-soft">
              <User className="h-5 w-5 text-text-muted" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-text">{content.creator}</p>
              <p className="text-xs text-text-muted">ID: {content.creatorId}</p>
            </div>
            <div className="text-sm text-text-muted">
              {new Date(content.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>

        {/* Content Details */}
        <div className="bg-surface-elev2 rounded-lg p-4 border border-line-soft">
          <div className="flex items-center gap-2 mb-3">
            <FileText className="h-5 w-5 text-text-muted" />
            <span className="font-medium text-text">Content Details</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-sm text-text-muted">Type:</span>
              <div className="mt-1 flex items-center gap-2">
                {getTypeIcon()}
                <span className="text-sm text-text">{content.type.toUpperCase()}</span>
              </div>
            </div>
            <div>
              <span className="text-sm text-text-muted">Category:</span>
              <div className="mt-1">
                <Badge variant="outline" className="text-xs">
                  {content.category}
                </Badge>
              </div>
            </div>
            <div className="col-span-2">
              <span className="text-sm text-text-muted">Tags:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {content.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Engagement Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-surface-elev2 rounded-lg p-4 border border-line-soft">
            <div className="flex items-center gap-2 mb-2">
              <MessageCircle className="h-4 w-4 text-text-muted" />
              <span className="text-sm font-medium text-text">Comments</span>
            </div>
            <div className="text-lg font-bold text-text">{content.comments}</div>
          </div>
          <div className="bg-surface-elev2 rounded-lg p-4 border border-line-soft">
            <div className="flex items-center gap-2 mb-2">
              <Share2 className="h-4 w-4 text-text-muted" />
              <span className="text-sm font-medium text-text">Shares</span>
            </div>
            <div className="text-lg font-bold text-text">{Math.floor(content.views * 0.1)}</div>
          </div>
        </div>

        {/* Reports and Flags */}
        {content.reportCount > 0 && (
          <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <Flag className="h-5 w-5 text-red-400" />
              <span className="font-medium text-red-300">{content.reportCount} Reports</span>
            </div>
            <p className="text-sm text-red-200">Content has been flagged by users</p>
          </div>
        )}

        {/* DMCA Information */}
        {content.dmcaStatus && content.dmcaStatus !== 'none' && (
          <div className="bg-orange-900/20 border border-orange-500/30 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <Shield className="h-5 w-5 text-orange-400" />
              <span className="font-medium text-orange-300">DMCA Status</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-orange-200">Status:</span>
              {getDMCAStatusBadge()}
            </div>
          </div>
        )}

        {/* Content Metadata */}
        <div className="bg-surface-elev2 rounded-lg p-4 border border-line-soft">
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="h-5 w-5 text-text-muted" />
            <span className="font-medium text-text">Content Metadata</span>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-text-muted">Created:</span>
              <span className="ml-2 text-text">{new Date(content.createdAt).toLocaleDateString()}</span>
            </div>
            <div>
              <span className="text-text-muted">Updated:</span>
              <span className="ml-2 text-text">{new Date(content.updatedAt).toLocaleDateString()}</span>
            </div>
            <div>
              <span className="text-text-muted">Explicit:</span>
              <span className="ml-2 text-text">{content.isExplicit ? 'Yes' : 'No'}</span>
            </div>
            <div>
              <span className="text-text-muted">Status:</span>
              <span className="ml-2 text-text">{content.status}</span>
            </div>
          </div>
        </div>

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
// Content Detail View Component
// Purpose: Single card view with filtering and quick stats
// Note: Similar to verification page with content-specific data
// ----------------------
function ContentDetailView({
  content,
  selectedContentId,
  onContentSelect,
  onView,
  onEdit,
  onMore,
  className = ""
}: {
  content: ContentData[];
  selectedContentId?: string;
  onContentSelect?: (contentId: string) => void;
  onView?: (contentId: string) => void;
  onEdit?: (contentId: string) => void;
  onMore?: (contentId: string) => void;
  className?: string;
}) {
  const selectedContent = content.find(c => c.id === selectedContentId) || content[0];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      published: { variant: "default" as const, color: "text-green-600", bgColor: "bg-green-100" },
      pending: { variant: "secondary" as const, color: "text-yellow-600", bgColor: "bg-yellow-100" },
      flagged: { variant: "destructive" as const, color: "text-red-600", bgColor: "bg-red-100" },
      removed: { variant: "destructive" as const, color: "text-red-600", bgColor: "bg-red-100" },
      dmca: { variant: "destructive" as const, color: "text-orange-600", bgColor: "bg-orange-100" }
    };
    return statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
  };

  const getTypeIcon = (type: string) => {
    const typeIcons = {
      post: FileText,
      image: Image,
      video: Video,
      audio: Music
    };
    const Icon = typeIcons[type as keyof typeof typeIcons];
    return Icon;
  };

  const statusInfo = getStatusBadge(selectedContent?.status || 'pending');

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Content Selection */}
      <ContentSelectionCard
        title="Select Content"
        description="Choose content to review and manage"
        value={selectedContentId || content[0]?.id || ''}
        onValueChange={onContentSelect || (() => {})}
        content={content.map(item => ({
          id: item.id,
          title: item.title,
          type: item.type,
          status: item.status,
          creator: item.creator,
          thumbnail: item.thumbnail
        }))}
        placeholder="Choose content..."
      />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Content Card */}
        <div className="lg:col-span-2">
          {selectedContent ? (
            <ProfessionalContentCard
              content={selectedContent}
              onView={() => onView?.(selectedContent.id)}
              onEdit={() => onEdit?.(selectedContent.id)}
              onMore={() => onMore?.(selectedContent.id)}
            />
          ) : (
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 text-center">
              <FileText className="h-12 w-12 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-400">No content selected</p>
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
                  {selectedContent?.status || 'N/A'}
                </div>
              </div>

              {/* Type */}
              <div className="flex items-center justify-between p-3 bg-surface-elev2 rounded-lg">
                <div className="flex items-center gap-2">
                  {selectedContent && (() => {
                    const Icon = getTypeIcon(selectedContent.type);
                    return <Icon className="h-4 w-4 text-text-muted" />;
                  })()}
                  <span className="text-sm font-medium text-text">Type</span>
                </div>
                <span className="text-sm font-semibold text-text">
                  {selectedContent?.type?.toUpperCase() || 'N/A'}
                </span>
              </div>

              {/* Views */}
              <div className="flex items-center justify-between p-3 bg-surface-elev2 rounded-lg">
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4 text-text-muted" />
                  <span className="text-sm font-medium text-text">Views</span>
                </div>
                <span className="text-sm font-semibold text-text">
                  {selectedContent?.views?.toLocaleString() || 0}
                </span>
              </div>

              {/* Earnings */}
              <div className="flex items-center justify-between p-3 bg-surface-elev2 rounded-lg">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-text-muted" />
                  <span className="text-sm font-medium text-text">Earnings</span>
                </div>
                <span className="text-sm font-semibold text-text">
                  ${selectedContent?.earnings?.toLocaleString() || '0'}
                </span>
              </div>

              {/* Likes */}
              <div className="flex items-center justify-between p-3 bg-surface-elev2 rounded-lg">
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4 text-text-muted" />
                  <span className="text-sm font-medium text-text">Likes</span>
                </div>
                <span className="text-sm font-semibold text-text">
                  {selectedContent?.likes || 0}
                </span>
              </div>

              {/* Comments */}
              <div className="flex items-center justify-between p-3 bg-surface-elev2 rounded-lg">
                <div className="flex items-center gap-2">
                  <MessageCircle className="h-4 w-4 text-text-muted" />
                  <span className="text-sm font-medium text-text">Comments</span>
                </div>
                <span className="text-sm font-semibold text-text">
                  {selectedContent?.comments || 0}
                </span>
              </div>

              {/* Created Date */}
              <div className="flex items-center justify-between p-3 bg-surface-elev2 rounded-lg">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-text-muted" />
                  <span className="text-sm font-medium text-text">Created</span>
                </div>
                <span className="text-sm text-text-muted">
                  {selectedContent?.createdAt ? new Date(selectedContent.createdAt).toLocaleDateString() : 'N/A'}
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
                onClick={() => onView?.(selectedContent?.id || '')}
              >
                <Eye className="h-4 w-4 mr-2" />
                View Content
              </Button>
              <Button 
                variant="outline" 
                className="w-full bg-surface-elev2 border-line-soft text-text hover:bg-surface-elev1"
                onClick={() => onEdit?.(selectedContent?.id || '')}
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Content
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// ----------------------
// Content Page Client Component
// Purpose: Manages state and interactions for the content page
// ----------------------
function ContentPageClient() {
  const [selectedContentId, setSelectedContentId] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const contentService = new ContentManagementService();
  const allContent = contentService.getAllContent();

  // Filter content based on search, status, and type
  const filteredContent = allContent.filter(content => {
    const matchesSearch = content.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         content.creator.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         content.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         content.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || content.status === statusFilter;
    const matchesType = typeFilter === 'all' || content.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  // Set default selected content
  useEffect(() => {
    if (filteredContent.length > 0 && !selectedContentId) {
      setSelectedContentId(filteredContent[0].id);
    }
  }, [filteredContent, selectedContentId]);

  const handleContentSelect = (contentId: string) => {
    setSelectedContentId(contentId);
  };

  const handleView = (contentId: string) => {
    console.log('View content:', contentId);
  };

  const handleEdit = (contentId: string) => {
    console.log('Edit content:', contentId);
  };

  const handleMore = (contentId: string) => {
    console.log('More actions for content:', contentId);
  };

  const handleRefresh = () => {
    console.log('Refresh content');
  };

  const handleExport = () => {
    console.log('Export content');
  };

  const statsCards = (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard
        title="Total Content"
        value={allContent.length}
        growth={15.3}
        icon={FileText}
        format="number"
      />
      <MetricCard
        title="Flagged Content"
        value={contentService.getFlaggedContent().length}
        growth={-5.2}
        icon={Flag}
        format="number"
      />
      <MetricCard
        title="DMCA Claims"
        value={contentService.getDMCAContent().length}
        growth={2.1}
        icon={Shield}
        format="number"
      />
      <MetricCard
        title="Content Revenue"
        value={allContent.reduce((sum, c) => sum + c.earnings, 0)}
        growth={23.1}
        icon={DollarSign}
        format="currency"
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
          <SelectItem value="dmca" className="text-text hover:bg-surface-elev1">DMCA</SelectItem>
        </SelectContent>
      </Select>
      <Select value={typeFilter} onValueChange={setTypeFilter}>
        <SelectTrigger className="w-40 bg-surface-elev2 border-line-soft text-text">
          <SelectValue placeholder="Type" />
        </SelectTrigger>
        <SelectContent className="bg-surface-elev2 border-line-soft">
          <SelectItem value="all" className="text-text hover:bg-surface-elev1">All Types</SelectItem>
          <SelectItem value="post" className="text-text hover:bg-surface-elev1">Posts</SelectItem>
          <SelectItem value="image" className="text-text hover:bg-surface-elev1">Images</SelectItem>
          <SelectItem value="video" className="text-text hover:bg-surface-elev1">Videos</SelectItem>
          <SelectItem value="audio" className="text-text hover:bg-surface-elev1">Audio</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );

  return (
    <AdminPageTemplate
      title="Content Management"
      description="Manage posts, media, and content moderation"
      icon={<FileText className="h-6 w-6" />}
      searchPlaceholder="Search content by title, creator, or tags..."
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
      <ContentDetailView
        content={filteredContent}
        selectedContentId={selectedContentId}
        onContentSelect={handleContentSelect}
        onView={handleView}
        onEdit={handleEdit}
        onMore={handleMore}
      />
    </AdminPageTemplate>
  );
}

export default function ContentManagementPage() {
  return <ContentPageClient />;
}
