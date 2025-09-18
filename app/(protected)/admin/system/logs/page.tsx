// ----------------------
// System Logs Page
// Location: /app/(protected)/admin/system/logs/page.tsx
// Purpose: System monitoring and log management dashboard
// Protection: Requires admin authentication (inherited from parent layout)
// Parent: Admin dashboard layout with AdminNav sidebar
// Children: Log viewer components and filtering controls
// ----------------------

"use client";

import { useState, useEffect } from "react";
import requireAdminPage from "@src/features/admin/auth/requireAdminPage";
import { 
  FileText, 
  Search, 
  Filter, 
  Download, 
  RefreshCw, 
  Calendar,
  Clock,
  AlertTriangle,
  Info,
  CheckCircle,
  XCircle,
  Eye,
  Trash2,
  Archive,
  Server,
  Database,
  Shield,
  Users
} from "lucide-react";

// ----------------------
// Log Entry Interface Types
// Purpose: Define log data structure and severity levels
// ----------------------
interface LogEntry {
  id: string;
  timestamp: string;
  level: 'error' | 'warning' | 'info' | 'debug';
  category: 'system' | 'security' | 'database' | 'user' | 'api';
  message: string;
  details?: string;
  userId?: string;
  ipAddress?: string;
  userAgent?: string;
}

// ----------------------
// System Logs Component
// Purpose: Main log monitoring and management interface
// ----------------------
function SystemLogsPage() {
  // ----------------------
  // State Management
  // Purpose: Track logs, filters, search, and UI states
  // ----------------------
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [filteredLogs, setFilteredLogs] = useState<LogEntry[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDate, setSelectedDate] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [selectedLog, setSelectedLog] = useState<LogEntry | null>(null);
  const [showLogModal, setShowLogModal] = useState(false);

  // ----------------------
  // Mock Log Data
  // Purpose: Simulated log entries for demonstration
  // ----------------------
  const mockLogs: LogEntry[] = [
    {
      id: "1",
      timestamp: "2024-01-15T10:30:15Z",
      level: "error",
      category: "system",
      message: "Database connection timeout",
      details: "Connection to primary database failed after 30 seconds. Attempting failover to secondary database.",
      ipAddress: "192.168.1.100"
    },
    {
      id: "2",
      timestamp: "2024-01-15T10:28:45Z",
      level: "warning",
      category: "security",
      message: "Multiple failed login attempts detected",
      details: "User attempted to login 5 times with incorrect credentials",
      userId: "user_123",
      ipAddress: "203.0.113.45",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
    },
    {
      id: "3",
      timestamp: "2024-01-15T10:25:30Z",
      level: "info",
      category: "user",
      message: "New user registration",
      details: "User successfully completed registration process",
      userId: "user_456",
      ipAddress: "198.51.100.23"
    },
    {
      id: "4",
      timestamp: "2024-01-15T10:20:12Z",
      level: "debug",
      category: "api",
      message: "API rate limit exceeded",
      details: "Client exceeded 1000 requests per hour limit",
      ipAddress: "203.0.113.78"
    },
    {
      id: "5",
      timestamp: "2024-01-15T10:15:08Z",
      level: "error",
      category: "database",
      message: "Query execution failed",
      details: "SELECT query on users table timed out after 60 seconds",
      userId: "admin_001"
    },
    {
      id: "6",
      timestamp: "2024-01-15T10:10:45Z",
      level: "info",
      category: "system",
      message: "System backup completed",
      details: "Daily backup process completed successfully. 2.3GB backed up to cloud storage."
    },
    {
      id: "7",
      timestamp: "2024-01-15T10:05:22Z",
      level: "warning",
      category: "system",
      message: "High memory usage detected",
      details: "System memory usage reached 85%. Consider scaling resources.",
      ipAddress: "192.168.1.100"
    },
    {
      id: "8",
      timestamp: "2024-01-15T10:00:15Z",
      level: "info",
      category: "security",
      message: "Admin login successful",
      details: "Administrator logged in from trusted IP address",
      userId: "admin_001",
      ipAddress: "192.168.1.50"
    }
  ];

  // ----------------------
  // Load Logs Effect
  // Purpose: Initialize log data on component mount
  // ----------------------
  useEffect(() => {
    const loadLogs = async () => {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setLogs(mockLogs);
      setFilteredLogs(mockLogs);
      setIsLoading(false);
    };

    loadLogs();
  }, []);

  // ----------------------
  // Auto-refresh Effect
  // Purpose: Automatically refresh logs when enabled
  // ----------------------
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      // Simulate new log entries
      const newLog: LogEntry = {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        level: ['info', 'warning', 'error'][Math.floor(Math.random() * 3)] as any,
        category: ['system', 'security', 'database', 'user', 'api'][Math.floor(Math.random() * 5)] as any,
        message: "Auto-generated log entry",
        details: "This is a simulated log entry for demonstration purposes"
      };

      setLogs(prev => [newLog, ...prev]);
    }, 10000); // Add new log every 10 seconds

    return () => clearInterval(interval);
  }, [autoRefresh]);

  // ----------------------
  // Filter Logs Effect
  // Purpose: Apply search and filter criteria to log list
  // ----------------------
  useEffect(() => {
    let filtered = logs.filter(log => {
      const matchesSearch = log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (log.details && log.details.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesLevel = selectedLevel === "All" || log.level === selectedLevel.toLowerCase();
      const matchesCategory = selectedCategory === "All" || log.category === selectedCategory.toLowerCase();
      const matchesDate = !selectedDate || log.timestamp.startsWith(selectedDate);
      
      return matchesSearch && matchesLevel && matchesCategory && matchesDate;
    });

    setFilteredLogs(filtered);
  }, [logs, searchTerm, selectedLevel, selectedCategory, selectedDate]);

  // ----------------------
  // Level Badge Component
  // Purpose: Display log level with appropriate styling
  // ----------------------
  const LevelBadge = ({ level }: { level: string }) => {
    const levelConfig = {
      error: { color: "bg-red-100 text-red-800", icon: XCircle },
      warning: { color: "bg-yellow-100 text-yellow-800", icon: AlertTriangle },
      info: { color: "bg-blue-100 text-blue-800", icon: Info },
      debug: { color: "bg-gray-100 text-gray-800", icon: CheckCircle }
    };

    const config = levelConfig[level as keyof typeof levelConfig] || levelConfig.info;
    const Icon = config.icon;

    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${config.color}`}>
        <Icon className="h-3 w-3" />
        {level.toUpperCase()}
      </span>
    );
  };

  // ----------------------
  // Category Badge Component
  // Purpose: Display log category with appropriate styling
  // ----------------------
  const CategoryBadge = ({ category }: { category: string }) => {
    const categoryConfig = {
      system: { color: "bg-purple-100 text-purple-800", icon: Server },
      security: { color: "bg-red-100 text-red-800", icon: Shield },
      database: { color: "bg-green-100 text-green-800", icon: Database },
      user: { color: "bg-blue-100 text-blue-800", icon: Users },
      api: { color: "bg-orange-100 text-orange-800", icon: FileText }
    };

    const config = categoryConfig[category as keyof typeof categoryConfig] || categoryConfig.system;
    const Icon = config.icon;

    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${config.color}`}>
        <Icon className="h-3 w-3" />
        {category.charAt(0).toUpperCase() + category.slice(1)}
      </span>
    );
  };

  // ----------------------
  // Format Timestamp Helper
  // Purpose: Format timestamp for display
  // ----------------------
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString()
    };
  };

  // ----------------------
  // Log Actions
  // Purpose: Handle log management operations
  // ----------------------
  const handleViewLog = (log: LogEntry) => {
    setSelectedLog(log);
    setShowLogModal(true);
  };

  const handleExportLogs = () => {
    const csvContent = [
      ['Timestamp', 'Level', 'Category', 'Message', 'Details', 'IP Address'].join(','),
      ...filteredLogs.map(log => [
        log.timestamp,
        log.level,
        log.category,
        `"${log.message}"`,
        `"${log.details || ''}"`,
        log.ipAddress || ''
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `system-logs-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleClearLogs = () => {
    if (confirm("Are you sure you want to clear all logs? This action cannot be undone.")) {
      setLogs([]);
    }
  };

  const refreshLogs = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLogs([...mockLogs]);
    setIsLoading(false);
  };

  // ----------------------
  // Main Component Render
  // ----------------------
  return (
    <div className="min-h-screen bg-neutral-950 text-white p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 pb-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">System Logs</h1>
            <p className="text-neutral-400">Monitor system events and troubleshoot issues</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <label className="text-sm text-neutral-400">Auto-refresh</label>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={autoRefresh}
                  onChange={(e) => setAutoRefresh(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-neutral-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <button
              onClick={refreshLogs}
              className="flex items-center gap-2 px-4 py-2 bg-neutral-800 text-white rounded-lg hover:bg-neutral-700 transition-colors"
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
            <button
              onClick={handleExportLogs}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Download className="h-4 w-4" />
              Export
            </button>
            <button
              onClick={handleClearLogs}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <Trash2 className="h-4 w-4" />
              Clear
            </button>
          </div>
        </div>

        {/* Log Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-neutral-900 rounded-lg p-6 border border-neutral-800">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-500/20 rounded-lg">
                <XCircle className="h-5 w-5 text-red-400" />
              </div>
              <div>
                <p className="text-sm text-neutral-400">Errors</p>
                <p className="text-2xl font-bold text-white">{logs.filter(l => l.level === 'error').length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-neutral-900 rounded-lg p-6 border border-neutral-800">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-500/20 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-yellow-400" />
              </div>
              <div>
                <p className="text-sm text-neutral-400">Warnings</p>
                <p className="text-2xl font-bold text-white">{logs.filter(l => l.level === 'warning').length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-neutral-900 rounded-lg p-6 border border-neutral-800">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Info className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-neutral-400">Info</p>
                <p className="text-2xl font-bold text-white">{logs.filter(l => l.level === 'info').length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-neutral-900 rounded-lg p-6 border border-neutral-800">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <FileText className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <p className="text-sm text-neutral-400">Total Logs</p>
                <p className="text-2xl font-bold text-white">{logs.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-neutral-900 rounded-lg border border-neutral-800 p-6">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
              <input
                type="text"
                placeholder="Search logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Level Filter */}
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Levels</option>
              <option value="Error">Error</option>
              <option value="Warning">Warning</option>
              <option value="Info">Info</option>
              <option value="Debug">Debug</option>
            </select>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Categories</option>
              <option value="System">System</option>
              <option value="Security">Security</option>
              <option value="Database">Database</option>
              <option value="User">User</option>
              <option value="Api">API</option>
            </select>

            {/* Date Filter */}
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Logs Table */}
        <div className="bg-neutral-900 rounded-lg border border-neutral-800 overflow-hidden">
          {isLoading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
              <p className="text-neutral-400 mt-4">Loading logs...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-neutral-800 border-b border-neutral-700">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-neutral-300">Timestamp</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-neutral-300">Level</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-neutral-300">Category</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-neutral-300">Message</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-neutral-300">IP Address</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-neutral-300">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800">
                  {filteredLogs.map((log) => {
                    const { date, time } = formatTimestamp(log.timestamp);
                    return (
                      <tr key={log.id} className="hover:bg-neutral-800/50 transition-colors">
                        <td className="px-6 py-4 text-sm">
                          <div>
                            <p className="text-white">{time}</p>
                            <p className="text-neutral-400">{date}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <LevelBadge level={log.level} />
                        </td>
                        <td className="px-6 py-4">
                          <CategoryBadge category={log.category} />
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-white font-medium">{log.message}</p>
                          {log.details && (
                            <p className="text-neutral-400 text-sm mt-1 truncate max-w-md">
                              {log.details}
                            </p>
                          )}
                        </td>
                        <td className="px-6 py-4 text-sm text-neutral-300">
                          {log.ipAddress || '-'}
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleViewLog(log)}
                            className="p-1 text-neutral-400 hover:text-blue-400 transition-colors"
                            title="View details"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {filteredLogs.length === 0 && (
                <div className="p-8 text-center">
                  <FileText className="h-12 w-12 text-neutral-600 mx-auto mb-4" />
                  <p className="text-neutral-400">No logs found matching your criteria</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Log Detail Modal */}
        {showLogModal && selectedLog && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-neutral-900 rounded-lg border border-neutral-800 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <div className="p-6 border-b border-neutral-800">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-white">Log Details</h2>
                  <button
                    onClick={() => setShowLogModal(false)}
                    className="text-neutral-400 hover:text-white"
                  >
                    ×
                  </button>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-400 mb-1">Timestamp</label>
                    <p className="text-white">{new Date(selectedLog.timestamp).toLocaleString()}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-400 mb-1">Level</label>
                    <LevelBadge level={selectedLog.level} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-400 mb-1">Category</label>
                    <CategoryBadge category={selectedLog.category} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-400 mb-1">IP Address</label>
                    <p className="text-white">{selectedLog.ipAddress || 'N/A'}</p>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-400 mb-1">Message</label>
                  <p className="text-white">{selectedLog.message}</p>
                </div>
                {selectedLog.details && (
                  <div>
                    <label className="block text-sm font-medium text-neutral-400 mb-1">Details</label>
                    <div className="bg-neutral-800 rounded-lg p-4">
                      <pre className="text-white text-sm whitespace-pre-wrap">{selectedLog.details}</pre>
                    </div>
                  </div>
                )}
                {selectedLog.userAgent && (
                  <div>
                    <label className="block text-sm font-medium text-neutral-400 mb-1">User Agent</label>
                    <p className="text-white text-sm">{selectedLog.userAgent}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ----------------------
// Protected System Logs Page Export
// Purpose: System logs page wrapped with authentication HOC
// ----------------------
export default requireAdminPage(SystemLogsPage);

/* End of System Logs Page */