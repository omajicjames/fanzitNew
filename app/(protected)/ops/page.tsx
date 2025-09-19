export default function OpsDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Support Center</h1>
        <p className="text-muted-foreground">Welcome to the support operations dashboard.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border bg-card p-4">
          <div className="text-2xl font-bold">24</div>
          <div className="text-sm text-muted-foreground">Open Tickets</div>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <div className="text-2xl font-bold">3</div>
          <div className="text-sm text-muted-foreground">SLA Breaches</div>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <div className="text-2xl font-bold">7</div>
          <div className="text-sm text-muted-foreground">Escalations</div>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <div className="text-2xl font-bold">12</div>
          <div className="text-sm text-muted-foreground">Flagged Items</div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="rounded-lg border bg-card p-6">
        <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2 border-b">
            <div>
              <p className="font-medium">New ticket from user #1234</p>
              <p className="text-sm text-muted-foreground">2 minutes ago</p>
            </div>
            <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">High</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b">
            <div>
              <p className="font-medium">Post flagged for review</p>
              <p className="text-sm text-muted-foreground">15 minutes ago</p>
            </div>
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Medium</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="font-medium">KYC verification completed</p>
              <p className="text-sm text-muted-foreground">1 hour ago</p>
            </div>
            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Low</span>
          </div>
        </div>
      </div>
    </div>
  );
}