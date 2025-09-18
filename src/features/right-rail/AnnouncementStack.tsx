"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Plus, Edit, Trash2, Info, AlertTriangle, CheckCircle, Megaphone } from "lucide-react";
import { Button } from "@src/components/ui/button";
import Link from "next/link";
import * as React from "react";

// ----------------------
// TypeScript Interfaces
// Location: /src/features/right-rail/AnnouncementStack.tsx
// Purpose: Define data structures for announcement system
// ----------------------

interface Announcement {
  id: string;
  title: string;
  description: string;
  link: string;
  type: 'info' | 'warning' | 'success' | 'promo';
  isActive: boolean;
  createdAt: Date;
}

interface AnnouncementStackProps {
  className?: string;
  autoAdvanceInterval?: number;
  isAdmin?: boolean;
  onCreateAnnouncement?: () => void;
  onEditAnnouncement?: (announcement: Announcement) => void;
  onDeleteAnnouncement?: (id: string) => void;
}

interface AnnouncementStackState {
  currentIndex: number;
  isPaused: boolean;
  announcements: Announcement[];
}

// ----------------------
// AnnouncementController Class
// Purpose: Encapsulate business logic for announcement management
// Location: /src/features/right-rail/AnnouncementStack.tsx
// ----------------------

class AnnouncementController {
  private announcements: Announcement[];
  private interval: number;

  constructor(interval: number = 8000) {
    this.interval = interval;
    this.announcements = this.initializeDefaultAnnouncements();
  }

  // ----------------------
  // Initialize Default Announcements
  // Purpose: Create sample announcements for demonstration
  // ----------------------
  private initializeDefaultAnnouncements(): Announcement[] {
    return [
      {
        id: "reels-launch",
        title: "Reels are live",
        description: "Create short-form videos and engage with your audience in a whole new way.",
        link: "/creator/reels",
        type: "success",
        isActive: true,
        createdAt: new Date("2024-01-15")
      },
      {
        id: "monetization-update",
        title: "New Monetization Features",
        description: "Enhanced creator tools for better revenue opportunities and analytics.",
        link: "/creator/monetization",
        type: "promo",
        isActive: true,
        createdAt: new Date("2024-01-10")
      },
      {
        id: "premium-trial",
        title: "Premium Trial Available",
        description: "Try premium features free for 30 days. Unlock advanced analytics and tools.",
        link: "/premium/trial",
        type: "info",
        isActive: true,
        createdAt: new Date("2024-01-05")
      }
    ];
  }

  // ----------------------
  // Getter Methods
  // Purpose: Provide access to controller data
  // ----------------------
  
  public getAnnouncements(): Announcement[] {
    return this.announcements.filter(a => a.isActive);
  }

  public getNextIndex(currentIndex: number): number {
    const activeAnnouncements = this.getAnnouncements();
    return (currentIndex + 1) % activeAnnouncements.length;
  }

  public getPreviousIndex(currentIndex: number): number {
    const activeAnnouncements = this.getAnnouncements();
    return currentIndex === 0 ? activeAnnouncements.length - 1 : currentIndex - 1;
  }

  public getInterval(): number {
    return this.interval;
  }

  // ----------------------
  // Announcement Management Methods
  // Purpose: Handle CRUD operations for announcements
  // ----------------------

  public addAnnouncement(announcement: Omit<Announcement, 'id' | 'createdAt'>): void {
    const newAnnouncement: Announcement = {
      ...announcement,
      id: `announcement-${Date.now()}`,
      createdAt: new Date()
    };
    this.announcements.push(newAnnouncement);
  }

  public updateAnnouncement(id: string, updates: Partial<Announcement>): void {
    const index = this.announcements.findIndex(a => a.id === id);
    if (index !== -1) {
      this.announcements[index] = { ...this.announcements[index], ...updates };
    }
  }

  public deleteAnnouncement(id: string): void {
    this.announcements = this.announcements.filter(a => a.id !== id);
  }
}

// ----------------------
// Styling Constants
// Purpose: Define consistent styling with single border ownership
// Based on previous double-line fix analysis
// ----------------------

const BANNER_CLASSES = [
  "relative overflow-hidden rounded-2xl",
  "border border-brand/35",                  // single owner of the edge
  "bg-card",
  "before:absolute before:inset-[1px] before:rounded-[calc(theme(borderRadius.2xl)-1px)]",
  "before:bg-[linear-gradient(135deg,transparent,hsl(var(--muted)/_0.35))]",
  "before:pointer-events-none",
  "shadow-[0_0_0_1px_hsl(var(--brand)/_0.03),0_16px_40px_-8px_rgb(0_0_0/_0.5)]"
].join(" ");

const TITLE_CLASSES = "text-foreground text-lg font-semibold leading-tight";
const BODY_CLASSES = "text-muted-foreground text-sm leading-relaxed";
const GOLD_RING = "ring-1 ring-brand/60";

// ----------------------
// Icon Mapping
// Purpose: Map announcement types to appropriate icons
// ----------------------

const getAnnouncementIcon = (type: Announcement['type']) => {
  const iconMap = {
    info: <Info className="text-blue-500" size={20} />,
    warning: <AlertTriangle className="text-yellow-500" size={20} />,
    success: <CheckCircle className="text-green-500" size={20} />,
    promo: <Megaphone className="text-purple-500" size={20} />
  };
  return iconMap[type];
};

// ----------------------
// Main AnnouncementStack Component
// Location: /src/features/right-rail/AnnouncementStack.tsx
// Parent: Admin page rightColumn
// Children: Motion cards with announcement content and admin controls
// Purpose: Display rotating announcements with admin management capabilities
// ----------------------

export default function AnnouncementStack({ 
  className = "", 
  autoAdvanceInterval = 8000,
  isAdmin = false,
  onCreateAnnouncement,
  onEditAnnouncement,
  onDeleteAnnouncement
}: AnnouncementStackProps) {
  
  // ----------------------
  // Component State
  // Purpose: Manage current announcement index and pause state
  // ----------------------
  const [state, setState] = React.useState<AnnouncementStackState>({
    currentIndex: 0,
    isPaused: false,
    announcements: []
  });

  // ----------------------
  // Controller Instance
  // Purpose: Initialize announcement controller for business logic
  // Location: /src/features/right-rail/AnnouncementStack.tsx
  // ----------------------
  const controllerRef = React.useRef<AnnouncementController | null>(null);
  
  React.useEffect(() => {
    if (!controllerRef.current) {
      controllerRef.current = new AnnouncementController(autoAdvanceInterval);
      const initialAnnouncements = controllerRef.current.getAnnouncements();
      setState(prev => ({
        ...prev,
        announcements: initialAnnouncements
      }));
    }
  }, [autoAdvanceInterval]);

  // ----------------------
  // Auto-advance Effect
  // Purpose: Handle automatic progression through announcements
  // ----------------------
  React.useEffect(() => {
    if (state.isPaused || state.announcements.length <= 1) return;

    const timer = setInterval(() => {
      setState(prev => ({
        ...prev,
        currentIndex: controllerRef.current!.getNextIndex(prev.currentIndex)
      }));
    }, autoAdvanceInterval);

    return () => clearInterval(timer);
  }, [state.isPaused, state.announcements.length, autoAdvanceInterval]);

  // ----------------------
  // Event Handlers
  // Purpose: Handle user interactions with navigation and admin controls
  // ----------------------
  
  const handleNext = () => {
    setState(prev => ({
      ...prev,
      currentIndex: controllerRef.current!.getNextIndex(prev.currentIndex)
    }));
  };

  const handlePrevious = () => {
    setState(prev => ({
      ...prev,
      currentIndex: controllerRef.current!.getPreviousIndex(prev.currentIndex)
    }));
  };

  const handleMouseEnter = () => {
    setState(prev => ({ ...prev, isPaused: true }));
  };

  const handleMouseLeave = () => {
    setState(prev => ({ ...prev, isPaused: false }));
  };

  const handleEdit = (announcement: Announcement) => {
    onEditAnnouncement?.(announcement);
  };

  const handleDelete = (id: string) => {
    controllerRef.current?.deleteAnnouncement(id);
    const updatedAnnouncements = controllerRef.current!.getAnnouncements();
    setState(prev => ({
      ...prev,
      announcements: updatedAnnouncements,
      currentIndex: Math.min(prev.currentIndex, updatedAnnouncements.length - 1)
    }));
    onDeleteAnnouncement?.(id);
  };

  // ----------------------
  // Early Return for Empty State
  // Purpose: Handle case when no announcements are available
  // ----------------------
  if (state.announcements.length === 0) {
    return (
      <div className={`${className} h-full flex items-center justify-center`}>
        <div className="text-center p-6">
          <p className="text-muted-foreground mb-4">No announcements available</p>
          {isAdmin && (
            <Button 
              onClick={onCreateAnnouncement}
              className="bg-brand hover:bg-brand/90 text-white"
            >
              <Plus size={16} className="mr-2" />
              Create Announcement
            </Button>
          )}
        </div>
      </div>
    );
  }

  const activeAnnouncement = state.announcements[state.currentIndex];

  return (
    <div 
      className={`${className} h-full relative`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* ----------------------
      // Admin Controls Header
      // Purpose: Provide admin management buttons when user is admin
      // ---------------------- */}
      {isAdmin && (
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-medium text-muted-foreground">Announcements</h3>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={onCreateAnnouncement}
              className="h-8 px-2"
            >
              <Plus size={14} />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleEdit(activeAnnouncement)}
              className="h-8 px-2"
            >
              <Edit size={14} />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleDelete(activeAnnouncement.id)}
              className="h-8 px-2 text-red-500 hover:text-red-600"
            >
              <Trash2 size={14} />
            </Button>
          </div>
        </div>
      )}

      {/* ----------------------
      // Announcement Cards Container
      // Purpose: Display animated announcement cards
      // ---------------------- */}
      <div className="relative h-full">
        <AnimatePresence mode="wait">
          <motion.article
            key={activeAnnouncement.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className={`${BANNER_CLASSES} not-prose h-full relative`}
            data-announcement-type={activeAnnouncement.type}
          >
            {/* ----------------------
            // Card Content Container
            // Purpose: Display announcement content with proper spacing
            // ---------------------- */}
            <div className="flex h-full flex-col justify-between p-4">
              
              {/* ----------------------
              // Header with Icon and Title
              // Purpose: Display announcement type icon and title
              // ---------------------- */}
              <div className="flex items-start gap-2">
                <span aria-hidden="true">{getAnnouncementIcon(activeAnnouncement.type)}</span>
                <h3 className={TITLE_CLASSES}>{activeAnnouncement.title}</h3>
              </div>
              
              {/* ----------------------
              // Body Text
              // Purpose: Display announcement description
              // ---------------------- */}
              <p className={BODY_CLASSES}>{activeAnnouncement.description}</p>
              
              {/* ----------------------
              // Footer with CTA and Navigation
              // Purpose: Provide action button and navigation controls
              // ---------------------- */}
              <div className="flex items-center justify-between">
                <Link href={activeAnnouncement.link} className="no-underline">
                  <Button
                    className={`${GOLD_RING} rounded-xl bg-transparent px-4 py-2 text-sm font-medium text-brand hover:bg-brand/8`}
                  >
                    Learn More
                  </Button>
                </Link>
                
                {/* ----------------------
                // Navigation Controls
                // Purpose: Allow manual navigation between announcements
                // ---------------------- */}
                {state.announcements.length > 1 && (
                  <div className="flex items-center gap-1">
                    <button
                      aria-label="Previous announcement"
                      onClick={handlePrevious}
                      className="inline-flex size-8 items-center justify-center rounded-xl bg-muted/50 hover:bg-muted/80 transition-colors"
                    >
                      <ChevronLeft className="text-muted-foreground" size={18} />
                    </button>
                    <button
                      aria-label="Next announcement"
                      onClick={handleNext}
                      className="inline-flex size-8 items-center justify-center rounded-xl bg-muted/50 hover:bg-muted/80 transition-colors"
                    >
                      <ChevronRight className="text-muted-foreground" size={18} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.article>
        </AnimatePresence>
      </div>

      {/* ----------------------
      // Progress Indicators
      // Purpose: Show current position in announcement stack
      // ---------------------- */}
      {state.announcements.length > 1 && (
        <div className="flex justify-center gap-1 mt-4">
          {state.announcements.map((announcement, index) => (
            <button
              key={announcement.id}
              onClick={() => setState(prev => ({ ...prev, currentIndex: index }))}
              className={`h-1.5 rounded-full transition-all duration-200 ${
                index === state.currentIndex 
                  ? 'w-6 bg-brand' 
                  : 'w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/50'
              }`}
              aria-label={`Go to announcement ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* End of AnnouncementStack Component */