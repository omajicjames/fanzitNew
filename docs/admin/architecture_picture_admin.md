Here’s a copy-paste “prompt pack” you can give to your code-gen/design AI to **paint a clear overview of the page architecture**—including the three-column shell, left nav + sub-nav, and the right-panel swap behavior.

---

# 🔧 One-Shot Prompt: Page Architecture Overview (Right Panel Swaps)

**Role**: You are a senior Next.js (App Router) + React + Tailwind architect.
**Goal**: Produce a concise, visual and textual overview of an **Admin** page built as a **three-column layout**:

* Left column = persistent navigation (primary + sub-nav)
* Center column = remains on `/admin` (does not navigate away)
* Right column (aka “right rail/panel”, fixed \~420px) = **swaps content** when sub-links are clicked
* No new tabs or full-page transitions; routing should keep URL meaningful

## What to Deliver

1. **High-level diagram** of layout and data flow (use Mermaid or ASCII).
2. **File tree** showing routes, layout, and right-panel mechanism (either query-param registry or parallel routes + intercepts—see “Routing Mode” below).
3. **Component responsibilities** (left nav, center content, right panel host, right panel pages).
4. **Navigation behavior** (exact link examples), **URL semantics**, and **history/back** expectations.
5. **Loading/empty/error states** for the right panel.
6. **Accessibility notes** (landmarks, focus management on panel swap).
7. **Performance notes** (code splitting, client/server boundaries).
8. **Gotchas & safeguards** (what breaks intercepts, how to avoid new tabs, etc.).
9. A **short “Why this architecture” paragraph** that justifies the pattern.

## Context / Constraints

* Tech: Next.js 15 (App Router), React, Tailwind, shadcn/ui.
* Design tokens: dark “zinc/gold” theme; right panel width ≈ 420px, scrollable column.
* Left nav + sub-nav are persistent; only **right panel** content changes.
* Do **not** use `target="_blank"` or `window.open`.
* Keep explanations brief but precise.

## Routing Mode (choose one and explain trade-offs)

* **MVP (simple)**: `?right=<key>` query-param drives a small **registry router** inside the right panel.
* **Long-term (idiomatic)**: **Parallel routes** + **Intercepting routes** so canonical URLs like `/admin/system/status` render inside the `@right` slot while center stays on `/admin`.

## Include Concrete Examples

### 1) Layout Sketch (Mermaid)

```mermaid
flowchart LR
  A[Left Nav + Sub-Nav (persistent)] --- B[(Admin Layout /admin)]
  B --- C[Center: /admin main content (static)]
  B --- D[Right Panel: 420px, scrollable]

  subgraph Right Panel Swap
    E[Link click in left/sub-nav] --> F[Update URL (query or route)]
    F --> G[Right Panel Host reads URL]
    G --> H[Render matching Right Panel Page]
  end
```

### 2) Minimal File Tree (choose mode)

**Mode A: Query Param Registry**

```
app/(protected)/admin/
  layout.tsx                 // 3-col shell; mounts <RightRail />
  page.tsx                   // center content (stays on /admin)
  RightRail.tsx              // reads ?right=... and renders mapped page components
```

**Mode B: Parallel Routes + Intercepts**

```
app/(protected)/admin/
  layout.tsx                 // accepts { right } slot
  page.tsx                   // center content stays on /admin

  system/
    status/page.tsx          // canonical page
    settings/page.tsx
    logs/page.tsx
    users/page.tsx
    backups/page.tsx
    maintenance/page.tsx

  @right/
    default.tsx              // shown when nothing selected
    loading.tsx              // shimmer while route loads
    (..)/admin/system/status/page.tsx        // intercept renders in right panel
    (..)/admin/system/settings/page.tsx
    (..)/admin/system/logs/page.tsx
    (..)/admin/system/users/page.tsx
    (..)/admin/system/backups/page.tsx
    (..)/admin/system/maintenance/page.tsx
```

### 3) Link Examples

* **Query mode**: `/admin?right=system/status`
* **Route mode (recommended)**: `/admin/system/status` (intercepted into `@right`)

### 4) Responsibilities

* **Admin layout**: defines grid `grid-cols-[280px_1fr_420px]`, mounts the right slot/host.
* **Left Nav/Sub-nav**: renders `<Link>`s to canonical URLs (or to `?right=...`). Never open new tabs.
* **Center**: the main `/admin` page; remains stable.
* **Right Panel Host**: reads URL and renders the appropriate right-panel page.
* **Right Panel Pages**: independent, code-split, own loading/empty/error UI.

### 5) States

* **Empty**: “Select a panel” message.
* **Loading**: skeleton in `@right/loading.tsx` or local suspense boundary.
* **Error**: scoped error boundary showing a retry.

### 6) Accessibility

* Use `<aside aria-label="Secondary panel">` for the right rail.
* Move focus to the panel’s heading on swap; keep landmark regions consistent.
* Make links clearly indicated in left/sub-nav; preserve visible “selected” state.

### 7) Performance

* Prefer server components for heavy data pages; add a small client wrapper if needed.
* Each right-panel page is code-split (especially in Route mode).
* Avoid re-mounting the entire layout—only swap the panel’s subtree.

### 8) Gotchas

* Don’t conditionally render the right slot in the layout; keep it mounted.
* Don’t wrap `<Link>` with handlers that call `window.open`.
* In Route mode, ensure **both** canonical pages and intercepts exist to avoid 404s.

### 9) Why this architecture

* Clear separation of concerns, shareable URLs, great UX (only the panel changes), scalable as the number of right-panel pages grows, and friendly to testing and analytics.

---

## Acceptance Criteria

* A single overview document that includes: diagram, file tree, link behavior, responsibilities, states, a11y, perf, gotchas, and rationale.
* Uses my naming: **“right panel / right rail”**, width ≈ **420px**.
* Shows **both** routing modes with a recommendation (favor parallel routes + intercepts for long-term).

---

