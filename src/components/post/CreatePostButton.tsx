import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { CreatePostModal } from './CreatePostModal';

export function CreatePostButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setIsModalOpen(true)}
        className="flex items-center gap-2"
      >
        <PlusCircle className="w-5 h-5" />
        <span>New Report</span>
      </Button>

      <CreatePostModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}