export default function FlaggedPostsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Flagged Posts</h1>
        <p className="text-muted-foreground">Review and moderate flagged content.</p>
      </div>

      <div className="rounded-lg border bg-card">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Posts Awaiting Review</h2>
            <div className="flex gap-2">
              <button className="px-3 py-1 text-sm border rounded hover:bg-accent">Filter</button>
              <button className="px-3 py-1 text-sm bg-primary text-primary-foreground rounded hover:bg-primary/90">
                Bulk Actions
              </button>
            </div>
          </div>
        </div>
        <div className="p-4">
          <div className="space-y-3">
            <div className="p-3 border rounded-lg">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="font-medium">Inappropriate content in fitness post</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Post by @fitnessguru123 • Flagged for: Spam, Misleading content • 2 hours ago
                  </p>
                  <p className="text-sm mt-2 line-clamp-2">
                    Check out this amazing workout routine that will transform your body in just 7 days! 
                    No diet, no exercise needed! Click the link below...
                  </p>
                </div>
                <div className="flex gap-2 ml-4">
                  <button className="px-3 py-1 text-sm bg-green-100 text-green-800 rounded hover:bg-green-200">
                    Approve
                  </button>
                  <button className="px-3 py-1 text-sm bg-red-100 text-red-800 rounded hover:bg-red-200">
                    Remove
                  </button>
                </div>
              </div>
            </div>
            <div className="p-3 border rounded-lg">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="font-medium">Harassment in comment section</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Post by @user456 • Flagged for: Harassment, Hate speech • 4 hours ago
                  </p>
                  <p className="text-sm mt-2 line-clamp-2">
                    This user keeps posting negative comments on my workout videos and sending 
                    me threatening messages. Please help.
                  </p>
                </div>
                <div className="flex gap-2 ml-4">
                  <button className="px-3 py-1 text-sm bg-green-100 text-green-800 rounded hover:bg-green-200">
                    Approve
                  </button>
                  <button className="px-3 py-1 text-sm bg-red-100 text-red-800 rounded hover:bg-red-200">
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}