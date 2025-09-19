"use client";

import { AdminPillNavigationComponent } from "@src/components/admin/AdminPillNavigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@src/components/ui/card";
import { Badge } from "@src/components/ui/badge";
import { Button } from "@src/components/ui/button";
import { Input } from "@src/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@src/components/ui/tabs";
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
  FileText
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

class EventCardComponent {
  private event: Event;

  constructor(event: Event) {
    this.event = event;
  }

  private getStatusBadge() {
    const statusConfig = {
      scheduled: { variant: 'secondary' as const, icon: Clock, text: 'Scheduled' },
      live: { variant: 'default' as const, icon: Play, text: 'Live' },
      completed: { variant: 'default' as const, icon: CheckCircle, text: 'Completed' },
      cancelled: { variant: 'destructive' as const, icon: XCircle, text: 'Cancelled' },
      postponed: { variant: 'secondary' as const, icon: AlertTriangle, text: 'Postponed' }
    };

    const config = statusConfig[this.event.status];
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
      live_stream: Video,
      scheduled_content: Calendar,
      creator_event: Users,
      platform_event: Settings,
      meeting: Mic
    };

    const Icon = typeIcons[this.event.type];
    return <Icon className="h-4 w-4" />;
  }

  private getTypeBadge() {
    const typeConfig = {
      live_stream: { variant: 'default' as const, text: 'Live Stream' },
      scheduled_content: { variant: 'secondary' as const, text: 'Scheduled Content' },
      creator_event: { variant: 'outline' as const, text: 'Creator Event' },
      platform_event: { variant: 'destructive' as const, text: 'Platform Event' },
      meeting: { variant: 'secondary' as const, text: 'Meeting' }
    };

    const config = typeConfig[this.event.type];
    return (
      <Badge variant={config.variant} className="text-xs">
        {config.text}
      </Badge>
    );
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
                  {this.event.title}
                  {this.event.isPrivate && (
                    <Badge variant="destructive" className="text-xs">
                      Private
                    </Badge>
                  )}
                </CardTitle>
                <CardDescription className="line-clamp-2">
                  {this.event.description}
                </CardDescription>
                <div className="flex items-center gap-2 mt-2">
                  {this.getTypeBadge()}
                  <Badge variant="outline" className="text-xs">
                    {this.event.category}
                  </Badge>
                  {this.event.creator && (
                    <Badge variant="outline" className="text-xs">
                      {this.event.creator}
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
          {/* Event Details */}
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center justify-center gap-1 text-blue-600">
                <Users className="h-4 w-4" />
                <span className="font-semibold">
                  {this.event.attendees}
                  {this.event.maxAttendees && `/${this.event.maxAttendees}`}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">Attendees</p>
            </div>
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center justify-center gap-1 text-green-600">
                <Clock className="h-4 w-4" />
                <span className="font-semibold">{this.event.duration}m</span>
              </div>
              <p className="text-xs text-muted-foreground">Duration</p>
            </div>
          </div>

          {/* Time and Location */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>{new Date(this.event.startTime).toLocaleString()}</span>
            </div>
            {this.event.location && (
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{this.event.location}</span>
              </div>
            )}
            <div className="flex items-center gap-2 text-sm">
              <Video className="h-4 w-4 text-muted-foreground" />
              <span className="capitalize">{this.event.platform}</span>
            </div>
          </div>

          {/* Revenue */}
          {this.event.revenue && this.event.revenue > 0 && (
            <div className="flex items-center gap-2 text-sm text-green-600">
              <span className="font-semibold">Revenue: ${this.event.revenue}</span>
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-1">
            {this.event.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                #{tag}
              </Badge>
            ))}
            {this.event.tags.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{this.event.tags.length - 3} more
              </Badge>
            )}
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1">
              <Eye className="h-4 w-4 mr-1" />
              View
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

export default function EventsPage() {
  const eventsService = new EventsService();
  const allEvents = eventsService.getAllEvents();
  const liveStreams = eventsService.getEventsByType('live_stream');
  const creatorEvents = eventsService.getEventsByType('creator_event');
  const platformEvents = eventsService.getEventsByType('platform_event');
  const scheduledContent = eventsService.getScheduledContent();
  const upcomingEvents = eventsService.getUpcomingEvents();
  const stats = eventsService.getEventStats();

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[var(--admin-text-primary)]">Events & Scheduling</h1>
            <p className="text-[var(--admin-text-secondary)]">Manage live events, scheduled content, and platform events</p>
          </div>
          <Badge className="bg-orange-500 text-[var(--admin-text-primary)]">Super Admin</Badge>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-[var(--admin-text-primary)] mb-2">Events Overview</h2>
        <p className="text-[var(--admin-text-secondary)] mb-6">Live events, scheduled content, and platform metrics</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-[var(--admin-card-bg)] border border-neutral-700 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[var(--admin-text-secondary)] uppercase tracking-wide">Total Events</p>
                <p className="text-2xl font-bold text-[var(--admin-text-primary)]">{stats.total}</p>
                <div className="flex items-center gap-1 text-sm text-blue-500">
                  <Calendar className="h-4 w-4" />
                  +15.3% from last month
                </div>
              </div>
              <Calendar className="h-8 w-8 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-[var(--admin-card-bg)] border border-neutral-700 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[var(--admin-text-secondary)] uppercase tracking-wide">Live Now</p>
                <p className="text-2xl font-bold text-[var(--admin-text-primary)]">{stats.live}</p>
                <div className="flex items-center gap-1 text-sm text-red-500">
                  <Play className="h-4 w-4" />
                  Currently streaming
                </div>
              </div>
              <Play className="h-8 w-8 text-red-500" />
            </div>
          </div>
          
          <div className="bg-[var(--admin-card-bg)] border border-neutral-700 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[var(--admin-text-secondary)] uppercase tracking-wide">Scheduled</p>
                <p className="text-2xl font-bold text-[var(--admin-text-primary)]">{stats.scheduled}</p>
                <div className="flex items-center gap-1 text-sm text-orange-500">
                  <Clock className="h-4 w-4" />
                  Upcoming events
                </div>
              </div>
              <Clock className="h-8 w-8 text-orange-500" />
            </div>
          </div>
          
          <div className="bg-[var(--admin-card-bg)] border border-neutral-700 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[var(--admin-text-secondary)] uppercase tracking-wide">Completed</p>
                <p className="text-2xl font-bold text-[var(--admin-text-primary)]">{stats.completed}</p>
                <div className="flex items-center gap-1 text-sm text-green-500">
                  <CheckCircle className="h-4 w-4" />
                  +8.2% from last month
                </div>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Events Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="bg-[var(--admin-card-bg)] border-neutral-700">
          <CardHeader>
            <CardTitle className="text-[var(--admin-text-primary)] flex items-center gap-2">
              <Video className="h-5 w-5 text-blue-500" />
              Live Events Timeline
            </CardTitle>
            <CardDescription className="text-[var(--admin-text-secondary)]">Live events and streaming activity over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-neutral-900/50 rounded-lg">
              <div className="text-center">
                <Video className="h-12 w-12 text-[var(--admin-text-secondary)] mx-auto mb-2" />
                <p className="text-[var(--admin-text-secondary)]">Live events chart</p>
                <p className="text-sm text-neutral-500">Line chart showing live events over time</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[var(--admin-card-bg)] border-neutral-700">
          <CardHeader>
            <CardTitle className="text-[var(--admin-text-primary)] flex items-center gap-2">
              <Calendar className="h-5 w-5 text-green-500" />
              Event Categories
            </CardTitle>
            <CardDescription className="text-[var(--admin-text-secondary)]">Distribution of events by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-neutral-900/50 rounded-lg">
              <div className="text-center">
                <Calendar className="h-12 w-12 text-[var(--admin-text-secondary)] mx-auto mb-2" />
                <p className="text-[var(--admin-text-secondary)]">Event categories chart</p>
                <p className="text-sm text-neutral-500">Pie chart showing event distribution</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[var(--admin-text-secondary)]" />
          <Input 
            placeholder="Search events and scheduled content..."
            className="pl-10 bg-[var(--admin-card-bg)] border-neutral-700 text-[var(--admin-text-primary)]"
          />
        </div>
        <Button variant="outline" className="flex items-center gap-2 bg-[var(--admin-card-bg)] border-neutral-700 text-[var(--admin-text-primary)] hover:bg-[var(--admin-surface)]">
          <Filter className="h-4 w-4" />
          Filters
        </Button>
        <Button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-[var(--admin-text-primary)]">
          <Plus className="h-4 w-4" />
          Create Event
        </Button>
      </div>


      {/* Events Tabs */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className="grid w-full grid-cols-6 bg-[var(--admin-card-bg)] border-neutral-700">
          <TabsTrigger value="all" className="data-[state=active]:bg-[var(--admin-surface)] data-[state=active]:text-[var(--admin-text-primary)] text-[var(--admin-text-secondary)]">All Events</TabsTrigger>
          <TabsTrigger value="live" className="data-[state=active]:bg-[var(--admin-surface)] data-[state=active]:text-[var(--admin-text-primary)] text-[var(--admin-text-secondary)]">Live Streams</TabsTrigger>
          <TabsTrigger value="creator" className="data-[state=active]:bg-[var(--admin-surface)] data-[state=active]:text-[var(--admin-text-primary)] text-[var(--admin-text-secondary)]">Creator Events</TabsTrigger>
          <TabsTrigger value="platform" className="data-[state=active]:bg-[var(--admin-surface)] data-[state=active]:text-[var(--admin-text-primary)] text-[var(--admin-text-secondary)]">Platform Events</TabsTrigger>
          <TabsTrigger value="scheduled" className="data-[state=active]:bg-[var(--admin-surface)] data-[state=active]:text-[var(--admin-text-primary)] text-[var(--admin-text-secondary)]">Scheduled Content</TabsTrigger>
          <TabsTrigger value="upcoming" className="data-[state=active]:bg-[var(--admin-surface)] data-[state=active]:text-[var(--admin-text-primary)] text-[var(--admin-text-secondary)]">Upcoming</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {allEvents.map((event) => {
              const eventCard = new EventCardComponent(event);
              return <div key={event.id}>{eventCard.render()}</div>;
            })}
          </div>
        </TabsContent>

        <TabsContent value="live" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {liveStreams.map((event) => {
              const eventCard = new EventCardComponent(event);
              return <div key={event.id}>{eventCard.render()}</div>;
            })}
          </div>
        </TabsContent>

        <TabsContent value="creator" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {creatorEvents.map((event) => {
              const eventCard = new EventCardComponent(event);
              return <div key={event.id}>{eventCard.render()}</div>;
            })}
          </div>
        </TabsContent>

        <TabsContent value="platform" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {platformEvents.map((event) => {
              const eventCard = new EventCardComponent(event);
              return <div key={event.id}>{eventCard.render()}</div>;
            })}
          </div>
        </TabsContent>

        <TabsContent value="scheduled" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {scheduledContent.map((content) => {
              const contentCard = new ScheduledContentCardComponent(content);
              return <div key={content.id}>{contentCard.render()}</div>;
            })}
          </div>
        </TabsContent>

        <TabsContent value="upcoming" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {upcomingEvents.map((event) => {
              const eventCard = new EventCardComponent(event);
              return <div key={event.id}>{eventCard.render()}</div>;
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
