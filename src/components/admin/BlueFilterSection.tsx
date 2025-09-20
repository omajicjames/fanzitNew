"use client";

import { CompactFilterCard } from "./SelectionCard";
import { ReactNode } from "react";

// ----------------------
// Blue Filter Section Component
// Location: /src/components/admin/BlueFilterSection.tsx
// Purpose: Reusable blue-themed filter section for top of admin pages
// Features: Independent state, blue background, consistent styling
// Note: Used for top filter sections that need independent post selection
// ----------------------

interface FilterOption {
  id: string;
  label: string;
  status?: string;
  icon?: ReactNode;
}

interface BlueFilterSectionProps {
  title: string;
  placeholder?: string;
  value: string;
  onValueChange: (value: string) => void;
  options: FilterOption[];
  className?: string;
}

export function BlueFilterSection({ 
  title, 
  placeholder = "Choose an option...", 
  value, 
  onValueChange, 
  options, 
  className 
}: BlueFilterSectionProps) {
  return (
    <div className={`bg-blue-200 p-2 rounded-lg border-2 border-blue-400 ${className}`}>
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
