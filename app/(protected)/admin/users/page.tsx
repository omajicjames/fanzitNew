"use client";

import { AdminPageTemplate, MetricCard, UserCard } from "@src/components/admin/AdminPageTemplate";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@src/components/ui/tabs";
import { 
  Users, 
  UserCheck, 
  AlertTriangle
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

// UserCardComponent removed - now using UserCard from AdminPageTemplate

export default function UserManagementPage() {
  const userService = new UserManagementService();
  const allUsers = userService.getAllUsers();
  const creators = userService.getUsersByRole('creator');
  const subscribers = userService.getUsersByRole('subscriber');
  const pendingVerification = userService.getUsersByStatus('pending_verification');
  const topEarners = userService.getTopEarners(5);

  const stats = (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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

  return (
    <AdminPageTemplate
      title="User Management"
      description="Manage creators, subscribers, and user verification"
      icon={<Users className="h-6 w-6" />}
      searchPlaceholder="Search users by username or email..."
      showSearch={true}
      showFilters={true}
      showRefresh={true}
      showExport={true}
      stats={stats}
    >

      {/* User Tabs */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 bg-[var(--admin-card-bg)] border-neutral-700">
          <TabsTrigger value="all" className="data-[state=active]:bg-[var(--admin-surface)] data-[state=active]:text-[var(--admin-text-primary)] text-[var(--admin-text-secondary)]">All Users</TabsTrigger>
          <TabsTrigger value="creators" className="data-[state=active]:bg-[var(--admin-surface)] data-[state=active]:text-[var(--admin-text-primary)] text-[var(--admin-text-secondary)]">Creators</TabsTrigger>
          <TabsTrigger value="subscribers" className="data-[state=active]:bg-[var(--admin-surface)] data-[state=active]:text-[var(--admin-text-primary)] text-[var(--admin-text-secondary)]">Subscribers</TabsTrigger>
          <TabsTrigger value="pending" className="data-[state=active]:bg-[var(--admin-surface)] data-[state=active]:text-[var(--admin-text-primary)] text-[var(--admin-text-secondary)]">Pending</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {allUsers.map((user) => (
              <UserCard
                key={user.id}
                user={user}
                onView={() => console.log('View user:', user.id)}
                onEdit={() => console.log('Edit user:', user.id)}
                onMore={() => console.log('More actions for user:', user.id)}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="creators" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {creators.map((user) => (
              <UserCard
                key={user.id}
                user={user}
                onView={() => console.log('View user:', user.id)}
                onEdit={() => console.log('Edit user:', user.id)}
                onMore={() => console.log('More actions for user:', user.id)}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="subscribers" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {subscribers.map((user) => (
              <UserCard
                key={user.id}
                user={user}
                onView={() => console.log('View user:', user.id)}
                onEdit={() => console.log('Edit user:', user.id)}
                onMore={() => console.log('More actions for user:', user.id)}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pendingVerification.map((user) => (
              <UserCard
                key={user.id}
                user={user}
                onView={() => console.log('View user:', user.id)}
                onEdit={() => console.log('Edit user:', user.id)}
                onMore={() => console.log('More actions for user:', user.id)}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </AdminPageTemplate>
  );
}
