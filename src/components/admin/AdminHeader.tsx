import React from 'react';
import { Settings, LogOut } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export function AdminHeader() {
  const { logout } = useAuth();

  return (
    <header className="bg-white shadow-sm">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          
          <div className="flex items-center gap-4">
            <button className="text-gray-500 hover:text-gray-700">
              <Settings className="h-6 w-6" />
            </button>
            <button 
              onClick={logout}
              className="text-gray-500 hover:text-gray-700"
            >
              <LogOut className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}