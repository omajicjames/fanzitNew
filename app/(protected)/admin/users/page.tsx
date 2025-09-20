"use client";

import { useState, useEffect } from "react";
import { AdminPageTemplate, MetricCard, UserCard } from "@src/components/admin/AdminPageTemplate";
import { SelectFilterSection } from "@src/components/admin/SelectFilterSection";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@src/components/ui/card";
import { Badge } from "@src/components/ui/badge";
import { Button } from "@src/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@src/components/ui/select";
import { 
  Users, 
  UserCheck, 
  AlertTriangle,
  Eye,
  Edit,
  MoreHorizontal,
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
  ThumbsUp,
  Flag,
  Shield,
  TrendingUp,
  BarChart3,
  Package,
  DollarSign,
  Clock,
  CheckCircle
} from "lucide-react";

// ----------------------
// User Management Page
// Location: /app/(protected)/admin/users/page.tsx
// Purpose: Comprehensive user management for OnlyFans-like platform
// Features: Creator verification, subscription management, user segments
// Note: Mobile-first design with object-oriented structure
// ----------------------

interface UserData {
  id: string;
  username: string;
  email: string;
  role: 'creator' | 'subscriber' | 'admin';
  status: 'active' | 'suspended' | 'pending_verification';
  isVerified: boolean;
  subscriptionTier: 'free' | 'premium' | 'vip';
  earnings: number;
  subscribers: number;
  joinDate: string;
  lastActive: string;
  avatar: string;
}

class UserManagementService {
  private users: UserData[] = [
    {
      id: '1',
      username: 'sarah_fitness',
      email: 'sarah@example.com',
      role: 'creator',
      status: 'active',
      isVerified: true,
      subscriptionTier: 'premium',
      earnings: 15420,
      subscribers: 2847,
      joinDate: '2024-01-15',
      lastActive: '2025-01-27',
      avatar: '/placeholder-user.jpg'
    },
    {
      id: '2',
      username: 'chef_marco',
      email: 'marco@example.com',
      role: 'creator',
      status: 'pending_verification',
      isVerified: false,
      subscriptionTier: 'free',
      earnings: 0,
      subscribers: 0,
      joinDate: '2025-01-20',
      lastActive: '2025-01-26',
      avatar: '/placeholder-user.jpg'
    },
    {
      id: '3',
      username: 'john_doe',
      email: 'john@example.com',
      role: 'subscriber',
      status: 'active',
      isVerified: false,
      subscriptionTier: 'premium',
      earnings: 0,
      subscribers: 0,
      joinDate: '2024-12-01',
      lastActive: '2025-01-27',
      avatar: '/placeholder-user.jpg'
    }
  ];

  public getAllUsers(): UserData[] {
    return this.users;
  }

  public getUsersByRole(role: string): UserData[] {
    return this.users.filter(user => user.role === role);
  }

  public getUsersByStatus(status: string): UserData[] {
    return this.users.filter(user => user.status === status);
  }

  public getVerifiedUsers(): UserData[] {
    return this.users.filter(user => user.isVerified);
  }

  public getTopEarners(limit: number = 10): UserData[] {
    return this.users
      .filter(user => user.role === 'creator')
      .sort((a, b) => b.earnings - a.earnings)
      .slice(0, limit);
  }
}

// ----------------------
// Professional User Card Component
// Purpose: Displays user information in a structured, professional layout
// Note: Similar to verification card with user-specific data
// ----------------------
function ProfessionalUserCard({
  user,
  onView,
  onEdit,
  onMore,
  className = ""
}: {
  user: UserData;
  onView?: () => void;
  onEdit?: () => void;
  onMore?: () => void;
  className?: string;
}) {
  const getStatusBadge = () => {
    const statusConfig = {
      active: { variant: "default" as const, icon: CheckCircle, text: "Active", color: "text-green-600" },
      suspended: { variant: "destructive" as const, icon: Ban, text: "Suspended", color: "text-red-600" },
      pending_verification: { variant: "secondary" as const, icon: Clock, text: "Pending", color: "text-orange-600" }
    };

    const config = statusConfig[user.status];
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {config.text}
      </Badge>
    );
  };

  const getRoleIcon = () => {
    const roleIcons = {
      creator: Crown,
      subscriber: User,
      admin: Shield
    };

    const Icon = roleIcons[user.role];
    return <Icon className="h-4 w-4" />;
  };

  const getRoleBadge = () => {
    const roleConfig = {
      creator: { variant: "default" as const, text: "Creator" },
      subscriber: { variant: "secondary" as const, text: "Subscriber" },
      admin: { variant: "destructive" as const, text: "Admin" }
    };

    const config = roleConfig[user.role];
    return (
      <Badge variant={config.variant} className="text-xs">
        {config.text}
      </Badge>
    );
  };

  const getSubscriptionBadge = () => {
    const subscriptionConfig = {
      free: { variant: "outline" as const, text: "Free" },
      premium: { variant: "default" as const, text: "Premium" },
      vip: { variant: "destructive" as const, text: "VIP" }
    };

    const config = subscriptionConfig[user.subscriptionTier];
    return (
      <Badge variant={config.variant} className="text-xs">
        {config.text}
      </Badge>
    );
  };

  return (
    <Card className={`bg-admin-card border-line-soft hover:shadow-lg transition-all duration-200 ${className}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-lg bg-surface-elev2 flex items-center justify-center border border-line-soft">
              {getRoleIcon()}
            </div>
            <div>
              <CardTitle className="text-lg text-text flex items-center gap-2">
                {user.username}
                {getRoleBadge()}
              </CardTitle>
              <CardDescription className="text-text-muted">
                {user.email}
              </CardDescription>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-text">
              {user.subscribers}
            </div>
            <div className="text-sm text-text-muted">
              subscribers
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* User Overview */}
        <div className="bg-surface-elev2 rounded-lg p-4 border border-line-soft">
          <div className="flex items-center gap-2 mb-3">
            {getRoleIcon()}
            <span className="font-medium text-text">User Overview</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-sm text-text-muted">Status:</span>
              <div className="mt-1">
                {getStatusBadge()}
              </div>
            </div>
            <div>
              <span className="text-sm text-text-muted">Role:</span>
              <div className="mt-1">
                {getRoleBadge()}
              </div>
            </div>
            <div>
              <span className="text-sm text-text-muted">Verified:</span>
              <div className="mt-1">
                <Badge variant={user.isVerified ? "default" : "secondary"} className="text-xs">
                  {user.isVerified ? "VERIFIED" : "UNVERIFIED"}
                </Badge>
              </div>
            </div>
            <div>
              <span className="text-sm text-text-muted">Tier:</span>
              <div className="mt-1">
                {getSubscriptionBadge()}
              </div>
            </div>
          </div>
        </div>

        {/* User Details */}
        <div className="bg-surface-elev2 rounded-lg p-4 border border-line-soft">
          <div className="flex items-center gap-2 mb-3">
            <User className="h-5 w-5 text-text-muted" />
            <span className="font-medium text-text">User Details</span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-muted">Username:</span>
              <span className="text-sm text-text">{user.username}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-muted">Email:</span>
              <span className="text-sm text-text">{user.email}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-muted">Role:</span>
              <span className="text-sm text-text capitalize">{user.role}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-muted">Subscription:</span>
              <span className="text-sm text-text capitalize">{user.subscriptionTier}</span>
            </div>
          </div>
        </div>

        {/* Earnings & Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-surface-elev2 rounded-lg p-4 text-center border border-line-soft">
            <div className="flex items-center justify-center gap-1 text-text-muted mb-1">
              <DollarSign className="h-4 w-4" />
              <span className="text-xs font-medium">Earnings</span>
            </div>
            <div className="text-lg font-bold text-text">
              ${user.earnings.toLocaleString()}
            </div>
          </div>
          <div className="bg-surface-elev2 rounded-lg p-4 text-center border border-line-soft">
            <div className="flex items-center justify-center gap-1 text-text-muted mb-1">
              <Users className="h-4 w-4" />
              <span className="text-xs font-medium">Subscribers</span>
            </div>
            <div className="text-lg font-bold text-text">
              {user.subscribers.toLocaleString()}
            </div>
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
              <span className="text-sm text-text-muted">Join Date:</span>
              <span className="text-sm text-text">
                {new Date(user.joinDate).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-muted">Last Active:</span>
              <span className="text-sm text-text">
                {new Date(user.lastActive).toLocaleDateString()}
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
// Users Detail View Component
// Purpose: Single card view with filtering and quick stats
// Note: Similar to verification page with user-specific data
// ----------------------
function UsersDetailView({
  users,
  selectedUserId,
  onUserSelect,
  onView,
  onEdit,
  onMore,
  className = ""
}: {
  users: UserData[];
  selectedUserId?: string;
  onUserSelect?: (userId: string) => void;
  onView?: (userId: string) => void;
  onEdit?: (userId: string) => void;
  onMore?: (userId: string) => void;
  className?: string;
}) {
  const selectedUser = users.find(u => u.id === selectedUserId) || users[0];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { variant: "default" as const, color: "text-green-600", bgColor: "bg-green-100" },
      suspended: { variant: "destructive" as const, color: "text-red-600", bgColor: "bg-red-100" },
      pending_verification: { variant: "secondary" as const, color: "text-orange-600", bgColor: "bg-orange-100" }
    };
    return statusConfig[status as keyof typeof statusConfig] || statusConfig.active;
  };

  const getRoleIcon = () => {
    return <User className="h-4 w-4" />;
  };

  const statusInfo = getStatusBadge(selectedUser?.status || 'active');

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Filter Section */}
      <SelectFilterSection
        title="Select User"
        placeholder="Choose a user..."
        value={selectedUserId || users[0]?.id}
        onValueChange={onUserSelect || (() => {})}
        options={users.map((user) => {
          const roleIcons = {
            creator: Crown,
            subscriber: User,
            admin: Shield
          };
          const Icon = roleIcons[user.role];
          return {
            id: user.id,
            label: user.username,
            icon: <Icon className="h-4 w-4" />,
            status: user.status
          };
        })}
      />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: User Card */}
        <div className="lg:col-span-2">
          {selectedUser ? (
            <ProfessionalUserCard
              user={selectedUser}
              onView={() => onView?.(selectedUser.id)}
              onEdit={() => onEdit?.(selectedUser.id)}
              onMore={() => onMore?.(selectedUser.id)}
            />
          ) : (
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 text-center">
              <User className="h-12 w-12 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-400">No user selected</p>
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
                  {selectedUser?.status?.toUpperCase() || 'N/A'}
                </div>
              </div>

              {/* Role */}
              <div className="flex items-center justify-between p-3 bg-surface-elev2 rounded-lg">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-text-muted" />
                  <span className="text-sm font-medium text-text">Role</span>
                </div>
                <span className="text-sm font-semibold text-text">
                  {selectedUser?.role?.toUpperCase() || 'N/A'}
                </span>
              </div>

              {/* Verified */}
              <div className="flex items-center justify-between p-3 bg-surface-elev2 rounded-lg">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-text-muted" />
                  <span className="text-sm font-medium text-text">Verified</span>
                </div>
                <span className="text-sm font-semibold text-text">
                  {selectedUser?.isVerified ? 'YES' : 'NO'}
                </span>
              </div>

              {/* Subscription */}
              <div className="flex items-center justify-between p-3 bg-surface-elev2 rounded-lg">
                <div className="flex items-center gap-2">
                  <Crown className="h-4 w-4 text-text-muted" />
                  <span className="text-sm font-medium text-text">Tier</span>
                </div>
                <span className="text-sm font-semibold text-text">
                  {selectedUser?.subscriptionTier?.toUpperCase() || 'N/A'}
                </span>
              </div>

              {/* Earnings */}
              <div className="flex items-center justify-between p-3 bg-surface-elev2 rounded-lg">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-text-muted" />
                  <span className="text-sm font-medium text-text">Earnings</span>
                </div>
                <span className="text-sm font-semibold text-text">
                  ${selectedUser?.earnings?.toLocaleString() || '0'}
                </span>
              </div>

              {/* Subscribers */}
              <div className="flex items-center justify-between p-3 bg-surface-elev2 rounded-lg">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-text-muted" />
                  <span className="text-sm font-medium text-text">Subscribers</span>
                </div>
                <span className="text-sm font-semibold text-text">
                  {selectedUser?.subscribers?.toLocaleString() || '0'}
                </span>
              </div>

              {/* Join Date */}
              <div className="flex items-center justify-between p-3 bg-surface-elev2 rounded-lg">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-text-muted" />
                  <span className="text-sm font-medium text-text">Join Date</span>
                </div>
                <span className="text-sm text-text-muted">
                  {selectedUser?.joinDate ? new Date(selectedUser.joinDate).toLocaleDateString() : 'N/A'}
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
                onClick={() => onView?.(selectedUser?.id || '')}
              >
                <Eye className="h-4 w-4 mr-2" />
                View User
              </Button>
              <Button 
                variant="outline" 
                className="w-full bg-surface-elev2 border-line-soft text-text hover:bg-surface-elev1"
                onClick={() => onEdit?.(selectedUser?.id || '')}
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit User
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// ----------------------
// Users Page Client Component
// Purpose: Manages state and interactions for the users page
// ----------------------
function UsersPageClient() {
  const [selectedUserId, setSelectedUserId] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  const userService = new UserManagementService();
  const allUsers = userService.getAllUsers();

  // Filter users based on search and role
  const filteredUsers = allUsers.filter(user => {
    const matchesSearch = user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  // Set default selected user
  useEffect(() => {
    if (filteredUsers.length > 0 && !selectedUserId) {
      setSelectedUserId(filteredUsers[0].id);
    }
  }, [filteredUsers, selectedUserId]);

  const handleUserSelect = (userId: string) => {
    setSelectedUserId(userId);
  };

  const handleView = (userId: string) => {
    console.log('View user:', userId);
  };

  const handleEdit = (userId: string) => {
    console.log('Edit user:', userId);
  };

  const handleMore = (userId: string) => {
    console.log('More actions for user:', userId);
  };

  const handleRefresh = () => {
    console.log('Refresh users');
  };

  const handleExportAll = () => {
    console.log('Export all users');
  };

  const statsCards = (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard
        title="Total Users"
        value={12847}
        growth={12.5}
        icon={Users}
        format="number"
      />
      <MetricCard
        title="Verified Creators"
        value={1234}
        growth={8.2}
        icon={UserCheck}
        format="number"
      />
      <MetricCard
        title="Active Subscribers"
        value={45678}
        growth={15.3}
        icon={Users}
        format="number"
      />
      <MetricCard
        title="Pending Verification"
        value={89}
        growth={-5.2}
        icon={AlertTriangle}
        format="number"
      />
    </div>
  );

  const filters = (
    <div className="flex items-center gap-2">
      <Select value={roleFilter} onValueChange={setRoleFilter}>
        <SelectTrigger className="w-40 bg-surface-elev2 border-line-soft text-text">
          <SelectValue placeholder="Role" />
        </SelectTrigger>
        <SelectContent className="bg-surface-elev2 border-line-soft">
          <SelectItem value="all" className="text-text hover:bg-surface-elev1">All Roles</SelectItem>
          <SelectItem value="creator" className="text-text hover:bg-surface-elev1">Creators</SelectItem>
          <SelectItem value="subscriber" className="text-text hover:bg-surface-elev1">Subscribers</SelectItem>
          <SelectItem value="admin" className="text-text hover:bg-surface-elev1">Admins</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );

  return (
    <AdminPageTemplate
      title="User Management"
      description="Manage creators, subscribers, and user verification"
      icon={<Users className="h-6 w-6" />}
      searchPlaceholder="Search users by username or email..."
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
      <UsersDetailView
        users={filteredUsers}
        selectedUserId={selectedUserId}
        onUserSelect={handleUserSelect}
        onView={handleView}
        onEdit={handleEdit}
        onMore={handleMore}
      />
    </AdminPageTemplate>
  );
}

export default function UserManagementPage() {
  return <UsersPageClient />;
}
