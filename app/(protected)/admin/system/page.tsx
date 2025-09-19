"use client";

import { AdminPillNavigationComponent } from "@src/components/admin/AdminPillNavigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@src/components/ui/card";
import { Badge } from "@src/components/ui/badge";
import { Button } from "@src/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@src/components/ui/tabs";
import { 
  Shield, 
  Server, 
  Database, 
  Settings, 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  HardDrive,
  Cpu,
  MemoryStick,
  Wifi,
  HardDriveIcon,
  Monitor,
  Zap
} from "lucide-react";

// ----------------------
// System Management Page
// Location: /app/(protected)/admin/system/page.tsx
// Purpose: Comprehensive system management for OnlyFans-like platform
// Features: System status, backups, logs, maintenance, settings
// Note: Mobile-first design with object-oriented structure
// ----------------------

interface SystemStatus {
  id: string;
  component: string;
  status: 'healthy' | 'warning' | 'error' | 'maintenance';
  uptime: number;
  lastCheck: string;
  description: string;
  metrics: {
    cpu: number;
    memory: number;
    disk: number;
    network: number;
  };
}

interface BackupInfo {
  id: string;
  name: string;
  type: 'full' | 'incremental' | 'differential';
  size: number;
  createdAt: string;
  status: 'completed' | 'in_progress' | 'failed';
  location: string;
}

class SystemManagementService {
  private systemStatus: SystemStatus[] = [
    {
      id: '1',
      component: 'Web Server',
      status: 'healthy',
      uptime: 99.9,
      lastCheck: '2025-01-27T10:30:00Z',
      description: 'Main web application server',
      metrics: {
        cpu: 45,
        memory: 67,
        disk: 23,
        network: 89
      }
    },
    {
      id: '2',
      component: 'Database',
      status: 'healthy',
      uptime: 99.8,
      lastCheck: '2025-01-27T10:29:00Z',
      description: 'Primary database server',
      metrics: {
        cpu: 23,
        memory: 45,
        disk: 67,
        network: 12
      }
    },
    {
      id: '3',
      component: 'CDN',
      status: 'warning',
      uptime: 98.5,
      lastCheck: '2025-01-27T10:28:00Z',
      description: 'Content delivery network',
      metrics: {
        cpu: 78,
        memory: 34,
        disk: 12,
        network: 95
      }
    },
    {
      id: '4',
      component: 'File Storage',
      status: 'healthy',
      uptime: 99.7,
      lastCheck: '2025-01-27T10:27:00Z',
      description: 'Media file storage system',
      metrics: {
        cpu: 12,
        memory: 23,
        disk: 89,
        network: 45
      }
    }
  ];

  private backups: BackupInfo[] = [
    {
      id: '1',
      name: 'Daily Backup - 2025-01-27',
      type: 'full',
      size: 2048000000, // 2GB
      createdAt: '2025-01-27T02:00:00Z',
      status: 'completed',
      location: 's3://fanzit-backups/daily/2025-01-27'
    },
    {
      id: '2',
      name: 'Incremental Backup - 2025-01-27',
      type: 'incremental',
      size: 512000000, // 512MB
      createdAt: '2025-01-27T14:00:00Z',
      status: 'in_progress',
      location: 's3://fanzit-backups/incremental/2025-01-27'
    },
    {
      id: '3',
      name: 'Weekly Backup - 2025-01-20',
      type: 'full',
      size: 4096000000, // 4GB
      createdAt: '2025-01-20T02:00:00Z',
      status: 'completed',
      location: 's3://fanzit-backups/weekly/2025-01-20'
    }
  ];

  public getSystemStatus(): SystemStatus[] {
    return this.systemStatus;
  }

  public getBackups(): BackupInfo[] {
    return this.backups;
  }

  public getSystemStats() {
    const totalComponents = this.systemStatus.length;
    const healthyComponents = this.systemStatus.filter(s => s.status === 'healthy').length;
    const warningComponents = this.systemStatus.filter(s => s.status === 'warning').length;
    const errorComponents = this.systemStatus.filter(s => s.status === 'error').length;
    const avgUptime = this.systemStatus.reduce((sum, s) => sum + s.uptime, 0) / totalComponents;

    return {
      totalComponents,
      healthyComponents,
      warningComponents,
      errorComponents,
      avgUptime: avgUptime.toFixed(1)
    };
  }
}

class SystemStatusCardComponent {
  private status: SystemStatus;

  constructor(status: SystemStatus) {
    this.status = status;
  }

  private getStatusBadge() {
    const statusConfig = {
      healthy: { variant: 'default' as const, icon: CheckCircle, text: 'Healthy' },
      warning: { variant: 'secondary' as const, icon: AlertTriangle, text: 'Warning' },
      error: { variant: 'destructive' as const, icon: AlertTriangle, text: 'Error' },
      maintenance: { variant: 'secondary' as const, icon: Clock, text: 'Maintenance' }
    };

    const config = statusConfig[this.status.status];
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {config.text}
      </Badge>
    );
  }

  private getComponentIcon() {
    const componentIcons = {
      'Web Server': Server,
      'Database': Database,
      'CDN': Wifi,
      'File Storage': HardDrive
    };

    const Icon = componentIcons[this.status.component as keyof typeof componentIcons] || Server;
    return <Icon className="h-4 w-4" />;
  }

  public render() {
    return (
      <Card className="hover:shadow-lg transition-shadow duration-200">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                {this.getComponentIcon()}
              </div>
              <div className="flex-1 min-w-0">
                <CardTitle className="text-lg flex items-center gap-2">
                  {this.status.component}
                </CardTitle>
                <CardDescription className="line-clamp-2">
                  {this.status.description}
                </CardDescription>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline" className="text-xs">
                    {this.status.uptime}% uptime
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              {this.getStatusBadge()}
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Metrics */}
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center justify-center gap-1 text-blue-600">
                <Cpu className="h-4 w-4" />
                <span className="font-semibold">{this.status.metrics.cpu}%</span>
              </div>
              <p className="text-xs text-muted-foreground">CPU</p>
            </div>
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center justify-center gap-1 text-green-600">
                <MemoryStick className="h-4 w-4" />
                <span className="font-semibold">{this.status.metrics.memory}%</span>
              </div>
              <p className="text-xs text-muted-foreground">Memory</p>
            </div>
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center justify-center gap-1 text-orange-600">
                <HardDriveIcon className="h-4 w-4" />
                <span className="font-semibold">{this.status.metrics.disk}%</span>
              </div>
              <p className="text-xs text-muted-foreground">Disk</p>
            </div>
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center justify-center gap-1 text-purple-600">
                <Wifi className="h-4 w-4" />
                <span className="font-semibold">{this.status.metrics.network}%</span>
              </div>
              <p className="text-xs text-muted-foreground">Network</p>
            </div>
          </div>

          <div className="text-sm text-muted-foreground">
            Last check: {new Date(this.status.lastCheck).toLocaleString()}
          </div>
        </CardContent>
      </Card>
    );
  }
}

class BackupCardComponent {
  private backup: BackupInfo;

  constructor(backup: BackupInfo) {
    this.backup = backup;
  }

  private getStatusBadge() {
    const statusConfig = {
      completed: { variant: 'default' as const, icon: CheckCircle, text: 'Completed' },
      in_progress: { variant: 'secondary' as const, icon: Clock, text: 'In Progress' },
      failed: { variant: 'destructive' as const, icon: AlertTriangle, text: 'Failed' }
    };

    const config = statusConfig[this.backup.status];
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {config.text}
      </Badge>
    );
  }

  private getTypeIcon() {
    const typeIcons = {
      full: HardDrive,
      incremental: Database,
      differential: HardDriveIcon
    };

    const Icon = typeIcons[this.backup.type];
    return <Icon className="h-4 w-4" />;
  }

  private formatSize(bytes: number): string {
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 B';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  }

  public render() {
    return (
      <Card className="hover:shadow-lg transition-shadow duration-200">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                {this.getTypeIcon()}
              </div>
              <div className="flex-1 min-w-0">
                <CardTitle className="text-lg flex items-center gap-2">
                  {this.backup.name}
                </CardTitle>
                <CardDescription className="line-clamp-2">
                  {this.backup.location}
                </CardDescription>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline" className="text-xs">
                    {this.backup.type}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {this.formatSize(this.backup.size)}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              {this.getStatusBadge()}
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="text-sm text-muted-foreground">
            Created: {new Date(this.backup.createdAt).toLocaleString()}
          </div>
        </CardContent>
      </Card>
    );
  }
}

export default function SystemManagementPage() {
  const systemService = new SystemManagementService();
  const systemStatus = systemService.getSystemStatus();
  const backups = systemService.getBackups();
  const stats = systemService.getSystemStats();

  return (
    <div className="space-y-6">
      {/* Header with Pills */}
      <div className="space-y-4">
        <div>
          <h1 className="text-3xl font-bold">System Management</h1>
          <p className="text-muted-foreground">Monitor system health, backups, and maintenance</p>
        </div>
        <AdminPillNavigationComponent />
      </div>

      {/* System Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Components</p>
                <p className="text-2xl font-bold">{stats.totalComponents}</p>
              </div>
              <Server className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Healthy</p>
                <p className="text-2xl font-bold text-green-600">{stats.healthyComponents}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Warnings</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.warningComponents}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Uptime</p>
                <p className="text-2xl font-bold text-blue-600">{stats.avgUptime}%</p>
              </div>
              <Activity className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Tabs */}
      <Tabs defaultValue="status" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="status">System Status</TabsTrigger>
          <TabsTrigger value="backups">Backups</TabsTrigger>
          <TabsTrigger value="logs">Logs</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="status" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {systemStatus.map((status) => {
              const statusCard = new SystemStatusCardComponent(status);
              return <div key={status.id}>{statusCard.render()}</div>;
            })}
          </div>
        </TabsContent>

        <TabsContent value="backups" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {backups.map((backup) => {
              const backupCard = new BackupCardComponent(backup);
              return <div key={backup.id}>{backupCard.render()}</div>;
            })}
          </div>
        </TabsContent>

        <TabsContent value="logs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Logs</CardTitle>
              <CardDescription>View and manage system logs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-muted/20 rounded-lg">
                <div className="text-center">
                  <Monitor className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">System logs viewer placeholder</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="maintenance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Maintenance Mode</CardTitle>
              <CardDescription>Schedule and manage system maintenance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-muted/20 rounded-lg">
                <div className="text-center">
                  <Settings className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">Maintenance scheduler placeholder</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Settings</CardTitle>
              <CardDescription>Configure system parameters and preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-muted/20 rounded-lg">
                <div className="text-center">
                  <Zap className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">System settings placeholder</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
