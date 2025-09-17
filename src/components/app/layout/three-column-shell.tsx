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
    <div className={cn("min-h-screen bg-black", className)}>
      {/* ----------------------
      // Desktop Layout - Three Columns
      // Hidden on mobile (lg:hidden), visible on large screens (lg:flex)
      // ---------------------- */}
      <div className="hidden lg:flex h-screen">
        {/* Left Sidebar - Navigation */}
        <aside className="w-64 flex-shrink-0 border-r border-gray-800 bg-gray-900 overflow-y-auto">
          <div className="h-full">{leftColumn}</div>
        </aside>

        {/* Center Content - Main Feed */}
        <main className="flex-1 overflow-y-auto bg-black">
          <div className="max-w-2xl mx-auto">{centerColumn}</div>
        </main>

        {/* Right Panel - Messaging/Subscriptions */}
        <aside className="w-80 flex-shrink-0 border-l border-gray-800 bg-gray-900 overflow-y-auto">
          <div className="h-full">{rightColumn}</div>
        </aside>
      </div>

      {/* ----------------------
      // Mobile Layout - Single Column
      // Visible on mobile (lg:hidden), hidden on large screens
      // ---------------------- */}
      <div className="lg:hidden fixed inset-0 bg-black">
        <div className="flex flex-col h-full">
          {/* Mobile header */}
          <header className="border-b border-gray-800 p-4 bg-gray-900">
            <h1 className="text-xl font-bold text-white">CreatorHub</h1>
          </header>

          {/* Mobile content */}
          <div className="flex-1 overflow-y-auto bg-black">{centerColumn}</div>

          {/* Mobile bottom navigation */}
          <nav className="border-t border-gray-800 p-4 bg-gray-900">
            <div className="flex justify-around">
              <button className="text-white hover:text-blue-400">Home</button>
              <button className="text-white hover:text-blue-400">Explore</button>
              <button className="text-white hover:text-blue-400">Messages</button>
              <button className="text-white hover:text-blue-400">Profile</button>
            </div>
          </nav>
        </div>
      </div>
    </div>
  )
}
