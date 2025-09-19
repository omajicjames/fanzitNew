"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ADMIN_SECTION_PILLS, getAdminSection, isActive } from "@src/config/nav";
import { cn } from "@src/lib/utils";

// ----------------------
// Admin Pills Component
// Location: /src/components/admin/AdminPills.tsx
// Purpose: Contextual navigation pills for admin subsections
// Note: Mobile-first design with object-oriented structure
// ----------------------

class AdminPillsService {
  private pathname: string;
  private currentSection: string;

  constructor(pathname: string) {
    this.pathname = pathname;
    this.currentSection = getAdminSection(pathname);
  }

  private getPills() {
    return ADMIN_SECTION_PILLS[this.currentSection as keyof typeof ADMIN_SECTION_PILLS] || [];
  }

  private isActivePill(href: string): boolean {
    return isActive(this.pathname, href);
  }

  private renderPill(pill: { label: string; href: string }) {
    const active = this.isActivePill(pill.href);
    
    return (
      <Link
        key={pill.href}
        href={pill.href}
        aria-current={active ? "page" : undefined}
        className={cn(
          "inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200",
          "hover:scale-105 active:scale-95",
          // Mobile-first responsive design
          "text-xs sm:text-sm px-2 sm:px-3",
          // Active state styling
          active
            ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
            : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
        )}
      >
        {pill.label}
      </Link>
    );
  }

  public render() {
    const pills = this.getPills();
    
    // Don't render if no pills or only one pill
    if (!pills || pills.length <= 1) return null;

    return (
      <nav 
        className="flex flex-wrap gap-2 p-1 bg-muted/20 rounded-lg border border-border/50"
        role="tablist"
        aria-label={`${this.currentSection} navigation`}
      >
        {pills.map((pill) => this.renderPill(pill))}
      </nav>
    );
  }
}

// ----------------------
// React Component Wrapper
// Purpose: Provides React component interface for the class
// ----------------------
export function AdminPills() {
  const pathname = usePathname();
  const service = new AdminPillsService(pathname);
  return service.render();
}
