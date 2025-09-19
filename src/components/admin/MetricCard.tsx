"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@src/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";
import type { LucideIcon } from "lucide-react";

// ----------------------
// Metric Card Component
// Location: /src/components/admin/MetricCard.tsx
// Purpose: Reusable metric card for displaying key performance indicators
// Note: Used across admin pages for consistent metric display
// ----------------------

interface MetricCardProps {
  title: string;
  value: string;
  description?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export function MetricCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  className = ""
}: MetricCardProps) {
  return (
    <Card className={`bg-[var(--admin-card-bg)] border-[var(--admin-border-soft)] text-[var(--admin-text-primary)] ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-[var(--text-muted)]">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-[var(--text-muted)]" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-[var(--admin-text-primary)] mb-1">
          {value}
        </div>
        {description && (
          <p className="text-xs text-[var(--text-muted)] mb-2">
            {description}
          </p>
        )}
        {trend && (
          <div className="flex items-center gap-1 text-sm">
            {trend.isPositive ? (
              <TrendingUp className="h-3 w-3 text-green-500" />
            ) : (
              <TrendingDown className="h-3 w-3 text-red-500" />
            )}
            <span className={trend.isPositive ? "text-green-500" : "text-red-500"}>
              {trend.isPositive ? "+" : ""}{trend.value}%
            </span>
            <span className="text-[var(--text-muted)] text-xs">from last month</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
