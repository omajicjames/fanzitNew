export default function FlaggedMediaPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Flagged Media</h1>
        <p className="text-muted-foreground">Review and moderate flagged images and videos.</p>
      </div>

      <div className="rounded-lg border bg-card">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Media Awaiting Review</h2>
            <div className="flex gap-2">
              <button className="px-3 py-1 text-sm border rounded hover:bg-accent">Filter</button>
              <select className="px-3 py-1 text-sm border rounded">
                <option>All Types</option>
                <option>Images</option>
                <option>Videos</option>
              </select>
            </div>
          </div>
        </div>
        <div className="p-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="border rounded-lg overflow-hidden">
              <div className="aspect-video bg-gray-200 flex items-center justify-center">
                <span className="text-muted-foreground">Video Preview</span>
              </div>
              <div className="p-3">
                <p className="font-medium text-sm">Inappropriate workout video</p>
                <p className="text-xs text-muted-foreground mt-1">
                  By @user789 • Flagged: Nudity • 1 hour ago
                </p>
                <div className="flex gap-2 mt-3">
                  <button className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded hover:bg-green-200">
                    Approve
                  </button>
                  <button className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded hover:bg-red-200">
                    Remove
                  </button>
                </div>
              </div>
            </div>
            <div className="border rounded-lg overflow-hidden">
              <div className="aspect-video bg-gray-200 flex items-center justify-center">
                <span className="text-muted-foreground">Image Preview</span>
              </div>
              <div className="p-3">
                <p className="font-medium text-sm">Copyright violation</p>
                <p className="text-xs text-muted-foreground mt-1">
                  By @fitness123 • Flagged: Copyright • 3 hours ago
                </p>
                <div className="flex gap-2 mt-3">
                  <button className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded hover:bg-green-200">
                    Approve
                  </button>
                  <button className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded hover:bg-red-200">
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