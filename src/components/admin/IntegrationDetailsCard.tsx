"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@src/components/ui/card";
import { Badge } from "@src/components/ui/badge";
import { Button } from "@src/components/ui/button";
import { Separator } from "@src/components/ui/separator";
import {
  X,
  ExternalLink,
  Shield,
  Settings,
  DollarSign,
  BookOpen,
  Activity,
  Zap,
  CheckCircle,
  AlertTriangle,
  Info
} from "lucide-react";

interface IntegrationDetailsCardProps {
  integration: {
    id: string;
    name: string;
    provider: string;
    description: string;
    features: string[];
    pricing: 'free' | 'paid' | 'enterprise';
    version: string;
    status: 'available' | 'installed' | 'pending' | 'deprecated';
    rating: number;
    downloads: number;
    category: string;
    requirements: string[];
    documentation: string;
    support: 'community' | 'email' | 'phone' | 'enterprise';
    lastUpdated: string;
    compatibility: string[];
  };
  onClose: () => void;
}

export function IntegrationDetailsCard({ integration, onClose }: IntegrationDetailsCardProps) {
  const getPricingInfo = (pricing: string) => {
    const pricingInfo = {
      free: { text: 'Free', color: 'text-green-400', bgColor: 'bg-green-500/20' },
      paid: { text: 'Paid', color: 'text-blue-400', bgColor: 'bg-blue-500/20' },
      enterprise: { text: 'Enterprise', color: 'text-purple-400', bgColor: 'bg-purple-500/20' }
    };
    return pricingInfo[pricing as keyof typeof pricingInfo] || pricingInfo.paid;
  };

  const getSupportInfo = (support: string) => {
    const supportInfo = {
      community: { text: 'Community Support', icon: Activity },
      email: { text: 'Email Support', icon: BookOpen },
      phone: { text: 'Phone Support', icon: Activity },
      enterprise: { text: 'Enterprise Support', icon: Shield }
    };
    return supportInfo[support as keyof typeof supportInfo] || supportInfo.email;
  };

  const pricingInfo = getPricingInfo(integration.pricing);
  const supportInfo = getSupportInfo(integration.support);

  return (
    <Card className="bg-admin-panel border-line-soft shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl text-text flex items-center gap-2">
              {integration.name} - Details
            </CardTitle>
            <CardDescription className="text-text-muted mt-1">
              {integration.description}
            </CardDescription>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-text-muted hover:text-text hover:bg-surface-elev1"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <Badge variant="outline" className="text-xs border-line-soft text-text-muted">
            {integration.provider}
          </Badge>
          <Badge variant="outline" className="text-xs border-line-soft text-text-muted">
            v{integration.version}
          </Badge>
          <div className={`px-2 py-1 rounded text-xs font-medium ${pricingInfo.bgColor}`}>
            <span className={pricingInfo.color}>{pricingInfo.text}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Technical Requirements & Compatibility */}
        <div>
          <h3 className="text-lg font-semibold text-text mb-3 flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Technical Requirements & Compatibility
          </h3>
          <div className="space-y-3">
            <div className="p-3 bg-surface-elev2 rounded-lg">
              <h4 className="text-sm font-medium text-text mb-2">API Credentials Needed:</h4>
              <div className="flex flex-wrap gap-1">
                {integration.requirements.map((req, index) => (
                  <Badge key={index} variant="secondary" className="text-xs bg-surface-elev1 text-text-muted">
                    {req}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="p-3 bg-surface-elev2 rounded-lg">
              <h4 className="text-sm font-medium text-text mb-2">Platform Compatibility:</h4>
              <div className="flex flex-wrap gap-1">
                {integration.compatibility.map((platform, index) => (
                  <Badge key={index} variant="outline" className="text-xs border-line-soft text-text-muted">
                    {platform}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        <Separator className="bg-line-soft" />

        {/* Permissions & Data Access */}
        <div>
          <h3 className="text-lg font-semibold text-text mb-3 flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Permissions & Data Access
          </h3>
          <div className="space-y-3">
            <div className="p-3 bg-surface-elev2 rounded-lg">
              <h4 className="text-sm font-medium text-text mb-2">API Scopes:</h4>
              <p className="text-sm text-text-muted">
                This integration will request: read:transactions, write:subscriptions, manage:webhooks
              </p>
            </div>
            <div className="p-3 bg-surface-elev2 rounded-lg">
              <h4 className="text-sm font-medium text-text mb-2">Data Accessed:</h4>
              <p className="text-sm text-text-muted">
                This integration will access: User email addresses, transaction amounts, subscription statuses
              </p>
            </div>
            <div className="p-3 bg-surface-elev2 rounded-lg">
              <h4 className="text-sm font-medium text-text mb-2">Data Stored:</h4>
              <p className="text-sm text-text-muted">
                This integration will store: Transaction IDs, Subscription IDs locally
              </p>
            </div>
          </div>
        </div>

        <Separator className="bg-line-soft" />

        {/* Configuration Steps */}
        <div>
          <h3 className="text-lg font-semibold text-text mb-3 flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Configuration Steps
          </h3>
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-text-muted">Create a {integration.provider} Developer account</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-text-muted">Create a new App to get credentials</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-text-muted">Add your redirect URLs in the {integration.provider} dashboard</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-text-muted">Enter your credentials below and enable the integration</p>
            </div>
          </div>
        </div>

        <Separator className="bg-line-soft" />

        {/* Pricing & Rate Limits */}
        <div>
          <h3 className="text-lg font-semibold text-text mb-3 flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Pricing & Rate Limits
          </h3>
          <div className="space-y-3">
            <div className="p-3 bg-surface-elev2 rounded-lg">
              <h4 className="text-sm font-medium text-text mb-2">Fee Structure:</h4>
              <p className="text-sm text-text-muted">
                {integration.pricing === 'free' 
                  ? 'Free to use with no transaction fees'
                  : integration.pricing === 'paid'
                  ? 'Standard transaction fees apply. Check provider documentation for current rates.'
                  : 'Enterprise pricing available. Contact sales for custom rates.'
                }
              </p>
            </div>
            <div className="p-3 bg-surface-elev2 rounded-lg">
              <h4 className="text-sm font-medium text-text mb-2">Rate Limits:</h4>
              <p className="text-sm text-text-muted">
                API Rate Limit: 500 calls per minute. Webhook Limit: 5,000 events per day
              </p>
            </div>
          </div>
        </div>

        <Separator className="bg-line-soft" />

        {/* Support & Documentation */}
        <div>
          <h3 className="text-lg font-semibold text-text mb-3 flex items-center gap-2">
            <supportInfo.icon className="h-5 w-5" />
            Support & Documentation
          </h3>
          <div className="space-y-3">
            <div className="p-3 bg-surface-elev2 rounded-lg">
              <h4 className="text-sm font-medium text-text mb-2">Support Type:</h4>
              <p className="text-sm text-text-muted">{supportInfo.text}</p>
            </div>
            <div className="p-3 bg-surface-elev2 rounded-lg">
              <h4 className="text-sm font-medium text-text mb-2">Documentation:</h4>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs border-line-soft text-text hover:bg-surface-elev1"
                  onClick={() => window.open(integration.documentation, '_blank')}
                >
                  <ExternalLink className="h-3 w-3 mr-1" />
                  {integration.provider} API Docs
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs border-line-soft text-text hover:bg-surface-elev1"
                >
                  <BookOpen className="h-3 w-3 mr-1" />
                  Internal Setup Guide
                </Button>
              </div>
            </div>
            <div className="p-3 bg-surface-elev2 rounded-lg">
              <h4 className="text-sm font-medium text-text mb-2">API Health:</h4>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 bg-green-400 rounded-full"></div>
                <span className="text-sm text-text-muted">All systems operational</span>
              </div>
            </div>
          </div>
        </div>

        {/* Advanced Features */}
        <div>
          <h3 className="text-lg font-semibold text-text mb-3 flex items-center gap-2">
            <Info className="h-5 w-5" />
            Advanced Features & Webhooks
          </h3>
          <div className="space-y-3">
            <div className="p-3 bg-surface-elev2 rounded-lg">
              <h4 className="text-sm font-medium text-text mb-2">Webhooks Handled:</h4>
              <p className="text-sm text-text-muted">
                This integration listens for: PAYMENT.CAPTURE.COMPLETED, BILLING.SUBSCRIPTION.ACTIVATED, 
                WEBHOOK.VERIFICATION.SUCCEEDED
              </p>
            </div>
            <div className="p-3 bg-surface-elev2 rounded-lg">
              <h4 className="text-sm font-medium text-text mb-2">Advanced Settings:</h4>
              <p className="text-sm text-text-muted">
                Options for: Sandbox mode, custom webhook endpoints, fee handling, retry policies
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
