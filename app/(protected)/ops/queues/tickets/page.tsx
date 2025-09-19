export default function TicketQueuePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Ticket Queue</h1>
        <p className="text-muted-foreground">Manage and respond to user support tickets.</p>
      </div>

      <div className="rounded-lg border bg-card">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Open Tickets</h2>
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90">
              New Ticket
            </button>
          </div>
        </div>
        <div className="p-4">
          <div className="space-y-3">
            {/* Sample ticket items */}
            <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/50">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div>
                  <p className="font-medium">Cannot access premium features</p>
                  <p className="text-sm text-muted-foreground">User #1234 • 2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">High</span>
                <span className="text-xs text-muted-foreground">Open</span>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/50">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div>
                  <p className="font-medium">Payment processing issue</p>
                  <p className="text-sm text-muted-foreground">User #5678 • 4 hours ago</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Medium</span>
                <span className="text-xs text-muted-foreground">Open</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}