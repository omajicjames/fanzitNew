"use client";

import { useState } from 'react';
import { Search, Plus, Edit, Trash2, Eye, Tag, Calendar, User } from 'lucide-react';

// ----------------------
// Admin Knowledge Base Client Component
// ----------------------
// This component provides knowledge base management functionality
// Located at: /src/features/admin/components/AdminKnowledgeBaseClient.tsx
// Parent: AdminKnowledgeBasePage (/app/(protected)/admin/support/knowledge-base/page.tsx)
// Used within: AdminDashboardLayout (/app/(protected)/admin/page.tsx)

// ----------------------
// Types and Interfaces
// ----------------------
interface KnowledgeBaseArticle {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  status: 'draft' | 'published' | 'archived';
  author: string;
  createdAt: string;
  updatedAt: string;
  views: number;
  helpful: number;
  notHelpful: number;
}

// ----------------------
// Mock Data
// ----------------------
const mockArticles: KnowledgeBaseArticle[] = [
  {
    id: '1',
    title: 'How to Reset Your Password',
    content: 'Step-by-step guide to reset your account password...',
    category: 'Account Management',
    tags: ['password', 'security', 'account'],
    status: 'published',
    author: 'Admin User',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-20',
    views: 1250,
    helpful: 45,
    notHelpful: 3
  },
  {
    id: '2',
    title: 'Understanding Billing Cycles',
    content: 'Comprehensive guide to billing and subscription management...',
    category: 'Billing',
    tags: ['billing', 'subscription', 'payment'],
    status: 'published',
    author: 'Support Team',
    createdAt: '2024-01-10',
    updatedAt: '2024-01-18',
    views: 890,
    helpful: 32,
    notHelpful: 5
  },
  {
    id: '3',
    title: 'API Integration Guide',
    content: 'Technical documentation for API integration...',
    category: 'Technical',
    tags: ['api', 'integration', 'developer'],
    status: 'draft',
    author: 'Tech Team',
    createdAt: '2024-01-22',
    updatedAt: '2024-01-22',
    views: 0,
    helpful: 0,
    notHelpful: 0
  }
];

const categories = ['All', 'Account Management', 'Billing', 'Technical', 'General'];
const statusOptions = ['All', 'published', 'draft', 'archived'];

/**
 * Admin Knowledge Base Client Component
 * Provides interface for managing knowledge base articles and documentation
 * Features: article creation, editing, categorization, and analytics
 */
export function AdminKnowledgeBaseClient() {
  // ----------------------
  // State Management
  // ----------------------
  const [articles, setArticles] = useState<KnowledgeBaseArticle[]>(mockArticles);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [showCreateModal, setShowCreateModal] = useState(false);

  // ----------------------
  // Filter Functions
  // ----------------------
  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || article.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // ----------------------
  // Status Badge Component
  // ----------------------
  const StatusBadge = ({ status }: { status: string }) => {
    const statusStyles = {
      published: 'bg-green-100 text-green-800 border-green-200',
      draft: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      archived: 'bg-gray-100 text-gray-800 border-gray-200'
    };

    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full border ${statusStyles[status as keyof typeof statusStyles]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  // ----------------------
  // Main Component Render
  // ----------------------
  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {statusOptions.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>

        {/* Create Article Button */}
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Create Article
        </button>
      </div>

      {/* Articles Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredArticles.map((article) => (
          <div key={article.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
            {/* Article Header */}
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                {article.title}
              </h3>
              <StatusBadge status={article.status} />
            </div>

            {/* Article Content Preview */}
            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
              {article.content}
            </p>

            {/* Article Meta */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Tag className="h-3 w-3" />
                <span className="font-medium">{article.category}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <User className="h-3 w-3" />
                <span>{article.author}</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Calendar className="h-3 w-3" />
                <span>Updated {article.updatedAt}</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Eye className="h-3 w-3" />
                <span>{article.views} views</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1 mb-4">
              {article.tags.map((tag, index) => (
                <span
                  key={`${article.id}-${tag}`}
                  className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Article Actions */}
            <div className="flex justify-between items-center pt-4 border-t border-gray-100">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span className="text-green-600">👍 {article.helpful}</span>
                <span className="text-red-600">👎 {article.notHelpful}</span>
              </div>
              
              <div className="flex gap-2">
                <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                  <Eye className="h-4 w-4" />
                </button>
                <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                  <Edit className="h-4 w-4" />
                </button>
                <button className="p-1 text-gray-400 hover:text-red-600 transition-colors">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredArticles.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No articles found</h3>
          <p className="text-gray-500">
            {searchTerm || selectedCategory !== 'All' || selectedStatus !== 'All'
              ? 'Try adjusting your search criteria'
              : 'Create your first knowledge base article to get started'
            }
          </p>
        </div>
      )}

      {/* Create Article Modal Placeholder */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Create New Article</h3>
            <p className="text-gray-600 mb-4">Article creation form would go here.</p>
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* End of AdminKnowledgeBaseClient Component */