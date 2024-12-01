import React from 'react';
import { Users } from 'lucide-react';

export function UsersPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Users Management</h1>

      <div className="bg-white shadow-sm rounded-lg p-6">
        <div className="flex items-center justify-center h-48 text-gray-500">
          <div className="text-center">
            <Users className="h-12 w-12 mx-auto mb-4" />
            <p>User management features coming soon</p>
          </div>
        </div>
      </div>
    </div>
  );
}