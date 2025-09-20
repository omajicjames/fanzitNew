"use client";

import { PostSelectionCard } from "./SelectionCard";

// ----------------------
// Right Compact Detail Component
// Location: /src/components/admin/RightCompactDetail.tsx
// Purpose: Reusable detail view section for right side of admin pages
// Features: Independent state, consistent styling
// Note: Used for right side detail views that need independent post selection
// ----------------------

interface Post {
  id: string;
  title: string;
  category: string;
  status: string;
}

interface RightCompactDetailProps {
  value: string;
  onValueChange: (value: string) => void;
  posts: Post[];
  className?: string;
}

export function RightCompactDetail({ 
  value, 
  onValueChange, 
  posts, 
  className 
}: RightCompactDetailProps) {
  return (
    <div className={`p-2 rounded-lg ${className}`}>
      <PostSelectionCard
        value={value}
        onValueChange={onValueChange}
        posts={posts}
      />
    </div>
  );
}
