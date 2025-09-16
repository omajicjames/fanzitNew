// ----------------------
// Client-side Feature Flags System
// ----------------------
// Tiny client-side flags. URL beats localStorage.
// Usage: ?paywall_v2=1&first_peek=1
// Location: /src/lib/flags.ts
// Parent: Core library utilities
// Children: Used by paywall components and post rendering logic
// ----------------------

export type FlagKey = "paywall_v2" | "first_peek";

const LS = "fx.flags.v1";

// ----------------------
// LocalStorage Utilities
// ----------------------
// Handles reading and writing flag state to localStorage
// with error handling for SSR compatibility
// ----------------------

function readLS(): Record<string, string> {
  try { 
    return JSON.parse(localStorage.getItem(LS) ?? "{}"); 
  } catch { 
    return {}; 
  }
}

function writeLS(obj: Record<string, string>) {
  localStorage.setItem(LS, JSON.stringify(obj));
}

// ----------------------
// Flag Reading Function
// ----------------------
// Read a flag (client-only). Defaults false on SSR.
// URL parameters take precedence over localStorage
// ----------------------

export function getFlag(name: FlagKey): boolean {
  if (typeof window === "undefined") return false;
  
  const params = new URLSearchParams(window.location.search);
  const urlVal = params.get(name);
  
  if (urlVal !== null) {
    return urlVal === "1" || urlVal === "true";
  }
  
  const ls = readLS();
  return ls[name] === "1";
}

// ----------------------
// Flag Setting Function
// ----------------------
// Persists flag state to localStorage for future sessions
// ----------------------

export function setFlag(name: FlagKey, on: boolean) {
  const ls = readLS();
  ls[name] = on ? "1" : "0";
  writeLS(ls);
}

/* End of flags.ts */