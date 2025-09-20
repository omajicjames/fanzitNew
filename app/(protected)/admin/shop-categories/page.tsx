"use client";

import { useState, useEffect } from "react";
import { AdminPageTemplate, MetricCard } from "@src/components/admin/AdminPageTemplate";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@src/components/ui/card";
import { Badge } from "@src/components/ui/badge";
import { Button } from "@src/components/ui/button";
import { Input } from "@src/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@src/components/ui/select";
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
  AlertTriangle,
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
  FileText,
  DollarSign
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

// ----------------------
// Professional Category Card Component
// Purpose: Displays category information in a structured, professional layout
// Note: Similar to verification card with category-specific data
// ----------------------
function ProfessionalCategoryCard({
  category,
  onView,
  onEdit,
  onMore,
  className = ""
}: {
  category: ShopCategory;
  onView?: () => void;
  onEdit?: () => void;
  onMore?: () => void;
  className?: string;
}) {
  const getStatusBadge = () => {
    const statusConfig = {
      active: { variant: "default" as const, icon: CheckCircle, text: "Active", color: "text-green-600" },
      inactive: { variant: "secondary" as const, icon: Clock, text: "Inactive", color: "text-gray-600" },
      archived: { variant: "destructive" as const, icon: AlertTriangle, text: "Archived", color: "text-red-600" }
    };

    const config = statusConfig[category.status];
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {config.text}
      </Badge>
    );
  };

  const getTypeIcon = () => {
    return <Tags className="h-4 w-4" />;
  };

  const getTypeBadge = () => {
    return (
      <Badge variant="outline" className="text-xs">
        LEVEL {category.level}
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
                {category.name}
                {getTypeBadge()}
              </CardTitle>
              <CardDescription className="text-text-muted">
                {category.description}
              </CardDescription>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-text">
              {category.productCount}
            </div>
            <div className="text-sm text-text-muted">
              products
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Category Overview */}
        <div className="bg-surface-elev2 rounded-lg p-4 border border-line-soft">
          <div className="flex items-center gap-2 mb-3">
            {getTypeIcon()}
            <span className="font-medium text-text">Category Overview</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-sm text-text-muted">Status:</span>
              <div className="mt-1">
                {getStatusBadge()}
              </div>
            </div>
            <div>
              <span className="text-sm text-text-muted">Level:</span>
              <div className="mt-1">
                {getTypeBadge()}
              </div>
            </div>
            <div>
              <span className="text-sm text-text-muted">Slug:</span>
              <div className="mt-1">
                <Badge variant="outline" className="text-xs">
                  {category.slug}
                </Badge>
              </div>
            </div>
            <div>
              <span className="text-sm text-text-muted">Products:</span>
              <div className="mt-1 flex items-center gap-1">
                <Package className="h-4 w-4" />
                <span className="text-sm text-text">{category.productCount}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Category Visual */}
        <div 
          className="aspect-video rounded-lg flex items-center justify-center text-white font-bold text-lg border border-line-soft"
          style={{ backgroundColor: category.color }}
        >
          <div className="text-center">
            <div className="text-4xl mb-2">{category.icon}</div>
            <div className="text-lg">{category.name}</div>
          </div>
        </div>

        {/* Revenue Information */}
        <div className="bg-surface-elev2 rounded-lg p-4 border border-line-soft">
          <div className="flex items-center gap-2 mb-3">
            <DollarSign className="h-5 w-5 text-text-muted" />
            <span className="font-medium text-text">Revenue Information</span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-muted">Total Revenue:</span>
              <span className="text-sm font-semibold text-text">${category.totalRevenue.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-muted">Product Count:</span>
              <span className="text-sm text-text">{category.productCount}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-muted">Average per Product:</span>
              <span className="text-sm text-text">
                ${category.productCount > 0 ? (category.totalRevenue / category.productCount).toFixed(2) : '0.00'}
              </span>
            </div>
          </div>
        </div>

        {/* SEO Information */}
        {(category.seoTitle || category.seoDescription) && (
          <div className="bg-surface-elev2 rounded-lg p-4 border border-line-soft">
            <div className="flex items-center gap-2 mb-3">
              <FileText className="h-5 w-5 text-text-muted" />
              <span className="font-medium text-text">SEO Information</span>
            </div>
            <div className="space-y-2">
              {category.seoTitle && (
                <div>
                  <span className="text-sm text-text-muted">Title:</span>
                  <p className="text-sm text-text mt-1">{category.seoTitle}</p>
                </div>
              )}
              {category.seoDescription && (
                <div>
                  <span className="text-sm text-text-muted">Description:</span>
                  <p className="text-sm text-text mt-1">{category.seoDescription}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Subcategories */}
        {category.children && category.children.length > 0 && (
          <div className="bg-surface-elev2 rounded-lg p-4 border border-line-soft">
            <div className="flex items-center gap-2 mb-3">
              <Tags className="h-5 w-5 text-text-muted" />
              <span className="font-medium text-text">Subcategories</span>
            </div>
            <div className="space-y-2">
              {category.children.map((child) => (
                <div key={child.id} className="flex items-center justify-between p-2 bg-surface-elev1 rounded border border-line-soft">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{child.icon}</span>
                    <span className="text-sm text-text">{child.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-text-muted">{child.productCount} products</span>
                    <Badge variant="outline" className="text-xs">
                      ${child.totalRevenue.toFixed(0)}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

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
                {new Date(category.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-muted">Updated:</span>
              <span className="text-sm text-text">
                {new Date(category.updatedAt).toLocaleDateString()}
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
// Categories Detail View Component
// Purpose: Single card view with filtering and quick stats
// Note: Similar to verification page with category-specific data
// ----------------------
function CategoriesDetailView({
  categories,
  selectedCategoryId,
  onCategorySelect,
  onView,
  onEdit,
  onMore,
  className = ""
}: {
  categories: ShopCategory[];
  selectedCategoryId?: string;
  onCategorySelect?: (categoryId: string) => void;
  onView?: (categoryId: string) => void;
  onEdit?: (categoryId: string) => void;
  onMore?: (categoryId: string) => void;
  className?: string;
}) {
  const selectedCategory = categories.find(c => c.id === selectedCategoryId) || categories[0];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { variant: "default" as const, color: "text-green-600", bgColor: "bg-green-100" },
      inactive: { variant: "secondary" as const, color: "text-gray-600", bgColor: "bg-gray-100" },
      archived: { variant: "destructive" as const, color: "text-red-600", bgColor: "bg-red-100" }
    };
    return statusConfig[status as keyof typeof statusConfig] || statusConfig.active;
  };

  const getTypeIcon = () => {
    return <Tags className="h-4 w-4" />;
  };

  const statusInfo = getStatusBadge(selectedCategory?.status || 'active');

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Filter Section */}
      <div className="bg-surface-elev1 border border-line-soft rounded-lg p-4">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <label className="text-sm font-medium text-text-muted mb-2 block">Select Category</label>
            <Select value={selectedCategoryId || categories[0]?.id} onValueChange={onCategorySelect}>
              <SelectTrigger className="bg-surface-elev2 border-line-soft text-text">
                <SelectValue placeholder="Choose a category..." />
              </SelectTrigger>
              <SelectContent className="bg-surface-elev2 border-line-soft">
                {categories.map((category) => {
                  const Icon = getTypeIcon();
                  return (
                    <SelectItem 
                      key={category.id} 
                      value={category.id}
                      className="text-text hover:bg-surface-elev1"
                    >
                      <div className="flex items-center gap-2">
                        {Icon}
                        <span>{category.name}</span>
                        <Badge 
                          variant={category.status === 'active' ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {category.status}
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
        {/* Left: Category Card */}
        <div className="lg:col-span-2">
          {selectedCategory ? (
            <ProfessionalCategoryCard
              category={selectedCategory}
              onView={() => onView?.(selectedCategory.id)}
              onEdit={() => onEdit?.(selectedCategory.id)}
              onMore={() => onMore?.(selectedCategory.id)}
            />
          ) : (
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 text-center">
              <Tags className="h-12 w-12 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-400">No category selected</p>
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
                  {selectedCategory?.status || 'N/A'}
                </div>
              </div>

              {/* Level */}
              <div className="flex items-center justify-between p-3 bg-surface-elev2 rounded-lg">
                <div className="flex items-center gap-2">
                  <Tags className="h-4 w-4 text-text-muted" />
                  <span className="text-sm font-medium text-text">Level</span>
                </div>
                <span className="text-sm font-semibold text-text">
                  {selectedCategory?.level || 'N/A'}
                </span>
              </div>

              {/* Products */}
              <div className="flex items-center justify-between p-3 bg-surface-elev2 rounded-lg">
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-text-muted" />
                  <span className="text-sm font-medium text-text">Products</span>
                </div>
                <span className="text-sm font-semibold text-text">
                  {selectedCategory?.productCount || '0'}
                </span>
              </div>

              {/* Revenue */}
              <div className="flex items-center justify-between p-3 bg-surface-elev2 rounded-lg">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-text-muted" />
                  <span className="text-sm font-medium text-text">Revenue</span>
                </div>
                <span className="text-sm font-semibold text-text">
                  ${selectedCategory?.totalRevenue?.toFixed(2) || '0.00'}
                </span>
              </div>

              {/* Subcategories */}
              <div className="flex items-center justify-between p-3 bg-surface-elev2 rounded-lg">
                <div className="flex items-center gap-2">
                  <Tags className="h-4 w-4 text-text-muted" />
                  <span className="text-sm font-medium text-text">Subcategories</span>
                </div>
                <span className="text-sm font-semibold text-text">
                  {selectedCategory?.children?.length || '0'}
                </span>
              </div>

              {/* Created Date */}
              <div className="flex items-center justify-between p-3 bg-surface-elev2 rounded-lg">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-text-muted" />
                  <span className="text-sm font-medium text-text">Created</span>
                </div>
                <span className="text-sm text-text-muted">
                  {selectedCategory?.createdAt ? new Date(selectedCategory.createdAt).toLocaleDateString() : 'N/A'}
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
                onClick={() => onView?.(selectedCategory?.id || '')}
              >
                <Eye className="h-4 w-4 mr-2" />
                View Category
              </Button>
              <Button 
                variant="outline" 
                className="w-full bg-surface-elev2 border-line-soft text-text hover:bg-surface-elev1"
                onClick={() => onEdit?.(selectedCategory?.id || '')}
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Category
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// ----------------------
// Shop Categories Page Client Component
// Purpose: Manages state and interactions for the shop categories page
// ----------------------
function ShopCategoriesPageClient() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const categoriesService = new ShopCategoriesService();
  const allCategories = categoriesService.getCategories();
  const stats = categoriesService.getCategoryStats();

  // Filter categories based on search and status
  const filteredCategories = allCategories.filter(category => {
    const matchesSearch = category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         category.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         category.slug.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || category.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Set default selected category
  useEffect(() => {
    if (filteredCategories.length > 0 && !selectedCategoryId) {
      setSelectedCategoryId(filteredCategories[0].id);
    }
  }, [filteredCategories, selectedCategoryId]);

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
  };

  const handleView = (categoryId: string) => {
    console.log('View category:', categoryId);
  };

  const handleEdit = (categoryId: string) => {
    console.log('Edit category:', categoryId);
  };

  const handleMore = (categoryId: string) => {
    console.log('More actions for category:', categoryId);
  };

  const handleRefresh = () => {
    console.log('Refresh categories');
  };

  const handleExportAll = () => {
    console.log('Export all categories');
  };

  const statsCards = (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard
        title="Total Categories"
        value={stats.totalCategories}
        growth={0}
        icon={Tags}
        format="number"
      />
      <MetricCard
        title="Total Products"
        value={stats.totalProducts}
        growth={0}
        icon={Package}
        format="number"
      />
      <MetricCard
        title="Category Revenue"
        value={stats.categoryRevenue}
        growth={0}
        icon={TrendingUp}
        format="currency"
      />
      <MetricCard
        title="Active Categories"
        value={stats.activeCategories}
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
          <SelectItem value="active" className="text-text hover:bg-surface-elev1">Active</SelectItem>
          <SelectItem value="inactive" className="text-text hover:bg-surface-elev1">Inactive</SelectItem>
          <SelectItem value="archived" className="text-text hover:bg-surface-elev1">Archived</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );

  return (
    <AdminPageTemplate
      title="Shop Categories Management"
      description="Manage product categories, organization, and hierarchy"
      icon={<Tags className="h-6 w-6" />}
      searchPlaceholder="Search categories, names, or descriptions..."
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
      <CategoriesDetailView
        categories={filteredCategories}
        selectedCategoryId={selectedCategoryId}
        onCategorySelect={handleCategorySelect}
        onView={handleView}
        onEdit={handleEdit}
        onMore={handleMore}
      />
    </AdminPageTemplate>
  );
}

export default function ShopCategoriesPage() {
  return <ShopCategoriesPageClient />;
}
