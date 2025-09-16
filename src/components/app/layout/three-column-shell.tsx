"use client"

import type { ReactNode } from "react"
import { cn } from "@src/lib/utils"

interface ThreeColumnShellProps {
  leftColumn: ReactNode
  centerColumn: ReactNode
  rightColumn: ReactNode
  className?: string
}

export function ThreeColumnShell({ leftColumn, centerColumn, rightColumn, className }: ThreeColumnShellProps) {
  return (
    <div className={cn("min-h-screen bg-background", className)}>
      {/* Main container with three columns */}
      <div className="flex h-screen">
        {/* Left Sidebar - Navigation */}
        <aside className="w-64 flex-shrink-0 border-r border-border bg-sidebar overflow-y-auto">
          <div className="h-full">{leftColumn}</div>
        </aside>

        {/* Center Content - Main Feed */}
        <main className="flex-1 overflow-y-auto bg-background">
          <div className="max-w-2xl mx-auto">{centerColumn}</div>
        </main>

        {/* Right Panel - Messaging/Subscriptions */}
        <aside className="w-80 flex-shrink-0 border-l border-border bg-card overflow-y-auto">
          <div className="h-full">{rightColumn}</div>
        </aside>
      </div>

      {/* Mobile responsive overlay */}
      <div className="lg:hidden fixed inset-0 bg-background">
        <div className="flex flex-col h-full">
          {/* Mobile header */}
          <header className="border-b border-border p-4 bg-sidebar">
            <h1 className="text-xl font-bold text-sidebar-foreground">CreatorHub</h1>
          </header>

          {/* Mobile content */}
          <div className="flex-1 overflow-y-auto">{centerColumn}</div>

          {/* Mobile bottom navigation */}
          <nav className="border-t border-border p-4 bg-sidebar">
            <div className="flex justify-around">
              <button className="text-sidebar-foreground hover:text-sidebar-primary">Home</button>
              <button className="text-sidebar-foreground hover:text-sidebar-primary">Explore</button>
              <button className="text-sidebar-foreground hover:text-sidebar-primary">Messages</button>
              <button className="text-sidebar-foreground hover:text-sidebar-primary">Profile</button>
            </div>
          </nav>
        </div>
      </div>
    </div>
  )
}
