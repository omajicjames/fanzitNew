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
      <Card className="hover:shadow-lg transition-shadow duration-200">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                {this.getTypeIcon()}
              </div>
              <div className="flex-1 min-w-0">
                <CardTitle className="text-lg flex items-center gap-2">
                  {this.transaction.description}
                </CardTitle>
                <CardDescription>
                  {this.transaction.creator} • {this.transaction.transactionId}
                </CardDescription>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="text-xs">
                    {this.transaction.category}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {this.transaction.paymentMethod}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className={`text-2xl font-bold ${this.getAmountColor()}`}>
                ${this.transaction.amount.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">
                Net: ${this.transaction.netAmount.toLocaleString()}
              </div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            {this.getStatusBadge()}
            <span className="text-sm text-muted-foreground">
              {new Date(this.transaction.date).toLocaleDateString()}
            </span>
          </div>

          {this.transaction.fees > 0 && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Platform Fee:</span>
              <span className="text-red-600">-${this.transaction.fees.toLocaleString()}</span>
            </div>
          )}
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1">
              <Eye className="h-4 w-4 mr-1" />
              View
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              <Download className="h-4 w-4 mr-1" />
              Export
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

class RevenueCardComponent {
  private revenue: RevenueData;

  constructor(revenue: RevenueData) {
    this.revenue = revenue;
  }

  public render() {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChart className="h-5 w-5" />
            Revenue - {this.revenue.period}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Total Revenue</p>
              <p className="text-2xl font-bold">${this.revenue.totalRevenue.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Growth</p>
              <p className={`text-2xl font-bold flex items-center gap-1 ${
                this.revenue.growth > 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {this.revenue.growth > 0 ? <TrendingUp className="h-5 w-5" /> : <TrendingDown className="h-5 w-5" />}
                {this.revenue.growth}%
              </p>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Platform Fee (10%)</span>
              <span className="text-sm font-medium">${this.revenue.platformFee.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Creator Earnings</span>
              <span className="text-sm font-medium">${this.revenue.creatorEarnings.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Subscription Revenue</span>
              <span className="text-sm font-medium">${this.revenue.subscriptionRevenue.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Tips Revenue</span>
              <span className="text-sm font-medium">${this.revenue.tipsRevenue.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Content Revenue</span>
              <span className="text-sm font-medium">${this.revenue.contentRevenue.toLocaleString()}</span>
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
    <div className="space-y-6">
      {/* Header with Pills */}
      <div className="space-y-4">
        <div>
          <h1 className="text-3xl font-bold">Financial Management</h1>
          <p className="text-muted-foreground">Track revenue, payouts, and financial analytics</p>
        </div>
        <AdminPillNavigationComponent />
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search transactions by creator or ID..."
            className="pl-10"
          />
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filters
        </Button>
      </div>

      {/* Revenue Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {revenueData.map((revenue) => {
          const revenueCard = new RevenueCardComponent(revenue);
          return <div key={revenue.period}>{revenueCard.render()}</div>;
        })}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold text-green-600">
                  ${financialService.getTotalRevenue().toLocaleString()}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Payouts</p>
                <p className="text-2xl font-bold text-blue-600">
                  ${financialService.getTotalPayouts().toLocaleString()}
                </p>
              </div>
              <Banknote className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Platform Fees</p>
                <p className="text-2xl font-bold text-orange-600">
                  ${financialService.getTotalFees().toLocaleString()}
                </p>
              </div>
              <CreditCard className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending Transactions</p>
                <p className="text-2xl font-bold text-yellow-600">{pendingTransactions.length}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transaction Tabs */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All Transactions</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="payouts">Payouts</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="taxes">Taxes</TabsTrigger>
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
