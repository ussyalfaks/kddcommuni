import { useState } from 'react';
import { Button } from '../ui/Button';
import { useCreateComment } from '../../hooks/useComments';

interface CommentFormProps {
  postId: string;
  onSuccess?: () => void;
}

export function CommentForm({ postId, onSuccess }: CommentFormProps) {
  const [content, setContent] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const createComment = useCreateComment();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      await createComment.mutate(
        {
          postId,
          data: {
            content: content.trim(),
            anonymous: isAnonymous,
          },
        },
        {
          onSuccess: () => {
            setContent('');
            onSuccess?.();
          },
        }
      );
    } catch (error) {
      console.error('Failed to create comment:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Share your thoughts..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          rows={3}
        />
      </div>
      
      <div className="flex items-center justify-between">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={isAnonymous}
            onChange={(e) => setIsAnonymous(e.target.checked)}
            className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
          <span className="text-sm text-gray-600">Post anonymously</span>
        </label>
        
        <Button
          type="submit"
          disabled={!content.trim() || createComment.isLoading}
          className="ml-auto"
        >
          {createComment.isLoading ? 'Posting...' : 'Post Comment'}
        </Button>
      </div>
    </form>
  );
}