"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ADMIN_SECTION_PILLS, getAdminSection, isActive } from "@src/config/nav";
import { cn } from "@src/lib/utils";

// ----------------------
// Admin Pill Navigation Component
// Location: /src/components/admin/AdminPillNavigation.tsx
// Purpose: Horizontal pill navigation for admin sub-sections
// Note: Mobile-first responsive design with object-oriented structure
// Children: Individual pill links for current admin section
// ----------------------

interface AdminPillNavigationProps {
  className?: string;
}

export class AdminPillNavigation {
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
          "inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
          "hover:scale-105 active:scale-95",
          // Mobile-first responsive design
          "text-xs sm:text-sm",
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
        className={cn(
          "flex flex-wrap gap-2 p-1",
          "bg-muted/20 rounded-lg",
          "border border-border/50",
          // Mobile-first responsive spacing
          "px-2 py-1 sm:px-4 sm:py-2"
        )}
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
export function AdminPillNavigationComponent({ className }: AdminPillNavigationProps) {
  const pathname = usePathname();
  const navigation = new AdminPillNavigation(pathname);
  
  return (
    <div className={cn("w-full", className)}>
      {navigation.render()}
    </div>
  );
}
