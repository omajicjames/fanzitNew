"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@src/lib/utils";

// ----------------------
// Communications Pills Component
// Location: /src/components/admin/CommunicationsPills.tsx
// Purpose: Tab navigation for communications section
// Parent: CommunicationsTabsLayout
// Children: Individual pill links for each communications subsection
// ----------------------

const COMMUNICATIONS_PILLS = [
  { label: "All Communications", href: "/admin/communications" },
  { label: "Announcements", href: "/admin/communications/announcements" },
  { label: "Messages", href: "/admin/communications/messages" },
  { label: "Email", href: "/admin/communications/email" },
  { label: "Notifications", href: "/admin/communications/notifications" },
] as const;

export function CommunicationsPills() {
  const pathname = usePathname();

  return (
    <div className="flex flex-wrap gap-2">
      {COMMUNICATIONS_PILLS.map((pill) => {
        const isActive = pathname === pill.href || 
          (pill.href !== "/admin/communications" && pathname.startsWith(pill.href));
        
        return (
          <Link
            key={pill.href}
            href={pill.href}
            className={cn(
              "px-3 py-1.5 text-sm font-medium rounded-md transition-colors",
              isActive
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            )}
          >
            {pill.label}
          </Link>
        );
      })}
    </div>
  );
}
