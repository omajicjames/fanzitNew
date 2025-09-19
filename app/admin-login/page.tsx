"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@src/components/ui/button"
import { Input } from "@src/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@src/components/ui/card"
import { Label } from "@src/components/ui/label"
import { Alert, AlertDescription } from "@src/components/ui/alert"
import { Separator } from "@src/components/ui/separator"
import { Shield, Lock, User, Eye, EyeOff } from "lucide-react"

// ----------------------
// Admin Login Page
// Location: /app/admin/page.tsx
// Purpose: Admin authentication outside protected layout
// Note: This page is outside (protected) folder to avoid sidebar inheritance
//       After login, redirects to /admin/dashboard within protected layout
// ----------------------

export default function AdminPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [isMounted, setIsMounted] = useState(false)
  const router = useRouter()

  // ----------------------
  // Client-side mounting check
  // Prevents hydration mismatch for localStorage operations
  // ----------------------
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // ----------------------
  // Admin Authentication Handler
  // Professional login with username/password validation
  // Creates comprehensive admin session with proper permissions
  // ----------------------
  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      console.log("Login attempt with:", { username, password })
      
      // Professional admin credentials (can be moved to env variables in production)
      const validCredentials = [
        { username: "admin", password: "admin123" },
        { username: "superadmin", password: "super123" }
      ]

      // Validate credentials
      const isValid = validCredentials.some(
        cred => cred.username === username && cred.password === password
      )

      console.log("Credentials valid:", isValid)

      if (isValid) {
        // Create comprehensive admin user object
        const adminUser = {
          id: `admin-${Date.now()}`,
          email: `${username}@fanzit.admin`,
          name: username === "superadmin" ? "Super Administrator" : "Administrator",
          avatar: "/placeholder-logo.svg",
          isCreator: false,
          isAdmin: true,
          isSuperAdmin: username === "superadmin",
          role: username === "superadmin" ? "super_admin" : "admin",
          permissions: ["read", "write", "delete", "manage_users", "manage_content", "system_admin"],
          lastLogin: new Date().toISOString(),
          createdAt: new Date().toISOString()
        }

        // Store comprehensive admin session
        if (typeof window !== 'undefined') {
          // Primary user data
          localStorage.setItem("user", JSON.stringify(adminUser))
          // Admin-specific authentication tokens
          const token = `admin_session_${Date.now()}`
          const role = adminUser.role
          
          console.log("Storing admin_token:", token)
          console.log("Storing user_role:", role)
          
          localStorage.setItem("admin_token", token)
          localStorage.setItem("user_role", role)
          localStorage.setItem("admin_session", JSON.stringify({
            loginTime: new Date().toISOString(),
            username: username,
            role: role,
            sessionId: `session_${Date.now()}`
          }))
        }

        // Ensure localStorage is properly written before redirect
        await new Promise(resolve => setTimeout(resolve, 1200))
        
        console.log("Login successful, redirecting to /admin/dashboard")
        console.log("Stored admin_token:", localStorage.getItem("admin_token"))
        console.log("Stored user_role:", localStorage.getItem("user_role"))
        console.log("Stored admin_session:", localStorage.getItem("admin_session"))
        
        // Redirect to admin dashboard (within protected layout)
        router.push("/admin")
        
      } else {
        console.log("Login failed: Invalid credentials")
        setError("Invalid credentials. Please check your username and password.")
      }
    } catch (err) {
      console.error("Login error:", err)
      setError("Login failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  // ----------------------
  // Quick Demo Access Handler
  // Provides easy testing access for development
  // ----------------------
  const handleQuickAccess = (demoType: 'admin' | 'superadmin') => {
    const credentials = demoType === 'superadmin' 
      ? { username: 'superadmin', password: 'super123' }
      : { username: 'admin', password: 'admin123' }
    
    setUsername(credentials.username)
    setPassword(credentials.password)
    setError("") // Clear any existing errors
  }

  if (!isMounted) {
    return null // Prevent hydration mismatch
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-4">
      <div className="absolute inset-0 bg-grid-slate-800/[0.2] bg-[size:20px_20px]" />
      
      <Card className="w-full max-w-md relative z-10 border-slate-800 bg-slate-950/90 backdrop-blur">
        <CardHeader className="text-center space-y-4 pb-8">
          <div className="flex justify-center">
            <div className="p-4 bg-primary/10 rounded-full border border-primary/20">
              <Shield className="h-12 w-12 text-primary" />
            </div>
          </div>
          <div className="space-y-2">
            <CardTitle className="text-3xl bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Admin Portal
            </CardTitle>
            <CardDescription className="text-slate-400">
              Secure administrative access
            </CardDescription>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* ----------------------
          // Quick Demo Access Section
          // Provides easy testing for development environment
          // ---------------------- */}
          <div className="p-4 bg-slate-900/50 rounded-lg border border-slate-800">
            <p className="text-sm text-slate-400 mb-3 text-center">Quick Demo Access</p>
            <div className="grid grid-cols-2 gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handleQuickAccess('admin')}
                className="text-xs border-slate-700 hover:bg-slate-800"
              >
                Demo Admin
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handleQuickAccess('superadmin')}
                className="text-xs border-slate-700 hover:bg-slate-800"
              >
                Demo Super Admin
              </Button>
            </div>
          </div>

          <Separator className="bg-slate-800" />

          {/* ----------------------
          // Admin Login Form
          // Professional username/password authentication
          // ---------------------- */}
          <form onSubmit={handleAdminLogin} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-slate-300">Username</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-500" />
                <Input 
                  id="username"
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-10 bg-slate-900 border-slate-700 text-slate-200 placeholder:text-slate-500 focus:border-primary"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-300">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-500" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 bg-slate-900 border-slate-700 text-slate-200 placeholder:text-slate-500 focus:border-primary"
                  required
                  disabled={isLoading}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent text-slate-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            {/* ----------------------
            // Error Display
            // Shows authentication errors to user
            // ---------------------- */}
            {error && (
              <Alert variant="destructive" className="border-red-800/50 bg-red-950/20">
                <AlertDescription className="text-red-400">{error}</AlertDescription>
              </Alert>
            )}

            {/* ----------------------
            // Login Button
            // Primary authentication action
            // ---------------------- */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white border border-blue-400"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Authenticating...
                </div>
              ) : (
                'Login as Admin'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}