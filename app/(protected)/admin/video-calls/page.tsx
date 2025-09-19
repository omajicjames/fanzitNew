"use client";

import { AdminPillNavigationComponent } from "@src/components/admin/AdminPillNavigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@src/components/ui/card";
import { Badge } from "@src/components/ui/badge";
import { Button } from "@src/components/ui/button";
import { Input } from "@src/components/ui/input";
import { Switch } from "@src/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@src/components/ui/tabs";
import { 
  Video, 
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
  Shield,
  Settings,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  Camera,
  CameraOff,
  Zap,
  Target,
  Award,
  Activity,
  DollarSign,
  CreditCard,
  FileText,
  MessageSquare,
  Flag,
  UserCheck,
  UserX,
  Globe,
  Mail,
  MapPin,
  RotateCcw,
  Download,
  Upload,
  Monitor,
  Smartphone,
  Laptop,
  X
} from "lucide-react";

// ----------------------
// Video Calls Management Page
// Location: /app/(protected)/admin/video-calls/page.tsx
// Purpose: Comprehensive video calls management and settings
// Features: Call management, settings, analytics, moderation
// Note: Mobile-first design with object-oriented structure
// ----------------------

interface VideoCall {
  id: string;
  creator: {
    id: string;
    username: string;
    name: string;
    email: string;
    avatar_url: string;
    is_verified: boolean;
  };
  subscriber: {
    id: string;
    username: string;
    name: string;
    email: string;
    avatar_url: string;
  };
  status: 'scheduled' | 'active' | 'completed' | 'cancelled' | 'failed';
  duration_minutes: number;
  price_per_minute: number;
  total_price: number;
  scheduled_at: string;
  started_at?: string;
  ended_at?: string;
  call_quality: 'excellent' | 'good' | 'fair' | 'poor';
  video_quality: 'hd' | 'sd' | 'low';
  recording_url?: string;
  thumbnail_url?: string;
  notes?: string;
  admin_notes?: string;
  flags: string[];
  device_info: {
    creator_device: 'desktop' | 'mobile' | 'tablet';
    subscriber_device: 'desktop' | 'mobile' | 'tablet';
    creator_browser?: string;
    subscriber_browser?: string;
  };
  created_at: string;
  updated_at: string;
}

interface VideoCallSettings {
  video_call_status: boolean;
  agora_app_id: string;
  video_call_min_price_cents: number;
  video_call_max_price_cents: number;
  video_call_max_duration_minutes: number;
  recording_enabled: boolean;
  quality_settings: {
    video_quality: 'low' | 'medium' | 'high' | 'hd';
    audio_quality: 'low' | 'medium' | 'high';
    echo_cancellation: boolean;
    noise_suppression: boolean;
    auto_focus: boolean;
  };
  moderation_settings: {
    auto_moderation: boolean;
    profanity_filter: boolean;
    content_monitoring: boolean;
    screen_recording_detection: boolean;
  };
  device_restrictions: {
    allow_mobile: boolean;
    allow_desktop: boolean;
    allow_tablet: boolean;
    min_browser_version: string;
  };
}

interface VideoCallStats {
  totalCalls: number;
  activeCalls: number;
  completedCalls: number;
  cancelledCalls: number;
  totalRevenue: number;
  averageDuration: number;
  averagePrice: number;
  topCreators: number;
  qualityIssues: number;
  recordingRate: number;
  hdCalls: number;
  mobileCalls: number;
}

class VideoCallsManagementService {
  private calls: VideoCall[] = [];
  private settings!: VideoCallSettings;

  constructor() {
    this.initializeMockData();
    this.initializeSettings();
  }

  private initializeMockData() {
    this.calls = [
      {
        id: "1",
        creator: {
          id: "1",
          username: "@sarahj",
          name: "Sarah Johnson",
          email: "sarah@example.com",
          avatar_url: "/placeholder-user.jpg",
          is_verified: true
        },
        subscriber: {
          id: "2",
          username: "@mikechen",
          name: "Mike Chen",
          email: "mike@example.com",
          avatar_url: "/placeholder-user.jpg"
        },
        status: "completed",
        duration_minutes: 25,
        price_per_minute: 8.00,
        total_price: 200.00,
        scheduled_at: "2024-01-25T15:00:00Z",
        started_at: "2024-01-25T15:05:00Z",
        ended_at: "2024-01-25T15:30:00Z",
        call_quality: "excellent",
        video_quality: "hd",
        recording_url: "/recordings/video-call-1.mp4",
        thumbnail_url: "/thumbnails/video-call-1.jpg",
        notes: "Great fitness consultation session",
        flags: [],
        device_info: {
          creator_device: "desktop",
          subscriber_device: "mobile",
          creator_browser: "Chrome 120",
          subscriber_browser: "Safari 17"
        },
        created_at: "2024-01-25T14:30:00Z",
        updated_at: "2024-01-25T15:30:00Z"
      },
      {
        id: "2",
        creator: {
          id: "3",
          username: "@emmaw",
          name: "Emma Wilson",
          email: "emma@example.com",
          avatar_url: "/placeholder-user.jpg",
          is_verified: false
        },
        subscriber: {
          id: "4",
          username: "@alexr",
          name: "Alex Rodriguez",
          email: "alex@example.com",
          avatar_url: "/placeholder-user.jpg"
        },
        status: "active",
        duration_minutes: 0,
        price_per_minute: 5.50,
        total_price: 0,
        scheduled_at: "2024-01-27T17:00:00Z",
        started_at: "2024-01-27T17:02:00Z",
        call_quality: "good",
        video_quality: "sd",
        device_info: {
          creator_device: "mobile",
          subscriber_device: "desktop",
          creator_browser: "Safari 17",
          subscriber_browser: "Chrome 120"
        },
        flags: [],
        created_at: "2024-01-27T16:30:00Z",
        updated_at: "2024-01-27T17:02:00Z"
      },
      {
        id: "3",
        creator: {
          id: "1",
          username: "@sarahj",
          name: "Sarah Johnson",
          email: "sarah@example.com",
          avatar_url: "/placeholder-user.jpg",
          is_verified: true
        },
        subscriber: {
          id: "5",
          username: "@johndoe",
          name: "John Doe",
          email: "john@example.com",
          avatar_url: "/placeholder-user.jpg"
        },
        status: "cancelled",
        duration_minutes: 0,
        price_per_minute: 6.00,
        total_price: 0,
        scheduled_at: "2024-01-26T11:00:00Z",
        call_quality: "good",
        video_quality: "sd",
        notes: "Subscriber cancelled 10 minutes before call",
        device_info: {
          creator_device: "desktop",
          subscriber_device: "mobile"
        },
        flags: [],
        created_at: "2024-01-26T10:30:00Z",
        updated_at: "2024-01-26T10:50:00Z"
      }
    ];
  }

  private initializeSettings() {
    this.settings = {
      video_call_status: true,
      agora_app_id: "your-agora-app-id",
      video_call_min_price_cents: 200, // $2.00
      video_call_max_price_cents: 2000, // $20.00
      video_call_max_duration_minutes: 90,
      recording_enabled: true,
      quality_settings: {
        video_quality: "hd",
        audio_quality: "high",
        echo_cancellation: true,
        noise_suppression: true,
        auto_focus: true
      },
      moderation_settings: {
        auto_moderation: true,
        profanity_filter: true,
        content_monitoring: true,
        screen_recording_detection: true
      },
      device_restrictions: {
        allow_mobile: true,
        allow_desktop: true,
        allow_tablet: true,
        min_browser_version: "Chrome 90, Safari 14, Firefox 88"
      }
    };
  }

  public getCalls(): VideoCall[] {
    return this.calls;
  }

  public getSettings(): VideoCallSettings {
    return this.settings;
  }

  public getStats(): VideoCallStats {
    const totalCalls = this.calls.length;
    const activeCalls = this.calls.filter(c => c.status === 'active').length;
    const completedCalls = this.calls.filter(c => c.status === 'completed').length;
    const cancelledCalls = this.calls.filter(c => c.status === 'cancelled').length;
    const totalRevenue = this.calls.reduce((sum, c) => sum + c.total_price, 0);
    const averageDuration = completedCalls > 0 ? this.calls.filter(c => c.status === 'completed').reduce((sum, c) => sum + c.duration_minutes, 0) / completedCalls : 0;
    const averagePrice = totalCalls > 0 ? this.calls.reduce((sum, c) => sum + c.price_per_minute, 0) / totalCalls : 0;
    const topCreators = new Set(this.calls.map(c => c.creator.id)).size;
    const qualityIssues = this.calls.filter(c => c.call_quality === 'poor' || c.call_quality === 'fair').length;
    const recordingRate = completedCalls > 0 ? this.calls.filter(c => c.status === 'completed' && c.recording_url).length / completedCalls * 100 : 0;
    const hdCalls = this.calls.filter(c => c.video_quality === 'hd').length;
    const mobileCalls = this.calls.filter(c => c.device_info.creator_device === 'mobile' || c.device_info.subscriber_device === 'mobile').length;

    return {
      totalCalls,
      activeCalls,
      completedCalls,
      cancelledCalls,
      totalRevenue,
      averageDuration,
      averagePrice,
      topCreators,
      qualityIssues,
      recordingRate,
      hdCalls,
      mobileCalls
    };
  }
}

class VideoCallCardComponent {
  private call: VideoCall;

  constructor(call: VideoCall) {
    this.call = call;
  }

  private getStatusBadge() {
    const statusConfig = {
      scheduled: { variant: "secondary" as const, icon: Clock, text: "Scheduled" },
      active: { variant: "default" as const, icon: Play, text: "Active" },
      completed: { variant: "default" as const, icon: CheckCircle, text: "Completed" },
      cancelled: { variant: "destructive" as const, icon: X, text: "Cancelled" },
      failed: { variant: "destructive" as const, icon: AlertTriangle, text: "Failed" }
    };

    const config = statusConfig[this.call.status];
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {config.text}
      </Badge>
    );
  }

  private getQualityBadge() {
    const qualityConfig = {
      excellent: { variant: "default" as const, color: "text-green-600" },
      good: { variant: "default" as const, color: "text-blue-600" },
      fair: { variant: "secondary" as const, color: "text-yellow-600" },
      poor: { variant: "destructive" as const, color: "text-red-600" }
    };

    const quality = this.call.call_quality || 'good';
    const config = qualityConfig[quality];

    return (
      <Badge variant={config.variant} className={`${config.color} text-xs`}>
        {quality.toUpperCase()}
      </Badge>
    );
  }

  private getVideoQualityBadge() {
    const videoQualityConfig = {
      hd: { variant: "default" as const, text: "HD" },
      sd: { variant: "secondary" as const, text: "SD" },
      low: { variant: "outline" as const, text: "LOW" }
    };

    const quality = this.call.video_quality || 'sd';
    const config = videoQualityConfig[quality];

    return (
      <Badge variant={config.variant} className="text-xs">
        {config.text}
      </Badge>
    );
  }

  private getDeviceIcon(device: string) {
    const deviceIcons = {
      desktop: Monitor,
      mobile: Smartphone,
      tablet: Laptop
    };

    const Icon = deviceIcons[device as keyof typeof deviceIcons] || Monitor;
    return <Icon className="h-4 w-4" />;
  }

  public render() {
    return (
      <Card className="group hover:shadow-lg transition-all duration-200">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="space-y-1 flex-1">
              <CardTitle className="text-lg flex items-center gap-2">
                <Video className="h-4 w-4" />
                Video Call Session
                {this.call.recording_url && (
                  <Badge variant="outline" className="text-xs">
                    <Video className="h-3 w-3 mr-1" />
                    Recorded
                  </Badge>
                )}
              </CardTitle>
              <CardDescription>
                {this.call.creator.name} → {this.call.subscriber.name}
              </CardDescription>
            </div>
            <div className="flex flex-col gap-1 ml-2">
              {this.getStatusBadge()}
              <div className="flex gap-1">
                {this.getQualityBadge()}
                {this.getVideoQualityBadge()}
              </div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Video Thumbnail */}
          {this.call.thumbnail_url && (
            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center relative overflow-hidden">
              <div className="text-center">
                <Video className="h-12 w-12 text-muted-foreground" />
                <p className="text-sm text-muted-foreground mt-2">Video Call Recording</p>
              </div>
              <div className="absolute top-2 left-2">
                <Badge variant="secondary" className="text-xs">
                  {this.call.duration_minutes} min
                </Badge>
              </div>
              <div className="absolute top-2 right-2">
                <Badge variant="outline" className="text-xs">
                  {this.call.video_quality.toUpperCase()}
                </Badge>
              </div>
            </div>
          )}

          {/* Participants */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                <User className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-medium">{this.call.creator.name}</p>
                <p className="text-xs text-muted-foreground">@{this.call.creator.username}</p>
              </div>
            </div>
            <div className="text-muted-foreground">→</div>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                <User className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-medium">{this.call.subscriber.name}</p>
                <p className="text-xs text-muted-foreground">@{this.call.subscriber.username}</p>
              </div>
            </div>
          </div>

          {/* Call Details */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>{this.call.duration_minutes} min</span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <span>${this.call.total_price.toFixed(2)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-muted-foreground" />
              <span>${this.call.price_per_minute}/min</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>{new Date(this.call.scheduled_at).toLocaleDateString()}</span>
            </div>
          </div>

          {/* Device Info */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Monitor className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Devices:</span>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                {this.getDeviceIcon(this.call.device_info.creator_device)}
                <span>Creator: {this.call.device_info.creator_device}</span>
              </div>
              <div className="flex items-center gap-1">
                {this.getDeviceIcon(this.call.device_info.subscriber_device)}
                <span>Subscriber: {this.call.device_info.subscriber_device}</span>
              </div>
            </div>
            {(this.call.device_info.creator_browser || this.call.device_info.subscriber_browser) && (
              <div className="text-xs text-muted-foreground">
                <p>Browsers: {this.call.device_info.creator_browser} / {this.call.device_info.subscriber_browser}</p>
              </div>
            )}
          </div>

          {/* Call Quality */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Video className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Quality:</span>
              {this.getQualityBadge()}
              {this.getVideoQualityBadge()}
            </div>
            {this.call.recording_url && (
              <div className="flex items-center gap-2">
                <Video className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Recording available</span>
                <Button variant="outline" size="sm">
                  <Download className="h-3 w-3 mr-1" />
                  Download
                </Button>
              </div>
            )}
          </div>

          {/* Notes */}
          {this.call.notes && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="flex items-center gap-2 text-blue-800 mb-1">
                <MessageSquare className="h-4 w-4" />
                <span className="text-sm font-medium">Notes</span>
              </div>
              <p className="text-sm text-blue-700">{this.call.notes}</p>
            </div>
          )}

          {/* Admin Notes */}
          {this.call.admin_notes && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <div className="flex items-center gap-2 text-yellow-800 mb-1">
                <Shield className="h-4 w-4" />
                <span className="text-sm font-medium">Admin Notes</span>
              </div>
              <p className="text-sm text-yellow-700">{this.call.admin_notes}</p>
            </div>
          )}

          {/* Timeline */}
          <div className="space-y-1 text-xs text-muted-foreground">
            <p>Scheduled: {new Date(this.call.scheduled_at).toLocaleString()}</p>
            {this.call.started_at && (
              <p>Started: {new Date(this.call.started_at).toLocaleString()}</p>
            )}
            {this.call.ended_at && (
              <p>Ended: {new Date(this.call.ended_at).toLocaleString()}</p>
            )}
          </div>

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

function VideoCallSettingsComponent({ settings }: { settings: VideoCallSettings }) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Video Call Settings
          </CardTitle>
          <CardDescription>
            Configure video call functionality and quality settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Enable Video Calls */}
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium">Enable Video Calls</label>
              <p className="text-xs text-muted-foreground">
                Allow creators to offer video calls to their fans
              </p>
            </div>
            <Switch checked={settings.video_call_status} />
          </div>

          {/* Agora App ID */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Agora App ID</label>
            <Input
              value={settings.agora_app_id}
              placeholder="Enter your Agora App ID"
            />
            <p className="text-xs text-muted-foreground">
              Required for video call functionality. Get this from your Agora Console.
            </p>
          </div>

          {/* Price Range */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Minimum Price ($)</label>
              <Input
                type="number"
                step="0.01"
                value={(settings.video_call_min_price_cents / 100).toFixed(2)}
                placeholder="0.00"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Maximum Price ($)</label>
              <Input
                type="number"
                step="0.01"
                value={(settings.video_call_max_price_cents / 100).toFixed(2)}
                placeholder="0.00"
              />
            </div>
          </div>

          {/* Max Duration */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Maximum Duration (minutes)</label>
            <Input
              type="number"
              min="1"
              max="180"
              value={settings.video_call_max_duration_minutes}
              placeholder="90"
            />
            <p className="text-xs text-muted-foreground">
              Maximum duration for video calls (1-180 minutes)
            </p>
          </div>

          {/* Recording Settings */}
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium">Enable Recording</label>
              <p className="text-xs text-muted-foreground">
                Allow calls to be recorded for quality assurance
              </p>
            </div>
            <Switch checked={settings.recording_enabled} />
          </div>

          {/* Quality Settings */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium">Quality Settings</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm">Echo Cancellation</label>
                <Switch checked={settings.quality_settings.echo_cancellation} />
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm">Noise Suppression</label>
                <Switch checked={settings.quality_settings.noise_suppression} />
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm">Auto Focus</label>
                <Switch checked={settings.quality_settings.auto_focus} />
              </div>
            </div>
          </div>

          {/* Device Restrictions */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium">Device Restrictions</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm">Allow Mobile</label>
                <Switch checked={settings.device_restrictions.allow_mobile} />
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm">Allow Desktop</label>
                <Switch checked={settings.device_restrictions.allow_desktop} />
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm">Allow Tablet</label>
                <Switch checked={settings.device_restrictions.allow_tablet} />
              </div>
            </div>
          </div>

          <Button className="w-full">
            <Settings className="h-4 w-4 mr-2" />
            Save Settings
          </Button>
        </CardContent>
      </Card>
    );
}

export default function VideoCallsPage() {
  const videoCallsService = new VideoCallsManagementService();
  const calls = videoCallsService.getCalls();
  const settings = videoCallsService.getSettings();
  const stats = videoCallsService.getStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Video Calls Management</h1>
          <p className="text-muted-foreground">Manage video call sessions and settings</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Call
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Calls</CardTitle>
            <Video className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCalls}</div>
            <p className="text-xs text-muted-foreground">
              {stats.activeCalls} active, {stats.completedCalls} completed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              ${stats.averagePrice.toFixed(2)} avg per call
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">HD Calls</CardTitle>
            <Monitor className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.hdCalls}</div>
            <p className="text-xs text-muted-foreground">
              High definition calls
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mobile Calls</CardTitle>
            <Smartphone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.mobileCalls}</div>
            <p className="text-xs text-muted-foreground">
              Mobile device calls
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="calls" className="space-y-4">
        <TabsList>
          <TabsTrigger value="calls">Calls</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="calls" className="space-y-4">
          {/* Search and Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search calls, creators, or subscribers..."
                      className="pl-10"
                    />
                  </div>
                </div>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
                <Button variant="outline">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Calls Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {calls.map((call) => {
              const callCard = new VideoCallCardComponent(call);
              return <div key={call.id}>{callCard.render()}</div>;
            })}
          </div>
        </TabsContent>

        <TabsContent value="settings">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <VideoCallSettingsComponent settings={settings} />
            </div>
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Quality Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Recording Rate</span>
                    <span className="font-medium">{stats.recordingRate.toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>HD Calls</span>
                    <span className="font-medium">{stats.hdCalls}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Mobile Calls</span>
                    <span className="font-medium">{stats.mobileCalls}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Quality Issues</span>
                    <span className="font-medium">{stats.qualityIssues}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Call Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Analytics dashboard coming soon...</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
