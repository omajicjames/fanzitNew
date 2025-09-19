"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@src/components/ui/card";
import { Badge } from "@src/components/ui/badge";
import { Button } from "@src/components/ui/button";
import { Input } from "@src/components/ui/input";
import { Textarea } from "@src/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@src/components/ui/tabs";
import { 
  Bell, 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Filter,
  Eye,
  CheckCircle,
  Clock,
  AlertTriangle,
  Calendar,
  Users,
  Target,
  MoreHorizontal
} from "lucide-react";
import AnnouncementModal from "@src/features/right-rail/AnnouncementModal";

// ----------------------
// Admin Announcements Management Page
// Location: /app/(protected)/admin/announcements/page.tsx
// Purpose: Comprehensive announcement management for admin users
// Features: Create, edit, delete, and manage announcements
// Note: Mobile-first design with object-oriented structure
// ----------------------

interface AnnouncementData {
  id: string;
  title: string;
  description: string;
  link: string;
  type: 'info' | 'warning' | 'success' | 'promo';
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  views: number;
  clicks: number;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  targetAudience: 'all' | 'creators' | 'subscribers' | 'specific';
  scheduledFor?: string;
  expiresAt?: string;
}

class AnnouncementService {
  private announcements: AnnouncementData[] = [
    {
      id: '1',
      title: 'Premium Trial Available',
      description: 'Try premium features free for 30 days. Unlock advanced analytics and tools.',
      link: '/premium/trial',
      type: 'promo',
      isActive: true,
      createdAt: new Date('2025-01-25T10:00:00Z'),
      updatedAt: new Date('2025-01-25T10:00:00Z'),
      createdBy: 'admin',
      views: 12547,
      clicks: 892,
      priority: 'high',
      targetAudience: 'all',
      expiresAt: '2025-02-25T10:00:00Z'
    },
    {
      id: '2',
      title: 'Platform Maintenance Scheduled',
      description: 'We will be performing scheduled maintenance on January 30th from 2-4 AM EST.',
      link: '/maintenance',
      type: 'warning',
      isActive: true,
      createdAt: new Date('2025-01-26T09:00:00Z'),
      updatedAt: new Date('2025-01-26T09:00:00Z'),
      createdBy: 'admin',
      views: 8943,
      clicks: 234,
      priority: 'medium',
      targetAudience: 'all',
      scheduledFor: '2025-01-30T02:00:00Z'
    },
    {
      id: '3',
      title: 'New Creator Features',
      description: 'Check out our latest creator tools and analytics dashboard.',
      link: '/creator/features',
      type: 'info',
      isActive: false,
      createdAt: new Date('2025-01-24T14:00:00Z'),
      updatedAt: new Date('2025-01-24T14:00:00Z'),
      createdBy: 'admin',
      views: 5672,
      clicks: 445,
      priority: 'low',
      targetAudience: 'creators'
    }
  ];

  public getAllAnnouncements(): AnnouncementData[] {
    return this.announcements;
  }

  public getActiveAnnouncements(): AnnouncementData[] {
    return this.announcements.filter(a => a.isActive);
  }

  public getAnnouncementsByType(type: string): AnnouncementData[] {
    return this.announcements.filter(a => a.type === type);
  }

  public getAnnouncementsByPriority(priority: string): AnnouncementData[] {
    return this.announcements.filter(a => a.priority === priority);
  }

  public createAnnouncement(announcement: Omit<AnnouncementData, 'id' | 'createdAt' | 'updatedAt' | 'views' | 'clicks'>): AnnouncementData {
    const newAnnouncement: AnnouncementData = {
      ...announcement,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
      views: 0,
      clicks: 0
    };
    this.announcements.push(newAnnouncement);
    return newAnnouncement;
  }

  public updateAnnouncement(id: string, updates: Partial<AnnouncementData>): AnnouncementData | null {
    const index = this.announcements.findIndex(a => a.id === id);
    if (index !== -1) {
      this.announcements[index] = {
        ...this.announcements[index],
        ...updates,
        updatedAt: new Date()
      };
      return this.announcements[index];
    }
    return null;
  }

  public deleteAnnouncement(id: string): boolean {
    const index = this.announcements.findIndex(a => a.id === id);
    if (index !== -1) {
      this.announcements.splice(index, 1);
      return true;
    }
    return false;
  }
}

class AnnouncementCardComponent {
  private announcement: AnnouncementData;

  constructor(announcement: AnnouncementData) {
    this.announcement = announcement;
  }

  private getTypeBadge() {
    const typeConfig = {
      info: { variant: "default" as const, icon: Bell, text: "Info" },
      warning: { variant: "destructive" as const, icon: AlertTriangle, text: "Warning" },
      success: { variant: "default" as const, icon: CheckCircle, text: "Success" },
      promo: { variant: "default" as const, icon: Target, text: "Promotion" }
    };
    const config = typeConfig[this.announcement.type] || typeConfig.info;
    const Icon = config.icon;
    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {config.text}
      </Badge>
    );
  }

  private getPriorityBadge() {
    const priorityConfig = {
      low: { variant: "secondary" as const, text: "Low" },
      medium: { variant: "default" as const, text: "Medium" },
      high: { variant: "default" as const, text: "High" },
      urgent: { variant: "destructive" as const, text: "Urgent" }
    };
    const config = priorityConfig[this.announcement.priority] || priorityConfig.medium;
    return (
      <Badge variant={config.variant}>
        {config.text}
      </Badge>
    );
  }

  private getStatusBadge() {
    return (
      <Badge variant={this.announcement.isActive ? "default" : "secondary"}>
        {this.announcement.isActive ? "Active" : "Inactive"}
      </Badge>
    );
  }

  public render() {
    return (
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <CardTitle className="text-lg line-clamp-2">{this.announcement.title}</CardTitle>
              <CardDescription className="line-clamp-2">{this.announcement.description}</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              {this.getTypeBadge()}
              {this.getPriorityBadge()}
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-4">
            {/* Stats Row */}
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  {this.announcement.views.toLocaleString()} views
                </div>
                <div className="flex items-center gap-1">
                  <Target className="h-4 w-4" />
                  {this.announcement.clicks.toLocaleString()} clicks
                </div>
              </div>
              {this.getStatusBadge()}
            </div>

            {/* Link and Audience */}
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Link:</span>
                <code className="px-2 py-1 bg-muted rounded text-xs">{this.announcement.link}</code>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span className="capitalize">{this.announcement.targetAudience}</span>
              </div>
            </div>

            {/* Dates */}
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                Created: {new Date(this.announcement.createdAt).toLocaleDateString()}
              </div>
              {this.announcement.scheduledFor && (
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  Scheduled: {new Date(this.announcement.scheduledFor).toLocaleDateString()}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-2 border-t">
              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline">
                  <Eye className="h-4 w-4 mr-1" />
                  View
                </Button>
                <Button size="sm" variant="outline">
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button size="sm" variant="outline" className="text-red-500 hover:text-red-600">
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </div>
              <Button size="sm" variant="ghost">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
}

export default function AdminAnnouncementsPage() {
  const announcementService = new AnnouncementService();
  const [announcements, setAnnouncements] = useState<AnnouncementData[]>([]);
  const [filteredAnnouncements, setFilteredAnnouncements] = useState<AnnouncementData[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    mode: 'create' | 'edit';
    announcement: AnnouncementData | null;
  }>({
    isOpen: false,
    mode: 'create',
    announcement: null
  });

  useEffect(() => {
    const allAnnouncements = announcementService.getAllAnnouncements();
    setAnnouncements(allAnnouncements);
    setFilteredAnnouncements(allAnnouncements);
  }, []);

  useEffect(() => {
    let filtered = announcements;

    if (searchTerm) {
      filtered = filtered.filter(a => 
        a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterType !== "all") {
      filtered = filtered.filter(a => a.type === filterType);
    }

    if (filterStatus !== "all") {
      filtered = filtered.filter(a => 
        filterStatus === "active" ? a.isActive : !a.isActive
      );
    }

    setFilteredAnnouncements(filtered);
  }, [announcements, searchTerm, filterType, filterStatus]);

  const handleCreateAnnouncement = () => {
    setModalState({
      isOpen: true,
      mode: 'create',
      announcement: null
    });
  };

  const handleEditAnnouncement = (announcement: AnnouncementData) => {
    setModalState({
      isOpen: true,
      mode: 'edit',
      announcement
    });
  };

  const handleDeleteAnnouncement = (id: string) => {
    if (confirm('Are you sure you want to delete this announcement?')) {
      announcementService.deleteAnnouncement(id);
      const updatedAnnouncements = announcementService.getAllAnnouncements();
      setAnnouncements(updatedAnnouncements);
    }
  };

  const handleModalClose = () => {
    setModalState(prev => ({ ...prev, isOpen: false }));
  };

  const handleModalSave = (data: any) => {
    if (modalState.mode === 'create') {
      announcementService.createAnnouncement(data);
    } else if (modalState.announcement) {
      announcementService.updateAnnouncement(modalState.announcement.id, data);
    }
    
    const updatedAnnouncements = announcementService.getAllAnnouncements();
    setAnnouncements(updatedAnnouncements);
    setModalState(prev => ({ ...prev, isOpen: false }));
  };

  const activeAnnouncements = announcements.filter(a => a.isActive).length;
  const totalViews = announcements.reduce((sum, a) => sum + a.views, 0);
  const totalClicks = announcements.reduce((sum, a) => sum + a.clicks, 0);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Announcements</h1>
            <p className="text-neutral-400">Manage platform announcements and notifications</p>
          </div>
          <div className="flex items-center gap-4">
            <Button onClick={handleCreateAnnouncement} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Create Announcement
            </Button>
            <Badge className="bg-orange-500 text-white">Super Admin</Badge>
          </div>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Announcements</p>
                  <p className="text-2xl font-bold">{activeAnnouncements}</p>
                </div>
                <Bell className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Views</p>
                  <p className="text-2xl font-bold">{totalViews.toLocaleString()}</p>
                </div>
                <Eye className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Clicks</p>
                  <p className="text-2xl font-bold">{totalClicks.toLocaleString()}</p>
                </div>
                <Target className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search announcements..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 bg-background border border-border rounded-md text-sm"
            >
              <option value="all">All Types</option>
              <option value="info">Info</option>
              <option value="warning">Warning</option>
              <option value="success">Success</option>
              <option value="promo">Promotion</option>
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 bg-background border border-border rounded-md text-sm"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Announcements Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredAnnouncements.map((announcement) => {
          const announcementCard = new AnnouncementCardComponent(announcement);
          return (
            <div key={announcement.id}>
              {announcementCard.render()}
            </div>
          );
        })}
      </div>

      {filteredAnnouncements.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Bell className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">No announcements found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm || filterType !== "all" || filterStatus !== "all" 
                ? "Try adjusting your filters to see more results."
                : "Create your first announcement to get started."
              }
            </p>
            <Button onClick={handleCreateAnnouncement}>
              <Plus className="h-4 w-4 mr-2" />
              Create Announcement
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Announcement Modal */}
      <AnnouncementModal
        isOpen={modalState.isOpen}
        onClose={handleModalClose}
        onSave={handleModalSave}
        announcement={modalState.announcement}
        mode={modalState.mode}
      />
    </div>
  );
}
