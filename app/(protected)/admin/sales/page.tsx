"use client";

import { useState, useEffect } from "react";
import { AdminPageTemplate, MetricCard } from "@src/components/admin/AdminPageTemplate";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@src/components/ui/card";
import { Badge } from "@src/components/ui/badge";
import { Button } from "@src/components/ui/button";
import { Input } from "@src/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@src/components/ui/select";
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
  AlertTriangle,
  Edit,
  FileText,
  Globe,
  Star,
  Crown,
  Building,
  RotateCcw,
  Settings,
  Ban,
  CheckSquare,
  XSquare,
  ThumbsUp,
  Flag,
  Shield
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

// ----------------------
// Professional Sale Card Component
// Purpose: Displays sale information in a structured, professional layout
// Note: Similar to verification card with sale-specific data
// ----------------------
function ProfessionalSaleCard({
  sale,
  onView,
  onEdit,
  onMore,
  className = ""
}: {
  sale: Sale;
  onView?: () => void;
  onEdit?: () => void;
  onMore?: () => void;
  className?: string;
}) {
  const getStatusBadge = () => {
    const statusConfig = {
      completed: { variant: "default" as const, icon: CheckCircle, text: "Completed", color: "text-green-600" },
      pending: { variant: "secondary" as const, icon: Clock, text: "Pending", color: "text-yellow-600" },
      cancelled: { variant: "destructive" as const, icon: AlertTriangle, text: "Cancelled", color: "text-red-600" },
      refunded: { variant: "outline" as const, icon: TrendingDown, text: "Refunded", color: "text-gray-600" }
    };

    const config = statusConfig[sale.status];
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {config.text}
      </Badge>
    );
  };

  const getTypeIcon = () => {
    return <ReceiptText className="h-4 w-4" />;
  };

  const getTypeBadge = () => {
    return (
      <Badge variant="outline" className="text-xs">
        {sale.paymentMethod.toUpperCase()}
      </Badge>
    );
  };

  const getPaymentMethodIcon = () => {
    const icons = {
      card: "💳",
      paypal: "🅿️",
      crypto: "₿",
      bank_transfer: "🏦"
    };
    return icons[sale.paymentMethod] || "💳";
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
                {sale.orderNumber}
                {getTypeBadge()}
              </CardTitle>
              <CardDescription className="text-text-muted">
                {sale.customer.name} • {sale.customer.email}
              </CardDescription>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-text">
              ${sale.total.toFixed(2)}
            </div>
            <div className="text-sm text-text-muted">
              {sale.quantity} item(s)
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Sale Overview */}
        <div className="bg-surface-elev2 rounded-lg p-4 border border-line-soft">
          <div className="flex items-center gap-2 mb-3">
            {getTypeIcon()}
            <span className="font-medium text-text">Sale Overview</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-sm text-text-muted">Status:</span>
              <div className="mt-1">
                {getStatusBadge()}
              </div>
            </div>
            <div>
              <span className="text-sm text-text-muted">Payment:</span>
              <div className="mt-1">
                {getTypeBadge()}
              </div>
            </div>
            <div>
              <span className="text-sm text-text-muted">Order #:</span>
              <div className="mt-1">
                <Badge variant="outline" className="text-xs">
                  {sale.orderNumber}
                </Badge>
              </div>
            </div>
            <div>
              <span className="text-sm text-text-muted">Quantity:</span>
              <div className="mt-1 flex items-center gap-1">
                <Package className="h-4 w-4" />
                <span className="text-sm text-text">{sale.quantity}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Information */}
        <div className="bg-surface-elev2 rounded-lg p-4 border border-line-soft">
          <div className="flex items-center gap-2 mb-3">
            <User className="h-5 w-5 text-text-muted" />
            <span className="font-medium text-text">Customer Information</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-surface-elev1 flex items-center justify-center border border-line-soft">
              <User className="h-5 w-5 text-text-muted" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-text">{sale.customer.name}</p>
              <p className="text-xs text-text-muted">{sale.customer.email}</p>
            </div>
            <div className="text-sm text-text-muted">
              {new Date(sale.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>

        {/* Product Information */}
        <div className="bg-surface-elev2 rounded-lg p-4 border border-line-soft">
          <div className="flex items-center gap-2 mb-3">
            <Package className="h-5 w-5 text-text-muted" />
            <span className="font-medium text-text">Product Information</span>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium text-text">{sale.product.name}</p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-muted">Price:</span>
              <span className="text-sm text-text">${sale.product.price.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-muted">Quantity:</span>
              <span className="text-sm text-text">{sale.quantity}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-muted">Total:</span>
              <span className="text-sm font-semibold text-text">${sale.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Payment Information */}
        <div className="bg-surface-elev2 rounded-lg p-4 border border-line-soft">
          <div className="flex items-center gap-2 mb-3">
            <DollarSign className="h-5 w-5 text-text-muted" />
            <span className="font-medium text-text">Payment Information</span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-muted">Method:</span>
              <div className="flex items-center gap-2">
                <span className="text-lg">{getPaymentMethodIcon()}</span>
                <span className="text-sm text-text capitalize">
                  {sale.paymentMethod.replace('_', ' ')}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-muted">Amount:</span>
              <span className="text-sm font-semibold text-text">${sale.total.toFixed(2)}</span>
            </div>
            {sale.status === 'refunded' && sale.refundedAt && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-muted">Refunded:</span>
                <span className="text-sm text-text-muted">
                  {new Date(sale.refundedAt).toLocaleDateString()}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Timeline Information */}
        <div className="bg-surface-elev2 rounded-lg p-4 border border-line-soft">
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="h-5 w-5 text-text-muted" />
            <span className="font-medium text-text">Timeline</span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-muted">Created:</span>
              <span className="text-sm text-text">
                {new Date(sale.createdAt).toLocaleDateString()} at {new Date(sale.createdAt).toLocaleTimeString()}
              </span>
            </div>
            {sale.completedAt && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-muted">Completed:</span>
                <span className="text-sm text-text">
                  {new Date(sale.completedAt).toLocaleDateString()} at {new Date(sale.completedAt).toLocaleTimeString()}
                </span>
              </div>
            )}
            {sale.refundedAt && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-muted">Refunded:</span>
                <span className="text-sm text-text">
                  {new Date(sale.refundedAt).toLocaleDateString()} at {new Date(sale.refundedAt).toLocaleTimeString()}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Notes */}
        {sale.notes && (
          <div className="bg-surface-elev2 rounded-lg p-4 border border-line-soft">
            <div className="flex items-center gap-2 mb-3">
              <FileText className="h-5 w-5 text-text-muted" />
              <span className="font-medium text-text">Notes</span>
            </div>
            <p className="text-sm text-text">{sale.notes}</p>
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
            onClick={onEdit}
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit
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
// Sales Detail View Component
// Purpose: Single card view with filtering and quick stats
// Note: Similar to verification page with sale-specific data
// ----------------------
function SalesDetailView({
  sales,
  selectedSaleId,
  onSaleSelect,
  onView,
  onEdit,
  onMore,
  className = ""
}: {
  sales: Sale[];
  selectedSaleId?: string;
  onSaleSelect?: (saleId: string) => void;
  onView?: (saleId: string) => void;
  onEdit?: (saleId: string) => void;
  onMore?: (saleId: string) => void;
  className?: string;
}) {
  const selectedSale = sales.find(s => s.id === selectedSaleId) || sales[0];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      completed: { variant: "default" as const, color: "text-green-600", bgColor: "bg-green-100" },
      pending: { variant: "secondary" as const, color: "text-yellow-600", bgColor: "bg-yellow-100" },
      cancelled: { variant: "destructive" as const, color: "text-red-600", bgColor: "bg-red-100" },
      refunded: { variant: "outline" as const, color: "text-gray-600", bgColor: "bg-gray-100" }
    };
    return statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
  };

  const getTypeIcon = () => {
    return <ReceiptText className="h-4 w-4" />;
  };

  const statusInfo = getStatusBadge(selectedSale?.status || 'pending');

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Filter Section */}
      <div className="bg-surface-elev1 border border-line-soft rounded-lg p-4">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <label className="text-sm font-medium text-text-muted mb-2 block">Select Sale</label>
            <Select value={selectedSaleId || sales[0]?.id} onValueChange={onSaleSelect}>
              <SelectTrigger className="bg-surface-elev2 border-line-soft text-text">
                <SelectValue placeholder="Choose a sale..." />
              </SelectTrigger>
              <SelectContent className="bg-surface-elev2 border-line-soft">
                {sales.map((sale) => {
                  const Icon = getTypeIcon();
                  return (
                    <SelectItem 
                      key={sale.id} 
                      value={sale.id}
                      className="text-text hover:bg-surface-elev1"
                    >
                      <div className="flex items-center gap-2">
                        {Icon}
                        <span>{sale.orderNumber}</span>
                        <Badge 
                          variant={sale.status === 'completed' ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {sale.status}
                        </Badge>
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Sale Card */}
        <div className="lg:col-span-2">
          {selectedSale ? (
            <ProfessionalSaleCard
              sale={selectedSale}
              onView={() => onView?.(selectedSale.id)}
              onEdit={() => onEdit?.(selectedSale.id)}
              onMore={() => onMore?.(selectedSale.id)}
            />
          ) : (
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 text-center">
              <ReceiptText className="h-12 w-12 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-400">No sale selected</p>
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
                  {selectedSale?.status || 'N/A'}
                </div>
              </div>

              {/* Order Number */}
              <div className="flex items-center justify-between p-3 bg-surface-elev2 rounded-lg">
                <div className="flex items-center gap-2">
                  <ReceiptText className="h-4 w-4 text-text-muted" />
                  <span className="text-sm font-medium text-text">Order #</span>
                </div>
                <span className="text-sm font-semibold text-text">
                  {selectedSale?.orderNumber || 'N/A'}
                </span>
              </div>

              {/* Total Amount */}
              <div className="flex items-center justify-between p-3 bg-surface-elev2 rounded-lg">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-text-muted" />
                  <span className="text-sm font-medium text-text">Total</span>
                </div>
                <span className="text-sm font-semibold text-text">
                  ${selectedSale?.total?.toFixed(2) || '0.00'}
                </span>
              </div>

              {/* Quantity */}
              <div className="flex items-center justify-between p-3 bg-surface-elev2 rounded-lg">
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-text-muted" />
                  <span className="text-sm font-medium text-text">Quantity</span>
                </div>
                <span className="text-sm font-semibold text-text">
                  {selectedSale?.quantity || '0'}
                </span>
              </div>

              {/* Payment Method */}
              <div className="flex items-center justify-between p-3 bg-surface-elev2 rounded-lg">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="h-4 w-4 text-text-muted" />
                  <span className="text-sm font-medium text-text">Payment</span>
                </div>
                <span className="text-sm font-semibold text-text">
                  {selectedSale?.paymentMethod?.toUpperCase() || 'N/A'}
                </span>
              </div>

              {/* Customer */}
              <div className="flex items-center justify-between p-3 bg-surface-elev2 rounded-lg">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-text-muted" />
                  <span className="text-sm font-medium text-text">Customer</span>
                </div>
                <span className="text-sm font-semibold text-text">
                  {selectedSale?.customer?.name || 'N/A'}
                </span>
              </div>

              {/* Date */}
              <div className="flex items-center justify-between p-3 bg-surface-elev2 rounded-lg">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-text-muted" />
                  <span className="text-sm font-medium text-text">Date</span>
                </div>
                <span className="text-sm text-text-muted">
                  {selectedSale?.createdAt ? new Date(selectedSale.createdAt).toLocaleDateString() : 'N/A'}
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
                onClick={() => onView?.(selectedSale?.id || '')}
              >
                <Eye className="h-4 w-4 mr-2" />
                View Sale
              </Button>
              <Button 
                variant="outline" 
                className="w-full bg-surface-elev2 border-line-soft text-text hover:bg-surface-elev1"
                onClick={() => onEdit?.(selectedSale?.id || '')}
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Sale
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// ----------------------
// Sales Page Client Component
// Purpose: Manages state and interactions for the sales page
// ----------------------
function SalesPageClient() {
  const [selectedSaleId, setSelectedSaleId] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const salesService = new SalesManagementService();
  const allSales = salesService.getSales();
  const stats = salesService.getSalesStats();

  // Filter sales based on search and status
  const filteredSales = allSales.filter(sale => {
    const matchesSearch = sale.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sale.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sale.customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sale.product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || sale.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Set default selected sale
  useEffect(() => {
    if (filteredSales.length > 0 && !selectedSaleId) {
      setSelectedSaleId(filteredSales[0].id);
    }
  }, [filteredSales, selectedSaleId]);

  const handleSaleSelect = (saleId: string) => {
    setSelectedSaleId(saleId);
  };

  const handleView = (saleId: string) => {
    console.log('View sale:', saleId);
  };

  const handleEdit = (saleId: string) => {
    console.log('Edit sale:', saleId);
  };

  const handleMore = (saleId: string) => {
    console.log('More actions for sale:', saleId);
  };

  const handleRefresh = () => {
    console.log('Refresh sales');
  };

  const handleExportAll = () => {
    console.log('Export all sales');
  };

  const statsCards = (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard
        title="Total Revenue"
        value={stats.totalRevenue}
        growth={stats.revenueGrowth}
        icon={DollarSign}
        format="currency"
      />
      <MetricCard
        title="Total Sales"
        value={stats.totalSales}
        growth={stats.salesGrowth}
        icon={ShoppingCart}
        format="number"
      />
      <MetricCard
        title="Average Order"
        value={stats.averageOrderValue}
        growth={0}
        icon={BarChart3}
        format="currency"
      />
      <MetricCard
        title="Completed Orders"
        value={stats.completedOrders}
        growth={0}
        icon={CheckCircle}
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
          <SelectItem value="cancelled" className="text-text hover:bg-surface-elev1">Cancelled</SelectItem>
          <SelectItem value="refunded" className="text-text hover:bg-surface-elev1">Refunded</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );

  return (
    <AdminPageTemplate
      title="Sales Management"
      description="Track and manage your sales performance across the platform"
      icon={<ReceiptText className="h-6 w-6" />}
      searchPlaceholder="Search orders, customers, or products..."
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
      <SalesDetailView
        sales={filteredSales}
        selectedSaleId={selectedSaleId}
        onSaleSelect={handleSaleSelect}
        onView={handleView}
        onEdit={handleEdit}
        onMore={handleMore}
      />
    </AdminPageTemplate>
  );
}

export default function SalesPage() {
  return <SalesPageClient />;
}
