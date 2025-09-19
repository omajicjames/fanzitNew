"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SYSTEM_PILLS, isActive } from "@src/config/nav";
import { cn } from "@src/lib/utils";

export function SystemPills() {
  const pathname = usePathname();

  return (
    // ----------------------
    // 1. System Pills Navigation Container
    // ----------------------
    // Parent: Admin system pages (maintenance, logs, backups, settings)
    // Location: /Users/wizguy16/Downloads/fanzit/src/components/admin/SystemPills.tsx
    // Children: Individual pill navigation links
    // ----------------------
    <nav className="flex space-x-1">
      {SYSTEM_PILLS.map((tab: any) => {
        const active = isActive(pathname, tab.href);
        return (
          // ----------------------
          // 2. Individual Pill Link Component
          // ----------------------
          // Parent: SystemPills navigation container
          // Location: /Users/wizguy16/Downloads/fanzit/src/components/admin/SystemPills.tsx (inside map)
          // Children: Tab label text
          // ----------------------
          <Link
            key={tab.href}
            href={tab.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "rounded-full px-3 py-1.5 text-sm",
              active
                ? "bg-primary text-primary-foreground"
                : "bg-card text-foreground hover:bg-card/80"
            )}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}