import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { useComments } from '../../hooks/useComments';
import { Comment } from '../../types';

interface CommentListProps {
  postId: string;
}

export function CommentList({ postId }: CommentListProps) {
  const { data: comments, isLoading, error } = useComments(postId);

  if (isLoading) return <div className="text-center py-4">Loading comments...</div>;
  if (error) return <div className="text-center py-4 text-red-600">Error loading comments</div>;
  if (!comments?.length) return <div className="text-center py-4 text-gray-500">No comments yet</div>;

  return (
    <div className="space-y-4">
      {comments.map((comment: Comment) => (
        <div key={comment.id} className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-900">
              {comment.anonymous ? 'Anonymous' : 'Community Member'}
            </span>
            <span className="text-sm text-gray-500">
              {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
            </span>
          </div>
          <p className="text-gray-600">{comment.content}</p>
        </div>
      ))}
    </div>
  );
}