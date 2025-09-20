"use client";

import { useAdminAuth } from "@src/features/admin/auth/requireAdminPage";
import { ReactNode } from "react";

// ----------------------
// Admin Layout Wrapper Component
// Location: /src/components/admin/AdminLayoutWrapper.tsx
// Purpose: Wraps the entire admin layout with authentication
// Features: Shows access denied outside of admin layout when not authenticated
// Note: This ensures the admin sidebar and layout are not shown to unauthorized users
// ----------------------

interface AdminLayoutWrapperProps {
  children: ReactNode;
}

export function AdminLayoutWrapper({ children }: AdminLayoutWrapperProps) {
  const { authState, adminUser, isLoading } = useAdminAuth();

  // ----------------------
  // Render Based on Auth State
  // Purpose: Show appropriate component based on authentication status
  // ----------------------
  switch (authState) {
    case "loading":
      return (
        <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="lucide lucide-loader-circle h-8 w-8 text-amber-400 animate-spin"
              >
                <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">Verifying Admin Access</h2>
              <p className="text-sm text-white/60">Please wait while we authenticate your credentials...</p>
            </div>
          </div>
        </div>
      );
    
    case "authenticated":
      return <>{children}</>;
    
    case "unauthorized":
      return (
        <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
          <div className="text-center space-y-6 max-w-md mx-auto px-4">
            {/* Warning Icon */}
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-red-600/20 rounded-full flex items-center justify-center">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="32" 
                  height="32" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="text-red-400"
                >
                  <path d="M12 9v4"></path>
                  <path d="M12 17h.01"></path>
                  <path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"></path>
                </svg>
              </div>
            </div>

            {/* Access Denied Title */}
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Access Denied</h1>
              <p className="text-gray-300 text-lg">
                You don't have permission to access the admin dashboard. Please contact your administrator if you believe this is an error.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button 
                onClick={() => window.location.href = '/admin'}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
              >
                Admin Login
              </button>
              <button 
                onClick={() => window.location.href = '/'}
                className="w-full bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
              >
                Return Home
              </button>
            </div>
          </div>
        </div>
      );
    
    case "error":
      return (
        <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-red-600/20 rounded-full flex items-center justify-center">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="32" 
                  height="32" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="text-red-400"
                >
                  <path d="M12 9v4"></path>
                  <path d="M12 17h.01"></path>
                  <path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"></path>
                </svg>
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">Authentication Error</h2>
              <p className="text-sm text-white/60">There was an error verifying your credentials. Please try again.</p>
            </div>
            <button 
              onClick={() => window.location.reload()}
              className="bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
            >
              Retry
            </button>
          </div>
        </div>
      );
    
    default:
      return (
        <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="lucide lucide-loader-circle h-8 w-8 text-amber-400 animate-spin"
              >
                <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">Loading...</h2>
              <p className="text-sm text-white/60">Please wait while we load the admin dashboard...</p>
            </div>
          </div>
        </div>
      );
  }
}
