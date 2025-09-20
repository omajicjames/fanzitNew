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
  Webhook, 
  Zap, 
  Settings, 
  CheckCircle, 
  XCircle, 
  Clock, 
  AlertTriangle,
  Search, 
  Filter,
  MoreHorizontal,
  Eye,
  Plus,
  RefreshCw,
  ExternalLink,
  Activity,
  DollarSign,
  Users,
  FileText,
  Database,
  Mail,
  BarChart3,
  Globe,
  Server,
  Lock,
  Unlock,
  Play,
  Pause,
  RotateCcw,
  Target,
  Star,
  Download,
  Info,
  Copy,
  Trash2,
  Edit,
  PlayCircle,
  PauseCircle,
  AlertCircle,
  Key,
  Shield,
  EyeOff,
  RotateCcw as RotateIcon,
  Calendar,
  Hash
} from "lucide-react";

// ----------------------
// Integrations API Keys Page
// Location: /app/(protected)/admin/integrations/keys/page.tsx
// Purpose: Manage API keys for third-party integrations
// Features: Key management, rotation, security, usage tracking
// Layout: Cards on left, filters on right (matching finance page)
// ----------------------

interface APIKey {
  id: string;
  name: string;
  integration: string;
  keyType: 'public' | 'secret' | 'webhook' | 'oauth';
  keyValue: string;
  status: 'active' | 'inactive' | 'expired' | 'revoked';
  permissions: string[];
  lastUsed: string;
  usageCount: number;
  rateLimit: {
    requests: number;
    period: string;
  };
  expiresAt?: string;
  createdAt: string;
  updatedAt: string;
  environment: 'production' | 'staging' | 'development';
  security: {
    encrypted: boolean;
    rotationEnabled: boolean;
    lastRotated?: string;
    nextRotation?: string;
  };
}

class APIKeysService {
  private apiKeys: APIKey[] = [
    {
      id: '1',
      name: 'Stripe Secret Key',
      integration: 'Stripe Payment Processing',
      keyType: 'secret',
      keyValue: 'sk_live_51H***',
      status: 'active',
      permissions: ['payments:read', 'payments:write', 'customers:read', 'customers:write'],
      lastUsed: '2025-01-27T10:30:00Z',
      usageCount: 15420,
      rateLimit: {
        requests: 100,
        period: 'second'
      },
      expiresAt: '2025-12-31T23:59:59Z',
      createdAt: '2025-01-01T00:00:00Z',
      updatedAt: '2025-01-27T10:30:00Z',
      environment: 'production',
      security: {
        encrypted: true,
        rotationEnabled: true,
        lastRotated: '2025-01-15T00:00:00Z',
        nextRotation: '2025-02-15T00:00:00Z'
      }
    },
    {
      id: '2',
      name: 'SendGrid API Key',
      integration: 'SendGrid Email Service',
      keyType: 'secret',
      keyValue: 'SG.abc123***',
      status: 'active',
      permissions: ['mail:send', 'templates:read', 'stats:read'],
      lastUsed: '2025-01-27T09:15:00Z',
      usageCount: 8920,
      rateLimit: {
        requests: 600,
        period: 'minute'
      },
      createdAt: '2025-01-01T00:00:00Z',
      updatedAt: '2025-01-27T09:15:00Z',
      environment: 'production',
      security: {
        encrypted: true,
        rotationEnabled: false
      }
    },
    {
      id: '3',
      name: 'Google Analytics API Key',
      integration: 'Google Analytics 4',
      keyType: 'secret',
      keyValue: 'AIzaSy***',
      status: 'active',
      permissions: ['analytics:read', 'analytics:write'],
      lastUsed: '2025-01-27T08:45:00Z',
      usageCount: 25420,
      rateLimit: {
        requests: 10000,
        period: 'day'
      },
      createdAt: '2025-01-01T00:00:00Z',
      updatedAt: '2025-01-27T08:45:00Z',
      environment: 'production',
      security: {
        encrypted: true,
        rotationEnabled: true,
        lastRotated: '2025-01-10T00:00:00Z',
        nextRotation: '2025-02-10T00:00:00Z'
      }
    },
    {
      id: '4',
      name: 'AWS Access Key',
      integration: 'AWS S3 Storage',
      keyType: 'secret',
      keyValue: 'AKIA***',
      status: 'active',
      permissions: ['s3:GetObject', 's3:PutObject', 's3:DeleteObject'],
      lastUsed: '2025-01-27T11:00:00Z',
      usageCount: 32100,
      rateLimit: {
        requests: 3500,
        period: 'second'
      },
      createdAt: '2025-01-01T00:00:00Z',
      updatedAt: '2025-01-27T11:00:00Z',
      environment: 'production',
      security: {
        encrypted: true,
        rotationEnabled: true,
        lastRotated: '2025-01-20T00:00:00Z',
        nextRotation: '2025-02-20T00:00:00Z'
      }
    },
    {
      id: '5',
      name: 'Discord Bot Token',
      integration: 'Discord Bot Integration',
      keyType: 'secret',
      keyValue: 'ODc***',
      status: 'inactive',
      permissions: ['bot', 'messages:read', 'messages:write'],
      lastUsed: '2025-01-25T16:45:00Z',
      usageCount: 1200,
      rateLimit: {
        requests: 50,
        period: 'second'
      },
      createdAt: '2025-01-25T16:45:00Z',
      updatedAt: '2025-01-25T16:45:00Z',
      environment: 'staging',
      security: {
        encrypted: true,
        rotationEnabled: false
      }
    },
    {
      id: '6',
      name: 'HubSpot API Key',
      integration: 'HubSpot CRM',
      keyType: 'secret',
      keyValue: 'pat-na1***',
      status: 'active',
      permissions: ['contacts:read', 'contacts:write', 'deals:read', 'deals:write'],
      lastUsed: '2025-01-27T07:30:00Z',
      usageCount: 5600,
      rateLimit: {
        requests: 100,
        period: 'second'
      },
      createdAt: '2025-01-01T00:00:00Z',
      updatedAt: '2025-01-27T07:30:00Z',
      environment: 'production',
      security: {
        encrypted: true,
        rotationEnabled: true,
        lastRotated: '2025-01-05T00:00:00Z',
        nextRotation: '2025-02-05T00:00:00Z'
      }
    }
  ];

  public getAllKeys(): APIKey[] {
    return this.apiKeys;
  }

  public getKeysByStatus(status: string): APIKey[] {
    return this.apiKeys.filter(key => key.status === status);
  }

  public getKeysByIntegration(integration: string): APIKey[] {
    return this.apiKeys.filter(key => key.integration === integration);
  }

  public getKeysByType(keyType: string): APIKey[] {
    return this.apiKeys.filter(key => key.keyType === keyType);
  }

  public getKeysByEnvironment(environment: string): APIKey[] {
    return this.apiKeys.filter(key => key.environment === environment);
  }

  public getActiveKeys(): APIKey[] {
    return this.apiKeys.filter(key => key.status === 'active');
  }

  public getAPIKeyStats() {
    const total = this.apiKeys.length;
    const active = this.getActiveKeys().length;
    const expired = this.apiKeys.filter(k => k.status === 'expired').length;
    const revoked = this.apiKeys.filter(k => k.status === 'revoked').length;
    const totalUsage = this.apiKeys.reduce((sum, key) => sum + key.usageCount, 0);
    const rotationEnabled = this.apiKeys.filter(k => k.security.rotationEnabled).length;

    return {
      total,
      active,
      expired,
      revoked,
      totalUsage,
      rotationEnabled
    };
  }
}

// Professional API Key Card Component
function ProfessionalAPIKeyCard({ 
  apiKey, 
  onView, 
  onEdit, 
  onRotate, 
  onRevoke, 
  onMore 
}: { 
  apiKey: APIKey;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onRotate: (id: string) => void;
  onRevoke: (id: string) => void;
  onMore: (id: string) => void;
}) {
  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { variant: 'default' as const, icon: CheckCircle, text: 'Active', color: 'text-green-600' },
      inactive: { variant: 'secondary' as const, icon: PauseCircle, text: 'Inactive', color: 'text-gray-500' },
      expired: { variant: 'destructive' as const, icon: AlertTriangle, text: 'Expired', color: 'text-red-600' },
      revoked: { variant: 'destructive' as const, icon: XCircle, text: 'Revoked', color: 'text-red-600' }
    };
    return statusConfig[status as keyof typeof statusConfig] || statusConfig.inactive;
  };

  const getTypeBadge = (keyType: string) => {
    const typeConfig = {
      public: { variant: 'default' as const, text: 'Public', color: 'text-blue-600' },
      secret: { variant: 'secondary' as const, text: 'Secret', color: 'text-red-600' },
      webhook: { variant: 'secondary' as const, text: 'Webhook', color: 'text-purple-600' },
      oauth: { variant: 'secondary' as const, text: 'OAuth', color: 'text-green-600' }
    };
    return typeConfig[keyType as keyof typeof typeConfig] || typeConfig.secret;
  };

  const getEnvironmentBadge = (environment: string) => {
    const envConfig = {
      production: { variant: 'default' as const, text: 'Production', color: 'text-red-600' },
      staging: { variant: 'secondary' as const, text: 'Staging', color: 'text-yellow-600' },
      development: { variant: 'secondary' as const, text: 'Development', color: 'text-blue-600' }
    };
    return envConfig[environment as keyof typeof envConfig] || envConfig.development;
  };

  const getIntegrationIcon = (integration: string) => {
    if (integration.includes('Stripe')) return DollarSign;
    if (integration.includes('SendGrid')) return Mail;
    if (integration.includes('Google')) return BarChart3;
    if (integration.includes('AWS')) return Database;
    if (integration.includes('Discord')) return Users;
    if (integration.includes('HubSpot')) return Target;
    return Key;
  };

  const statusInfo = getStatusBadge(apiKey.status);
  const typeInfo = getTypeBadge(apiKey.keyType);
  const envInfo = getEnvironmentBadge(apiKey.environment);
  const IntegrationIcon = getIntegrationIcon(apiKey.integration);

  const isExpiringSoon = apiKey.expiresAt && new Date(apiKey.expiresAt) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

  return (
    <Card className="bg-admin-card border-line-soft hover:shadow-lg transition-all duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-surface-elev1 flex items-center justify-center">
              <IntegrationIcon className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <CardTitle className="text-lg flex items-center gap-2 text-text">
                {apiKey.name}
                <Badge variant="outline" className="text-xs">
                  {apiKey.integration}
                </Badge>
              </CardTitle>
              <CardDescription className="text-text-muted line-clamp-2">
                {apiKey.keyValue}
              </CardDescription>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant={typeInfo.variant} className="text-xs">
                  {typeInfo.text}
                </Badge>
                <Badge variant={envInfo.variant} className="text-xs">
                  {envInfo.text}
                </Badge>
                {apiKey.security.encrypted && (
                  <Badge variant="outline" className="text-xs">
                    <Lock className="h-3 w-3 mr-1" />
                    Encrypted
                  </Badge>
                )}
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Badge variant={statusInfo.variant} className="flex items-center gap-1">
              <statusInfo.icon className="h-3 w-3" />
              {statusInfo.text}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Usage Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-surface-elev1 rounded-lg">
            <div className="flex items-center justify-center gap-1 text-primary">
              <Activity className="h-4 w-4" />
              <span className="font-semibold">
                {apiKey.usageCount.toLocaleString()}
              </span>
            </div>
            <p className="text-xs text-text-muted">Total Usage</p>
          </div>
          <div className="text-center p-3 bg-surface-elev1 rounded-lg">
            <div className="flex items-center justify-center gap-1 text-green-600">
              <Hash className="h-4 w-4" />
              <span className="font-semibold">
                {apiKey.rateLimit.requests}/{apiKey.rateLimit.period}
              </span>
            </div>
            <p className="text-xs text-text-muted">Rate Limit</p>
          </div>
        </div>

        {/* Permissions */}
        <div className="flex flex-wrap gap-1">
          {apiKey.permissions.slice(0, 3).map((permission) => (
            <Badge key={permission} variant="secondary" className="text-xs">
              {permission}
            </Badge>
          ))}
          {apiKey.permissions.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{apiKey.permissions.length - 3} more
            </Badge>
          )}
        </div>

        {/* Last Used */}
        <div className="text-sm text-text-muted">
          Last used: {new Date(apiKey.lastUsed).toLocaleString()}
        </div>

        {/* Expiration Warning */}
        {isExpiringSoon && (
          <div className="text-sm text-yellow-600 flex items-center gap-1">
            <AlertTriangle className="h-4 w-4" />
            Expires soon: {apiKey.expiresAt && new Date(apiKey.expiresAt).toLocaleDateString()}
          </div>
        )}

        {/* Rotation Info */}
        {apiKey.security.rotationEnabled && apiKey.security.nextRotation && (
          <div className="text-sm text-text-muted">
            Next rotation: {new Date(apiKey.security.nextRotation).toLocaleDateString()}
          </div>
        )}
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => onView(apiKey.id)}
          >
            <Eye className="h-4 w-4 mr-1" />
            View
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => onEdit(apiKey.id)}
          >
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </Button>
          {apiKey.security.rotationEnabled && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onRotate(apiKey.id)}
            >
              <RotateIcon className="h-4 w-4 mr-1" />
              Rotate
            </Button>
          )}
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onMore(apiKey.id)}
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// API Keys Detail View Component (matching finance page layout)
function APIKeysDetailView({ 
  apiKeys, 
  selectedKeyId, 
  onKeySelect, 
  onView, 
  onEdit, 
  onRotate, 
  onRevoke, 
  onMore 
}: {
  apiKeys: APIKey[];
  selectedKeyId: string;
  onKeySelect: (id: string) => void;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onRotate: (id: string) => void;
  onRevoke: (id: string) => void;
  onMore: (id: string) => void;
}) {
  const selectedKey = apiKeys.find(k => k.id === selectedKeyId) || apiKeys[0];

  return (
    <div className="space-y-6">
      {/* Filter Section */}
      <SelectFilterSection
        title="Select API Key"
        placeholder="Choose an API key..."
        value={selectedKeyId || apiKeys[0]?.id}
        onValueChange={onKeySelect}
        options={apiKeys.map((apiKey) => {
          const getIntegrationIcon = (integration: string) => {
            if (integration.includes('Stripe')) return DollarSign;
            if (integration.includes('SendGrid')) return Mail;
            if (integration.includes('Google')) return BarChart3;
            if (integration.includes('AWS')) return Database;
            if (integration.includes('Discord')) return Users;
            if (integration.includes('HubSpot')) return Target;
            return Key;
          };
          const Icon = getIntegrationIcon(apiKey.integration);
          return {
            id: apiKey.id,
            label: apiKey.name,
            icon: <Icon className="h-4 w-4" />,
            status: apiKey.status
          };
        })}
      />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: API Key Cards */}
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {apiKeys.map((apiKey) => (
              <ProfessionalAPIKeyCard
                key={apiKey.id}
                apiKey={apiKey}
                onView={onView}
                onEdit={onEdit}
                onRotate={onRotate}
                onRevoke={onRevoke}
                onMore={onMore}
              />
            ))}
          </div>
        </div>

        {/* Right: Filters and Stats */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <Card className="bg-admin-card border-line-soft">
            <CardHeader>
              <CardTitle className="text-text">API Key Health</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-text-muted">Total Keys</span>
                <span className="text-2xl font-bold text-primary">{apiKeys.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-text-muted">Active</span>
                <span className="text-xl font-semibold text-green-600">
                  {apiKeys.filter(k => k.status === 'active').length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-text-muted">Expired</span>
                <span className="text-xl font-semibold text-red-600">
                  {apiKeys.filter(k => k.status === 'expired').length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-text-muted">Rotation Enabled</span>
                <span className="text-lg font-medium text-text">
                  {apiKeys.filter(k => k.security.rotationEnabled).length}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Status Filter */}
          <Card className="bg-admin-card border-line-soft">
            <CardHeader>
              <CardTitle className="text-text">Filter by Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {['active', 'inactive', 'expired', 'revoked'].map((status) => (
                  <Button
                    key={status}
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => console.log(`Filter by ${status}`)}
                  >
                    <span className="capitalize">{status}</span>
                    <Badge variant="secondary" className="ml-auto">
                      {apiKeys.filter(k => k.status === status).length}
                    </Badge>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Type Filter */}
          <Card className="bg-admin-card border-line-soft">
            <CardHeader>
              <CardTitle className="text-text">Filter by Type</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {['secret', 'public', 'webhook', 'oauth'].map((type) => (
                  <Button
                    key={type}
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => console.log(`Filter by ${type}`)}
                  >
                    <span className="capitalize">{type}</span>
                    <Badge variant="secondary" className="ml-auto">
                      {apiKeys.filter(k => k.keyType === type).length}
                    </Badge>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Environment Filter */}
          <Card className="bg-admin-card border-line-soft">
            <CardHeader>
              <CardTitle className="text-text">Filter by Environment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {['production', 'staging', 'development'].map((env) => (
                  <Button
                    key={env}
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => console.log(`Filter by ${env}`)}
                  >
                    <span className="capitalize">{env}</span>
                    <Badge variant="secondary" className="ml-auto">
                      {apiKeys.filter(k => k.environment === env).length}
                    </Badge>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-admin-card border-line-soft">
            <CardHeader>
              <CardTitle className="text-text">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full" onClick={() => console.log('Add API Key')}>
                <Plus className="h-4 w-4 mr-2" />
                Add API Key
              </Button>
              <Button variant="outline" className="w-full" onClick={() => console.log('Rotate All')}>
                <RotateIcon className="h-4 w-4 mr-2" />
                Rotate All
              </Button>
              <Button variant="outline" className="w-full" onClick={() => console.log('View Logs')}>
                <FileText className="h-4 w-4 mr-2" />
                View Logs
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function IntegrationsAPIKeysPage() {
  const apiKeysService = new APIKeysService();
  const allKeys = apiKeysService.getAllKeys();
  const stats = apiKeysService.getAPIKeyStats();

  const [selectedKeyId, setSelectedKeyId] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  // Filter keys based on search and filters
  const filteredKeys = allKeys.filter(key => {
    const matchesSearch = key.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         key.integration.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         key.keyValue.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || key.status === statusFilter;
    const matchesType = typeFilter === 'all' || key.keyType === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  useEffect(() => {
    if (filteredKeys.length > 0 && !selectedKeyId) {
      setSelectedKeyId(filteredKeys[0].id);
    }
  }, [filteredKeys, selectedKeyId]);

  const handleKeySelect = (id: string) => {
    setSelectedKeyId(id);
  };

  const handleView = (id: string) => {
    console.log('View API key:', id);
  };

  const handleEdit = (id: string) => {
    console.log('Edit API key:', id);
  };

  const handleRotate = (id: string) => {
    console.log('Rotate API key:', id);
  };

  const handleRevoke = (id: string) => {
    console.log('Revoke API key:', id);
  };

  const handleMore = (id: string) => {
    console.log('More actions for API key:', id);
  };

  const handleRefresh = () => {
    console.log('Refreshing API keys...');
  };

  const handleExport = () => {
    console.log('Exporting API keys...');
  };

  // Stats cards for the header
  const statsCards = (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard
        title="Total Keys"
        value={stats.total}
        growth={2.1}
        icon={Key}
        format="number"
      />
      <MetricCard
        title="Active Keys"
        value={stats.active}
        growth={12.5}
        icon={CheckCircle}
        format="number"
      />
      <MetricCard
        title="Expired Keys"
        value={stats.expired}
        growth={-5.2}
        icon={AlertTriangle}
        format="number"
      />
      <MetricCard
        title="Rotation Enabled"
        value={stats.rotationEnabled}
        growth={8.2}
        icon={RotateIcon}
        format="number"
      />
    </div>
  );

  // Filters for the header
  const filters = (
    <div className="flex items-center gap-2">
      <Select value={statusFilter} onValueChange={setStatusFilter}>
        <SelectTrigger className="w-40 bg-surface-elev2 border-line-soft text-text">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent className="bg-surface-elev2 border-line-soft">
          <SelectItem value="all" className="text-text hover:bg-surface-elev1">All Status</SelectItem>
          <SelectItem value="active" className="text-text hover:bg-surface-elev1">Active</SelectItem>
          <SelectItem value="inactive" className="text-text hover:bg-surface-elev1">Inactive</SelectItem>
          <SelectItem value="expired" className="text-text hover:bg-surface-elev1">Expired</SelectItem>
          <SelectItem value="revoked" className="text-text hover:bg-surface-elev1">Revoked</SelectItem>
        </SelectContent>
      </Select>
      <Select value={typeFilter} onValueChange={setTypeFilter}>
        <SelectTrigger className="w-40 bg-surface-elev2 border-line-soft text-text">
          <SelectValue placeholder="Type" />
        </SelectTrigger>
        <SelectContent className="bg-surface-elev2 border-line-soft">
          <SelectItem value="all" className="text-text hover:bg-surface-elev1">All Types</SelectItem>
          <SelectItem value="secret" className="text-text hover:bg-surface-elev1">Secret</SelectItem>
          <SelectItem value="public" className="text-text hover:bg-surface-elev1">Public</SelectItem>
          <SelectItem value="webhook" className="text-text hover:bg-surface-elev1">Webhook</SelectItem>
          <SelectItem value="oauth" className="text-text hover:bg-surface-elev1">OAuth</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );

  return (
    <AdminPageTemplate
      title="API Keys Management"
      description="Manage API keys for third-party integrations"
      icon={<Key className="h-6 w-6" />}
      searchPlaceholder="Search API keys by name, integration, or key value..."
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
      <APIKeysDetailView
        apiKeys={filteredKeys}
        selectedKeyId={selectedKeyId}
        onKeySelect={handleKeySelect}
        onView={handleView}
        onEdit={handleEdit}
        onRotate={handleRotate}
        onRevoke={handleRevoke}
        onMore={handleMore}
      />
    </AdminPageTemplate>
  );
}
