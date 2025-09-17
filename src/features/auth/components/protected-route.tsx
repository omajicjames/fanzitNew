"use client"

import { useAuth } from "./auth-provider"
import { LoginForm } from "./login-form"
import type { ReactNode } from "react"
import { useEffect, useState } from "react"

interface ProtectedRouteProps {
  children: ReactNode
  requireCreator?: boolean
  requireAdmin?: boolean
}

export function ProtectedRoute({ children, requireCreator = false, requireAdmin = false }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth()
  const [isMounted, setIsMounted] = useState(false)

  // ----------------------
  // 1. Client-side mounting check
  // Prevents hydration mismatch by ensuring consistent rendering
  // ----------------------
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Show loading state until mounted and auth is resolved
  if (!isMounted || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <LoginForm />
  }

  if (requireCreator && !user.isCreator) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-bold text-foreground mb-4">Creator Access Required</h2>
          <p className="text-muted-foreground mb-6">
            You need to be a verified creator to access this page. Apply to become a creator to unlock these features.
          </p>
          <button className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90">
            Apply to be a Creator
          </button>
        </div>
      </div>
    )
  }

  if (requireAdmin && !user.isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-bold text-foreground mb-4">Admin Access Required</h2>
          <p className="text-muted-foreground mb-6">
            You need administrator privileges to access this page. Please contact support if you believe you should have admin access.
          </p>
          <button className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90">
            Contact Support
          </button>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
