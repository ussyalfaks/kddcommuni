import React from 'react';
import { CommentList } from './CommentList';
import { CommentForm } from './CommentForm';

interface CommentSectionProps {
  postId: string;
  onClose?: () => void;
}

export function CommentSection({ postId, onClose }: CommentSectionProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Comments</h3>
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">Close comments</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
      
      <CommentForm postId={postId} />
      <CommentList postId={postId} />
    </div>
  );
}