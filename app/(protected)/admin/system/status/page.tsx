// ----------------------
// System Status Page
// Location: /app/(protected)/admin/system/status/page.tsx
// Purpose: Real-time system monitoring and health dashboard
// Protection: Requires admin authentication (inherited from parent layout)
// Parent: Admin dashboard layout with AdminNav sidebar
// Children: System status widgets and monitoring components
// ----------------------

"use client";

import { useState, useEffect } from "react";
import requireAdminPage from "@src/features/admin/auth/requireAdminPage";
import { 
  Activity, 
  Cpu, 
  MemoryStick, 
  HardDrive, 
  Wifi, 
  Database,
  Server,
  AlertTriangle,
  CheckCircle,
  Clock,
  RefreshCw,
  TrendingUp,
  TrendingDown
} from "lucide-react";

// ----------------------
// System Status Component
// Purpose: Display comprehensive system monitoring dashboard
// ----------------------
function SystemStatusPage() {
  // ----------------------
  // State Management
  // Purpose: Track system metrics and refresh status
  // ----------------------
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // ----------------------
  // Mock System Data
  // Purpose: Simulated real-time system metrics
  // ----------------------
  const [systemMetrics, setSystemMetrics] = useState({
    uptime: "15 days, 4 hours, 23 minutes",
    cpu: { usage: 45, cores: 8, temperature: 62 },
    memory: { used: 6.8, total: 16, percentage: 42 },
    disk: { used: 320, total: 1000, percentage: 32 },
    network: { inbound: 125.4, outbound: 89.2 },
    database: { connections: 45, queries: 1247, responseTime: 12 },
    services: [
      { name: "Web Server (Nginx)", status: "healthy", responseTime: 8, uptime: "99.9%" },
      { name: "Application Server", status: "healthy", responseTime: 15, uptime: "99.8%" },
      { name: "Database (PostgreSQL)", status: "healthy", responseTime: 12, uptime: "99.9%" },
      { name: "Redis Cache", status: "healthy", responseTime: 2, uptime: "99.7%" },
      { name: "File Storage", status: "healthy", responseTime: 25, uptime: "99.6%" },
      { name: "Email Service", status: "warning", responseTime: 45, uptime: "98.2%" },
      { name: "Background Jobs", status: "healthy", responseTime: 5, uptime: "99.5%" },
      { name: "CDN", status: "healthy", responseTime: 18, uptime: "99.9%" }
    ]
  });

  // ----------------------
  // Refresh System Data
  // Purpose: Simulate fetching updated system metrics
  // ----------------------
  const refreshSystemData = async () => {
    setIsRefreshing(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Update metrics with slight variations
    setSystemMetrics(prev => ({
      ...prev,
      cpu: { ...prev.cpu, usage: Math.max(20, Math.min(80, prev.cpu.usage + (Math.random() - 0.5) * 10)) },
      memory: { ...prev.memory, percentage: Math.max(30, Math.min(90, prev.memory.percentage + (Math.random() - 0.5) * 5)) },
      network: {
        inbound: Math.max(50, prev.network.inbound + (Math.random() - 0.5) * 20),
        outbound: Math.max(30, prev.network.outbound + (Math.random() - 0.5) * 15)
      }
    }));
    
    setLastUpdated(new Date());
    setIsRefreshing(false);
  };

  // ----------------------
  // Auto-refresh Effect
  // Purpose: Automatically refresh data every 30 seconds
  // ----------------------
  useEffect(() => {
    const interval = setInterval(refreshSystemData, 30000);
    return () => clearInterval(interval);
  }, []);

  // ----------------------
  // Status Badge Component
  // Purpose: Display service status with appropriate styling
  // ----------------------
  const StatusBadge = ({ status }: { status: string }) => {
    const statusConfig = {
      healthy: { color: "bg-green-100 text-green-800", icon: CheckCircle },
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
  // Progress Bar Component
  // Purpose: Visual representation of usage percentages
  // ----------------------
  const ProgressBar = ({ percentage, color = "bg-blue-500" }: { percentage: number; color?: string }) => (
    <div className="w-full bg-[var(--admin-surface)] rounded-full h-2">
      <div 
        className={`h-2 rounded-full transition-all duration-300 ${color}`}
        style={{ width: `${Math.min(100, Math.max(0, percentage))}%` }}
      />
    </div>
  );

  // ----------------------
  // Main Component Render
  // ----------------------
  return (
    <div className="text-[var(--admin-text-primary)] p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 pb-6">
          <div>
            <h1 className="text-3xl font-bold text-[var(--admin-text-primary)] mb-2">System Status</h1>
            <p className="text-[var(--admin-text-secondary)]">Real-time system monitoring and health dashboard</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-[var(--admin-text-secondary)]">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </div>
            <button
              onClick={refreshSystemData}
              disabled={isRefreshing}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-[var(--admin-text-primary)] rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>
        </div>

        {/* System Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* System Uptime */}
          <div className="bg-neutral-900 rounded-lg p-6 border border-neutral-800">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <Clock className="h-5 w-5 text-green-400" />
              </div>
              <h3 className="font-semibold text-[var(--admin-text-primary)]">System Uptime</h3>
            </div>
            <p className="text-xl font-bold text-green-400 mb-2">{systemMetrics.uptime}</p>
            <p className="text-sm text-[var(--admin-text-secondary)]">99.9% availability</p>
          </div>

          {/* CPU Usage */}
          <div className="bg-neutral-900 rounded-lg p-6 border border-neutral-800">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Cpu className="h-5 w-5 text-blue-400" />
              </div>
              <h3 className="font-semibold text-[var(--admin-text-primary)]">CPU Usage</h3>
            </div>
            <p className="text-xl font-bold text-blue-400 mb-2">{systemMetrics.cpu.usage.toFixed(1)}%</p>
            <ProgressBar percentage={systemMetrics.cpu.usage} color="bg-blue-500" />
            <p className="text-sm text-[var(--admin-text-secondary)] mt-2">{systemMetrics.cpu.cores} cores, {systemMetrics.cpu.temperature}°C</p>
          </div>

          {/* Memory Usage */}
          <div className="bg-neutral-900 rounded-lg p-6 border border-neutral-800">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <MemoryStick className="h-5 w-5 text-purple-400" />
              </div>
              <h3 className="font-semibold text-[var(--admin-text-primary)]">Memory Usage</h3>
            </div>
            <p className="text-xl font-bold text-purple-400 mb-2">{systemMetrics.memory.percentage.toFixed(1)}%</p>
            <ProgressBar percentage={systemMetrics.memory.percentage} color="bg-purple-500" />
            <p className="text-sm text-[var(--admin-text-secondary)] mt-2">{systemMetrics.memory.used}GB / {systemMetrics.memory.total}GB</p>
          </div>

          {/* Disk Usage */}
          <div className="bg-neutral-900 rounded-lg p-6 border border-neutral-800">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-orange-500/20 rounded-lg">
                <HardDrive className="h-5 w-5 text-orange-400" />
              </div>
              <h3 className="font-semibold text-[var(--admin-text-primary)]">Disk Usage</h3>
            </div>
            <p className="text-xl font-bold text-orange-400 mb-2">{systemMetrics.disk.percentage}%</p>
            <ProgressBar percentage={systemMetrics.disk.percentage} color="bg-orange-500" />
            <p className="text-sm text-[var(--admin-text-secondary)] mt-2">{systemMetrics.disk.used}GB / {systemMetrics.disk.total}GB</p>
          </div>
        </div>

        {/* Network & Database Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Network Activity */}
          <div className="bg-neutral-900 rounded-lg border border-neutral-800">
            <div className="p-6 border-b border-neutral-800">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-cyan-500/20 rounded-lg">
                  <Wifi className="h-5 w-5 text-cyan-400" />
                </div>
                <h2 className="text-xl font-semibold text-[var(--admin-text-primary)]">Network Activity</h2>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingDown className="h-4 w-4 text-green-400" />
                  <span className="text-neutral-300">Inbound Traffic</span>
                </div>
                <span className="text-green-400 font-semibold">{systemMetrics.network.inbound.toFixed(1)} MB/s</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-blue-400" />
                  <span className="text-neutral-300">Outbound Traffic</span>
                </div>
                <span className="text-blue-400 font-semibold">{systemMetrics.network.outbound.toFixed(1)} MB/s</span>
              </div>
            </div>
          </div>

          {/* Database Performance */}
          <div className="bg-neutral-900 rounded-lg border border-neutral-800">
            <div className="p-6 border-b border-neutral-800">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-500/20 rounded-lg">
                  <Database className="h-5 w-5 text-emerald-400" />
                </div>
                <h2 className="text-xl font-semibold text-[var(--admin-text-primary)]">Database Performance</h2>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-neutral-300">Active Connections</span>
                <span className="text-emerald-400 font-semibold">{systemMetrics.database.connections}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-300">Queries/sec</span>
                <span className="text-emerald-400 font-semibold">{systemMetrics.database.queries}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-300">Avg Response Time</span>
                <span className="text-emerald-400 font-semibold">{systemMetrics.database.responseTime}ms</span>
              </div>
            </div>
          </div>
        </div>

        {/* Services Status */}
        <div className="bg-neutral-900 rounded-lg border border-neutral-800">
          <div className="p-6 border-b border-neutral-800">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-500/20 rounded-lg">
                <Server className="h-5 w-5 text-indigo-400" />
              </div>
              <h2 className="text-xl font-semibold text-[var(--admin-text-primary)]">Service Health</h2>
            </div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {systemMetrics.services.map((service, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-[var(--admin-card-bg)] rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-medium text-[var(--admin-text-primary)] mb-1">{service.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-[var(--admin-text-secondary)]">
                      <span>Response: {service.responseTime}ms</span>
                      <span>Uptime: {service.uptime}</span>
                    </div>
                  </div>
                  <StatusBadge status={service.status} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ----------------------
// Protected System Status Page Export
// Purpose: System status page wrapped with authentication HOC
// ----------------------
export default requireAdminPage(SystemStatusPage);

/* End of System Status Page */