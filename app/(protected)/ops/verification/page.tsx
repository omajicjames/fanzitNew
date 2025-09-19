export default function VerificationPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">KYC / Creator Verification</h1>
        <p className="text-muted-foreground">Review and approve creator verification requests.</p>
      </div>

      <div className="rounded-lg border bg-card">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Pending Verifications</h2>
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
                  <p className="font-medium">@fitnesscoach_sarah</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Submitted: 2 days ago • Type: Fitness Coach • Documents: 3/3
                  </p>
                  <div className="flex gap-2 mt-2">
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">ID Verified</span>
                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Pending Address</span>
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
                    View Details
                  </button>
                </div>
              </div>
            </div>
            <div className="p-3 border rounded-lg">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="font-medium">@nutritionexpert_mike</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Submitted: 1 day ago • Type: Nutritionist • Documents: 2/3
                  </p>
                  <div className="flex gap-2 mt-2">
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">ID Verified</span>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Certification Verified</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1 text-sm bg-yellow-100 text-yellow-800 rounded hover:bg-yellow-200">
                    Request More
                  </button>
                  <button className="px-3 py-1 text-sm border rounded hover:bg-accent">
                    View Details
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