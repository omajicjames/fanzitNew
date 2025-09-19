export default function CannedResponsesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Canned Responses</h1>
        <p className="text-muted-foreground">Manage pre-written responses for common support scenarios.</p>
      </div>

      <div className="flex gap-3 mb-4">
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90">
          New Response
        </button>
        <button className="px-4 py-2 border rounded-lg hover:bg-accent">
          Import/Export
        </button>
      </div>

      <div className="rounded-lg border bg-card">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Response Templates</h2>
            <input 
              type="text" 
              placeholder="Search responses..." 
              className="px-3 py-1 text-sm border rounded w-64"
            />
          </div>
        </div>
        <div className="p-4">
          <div className="space-y-3">
            <div className="p-3 border rounded-lg">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="font-medium">Welcome Message</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Category: General • Usage: 245 times • Last used: 2 hours ago
                  </p>
                  <div className="mt-2 p-2 bg-muted rounded text-sm">
                    Hi there! Welcome to our support center. How can I help you today?
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <button className="px-2 py-1 text-xs border rounded hover:bg-accent">
                    Edit
                  </button>
                  <button className="px-2 py-1 text-xs border rounded hover:bg-accent">
                    Copy
                  </button>
                </div>
              </div>
            </div>
            <div className="p-3 border rounded-lg">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="font-medium">Payment Issue Resolution</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Category: Billing • Usage: 189 times • Last used: 1 hour ago
                  </p>
                  <div className="mt-2 p-2 bg-muted rounded text-sm">
                    I understand you're having trouble with your payment. Let me help you resolve this issue. 
                    Could you please provide your transaction ID so I can investigate further?
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <button className="px-2 py-1 text-xs border rounded hover:bg-accent">
                    Edit
                  </button>
                  <button className="px-2 py-1 text-xs border rounded hover:bg-accent">
                    Copy
                  </button>
                </div>
              </div>
            </div>
            <div className="p-3 border rounded-lg">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="font-medium">Technical Troubleshooting</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Category: Technical • Usage: 156 times • Last used: 30 minutes ago
                  </p>
                  <div className="mt-2 p-2 bg-muted rounded text-sm">
                    Let's try some basic troubleshooting steps. First, please clear your browser cache 
                    and cookies, then restart your browser. If the issue persists, let me know what device and browser you're using.
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <button className="px-2 py-1 text-xs border rounded hover:bg-accent">
                    Edit
                  </button>
                  <button className="px-2 py-1 text-xs border rounded hover:bg-accent">
                    Copy
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