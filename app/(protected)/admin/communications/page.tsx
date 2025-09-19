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
      <Card className="bg-neutral-800 border-neutral-700 hover:shadow-lg transition-shadow duration-200">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-neutral-700 flex items-center justify-center">
                {this.getTypeIcon()}
              </div>
              <div className="flex-1 min-w-0">
                <CardTitle className="text-lg flex items-center gap-2 text-white">
                  {this.communication.title}
                </CardTitle>
                <CardDescription className="line-clamp-2 text-neutral-400">
                  {this.communication.content}
                </CardDescription>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline" className="text-xs bg-neutral-700 border-neutral-600 text-neutral-300">
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
            <div className="text-center p-3 bg-neutral-700/50 rounded-lg">
              <div className="flex items-center justify-center gap-1 text-blue-500">
                <Users className="h-4 w-4" />
                <span className="font-semibold">{this.communication.recipients.toLocaleString()}</span>
              </div>
              <p className="text-xs text-neutral-400">Recipients</p>
            </div>
            <div className="text-center p-3 bg-neutral-700/50 rounded-lg">
              <div className="flex items-center justify-center gap-1 text-green-500">
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
              <p className="text-xs text-neutral-400">
                {this.communication.sentAt ? 'Sent' : this.communication.scheduledFor ? 'Scheduled' : 'Created'}
              </p>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1">
            {this.communication.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs bg-neutral-700 text-neutral-300">
                #{tag}
              </Badge>
            ))}
          </div>

          {/* Created By */}
          <div className="text-sm text-neutral-400">
            Created by {this.communication.createdBy} • {new Date(this.communication.createdAt).toLocaleDateString()}
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1 bg-neutral-700 border-neutral-600 text-white hover:bg-neutral-600">
              <Eye className="h-4 w-4 mr-1" />
              View
            </Button>
            <Button variant="outline" size="sm" className="flex-1 bg-neutral-700 border-neutral-600 text-white hover:bg-neutral-600">
              <Edit className="h-4 w-4 mr-1" />
              Edit
            </Button>
            <Button variant="outline" size="sm" className="bg-neutral-700 border-neutral-600 text-white hover:bg-neutral-600">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }
}

function NewCommunicationForm() {
  return (
    <Card className="bg-neutral-800 border-neutral-700">
      <CardHeader>
        <CardTitle className="text-white">Create New Communication</CardTitle>
        <CardDescription className="text-neutral-400">Send announcements, emails, or notifications to users</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-white">Type</label>
            <select className="w-full p-2 border border-neutral-600 rounded-md bg-neutral-700 text-white">
              <option value="announcement">Announcement</option>
              <option value="email">Email</option>
              <option value="notification">Notification</option>
              <option value="message">Message</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-white">Target Audience</label>
            <select className="w-full p-2 border border-neutral-600 rounded-md bg-neutral-700 text-white">
              <option value="all">All Users</option>
              <option value="creators">Creators Only</option>
              <option value="subscribers">Subscribers Only</option>
              <option value="specific">Specific Users</option>
            </select>
          </div>
        </div>
        
        <div>
          <label className="text-sm font-medium text-white">Title</label>
          <Input 
            placeholder="Enter communication title..." 
            className="bg-neutral-700 border-neutral-600 text-white"
          />
        </div>
        
        <div>
          <label className="text-sm font-medium text-white">Content</label>
          <Textarea 
            placeholder="Enter your message content..."
            className="min-h-32 bg-neutral-700 border-neutral-600 text-white"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-white">Priority</label>
            <select className="w-full p-2 border border-neutral-600 rounded-md bg-neutral-700 text-white">
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-white">Schedule</label>
            <Input 
              type="datetime-local" 
              className="bg-neutral-700 border-neutral-600 text-white"
            />
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white">
            <Send className="h-4 w-4 mr-1" />
            Send Now
          </Button>
          <Button variant="outline" className="flex-1 bg-neutral-700 border-neutral-600 text-white hover:bg-neutral-600">
            <Clock className="h-4 w-4 mr-1" />
            Schedule
          </Button>
          <Button variant="outline" className="bg-neutral-700 border-neutral-600 text-white hover:bg-neutral-600">
            <FileText className="h-4 w-4 mr-1" />
            Save Draft
          </Button>
        </div>
      </CardContent>
    </Card>
  );
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
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Communications</h1>
            <p className="text-neutral-400">Manage announcements, emails, and user notifications</p>
          </div>
          <Badge className="bg-orange-500 text-white">Super Admin</Badge>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-2">Communication Overview</h2>
        <p className="text-neutral-400 mb-6">Messages, notifications, and engagement metrics</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-neutral-800 border border-neutral-700 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-400 uppercase tracking-wide">Total Sent</p>
                <p className="text-2xl font-bold text-white">{allCommunications.filter(c => c.status === 'sent').length}</p>
                <div className="flex items-center gap-1 text-sm text-green-500">
                  <CheckCircle className="h-4 w-4" />
                  +12.5% from last month
                </div>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </div>
          
          <div className="bg-neutral-800 border border-neutral-700 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-400 uppercase tracking-wide">Scheduled</p>
                <p className="text-2xl font-bold text-white">{scheduled.length}</p>
                <div className="flex items-center gap-1 text-sm text-blue-500">
                  <Clock className="h-4 w-4" />
                  Pending delivery
                </div>
              </div>
              <Clock className="h-8 w-8 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-neutral-800 border border-neutral-700 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-400 uppercase tracking-wide">Drafts</p>
                <p className="text-2xl font-bold text-white">{drafts.length}</p>
                <div className="flex items-center gap-1 text-sm text-orange-500">
                  <FileText className="h-4 w-4" />
                  In progress
                </div>
              </div>
              <FileText className="h-8 w-8 text-orange-500" />
            </div>
          </div>
          
          <div className="bg-neutral-800 border border-neutral-700 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-400 uppercase tracking-wide">Open Rate</p>
                <p className="text-2xl font-bold text-white">78.5%</p>
                <div className="flex items-center gap-1 text-sm text-purple-500">
                  <Target className="h-4 w-4" />
                  +5.2% from last month
                </div>
              </div>
              <Target className="h-8 w-8 text-purple-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Communication Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="bg-neutral-800 border-neutral-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <MessagesSquare className="h-5 w-5 text-green-500" />
              Message Analytics
            </CardTitle>
            <CardDescription className="text-neutral-400">Communication performance and engagement</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-neutral-900/50 rounded-lg">
              <div className="text-center">
                <MessagesSquare className="h-12 w-12 text-neutral-400 mx-auto mb-2" />
                <p className="text-neutral-400">Message analytics chart</p>
                <p className="text-sm text-neutral-500">Bar chart showing message performance</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-neutral-800 border-neutral-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Bell className="h-5 w-5 text-blue-500" />
              Notification Trends
            </CardTitle>
            <CardDescription className="text-neutral-400">Notification delivery and engagement trends</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-neutral-900/50 rounded-lg">
              <div className="text-center">
                <Bell className="h-12 w-12 text-neutral-400 mx-auto mb-2" />
                <p className="text-neutral-400">Notification trends chart</p>
                <p className="text-sm text-neutral-500">Line chart showing notification trends</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
          <Input 
            placeholder="Search communications..."
            className="pl-10 bg-neutral-800 border-neutral-700 text-white"
          />
        </div>
        <Button variant="outline" className="flex items-center gap-2 bg-neutral-800 border-neutral-700 text-white hover:bg-neutral-700">
          <Filter className="h-4 w-4" />
          Filters
        </Button>
      </div>


      {/* Communications Tabs */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className="grid w-full grid-cols-6 bg-neutral-800 border-neutral-700">
          <TabsTrigger value="all" className="data-[state=active]:bg-neutral-700 data-[state=active]:text-white text-neutral-400">All</TabsTrigger>
          <TabsTrigger value="announcements" className="data-[state=active]:bg-neutral-700 data-[state=active]:text-white text-neutral-400">Announcements</TabsTrigger>
          <TabsTrigger value="emails" className="data-[state=active]:bg-neutral-700 data-[state=active]:text-white text-neutral-400">Emails</TabsTrigger>
          <TabsTrigger value="notifications" className="data-[state=active]:bg-neutral-700 data-[state=active]:text-white text-neutral-400">Notifications</TabsTrigger>
          <TabsTrigger value="scheduled" className="data-[state=active]:bg-neutral-700 data-[state=active]:text-white text-neutral-400">Scheduled</TabsTrigger>
          <TabsTrigger value="drafts" className="data-[state=active]:bg-neutral-700 data-[state=active]:text-white text-neutral-400">Drafts</TabsTrigger>
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
