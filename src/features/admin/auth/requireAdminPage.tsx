// ----------------------
// Admin Authentication HOC
// Location: /src/features/admin/auth/requireAdminPage.tsx
// Purpose: Higher-order component for admin authentication and authorization
// Parent: Admin pages that require authentication
// Children: Protected admin components
// ----------------------

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Shield, AlertTriangle, Loader2 } from "lucide-react";
import { logger } from "@src/lib/logger";

// ----------------------
// Admin User Type
// Purpose: Define admin user structure
// ----------------------
interface AdminUser {
  id: string;
  email: string;
  role: "admin" | "super_admin" | "moderator";
  permissions: string[];
  isActive: boolean;
}

// ----------------------
// Authentication State Type
// Purpose: Track authentication status
// ----------------------
type AuthState = "loading" | "authenticated" | "unauthorized" | "error";

// ----------------------
// Mock Admin Authentication Service
// Purpose: Simulate admin authentication (replace with real auth)
// ----------------------
class AdminAuthService {
  private static instance: AdminAuthService;
  private currentUser: AdminUser | null = null;

  static getInstance(): AdminAuthService {
    if (!AdminAuthService.instance) {
      AdminAuthService.instance = new AdminAuthService();
    }
    return AdminAuthService.instance;
  }

  // ----------------------
  // Check Admin Authentication
  // Purpose: Verify if user is authenticated admin
  // ----------------------
  async checkAdminAuth(): Promise<AdminUser | null> {
    // Simulate API call delay and ensure localStorage is ready
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Ensure we're in browser environment
    if (typeof window === 'undefined') {
      console.log("Auth check - Not in browser environment");
      return null;
    }

    // Mock authentication check
    const token = localStorage.getItem("admin_token");
    const userRole = localStorage.getItem("user_role");
    
    console.log("=== AUTH CHECK DEBUG ===");
    console.log("Auth check - token:", token);
    console.log("Auth check - userRole:", userRole);
    console.log("Auth check - condition 1 (token exists):", !!token);
    console.log("Auth check - condition 2 (role valid):", userRole === "admin" || userRole === "super_admin" || userRole === "moderator");
    console.log("Auth check - both conditions:", !!(token && (userRole === "admin" || userRole === "super_admin" || userRole === "moderator")));

    if (token && (userRole === "admin" || userRole === "super_admin" || userRole === "moderator")) {
      console.log("Auth check - SUCCESS: User authenticated");
      this.currentUser = {
        id: "admin_001",
        email: "admin@fanzit.com",
        role: userRole as "admin" | "super_admin" | "moderator",
        permissions: ["read", "write", "delete", "moderate"],
        isActive: true
      };
      return this.currentUser;
    }

    console.log("Auth check - FAILED: User not authenticated");
    return null;
  }

  // ----------------------
  // Get Current Admin User
  // Purpose: Return currently authenticated admin
  // ----------------------
  getCurrentUser(): AdminUser | null {
    return this.currentUser;
  }

  // ----------------------
  // Logout Admin
  // Purpose: Clear admin session
  // ----------------------
  logout(): void {
    this.currentUser = null;
    localStorage.removeItem("admin_token");
    localStorage.removeItem("user_role");
  }
}

// ----------------------
// Loading Component
// Purpose: Display loading state during authentication check
// ----------------------
function AdminAuthLoading() {
  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <Loader2 className="h-8 w-8 text-amber-400 animate-spin" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-white">Verifying Admin Access</h2>
          <p className="text-sm text-white/60">Please wait while we authenticate your credentials...</p>
        </div>
      </div>
    </div>
  );
}

// ----------------------
// Unauthorized Component
// Purpose: Display unauthorized access message
// ----------------------
function AdminUnauthorized() {
  const router = useRouter();

  const handleLoginRedirect = () => {
    router.push("/admin");
  };

  const handleHomeRedirect = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
      <div className="max-w-md mx-auto text-center space-y-6 p-6">
        <div className="flex justify-center">
          <div className="rounded-full bg-red-500/20 p-3">
            <AlertTriangle className="h-8 w-8 text-red-400" />
          </div>
        </div>
        
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-white">Access Denied</h2>
          <p className="text-sm text-white/60">
            You don't have permission to access the admin dashboard. 
            Please contact your administrator if you believe this is an error.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={handleLoginRedirect}
            className="w-full rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-white hover:bg-amber-500 transition-colors"
          >
            Admin Login
          </button>
          <button
            onClick={handleHomeRedirect}
            className="w-full rounded-lg bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/20 transition-colors"
          >
            Return Home
          </button>
        </div>
      </div>
    </div>
  );
}

// ----------------------
// Error Component
// Purpose: Display authentication error state
// ----------------------
function AdminAuthError() {
  const router = useRouter();

  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
      <div className="max-w-md mx-auto text-center space-y-6 p-6">
        <div className="flex justify-center">
          <div className="rounded-full bg-red-500/20 p-3">
            <AlertTriangle className="h-8 w-8 text-red-400" />
          </div>
        </div>
        
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-white">Authentication Error</h2>
          <p className="text-sm text-white/60">
            There was an error verifying your admin credentials. Please try again.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={handleRetry}
            className="w-full rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-white hover:bg-amber-500 transition-colors"
          >
            Try Again
          </button>
          <button
            onClick={() => router.push("/")}
            className="w-full rounded-lg bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/20 transition-colors"
          >
            Return Home
          </button>
        </div>
      </div>
    </div>
  );
}

// ----------------------
  // Admin Authentication Hook
  // Purpose: Custom hook for admin authentication state
  // ----------------------
  export function useAdminAuth() {
    const [authState, setAuthState] = useState<AuthState>("loading");
    const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
    const authService = AdminAuthService.getInstance();
  
  useEffect(() => {
    const checkAuth = async () => {
      try {
        setAuthState("loading");
        
        // Add delay to ensure localStorage is ready after redirect
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const user = await authService.checkAdminAuth();
        
        if (user) {
          setAdminUser(user);
          setAuthState("authenticated");
        } else {
          // Double-check after a longer delay in case of timing issues
          console.log("Initial auth check failed, retrying...");
          await new Promise(resolve => setTimeout(resolve, 1000));
          const retryUser = await authService.checkAdminAuth();
          
          if (retryUser) {
            setAdminUser(retryUser);
            setAuthState("authenticated");
          } else {
            setAuthState("unauthorized");
          }
        }
      } catch (error) {
        logger.error("Admin auth error", "requireAdminPage", error);
        setAuthState("error");
      }
    };

    // Add a small delay before checking auth to ensure page is fully loaded
    const timeoutId = setTimeout(checkAuth, 100);
    
    return () => clearTimeout(timeoutId);
  }, [authService]);
  
    return {
      authState,
      adminUser,
      isLoading: authState === "loading",
      isAuthenticated: authState === "authenticated",
      isUnauthorized: authState === "unauthorized",
      isError: authState === "error"
    };
  }

// ----------------------
// Require Admin Page HOC
// Purpose: Higher-order component that wraps admin pages with authentication
// ----------------------
export default function requireAdminPage<P extends object>(
  WrappedComponent: React.ComponentType<P>
) {
  const AdminProtectedComponent = (props: P) => {
    const { authState, adminUser } = useAdminAuth();

    // ----------------------
    // Render Based on Auth State
    // Purpose: Show appropriate component based on authentication status
    // ----------------------
    switch (authState) {
      case "loading":
        return <AdminAuthLoading />;
      
      case "authenticated":
        return <WrappedComponent {...props} adminUser={adminUser} />;
      
      case "unauthorized":
        return <AdminUnauthorized />;
      
      case "error":
        return <AdminAuthError />;
      
      default:
        return <AdminAuthLoading />;
    }
  };

  // Set display name for debugging
  AdminProtectedComponent.displayName = `requireAdminPage(${WrappedComponent.displayName || WrappedComponent.name})`;

  return AdminProtectedComponent;
}

// ----------------------
// Admin Permission Check Utility
// Purpose: Check if admin user has specific permissions
// ----------------------
export function hasAdminPermission(user: AdminUser | null, permission: string): boolean {
  if (!user || !user.isActive) return false;
  
  // Super admin has all permissions
  if (user.role === "super_admin") return true;
  
  return user.permissions.includes(permission);
}

// ----------------------
// Admin Role Check Utility
// Purpose: Check if admin user has specific role or higher
// ----------------------
export function hasAdminRole(user: AdminUser | null, requiredRole: AdminUser["role"]): boolean {
  if (!user || !user.isActive) return false;
  
  const roleHierarchy = {
    "moderator": 1,
    "admin": 2,
    "super_admin": 3
  };
  
  const userLevel = roleHierarchy[user.role];
  const requiredLevel = roleHierarchy[requiredRole];
  
  return userLevel >= requiredLevel;
}