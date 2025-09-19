"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ADMIN_NAV_GROUPS, ADMIN_SECTION_PILLS, getAdminSection, isActive } from "@src/config/nav";
import { cn } from "@src/lib/utils";
import { ChevronRight, ChevronDown } from "lucide-react";
import { useState } from "react";

// ----------------------
// Admin Sidebar Component
// Location: /src/components/admin/AdminSidebar.tsx
// Purpose: Left sidebar navigation for admin interface
// Note: Replaces dual-row pill navigation with collapsible sidebar
// Children: Main navigation items with expandable subsections
// ----------------------

export function AdminSidebar() {
  const pathname = usePathname();
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  
  const currentSection = getAdminSection(pathname);
  const currentPills = ADMIN_SECTION_PILLS[currentSection] || [];

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
        <h1 className="text-xl font-semibold text-white">Admin</h1>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-6">
          {ADMIN_NAV_GROUPS.map((group, groupIndex) => (
            <div key={group.section}>
              {/* Section Header */}
              <div className="flex items-center gap-2 mb-3">
                <group.icon className="h-4 w-4 text-neutral-400" />
                <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                  {group.title}
                </h3>
              </div>

              {/* Section Items */}
              <div className="space-y-1">
                {group.items.map((item) => {
                  const isCurrentSection = currentSection === getAdminSection(item.href);
                  const isExpanded = expandedSections.has(item.href);
                  const hasSubItems = ADMIN_SECTION_PILLS[getAdminSection(item.href)]?.length > 1;
                  
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
                          {item.icon && <item.icon className="h-4 w-4" />}
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
                          {ADMIN_SECTION_PILLS[getAdminSection(item.href)]?.map((pill) => (
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

              {/* Modern Divider */}
              {groupIndex < ADMIN_NAV_GROUPS.length - 1 && (
                <div className="mt-6 mb-2">
                  <div className="h-px bg-gradient-to-r from-transparent via-neutral-700 to-transparent"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-neutral-800">
        <div className="text-xs text-neutral-500">
          Admin Panel v1.0
        </div>
      </div>
    </div>
  );
}
