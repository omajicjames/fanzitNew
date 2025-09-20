"use client";

import { useState, useEffect } from "react";
import { AdminPageTemplate, MetricCard } from "@src/components/admin/AdminPageTemplate";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@src/components/ui/card";
import { Badge } from "@src/components/ui/badge";
import { Button } from "@src/components/ui/button";
import { Input } from "@src/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@src/components/ui/select";
import { 
  ShoppingBag, 
  Plus, 
  Search, 
  Filter, 
  Settings, 
  TrendingUp,
  DollarSign,
  Package,
  Users,
  Star,
  Eye,
  Edit,
  MoreHorizontal,
  CheckCircle,
  Clock,
  AlertTriangle,
  BarChart3,
  Tag,
  ShoppingCart,
  Calendar,
  User,
  Globe,
  Crown,
  Building,
  RotateCcw,
  Ban,
  CheckSquare,
  XSquare,
  ThumbsUp,
  Flag,
  Shield,
  FileText
} from "lucide-react";

// ----------------------
// Shop Management Page
// Location: /app/(protected)/admin/shop/page.tsx
// Purpose: Comprehensive e-commerce shop management
// Features: Shop settings, product management, order tracking
// Note: Mobile-first design with object-oriented structure
// ----------------------

interface ShopSettings {
  id: string;
  name: string;
  description: string;
  currency: string;
  taxRate: number;
  shippingEnabled: boolean;
  freeShippingThreshold: number;
  returnPolicy: string;
  termsOfService: string;
  privacyPolicy: string;
  contactEmail: string;
  supportEmail: string;
  socialMedia: {
    twitter?: string;
    instagram?: string;
    facebook?: string;
  };
  isActive: boolean;
  maintenanceMode: boolean;
}

interface ShopStats {
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
  conversionRate: number;
  returnRate: number;
  customerSatisfaction: number;
  monthlyGrowth: number;
}

interface ShopItem {
  id: string;
  name: string;
  type: 'product' | 'category' | 'order' | 'customer' | 'setting';
  status: 'active' | 'inactive' | 'pending' | 'completed' | 'cancelled';
  value: number;
  description: string;
  createdAt: string;
  updatedAt: string;
  metadata: {
    [key: string]: any;
  };
}

class ShopManagementService {
  private settings!: ShopSettings;
  private stats!: ShopStats;
  private shopItems: ShopItem[] = [];

  constructor() {
    this.initializeMockData();
  }

  private initializeMockData() {
    this.settings = {
      id: "1",
      name: "Fanzit Creator Shop",
      description: "Premium digital content and exclusive creator merchandise",
      currency: "USD",
      taxRate: 8.5,
      shippingEnabled: true,
      freeShippingThreshold: 50,
      returnPolicy: "30-day return policy for digital products",
      termsOfService: "Terms of service for Fanzit Creator Shop",
      privacyPolicy: "Privacy policy for Fanzit Creator Shop",
      contactEmail: "shop@fanzit.com",
      supportEmail: "support@fanzit.com",
      socialMedia: {
        twitter: "@fanzitshop",
        instagram: "@fanzitshop",
        facebook: "fanzitshop"
      },
      isActive: true,
      maintenanceMode: false
    };

    this.stats = {
      totalProducts: 156,
      totalOrders: 1247,
      totalRevenue: 45678.90,
      averageOrderValue: 36.65,
      conversionRate: 3.2,
      returnRate: 2.1,
      customerSatisfaction: 4.7,
      monthlyGrowth: 15.3
    };

    this.shopItems = [
      {
        id: "1",
        name: "Premium Digital Art Collection",
        type: "product",
        status: "active",
        value: 29.99,
        description: "Exclusive digital artwork collection from top creators",
        createdAt: "2024-01-15T10:00:00Z",
        updatedAt: "2024-01-20T14:30:00Z",
        metadata: {
          category: "Digital Art",
          stock: 50,
          sales: 234,
          rating: 4.8
        }
      },
      {
        id: "2",
        name: "Creator Merchandise Bundle",
        type: "product",
        status: "active",
        value: 49.99,
        description: "Physical merchandise bundle including t-shirts, stickers, and accessories",
        createdAt: "2024-01-10T09:00:00Z",
        updatedAt: "2024-01-25T16:45:00Z",
        metadata: {
          category: "Physical Goods",
          stock: 25,
          sales: 89,
          rating: 4.6
        }
      },
      {
        id: "3",
        name: "Digital Art",
        type: "category",
        status: "active",
        value: 0,
        description: "Digital artwork and illustrations",
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: "2024-01-15T12:00:00Z",
        metadata: {
          productCount: 45,
          totalSales: 1234
        }
      },
      {
        id: "4",
        name: "Order #ORD-001",
        type: "order",
        status: "completed",
        value: 79.98,
        description: "Order for Premium Digital Art Collection and Creator Merchandise Bundle",
        createdAt: "2024-01-27T10:30:00Z",
        updatedAt: "2024-01-27T10:35:00Z",
        metadata: {
          customer: "John Doe",
          items: 2,
          paymentMethod: "card"
        }
      },
      {
        id: "5",
        name: "Shop Settings",
        type: "setting",
        status: "active",
        value: 0,
        description: "Main shop configuration and settings",
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: "2024-01-20T11:00:00Z",
        metadata: {
          currency: "USD",
          taxRate: 8.5,
          shippingEnabled: true
        }
      }
    ];
  }

  public getSettings(): ShopSettings {
    return this.settings;
  }

  public getStats(): ShopStats {
    return this.stats;
  }

  public getShopItems(): ShopItem[] {
    return this.shopItems;
  }
}

// ----------------------
// Professional Shop Card Component
// Purpose: Displays shop item information in a structured, professional layout
// Note: Similar to verification card with shop-specific data
// ----------------------
function ProfessionalShopCard({
  item,
  onView,
  onEdit,
  onMore,
  className = ""
}: {
  item: ShopItem;
  onView?: () => void;
  onEdit?: () => void;
  onMore?: () => void;
  className?: string;
}) {
  const getStatusBadge = () => {
    const statusConfig = {
      active: { variant: "default" as const, icon: CheckCircle, text: "Active", color: "text-green-600" },
      inactive: { variant: "secondary" as const, icon: Clock, text: "Inactive", color: "text-gray-600" },
      pending: { variant: "secondary" as const, icon: Clock, text: "Pending", color: "text-yellow-600" },
      completed: { variant: "default" as const, icon: CheckCircle, text: "Completed", color: "text-green-600" },
      cancelled: { variant: "destructive" as const, icon: AlertTriangle, text: "Cancelled", color: "text-red-600" }
    };

    const config = statusConfig[item.status];
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
      product: <Package className="h-4 w-4" />,
      category: <Tag className="h-4 w-4" />,
      order: <ShoppingCart className="h-4 w-4" />,
      customer: <User className="h-4 w-4" />,
      setting: <Settings className="h-4 w-4" />
    };
    return typeIcons[item.type];
  };

  const getTypeBadge = () => {
    return (
      <Badge variant="outline" className="text-xs">
        {item.type.toUpperCase()}
      </Badge>
    );
  };

  const formatValue = () => {
    if (item.value === 0) return "N/A";
    return `$${item.value.toFixed(2)}`;
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
                {item.name}
                {getTypeBadge()}
              </CardTitle>
              <CardDescription className="text-text-muted">
                {item.description}
              </CardDescription>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-text">
              {formatValue()}
            </div>
            <div className="text-sm text-text-muted">
              {item.type}
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Item Overview */}
        <div className="bg-surface-elev2 rounded-lg p-4 border border-line-soft">
          <div className="flex items-center gap-2 mb-3">
            {getTypeIcon()}
            <span className="font-medium text-text">Item Overview</span>
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
              <span className="text-sm text-text-muted">Value:</span>
              <div className="mt-1">
                <span className="text-sm font-semibold text-text">{formatValue()}</span>
              </div>
            </div>
            <div>
              <span className="text-sm text-text-muted">Created:</span>
              <div className="mt-1">
                <span className="text-sm text-text">
                  {new Date(item.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Metadata Information */}
        <div className="bg-surface-elev2 rounded-lg p-4 border border-line-soft">
          <div className="flex items-center gap-2 mb-3">
            <FileText className="h-5 w-5 text-text-muted" />
            <span className="font-medium text-text">Details</span>
          </div>
          <div className="space-y-2">
            {Object.entries(item.metadata).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <span className="text-sm text-text-muted capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}:
                </span>
                <span className="text-sm text-text">
                  {typeof value === 'number' ? value.toLocaleString() : String(value)}
                </span>
              </div>
            ))}
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
                {new Date(item.createdAt).toLocaleDateString()} at {new Date(item.createdAt).toLocaleTimeString()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-muted">Updated:</span>
              <span className="text-sm text-text">
                {new Date(item.updatedAt).toLocaleDateString()} at {new Date(item.updatedAt).toLocaleTimeString()}
              </span>
            </div>
          </div>
        </div>

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
// Shop Detail View Component
// Purpose: Single card view with filtering and quick stats
// Note: Similar to verification page with shop-specific data
// ----------------------
function ShopDetailView({
  items,
  selectedItemId,
  onItemSelect,
  onView,
  onEdit,
  onMore,
  className = ""
}: {
  items: ShopItem[];
  selectedItemId?: string;
  onItemSelect?: (itemId: string) => void;
  onView?: (itemId: string) => void;
  onEdit?: (itemId: string) => void;
  onMore?: (itemId: string) => void;
  className?: string;
}) {
  const selectedItem = items.find(i => i.id === selectedItemId) || items[0];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { variant: "default" as const, color: "text-green-600", bgColor: "bg-green-100" },
      inactive: { variant: "secondary" as const, color: "text-gray-600", bgColor: "bg-gray-100" },
      pending: { variant: "secondary" as const, color: "text-yellow-600", bgColor: "bg-yellow-100" },
      completed: { variant: "default" as const, color: "text-green-600", bgColor: "bg-green-100" },
      cancelled: { variant: "destructive" as const, color: "text-red-600", bgColor: "bg-red-100" }
    };
    return statusConfig[status as keyof typeof statusConfig] || statusConfig.active;
  };

  const getTypeIcon = (type: string) => {
    const typeIcons = {
      product: <Package className="h-4 w-4" />,
      category: <Tag className="h-4 w-4" />,
      order: <ShoppingCart className="h-4 w-4" />,
      customer: <User className="h-4 w-4" />,
      setting: <Settings className="h-4 w-4" />
    };
    return typeIcons[type as keyof typeof typeIcons] || <Package className="h-4 w-4" />;
  };

  const statusInfo = getStatusBadge(selectedItem?.status || 'active');

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Filter Section */}
      <div className="bg-surface-elev1 border border-line-soft rounded-lg p-4">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <label className="text-sm font-medium text-text-muted mb-2 block">Select Shop Item</label>
            <Select value={selectedItemId || items[0]?.id} onValueChange={onItemSelect}>
              <SelectTrigger className="bg-surface-elev2 border-line-soft text-text">
                <SelectValue placeholder="Choose a shop item..." />
              </SelectTrigger>
              <SelectContent className="bg-surface-elev2 border-line-soft">
                {items.map((item) => {
                  const Icon = getTypeIcon(item.type);
                  return (
                    <SelectItem 
                      key={item.id} 
                      value={item.id}
                      className="text-text hover:bg-surface-elev1"
                    >
                      <div className="flex items-center gap-2">
                        {Icon}
                        <span>{item.name}</span>
                        <Badge 
                          variant={item.status === 'active' ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {item.status}
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
        {/* Left: Item Card */}
        <div className="lg:col-span-2">
          {selectedItem ? (
            <ProfessionalShopCard
              item={selectedItem}
              onView={() => onView?.(selectedItem.id)}
              onEdit={() => onEdit?.(selectedItem.id)}
              onMore={() => onMore?.(selectedItem.id)}
            />
          ) : (
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 text-center">
              <ShoppingBag className="h-12 w-12 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-400">No shop item selected</p>
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
                  {selectedItem?.status || 'N/A'}
                </div>
              </div>

              {/* Type */}
              <div className="flex items-center justify-between p-3 bg-surface-elev2 rounded-lg">
                <div className="flex items-center gap-2">
                  {selectedItem && (() => {
                    const Icon = getTypeIcon(selectedItem.type);
                    return <div className="text-text-muted">{Icon}</div>;
                  })()}
                  <span className="text-sm font-medium text-text">Type</span>
                </div>
                <span className="text-sm font-semibold text-text">
                  {selectedItem?.type?.toUpperCase() || 'N/A'}
                </span>
              </div>

              {/* Value */}
              <div className="flex items-center justify-between p-3 bg-surface-elev2 rounded-lg">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-text-muted" />
                  <span className="text-sm font-medium text-text">Value</span>
                </div>
                <span className="text-sm font-semibold text-text">
                  {selectedItem ? (selectedItem.value === 0 ? 'N/A' : `$${selectedItem.value.toFixed(2)}`) : 'N/A'}
                </span>
              </div>

              {/* Created Date */}
              <div className="flex items-center justify-between p-3 bg-surface-elev2 rounded-lg">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-text-muted" />
                  <span className="text-sm font-medium text-text">Created</span>
                </div>
                <span className="text-sm text-text-muted">
                  {selectedItem?.createdAt ? new Date(selectedItem.createdAt).toLocaleDateString() : 'N/A'}
                </span>
              </div>

              {/* Updated Date */}
              <div className="flex items-center justify-between p-3 bg-surface-elev2 rounded-lg">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-text-muted" />
                  <span className="text-sm font-medium text-text">Updated</span>
                </div>
                <span className="text-sm text-text-muted">
                  {selectedItem?.updatedAt ? new Date(selectedItem.updatedAt).toLocaleDateString() : 'N/A'}
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
                onClick={() => onView?.(selectedItem?.id || '')}
              >
                <Eye className="h-4 w-4 mr-2" />
                View Item
              </Button>
              <Button 
                variant="outline" 
                className="w-full bg-surface-elev2 border-line-soft text-text hover:bg-surface-elev1"
                onClick={() => onEdit?.(selectedItem?.id || '')}
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Item
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// ----------------------
// Shop Page Client Component
// Purpose: Manages state and interactions for the shop page
// ----------------------
function ShopPageClient() {
  const [selectedItemId, setSelectedItemId] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');

  const shopService = new ShopManagementService();
  const allItems = shopService.getShopItems();
  const stats = shopService.getStats();

  // Filter items based on search and type
  const filteredItems = allItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || item.type === typeFilter;
    return matchesSearch && matchesType;
  });

  // Set default selected item
  useEffect(() => {
    if (filteredItems.length > 0 && !selectedItemId) {
      setSelectedItemId(filteredItems[0].id);
    }
  }, [filteredItems, selectedItemId]);

  const handleItemSelect = (itemId: string) => {
    setSelectedItemId(itemId);
  };

  const handleView = (itemId: string) => {
    console.log('View item:', itemId);
  };

  const handleEdit = (itemId: string) => {
    console.log('Edit item:', itemId);
  };

  const handleMore = (itemId: string) => {
    console.log('More actions for item:', itemId);
  };

  const handleRefresh = () => {
    console.log('Refresh shop items');
  };

  const handleExportAll = () => {
    console.log('Export all shop items');
  };

  const statsCards = (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard
        title="Total Revenue"
        value={stats.totalRevenue}
        growth={stats.monthlyGrowth}
        icon={DollarSign}
        format="currency"
      />
      <MetricCard
        title="Total Orders"
        value={stats.totalOrders}
        growth={0}
        icon={ShoppingCart}
        format="number"
      />
      <MetricCard
        title="Products"
        value={stats.totalProducts}
        growth={0}
        icon={Package}
        format="number"
      />
      <MetricCard
        title="Satisfaction"
        value={stats.customerSatisfaction}
        growth={0}
        icon={Star}
        format="rating"
      />
    </div>
  );

  const filters = (
    <div className="flex items-center gap-2">
      <Select value={typeFilter} onValueChange={setTypeFilter}>
        <SelectTrigger className="w-40 bg-surface-elev2 border-line-soft text-text">
          <SelectValue placeholder="Type" />
        </SelectTrigger>
        <SelectContent className="bg-surface-elev2 border-line-soft">
          <SelectItem value="all" className="text-text hover:bg-surface-elev1">All Types</SelectItem>
          <SelectItem value="product" className="text-text hover:bg-surface-elev1">Products</SelectItem>
          <SelectItem value="category" className="text-text hover:bg-surface-elev1">Categories</SelectItem>
          <SelectItem value="order" className="text-text hover:bg-surface-elev1">Orders</SelectItem>
          <SelectItem value="customer" className="text-text hover:bg-surface-elev1">Customers</SelectItem>
          <SelectItem value="setting" className="text-text hover:bg-surface-elev1">Settings</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );

  return (
    <AdminPageTemplate
      title="Shop Management"
      description="Manage your e-commerce shop, products, orders, and settings"
      icon={<ShoppingBag className="h-6 w-6" />}
      searchPlaceholder="Search shop items, products, or categories..."
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
      <ShopDetailView
        items={filteredItems}
        selectedItemId={selectedItemId}
        onItemSelect={handleItemSelect}
        onView={handleView}
        onEdit={handleEdit}
        onMore={handleMore}
      />
    </AdminPageTemplate>
  );
}

export default function ShopPage() {
  return <ShopPageClient />;
}
