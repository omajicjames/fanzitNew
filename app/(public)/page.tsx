"use client"

import { ThreeColumnShell } from "@src/components/app/layout/three-column-shell"
import Timeline from "@src/features/feed/components/Timeline"
import { Sidebar } from "@src/components/app/layout/sidebar"
import AnnouncementStack from "@src/features/right-rail/AnnouncementStack"
import AnnouncementModal from "@src/features/right-rail/AnnouncementModal"

import { ProtectedRoute } from "@src/features/auth/components/protected-route"
import { PostDataAdapter } from "@src/features/post/adapters/PostDataAdapter"
import * as React from "react"

// ----------------------
// HomePage Component
// Location: /app/(public)/page.tsx
// Parent: App Router
// Children: ThreeColumnShell with Sidebar, Timeline (admin context), AnnouncementStack with modal
// Purpose: Landing page with admin promotional content and announcement management
// ----------------------
export default function HomePage() {
  // ----------------------
  // Admin Posts Data
  // Purpose: Get admin promotional content for landing page display
  // ----------------------
  const adminPosts = PostDataAdapter.getAdminPosts();

  // ----------------------
  // Modal State Management
  // Purpose: Handle announcement creation and editing modal state
  // ----------------------
  const [modalState, setModalState] = React.useState<{
    isOpen: boolean;
    mode: 'create' | 'edit';
    announcement: any | null;
  }>({
    isOpen: false,
    mode: 'create',
    announcement: null
  });

  // ----------------------
  // Announcement Event Handlers
  // Purpose: Handle announcement CRUD operations
  // ----------------------
  const handleCreateAnnouncement = () => {
    setModalState({
      isOpen: true,
      mode: 'create',
      announcement: null
    });
  };

  const handleEditAnnouncement = (announcement: any) => {
    setModalState({
      isOpen: true,
      mode: 'edit',
      announcement
    });
  };

  const handleDeleteAnnouncement = (id: string) => {
    console.log('Deleting announcement:', id);
    // Additional delete logic can be added here
  };

  const handleModalClose = () => {
    setModalState(prev => ({ ...prev, isOpen: false }));
  };

  const handleModalSave = (data: any) => {
    console.log('Saving announcement:', data);
    // Additional save logic can be added here
    setModalState(prev => ({ ...prev, isOpen: false }));
  };

  return (
    <ProtectedRoute>
      {/* ----------------------
      // Main Layout Shell
      // Three-column layout with sidebar, timeline (admin context), and empty right column
      // Location: /src/components/app/layout/three-column-shell.tsx
      // ---------------------- */}
      <ThreeColumnShell 
        leftColumn={<Sidebar />} 
        centerColumn={
          <Timeline 
            views={adminPosts}
            context="admin"
            className="p-6"
            emptyMessage="No announcements at this time"
          />
        } 
        rightColumn={
          <div className="h-full p-4">
            {/* ----------------------
            // AnnouncementStack Component
            // Location: /src/features/right-rail/AnnouncementStack.tsx
            // Purpose: Display and manage announcements with admin controls
            // ---------------------- */}
            <AnnouncementStack
              className="h-full"
              isAdmin={true}
              onCreateAnnouncement={handleCreateAnnouncement}
              onEditAnnouncement={handleEditAnnouncement}
              onDeleteAnnouncement={handleDeleteAnnouncement}
            />
          </div>
        } 
      />

      {/* ----------------------
      // Announcement Modal
      // Location: /src/features/right-rail/AnnouncementModal.tsx
      // Purpose: Handle announcement creation and editing
      // ---------------------- */}
      <AnnouncementModal
        isOpen={modalState.isOpen}
        mode={modalState.mode}
        announcement={modalState.announcement}
        onClose={handleModalClose}
        onSave={handleModalSave}
      />
    </ProtectedRoute>
  )
}