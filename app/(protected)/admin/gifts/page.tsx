"use client";

import { useState, useEffect } from "react";
import { AdminPageTemplate, MetricCard } from "@src/components/admin/AdminPageTemplate";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@src/components/ui/card";
import { Badge } from "@src/components/ui/badge";
import { Button } from "@src/components/ui/button";
import { Input } from "@src/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@src/components/ui/select";
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
  Sparkles,
  Calendar,
  User,
  Globe,
  Building,
  RotateCcw,
  Settings,
  Ban,
  CheckSquare,
  XSquare,
  ThumbsUp,
  Flag,
  Shield,
  FileText
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

// ----------------------
// Professional Gift Card Component
// Purpose: Displays gift information in a structured, professional layout
// Note: Similar to verification card with gift-specific data
// ----------------------
function ProfessionalGiftCard({
  gift,
  onView,
  onEdit,
  onMore,
  className = ""
}: {
  gift: DigitalGift;
  onView?: () => void;
  onEdit?: () => void;
  onMore?: () => void;
  className?: string;
}) {
  const getRarityBadge = () => {
    const rarityConfig = {
      common: { variant: "secondary" as const, color: "text-gray-600", text: "Common" },
      rare: { variant: "default" as const, color: "text-blue-600", text: "Rare" },
      epic: { variant: "default" as const, color: "text-purple-600", text: "Epic" },
      legendary: { variant: "destructive" as const, color: "text-yellow-600", text: "Legendary" }
    };

    const config = rarityConfig[gift.rarity];

    return (
      <Badge variant={config.variant} className={`${config.color} border-current`}>
        {config.text}
      </Badge>
    );
  };

  const getStatusBadge = () => {
    const statusConfig = {
      active: { variant: "default" as const, icon: CheckCircle, text: "Active", color: "text-green-600" },
      inactive: { variant: "secondary" as const, icon: Clock, text: "Inactive", color: "text-gray-600" },
      limited: { variant: "destructive" as const, icon: AlertTriangle, text: "Limited", color: "text-orange-600" },
      sold_out: { variant: "outline" as const, icon: Package, text: "Sold Out", color: "text-red-600" }
    };

    const config = statusConfig[gift.status];
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {config.text}
      </Badge>
    );
  };

  const getTypeIcon = () => {
    return <Gift className="h-4 w-4" />;
  };

  const getTypeBadge = () => {
    return (
      <Badge variant="outline" className="text-xs">
        {gift.category.toUpperCase()}
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
                {gift.name}
                {getTypeBadge()}
              </CardTitle>
              <CardDescription className="text-text-muted">
                {gift.description}
              </CardDescription>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-text">
              ${gift.price}
            </div>
            <div className="text-sm text-text-muted">
              price
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Gift Overview */}
        <div className="bg-surface-elev2 rounded-lg p-4 border border-line-soft">
          <div className="flex items-center gap-2 mb-3">
            {getTypeIcon()}
            <span className="font-medium text-text">Gift Overview</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-sm text-text-muted">Status:</span>
              <div className="mt-1">
                {getStatusBadge()}
              </div>
            </div>
            <div>
              <span className="text-sm text-text-muted">Rarity:</span>
              <div className="mt-1">
                {getRarityBadge()}
              </div>
            </div>
            <div>
              <span className="text-sm text-text-muted">Category:</span>
              <div className="mt-1">
                {getTypeBadge()}
              </div>
            </div>
            <div>
              <span className="text-sm text-text-muted">Featured:</span>
              <div className="mt-1">
                <Badge variant={gift.featured ? "default" : "outline"} className="text-xs">
                  {gift.featured ? "YES" : "NO"}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Gift Visual */}
        <div className="aspect-video bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg flex items-center justify-center relative overflow-hidden border border-line-soft">
          <div className="text-center">
            <div className="text-6xl mb-2">🎁</div>
            <div className="text-lg font-bold text-gray-800">{gift.name}</div>
          </div>
          {gift.featured && (
            <div className="absolute top-2 right-2">
              <Crown className="h-5 w-5 text-yellow-500" />
            </div>
          )}
          {gift.limitedTime && (
            <div className="absolute top-2 left-2">
              <Clock className="h-4 w-4 text-red-500" />
            </div>
          )}
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
              <span className="text-sm font-semibold text-text">${gift.price}</span>
            </div>
            {gift.originalPrice && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-muted">Original Price:</span>
                <span className="text-sm text-text line-through">${gift.originalPrice}</span>
              </div>
            )}
            {gift.originalPrice && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-muted">Savings:</span>
                <span className="text-sm font-semibold text-green-600">
                  ${(gift.originalPrice - gift.price).toFixed(2)}
                </span>
              </div>
            )}
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-muted">Total Revenue:</span>
              <span className="text-sm font-semibold text-text">${gift.totalRevenue.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Performance Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-surface-elev2 rounded-lg p-4 text-center border border-line-soft">
            <div className="flex items-center justify-center gap-1 text-text-muted mb-1">
              <Users className="h-4 w-4" />
              <span className="text-xs font-medium">Purchases</span>
            </div>
            <div className="text-lg font-bold text-text">
              {gift.purchaseCount}
            </div>
          </div>
          <div className="bg-surface-elev2 rounded-lg p-4 text-center border border-line-soft">
            <div className="flex items-center justify-center gap-1 text-text-muted mb-1">
              <Star className="h-4 w-4" />
              <span className="text-xs font-medium">Rating</span>
            </div>
            <div className="text-lg font-bold text-text">
              {gift.rating}
            </div>
          </div>
        </div>

        {/* Effects and Tags */}
        <div className="bg-surface-elev2 rounded-lg p-4 border border-line-soft">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="h-5 w-5 text-text-muted" />
            <span className="font-medium text-text">Effects & Tags</span>
          </div>
          <div className="space-y-3">
            <div>
              <span className="text-sm text-text-muted">Effects:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {gift.effects.map((effect) => (
                  <Badge key={effect} variant="outline" className="text-xs">
                    <Sparkles className="h-3 w-3 mr-1" />
                    {effect}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <span className="text-sm text-text-muted">Tags:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {gift.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Limited Time Warning */}
        {gift.limitedTime && gift.expiresAt && (
          <div className="bg-orange-900/20 border border-orange-500/30 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="h-5 w-5 text-orange-400" />
              <span className="font-medium text-orange-300">Limited Time Offer</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-orange-200">Expires:</span>
                <span className="text-sm font-bold text-orange-300">
                  {new Date(gift.expiresAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-orange-200">Status:</span>
                <span className="text-sm font-bold text-orange-300">
                  Limited Time
                </span>
              </div>
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
                {new Date(gift.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-muted">Updated:</span>
              <span className="text-sm text-text">
                {new Date(gift.updatedAt).toLocaleDateString()}
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
            Preview
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
// Gifts Detail View Component
// Purpose: Single card view with filtering and quick stats
// Note: Similar to verification page with gift-specific data
// ----------------------
function GiftsDetailView({
  gifts,
  selectedGiftId,
  onGiftSelect,
  onView,
  onEdit,
  onMore,
  className = ""
}: {
  gifts: DigitalGift[];
  selectedGiftId?: string;
  onGiftSelect?: (giftId: string) => void;
  onView?: (giftId: string) => void;
  onEdit?: (giftId: string) => void;
  onMore?: (giftId: string) => void;
  className?: string;
}) {
  const selectedGift = gifts.find(g => g.id === selectedGiftId) || gifts[0];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { variant: "default" as const, color: "text-green-600", bgColor: "bg-green-100" },
      inactive: { variant: "secondary" as const, color: "text-gray-600", bgColor: "bg-gray-100" },
      limited: { variant: "destructive" as const, color: "text-orange-600", bgColor: "bg-orange-100" },
      sold_out: { variant: "outline" as const, color: "text-red-600", bgColor: "bg-red-100" }
    };
    return statusConfig[status as keyof typeof statusConfig] || statusConfig.active;
  };

  const getTypeIcon = () => {
    return <Gift className="h-4 w-4" />;
  };

  const statusInfo = getStatusBadge(selectedGift?.status || 'active');

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Filter Section */}
      <div className="bg-surface-elev1 border border-line-soft rounded-lg p-4">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <label className="text-sm font-medium text-text-muted mb-2 block">Select Gift</label>
            <Select value={selectedGiftId || gifts[0]?.id} onValueChange={onGiftSelect}>
              <SelectTrigger className="bg-surface-elev2 border-line-soft text-text">
                <SelectValue placeholder="Choose a gift..." />
              </SelectTrigger>
              <SelectContent className="bg-surface-elev2 border-line-soft">
                {gifts.map((gift) => {
                  const Icon = getTypeIcon();
                  return (
                    <SelectItem 
                      key={gift.id} 
                      value={gift.id}
                      className="text-text hover:bg-surface-elev1"
                    >
                      <div className="flex items-center gap-2">
                        {Icon}
                        <span>{gift.name}</span>
                        <Badge 
                          variant={gift.status === 'active' ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {gift.status}
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
        {/* Left: Gift Card */}
        <div className="lg:col-span-2">
          {selectedGift ? (
            <ProfessionalGiftCard
              gift={selectedGift}
              onView={() => onView?.(selectedGift.id)}
              onEdit={() => onEdit?.(selectedGift.id)}
              onMore={() => onMore?.(selectedGift.id)}
            />
          ) : (
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 text-center">
              <Gift className="h-12 w-12 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-400">No gift selected</p>
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
                  {selectedGift?.status || 'N/A'}
                </div>
              </div>

              {/* Rarity */}
              <div className="flex items-center justify-between p-3 bg-surface-elev2 rounded-lg">
                <div className="flex items-center gap-2">
                  <Crown className="h-4 w-4 text-text-muted" />
                  <span className="text-sm font-medium text-text">Rarity</span>
                </div>
                <span className="text-sm font-semibold text-text">
                  {selectedGift?.rarity?.toUpperCase() || 'N/A'}
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center justify-between p-3 bg-surface-elev2 rounded-lg">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-text-muted" />
                  <span className="text-sm font-medium text-text">Price</span>
                </div>
                <span className="text-sm font-semibold text-text">
                  ${selectedGift?.price || '0.00'}
                </span>
              </div>

              {/* Purchases */}
              <div className="flex items-center justify-between p-3 bg-surface-elev2 rounded-lg">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-text-muted" />
                  <span className="text-sm font-medium text-text">Purchases</span>
                </div>
                <span className="text-sm font-semibold text-text">
                  {selectedGift?.purchaseCount || '0'}
                </span>
              </div>

              {/* Rating */}
              <div className="flex items-center justify-between p-3 bg-surface-elev2 rounded-lg">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-text-muted" />
                  <span className="text-sm font-medium text-text">Rating</span>
                </div>
                <span className="text-sm font-semibold text-text">
                  {selectedGift?.rating || 'N/A'}
                </span>
              </div>

              {/* Category */}
              <div className="flex items-center justify-between p-3 bg-surface-elev2 rounded-lg">
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-text-muted" />
                  <span className="text-sm font-medium text-text">Category</span>
                </div>
                <span className="text-sm font-semibold text-text">
                  {selectedGift?.category?.toUpperCase() || 'N/A'}
                </span>
              </div>

              {/* Created Date */}
              <div className="flex items-center justify-between p-3 bg-surface-elev2 rounded-lg">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-text-muted" />
                  <span className="text-sm font-medium text-text">Created</span>
                </div>
                <span className="text-sm text-text-muted">
                  {selectedGift?.createdAt ? new Date(selectedGift.createdAt).toLocaleDateString() : 'N/A'}
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
                onClick={() => onView?.(selectedGift?.id || '')}
              >
                <Eye className="h-4 w-4 mr-2" />
                Preview Gift
              </Button>
              <Button 
                variant="outline" 
                className="w-full bg-surface-elev2 border-line-soft text-text hover:bg-surface-elev1"
                onClick={() => onEdit?.(selectedGift?.id || '')}
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Gift
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// ----------------------
// Gifts Page Client Component
// Purpose: Manages state and interactions for the gifts page
// ----------------------
function GiftsPageClient() {
  const [selectedGiftId, setSelectedGiftId] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const giftsService = new GiftsManagementService();
  const allGifts = giftsService.getGifts();
  const stats = giftsService.getGiftStats();

  // Filter gifts based on search and status
  const filteredGifts = allGifts.filter(gift => {
    const matchesSearch = gift.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         gift.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         gift.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         gift.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || gift.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Set default selected gift
  useEffect(() => {
    if (filteredGifts.length > 0 && !selectedGiftId) {
      setSelectedGiftId(filteredGifts[0].id);
    }
  }, [filteredGifts, selectedGiftId]);

  const handleGiftSelect = (giftId: string) => {
    setSelectedGiftId(giftId);
  };

  const handleView = (giftId: string) => {
    console.log('View gift:', giftId);
  };

  const handleEdit = (giftId: string) => {
    console.log('Edit gift:', giftId);
  };

  const handleMore = (giftId: string) => {
    console.log('More actions for gift:', giftId);
  };

  const handleRefresh = () => {
    console.log('Refresh gifts');
  };

  const handleExportAll = () => {
    console.log('Export all gifts');
  };

  const statsCards = (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard
        title="Total Gifts"
        value={stats.totalGifts}
        growth={0}
        icon={Gift}
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
        title="Total Purchases"
        value={stats.totalPurchases}
        growth={0}
        icon={Users}
        format="number"
      />
      <MetricCard
        title="Active Gifts"
        value={stats.activeGifts}
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
          <SelectItem value="limited" className="text-text hover:bg-surface-elev1">Limited</SelectItem>
          <SelectItem value="sold_out" className="text-text hover:bg-surface-elev1">Sold Out</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );

  return (
    <AdminPageTemplate
      title="Digital Gifts Management"
      description="Manage virtual gifts, digital items, and e-commerce products"
      icon={<Gift className="h-6 w-6" />}
      searchPlaceholder="Search gifts, names, categories, or tags..."
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
      <GiftsDetailView
        gifts={filteredGifts}
        selectedGiftId={selectedGiftId}
        onGiftSelect={handleGiftSelect}
        onView={handleView}
        onEdit={handleEdit}
        onMore={handleMore}
      />
    </AdminPageTemplate>
  );
}

export default function GiftsPage() {
  return <GiftsPageClient />;
}
