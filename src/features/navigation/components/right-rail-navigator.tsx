"use client";

import { useRouter } from "next/navigation";
import { Card } from "@src/components/ui/card";
import { Button } from "@src/components/ui/button";
import {
  Home,
  MessageCircle,
  Upload,
  User,
  Wallet as WalletIcon,
  BarChart3,
  LogOut,
} from "lucide-react";

// ----------------------
// RightRailNavigator Component
// Location: /src/features/navigation/components/right-rail-navigator.tsx
// Parent: Right rail container in protected layout or rail component
// Children: Card with navigation buttons and logout functionality
// Purpose: Compact version of Page Navigator for right rail placement
// ----------------------
export default function RightRailNavigator() {
  const router = useRouter();

  // ----------------------
  // Available navigation pages
  // Keep these in-sync with Page Navigator component
  // Each page includes name, path, icon, and description
  // ----------------------
  const pages = [
    { name: "Home Feed", path: "/", icon: Home, description: "Main three-column layout with content feed" },
    { name: "Messages", path: "/messages", icon: MessageCircle, description: "Full messaging interface" },
    { name: "Creator Upload", path: "/creator/upload", icon: Upload, description: "Upload new content" },
    { name: "Creator Profile", path: "/creator/profile/1", icon: User, description: "View creator profile page" },
    { name: "Wallet", path: "/wallet", icon: WalletIcon, description: "Earnings and payment management" },
    { name: "Analytics", path: "/analytics", icon: BarChart3, description: "Performance metrics dashboard" },
  ];

  // ----------------------
  // Navigation handler function
  // Uses Next.js router for programmatic navigation
  // ----------------------
  const handleGo = (path: string) => router.push(path);
  
  // ----------------------
  // Logout handler function
  // Clears user session and redirects to authentication
  // ----------------------
  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/auth");
  };

  return (
    <aside
      aria-label="Page Navigator"
      className="
        sticky top-4
        max-w-full
        w-full
        max-w-sm
      "
    >
      {/* ---------------------- */}
      {/* Main navigation card container */}
      {/* Compact design with backdrop blur and rounded corners */}
      {/* ---------------------- */}
      <Card
        className="
          w-full
          overflow-hidden
          shadow-card
          rounded-2xl
          border-border/60
          bg-card/80
          backdrop-blur
        "
      >
        {/* ---------------------- */}
        {/* Header section with title and description */}
        {/* ---------------------- */}
        <div className="px-4 py-3 border-b border-border/50">
          <div className="text-base font-semibold leading-none">Page Navigatos</div>
          <div className="mt-1 text-xs text-muted-foreground">
            Quick access to key areas
          </div>
        </div>

        {/* ---------------------- */}
        {/* Navigation items list */}
        {/* Scrollable container with compact spacing */}
        {/* ---------------------- */}
        <div
          className="
            max-h-[60vh] overflow-auto
            p-2
            space-y-2
          "
        >
          {pages.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.name}
                className="
                  group
                  rounded-xl border border-border/50
                  bg-background/60
                  hover:bg-background/80
                  transition
                  px-3 py-3
                  flex items-start gap-3
                "
              >
                {/* ---------------------- */}
                {/* Navigation item icon */}
                {/* ---------------------- */}
                <div className="mt-0.5 shrink-0">
                  <Icon className="h-4 w-4 opacity-80" />
                </div>

                {/* ---------------------- */}
                {/* Navigation item content */}
                {/* Name and description with text truncation */}
                {/* ---------------------- */}
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium leading-tight line-clamp-1">
                    {p.name}
                  </div>
                  <div className="text-xs text-muted-foreground line-clamp-1">
                    {p.description}
                  </div>
                </div>

                {/* ---------------------- */}
                {/* Visit button for navigation */}
                {/* Compact size for rail layout */}
                {/* ---------------------- */}
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 px-2 text-xs"
                  onClick={() => handleGo(p.path)}
                >
                  Visit
                </Button>
              </div>
            );
          })}
        </div>

        {/* ---------------------- */}
        {/* Footer section with logout button */}
        {/* Separated by border and full-width destructive button */}
        {/* ---------------------- */}
        <div className="p-3 border-t border-border/50">
          <Button
            variant="destructive"
            className="w-full h-8 text-xs"
            onClick={handleLogout}
          >
            <LogOut className="h-3.5 w-3.5 mr-1.5" /> Logout
          </Button>
        </div>
      </Card>
    </aside>
  );
}

/* End of RightRailNavigator Component */