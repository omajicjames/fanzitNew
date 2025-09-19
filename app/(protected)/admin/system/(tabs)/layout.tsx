import type { ReactNode } from "react";
import { SystemPills } from '@src/components/admin/SystemPills';

export default function SystemTabsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-4">
          <h1 className="text-xl font-semibold">System Management</h1>
          <div className="mt-3"><SystemPills /></div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
    </>
  );
}