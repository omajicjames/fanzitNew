import React from "react"
import { Metadata } from "next"
import Link from "next/link"
import { ConsentPreferences } from "@src/features/consent/ConsentPreferences"
import { Button } from "@src/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@src/components/ui/card"
import { Badge } from "@src/components/ui/badge"
import { Separator } from "@src/components/ui/separator"
import { Cookie, Shield, Settings, Info, AlertTriangle } from "lucide-react"

// ----------------------
// 1. Page Metadata
// ----------------------
export const metadata: Metadata = {
  title: "Cookie Policy | Fanzit",
  description: "Learn about how Fanzit uses cookies and similar technologies to enhance your experience. Manage your cookie preferences and understand your privacy rights.",
  keywords: ["cookies", "privacy", "tracking", "analytics", "GDPR", "consent"],
  openGraph: {
    title: "Cookie Policy | Fanzit",
    description: "Understand how Fanzit uses cookies and manage your preferences.",
    type: "website",
  },
}

// ----------------------
// 2. Cookie Categories Data
// Location: /app/legal/cookies/page.tsx
// Purpose: Define cookie categories for display
// ----------------------
const cookieCategories = [
  {
    id: "necessary",
    name: "Strictly Necessary Cookies",
    description: "These cookies are essential for the website to function properly. They cannot be disabled.",
    required: true,
    icon: Shield,
    examples: [
      "Authentication tokens",
      "Security preferences",
      "Session management",
      "Load balancing"
    ]
  },
  {
    id: "functional",
    name: "Functional Cookies",
    description: "These cookies enable enhanced functionality and personalization, such as remembering your preferences.",
    required: false,
    icon: Settings,
    examples: [
      "Language preferences",
      "Theme settings",
      "User interface customizations",
      "Accessibility settings"
    ]
  },
  {
    id: "analytics",
    name: "Analytics Cookies",
    description: "These cookies help us understand how visitors interact with our website by collecting anonymous information.",
    required: false,
    icon: Info,
    examples: [
      "Google Analytics",
      "Page view tracking",
      "User behavior analysis",
      "Performance monitoring"
    ]
  },
  {
    id: "ads",
    name: "Advertising Cookies",
    description: "These cookies are used to deliver relevant advertisements and measure the effectiveness of advertising campaigns.",
    required: false,
    icon: AlertTriangle,
    examples: [
      "Targeted advertising",
      "Ad performance tracking",
      "Cross-site tracking",
      "Marketing analytics"
    ]
  }
]

// ----------------------
// 3. Main Cookie Policy Page Component
// Location: /app/legal/cookies/page.tsx
// Parent: App router layout
// Children: ConsentPreferences dialog, cookie category cards
// Purpose: Display comprehensive cookie policy and management
// ----------------------
export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950">
      {/* ---------------------- */}
      {/* Page Header */}
      {/* ---------------------- */}
      <div className="border-b border-zinc-800 bg-zinc-950/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-yellow-600 to-yellow-500 flex items-center justify-center">
                <Cookie className="h-5 w-5 text-zinc-900" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-zinc-100">Cookie Policy</h1>
                <p className="text-zinc-400 mt-1">Last updated: {new Date().toLocaleDateString()}</p>
              </div>
            </div>
            
            <p className="text-lg text-zinc-300 leading-relaxed">
              This Cookie Policy explains how Fanzit uses cookies and similar technologies to recognize you when you visit our platform. 
              It explains what these technologies are and why we use them, as well as your rights to control our use of them.
            </p>
            
            {/* ---------------------- */}
            {/* Quick Actions */}
            {/* ---------------------- */}
            <div className="flex flex-wrap gap-3 mt-6">
              <ConsentPreferences>
                <Button className="bg-yellow-600 hover:bg-yellow-700 text-zinc-900">
                  <Settings className="h-4 w-4 mr-2" />
                  Manage Cookie Preferences
                </Button>
              </ConsentPreferences>
              
              <Button variant="outline" asChild>
                <Link href="/legal/privacy">
                  <Shield className="h-4 w-4 mr-2" />
                  Privacy Policy
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* ---------------------- */}
      {/* Main Content */}
      {/* ---------------------- */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-12">
          
          {/* ---------------------- */}
          {/* What Are Cookies Section */}
          {/* ---------------------- */}
          <section>
            <h2 className="text-2xl font-semibold text-zinc-100 mb-6">What Are Cookies?</h2>
            <div className="prose prose-zinc prose-invert max-w-none">
              <p className="text-zinc-300 leading-relaxed mb-4">
                Cookies are small data files that are placed on your computer or mobile device when you visit a website. 
                Cookies are widely used by website owners to make their websites work, or to work more efficiently, 
                as well as to provide reporting information.
              </p>
              <p className="text-zinc-300 leading-relaxed">
                Cookies set by the website owner (in this case, Fanzit) are called "first-party cookies." 
                Cookies set by parties other than the website owner are called "third-party cookies." 
                Third-party cookies enable third-party features or functionality to be provided on or through the website.
              </p>
            </div>
          </section>
          
          {/* ---------------------- */}
          {/* Cookie Categories */}
          {/* ---------------------- */}
          <section>
            <h2 className="text-2xl font-semibold text-zinc-100 mb-6">Types of Cookies We Use</h2>
            <div className="grid gap-6">
              {cookieCategories.map((category) => {
                const IconComponent = category.icon
                return (
                  <Card key={category.id} className="border-zinc-800 bg-zinc-900/50">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg bg-zinc-800 flex items-center justify-center">
                            <IconComponent className="h-5 w-5 text-zinc-400" />
                          </div>
                          <div>
                            <CardTitle className="text-zinc-100 flex items-center gap-2">
                              {category.name}
                              {category.required && (
                                <Badge variant="secondary" className="bg-yellow-600/20 text-yellow-400 border-yellow-600/30">
                                  Required
                                </Badge>
                              )}
                            </CardTitle>
                            <CardDescription className="text-zinc-400 mt-1">
                              {category.description}
                            </CardDescription>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div>
                        <h4 className="text-sm font-medium text-zinc-300 mb-2">Examples:</h4>
                        <ul className="text-sm text-zinc-400 space-y-1">
                          {category.examples.map((example, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <div className="h-1 w-1 rounded-full bg-zinc-600" />
                              {example}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </section>
          
          {/* ---------------------- */}
          {/* Your Rights Section */}
          {/* ---------------------- */}
          <section>
            <h2 className="text-2xl font-semibold text-zinc-100 mb-6">Your Cookie Rights</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-zinc-800 bg-zinc-900/50">
                <CardHeader>
                  <CardTitle className="text-zinc-100 flex items-center gap-2">
                    <Settings className="h-5 w-5 text-yellow-500" />
                    Manage Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-zinc-300 text-sm leading-relaxed mb-4">
                    You can control and manage cookies in various ways. You have the right to choose whether or not to accept cookies.
                  </p>
                  <ConsentPreferences>
                    <Button variant="outline" size="sm" className="w-full">
                      Open Cookie Settings
                    </Button>
                  </ConsentPreferences>
                </CardContent>
              </Card>
              
              <Card className="border-zinc-800 bg-zinc-900/50">
                <CardHeader>
                  <CardTitle className="text-zinc-100 flex items-center gap-2">
                    <Shield className="h-5 w-5 text-blue-500" />
                    Browser Settings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-zinc-300 text-sm leading-relaxed mb-4">
                    You can also control cookies through your browser settings. Most browsers allow you to block or delete cookies.
                  </p>
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <Link href="https://www.allaboutcookies.org/manage-cookies" target="_blank">
                      Learn More
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </section>
          
          {/* ---------------------- */}
          {/* Contact Information */}
          {/* ---------------------- */}
          <section>
            <Separator className="bg-zinc-800 mb-8" />
            <div className="text-center">
              <h2 className="text-xl font-semibold text-zinc-100 mb-4">Questions About Cookies?</h2>
              <p className="text-zinc-300 mb-6">
                If you have any questions about our use of cookies or this Cookie Policy, please contact us.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Button variant="outline" asChild>
                  <Link href="/contact">
                    Contact Support
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/legal/privacy">
                    Privacy Policy
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/legal/terms">
                    Terms of Service
                  </Link>
                </Button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

/* End of Cookie Policy Page */