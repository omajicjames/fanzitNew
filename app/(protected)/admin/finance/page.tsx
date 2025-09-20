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
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  CreditCard, 
  Banknote, 
  Search, 
  Filter,
  MoreHorizontal,
  Eye,
  Download,
  CheckCircle,
  Clock,
  AlertTriangle,
  Users,
  FileText,
  Calendar,
  PieChart,
  Star,
  Crown,
  FileImage,
  MapPin,
  Activity,
  Zap,
  Target,
  Award,
  Phone,
  Globe,
  Mail,
  Heart,
  Share2,
  ThumbsUp,
  ThumbsDown,
  Play,
  Pause,
  Volume2,
  VolumeX,
  ExternalLink,
  BadgeCheck,
  UserCheck,
  UserX,
  Building,
  RotateCcw,
  BarChart3,
  Settings,
  Ban,
  CheckSquare,
  XSquare,
  Reply,
  User
} from "lucide-react";

// ----------------------
// Financial Management Page
// Location: /app/(protected)/admin/finance/page.tsx
// Purpose: Comprehensive financial management for OnlyFans-like platform
// Features: Revenue tracking, payouts, taxes, subscription management
// Note: Mobile-first design with object-oriented structure
// ----------------------

interface FinancialData {
  id: string;
  type: 'revenue' | 'payout' | 'tax' | 'subscription' | 'refund';
  amount: number;
  creator: string;
  creatorId: string;
  description: string;
  status: 'completed' | 'pending' | 'failed' | 'processing';
  date: string;
  paymentMethod: 'stripe' | 'paypal' | 'bank_transfer' | 'crypto';
  transactionId: string;
  fees: number;
  netAmount: number;
  currency: string;
  category: string;
}

interface RevenueData {
  period: string;
  totalRevenue: number;
  platformFee: number;
  creatorEarnings: number;
  subscriptionRevenue: number;
  tipsRevenue: number;
  contentRevenue: number;
  growth: number;
}

class FinancialManagementService {
  private transactions: FinancialData[] = [
    {
      id: '1',
      type: 'revenue',
      amount: 1250.00,
      creator: 'sarah_fitness',
      creatorId: '1',
      description: 'Monthly subscription revenue',
      status: 'completed',
      date: '2025-01-25',
      paymentMethod: 'stripe',
      transactionId: 'txn_123456789',
      fees: 125.00,
      netAmount: 1125.00,
      currency: 'USD',
      category: 'subscription'
    },
    {
      id: '2',
      type: 'payout',
      amount: 1125.00,
      creator: 'sarah_fitness',
      creatorId: '1',
      description: 'Creator payout',
      status: 'completed',
      date: '2025-01-26',
      paymentMethod: 'bank_transfer',
      transactionId: 'payout_987654321',
      fees: 0,
      netAmount: 1125.00,
      currency: 'USD',
      category: 'payout'
    },
    {
      id: '3',
      type: 'tax',
      amount: 225.00,
      creator: 'sarah_fitness',
      creatorId: '1',
      description: 'Tax withholding',
      status: 'completed',
      date: '2025-01-26',
      paymentMethod: 'bank_transfer',
      transactionId: 'tax_456789123',
      fees: 0,
      netAmount: 225.00,
      currency: 'USD',
      category: 'tax'
    }
  ];

  private revenueData: RevenueData[] = [
    {
      period: '2025-01',
      totalRevenue: 125000,
      platformFee: 12500,
      creatorEarnings: 112500,
      subscriptionRevenue: 80000,
      tipsRevenue: 25000,
      contentRevenue: 20000,
      growth: 15.3
    },
    {
      period: '2024-12',
      totalRevenue: 108500,
      platformFee: 10850,
      creatorEarnings: 97650,
      subscriptionRevenue: 70000,
      tipsRevenue: 20000,
      contentRevenue: 18500,
      growth: 8.7
    }
  ];

  public getAllTransactions(): FinancialData[] {
    return this.transactions;
  }

  public getTransactionsByType(type: string): FinancialData[] {
    return this.transactions.filter(t => t.type === type);
  }

  public getTransactionsByStatus(status: string): FinancialData[] {
    return this.transactions.filter(t => t.status === status);
  }

  public getRevenueData(): RevenueData[] {
    return this.revenueData;
  }

  public getTotalRevenue(): number {
    return this.revenueData[0]?.totalRevenue || 0;
  }

  public getTotalPayouts(): number {
    return this.transactions
      .filter(t => t.type === 'payout' && t.status === 'completed')
      .reduce((sum, t) => sum + t.amount, 0);
  }

  public getTotalFees(): number {
    return this.transactions
      .filter(t => t.type === 'revenue')
      .reduce((sum, t) => sum + t.fees, 0);
  }
}

// ----------------------
// Professional Financial Transaction Card Component
// Purpose: Displays financial transaction information in a structured, professional layout
// Note: Similar to verification card with financial-specific data
// ----------------------
function ProfessionalTransactionCard({
  transaction,
  onView,
  onExport,
  onMore,
  className = ""
}: {
  transaction: FinancialData;
  onView?: () => void;
  onExport?: () => void;
  onMore?: () => void;
  className?: string;
}) {
  const getStatusBadge = () => {
    const statusConfig = {
      completed: { variant: "default" as const, icon: CheckCircle, text: "Completed", color: "text-green-600" },
      pending: { variant: "secondary" as const, icon: Clock, text: "Pending", color: "text-yellow-600" },
      failed: { variant: "destructive" as const, icon: AlertTriangle, text: "Failed", color: "text-red-600" },
      processing: { variant: "secondary" as const, icon: Clock, text: "Processing", color: "text-blue-600" }
    };

    const config = statusConfig[transaction.status];
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {config.text}
      </Badge>
    );
  };

  const getTypeIcon = () => {
    const typeIcons = {
      revenue: DollarSign,
      payout: Banknote,
      tax: FileText,
      subscription: Users,
      refund: TrendingDown
    };

    const Icon = typeIcons[transaction.type];
    return <Icon className="h-4 w-4" />;
  };

  const getAmountColor = () => {
    if (transaction.type === 'revenue') return 'text-green-600';
    if (transaction.type === 'payout' || transaction.type === 'tax') return 'text-red-600';
    return 'text-text-muted';
  };

  const getTypeBadge = () => {
    const typeConfig = {
      revenue: { variant: "default" as const, text: "Revenue", color: "text-green-600" },
      payout: { variant: "secondary" as const, text: "Payout", color: "text-blue-600" },
      tax: { variant: "destructive" as const, text: "Tax", color: "text-red-600" },
      subscription: { variant: "outline" as const, text: "Subscription", color: "text-purple-600" },
      refund: { variant: "destructive" as const, text: "Refund", color: "text-orange-600" }
    };

    const config = typeConfig[transaction.type];
    return (
      <Badge variant={config.variant} className="text-xs">
        {config.text}
      </Badge>
    );
  };

  const getPaymentMethodIcon = () => {
    const methodIcons = {
      stripe: CreditCard,
      paypal: CreditCard,
      bank_transfer: Building,
      crypto: DollarSign
    };
    const Icon = methodIcons[transaction.paymentMethod];
    return <Icon className="h-4 w-4" />;
  };

  return (
    <Card className={`bg-admin-card border-line-soft hover:shadow-lg transition-all duration-200 ${className}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-lg bg-surface-elev2 flex items-center justify-center border border-line-soft">
              {getTypeIcon()}
            </div>
            <div>
              <CardTitle className="text-lg text-text flex items-center gap-2">
                {transaction.description}
                {getTypeBadge()}
              </CardTitle>
              <CardDescription className="text-text-muted">
                {transaction.creator} • {transaction.transactionId}
              </CardDescription>
            </div>
          </div>
          <div className="text-right">
            <div className={`text-2xl font-bold ${getAmountColor()}`}>
              ${transaction.amount.toLocaleString()}
            </div>
            <div className="text-sm text-text-muted">
              Net: ${transaction.netAmount.toLocaleString()}
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Transaction Overview */}
        <div className="bg-surface-elev2 rounded-lg p-4 border border-line-soft">
          <div className="flex items-center gap-2 mb-3">
            {getTypeIcon()}
            <span className="font-medium text-text">Transaction Overview</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-sm text-text-muted">Type:</span>
              <div className="mt-1">
                {getTypeBadge()}
              </div>
            </div>
            <div>
              <span className="text-sm text-text-muted">Status:</span>
              <div className="mt-1">
                {getStatusBadge()}
              </div>
            </div>
            <div>
              <span className="text-sm text-text-muted">Category:</span>
              <div className="mt-1">
                <Badge variant="outline" className="text-xs">
                  {transaction.category}
                </Badge>
              </div>
            </div>
            <div>
              <span className="text-sm text-text-muted">Payment Method:</span>
              <div className="mt-1 flex items-center gap-1">
                {getPaymentMethodIcon()}
                <span className="text-sm text-text">{transaction.paymentMethod}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Financial Details */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-surface-elev2 rounded-lg p-4 text-center border border-line-soft">
            <div className="flex items-center justify-center gap-1 text-text-muted mb-1">
              <DollarSign className="h-4 w-4" />
              <span className="text-xs font-medium">Amount</span>
            </div>
            <div className={`text-lg font-bold ${getAmountColor()}`}>
              ${transaction.amount.toLocaleString()}
            </div>
          </div>
          <div className="bg-surface-elev2 rounded-lg p-4 text-center border border-line-soft">
            <div className="flex items-center justify-center gap-1 text-text-muted mb-1">
              <CreditCard className="h-4 w-4" />
              <span className="text-xs font-medium">Fees</span>
            </div>
            <div className="text-lg font-bold text-text">
              ${transaction.fees.toLocaleString()}
            </div>
          </div>
          <div className="bg-surface-elev2 rounded-lg p-4 text-center border border-line-soft">
            <div className="flex items-center justify-center gap-1 text-text-muted mb-1">
              <TrendingUp className="h-4 w-4" />
              <span className="text-xs font-medium">Net</span>
            </div>
            <div className="text-lg font-bold text-text">
              ${transaction.netAmount.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Creator Information */}
        <div className="bg-surface-elev2 rounded-lg p-4 border border-line-soft">
          <div className="flex items-center gap-2 mb-3">
            <User className="h-5 w-5 text-text-muted" />
            <span className="font-medium text-text">Creator Information</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-surface-elev1 flex items-center justify-center border border-line-soft">
              <User className="h-5 w-5 text-text-muted" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-text">{transaction.creator}</p>
              <p className="text-xs text-text-muted">ID: {transaction.creatorId}</p>
            </div>
            <div className="text-sm text-text-muted">
              {new Date(transaction.date).toLocaleDateString()}
            </div>
          </div>
        </div>

        {/* Transaction Details */}
        <div className="bg-surface-elev2 rounded-lg p-4 border border-line-soft">
          <div className="flex items-center gap-2 mb-3">
            <FileText className="h-5 w-5 text-text-muted" />
            <span className="font-medium text-text">Transaction Details</span>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-text-muted">Transaction ID:</span>
              <span className="ml-2 text-text font-mono">{transaction.transactionId}</span>
            </div>
            <div>
              <span className="text-text-muted">Currency:</span>
              <span className="ml-2 text-text">{transaction.currency}</span>
            </div>
            <div>
              <span className="text-text-muted">Date:</span>
              <span className="ml-2 text-text">{new Date(transaction.date).toLocaleDateString()}</span>
            </div>
            <div>
              <span className="text-text-muted">Status:</span>
              <span className="ml-2 text-text">{transaction.status}</span>
            </div>
          </div>
        </div>

        {/* Fee Breakdown */}
        {transaction.fees > 0 && (
          <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <CreditCard className="h-5 w-5 text-red-400" />
              <span className="font-medium text-red-300">Fee Breakdown</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-red-200">Platform Fee:</span>
                <span className="text-sm font-bold text-red-300">
                  -${transaction.fees.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-red-200">Net Amount:</span>
                <span className="text-sm font-bold text-red-300">
                  ${transaction.netAmount.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Revenue Information */}
        {transaction.type === 'revenue' && (
          <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="h-5 w-5 text-green-400" />
              <span className="font-medium text-green-300">Revenue Information</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-green-200">Gross Revenue:</span>
                <span className="text-sm font-bold text-green-300">
                  ${transaction.amount.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-green-200">Platform Fee (10%):</span>
                <span className="text-sm font-bold text-green-300">
                  -${transaction.fees.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-green-200">Creator Earnings:</span>
                <span className="text-sm font-bold text-green-300">
                  ${transaction.netAmount.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2 border-t border-line-soft">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 bg-surface-elev2 border-line-soft text-text hover:bg-surface-elev1"
            onClick={onView}
          >
            <Eye className="h-4 w-4 mr-2" />
            View
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 bg-surface-elev2 border-line-soft text-text hover:bg-surface-elev1"
            onClick={onExport}
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="bg-surface-elev2 border-line-soft text-text hover:bg-surface-elev1"
            onClick={onMore}
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// ----------------------
// Financial Detail View Component
// Purpose: Single card view with filtering and quick stats
// Note: Similar to verification page with financial-specific data
// ----------------------
function FinancialDetailView({
  transactions,
  selectedTransactionId,
  onTransactionSelect,
  onView,
  onExport,
  onMore,
  className = ""
}: {
  transactions: FinancialData[];
  selectedTransactionId?: string;
  onTransactionSelect?: (transactionId: string) => void;
  onView?: (transactionId: string) => void;
  onExport?: (transactionId: string) => void;
  onMore?: (transactionId: string) => void;
  className?: string;
}) {
  const selectedTransaction = transactions.find(t => t.id === selectedTransactionId) || transactions[0];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      completed: { variant: "default" as const, color: "text-green-600", bgColor: "bg-green-100" },
      pending: { variant: "secondary" as const, color: "text-yellow-600", bgColor: "bg-yellow-100" },
      failed: { variant: "destructive" as const, color: "text-red-600", bgColor: "bg-red-100" },
      processing: { variant: "secondary" as const, color: "text-blue-600", bgColor: "bg-blue-100" }
    };
    return statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
  };

  const getTypeIcon = (type: string) => {
    const typeIcons = {
      revenue: DollarSign,
      payout: Banknote,
      tax: FileText,
      subscription: Users,
      refund: TrendingDown
    };
    const Icon = typeIcons[type as keyof typeof typeIcons];
    return Icon;
  };

  const statusInfo = getStatusBadge(selectedTransaction?.status || 'pending');

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Filter Section */}
      <SelectFilterSection
        title="Select Transaction"
        placeholder="Choose a transaction..."
        value={selectedTransactionId || transactions[0]?.id}
        onValueChange={onTransactionSelect}
        options={transactions.map((transaction) => {
          const Icon = getTypeIcon(transaction.type);
          return {
            id: transaction.id,
            label: transaction.description,
            icon: <Icon className="h-4 w-4" />,
            status: transaction.status
          };
        })}
      />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Transaction Card */}
        <div className="lg:col-span-2">
          {selectedTransaction ? (
            <ProfessionalTransactionCard
              transaction={selectedTransaction}
              onView={() => onView?.(selectedTransaction.id)}
              onExport={() => onExport?.(selectedTransaction.id)}
              onMore={() => onMore?.(selectedTransaction.id)}
            />
          ) : (
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 text-center">
              <DollarSign className="h-12 w-12 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-400">No transaction selected</p>
            </div>
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
              {/* Status */}
              <div className="flex items-center justify-between p-3 bg-surface-elev2 rounded-lg">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-text-muted" />
                  <span className="text-sm font-medium text-text">Status</span>
                </div>
                <div className={`px-2 py-1 rounded text-xs font-semibold ${statusInfo.bgColor} ${statusInfo.color}`}>
                  {selectedTransaction?.status || 'N/A'}
                </div>
              </div>

              {/* Type */}
              <div className="flex items-center justify-between p-3 bg-surface-elev2 rounded-lg">
                <div className="flex items-center gap-2">
                  {selectedTransaction && (() => {
                    const Icon = getTypeIcon(selectedTransaction.type);
                    return <Icon className="h-4 w-4 text-text-muted" />;
                  })()}
                  <span className="text-sm font-medium text-text">Type</span>
                </div>
                <span className="text-sm font-semibold text-text">
                  {selectedTransaction?.type?.toUpperCase() || 'N/A'}
                </span>
              </div>

              {/* Amount */}
              <div className="flex items-center justify-between p-3 bg-surface-elev2 rounded-lg">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-text-muted" />
                  <span className="text-sm font-medium text-text">Amount</span>
                </div>
                <span className="text-sm font-semibold text-text">
                  ${selectedTransaction?.amount?.toLocaleString() || '0'}
                </span>
              </div>

              {/* Net Amount */}
              <div className="flex items-center justify-between p-3 bg-surface-elev2 rounded-lg">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-text-muted" />
                  <span className="text-sm font-medium text-text">Net Amount</span>
                </div>
                <span className="text-sm font-semibold text-text">
                  ${selectedTransaction?.netAmount?.toLocaleString() || '0'}
                </span>
              </div>

              {/* Fees */}
              <div className="flex items-center justify-between p-3 bg-surface-elev2 rounded-lg">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-text-muted" />
                  <span className="text-sm font-medium text-text">Fees</span>
                </div>
                <span className="text-sm font-semibold text-text">
                  ${selectedTransaction?.fees?.toLocaleString() || '0'}
                </span>
              </div>

              {/* Currency */}
              <div className="flex items-center justify-between p-3 bg-surface-elev2 rounded-lg">
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-text-muted" />
                  <span className="text-sm font-medium text-text">Currency</span>
                </div>
                <span className="text-sm font-semibold text-text">
                  {selectedTransaction?.currency || 'N/A'}
                </span>
              </div>

              {/* Date */}
              <div className="flex items-center justify-between p-3 bg-surface-elev2 rounded-lg">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-text-muted" />
                  <span className="text-sm font-medium text-text">Date</span>
                </div>
                <span className="text-sm text-text-muted">
                  {selectedTransaction?.date ? new Date(selectedTransaction.date).toLocaleDateString() : 'N/A'}
                </span>
              </div>
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
                onClick={() => onView?.(selectedTransaction?.id || '')}
              >
                <Eye className="h-4 w-4 mr-2" />
                View Transaction
              </Button>
              <Button 
                variant="outline" 
                className="w-full bg-surface-elev2 border-line-soft text-text hover:bg-surface-elev1"
                onClick={() => onExport?.(selectedTransaction?.id || '')}
              >
                <Download className="h-4 w-4 mr-2" />
                Export Transaction
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// ----------------------
// Financial Page Client Component
// Purpose: Manages state and interactions for the financial page
// ----------------------
function FinancialPageClient() {
  const [selectedTransactionId, setSelectedTransactionId] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const financialService = new FinancialManagementService();
  const allTransactions = financialService.getAllTransactions();
  const revenueData = financialService.getRevenueData();

  // Filter transactions based on search, status, and type
  const filteredTransactions = allTransactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.creator.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || transaction.status === statusFilter;
    const matchesType = typeFilter === 'all' || transaction.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  // Set default selected transaction
  useEffect(() => {
    if (filteredTransactions.length > 0 && !selectedTransactionId) {
      setSelectedTransactionId(filteredTransactions[0].id);
    }
  }, [filteredTransactions, selectedTransactionId]);

  const handleTransactionSelect = (transactionId: string) => {
    setSelectedTransactionId(transactionId);
  };

  const handleView = (transactionId: string) => {
    console.log('View transaction:', transactionId);
  };

  const handleExport = (transactionId: string) => {
    console.log('Export transaction:', transactionId);
  };

  const handleMore = (transactionId: string) => {
    console.log('More actions for transaction:', transactionId);
  };

  const handleRefresh = () => {
    console.log('Refresh transactions');
  };

  const handleExportAll = () => {
    console.log('Export all transactions');
  };

  const statsCards = (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard
        title="Total Revenue"
        value={financialService.getTotalRevenue()}
        growth={15.3}
        icon={DollarSign}
        format="currency"
      />
      <MetricCard
        title="Total Payouts"
        value={financialService.getTotalPayouts()}
        growth={8.2}
        icon={Banknote}
        format="currency"
      />
      <MetricCard
        title="Platform Fees"
        value={financialService.getTotalFees()}
        growth={12.5}
        icon={CreditCard}
        format="currency"
      />
      <MetricCard
        title="Pending Transactions"
        value={financialService.getTransactionsByStatus('pending').length}
        growth={-5.2}
        icon={Clock}
        format="number"
      />
    </div>
  );

  const filters = (
    <div className="flex items-center gap-2">
      <Select value={statusFilter} onValueChange={setStatusFilter}>
        <SelectTrigger className="w-40 bg-surface-elev2 border-line-soft text-text">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent className="bg-surface-elev2 border-line-soft">
          <SelectItem value="all" className="text-text hover:bg-surface-elev1">All Status</SelectItem>
          <SelectItem value="completed" className="text-text hover:bg-surface-elev1">Completed</SelectItem>
          <SelectItem value="pending" className="text-text hover:bg-surface-elev1">Pending</SelectItem>
          <SelectItem value="failed" className="text-text hover:bg-surface-elev1">Failed</SelectItem>
          <SelectItem value="processing" className="text-text hover:bg-surface-elev1">Processing</SelectItem>
        </SelectContent>
      </Select>
      <Select value={typeFilter} onValueChange={setTypeFilter}>
        <SelectTrigger className="w-40 bg-surface-elev2 border-line-soft text-text">
          <SelectValue placeholder="Type" />
        </SelectTrigger>
        <SelectContent className="bg-surface-elev2 border-line-soft">
          <SelectItem value="all" className="text-text hover:bg-surface-elev1">All Types</SelectItem>
          <SelectItem value="revenue" className="text-text hover:bg-surface-elev1">Revenue</SelectItem>
          <SelectItem value="payout" className="text-text hover:bg-surface-elev1">Payout</SelectItem>
          <SelectItem value="tax" className="text-text hover:bg-surface-elev1">Tax</SelectItem>
          <SelectItem value="subscription" className="text-text hover:bg-surface-elev1">Subscription</SelectItem>
          <SelectItem value="refund" className="text-text hover:bg-surface-elev1">Refund</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );

  return (
    <AdminPageTemplate
      title="Financial Management"
      description="Track revenue, payouts, and financial analytics"
      icon={<DollarSign className="h-6 w-6" />}
      searchPlaceholder="Search transactions by creator, ID, or description..."
      searchValue={searchTerm}
      onSearchChange={setSearchTerm}
      showSearch={true}
      showFilters={true}
      showRefresh={true}
      showExport={true}
      onRefresh={handleRefresh}
      onExport={handleExportAll}
      filters={filters}
      stats={statsCards}
    >
      <FinancialDetailView
        transactions={filteredTransactions}
        selectedTransactionId={selectedTransactionId}
        onTransactionSelect={handleTransactionSelect}
        onView={handleView}
        onExport={handleExport}
        onMore={handleMore}
      />
    </AdminPageTemplate>
  );
}

export default function FinancialManagementPage() {
  return <FinancialPageClient />;
}
