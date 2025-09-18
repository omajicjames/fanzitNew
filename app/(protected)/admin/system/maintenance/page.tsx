// ----------------------
// System Maintenance Management Page
// Location: /app/(protected)/admin/system/maintenance/page.tsx
// Purpose: Manage system maintenance tasks, schedules, and system health
// Parent: Admin system management section
// Children: Maintenance scheduling, task management, and system optimization
// ----------------------

"use client";

import { useState } from "react";
import { 
  Settings, Calendar, Clock, AlertTriangle, CheckCircle, 
  RefreshCw, Zap, Database, Server, Shield, 
  Play, Pause, RotateCcw, Wrench, Activity
} from "lucide-react";
import requireAdminPage from "@src/features/admin/auth/requireAdminPage";

// ----------------------
// Maintenance Task Interface
// Purpose: Define structure for maintenance task entries
// ----------------------
interface MaintenanceTask {
  id: string;
  name: string;
  type: 'database' | 'cache' | 'logs' | 'security' | 'performance';
  status: 'scheduled' | 'running' | 'completed' | 'failed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  scheduled_at: string;
  duration: string;
  description: string;
}

// ----------------------
// Mock Maintenance Data
// Purpose: Sample maintenance data for demonstration
// ----------------------
const MOCK_TASKS: MaintenanceTask[] = [
  {
    id: "1",
    name: "Database Optimization",
    type: "database",
    status: "scheduled",
    priority: "high",
    scheduled_at: "2024-01-16T02:00:00Z",
    duration: "45 minutes",
    description: "Optimize database indexes and clean up old data"
  },
  {
    id: "2",
    name: "Cache Cleanup",
    type: "cache", 
    status: "running",
    priority: "medium",
    scheduled_at: "2024-01-15T03:00:00Z",
    duration: "15 minutes",
    description: "Clear expired cache entries and optimize memory usage"
  },
  {
    id: "3",
    name: "Security Scan",
    type: "security",
    status: "completed",
    priority: "critical",
    scheduled_at: "2024-01-15T01:00:00Z",
    duration: "30 minutes",
    description: "Run comprehensive security vulnerability scan"
  },
  {
    id: "4",
    name: "Log Rotation",
    type: "logs",
    status: "failed",
    priority: "low",
    scheduled_at: "2024-01-14T23:00:00Z",
    duration: "10 minutes",
    description: "Archive old log files and free up disk space"
  }
];

// ----------------------
// System Maintenance Management Component
// Purpose: Main component for maintenance management interface
// ----------------------
function SystemMaintenancePage() {
  // ----------------------
  // Component State
  // Purpose: Manage maintenance data and UI state
  // ----------------------
  const [tasks, setTasks] = useState<MaintenanceTask[]>(MOCK_TASKS);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [isMaintenanceMode, setIsMaintenanceMode] = useState(false);

  // ----------------------
  // Status Badge Component
  // Purpose: Display task status with appropriate styling
  // ----------------------
  const StatusBadge = ({ status }: { status: MaintenanceTask['status'] }) => {
    const statusConfig = {
      scheduled: { icon: Clock, color: 'text-blue-600 bg-blue-50', label: 'Scheduled' },
      running: { icon: RefreshCw, color: 'text-orange-600 bg-orange-50', label: 'Running' },
      completed: { icon: CheckCircle, color: 'text-green-600 bg-green-50', label: 'Completed' },
      failed: { icon: AlertTriangle, color: 'text-red-600 bg-red-50', label: 'Failed' }
    };

    const config = statusConfig[status];
    const Icon = config.icon;

    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        <Icon className={`w-3 h-3 ${status === 'running' ? 'animate-spin' : ''}`} />
        {config.label}
      </span>
    );
  };

  // ----------------------
  // Priority Badge Component
  // Purpose: Display task priority with appropriate styling
  // ----------------------
  const PriorityBadge = ({ priority }: { priority: MaintenanceTask['priority'] }) => {
    const priorityConfig = {
      low: { color: 'text-gray-600 bg-gray-50', label: 'Low' },
      medium: { color: 'text-yellow-600 bg-yellow-50', label: 'Medium' },
      high: { color: 'text-orange-600 bg-orange-50', label: 'High' },
      critical: { color: 'text-red-600 bg-red-50', label: 'Critical' }
    };

    const config = priorityConfig[priority];

    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  // ----------------------
  // Type Badge Component
  // Purpose: Display task type with appropriate styling
  // ----------------------
  const TypeBadge = ({ type }: { type: MaintenanceTask['type'] }) => {
    const typeConfig = {
      database: { icon: Database, color: 'text-purple-600 bg-purple-50', label: 'Database' },
      cache: { icon: Zap, color: 'text-blue-600 bg-blue-50', label: 'Cache' },
      logs: { icon: Activity, color: 'text-green-600 bg-green-50', label: 'Logs' },
      security: { icon: Shield, color: 'text-red-600 bg-red-50', label: 'Security' },
      performance: { icon: Server, color: 'text-orange-600 bg-orange-50', label: 'Performance' }
    };

    const config = typeConfig[type];
    const Icon = config.icon;

    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        <Icon className="w-3 h-3" />
        {config.label}
      </span>
    );
  };

  // ----------------------
  // Filter Tasks Function
  // Purpose: Filter tasks based on selected type and status
  // ----------------------
  const filteredTasks = tasks.filter(task => {
    const matchesType = selectedType === 'all' || task.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || task.status === selectedStatus;
    return matchesType && matchesStatus;
  });

  // ----------------------
  // Toggle Maintenance Mode Function
  // Purpose: Handle maintenance mode toggle
  // ----------------------
  const handleMaintenanceMode = () => {
    setIsMaintenanceMode(!isMaintenanceMode);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <div className="p-6 max-w-7xl mx-auto">
        {/* ---------------------- */}
        {/* Page Header */}
        {/* ---------------------- */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">System Maintenance</h1>
          <p className="text-neutral-400">Manage system maintenance tasks, schedules, and optimization</p>
        </div>

        {/* ---------------------- */}
        {/* Maintenance Mode Alert */}
        {/* ---------------------- */}
        {isMaintenanceMode && (
          <div className="bg-orange-900/20 border border-orange-800 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-orange-400" />
              <div>
                <h3 className="text-sm font-medium text-orange-300">Maintenance Mode Active</h3>
                <p className="text-sm text-orange-400">The system is currently in maintenance mode. Users may experience limited functionality.</p>
              </div>
            </div>
          </div>
        )}

        {/* ---------------------- */}
        {/* Quick Stats Cards */}
        {/* ---------------------- */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-neutral-900 rounded-lg border border-neutral-800 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-400">Scheduled Tasks</p>
                <p className="text-2xl font-bold text-white">
                  {tasks.filter(t => t.status === 'scheduled').length}
                </p>
              </div>
              <div className="bg-blue-500/20 p-2 rounded-lg">
                <Clock className="w-8 h-8 text-blue-400" />
              </div>
            </div>
          </div>

          <div className="bg-neutral-900 rounded-lg border border-neutral-800 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-400">Running Tasks</p>
                <p className="text-2xl font-bold text-white">
                  {tasks.filter(t => t.status === 'running').length}
                </p>
              </div>
              <div className="bg-orange-500/20 p-2 rounded-lg">
                <RefreshCw className="w-8 h-8 text-orange-400 animate-spin" />
              </div>
            </div>
          </div>

          <div className="bg-neutral-900 rounded-lg border border-neutral-800 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-400">Completed Today</p>
                <p className="text-2xl font-bold text-white">12</p>
              </div>
              <div className="bg-green-500/20 p-2 rounded-lg">
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
            </div>
          </div>

          <div className="bg-neutral-900 rounded-lg border border-neutral-800 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-400">System Health</p>
                <p className="text-2xl font-bold text-white">98%</p>
              </div>
                <Activity className="w-8 h-8 text-purple-400" />
          </div>
        </div>
      </div>

        {/* ---------------------- */}
        {/* Actions and Controls */}
        {/* ---------------------- */}
        <div className="bg-neutral-900 rounded-lg border border-neutral-800 p-6 mb-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div className="flex flex-wrap gap-3">
              <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Play className="w-4 h-4" />
                Schedule Task
              </button>

              <button 
                onClick={handleMaintenanceMode}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                  isMaintenanceMode 
                    ? 'bg-orange-600 text-white border-orange-600 hover:bg-orange-700' 
                    : 'border-neutral-600 text-neutral-300 hover:bg-neutral-800'
                }`}
              >
                {isMaintenanceMode ? <Pause className="w-4 h-4" /> : <Wrench className="w-4 h-4" />}
                {isMaintenanceMode ? 'Exit Maintenance' : 'Maintenance Mode'}
              </button>

              <button className="inline-flex items-center gap-2 px-4 py-2 border border-neutral-600 text-neutral-300 rounded-lg hover:bg-neutral-800 transition-colors">
                <RotateCcw className="w-4 h-4" />
                System Restart
              </button>
            </div>

            <div className="flex items-center gap-3">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-3 py-2 border border-neutral-600 bg-neutral-800 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Types</option>
              <option value="database">Database</option>
              <option value="cache">Cache</option>
              <option value="logs">Logs</option>
              <option value="security">Security</option>
              <option value="performance">Performance</option>
            </select>

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 border border-neutral-600 bg-neutral-800 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Status</option>
              <option value="scheduled">Scheduled</option>
              <option value="running">Running</option>
              <option value="completed">Completed</option>
              <option value="failed">Failed</option>
            </select>
          </div>
        </div>
      </div>

        {/* ---------------------- */}
        {/* Maintenance Tasks Table */}
        {/* ---------------------- */}
        <div className="bg-neutral-900 rounded-lg border border-neutral-800 overflow-hidden">
          <div className="px-6 py-4 border-b border-neutral-800">
            <h2 className="text-lg font-semibold text-white">Maintenance Tasks</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
                  Task Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
                  Scheduled
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-neutral-900 divide-y divide-neutral-800">
              {filteredTasks.map((task) => (
                <tr key={task.id} className="hover:bg-neutral-800">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-white">{task.name}</div>
                      <div className="text-sm text-neutral-400">{task.description}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <TypeBadge type={task.type} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <PriorityBadge priority={task.priority} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={task.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    {new Date(task.scheduled_at).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    {task.duration}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                      {task.status === 'scheduled' && (
                        <button className="text-blue-400 hover:text-blue-300 transition-colors">
                          <Play className="w-4 h-4" />
                        </button>
                      )}
                      {task.status === 'running' && (
                        <button className="text-orange-400 hover:text-orange-300 transition-colors">
                          <Pause className="w-4 h-4" />
                        </button>
                      )}
                      {task.status === 'failed' && (
                        <button className="text-green-400 hover:text-green-300 transition-colors">
                          <RotateCcw className="w-4 h-4" />
                        </button>
                      )}
                      <button className="text-neutral-400 hover:text-white transition-colors">
                        <Settings className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

          {filteredTasks.length === 0 && (
            <div className="text-center py-12">
              <Wrench className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">No maintenance tasks found</h3>
              <p className="text-neutral-400">No tasks match your current filter criteria.</p>
            </div>
          )}
      </div>
      </div>
    </div>
  );
}

export default requireAdminPage(SystemMaintenancePage);