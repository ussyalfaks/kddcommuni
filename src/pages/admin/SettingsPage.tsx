import React from 'react';
import { Settings } from 'lucide-react';

export function SettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Settings</h1>

      <div className="bg-white shadow-sm rounded-lg p-6">
        <div className="flex items-center justify-center h-48 text-gray-500">
          <div className="text-center">
            <Settings className="h-12 w-12 mx-auto mb-4" />
            <p>Platform settings coming soon</p>
          </div>
        </div>
      </div>
    </div>
  );
}