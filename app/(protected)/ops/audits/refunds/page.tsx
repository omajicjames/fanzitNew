export default function RefundsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Refund Audits</h1>
        <p className="text-muted-foreground">Review and process refund requests.</p>
      </div>

      <div className="rounded-lg border bg-card">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Pending Refunds</h2>
            <div className="flex gap-2">
              <button className="px-3 py-1 text-sm border rounded hover:bg-accent">Filter</button>
              <select className="px-3 py-1 text-sm border rounded">
                <option>All Status</option>
                <option>Pending</option>
                <option>Approved</option>
                <option>Rejected</option>
              </select>
            </div>
          </div>
        </div>
        <div className="p-4">
          <div className="space-y-3">
            <div className="p-3 border rounded-lg">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="font-medium">Premium subscription refund</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    User #1234 • Amount: $29.99 • Requested: 1 day ago • Reason: Technical issues
                  </p>
                  <div className="flex gap-2 mt-2">
                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Pending Review</span>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">30-day policy</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1 text-sm bg-green-100 text-green-800 rounded hover:bg-green-200">
                    Approve
                  </button>
                  <button className="px-3 py-1 text-sm bg-red-100 text-red-800 rounded hover:bg-red-200">
                    Reject
                  </button>
                  <button className="px-3 py-1 text-sm border rounded hover:bg-accent">
                    Details
                  </button>
                </div>
              </div>
            </div>
            <div className="p-3 border rounded-lg">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="font-medium">Creator payout dispute</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    User #5678 • Amount: $150.00 • Requested: 3 days ago • Reason: Incorrect calculation
                  </p>
                  <div className="flex gap-2 mt-2">
                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Pending Review</span>
                    <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">Creator Dispute</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1 text-sm bg-green-100 text-green-800 rounded hover:bg-green-200">
                    Approve
                  </button>
                  <button className="px-3 py-1 text-sm bg-red-100 text-red-800 rounded hover:bg-red-200">
                    Reject
                  </button>
                  <button className="px-3 py-1 text-sm border rounded hover:bg-accent">
                    Details
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