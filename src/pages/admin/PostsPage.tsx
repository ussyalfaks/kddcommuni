import { usePosts } from '../../hooks/usePosts';
import { PostCard } from '../../components/post/PostCard';
import { Loader } from '../../components/ui/Loader';

export function PostsPage() {
  const { data: posts, isLoading, error } = usePosts();

  if (isLoading) return <Loader />;
  if (error) return <div className="text-red-600">Failed to load posts</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">All Posts</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts?.map((post) => (
          <PostCard 
            key={post.id} 
            post={post}
            onLike={() => {}}
            onComment={() => {}}
            onReport={() => {}}
          />
        ))}
      </div>
    </div>
  );
}