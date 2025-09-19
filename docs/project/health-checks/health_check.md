A) Imports, Modules, & Boundaries

Default vs named import mismatches; fix to match actual exports.

Case-sensitive path errors (especially on Linux CI).

Duplicate imports and re-exports; collapse and dedupe.

Circular deps (barrels too); break with local imports or dependency inversion.

Server↔Client boundary violations:

Server Components importing client-only libs (useState, window, shadcn UI) without use client.

Client Components importing server-only utilities (DB, fs, server env).

Route group cross-imports: prevent (public) components depending on (protected) internals.

Stale/unused exports; remove or mark @deprecated with timeline.

B) TypeScript Rigor

No any, unknown only with explicit narrowing; fix unsafe casts (as) and non-null assertions (!).

Discriminated unions for post types (admin/creator, paid/free, media kinds).

Strict null checks where data may be optional (profile, avatar, cover, username).

Function return types explicit for public APIs; no implicit any.

Props are readonly where possible; avoid mutation of inputs.

C) Next.js App Router Hygiene

Each route has loading.tsx and error.tsx where it fetches.

Correct dynamic, revalidate, or cache: 'no-store' on data-driven routes; avoid unintentionally static SSR.

Middleware safe usage (no heavy work); ensure headers/cookies only on server.

next.config.js images remotePatterns only for needed domains (e.g., DiceBear).

Metadata objects free of dynamic secrets; robots and sitemaps correct.

D) React & UI Patterns

Component composition over duplication: one BasePostCard + variants; no forked copies.

Client components declare "use client" only when needed.

Stable keys for list renders; no array index keys where order can change.

Event handlers not re-created on each render unnecessarily; memoize where impactful.

Accessibility:

Buttons are <button> (not <div>); focus states; aria-* for menus/dialogs.

ESC to close modals/menus; focus trap in dialogs.

3-dot actions menu: keyboard nav, click-outside close, z-index not leaking over header.

E) Error Handling & Silent Failures

try/catch blocks do not swallow errors; replace with Result/Either or logged, typed errors.

All async server code awaited; no floating promises.

API routes map errors to safe messages; no stack traces to clients.

console.* left in prod? Remove or guard by env.

Sonner toasts for transient UI feedback (not inline feed spam).

F) Security, Data Leaks & Privacy

No server secrets in client code; scan for process.env usage outside server.

API handlers validate inputs with Zod (or similar) and enforce types at boundary.

CORS limited, CSRF considered for non-idempotent endpoints (where applicable).

HTTP security headers: X-Content-Type-Options, X-Frame-Options/frame-ancestors, Referrer-Policy, reasonable CSP (document if not strict).

Avoid logging PII in server logs and client console.

G) Supabase & RLS

Server-side Supabase client used on server only; never expose service role to browser.

RLS policies exist for all user-scoped tables; queries constrain by auth.uid().

rpc/views don’t bypass RLS unintentionally; test with normal user vs admin.

Files/avatars storage rules restrict read/write appropriately; signed URLs where needed.

Check for over-broad selects (e.g., fetching all users when only current needed).

H) Tailwind, Design Tokens & Layout

Tailwind v3 config consistent; no v4 syntax; PostCSS chain correct.

Remove rogue white backgrounds; honor zinc/gold tokens; consistent radii (square center feed if required).

Extract repeated class combos into components/utilities; avoid class soup.

z-index scale documented; fix stacking bugs (avatar/image overlay issues).

Sticky headers/rails: no scroll bleed; overscroll-behavior, contain, will-change used judiciously.

I) Performance & Bundle

use client minimized; move heavy logic to server components or dynamic() lazy loads.

Tree-shake unused shadcn components; avoid pulling entire icon packs.

Image optimization via next/image; remote patterns constrained.

Prevent re-render storms: stable callback identities, memo where inputs stable.

Measure bundle impact of big libs (framer-motion, charts) and lazy load non-critical.

J) Data Fetching & Caching

No duplicate fetches (same query twice in same render); coalesce via server actions or helpers.

Correct cache headers for API responses; no-store for user-specific data.

Revalidation intervals appropriate; avoid pounding origin on hot routes.

K) Tests, Lint & CI

Typecheck and ESLint strict profiles pass locally and on CI (--max-warnings=0).

Import rules: no-cycle, no-duplicates, no-unresolved, no-restricted-paths.

Secrets scan (gitleaks or grep baseline) clean; .env.example matches runtime needs.

Add smoke tests for critical flows (auth, posting, admin page render).

L) Content & Admin Specifics

Admin routes gated server-side; no client-side only checks for permissions.

Admin card types don’t reuse creator-paid logic; split via polymorphism/props not forks.

Right rail switcher doesn’t load creator-only widgets on public home.

M) Docs & Developer Experience

Generate docs/health/STEP-<N>-*.md per pass with:

Findings, exact diffs, commands to reproduce.

Risk rating (P0/P1/P2) and remediation owner.

Add HEALTH-REPORT.md summary and a delta section for the next run.