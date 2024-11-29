import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { useRecentPosts } from '../../hooks/useRecentPosts';

export function RecentPosts() {
  const { data: posts, isLoading } = useRecentPosts();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <h2 className="text-lg font-medium text-gray-900">Recent Posts</h2>
        <div className="mt-6 flow-root">
          <ul className="-my-5 divide-y divide-gray-200">
            {posts?.map((post) => (
              <li key={post.id} className="py-5">
                <div className="flex items-center space-x-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {post.title}
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      {post.location}
                    </p>
                  </div>
                  <div className="flex-shrink-0 text-sm text-gray-500">
                    {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}