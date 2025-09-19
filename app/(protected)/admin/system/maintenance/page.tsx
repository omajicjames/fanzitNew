// ----------------------
// System Maintenance Page
// Location: /app/(protected)/admin/system/(tabs)/maintenance/page.tsx
// Purpose: System maintenance and health monitoring
// Parent: System tabs layout with header and pill navigation
// ----------------------

"use client";

import requireAdminPage from "@src/features/admin/auth/requireAdminPage";
import { RefreshCw, Wrench, AlertTriangle, CheckCircle, Clock, Activity, Database, Server, Zap, Settings, Play, Pause, Info } from "lucide-react";

// ----------------------
// System Maintenance Component
// Purpose: System health monitoring and maintenance operations
// ----------------------
function SystemMaintenancePage() {
  const maintenanceTasks = [
    {
      id: 1,
      name: "Database Cleanup",
      description: "Remove old logs and temporary data",
      category: "database",
      lastRun: "2024-01-18 01:00:00",
      nextRun: "2024-01-19 01:00:00",
      status: "completed",
      duration: "15 minutes"
    },
    {
      id: 2,
      name: "Cache Optimization",
      description: "Optimize system cache and clear expired entries",
      category: "performance",
      lastRun: "2024-01-18 00:30:00",
      nextRun: "2024-01-18 12:30:00",
      status: "running",
      duration: "8 minutes"
    },
    {
      id: 3,
      name: "File System Check",
      description: "Check file system integrity and permissions",
      category: "system",
      lastRun: "2024-01-17 23:00:00",
      nextRun: "2024-01-18 23:00:00",
      status: "pending",
      duration: "25 minutes"
    },
    {
      id: 4,
      name: "Security Scan",
      description: "Scan for security vulnerabilities",
      category: "security",
      lastRun: "2024-01-17 22:00:00",
      nextRun: "2024-01-18 22:00:00",
      status: "completed",
      duration: "45 minutes"
    }
  ];

  const systemHealth = [
    {
      component: "Database",
      status: "healthy",
      message: "All connections active",
      uptime: "99.9%",
      responseTime: "45ms"
    },
    {
      component: "Cache",
      status: "warning",
      message: "High memory usage",
      uptime: "98.5%",
      responseTime: "12ms"
    },
    {
      component: "API Gateway",
      status: "healthy",
      message: "All services operational",
      uptime: "99.8%",
      responseTime: "23ms"
    },
    {
      component: "File System",
      status: "critical",
      message: "Disk space low",
      uptime: "95.2%",
      responseTime: "156ms"
    }
  ];

  const recentAlerts = [
    {
      id: 1,
      level: "critical",
      message: "Disk space below 10% on /var partition",
      timestamp: "2024-01-18 14:30:00",
      component: "File System"
    },
    {
      id: 2,
      level: "warning",
      message: "High memory usage detected (85%)",
      timestamp: "2024-01-18 14:22:00",
      component: "System Memory"
    },
    {
      id: 3,
      level: "info",
      message: "Database backup completed successfully",
      timestamp: "2024-01-18 14:00:00",
      component: "Database"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "healthy":
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
      case "critical":
        return <AlertTriangle className="h-5 w-5 text-red-600" />;
      case "running":
        return <RefreshCw className="h-5 w-5 text-blue-600 animate-spin" />;
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      default:
        return <Clock className="h-5 w-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "warning":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "critical":
        return "bg-red-100 text-red-800 border-red-200";
      case "running":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "database":
        return <Database className="h-5 w-5" />;
      case "performance":
        return <Activity className="h-5 w-5" />;
      case "system":
        return <Server className="h-5 w-5" />;
      case "security":
        return <Zap className="h-5 w-5" />;
      default:
        return <Wrench className="h-5 w-5" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Maintenance Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">System Maintenance</h2>
          <p className="text-muted-foreground mt-1">Monitor system health and perform maintenance tasks</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors">
          <RefreshCw className="h-4 w-4" />
          Run Health Check
        </button>
      </div>

      {/* System Health Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {systemHealth.map((health, index) => (
          <div key={index} className="bg-card rounded-lg border border-border p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-foreground">{health.component}</h3>
              {getStatusIcon(health.status)}
            </div>
            <p className="text-sm text-muted-foreground mb-3">{health.message}</p>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Uptime:</span>
                <span className="font-medium">{health.uptime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Response:</span>
                <span className="font-medium">{health.responseTime}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Alerts */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Alerts</h3>
        <div className="space-y-3">
          {recentAlerts.map((alert) => (
            <div key={alert.id} className={`flex items-start gap-3 p-3 rounded-lg border ${
              alert.level === "critical" ? "bg-red-50/5 border-red-200" :
              alert.level === "warning" ? "bg-yellow-50/5 border-yellow-200" :
              "bg-blue-50/5 border-blue-200"
            }`}>
              <div className="mt-1">
                {alert.level === "critical" ? (
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                ) : alert.level === "warning" ? (
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                ) : (
                  <Info className="h-4 w-4 text-blue-600" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium text-foreground">{alert.message}</p>
                  <span className="text-xs text-muted-foreground">{alert.timestamp}</span>
                </div>
                <p className="text-xs text-muted-foreground">{alert.component}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Maintenance Tasks */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Maintenance Tasks</h3>
          <button className="text-sm text-primary hover:text-primary/80 transition-colors">
            Schedule Task
          </button>
        </div>
        <div className="space-y-4">
          {maintenanceTasks.map((task) => (
            <div key={task.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-muted rounded-lg">
                  {getCategoryIcon(task.category)}
                </div>
                <div className="min-w-0">
                  <h4 className="font-medium text-foreground">{task.name}</h4>
                  <p className="text-sm text-muted-foreground">{task.description}</p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                    <span>Last run: {task.lastRun}</span>
                    <span>•</span>
                    <span>Next run: {task.nextRun}</span>
                    <span>•</span>
                    <span>Duration: {task.duration}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-xs border ${getStatusColor(task.status)}`}>
                  {task.status}
                </span>
                {task.status === "running" ? (
                  <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
                    <Pause className="h-4 w-4" />
                  </button>
                ) : (
                  <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
                    <Play className="h-4 w-4" />
                  </button>
                )}
                <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
                  <Settings className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* System Resources */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card rounded-lg border border-border p-6">
          <h3 className="text-lg font-semibold mb-4">System Resources</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">CPU Usage</span>
                <span className="font-medium">45%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: "45%" }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Memory Usage</span>
                <span className="font-medium">85%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-yellow-600 h-2 rounded-full" style={{ width: "85%" }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Disk Usage</span>
                <span className="font-medium">92%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-red-600 h-2 rounded-full" style={{ width: "92%" }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg border border-border p-6">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted transition-colors">
              <div className="flex items-center gap-3">
                <RefreshCw className="h-4 w-4" />
                <span className="text-sm">Clear System Cache</span>
              </div>
            </button>
            <button className="w-full flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted transition-colors">
              <div className="flex items-center gap-3">
                <Database className="h-4 w-4" />
                <span className="text-sm">Optimize Database</span>
              </div>
            </button>
            <button className="w-full flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted transition-colors">
              <div className="flex items-center gap-3">
                <Activity className="h-4 w-4" />
                <span className="text-sm">Restart Services</span>
              </div>
            </button>
            <button className="w-full flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted transition-colors">
              <div className="flex items-center gap-3">
                <Wrench className="h-4 w-4" />
                <span className="text-sm">System Cleanup</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ----------------------
// Protected System Maintenance Page Export
// ----------------------
export default requireAdminPage(SystemMaintenancePage);