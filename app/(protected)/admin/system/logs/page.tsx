// ----------------------
// System Logs Page
// Location: /app/(protected)/admin/system/(tabs)/logs/page.tsx
// Purpose: System logs and monitoring
// Parent: System tabs layout with header and pill navigation
// ----------------------

"use client";

import requireAdminPage from "@src/features/admin/auth/requireAdminPage";
import { FileText, Download, Filter, Search, AlertCircle, Info, AlertTriangle } from "lucide-react";

// ----------------------
// System Logs Component
// Purpose: Display and filter system logs
// ----------------------
function SystemLogsPage() {
  const logLevels = [
    { value: "all", label: "All Levels", color: "text-gray-600" },
    { value: "info", label: "Info", color: "text-blue-600" },
    { value: "warning", label: "Warning", color: "text-yellow-600" },
    { value: "error", label: "Error", color: "text-red-600" }
  ];

  const mockLogs = [
    {
      id: 1,
      timestamp: "2024-01-18 14:23:45",
      level: "info",
      message: "User authentication successful",
      source: "auth.service",
      userId: "user123"
    },
    {
      id: 2,
      timestamp: "2024-01-18 14:22:12",
      level: "warning",
      message: "High memory usage detected",
      source: "system.monitor",
      details: "Memory usage at 85%"
    },
    {
      id: 3,
      timestamp: "2024-01-18 14:21:30",
      level: "error",
      message: "Database connection timeout",
      source: "database.pool",
      details: "Connection to primary DB failed"
    },
    {
      id: 4,
      timestamp: "2024-01-18 14:20:15",
      level: "info",
      message: "Background job completed successfully",
      source: "jobs.processor",
      jobId: "job_456"
    },
    {
      id: 5,
      timestamp: "2024-01-18 14:19:02",
      level: "warning",
      message: "API rate limit approaching",
      source: "api.gateway",
      details: "85% of hourly limit used"
    }
  ];

  const getLogIcon = (level: string) => {
    switch (level) {
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case "info":
        return <Info className="h-4 w-4 text-blue-600" />;
      default:
        return <FileText className="h-4 w-4 text-gray-600" />;
    }
  };

  const getLogColor = (level: string) => {
    switch (level) {
      case "error":
        return "border-l-red-500 bg-red-50/5";
      case "warning":
        return "border-l-yellow-500 bg-yellow-50/5";
      case "info":
        return "border-l-blue-500 bg-blue-50/5";
      default:
        return "border-l-gray-500 bg-gray-50/5";
    }
  };

  return (
    <div className="space-y-6">
      {/* Logs Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">System Logs</h2>
          <p className="text-muted-foreground mt-1">View and analyze system logs and events</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors">
          <Download className="h-4 w-4" />
          Export Logs
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search logs..."
                className="w-full pl-10 pr-4 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
          <div className="flex gap-2">
            {logLevels.map((level) => (
              <button
                key={level.value}
                className="px-3 py-2 border border-border rounded-md hover:bg-muted transition-colors text-sm"
              >
                {level.label}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-md hover:bg-muted transition-colors">
            <Filter className="h-4 w-4" />
            More Filters
          </button>
        </div>
      </div>

      {/* Logs List */}
      <div className="space-y-3">
        {mockLogs.map((log) => (
          <div
            key={log.id}
            className={`bg-card rounded-lg border border-border border-l-4 p-4 ${getLogColor(log.level)}`}
          >
            <div className="flex items-start gap-3">
              <div className="mt-1">
                {getLogIcon(log.level)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-sm font-medium text-foreground">
                    {log.timestamp}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full capitalize ${
                    log.level === "error" ? "bg-red-100 text-red-800" :
                    log.level === "warning" ? "bg-yellow-100 text-yellow-800" :
                    log.level === "info" ? "bg-blue-100 text-blue-800" :
                    "bg-gray-100 text-gray-800"
                  }`}>
                    {log.level}
                  </span>
                  <span className="text-xs text-muted-foreground font-mono">
                    {log.source}
                  </span>
                </div>
                <p className="text-sm text-foreground mb-1">
                  {log.message}
                </p>
                {log.details && (
                  <p className="text-xs text-muted-foreground">
                    {log.details}
                  </p>
                )}
                {log.userId && (
                  <p className="text-xs text-muted-foreground">
                    User ID: {log.userId}
                  </p>
                )}
                {log.jobId && (
                  <p className="text-xs text-muted-foreground">
                    Job ID: {log.jobId}
                  </p>
                )}
              </div>
              <button className="text-muted-foreground hover:text-foreground transition-colors">
                <FileText className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      <div className="flex justify-center">
        <button className="px-6 py-2 border border-border rounded-lg hover:bg-muted transition-colors">
          Load More Logs
        </button>
      </div>
    </div>
  );
}

// ----------------------
// Protected System Logs Page Export
// ----------------------
export default requireAdminPage(SystemLogsPage);