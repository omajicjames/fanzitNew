"use client";

import { useState, useEffect } from "react";
import { AdminPageTemplate, MetricCard } from "@src/components/admin/AdminPageTemplate";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@src/components/ui/card";
import { Badge } from "@src/components/ui/badge";
import { Button } from "@src/components/ui/button";
import { Input } from "@src/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@src/components/ui/select";
import { 
  Lock, 
  Shield, 
  Eye, 
  EyeOff, 
  Key, 
  UserCheck, 
  AlertTriangle, 
  CheckCircle,
  Search, 
  Filter,
  MoreHorizontal,
  Settings,
  Activity,
  Clock,
  Ban,
  Unlock,
  FileText,
  Download,
  RefreshCw,
  Calendar,
  User,
  Globe,
  Crown,
  Building,
  RotateCcw,
  XSquare,
  ThumbsUp,
  Flag,
  DollarSign,
  Package,
  TrendingUp,
  BarChart3,
  Users
} from "lucide-react";

// ----------------------
// Security & Privacy Page
// Location: /app/(protected)/admin/security/page.tsx
// Purpose: Comprehensive security management for OnlyFans-like platform
// Features: Access control, privacy settings, security monitoring, compliance
// Note: Mobile-first design with object-oriented structure
// ----------------------

interface SecurityEvent {
  id: string;
  type: 'login' | 'logout' | 'failed_login' | 'permission_denied' | 'data_access' | 'suspicious_activity';
  userId: string;
  username: string;
  ipAddress: string;
  userAgent: string;
  timestamp: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  resolved: boolean;
  location: string;
}

interface PrivacySetting {
  id: string;
  category: 'data_collection' | 'data_sharing' | 'data_retention' | 'user_consent';
  name: string;
  description: string;
  enabled: boolean;
  required: boolean;
  lastUpdated: string;
  updatedBy: string;
}

interface AccessControl {
  id: string;
  resource: string;
  user: string;
  role: string;
  permissions: string[];
  grantedAt: string;
  expiresAt?: string;
  status: 'active' | 'expired' | 'revoked';
}

class SecurityService {
  private securityEvents: SecurityEvent[] = [
    {
      id: '1',
      type: 'failed_login',
      userId: 'user_123',
      username: 'suspicious_user',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      timestamp: '2025-01-27T10:30:00Z',
      severity: 'high',
      description: 'Multiple failed login attempts detected',
      resolved: false,
      location: 'New York, US'
    },
    {
      id: '2',
      type: 'data_access',
      userId: 'admin_001',
      username: 'admin_user',
      ipAddress: '192.168.1.50',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
      timestamp: '2025-01-27T09:15:00Z',
      severity: 'medium',
      description: 'Accessed user financial data',
      resolved: true,
      location: 'San Francisco, US'
    },
    {
      id: '3',
      type: 'suspicious_activity',
      userId: 'user_456',
      username: 'creator_xyz',
      ipAddress: '203.0.113.42',
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15',
      timestamp: '2025-01-27T08:45:00Z',
      severity: 'critical',
      description: 'Unusual data export pattern detected',
      resolved: false,
      location: 'Unknown'
    }
  ];

  private privacySettings: PrivacySetting[] = [
    {
      id: '1',
      category: 'data_collection',
      name: 'Analytics Data Collection',
      description: 'Collect anonymous usage analytics to improve platform performance',
      enabled: true,
      required: false,
      lastUpdated: '2025-01-20T14:30:00Z',
      updatedBy: 'admin'
    },
    {
      id: '2',
      category: 'data_sharing',
      name: 'Third-Party Data Sharing',
      description: 'Share anonymized data with trusted partners for business insights',
      enabled: false,
      required: false,
      lastUpdated: '2025-01-15T10:00:00Z',
      updatedBy: 'admin'
    },
    {
      id: '3',
      category: 'data_retention',
      name: 'Extended Data Retention',
      description: 'Retain user data for extended period for legal compliance',
      enabled: true,
      required: true,
      lastUpdated: '2025-01-10T16:45:00Z',
      updatedBy: 'admin'
    }
  ];

  private accessControls: AccessControl[] = [
    {
      id: '1',
      resource: 'user_management',
      user: 'admin_user',
      role: 'super_admin',
      permissions: ['read', 'write', 'delete'],
      grantedAt: '2025-01-01T00:00:00Z',
      status: 'active'
    },
    {
      id: '2',
      resource: 'financial_data',
      user: 'finance_manager',
      role: 'finance_admin',
      permissions: ['read', 'write'],
      grantedAt: '2025-01-15T09:00:00Z',
      expiresAt: '2025-07-15T09:00:00Z',
      status: 'active'
    }
  ];

  public getAllSecurityEvents(): SecurityEvent[] {
    return this.securityEvents;
  }

  public getSecurityEventsBySeverity(severity: string): SecurityEvent[] {
    return this.securityEvents.filter(event => event.severity === severity);
  }

  public getUnresolvedEvents(): SecurityEvent[] {
    return this.securityEvents.filter(event => !event.resolved);
  }

  public getPrivacySettings(): PrivacySetting[] {
    return this.privacySettings;
  }

  public getAccessControls(): AccessControl[] {
    return this.accessControls;
  }

  public getSecurityStats() {
    const totalEvents = this.securityEvents.length;
    const unresolvedEvents = this.getUnresolvedEvents().length;
    const criticalEvents = this.getSecurityEventsBySeverity('critical').length;
    const highEvents = this.getSecurityEventsBySeverity('high').length;

    return {
      totalEvents,
      unresolvedEvents,
      criticalEvents,
      highEvents,
      resolvedRate: ((totalEvents - unresolvedEvents) / totalEvents * 100).toFixed(1)
    };
  }
}

// ----------------------
// Professional Security Event Card Component
// Purpose: Displays security event information in a structured, professional layout
// Note: Similar to verification card with security-specific data
// ----------------------
function ProfessionalSecurityEventCard({
  event,
  onView,
  onEdit,
  onMore,
  className = ""
}: {
  event: SecurityEvent;
  onView?: () => void;
  onEdit?: () => void;
  onMore?: () => void;
  className?: string;
}) {
  const getSeverityBadge = () => {
    const severityConfig = {
      low: { variant: "secondary" as const, icon: CheckCircle, text: "Low", color: "text-green-600" },
      medium: { variant: "default" as const, icon: AlertTriangle, text: "Medium", color: "text-yellow-600" },
      high: { variant: "destructive" as const, icon: AlertTriangle, text: "High", color: "text-orange-600" },
      critical: { variant: "destructive" as const, icon: Ban, text: "Critical", color: "text-red-600" }
    };

    const config = severityConfig[event.severity];
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
      login: Unlock,
      logout: Lock,
      failed_login: Ban,
      permission_denied: Shield,
      data_access: Eye,
      suspicious_activity: AlertTriangle
    };

    const Icon = typeIcons[event.type];
    return <Icon className="h-4 w-4" />;
  };

  const getTypeBadge = () => {
    return (
      <Badge variant="outline" className="text-xs">
        {event.type.replace('_', ' ').toUpperCase()}
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
                {event.username}
                {getTypeBadge()}
              </CardTitle>
              <CardDescription className="text-text-muted">
                {event.description}
              </CardDescription>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-text">
              {event.severity.toUpperCase()}
            </div>
            <div className="text-sm text-text-muted">
              severity
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
              <span className="text-sm text-text-muted">Type:</span>
              <div className="mt-1">
                {getTypeBadge()}
              </div>
            </div>
            <div>
              <span className="text-sm text-text-muted">Severity:</span>
              <div className="mt-1">
                {getSeverityBadge()}
              </div>
            </div>
            <div>
              <span className="text-sm text-text-muted">Status:</span>
              <div className="mt-1">
                <Badge variant={event.resolved ? "default" : "secondary"} className="text-xs">
                  {event.resolved ? "RESOLVED" : "PENDING"}
                </Badge>
              </div>
            </div>
            <div>
              <span className="text-sm text-text-muted">Location:</span>
              <div className="mt-1">
                <Badge variant="outline" className="text-xs">
                  {event.location}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Network Information */}
        <div className="bg-surface-elev2 rounded-lg p-4 border border-line-soft">
          <div className="flex items-center gap-2 mb-3">
            <Activity className="h-5 w-5 text-text-muted" />
            <span className="font-medium text-text">Network Information</span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-muted">IP Address:</span>
              <span className="text-sm font-semibold text-text">{event.ipAddress}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-muted">User Agent:</span>
              <span className="text-sm text-text truncate max-w-48">{event.userAgent}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-muted">Location:</span>
              <span className="text-sm text-text">{event.location}</span>
            </div>
          </div>
        </div>

        {/* Timeline Information */}
        <div className="bg-surface-elev2 rounded-lg p-4 border border-line-soft">
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="h-5 w-5 text-text-muted" />
            <span className="font-medium text-text">Timeline</span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-muted">Timestamp:</span>
              <span className="text-sm text-text">
                {new Date(event.timestamp).toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-muted">Time:</span>
              <span className="text-sm text-text">
                {new Date(event.timestamp).toLocaleTimeString()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-muted">Date:</span>
              <span className="text-sm text-text">
                {new Date(event.timestamp).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        {/* User Information */}
        <div className="bg-surface-elev2 rounded-lg p-4 border border-line-soft">
          <div className="flex items-center gap-2 mb-3">
            <User className="h-5 w-5 text-text-muted" />
            <span className="font-medium text-text">User Information</span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-muted">User ID:</span>
              <span className="text-sm text-text">{event.userId}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-muted">Username:</span>
              <span className="text-sm text-text">{event.username}</span>
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
            View Details
          </Button>
          {!event.resolved && (
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1 bg-surface-elev2 border-line-soft text-text hover:bg-surface-elev1"
              onClick={onEdit}
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Resolve
            </Button>
          )}
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
// Security Detail View Component
// Purpose: Single card view with filtering and quick stats
// Note: Similar to verification page with security-specific data
// ----------------------
function SecurityDetailView({
  events,
  selectedEventId,
  onEventSelect,
  onView,
  onEdit,
  onMore,
  className = ""
}: {
  events: SecurityEvent[];
  selectedEventId?: string;
  onEventSelect?: (eventId: string) => void;
  onView?: (eventId: string) => void;
  onEdit?: (eventId: string) => void;
  onMore?: (eventId: string) => void;
  className?: string;
}) {
  const selectedEvent = events.find(e => e.id === selectedEventId) || events[0];

  const getSeverityBadge = (severity: string) => {
    const severityConfig = {
      low: { variant: "default" as const, color: "text-green-600", bgColor: "bg-green-100" },
      medium: { variant: "secondary" as const, color: "text-yellow-600", bgColor: "bg-yellow-100" },
      high: { variant: "destructive" as const, color: "text-orange-600", bgColor: "bg-orange-100" },
      critical: { variant: "destructive" as const, color: "text-red-600", bgColor: "bg-red-100" }
    };
    return severityConfig[severity as keyof typeof severityConfig] || severityConfig.low;
  };

  const getTypeIcon = () => {
    return <Shield className="h-4 w-4" />;
  };

  const severityInfo = getSeverityBadge(selectedEvent?.severity || 'low');

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Filter Section */}
      <div className="bg-surface-elev1 border border-line-soft rounded-lg p-4">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <label className="text-sm font-medium text-text-muted mb-2 block">Select Security Event</label>
            <Select value={selectedEventId || events[0]?.id} onValueChange={onEventSelect}>
              <SelectTrigger className="bg-surface-elev2 border-line-soft text-text">
                <SelectValue placeholder="Choose a security event..." />
              </SelectTrigger>
              <SelectContent className="bg-surface-elev2 border-line-soft">
                {events.map((event) => {
                  const Icon = getTypeIcon();
                  return (
                    <SelectItem 
                      key={event.id} 
                      value={event.id}
                      className="text-text hover:bg-surface-elev1"
                    >
                      <div className="flex items-center gap-2">
                        {Icon}
                        <span>{event.username} - {event.type.replace('_', ' ')}</span>
                        <Badge 
                          variant={event.severity === 'low' ? 'default' : 'destructive'}
                          className="text-xs"
                        >
                          {event.severity}
                        </Badge>
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Security Event Card */}
        <div className="lg:col-span-2">
          {selectedEvent ? (
            <ProfessionalSecurityEventCard
              event={selectedEvent}
              onView={() => onView?.(selectedEvent.id)}
              onEdit={() => onEdit?.(selectedEvent.id)}
              onMore={() => onMore?.(selectedEvent.id)}
            />
          ) : (
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 text-center">
              <Shield className="h-12 w-12 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-400">No security event selected</p>
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
              {/* Severity */}
              <div className="flex items-center justify-between p-3 bg-surface-elev2 rounded-lg">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-text-muted" />
                  <span className="text-sm font-medium text-text">Severity</span>
                </div>
                <div className={`px-2 py-1 rounded text-xs font-semibold ${severityInfo.bgColor} ${severityInfo.color}`}>
                  {selectedEvent?.severity?.toUpperCase() || 'N/A'}
                </div>
              </div>

              {/* Type */}
              <div className="flex items-center justify-between p-3 bg-surface-elev2 rounded-lg">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-text-muted" />
                  <span className="text-sm font-medium text-text">Type</span>
                </div>
                <span className="text-sm font-semibold text-text">
                  {selectedEvent?.type?.replace('_', ' ').toUpperCase() || 'N/A'}
                </span>
              </div>

              {/* Status */}
              <div className="flex items-center justify-between p-3 bg-surface-elev2 rounded-lg">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-text-muted" />
                  <span className="text-sm font-medium text-text">Status</span>
                </div>
                <span className="text-sm font-semibold text-text">
                  {selectedEvent?.resolved ? 'RESOLVED' : 'PENDING'}
                </span>
              </div>

              {/* IP Address */}
              <div className="flex items-center justify-between p-3 bg-surface-elev2 rounded-lg">
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-text-muted" />
                  <span className="text-sm font-medium text-text">IP Address</span>
                </div>
                <span className="text-sm font-semibold text-text">
                  {selectedEvent?.ipAddress || 'N/A'}
                </span>
              </div>

              {/* Location */}
              <div className="flex items-center justify-between p-3 bg-surface-elev2 rounded-lg">
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-text-muted" />
                  <span className="text-sm font-medium text-text">Location</span>
                </div>
                <span className="text-sm font-semibold text-text">
                  {selectedEvent?.location || 'N/A'}
                </span>
              </div>

              {/* Username */}
              <div className="flex items-center justify-between p-3 bg-surface-elev2 rounded-lg">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-text-muted" />
                  <span className="text-sm font-medium text-text">Username</span>
                </div>
                <span className="text-sm font-semibold text-text">
                  {selectedEvent?.username || 'N/A'}
                </span>
              </div>

              {/* Timestamp */}
              <div className="flex items-center justify-between p-3 bg-surface-elev2 rounded-lg">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-text-muted" />
                  <span className="text-sm font-medium text-text">Timestamp</span>
                </div>
                <span className="text-sm text-text-muted">
                  {selectedEvent?.timestamp ? new Date(selectedEvent.timestamp).toLocaleString() : 'N/A'}
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
                View Event Details
              </Button>
              {!selectedEvent?.resolved && (
                <Button 
                  variant="outline" 
                  className="w-full bg-surface-elev2 border-line-soft text-text hover:bg-surface-elev1"
                  onClick={() => onEdit?.(selectedEvent?.id || '')}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Resolve Event
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

class PrivacySettingCardComponent {
  private setting: PrivacySetting;

  constructor(setting: PrivacySetting) {
    this.setting = setting;
  }

  private getCategoryBadge() {
    const categoryConfig = {
      data_collection: { variant: 'default' as const, text: 'Data Collection' },
      data_sharing: { variant: 'secondary' as const, text: 'Data Sharing' },
      data_retention: { variant: 'destructive' as const, text: 'Data Retention' },
      user_consent: { variant: 'outline' as const, text: 'User Consent' }
    };

    const config = categoryConfig[this.setting.category];
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
            <div className="flex-1">
              <CardTitle className="text-lg flex items-center gap-2">
                {this.setting.name}
                {this.setting.required && (
                  <Badge variant="destructive" className="text-xs">
                    Required
                  </Badge>
                )}
              </CardTitle>
              <CardDescription className="line-clamp-2">
                {this.setting.description}
              </CardDescription>
              <div className="flex items-center gap-2 mt-2">
                {this.getCategoryBadge()}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${
                this.setting.enabled ? 'bg-green-500' : 'bg-red-500'
              }`} />
              <span className="text-sm font-medium">
                {this.setting.enabled ? 'Enabled' : 'Disabled'}
              </span>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="text-sm text-muted-foreground">
            Last updated: {new Date(this.setting.lastUpdated).toLocaleDateString()} by {this.setting.updatedBy}
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1">
              <Settings className="h-4 w-4 mr-1" />
              Configure
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              <FileText className="h-4 w-4 mr-1" />
              View Policy
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
// Security Page Client Component
// Purpose: Manages state and interactions for the security page
// ----------------------
function SecurityPageClient() {
  const [selectedEventId, setSelectedEventId] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [severityFilter, setSeverityFilter] = useState('all');

  const securityService = new SecurityService();
  const allEvents = securityService.getAllSecurityEvents();
  const stats = securityService.getSecurityStats();

  // Filter events based on search and severity
  const filteredEvents = allEvents.filter(event => {
    const matchesSearch = event.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeverity = severityFilter === 'all' || event.severity === severityFilter;
    return matchesSearch && matchesSeverity;
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
    console.log('View security event:', eventId);
  };

  const handleEdit = (eventId: string) => {
    console.log('Edit security event:', eventId);
  };

  const handleMore = (eventId: string) => {
    console.log('More actions for security event:', eventId);
  };

  const handleRefresh = () => {
    console.log('Refresh security events');
  };

  const handleExportAll = () => {
    console.log('Export all security events');
  };

  const statsCards = (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard
        title="Total Events"
        value={stats.totalEvents}
        growth={8.2}
        icon={Activity}
        format="number"
      />
      <MetricCard
        title="Critical Alerts"
        value={stats.criticalEvents}
        growth={0}
        icon={AlertTriangle}
        format="number"
      />
      <MetricCard
        title="Unresolved Events"
        value={stats.unresolvedEvents}
        growth={0}
        icon={Clock}
        format="number"
      />
      <MetricCard
        title="Resolved Rate"
        value={parseFloat(stats.resolvedRate)}
        growth={0}
        icon={CheckCircle}
        format="percentage"
      />
    </div>
  );

  const filters = (
    <div className="flex items-center gap-2">
      <Select value={severityFilter} onValueChange={setSeverityFilter}>
        <SelectTrigger className="w-40 bg-surface-elev2 border-line-soft text-text">
          <SelectValue placeholder="Severity" />
        </SelectTrigger>
        <SelectContent className="bg-surface-elev2 border-line-soft">
          <SelectItem value="all" className="text-text hover:bg-surface-elev1">All Severity</SelectItem>
          <SelectItem value="low" className="text-text hover:bg-surface-elev1">Low</SelectItem>
          <SelectItem value="medium" className="text-text hover:bg-surface-elev1">Medium</SelectItem>
          <SelectItem value="high" className="text-text hover:bg-surface-elev1">High</SelectItem>
          <SelectItem value="critical" className="text-text hover:bg-surface-elev1">Critical</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );

  return (
    <AdminPageTemplate
      title="Security & Privacy Management"
      description="Monitor security events, threats, and system status"
      icon={<Shield className="h-6 w-6" />}
      searchPlaceholder="Search security events, usernames, or descriptions..."
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
      <SecurityDetailView
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

export default function SecurityPage() {
  return <SecurityPageClient />;
}
