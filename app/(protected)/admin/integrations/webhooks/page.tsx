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
  AlertCircle
} from "lucide-react";

// ----------------------
// Integrations Webhooks Page
// Location: /app/(protected)/admin/integrations/webhooks/page.tsx
// Purpose: Manage webhook endpoints and logs for integrations
// Features: Webhook management, event logs, retry mechanisms
// Layout: Cards on left, filters on right (matching finance page)
// ----------------------

interface WebhookEndpoint {
  id: string;
  name: string;
  integration: string;
  url: string;
  status: 'active' | 'inactive' | 'error' | 'pending';
  events: string[];
  secret: string;
  lastTriggered: string;
  successRate: number;
  totalEvents: number;
  failedEvents: number;
  retryCount: number;
  timeout: number;
  headers: Record<string, string>;
  createdAt: string;
  updatedAt: string;
}

interface WebhookEvent {
  id: string;
  endpointId: string;
  integration: string;
  event: string;
  status: 'success' | 'failed' | 'pending' | 'retrying';
  timestamp: string;
  payload: any;
  response?: string;
  responseCode?: number;
  retryCount: number;
  maxRetries: number;
  nextRetry?: string;
  duration: number;
  headers: Record<string, string>;
}

class WebhooksService {
  private webhookEndpoints: WebhookEndpoint[] = [
    {
      id: '1',
      name: 'Stripe Payment Events',
      integration: 'Stripe Payment Processing',
      url: 'https://api.fanzit.com/webhooks/stripe',
      status: 'active',
      events: ['payment_intent.succeeded', 'payment_intent.payment_failed', 'customer.subscription.created', 'customer.subscription.updated'],
      secret: 'whsec_***',
      lastTriggered: '2025-01-27T10:30:00Z',
      successRate: 99.2,
      totalEvents: 15420,
      failedEvents: 123,
      retryCount: 3,
      timeout: 30,
      headers: { 'Content-Type': 'application/json' },
      createdAt: '2025-01-01T00:00:00Z',
      updatedAt: '2025-01-27T10:30:00Z'
    },
    {
      id: '2',
      name: 'SendGrid Email Events',
      integration: 'SendGrid Email Service',
      url: 'https://api.fanzit.com/webhooks/sendgrid',
      status: 'error',
      events: ['email.sent', 'email.delivered', 'email.bounced', 'email.spam_report'],
      secret: 'SG_***',
      lastTriggered: '2025-01-26T14:20:00Z',
      successRate: 85.7,
      totalEvents: 8920,
      failedEvents: 1270,
      retryCount: 5,
      timeout: 30,
      headers: { 'Content-Type': 'application/json' },
      createdAt: '2025-01-01T00:00:00Z',
      updatedAt: '2025-01-26T14:20:00Z'
    },
    {
      id: '3',
      name: 'Google Analytics Events',
      integration: 'Google Analytics 4',
      url: 'https://api.fanzit.com/webhooks/ga4',
      status: 'active',
      events: ['page_view', 'user_engagement', 'purchase', 'sign_up'],
      secret: 'GA_***',
      lastTriggered: '2025-01-27T09:15:00Z',
      successRate: 98.8,
      totalEvents: 25420,
      failedEvents: 305,
      retryCount: 3,
      timeout: 30,
      headers: { 'Content-Type': 'application/json' },
      createdAt: '2025-01-01T00:00:00Z',
      updatedAt: '2025-01-27T09:15:00Z'
    },
    {
      id: '4',
      name: 'AWS S3 Events',
      integration: 'AWS S3 Storage',
      url: 'https://api.fanzit.com/webhooks/s3',
      status: 'active',
      events: ['s3:ObjectCreated', 's3:ObjectRemoved', 's3:ObjectRestore'],
      secret: 'AKIA***',
      lastTriggered: '2025-01-27T11:00:00Z',
      successRate: 99.9,
      totalEvents: 32100,
      failedEvents: 32,
      retryCount: 3,
      timeout: 30,
      headers: { 'Content-Type': 'application/json' },
      createdAt: '2025-01-01T00:00:00Z',
      updatedAt: '2025-01-27T11:00:00Z'
    },
    {
      id: '5',
      name: 'Discord Bot Events',
      integration: 'Discord Bot Integration',
      url: 'https://api.fanzit.com/webhooks/discord',
      status: 'pending',
      events: ['message.created', 'member.joined', 'member.left'],
      secret: 'DISCORD_***',
      lastTriggered: '2025-01-25T16:45:00Z',
      successRate: 0,
      totalEvents: 0,
      failedEvents: 0,
      retryCount: 3,
      timeout: 30,
      headers: { 'Content-Type': 'application/json' },
      createdAt: '2025-01-25T16:45:00Z',
      updatedAt: '2025-01-25T16:45:00Z'
    }
  ];

  private webhookEvents: WebhookEvent[] = [
    {
      id: '1',
      endpointId: '1',
      integration: 'Stripe Payment Processing',
      event: 'payment_intent.succeeded',
      status: 'success',
      timestamp: '2025-01-27T10:30:00Z',
      payload: { amount: 29.99, currency: 'usd', customer: 'cus_123' },
      response: '{"status": "processed"}',
      responseCode: 200,
      retryCount: 0,
      maxRetries: 3,
      duration: 150,
      headers: { 'Content-Type': 'application/json' }
    },
    {
      id: '2',
      endpointId: '2',
      integration: 'SendGrid Email Service',
      event: 'email.sent',
      status: 'failed',
      timestamp: '2025-01-27T09:45:00Z',
      payload: { to: 'user@example.com', template: 'welcome' },
      response: 'Invalid API key',
      responseCode: 401,
      retryCount: 3,
      maxRetries: 3,
      nextRetry: '2025-01-27T12:00:00Z',
      duration: 5000,
      headers: { 'Content-Type': 'application/json' }
    },
    {
      id: '3',
      endpointId: '3',
      integration: 'Google Analytics 4',
      event: 'page_view',
      status: 'success',
      timestamp: '2025-01-27T09:15:00Z',
      payload: { page: '/dashboard', user_id: 'user_123' },
      response: '{"status": "tracked"}',
      responseCode: 200,
      retryCount: 0,
      maxRetries: 3,
      duration: 75,
      headers: { 'Content-Type': 'application/json' }
    }
  ];

  public getAllEndpoints(): WebhookEndpoint[] {
    return this.webhookEndpoints;
  }

  public getEndpointsByStatus(status: string): WebhookEndpoint[] {
    return this.webhookEndpoints.filter(endpoint => endpoint.status === status);
  }

  public getEndpointsByIntegration(integration: string): WebhookEndpoint[] {
    return this.webhookEndpoints.filter(endpoint => endpoint.integration === integration);
  }

  public getWebhookEvents(): WebhookEvent[] {
    return this.webhookEvents;
  }

  public getEventsByEndpoint(endpointId: string): WebhookEvent[] {
    return this.webhookEvents.filter(event => event.endpointId === endpointId);
  }

  public getWebhookStats() {
    const total = this.webhookEndpoints.length;
    const active = this.webhookEndpoints.filter(e => e.status === 'active').length;
    const errors = this.webhookEndpoints.filter(e => e.status === 'error').length;
    const totalEvents = this.webhookEvents.length;
    const successRate = this.webhookEndpoints.reduce((sum, endpoint) => sum + endpoint.successRate, 0) / total;

    return {
      total,
      active,
      errors,
      totalEvents,
      successRate: successRate.toFixed(1)
    };
  }
}

// Professional Webhook Endpoint Card Component
function ProfessionalWebhookCard({ 
  endpoint, 
  onView, 
  onEdit, 
  onTest, 
  onMore 
}: { 
  endpoint: WebhookEndpoint;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onTest: (id: string) => void;
  onMore: (id: string) => void;
}) {
  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { variant: 'default' as const, icon: CheckCircle, text: 'Active', color: 'text-green-600' },
      inactive: { variant: 'secondary' as const, icon: PauseCircle, text: 'Inactive', color: 'text-gray-500' },
      error: { variant: 'destructive' as const, icon: AlertTriangle, text: 'Error', color: 'text-red-600' },
      pending: { variant: 'secondary' as const, icon: Clock, text: 'Pending', color: 'text-yellow-600' }
    };
    return statusConfig[status as keyof typeof statusConfig] || statusConfig.inactive;
  };

  const getIntegrationIcon = (integration: string) => {
    if (integration.includes('Stripe')) return DollarSign;
    if (integration.includes('SendGrid')) return Mail;
    if (integration.includes('Google')) return BarChart3;
    if (integration.includes('AWS')) return Database;
    if (integration.includes('Discord')) return Users;
    return Webhook;
  };

  const statusInfo = getStatusBadge(endpoint.status);
  const IntegrationIcon = getIntegrationIcon(endpoint.integration);

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
                {endpoint.name}
                <Badge variant="outline" className="text-xs">
                  {endpoint.integration}
                </Badge>
              </CardTitle>
              <CardDescription className="text-text-muted line-clamp-2">
                {endpoint.url}
              </CardDescription>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="outline" className="text-xs">
                  {endpoint.events.length} events
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {endpoint.timeout}s timeout
                </Badge>
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
        {/* Success Rate and Events */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-surface-elev1 rounded-lg">
            <div className="flex items-center justify-center gap-1 text-primary">
              <CheckCircle className="h-4 w-4" />
              <span className="font-semibold">
                {endpoint.successRate}%
              </span>
            </div>
            <p className="text-xs text-text-muted">Success Rate</p>
          </div>
          <div className="text-center p-3 bg-surface-elev1 rounded-lg">
            <div className="flex items-center justify-center gap-1 text-green-600">
              <Activity className="h-4 w-4" />
              <span className="font-semibold">
                {endpoint.totalEvents.toLocaleString()}
              </span>
            </div>
            <p className="text-xs text-text-muted">Total Events</p>
          </div>
        </div>

        {/* Events */}
        <div className="flex flex-wrap gap-1">
          {endpoint.events.slice(0, 3).map((event) => (
            <Badge key={event} variant="secondary" className="text-xs">
              {event}
            </Badge>
          ))}
          {endpoint.events.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{endpoint.events.length - 3} more
            </Badge>
          )}
        </div>

        {/* Last Triggered */}
        <div className="text-sm text-text-muted">
          Last triggered: {new Date(endpoint.lastTriggered).toLocaleString()}
        </div>

        {/* Failed Events */}
        {endpoint.failedEvents > 0 && (
          <div className="text-sm text-red-600">
            {endpoint.failedEvents} failed events require attention
          </div>
        )}
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => onView(endpoint.id)}
          >
            <Eye className="h-4 w-4 mr-1" />
            View
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => onEdit(endpoint.id)}
          >
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onTest(endpoint.id)}
          >
            <PlayCircle className="h-4 w-4 mr-1" />
            Test
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onMore(endpoint.id)}
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// Webhooks Detail View Component (matching finance page layout)
function WebhooksDetailView({ 
  endpoints, 
  selectedEndpointId, 
  onEndpointSelect, 
  onView, 
  onEdit, 
  onTest, 
  onMore 
}: {
  endpoints: WebhookEndpoint[];
  selectedEndpointId: string;
  onEndpointSelect: (id: string) => void;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onTest: (id: string) => void;
  onMore: (id: string) => void;
}) {
  const selectedEndpoint = endpoints.find(e => e.id === selectedEndpointId) || endpoints[0];

  return (
    <div className="space-y-6">
      {/* Filter Section */}
      <SelectFilterSection
        title="Select Webhook Endpoint"
        placeholder="Choose a webhook endpoint..."
        value={selectedEndpointId || endpoints[0]?.id}
        onValueChange={onEndpointSelect}
        options={endpoints.map((endpoint) => {
          const getIntegrationIcon = (integration: string) => {
            if (integration.includes('Stripe')) return DollarSign;
            if (integration.includes('SendGrid')) return Mail;
            if (integration.includes('Google')) return BarChart3;
            if (integration.includes('AWS')) return Database;
            if (integration.includes('Discord')) return Users;
            return Webhook;
          };
          const Icon = getIntegrationIcon(endpoint.integration);
          return {
            id: endpoint.id,
            label: endpoint.name,
            icon: <Icon className="h-4 w-4" />,
            status: endpoint.status
          };
        })}
      />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Webhook Cards */}
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {endpoints.map((endpoint) => (
              <ProfessionalWebhookCard
                key={endpoint.id}
                endpoint={endpoint}
                onView={onView}
                onEdit={onEdit}
                onTest={onTest}
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
              <CardTitle className="text-text">Webhook Health</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-text-muted">Total Endpoints</span>
                <span className="text-2xl font-bold text-primary">{endpoints.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-text-muted">Active</span>
                <span className="text-xl font-semibold text-green-600">
                  {endpoints.filter(e => e.status === 'active').length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-text-muted">Errors</span>
                <span className="text-xl font-semibold text-red-600">
                  {endpoints.filter(e => e.status === 'error').length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-text-muted">Avg Success Rate</span>
                <span className="text-lg font-medium text-text">
                  {((endpoints.reduce((sum, e) => sum + e.successRate, 0) / endpoints.length) || 0).toFixed(1)}%
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
                {['active', 'inactive', 'error', 'pending'].map((status) => (
                  <Button
                    key={status}
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => console.log(`Filter by ${status}`)}
                  >
                    <span className="capitalize">{status}</span>
                    <Badge variant="secondary" className="ml-auto">
                      {endpoints.filter(e => e.status === status).length}
                    </Badge>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Integration Filter */}
          <Card className="bg-admin-card border-line-soft">
            <CardHeader>
              <CardTitle className="text-text">Filter by Integration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {['Stripe Payment Processing', 'SendGrid Email Service', 'Google Analytics 4', 'AWS S3 Storage', 'Discord Bot Integration'].map((integration) => (
                  <Button
                    key={integration}
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => console.log(`Filter by ${integration}`)}
                  >
                    <span>{integration}</span>
                    <Badge variant="secondary" className="ml-auto">
                      {endpoints.filter(e => e.integration === integration).length}
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
              <Button className="w-full" onClick={() => console.log('Add Webhook')}>
                <Plus className="h-4 w-4 mr-2" />
                Add Webhook
              </Button>
              <Button variant="outline" className="w-full" onClick={() => console.log('Test All')}>
                <PlayCircle className="h-4 w-4 mr-2" />
                Test All
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

export default function IntegrationsWebhooksPage() {
  const webhooksService = new WebhooksService();
  const allEndpoints = webhooksService.getAllEndpoints();
  const stats = webhooksService.getWebhookStats();

  const [selectedEndpointId, setSelectedEndpointId] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [integrationFilter, setIntegrationFilter] = useState('all');

  // Filter endpoints based on search and filters
  const filteredEndpoints = allEndpoints.filter(endpoint => {
    const matchesSearch = endpoint.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         endpoint.integration.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         endpoint.url.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || endpoint.status === statusFilter;
    const matchesIntegration = integrationFilter === 'all' || endpoint.integration === integrationFilter;
    
    return matchesSearch && matchesStatus && matchesIntegration;
  });

  useEffect(() => {
    if (filteredEndpoints.length > 0 && !selectedEndpointId) {
      setSelectedEndpointId(filteredEndpoints[0].id);
    }
  }, [filteredEndpoints, selectedEndpointId]);

  const handleEndpointSelect = (id: string) => {
    setSelectedEndpointId(id);
  };

  const handleView = (id: string) => {
    console.log('View webhook:', id);
  };

  const handleEdit = (id: string) => {
    console.log('Edit webhook:', id);
  };

  const handleTest = (id: string) => {
    console.log('Test webhook:', id);
  };

  const handleMore = (id: string) => {
    console.log('More actions for webhook:', id);
  };

  const handleRefresh = () => {
    console.log('Refreshing webhooks...');
  };

  const handleExport = () => {
    console.log('Exporting webhooks...');
  };

  // Stats cards for the header
  const statsCards = (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard
        title="Total Endpoints"
        value={stats.total}
        growth={2.1}
        icon={Webhook}
        format="number"
      />
      <MetricCard
        title="Active Endpoints"
        value={stats.active}
        growth={12.5}
        icon={CheckCircle}
        format="number"
      />
      <MetricCard
        title="Error Endpoints"
        value={stats.errors}
        growth={-5.2}
        icon={AlertTriangle}
        format="number"
      />
      <MetricCard
        title="Success Rate"
        value={`${stats.successRate}%`}
        growth={0.3}
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
      <Select value={integrationFilter} onValueChange={setIntegrationFilter}>
        <SelectTrigger className="w-40 bg-surface-elev2 border-line-soft text-text">
          <SelectValue placeholder="Integration" />
        </SelectTrigger>
        <SelectContent className="bg-surface-elev2 border-line-soft">
          <SelectItem value="all" className="text-text hover:bg-surface-elev1">All Integrations</SelectItem>
          <SelectItem value="Stripe Payment Processing" className="text-text hover:bg-surface-elev1">Stripe</SelectItem>
          <SelectItem value="SendGrid Email Service" className="text-text hover:bg-surface-elev1">SendGrid</SelectItem>
          <SelectItem value="Google Analytics 4" className="text-text hover:bg-surface-elev1">Google Analytics</SelectItem>
          <SelectItem value="AWS S3 Storage" className="text-text hover:bg-surface-elev1">AWS S3</SelectItem>
          <SelectItem value="Discord Bot Integration" className="text-text hover:bg-surface-elev1">Discord</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );

  return (
    <AdminPageTemplate
      title="Webhooks Management"
      description="Manage webhook endpoints and event logs"
      icon={<Webhook className="h-6 w-6" />}
      searchPlaceholder="Search webhooks by name, integration, or URL..."
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
      <WebhooksDetailView
        endpoints={filteredEndpoints}
        selectedEndpointId={selectedEndpointId}
        onEndpointSelect={handleEndpointSelect}
        onView={handleView}
        onEdit={handleEdit}
        onTest={handleTest}
        onMore={handleMore}
      />
    </AdminPageTemplate>
  );
}
