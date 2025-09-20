"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@src/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@src/components/ui/select";
import { Badge } from "@src/components/ui/badge";
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
          <SelectTrigger className="bg-[var(--admin-surface)] border border-[var(--admin-border-soft)] text-[var(--admin-text-primary)] hover:bg-[var(--admin-surface)]/80 focus:ring-2 focus:ring-[var(--admin-border-soft)]/30 focus:border-[var(--admin-border-soft)] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent className="bg-[var(--admin-surface)] border border-[var(--admin-border-soft)] shadow-xl backdrop-blur-sm z-50 min-w-[200px]">
            {options.map((option) => (
              <SelectItem
                key={option.id}
                value={option.id}
                className="text-[var(--admin-text-primary)] hover:bg-[var(--admin-surface)]/50 focus:bg-[var(--admin-surface)]/50 cursor-pointer transition-colors duration-150 py-3"
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

// ----------------------
// Transaction Selection Card Component
// Location: /src/components/admin/SelectionCard.tsx
// Purpose: Reusable transaction selection dropdown with modern styling
// Features: Transparent background, hover effects, transaction-specific icons
// Note: Used for financial management and transaction selection
// ----------------------

interface TransactionOption {
  id: string;
  title: string;
  description: string;
  amount: string;
  status: 'completed' | 'pending' | 'failed' | 'cancelled';
  type: 'revenue' | 'payout' | 'refund' | 'fee';
  creator?: string;
  date?: string;
}

interface TransactionSelectionCardProps {
  value: string;
  onValueChange: (value: string) => void;
  transactions: TransactionOption[];
  className?: string;
}

export function TransactionSelectionCard({ value, onValueChange, transactions, className }: TransactionSelectionCardProps) {
  const selectedTransaction = transactions.find(t => t.id === value);

  const getStatusBadge = (status: TransactionOption['status']) => {
    const statusConfig = {
      completed: { variant: "default" as const, text: "Completed", color: "text-green-500" },
      pending: { variant: "secondary" as const, text: "Pending", color: "text-yellow-500" },
      failed: { variant: "destructive" as const, text: "Failed", color: "text-red-500" },
      cancelled: { variant: "outline" as const, text: "Cancelled", color: "text-gray-500" }
    };
    const config = statusConfig[status];
    return (
      <span className={`inline-flex items-center gap-1 text-xs font-medium ${config.color}`}>
        <span className={`h-2 w-2 rounded-full ${config.color.replace('text-', 'bg-')}`}></span>
        {config.text}
      </span>
    );
  };

  const getTypeIcon = (type: TransactionOption['type']) => {
    const icons = {
      revenue: '💰',
      payout: '💸',
      refund: '↩️',
      fee: '⚡'
    };
    return icons[type] || '💳';
  };

  return (
    <Card className={`bg-admin-panel border border-[var(--admin-border-soft)] shadow-sm hover:shadow-md transition-all duration-200 ${className}`}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg text-[var(--admin-text-primary)] flex items-center gap-2">
          <span className="text-2xl">💳</span>
          Select Transaction
        </CardTitle>
        <CardDescription className="text-[var(--admin-text-primary)]-muted text-sm">
          Choose a transaction to review and manage
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Select value={value} onValueChange={onValueChange}>
          <SelectTrigger className="bg-[var(--admin-surface)]/80 backdrop-blur-sm border border-[var(--admin-border-soft)] text-[var(--admin-text-primary)] hover:bg-[var(--admin-card-bg)]/60 focus:ring-2 focus:ring-[var(--brand)]/20 focus:border-[var(--brand)]/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed h-16 px-4">
            <div className="flex items-center gap-3 flex-1">
              {selectedTransaction ? (
                <>
                  <div className="text-2xl">{getTypeIcon(selectedTransaction.type)}</div>
                  <div className="flex-1 text-left">
                    <div className="font-semibold text-[var(--admin-text-primary)] truncate text-base">
                      {selectedTransaction.title}
                    </div>
                    <div className="text-sm text-[var(--admin-text-primary)]-muted truncate">
                      {selectedTransaction.description}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-[var(--admin-text-primary)]">
                      {selectedTransaction.amount}
                    </span>
                    {getStatusBadge(selectedTransaction.status)}
                  </div>
                </>
              ) : (
                <div className="flex items-center gap-3 flex-1">
                  <div className="text-2xl">💳</div>
                  <span className="text-[var(--admin-text-primary)]-muted">Choose a transaction...</span>
                </div>
              )}
            </div>
          </SelectTrigger>
          <SelectContent className="bg-[var(--admin-surface)]/95 backdrop-blur-md border border-[var(--admin-border-soft)] shadow-2xl z-50 min-w-[400px] rounded-lg">
            {transactions.map((transaction) => {
              const isSelected = transaction.id === value;

              return (
                <SelectItem
                  key={transaction.id}
                  value={transaction.id}
                  className={`text-[var(--admin-text-primary)] cursor-pointer transition-all duration-200 py-4 px-4 ${
                    isSelected
                      ? 'bg-red-900/30 border-l-4 border-red-500'
                      : 'hover:bg-[var(--admin-card-bg)]/50'
                  }`}
                >
                  <div className="flex items-center gap-3 w-full">
                    <div className="text-2xl">{getTypeIcon(transaction.type)}</div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-[var(--admin-text-primary)] truncate text-base">
                        {transaction.title}
                      </div>
                      <div className="text-sm text-[var(--admin-text-primary)]-muted truncate">
                        {transaction.description}
                      </div>
                      {transaction.creator && (
                        <div className="text-xs text-[var(--admin-text-primary)]-muted truncate">
                          by {transaction.creator}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-lg font-bold text-[var(--admin-text-primary)]">
                        {transaction.amount}
                      </span>
                      {getStatusBadge(transaction.status)}
                      {isSelected && (
                        <div className="text-white">
                          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  );
}

// ----------------------
// Compact Filter Card Component
// Location: /src/components/admin/SelectionCard.tsx
// Purpose: Reusable compact filter section for admin pages
// Features: Matches finance page style, simple injection
// Note: Used for consistent compact filtering across admin pages
// ----------------------

interface FilterOption {
  id: string;
  label: string;
  status?: string;
  icon?: ReactNode;
}

interface CompactFilterCardProps {
  title: string;
  placeholder?: string;
  value: string;
  onValueChange: (value: string) => void;
  options: FilterOption[];
  className?: string;
}

export function CompactFilterCard({ 
  title, 
  placeholder = "Choose an option...", 
  value, 
  onValueChange, 
  options, 
  className 
}: CompactFilterCardProps) {
  return (
    <div className={`compact-filter-group bg-[var(--admin-surface)] border border-[var(--admin-border-soft)] rounded-lg p-4 ${className}`}>
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <label className="text-sm font-medium text-[var(--admin-text-primary)]-muted mb-2 block">{title}</label>
          <Select value={value} onValueChange={onValueChange}>
            <SelectTrigger className="bg-[var(--admin-card-bg)] border-[var(--admin-border-soft)] text-[var(--admin-text-primary)] hover:bg-[var(--admin-card-bg)]/80 focus:ring-2 focus:ring-[var(--admin-border-soft)]/30 focus:border-[var(--admin-border-soft)] transition-all duration-200">
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent className="bg-[var(--admin-surface)] border border-[var(--admin-border-soft)] shadow-xl backdrop-blur-sm z-50 min-w-[200px]">
              {options.map((option) => {
                return (
                  <SelectItem 
                    key={option.id} 
                    value={option.id}
                    className="text-[var(--admin-text-primary)] hover:bg-[var(--admin-surface)]/50 focus:bg-[var(--admin-surface)]/50 cursor-pointer transition-colors duration-150 py-3"
                  >
                    <div className="flex items-center gap-2">
                      {option.icon}
                      <span>{option.label}</span>
                      {option.status && (
                        <Badge 
                          variant={option.status === 'published' || option.status === 'completed' ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {option.status}
                        </Badge>
                      )}
                    </div>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
