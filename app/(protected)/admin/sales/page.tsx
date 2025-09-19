"use client";

import { AdminPillNavigationComponent } from "@src/components/admin/AdminPillNavigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@src/components/ui/card";
import { Badge } from "@src/components/ui/badge";
import { Button } from "@src/components/ui/button";
import { Input } from "@src/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@src/components/ui/tabs";
import { 
  ReceiptText, 
  Search, 
  Filter, 
  Download, 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Calendar,
  User,
  Package,
  BarChart3,
  Eye,
  MoreHorizontal,
  CheckCircle,
  Clock,
  AlertTriangle
} from "lucide-react";

// ----------------------
// Sales Management Page
// Location: /app/(protected)/admin/sales/page.tsx
// Purpose: Comprehensive sales tracking and analytics
// Features: Sales overview, transaction history, analytics
// Note: Mobile-first design with object-oriented structure
// ----------------------

interface Sale {
  id: string;
  orderNumber: string;
  customer: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  };
  product: {
    id: string;
    name: string;
    price: number;
    image?: string;
  };
  quantity: number;
  total: number;
  status: 'completed' | 'pending' | 'cancelled' | 'refunded';
  paymentMethod: 'card' | 'paypal' | 'crypto' | 'bank_transfer';
  createdAt: string;
  completedAt?: string;
  refundedAt?: string;
  notes?: string;
}

interface SalesStats {
  totalSales: number;
  totalRevenue: number;
  averageOrderValue: number;
  completedOrders: number;
  pendingOrders: number;
  refundedOrders: number;
  revenueGrowth: number;
  salesGrowth: number;
}

class SalesManagementService {
  private sales: Sale[] = [];

  constructor() {
    this.initializeMockData();
  }

  private initializeMockData() {
    this.sales = [
      {
        id: "1",
        orderNumber: "ORD-001",
        customer: {
          id: "1",
          name: "John Doe",
          email: "john@example.com",
          avatar: "/placeholder-user.jpg"
        },
        product: {
          id: "1",
          name: "Premium Digital Art Collection",
          price: 29.99,
          image: "/placeholder.jpg"
        },
        quantity: 1,
        total: 29.99,
        status: "completed",
        paymentMethod: "card",
        createdAt: "2024-01-27T10:30:00Z",
        completedAt: "2024-01-27T10:35:00Z"
      },
      {
        id: "2",
        orderNumber: "ORD-002",
        customer: {
          id: "2",
          name: "Jane Smith",
          email: "jane@example.com"
        },
        product: {
          id: "2",
          name: "Exclusive Video Content",
          price: 19.99,
          image: "/placeholder.jpg"
        },
        quantity: 2,
        total: 39.98,
        status: "pending",
        paymentMethod: "paypal",
        createdAt: "2024-01-27T11:15:00Z"
      },
      {
        id: "3",
        orderNumber: "ORD-003",
        customer: {
          id: "3",
          name: "Mike Johnson",
          email: "mike@example.com"
        },
        product: {
          id: "1",
          name: "Premium Digital Art Collection",
          price: 29.99,
          image: "/placeholder.jpg"
        },
        quantity: 1,
        total: 29.99,
        status: "refunded",
        paymentMethod: "card",
        createdAt: "2024-01-26T14:20:00Z",
        completedAt: "2024-01-26T14:25:00Z",
        refundedAt: "2024-01-27T09:00:00Z",
        notes: "Customer requested refund due to quality issues"
      }
    ];
  }

  public getSales(): Sale[] {
    return this.sales;
  }

  public getSalesStats(): SalesStats {
    const completedSales = this.sales.filter(s => s.status === 'completed');
    const pendingSales = this.sales.filter(s => s.status === 'pending');
    const refundedSales = this.sales.filter(s => s.status === 'refunded');

    const totalRevenue = completedSales.reduce((sum, s) => sum + s.total, 0);
    const totalSales = this.sales.length;
    const averageOrderValue = totalSales > 0 ? totalRevenue / completedSales.length : 0;

    return {
      totalSales,
      totalRevenue,
      averageOrderValue,
      completedOrders: completedSales.length,
      pendingOrders: pendingSales.length,
      refundedOrders: refundedSales.length,
      revenueGrowth: 12.5, // Mock growth percentage
      salesGrowth: 8.3 // Mock growth percentage
    };
  }

  public getRecentSales(limit: number = 10): Sale[] {
    return this.sales
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, limit);
  }
}

class SaleCardComponent {
  private sale: Sale;

  constructor(sale: Sale) {
    this.sale = sale;
  }

  private getStatusBadge() {
    const statusConfig = {
      completed: { variant: "default" as const, icon: CheckCircle, text: "Completed" },
      pending: { variant: "secondary" as const, icon: Clock, text: "Pending" },
      cancelled: { variant: "destructive" as const, icon: AlertTriangle, text: "Cancelled" },
      refunded: { variant: "outline" as const, icon: TrendingDown, text: "Refunded" }
    };

    const config = statusConfig[this.sale.status];
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {config.text}
      </Badge>
    );
  }

  private getPaymentMethodIcon() {
    const icons = {
      card: "💳",
      paypal: "🅿️",
      crypto: "₿",
      bank_transfer: "🏦"
    };
    return icons[this.sale.paymentMethod] || "💳";
  }

  public render() {
    return (
      <Card className="hover:shadow-lg transition-all duration-200">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <CardTitle className="text-lg">{this.sale.orderNumber}</CardTitle>
              <CardDescription>
                {new Date(this.sale.createdAt).toLocaleDateString()} at{" "}
                {new Date(this.sale.createdAt).toLocaleTimeString()}
              </CardDescription>
            </div>
            {this.getStatusBadge()}
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Customer Info */}
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
              <User className="h-4 w-4" />
            </div>
            <div>
              <p className="font-medium">{this.sale.customer.name}</p>
              <p className="text-sm text-muted-foreground">{this.sale.customer.email}</p>
            </div>
          </div>

          {/* Product Info */}
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded bg-muted flex items-center justify-center">
              <Package className="h-6 w-6 text-muted-foreground" />
            </div>
            <div className="flex-1">
              <p className="font-medium">{this.sale.product.name}</p>
              <p className="text-sm text-muted-foreground">
                Qty: {this.sale.quantity} × ${this.sale.product.price}
              </p>
            </div>
          </div>

          {/* Payment Info */}
          <div className="flex items-center justify-between pt-2 border-t">
            <div className="flex items-center gap-2">
              <span className="text-lg">{this.getPaymentMethodIcon()}</span>
              <span className="text-sm text-muted-foreground capitalize">
                {this.sale.paymentMethod.replace('_', ' ')}
              </span>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold">${this.sale.total.toFixed(2)}</p>
              {this.sale.status === 'refunded' && (
                <p className="text-xs text-muted-foreground">
                  Refunded {this.sale.refundedAt && new Date(this.sale.refundedAt).toLocaleDateString()}
                </p>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <Button variant="outline" size="sm" className="flex-1">
              <Eye className="h-4 w-4 mr-2" />
              View Details
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

export default function SalesPage() {
  const salesService = new SalesManagementService();
  const sales = salesService.getSales();
  const stats = salesService.getSalesStats();
  const recentSales = salesService.getRecentSales();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Sales</h1>
          <p className="text-muted-foreground">Track and manage your sales performance</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button>
            <BarChart3 className="h-4 w-4 mr-2" />
            Analytics
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              +{stats.revenueGrowth}% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalSales}</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              +{stats.salesGrowth}% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Order</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.averageOrderValue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              Per transaction
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Orders</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completedOrders}</div>
            <p className="text-xs text-muted-foreground">
              {stats.pendingOrders} pending, {stats.refundedOrders} refunded
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
                  placeholder="Search orders, customers, or products..."
                  className="pl-10"
                />
              </div>
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Sales */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Recent Sales</h2>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recentSales.map((sale) => {
            const saleCard = new SaleCardComponent(sale);
            return <div key={sale.id}>{saleCard.render()}</div>;
          })}
        </div>
      </div>
    </div>
  );
}
