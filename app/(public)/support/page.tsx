// ----------------------
// Public Support Page
// Location: /app/(public)/support/page.tsx
// Purpose: Truly public, self-service help center with no admin features
// Access: No authentication required - completely public
// Children: PublicHelpCenter component, SystemStatusWidget (public variant)
// ----------------------

import PublicHelpCenter from "@src/features/support/public/PublicHelpCenter";
import SystemStatusWidget from "@src/features/status/SystemStatusWidget";

// ----------------------
// Page Metadata
// Purpose: SEO and browser tab configuration
// ----------------------
export const metadata = { 
  title: "Support • Help Center",
  description: "Get help with your account, find answers to common questions, and contact our support team."
};

// ----------------------
// Main Public Support Page Component
// Purpose: Layout and structure for public help center
// Note: No authentication checks - completely public access
// ----------------------
export default function PublicSupportPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10 space-y-10">
      {/* ----------------------
      // Page Header
      // Clear title and description for help center
      // ---------------------- */}
      <header className="space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Help Center</h1>
        <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
          Search guides, browse topics by category, or contact support. 
          Find answers to common questions and get the help you need.
        </p>
      </header>

      {/* ----------------------
      // Public Help Center Component
      // Main help center functionality with search, topics, and contact options
      // ---------------------- */}
      <PublicHelpCenter />

      {/* ----------------------
      // System Status Widget
      // Public variant shows service status without internal details
      // ---------------------- */}
      <SystemStatusWidget variant="public" />
    </main>
  );
}