import { Skeleton } from "@src/components/ui/skeleton"

// ----------------------
// Admin Page Loading Component
// Location: /app/(protected)/admin/loading.tsx
// Purpose: Loading state for admin dashboard
// ----------------------

export default function AdminLoading() {
  return (
    <div className="flex h-screen">
      {/* ----------------------
      // Left Sidebar Loading
      // ---------------------- */}
      <div className="hidden lg:flex w-64 border-r bg-background p-4">
        <div className="space-y-4 w-full">
          <Skeleton className="h-8 w-32" />
          <div className="space-y-2">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
          </div>
        </div>
      </div>

      {/* ----------------------
      // Center Content Loading
      // ---------------------- */}
      <div className="flex-1 p-6">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <Skeleton className="h-8 w-48 mx-auto" />
            <Skeleton className="h-4 w-64 mx-auto" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
          </div>
        </div>
      </div>

      {/* ----------------------
      // Right Rail Loading
      // ---------------------- */}
      <div className="hidden lg:flex w-80 border-l bg-background p-4">
        <div className="space-y-4 w-full">
          <Skeleton className="h-6 w-32" />
          <div className="space-y-2">
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
          </div>
        </div>
      </div>
    </div>
  )
}