// ----------------------
// Admin Support Tickets Page
// Location: /app/(protected)/admin/support/tickets/page.tsx
// Purpose: Support ticket management dashboard for helpdesk/ops agents
// Protection: Requires admin authentication (inherited from parent layout)
// Parent: Admin dashboard layout with AdminNav sidebar
// Children: Support ticket components and management tools
// ----------------------

"use client";

import { useState } from "react";
import requireAdminPage from "@src/features/admin/auth/requireAdminPage";
import { logger } from "@src/lib/logger";
import { 
  MessageSquare, 
  Clock, 
  User, 
  AlertCircle, 
  CheckCircle, 
  Filter,
  Search,
  MoreHorizontal,
  Eye,
  MessageCircle,
  X
} from "lucide-react";

// ----------------------
// Support Ticket Types
// Purpose: Define ticket status, priority, and data structure
// ----------------------
type TicketStatus = "open" | "in_progress" | "resolved" | "closed";
type TicketPriority = "low" | "medium" | "high" | "urgent";

interface SupportTicket {
  id: string;
  subject: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  customer: {
    name: string;
    email: string;
    avatar?: string;
  };
  assignedAgent?: {
    name: string;
    avatar?: string;
  };
  createdAt: string;
  updatedAt: string;
  category: string;
  tags: string[];
}

// ----------------------
// Mock Support Tickets Data
// Purpose: Sample data for demonstration
// ----------------------
const MOCK_TICKETS: SupportTicket[] = [
  {
    id: "TKT-001",
    subject: "Payment processing issue",
    description: "Unable to process payment for premium subscription",
    status: "open",
    priority: "high",
    customer: {
      name: "Sarah Johnson",
      email: "sarah.j@email.com"
    },
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T10:30:00Z",
    category: "Billing",
    tags: ["payment", "subscription"]
  },
  {
    id: "TKT-002", 
    subject: "Account verification problems",
    description: "Creator verification documents not being accepted",
    status: "in_progress",
    priority: "medium",
    customer: {
      name: "Mike Chen",
      email: "mike.chen@email.com"
    },
    assignedAgent: {
      name: "Alex Smith"
    },
    createdAt: "2024-01-14T15:45:00Z",
    updatedAt: "2024-01-15T09:20:00Z",
    category: "Verification",
    tags: ["verification", "creator"]
  },
  {
    id: "TKT-003",
    subject: "Content upload failing",
    description: "Videos failing to upload, getting error message",
    status: "resolved",
    priority: "medium",
    customer: {
      name: "Emma Davis",
      email: "emma.d@email.com"
    },
    assignedAgent: {
      name: "Jordan Lee"
    },
    createdAt: "2024-01-13T11:20:00Z",
    updatedAt: "2024-01-14T16:30:00Z",
    category: "Technical",
    tags: ["upload", "video"]
  }
];

// ----------------------
// Status Badge Component
// Purpose: Display ticket status with appropriate styling
// ----------------------
interface StatusBadgeProps {
  status: TicketStatus;
}

function StatusBadge({ status }: StatusBadgeProps) {
  const statusConfig = {
    open: { label: "Open", className: "bg-red-500/20 text-red-400 border-red-500/30" },
    in_progress: { label: "In Progress", className: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
    resolved: { label: "Resolved", className: "bg-green-500/20 text-green-400 border-green-500/30" },
    closed: { label: "Closed", className: "bg-neutral-500/20 text-neutral-400 border-neutral-500/30" }
  };

  const config = statusConfig[status];

  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${config.className}`}>
      {config.label}
    </span>
  );
}

// ----------------------
// Priority Badge Component  
// Purpose: Display ticket priority with color coding
// ----------------------
interface PriorityBadgeProps {
  priority: TicketPriority;
}

function PriorityBadge({ priority }: PriorityBadgeProps) {
  const priorityConfig = {
    low: { label: "Low", className: "bg-blue-500/20 text-blue-400" },
    medium: { label: "Medium", className: "bg-yellow-500/20 text-yellow-400" },
    high: { label: "High", className: "bg-orange-500/20 text-orange-400" },
    urgent: { label: "Urgent", className: "bg-red-500/20 text-red-400" }
  };

  const config = priorityConfig[priority];

  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config.className}`}>
      {config.label}
    </span>
  );
}

// ----------------------
// Ticket Row Component
// Purpose: Individual ticket row in the table
// ----------------------
interface TicketRowProps {
  ticket: SupportTicket;
  onViewTicket: (ticketId: string) => void;
}

function TicketRow({ ticket, onViewTicket }: TicketRowProps) {
  return (
    <tr className="border-b border-white/10 hover:bg-white/5 transition-colors">
      <td className="px-6 py-4">
        <div className="flex items-center space-x-3">
          <MessageSquare className="h-4 w-4 text-neutral-400" />
          <div>
            <div className="font-medium text-white">{ticket.id}</div>
            <div className="text-sm text-neutral-400">{ticket.category}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <div>
          <div className="font-medium text-white truncate max-w-xs">{ticket.subject}</div>
          <div className="text-sm text-neutral-400 truncate max-w-xs">{ticket.description}</div>
        </div>
      </td>
      <td className="px-6 py-4">
        <div>
          <div className="font-medium text-white">{ticket.customer.name}</div>
          <div className="text-sm text-neutral-400">{ticket.customer.email}</div>
        </div>
      </td>
      <td className="px-6 py-4">
        <StatusBadge status={ticket.status} />
      </td>
      <td className="px-6 py-4">
        <PriorityBadge priority={ticket.priority} />
      </td>
      <td className="px-6 py-4">
        <div className="text-sm text-neutral-400">
          {ticket.assignedAgent ? ticket.assignedAgent.name : "Unassigned"}
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="text-sm text-neutral-400">
          {new Date(ticket.createdAt).toLocaleDateString()}
        </div>
      </td>
      <td className="px-6 py-4">
        <button
          onClick={() => onViewTicket(ticket.id)}
          className="p-2 text-neutral-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
        >
          <Eye className="h-4 w-4" />
        </button>
      </td>
    </tr>
  );
}

// ----------------------
// Support Tickets Dashboard Component
// Purpose: Main dashboard for managing support tickets
// ----------------------
export default function SupportTicketsPage() {
  const [tickets] = useState<SupportTicket[]>(MOCK_TICKETS);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<TicketStatus | "all">("all");

  // ----------------------
  // Filter tickets based on search and status
  // ----------------------
  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         ticket.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         ticket.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || ticket.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // ----------------------
  // Handle ticket view action
  // ----------------------
  const handleViewTicket = (ticketId: string) => {
    logger.info(`Viewing ticket: ${ticketId}`, "SupportTickets");
    // TODO: Implement ticket detail view
  };

  return (
    <div className="p-6 space-y-6">
      {/* ----------------------
      // Page Header
      // Purpose: Title and summary stats
      // ---------------------- */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Support Tickets</h1>
          <p className="text-neutral-400">Manage customer support requests and helpdesk operations</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="bg-white/5 border border-white/10 rounded-lg px-4 py-2">
            <div className="text-sm text-neutral-400">Open Tickets</div>
            <div className="text-xl font-bold text-white">
              {tickets.filter(t => t.status === "open").length}
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-lg px-4 py-2">
            <div className="text-sm text-neutral-400">In Progress</div>
            <div className="text-xl font-bold text-white">
              {tickets.filter(t => t.status === "in_progress").length}
            </div>
          </div>
        </div>
      </div>

      {/* ----------------------
      // Filters and Search
      // Purpose: Filter tickets by status and search
      // ---------------------- */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
          <input
            type="text"
            placeholder="Search tickets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as TicketStatus | "all")}
          className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
        >
          <option value="all">All Status</option>
          <option value="open">Open</option>
          <option value="in_progress">In Progress</option>
          <option value="resolved">Resolved</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      {/* ----------------------
      // Tickets Table
      // Purpose: Display filtered tickets in table format
      // ---------------------- */}
      <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/5 border-b border-white/10">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
                  Ticket
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
                  Subject
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
                  Assigned
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredTickets.map((ticket) => (
                <TicketRow
                  key={ticket.id}
                  ticket={ticket}
                  onViewTicket={handleViewTicket}
                />
              ))}
            </tbody>
          </table>
        </div>

        {filteredTickets.length === 0 && (
          <div className="text-center py-12">
            <MessageSquare className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">No tickets found</h3>
            <p className="text-neutral-400">
              {searchQuery || statusFilter !== "all" 
                ? "Try adjusting your search or filters" 
                : "No support tickets available"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}