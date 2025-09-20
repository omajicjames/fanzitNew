"use client";

import { PostSelectionCard } from "./SelectionCard";

// ----------------------
// Red Right Side Detail View Component
// Location: /src/components/admin/RedRightSideDetailView.tsx
// Purpose: Reusable red-themed detail view section for right side of admin pages
// Features: Independent state, red background, consistent styling
// Note: Used for right side detail views that need independent post selection
// ----------------------

interface Post {
  id: string;
  title: string;
  category: string;
  status: string;
}

interface RedRightSideDetailViewProps {
  value: string;
  onValueChange: (value: string) => void;
  posts: Post[];
  className?: string;
}

export function RedRightSideDetailView({ 
  value, 
  onValueChange, 
  posts, 
  className 
}: RedRightSideDetailViewProps) {
  return (
    <div className={`bg-red-200 p-2 rounded-lg border-2 border-red-400 ${className}`}>
      <PostSelectionCard
        value={value}
        onValueChange={onValueChange}
        posts={posts}
      />
    </div>
  );
}
