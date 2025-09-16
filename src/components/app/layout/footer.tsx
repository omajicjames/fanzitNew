"use client"

import React from "react"
import Link from "next/link"
import { ConsentPreferences } from "@src/features/consent/ConsentPreferences"
import { Button } from "@src/components/ui/button"
import { Separator } from "@src/components/ui/separator"
import { Cookie, Shield, ExternalLink } from "lucide-react"

// ----------------------
// 1. Footer Component
// Location: /src/components/app/layout/footer.tsx
// Parent: Can be used in any layout or page
// Children: ConsentPreferences dialog trigger, legal links
// Purpose: Site footer with cookie preferences and legal links
// ----------------------
export function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-8">
        {/* ---------------------- */}
        {/* Main footer content */}
        {/* ---------------------- */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* ---------------------- */}
          {/* Brand section */}
          {/* ---------------------- */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-yellow-600 to-yellow-500 flex items-center justify-center">
                <span className="text-zinc-900 font-bold text-sm">F</span>
              </div>
              <span className="text-lg font-semibold text-zinc-100">Fanzit</span>
            </div>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Premium content platform connecting creators with their audience through exclusive content and meaningful interactions.
            </p>
          </div>
          
          {/* ---------------------- */}
          {/* Platform links */}
          {/* ---------------------- */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-zinc-100">Platform</h3>
            <nav className="space-y-2">
              <Link href="/" className="block text-sm text-zinc-400 hover:text-zinc-300 transition-colors">
                Home
              </Link>
              <Link href="/trending" className="block text-sm text-zinc-400 hover:text-zinc-300 transition-colors">
                Trending
              </Link>
              <Link href="/creator" className="block text-sm text-zinc-400 hover:text-zinc-300 transition-colors">
                Creator Tools
              </Link>
              <Link href="/analytics" className="block text-sm text-zinc-400 hover:text-zinc-300 transition-colors">
                Analytics
              </Link>
            </nav>
          </div>
          
          {/* ---------------------- */}
          {/* Support links */}
          {/* ---------------------- */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-zinc-100">Support</h3>
            <nav className="space-y-2">
              <Link href="/help" className="block text-sm text-zinc-400 hover:text-zinc-300 transition-colors">
                Help Center
              </Link>
              <Link href="/contact" className="block text-sm text-zinc-400 hover:text-zinc-300 transition-colors">
                Contact Us
              </Link>
              <Link href="/community" className="block text-sm text-zinc-400 hover:text-zinc-300 transition-colors">
                Community
              </Link>
              <Link href="/status" className="block text-sm text-zinc-400 hover:text-zinc-300 transition-colors">
                System Status
              </Link>
            </nav>
          </div>
          
          {/* ---------------------- */}
          {/* Legal links */}
          {/* ---------------------- */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-zinc-100">Legal</h3>
            <nav className="space-y-2">
              <Link href="/legal/terms" className="block text-sm text-zinc-400 hover:text-zinc-300 transition-colors">
                Terms of Service
              </Link>
              <Link href="/legal/privacy" className="block text-sm text-zinc-400 hover:text-zinc-300 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/legal/cookies" className="block text-sm text-zinc-400 hover:text-zinc-300 transition-colors">
                Cookie Policy
              </Link>
              <Link href="/legal/dmca" className="block text-sm text-zinc-400 hover:text-zinc-300 transition-colors">
                DMCA Policy
              </Link>
            </nav>
          </div>
        </div>
        
        <Separator className="my-8 bg-zinc-800" />
        
        {/* ---------------------- */}
        {/* Bottom footer section */}
        {/* ---------------------- */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* ---------------------- */}
          {/* Copyright and company info */}
          {/* ---------------------- */}
          <div className="flex items-center gap-4 text-sm text-zinc-500">
            <span>© {currentYear} Fanzit. All rights reserved.</span>
            <div className="hidden md:flex items-center gap-1">
              <Shield className="h-3 w-3" />
              <span>Secure Platform</span>
            </div>
          </div>
          
          {/* ---------------------- */}
          {/* Cookie preferences and privacy controls */}
          {/* ---------------------- */}
          <div className="flex items-center gap-4">
            {/* ---------------------- */}
            {/* Cookie preferences trigger */}
            {/* Uses ConsentPreferences dialog component */}
            {/* ---------------------- */}
            <ConsentPreferences>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-xs text-zinc-400 hover:text-zinc-300 h-auto p-0 font-normal underline underline-offset-2"
              >
                <Cookie className="h-3 w-3 mr-1" />
                Cookie Preferences
              </Button>
            </ConsentPreferences>
            
            {/* ---------------------- */}
            {/* Privacy settings link */}
            {/* ---------------------- */}
            <Link 
              href="/legal/privacy" 
              className="text-xs text-zinc-400 hover:text-zinc-300 underline underline-offset-2 flex items-center gap-1"
            >
              <Shield className="h-3 w-3" />
              Privacy Settings
              <ExternalLink className="h-2 w-2" />
            </Link>
          </div>
        </div>
        
        {/* ---------------------- */}
        {/* Additional compliance info for mobile */}
        {/* ---------------------- */}
        <div className="md:hidden mt-4 pt-4 border-t border-zinc-800">
          <p className="text-xs text-zinc-500 text-center leading-relaxed">
            By using Fanzit, you agree to our use of cookies for analytics and personalization. 
            You can manage your preferences using the "Cookie Preferences" link above.
          </p>
        </div>
      </div>
    </footer>
  )
}

// ----------------------
// 2. Compact Footer Component
// Location: /src/components/app/layout/footer.tsx
// Purpose: Minimal footer for specific layouts
// ----------------------
export function CompactFooter() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950/30 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className="text-xs text-zinc-500">
            © {currentYear} Fanzit. All rights reserved.
          </span>
          
          <div className="flex items-center gap-4">
            <ConsentPreferences>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-xs text-zinc-500 hover:text-zinc-400 h-auto p-0 font-normal"
              >
                Cookie Preferences
              </Button>
            </ConsentPreferences>
            
            <Link 
              href="/legal/privacy" 
              className="text-xs text-zinc-500 hover:text-zinc-400"
            >
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

/* End of Footer */