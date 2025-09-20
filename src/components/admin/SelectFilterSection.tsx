"use client";

import { CompactFilterCard } from "./SelectionCard";
import { ReactNode } from "react";

// ----------------------
// Select Filter Section Component
// Location: /src/components/admin/SelectFilterSection.tsx
// Purpose: Reusable filter section for top of admin pages
// Features: Independent state, consistent styling
// Note: Used for top filter sections that need independent post selection
// ----------------------

interface FilterOption {
  id: string;
  label: string;
  status?: string;
  icon?: ReactNode;
}

interface SelectFilterSectionProps {
  title: string;
  placeholder?: string;
  value: string;
  onValueChange: (value: string) => void;
  options: FilterOption[];
  className?: string;
}

export function SelectFilterSection({ 
  title, 
  placeholder = "Choose an option...", 
  value, 
  onValueChange, 
  options, 
  className 
}: SelectFilterSectionProps) {
  return (
    <div className={`p-2 rounded-lg ${className}`}>
      <CompactFilterCard
        title={title}
        placeholder={placeholder}
        value={value}
        onValueChange={onValueChange}
        options={options}
      />
    </div>
  );
}
