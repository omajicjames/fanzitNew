"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Save, AlertCircle } from "lucide-react";
import { Button } from "@src/components/ui/button";
import { logger } from "@src/lib/logger";

// ----------------------
// TypeScript Interfaces
// Location: /src/features/right-rail/AnnouncementModal.tsx
// Purpose: Define modal props and form data structures
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

interface AnnouncementFormData {
  title: string;
  description: string;
  link: string;
  type: 'info' | 'warning' | 'success' | 'promo';
  isActive: boolean;
}

interface AnnouncementModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: AnnouncementFormData) => void;
  announcement?: Announcement | null;
  mode: 'create' | 'edit';
}

interface FormErrors {
  title?: string;
  description?: string;
  link?: string;
}

// ----------------------
// Form Validation Utilities
// Purpose: Validate form inputs and provide error messages
// Location: /src/features/right-rail/AnnouncementModal.tsx
// ----------------------

const validateForm = (data: AnnouncementFormData): FormErrors => {
  const errors: FormErrors = {};

  if (!data.title.trim()) {
    errors.title = "Title is required";
  } else if (data.title.length > 100) {
    errors.title = "Title must be 100 characters or less";
  }

  if (!data.description.trim()) {
    errors.description = "Description is required";
  } else if (data.description.length > 300) {
    errors.description = "Description must be 300 characters or less";
  }

  if (!data.link.trim()) {
    errors.link = "Link is required";
  } else if (!isValidUrl(data.link)) {
    errors.link = "Please enter a valid URL";
  }

  return errors;
};

const isValidUrl = (url: string): boolean => {
  try {
    // Allow relative URLs starting with /
    if (url.startsWith('/')) {
      return true;
    }
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// ----------------------
// Styling Constants
// Purpose: Define consistent modal and form styling
// ----------------------

const MODAL_OVERLAY_CLASSES = [
  "fixed inset-0 z-50",
  "bg-black/50 backdrop-blur-sm",
  "flex items-center justify-center p-4"
].join(" ");

const MODAL_CONTENT_CLASSES = [
  "bg-card border border-border",
  "rounded-2xl shadow-2xl",
  "w-full max-w-md",
  "h-auto"
].join(" ");

const INPUT_CLASSES = [
  "w-full px-3 py-2",
  "bg-background border border-border rounded-lg",
  "text-foreground placeholder:text-muted-foreground",
  "focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand",
  "transition-colors"
].join(" ");

const TEXTAREA_CLASSES = [
  INPUT_CLASSES,
  "min-h-[80px] resize-none"
].join(" ");

const SELECT_CLASSES = [
  INPUT_CLASSES,
  "cursor-pointer"
].join(" ");

const ERROR_CLASSES = "text-red-500 text-sm mt-1 flex items-center gap-1";

// ----------------------
// Type Options Configuration
// Purpose: Define announcement type options with labels and descriptions
// ----------------------

const ANNOUNCEMENT_TYPES = [
  { value: 'info' as const, label: 'Information', description: 'General information or updates' },
  { value: 'success' as const, label: 'Success', description: 'Positive news or achievements' },
  { value: 'warning' as const, label: 'Warning', description: 'Important notices or alerts' },
  { value: 'promo' as const, label: 'Promotion', description: 'Marketing or promotional content' }
];

// ----------------------
// Main AnnouncementModal Component
// Location: /src/features/right-rail/AnnouncementModal.tsx
// Parent: Admin page or AnnouncementStack component
// Purpose: Provide form interface for creating and editing announcements
// ----------------------

export default function AnnouncementModal({
  isOpen,
  onClose,
  onSave,
  announcement,
  mode
}: AnnouncementModalProps) {

  // ----------------------
  // Form State Management
  // Purpose: Handle form data and validation state
  // ----------------------
  const [formData, setFormData] = React.useState<AnnouncementFormData>({
    title: '',
    description: '',
    link: '',
    type: 'info',
    isActive: true
  });

  const [errors, setErrors] = React.useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // ----------------------
  // Initialize Form Data
  // Purpose: Populate form when editing existing announcement
  // ----------------------
  React.useEffect(() => {
    if (isOpen) {
      if (mode === 'edit' && announcement) {
        setFormData({
          title: announcement.title,
          description: announcement.description,
          link: announcement.link,
          type: announcement.type,
          isActive: announcement.isActive
        });
      } else {
        // Reset form for create mode
        setFormData({
          title: '',
          description: '',
          link: '',
          type: 'info',
          isActive: true
        });
      }
      setErrors({});
      setIsSubmitting(false);
    }
  }, [isOpen, mode, announcement]);

  // ----------------------
  // Event Handlers
  // Purpose: Handle form interactions and submission
  // ----------------------

  const handleInputChange = (field: keyof AnnouncementFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error for this field when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    
    try {
      await onSave(formData);
      onClose();
    } catch (error) {
      logger.error('Error saving announcement', 'AnnouncementModal', error);
      // Handle error state if needed
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  // ----------------------
  // Keyboard Event Handler
  // Purpose: Handle escape key to close modal
  // ----------------------
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && !isSubmitting) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, isSubmitting, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className={MODAL_OVERLAY_CLASSES}
          onClick={handleOverlayClick}
        >
          {/* ----------------------
          // Modal Content Container
          // Purpose: Display form content with animation
          // ---------------------- */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className={MODAL_CONTENT_CLASSES}
            onClick={(e) => e.stopPropagation()}
          >
            {/* ----------------------
            // Modal Header
            // Purpose: Display title and close button
            // ---------------------- */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-xl font-semibold text-foreground">
                {mode === 'create' ? 'Create Announcement' : 'Edit Announcement'}
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClose}
                disabled={isSubmitting}
                className="h-8 w-8 p-0"
              >
                <X size={16} />
              </Button>
            </div>

            {/* ----------------------
            // Form Content
            // Purpose: Display form fields for announcement data
            // ---------------------- */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              
              {/* ----------------------
              // Title Field
              // Purpose: Input for announcement title
              // ---------------------- */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-foreground mb-2">
                  Title *
                </label>
                <input
                  id="title"
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className={INPUT_CLASSES}
                  placeholder="Enter announcement title"
                  maxLength={100}
                  disabled={isSubmitting}
                />
                {errors.title && (
                  <div className={ERROR_CLASSES}>
                    <AlertCircle size={14} />
                    {errors.title}
                  </div>
                )}
                <div className="text-xs text-muted-foreground mt-1">
                  {formData.title.length}/100 characters
                </div>
              </div>

              {/* ----------------------
              // Description Field
              // Purpose: Textarea for announcement description
              // ---------------------- */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-foreground mb-2">
                  Description *
                </label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className={TEXTAREA_CLASSES}
                  placeholder="Enter announcement description"
                  maxLength={300}
                  disabled={isSubmitting}
                />
                {errors.description && (
                  <div className={ERROR_CLASSES}>
                    <AlertCircle size={14} />
                    {errors.description}
                  </div>
                )}
                <div className="text-xs text-muted-foreground mt-1">
                  {formData.description.length}/300 characters
                </div>
              </div>

              {/* ----------------------
              // Link Field
              // Purpose: Input for announcement link URL
              // ---------------------- */}
              <div>
                <label htmlFor="link" className="block text-sm font-medium text-foreground mb-2">
                  Link *
                </label>
                <input
                  id="link"
                  type="text"
                  value={formData.link}
                  onChange={(e) => handleInputChange('link', e.target.value)}
                  className={INPUT_CLASSES}
                  placeholder="/creator/dashboard or https://example.com"
                  disabled={isSubmitting}
                />
                {errors.link && (
                  <div className={ERROR_CLASSES}>
                    <AlertCircle size={14} />
                    {errors.link}
                  </div>
                )}
                <div className="text-xs text-muted-foreground mt-1">
                  Use relative URLs (/page) or full URLs (https://...)
                </div>
              </div>

              {/* ----------------------
              // Type Selection Field
              // Purpose: Dropdown for announcement type
              // ---------------------- */}
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-foreground mb-2">
                  Type
                </label>
                <select
                  id="type"
                  value={formData.type}
                  onChange={(e) => handleInputChange('type', e.target.value as AnnouncementFormData['type'])}
                  className={SELECT_CLASSES}
                  disabled={isSubmitting}
                >
                  {ANNOUNCEMENT_TYPES.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label} - {type.description}
                    </option>
                  ))}
                </select>
              </div>

              {/* ----------------------
              // Active Status Toggle
              // Purpose: Checkbox for announcement active state
              // ---------------------- */}
              <div className="flex items-center gap-2">
                <input
                  id="isActive"
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) => handleInputChange('isActive', e.target.checked)}
                  className="rounded border-border text-brand focus:ring-brand/50"
                  disabled={isSubmitting}
                />
                <label htmlFor="isActive" className="text-sm text-foreground">
                  Active (visible to users)
                </label>
              </div>

              {/* ----------------------
              // Form Actions
              // Purpose: Submit and cancel buttons
              // ---------------------- */}
              <div className="flex gap-3 pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-brand hover:bg-brand/90 text-white"
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full mr-2"
                      />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save size={16} className="mr-2" />
                      {mode === 'create' ? 'Create' : 'Update'}
                    </>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClose}
                  disabled={isSubmitting}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* End of AnnouncementModal Component */