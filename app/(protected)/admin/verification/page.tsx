"use client";

import { AdminPageTemplate, MetricCard, VerificationDetailView } from "@src/components/admin/AdminPageTemplate";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@src/components/ui/card";
import { Badge } from "@src/components/ui/badge";
import { Button } from "@src/components/ui/button";
import { Input } from "@src/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@src/components/ui/select";
import { useState, useEffect } from "react";
import { 
  BadgeCheck, 
  FileText,
  Clock,
  AlertTriangle,
  CheckCircle,
  ChevronDown,
  User,
  Shield,
  FileImage,
  MapPin,
  Calendar
} from "lucide-react";

// ----------------------
// Verification Management Page
// Location: /app/(protected)/admin/verification/page.tsx
// Purpose: Comprehensive user verification and identity management
// Features: Document verification, identity verification, compliance management
// Note: Mobile-first design with object-oriented structure
// ----------------------

// ----------------------
// Verification Management Page
// Location: /app/(protected)/admin/verification/page.tsx
// Purpose: Single card view verification management with dark/gray theme
// Features: Filtering, single card display, quick stats sidebar
// Note: Optimized for detailed verification management
// ----------------------

export default function VerificationPage() {
  return <VerificationPageClient />;
}

// ----------------------
// Verification Page Client Component
// Purpose: Main verification management interface with single card view
// Note: Optimized for detailed verification management with dark/gray theme
// ----------------------
function VerificationPageClient() {
  const [selectedRequestId, setSelectedRequestId] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Mock data - in production, this would come from an API
  const mockRequests = [
    {
      id: "1",
      user: {
        id: "user1",
        username: "john_creator",
        name: "John Smith",
        bio: "Professional content creator",
        avatar_url: "/placeholder-user.jpg",
        email: "john@example.com",
        role: "creator",
        is_verified: false,
        created_at: "2024-01-15T10:00:00Z",
        updated_at: "2024-01-15T10:00:00Z",
        country: "United States",
        city: "New York",
        profession: "Content Creator",
        status: "active"
      },
      address: "123 Main St",
      city: "New York",
      country: "United States",
      postalCode: "10001",
      documentUrl: "/documents/passport1.pdf",
      w9Status: "pending" as const,
      status: "pending" as const,
      submittedAt: "2024-01-15T10:00:00Z",
      documentType: "passport" as const,
      documentNumber: "P123456789",
      expiryDate: "2029-01-15T00:00:00Z",
      verificationLevel: "enhanced" as const,
      complianceStatus: "under_review" as const,
      riskScore: 35,
      flags: ["document_expires_soon"],
      supportingDocuments: ["utility_bill.pdf", "bank_statement.pdf"]
    },
    {
      id: "2",
      user: {
        id: "user2",
        username: "sarah_artist",
        name: "Sarah Johnson",
        bio: "Digital artist and designer",
        avatar_url: "/placeholder-user.jpg",
        email: "sarah@example.com",
        role: "creator",
        is_verified: false,
        created_at: "2024-01-20T14:30:00Z",
        updated_at: "2024-01-20T14:30:00Z",
        country: "Canada",
        city: "Toronto",
        profession: "Digital Artist",
        status: "active"
      },
      address: "456 Queen St",
      city: "Toronto",
      country: "Canada",
      postalCode: "M5H 2M9",
      documentUrl: "/documents/drivers_license2.pdf",
      w9Status: "not_applicable" as const,
      status: "approved" as const,
      submittedAt: "2024-01-20T14:30:00Z",
      reviewedAt: "2024-01-22T09:15:00Z",
      reviewedBy: "Admin User",
      documentType: "drivers_license" as const,
      documentNumber: "DL987654321",
      verificationLevel: "basic" as const,
      complianceStatus: "compliant" as const,
      riskScore: 15,
      flags: [],
      supportingDocuments: ["portfolio.pdf"]
    },
    {
      id: "3",
      user: {
        id: "user3",
        username: "mike_creator",
        name: "Mike Davis",
        bio: "Fitness and lifestyle content creator",
        avatar_url: "/placeholder-user.jpg",
        email: "mike@example.com",
        role: "creator",
        is_verified: false,
        created_at: "2024-01-25T08:45:00Z",
        updated_at: "2024-01-25T08:45:00Z",
        country: "United Kingdom",
        city: "London",
        profession: "Fitness Influencer",
        status: "active"
      },
      address: "789 Oxford St",
      city: "London",
      country: "United Kingdom",
      postalCode: "W1D 2HG",
      documentUrl: "/documents/national_id3.pdf",
      w9Status: "approved" as const,
      status: "rejected" as const,
      submittedAt: "2024-01-25T08:45:00Z",
      reviewedAt: "2024-01-26T16:20:00Z",
      reviewedBy: "Admin User",
      notes: "Document quality insufficient for verification",
      documentType: "national_id" as const,
      documentNumber: "NI123456789",
      verificationLevel: "premium" as const,
      complianceStatus: "non_compliant" as const,
      riskScore: 75,
      flags: ["document_quality_issue", "address_mismatch"],
      supportingDocuments: ["proof_of_address.pdf", "additional_id.pdf"]
    }
  ];

  // Filter requests based on search and status
  const filteredRequests = mockRequests.filter(request => {
    const matchesSearch = request.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || request.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Set default selected request
  useEffect(() => {
    if (filteredRequests.length > 0 && !selectedRequestId) {
      setSelectedRequestId(filteredRequests[0].id);
    }
  }, [filteredRequests, selectedRequestId]);

  const handleRequestSelect = (requestId: string) => {
    setSelectedRequestId(requestId);
  };

  const handleReview = (requestId: string) => {
    console.log("Review request:", requestId);
    // Implement review logic
  };

  const handleDownload = (requestId: string) => {
    console.log("Download documents for request:", requestId);
    // Implement download logic
  };

  const handleMore = (requestId: string) => {
    console.log("More actions for request:", requestId);
    // Implement more actions logic
  };

  // Stats for the header
  const statsCards = (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard
        title="Total Requests"
        value={mockRequests.length}
        growth={12}
        icon={FileText}
        format="number"
      />
      <MetricCard
        title="Pending Review"
        value={mockRequests.filter(r => r.status === 'pending').length}
        growth={5}
        icon={Clock}
        format="number"
      />
      <MetricCard
        title="Approved"
        value={mockRequests.filter(r => r.status === 'approved').length}
        growth={8}
        icon={CheckCircle}
        format="number"
      />
      <MetricCard
        title="High Risk"
        value={mockRequests.filter(r => r.riskScore > 50).length}
        growth={-2}
        icon={AlertTriangle}
        format="number"
      />
    </div>
  );

  return (
    <AdminPageTemplate
      title="Verification Management"
      description="Manage user verification requests and identity validation"
      icon={<BadgeCheck className="h-6 w-6" />}
      searchPlaceholder="Search verification requests..."
      searchValue={searchTerm}
      onSearchChange={setSearchTerm}
      stats={statsCards}
    >
      <div className="space-y-6">
        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="text-sm font-medium text-text-muted mb-2 block">
              Filter by Status
            </label>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="bg-surface-elev1 border-line-soft text-text">
                <SelectValue placeholder="All statuses" />
              </SelectTrigger>
              <SelectContent className="bg-surface-elev1 border-line-soft">
                <SelectItem value="all" className="text-text">All Statuses</SelectItem>
                <SelectItem value="submitted" className="text-text">Submitted</SelectItem>
                <SelectItem value="pending" className="text-text">Pending</SelectItem>
                <SelectItem value="approved" className="text-text">Approved</SelectItem>
                <SelectItem value="rejected" className="text-text">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Verification Detail View */}
        <VerificationDetailView
          requests={filteredRequests}
          selectedRequestId={selectedRequestId}
          onRequestSelect={handleRequestSelect}
          onReview={handleReview}
          onDownload={handleDownload}
          onMore={handleMore}
        />
      </div>
    </AdminPageTemplate>
  );
}
