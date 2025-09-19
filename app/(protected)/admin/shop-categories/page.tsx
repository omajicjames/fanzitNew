"use client";

import { AdminPillNavigationComponent } from "@src/components/admin/AdminPillNavigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@src/components/ui/card";
import { Badge } from "@src/components/ui/badge";
import { Button } from "@src/components/ui/button";
import { Input } from "@src/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@src/components/ui/tabs";
import { 
  Tags, 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Eye, 
  Edit, 
  Trash2, 
  Package,
  TrendingUp,
  BarChart3,
  Settings,
  CheckCircle,
  Clock,
  AlertTriangle
} from "lucide-react";

// ----------------------
// Shop Categories Management Page
// Location: /app/(protected)/admin/shop-categories/page.tsx
// Purpose: Manage product categories for e-commerce shop
// Features: Category management, hierarchy, analytics
// Note: Mobile-first design with object-oriented structure
// ----------------------

interface ShopCategory {
  id: string;
  name: string;
  description: string;
  slug: string;
  parentId?: string;
  level: number;
  productCount: number;
  totalRevenue: number;
  status: 'active' | 'inactive' | 'archived';
  image?: string;
  icon?: string;
  color: string;
  seoTitle?: string;
  seoDescription?: string;
  createdAt: string;
  updatedAt: string;
  children?: ShopCategory[];
}

interface CategoryStats {
  totalCategories: number;
  activeCategories: number;
  totalProducts: number;
  averageProductsPerCategory: number;
  topPerformingCategory: string;
  categoryRevenue: number;
}

class ShopCategoriesService {
  private categories: ShopCategory[] = [];

  constructor() {
    this.initializeMockData();
  }

  private initializeMockData() {
    this.categories = [
      {
        id: "1",
        name: "Digital Art",
        description: "Digital artwork, illustrations, and designs",
        slug: "digital-art",
        level: 0,
        productCount: 45,
        totalRevenue: 12500.50,
        status: "active",
        color: "#3B82F6",
        icon: "🎨",
        seoTitle: "Digital Art Collection",
        seoDescription: "Premium digital artwork and illustrations",
        createdAt: "2024-01-01",
        updatedAt: "2024-01-27",
        children: [
          {
            id: "1-1",
            name: "Illustrations",
            description: "Custom illustrations and artwork",
            slug: "digital-art-illustrations",
            parentId: "1",
            level: 1,
            productCount: 20,
            totalRevenue: 5500.25,
            status: "active",
            color: "#8B5CF6",
            icon: "🖼️",
            createdAt: "2024-01-01",
            updatedAt: "2024-01-27"
          },
          {
            id: "1-2",
            name: "Logos & Branding",
            description: "Logo designs and branding materials",
            slug: "digital-art-logos",
            parentId: "1",
            level: 1,
            productCount: 15,
            totalRevenue: 4200.75,
            status: "active",
            color: "#F59E0B",
            icon: "🏷️",
            createdAt: "2024-01-01",
            updatedAt: "2024-01-27"
          }
        ]
      },
      {
        id: "2",
        name: "Video Content",
        description: "Video tutorials, courses, and content",
        slug: "video-content",
        level: 0,
        productCount: 32,
        totalRevenue: 8750.30,
        status: "active",
        color: "#EF4444",
        icon: "🎥",
        seoTitle: "Video Content Library",
        seoDescription: "Educational and entertainment video content",
        createdAt: "2024-01-01",
        updatedAt: "2024-01-27",
        children: [
          {
            id: "2-1",
            name: "Tutorials",
            description: "Step-by-step tutorial videos",
            slug: "video-content-tutorials",
            parentId: "2",
            level: 1,
            productCount: 18,
            totalRevenue: 4800.15,
            status: "active",
            color: "#10B981",
            icon: "📚",
            createdAt: "2024-01-01",
            updatedAt: "2024-01-27"
          }
        ]
      },
      {
        id: "3",
        name: "Photography",
        description: "Stock photos and photography collections",
        slug: "photography",
        level: 0,
        productCount: 28,
        totalRevenue: 6200.80,
        status: "active",
        color: "#06B6D4",
        icon: "📸",
        seoTitle: "Photography Collection",
        seoDescription: "High-quality stock photography",
        createdAt: "2024-01-01",
        updatedAt: "2024-01-27"
      }
    ];
  }

  public getCategories(): ShopCategory[] {
    return this.categories;
  }

  public getCategoryStats(): CategoryStats {
    const totalCategories = this.categories.length;
    const activeCategories = this.categories.filter(c => c.status === 'active').length;
    const totalProducts = this.categories.reduce((sum, c) => sum + c.productCount, 0);
    const averageProductsPerCategory = totalCategories > 0 ? totalProducts / totalCategories : 0;
    const topPerformingCategory = this.categories.reduce((top, current) => 
      current.totalRevenue > top.totalRevenue ? current : top
    ).name;
    const categoryRevenue = this.categories.reduce((sum, c) => sum + c.totalRevenue, 0);

    return {
      totalCategories,
      activeCategories,
      totalProducts,
      averageProductsPerCategory,
      topPerformingCategory,
      categoryRevenue
    };
  }

  public getTopLevelCategories(): ShopCategory[] {
    return this.categories.filter(c => c.level === 0);
  }
}

class CategoryCardComponent {
  private category: ShopCategory;

  constructor(category: ShopCategory) {
    this.category = category;
  }

  private getStatusBadge() {
    const statusConfig = {
      active: { variant: "default" as const, icon: CheckCircle, text: "Active" },
      inactive: { variant: "secondary" as const, icon: Clock, text: "Inactive" },
      archived: { variant: "destructive" as const, icon: AlertTriangle, text: "Archived" }
    };

    const config = statusConfig[this.category.status];
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
              <CardTitle className="text-lg flex items-center gap-2">
                <span className="text-2xl">{this.category.icon}</span>
                {this.category.name}
              </CardTitle>
              <CardDescription className="line-clamp-2">
                {this.category.description}
              </CardDescription>
            </div>
            {this.getStatusBadge()}
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Category Image/Color */}
          <div 
            className="aspect-video rounded-lg flex items-center justify-center text-white font-bold text-lg"
            style={{ backgroundColor: this.category.color }}
          >
            {this.category.icon} {this.category.name}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4 text-muted-foreground" />
              <span>{this.category.productCount} products</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
              <span>${this.category.totalRevenue.toFixed(0)}</span>
            </div>
          </div>

          {/* SEO Info */}
          {(this.category.seoTitle || this.category.seoDescription) && (
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground">SEO</p>
              {this.category.seoTitle && (
                <p className="text-xs line-clamp-1">{this.category.seoTitle}</p>
              )}
              {this.category.seoDescription && (
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {this.category.seoDescription}
                </p>
              )}
            </div>
          )}

          {/* Subcategories */}
          {this.category.children && this.category.children.length > 0 && (
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground">Subcategories</p>
              <div className="flex flex-wrap gap-1">
                {this.category.children.slice(0, 3).map((child) => (
                  <Badge key={child.id} variant="outline" className="text-xs">
                    {child.icon} {child.name}
                  </Badge>
                ))}
                {this.category.children.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{this.category.children.length - 3} more
                  </Badge>
                )}
              </div>
            </div>
          )}

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

export default function ShopCategoriesPage() {
  const categoriesService = new ShopCategoriesService();
  const categories = categoriesService.getCategories();
  const stats = categoriesService.getCategoryStats();
  const topLevelCategories = categoriesService.getTopLevelCategories();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Shop Categories</h1>
          <p className="text-muted-foreground">Manage product categories and organization</p>
        </div>
        <Button className="w-full sm:w-auto">
          <Plus className="h-4 w-4 mr-2" />
          Add Category
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Categories</CardTitle>
            <Tags className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCategories}</div>
            <p className="text-xs text-muted-foreground">
              {stats.activeCategories} active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProducts}</div>
            <p className="text-xs text-muted-foreground">
              {stats.averageProductsPerCategory.toFixed(1)} avg per category
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Category Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.categoryRevenue.toFixed(0)}</div>
            <p className="text-xs text-muted-foreground">
              Total from categories
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Category</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold truncate">{stats.topPerformingCategory}</div>
            <p className="text-xs text-muted-foreground">
              Best performing
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
                  placeholder="Search categories..."
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

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topLevelCategories.map((category) => {
          const categoryCard = new CategoryCardComponent(category);
          return <div key={category.id}>{categoryCard.render()}</div>;
        })}
      </div>
    </div>
  );
}
