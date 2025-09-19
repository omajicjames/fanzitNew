"use client";

import { redirect } from "next/navigation";
import { useEffect } from "react";

// ----------------------
// Communications Page
// Location: /app/(protected)/admin/communications/page.tsx
// Purpose: Redirect to announcements tab as the main communications interface
// ----------------------

export default function CommunicationsPage() {
  useEffect(() => {
    redirect("/admin/communications/announcements");
  }, []);

  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">Redirecting to Announcements...</h2>
        <p className="text-muted-foreground">Please wait while we redirect you to the announcements management page.</p>
      </div>
    </div>
  );
}