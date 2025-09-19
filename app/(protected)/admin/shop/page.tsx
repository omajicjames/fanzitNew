"use client";

import React from "react";
import { AdminPillNavigationComponent } from "@src/components/admin/AdminPillNavigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@src/components/ui/card";
import { Badge } from "@src/components/ui/badge";
import { Button } from "@src/components/ui/button";
import { Input } from "@src/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@src/components/ui/tabs";
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
  ShoppingCart
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

class ShopManagementService {
  private settings!: ShopSettings;
  private stats!: ShopStats;

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
  }

  public getSettings(): ShopSettings {
    return this.settings;
  }

  public getStats(): ShopStats {
    return this.stats;
  }
}

class ShopSettingsCardComponent extends React.Component<{ settings: ShopSettings }> {
  private settings: ShopSettings;

  constructor(props: { settings: ShopSettings }) {
    super(props);
    this.settings = props.settings;
  }

  public render() {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Shop Settings
          </CardTitle>
          <CardDescription>
            Configure your shop settings and preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Shop Name</label>
              <Input value={this.settings.name} readOnly />
            </div>
            <div>
              <label className="text-sm font-medium">Currency</label>
              <Input value={this.settings.currency} readOnly />
            </div>
            <div>
              <label className="text-sm font-medium">Tax Rate (%)</label>
              <Input value={this.settings.taxRate.toString()} readOnly />
            </div>
            <div>
              <label className="text-sm font-medium">Free Shipping Threshold</label>
              <Input value={`$${this.settings.freeShippingThreshold}`} readOnly />
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium">Description</label>
            <Input value={this.settings.description} readOnly />
          </div>

          <div className="flex items-center gap-4">
            <Badge variant={this.settings.isActive ? "default" : "secondary"}>
              {this.settings.isActive ? "Active" : "Inactive"}
            </Badge>
            <Badge variant={this.settings.maintenanceMode ? "destructive" : "outline"}>
              {this.settings.maintenanceMode ? "Maintenance Mode" : "Normal Operation"}
            </Badge>
          </div>

          <Button className="w-full">
            <Edit className="h-4 w-4 mr-2" />
            Edit Settings
          </Button>
        </CardContent>
      </Card>
    );
  }
}

class ShopStatsCardComponent extends React.Component<{ stats: ShopStats }> {
  private stats: ShopStats;

  constructor(props: { stats: ShopStats }) {
    super(props);
    this.stats = props.stats;
  }

  public render() {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Shop Performance
          </CardTitle>
          <CardDescription>
            Key metrics and performance indicators
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{this.stats.totalProducts}</div>
              <div className="text-sm text-muted-foreground">Products</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{this.stats.totalOrders}</div>
              <div className="text-sm text-muted-foreground">Orders</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">${this.stats.totalRevenue.toFixed(0)}</div>
              <div className="text-sm text-muted-foreground">Revenue</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">${this.stats.averageOrderValue.toFixed(2)}</div>
              <div className="text-sm text-muted-foreground">Avg Order</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{this.stats.conversionRate}%</div>
              <div className="text-sm text-muted-foreground">Conversion</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{this.stats.customerSatisfaction}/5</div>
              <div className="text-sm text-muted-foreground">Satisfaction</div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
}

export default function ShopPage() {
  const shopService = new ShopManagementService();
  const settings = shopService.getSettings();
  const stats = shopService.getStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Shop Management</h1>
          <p className="text-muted-foreground">Manage your e-commerce shop and settings</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
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
              +{stats.monthlyGrowth}% this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalOrders}</div>
            <p className="text-xs text-muted-foreground">
              {stats.conversionRate}% conversion rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProducts}</div>
            <p className="text-xs text-muted-foreground">
              Active products
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Satisfaction</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.customerSatisfaction}/5</div>
            <p className="text-xs text-muted-foreground">
              Customer rating
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Shop Settings */}
        <div>
          <ShopSettingsCardComponent settings={settings} />
        </div>

        {/* Shop Performance */}
        <div>
          <ShopStatsCardComponent stats={stats} />
        </div>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Common shop management tasks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Package className="h-6 w-6" />
              Manage Products
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <ShoppingCart className="h-6 w-6" />
              View Orders
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Tag className="h-6 w-6" />
              Categories
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <BarChart3 className="h-6 w-6" />
              Analytics
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
