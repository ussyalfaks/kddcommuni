import React from 'react';
import { usePosts } from '../../hooks/usePosts';
import { PostCard } from './PostCard';
import { Loader } from '../ui/Loader';
import { postsApi } from '../../lib/api';

export function PostList() {
  const { data: posts, isLoading, error, refetch } = usePosts();

  const handleLike = async (postId: string) => {
    try {
      await postsApi.likePost(postId); // API call to like the post
      console.log(`Liked post with ID: ${postId}`);
      refetch(); // Refetch posts to update UI
    } catch (error) {
      console.error(`Failed to like post with ID: ${postId}`, error);
    }
  };

  const handleComment = (postId: string) => {
    console.log(`Opening comment section for post with ID: ${postId}`);
    // Logic to open the comment section (handled by the `PostCard` component)
  };

  const handleReport = async (postId: string) => {
    const reason = prompt('Please provide a reason for reporting this post:');
    if (!reason) return;

    try {
      await postsApi.reportPost(postId, reason); // API call to report the post
      console.log(`Reported post with ID: ${postId} for reason: ${reason}`);
      alert('The post has been reported. Thank you for your feedback!');
    } catch (error) {
      console.error(`Failed to report post with ID: ${postId}`, error);
      alert('Failed to report the post. Please try again.');
    }
  };

  if (isLoading) return <Loader />;
  if (error) return <div className="text-center text-red-600">Failed to load posts</div>;
  if (!posts?.length) return <div className="text-center text-gray-500">No posts yet</div>;

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          onLike={handleLike}
          onComment={handleComment}
          onReport={handleReport}
        />
      ))}
    </div>
  );
}
