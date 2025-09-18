// ----------------------
// System Management Main Page
// Location: /app/(protected)/admin/system/page.tsx
// Purpose: Main system management dashboard with overview and quick access to system tools
// Protection: Requires admin authentication (inherited from parent layout)
// Parent: Admin dashboard layout with AdminNav sidebar
// Children: System management overview components and navigation cards
// ----------------------

"use client";

import requireAdminPage from "@src/features/admin/auth/requireAdminPage";
import { 
  Activity, 
  FileText, 
  Database, 
  Settings, 
  Users,
  Shield,
  HardDrive,
  Cpu,
  MemoryStick,
  Wifi,
  AlertTriangle,
  CheckCircle,
  Clock
} from "lucide-react";

// ----------------------
// System Management Overview Component
// Purpose: Display system overview and navigation to management tools
// ----------------------
function SystemManagementPage() {
  // ----------------------
  // Mock System Data
  // Purpose: Placeholder data for system metrics and status
  // ----------------------
  const systemMetrics = {
    uptime: "15 days, 4 hours",
    cpuUsage: 45,
    memoryUsage: 68,
    diskUsage: 32,
    activeUsers: 1247,
    totalRequests: 89432,
    errorRate: 0.02
  };

  const systemServices = [
    { name: "Web Server", status: "running", uptime: "15d 4h" },
    { name: "Database", status: "running", uptime: "15d 4h" },
    { name: "Redis Cache", status: "running", uptime: "15d 4h" },
    { name: "File Storage", status: "running", uptime: "15d 4h" },
    { name: "Email Service", status: "warning", uptime: "2h 15m" },
    { name: "Background Jobs", status: "running", uptime: "15d 4h" }
  ];

  const managementTools = [
    {
      title: "System Status",
      description: "Monitor system health and performance metrics",
      icon: Activity,
      href: "/admin/system/status",
      color: "bg-green-500"
    },
    {
      title: "System Logs",
      description: "View and analyze system logs and error reports",
      icon: FileText,
      href: "/admin/system/logs",
      color: "bg-blue-500"
    },
    {
      title: "Database Management",
      description: "Manage database operations and backups",
      icon: Database,
      href: "/admin/system/database",
      color: "bg-purple-500"
    },
    {
      title: "User Management",
      description: "Manage user accounts and permissions",
      icon: Users,
      href: "/admin/system/users",
      color: "bg-orange-500"
    },
    {
      title: "Security Settings",
      description: "Configure security policies and access controls",
      icon: Shield,
      href: "/admin/system/security",
      color: "bg-red-500"
    },
    {
      title: "System Configuration",
      description: "Modify system settings and configurations",
      icon: Settings,
      href: "/admin/system/configuration",
      color: "bg-gray-500"
    }
  ];

  // ----------------------
  // Status Badge Component
  // Purpose: Display service status with appropriate styling
  // ----------------------
  const StatusBadge = ({ status }: { status: string }) => {
    const statusConfig = {
      running: { color: "bg-green-100 text-green-800", icon: CheckCircle },
      warning: { color: "bg-yellow-100 text-yellow-800", icon: AlertTriangle },
      error: { color: "bg-red-100 text-red-800", icon: AlertTriangle }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.error;
    const Icon = config.icon;

    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${config.color}`}>
        <Icon className="h-3 w-3" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  // ----------------------
  // Main Component Render
  // ----------------------
  return (
    <div className="min-h-screen bg-neutral-950 text-white p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="border-b border-neutral-800 pb-6">
          <h1 className="text-3xl font-bold text-white mb-2">System Management</h1>
          <p className="text-neutral-400">Monitor and manage your system infrastructure</p>
        </div>

        {/* System Overview Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-neutral-900 rounded-lg p-6 border border-neutral-800">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <Clock className="h-5 w-5 text-green-400" />
              </div>
              <h3 className="font-semibold text-white">System Uptime</h3>
            </div>
            <p className="text-2xl font-bold text-green-400">{systemMetrics.uptime}</p>
          </div>

          <div className="bg-neutral-900 rounded-lg p-6 border border-neutral-800">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Cpu className="h-5 w-5 text-blue-400" />
              </div>
              <h3 className="font-semibold text-white">CPU Usage</h3>
            </div>
            <p className="text-2xl font-bold text-blue-400">{systemMetrics.cpuUsage}%</p>
          </div>

          <div className="bg-neutral-900 rounded-lg p-6 border border-neutral-800">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <MemoryStick className="h-5 w-5 text-purple-400" />
              </div>
              <h3 className="font-semibold text-white">Memory Usage</h3>
            </div>
            <p className="text-2xl font-bold text-purple-400">{systemMetrics.memoryUsage}%</p>
          </div>

          <div className="bg-neutral-900 rounded-lg p-6 border border-neutral-800">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-orange-500/20 rounded-lg">
                <HardDrive className="h-5 w-5 text-orange-400" />
              </div>
              <h3 className="font-semibold text-white">Disk Usage</h3>
            </div>
            <p className="text-2xl font-bold text-orange-400">{systemMetrics.diskUsage}%</p>
          </div>
        </div>

        {/* System Services Status */}
        <div className="bg-neutral-900 rounded-lg border border-neutral-800">
          <div className="p-6 border-b border-neutral-800">
            <h2 className="text-xl font-semibold text-white">System Services</h2>
            <p className="text-neutral-400 mt-1">Current status of critical system services</p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {systemServices.map((service, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-neutral-800 rounded-lg">
                  <div>
                    <h3 className="font-medium text-white">{service.name}</h3>
                    <p className="text-sm text-neutral-400">Uptime: {service.uptime}</p>
                  </div>
                  <StatusBadge status={service.status} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Management Tools */}
        <div className="bg-neutral-900 rounded-lg border border-neutral-800">
          <div className="p-6 border-b border-neutral-800">
            <h2 className="text-xl font-semibold text-white">Management Tools</h2>
            <p className="text-neutral-400 mt-1">Access system management and configuration tools</p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {managementTools.map((tool, index) => {
                const Icon = tool.icon;
                return (
                  <a
                    key={index}
                    href={tool.href}
                    className="group block p-6 bg-neutral-800 rounded-lg border border-neutral-700 hover:border-neutral-600 transition-all duration-200 hover:bg-neutral-750"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`p-3 ${tool.color} rounded-lg group-hover:scale-110 transition-transform duration-200`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="font-semibold text-white group-hover:text-blue-400 transition-colors">
                        {tool.title}
                      </h3>
                    </div>
                    <p className="text-neutral-400 text-sm leading-relaxed">
                      {tool.description}
                    </p>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ----------------------
// Protected System Management Page Export
// Purpose: System management page wrapped with authentication HOC
// ----------------------
export default requireAdminPage(SystemManagementPage);

/* End of System Management Page */