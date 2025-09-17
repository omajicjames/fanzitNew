Dev-only Admin Login (sets a cookie)

Creates a tiny “mint admin” screen that drops a debug cookie so you can test admin pages and API routes without DB changes.

File: app/admin-login/page.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginDevOnly() {
  const [isAdmin, setIsAdmin] = useState(true);
  const [isCreator, setIsCreator] = useState(false);
  const router = useRouter();

  return (
    <main className="mx-auto max-w-sm space-y-6 p-6">
      <h1 className="text-2xl font-bold">Dev Admin Login (No DB)</h1>
      <p className="text-sm opacity-80">
        This page sets <code>debug_is_admin</code> and <code>debug_is_creator</code> cookies for local testing.
        Remove before production.
      </p>

      <div className="space-y-3">
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={isAdmin} onChange={e => setIsAdmin(e.target.checked)} />
          <span>isAdmin</span>
        </label>

        <label className="flex items-center gap-2">
          <input type="checkbox" checked={isCreator} onChange={e => setIsCreator(e.target.checked)} />
          <span>isCreator</span>
        </label>
      </div>

      <div className="flex gap-3">
        <button
          className="rounded px-4 py-2 border"
          onClick={() => {
            // Set short-lived cookies (session cookies) for dev testing
            document.cookie = `debug_is_admin=${isAdmin ? "true" : "false"}; path=/`;
            document.cookie = `debug_is_creator=${isCreator ? "true" : "false"}; path=/`;
            router.push("/admin");
          }}
        >
          Set Cookies & Go to /admin
        </button>

        <button
          className="rounded px-4 py-2 border"
          onClick={() => {
            // Clear cookies
            document.cookie = "debug_is_admin=; Max-Age=0; path=/";
            document.cookie = "debug_is_creator=; Max-Age=0; path=/";
            router.push("/");
          }}
        >
          Clear & Home
        </button>
      </div>

      <p className="text-xs opacity-70">
        Tip: This does NOT change your DB. It’s just cookies for testing gates.
      </p>
    </main>
  );
}

2) Admin Page (client guard path) — you already have it

Just confirm your page looks like this and uses your existing ProtectedRoute:

File: app/(protected)/admin/page.tsx

import ProtectedRoute from "@/src/features/auth/components/protected-route";

export default function AdminHome() {
  return (
    <ProtectedRoute requireAdmin={true}>
      <div className="p-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="opacity-80">If you see this, the client guard thinks you’re an admin.</p>
      </div>
    </ProtectedRoute>
  );
}


This validates your client-side role check is hooked up.

3) Dev-only Middleware (URL guard) — optional but handy

Quickly bounces non-admins off /admin based on the same cookie. It’s not the final security model—just a fast-path test.

File: middleware.ts

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  // Only do this in development:
  if (process.env.NODE_ENV === "production") return NextResponse.next();

  const { pathname } = req.nextUrl;
  if (pathname.startsWith("/admin")) {
    const cookie = req.cookies.get("debug_is_admin")?.value;
    const isAdmin = cookie === "true";
    if (!isAdmin) {
      const url = req.nextUrl.clone();
      url.pathname = "/not-authorized";
      return NextResponse.redirect(url);
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};


File: app/not-authorized/page.tsx

export default function NotAuthorized() {
  return (
    <main className="mx-auto max-w-md p-6">
      <h1 className="text-xl font-semibold">Not Authorized</h1>
      <p className="opacity-80">You need admin privileges to view that page.</p>
    </main>
  );
}

4) Admin API Route (server gate) — proves your backend is locked

A tiny endpoint that checks the same cookie and returns 200/403. Great for Postman tests.

File: app/api/admin/ping/route.ts

import { NextResponse } from "next/server";

export async function GET(req: Request) {
  // Dev-only cookie check — DO NOT SHIP TO PROD as your only guard.
  const cookieHeader = req.headers.get("cookie") || "";
  const isAdmin = /(?:^|;\s*)debug_is_admin=true(?:;|$)/.test(cookieHeader);

  if (!isAdmin) {
    return NextResponse.json({ ok: false, error: "Forbidden" }, { status: 403 });
  }

  return NextResponse.json({ ok: true, role: "admin" });
}

5) Test Matrix (copy/paste)

A. Anonymous → /admin

Expected: redirect to /not-authorized (middleware), or blocked by ProtectedRoute if middleware disabled.

B. User (no cookie) → /admin

Expected: blocked.

C. User → /admin-login → set isAdmin=true → /admin

Expected: loads Admin Dashboard.

D. Postman / cURL

Without cookie:

curl -i http://localhost:3000/api/admin/ping


→ 403 Forbidden

With cookie:

curl -i --cookie "debug_is_admin=true" http://localhost:3000/api/admin/ping


→ 200 OK with { ok: true, role: "admin" }

E. Toggle isAdmin off via /admin-login

Expected: /admin blocks again; /api/admin/ping returns 403.

6) Quick visual check (right now)

Visit /admin → should block.

Visit /admin-login, tick isAdmin, click “Set Cookies & Go to /admin”.

You should see the Admin Dashboard page.

Hit /api/admin/ping in the browser: should return {"ok":true,"role":"admin"}.

Go back to /admin-login, click Clear & Home → /admin should block again.

7) Safety rails before shipping

Wrap /admin-login and the cookie/middleware behavior with if (process.env.NODE_ENV !== "production"). Don’t deploy the dev cookie gate in prod.

Keep your real server checks and RLS as the long-term plan, but this setup gives you instant end-to-end testing without waiting on DB changes.

8) (Optional) One-file nuke switch for prod

If you're worried about accidentally deploying the dev cookie flow, add to .env:

DEV_ADMIN_COOKIES=false


…and gate both the middleware and /admin-login with it:

const devCookiesEnabled = process.env.DEV_ADMIN_COOKIES === "true";
if (!devCookiesEnabled) return NextResponse.next();

## Related Documentation

For information about the current auth provider-based admin access control implementation, see:
- **Admin Access Control Fix:** `/docs/troubleshooting/admin-access-control-fix.md`

This document covers the cookie-based dev admin system, while the troubleshooting documentation covers the production auth provider implementation.
