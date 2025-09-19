// ----------------------
// Test Admin Page - Simple Authentication Test
// Purpose: Test authentication without requireAdminPage HOC
// Location: /app/test-admin/page.tsx
// ----------------------

'use client';

import { useEffect, useState } from 'react';

export default function TestAdminPage() {
  const [authStatus, setAuthStatus] = useState<string>('checking...');
  const [token, setToken] = useState<string>('');
  const [role, setRole] = useState<string>('');

  useEffect(() => {
    // Check authentication
    const adminToken = localStorage.getItem('admin_token');
    const userRole = localStorage.getItem('user_role');
    const adminSession = localStorage.getItem('admin_session');

    console.log('=== Test Admin Page ===');
    console.log('admin_token:', adminToken);
    console.log('user_role:', userRole);
    console.log('admin_session:', adminSession);

    if (adminToken && userRole === 'admin') {
      setAuthStatus('AUTHENTICATED');
      setToken(adminToken.substring(0, 10) + '...');
      setRole(userRole);
    } else {
      setAuthStatus('NOT AUTHENTICATED');
      setToken('none');
      setRole(userRole || 'none');
    }
  }, []);

  const handleLogin = () => {
    // Simulate login
    localStorage.setItem('admin_token', 'test-token-12345');
    localStorage.setItem('user_role', 'admin');
    localStorage.setItem('admin_session', JSON.stringify({
      token: 'test-token-12345',
      role: 'admin',
      timestamp: Date.now()
    }));
    
    setAuthStatus('AUTHENTICATED (after login)');
    setToken('test-token...');
    setRole('admin');
  };

  const handleLogout = () => {
    // Simulate logout
    localStorage.removeItem('admin_token');
    localStorage.removeItem('user_role');
    localStorage.removeItem('admin_session');
    
    setAuthStatus('NOT AUTHENTICATED (after logout)');
    setToken('none');
    setRole('none');
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1>Test Admin Page</h1>
      <div className="bg-gray-100 p-4 rounded-lg mt-4">
        <h2>Authentication Status:</h2>
        <p><strong>Status:</strong> {authStatus}</p>
        <p><strong>Token:</strong> {token}</p>
        <p><strong>Role:</strong> {role}</p>
      </div>
      
      <div className="mt-4 space-x-4">
        <button 
          onClick={handleLogin}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Simulate Login
        </button>
        
        <button 
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Simulate Logout
        </button>
      </div>
      
      <div className="mt-6">
        <a href="/admin" className="text-blue-500 hover:underline">
          Go to Real Admin Page
        </a>
      </div>
    </div>
  );
}