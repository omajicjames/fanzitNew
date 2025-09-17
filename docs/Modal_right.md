the exact same Page Navigator, but embedded in (and visually sized for) the right rail shown in your first screenshot. Here’s a drop-in, compact version that reuses your existing pages list and behaviors, but confines itself to the right column, avoids the full-screen overlay, and won’t look cramped.

1) New compact component (right rail)

File: src/features/navigation/components/right-rail-navigator.tsx

"use client";

import { useRouter } from "next/navigation";
import { Card } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import {
  Home,
  MessageCircle,
  Upload,
  User,
  Wallet as WalletIcon,
  BarChart3,
  LogOut,
} from "lucide-react";

/**
 * RightRailNavigator
 * - Same content as Page Navigator, sized for the right rail
 * - Sticky, scrollable, compact typography/spacing
 * - No modal overlay; lives inside the rail container
 */
export default function RightRailNavigator() {
  const router = useRouter();

  // Keep these in-sync with your Page Navigator doc
  const pages = [
    { name: "Home Feed", path: "/", icon: Home, description: "Main three-column layout with content feed" },
    { name: "Messages", path: "/messages", icon: MessageCircle, description: "Full messaging interface" },
    { name: "Creator Upload", path: "/creator/upload", icon: Upload, description: "Upload new content" },
    { name: "Creator Profile", path: "/creator/profile/1", icon: User, description: "View creator profile page" },
    { name: "Wallet", path: "/wallet", icon: WalletIcon, description: "Earnings and payment management" },
    { name: "Analytics", path: "/analytics", icon: BarChart3, description: "Performance metrics dashboard" },
  ];

  const handleGo = (path: string) => router.push(path);
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
        [--rail-w:theme(spacing.88)]  /* ~352px; respects tight rails */
      "
    >
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
        {/* Header */}
        <div className="px-4 py-3 border-b border-border/50">
          <div className="text-base font-semibold leading-none">Page Navigator</div>
          <div className="mt-1 text-xs text-muted-foreground">
            Quick access to key areas
          </div>
        </div>

        {/* List */}
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
                <div className="mt-0.5 shrink-0">
                  <Icon className="h-4 w-4 opacity-80" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium leading-tight line-clamp-1">
                    {p.name}
                  </div>
                  <div className="text-xs text-muted-foreground line-clamp-1">
                    {p.description}
                  </div>
                </div>

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

        {/* Footer / Logout */}
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


Why this fits nicely:

Compact scale: text-sm/text-xs, tighter paddings, and h-7 buttons prevent crowding.

Rail-friendly container: sticky top-4, max-h-[60vh], and overflow-auto keep the card within the visible right column and scroll its inside content instead of the whole page.

One-line truncation: line-clamp-1 on labels/descriptions avoids wrapping that makes the rail feel cramped.

2) Use it in your right rail

Wherever you render your right column (e.g., app/(protected)/layout.tsx or a rail component):

import RightRailNavigator from "@/src/features/navigation/components/right-rail-navigator";

export function RightRail() {
  return (
    <div className="w-full max-w-[352px] mx-auto space-y-4">
      {/* other right-rail widgets... */}
      <RightRailNavigator />
      {/* … */}
    </div>
  );
}