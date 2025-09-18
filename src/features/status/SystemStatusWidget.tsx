"use client"

// ----------------------
// System Status Widget Component
// Location: /src/features/status/SystemStatusWidget.tsx
// Purpose: Display system service status with public and admin variants
// Parent: PublicHelpCenter, AdminDashboard components
// Children: Status indicators, service cards
// ----------------------

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@src/components/ui/card";
import { Badge } from "@src/components/ui/badge";
import { CheckCircle, AlertTriangle, Clock, Activity } from "lucide-react";
import { SystemStatusVariant, SystemStatusService } from "@src/features/support/public/types";

// ----------------------
// Component Props Interface
// Purpose: Define props for status widget with variant support
// ----------------------
interface SystemStatusWidgetProps {
  variant: SystemStatusVariant;
  className?: string;
}

// ----------------------
// Mock System Status Data
// Purpose: Simulate real-time system status for different services
// Note: In production, this would come from actual monitoring APIs
// ----------------------
const SYSTEM_SERVICES: SystemStatusService[] = [
  {
    name: "API Gateway",
    service: "api",
    state: "operational",
    lastUpdated: "2 minutes ago",
    description: "All API endpoints responding normally"
  },
  {
    name: "Database",
    service: "db", 
    state: "operational",
    lastUpdated: "5 minutes ago",
    description: "Database queries performing optimally"
  },
  {
    name: "Payment System",
    service: "payments",
    state: "degraded",
    lastUpdated: "15 minutes ago",
    description: "Some payment processing delays"
  },
  {
    name: "CDN",
    service: "cdn",
    state: "operational", 
    lastUpdated: "1 minute ago",
    description: "Content delivery network running smoothly"
  },
  {
    name: "Email Service",
    service: "email",
    state: "maintenance",
    lastUpdated: "30 minutes ago",
    description: "Scheduled maintenance in progress"
  }
];

// ----------------------
// Status Icon Component
// Purpose: Render appropriate icon based on service state
// ----------------------
function StatusIcon({ state }: { state: SystemStatusService["state"] }) {
  switch (state) {
    case "operational":
      return <CheckCircle className="h-4 w-4 text-emerald-500" />;
    case "degraded":
      return <AlertTriangle className="h-4 w-4 text-amber-500" />;
    case "maintenance":
      return <Clock className="h-4 w-4 text-blue-500" />;
    default:
      return <Activity className="h-4 w-4 text-zinc-400" />;
  }
}

// ----------------------
// Status Badge Component
// Purpose: Render status badge with appropriate styling
// ----------------------
function StatusBadge({ state }: { state: SystemStatusService["state"] }) {
  const variants = {
    operational: "bg-emerald-100 text-emerald-800 border-emerald-200",
    degraded: "bg-amber-100 text-amber-800 border-amber-200", 
    maintenance: "bg-blue-100 text-blue-800 border-blue-200"
  };

  const labels = {
    operational: "Operational",
    degraded: "Degraded",
    maintenance: "Maintenance"
  };

  return (
    <Badge 
      variant="outline" 
      className={`${variants[state]} capitalize`}
    >
      {labels[state]}
    </Badge>
  );
}

// ----------------------
// Main System Status Widget Component
// Purpose: Display system status with variant-specific information
// ----------------------
export default function SystemStatusWidget({ variant, className }: SystemStatusWidgetProps) {
  // ----------------------
  // Filter services based on variant
  // Public variant shows limited information, admin shows more details
  // ----------------------
  const displayServices = variant === "public" 
    ? SYSTEM_SERVICES 
    : SYSTEM_SERVICES;

  // ----------------------
  // Calculate overall system health
  // Purpose: Provide quick overview of system status
  // ----------------------
  const overallStatus = SYSTEM_SERVICES.every(s => s.state === "operational") 
    ? "operational"
    : SYSTEM_SERVICES.some(s => s.state === "degraded")
    ? "degraded" 
    : "maintenance";

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Activity className="h-5 w-5" />
          System Status
          <StatusBadge state={overallStatus} />
        </CardTitle>
        {variant === "admin" && (
          <p className="text-sm text-muted-foreground">
            Real-time monitoring of platform services
          </p>
        )}
      </CardHeader>
      
      <CardContent className="space-y-3">
        {displayServices.map((service) => (
          <div 
            key={service.service}
            className="flex items-center justify-between p-3 rounded-lg border bg-card/50"
          >
            <div className="flex items-center gap-3">
              <StatusIcon state={service.state} />
              <div>
                <div className="font-medium text-sm">{service.name}</div>
                {variant === "admin" && service.description && (
                  <div className="text-xs text-muted-foreground">
                    {service.description}
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <StatusBadge state={service.state} />
              {variant === "admin" && service.lastUpdated && (
                <span className="text-xs text-muted-foreground">
                  {service.lastUpdated}
                </span>
              )}
            </div>
          </div>
        ))}
        
        {variant === "public" && (
          <div className="pt-2 border-t">
            <p className="text-xs text-muted-foreground text-center">
              Last updated: Just now
            </p>
          </div>
        )}
        
        {variant === "admin" && (
          <div className="pt-2 border-t">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Auto-refresh: Every 30 seconds</span>
              <span>Last check: Just now</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}