"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@src/components/ui/button"
import { Input } from "@src/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@src/components/ui/card"
import { Label } from "@src/components/ui/label"
import { Alert, AlertDescription } from "@src/components/ui/alert"
import { Shield, Lock } from "lucide-react"
import { useAuth } from "@src/features/auth/components/auth-provider"

// ----------------------
// Admin Login Page
// Location: /app/admin-login/page.tsx
// Purpose: Simple admin authentication for testing admin functionality
// Access: Public page for admin login testing
// Note: Uses predefined admin codes and sets isAdmin flag for development testing
// ----------------------

export default function AdminLoginPage() {
  const [adminCode, setAdminCode] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const { login } = useAuth()

  // ----------------------
  // Admin Login Handler
  // Simple testing mechanism for admin access
  // Uses predefined admin code for testing
  // ----------------------
  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // Simple admin code for testing
      if (adminCode === "admin123" || adminCode === "test-admin") {
        // Create admin user directly without using auth provider login
        // This prevents conflicts with the default user creation
        const adminUser = {
          id: "admin-test-user",
          email: "admin@fanzit.test",
          name: "Test Admin",
          avatar: "/placeholder-logo.svg",
          isCreator: false, // Admin doesn't need to be a creator
          isAdmin: true, // This enables admin access
          subscriptions: [],
          createdAt: new Date().toISOString()
        }

        // Store the admin user data directly in localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem("user", JSON.stringify(adminUser))
        }

        // Simulate a brief delay for better UX
        await new Promise(resolve => setTimeout(resolve, 500))
        
        // Force a page reload to ensure the auth context picks up the new user
        window.location.href = "/admin"
      } else {
        setError("Invalid admin code. Use 'admin123' or 'test-admin' for testing.")
      }
    } catch (err) {
      setError("Failed to login as admin. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-2">
          <div className="flex justify-center">
            <div className="p-3 bg-primary/10 rounded-full">
              <Shield className="h-8 w-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl">Admin Login</CardTitle>
          <p className="text-muted-foreground text-sm">
            Testing access for admin functionality
          </p>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleAdminLogin} className="space-y-4">
            {/* ----------------------
            // Admin Code Input
            // Simple testing mechanism
            // ---------------------- */}
            <div className="space-y-2">
              <Label htmlFor="adminCode" className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                Admin Code
              </Label>
              <Input
                id="adminCode"
                type="password"
                placeholder="Enter admin code"
                value={adminCode}
                onChange={(e) => setAdminCode(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            {/* ----------------------
            // Error Display
            // ---------------------- */}
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* ----------------------
            // Login Button
            // ---------------------- */}
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading || !adminCode.trim()}
            >
              {isLoading ? "Logging in..." : "Login as Admin"}
            </Button>
          </form>

          {/* ----------------------
          // Testing Instructions
          // ---------------------- */}
          <div className="mt-6 p-4 bg-muted/50 rounded-lg">
            <h4 className="font-medium text-sm mb-2">Testing Instructions:</h4>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Use code: <code className="bg-background px-1 rounded">admin123</code></li>
              <li>• Or use: <code className="bg-background px-1 rounded">test-admin</code></li>
              <li>• This will create a test admin user</li>
              <li>• You'll be redirected to <code className="bg-background px-1 rounded">/admin</code></li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}