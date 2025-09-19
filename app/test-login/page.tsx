"use client"

import { useState, useEffect } from "react"
import { Button } from "@src/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@src/components/ui/card"
import { Badge } from "@src/components/ui/badge"
import { Shield, CheckCircle, XCircle, AlertTriangle } from "lucide-react"

export default function TestLoginPage() {
  const [authStatus, setAuthStatus] = useState<{
    hasToken: boolean
    hasRole: boolean
    hasSession: boolean
    token: string | null
    role: string | null
    session: string | null
  }>({
    hasToken: false,
    hasRole: false,
    hasSession: false,
    token: null,
    role: null,
    session: null
  })

  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    checkAuthStatus()
  }, [])

  const checkAuthStatus = () => {
    if (typeof window === 'undefined') return

    const token = localStorage.getItem("admin_token")
    const role = localStorage.getItem("user_role")
    const session = localStorage.getItem("admin_session")

    setAuthStatus({
      hasToken: !!token,
      hasRole: !!role,
      hasSession: !!session,
      token,
      role,
      session: session ? JSON.parse(session) : null
    })
  }

  const clearAuth = () => {
    if (typeof window === 'undefined') return

    localStorage.removeItem("admin_token")
    localStorage.removeItem("user_role")
    localStorage.removeItem("admin_session")
    localStorage.removeItem("user")
    checkAuthStatus()
  }

  const simulateLogin = () => {
    if (typeof window === 'undefined') return

    // Simulate admin login
    const adminUser = {
      id: `admin-${Date.now()}`,
      email: "admin@fanzit.admin",
      name: "Test Administrator",
      avatar: "/placeholder-logo.svg",
      isCreator: false,
      isAdmin: true,
      isSuperAdmin: false,
      role: "admin",
      permissions: ["read", "write", "delete", "manage_users", "manage_content", "system_admin"],
      lastLogin: new Date().toISOString(),
      createdAt: new Date().toISOString()
    }

    const token = `admin_session_${Date.now()}`
    const role = "admin"
    
    localStorage.setItem("user", JSON.stringify(adminUser))
    localStorage.setItem("admin_token", token)
    localStorage.setItem("user_role", role)
    localStorage.setItem("admin_session", JSON.stringify({
      loginTime: new Date().toISOString(),
      username: "admin",
      role: role,
      sessionId: `session_${Date.now()}`
    }))

    checkAuthStatus()
  }

  if (!isMounted) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl border-neutral-800 bg-neutral-900">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Shield className="h-6 w-6" />
            Admin Login Test
          </CardTitle>
          <CardDescription className="text-neutral-400">
            Test and debug admin authentication flow
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Auth Status */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Authentication Status</h3>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                {authStatus.hasToken ? (
                  <CheckCircle className="h-5 w-5 text-green-400" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-400" />
                )}
                <span className="text-white">Admin Token</span>
                <Badge variant={authStatus.hasToken ? "default" : "destructive"}>
                  {authStatus.hasToken ? "Present" : "Missing"}
                </Badge>
              </div>
              
              <div className="flex items-center gap-2">
                {authStatus.hasRole ? (
                  <CheckCircle className="h-5 w-5 text-green-400" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-400" />
                )}
                <span className="text-white">User Role</span>
                <Badge variant={authStatus.hasRole ? "default" : "destructive"}>
                  {authStatus.hasRole ? "Present" : "Missing"}
                </Badge>
              </div>
              
              <div className="flex items-center gap-2">
                {authStatus.hasSession ? (
                  <CheckCircle className="h-5 w-5 text-green-400" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-400" />
                )}
                <span className="text-white">Admin Session</span>
                <Badge variant={authStatus.hasSession ? "default" : "destructive"}>
                  {authStatus.hasSession ? "Present" : "Missing"}
                </Badge>
              </div>
            </div>
          </div>

          {/* Debug Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Debug Information</h3>
            
            <div className="space-y-2 text-sm">
              <div className="flex gap-2">
                <span className="text-neutral-400 w-20">Token:</span>
                <span className="text-white font-mono text-xs break-all">
                  {authStatus.token || "Not set"}
                </span>
              </div>
              
              <div className="flex gap-2">
                <span className="text-neutral-400 w-20">Role:</span>
                <span className="text-white font-mono">
                  {authStatus.role || "Not set"}
                </span>
              </div>
              
              <div className="flex gap-2">
                <span className="text-neutral-400 w-20">Session:</span>
                <span className="text-white font-mono text-xs">
                  {authStatus.session ? JSON.stringify(authStatus.session, null, 2) : "Not set"}
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Actions</h3>
            
            <div className="flex gap-4">
              <Button onClick={simulateLogin} className="bg-blue-600 hover:bg-blue-700">
                Simulate Admin Login
              </Button>
              
              <Button onClick={clearAuth} variant="outline" className="border-red-600 text-red-400 hover:bg-red-900">
                Clear Auth Data
              </Button>
              
              <Button onClick={checkAuthStatus} variant="outline">
                Refresh Status
              </Button>
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Test Navigation</h3>
            
            <div className="flex gap-4">
              <Button 
                onClick={() => window.location.href = "/admin-login"} 
                variant="outline"
                className="border-amber-600 text-amber-400 hover:bg-amber-900"
              >
                Go to Admin Login
              </Button>
              
              <Button 
                onClick={() => window.location.href = "/admin/dashboard"} 
                variant="outline"
                className="border-green-600 text-green-400 hover:bg-green-900"
                disabled={!authStatus.hasToken || !authStatus.hasRole}
              >
                Go to Admin Dashboard
              </Button>
            </div>
          </div>

          {/* Instructions */}
          <div className="p-4 bg-blue-950/20 border border-blue-800 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-5 w-5 text-blue-400 mt-0.5" />
              <div className="text-sm text-blue-200">
                <p className="font-semibold mb-2">Testing Instructions:</p>
                <ol className="list-decimal list-inside space-y-1">
                  <li>Click "Simulate Admin Login" to set up test credentials</li>
                  <li>Click "Go to Admin Dashboard" to test the protected route</li>
                  <li>Or go to <code className="bg-blue-900 px-1 rounded">/admin</code> and use credentials: admin/admin123</li>
                  <li>Use "Clear Auth Data" to reset and test again</li>
                </ol>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
