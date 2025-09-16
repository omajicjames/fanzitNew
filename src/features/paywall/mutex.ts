// ----------------------
// Paywall Pill Mutex System
// ----------------------
// Ensures only one floating pill is active at a time.
// Location: /src/features/paywall/mutex.ts
// Parent: Paywall feature module
// Children: Used by LockedPostShell components
// ----------------------

// ----------------------
// Global State Management
// ----------------------
// Tracks which component currently owns the floating pill
// to prevent multiple pills from showing simultaneously
// ----------------------

let currentOwner: string | null = null;

// ----------------------
// Pill Request Function
// ----------------------
// Attempts to claim ownership of the floating pill
// Returns true if successful, false if another component owns it
// ----------------------

export function requestPill(id: string): boolean {
  if (currentOwner && currentOwner !== id) return false;
  currentOwner = id;
  return true;
}

// ----------------------
// Pill Release Function
// ----------------------
// Releases ownership of the floating pill
// Only the current owner can release it
// ----------------------

export function releasePill(id: string) {
  if (currentOwner === id) currentOwner = null;
}

/* End of mutex.ts */