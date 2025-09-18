// ----------------------
// System Backups Management Page
// Location: /app/(protected)/admin/system/backups/page.tsx
// Purpose: Manage system backups, database snapshots, and file backups
// Parent: Admin system management section
// Children: Backup scheduling, restore functionality, and backup history
// ----------------------

"use client";

import { useState } from "react";
import { 
  Database, Download, Upload, Calendar, Clock, 
  CheckCircle, AlertCircle, Trash2, RefreshCw,
  HardDrive, FileText, Settings, Play
} from "lucide-react";
import requireAdminPage from "@src/features/admin/auth/requireAdminPage";

// ----------------------
// Backup Item Interface
// Purpose: Define structure for backup entries
// ----------------------
interface BackupItem {
  id: string;
  name: string;
  type: 'database' | 'files' | 'full';
  size: string;
  status: 'completed' | 'in_progress' | 'failed';
  created_at: string;
  duration: string;
}

// ----------------------
// Mock Backup Data
// Purpose: Sample backup data for demonstration
// ----------------------
const MOCK_BACKUPS: BackupItem[] = [
  {
    id: "1",
    name: "Daily Database Backup",
    type: "database",
    size: "2.4 GB",
    status: "completed",
    created_at: "2024-01-15T02:00:00Z",
    duration: "12m 34s"
  },
  {
    id: "2", 
    name: "Weekly Full System Backup",
    type: "full",
    size: "15.7 GB",
    status: "completed",
    created_at: "2024-01-14T01:00:00Z",
    duration: "1h 23m"
  },
  {
    id: "3",
    name: "User Files Backup",
    type: "files",
    size: "8.9 GB", 
    status: "in_progress",
    created_at: "2024-01-15T03:00:00Z",
    duration: "45m 12s"
  }
];

// ----------------------
// System Backups Management Component
// Purpose: Main component for backup management interface
// ----------------------
function SystemBackupsPage() {
  // ----------------------
  // Component State
  // Purpose: Manage backup data and UI state
  // ----------------------
  const [backups, setBackups] = useState<BackupItem[]>(MOCK_BACKUPS);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [isCreatingBackup, setIsCreatingBackup] = useState(false);

  // ----------------------
  // Status Badge Component
  // Purpose: Display backup status with appropriate styling
  // ----------------------
  const StatusBadge = ({ status }: { status: BackupItem['status'] }) => {
    const statusConfig = {
      completed: { icon: CheckCircle, color: 'text-green-600 bg-green-50', label: 'Completed' },
      in_progress: { icon: RefreshCw, color: 'text-blue-600 bg-blue-50', label: 'In Progress' },
      failed: { icon: AlertCircle, color: 'text-red-600 bg-red-50', label: 'Failed' }
    };

    const config = statusConfig[status];
    const Icon = config.icon;

    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        <Icon className="w-3 h-3" />
        {config.label}
      </span>
    );
  };

  // ----------------------
  // Type Badge Component  
  // Purpose: Display backup type with appropriate styling
  // ----------------------
  const TypeBadge = ({ type }: { type: BackupItem['type'] }) => {
    const typeConfig = {
      database: { icon: Database, color: 'text-purple-600 bg-purple-50', label: 'Database' },
      files: { icon: FileText, color: 'text-orange-600 bg-orange-50', label: 'Files' },
      full: { icon: HardDrive, color: 'text-blue-600 bg-blue-50', label: 'Full System' }
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
  // Filter Backups Function
  // Purpose: Filter backups based on selected type
  // ----------------------
  const filteredBackups = backups.filter(backup => 
    selectedType === 'all' || backup.type === selectedType
  );

  // ----------------------
  // Create Backup Function
  // Purpose: Handle new backup creation
  // ----------------------
  const handleCreateBackup = () => {
    setIsCreatingBackup(true);
    // Simulate backup creation
    setTimeout(() => {
      setIsCreatingBackup(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* ---------------------- */}
        {/* Page Header */}
        {/* ---------------------- */}
        <div className="border-b border-neutral-800 pb-6">
          <h1 className="text-3xl font-bold text-white mb-2">System Backups</h1>
          <p className="text-neutral-400">Manage database backups, file backups, and system snapshots</p>
        </div>

        {/* ---------------------- */}
        {/* Quick Stats Cards */}
        {/* ---------------------- */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-neutral-900 rounded-lg border border-neutral-800 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-400">Total Backups</p>
                <p className="text-2xl font-bold text-white">24</p>
              </div>
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Database className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </div>

          <div className="bg-neutral-900 rounded-lg border border-neutral-800 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-400">Storage Used</p>
                <p className="text-2xl font-bold text-white">127 GB</p>
              </div>
              <div className="p-2 bg-green-500/20 rounded-lg">
                <HardDrive className="w-6 h-6 text-green-400" />
              </div>
            </div>
          </div>

          <div className="bg-neutral-900 rounded-lg border border-neutral-800 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-400">Last Backup</p>
                <p className="text-2xl font-bold text-white">2h ago</p>
              </div>
              <div className="p-2 bg-orange-500/20 rounded-lg">
                <Clock className="w-6 h-6 text-orange-400" />
              </div>
            </div>
          </div>

          <div className="bg-neutral-900 rounded-lg border border-neutral-800 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-400">Success Rate</p>
                <p className="text-2xl font-bold text-white">98.5%</p>
              </div>
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <CheckCircle className="w-6 h-6 text-purple-400" />
              </div>
            </div>
          </div>
        </div>

        {/* ---------------------- */}
        {/* Actions and Filters */}
        {/* ---------------------- */}
        <div className="bg-neutral-900 rounded-lg border border-neutral-800 p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleCreateBackup}
                disabled={isCreatingBackup}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                {isCreatingBackup ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Play className="w-4 h-4" />
                )}
                {isCreatingBackup ? 'Creating...' : 'Create Backup'}
              </button>

              <button className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-800 text-white rounded-lg hover:bg-neutral-700 transition-colors">
                <Settings className="w-4 h-4" />
                Schedule Settings
              </button>

              <button className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-800 text-white rounded-lg hover:bg-neutral-700 transition-colors">
                <Upload className="w-4 h-4" />
                Restore Backup
              </button>
            </div>

            <div className="flex items-center gap-3">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-3 py-2 bg-neutral-800 border border-neutral-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Types</option>
                <option value="database">Database</option>
                <option value="files">Files</option>
                <option value="full">Full System</option>
              </select>
            </div>
          </div>
      </div>

        {/* ---------------------- */}
        {/* Backups Table */}
        {/* ---------------------- */}
        <div className="bg-neutral-900 rounded-lg border border-neutral-800 overflow-hidden">
          <div className="px-6 py-4 border-b border-neutral-800">
            <h2 className="text-lg font-semibold text-white">Recent Backups</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neutral-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
                    Backup Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
                    Size
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
                    Created
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
                {filteredBackups.map((backup) => (
                  <tr key={backup.id} className="hover:bg-neutral-800 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-white">{backup.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <TypeBadge type={backup.type} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-300">
                      {backup.size}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={backup.status} />
                  </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-300">
                      {new Date(backup.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-300">
                      {backup.duration}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button className="text-blue-400 hover:text-blue-300 transition-colors">
                          <Download className="w-4 h-4" />
                        </button>
                        <button className="text-red-400 hover:text-red-300 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredBackups.length === 0 && (
            <div className="text-center py-12">
              <Database className="w-12 h-12 text-neutral-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">No backups found</h3>
              <p className="text-neutral-400">No backups match your current filter criteria.</p>
            </div>
          )}
      </div>
      </div>
    </div>
  );
}

export default requireAdminPage(SystemBackupsPage);