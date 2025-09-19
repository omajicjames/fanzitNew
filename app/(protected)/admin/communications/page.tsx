"use client";

import { AdminPillNavigationComponent } from "@src/components/admin/AdminPillNavigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@src/components/ui/card";
import { Badge } from "@src/components/ui/badge";
import { Button } from "@src/components/ui/button";
import { Input } from "@src/components/ui/input";
import { Textarea } from "@src/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@src/components/ui/tabs";
import { 
  MessagesSquare, 
  Mail, 
  Bell, 
  Send, 
  Search, 
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  Clock,
  AlertTriangle,
  Users,
  FileText,
  Calendar,
  Target
} from "lucide-react";

// ----------------------
// Communications Page
// Location: /app/(protected)/admin/communications/page.tsx
// Purpose: Comprehensive communications management for OnlyFans-like platform
// Features: Announcements, messaging, email campaigns, notifications
// Note: Mobile-first design with object-oriented structure
// ----------------------

interface CommunicationData {
  id: string;
  type: 'announcement' | 'email' | 'notification' | 'message';
  title: string;
  content: string;
  status: 'draft' | 'scheduled' | 'sent' | 'failed';
  targetAudience: 'all' | 'creators' | 'subscribers' | 'specific';
  recipients: number;
  sentAt?: string;
  scheduledFor?: string;
  createdAt: string;
  createdBy: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  tags: string[];
}

class CommunicationsService {
  private communications: CommunicationData[] = [
    {
      id: '1',
      type: 'announcement',
      title: 'Platform Maintenance Scheduled',
      content: 'We will be performing scheduled maintenance on January 30th from 2-4 AM EST. Some features may be temporarily unavailable.',
      status: 'sent',
      targetAudience: 'all',
      recipients: 125847,
      sentAt: '2025-01-25T10:00:00Z',
      createdAt: '2025-01-25T09:30:00Z',
      createdBy: 'admin',
      priority: 'medium',
      tags: ['maintenance', 'platform']
    },
    {
      id: '2',
      type: 'email',
      title: 'New Creator Onboarding Guide',
      content: 'Welcome to our platform! Here\'s your complete guide to getting started as a creator...',
      status: 'scheduled',
      targetAudience: 'creators',
      recipients: 15420,
      scheduledFor: '2025-01-28T14:00:00Z',
      createdAt: '2025-01-26T11:00:00Z',
      createdBy: 'admin',
      priority: 'low',
      tags: ['onboarding', 'creators', 'guide']
    },
    {
      id: '3',
      type: 'notification',
      title: 'Payment Processed',
      content: 'Your payout of $1,250.00 has been processed and will arrive in your account within 1-2 business days.',
      status: 'sent',
      targetAudience: 'specific',
      recipients: 1,
      sentAt: '2025-01-27T08:30:00Z',
      createdAt: '2025-01-27T08:30:00Z',
      createdBy: 'system',
      priority: 'medium',
      tags: ['payment', 'payout']
    }
  ];

  public getAllCommunications(): CommunicationData[] {
    return this.communications;
  }

  public getCommunicationsByType(type: string): CommunicationData[] {
    return this.communications.filter(c => c.type === type);
  }

  public getCommunicationsByStatus(status: string): CommunicationData[] {
    return this.communications.filter(c => c.status === status);
  }

  public getScheduledCommunications(): CommunicationData[] {
    return this.communications.filter(c => c.status === 'scheduled');
  }

  public getDraftCommunications(): CommunicationData[] {
    return this.communications.filter(c => c.status === 'draft');
  }
}

class CommunicationCardComponent {
  private communication: CommunicationData;

  constructor(communication: CommunicationData) {
    this.communication = communication;
  }

  private getStatusBadge() {
    const statusConfig = {
      draft: { variant: 'secondary' as const, icon: FileText, text: 'Draft' },
      scheduled: { variant: 'default' as const, icon: Clock, text: 'Scheduled' },
      sent: { variant: 'default' as const, icon: CheckCircle, text: 'Sent' },
      failed: { variant: 'destructive' as const, icon: AlertTriangle, text: 'Failed' }
    };

    const config = statusConfig[this.communication.status];
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {config.text}
      </Badge>
    );
  }

  private getTypeIcon() {
    const typeIcons = {
      announcement: Bell,
      email: Mail,
      notification: MessagesSquare,
      message: Send
    };

    const Icon = typeIcons[this.communication.type];
    return <Icon className="h-4 w-4" />;
  }

  private getPriorityBadge() {
    const priorityConfig = {
      low: { variant: 'secondary' as const, text: 'Low' },
      medium: { variant: 'default' as const, text: 'Medium' },
      high: { variant: 'destructive' as const, text: 'High' },
      urgent: { variant: 'destructive' as const, text: 'Urgent' }
    };

    const config = priorityConfig[this.communication.priority];
    return (
      <Badge variant={config.variant} className="text-xs">
        {config.text}
      </Badge>
    );
  }

  public render() {
    return (
      <Card className="hover:shadow-lg transition-shadow duration-200">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                {this.getTypeIcon()}
              </div>
              <div className="flex-1 min-w-0">
                <CardTitle className="text-lg flex items-center gap-2">
                  {this.communication.title}
                </CardTitle>
                <CardDescription className="line-clamp-2">
                  {this.communication.content}
                </CardDescription>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline" className="text-xs">
                    {this.communication.targetAudience}
                  </Badge>
                  {this.getPriorityBadge()}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              {this.getStatusBadge()}
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Recipients and Timing */}
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center justify-center gap-1 text-blue-600">
                <Users className="h-4 w-4" />
                <span className="font-semibold">{this.communication.recipients.toLocaleString()}</span>
              </div>
              <p className="text-xs text-muted-foreground">Recipients</p>
            </div>
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center justify-center gap-1 text-green-600">
                <Calendar className="h-4 w-4" />
                <span className="font-semibold text-sm">
                  {this.communication.sentAt 
                    ? new Date(this.communication.sentAt).toLocaleDateString()
                    : this.communication.scheduledFor
                    ? new Date(this.communication.scheduledFor).toLocaleDateString()
                    : 'Draft'
                  }
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                {this.communication.sentAt ? 'Sent' : this.communication.scheduledFor ? 'Scheduled' : 'Created'}
              </p>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1">
            {this.communication.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                #{tag}
              </Badge>
            ))}
          </div>

          {/* Created By */}
          <div className="text-sm text-muted-foreground">
            Created by {this.communication.createdBy} • {new Date(this.communication.createdAt).toLocaleDateString()}
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1">
              <Eye className="h-4 w-4 mr-1" />
              View
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              <Edit className="h-4 w-4 mr-1" />
              Edit
            </Button>
            <Button variant="outline" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }
}

class NewCommunicationForm {
  public render() {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Create New Communication</CardTitle>
          <CardDescription>Send announcements, emails, or notifications to users</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Type</label>
              <select className="w-full p-2 border rounded-md bg-background">
                <option value="announcement">Announcement</option>
                <option value="email">Email</option>
                <option value="notification">Notification</option>
                <option value="message">Message</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Target Audience</label>
              <select className="w-full p-2 border rounded-md bg-background">
                <option value="all">All Users</option>
                <option value="creators">Creators Only</option>
                <option value="subscribers">Subscribers Only</option>
                <option value="specific">Specific Users</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium">Title</label>
            <Input placeholder="Enter communication title..." />
          </div>
          
          <div>
            <label className="text-sm font-medium">Content</label>
            <Textarea 
              placeholder="Enter your message content..."
              className="min-h-32"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Priority</label>
              <select className="w-full p-2 border rounded-md bg-background">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Schedule</label>
              <Input type="datetime-local" />
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button className="flex-1">
              <Send className="h-4 w-4 mr-1" />
              Send Now
            </Button>
            <Button variant="outline" className="flex-1">
              <Clock className="h-4 w-4 mr-1" />
              Schedule
            </Button>
            <Button variant="outline">
              <FileText className="h-4 w-4 mr-1" />
              Save Draft
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }
}

export default function CommunicationsPage() {
  const communicationsService = new CommunicationsService();
  const allCommunications = communicationsService.getAllCommunications();
  const announcements = communicationsService.getCommunicationsByType('announcement');
  const emails = communicationsService.getCommunicationsByType('email');
  const notifications = communicationsService.getCommunicationsByType('notification');
  const scheduled = communicationsService.getScheduledCommunications();
  const drafts = communicationsService.getDraftCommunications();

  return (
    <div className="space-y-6">
      {/* Header with Pills */}
      <div className="space-y-4">
        <div>
          <h1 className="text-3xl font-bold">Communications</h1>
          <p className="text-muted-foreground">Manage announcements, emails, and user notifications</p>
        </div>
        <AdminPillNavigationComponent />
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search communications..."
            className="pl-10"
          />
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filters
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Sent</p>
                <p className="text-2xl font-bold">{allCommunications.filter(c => c.status === 'sent').length}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Scheduled</p>
                <p className="text-2xl font-bold text-blue-600">{scheduled.length}</p>
              </div>
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Drafts</p>
                <p className="text-2xl font-bold text-yellow-600">{drafts.length}</p>
              </div>
              <FileText className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Recipients</p>
                <p className="text-2xl font-bold">
                  {allCommunications.reduce((sum, c) => sum + c.recipients, 0).toLocaleString()}
                </p>
              </div>
              <Users className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Communications Tabs */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="announcements">Announcements</TabsTrigger>
          <TabsTrigger value="emails">Emails</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
          <TabsTrigger value="drafts">Drafts</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {allCommunications.map((communication) => {
              const communicationCard = new CommunicationCardComponent(communication);
              return <div key={communication.id}>{communicationCard.render()}</div>;
            })}
          </div>
        </TabsContent>

        <TabsContent value="announcements" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {announcements.map((communication) => {
              const communicationCard = new CommunicationCardComponent(communication);
              return <div key={communication.id}>{communicationCard.render()}</div>;
            })}
          </div>
        </TabsContent>

        <TabsContent value="emails" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {emails.map((communication) => {
              const communicationCard = new CommunicationCardComponent(communication);
              return <div key={communication.id}>{communicationCard.render()}</div>;
            })}
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {notifications.map((communication) => {
              const communicationCard = new CommunicationCardComponent(communication);
              return <div key={communication.id}>{communicationCard.render()}</div>;
            })}
          </div>
        </TabsContent>

        <TabsContent value="scheduled" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {scheduled.map((communication) => {
              const communicationCard = new CommunicationCardComponent(communication);
              return <div key={communication.id}>{communicationCard.render()}</div>;
            })}
          </div>
        </TabsContent>

        <TabsContent value="drafts" className="space-y-4">
          <div className="space-y-4">
            <NewCommunicationForm />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {drafts.map((communication) => {
                const communicationCard = new CommunicationCardComponent(communication);
                return <div key={communication.id}>{communicationCard.render()}</div>;
              })}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
