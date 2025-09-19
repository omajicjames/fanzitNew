"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { OPS_SIDEBAR, OPS_SECTION_PILLS, getOpsGroup, isActive } from "@src/config/nav";
import { cn } from "@src/lib/utils";
import { ChevronRight, ChevronDown, MessageSquare, Users, Shield, CheckCircle, FileText, Settings } from "lucide-react";
import { useState } from "react";

// ----------------------
// OPS Sidebar Component
// Location: /src/components/ops/OpsSidebar.tsx
// Purpose: Left sidebar navigation for OPS/Support interface
// Note: Replaces dual-row pill navigation with collapsible sidebar
// Children: Main navigation items with expandable subsections
// ----------------------

// Icon mapping for OPS sections
const OPS_ICONS = {
  home: MessageSquare,
  queues: Users,
  moderation: Shield,
  verification: CheckCircle,
  audits: FileText,
  macros: Settings,
} as const;

export function OpsSidebar() {
  const pathname = usePathname();
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  
  const currentGroup = getOpsGroup(pathname);
  const currentPills = OPS_SECTION_PILLS[currentGroup] || [];

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  return (
    <div className="w-64 bg-neutral-900 border-r border-neutral-800 min-h-screen flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-neutral-800">
        <h1 className="text-xl font-semibold text-white">Support Center</h1>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-1">
          {OPS_SIDEBAR.map((item) => {
            const isCurrentGroup = currentGroup === item.group;
            const isExpanded = expandedSections.has(item.href);
            const hasSubItems = OPS_SECTION_PILLS[item.group]?.length > 1;
            const IconComponent = OPS_ICONS[item.group];
            
            return (
              <div key={item.href}>
                {/* Main Navigation Item */}
                <div className="flex items-center">
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors flex-1",
                      isActive(pathname, item.href)
                        ? "bg-primary text-primary-foreground"
                        : "text-neutral-300 hover:bg-neutral-800 hover:text-white"
                    )}
                  >
                    <IconComponent className="h-4 w-4" />
                    {item.label}
                  </Link>
                  
                  {/* Expand/Collapse Button */}
                  {hasSubItems && (
                    <button
                      onClick={() => toggleSection(item.href)}
                      className="p-1 hover:bg-neutral-800 rounded"
                    >
                      {isExpanded ? (
                        <ChevronDown className="h-4 w-4 text-neutral-400" />
                      ) : (
                        <ChevronRight className="h-4 w-4 text-neutral-400" />
                      )}
                    </button>
                  )}
                </div>

                {/* Sub Navigation Items */}
                {hasSubItems && isExpanded && (
                  <div className="ml-6 mt-1 space-y-1">
                    {OPS_SECTION_PILLS[item.group]?.map((pill) => (
                      <Link
                        key={pill.href}
                        href={pill.href}
                        className={cn(
                          "block px-3 py-1.5 rounded text-sm transition-colors",
                          isActive(pathname, pill.href)
                            ? "bg-primary/20 text-primary-foreground"
                            : "text-neutral-400 hover:bg-neutral-800 hover:text-white"
                        )}
                      >
                        {pill.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-neutral-800">
        <div className="text-xs text-neutral-500">
          Support Center v1.0
        </div>
      </div>
    </div>
  );
}
