"use client"

import React, { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@src/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@src/components/ui/drawer"
import { Button } from "@src/components/ui/button"
import { Switch } from "@src/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@src/components/ui/card"
import { Badge } from "@src/components/ui/badge"
import { Separator } from "@src/components/ui/separator"
import { useConsent, type ConsentState } from "./ConsentContext"
import { 
  Cookie, 
  Shield, 
  BarChart3, 
  Target, 
  Palette, 
  Info,
  CheckCircle2,
  XCircle
} from "lucide-react"

// ----------------------
// 1. Cookie Category Interface
// Location: /src/features/consent/ConsentPreferences.tsx
// Purpose: Define structure for cookie categories
// ----------------------
interface CookieCategory {
  id: keyof ConsentState
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  required: boolean
  examples: string[]
}

// ----------------------
// 2. Cookie Categories Configuration
// Location: /src/features/consent/ConsentPreferences.tsx
// Purpose: Define all cookie categories with descriptions
// ----------------------
const cookieCategories: CookieCategory[] = [
  {
    id: "analytics",
    title: "Analytics & Performance",
    description: "Help us understand how visitors interact with our website to improve user experience.",
    icon: BarChart3,
    required: false,
    examples: ["Google Analytics", "Page view tracking", "Performance monitoring"]
  },
  {
    id: "ads",
    title: "Marketing & Advertising",
    description: "Used to deliver relevant advertisements and measure campaign effectiveness.",
    icon: Target,
    required: false,
    examples: ["Ad targeting", "Conversion tracking", "Social media pixels"]
  },
  {
    id: "personalization",
    title: "Personalization",
    description: "Remember your preferences and customize content based on your interests.",
    icon: Palette,
    required: false,
    examples: ["Theme preferences", "Language settings", "Content recommendations"]
  }
]

// ----------------------
// 3. ConsentPreferences Component
// Location: /src/features/consent/ConsentPreferences.tsx
// Parent: Triggered from footer link or banner
// Children: Dialog/Drawer with Switch components for each category
// Purpose: Detailed cookie preferences management
// ----------------------
export function ConsentPreferences({ children }: { children: React.ReactNode }) {
  const { consent, setConsent, acceptAll, acceptNecessaryOnly } = useConsent()
  const [localState, setLocalState] = useState(consent)
  const [isDesktop, setIsDesktop] = useState(false)

  // ----------------------
  // Media query hook replacement
  // ----------------------
  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)")
    setIsDesktop(mediaQuery.matches)
    
    const handleChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches)
    mediaQuery.addEventListener("change", handleChange)
    
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  // ----------------------
  // Handle individual category toggle
  // ----------------------
  const handleCategoryToggle = (categoryId: keyof ConsentState, enabled: boolean) => {
    setLocalState((prev: ConsentState) => ({
      ...prev,
      [categoryId]: enabled
    }))
  }

  // ----------------------
  // Save preferences and close dialog
  // ----------------------
  const handleSavePreferences = () => {
    setConsent({
      necessary: localState.necessary,
      analytics: localState.analytics,
      personalization: localState.personalization,
      ads: localState.ads
    })
  }

  // ----------------------
  // Reset to current state when dialog opens
  // ----------------------
  const handleOpenChange = (open: boolean) => {
    if (open) {
      setLocalState(consent)
    }
  }

  // ----------------------
  // Shared content component for both Dialog and Drawer
  // ----------------------
  const PreferencesContent = () => (
    <div className="space-y-6">
      {/* ---------------------- */}
      {/* Header information */}
      {/* ---------------------- */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Cookie className="h-5 w-5 text-zinc-400" />
          <span className="text-sm text-zinc-500">Cookie Management</span>
        </div>
        <p className="text-sm text-zinc-400 leading-relaxed">
          Manage your cookie preferences below. You can enable or disable different types of cookies. 
          Note that disabling some cookies may impact your experience.
        </p>
      </div>

      {/* ---------------------- */}
      {/* Quick actions */}
      {/* ---------------------- */}
      <div className="flex flex-col sm:flex-row gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            const necessaryOnly = {
              ...localState,
              analytics: false,
              ads: false,
              personalization: false,
              acknowledged: true
            }
            setLocalState(necessaryOnly)
          }}
          className="flex-1 border-zinc-700 text-zinc-300 hover:bg-zinc-800"
        >
          <XCircle className="h-4 w-4 mr-2" />
          Reject All Optional
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            const allAccepted = {
              ...localState,
              analytics: true,
              ads: true,
              personalization: true,
              acknowledged: true
            }
            setLocalState(allAccepted)
          }}
          className="flex-1 border-zinc-700 text-zinc-300 hover:bg-zinc-800"
        >
          <CheckCircle2 className="h-4 w-4 mr-2" />
          Accept All
        </Button>
      </div>

      <Separator className="bg-zinc-800" />

      {/* ---------------------- */}
      {/* Cookie categories list */}
      {/* ---------------------- */}
      <div className="space-y-4">
        {cookieCategories.map((category, index) => {
          const Icon = category.icon
          const isEnabled = Boolean(localState[category.id])
          
          return (
            <Card key={category.id} className="border-zinc-800 bg-zinc-950/50">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-800 mt-1">
                      <Icon className="h-4 w-4 text-zinc-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <CardTitle className="text-sm font-semibold text-zinc-100">
                          {category.title}
                        </CardTitle>
                        {category.required && (
                          <Badge variant="outline" className="border-zinc-700 text-zinc-400 text-xs">
                            Required
                          </Badge>
                        )}
                      </div>
                      <CardDescription className="text-xs text-zinc-400 leading-relaxed">
                        {category.description}
                      </CardDescription>
                    </div>
                  </div>
                  
                  {/* ---------------------- */}
                  {/* Category toggle switch */}
                  {/* ---------------------- */}
                  <Switch
                    checked={isEnabled}
                    onCheckedChange={(checked) => handleCategoryToggle(category.id, checked)}
                    disabled={category.required}
                    className="data-[state=checked]:bg-yellow-600"
                  />
                </div>
              </CardHeader>
              
              {/* ---------------------- */}
              {/* Examples of cookies in this category */}
              {/* ---------------------- */}
              <CardContent className="pt-0">
                <div className="space-y-2">
                  <div className="flex items-center gap-1 text-xs text-zinc-500">
                    <Info className="h-3 w-3" />
                    <span>Examples:</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {category.examples.map((example, index) => (
                      <Badge 
                        key={`${category.id}-${example}`} 
                        variant="secondary" 
                        className="text-xs bg-zinc-800 text-zinc-400 border-zinc-700"
                      >
                        {example}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* ---------------------- */}
      {/* Additional information */}
      {/* ---------------------- */}
      <div className="rounded-lg border border-zinc-800 bg-zinc-950/30 p-4">
        <div className="flex items-start gap-2">
          <Info className="h-4 w-4 text-zinc-400 mt-0.5 flex-shrink-0" />
          <div className="text-xs text-zinc-500 leading-relaxed">
            <p className="mb-2">
              Your preferences are stored locally and will be remembered for future visits. 
              You can change these settings at any time.
            </p>
            <p>
              For more information about how we use cookies, please read our{" "}
              <a href="/legal/cookies" className="text-zinc-300 hover:text-zinc-100 underline underline-offset-2">
                Cookie Policy
              </a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  )

  // ----------------------
  // Render appropriate component based on screen size
  // Desktop: Dialog, Mobile: Drawer
  // ----------------------
  if (isDesktop) {
    return (
      <Dialog onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>
          {children}
        </DialogTrigger>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-zinc-950 border-zinc-800">
          <DialogHeader>
            <DialogTitle className="text-zinc-100">Cookie Preferences</DialogTitle>
            <DialogDescription className="text-zinc-400">
              Customize your cookie settings to control your privacy and experience.
            </DialogDescription>
          </DialogHeader>
          
          <PreferencesContent />
          
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={handleSavePreferences}
              className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
            >
              Save Preferences
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer onOpenChange={handleOpenChange}>
      <DrawerTrigger asChild>
        {children}
      </DrawerTrigger>
      <DrawerContent className="bg-zinc-950 border-zinc-800 max-h-[90vh]">
        <DrawerHeader>
          <DrawerTitle className="text-zinc-100">Cookie Preferences</DrawerTitle>
          <DrawerDescription className="text-zinc-400">
            Customize your cookie settings to control your privacy and experience.
          </DrawerDescription>
        </DrawerHeader>
        
        <div className="px-4 overflow-y-auto flex-1">
          <PreferencesContent />
        </div>
        
        <DrawerFooter>
          <Button
            onClick={handleSavePreferences}
            className="bg-yellow-600 hover:bg-yellow-500 text-zinc-900 font-medium"
          >
            Save Preferences
          </Button>
          <DrawerClose asChild>
            <Button variant="outline" className="border-zinc-700 text-zinc-300">
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

/* End of ConsentPreferences */