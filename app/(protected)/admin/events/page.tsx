"use client";

import { useState, useEffect } from "react";
import { AdminPageTemplate, MetricCard } from "@src/components/admin/AdminPageTemplate";
import { SelectFilterSection } from "@src/components/admin/SelectFilterSection";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@src/components/ui/card";
import { Badge } from "@src/components/ui/badge";
import { Button } from "@src/components/ui/button";
import { Input } from "@src/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@src/components/ui/select";
import { 
  Calendar, 
  Clock, 
  Users, 
  MapPin, 
  Video, 
  Mic, 
  Camera,
  Search, 
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Plus,
  RefreshCw,
  ExternalLink,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Play,
  Pause,
  Settings,
  DollarSign,
  FileText,
  User,
  Globe,
  Crown,
  Building,
  RotateCcw,
  Ban,
  CheckSquare,
  XSquare,
  ThumbsUp,
  Flag,
  Shield,
  TrendingUp,
  BarChart3,
  Package
} from "lucide-react";

// ----------------------
// Events & Scheduling Page
// Location: /app/(protected)/admin/events/page.tsx
// Purpose: Comprehensive events and scheduling management for OnlyFans-like platform
// Features: Live events, scheduled content, creator events, platform events
// Note: Mobile-first design with object-oriented structure
// ----------------------

interface Event {
  id: string;
  title: string;
  type: 'live_stream' | 'scheduled_content' | 'creator_event' | 'platform_event' | 'meeting';
  creator?: string;
  creatorId?: string;
  status: 'scheduled' | 'live' | 'completed' | 'cancelled' | 'postponed';
  startTime: string;
  endTime?: string;
  duration: number; // in minutes
  description: string;
  attendees: number;
  maxAttendees?: number;
  location?: string;
  isPrivate: boolean;
  tags: string[];
  thumbnail?: string;
  platform: 'web' | 'mobile' | 'both';
  revenue?: number;
  category: string;
}

interface ScheduledContent {
  id: string;
  title: string;
  creator: string;
  creatorId: string;
  type: 'post' | 'video' | 'image' | 'story';
  scheduledFor: string;
  status: 'scheduled' | 'published' | 'failed';
  content: string;
  tags: string[];
  isExplicit: boolean;
}

class EventsService {
  private events: Event[] = [
    {
      id: '1',
      title: 'Morning Fitness Live Stream',
      type: 'live_stream',
      creator: 'sarah_fitness',
      creatorId: '1',
      status: 'scheduled',
      startTime: '2025-01-28T08:00:00Z',
      endTime: '2025-01-28T09:00:00Z',
      duration: 60,
      description: 'Join me for a morning workout session!',
      attendees: 0,
      maxAttendees: 100,
      isPrivate: false,
      tags: ['fitness', 'workout', 'live'],
      platform: 'both',
      revenue: 0,
      category: 'Fitness'
    },
    {
      id: '2',
      title: 'Cooking Masterclass: Pasta Making',
      type: 'creator_event',
      creator: 'chef_marco',
      creatorId: '2',
      status: 'live',
      startTime: '2025-01-27T19:00:00Z',
      endTime: '2025-01-27T21:00:00Z',
      duration: 120,
      description: 'Learn to make authentic Italian pasta from scratch',
      attendees: 45,
      maxAttendees: 50,
      isPrivate: true,
      tags: ['cooking', 'pasta', 'italian'],
      platform: 'web',
      revenue: 450,
      category: 'Cooking'
    },
    {
      id: '3',
      title: 'Platform Maintenance Window',
      type: 'platform_event',
      status: 'scheduled',
      startTime: '2025-01-30T02:00:00Z',
      endTime: '2025-01-30T04:00:00Z',
      duration: 120,
      description: 'Scheduled maintenance for platform updates',
      attendees: 0,
      isPrivate: false,
      tags: ['maintenance', 'platform'],
      platform: 'both',
      category: 'System'
    }
  ];

  private scheduledContent: ScheduledContent[] = [
    {
      id: '1',
      title: 'Behind the Scenes: Workout Prep',
      creator: 'sarah_fitness',
      creatorId: '1',
      type: 'video',
      scheduledFor: '2025-01-28T10:00:00Z',
      status: 'scheduled',
      content: 'Exclusive behind-the-scenes content from my morning routine',
      tags: ['fitness', 'behind-scenes'],
      isExplicit: false
    },
    {
      id: '2',
      title: 'New Recipe Announcement',
      creator: 'chef_marco',
      creatorId: '2',
      type: 'post',
      scheduledFor: '2025-01-29T12:00:00Z',
      status: 'scheduled',
      content: 'Exciting new recipe coming this weekend!',
      tags: ['cooking', 'announcement'],
      isExplicit: false
    }
  ];

  public getAllEvents(): Event[] {
    return this.events;
  }

  public getEventsByType(type: string): Event[] {
    return this.events.filter(event => event.type === type);
  }

  public getEventsByStatus(status: string): Event[] {
    return this.events.filter(event => event.status === status);
  }

  public getLiveEvents(): Event[] {
    return this.events.filter(event => event.status === 'live');
  }

  public getScheduledContent(): ScheduledContent[] {
    return this.scheduledContent;
  }

  public getUpcomingEvents(): Event[] {
    const now = new Date();
    return this.events.filter(event => 
      new Date(event.startTime) > now && 
      (event.status === 'scheduled' || event.status === 'live')
    );
  }

  public getEventStats() {
    const total = this.events.length;
    const live = this.getLiveEvents().length;
    const scheduled = this.events.filter(e => e.status === 'scheduled').length;
    const completed = this.events.filter(e => e.status === 'completed').length;
    const totalRevenue = this.events.reduce((sum, event) => sum + (event.revenue || 0), 0);

    return {
      total,
      live,
      scheduled,
      completed,
      totalRevenue
    };
  }
}

// ----------------------
// Professional Event Card Component
// Purpose: Displays event information in a structured, professional layout
// Note: Similar to verification card with event-specific data
// ----------------------
function ProfessionalEventCard({
  event,
  onView,
  onEdit,
  onMore,
  className = ""
}: {
  event: Event;
  onView?: () => void;
  onEdit?: () => void;
  onMore?: () => void;
  className?: string;
}) {
  const getStatusBadge = () => {
    const statusConfig = {
      scheduled: { variant: "secondary" as const, icon: Clock, text: "Scheduled", color: "text-blue-600" },
      live: { variant: "default" as const, icon: Play, text: "Live", color: "text-red-600" },
      completed: { variant: "default" as const, icon: CheckCircle, text: "Completed", color: "text-green-600" },
      cancelled: { variant: "destructive" as const, icon: XCircle, text: "Cancelled", color: "text-red-600" },
      postponed: { variant: "secondary" as const, icon: AlertTriangle, text: "Postponed", color: "text-orange-600" }
    };

    const config = statusConfig[event.status];
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
      live_stream: Video,
      scheduled_content: Calendar,
      creator_event: Users,
      platform_event: Settings,
      meeting: Mic
    };

    const Icon = typeIcons[event.type];
    return <Icon className="h-4 w-4" />;
  };

  const getTypeBadge = () => {
    const typeConfig = {
      live_stream: { variant: "default" as const, text: "Live Stream" },
      scheduled_content: { variant: "secondary" as const, text: "Scheduled Content" },
      creator_event: { variant: "outline" as const, text: "Creator Event" },
      platform_event: { variant: "destructive" as const, text: "Platform Event" },
      meeting: { variant: "secondary" as const, text: "Meeting" }
    };

    const config = typeConfig[event.type];
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
            <div className="h-12 w-12 rounded-lg bg-surface-elev2 flex items-center justify-center border border-line-soft">
              {getTypeIcon()}
            </div>
            <div>
              <CardTitle className="text-lg text-text flex items-center gap-2">
                {event.title}
                {getTypeBadge()}
              </CardTitle>
              <CardDescription className="text-text-muted">
                {event.description}
              </CardDescription>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-text">
              {event.attendees}
              {event.maxAttendees && `/${event.maxAttendees}`}
            </div>
            <div className="text-sm text-text-muted">
              attendees
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Event Overview */}
        <div className="bg-surface-elev2 rounded-lg p-4 border border-line-soft">
          <div className="flex items-center gap-2 mb-3">
            {getTypeIcon()}
            <span className="font-medium text-text">Event Overview</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-sm text-text-muted">Status:</span>
              <div className="mt-1">
                {getStatusBadge()}
              </div>
            </div>
            <div>
              <span className="text-sm text-text-muted">Type:</span>
              <div className="mt-1">
                {getTypeBadge()}
              </div>
            </div>
            <div>
              <span className="text-sm text-text-muted">Category:</span>
              <div className="mt-1">
                <Badge variant="outline" className="text-xs">
                  {event.category}
                </Badge>
              </div>
            </div>
            <div>
              <span className="text-sm text-text-muted">Privacy:</span>
              <div className="mt-1">
                <Badge variant={event.isPrivate ? "destructive" : "default"} className="text-xs">
                  {event.isPrivate ? "PRIVATE" : "PUBLIC"}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Event Details */}
        <div className="bg-surface-elev2 rounded-lg p-4 border border-line-soft">
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="h-5 w-5 text-text-muted" />
            <span className="font-medium text-text">Event Details</span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-muted">Start Time:</span>
              <span className="text-sm text-text">
                {new Date(event.startTime).toLocaleString()}
              </span>
            </div>
            {event.endTime && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-muted">End Time:</span>
                <span className="text-sm text-text">
                  {new Date(event.endTime).toLocaleString()}
                </span>
              </div>
            )}
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-muted">Duration:</span>
              <span className="text-sm text-text">{event.duration} minutes</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-muted">Platform:</span>
              <span className="text-sm text-text capitalize">{event.platform}</span>
            </div>
            {event.location && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-muted">Location:</span>
                <span className="text-sm text-text">{event.location}</span>
              </div>
            )}
          </div>
        </div>

        {/* Attendance & Revenue */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-surface-elev2 rounded-lg p-4 text-center border border-line-soft">
            <div className="flex items-center justify-center gap-1 text-text-muted mb-1">
              <Users className="h-4 w-4" />
              <span className="text-xs font-medium">Attendees</span>
            </div>
            <div className="text-lg font-bold text-text">
              {event.attendees}
              {event.maxAttendees && `/${event.maxAttendees}`}
            </div>
          </div>
          <div className="bg-surface-elev2 rounded-lg p-4 text-center border border-line-soft">
            <div className="flex items-center justify-center gap-1 text-text-muted mb-1">
              <DollarSign className="h-4 w-4" />
              <span className="text-xs font-medium">Revenue</span>
            </div>
            <div className="text-lg font-bold text-text">
              ${event.revenue || 0}
            </div>
          </div>
        </div>

        {/* Creator Information */}
        {event.creator && (
          <div className="bg-surface-elev2 rounded-lg p-4 border border-line-soft">
            <div className="flex items-center gap-2 mb-3">
              <User className="h-5 w-5 text-text-muted" />
              <span className="font-medium text-text">Creator Information</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-muted">Creator:</span>
                <span className="text-sm text-text">{event.creator}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-muted">Creator ID:</span>
                <span className="text-sm text-text">{event.creatorId}</span>
              </div>
            </div>
          </div>
        )}

        {/* Tags */}
        <div className="bg-surface-elev2 rounded-lg p-4 border border-line-soft">
          <div className="flex items-center gap-2 mb-3">
            <Package className="h-5 w-5 text-text-muted" />
            <span className="font-medium text-text">Tags</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {event.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                #{tag}
              </Badge>
            ))}
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
// Events Detail View Component
// Purpose: Single card view with filtering and quick stats
// Note: Similar to verification page with event-specific data
// ----------------------
function EventsDetailView({
  events,
  selectedEventId,
  onEventSelect,
  onView,
  onEdit,
  onMore,
  className = ""
}: {
  events: Event[];
  selectedEventId?: string;
  onEventSelect?: (eventId: string) => void;
  onView?: (eventId: string) => void;
  onEdit?: (eventId: string) => void;
  onMore?: (eventId: string) => void;
  className?: string;
}) {
  const selectedEvent = events.find(e => e.id === selectedEventId) || events[0];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      scheduled: { variant: "default" as const, color: "text-blue-600", bgColor: "bg-blue-100" },
      live: { variant: "destructive" as const, color: "text-red-600", bgColor: "bg-red-100" },
      completed: { variant: "default" as const, color: "text-green-600", bgColor: "bg-green-100" },
      cancelled: { variant: "destructive" as const, color: "text-red-600", bgColor: "bg-red-100" },
      postponed: { variant: "secondary" as const, color: "text-orange-600", bgColor: "bg-orange-100" }
    };
    return statusConfig[status as keyof typeof statusConfig] || statusConfig.scheduled;
  };

  const getTypeIcon = () => {
    return <Calendar className="h-4 w-4" />;
  };

  const statusInfo = getStatusBadge(selectedEvent?.status || 'scheduled');

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Filter Section */}
      <SelectFilterSection
        title="Select Event"
        placeholder="Choose an event..."
        value={selectedEventId || events[0]?.id}
        onValueChange={onEventSelect || (() => {})}
        options={events.map((event) => {
          const Icon = getTypeIcon();
          return {
            id: event.id,
            label: event.title,
            icon: Icon,
            status: event.status
          };
        })}
      />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Event Card */}
        <div className="lg:col-span-2">
          {selectedEvent ? (
            <ProfessionalEventCard
              event={selectedEvent}
              onView={() => onView?.(selectedEvent.id)}
              onEdit={() => onEdit?.(selectedEvent.id)}
              onMore={() => onMore?.(selectedEvent.id)}
            />
          ) : (
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 text-center">
              <Calendar className="h-12 w-12 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-400">No event selected</p>
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
                  {selectedEvent?.status?.toUpperCase() || 'N/A'}
                </div>
              </div>

              {/* Type */}
              <div className="flex items-center justify-between p-3 bg-surface-elev2 rounded-lg">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-text-muted" />
                  <span className="text-sm font-medium text-text">Type</span>
                </div>
                <span className="text-sm font-semibold text-text">
                  {selectedEvent?.type?.replace('_', ' ').toUpperCase() || 'N/A'}
                </span>
              </div>

              {/* Attendees */}
              <div className="flex items-center justify-between p-3 bg-surface-elev2 rounded-lg">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-text-muted" />
                  <span className="text-sm font-medium text-text">Attendees</span>
                </div>
                <span className="text-sm font-semibold text-text">
                  {selectedEvent?.attendees || '0'}
                  {selectedEvent?.maxAttendees && `/${selectedEvent.maxAttendees}`}
                </span>
              </div>

              {/* Duration */}
              <div className="flex items-center justify-between p-3 bg-surface-elev2 rounded-lg">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-text-muted" />
                  <span className="text-sm font-medium text-text">Duration</span>
                </div>
                <span className="text-sm font-semibold text-text">
                  {selectedEvent?.duration || '0'} min
                </span>
              </div>

              {/* Revenue */}
              <div className="flex items-center justify-between p-3 bg-surface-elev2 rounded-lg">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-text-muted" />
                  <span className="text-sm font-medium text-text">Revenue</span>
                </div>
                <span className="text-sm font-semibold text-text">
                  ${selectedEvent?.revenue || '0'}
                </span>
              </div>

              {/* Platform */}
              <div className="flex items-center justify-between p-3 bg-surface-elev2 rounded-lg">
                <div className="flex items-center gap-2">
                  <Video className="h-4 w-4 text-text-muted" />
                  <span className="text-sm font-medium text-text">Platform</span>
                </div>
                <span className="text-sm font-semibold text-text">
                  {selectedEvent?.platform?.toUpperCase() || 'N/A'}
                </span>
              </div>

              {/* Start Time */}
              <div className="flex items-center justify-between p-3 bg-surface-elev2 rounded-lg">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-text-muted" />
                  <span className="text-sm font-medium text-text">Start Time</span>
                </div>
                <span className="text-sm text-text-muted">
                  {selectedEvent?.startTime ? new Date(selectedEvent.startTime).toLocaleString() : 'N/A'}
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
                onClick={() => onView?.(selectedEvent?.id || '')}
              >
                <Eye className="h-4 w-4 mr-2" />
                View Event
              </Button>
              <Button 
                variant="outline" 
                className="w-full bg-surface-elev2 border-line-soft text-text hover:bg-surface-elev1"
                onClick={() => onEdit?.(selectedEvent?.id || '')}
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Event
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

class ScheduledContentCardComponent {
  private content: ScheduledContent;

  constructor(content: ScheduledContent) {
    this.content = content;
  }

  private getStatusBadge() {
    const statusConfig = {
      scheduled: { variant: 'secondary' as const, icon: Clock, text: 'Scheduled' },
      published: { variant: 'default' as const, icon: CheckCircle, text: 'Published' },
      failed: { variant: 'destructive' as const, icon: XCircle, text: 'Failed' }
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
      video: Video,
      image: Camera,
      story: Clock
    };

    const Icon = typeIcons[this.content.type];
    return <Icon className="h-4 w-4" />;
  }

  public render() {
    return (
      <Card className="hover:shadow-lg transition-shadow duration-200">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                {this.getTypeIcon()}
              </div>
              <div className="flex-1 min-w-0">
                <CardTitle className="text-lg flex items-center gap-2">
                  {this.content.title}
                  {this.content.isExplicit && (
                    <Badge variant="destructive" className="text-xs">
                      Explicit
                    </Badge>
                  )}
                </CardTitle>
                <CardDescription className="line-clamp-2">
                  {this.content.content}
                </CardDescription>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline" className="text-xs">
                    {this.content.creator}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {this.content.type}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              {this.getStatusBadge()}
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="text-sm text-muted-foreground">
            Scheduled for: {new Date(this.content.scheduledFor).toLocaleString()}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1">
            {this.content.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                #{tag}
              </Badge>
            ))}
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1">
              <Eye className="h-4 w-4 mr-1" />
              Preview
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              <Edit className="h-4 w-4 mr-1" />
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

// ----------------------
// Events Page Client Component
// Purpose: Manages state and interactions for the events page
// ----------------------
function EventsPageClient() {
  const [selectedEventId, setSelectedEventId] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const eventsService = new EventsService();
  const allEvents = eventsService.getAllEvents();
  const stats = eventsService.getEventStats();

  // Filter events based on search and status
  const filteredEvents = allEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (event.creator && event.creator.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || event.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Set default selected event
  useEffect(() => {
    if (filteredEvents.length > 0 && !selectedEventId) {
      setSelectedEventId(filteredEvents[0].id);
    }
  }, [filteredEvents, selectedEventId]);

  const handleEventSelect = (eventId: string) => {
    setSelectedEventId(eventId);
  };

  const handleView = (eventId: string) => {
    console.log('View event:', eventId);
  };

  const handleEdit = (eventId: string) => {
    console.log('Edit event:', eventId);
  };

  const handleMore = (eventId: string) => {
    console.log('More actions for event:', eventId);
  };

  const handleRefresh = () => {
    console.log('Refresh events');
  };

  const handleExportAll = () => {
    console.log('Export all events');
  };

  const statsCards = (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard
        title="Total Events"
        value={stats.total}
        growth={15.3}
        icon={Calendar}
        format="number"
      />
      <MetricCard
        title="Live Now"
        value={stats.live}
        growth={0}
        icon={Play}
        format="number"
      />
      <MetricCard
        title="Scheduled"
        value={stats.scheduled}
        growth={0}
        icon={Clock}
        format="number"
      />
      <MetricCard
        title="Completed"
        value={stats.completed}
        growth={8.2}
        icon={CheckCircle}
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
          <SelectItem value="scheduled" className="text-text hover:bg-surface-elev1">Scheduled</SelectItem>
          <SelectItem value="live" className="text-text hover:bg-surface-elev1">Live</SelectItem>
          <SelectItem value="completed" className="text-text hover:bg-surface-elev1">Completed</SelectItem>
          <SelectItem value="cancelled" className="text-text hover:bg-surface-elev1">Cancelled</SelectItem>
          <SelectItem value="postponed" className="text-text hover:bg-surface-elev1">Postponed</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );

  return (
    <AdminPageTemplate
      title="Events & Scheduling Management"
      description="Manage live events, scheduled content, and platform events"
      icon={<Calendar className="h-6 w-6" />}
      searchPlaceholder="Search events, creators, or descriptions..."
      searchValue={searchTerm}
      onSearchChange={setSearchTerm}
      showSearch={true}
      showFilters={true}
      showRefresh={true}
      showExport={true}
      onRefresh={handleRefresh}
      onExport={handleExportAll}
      filters={filters}
      stats={statsCards}
    >
      <EventsDetailView
        events={filteredEvents}
        selectedEventId={selectedEventId}
        onEventSelect={handleEventSelect}
        onView={handleView}
        onEdit={handleEdit}
        onMore={handleMore}
      />
    </AdminPageTemplate>
  );
}

export default function EventsPage() {
  return <EventsPageClient />;
}
