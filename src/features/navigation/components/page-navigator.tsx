"use client"

import { Button } from "@src/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@src/components/ui/card"
import { useRouter } from "next/navigation"
import { Home, MessageCircle, Wallet, BarChart3, Upload, User, LogOut } from "lucide-react"

export function PageNavigator() {
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/auth")
  }

  const pages = [
    { name: "Home Feed", path: "/", icon: Home, description: "Main three-column layout with content feed" },
    { name: "Messages", path: "/messages", icon: MessageCircle, description: "Full messaging interface" },
    { name: "Creator Upload", path: "/creator/upload", icon: Upload, description: "Upload new content" },
    { name: "Creator Profile", path: "/creator/profile/1", icon: User, description: "View creator profile page" },
    { name: "Wallet", path: "/wallet", icon: Wallet, description: "Earnings and payment management" },
    { name: "Analytics", path: "/analytics", icon: BarChart3, description: "Performance metrics dashboard" },
  ]

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2">
          <Home className="h-5 w-5" />
          Page Navigator
        </CardTitle>
        <p className="text-sm text-muted-foreground">Quick access to all platform pages for testing</p>
      </CardHeader>
      <CardContent className="space-y-3">
        {pages.map((page) => (
          <div key={page.path} className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center gap-3">
              <page.icon className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="font-medium">{page.name}</p>
                <p className="text-sm text-muted-foreground">{page.description}</p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={() => router.push(page.path)}>
              Visit
            </Button>
          </div>
        ))}

        <div className="pt-4 border-t">
          <Button variant="destructive" size="sm" onClick={handleLogout} className="w-full">
            <LogOut className="h-4 w-4 mr-2" />
            Logout & Return to Auth
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
