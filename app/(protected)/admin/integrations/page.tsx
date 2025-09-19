"use client";

import { AdminPillNavigationComponent } from "@src/components/admin/AdminPillNavigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@src/components/ui/card";
import { Badge } from "@src/components/ui/badge";
import { Button } from "@src/components/ui/button";
import { Input } from "@src/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@src/components/ui/tabs";
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
  FileText
} from "lucide-react";

// ----------------------
// Integrations Page
// Location: /app/(protected)/admin/integrations/page.tsx
// Purpose: Comprehensive integrations management for OnlyFans-like platform
// Features: Third-party integrations, API management, webhook configuration
// Note: Mobile-first design with object-oriented structure
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

class IntegrationCardComponent {
  private integration: Integration;

  constructor(integration: Integration) {
    this.integration = integration;
  }

  private getStatusBadge() {
    const statusConfig = {
      active: { variant: 'default' as const, icon: CheckCircle, text: 'Active' },
      inactive: { variant: 'secondary' as const, icon: XCircle, text: 'Inactive' },
      error: { variant: 'destructive' as const, icon: AlertTriangle, text: 'Error' },
      pending: { variant: 'secondary' as const, icon: Clock, text: 'Pending' }
    };

    const config = statusConfig[this.integration.status];
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {config.text}
      </Badge>
    );
  }

  private getHealthBadge() {
    const healthConfig = {
      healthy: { variant: 'default' as const, text: 'Healthy' },
      warning: { variant: 'secondary' as const, text: 'Warning' },
      error: { variant: 'destructive' as const, text: 'Error' }
    };

    const config = healthConfig[this.integration.health];
    return (
      <Badge variant={config.variant} className="text-xs">
        {config.text}
      </Badge>
    );
  }

  private getPricingBadge() {
    const pricingConfig = {
      free: { variant: 'default' as const, text: 'Free' },
      paid: { variant: 'secondary' as const, text: 'Paid' },
      enterprise: { variant: 'destructive' as const, text: 'Enterprise' }
    };

    const config = pricingConfig[this.integration.pricing];
    return (
      <Badge variant={config.variant} className="text-xs">
        {config.text}
      </Badge>
    );
  }

  public render() {
    return (
      <Card className="bg-neutral-800 border-neutral-700 hover:shadow-lg transition-shadow duration-200">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-neutral-700 flex items-center justify-center text-2xl">
                {this.integration.icon}
              </div>
              <div className="flex-1 min-w-0">
                <CardTitle className="text-lg flex items-center gap-2 text-white">
                  {this.integration.name}
                </CardTitle>
                <CardDescription className="line-clamp-2 text-neutral-400">
                  {this.integration.description}
                </CardDescription>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline" className="text-xs bg-neutral-700 border-neutral-600 text-neutral-300">
                    {this.integration.provider}
                  </Badge>
                  {this.getPricingBadge()}
                  <Badge variant="outline" className="text-xs bg-neutral-700 border-neutral-600 text-neutral-300">
                    v{this.integration.version}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              {this.getStatusBadge()}
              {this.getHealthBadge()}
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Usage Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-neutral-700/50 rounded-lg">
              <div className="flex items-center justify-center gap-1 text-blue-500">
                <Activity className="h-4 w-4" />
                <span className="font-semibold">
                  {this.integration.usage.requests.toLocaleString()}
                </span>
              </div>
              <p className="text-xs text-neutral-400">API Calls</p>
            </div>
            <div className="text-center p-3 bg-neutral-700/50 rounded-lg">
              <div className="flex items-center justify-center gap-1 text-green-500">
                <Zap className="h-4 w-4" />
                <span className="font-semibold">
                  {Math.round((this.integration.usage.requests / this.integration.usage.limit) * 100)}%
                </span>
              </div>
              <p className="text-xs text-neutral-400">Usage</p>
            </div>
          </div>

          {/* Features */}
          <div className="flex flex-wrap gap-1">
            {this.integration.features.slice(0, 3).map((feature) => (
              <Badge key={feature} variant="secondary" className="text-xs bg-neutral-700 text-neutral-300">
                {feature.replace('_', ' ')}
              </Badge>
            ))}
            {this.integration.features.length > 3 && (
              <Badge variant="secondary" className="text-xs bg-neutral-700 text-neutral-300">
                +{this.integration.features.length - 3} more
              </Badge>
            )}
          </div>

          {/* Last Sync */}
          <div className="text-sm text-neutral-400">
            Last sync: {new Date(this.integration.lastSync).toLocaleString()}
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1 bg-neutral-700 border-neutral-600 text-white hover:bg-neutral-600">
              <Eye className="h-4 w-4 mr-1" />
              View
            </Button>
            <Button variant="outline" size="sm" className="flex-1 bg-neutral-700 border-neutral-600 text-white hover:bg-neutral-600">
              <Settings className="h-4 w-4 mr-1" />
              Configure
            </Button>
            <Button variant="outline" size="sm" className="bg-neutral-700 border-neutral-600 text-white hover:bg-neutral-600">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }
}

class WebhookEventCardComponent {
  private event: WebhookEvent;

  constructor(event: WebhookEvent) {
    this.event = event;
  }

  private getStatusBadge() {
    const statusConfig = {
      success: { variant: 'default' as const, icon: CheckCircle, text: 'Success' },
      failed: { variant: 'destructive' as const, icon: XCircle, text: 'Failed' },
      pending: { variant: 'secondary' as const, icon: Clock, text: 'Pending' }
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

  public render() {
    return (
      <Card className="bg-neutral-800 border-neutral-700 hover:shadow-lg transition-shadow duration-200">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-lg flex items-center gap-2 text-white">
                {this.event.integration}
              </CardTitle>
              <CardDescription className="text-neutral-400">
                Event: {this.event.event}
              </CardDescription>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="outline" className="text-xs bg-neutral-700 border-neutral-600 text-neutral-300">
                  {this.event.event}
                </Badge>
                {this.event.retryCount > 0 && (
                  <Badge variant="destructive" className="text-xs">
                    Retry {this.event.retryCount}
                  </Badge>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              {this.getStatusBadge()}
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="text-sm text-neutral-400">
            {new Date(this.event.timestamp).toLocaleString()}
          </div>
          
          {this.event.response && (
            <div className="p-3 bg-neutral-700/50 rounded-lg">
              <p className="text-sm font-medium text-red-500">Error Response:</p>
              <p className="text-sm text-neutral-400">{this.event.response}</p>
            </div>
          )}
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1 bg-neutral-700 border-neutral-600 text-white hover:bg-neutral-600">
              <Eye className="h-4 w-4 mr-1" />
              View Payload
            </Button>
            {this.event.status === 'failed' && (
              <Button variant="outline" size="sm" className="flex-1 bg-neutral-700 border-neutral-600 text-white hover:bg-neutral-600">
                <RefreshCw className="h-4 w-4 mr-1" />
                Retry
              </Button>
            )}
            <Button variant="outline" size="sm" className="bg-neutral-700 border-neutral-600 text-white hover:bg-neutral-600">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }
}

export default function IntegrationsPage() {
  const integrationsService = new IntegrationsService();
  const allIntegrations = integrationsService.getAllIntegrations();
  const paymentIntegrations = integrationsService.getIntegrationsByType('payment');
  const analyticsIntegrations = integrationsService.getIntegrationsByType('analytics');
  const communicationIntegrations = integrationsService.getIntegrationsByType('communication');
  const storageIntegrations = integrationsService.getIntegrationsByType('storage');
  const webhookEvents = integrationsService.getWebhookEvents();
  const stats = integrationsService.getIntegrationStats();

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Integrations</h1>
            <p className="text-neutral-400">Manage third-party integrations and API connections</p>
          </div>
          <Badge className="bg-orange-500 text-white">Super Admin</Badge>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-2">Integration Overview</h2>
        <p className="text-neutral-400 mb-6">Third-party services, API connections, and system health</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-neutral-800 border border-neutral-700 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-400 uppercase tracking-wide">Total Integrations</p>
                <p className="text-2xl font-bold text-white">{stats.total}</p>
                <div className="flex items-center gap-1 text-sm text-blue-500">
                  <Webhook className="h-4 w-4" />
                  +2.1% from last month
                </div>
              </div>
              <Webhook className="h-8 w-8 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-neutral-800 border border-neutral-700 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-400 uppercase tracking-wide">Active</p>
                <p className="text-2xl font-bold text-white">{stats.active}</p>
                <div className="flex items-center gap-1 text-sm text-green-500">
                  <CheckCircle className="h-4 w-4" />
                  +12.5% from last month
                </div>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </div>
          
          <div className="bg-neutral-800 border border-neutral-700 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-400 uppercase tracking-wide">Errors</p>
                <p className="text-2xl font-bold text-white">{stats.errors}</p>
                <div className="flex items-center gap-1 text-sm text-red-500">
                  <XCircle className="h-4 w-4" />
                  Requires attention
                </div>
              </div>
              <XCircle className="h-8 w-8 text-red-500" />
            </div>
          </div>
          
          <div className="bg-neutral-800 border border-neutral-700 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-400 uppercase tracking-wide">Health Rate</p>
                <p className="text-2xl font-bold text-white">{stats.healthRate}%</p>
                <div className="flex items-center gap-1 text-sm text-purple-500">
                  <Activity className="h-4 w-4" />
                  +5.2% from last month
                </div>
              </div>
              <Activity className="h-8 w-8 text-purple-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Integration Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="bg-neutral-800 border-neutral-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Webhook className="h-5 w-5 text-green-500" />
              Integration Health
            </CardTitle>
            <CardDescription className="text-neutral-400">System health and performance metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-neutral-900/50 rounded-lg">
              <div className="text-center">
                <Webhook className="h-12 w-12 text-neutral-400 mx-auto mb-2" />
                <p className="text-neutral-400">Integration health chart</p>
                <p className="text-sm text-neutral-500">Pie chart showing integration status</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-neutral-800 border-neutral-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Activity className="h-5 w-5 text-blue-500" />
              API Usage Trends
            </CardTitle>
            <CardDescription className="text-neutral-400">API calls and usage patterns over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-neutral-900/50 rounded-lg">
              <div className="text-center">
                <Activity className="h-12 w-12 text-neutral-400 mx-auto mb-2" />
                <p className="text-neutral-400">API usage chart</p>
                <p className="text-sm text-neutral-500">Line chart showing API usage trends</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
          <Input 
            placeholder="Search integrations..."
            className="pl-10 bg-neutral-800 border-neutral-700 text-white"
          />
        </div>
        <Button variant="outline" className="flex items-center gap-2 bg-neutral-800 border-neutral-700 text-white hover:bg-neutral-700">
          <Filter className="h-4 w-4" />
          Filters
        </Button>
        <Button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white">
          <Plus className="h-4 w-4" />
          Add Integration
        </Button>
      </div>

      {/* Integration Tabs */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className="grid w-full grid-cols-6 bg-neutral-800 border-neutral-700">
          <TabsTrigger value="all" className="data-[state=active]:bg-neutral-700 data-[state=active]:text-white text-neutral-400">All</TabsTrigger>
          <TabsTrigger value="payment" className="data-[state=active]:bg-neutral-700 data-[state=active]:text-white text-neutral-400">Payment</TabsTrigger>
          <TabsTrigger value="analytics" className="data-[state=active]:bg-neutral-700 data-[state=active]:text-white text-neutral-400">Analytics</TabsTrigger>
          <TabsTrigger value="communication" className="data-[state=active]:bg-neutral-700 data-[state=active]:text-white text-neutral-400">Communication</TabsTrigger>
          <TabsTrigger value="storage" className="data-[state=active]:bg-neutral-700 data-[state=active]:text-white text-neutral-400">Storage</TabsTrigger>
          <TabsTrigger value="webhooks" className="data-[state=active]:bg-neutral-700 data-[state=active]:text-white text-neutral-400">Webhooks</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {allIntegrations.map((integration) => {
              const integrationCard = new IntegrationCardComponent(integration);
              return <div key={integration.id}>{integrationCard.render()}</div>;
            })}
          </div>
        </TabsContent>

        <TabsContent value="payment" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {paymentIntegrations.map((integration) => {
              const integrationCard = new IntegrationCardComponent(integration);
              return <div key={integration.id}>{integrationCard.render()}</div>;
            })}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {analyticsIntegrations.map((integration) => {
              const integrationCard = new IntegrationCardComponent(integration);
              return <div key={integration.id}>{integrationCard.render()}</div>;
            })}
          </div>
        </TabsContent>

        <TabsContent value="communication" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {communicationIntegrations.map((integration) => {
              const integrationCard = new IntegrationCardComponent(integration);
              return <div key={integration.id}>{integrationCard.render()}</div>;
            })}
          </div>
        </TabsContent>

        <TabsContent value="storage" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {storageIntegrations.map((integration) => {
              const integrationCard = new IntegrationCardComponent(integration);
              return <div key={integration.id}>{integrationCard.render()}</div>;
            })}
          </div>
        </TabsContent>

        <TabsContent value="webhooks" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {webhookEvents.map((event) => {
              const eventCard = new WebhookEventCardComponent(event);
              return <div key={event.id}>{eventCard.render()}</div>;
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
