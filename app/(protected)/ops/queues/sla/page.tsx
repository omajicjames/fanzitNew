export default function SLABreachesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">SLA Breaches</h1>
        <p className="text-muted-foreground">Monitor and manage tickets that have exceeded SLA targets.</p>
      </div>

      <div className="rounded-lg border bg-card">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Breached Tickets</h2>
            <span className="text-sm text-muted-foreground">3 tickets require attention</span>
          </div>
        </div>
        <div className="p-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg bg-red-50 border-red-200">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <div>
                  <p className="font-medium">Account suspension appeal</p>
                  <p className="text-sm text-muted-foreground">User #9012 • Breached by 2h 15m</p>
                </div>
              </div>
              <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">Critical</span>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg bg-orange-50 border-orange-200">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <div>
                  <p className="font-medium">Content removal request</p>
                  <p className="text-sm text-muted-foreground">User #3456 • Breached by 45m</p>
                </div>
              </div>
              <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded">High</span>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg bg-yellow-50 border-yellow-200">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div>
                  <p className="font-medium">Technical support request</p>
                  <p className="text-sm text-muted-foreground">User #7890 • Breached by 15m</p>
                </div>
              </div>
              <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Medium</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}