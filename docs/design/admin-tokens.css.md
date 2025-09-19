/* ------------------------------------------------------
   Fanzit Admin Tokens (Dark Canvas + Soft Side Panels)
   ------------------------------------------------------
   Philosophy:
   - Main canvas uses charcoal neutrals to reduce fatigue.
   - Side panels use a softer blue-gray to create hierarchy.
   - Status colors are reserved for semantic signals only.
   - All tokens are semantic (what it means, not how it looks).
   Usage:
   - Import this once in your root layout (app/layout.tsx or globals.css).
   - Tailwind utilities can reference these via `rgb(var(--token) / <alpha-value>)`
     when mapped in tailwind.config.ts (see provided example).
--------------------------------------------------------- */

:root {
  /* Base text tokens */
  --text: 240 14% 98%;          /* near-white */
  --text-muted: 240 6% 75%;
  --text-subtle: 240 6% 60%;

  /* Surfaces */
  --surface-canvas: 220 14% 8%;  /* main dark canvas (center column) */
  --surface-elev-1: 220 12% 12%; /* cards on canvas */
  --surface-elev-2: 220 12% 16%; /* popovers, modals */
  --surface-panel: 220 20% 18%;  /* right/left panels - slightly lighter */
  --surface-panel-quiet: 220 18% 20%;

  /* Lines & outlines */
  --line-soft: 220 8% 26%;
  --line-strong: 220 8% 36%;

  /* Brand + accent (gold for prestige details ONLY) */
  --brand: 259 83% 65%;          /* purple base (e.g., links, primary) */
  --brand-contrast: 240 14% 98%;
  --accent-gold: 45 92% 64%;     /* badges, tiny highlights */

  /* Semantic status colors (WCAG AA against dark surfaces) */
  --success: 152 53% 45%;
  --warning: 40 96% 56%;
  --danger: 0 85% 62%;
  --info: 213 94% 68%;

  /* Special chips/badges */
  --chip-bg: 220 14% 14%;
  --chip-ring: 220 8% 30%;
}

.dark {
  /* Optional: tweak for true dark mode if you run light theme elsewhere */
  --text: 240 14% 98%;
  --text-muted: 240 6% 75%;
  --text-subtle: 240 6% 60%;

  --surface-canvas: 220 14% 7%;
  --surface-elev-1: 220 12% 11%;
  --surface-elev-2: 220 12% 15%;
  --surface-panel: 220 20% 17%;
  --surface-panel-quiet: 220 18% 19%;

  --line-soft: 220 8% 25%;
  --line-strong: 220 8% 35%;

  --brand: 259 83% 65%;
  --brand-contrast: 240 14% 98%;
  --accent-gold: 45 92% 64%;
}

/* Helper classes for quick usage without Tailwind mapping */
.admin-canvas { background-color: hsl(var(--surface-canvas)); color: hsl(var(--text)); }
.admin-panel { background-color: hsl(var(--surface-panel)); color: hsl(var(--text)); }
.admin-card  { background-color: hsl(var(--surface-elev-1)); color: hsl(var(--text)); border: 1px solid hsl(var(--line-soft)); }
.admin-chip  { background-color: hsl(var(--chip-bg)); border: 1px solid hsl(var(--chip-ring)); color: hsl(var(--text-muted)); }
.admin-ring  { outline: 2px solid hsl(var(--brand)); outline-offset: 2px; }
*/

