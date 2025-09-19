"use client";

import { AdminPillNavigationComponent } from "@src/components/admin/AdminPillNavigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@src/components/ui/card";
import { Badge } from "@src/components/ui/badge";
import { Button } from "@src/components/ui/button";
import { Input } from "@src/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@src/components/ui/tabs";
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
  BarChart3
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

class ProductCardComponent {
  private product: Product;

  constructor(product: Product) {
    this.product = product;
  }

  private getStatusBadge() {
    const statusConfig = {
      active: { variant: "default" as const, icon: CheckCircle, text: "Active" },
      inactive: { variant: "secondary" as const, icon: Clock, text: "Inactive" },
      draft: { variant: "outline" as const, icon: Edit, text: "Draft" },
      archived: { variant: "destructive" as const, icon: AlertTriangle, text: "Archived" }
    };

    const config = statusConfig[this.product.status];
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {config.text}
      </Badge>
    );
  }

  public render() {
    return (
      <Card className="group hover:shadow-lg transition-all duration-200">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <CardTitle className="text-lg line-clamp-1">{this.product.name}</CardTitle>
              <CardDescription className="line-clamp-2">{this.product.description}</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              {this.product.featured && (
                <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                  <Star className="h-3 w-3 mr-1" />
                  Featured
                </Badge>
              )}
              {this.getStatusBadge()}
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Product Image */}
          <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
            <ImageIcon className="h-12 w-12 text-muted-foreground" />
          </div>

          {/* Pricing */}
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold">${this.product.price}</span>
            {this.product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ${this.product.originalPrice}
              </span>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              <span>{this.product.sales} sales</span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <span>${this.product.revenue.toFixed(2)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4 text-muted-foreground" />
              <span>{this.product.inventory} in stock</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-500" />
              <span>{this.product.rating} ({this.product.reviews})</span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1">
            {this.product.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                <Tag className="h-3 w-3 mr-1" />
                {tag}
              </Badge>
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <Button variant="outline" size="sm" className="flex-1">
              <Eye className="h-4 w-4 mr-2" />
              View
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              <Edit className="h-4 w-4 mr-2" />
              Edit
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

export default function ProductsPage() {
  const productService = new ProductManagementService();
  const products = productService.getProducts();
  const categories = productService.getCategories();
  const stats = productService.getProductStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Products</h1>
          <p className="text-muted-foreground">Manage your product catalog and inventory</p>
        </div>
        <Button className="w-full sm:w-auto">
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProducts}</div>
            <p className="text-xs text-muted-foreground">
              {stats.activeProducts} active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              From {stats.totalSales} sales
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Price</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.averagePrice.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              Per product
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Categories</CardTitle>
            <Tag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{categories.length}</div>
            <p className="text-xs text-muted-foreground">
              Active categories
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
                  placeholder="Search products..."
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

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => {
          const productCard = new ProductCardComponent(product);
          return <div key={product.id}>{productCard.render()}</div>;
        })}
      </div>
    </div>
  );
}
