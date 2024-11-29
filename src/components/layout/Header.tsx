import React, { useState } from 'react';
import { Menu, Search, PlusCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { CreatePostModal } from '../post/CreatePostModal';

export function Header() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <>
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button className="p-2 rounded-md text-gray-600 hover:bg-gray-100 lg:hidden">
                <Menu className="w-6 h-6" />
              </button>
              <h1 className="ml-2 text-xl font-bold text-gray-900">
                Kaduna Community
              </h1>
            </div>

            <div className="flex-1 max-w-lg mx-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="search"
                  placeholder="Search reports..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <Button
                variant="primary"
                className="flex items-center gap-2"
                onClick={() => setIsCreateModalOpen(true)}
              >
                <PlusCircle className="w-5 h-5" />
                <span>New Report</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <CreatePostModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </>
  );
}