import React from 'react';
import { usePosts } from '../../hooks/usePosts';
import { PostCard } from './PostCard';
import { Loader } from '../ui/Loader';

export function PostList() {
  const { data: posts, isLoading, error } = usePosts();

  if (isLoading) return <Loader />;
  if (error) return <div className="text-center text-red-600">Failed to load posts</div>;
  if (!posts?.length) return <div className="text-center text-gray-500">No posts yet</div>;

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}