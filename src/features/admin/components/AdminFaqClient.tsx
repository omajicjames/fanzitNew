"use client";

import { useState } from 'react';
import { Search, Plus, Edit, Trash2, ChevronDown, ChevronUp, Eye, Tag } from 'lucide-react';

// ----------------------
// Admin FAQ Client Component
// ----------------------
// This component provides FAQ management functionality
// Located at: /src/features/admin/components/AdminFaqClient.tsx
// Parent: AdminFaqPage (/app/(protected)/admin/support/faq/page.tsx)
// Used within: AdminDashboardLayout (/app/(protected)/admin/page.tsx)

// ----------------------
// Types and Interfaces
// ----------------------
interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  tags: string[];
  order: number;
  views: number;
  helpful: number;
  notHelpful: number;
  createdAt: string;
  updatedAt: string;
}

// ----------------------
// Mock Data
// ----------------------
const mockFaqs: FaqItem[] = [
  {
    id: '1',
    question: 'How do I reset my password?',
    answer: 'To reset your password, click on the "Forgot Password" link on the login page. Enter your email address and follow the instructions sent to your email.',
    category: 'Account',
    tags: ['password', 'security', 'login'],
    order: 1,
    views: 2450,
    helpful: 89,
    notHelpful: 12,
    createdAt: '2024-01-10',
    updatedAt: '2024-01-15'
  },
  {
    id: '2',
    question: 'How do I cancel my subscription?',
    answer: 'You can cancel your subscription by going to Account Settings > Billing > Cancel Subscription. Your access will continue until the end of your current billing period.',
    category: 'Billing',
    tags: ['subscription', 'billing', 'cancel'],
    order: 2,
    views: 1890,
    helpful: 67,
    notHelpful: 8,
    createdAt: '2024-01-08',
    updatedAt: '2024-01-20'
  },
  {
    id: '3',
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for enterprise customers.',
    category: 'Billing',
    tags: ['payment', 'billing', 'methods'],
    order: 3,
    views: 1234,
    helpful: 45,
    notHelpful: 3,
    createdAt: '2024-01-12',
    updatedAt: '2024-01-18'
  },
  {
    id: '4',
    question: 'How do I integrate with the API?',
    answer: 'Our API documentation is available at docs.example.com/api. You\'ll need to generate an API key from your dashboard and include it in your requests.',
    category: 'Technical',
    tags: ['api', 'integration', 'developer'],
    order: 4,
    views: 567,
    helpful: 23,
    notHelpful: 5,
    createdAt: '2024-01-05',
    updatedAt: '2024-01-22'
  }
];

const categories = ['All', 'Account', 'Billing', 'Technical', 'General'];

/**
 * Admin FAQ Client Component
 * Provides interface for managing FAQ items and their organization
 * Features: FAQ creation, editing, categorization, and analytics
 */
export function AdminFaqClient() {
  // ----------------------
  // State Management
  // ----------------------
  const [faqs, setFaqs] = useState<FaqItem[]>(mockFaqs);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // ----------------------
  // Filter Functions
  // ----------------------
  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  }).sort((a, b) => a.order - b.order);

  // ----------------------
  // Toggle FAQ Expansion
  // ----------------------
  const toggleFaqExpansion = (faqId: string) => {
    setExpandedFaq(expandedFaq === faqId ? null : faqId);
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
              placeholder="Search FAQs..."
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


        </div>

        {/* Create FAQ Button */}
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Create FAQ
        </button>
      </div>

      {/* FAQ List */}
      <div className="space-y-4">
        {filteredFaqs.map((faq) => (
          <div key={faq.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            {/* FAQ Header */}
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <button
                      onClick={() => toggleFaqExpansion(faq.id)}
                      className="flex items-center gap-2 text-left hover:text-blue-600 transition-colors"
                    >
                      <h3 className="text-lg font-semibold text-gray-900">
                        {faq.question}
                      </h3>
                      {expandedFaq === faq.id ? (
                        <ChevronUp className="h-5 w-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Tag className="h-3 w-3" />
                      {faq.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {faq.views} views
                    </span>
                    <span>Order: {faq.order}</span>
                  </div>
                </div>

                {/* FAQ Actions */}
                <div className="flex gap-2">
                  <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* FAQ Content (Expandable) */}
            {expandedFaq === faq.id && (
              <div className="p-4 bg-gray-50">
                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">Answer:</h4>
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </div>

                {/* Tags */}
                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">Tags:</h4>
                  <div className="flex flex-wrap gap-2">
                    {faq.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Analytics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-gray-200">
                  <div className="text-center">
                    <div className="text-lg font-semibold text-gray-900">{faq.views}</div>
                    <div className="text-sm text-gray-500">Views</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-green-600">{faq.helpful}</div>
                    <div className="text-sm text-gray-500">Helpful</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-red-600">{faq.notHelpful}</div>
                    <div className="text-sm text-gray-500">Not Helpful</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-blue-600">
                      {Math.round((faq.helpful / (faq.helpful + faq.notHelpful)) * 100)}%
                    </div>
                    <div className="text-sm text-gray-500">Satisfaction</div>
                  </div>
                </div>

                {/* Metadata */}
                <div className="mt-4 pt-4 border-t border-gray-200 text-sm text-gray-500">
                  <div className="flex justify-between">
                    <span>Created: {faq.createdAt}</span>
                    <span>Updated: {faq.updatedAt}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredFaqs.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No FAQs found</h3>
          <p className="text-gray-500">
            {searchTerm || selectedCategory !== 'All'
              ? 'Try adjusting your search criteria'
              : 'Create your first FAQ to get started'
            }
          </p>
        </div>
      )}

      {/* Create FAQ Modal Placeholder */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Create New FAQ</h3>
            <p className="text-gray-600 mb-4">FAQ creation form would go here.</p>
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

/* End of AdminFaqClient Component */