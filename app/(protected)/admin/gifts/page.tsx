"use client";

import { AdminPillNavigationComponent } from "@src/components/admin/AdminPillNavigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@src/components/ui/card";
import { Badge } from "@src/components/ui/badge";
import { Button } from "@src/components/ui/button";
import { Input } from "@src/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@src/components/ui/tabs";
import { 
  Gift, 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Eye, 
  Edit, 
  Trash2, 
  Heart,
  Star,
  TrendingUp,
  BarChart3,
  Users,
  DollarSign,
  Package,
  CheckCircle,
  Clock,
  AlertTriangle,
  Crown,
  Sparkles
} from "lucide-react";

// ----------------------
// Gifts Management Page
// Location: /app/(protected)/admin/gifts/page.tsx
// Purpose: Manage digital gifts and virtual items
// Features: Gift catalog, analytics, settings
// Note: Mobile-first design with object-oriented structure
// ----------------------

interface DigitalGift {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: 'virtual' | 'premium' | 'exclusive' | 'special';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  status: 'active' | 'inactive' | 'limited' | 'sold_out';
  image: string;
  animation?: string;
  sound?: string;
  effects: string[];
  tags: string[];
  purchaseCount: number;
  totalRevenue: number;
  rating: number;
  reviews: number;
  featured: boolean;
  limitedTime: boolean;
  expiresAt?: string;
  createdAt: string;
  updatedAt: string;
}

interface GiftStats {
  totalGifts: number;
  activeGifts: number;
  totalRevenue: number;
  totalPurchases: number;
  averagePrice: number;
  topGift: string;
  categoryBreakdown: Record<string, number>;
}

class GiftsManagementService {
  private gifts: DigitalGift[] = [];

  constructor() {
    this.initializeMockData();
  }

  private initializeMockData() {
    this.gifts = [
      {
        id: "1",
        name: "Golden Crown",
        description: "Exclusive golden crown for profile display",
        price: 9.99,
        originalPrice: 19.99,
        category: "premium",
        rarity: "epic",
        status: "active",
        image: "/gifts/golden-crown.png",
        animation: "sparkle",
        effects: ["glow", "sparkle", "crown"],
        tags: ["crown", "gold", "premium", "exclusive"],
        purchaseCount: 156,
        totalRevenue: 1558.44,
        rating: 4.9,
        reviews: 89,
        featured: true,
        limitedTime: false,
        createdAt: "2024-01-01",
        updatedAt: "2024-01-27"
      },
      {
        id: "2",
        name: "Rainbow Hearts",
        description: "Animated rainbow hearts for special moments",
        price: 4.99,
        category: "virtual",
        rarity: "common",
        status: "active",
        image: "/gifts/rainbow-hearts.png",
        animation: "float",
        effects: ["hearts", "rainbow", "float"],
        tags: ["hearts", "rainbow", "love", "celebration"],
        purchaseCount: 324,
        totalRevenue: 1616.76,
        rating: 4.7,
        reviews: 156,
        featured: false,
        limitedTime: false,
        createdAt: "2024-01-05",
        updatedAt: "2024-01-27"
      },
      {
        id: "3",
        name: "Diamond Ring",
        description: "Exclusive diamond ring for special occasions",
        price: 24.99,
        category: "exclusive",
        rarity: "legendary",
        status: "limited",
        image: "/gifts/diamond-ring.png",
        animation: "shine",
        effects: ["diamond", "shine", "exclusive"],
        tags: ["diamond", "ring", "exclusive", "luxury"],
        purchaseCount: 45,
        totalRevenue: 1124.55,
        rating: 5.0,
        reviews: 23,
        featured: true,
        limitedTime: true,
        expiresAt: "2024-02-29",
        createdAt: "2024-01-15",
        updatedAt: "2024-01-27"
      },
      {
        id: "4",
        name: "Fireworks Display",
        description: "Spectacular fireworks animation",
        price: 7.99,
        category: "special",
        rarity: "rare",
        status: "active",
        image: "/gifts/fireworks.png",
        animation: "explode",
        sound: "fireworks.mp3",
        effects: ["fireworks", "explosion", "celebration"],
        tags: ["fireworks", "celebration", "special", "animation"],
        purchaseCount: 78,
        totalRevenue: 623.22,
        rating: 4.8,
        reviews: 34,
        featured: false,
        limitedTime: false,
        createdAt: "2024-01-20",
        updatedAt: "2024-01-27"
      }
    ];
  }

  public getGifts(): DigitalGift[] {
    return this.gifts;
  }

  public getGiftStats(): GiftStats {
    const totalGifts = this.gifts.length;
    const activeGifts = this.gifts.filter(g => g.status === 'active').length;
    const totalRevenue = this.gifts.reduce((sum, g) => sum + g.totalRevenue, 0);
    const totalPurchases = this.gifts.reduce((sum, g) => sum + g.purchaseCount, 0);
    const averagePrice = totalGifts > 0 ? this.gifts.reduce((sum, g) => sum + g.price, 0) / totalGifts : 0;
    const topGift = this.gifts.reduce((top, current) => 
      current.purchaseCount > top.purchaseCount ? current : top
    ).name;

    const categoryBreakdown = this.gifts.reduce((acc, gift) => {
      acc[gift.category] = (acc[gift.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalGifts,
      activeGifts,
      totalRevenue,
      totalPurchases,
      averagePrice,
      topGift,
      categoryBreakdown
    };
  }
}

class GiftCardComponent {
  private gift: DigitalGift;

  constructor(gift: DigitalGift) {
    this.gift = gift;
  }

  private getRarityBadge() {
    const rarityConfig = {
      common: { variant: "secondary" as const, color: "text-gray-600", text: "Common" },
      rare: { variant: "default" as const, color: "text-blue-600", text: "Rare" },
      epic: { variant: "default" as const, color: "text-purple-600", text: "Epic" },
      legendary: { variant: "destructive" as const, color: "text-yellow-600", text: "Legendary" }
    };

    const config = rarityConfig[this.gift.rarity];

    return (
      <Badge variant={config.variant} className={`${config.color} border-current`}>
        {config.text}
      </Badge>
    );
  }

  private getStatusBadge() {
    const statusConfig = {
      active: { variant: "default" as const, icon: CheckCircle, text: "Active" },
      inactive: { variant: "secondary" as const, icon: Clock, text: "Inactive" },
      limited: { variant: "destructive" as const, icon: AlertTriangle, text: "Limited" },
      sold_out: { variant: "outline" as const, icon: Package, text: "Sold Out" }
    };

    const config = statusConfig[this.gift.status];
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
                <span className="text-2xl">🎁</span>
                {this.gift.name}
              </CardTitle>
              <CardDescription className="line-clamp-2">
                {this.gift.description}
              </CardDescription>
            </div>
            <div className="flex flex-col gap-1">
              {this.getRarityBadge()}
              {this.getStatusBadge()}
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Gift Image */}
          <div className="aspect-square bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg flex items-center justify-center relative overflow-hidden">
            <div className="text-6xl">🎁</div>
            {this.gift.featured && (
              <div className="absolute top-2 right-2">
                <Crown className="h-5 w-5 text-yellow-500" />
              </div>
            )}
            {this.gift.limitedTime && (
              <div className="absolute top-2 left-2">
                <Clock className="h-4 w-4 text-red-500" />
              </div>
            )}
          </div>

          {/* Pricing */}
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold">${this.gift.price}</span>
            {this.gift.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ${this.gift.originalPrice}
              </span>
            )}
            {this.gift.originalPrice && (
              <Badge variant="outline" className="text-green-600 border-green-600">
                Save ${(this.gift.originalPrice - this.gift.price).toFixed(2)}
              </Badge>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span>{this.gift.purchaseCount} sold</span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <span>${this.gift.totalRevenue.toFixed(2)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-500" />
              <span>{this.gift.rating} ({this.gift.reviews})</span>
            </div>
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4 text-muted-foreground" />
              <span className="capitalize">{this.gift.category}</span>
            </div>
          </div>

          {/* Effects */}
          <div className="space-y-1">
            <p className="text-xs font-medium text-muted-foreground">Effects</p>
            <div className="flex flex-wrap gap-1">
              {this.gift.effects.map((effect) => (
                <Badge key={effect} variant="outline" className="text-xs">
                  <Sparkles className="h-3 w-3 mr-1" />
                  {effect}
                </Badge>
              ))}
            </div>
          </div>

          {/* Limited Time Warning */}
          {this.gift.limitedTime && this.gift.expiresAt && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <div className="flex items-center gap-2 text-yellow-800">
                <Clock className="h-4 w-4" />
                <span className="text-sm font-medium">Limited Time Offer</span>
              </div>
              <p className="text-xs text-yellow-700 mt-1">
                Expires {new Date(this.gift.expiresAt).toLocaleDateString()}
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <Button variant="outline" size="sm" className="flex-1">
              <Eye className="h-4 w-4 mr-2" />
              Preview
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

export default function GiftsPage() {
  const giftsService = new GiftsManagementService();
  const gifts = giftsService.getGifts();
  const stats = giftsService.getGiftStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Digital Gifts</h1>
          <p className="text-muted-foreground">Manage virtual gifts and digital items</p>
        </div>
        <Button className="w-full sm:w-auto">
          <Plus className="h-4 w-4 mr-2" />
          Add Gift
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Gifts</CardTitle>
            <Gift className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalGifts}</div>
            <p className="text-xs text-muted-foreground">
              {stats.activeGifts} active
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
              From {stats.totalPurchases} purchases
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
              Per gift
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Gift</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold truncate">{stats.topGift}</div>
            <p className="text-xs text-muted-foreground">
              Most popular
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
                  placeholder="Search gifts..."
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

      {/* Gifts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {gifts.map((gift) => {
          const giftCard = new GiftCardComponent(gift);
          return <div key={gift.id}>{giftCard.render()}</div>;
        })}
      </div>
    </div>
  );
}
