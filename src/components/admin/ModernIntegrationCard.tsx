"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@src/components/ui/card";
import { Badge } from "@src/components/ui/badge";
import { Button } from "@src/components/ui/button";
import {
  CheckCircle,
  Clock,
  AlertTriangle,
  Settings,
  MoreHorizontal,
  Star,
  Download,
  Plus,
  ExternalLink,
  DollarSign,
  BarChart3,
  Mail,
  Database,
  Users,
  Target,
  Lock,
  Activity,
  Zap,
  Globe,
  Server,
  Webhook
} from "lucide-react";

// ----------------------
// Modern Integration Card Component
// Location: /src/components/admin/ModernIntegrationCard.tsx
// Purpose: Single, reusable modern card for all integration types
// Features: Sleek design, consistent layout, dynamic content
// Design: Based on the modern card shown in the image
// ----------------------

interface ModernIntegrationCardProps {
  integration: {
    id: string;
    name: string;
    provider: string;
    description: string;
    category: string;
    pricing: 'free' | 'paid' | 'enterprise';
    version: string;
    icon: string;
    status: 'available' | 'installed' | 'pending' | 'deprecated';
    rating: number;
    downloads: number;
    features: string[];
    compatibility: string[];
    lastUpdated: string;
    documentation: string;
  };
  onInstall?: (id: string) => void;
  onConfigure?: (id: string) => void;
  onMore?: (id: string) => void;
}

export function ModernIntegrationCard({ 
  integration, 
  onInstall, 
  onConfigure, 
  onMore 
}: ModernIntegrationCardProps) {
  // Safety check for undefined integration
  if (!integration) {
    return (
      <Card className="group relative overflow-hidden bg-admin-card border-line-soft hover:shadow-lg transition-all duration-300 ease-in-out">
        <CardHeader className="pb-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-surface-elev1 flex items-center justify-center flex-shrink-0">
              <Webhook className="h-6 w-6 text-text-muted" />
            </div>
            <div className="flex-1 min-w-0">
              <CardTitle className="text-lg font-semibold text-text">
                No Integration Selected
              </CardTitle>
              <CardDescription className="text-text-muted leading-relaxed">
                Choose an integration from the dropdown above to view details and manage settings
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Placeholder Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-surface-elev1 rounded-lg">
              <div className="flex items-center justify-center gap-1 text-text-muted">
                <Activity className="h-4 w-4" />
                <span className="font-semibold">--</span>
              </div>
              <p className="text-xs text-text-muted">Status</p>
            </div>
            <div className="text-center p-3 bg-surface-elev1 rounded-lg">
              <div className="flex items-center justify-center gap-1 text-text-muted">
                <Star className="h-4 w-4" />
                <span className="font-semibold">--</span>
              </div>
              <p className="text-xs text-text-muted">Rating</p>
            </div>
          </div>

          {/* Placeholder Features */}
          <div className="flex flex-wrap gap-1.5">
            <div className="h-6 w-16 bg-surface-elev1 rounded animate-pulse"></div>
            <div className="h-6 w-20 bg-surface-elev1 rounded animate-pulse"></div>
            <div className="h-6 w-14 bg-surface-elev1 rounded animate-pulse"></div>
          </div>

          {/* Placeholder Compatibility */}
          <div className="text-xs text-text-muted">
            <span className="font-medium text-text">Compatible with:</span> Select an integration to view compatibility
          </div>
          
          {/* Placeholder Action Buttons */}
          <div className="flex gap-2 pt-2">
            <Button 
              className="flex-1 bg-surface-elev1 text-text-muted border-line-soft cursor-not-allowed"
              disabled
            >
              <Download className="h-4 w-4 mr-2" />
              Select Integration
            </Button>
            <Button 
              variant="outline" 
              className="flex-1 border-line-soft text-text-muted cursor-not-allowed"
              disabled
            >
              <Eye className="h-4 w-4 mr-2" />
              View
            </Button>
            <Button 
              variant="outline" 
              className="flex-1 border-line-soft text-text-muted cursor-not-allowed"
              disabled
            >
              <MoreHorizontal className="h-4 w-4 mr-2" />
              More
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const getStatusConfig = (status: string) => {
    const statusConfig = {
      available: { 
        variant: 'default' as const, 
        icon: Plus, 
        text: 'Available', 
        color: 'text-blue-600',
        bgColor: 'bg-blue-50 dark:bg-blue-950/20',
        borderColor: 'border-blue-200 dark:border-blue-800'
      },
      installed: { 
        variant: 'secondary' as const, 
        icon: CheckCircle, 
        text: 'Installed', 
        color: 'text-green-600',
        bgColor: 'bg-green-50 dark:bg-green-950/20',
        borderColor: 'border-green-200 dark:border-green-800'
      },
      pending: { 
        variant: 'secondary' as const, 
        icon: Clock, 
        text: 'Pending', 
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-50 dark:bg-yellow-950/20',
        borderColor: 'border-yellow-200 dark:border-yellow-800'
      },
      deprecated: { 
        variant: 'destructive' as const, 
        icon: AlertTriangle, 
        text: 'Deprecated', 
        color: 'text-red-600',
        bgColor: 'bg-red-50 dark:bg-red-950/20',
        borderColor: 'border-red-200 dark:border-red-800'
      }
    };
    return statusConfig[status as keyof typeof statusConfig] || statusConfig.available;
  };

  const getPricingConfig = (pricing: string) => {
    const pricingConfig = {
      free: { 
        variant: 'default' as const, 
        text: 'Free', 
        color: 'text-green-600',
        bgColor: 'bg-green-50 dark:bg-green-950/20',
        borderColor: 'border-green-200 dark:border-green-800'
      },
      paid: { 
        variant: 'secondary' as const, 
        text: 'Paid', 
        color: 'text-blue-600',
        bgColor: 'bg-blue-50 dark:bg-blue-950/20',
        borderColor: 'border-blue-200 dark:border-blue-800'
      },
      enterprise: { 
        variant: 'destructive' as const, 
        text: 'Enterprise', 
        color: 'text-purple-600',
        bgColor: 'bg-purple-50 dark:bg-purple-950/20',
        borderColor: 'border-purple-200 dark:border-purple-800'
      }
    };
    return pricingConfig[pricing as keyof typeof pricingConfig] || pricingConfig.free;
  };

  const getProviderIcon = (provider: string) => {
    const providerIcons = {
      'Stripe': DollarSign,
      'PayPal': DollarSign,
      'Google': BarChart3,
      'SendGrid': Mail,
      'Amazon Web Services': Database,
      'Discord': Users,
      'HubSpot': Target,
      'Auth0': Lock
    };
    return providerIcons[provider as keyof typeof providerIcons] || Zap;
  };

  const statusConfig = getStatusConfig(integration.status);
  const pricingConfig = getPricingConfig(integration.pricing);
  const ProviderIcon = getProviderIcon(integration.provider);

  return (
    <Card className="group relative overflow-hidden bg-admin-card border-line-soft hover:border-line-soft/80 hover:shadow-lg transition-all duration-300 ease-in-out">
      {/* Status Indicator */}
      <div className={`absolute top-4 right-4 ${statusConfig.bgColor} ${statusConfig.borderColor} border rounded-full px-3 py-1 flex items-center gap-1.5`}>
        <statusConfig.icon className={`h-3 w-3 ${statusConfig.color}`} />
        <span className={`text-xs font-medium ${statusConfig.color}`}>
          {statusConfig.text}
        </span>
      </div>

      <CardHeader className="pb-4">
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div className="w-12 h-12 rounded-xl bg-surface-elev1 flex items-center justify-center flex-shrink-0">
            <ProviderIcon className="h-6 w-6 text-text-muted" />
          </div>

          {/* Title and Description */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <CardTitle className="text-lg font-semibold text-text">
                {integration.name}
              </CardTitle>
              <Badge variant="outline" className="text-xs font-medium border-line-soft text-text-muted">
                {integration.provider}
              </Badge>
            </div>
            <CardDescription className="text-sm text-text-muted leading-relaxed">
              {integration.description}
            </CardDescription>
          </div>
        </div>

        {/* Tags Row */}
        <div className="flex items-center gap-2 mt-3">
          <Badge variant="outline" className="text-xs font-medium border-line-soft text-text-muted">
            {integration.category}
          </Badge>
          <div className={`px-2 py-1 rounded-md text-xs font-medium ${pricingConfig.bgColor} ${pricingConfig.borderColor} border`}>
            <span className={pricingConfig.color}>
              {pricingConfig.text}
            </span>
          </div>
          <Badge variant="outline" className="text-xs font-medium border-line-soft text-text-muted">
            v{integration.version}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Rating and Downloads */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-yellow-500 fill-current" />
            <span className="text-sm font-semibold text-text">
              {integration.rating}
            </span>
            <span className="text-xs text-text-muted">
              ({integration.downloads.toLocaleString()} downloads)
            </span>
          </div>
          <div className="text-xs text-text-muted">
            Updated {new Date(integration.lastUpdated).toLocaleDateString()}
          </div>
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-1.5">
          {integration.features.slice(0, 4).map((feature) => (
            <Badge 
              key={feature} 
              variant="secondary" 
              className="text-xs font-medium bg-surface-elev1 text-text-muted hover:bg-surface-elev2"
            >
              {feature.replace('_', ' ')}
            </Badge>
          ))}
          {integration.features.length > 4 && (
            <Badge 
              variant="secondary" 
              className="text-xs font-medium bg-surface-elev1 text-text-muted hover:bg-surface-elev2"
            >
              +{integration.features.length - 4} more
            </Badge>
          )}
        </div>

        {/* Compatibility */}
        <div className="text-xs text-text-muted">
          <span className="font-medium text-text">Compatible with:</span> {integration.compatibility.join(', ')}
        </div>
        
        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          {integration.status === 'available' ? (
            <Button 
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-medium border border-primary"
              onClick={() => onInstall?.(integration.id)}
            >
              <Download className="h-4 w-4 mr-2" />
              Install
            </Button>
          ) : integration.status === 'installed' ? (
            <Button 
              className="flex-1 bg-secondary hover:bg-secondary/90 text-secondary-foreground font-medium border border-secondary"
              onClick={() => onConfigure?.(integration.id)}
            >
              <Settings className="h-4 w-4 mr-2" />
              Configure
            </Button>
          ) : null}
          
          <Button 
            variant="outline" 
            className="flex-1 border-line-soft text-text hover:bg-surface-elev1 font-medium"
            onClick={() => onMore?.(integration.id)}
          >
            <MoreHorizontal className="h-4 w-4 mr-2" />
            More
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
