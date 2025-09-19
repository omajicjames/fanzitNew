export default function EscalationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Escalations</h1>
        <p className="text-muted-foreground">Manage escalated tickets requiring senior support.</p>
      </div>

      <div className="rounded-lg border bg-card">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Active Escalations</h2>
            <span className="text-sm text-muted-foreground">7 escalated tickets</span>
          </div>
        </div>
        <div className="p-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg bg-purple-50 border-purple-200">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <div>
                  <p className="font-medium">Legal review required</p>
                  <p className="text-sm text-muted-foreground">Escalated from L1 • 1 hour ago</p>
                </div>
              </div>
              <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">Legal</span>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg bg-red-50 border-red-200">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <div>
                  <p className="font-medium">Security incident</p>
                  <p className="text-sm text-muted-foreground">Escalated from L2 • 3 hours ago</p>
                </div>
              </div>
              <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">Security</span>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg bg-blue-50 border-blue-200">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div>
                  <p className="font-medium">Payment dispute</p>
                  <p className="text-sm text-muted-foreground">Escalated from L1 • 5 hours ago</p>
                </div>
              </div>
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Finance</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}