"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@src/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@src/components/ui/select";
import { ReactNode } from "react";

// ----------------------
// Selection Card Component
// Location: /src/components/admin/SelectionCard.tsx
// Purpose: Reusable dropdown selection card with modern styling
// Features: Consistent theming, proper background opacity, modern design
// Note: Used across admin pages for consistent selection interfaces
// ----------------------

interface SelectionOption {
  id: string;
  label: string;
  description?: string;
  icon?: ReactNode;
}

interface SelectionCardProps {
  title: string;
  description?: string;
  placeholder?: string;
  value: string;
  onValueChange: (value: string) => void;
  options: SelectionOption[];
  className?: string;
  disabled?: boolean;
}

export function SelectionCard({
  title,
  description,
  placeholder = "Select an option",
  value,
  onValueChange,
  options,
  className = "",
  disabled = false
}: SelectionCardProps) {
  return (
    <Card className={`bg-admin-panel border border-[var(--admin-border-soft)] shadow-sm hover:shadow-md transition-all duration-200 ${className}`}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg text-[var(--admin-text-primary)] flex items-center gap-2">
          {title}
        </CardTitle>
        {description && (
          <CardDescription className="text-[var(--admin-text-primary)]-muted text-sm">
            {description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <Select value={value} onValueChange={onValueChange} disabled={disabled}>
          <SelectTrigger className="bg-[var(--admin-surface)] border border-[var(--admin-border-soft)] text-[var(--admin-text-primary)] hover:bg-[var(--admin-card-bg)] focus:ring-2 focus:ring-[var(--brand)]/20 focus:border-[var(--brand)]/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent className="bg-[var(--admin-surface)] border border-[var(--admin-border-soft)] shadow-xl backdrop-blur-sm z-50 min-w-[200px]">
            {options.map((option) => (
              <SelectItem
                key={option.id}
                value={option.id}
                className="text-[var(--admin-text-primary)] hover:bg-[var(--admin-card-bg)] focus:bg-[var(--admin-card-bg)] cursor-pointer transition-colors duration-150 py-3"
              >
                <div className="flex items-center gap-3 py-1">
                  {option.icon && (
                    <div className="flex-shrink-0 text-[var(--admin-text-primary)]-muted">
                      {option.icon}
                    </div>
                  )}
                  <div className="flex flex-col min-w-0 flex-1">
                    <span className="font-medium text-[var(--admin-text-primary)] truncate">
                      {option.label}
                    </span>
                    {option.description && (
                      <span className="text-xs text-[var(--admin-text-primary)]-muted truncate">
                        {option.description}
                      </span>
                    )}
                  </div>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  );
}

// ----------------------
// Modern Selection Card Variants
// Purpose: Pre-configured selection cards for common use cases
// ----------------------

interface MetricSelectionCardProps {
  value: string;
  onValueChange: (value: string) => void;
  className?: string;
}

export function MetricSelectionCard({ value, onValueChange, className }: MetricSelectionCardProps) {
  const metricOptions: SelectionOption[] = [
    { 
      id: "overview", 
      label: "Platform Overview", 
      description: "Complete dashboard metrics" 
    },
    { 
      id: "revenue", 
      label: "Revenue Analytics", 
      description: "Financial performance data" 
    },
    { 
      id: "users", 
      label: "User Analytics", 
      description: "User growth and engagement" 
    },
    { 
      id: "content", 
      label: "Content Analytics", 
      description: "Content performance metrics" 
    },
    { 
      id: "system", 
      label: "System Status", 
      description: "System health and performance" 
    },
  ];

  return (
    <SelectionCard
      title="Metric Selection"
      description="Choose which metrics to display"
      placeholder="Select metric type"
      value={value}
      onValueChange={onValueChange}
      options={metricOptions}
      className={className}
    />
  );
}

interface PostSelectionCardProps {
  value: string;
  onValueChange: (value: string) => void;
  posts: Array<{
    id: string;
    title: string;
    category: string;
    status: string;
  }>;
  className?: string;
}

export function PostSelectionCard({ value, onValueChange, posts, className }: PostSelectionCardProps) {
  const postOptions: SelectionOption[] = posts.map(post => ({
    id: post.id,
    label: post.title,
    description: `${post.category} • ${post.status}`
  }));

  return (
    <SelectionCard
      title="Post Selection"
      description="Choose a blog post to view details"
      placeholder="Select blog post"
      value={value}
      onValueChange={onValueChange}
      options={postOptions}
      className={className}
    />
  );
}

interface StatusFilterCardProps {
  value: string;
  onValueChange: (value: string) => void;
  title?: string;
  description?: string;
  options: Array<{ id: string; label: string; description?: string }>;
  className?: string;
}

export function StatusFilterCard({ 
  value, 
  onValueChange, 
  title = "Filter by Status",
  description = "Choose a status to filter results",
  options,
  className 
}: StatusFilterCardProps) {
  return (
    <SelectionCard
      title={title}
      description={description}
      placeholder="All statuses"
      value={value}
      onValueChange={onValueChange}
      options={options}
      className={className}
    />
  );
}
