"use client"

import { ProtectedRoute } from "@src/features/auth/components/protected-route"
import { ThreeColumnShell } from "@src/components/app/layout/three-column-shell"
import { CheckCircle, XCircle, AlertCircle, Clock, User, Settings, FileText, Shield, TrendingUp, MessageSquare, Megaphone } from "lucide-react"
import AnnouncementModal from "@src/features/right-rail/AnnouncementModal"
import AnnouncementStack from "@src/features/right-rail/AnnouncementStack"
import { useState } from "react"

// ----------------------
// Admin Support Dashboard Page
// Location: /app/(protected)/admin/page.tsx
// Purpose: Comprehensive admin support dashboard with three-column layout
// Protection: Requires admin authentication for admin access
// Layout: ThreeColumnShell with left rail (admin profile), center (tools), right rail (status/activity)
// ----------------------

// ----------------------
// Mock Data Constants
// System status, recent activity, and support statistics
// ----------------------
const SYSTEM_STATUS = [
  { name: "API Gateway", state: "operational" as const },
  { name: "Database", state: "operational" as const },
  { name: "Payment System", state: "degraded" as const },
  { name: "CDN", state: "operational" as const },
  { name: "Email Service", state: "maintenance" as const },
]

const RECENT_ACTIVITY = [
  { id: 1, title: "User reported payment issue", timeAgo: "2 min ago", icon: "alert" as const },
  { id: 2, title: "New creator verification request", timeAgo: "5 min ago", icon: "user" as const },
  { id: 3, title: "System maintenance completed", timeAgo: "1 hour ago", icon: "settings" as const },
  { id: 4, title: "Content flagged for review", timeAgo: "2 hours ago", icon: "flag" as const },
]

const SUPPORT_STATS = {
  avgResponseTime: "2.3 hours",
  resolutionRate: "94.2%",
  satisfaction: "4.8/5.0",
}

// ----------------------
// Reusable UI Components
// Card, SectionHeading, Dot, and ActivityIcon components
// ----------------------
function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-white/5 bg-white/5 p-4 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/5 ${className}`}>
      {children}
    </div>
  )
}

function SectionHeading({ title, action }: { title: string; action?: React.ReactNode }) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <h2 className="text-lg font-semibold tracking-tight text-white">{title}</h2>
      {action}
    </div>
  )
}

function Dot({ state }: { state: "operational" | "degraded" | "maintenance" | "down" }) {
  const colors = {
    operational: "bg-emerald-500",
    degraded: "bg-amber-500",
    maintenance: "bg-blue-500",
    down: "bg-red-500",
  }
  return <div className={`h-2 w-2 rounded-full ${colors[state]}`} />
}

function ActivityIcon({ kind }: { kind: "alert" | "user" | "settings" | "flag" }) {
  const icons = {
    alert: <AlertCircle className="h-4 w-4 text-amber-400" />,
    user: <User className="h-4 w-4 text-blue-400" />,
    settings: <Settings className="h-4 w-4 text-emerald-400" />,
    flag: <FileText className="h-4 w-4 text-red-400" />,
  }
  return icons[kind]
}

// ----------------------
// Left Rail Component
// Admin profile, support status, and navigation
// Location: Left column of ThreeColumnShell
// ----------------------
function LeftRail() {
  return (
    <div className="space-y-6">
      <Card>
        <div className="flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-full bg-white/10 text-xl font-bold">S</div>
          <div>
            <div className="text-sm font-medium text-white">Support Admin</div>
            <div className="text-xs text-white/60">@support</div>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 divide-x divide-white/10 rounded-lg border border-white/10">
          <div className="p-3 text-center">
            <div className="text-lg font-semibold text-white">0</div>
            <div className="text-[11px] uppercase tracking-wide text-white/60">Tickets</div>
          </div>
          <div className="p-3 text-center">
            <div className="text-lg font-semibold text-white">0</div>
            <div className="text-[11px] uppercase tracking-wide text-white/60">Resolved</div>
          </div>
        </div>
      </Card>

      <Card className="bg-emerald-600/15">
        <div className="flex items-start gap-3">
          <div className="mt-1 h-5 w-5 rounded-full bg-emerald-500/90" />
          <div>
            <div className="text-base font-semibold text-white">Support Status</div>
            <div className="text-sm text-white/80">All systems operational</div>
            <div className="text-xs text-white/60">Last updated: 9/14/2025</div>
          </div>
        </div>
      </Card>

      <Card>
        <SectionHeading title="Support" />
        <div className="grid gap-2">
          <button className="rounded-lg bg-white/5 px-3 py-2 text-left text-sm text-white/90 hover:bg-white/10">Live Chat (internal)</button>
          <button className="rounded-lg bg-white/5 px-3 py-2 text-left text-sm text-white/90 hover:bg-white/10">Tickets</button>
        </div>
      </Card>

      <Card>
        <SectionHeading title="Navigation" />
        <div className="grid gap-2">
          <button className="rounded-lg bg-white/5 px-3 py-2 text-left text-sm text-white/90 hover:bg-white/10">Account</button>
          <button className="rounded-lg bg-white/5 px-3 py-2 text-left text-sm text-white/90 hover:bg-white/10">Search</button>
        </div>
      </Card>
    </div>
  )
}

// ----------------------
// Center Column Component
// Admin tools and operations
// Location: Center column of ThreeColumnShell
// ----------------------
function AdminToolsTile({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-white/5 bg-gradient-to-b from-white/5 to-white/[0.03] p-5 hover:from-white/10">
      <div className="text-base font-semibold text-white">{title}</div>
      <div className="mt-1 text-sm leading-6 text-white/70">{desc}</div>
    </div>
  )
}

function CenterColumn({ onOpenAnnouncementModal }: { onOpenAnnouncementModal: () => void }) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Admin Tools</h1>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <AdminToolsTile title="User Management" desc="Ban, verify, or update user accounts" />
          <AdminToolsTile title="Creator Oversight" desc="Review creator profiles and content" />
          <AdminToolsTile title="Payment Audits" desc="Track payouts, refunds, and disputes" />
          <AdminToolsTile title="Content Moderation" desc="Flagged posts, DMCA, reports" />
          <AdminToolsTile title="Platform Settings" desc="Feature toggles, system configs" />
          <AdminToolsTile title="Analytics" desc="KPIs, growth metrics, performance" />
          
          {/* Announcement Management Tool */}
          <div 
            onClick={onOpenAnnouncementModal}
            className="cursor-pointer rounded-2xl border border-white/10 bg-white/5 p-4 transition-all hover:bg-white/10 hover:border-white/20"
          >
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-purple-600/20">
                <Megaphone className="h-5 w-5 text-purple-400" />
              </div>
              <div>
                <div className="text-base font-semibold text-white">Announcements</div>
                <div className="mt-1 text-sm leading-6 text-white/70">Manage platform announcements</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white">Admin Operations</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          <Card>
            <div className="text-lg font-semibold text-white">Ticket Queue</div>
            <p className="mt-1 text-sm text-white/70">Assign, re-route, and merge tickets.</p>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <button className="rounded-xl bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-500">Open Queue</button>
              <button className="rounded-xl bg-white/10 px-3 py-2 text-sm text-white hover:bg-white/20">Bulk Actions</button>
            </div>
          </Card>

          <Card>
            <div className="text-lg font-semibold text-white">SLA & Escalations</div>
            <p className="mt-1 text-sm text-white/70">Monitor breaches and escalate to on‑call.</p>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <button className="rounded-xl bg-rose-600 px-3 py-2 text-sm font-medium text-white hover:bg-rose-500">SLA Breaches</button>
              <button className="rounded-xl bg-white/10 px-3 py-2 text-sm text-white hover:bg-white/20">Escalation Rules</button>
            </div>
          </Card>

          <Card>
            <div className="text-lg font-semibold text-white">Canned Responses</div>
            <p className="mt-1 text-sm text-white/70">Create/curate macros for fast replies.</p>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <button className="rounded-xl bg-emerald-600 px-3 py-2 text-sm font-medium text-white hover:bg-emerald-500">Manage Macros</button>
              <button className="rounded-xl bg-white/10 px-3 py-2 text-sm text-white hover:bg-white/20">Usage Stats</button>
            </div>
          </Card>

          <Card>
            <div className="text-lg font-semibold text-white">Flagged Content</div>
            <p className="mt-1 text-sm text-white/70">Moderation queue from reports & signals.</p>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <button className="rounded-xl bg-amber-600 px-3 py-2 text-sm font-medium text-white hover:bg-amber-500">Review Now</button>
              <button className="rounded-xl bg-white/10 px-3 py-2 text-sm text-white hover:bg-white/20">Policies</button>
            </div>
          </Card>

          <Card>
            <div className="text-lg font-semibold text-white">Refunds & Credits</div>
            <p className="mt-1 text-sm text-white/70">Approve/deny payments adjustments.</p>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <button className="rounded-xl bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-500">Pending</button>
              <button className="rounded-xl bg-white/10 px-3 py-2 text-sm text-white hover:bg-white/20">Audit</button>
            </div>
          </Card>

          <Card>
            <div className="text-lg font-semibold text-white">Maintenance & On‑Call</div>
            <p className="mt-1 text-sm text-white/70">Post status updates; manage rotations.</p>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <button className="rounded-xl bg-emerald-600 px-3 py-2 text-sm font-medium text-white hover:bg-emerald-500">Post Update</button>
              <button className="rounded-xl bg-white/10 px-3 py-2 text-sm text-white hover:bg-white/20">On‑Call</button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

// ----------------------
// Right Rail Component
// System status, recent activity, and support statistics
// Location: Right column of ThreeColumnShell
// ----------------------
function RightRail() {
  return (
    <div className="space-y-6">
      <Card>
        <SectionHeading title="System Status" />
        <div className="grid gap-3">
          {SYSTEM_STATUS.map((s) => (
            <div key={s.name} className="flex items-center justify-between">
              <div className="text-sm text-white/90">{s.name}</div>
              <div className="flex items-center gap-2">
                <Dot state={s.state} />
                <div className="text-xs capitalize text-white/60">{s.state}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <SectionHeading title="Recent Activity" />
        <div className="grid gap-3">
          {RECENT_ACTIVITY.map((a) => (
            <div key={a.id} className="flex items-start gap-3">
              <div className="mt-[3px]"><ActivityIcon kind={a.icon} /></div>
              <div>
                <div className="text-sm text-white/90">{a.title}</div>
                <div className="text-xs text-white/60">{a.timeAgo}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <SectionHeading title="Support Stats" />
        <dl className="grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-lg bg-white/5 p-3">
            <dt className="text-white/60">Avg Response Time</dt>
            <dd className="text-white">{SUPPORT_STATS.avgResponseTime}</dd>
          </div>
          <div className="rounded-lg bg-white/5 p-3">
            <dt className="text-white/60">Resolution Rate</dt>
            <dd className="text-white">{SUPPORT_STATS.resolutionRate}</dd>
          </div>
          <div className="col-span-2 rounded-lg bg-white/5 p-3">
            <dt className="text-white/60">Satisfaction</dt>
            <dd className="text-white">{SUPPORT_STATS.satisfaction}</dd>
          </div>
        </dl>
      </Card>
    </div>
  )
}

// ----------------------
// Main Admin Support Dashboard Page
// Three-column layout with admin profile, tools, and system status
// ----------------------
export default function AdminPage() {
  // ----------------------
  // State Management
  // Purpose: Handle announcement modal visibility and data
  // Location: /app/(protected)/admin/page.tsx
  // ----------------------
  const [isAnnouncementModalOpen, setIsAnnouncementModalOpen] = useState(false)
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null)
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create')

  // ----------------------
  // Modal Handler Functions
  // Purpose: Control announcement modal operations
  // ----------------------
  const handleOpenCreateModal = () => {
    setSelectedAnnouncement(null)
    setModalMode('create')
    setIsAnnouncementModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsAnnouncementModalOpen(false)
    setSelectedAnnouncement(null)
  }

  const handleSaveAnnouncement = (data: any) => {
    // TODO: Implement actual save logic
    console.log('Saving announcement:', data)
    handleCloseModal()
  }

  return (
    <ProtectedRoute requireAdmin={true}>
      <main className="min-h-screen bg-neutral-950 text-white">
        <ThreeColumnShell 
          leftColumn={<LeftRail />} 
          centerColumn={<CenterColumn onOpenAnnouncementModal={handleOpenCreateModal} />} 
          rightColumn={<RightRail />} 
        />
      </main>
      
      {/* Announcement Modal */}
      <AnnouncementModal
        isOpen={isAnnouncementModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveAnnouncement}
        announcement={selectedAnnouncement}
        mode={modalMode}
      />
    </ProtectedRoute>
  )
}