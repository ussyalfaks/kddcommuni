import React, { useState } from 'react';
import { MessageCircle, ThumbsUp, Flag, MapPin } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Post } from '../../types';
import { Button } from '../ui/Button';
import { CommentSection } from '../comment/CommentSection';

interface PostCardProps {
  post: Post;
  onLike: (id: string) => void;
  onComment: (id: string) => void;
  onReport: (id: string) => void;
}

export function PostCard({ post, onLike, onComment, onReport }: PostCardProps) {
  const [showComments, setShowComments] = useState(false);

  return (
    <article className="bg-white rounded-xl shadow-md overflow-hidden">
      {post.imageUrl && (
        <div className="aspect-video w-full overflow-hidden">
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
          <MapPin className="w-4 h-4" />
          <span>{post.location}</span>
          <span className="ml-auto">
            {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
          </span>
        </div>

        <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
        <p className="text-gray-600 mb-4">{post.description}</p>

        <div className="flex items-center gap-4">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onLike(post.id)}
            className="flex items-center gap-2"
          >
            <ThumbsUp className="w-4 h-4" />
            <span>{post.likes}</span>
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            <span>{post.comments}</span>
          </Button>

          <Button
            variant="danger"
            size="sm"
            onClick={() => onReport(post.id)}
            className="flex items-center gap-2 ml-auto"
          >
            <Flag className="w-4 h-4" />
            <span>Report</span>
          </Button>
        </div>

        {showComments && (
          <div className="mt-6 pt-6 border-t">
            <CommentSection
              postId={post.id}
              onClose={() => setShowComments(false)}
            />
          </div>
        )}
      </div>
    </article>
  );
}