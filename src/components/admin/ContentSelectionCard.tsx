"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@src/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@src/components/ui/select";
import { Badge } from "@src/components/ui/badge";
import { 
  FileText, Image, Video, Music, User, CheckCircle, Clock, Flag, 
  Trash2, Shield, AlertTriangle, LucideIcon
} from "lucide-react";

// ----------------------
// Content Selection Card Component
// Location: /src/components/admin/ContentSelectionCard.tsx
// Purpose: Reusable selection dropdown for content management
// Note: Similar to PostSelectionCard but optimized for content data
// ----------------------

interface ContentItem {
  id: string;
  title: string;
  type: 'post' | 'image' | 'video' | 'audio';
  status: 'published' | 'pending' | 'flagged' | 'removed' | 'dmca';
  creator?: string;
  creatorId?: string;
  thumbnail?: string;
}

interface ContentSelectionCardProps {
  title?: string;
  description?: string;
  value: string;
  onValueChange: (value: string) => void;
  content: ContentItem[];
  placeholder?: string;
  className?: string;
}

export function ContentSelectionCard({
  title = "Select Content",
  description,
  value,
  onValueChange,
  content,
  placeholder = "Choose content...",
  className = ""
}: ContentSelectionCardProps) {
  
  const getStatusBadge = (status: string) => {
    const statusConfig = {
      published: { variant: "default" as const, icon: CheckCircle, text: "Published", color: "text-green-600" },
      pending: { variant: "secondary" as const, icon: Clock, text: "Pending", color: "text-yellow-600" },
      flagged: { variant: "destructive" as const, icon: Flag, text: "Flagged", color: "text-red-600" },
      removed: { variant: "destructive" as const, icon: Trash2, text: "Removed", color: "text-red-600" },
      dmca: { variant: "destructive" as const, icon: Shield, text: "DMCA", color: "text-orange-600" }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    const Icon = config.icon;
    
    return (
      <Badge variant={config.variant} className="text-xs">
        <Icon className="h-3 w-3 mr-1" />
        {config.text}
      </Badge>
    );
  };

  const getTypeIcon = (type: string): LucideIcon => {
    const typeIcons = {
      post: FileText,
      image: Image,
      video: Video,
      audio: Music
    };
    return typeIcons[type as keyof typeof typeIcons] || FileText;
  };

  const selectedContent = content.find(item => item.id === value);

  return (
    <Card className={`bg-[var(--admin-card-bg)] border border-[var(--admin-border-soft)] shadow-sm hover:shadow-md transition-all duration-200 ${className}`}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg text-[var(--admin-text-primary)] flex items-center gap-2">
          <FileText className="h-5 w-5 text-[var(--brand)]" />
          {title}
        </CardTitle>
        {description && (
          <CardDescription className="text-[var(--admin-text-primary)]-muted text-sm">
            {description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <Select value={value} onValueChange={onValueChange}>
          <SelectTrigger className="bg-[var(--admin-surface)] border border-[var(--admin-border-soft)] text-[var(--admin-text-primary)] hover:bg-[var(--admin-card-bg)] focus:ring-2 focus:ring-[var(--brand)]/20 focus:border-[var(--brand)]/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
            <div className="flex items-center gap-3 flex-1">
              {selectedContent ? (
                <>
                  {selectedContent.thumbnail ? (
                    <img 
                      src={selectedContent.thumbnail} 
                      alt={selectedContent.title}
                      className="h-8 w-8 rounded-lg object-cover border border-[var(--admin-border-soft)]"
                    />
                  ) : (
                    <div className="h-8 w-8 rounded-lg bg-[var(--admin-card-bg)] flex items-center justify-center border border-[var(--admin-border-soft)]">
                      {(() => {
                        const Icon = getTypeIcon(selectedContent.type);
                        return <Icon className="h-4 w-4 text-[var(--brand)]" />;
                      })()}
                    </div>
                  )}
                  <div className="flex-1 text-left">
                    <div className="font-medium text-[var(--admin-text-primary)] truncate">
                      {selectedContent.title}
                    </div>
                    {selectedContent.creator && (
                      <div className="text-xs text-[var(--admin-text-primary)]-muted truncate">
                        by {selectedContent.creator}
                      </div>
                    )}
                  </div>
                  {getStatusBadge(selectedContent.status)}
                </>
              ) : (
                <div className="flex items-center gap-3 flex-1">
                  <div className="h-8 w-8 rounded-lg bg-[var(--admin-card-bg)] flex items-center justify-center border border-[var(--admin-border-soft)]">
                    <FileText className="h-4 w-4 text-[var(--admin-text-primary)]-muted" />
                  </div>
                  <div className="flex-1 text-left">
                    <span className="text-[var(--admin-text-primary)]-muted">{placeholder}</span>
                  </div>
                </div>
              )}
            </div>
          </SelectTrigger>
          <SelectContent className="bg-[var(--admin-surface)] border border-[var(--admin-border-soft)] shadow-xl backdrop-blur-sm z-50 min-w-[300px]">
            {content.map((item) => {
              const Icon = getTypeIcon(item.type);
              return (
                <SelectItem
                  key={item.id}
                  value={item.id}
                  className="text-[var(--admin-text-primary)] hover:bg-[var(--admin-card-bg)] focus:bg-[var(--admin-card-bg)] cursor-pointer transition-colors duration-150 py-3"
                >
                  <div className="flex items-center gap-3">
                    {item.thumbnail ? (
                      <img 
                        src={item.thumbnail} 
                        alt={item.title}
                        className="h-8 w-8 rounded-lg object-cover border border-[var(--admin-border-soft)]"
                      />
                    ) : (
                      <div className="h-8 w-8 rounded-lg bg-[var(--admin-card-bg)] flex items-center justify-center border border-[var(--admin-border-soft)]">
                        <Icon className="h-4 w-4 text-[var(--brand)]" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-[var(--admin-text-primary)] truncate">
                        {item.title}
                      </div>
                      {item.creator && (
                        <div className="text-xs text-[var(--admin-text-primary)]-muted truncate">
                          by {item.creator}
                        </div>
                      )}
                    </div>
                    {getStatusBadge(item.status)}
                  </div>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  );
}

// ----------------------
// Specialized Content Selection Cards
// Purpose: Pre-configured variants for different use cases
// ----------------------

interface PostSelectionCardProps {
  value: string;
  onValueChange: (value: string) => void;
  posts: { id: string; title: string; status: string; creator?: string; thumbnail?: string; }[];
  className?: string;
}

export function PostSelectionCard({ value, onValueChange, posts, className }: PostSelectionCardProps) {
  const content = posts.map(post => ({
    id: post.id,
    title: post.title,
    type: 'post' as const,
    status: post.status as any,
    creator: post.creator,
    thumbnail: post.thumbnail
  }));

  return (
    <ContentSelectionCard
      title="Select Post"
      description="Choose a post to review"
      value={value}
      onValueChange={onValueChange}
      content={content}
      placeholder="Choose a post..."
      className={className}
    />
  );
}

interface VideoSelectionCardProps {
  value: string;
  onValueChange: (value: string) => void;
  videos: { id: string; title: string; status: string; creator?: string; thumbnail?: string; }[];
  className?: string;
}

export function VideoSelectionCard({ value, onValueChange, videos, className }: VideoSelectionCardProps) {
  const content = videos.map(video => ({
    id: video.id,
    title: video.title,
    type: 'video' as const,
    status: video.status as any,
    creator: video.creator,
    thumbnail: video.thumbnail
  }));

  return (
    <ContentSelectionCard
      title="Select Video"
      description="Choose a video to review"
      value={value}
      onValueChange={onValueChange}
      content={content}
      placeholder="Choose a video..."
      className={className}
    />
  );
}

interface ImageSelectionCardProps {
  value: string;
  onValueChange: (value: string) => void;
  images: { id: string; title: string; status: string; creator?: string; thumbnail?: string; }[];
  className?: string;
}

export function ImageSelectionCard({ value, onValueChange, images, className }: ImageSelectionCardProps) {
  const content = images.map(image => ({
    id: image.id,
    title: image.title,
    type: 'image' as const,
    status: image.status as any,
    creator: image.creator,
    thumbnail: image.thumbnail
  }));

  return (
    <ContentSelectionCard
      title="Select Image"
      description="Choose an image to review"
      value={value}
      onValueChange={onValueChange}
      content={content}
      placeholder="Choose an image..."
      className={className}
    />
  );
}
