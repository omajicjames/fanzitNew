import type { ReactNode } from "react";
import { CommunicationsPills } from '@src/components/admin/CommunicationsPills';

export default function CommunicationsTabsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-4">
          <h1 className="text-xl font-semibold">Communications</h1>
          <div className="mt-3"><CommunicationsPills /></div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
    </>
  );
}
