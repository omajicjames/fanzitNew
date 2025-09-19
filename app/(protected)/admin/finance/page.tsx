"use client";

import { AdminPillNavigationComponent } from "@src/components/admin/AdminPillNavigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@src/components/ui/card";
import { Badge } from "@src/components/ui/badge";
import { Button } from "@src/components/ui/button";
import { Input } from "@src/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@src/components/ui/tabs";
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
  PieChart
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

class TransactionCardComponent {
  private transaction: FinancialData;

  constructor(transaction: FinancialData) {
    this.transaction = transaction;
  }

  private getStatusBadge() {
    const statusConfig = {
      completed: { variant: 'default' as const, icon: CheckCircle, text: 'Completed' },
      pending: { variant: 'secondary' as const, icon: Clock, text: 'Pending' },
      failed: { variant: 'destructive' as const, icon: AlertTriangle, text: 'Failed' },
      processing: { variant: 'secondary' as const, icon: Clock, text: 'Processing' }
    };

    const config = statusConfig[this.transaction.status];
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {config.text}
      </Badge>
    );
  }

  private getTypeIcon() {
    const typeIcons = {
      revenue: DollarSign,
      payout: Banknote,
      tax: FileText,
      subscription: Users,
      refund: TrendingDown
    };

    const Icon = typeIcons[this.transaction.type];
    return <Icon className="h-4 w-4" />;
  }

  private getAmountColor() {
    if (this.transaction.type === 'revenue') return 'text-green-600';
    if (this.transaction.type === 'payout' || this.transaction.type === 'tax') return 'text-red-600';
    return 'text-muted-foreground';
  }

  public render() {
    return (
      <Card className="bg-[var(--admin-card-bg)] border-neutral-700 hover:shadow-lg transition-shadow duration-200">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-[var(--admin-surface)] flex items-center justify-center">
                {this.getTypeIcon()}
              </div>
              <div className="flex-1 min-w-0">
                <CardTitle className="text-lg flex items-center gap-2 text-[var(--admin-text-primary)]">
                  {this.transaction.description}
                </CardTitle>
                <CardDescription className="text-[var(--admin-text-secondary)]">
                  {this.transaction.creator} • {this.transaction.transactionId}
                </CardDescription>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="text-xs bg-[var(--admin-surface)] border-neutral-600 text-neutral-300">
                    {this.transaction.category}
                  </Badge>
                  <Badge variant="outline" className="text-xs bg-[var(--admin-surface)] border-neutral-600 text-neutral-300">
                    {this.transaction.paymentMethod}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className={`text-2xl font-bold ${this.getAmountColor()}`}>
                ${this.transaction.amount.toLocaleString()}
              </div>
              <div className="text-sm text-[var(--admin-text-secondary)]">
                Net: ${this.transaction.netAmount.toLocaleString()}
              </div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            {this.getStatusBadge()}
            <span className="text-sm text-[var(--admin-text-secondary)]">
              {new Date(this.transaction.date).toLocaleDateString()}
            </span>
          </div>

          {this.transaction.fees > 0 && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-[var(--admin-text-secondary)]">Platform Fee:</span>
              <span className="text-red-500">-${this.transaction.fees.toLocaleString()}</span>
            </div>
          )}
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1 bg-[var(--admin-surface)] border-neutral-600 text-[var(--admin-text-primary)] hover:bg-[var(--admin-bg-alt)]">
              <Eye className="h-4 w-4 mr-1" />
              View
            </Button>
            <Button variant="outline" size="sm" className="flex-1 bg-[var(--admin-surface)] border-neutral-600 text-[var(--admin-text-primary)] hover:bg-[var(--admin-bg-alt)]">
              <Download className="h-4 w-4 mr-1" />
              Export
            </Button>
            <Button variant="outline" size="sm" className="bg-[var(--admin-surface)] border-neutral-600 text-[var(--admin-text-primary)] hover:bg-[var(--admin-bg-alt)]">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }
}

class RevenueCardComponent {
  private revenue: RevenueData;

  constructor(revenue: RevenueData) {
    this.revenue = revenue;
  }

  public render() {
    return (
      <Card className="bg-[var(--admin-card-bg)] border-neutral-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-[var(--admin-text-primary)]">
            <PieChart className="h-5 w-5 text-green-500" />
            Revenue - {this.revenue.period}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-[var(--admin-text-secondary)]">Total Revenue</p>
              <p className="text-2xl font-bold text-[var(--admin-text-primary)]">${this.revenue.totalRevenue.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-[var(--admin-text-secondary)]">Growth</p>
              <p className={`text-2xl font-bold flex items-center gap-1 ${
                this.revenue.growth > 0 ? 'text-green-500' : 'text-red-500'
              }`}>
                {this.revenue.growth > 0 ? <TrendingUp className="h-5 w-5" /> : <TrendingDown className="h-5 w-5" />}
                {this.revenue.growth}%
              </p>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-[var(--admin-text-secondary)]">Platform Fee (10%)</span>
              <span className="text-sm font-medium text-[var(--admin-text-primary)]">${this.revenue.platformFee.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-[var(--admin-text-secondary)]">Creator Earnings</span>
              <span className="text-sm font-medium text-[var(--admin-text-primary)]">${this.revenue.creatorEarnings.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-[var(--admin-text-secondary)]">Subscription Revenue</span>
              <span className="text-sm font-medium text-[var(--admin-text-primary)]">${this.revenue.subscriptionRevenue.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-[var(--admin-text-secondary)]">Tips Revenue</span>
              <span className="text-sm font-medium text-[var(--admin-text-primary)]">${this.revenue.tipsRevenue.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-[var(--admin-text-secondary)]">Content Revenue</span>
              <span className="text-sm font-medium text-[var(--admin-text-primary)]">${this.revenue.contentRevenue.toLocaleString()}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
}

export default function FinancialManagementPage() {
  const financialService = new FinancialManagementService();
  const allTransactions = financialService.getAllTransactions();
  const revenueTransactions = financialService.getTransactionsByType('revenue');
  const payoutTransactions = financialService.getTransactionsByType('payout');
  const pendingTransactions = financialService.getTransactionsByStatus('pending');
  const revenueData = financialService.getRevenueData();

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[var(--admin-text-primary)]">Financial Management</h1>
            <p className="text-[var(--admin-text-secondary)]">Track revenue, payouts, and financial analytics</p>
          </div>
          <Badge className="bg-orange-500 text-[var(--admin-text-primary)]">Super Admin</Badge>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-[var(--admin-text-primary)] mb-2">Financial Overview</h2>
        <p className="text-[var(--admin-text-secondary)] mb-6">Revenue, payouts, and financial metrics</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-[var(--admin-card-bg)] border border-neutral-700 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[var(--admin-text-secondary)] uppercase tracking-wide">Total Revenue</p>
                <p className="text-2xl font-bold text-[var(--admin-text-primary)]">${financialService.getTotalRevenue().toLocaleString()}</p>
                <div className="flex items-center gap-1 text-sm text-green-500">
                  <TrendingUp className="h-4 w-4" />
                  +15.3% from last month
                </div>
              </div>
              <DollarSign className="h-8 w-8 text-green-500" />
            </div>
          </div>
          
          <div className="bg-[var(--admin-card-bg)] border border-neutral-700 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[var(--admin-text-secondary)] uppercase tracking-wide">Total Payouts</p>
                <p className="text-2xl font-bold text-[var(--admin-text-primary)]">${financialService.getTotalPayouts().toLocaleString()}</p>
                <div className="flex items-center gap-1 text-sm text-blue-500">
                  <Banknote className="h-4 w-4" />
                  +8.2% from last month
                </div>
              </div>
              <Banknote className="h-8 w-8 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-[var(--admin-card-bg)] border border-neutral-700 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[var(--admin-text-secondary)] uppercase tracking-wide">Platform Fees</p>
                <p className="text-2xl font-bold text-[var(--admin-text-primary)]">${financialService.getTotalFees().toLocaleString()}</p>
                <div className="flex items-center gap-1 text-sm text-orange-500">
                  <CreditCard className="h-4 w-4" />
                  +12.5% from last month
                </div>
              </div>
              <CreditCard className="h-8 w-8 text-orange-500" />
            </div>
          </div>
          
          <div className="bg-[var(--admin-card-bg)] border border-neutral-700 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[var(--admin-text-secondary)] uppercase tracking-wide">Pending</p>
                <p className="text-2xl font-bold text-[var(--admin-text-primary)]">{pendingTransactions.length}</p>
                <div className="flex items-center gap-1 text-sm text-yellow-500">
                  <Clock className="h-4 w-4" />
                  Transactions
                </div>
              </div>
              <Clock className="h-8 w-8 text-yellow-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Financial Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="bg-[var(--admin-card-bg)] border-neutral-700">
          <CardHeader>
            <CardTitle className="text-[var(--admin-text-primary)] flex items-center gap-2">
              <PieChart className="h-5 w-5 text-green-500" />
              Revenue Breakdown
            </CardTitle>
            <CardDescription className="text-[var(--admin-text-secondary)]">Revenue distribution by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-neutral-900/50 rounded-lg">
              <div className="text-center">
                <PieChart className="h-12 w-12 text-[var(--admin-text-secondary)] mx-auto mb-2" />
                <p className="text-[var(--admin-text-secondary)]">Revenue breakdown chart</p>
                <p className="text-sm text-neutral-500">Pie chart showing revenue sources</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[var(--admin-card-bg)] border-neutral-700">
          <CardHeader>
            <CardTitle className="text-[var(--admin-text-primary)] flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-500" />
              Financial Trends
            </CardTitle>
            <CardDescription className="text-[var(--admin-text-secondary)]">Revenue and payout trends over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-neutral-900/50 rounded-lg">
              <div className="text-center">
                <TrendingUp className="h-12 w-12 text-[var(--admin-text-secondary)] mx-auto mb-2" />
                <p className="text-[var(--admin-text-secondary)]">Financial trends chart</p>
                <p className="text-sm text-neutral-500">Line chart showing financial trends</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[var(--admin-text-secondary)]" />
          <Input 
            placeholder="Search transactions by creator or ID..."
            className="pl-10 bg-[var(--admin-card-bg)] border-neutral-700 text-[var(--admin-text-primary)]"
          />
        </div>
        <Button variant="outline" className="flex items-center gap-2 bg-[var(--admin-card-bg)] border-neutral-700 text-[var(--admin-text-primary)] hover:bg-[var(--admin-surface)]">
          <Filter className="h-4 w-4" />
          Filters
        </Button>
      </div>

      {/* Revenue Overview Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {revenueData.map((revenue) => {
          const revenueCard = new RevenueCardComponent(revenue);
          return <div key={revenue.period}>{revenueCard.render()}</div>;
        })}
      </div>

      {/* Transaction Tabs */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5 bg-[var(--admin-card-bg)] border-neutral-700">
          <TabsTrigger value="all" className="data-[state=active]:bg-[var(--admin-surface)] data-[state=active]:text-[var(--admin-text-primary)] text-[var(--admin-text-secondary)]">All Transactions</TabsTrigger>
          <TabsTrigger value="revenue" className="data-[state=active]:bg-[var(--admin-surface)] data-[state=active]:text-[var(--admin-text-primary)] text-[var(--admin-text-secondary)]">Revenue</TabsTrigger>
          <TabsTrigger value="payouts" className="data-[state=active]:bg-[var(--admin-surface)] data-[state=active]:text-[var(--admin-text-primary)] text-[var(--admin-text-secondary)]">Payouts</TabsTrigger>
          <TabsTrigger value="pending" className="data-[state=active]:bg-[var(--admin-surface)] data-[state=active]:text-[var(--admin-text-primary)] text-[var(--admin-text-secondary)]">Pending</TabsTrigger>
          <TabsTrigger value="taxes" className="data-[state=active]:bg-[var(--admin-surface)] data-[state=active]:text-[var(--admin-text-primary)] text-[var(--admin-text-secondary)]">Taxes</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {allTransactions.map((transaction) => {
              const transactionCard = new TransactionCardComponent(transaction);
              return <div key={transaction.id}>{transactionCard.render()}</div>;
            })}
          </div>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {revenueTransactions.map((transaction) => {
              const transactionCard = new TransactionCardComponent(transaction);
              return <div key={transaction.id}>{transactionCard.render()}</div>;
            })}
          </div>
        </TabsContent>

        <TabsContent value="payouts" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {payoutTransactions.map((transaction) => {
              const transactionCard = new TransactionCardComponent(transaction);
              return <div key={transaction.id}>{transactionCard.render()}</div>;
            })}
          </div>
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {pendingTransactions.map((transaction) => {
              const transactionCard = new TransactionCardComponent(transaction);
              return <div key={transaction.id}>{transactionCard.render()}</div>;
            })}
          </div>
        </TabsContent>

        <TabsContent value="taxes" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {allTransactions
              .filter(t => t.type === 'tax')
              .map((transaction) => {
                const transactionCard = new TransactionCardComponent(transaction);
                return <div key={transaction.id}>{transactionCard.render()}</div>;
              })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
