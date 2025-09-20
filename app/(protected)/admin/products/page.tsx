"use client";

import { useState, useEffect } from "react";
import { AdminPageTemplate, MetricCard } from "@src/components/admin/AdminPageTemplate";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@src/components/ui/card";
import { Badge } from "@src/components/ui/badge";
import { Button } from "@src/components/ui/button";
import { Input } from "@src/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@src/components/ui/select";
import { 
  Package, 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Eye, 
  Edit, 
  Trash2, 
  DollarSign,
  ShoppingCart,
  Star,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Image as ImageIcon,
  Tag,
  BarChart3,
  Calendar,
  User,
  Globe,
  Crown,
  Building,
  RotateCcw,
  Settings,
  Ban,
  CheckSquare,
  XSquare,
  FileText,
  ThumbsUp,
  Flag,
  Shield
} from "lucide-react";

// ----------------------
// Products Management Page
// Location: /app/(protected)/admin/products/page.tsx
// Purpose: Comprehensive product management for e-commerce platform
// Features: Product catalog, inventory, pricing, analytics
// Note: Mobile-first design with object-oriented structure
// ----------------------

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  status: 'active' | 'inactive' | 'draft' | 'archived';
  inventory: number;
  sku: string;
  images: string[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
  sales: number;
  revenue: number;
  rating: number;
  reviews: number;
  featured: boolean;
}

interface ProductCategory {
  id: string;
  name: string;
  description: string;
  productCount: number;
  status: 'active' | 'inactive';
}

class ProductManagementService {
  private products: Product[] = [];
  private categories: ProductCategory[] = [];

  constructor() {
    this.initializeMockData();
  }

  private initializeMockData() {
    // Mock product data
    this.products = [
      {
        id: "1",
        name: "Premium Digital Art Collection",
        description: "High-quality digital art pieces for creators",
        price: 29.99,
        originalPrice: 49.99,
        category: "Digital Art",
        status: "active",
        inventory: 100,
        sku: "DIG-ART-001",
        images: ["/placeholder.jpg"],
        tags: ["digital", "art", "premium"],
        createdAt: "2024-01-15",
        updatedAt: "2024-01-27",
        sales: 45,
        revenue: 1349.55,
        rating: 4.8,
        reviews: 23,
        featured: true
      },
      {
        id: "2",
        name: "Exclusive Video Content",
        description: "Behind-the-scenes video content",
        price: 19.99,
        category: "Video Content",
        status: "active",
        inventory: 50,
        sku: "VID-001",
        images: ["/placeholder.jpg"],
        tags: ["video", "exclusive", "content"],
        createdAt: "2024-01-20",
        updatedAt: "2024-01-27",
        sales: 32,
        revenue: 639.68,
        rating: 4.6,
        reviews: 18,
        featured: false
      }
    ];

    // Mock category data
    this.categories = [
      { id: "1", name: "Digital Art", description: "Digital artwork and designs", productCount: 15, status: "active" },
      { id: "2", name: "Video Content", description: "Video content and tutorials", productCount: 8, status: "active" },
      { id: "3", name: "Photography", description: "Photography collections", productCount: 12, status: "active" }
    ];
  }

  public getProducts(): Product[] {
    return this.products;
  }

  public getCategories(): ProductCategory[] {
    return this.categories;
  }

  public getProductStats() {
    const totalProducts = this.products.length;
    const activeProducts = this.products.filter(p => p.status === 'active').length;
    const totalRevenue = this.products.reduce((sum, p) => sum + p.revenue, 0);
    const totalSales = this.products.reduce((sum, p) => sum + p.sales, 0);

    return {
      totalProducts,
      activeProducts,
      totalRevenue,
      totalSales,
      averagePrice: totalProducts > 0 ? this.products.reduce((sum, p) => sum + p.price, 0) / totalProducts : 0
    };
  }
}

// ----------------------
// Professional Product Card Component
// Purpose: Displays product information in a structured, professional layout
// Note: Similar to verification card with product-specific data
// ----------------------
function ProfessionalProductCard({
  product,
  onView,
  onEdit,
  onMore,
  className = ""
}: {
  product: Product;
  onView?: () => void;
  onEdit?: () => void;
  onMore?: () => void;
  className?: string;
}) {
  const getStatusBadge = () => {
    const statusConfig = {
      active: { variant: "default" as const, icon: CheckCircle, text: "Active", color: "text-green-600" },
      inactive: { variant: "secondary" as const, icon: Clock, text: "Inactive", color: "text-yellow-600" },
      draft: { variant: "outline" as const, icon: Edit, text: "Draft", color: "text-gray-600" },
      archived: { variant: "destructive" as const, icon: AlertTriangle, text: "Archived", color: "text-red-600" }
    };

    const config = statusConfig[product.status];
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {config.text}
      </Badge>
    );
  };

  const getTypeIcon = () => {
    return <Package className="h-4 w-4" />;
  };

  const getTypeBadge = () => {
    return (
      <Badge variant="outline" className="text-xs">
        {product.category}
      </Badge>
    );
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
                {product.name.length > 30 ? `${product.name.substring(0, 30)}...` : product.name}
                {getTypeBadge()}
              </CardTitle>
              <CardDescription className="text-text-muted">
                {product.sku} • {product.category}
              </CardDescription>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-text">
              ${product.price}
            </div>
            <div className="text-sm text-text-muted">
              {product.sales} sales
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Product Overview */}
        <div className="bg-surface-elev2 rounded-lg p-4 border border-line-soft">
          <div className="flex items-center gap-2 mb-3">
            {getTypeIcon()}
            <span className="font-medium text-text">Product Overview</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-sm text-text-muted">Status:</span>
              <div className="mt-1">
                {getStatusBadge()}
              </div>
            </div>
            <div>
              <span className="text-sm text-text-muted">Category:</span>
              <div className="mt-1">
                {getTypeBadge()}
              </div>
            </div>
            <div>
              <span className="text-sm text-text-muted">SKU:</span>
              <div className="mt-1">
                <Badge variant="outline" className="text-xs">
                  {product.sku}
                </Badge>
              </div>
            </div>
            <div>
              <span className="text-sm text-text-muted">Featured:</span>
              <div className="mt-1">
                {product.featured ? (
                  <Badge variant="outline" className="text-xs text-yellow-600 border-yellow-600">
                    <Star className="h-3 w-3 mr-1" />
                    Featured
                  </Badge>
                ) : (
                  <span className="text-xs text-text-muted">No</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Product Image */}
        <div className="aspect-video bg-surface-elev2 rounded-lg flex items-center justify-center border border-line-soft">
          <div className="flex flex-col items-center gap-3 text-text-muted">
            <div className="p-4 bg-admin-card rounded-full border border-line-soft">
              <ImageIcon className="h-8 w-8 text-brand" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-text">Product Image</p>
              <p className="text-xs text-text-muted">Click to view full image</p>
            </div>
          </div>
        </div>

        {/* Pricing Information */}
        <div className="bg-surface-elev2 rounded-lg p-4 border border-line-soft">
          <div className="flex items-center gap-2 mb-3">
            <DollarSign className="h-5 w-5 text-text-muted" />
            <span className="font-medium text-text">Pricing Information</span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-muted">Current Price:</span>
              <span className="text-lg font-bold text-text">${product.price}</span>
            </div>
            {product.originalPrice && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-muted">Original Price:</span>
                <span className="text-sm text-text-muted line-through">${product.originalPrice}</span>
              </div>
            )}
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-muted">Revenue:</span>
              <span className="text-sm font-semibold text-text">${product.revenue.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Performance Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-surface-elev2 rounded-lg p-4 text-center border border-line-soft">
            <div className="flex items-center justify-center gap-1 text-text-muted mb-1">
              <ShoppingCart className="h-4 w-4" />
              <span className="text-xs font-medium">Sales</span>
            </div>
            <div className="text-lg font-bold text-text">
              {product.sales}
            </div>
          </div>
          <div className="bg-surface-elev2 rounded-lg p-4 text-center border border-line-soft">
            <div className="flex items-center justify-center gap-1 text-text-muted mb-1">
              <Package className="h-4 w-4" />
              <span className="text-xs font-medium">Stock</span>
            </div>
            <div className="text-lg font-bold text-text">
              {product.inventory}
            </div>
          </div>
          <div className="bg-surface-elev2 rounded-lg p-4 text-center border border-line-soft">
            <div className="flex items-center justify-center gap-1 text-text-muted mb-1">
              <Star className="h-4 w-4" />
              <span className="text-xs font-medium">Rating</span>
            </div>
            <div className="text-lg font-bold text-text">
              {product.rating}
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="bg-surface-elev2 rounded-lg p-4 border border-line-soft">
          <div className="flex items-center gap-2 mb-3">
            <FileText className="h-5 w-5 text-text-muted" />
            <span className="font-medium text-text">Product Details</span>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-text line-clamp-3">{product.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-muted">Reviews:</span>
              <span className="text-sm text-text">{product.reviews}</span>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="bg-surface-elev2 rounded-lg p-4 border border-line-soft">
          <div className="flex items-center gap-2 mb-3">
            <Tag className="h-5 w-5 text-text-muted" />
            <span className="font-medium text-text">Tags</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {product.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                <Tag className="h-3 w-3 mr-1" />
                {tag}
              </Badge>
            ))}
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
// Products Detail View Component
// Purpose: Single card view with filtering and quick stats
// Note: Similar to verification page with product-specific data
// ----------------------
function ProductsDetailView({
  products,
  selectedProductId,
  onProductSelect,
  onView,
  onEdit,
  onMore,
  className = ""
}: {
  products: Product[];
  selectedProductId?: string;
  onProductSelect?: (productId: string) => void;
  onView?: (productId: string) => void;
  onEdit?: (productId: string) => void;
  onMore?: (productId: string) => void;
  className?: string;
}) {
  const selectedProduct = products.find(p => p.id === selectedProductId) || products[0];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { variant: "default" as const, color: "text-green-600", bgColor: "bg-green-100" },
      inactive: { variant: "secondary" as const, color: "text-yellow-600", bgColor: "bg-yellow-100" },
      draft: { variant: "outline" as const, color: "text-gray-600", bgColor: "bg-gray-100" },
      archived: { variant: "destructive" as const, color: "text-red-600", bgColor: "bg-red-100" }
    };
    return statusConfig[status as keyof typeof statusConfig] || statusConfig.active;
  };

  const getTypeIcon = () => {
    return <Package className="h-4 w-4" />;
  };

  const statusInfo = getStatusBadge(selectedProduct?.status || 'active');

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Filter Section */}
      <div className="bg-surface-elev1 border border-line-soft rounded-lg p-4">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <label className="text-sm font-medium text-text-muted mb-2 block">Select Product</label>
            <Select value={selectedProductId || products[0]?.id} onValueChange={onProductSelect}>
              <SelectTrigger className="bg-surface-elev2 border-line-soft text-text">
                <SelectValue placeholder="Choose a product..." />
              </SelectTrigger>
              <SelectContent className="bg-surface-elev2 border-line-soft">
                {products.map((product) => {
                  const Icon = getTypeIcon();
                  return (
                    <SelectItem 
                      key={product.id} 
                      value={product.id}
                      className="text-text hover:bg-surface-elev1"
                    >
                      <div className="flex items-center gap-2">
                        {Icon}
                        <span>{product.name.length > 30 ? `${product.name.substring(0, 30)}...` : product.name}</span>
                        <Badge 
                          variant={product.status === 'active' ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {product.status}
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
        {/* Left: Product Card */}
        <div className="lg:col-span-2">
          {selectedProduct ? (
            <ProfessionalProductCard
              product={selectedProduct}
              onView={() => onView?.(selectedProduct.id)}
              onEdit={() => onEdit?.(selectedProduct.id)}
              onMore={() => onMore?.(selectedProduct.id)}
            />
          ) : (
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 text-center">
              <Package className="h-12 w-12 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-400">No product selected</p>
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
                  {selectedProduct?.status || 'N/A'}
                </div>
              </div>

              {/* Category */}
              <div className="flex items-center justify-between p-3 bg-surface-elev2 rounded-lg">
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-text-muted" />
                  <span className="text-sm font-medium text-text">Category</span>
                </div>
                <span className="text-sm font-semibold text-text">
                  {selectedProduct?.category || 'N/A'}
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center justify-between p-3 bg-surface-elev2 rounded-lg">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-text-muted" />
                  <span className="text-sm font-medium text-text">Price</span>
                </div>
                <span className="text-sm font-semibold text-text">
                  ${selectedProduct?.price || '0.00'}
                </span>
              </div>

              {/* Sales */}
              <div className="flex items-center justify-between p-3 bg-surface-elev2 rounded-lg">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="h-4 w-4 text-text-muted" />
                  <span className="text-sm font-medium text-text">Sales</span>
                </div>
                <span className="text-sm font-semibold text-text">
                  {selectedProduct?.sales || '0'}
                </span>
              </div>

              {/* Inventory */}
              <div className="flex items-center justify-between p-3 bg-surface-elev2 rounded-lg">
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-text-muted" />
                  <span className="text-sm font-medium text-text">Inventory</span>
                </div>
                <span className="text-sm font-semibold text-text">
                  {selectedProduct?.inventory || '0'}
                </span>
              </div>

              {/* Rating */}
              <div className="flex items-center justify-between p-3 bg-surface-elev2 rounded-lg">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-text-muted" />
                  <span className="text-sm font-medium text-text">Rating</span>
                </div>
                <span className="text-sm font-semibold text-text">
                  {selectedProduct?.rating || '0.0'}
                </span>
              </div>

              {/* Revenue */}
              <div className="flex items-center justify-between p-3 bg-surface-elev2 rounded-lg">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-text-muted" />
                  <span className="text-sm font-medium text-text">Revenue</span>
                </div>
                <span className="text-sm font-semibold text-text">
                  ${selectedProduct?.revenue?.toFixed(2) || '0.00'}
                </span>
              </div>

              {/* Date */}
              <div className="flex items-center justify-between p-3 bg-surface-elev2 rounded-lg">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-text-muted" />
                  <span className="text-sm font-medium text-text">Created</span>
                </div>
                <span className="text-sm text-text-muted">
                  {selectedProduct?.createdAt ? new Date(selectedProduct.createdAt).toLocaleDateString() : 'N/A'}
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
                onClick={() => onView?.(selectedProduct?.id || '')}
              >
                <Eye className="h-4 w-4 mr-2" />
                View Product
              </Button>
              <Button 
                variant="outline" 
                className="w-full bg-surface-elev2 border-line-soft text-text hover:bg-surface-elev1"
                onClick={() => onEdit?.(selectedProduct?.id || '')}
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Product
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// ----------------------
// Products Page Client Component
// Purpose: Manages state and interactions for the products page
// ----------------------
function ProductsPageClient() {
  const [selectedProductId, setSelectedProductId] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const productService = new ProductManagementService();
  const allProducts = productService.getProducts();
  const categories = productService.getCategories();
  const stats = productService.getProductStats();

  // Filter products based on search and status
  const filteredProducts = allProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || product.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Set default selected product
  useEffect(() => {
    if (filteredProducts.length > 0 && !selectedProductId) {
      setSelectedProductId(filteredProducts[0].id);
    }
  }, [filteredProducts, selectedProductId]);

  const handleProductSelect = (productId: string) => {
    setSelectedProductId(productId);
  };

  const handleView = (productId: string) => {
    console.log('View product:', productId);
  };

  const handleEdit = (productId: string) => {
    console.log('Edit product:', productId);
  };

  const handleMore = (productId: string) => {
    console.log('More actions for product:', productId);
  };

  const handleRefresh = () => {
    console.log('Refresh products');
  };

  const handleExportAll = () => {
    console.log('Export all products');
  };

  const statsCards = (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard
        title="Total Products"
        value={stats.totalProducts}
        growth={0}
        icon={Package}
        format="number"
      />
      <MetricCard
        title="Total Revenue"
        value={stats.totalRevenue}
        growth={0}
        icon={DollarSign}
        format="currency"
      />
      <MetricCard
        title="Average Price"
        value={stats.averagePrice}
        growth={0}
        icon={TrendingUp}
        format="currency"
      />
      <MetricCard
        title="Categories"
        value={categories.length}
        growth={0}
        icon={Tag}
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
          <SelectItem value="active" className="text-text hover:bg-surface-elev1">Active</SelectItem>
          <SelectItem value="inactive" className="text-text hover:bg-surface-elev1">Inactive</SelectItem>
          <SelectItem value="draft" className="text-text hover:bg-surface-elev1">Draft</SelectItem>
          <SelectItem value="archived" className="text-text hover:bg-surface-elev1">Archived</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );

  return (
    <AdminPageTemplate
      title="Products Management"
      description="Manage your product catalog and inventory across the platform"
      icon={<Package className="h-6 w-6" />}
      searchPlaceholder="Search products, SKUs, or categories..."
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
      <ProductsDetailView
        products={filteredProducts}
        selectedProductId={selectedProductId}
        onProductSelect={handleProductSelect}
        onView={handleView}
        onEdit={handleEdit}
        onMore={handleMore}
      />
    </AdminPageTemplate>
  );
}

export default function ProductsPage() {
  return <ProductsPageClient />;
}
