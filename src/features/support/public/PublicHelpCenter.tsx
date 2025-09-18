"use client"

// ----------------------
// Public Help Center Component
// Location: /src/features/support/public/PublicHelpCenter.tsx
// Purpose: Self-service help center for public users with no admin features
// Parent: Public support page
// Children: Search input, topic grid, contact CTA row
// ----------------------

import React, { useState } from 'react';
import { Button } from "@src/components/ui/button";
import { Input } from "@src/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@src/components/ui/card";
import { 
  Search, 
  User, 
  CreditCard, 
  Wrench, 
  Shield, 
  Settings, 
  FileText,
  MessageCircle,
  Ticket,
  Activity
} from "lucide-react";
import { SupportTopic } from "./types";
import Link from "next/link";

// ----------------------
// Support Topics Configuration
// Purpose: Define the 6 main support categories with routing
// ----------------------
const SUPPORT_TOPICS: SupportTopic[] = [
  {
    slug: "account",
    title: "Account",
    description: "Profile settings, login issues, and account management"
  },
  {
    slug: "payments", 
    title: "Payments",
    description: "Billing, subscriptions, and payment troubleshooting"
  },
  {
    slug: "creator-tools",
    title: "Creator Tools", 
    description: "Content creation, monetization, and creator features"
  },
  {
    slug: "content-safety",
    title: "Content & Safety",
    description: "Community guidelines, reporting, and safety policies"
  },
  {
    slug: "tech",
    title: "Technical Issues",
    description: "App performance, bugs, and technical support"
  },
  {
    slug: "policies",
    title: "Policies",
    description: "Terms of service, privacy policy, and platform rules"
  }
];

// ----------------------
// Topic Icon Mapping
// Purpose: Map topic slugs to appropriate Lucide icons
// ----------------------
const TOPIC_ICONS = {
  account: User,
  payments: CreditCard,
  "creator-tools": Wrench,
  "content-safety": Shield,
  tech: Settings,
  policies: FileText
} as const;

// ----------------------
// Topic Card Component
// Purpose: Individual topic button with icon, title, and description
// ----------------------
function TopicCard({ topic }: { topic: SupportTopic }) {
  const Icon = TOPIC_ICONS[topic.slug];
  
  return (
    <Link href={`/support/topics/${topic.slug}`}>
      <Card className="h-full transition-all duration-200 hover:shadow-md hover:border-primary/20 cursor-pointer group">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
              <Icon className="h-5 w-5 text-primary" />
            </div>
            <CardTitle className="text-lg">{topic.title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {topic.description}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}

// ----------------------
// Contact CTA Component
// Purpose: Contact options row with ticket, chat, and status links
// ----------------------
function ContactCTARow() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* ----------------------
      // Open Ticket CTA
      // ---------------------- */}
      <Link href="/support/ticket/new">
        <Card className="h-full transition-all duration-200 hover:shadow-md hover:border-primary/20 cursor-pointer group">
          <CardContent className="p-6 text-center">
            <div className="flex flex-col items-center gap-3">
              <div className="p-3 rounded-full bg-blue-100 group-hover:bg-blue-200 transition-colors">
                <Ticket className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Open a Ticket</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Submit a detailed support request
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>

      {/* ----------------------
      // Live Chat CTA
      // ---------------------- */}
      <Link href="/support/chat">
        <Card className="h-full transition-all duration-200 hover:shadow-md hover:border-primary/20 cursor-pointer group">
          <CardContent className="p-6 text-center">
            <div className="flex flex-col items-center gap-3">
              <div className="p-3 rounded-full bg-emerald-100 group-hover:bg-emerald-200 transition-colors">
                <MessageCircle className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Start Live Chat</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Get instant help from our support team
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>

      {/* ----------------------
      // Status History CTA
      // ---------------------- */}
      <Link href="/support/status">
        <Card className="h-full transition-all duration-200 hover:shadow-md hover:border-primary/20 cursor-pointer group">
          <CardContent className="p-6 text-center">
            <div className="flex flex-col items-center gap-3">
              <div className="p-3 rounded-full bg-amber-100 group-hover:bg-amber-200 transition-colors">
                <Activity className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">View Status History</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Check platform status and incidents
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
}

// ----------------------
// Main Public Help Center Component
// Purpose: Complete help center with search, topics, and contact options
// ----------------------
export default function PublicHelpCenter() {
  // ----------------------
  // Search State Management
  // Purpose: Handle search input with debounced routing
  // ----------------------
  const [searchQuery, setSearchQuery] = useState("");

  // ----------------------
  // Search Handler
  // Purpose: Handle search form submission and routing
  // ----------------------
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Route to search results page with query parameter
      window.location.href = `/support/search?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <div className="space-y-10">
      {/* ----------------------
      // Search Section
      // Debounced search input for help articles
      // ---------------------- */}
      <div className="max-w-2xl mx-auto">
        <form onSubmit={handleSearch} className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search for help articles, guides, or common issues..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-3 text-base"
          />
          <Button 
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
            size="sm"
          >
            Search
          </Button>
        </form>
      </div>

      {/* ----------------------
      // Topics Grid Section
      // 6 main support categories in responsive grid
      // ---------------------- */}
      <div>
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold mb-2">Browse by Topic</h2>
          <p className="text-muted-foreground">
            Find answers organized by category
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SUPPORT_TOPICS.map((topic) => (
            <TopicCard key={topic.slug} topic={topic} />
          ))}
        </div>
      </div>

      {/* ----------------------
      // Contact CTA Section
      // Three contact options for additional support
      // ---------------------- */}
      <div>
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold mb-2">Need More Help?</h2>
          <p className="text-muted-foreground">
            Can't find what you're looking for? Get in touch with our support team
          </p>
        </div>
        
        <ContactCTARow />
      </div>
    </div>
  );
}