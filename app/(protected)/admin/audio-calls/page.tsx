"use client";

import { AdminPillNavigationComponent } from "@src/components/admin/AdminPillNavigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@src/components/ui/card";
import { Badge } from "@src/components/ui/badge";
import { Button } from "@src/components/ui/button";
import { Input } from "@src/components/ui/input";
import { Switch } from "@src/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@src/components/ui/tabs";
import { 
  Phone, 
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
  Headphones,
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
  X
} from "lucide-react";

// ----------------------
// Audio Calls Management Page
// Location: /app/(protected)/admin/audio-calls/page.tsx
// Purpose: Comprehensive audio calls management and settings
// Features: Call management, settings, analytics, moderation
// Note: Mobile-first design with object-oriented structure
// ----------------------

interface AudioCall {
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
  recording_url?: string;
  notes?: string;
  admin_notes?: string;
  flags: string[];
  created_at: string;
  updated_at: string;
}

interface AudioCallSettings {
  audio_call_status: boolean;
  agora_app_id: string;
  audio_call_min_price_cents: number;
  audio_call_max_price_cents: number;
  audio_call_max_duration_minutes: number;
  recording_enabled: boolean;
  quality_settings: {
    audio_quality: 'low' | 'medium' | 'high';
    echo_cancellation: boolean;
    noise_suppression: boolean;
  };
  moderation_settings: {
    auto_moderation: boolean;
    profanity_filter: boolean;
    content_monitoring: boolean;
  };
}

interface AudioCallStats {
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
}

class AudioCallsManagementService {
  private calls: AudioCall[] = [];
  private settings!: AudioCallSettings;

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
        duration_minutes: 15,
        price_per_minute: 5.00,
        total_price: 75.00,
        scheduled_at: "2024-01-25T14:00:00Z",
        started_at: "2024-01-25T14:05:00Z",
        ended_at: "2024-01-25T14:20:00Z",
        call_quality: "excellent",
        recording_url: "/recordings/call-1.mp3",
        notes: "Great conversation about fitness tips",
        flags: [],
        created_at: "2024-01-25T13:30:00Z",
        updated_at: "2024-01-25T14:20:00Z"
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
        price_per_minute: 3.50,
        total_price: 0,
        scheduled_at: "2024-01-27T16:00:00Z",
        started_at: "2024-01-27T16:02:00Z",
        call_quality: "good",
        flags: [],
        created_at: "2024-01-27T15:30:00Z",
        updated_at: "2024-01-27T16:02:00Z"
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
        price_per_minute: 4.00,
        total_price: 0,
        scheduled_at: "2024-01-26T10:00:00Z",
        call_quality: "good",
        notes: "Subscriber cancelled 5 minutes before call",
        flags: [],
        created_at: "2024-01-26T09:30:00Z",
        updated_at: "2024-01-26T09:55:00Z"
      }
    ];
  }

  private initializeSettings() {
    this.settings = {
      audio_call_status: true,
      agora_app_id: "your-agora-app-id",
      audio_call_min_price_cents: 100, // $1.00
      audio_call_max_price_cents: 1000, // $10.00
      audio_call_max_duration_minutes: 60,
      recording_enabled: true,
      quality_settings: {
        audio_quality: "high",
        echo_cancellation: true,
        noise_suppression: true
      },
      moderation_settings: {
        auto_moderation: true,
        profanity_filter: true,
        content_monitoring: true
      }
    };
  }

  public getCalls(): AudioCall[] {
    return this.calls;
  }

  public getSettings(): AudioCallSettings {
    return this.settings;
  }

  public getStats(): AudioCallStats {
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
      recordingRate
    };
  }
}

class AudioCallCardComponent {
  private call: AudioCall;

  constructor(call: AudioCall) {
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

  public render() {
    return (
      <Card className="group hover:shadow-lg transition-all duration-200">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="space-y-1 flex-1">
              <CardTitle className="text-lg flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Audio Call Session
                {this.call.recording_url && (
                  <Badge variant="outline" className="text-xs">
                    <Volume2 className="h-3 w-3 mr-1" />
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
              {this.getQualityBadge()}
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
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

          {/* Call Quality */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Headphones className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Call Quality:</span>
              {this.getQualityBadge()}
            </div>
            {this.call.recording_url && (
              <div className="flex items-center gap-2">
                <Volume2 className="h-4 w-4 text-muted-foreground" />
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

function AudioCallSettingsComponent({ settings }: { settings: AudioCallSettings }) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Audio Call Settings
          </CardTitle>
          <CardDescription>
            Configure audio call functionality and quality settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Enable Audio Calls */}
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium">Enable Audio Calls</label>
              <p className="text-xs text-muted-foreground">
                Allow creators to offer audio calls to their fans
              </p>
            </div>
            <Switch checked={settings.audio_call_status} />
          </div>

          {/* Agora App ID */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Agora App ID</label>
            <Input
              value={settings.agora_app_id}
              placeholder="Enter your Agora App ID"
            />
            <p className="text-xs text-muted-foreground">
              Required for audio call functionality. Get this from your Agora Console.
            </p>
          </div>

          {/* Price Range */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Minimum Price ($)</label>
              <Input
                type="number"
                step="0.01"
                value={(settings.audio_call_min_price_cents / 100).toFixed(2)}
                placeholder="0.00"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Maximum Price ($)</label>
              <Input
                type="number"
                step="0.01"
                value={(settings.audio_call_max_price_cents / 100).toFixed(2)}
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
              max="120"
              value={settings.audio_call_max_duration_minutes}
              placeholder="60"
            />
            <p className="text-xs text-muted-foreground">
              Maximum duration for audio calls (1-120 minutes)
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
            </div>
          </div>

          {/* Moderation Settings */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium">Moderation Settings</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm">Auto Moderation</label>
                <Switch checked={settings.moderation_settings.auto_moderation} />
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm">Profanity Filter</label>
                <Switch checked={settings.moderation_settings.profanity_filter} />
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm">Content Monitoring</label>
                <Switch checked={settings.moderation_settings.content_monitoring} />
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

export default function AudioCallsPage() {
  const audioCallsService = new AudioCallsManagementService();
  const calls = audioCallsService.getCalls();
  const settings = audioCallsService.getSettings();
  const stats = audioCallsService.getStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Audio Calls Management</h1>
          <p className="text-muted-foreground">Manage audio call sessions and settings</p>
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
            <Phone className="h-4 w-4 text-muted-foreground" />
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
            <CardTitle className="text-sm font-medium">Avg Duration</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.averageDuration.toFixed(1)} min</div>
            <p className="text-xs text-muted-foreground">
              Per completed call
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Quality Issues</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.qualityIssues}</div>
            <p className="text-xs text-muted-foreground">
              Poor/fair quality calls
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
              const callCard = new AudioCallCardComponent(call);
              return <div key={call.id}>{callCard.render()}</div>;
            })}
          </div>
        </TabsContent>

        <TabsContent value="settings">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <AudioCallSettingsComponent settings={settings} />
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
                    <span>Top Creators</span>
                    <span className="font-medium">{stats.topCreators}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cancelled Calls</span>
                    <span className="font-medium">{stats.cancelledCalls}</span>
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
