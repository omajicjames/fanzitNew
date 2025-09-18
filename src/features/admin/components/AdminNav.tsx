// ----------------------
// Admin Navigation Sidebar Component
// Location: /src/features/admin/components/AdminNav.tsx
// Purpose: Comprehensive admin navigation with 20+ sections and responsive design
// Parent: Admin layout or admin pages
// Children: Navigation items, user profile, logout functionality
// ----------------------

"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  BarChart3, Users, FileText, DollarSign, Settings, Shield, 
  MessageSquare, Bell, Calendar, Database, Globe, Zap,
  TrendingUp, UserCheck, Flag, CreditCard, Package,
  Mail, HelpCircle, Activity, Lock, ChevronLeft,
  ChevronRight, LogOut, User, Menu, X
} from "lucide-react";

// ----------------------
// Navigation Item Type
// Purpose: Define structure for navigation items
// ----------------------
interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  badge?: string | number;
  children?: NavItem[];
}

// ----------------------
// Admin Navigation Configuration
// Purpose: Define all admin navigation sections
// ----------------------
const ADMIN_NAV_ITEMS: NavItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: BarChart3,
    href: "/admin"
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: TrendingUp,
    href: "/admin/analytics"
  },
  {
    id: "users",
    label: "User Management",
    icon: Users,
    href: "/admin/users",
    children: [
      { id: "all-users", label: "All Users", icon: Users, href: "/admin/users" },
      { id: "creators", label: "Creators", icon: UserCheck, href: "/admin/users/creators" },
      { id: "verification", label: "Verification", icon: Shield, href: "/admin/users/verification" },
      { id: "bans", label: "Bans & Suspensions", icon: Lock, href: "/admin/users/bans" }
    ]
  },
  {
    id: "content",
    label: "Content Management",
    icon: FileText,
    href: "/admin/content",
    children: [
      { id: "posts", label: "Posts", icon: FileText, href: "/admin/content/posts" },
      { id: "moderation", label: "Moderation Queue", icon: Flag, href: "/admin/content/moderation", badge: "12" },
      { id: "reports", label: "Reports", icon: MessageSquare, href: "/admin/content/reports", badge: "5" },
      { id: "dmca", label: "DMCA Claims", icon: Shield, href: "/admin/content/dmca" }
    ]
  },
  {
    id: "finance",
    label: "Financial Management",
    icon: DollarSign,
    href: "/admin/finance",
    children: [
      { id: "revenue", label: "Revenue", icon: DollarSign, href: "/admin/finance/revenue" },
      { id: "payouts", label: "Creator Payouts", icon: CreditCard, href: "/admin/finance/payouts" },
      { id: "transactions", label: "Transactions", icon: Activity, href: "/admin/finance/transactions" },
      { id: "refunds", label: "Refunds", icon: Package, href: "/admin/finance/refunds" }
    ]
  },
  {
    id: "communications",
    label: "Communications",
    icon: Mail,
    href: "/admin/communications",
    children: [
      { id: "announcements", label: "Announcements", icon: Bell, href: "/admin/communications/announcements" },
      { id: "newsletters", label: "Newsletters", icon: Mail, href: "/admin/communications/newsletters" },
      { id: "notifications", label: "Push Notifications", icon: Bell, href: "/admin/communications/notifications" }
    ]
  },
  {
    id: "support",
    label: "Support Center",
    icon: HelpCircle,
    href: "/admin/support",
    children: [
      { id: "tickets", label: "Support Tickets", icon: MessageSquare, href: "/admin/support/tickets", badge: "8" },
      { id: "knowledge-base", label: "Knowledge Base", icon: HelpCircle, href: "/admin/support/knowledge-base" },
      { id: "faq", label: "FAQ Management", icon: HelpCircle, href: "/admin/support/faq" }
    ]
  },
  {
    id: "system",
    label: "System Management",
    icon: Database,
    href: "/admin/system",
    children: [
      { id: "status", label: "System Status", icon: Activity, href: "/admin/system/status" },
      { id: "users", label: "User Management", icon: Users, href: "/admin/system/users" },
      { id: "settings", label: "System Settings", icon: Settings, href: "/admin/system/settings" },
      { id: "logs", label: "System Logs", icon: FileText, href: "/admin/system/logs" },
      { id: "backups", label: "Backups", icon: Database, href: "/admin/system/backups" },
      { id: "maintenance", label: "Maintenance", icon: Settings, href: "/admin/system/maintenance" }
    ]
  },
  {
    id: "security",
    label: "Security & Privacy",
    icon: Shield,
    href: "/admin/security",
    children: [
      { id: "access-control", label: "Access Control", icon: Lock, href: "/admin/security/access" },
      { id: "audit-logs", label: "Audit Logs", icon: FileText, href: "/admin/security/audit" },
      { id: "privacy", label: "Privacy Settings", icon: Shield, href: "/admin/security/privacy" }
    ]
  },
  {
    id: "integrations",
    label: "Integrations",
    icon: Zap,
    href: "/admin/integrations"
  },
  {
    id: "events",
    label: "Events & Scheduling",
    icon: Calendar,
    href: "/admin/events"
  },
  {
    id: "global",
    label: "Global Settings",
    icon: Globe,
    href: "/admin/global"
  },
  {
    id: "settings",
    label: "Admin Settings",
    icon: Settings,
    href: "/admin/settings"
  }
];

// ----------------------
// Navigation Item Component
// Purpose: Render individual navigation items with active states
// ----------------------
interface NavItemProps {
  item: NavItem;
  isActive: boolean;
  isCollapsed: boolean;
  onItemClick: (href: string) => void;
}

function NavigationItem({ item, isActive, isCollapsed, onItemClick }: NavItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const Icon = item.icon;
  const hasChildren = item.children && item.children.length > 0;

  const handleClick = () => {
    if (hasChildren && !isCollapsed) {
      setIsExpanded(!isExpanded);
    } else {
      onItemClick(item.href);
    }
  };

  return (
    <div className="space-y-1">
      <button
        onClick={handleClick}
        className={`
          w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all
          ${isActive 
            ? "bg-amber-500/20 text-amber-400" 
            : "text-white/70 hover:text-white hover:bg-white/5"
          }
          ${isCollapsed ? "justify-center" : "justify-between"}
        `}
      >
        <div className="flex items-center gap-3">
          <Icon className="h-4 w-4 flex-shrink-0" />
          {!isCollapsed && (
            <>
              <span className="truncate">{item.label}</span>
              {item.badge && (
                <span className="rounded-full bg-red-500 px-2 py-0.5 text-xs text-white">
                  {item.badge}
                </span>
              )}
            </>
          )}
        </div>
        
        {!isCollapsed && hasChildren && (
          <ChevronRight 
            className={`h-4 w-4 transition-transform ${isExpanded ? "rotate-90" : ""}`} 
          />
        )}
      </button>

      {/* ----------------------
      // Sub-navigation Items
      // Purpose: Render child navigation items when expanded
      // ---------------------- */}
      {hasChildren && isExpanded && !isCollapsed && (
        <div className="ml-6 space-y-1 border-l border-white/10 pl-3">
          {item.children!.map((child) => (
            <button
              key={child.id}
              onClick={() => onItemClick(child.href)}
              className="w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-white/60 hover:text-white hover:bg-white/5 transition-all"
            >
              <child.icon className="h-3 w-3" />
              <span className="truncate">{child.label}</span>
              {child.badge && (
                <span className="rounded-full bg-red-500 px-2 py-0.5 text-xs text-white">
                  {child.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ----------------------
// Admin Profile Section
// Purpose: Display admin user info and logout option
// ----------------------
interface AdminProfileProps {
  isCollapsed: boolean;
  onLogout: () => void;
}

function AdminProfile({ isCollapsed, onLogout }: AdminProfileProps) {
  return (
    <div className="border-t border-white/10 pt-4">
      {!isCollapsed ? (
        <div className="space-y-3">
          <div className="flex items-center gap-3 px-3">
            <div className="h-8 w-8 rounded-full bg-amber-500/20 flex items-center justify-center">
              <User className="h-4 w-4 text-amber-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">Admin User</p>
              <p className="text-xs text-white/60 truncate">admin@fanzit.com</p>
            </div>
          </div>
          
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-all"
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </button>
        </div>
      ) : (
        <div className="space-y-2">
          <div className="flex justify-center">
            <div className="h-8 w-8 rounded-full bg-amber-500/20 flex items-center justify-center">
              <User className="h-4 w-4 text-amber-400" />
            </div>
          </div>
          
          <button
            onClick={onLogout}
            className="w-full flex justify-center rounded-lg px-3 py-2 text-red-400 hover:bg-red-500/10 transition-all"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}

// ----------------------
// Main Admin Navigation Component
// Purpose: Complete admin sidebar navigation
// ----------------------
interface AdminNavProps {
  className?: string;
}

export default function AdminNav({ className = "" }: AdminNavProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // ----------------------
  // Navigation Handlers
  // Purpose: Handle navigation and state changes
  // ----------------------
  const handleNavigation = (href: string) => {
    router.push(href);
    setIsMobileOpen(false); // Close mobile menu on navigation
  };

  const handleLogout = () => {
    // Clear admin session
    localStorage.removeItem("admin_token");
    localStorage.removeItem("user_role");
    router.push("/admin-login");
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleMobileMenu = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  // ----------------------
  // Check if Navigation Item is Active
  // Purpose: Determine active state for navigation items
  // ----------------------
  const isNavItemActive = (item: NavItem): boolean => {
    if (pathname === item.href) return true;
    if (item.children) {
      return item.children.some(child => pathname === child.href);
    }
    return false;
  };

  return (
    <>
      {/* ----------------------
      // Mobile Menu Button
      // Purpose: Toggle mobile navigation on small screens
      // ---------------------- */}
      <button
        onClick={toggleMobileMenu}
        className="fixed top-4 left-4 z-50 lg:hidden rounded-lg bg-white/10 p-2 text-white hover:bg-white/20 transition-all"
      >
        {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* ----------------------
      // Mobile Overlay
      // Purpose: Dark overlay for mobile menu
      // ---------------------- */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* ----------------------
      // Main Navigation Sidebar
      // Purpose: Desktop and mobile navigation container
      // ---------------------- */}
      <nav
        className={`
          fixed left-0 top-0 z-40 h-full bg-neutral-900/95 backdrop-blur-sm border-r border-white/10 transition-all duration-300
          ${isCollapsed ? "w-16" : "w-64"}
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          ${className}
        `}
      >
        <div className="flex h-full flex-col">
          {/* ----------------------
          // Header Section
          // Purpose: Logo, title, and collapse toggle
          // ---------------------- */}
          <div className="flex items-center justify-between border-b border-white/10 p-4">
            {!isCollapsed && (
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-amber-500/20 flex items-center justify-center">
                  <Shield className="h-4 w-4 text-amber-400" />
                </div>
                <span className="text-lg font-semibold text-white">Admin</span>
              </div>
            )}
            
            <button
              onClick={toggleCollapse}
              className="hidden lg:flex rounded-lg p-1.5 text-white/70 hover:text-white hover:bg-white/10 transition-all"
            >
              {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </button>
          </div>

          {/* ----------------------
          // Navigation Items
          // Purpose: Scrollable list of navigation items
          // ---------------------- */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {ADMIN_NAV_ITEMS.map((item) => (
              <NavigationItem
                key={item.id}
                item={item}
                isActive={isNavItemActive(item)}
                isCollapsed={isCollapsed}
                onItemClick={handleNavigation}
              />
            ))}
          </div>

          {/* ----------------------
          // Admin Profile Section
          // Purpose: User info and logout at bottom of sidebar
          // ---------------------- */}
          <div className="p-4">
            <AdminProfile isCollapsed={isCollapsed} onLogout={handleLogout} />
          </div>
        </div>
      </nav>
    </>
  );
}