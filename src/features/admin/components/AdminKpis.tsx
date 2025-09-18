// ----------------------
// Admin KPIs Component
// Location: /src/features/admin/components/AdminKpis.tsx
// Purpose: Display key performance indicators for admin dashboard
// Parent: EnhancedAdminPageClient component
// Children: Individual KPI cards with icons and statistics
// ----------------------

import { Users, UserCheck, FileText, DollarSign } from "lucide-react";
import type { Kpi } from "@src/features/support/public/types";

// ----------------------
// KPI Display Interface
// Purpose: Extended interface for displaying KPI data with UI elements
// ----------------------
interface KpiDisplayData {
  kpi: Kpi;
  label: string;
  icon: "Users" | "UserCheck" | "FileText" | "DollarSign";
  change?: string;
}

interface KpiCardProps {
  data: KpiDisplayData;
  className?: string;
}

// ----------------------
// Individual KPI Card Component
// Purpose: Display single KPI with icon, label, and value
// ----------------------
function KpiCard({ data, className = "" }: KpiCardProps) {
  // ----------------------
  // Icon Mapping
  // Purpose: Map KPI types to appropriate Lucide icons
  // ----------------------
  const getIcon = () => {
    switch (data.icon) {
      case "Users":
        return <Users className="h-5 w-5" />;
      case "UserCheck":
        return <UserCheck className="h-5 w-5" />;
      case "FileText":
        return <FileText className="h-5 w-5" />;
      case "DollarSign":
        return <DollarSign className="h-5 w-5" />;
      default:
        return <Users className="h-5 w-5" />;
    }
  };

  // ----------------------
  // Color Theme Mapping
  // Purpose: Apply consistent color themes based on KPI type
  // ----------------------
  const getColorTheme = () => {
    switch (data.icon) {
      case "Users":
        return "text-zinc-400 bg-zinc-500/10";
      case "UserCheck":
        return "text-emerald-400 bg-emerald-500/10";
      case "FileText":
        return "text-violet-400 bg-violet-500/10";
      case "DollarSign":
        return "text-amber-400 bg-amber-500/10";
      default:
        return "text-zinc-400 bg-zinc-500/10";
    }
  };

  // ----------------------
  // Value Formatting
  // Purpose: Format KPI values based on type
  // ----------------------
  const formatValue = () => {
    if (data.kpi.kind === "monthly_revenue") {
      // Convert cents to dollars for display
      return `$${(data.kpi.value / 100).toLocaleString()}`;
    }
    return data.kpi.value.toLocaleString();
  };

  return (
    <div className={`rounded-2xl border border-white/5 bg-white/5 p-6 backdrop-blur supports-[backdrop-filter]:bg-white/5 ${className}`}>
      {/* ----------------------
      // Icon Container
      // Purpose: Display themed icon for the KPI
      // ---------------------- */}
      <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${getColorTheme()}`}>
        {getIcon()}
      </div>
      
      {/* ----------------------
      // KPI Content
      // Purpose: Display label and value with proper typography
      // ---------------------- */}
      <div className="mt-4 space-y-1">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {data.label}
        </p>
        <p className="text-2xl font-semibold text-white">
          {formatValue()}
        </p>
        
        {/* ----------------------
        // Optional Change Indicator
        // Purpose: Show percentage change if available
        // ---------------------- */}
        {data.change && (
          <p className={`text-xs ${data.change.startsWith('+') ? 'text-emerald-400' : 'text-red-400'}`}>
            {data.change} from last month
          </p>
        )}
      </div>
    </div>
  );
}

// ----------------------
// Main AdminKpis Component
// Purpose: Grid layout of all KPI cards
// ----------------------
interface AdminKpisProps {
  className?: string;
}

export default function AdminKpis({ className = "" }: AdminKpisProps) {
  // ----------------------
  // Mock KPI Data
  // Purpose: Sample data for demonstration (replace with real API data)
  // Note: In production, this would come from props or API calls
  // ----------------------
  const kpiDisplayData: KpiDisplayData[] = [
    {
      kpi: { kind: "total_users", value: 12847 },
      label: "Total Users",
      icon: "Users",
      change: "+12.5%"
    },
    {
      kpi: { kind: "verified_creators", value: 1234 },
      label: "Verified Creators", 
      icon: "UserCheck",
      change: "+8.2%"
    },
    {
      kpi: { kind: "total_posts", value: 45678 },
      label: "Total Posts",
      icon: "FileText",
      change: "+15.3%"
    },
    {
      kpi: { kind: "monthly_revenue", value: 8943200 }, // in cents
      label: "Monthly Revenue",
      icon: "DollarSign",
      change: "+23.1%"
    }
  ];

  return (
    <div className={`space-y-4 ${className}`}>
      {/* ----------------------
      // Section Header
      // Purpose: Title for the KPIs section
      // ---------------------- */}
      <div>
        <h2 className="text-lg font-semibold text-white">Key Performance Indicators</h2>
        <p className="text-sm text-muted-foreground">Platform metrics and statistics</p>
      </div>

      {/* ----------------------
      // KPI Cards Grid
      // Purpose: Responsive grid layout for KPI cards
      // Layout: 1 column mobile, 2 columns tablet, 4 columns desktop
      // ---------------------- */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpiDisplayData.map((data, index) => (
          <KpiCard key={data.kpi.kind} data={data} />
        ))}
      </div>
    </div>
  );
}