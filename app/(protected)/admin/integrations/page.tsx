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
      <Card className="hover:shadow-lg transition-shadow duration-200">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center text-2xl">
                {this.integration.icon}
              </div>
              <div className="flex-1 min-w-0">
                <CardTitle className="text-lg flex items-center gap-2">
                  {this.integration.name}
                </CardTitle>
                <CardDescription className="line-clamp-2">
                  {this.integration.description}
                </CardDescription>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline" className="text-xs">
                    {this.integration.provider}
                  </Badge>
                  {this.getPricingBadge()}
                  <Badge variant="outline" className="text-xs">
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
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center justify-center gap-1 text-blue-600">
                <Activity className="h-4 w-4" />
                <span className="font-semibold">
                  {this.integration.usage.requests.toLocaleString()}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">API Calls</p>
            </div>
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center justify-center gap-1 text-green-600">
                <Zap className="h-4 w-4" />
                <span className="font-semibold">
                  {Math.round((this.integration.usage.requests / this.integration.usage.limit) * 100)}%
                </span>
              </div>
              <p className="text-xs text-muted-foreground">Usage</p>
            </div>
          </div>

          {/* Features */}
          <div className="flex flex-wrap gap-1">
            {this.integration.features.slice(0, 3).map((feature) => (
              <Badge key={feature} variant="secondary" className="text-xs">
                {feature.replace('_', ' ')}
              </Badge>
            ))}
            {this.integration.features.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{this.integration.features.length - 3} more
              </Badge>
            )}
          </div>

          {/* Last Sync */}
          <div className="text-sm text-muted-foreground">
            Last sync: {new Date(this.integration.lastSync).toLocaleString()}
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1">
              <Eye className="h-4 w-4 mr-1" />
              View
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              <Settings className="h-4 w-4 mr-1" />
              Configure
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
      <Card className="hover:shadow-lg transition-shadow duration-200">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-lg flex items-center gap-2">
                {this.event.integration}
              </CardTitle>
              <CardDescription>
                Event: {this.event.event}
              </CardDescription>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="outline" className="text-xs">
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
          <div className="text-sm text-muted-foreground">
            {new Date(this.event.timestamp).toLocaleString()}
          </div>
          
          {this.event.response && (
            <div className="p-3 bg-muted/50 rounded-lg">
              <p className="text-sm font-medium text-red-600">Error Response:</p>
              <p className="text-sm text-muted-foreground">{this.event.response}</p>
            </div>
          )}
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1">
              <Eye className="h-4 w-4 mr-1" />
              View Payload
            </Button>
            {this.event.status === 'failed' && (
              <Button variant="outline" size="sm" className="flex-1">
                <RefreshCw className="h-4 w-4 mr-1" />
                Retry
              </Button>
            )}
            <Button variant="outline" size="sm">
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
    <div className="space-y-6">
      {/* Header with Pills */}
      <div className="space-y-4">
        <div>
          <h1 className="text-3xl font-bold">Integrations</h1>
          <p className="text-muted-foreground">Manage third-party integrations and API connections</p>
        </div>
        <AdminPillNavigationComponent />
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search integrations..."
            className="pl-10"
          />
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filters
        </Button>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Integration
        </Button>
      </div>

      {/* Integration Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Integrations</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <Webhook className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active</p>
                <p className="text-2xl font-bold text-green-600">{stats.active}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Errors</p>
                <p className="text-2xl font-bold text-red-600">{stats.errors}</p>
              </div>
              <XCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Health Rate</p>
                <p className="text-2xl font-bold text-blue-600">{stats.healthRate}%</p>
              </div>
              <Activity className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Integration Tabs */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="payment">Payment</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="communication">Communication</TabsTrigger>
          <TabsTrigger value="storage">Storage</TabsTrigger>
          <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
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
