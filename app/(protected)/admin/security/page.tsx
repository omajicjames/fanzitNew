"use client";

import { AdminPillNavigationComponent } from "@src/components/admin/AdminPillNavigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@src/components/ui/card";
import { Badge } from "@src/components/ui/badge";
import { Button } from "@src/components/ui/button";
import { Input } from "@src/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@src/components/ui/tabs";
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
  RefreshCw
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

class SecurityEventCardComponent {
  private event: SecurityEvent;

  constructor(event: SecurityEvent) {
    this.event = event;
  }

  private getSeverityBadge() {
    const severityConfig = {
      low: { variant: 'secondary' as const, icon: CheckCircle, text: 'Low' },
      medium: { variant: 'default' as const, icon: AlertTriangle, text: 'Medium' },
      high: { variant: 'destructive' as const, icon: AlertTriangle, text: 'High' },
      critical: { variant: 'destructive' as const, icon: Ban, text: 'Critical' }
    };

    const config = severityConfig[this.event.severity];
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
      login: Unlock,
      logout: Lock,
      failed_login: Ban,
      permission_denied: Shield,
      data_access: Eye,
      suspicious_activity: AlertTriangle
    };

    const Icon = typeIcons[this.event.type];
    return <Icon className="h-4 w-4" />;
  }

  public render() {
    return (
      <Card className="bg-[var(--admin-card-bg)] border-neutral-700 hover:shadow-lg transition-shadow duration-200">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-[var(--admin-surface)] flex items-center justify-center">
                {this.getTypeIcon()}
              </div>
              <div className="flex-1 min-w-0">
                <CardTitle className="text-lg flex items-center gap-2 text-[var(--admin-text-primary)]">
                  {this.event.username}
                </CardTitle>
                <CardDescription className="line-clamp-2 text-[var(--admin-text-secondary)]">
                  {this.event.description}
                </CardDescription>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline" className="text-xs bg-[var(--admin-surface)] border-neutral-600 text-neutral-300">
                    {this.event.type.replace('_', ' ')}
                  </Badge>
                  <Badge variant="outline" className="text-xs bg-[var(--admin-surface)] border-neutral-600 text-neutral-300">
                    {this.event.location}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              {this.getSeverityBadge()}
              {this.event.resolved ? (
                <Badge variant="default" className="flex items-center gap-1 bg-green-600 text-[var(--admin-text-primary)]">
                  <CheckCircle className="h-3 w-3" />
                  Resolved
                </Badge>
              ) : (
                <Badge variant="secondary" className="flex items-center gap-1 bg-[var(--admin-surface)] text-neutral-300">
                  <Clock className="h-3 w-3" />
                  Pending
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Event Details */}
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-[var(--admin-surface)]/50 rounded-lg">
              <div className="flex items-center justify-center gap-1 text-blue-500">
                <Activity className="h-4 w-4" />
                <span className="font-semibold text-sm">{this.event.ipAddress}</span>
              </div>
              <p className="text-xs text-[var(--admin-text-secondary)]">IP Address</p>
            </div>
            <div className="text-center p-3 bg-[var(--admin-surface)]/50 rounded-lg">
              <div className="flex items-center justify-center gap-1 text-green-500">
                <Clock className="h-4 w-4" />
                <span className="font-semibold text-sm">
                  {new Date(this.event.timestamp).toLocaleTimeString()}
                </span>
              </div>
              <p className="text-xs text-[var(--admin-text-secondary)]">Time</p>
            </div>
          </div>

          {/* User Agent */}
          <div className="text-sm text-[var(--admin-text-secondary)] truncate">
            {this.event.userAgent}
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1 bg-[var(--admin-surface)] border-neutral-600 text-[var(--admin-text-primary)] hover:bg-[var(--admin-bg-alt)]">
              <Eye className="h-4 w-4 mr-1" />
              View Details
            </Button>
            {!this.event.resolved && (
              <Button variant="outline" size="sm" className="flex-1 bg-[var(--admin-surface)] border-neutral-600 text-[var(--admin-text-primary)] hover:bg-[var(--admin-bg-alt)]">
                <CheckCircle className="h-4 w-4 mr-1" />
                Resolve
              </Button>
            )}
            <Button variant="outline" size="sm" className="bg-[var(--admin-surface)] border-neutral-600 text-[var(--admin-text-primary)] hover:bg-[var(--admin-bg-alt)]">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }
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

export default function SecurityPage() {
  const securityService = new SecurityService();
  const allEvents = securityService.getAllSecurityEvents();
  const criticalEvents = securityService.getSecurityEventsBySeverity('critical');
  const highEvents = securityService.getSecurityEventsBySeverity('high');
  const unresolvedEvents = securityService.getUnresolvedEvents();
  const privacySettings = securityService.getPrivacySettings();
  const accessControls = securityService.getAccessControls();
  const stats = securityService.getSecurityStats();

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[var(--admin-text-primary)]">Security & Privacy</h1>
            <p className="text-[var(--admin-text-secondary)]">Monitor security events and manage privacy settings</p>
          </div>
          <Badge className="bg-orange-500 text-[var(--admin-text-primary)]">Super Admin</Badge>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-[var(--admin-text-primary)] mb-2">Security Overview</h2>
        <p className="text-[var(--admin-text-secondary)] mb-6">Security events, threats, and system status</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-[var(--admin-card-bg)] border border-neutral-700 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[var(--admin-text-secondary)] uppercase tracking-wide">Total Events</p>
                <p className="text-2xl font-bold text-[var(--admin-text-primary)]">{stats.totalEvents}</p>
                <div className="flex items-center gap-1 text-sm text-blue-500">
                  <Activity className="h-4 w-4" />
                  +8.2% from last week
                </div>
              </div>
              <Activity className="h-8 w-8 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-[var(--admin-card-bg)] border border-neutral-700 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[var(--admin-text-secondary)] uppercase tracking-wide">Critical Alerts</p>
                <p className="text-2xl font-bold text-[var(--admin-text-primary)]">{criticalEvents.length}</p>
                <div className="flex items-center gap-1 text-sm text-red-500">
                  <AlertTriangle className="h-4 w-4" />
                  Requires attention
                </div>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          </div>
          
          <div className="bg-[var(--admin-card-bg)] border border-neutral-700 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[var(--admin-text-secondary)] uppercase tracking-wide">Unresolved</p>
                <p className="text-2xl font-bold text-[var(--admin-text-primary)]">{unresolvedEvents.length}</p>
                <div className="flex items-center gap-1 text-sm text-orange-500">
                  <Clock className="h-4 w-4" />
                  Pending review
                </div>
              </div>
              <Clock className="h-8 w-8 text-orange-500" />
            </div>
          </div>
          
          <div className="bg-[var(--admin-card-bg)] border border-neutral-700 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[var(--admin-text-secondary)] uppercase tracking-wide">System Status</p>
                <p className="text-2xl font-bold text-[var(--admin-text-primary)]">Secure</p>
                <div className="flex items-center gap-1 text-sm text-green-500">
                  <CheckCircle className="h-4 w-4" />
                  All systems operational
                </div>
              </div>
              <Shield className="h-8 w-8 text-green-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Security Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="bg-[var(--admin-card-bg)] border-neutral-700">
          <CardHeader>
            <CardTitle className="text-[var(--admin-text-primary)] flex items-center gap-2">
              <Activity className="h-5 w-5 text-blue-500" />
              Security Events Timeline
            </CardTitle>
            <CardDescription className="text-[var(--admin-text-secondary)]">Security events over the last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-neutral-900/50 rounded-lg">
              <div className="text-center">
                <Activity className="h-12 w-12 text-[var(--admin-text-secondary)] mx-auto mb-2" />
                <p className="text-[var(--admin-text-secondary)]">Security events chart</p>
                <p className="text-sm text-neutral-500">Line chart showing security events over time</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[var(--admin-card-bg)] border-neutral-700">
          <CardHeader>
            <CardTitle className="text-[var(--admin-text-primary)] flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-500" />
              Threat Analysis
            </CardTitle>
            <CardDescription className="text-[var(--admin-text-secondary)]">Security threats and risk assessment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-neutral-900/50 rounded-lg">
              <div className="text-center">
                <Shield className="h-12 w-12 text-[var(--admin-text-secondary)] mx-auto mb-2" />
                <p className="text-[var(--admin-text-secondary)]">Threat analysis chart</p>
                <p className="text-sm text-neutral-500">Pie chart showing threat distribution</p>
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
            placeholder="Search security events..."
            className="pl-10 bg-[var(--admin-card-bg)] border-neutral-700 text-[var(--admin-text-primary)]"
          />
        </div>
        <Button variant="outline" className="flex items-center gap-2 bg-[var(--admin-card-bg)] border-neutral-700 text-[var(--admin-text-primary)] hover:bg-[var(--admin-surface)]">
          <Filter className="h-4 w-4" />
          Filters
        </Button>
        <Button variant="outline" className="flex items-center gap-2 bg-[var(--admin-card-bg)] border-neutral-700 text-[var(--admin-text-primary)] hover:bg-[var(--admin-surface)]">
          <Download className="h-4 w-4" />
          Export
        </Button>
      </div>


      {/* Security Tabs */}
      <Tabs defaultValue="events" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 bg-[var(--admin-card-bg)] border-neutral-700">
          <TabsTrigger value="events" className="data-[state=active]:bg-[var(--admin-surface)] data-[state=active]:text-[var(--admin-text-primary)] text-[var(--admin-text-secondary)]">Security Events</TabsTrigger>
          <TabsTrigger value="privacy" className="data-[state=active]:bg-[var(--admin-surface)] data-[state=active]:text-[var(--admin-text-primary)] text-[var(--admin-text-secondary)]">Privacy Settings</TabsTrigger>
          <TabsTrigger value="access" className="data-[state=active]:bg-[var(--admin-surface)] data-[state=active]:text-[var(--admin-text-primary)] text-[var(--admin-text-secondary)]">Access Control</TabsTrigger>
          <TabsTrigger value="compliance" className="data-[state=active]:bg-[var(--admin-surface)] data-[state=active]:text-[var(--admin-text-primary)] text-[var(--admin-text-secondary)]">Compliance</TabsTrigger>
        </TabsList>

        <TabsContent value="events" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {allEvents.map((event) => {
              const eventCard = new SecurityEventCardComponent(event);
              return <div key={event.id}>{eventCard.render()}</div>;
            })}
          </div>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {privacySettings.map((setting) => {
              const settingCard = new PrivacySettingCardComponent(setting);
              return <div key={setting.id}>{settingCard.render()}</div>;
            })}
          </div>
        </TabsContent>

        <TabsContent value="access" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Access Control Matrix</CardTitle>
              <CardDescription>Manage user permissions and resource access</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {accessControls.map((control) => (
                  <div key={control.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{control.user}</h4>
                      <p className="text-sm text-muted-foreground">
                        {control.resource} • {control.role}
                      </p>
                      <div className="flex gap-1 mt-1">
                        {control.permissions.map((permission) => (
                          <Badge key={permission} variant="outline" className="text-xs">
                            {permission}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={control.status === 'active' ? 'default' : 'secondary'}>
                        {control.status}
                      </Badge>
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Dashboard</CardTitle>
              <CardDescription>Track compliance with security standards and regulations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-muted/20 rounded-lg">
                <div className="text-center">
                  <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">Compliance dashboard placeholder</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
