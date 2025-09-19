// ----------------------
// System Backups Page
// Location: /app/(protected)/admin/system/(tabs)/backups/page.tsx
// Purpose: System backup management and scheduling
// Parent: System tabs layout with header and pill navigation
// ----------------------

"use client";

import requireAdminPage from "@src/features/admin/auth/requireAdminPage";
import { Download, Upload, Clock, CheckCircle, AlertCircle, Play, Calendar, Settings } from "lucide-react";

// ----------------------
// System Backups Component
// Purpose: Manage system backups and schedules
// ----------------------
function SystemBackupsPage() {
  const backupTypes = [
    { value: "full", label: "Full Backup", description: "Complete system backup" },
    { value: "database", label: "Database", description: "Database only backup" },
    { value: "files", label: "Files", description: "User files backup" },
    { value: "config", label: "Configuration", description: "System configuration" }
  ];

  const mockBackups = [
    {
      id: 1,
      name: "Full System Backup",
      type: "full",
      size: "2.3 GB",
      createdAt: "2024-01-18 02:00:00",
      status: "completed",
      duration: "45 minutes",
      description: "Automated daily backup"
    },
    {
      id: 2,
      name: "Database Backup",
      type: "database",
      size: "156 MB",
      createdAt: "2024-01-18 01:00:00",
      status: "completed",
      duration: "12 minutes",
      description: "Database schema and data"
    },
    {
      id: 3,
      name: "Configuration Backup",
      type: "config",
      size: "2.1 MB",
      createdAt: "2024-01-17 23:30:00",
      status: "failed",
      duration: "3 minutes",
      description: "System settings and configs",
      error: "Permission denied on config file"
    },
    {
      id: 4,
      name: "User Files Backup",
      type: "files",
      size: "892 MB",
      createdAt: "2024-01-17 22:00:00",
      status: "completed",
      duration: "28 minutes",
      description: "User uploaded content"
    }
  ];

  const backupSchedule = [
    {
      id: 1,
      name: "Daily Full Backup",
      type: "full",
      schedule: "Every day at 2:00 AM",
      nextRun: "2024-01-19 02:00:00",
      enabled: true,
      retention: "7 days"
    },
    {
      id: 2,
      name: "Hourly Database Backup",
      type: "database",
      schedule: "Every hour",
      nextRun: "2024-01-18 15:00:00",
      enabled: true,
      retention: "24 hours"
    },
    {
      id: 3,
      name: "Weekly Configuration",
      type: "config",
      schedule: "Every Sunday at 1:00 AM",
      nextRun: "2024-01-21 01:00:00",
      enabled: false,
      retention: "4 weeks"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case "failed":
        return <AlertCircle className="h-5 w-5 text-red-600" />;
      default:
        return <Clock className="h-5 w-5 text-yellow-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "failed":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* Backups Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">System Backups</h2>
          <p className="text-muted-foreground mt-1">Manage system backups and restore operations</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors">
          <Play className="h-4 w-4" />
          New Backup
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card rounded-lg border border-border p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Successful</p>
              <p className="text-2xl font-semibold">3</p>
            </div>
          </div>
        </div>
        <div className="bg-card rounded-lg border border-border p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertCircle className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Failed</p>
              <p className="text-2xl font-semibold">1</p>
            </div>
          </div>
        </div>
        <div className="bg-card rounded-lg border border-border p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Calendar className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Scheduled</p>
              <p className="text-2xl font-semibold">3</p>
            </div>
          </div>
        </div>
        <div className="bg-card rounded-lg border border-border p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Settings className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Size</p>
              <p className="text-2xl font-semibold">3.4 GB</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Backups */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Recent Backups</h3>
          <button className="text-sm text-primary hover:text-primary/80 transition-colors">
            View All Backups
          </button>
        </div>
        <div className="space-y-4">
          {mockBackups.map((backup) => (
            <div key={backup.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-muted rounded-lg">
                  {getStatusIcon(backup.status)}
                </div>
                <div className="min-w-0">
                  <h4 className="font-medium text-foreground">{backup.name}</h4>
                  <p className="text-sm text-muted-foreground">{backup.description}</p>
                  <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                    <span>{backup.createdAt}</span>
                    <span>•</span>
                    <span>{backup.size}</span>
                    <span>•</span>
                    <span>{backup.duration}</span>
                  </div>
                  {backup.error && (
                    <p className="text-xs text-red-600 mt-1">Error: {backup.error}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 rounded-full text-xs border ${getStatusColor(backup.status)}`}>
                  {backup.status}
                </span>
                <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
                  <Download className="h-4 w-4" />
                </button>
                <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
                  <Upload className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Backup Schedule */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Backup Schedule</h3>
          <button className="text-sm text-primary hover:text-primary/80 transition-colors">
            Add Schedule
          </button>
        </div>
        <div className="space-y-4">
          {backupSchedule.map((schedule) => (
            <div key={schedule.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-muted rounded-lg">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">{schedule.name}</h4>
                  <p className="text-sm text-muted-foreground">{schedule.schedule}</p>
                  <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                    <span>Next run: {schedule.nextRun}</span>
                    <span>•</span>
                    <span>Keep for: {schedule.retention}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  className={`px-3 py-1 rounded-full text-xs transition-colors ${
                    schedule.enabled
                      ? "bg-green-100 text-green-800 border border-green-200"
                      : "bg-gray-100 text-gray-800 border border-gray-200"
                  }`}
                >
                  {schedule.enabled ? "Enabled" : "Disabled"}
                </button>
                <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
                  <Settings className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ----------------------
// Protected System Backups Page Export
// ----------------------
export default requireAdminPage(SystemBackupsPage);