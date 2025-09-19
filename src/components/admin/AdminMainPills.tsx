"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@src/lib/utils";
import { 
  LayoutDashboard, 
  BarChart3, 
  Users, 
  FileText, 
  DollarSign, 
  MessageSquare, 
  Shield, 
  Lock, 
  Webhook, 
  Calendar 
} from "lucide-react";

// ----------------------
// Admin Main Pills Component
// Location: /src/components/admin/AdminMainPills.tsx
// Purpose: Main navigation pills for admin dashboard sections
// Note: Mobile-first design with object-oriented structure
// ----------------------

interface MainPillItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

class AdminMainPillsService {
  private pathname: string;

  constructor(pathname: string) {
    this.pathname = pathname;
  }

  private getMainPills(): MainPillItem[] {
    return [
      { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
      { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
      { label: "Users", href: "/admin/users", icon: Users },
      { label: "Content", href: "/admin/content", icon: FileText },
      { label: "Finance", href: "/admin/finance", icon: DollarSign },
      { label: "Communications", href: "/admin/communications", icon: MessageSquare },
      { label: "System", href: "/admin/system", icon: Shield },
      { label: "Security", href: "/admin/security", icon: Lock },
      { label: "Integrations", href: "/admin/integrations", icon: Webhook },
      { label: "Events", href: "/admin/events", icon: Calendar },
    ];
  }

  private isActivePill(href: string): boolean {
    if (href === "/admin") return this.pathname === "/admin";
    return this.pathname.startsWith(href);
  }

  private renderPill(pill: MainPillItem) {
    const active = this.isActivePill(pill.href);
    const Icon = pill.icon;
    
    return (
      <Link
        key={pill.href}
        href={pill.href}
        aria-current={active ? "page" : undefined}
        className={cn(
          "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
          "hover:scale-105 active:scale-95",
          // Mobile-first responsive design
          "text-xs sm:text-sm px-2 sm:px-4",
          // Active state styling
          active
            ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
            : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
        )}
      >
        <Icon className="h-4 w-4" />
        <span className="hidden sm:inline">{pill.label}</span>
      </Link>
    );
  }

  public render() {
    const pills = this.getMainPills();
    
    return (
      <nav 
        className="flex flex-wrap gap-2 p-1 bg-muted/20 rounded-lg border border-border/50"
        role="tablist"
        aria-label="Main admin navigation"
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
export function AdminMainPills() {
  const pathname = usePathname();
  const service = new AdminMainPillsService(pathname);
  return service.render();
}
