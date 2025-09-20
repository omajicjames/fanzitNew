"use client";

import { useState, useEffect } from "react";
import { AdminPageTemplate, MetricCard } from "@src/components/admin/AdminPageTemplate";
import { SelectFilterSection } from "@src/components/admin/SelectFilterSection";
import { ModernIntegrationCard } from "@src/components/admin/ModernIntegrationCard";
import { IntegrationDetailsCard } from "@src/components/admin/IntegrationDetailsCard";
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
  Calendar
} from "lucide-react";

// ----------------------
// Integrations Catalog Page
// Location: /app/(protected)/admin/integrations/catalog/page.tsx
// Purpose: Browse and install available integrations
// Features: Integration marketplace, installation, configuration
// Layout: Cards on left, filters on right (matching finance page)
// ----------------------

interface CatalogIntegration {
  id: string;
  name: string;
  type: 'payment' | 'analytics' | 'communication' | 'storage' | 'social' | 'crm' | 'security' | 'monitoring';
  provider: string;
  description: string;
  features: string[];
  pricing: 'free' | 'paid' | 'enterprise';
  version: string;
  icon: string;
  status: 'available' | 'installed' | 'pending' | 'deprecated';
  rating: number;
  downloads: number;
  category: string;
  requirements: string[];
  documentation: string;
  support: 'community' | 'email' | 'phone' | 'enterprise';
  lastUpdated: string;
  compatibility: string[];
}

class IntegrationsCatalogService {
  private catalogIntegrations: CatalogIntegration[] = [
    {
      id: '1',
      name: 'Stripe Payment Processing',
      type: 'payment',
      provider: 'Stripe',
      description: 'Accept payments and manage subscriptions with Stripe\'s powerful API',
      features: ['payments', 'subscriptions', 'refunds', 'payouts', 'webhooks'],
      pricing: 'paid',
      version: '2023-10-26',
      icon: '💳',
      status: 'installed',
      rating: 4.8,
      downloads: 15420,
      category: 'Payment Processing',
      requirements: ['API Key', 'Webhook URL'],
      documentation: 'https://stripe.com/docs',
      support: 'email',
      lastUpdated: '2025-01-15',
      compatibility: ['Node.js', 'Python', 'PHP', 'Ruby']
    },
    {
      id: '2',
      name: 'PayPal Commerce Platform',
      type: 'payment',
      provider: 'PayPal',
      description: 'Accept PayPal, credit cards, and alternative payment methods',
      features: ['paypal', 'credit_cards', 'buy_now_pay_later', 'subscriptions'],
      pricing: 'paid',
      version: '2024-01-10',
      icon: '🅿️',
      status: 'available',
      rating: 4.6,
      downloads: 8920,
      category: 'Payment Processing',
      requirements: ['Client ID', 'Client Secret'],
      documentation: 'https://developer.paypal.com/docs',
      support: 'email',
      lastUpdated: '2025-01-10',
      compatibility: ['Node.js', 'Python', 'PHP', 'Java']
    },
    {
      id: '3',
      name: 'Google Analytics 4',
      type: 'analytics',
      provider: 'Google',
      description: 'Track user behavior and platform analytics with GA4',
      features: ['page_views', 'user_tracking', 'conversion_analytics', 'custom_events'],
      pricing: 'free',
      version: 'GA4',
      icon: '📊',
      status: 'installed',
      rating: 4.7,
      downloads: 25420,
      category: 'Analytics',
      requirements: ['Measurement ID', 'API Key'],
      documentation: 'https://developers.google.com/analytics',
      support: 'community',
      lastUpdated: '2025-01-20',
      compatibility: ['JavaScript', 'Node.js', 'Python', 'PHP']
    },
    {
      id: '4',
      name: 'SendGrid Email Service',
      type: 'communication',
      provider: 'SendGrid',
      description: 'Send transactional and marketing emails at scale',
      features: ['email_sending', 'templates', 'analytics', 'deliverability'],
      pricing: 'paid',
      version: 'v3',
      icon: '📧',
      status: 'installed',
      rating: 4.5,
      downloads: 18200,
      category: 'Email Service',
      requirements: ['API Key', 'Sender Verification'],
      documentation: 'https://docs.sendgrid.com',
      support: 'email',
      lastUpdated: '2025-01-18',
      compatibility: ['Node.js', 'Python', 'PHP', 'Ruby', 'Java']
    },
    {
      id: '5',
      name: 'AWS S3 Storage',
      type: 'storage',
      provider: 'Amazon Web Services',
      description: 'Store and serve media files and content with S3',
      features: ['file_storage', 'cdn', 'backup', 'versioning'],
      pricing: 'paid',
      version: 'v2',
      icon: '☁️',
      status: 'installed',
      rating: 4.9,
      downloads: 32100,
      category: 'Cloud Storage',
      requirements: ['Access Key', 'Secret Key', 'Bucket Name'],
      documentation: 'https://docs.aws.amazon.com/s3',
      support: 'enterprise',
      lastUpdated: '2025-01-22',
      compatibility: ['Node.js', 'Python', 'PHP', 'Ruby', 'Java', '.NET']
    },
    {
      id: '6',
      name: 'Discord Bot Integration',
      type: 'communication',
      provider: 'Discord',
      description: 'Community management and notifications via Discord',
      features: ['notifications', 'community_management', 'moderation', 'automation'],
      pricing: 'free',
      version: 'v1.2',
      icon: '💬',
      status: 'available',
      rating: 4.3,
      downloads: 8900,
      category: 'Community Management',
      requirements: ['Bot Token', 'Server ID'],
      documentation: 'https://discord.com/developers/docs',
      support: 'community',
      lastUpdated: '2025-01-12',
      compatibility: ['Node.js', 'Python', 'Java', 'C#']
    },
    {
      id: '7',
      name: 'HubSpot CRM',
      type: 'crm',
      provider: 'HubSpot',
      description: 'Customer relationship management and lead tracking',
      features: ['lead_tracking', 'contact_management', 'sales_pipeline', 'automation'],
      pricing: 'paid',
      version: 'v3',
      icon: '🎯',
      status: 'installed',
      rating: 4.4,
      downloads: 15600,
      category: 'CRM',
      requirements: ['API Key', 'Portal ID'],
      documentation: 'https://developers.hubspot.com/docs',
      support: 'email',
      lastUpdated: '2025-01-16',
      compatibility: ['Node.js', 'Python', 'PHP', 'Ruby', 'Java']
    },
    {
      id: '8',
      name: 'Auth0 Authentication',
      type: 'security',
      provider: 'Auth0',
      description: 'Secure authentication and user management',
      features: ['authentication', 'authorization', 'social_login', 'mfa'],
      pricing: 'paid',
      version: 'v2',
      icon: '🔐',
      status: 'available',
      rating: 4.6,
      downloads: 12800,
      category: 'Authentication',
      requirements: ['Domain', 'Client ID', 'Client Secret'],
      documentation: 'https://auth0.com/docs',
      support: 'email',
      lastUpdated: '2025-01-14',
      compatibility: ['Node.js', 'Python', 'PHP', 'Ruby', 'Java', '.NET']
    },
    {
      id: '9',
      name: 'CCBill Subscriptions',
      type: 'payment',
      provider: 'CCBill',
      description: 'Comprehensive subscription billing and payment processing for adult content',
      features: ['subscriptions', 'recurring_billing', 'adult_content', 'global_payments', 'fraud_protection'],
      pricing: 'paid',
      version: 'v4.2',
      icon: '💳',
      status: 'available',
      rating: 4.4,
      downloads: 11200,
      category: 'Payment Processing',
      requirements: ['Account ID', 'Sub Account ID', 'API Key'],
      documentation: 'https://support.ccbill.com/ccbill-developer-guide',
      support: 'email',
      lastUpdated: '2025-01-18',
      compatibility: ['Node.js', 'Python', 'PHP', 'Ruby', 'Java']
    },
    {
      id: '10',
      name: 'Segpay Pay-Per-View',
      type: 'payment',
      provider: 'Segpay',
      description: 'Pay-per-view and subscription billing for digital content and adult entertainment',
      features: ['pay_per_view', 'subscriptions', 'content_access', 'age_verification', 'billing_management'],
      pricing: 'paid',
      version: 'v3.1',
      icon: '🎬',
      status: 'available',
      rating: 4.3,
      downloads: 8900,
      category: 'Payment Processing',
      requirements: ['Merchant ID', 'API Key', 'Webhook URL'],
      documentation: 'https://segpay.com/developers',
      support: 'email',
      lastUpdated: '2025-01-16',
      compatibility: ['Node.js', 'Python', 'PHP', 'Ruby', 'Java', '.NET']
    },
    {
      id: '11',
      name: 'NOWPayments Crypto',
      type: 'payment',
      provider: 'NOWPayments',
      description: 'Accept cryptocurrency payments including BTC, USDT, ETH and 300+ other digital currencies',
      features: ['crypto_payments', 'btc', 'usdt', 'eth', 'multi_currency', 'instant_conversion'],
      pricing: 'paid',
      version: 'v2.0',
      icon: '₿',
      status: 'available',
      rating: 4.5,
      downloads: 15600,
      category: 'Payment Processing',
      requirements: ['API Key', 'IPN Secret', 'Webhook URL'],
      documentation: 'https://documenter.getpostman.com/view/7907941/S1a32n38',
      support: 'email',
      lastUpdated: '2025-01-20',
      compatibility: ['Node.js', 'Python', 'PHP', 'Ruby', 'Java', 'Go']
    }
  ];

  public getAllIntegrations(): CatalogIntegration[] {
    return this.catalogIntegrations;
  }

  public getIntegrationsByType(type: string): CatalogIntegration[] {
    return this.catalogIntegrations.filter(integration => integration.type === type);
  }

  public getIntegrationsByStatus(status: string): CatalogIntegration[] {
    return this.catalogIntegrations.filter(integration => integration.status === status);
  }

  public getIntegrationsByCategory(category: string): CatalogIntegration[] {
    return this.catalogIntegrations.filter(integration => integration.category === category);
  }

  public getAvailableIntegrations(): CatalogIntegration[] {
    return this.catalogIntegrations.filter(integration => integration.status === 'available');
  }

  public getInstalledIntegrations(): CatalogIntegration[] {
    return this.catalogIntegrations.filter(integration => integration.status === 'installed');
  }

  public getCatalogStats() {
    const total = this.catalogIntegrations.length;
    const available = this.getAvailableIntegrations().length;
    const installed = this.getInstalledIntegrations().length;
    const totalDownloads = this.catalogIntegrations.reduce((sum, integration) => sum + integration.downloads, 0);

    return {
      total,
      available,
      installed,
      totalDownloads,
      averageRating: (this.catalogIntegrations.reduce((sum, integration) => sum + integration.rating, 0) / total).toFixed(1)
    };
  }
}

// Modern Integration Card Component - Now using the reusable ModernIntegrationCard

// Catalog Detail View Component (matching finance page layout)
function CatalogDetailView({ 
  integrations, 
  selectedIntegrationId, 
  onIntegrationSelect, 
  onInstall, 
  onConfigure, 
  onMore,
  showDetails,
  onCloseDetails
}: {
  integrations: CatalogIntegration[];
  selectedIntegrationId: string;
  onIntegrationSelect: (id: string) => void;
  onInstall: (id: string) => void;
  onConfigure: (id: string) => void;
  onMore: (id: string) => void;
  showDetails: boolean;
  onCloseDetails: () => void;
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
            crm: Target,
            security: Lock,
            monitoring: Activity
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
        {/* Left: Single Integration Card */}
        <div className="lg:col-span-2 space-y-4">
          <ModernIntegrationCard
            integration={integrations.find(i => i.id === selectedIntegrationId) || integrations[0]}
            onInstall={onInstall}
            onConfigure={onConfigure}
            onMore={onMore}
          />
          
          {/* Integration Details Card - Shows when More button is clicked */}
          {showDetails && selectedIntegration && (
            <IntegrationDetailsCard
              integration={selectedIntegration}
              onClose={onCloseDetails}
            />
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
              {(() => {
                const selectedIntegration = integrations.find(i => i.id === selectedIntegrationId) || integrations[0];
                
                if (!selectedIntegration) {
                  return (
                    <div className="text-center py-8">
                      <Webhook className="h-12 w-12 text-text-muted mx-auto mb-4" />
                      <p className="text-text-muted text-sm">Select an integration to view details</p>
                    </div>
                  );
                }
                
                return (
                  <>
                    {/* Provider */}
                    <div className="flex items-center justify-between p-3 bg-surface-elev2 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Webhook className="h-4 w-4 text-text-muted" />
                        <span className="text-sm font-medium text-text">Provider</span>
                      </div>
                      <span className="text-sm font-semibold text-text">{selectedIntegration.provider}</span>
                    </div>

                    {/* Category */}
                    <div className="flex items-center justify-between p-3 bg-surface-elev2 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Target className="h-4 w-4 text-text-muted" />
                        <span className="text-sm font-medium text-text">Category</span>
                      </div>
                      <span className="text-sm font-semibold text-text">{selectedIntegration.category}</span>
                    </div>

                    {/* Pricing */}
                    <div className="flex items-center justify-between p-3 bg-surface-elev2 rounded-lg">
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-text-muted" />
                        <span className="text-sm font-medium text-text">Pricing</span>
                      </div>
                      <span className="text-sm font-semibold text-text capitalize">{selectedIntegration.pricing}</span>
                    </div>

                    {/* Version */}
                    <div className="flex items-center justify-between p-3 bg-surface-elev2 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Settings className="h-4 w-4 text-text-muted" />
                        <span className="text-sm font-medium text-text">Version</span>
                      </div>
                      <span className="text-sm font-semibold text-text">v{selectedIntegration.version}</span>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center justify-between p-3 bg-surface-elev2 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-text-muted" />
                        <span className="text-sm font-medium text-text">Rating</span>
                      </div>
                      <span className="text-sm font-semibold text-text">{selectedIntegration.rating}</span>
                    </div>

                    {/* Downloads */}
                    <div className="flex items-center justify-between p-3 bg-surface-elev2 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Download className="h-4 w-4 text-text-muted" />
                        <span className="text-sm font-medium text-text">Downloads</span>
                      </div>
                      <span className="text-sm font-semibold text-text">{selectedIntegration.downloads.toLocaleString()}</span>
                    </div>

                    {/* Last Updated */}
                    <div className="flex items-center justify-between p-3 bg-surface-elev2 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-text-muted" />
                        <span className="text-sm font-medium text-text">Last Updated</span>
                      </div>
                      <span className="text-sm text-text-muted">
                        {new Date(selectedIntegration.lastUpdated).toLocaleDateString()}
                      </span>
                    </div>
                  </>
                );
              })()}
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
                onClick={() => console.log('View Integration')}
              >
                <Eye className="h-4 w-4 mr-2" />
                View Integration
              </Button>
              <Button 
                variant="outline" 
                className="w-full bg-surface-elev2 border-line-soft text-text hover:bg-surface-elev1"
                onClick={() => console.log('Install Integration')}
              >
                <Download className="h-4 w-4 mr-2" />
                Install Integration
              </Button>
              <Button 
                variant="outline" 
                className="w-full bg-surface-elev2 border-line-soft text-text hover:bg-surface-elev1"
                onClick={() => console.log('View Documentation')}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                View Documentation
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function IntegrationsCatalogPage() {
  const catalogService = new IntegrationsCatalogService();
  const allIntegrations = catalogService.getAllIntegrations();
  const stats = catalogService.getCatalogStats();

  const [selectedIntegrationId, setSelectedIntegrationId] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showDetails, setShowDetails] = useState(false);

  // Filter integrations based on search and filters
  const filteredIntegrations = allIntegrations.filter(integration => {
    const matchesSearch = integration.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         integration.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         integration.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || integration.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || integration.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  useEffect(() => {
    if (filteredIntegrations.length > 0 && !selectedIntegrationId) {
      setSelectedIntegrationId(filteredIntegrations[0].id);
    }
  }, [filteredIntegrations, selectedIntegrationId]);

  const handleIntegrationSelect = (id: string) => {
    setSelectedIntegrationId(id);
  };

  const handleInstall = (id: string) => {
    console.log('Install integration:', id);
  };


  const handleConfigure = (id: string) => {
    console.log('Configure integration:', id);
  };

  const handleMore = (id: string) => {
    setSelectedIntegrationId(id);
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
  };

  const handleRefresh = () => {
    console.log('Refreshing catalog...');
  };

  const handleExport = () => {
    console.log('Exporting catalog...');
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
        title="Available"
        value={stats.available}
        growth={12.5}
        icon={Plus}
        format="number"
      />
      <MetricCard
        title="Installed"
        value={stats.installed}
        growth={8.2}
        icon={CheckCircle}
        format="number"
      />
      <MetricCard
        title="Average Rating"
        value={parseFloat(stats.averageRating)}
        growth={0.3}
        icon={Star}
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
          <SelectItem value="available" className="text-text hover:bg-surface-elev1">Available</SelectItem>
          <SelectItem value="installed" className="text-text hover:bg-surface-elev1">Installed</SelectItem>
          <SelectItem value="pending" className="text-text hover:bg-surface-elev1">Pending</SelectItem>
          <SelectItem value="deprecated" className="text-text hover:bg-surface-elev1">Deprecated</SelectItem>
        </SelectContent>
      </Select>
      <Select value={categoryFilter} onValueChange={setCategoryFilter}>
        <SelectTrigger className="w-40 bg-surface-elev2 border-line-soft text-text">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent className="bg-surface-elev2 border-line-soft">
          <SelectItem value="all" className="text-text hover:bg-surface-elev1">All Categories</SelectItem>
          <SelectItem value="Payment Processing" className="text-text hover:bg-surface-elev1">Payment Processing</SelectItem>
          <SelectItem value="Analytics" className="text-text hover:bg-surface-elev1">Analytics</SelectItem>
          <SelectItem value="Email Service" className="text-text hover:bg-surface-elev1">Email Service</SelectItem>
          <SelectItem value="Cloud Storage" className="text-text hover:bg-surface-elev1">Cloud Storage</SelectItem>
          <SelectItem value="Community Management" className="text-text hover:bg-surface-elev1">Community Management</SelectItem>
          <SelectItem value="CRM" className="text-text hover:bg-surface-elev1">CRM</SelectItem>
          <SelectItem value="Authentication" className="text-text hover:bg-surface-elev1">Authentication</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );

  return (
    <AdminPageTemplate
      title="Integrations Catalog"
      description="Browse and install available integrations"
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
      <CatalogDetailView
        integrations={filteredIntegrations}
        selectedIntegrationId={selectedIntegrationId}
        onIntegrationSelect={handleIntegrationSelect}
        onInstall={handleInstall}
        onConfigure={handleConfigure}
        onMore={handleMore}
        showDetails={showDetails}
        onCloseDetails={handleCloseDetails}
      />
    </AdminPageTemplate>
  );
}
