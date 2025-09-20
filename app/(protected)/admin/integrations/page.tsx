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
  Edit,
  Trash2,
  Plus,
  RefreshCw,
  ExternalLink,
  Key,
  Activity,
  DollarSign,
  Users,
  FileText,
  Shield,
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
  Target
} from "lucide-react";

// ----------------------
// Integrations Page
// Location: /app/(protected)/admin/integrations/page.tsx
// Purpose: Comprehensive integrations management with finance page layout
// Features: Third-party integrations, API management, webhook configuration
// Layout: Cards on left, filters on right (matching finance page)
// ----------------------

interface Integration {
  id: string;
  name: string;
  type: 'payment' | 'analytics' | 'communication' | 'storage' | 'social' | 'crm';
  provider: string;
  status: 'active' | 'inactive' | 'error' | 'pending';
  description: string;
  lastSync: string;
  apiKey?: string;
  webhookUrl?: string;
  features: string[];
  pricing: 'free' | 'paid' | 'enterprise';
  version: string;
  icon: string;
  health: 'healthy' | 'warning' | 'error';
  usage: {
    requests: number;
    limit: number;
    resetDate: string;
  };
}

interface WebhookEvent {
  id: string;
  integration: string;
  event: string;
  status: 'success' | 'failed' | 'pending';
  timestamp: string;
  payload: any;
  response?: string;
  retryCount: number;
}

class IntegrationsService {
  private integrations: Integration[] = [
    {
      id: '1',
      name: 'Stripe Payment Processing',
      type: 'payment',
      provider: 'Stripe',
      status: 'active',
      description: 'Process payments and subscriptions for creators',
      lastSync: '2025-01-27T10:30:00Z',
      apiKey: 'sk_live_***',
      webhookUrl: 'https://api.fanzit.com/webhooks/stripe',
      features: ['payments', 'subscriptions', 'refunds', 'payouts'],
      pricing: 'paid',
      version: '2023-10-26',
      icon: '💳',
      health: 'healthy',
      usage: {
        requests: 15420,
        limit: 100000,
        resetDate: '2025-02-01T00:00:00Z'
      }
    },
    {
      id: '2',
      name: 'Google Analytics',
      type: 'analytics',
      provider: 'Google',
      status: 'active',
      description: 'Track user behavior and platform analytics',
      lastSync: '2025-01-27T09:15:00Z',
      apiKey: 'GA_***',
      features: ['page_views', 'user_tracking', 'conversion_analytics'],
      pricing: 'free',
      version: 'GA4',
      icon: '📊',
      health: 'healthy',
      usage: {
        requests: 8920,
        limit: 50000,
        resetDate: '2025-02-01T00:00:00Z'
      }
    },
    {
      id: '3',
      name: 'SendGrid Email Service',
      type: 'communication',
      provider: 'SendGrid',
      status: 'error',
      description: 'Send transactional and marketing emails',
      lastSync: '2025-01-26T14:20:00Z',
      apiKey: 'SG_***',
      features: ['email_sending', 'templates', 'analytics'],
      pricing: 'paid',
      version: 'v3',
      icon: '📧',
      health: 'error',
      usage: {
        requests: 0,
        limit: 100000,
        resetDate: '2025-02-01T00:00:00Z'
      }
    },
    {
      id: '4',
      name: 'AWS S3 Storage',
      type: 'storage',
      provider: 'Amazon Web Services',
      status: 'active',
      description: 'Store and serve media files and content',
      lastSync: '2025-01-27T11:00:00Z',
      apiKey: 'AKIA***',
      features: ['file_storage', 'cdn', 'backup'],
      pricing: 'paid',
      version: 'v2',
      icon: '☁️',
      health: 'healthy',
      usage: {
        requests: 25420,
        limit: 1000000,
        resetDate: '2025-02-01T00:00:00Z'
      }
    },
    {
      id: '5',
      name: 'Discord Bot Integration',
      type: 'communication',
      provider: 'Discord',
      status: 'pending',
      description: 'Community management and notifications',
      lastSync: '2025-01-25T16:45:00Z',
      apiKey: 'DISCORD_***',
      features: ['notifications', 'community_management', 'moderation'],
      pricing: 'free',
      version: 'v1.2',
      icon: '💬',
      health: 'warning',
      usage: {
        requests: 1200,
        limit: 10000,
        resetDate: '2025-02-01T00:00:00Z'
      }
    },
    {
      id: '6',
      name: 'HubSpot CRM',
      type: 'crm',
      provider: 'HubSpot',
      status: 'active',
      description: 'Customer relationship management and lead tracking',
      lastSync: '2025-01-27T08:30:00Z',
      apiKey: 'HUBSPOT_***',
      features: ['lead_tracking', 'contact_management', 'sales_pipeline'],
      pricing: 'paid',
      version: 'v3',
      icon: '🎯',
      health: 'healthy',
      usage: {
        requests: 5600,
        limit: 50000,
        resetDate: '2025-02-01T00:00:00Z'
      }
    }
  ];

  private webhookEvents: WebhookEvent[] = [
    {
      id: '1',
      integration: 'Stripe Payment Processing',
      event: 'payment.succeeded',
      status: 'success',
      timestamp: '2025-01-27T10:30:00Z',
      payload: { amount: 29.99, currency: 'usd' },
      retryCount: 0
    },
    {
      id: '2',
      integration: 'SendGrid Email Service',
      event: 'email.sent',
      status: 'failed',
      timestamp: '2025-01-27T09:45:00Z',
      payload: { to: 'user@example.com', template: 'welcome' },
      response: 'Invalid API key',
      retryCount: 3
    },
    {
      id: '3',
      integration: 'Google Analytics',
      event: 'event.tracked',
      status: 'success',
      timestamp: '2025-01-27T09:15:00Z',
      payload: { event: 'page_view', page: '/dashboard' },
      retryCount: 0
    }
  ];

  public getAllIntegrations(): Integration[] {
    return this.integrations;
  }

  public getIntegrationsByType(type: string): Integration[] {
    return this.integrations.filter(integration => integration.type === type);
  }

  public getIntegrationsByStatus(status: string): Integration[] {
    return this.integrations.filter(integration => integration.status === status);
  }

  public getActiveIntegrations(): Integration[] {
    return this.integrations.filter(integration => integration.status === 'active');
  }

  public getWebhookEvents(): WebhookEvent[] {
    return this.webhookEvents;
  }

  public getIntegrationStats() {
    const total = this.integrations.length;
    const active = this.getActiveIntegrations().length;
    const errors = this.integrations.filter(i => i.status === 'error').length;
    const healthy = this.integrations.filter(i => i.health === 'healthy').length;

    return {
      total,
      active,
      errors,
      healthy,
      healthRate: ((healthy / total) * 100).toFixed(1)
    };
  }
}

// Professional Integration Card Component
function ProfessionalIntegrationCard({ 
  integration, 
  onView, 
  onConfigure, 
  onMore 
}: { 
  integration: Integration;
  onView: (id: string) => void;
  onConfigure: (id: string) => void;
  onMore: (id: string) => void;
}) {
  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { variant: 'default' as const, icon: CheckCircle, text: 'Active', color: 'text-green-600' },
      inactive: { variant: 'secondary' as const, icon: XCircle, text: 'Inactive', color: 'text-gray-500' },
      error: { variant: 'destructive' as const, icon: AlertTriangle, text: 'Error', color: 'text-red-600' },
      pending: { variant: 'secondary' as const, icon: Clock, text: 'Pending', color: 'text-yellow-600' }
    };
    return statusConfig[status as keyof typeof statusConfig] || statusConfig.inactive;
  };

  const getHealthBadge = (health: string) => {
    const healthConfig = {
      healthy: { variant: 'default' as const, text: 'Healthy', color: 'text-green-600' },
      warning: { variant: 'secondary' as const, text: 'Warning', color: 'text-yellow-600' },
      error: { variant: 'destructive' as const, text: 'Error', color: 'text-red-600' }
    };
    return healthConfig[health as keyof typeof healthConfig] || healthConfig.healthy;
  };

  const getTypeIcon = (type: string) => {
    const typeIcons = {
      payment: DollarSign,
      analytics: BarChart3,
      communication: Mail,
      storage: Database,
      social: Users,
      crm: Target
    };
    return typeIcons[type as keyof typeof typeIcons] || Webhook;
  };

  const statusInfo = getStatusBadge(integration.status);
  const healthInfo = getHealthBadge(integration.health);
  const TypeIcon = getTypeIcon(integration.type);
  const usagePercentage = Math.round((integration.usage.requests / integration.usage.limit) * 100);

  return (
    <Card className="bg-admin-card border-line-soft hover:shadow-lg transition-all duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-surface-elev1 flex items-center justify-center text-2xl">
              {integration.icon}
            </div>
            <div className="flex-1 min-w-0">
              <CardTitle className="text-lg flex items-center gap-2 text-text">
                {integration.name}
                <Badge variant="outline" className="text-xs">
                  {integration.provider}
                </Badge>
              </CardTitle>
              <CardDescription className="text-text-muted line-clamp-2">
                {integration.description}
              </CardDescription>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="outline" className="text-xs">
                  {integration.pricing}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  v{integration.version}
                </Badge>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Badge variant={statusInfo.variant} className="flex items-center gap-1">
              <statusInfo.icon className="h-3 w-3" />
              {statusInfo.text}
            </Badge>
            <Badge variant={healthInfo.variant} className="text-xs">
              {healthInfo.text}
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
                {integration.usage.requests.toLocaleString()}
              </span>
            </div>
            <p className="text-xs text-text-muted">API Calls</p>
          </div>
          <div className="text-center p-3 bg-surface-elev1 rounded-lg">
            <div className="flex items-center justify-center gap-1 text-green-600">
              <Zap className="h-4 w-4" />
              <span className="font-semibold">{usagePercentage}%</span>
            </div>
            <p className="text-xs text-text-muted">Usage</p>
          </div>
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-1">
          {integration.features.slice(0, 3).map((feature) => (
            <Badge key={feature} variant="secondary" className="text-xs">
              {feature.replace('_', ' ')}
            </Badge>
          ))}
          {integration.features.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{integration.features.length - 3} more
            </Badge>
          )}
        </div>

        {/* Last Sync */}
        <div className="text-sm text-text-muted">
          Last sync: {new Date(integration.lastSync).toLocaleString()}
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => onView(integration.id)}
          >
            <Eye className="h-4 w-4 mr-1" />
            View
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => onConfigure(integration.id)}
          >
            <Settings className="h-4 w-4 mr-1" />
            Configure
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onMore(integration.id)}
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// Integration Detail View Component (matching finance page layout)
function IntegrationDetailView({ 
  integrations, 
  selectedIntegrationId, 
  onIntegrationSelect, 
  onView, 
  onConfigure, 
  onMore 
}: {
  integrations: Integration[];
  selectedIntegrationId: string;
  onIntegrationSelect: (id: string) => void;
  onView: (id: string) => void;
  onConfigure: (id: string) => void;
  onMore: (id: string) => void;
}) {
  const selectedIntegration = integrations.find(i => i.id === selectedIntegrationId) || integrations[0];

  return (
    <div className="space-y-6">
      {/* Filter Section */}
      <SelectFilterSection
        title="Select Integration"
        placeholder="Choose an integration..."
        value={selectedIntegrationId || integrations[0]?.id}
        onValueChange={onIntegrationSelect}
        options={integrations.map((integration) => {
          const typeIcons = {
            payment: DollarSign,
            analytics: BarChart3,
            communication: Mail,
            storage: Database,
            social: Users,
            crm: Target
          };
          const Icon = typeIcons[integration.type as keyof typeof typeIcons] || Webhook;
          return {
            id: integration.id,
            label: integration.name,
            icon: <Icon className="h-4 w-4" />,
            status: integration.status
          };
        })}
      />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Integration Cards */}
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {integrations.map((integration) => (
              <ProfessionalIntegrationCard
                key={integration.id}
                integration={integration}
                onView={onView}
                onConfigure={onConfigure}
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
              <CardTitle className="text-text">Integration Health</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-text-muted">Total Integrations</span>
                <span className="text-2xl font-bold text-primary">{integrations.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-text-muted">Active</span>
                <span className="text-xl font-semibold text-green-600">
                  {integrations.filter(i => i.status === 'active').length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-text-muted">Errors</span>
                <span className="text-xl font-semibold text-red-600">
                  {integrations.filter(i => i.status === 'error').length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-text-muted">Health Rate</span>
                <span className="text-lg font-medium text-text">
                  {Math.round((integrations.filter(i => i.health === 'healthy').length / integrations.length) * 100)}%
                </span>
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
                {['payment', 'analytics', 'communication', 'storage', 'social', 'crm'].map((type) => (
                  <Button
                    key={type}
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => console.log(`Filter by ${type}`)}
                  >
                    <span className="capitalize">{type}</span>
                    <Badge variant="secondary" className="ml-auto">
                      {integrations.filter(i => i.type === type).length}
                    </Badge>
                  </Button>
                ))}
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
                {['active', 'inactive', 'error', 'pending'].map((status) => (
                  <Button
                    key={status}
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => console.log(`Filter by ${status}`)}
                  >
                    <span className="capitalize">{status}</span>
                    <Badge variant="secondary" className="ml-auto">
                      {integrations.filter(i => i.status === status).length}
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
              <Button className="w-full" onClick={() => console.log('Add Integration')}>
                <Plus className="h-4 w-4 mr-2" />
                Add Integration
              </Button>
              <Button variant="outline" className="w-full" onClick={() => console.log('Refresh All')}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh All
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

export default function IntegrationsPage() {
  const integrationsService = new IntegrationsService();
  const allIntegrations = integrationsService.getAllIntegrations();
  const stats = integrationsService.getIntegrationStats();

  const [selectedIntegrationId, setSelectedIntegrationId] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  // Filter integrations based on search and filters
  const filteredIntegrations = allIntegrations.filter(integration => {
    const matchesSearch = integration.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         integration.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         integration.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || integration.status === statusFilter;
    const matchesType = typeFilter === 'all' || integration.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  useEffect(() => {
    if (filteredIntegrations.length > 0 && !selectedIntegrationId) {
      setSelectedIntegrationId(filteredIntegrations[0].id);
    }
  }, [filteredIntegrations, selectedIntegrationId]);

  const handleIntegrationSelect = (id: string) => {
    setSelectedIntegrationId(id);
  };

  const handleView = (id: string) => {
    console.log('View integration:', id);
  };

  const handleConfigure = (id: string) => {
    console.log('Configure integration:', id);
  };

  const handleMore = (id: string) => {
    console.log('More actions for integration:', id);
  };

  const handleRefresh = () => {
    console.log('Refreshing integrations...');
  };

  const handleExport = () => {
    console.log('Exporting integrations...');
  };

  // Stats cards for the header
  const statsCards = (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard
        title="Total Integrations"
        value={stats.total}
        growth={2.1}
        icon={Webhook}
        format="number"
      />
      <MetricCard
        title="Active Integrations"
        value={stats.active}
        growth={12.5}
        icon={CheckCircle}
        format="number"
      />
      <MetricCard
        title="Error Count"
        value={stats.errors}
        growth={-5.2}
        icon={AlertTriangle}
        format="number"
      />
      <MetricCard
        title="Health Rate"
        value={`${stats.healthRate}%`}
        growth={5.2}
        icon={Activity}
        format="percentage"
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
          <SelectItem value="error" className="text-text hover:bg-surface-elev1">Error</SelectItem>
          <SelectItem value="pending" className="text-text hover:bg-surface-elev1">Pending</SelectItem>
        </SelectContent>
      </Select>
      <Select value={typeFilter} onValueChange={setTypeFilter}>
        <SelectTrigger className="w-40 bg-surface-elev2 border-line-soft text-text">
          <SelectValue placeholder="Type" />
        </SelectTrigger>
        <SelectContent className="bg-surface-elev2 border-line-soft">
          <SelectItem value="all" className="text-text hover:bg-surface-elev1">All Types</SelectItem>
          <SelectItem value="payment" className="text-text hover:bg-surface-elev1">Payment</SelectItem>
          <SelectItem value="analytics" className="text-text hover:bg-surface-elev1">Analytics</SelectItem>
          <SelectItem value="communication" className="text-text hover:bg-surface-elev1">Communication</SelectItem>
          <SelectItem value="storage" className="text-text hover:bg-surface-elev1">Storage</SelectItem>
          <SelectItem value="social" className="text-text hover:bg-surface-elev1">Social</SelectItem>
          <SelectItem value="crm" className="text-text hover:bg-surface-elev1">CRM</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );

  return (
    <AdminPageTemplate
      title="Integrations Management"
      description="Manage third-party integrations and API connections"
      icon={<Webhook className="h-6 w-6" />}
      searchPlaceholder="Search integrations by name, provider, or description..."
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
      <IntegrationDetailView
        integrations={filteredIntegrations}
        selectedIntegrationId={selectedIntegrationId}
        onIntegrationSelect={handleIntegrationSelect}
        onView={handleView}
        onConfigure={handleConfigure}
        onMore={handleMore}
      />
    </AdminPageTemplate>
  );
}