// ----------------------
// User Management Page
// Location: /app/(protected)/admin/system/users/page.tsx
// Purpose: Comprehensive user administration and management dashboard
// Protection: Requires admin authentication (inherited from parent layout)
// Parent: Admin dashboard layout with AdminNav sidebar
// Children: User management components and modals
// ----------------------

"use client";

import { useState, useEffect } from "react";
import requireAdminPage from "@src/features/admin/auth/requireAdminPage";
import { 
  Users, 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Trash2, 
  Shield, 
  ShieldCheck, 
  ShieldX,
  Mail,
  Calendar,
  MoreVertical,
  Eye,
  Ban,
  UserCheck,
  Download,
  Upload
} from "lucide-react";

// ----------------------
// User Interface Types
// Purpose: Define user data structure and status types
// ----------------------
interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'moderator' | 'user';
  status: 'active' | 'suspended' | 'pending';
  joinDate: string;
  lastLogin: string;
  totalPosts: number;
  totalComments: number;
  avatar?: string;
}

// ----------------------
// User Management Component
// Purpose: Main user administration interface
// ----------------------
function UserManagementPage() {
  // ----------------------
  // State Management
  // Purpose: Track users, filters, search, and UI states
  // ----------------------
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [showUserModal, setShowUserModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // ----------------------
  // Mock User Data
  // Purpose: Simulated user database for demonstration
  // ----------------------
  const mockUsers: User[] = [
    {
      id: "1",
      name: "John Smith",
      email: "john.smith@example.com",
      role: "admin",
      status: "active",
      joinDate: "2023-01-15",
      lastLogin: "2024-01-15T10:30:00Z",
      totalPosts: 45,
      totalComments: 128
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah.johnson@example.com",
      role: "moderator",
      status: "active",
      joinDate: "2023-03-22",
      lastLogin: "2024-01-14T15:45:00Z",
      totalPosts: 23,
      totalComments: 89
    },
    {
      id: "3",
      name: "Mike Wilson",
      email: "mike.wilson@example.com",
      role: "user",
      status: "suspended",
      joinDate: "2023-06-10",
      lastLogin: "2024-01-10T09:15:00Z",
      totalPosts: 12,
      totalComments: 34
    },
    {
      id: "4",
      name: "Emily Davis",
      email: "emily.davis@example.com",
      role: "user",
      status: "active",
      joinDate: "2023-08-05",
      lastLogin: "2024-01-15T14:20:00Z",
      totalPosts: 67,
      totalComments: 156
    },
    {
      id: "5",
      name: "Alex Chen",
      email: "alex.chen@example.com",
      role: "user",
      status: "pending",
      joinDate: "2024-01-12",
      lastLogin: "2024-01-12T16:00:00Z",
      totalPosts: 2,
      totalComments: 5
    }
  ];

  // ----------------------
  // Load Users Effect
  // Purpose: Initialize user data on component mount
  // ----------------------
  useEffect(() => {
    const loadUsers = async () => {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setUsers(mockUsers);
      setFilteredUsers(mockUsers);
      setIsLoading(false);
    };

    loadUsers();
  }, []);

  // ----------------------
  // Filter Users Effect
  // Purpose: Apply search and filter criteria to user list
  // ----------------------
  useEffect(() => {
    let filtered = users.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           user.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = selectedRole === "All" || user.role === selectedRole.toLowerCase();
      const matchesStatus = selectedStatus === "All" || user.status === selectedStatus.toLowerCase();
      
      return matchesSearch && matchesRole && matchesStatus;
    });

    setFilteredUsers(filtered);
  }, [users, searchTerm, selectedRole, selectedStatus]);

  // ----------------------
  // Role Badge Component
  // Purpose: Display user role with appropriate styling
  // ----------------------
  const RoleBadge = ({ role }: { role: string }) => {
    const roleConfig = {
      admin: { color: "bg-red-100 text-red-800", icon: ShieldCheck },
      moderator: { color: "bg-blue-100 text-blue-800", icon: Shield },
      user: { color: "bg-gray-100 text-gray-800", icon: ShieldX }
    };

    const config = roleConfig[role as keyof typeof roleConfig] || roleConfig.user;
    const Icon = config.icon;

    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${config.color}`}>
        <Icon className="h-3 w-3" />
        {role.charAt(0).toUpperCase() + role.slice(1)}
      </span>
    );
  };

  // ----------------------
  // Status Badge Component
  // Purpose: Display user status with appropriate styling
  // ----------------------
  const StatusBadge = ({ status }: { status: string }) => {
    const statusConfig = {
      active: { color: "bg-green-100 text-green-800" },
      suspended: { color: "bg-red-100 text-red-800" },
      pending: { color: "bg-yellow-100 text-yellow-800" }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;

    return (
      <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${config.color}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  // ----------------------
  // User Actions
  // Purpose: Handle user management operations
  // ----------------------
  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setShowUserModal(true);
  };

  const handleDeleteUser = (userId: string) => {
    if (confirm("Are you sure you want to delete this user?")) {
      setUsers(prev => prev.filter(user => user.id !== userId));
    }
  };

  const handleSuspendUser = (userId: string) => {
    setUsers(prev => prev.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'suspended' ? 'active' : 'suspended' as const }
        : user
    ));
  };

  const handleBulkAction = (action: string) => {
    if (selectedUsers.length === 0) return;
    
    switch (action) {
      case 'delete':
        if (confirm(`Delete ${selectedUsers.length} selected users?`)) {
          setUsers(prev => prev.filter(user => !selectedUsers.includes(user.id)));
          setSelectedUsers([]);
        }
        break;
      case 'suspend':
        setUsers(prev => prev.map(user => 
          selectedUsers.includes(user.id) 
            ? { ...user, status: 'suspended' as const }
            : user
        ));
        setSelectedUsers([]);
        break;
      case 'activate':
        setUsers(prev => prev.map(user => 
          selectedUsers.includes(user.id) 
            ? { ...user, status: 'active' as const }
            : user
        ));
        setSelectedUsers([]);
        break;
    }
  };

  // ----------------------
  // Format Date Helper
  // Purpose: Format date strings for display
  // ----------------------
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatLastLogin = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      return `${Math.floor(diffInHours / 24)}d ago`;
    }
  };

  // ----------------------
  // Main Component Render
  // ----------------------
  return (
    <div className="text-[var(--admin-text-primary)] p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 pb-6">
          <div>
            <h1 className="text-3xl font-bold text-[var(--admin-text-primary)] mb-2">User Management</h1>
            <p className="text-[var(--admin-text-secondary)]">Manage users, roles, and permissions</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2 bg-[var(--admin-card-bg)] text-[var(--admin-text-primary)] rounded-lg hover:bg-[var(--admin-surface)] transition-colors">
              <Download className="h-4 w-4" />
              Export
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-[var(--admin-card-bg)] text-[var(--admin-text-primary)] rounded-lg hover:bg-[var(--admin-surface)] transition-colors">
              <Upload className="h-4 w-4" />
              Import
            </button>
            <button 
              onClick={() => setShowUserModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-[var(--admin-text-primary)] rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-4 w-4" />
              Add User
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-neutral-900 rounded-lg p-6 border border-neutral-800">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Users className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-[var(--admin-text-secondary)]">Total Users</p>
                <p className="text-2xl font-bold text-[var(--admin-text-primary)]">{users.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-neutral-900 rounded-lg p-6 border border-neutral-800">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <UserCheck className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <p className="text-sm text-[var(--admin-text-secondary)]">Active Users</p>
                <p className="text-2xl font-bold text-[var(--admin-text-primary)]">{users.filter(u => u.status === 'active').length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-neutral-900 rounded-lg p-6 border border-neutral-800">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-500/20 rounded-lg">
                <ShieldCheck className="h-5 w-5 text-red-400" />
              </div>
              <div>
                <p className="text-sm text-[var(--admin-text-secondary)]">Admins</p>
                <p className="text-2xl font-bold text-[var(--admin-text-primary)]">{users.filter(u => u.role === 'admin').length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-neutral-900 rounded-lg p-6 border border-neutral-800">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-500/20 rounded-lg">
                <Ban className="h-5 w-5 text-yellow-400" />
              </div>
              <div>
                <p className="text-sm text-[var(--admin-text-secondary)]">Suspended</p>
                <p className="text-2xl font-bold text-[var(--admin-text-primary)]">{users.filter(u => u.status === 'suspended').length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-neutral-900 rounded-lg border border-neutral-800 p-6">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[var(--admin-text-secondary)]" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-[var(--admin-card-bg)] border border-neutral-700 rounded-lg text-[var(--admin-text-primary)] placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Role Filter */}
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="px-4 py-2 bg-[var(--admin-card-bg)] border border-neutral-700 rounded-lg text-[var(--admin-text-primary)] focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="All">All Roles</option>
                <option value="Admin">Admin</option>
                <option value="Moderator">Moderator</option>
                <option value="User">User</option>
              </select>

              {/* Status Filter */}
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-2 bg-[var(--admin-card-bg)] border border-neutral-700 rounded-lg text-[var(--admin-text-primary)] focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Suspended">Suspended</option>
                <option value="Pending">Pending</option>
              </select>
            </div>

            {/* Bulk Actions */}
            {selectedUsers.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-[var(--admin-text-secondary)]">{selectedUsers.length} selected</span>
                <button
                  onClick={() => handleBulkAction('activate')}
                  className="px-3 py-1 bg-green-600 text-[var(--admin-text-primary)] rounded text-sm hover:bg-green-700 transition-colors"
                >
                  Activate
                </button>
                <button
                  onClick={() => handleBulkAction('suspend')}
                  className="px-3 py-1 bg-yellow-600 text-[var(--admin-text-primary)] rounded text-sm hover:bg-yellow-700 transition-colors"
                >
                  Suspend
                </button>
                <button
                  onClick={() => handleBulkAction('delete')}
                  className="px-3 py-1 bg-red-600 text-[var(--admin-text-primary)] rounded text-sm hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-neutral-900 rounded-lg border border-neutral-800 overflow-hidden">
          {isLoading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
              <p className="text-[var(--admin-text-secondary)] mt-4">Loading users...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[var(--admin-card-bg)] border-b border-neutral-700">
                  <tr>
                    <th className="px-6 py-4 text-left">
                      <input
                        type="checkbox"
                        checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedUsers(filteredUsers.map(u => u.id));
                          } else {
                            setSelectedUsers([]);
                          }
                        }}
                        className="rounded border-neutral-600 bg-[var(--admin-surface)] text-blue-600 focus:ring-blue-500"
                      />
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-neutral-300">User</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-neutral-300">Role</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-neutral-300">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-neutral-300">Join Date</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-neutral-300">Last Login</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-neutral-300">Activity</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-neutral-300">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-[var(--admin-card-bg)]/50 transition-colors">
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          checked={selectedUsers.includes(user.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedUsers(prev => [...prev, user.id]);
                            } else {
                              setSelectedUsers(prev => prev.filter(id => id !== user.id));
                            }
                          }}
                          className="rounded border-neutral-600 bg-[var(--admin-surface)] text-blue-600 focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-[var(--admin-text-primary)] font-medium text-sm">
                            {user.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium text-[var(--admin-text-primary)]">{user.name}</p>
                            <p className="text-sm text-[var(--admin-text-secondary)]">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <RoleBadge role={user.role} />
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={user.status} />
                      </td>
                      <td className="px-6 py-4 text-sm text-neutral-300">
                        {formatDate(user.joinDate)}
                      </td>
                      <td className="px-6 py-4 text-sm text-neutral-300">
                        {formatLastLogin(user.lastLogin)}
                      </td>
                      <td className="px-6 py-4 text-sm text-neutral-300">
                        <div>
                          <p>{user.totalPosts} posts</p>
                          <p className="text-[var(--admin-text-secondary)]">{user.totalComments} comments</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEditUser(user)}
                            className="p-1 text-[var(--admin-text-secondary)] hover:text-blue-400 transition-colors"
                            title="Edit user"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleSuspendUser(user.id)}
                            className="p-1 text-[var(--admin-text-secondary)] hover:text-yellow-400 transition-colors"
                            title={user.status === 'suspended' ? 'Activate user' : 'Suspend user'}
                          >
                            <Ban className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteUser(user.id)}
                            className="p-1 text-[var(--admin-text-secondary)] hover:text-red-400 transition-colors"
                            title="Delete user"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredUsers.length === 0 && (
                <div className="p-8 text-center">
                  <Users className="h-12 w-12 text-neutral-600 mx-auto mb-4" />
                  <p className="text-[var(--admin-text-secondary)]">No users found matching your criteria</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ----------------------
// Protected User Management Page Export
// Purpose: User management page wrapped with authentication HOC
// ----------------------
export default requireAdminPage(UserManagementPage);

/* End of User Management Page */