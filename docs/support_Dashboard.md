import React from "react";

// ---------------------------------------------------------------------------
// Admin Support Dashboard (Three‑Column)
// - Stack: React + TailwindCSS (no external UI libs required)
// - Purpose: Internal admin view for monitoring support health, activity, and KPIs
// - Notes:
//   • Replace mocked data sources with real queries when wiring to your backend.
//   • This page intentionally omits end‑user marketing/help‑center widgets.
// ---------------------------------------------------------------------------

// Types ----------------------------------------------------------------------
interface StatusItem {
  name: string;
  state: "operational" | "degraded" | "outage";
}

interface ActivityItem {
  id: string;
  icon: "ticket" | "check" | "wrench";
  title: string;
  timeAgo: string;
}

// Mock Data ------------------------------------------------------------------
const SYSTEM_STATUS: StatusItem[] = [
  { name: "API Services", state: "operational" },
  { name: "Video Processing", state: "operational" },
  { name: "Payment System", state: "operational" },
];

const RECENT_ACTIVITY: ActivityItem[] = [
  { id: "1", icon: "ticket", title: "New support ticket created", timeAgo: "2 hours ago" },
  { id: "2", icon: "check", title: "Ticket #1234 resolved", timeAgo: "1 day ago" },
  { id: "3", icon: "wrench", title: "System maintenance scheduled", timeAgo: "3 days ago" },
];

const SUPPORT_STATS = {
  avgResponseTime: "2.3 hours",
  resolutionRate: "98.5%",
  satisfaction: "4.8/5",
};

// Icon helpers ---------------------------------------------------------------
function Dot({ state }: { state: StatusItem["state"] }) {
  const color =
    state === "operational" ? "bg-emerald-500" : state === "degraded" ? "bg-amber-500" : "bg-rose-500";
  const label = state === "operational" ? "Operational" : state === "degraded" ? "Degraded" : "Outage";
  return (
    <span className="inline-flex items-center gap-2">
      <span className={`h-2.5 w-2.5 rounded-full ${color}`} aria-hidden />
      <span className="sr-only">{label}</span>
    </span>
  );
}

function ActivityIcon({ kind }: { kind: ActivityItem["icon"] }) {
  const map: Record<ActivityItem["icon"], string> = {
    ticket:
      "M3 5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v2a1 1 0 1 0 0 2v2a1 1 0 1 0 0 2v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a1 1 0 1 0 0-2V9a1 1 0 1 0 0-2z",
    check: "M5 13l4 4L19 7",
    wrench:
      "M14.7 6.3a5 5 0 1 0-8.4 5.4l-4 4A2 2 0 0 0 5 18l4-4a5 5 0 0 0 5.7-7.7z",
  };
  return (
    <svg className="h-4 w-4 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d={map[kind]} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Building blocks ------------------------------------------------------------
function Card({ children, className = "" }: React.PropsWithChildren<{ className?: string }>) {
  return (
    <div className={`rounded-2xl border border-white/5 bg-white/5 p-4 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/5 ${className}`}>
      {children}
    </div>
  );
}

function SectionHeading({ title, action }: { title: string; action?: React.ReactNode }) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <h2 className="text-lg font-semibold tracking-tight text-white">{title}</h2>
      {action}
    </div>
  );
}

// Layout shell ---------------------------------------------------------------
function ThreeColumnShell({ left, center, right }: { left: React.ReactNode; center: React.ReactNode; right: React.ReactNode }) {
  return (
    <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-6 px-4 py-6 md:grid-cols-[280px_minmax(0,1fr)_360px]">
      {left}
      {center}
      {right}
    </div>
  );
}

// Left Rail ------------------------------------------------------------------
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
  );
}

// Center Column --------------------------------------------------------------
function AdminToolsTile({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-white/5 bg-gradient-to-b from-white/5 to-white/[0.03] p-5 hover:from-white/10">
      <div className="text-base font-semibold text-white">{title}</div>
      <div className="mt-1 text-sm leading-6 text-white/70">{desc}</div>
    </div>
  );
}

function CenterColumn() {
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
  );
}

// Right Rail -----------------------------------------------------------------
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
  );
}

// Page -----------------------------------------------------------------------
export default function AdminSupportDashboard() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <ThreeColumnShell left={<LeftRail />} center={<CenterColumn />} right={<RightRail />} />
    </main>
  );
}
