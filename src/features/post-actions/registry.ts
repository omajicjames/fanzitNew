"use client"

// ----------------------
// Lightweight, React-safe registry for the inline actions
// - No classes, no `this`
// - Works with React 18+ concurrent features
// - One post open at a time
// ----------------------

import { useSyncExternalStore } from "react"

// ----------------------
// State type for post ID tracking
// ----------------------
type PostId = string | null

// ----------------------
// Global state - simple module-level variables
// No class instances, no binding issues
// ----------------------
let openPostId: PostId = null
const listeners = new Set<() => void>()

// ----------------------
// Emit state changes to all subscribers
// Triggers re-renders in React components
// ----------------------
function emit() {
  for (const l of listeners) l()
}

// ----------------------
// Mutators - pure functions that update state
// ----------------------

// ----------------------
// Open actions for a specific post
// Automatically closes any other open post actions
// ----------------------
export function openActions(id: string) {
  if (openPostId === id) return // no-op if already open
  openPostId = id
  emit()
}

// ----------------------
// Close all open actions
// Used when clicking outside or pressing ESC
// ----------------------
export function closeAll() {
  if (openPostId === null) return // no-op if already closed
  openPostId = null
  emit()
}

// ----------------------
// Toggle actions for a specific post
// Opens if closed, closes if open
// ----------------------
export function toggleActions(id: string) {
  openPostId === id ? closeAll() : openActions(id)
}

// ----------------------
// Subscription management for useSyncExternalStore
// ----------------------
function subscribe(cb: () => void) {
  listeners.add(cb)
  return () => listeners.delete(cb)
}

// ----------------------
// Get current state snapshot
// Used by useSyncExternalStore for state reads
// ----------------------
function getSnapshot() {
  return openPostId
}

// ----------------------
// Server-side rendering fallback
// Nothing is open on the server
// ----------------------
function getServerSnapshot() {
  return null as PostId
}

// ----------------------
// React Hooks - concurrent-mode safe
// ----------------------

// ----------------------
// Hook to check if a specific post is open
// Returns true if *this* post is open
// ----------------------
export function usePostActionsOpen(id: string) {
  const current = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  return current === id
}

// ----------------------
// Hook to get the currently open post ID
// Returns the open post id (or null)
// ----------------------
export function useOpenPostId() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

// ----------------------
// Legacy compatibility hook
// Provides the same interface as the old class-based registry
// ----------------------
export function usePostActionsRegistry() {
  const openPostIdValue = useOpenPostId()
  
  return {
    openPostId: openPostIdValue,
    openActions,
    closeAll,
    isOpen: (postId: string) => openPostIdValue === postId
  }
}