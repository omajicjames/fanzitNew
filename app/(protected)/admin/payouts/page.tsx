"use client";

import { AdminPillNavigationComponent } from "@src/components/admin/AdminPillNavigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@src/components/ui/card";
import { Badge } from "@src/components/ui/badge";
import { Button } from "@src/components/ui/button";
import { Input } from "@src/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@src/components/ui/tabs";
import { 
  DollarSign, 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Eye, 
  Check, 
  X, 
  Clock,
  User,
  TrendingUp,
  BarChart3,
  CheckCircle,
  AlertTriangle,
  Shield,
  Download,
  Upload,
  CreditCard,
  Building,
  FileText,
  Calendar,
  Banknote,
  ReceiptText,
  Wallet,
  Zap,
  Target,
  Award,
  Activity,
  Settings,
  Ban,
  CheckCircle2,
  XCircle,
  RotateCcw,
  ExternalLink,
  MessageSquare,
  Flag,
  UserCheck,
  UserX,
  Globe,
  Mail,
  Phone,
  MapPin
} from "lucide-react";

// ----------------------
// Payouts Management Page
// Location: /app/(protected)/admin/payouts/page.tsx
// Purpose: Comprehensive payout management and financial administration
// Features: Payout requests, payment processing, financial tracking
// Note: Mobile-first design with object-oriented structure
// ----------------------

interface PayoutRequest {
  id: string;
  creator: {
    id: string;
    username: string;
    name: string;
    email: string;
    avatar_url: string;
    is_verified: boolean;
    country: string;
    city: string;
  };
  amount: number;
  amount_cents: number;
  currency: string;
  method: 'bank_transfer' | 'paypal' | 'stripe' | 'crypto' | 'check';
  status: 'pending' | 'approved' | 'denied' | 'processing' | 'completed' | 'failed';
  created_at: string;
  processed_at?: string;
  completed_at?: string;
  notes?: string;
  admin_notes?: string;
  processing_fee: number;
  net_amount: number;
  bank_details?: {
    account_name: string;
    account_number: string;
    routing_number: string;
    bank_name: string;
    swift_code?: string;
    iban?: string;
  };
  payment_details?: {
    paypal_email?: string;
    stripe_account?: string;
    crypto_address?: string;
    check_address?: string;
  };
  tax_info: {
    w9_status: 'not_applicable' | 'pending' | 'approved' | 'rejected';
    tax_id?: string;
    business_name?: string;
  };
  verification_status: 'verified' | 'pending' | 'failed';
  risk_score: number;
  flags: string[];
  transaction_id?: string;
  reference_number?: string;
}

interface PayoutStats {
  totalRequests: number;
  pendingRequests: number;
  approvedRequests: number;
  deniedRequests: number;
  totalAmount: number;
  totalFees: number;
  averageAmount: number;
  processingTime: number;
  highRiskRequests: number;
  completedPayouts: number;
}

class PayoutsManagementService {
  private requests: PayoutRequest[] = [];

  constructor() {
    this.initializeMockData();
  }

  private initializeMockData() {
    this.requests = [
      {
        id: "1",
        creator: {
          id: "1",
          username: "@sarahj",
          name: "Sarah Johnson",
          email: "sarah@example.com",
          avatar_url: "/placeholder-user.jpg",
          is_verified: true,
          country: "United States",
          city: "Los Angeles"
        },
        amount: 1250.50,
        amount_cents: 125050,
        currency: "USD",
        method: "bank_transfer",
        status: "pending",
        created_at: "2024-01-25T14:30:00Z",
        processing_fee: 25.01,
        net_amount: 1225.49,
        bank_details: {
          account_name: "Sarah Johnson",
          account_number: "****1234",
          routing_number: "021000021",
          bank_name: "Chase Bank",
          swift_code: "CHASUS33"
        },
        tax_info: {
          w9_status: "approved",
          tax_id: "12-3456789",
          business_name: "Sarah Johnson Fitness LLC"
        },
        verification_status: "verified",
        risk_score: 15,
        flags: [],
        reference_number: "PAY-2024-001"
      },
      {
        id: "2",
        creator: {
          id: "2",
          username: "@mikechen",
          name: "Mike Chen",
          email: "mike@example.com",
          avatar_url: "/placeholder-user.jpg",
          is_verified: true,
          country: "Canada",
          city: "Toronto"
        },
        amount: 850.75,
        amount_cents: 85075,
        currency: "USD",
        method: "paypal",
        status: "approved",
        created_at: "2024-01-24T09:15:00Z",
        processed_at: "2024-01-24T16:30:00Z",
        completed_at: "2024-01-25T08:00:00Z",
        processing_fee: 17.02,
        net_amount: 833.73,
        payment_details: {
          paypal_email: "mike@example.com"
        },
        tax_info: {
          w9_status: "not_applicable"
        },
        verification_status: "verified",
        risk_score: 8,
        flags: [],
        transaction_id: "TXN-789456123",
        reference_number: "PAY-2024-002"
      },
      {
        id: "3",
        creator: {
          id: "3",
          username: "@emmaw",
          name: "Emma Wilson",
          email: "emma@example.com",
          avatar_url: "/placeholder-user.jpg",
          is_verified: false,
          country: "United Kingdom",
          city: "London"
        },
        amount: 450.00,
        amount_cents: 45000,
        currency: "USD",
        method: "stripe",
        status: "denied",
        created_at: "2024-01-23T11:20:00Z",
        processed_at: "2024-01-24T10:00:00Z",
        admin_notes: "Insufficient verification documents provided",
        processing_fee: 9.00,
        net_amount: 441.00,
        payment_details: {
          stripe_account: "acct_1234567890"
        },
        tax_info: {
          w9_status: "pending"
        },
        verification_status: "failed",
        risk_score: 75,
        flags: ["insufficient_docs", "verification_failed"],
        reference_number: "PAY-2024-003"
      },
      {
        id: "4",
        creator: {
          id: "4",
          username: "@alexr",
          name: "Alex Rodriguez",
          email: "alex@example.com",
          avatar_url: "/placeholder-user.jpg",
          is_verified: true,
          country: "Spain",
          city: "Madrid"
        },
        amount: 2100.25,
        amount_cents: 210025,
        currency: "USD",
        method: "crypto",
        status: "processing",
        created_at: "2024-01-26T16:45:00Z",
        processed_at: "2024-01-27T09:00:00Z",
        processing_fee: 42.01,
        net_amount: 2058.24,
        payment_details: {
          crypto_address: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"
        },
        tax_info: {
          w9_status: "approved",
          tax_id: "98-7654321",
          business_name: "Alex Rodriguez Tech S.L."
        },
        verification_status: "verified",
        risk_score: 25,
        flags: [],
        reference_number: "PAY-2024-004"
      }
    ];
  }

  public getRequests(): PayoutRequest[] {
    return this.requests;
  }

  public getStats(): PayoutStats {
    const totalRequests = this.requests.length;
    const pendingRequests = this.requests.filter(r => r.status === 'pending').length;
    const approvedRequests = this.requests.filter(r => r.status === 'approved').length;
    const deniedRequests = this.requests.filter(r => r.status === 'denied').length;
    const totalAmount = this.requests.reduce((sum, r) => sum + r.amount, 0);
    const totalFees = this.requests.reduce((sum, r) => sum + r.processing_fee, 0);
    const averageAmount = totalRequests > 0 ? totalAmount / totalRequests : 0;
    const processingTime = 1.5; // days
    const highRiskRequests = this.requests.filter(r => r.risk_score > 50).length;
    const completedPayouts = this.requests.filter(r => r.status === 'completed').length;

    return {
      totalRequests,
      pendingRequests,
      approvedRequests,
      deniedRequests,
      totalAmount,
      totalFees,
      averageAmount,
      processingTime,
      highRiskRequests,
      completedPayouts
    };
  }
}

class PayoutCardComponent {
  private request: PayoutRequest;

  constructor(request: PayoutRequest) {
    this.request = request;
  }

  private getStatusBadge() {
    const statusConfig = {
      pending: { variant: "secondary" as const, icon: Clock, text: "Pending" },
      approved: { variant: "default" as const, icon: CheckCircle, text: "Approved" },
      denied: { variant: "destructive" as const, icon: XCircle, text: "Denied" },
      processing: { variant: "default" as const, icon: Zap, text: "Processing" },
      completed: { variant: "default" as const, icon: CheckCircle2, text: "Completed" },
      failed: { variant: "destructive" as const, icon: XCircle, text: "Failed" }
    };

    const config = statusConfig[this.request.status];
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {config.text}
      </Badge>
    );
  }

  private getMethodIcon() {
    const methodIcons = {
      bank_transfer: Building,
      paypal: CreditCard,
      stripe: CreditCard,
      crypto: Zap,
      check: FileText
    };

    const Icon = methodIcons[this.request.method];
    return <Icon className="h-4 w-4" />;
  }

  private getRiskLevel() {
    if (this.request.risk_score <= 25) return { level: "Low", color: "text-green-600" };
    if (this.request.risk_score <= 50) return { level: "Medium", color: "text-yellow-600" };
    return { level: "High", color: "text-red-600" };
  }

  public render() {
    const riskLevel = this.getRiskLevel();

    return (
      <Card className="group hover:shadow-lg transition-all duration-200">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="space-y-1 flex-1">
              <CardTitle className="text-lg flex items-center gap-2">
                {this.request.creator.name}
                {this.request.creator.is_verified && (
                  <CheckCircle className="h-4 w-4 text-blue-600" />
                )}
              </CardTitle>
              <CardDescription>@{this.request.creator.username}</CardDescription>
            </div>
            <div className="flex flex-col gap-1 ml-2">
              {this.getStatusBadge()}
              <Badge variant="outline" className="text-xs">
                {this.request.currency} ${this.request.amount.toFixed(2)}
              </Badge>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Creator Info */}
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
              <User className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{this.request.creator.email}</p>
              <div className="flex items-center gap-2 mt-1">
                <MapPin className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  {this.request.creator.country}, {this.request.creator.city}
                </span>
              </div>
            </div>
          </div>

          {/* Payment Details */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              {this.getMethodIcon()}
              <span className="text-sm font-medium">Payment Method:</span>
              <Badge variant="outline" className="text-xs">
                {this.request.method.replace('_', ' ').toUpperCase()}
              </Badge>
            </div>
            <div className="text-sm text-muted-foreground">
              <p>Reference: {this.request.reference_number}</p>
              {this.request.transaction_id && (
                <p>Transaction: {this.request.transaction_id}</p>
              )}
            </div>
          </div>

          {/* Amount Breakdown */}
          <div className="bg-muted/50 rounded-lg p-3 space-y-2">
            <div className="flex justify-between text-sm">
              <span>Amount:</span>
              <span className="font-medium">${this.request.amount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Processing Fee:</span>
              <span>${this.request.processing_fee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm font-medium border-t pt-2">
              <span>Net Amount:</span>
              <span>${this.request.net_amount.toFixed(2)}</span>
            </div>
          </div>

          {/* Tax Info */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Tax Status:</span>
              <Badge 
                variant={this.request.tax_info.w9_status === 'approved' ? 'default' : 'secondary'}
                className="text-xs"
              >
                W9 {this.request.tax_info.w9_status.replace('_', ' ').toUpperCase()}
              </Badge>
            </div>
            {this.request.tax_info.tax_id && (
              <p className="text-xs text-muted-foreground">
                Tax ID: {this.request.tax_info.tax_id}
              </p>
            )}
          </div>

          {/* Risk Assessment */}
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Risk Score:</span>
            <span className={`text-sm font-medium ${riskLevel.color}`}>
              {this.request.risk_score} ({riskLevel.level})
            </span>
          </div>

          {/* Flags */}
          {this.request.flags.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <div className="flex items-center gap-2 text-red-800 mb-2">
                <Flag className="h-4 w-4" />
                <span className="text-sm font-medium">Flags</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {this.request.flags.map((flag) => (
                  <Badge key={flag} variant="destructive" className="text-xs">
                    {flag.replace('_', ' ')}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Admin Notes */}
          {this.request.admin_notes && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="flex items-center gap-2 text-blue-800 mb-1">
                <MessageSquare className="h-4 w-4" />
                <span className="text-sm font-medium">Admin Notes</span>
              </div>
              <p className="text-sm text-blue-700">{this.request.admin_notes}</p>
            </div>
          )}

          {/* Timeline */}
          <div className="space-y-1 text-xs text-muted-foreground">
            <p>Created: {new Date(this.request.created_at).toLocaleString()}</p>
            {this.request.processed_at && (
              <p>Processed: {new Date(this.request.processed_at).toLocaleString()}</p>
            )}
            {this.request.completed_at && (
              <p>Completed: {new Date(this.request.completed_at).toLocaleString()}</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <Button variant="outline" size="sm" className="flex-1">
              <Eye className="h-4 w-4 mr-2" />
              Review
            </Button>
            {this.request.status === 'pending' && (
              <>
                <Button variant="outline" size="sm" className="flex-1">
                  <Check className="h-4 w-4 mr-2" />
                  Approve
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <X className="h-4 w-4 mr-2" />
                  Deny
                </Button>
              </>
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

export default function PayoutsPage() {
  const payoutsService = new PayoutsManagementService();
  const requests = payoutsService.getRequests();
  const stats = payoutsService.getStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Payouts Management</h1>
          <p className="text-muted-foreground">Manage creator payout requests and financial transactions</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Payout
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
            <ReceiptText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalRequests}</div>
            <p className="text-xs text-muted-foreground">
              {stats.pendingRequests} pending review
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Amount</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.totalAmount.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              ${stats.totalFees.toFixed(2)} in fees
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Amount</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.averageAmount.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              Per payout request
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Risk</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.highRiskRequests}</div>
            <p className="text-xs text-muted-foreground">
              Require attention
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search creators, amounts, or reference numbers..."
                  className="pl-10"
                />
              </div>
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            <Button variant="outline">
              <RotateCcw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Payout Requests Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {requests.map((request) => {
          const payoutCard = new PayoutCardComponent(request);
          return <div key={request.id}>{payoutCard.render()}</div>;
        })}
      </div>
    </div>
  );
}
