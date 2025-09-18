// ----------------------
// System Settings Page
// Location: /app/(protected)/admin/system/settings/page.tsx
// Purpose: Application-wide configuration and settings management
// Protection: Requires admin authentication (inherited from parent layout)
// Parent: Admin dashboard layout with AdminNav sidebar
// Children: Settings forms and configuration panels
// ----------------------

"use client";

import { useState, useEffect } from "react";
import requireAdminPage from "@src/features/admin/auth/requireAdminPage";
import { logger } from "@src/lib/logger";
import { 
  Settings, 
  Save, 
  RefreshCw, 
  Globe, 
  Mail, 
  Shield, 
  Database,
  Image,
  Bell,
  Users,
  FileText,
  Palette,
  Server,
  Key,
  AlertTriangle,
  CheckCircle,
  Upload
} from "lucide-react";

// ----------------------
// Settings Interface Types
// Purpose: Define configuration structure and form data types
// ----------------------
interface GeneralSettings {
  siteName: string;
  siteDescription: string;
  siteUrl: string;
  adminEmail: string;
  timezone: string;
  language: string;
  maintenanceMode: boolean;
}

interface SecuritySettings {
  requireEmailVerification: boolean;
  enableTwoFactor: boolean;
  sessionTimeout: number;
  maxLoginAttempts: number;
  passwordMinLength: number;
  requireSpecialChars: boolean;
}

interface EmailSettings {
  smtpHost: string;
  smtpPort: number;
  smtpUsername: string;
  smtpPassword: string;
  fromEmail: string;
  fromName: string;
  enableEmailNotifications: boolean;
}

interface ContentSettings {
  allowUserRegistration: boolean;
  moderateComments: boolean;
  maxFileSize: number;
  allowedFileTypes: string[];
  enableRichTextEditor: boolean;
  autoSaveInterval: number;
}

// ----------------------
// System Settings Component
// Purpose: Main settings management interface
// ----------------------
function SystemSettingsPage() {
  // ----------------------
  // State Management
  // Purpose: Track settings data and UI states
  // ----------------------
  const [activeTab, setActiveTab] = useState("general");
  const [isSaving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [hasChanges, setHasChanges] = useState(false);

  // ----------------------
  // Settings State
  // Purpose: Store configuration data for each settings category
  // ----------------------
  const [generalSettings, setGeneralSettings] = useState<GeneralSettings>({
    siteName: "Fanzit Community",
    siteDescription: "A vibrant community platform for fans and creators",
    siteUrl: "https://fanzit.com",
    adminEmail: "admin@fanzit.com",
    timezone: "UTC",
    language: "en",
    maintenanceMode: false
  });

  const [securitySettings, setSecuritySettings] = useState<SecuritySettings>({
    requireEmailVerification: true,
    enableTwoFactor: false,
    sessionTimeout: 24,
    maxLoginAttempts: 5,
    passwordMinLength: 8,
    requireSpecialChars: true
  });

  const [emailSettings, setEmailSettings] = useState<EmailSettings>({
    smtpHost: "smtp.gmail.com",
    smtpPort: 587,
    smtpUsername: "",
    smtpPassword: "",
    fromEmail: "noreply@fanzit.com",
    fromName: "Fanzit Community",
    enableEmailNotifications: true
  });

  const [contentSettings, setContentSettings] = useState<ContentSettings>({
    allowUserRegistration: true,
    moderateComments: true,
    maxFileSize: 10,
    allowedFileTypes: ["jpg", "jpeg", "png", "gif", "pdf", "doc", "docx"],
    enableRichTextEditor: true,
    autoSaveInterval: 30
  });

  // ----------------------
  // Save Settings Function
  // Purpose: Handle saving configuration changes
  // ----------------------
  const saveSettings = async () => {
    setSaving(true);
    setSaveMessage("");

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Here you would make actual API calls to save settings
      logger.info("Saving settings", "SystemSettings", {
        general: generalSettings,
        security: securitySettings,
        email: emailSettings,
        content: contentSettings
      });

      setSaveMessage("Settings saved successfully!");
      setHasChanges(false);
      
      // Clear success message after 3 seconds
      setTimeout(() => setSaveMessage(""), 3000);
    } catch (error) {
      setSaveMessage("Error saving settings. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  // ----------------------
  // Settings Tabs Configuration
  // Purpose: Define tab structure and content
  // ----------------------
  const tabs = [
    { id: "general", label: "General", icon: Settings },
    { id: "security", label: "Security", icon: Shield },
    { id: "email", label: "Email", icon: Mail },
    { id: "content", label: "Content", icon: FileText }
  ];

  // ----------------------
  // Input Change Handler
  // Purpose: Track changes and update state
  // ----------------------
  const handleInputChange = (category: string, field: string, value: any) => {
    setHasChanges(true);
    
    switch (category) {
      case "general":
        setGeneralSettings(prev => ({ ...prev, [field]: value }));
        break;
      case "security":
        setSecuritySettings(prev => ({ ...prev, [field]: value }));
        break;
      case "email":
        setEmailSettings(prev => ({ ...prev, [field]: value }));
        break;
      case "content":
        setContentSettings(prev => ({ ...prev, [field]: value }));
        break;
    }
  };

  // ----------------------
  // General Settings Panel
  // Purpose: Site-wide configuration options
  // ----------------------
  const GeneralSettingsPanel = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Site Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">Site Name</label>
            <input
              type="text"
              value={generalSettings.siteName}
              onChange={(e) => handleInputChange("general", "siteName", e.target.value)}
              className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">Site URL</label>
            <input
              type="url"
              value={generalSettings.siteUrl}
              onChange={(e) => handleInputChange("general", "siteUrl", e.target.value)}
              className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-neutral-300 mb-2">Site Description</label>
            <textarea
              value={generalSettings.siteDescription}
              onChange={(e) => handleInputChange("general", "siteDescription", e.target.value)}
              rows={3}
              className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">Admin Email</label>
            <input
              type="email"
              value={generalSettings.adminEmail}
              onChange={(e) => handleInputChange("general", "adminEmail", e.target.value)}
              className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">Timezone</label>
            <select
              value={generalSettings.timezone}
              onChange={(e) => handleInputChange("general", "timezone", e.target.value)}
              className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="UTC">UTC</option>
              <option value="America/New_York">Eastern Time</option>
              <option value="America/Chicago">Central Time</option>
              <option value="America/Denver">Mountain Time</option>
              <option value="America/Los_Angeles">Pacific Time</option>
            </select>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-white mb-4">System Options</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-neutral-800 rounded-lg">
            <div>
              <h4 className="font-medium text-white">Maintenance Mode</h4>
              <p className="text-sm text-neutral-400">Temporarily disable site access for maintenance</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={generalSettings.maintenanceMode}
                onChange={(e) => handleInputChange("general", "maintenanceMode", e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-neutral-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  // ----------------------
  // Security Settings Panel
  // Purpose: Authentication and security configuration
  // ----------------------
  const SecuritySettingsPanel = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Authentication</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-neutral-800 rounded-lg">
            <div>
              <h4 className="font-medium text-white">Require Email Verification</h4>
              <p className="text-sm text-neutral-400">Users must verify their email before accessing the site</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={securitySettings.requireEmailVerification}
                onChange={(e) => handleInputChange("security", "requireEmailVerification", e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-neutral-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-neutral-800 rounded-lg">
            <div>
              <h4 className="font-medium text-white">Two-Factor Authentication</h4>
              <p className="text-sm text-neutral-400">Enable 2FA for enhanced security</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={securitySettings.enableTwoFactor}
                onChange={(e) => handleInputChange("security", "enableTwoFactor", e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-neutral-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Password Policy</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">Minimum Password Length</label>
            <input
              type="number"
              min="6"
              max="32"
              value={securitySettings.passwordMinLength}
              onChange={(e) => handleInputChange("security", "passwordMinLength", parseInt(e.target.value))}
              className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">Max Login Attempts</label>
            <input
              type="number"
              min="3"
              max="10"
              value={securitySettings.maxLoginAttempts}
              onChange={(e) => handleInputChange("security", "maxLoginAttempts", parseInt(e.target.value))}
              className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );

  // ----------------------
  // Email Settings Panel
  // Purpose: SMTP and email notification configuration
  // ----------------------
  const EmailSettingsPanel = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">SMTP Configuration</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">SMTP Host</label>
            <input
              type="text"
              value={emailSettings.smtpHost}
              onChange={(e) => handleInputChange("email", "smtpHost", e.target.value)}
              className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">SMTP Port</label>
            <input
              type="number"
              value={emailSettings.smtpPort}
              onChange={(e) => handleInputChange("email", "smtpPort", parseInt(e.target.value))}
              className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">Username</label>
            <input
              type="text"
              value={emailSettings.smtpUsername}
              onChange={(e) => handleInputChange("email", "smtpUsername", e.target.value)}
              className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">Password</label>
            <input
              type="password"
              value={emailSettings.smtpPassword}
              onChange={(e) => handleInputChange("email", "smtpPassword", e.target.value)}
              className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Email Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">From Email</label>
            <input
              type="email"
              value={emailSettings.fromEmail}
              onChange={(e) => handleInputChange("email", "fromEmail", e.target.value)}
              className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">From Name</label>
            <input
              type="text"
              value={emailSettings.fromName}
              onChange={(e) => handleInputChange("email", "fromName", e.target.value)}
              className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );

  // ----------------------
  // Content Settings Panel
  // Purpose: Content management and moderation settings
  // ----------------------
  const ContentSettingsPanel = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">User Content</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-neutral-800 rounded-lg">
            <div>
              <h4 className="font-medium text-white">Allow User Registration</h4>
              <p className="text-sm text-neutral-400">Enable new users to register accounts</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={contentSettings.allowUserRegistration}
                onChange={(e) => handleInputChange("content", "allowUserRegistration", e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-neutral-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-neutral-800 rounded-lg">
            <div>
              <h4 className="font-medium text-white">Moderate Comments</h4>
              <p className="text-sm text-neutral-400">Require approval for new comments</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={contentSettings.moderateComments}
                onChange={(e) => handleInputChange("content", "moderateComments", e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-neutral-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-white mb-4">File Upload Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">Max File Size (MB)</label>
            <input
              type="number"
              min="1"
              max="100"
              value={contentSettings.maxFileSize}
              onChange={(e) => handleInputChange("content", "maxFileSize", parseInt(e.target.value))}
              className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">Auto-save Interval (seconds)</label>
            <input
              type="number"
              min="10"
              max="300"
              value={contentSettings.autoSaveInterval}
              onChange={(e) => handleInputChange("content", "autoSaveInterval", parseInt(e.target.value))}
              className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );

  // ----------------------
  // Main Component Render
  // ----------------------
  return (
    <div className="min-h-screen bg-neutral-950 text-white p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 pb-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">System Settings</h1>
            <p className="text-neutral-400">Configure application settings and preferences</p>
          </div>
          <div className="flex items-center gap-4">
            {saveMessage && (
              <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                saveMessage.includes('Error') 
                  ? 'bg-red-500/20 text-red-400' 
                  : 'bg-green-500/20 text-green-400'
              }`}>
                {saveMessage.includes('Error') ? (
                  <AlertTriangle className="h-4 w-4" />
                ) : (
                  <CheckCircle className="h-4 w-4" />
                )}
                {saveMessage}
              </div>
            )}
            <button
              onClick={saveSettings}
              disabled={isSaving || !hasChanges}
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSaving ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>

        {/* Settings Navigation */}
        <div className="bg-neutral-900 rounded-lg border border-neutral-800">
          <div className="border-b border-neutral-800">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-400'
                        : 'border-transparent text-neutral-400 hover:text-neutral-300'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Settings Content */}
          <div className="p-6">
            {activeTab === "general" && <GeneralSettingsPanel />}
            {activeTab === "security" && <SecuritySettingsPanel />}
            {activeTab === "email" && <EmailSettingsPanel />}
            {activeTab === "content" && <ContentSettingsPanel />}
          </div>
        </div>
      </div>
    </div>
  );
}

// ----------------------
// Protected System Settings Page Export
// Purpose: System settings page wrapped with authentication HOC
// ----------------------
export default requireAdminPage(SystemSettingsPage);

/* End of System Settings Page */