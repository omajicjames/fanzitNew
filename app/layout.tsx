import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { AuthProvider } from "@src/features/auth/components/auth-provider"
import AppConsentProvider from "./providers/consent-provider"
import { Toaster } from "@src/components/ui/toaster"
import "./globals.css"

export const metadata: Metadata = {
  title: "CreatorHub - Premium Content Platform",
  description: "A subscription-based platform for creators to share exclusive content and connect with their audience",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Prevent flash of wrong theme by setting class before React hydrates */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function() {
  try {
    const key = 'theme';
    const saved = localStorage.getItem(key);
    const isDark = saved ? saved === 'dark'
                         : window.matchMedia('(prefers-color-scheme: dark)').matches;
    const root = document.documentElement;
    root.classList.toggle('dark', isDark);
  } catch (_) {}
})();
`,
          }}
        />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        {/* ---------------------- */}
        {/* Cookie consent system wrapper */}
        {/* Provides consent context and conditional script loading */}
        {/* ---------------------- */}
        <AppConsentProvider>
          {/* ---------------------- */}
          {/* Authentication provider */}
          {/* Handles user authentication state */}
          {/* ---------------------- */}
          <AuthProvider>
            <Suspense fallback={null}>{children}</Suspense>
          </AuthProvider>
          
          {/* ---------------------- */}
          {/* Toast notifications */}
          {/* Global notification system */}
          {/* ---------------------- */}
          <Toaster />
          
          {/* ---------------------- */}
          {/* Vercel Analytics */}
          {/* Note: This will be gated by consent system */}
          {/* ---------------------- */}
          <Analytics />
        </AppConsentProvider>
      </body>
    </html>
  )
}
