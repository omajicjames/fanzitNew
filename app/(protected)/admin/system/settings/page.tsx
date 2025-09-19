// ----------------------
// System Settings Page
// Location: /app/(protected)/admin/system/(tabs)/settings/page.tsx
// Purpose: System configuration and settings management
// Parent: System tabs layout with header and pill navigation
// ----------------------

"use client";

import requireAdminPage from "@src/features/admin/auth/requireAdminPage";
import { Settings, Save, RotateCcw, AlertCircle } from "lucide-react";

// ----------------------
// Type Definitions
// Purpose: Define proper TypeScript interfaces for settings
// ----------------------
interface SettingOption {
  name: string;
  value: string | number | boolean;
  type: "text" | "number" | "boolean" | "select";
  options?: string[];
}

interface SettingsSection {
  title: string;
  description: string;
  settings: SettingOption[];
}

// ----------------------
// System Settings Component
// Location: /app/(protected)/admin/system/settings/page.tsx
// Purpose: Display and manage system configuration settings
// Children: Settings sections with form controls for each setting type
// Parent: Admin system layout with navigation pills
// ----------------------
function SystemSettingsPage() {
  // ----------------------
  // Settings Data Configuration
  // Purpose: Define system settings sections and their configurations
  // Structure: Array of settings sections with typed settings
  // ----------------------
  const settingsSections: SettingsSection[] = [
    {
      title: "General Settings",
      description: "Basic system configuration and preferences",
      settings: [
        { name: "Site Name", value: "Fanzit Platform", type: "text" },
        { name: "Environment", value: "production", type: "select", options: ["development", "staging", "production"] },
        { name: "Timezone", value: "UTC", type: "select", options: ["UTC", "EST", "PST", "GMT"] },
        { name: "Maintenance Mode", value: false, type: "boolean" }
      ]
    },
    {
      title: "Security Settings",
      description: "Security and authentication configuration",
      settings: [
        { name: "Force HTTPS", value: true, type: "boolean" },
        { name: "Session Timeout (minutes)", value: 30, type: "number" },
        { name: "Max Login Attempts", value: 5, type: "number" },
        { name: "Enable 2FA", value: true, type: "boolean" }
      ]
    },
    {
      title: "Performance Settings",
      description: "System performance and optimization settings",
      settings: [
        { name: "Cache Duration (seconds)", value: 3600, type: "number" },
        { name: "Max Upload Size (MB)", value: 100, type: "number" },
        { name: "Enable Compression", value: true, type: "boolean" },
        { name: "Database Connection Pool", value: 20, type: "number" }
      ]
    }
  ];

  return (
    <div className="space-y-8">
      {/* ----------------------
           Settings Header
           Purpose: Page title and action buttons
           Location: Top of settings page
           Children: Title, description, and action buttons
           ---------------------- */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">System Settings</h2>
          <p className="text-muted-foreground mt-1">Configure system-wide settings and preferences</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-muted hover:bg-muted/80 rounded-lg transition-colors">
            <RotateCcw className="h-4 w-4" />
            Reset to Defaults
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors">
            <Save className="h-4 w-4" />
            Save Changes
          </button>
        </div>
      </div>

      {/* ----------------------
           Settings Sections Container
           Purpose: Render all settings sections
           Location: Main content area
           Children: Individual settings sections
           ---------------------- */}
      <div className="space-y-6">
        {settingsSections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="bg-card rounded-lg border border-border">
            {/* ----------------------
                 Section Header
                 Purpose: Section title and description
                 Location: Top of each settings section
                 ---------------------- */}
            <div className="p-6 border-b border-border">
              <h3 className="text-lg font-semibold">{section.title}</h3>
              <p className="text-muted-foreground text-sm mt-1">{section.description}</p>
            </div>
            {/* ----------------------
                 Section Settings
                 Purpose: Individual setting controls
                 Location: Body of each settings section
                 Children: Setting form controls based on type
                 ---------------------- */}
            <div className="p-6 space-y-4">
              {section.settings.map((setting, settingIndex) => (
                <div key={settingIndex} className="flex items-center justify-between">
                  <div className="flex-1">
                    <label className="text-sm font-medium">{setting.name}</label>
                    {setting.type === "boolean" && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {setting.value ? "Enabled" : "Disabled"}
                      </p>
                    )}
                  </div>
                  <div className="ml-4">
                    {/* ----------------------
                         Boolean Toggle Control
                         Purpose: Toggle switch for boolean settings
                         Location: Right side of setting row
                         ---------------------- */}
                    {setting.type === "boolean" && (
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          defaultChecked={setting.value as boolean}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    )}
                    {/* ----------------------
                         Text Input Control
                         Purpose: Text input for string settings
                         Location: Right side of setting row
                         ---------------------- */}
                    {setting.type === "text" && (
                      <input
                        type="text"
                        defaultValue={setting.value as string}
                        className="px-3 py-2 border border-border rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    )}
                    {/* ----------------------
                         Number Input Control
                         Purpose: Number input for numeric settings
                         Location: Right side of setting row
                         ---------------------- */}
                    {setting.type === "number" && (
                      <input
                        type="number"
                        defaultValue={setting.value as number}
                        className="px-3 py-2 border border-border rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary w-20"
                      />
                    )}
                    {/* ----------------------
                         Select Dropdown Control
                         Purpose: Dropdown for settings with predefined options
                         Location: Right side of setting row
                         Children: Option elements from setting.options array
                         ---------------------- */}
                    {setting.type === "select" && (
                      <select
                        defaultValue={setting.value as string}
                        className="px-3 py-2 border border-border rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        {/* ----------------------
                             Option Mapping
                             Purpose: Render select options from setting.options array
                             Location: Inside select element
                             ---------------------- */}
                        {setting.options?.map((option, optionIndex) => (
                          <option key={optionIndex} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ----------------------
           Warning Notice
           Purpose: Important notice about settings changes
           Location: Bottom of settings page
           ---------------------- */}
      <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-medium text-yellow-800">Important Notice</h4>
            <p className="text-yellow-700 text-sm mt-1">
              Changes to system settings may require a server restart to take effect. 
              Please ensure you have proper backups before making significant changes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ----------------------
// Protected System Settings Page Export
// ----------------------
export default requireAdminPage(SystemSettingsPage);