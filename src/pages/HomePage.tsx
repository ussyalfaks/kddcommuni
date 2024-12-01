import React from 'react';
import { Layout } from '../components/layout/Layout';
import { PostList } from '../components/post/PostList';
import { CreatePostButton } from '../components/post/CreatePostButton';

export function HomePage() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Community Reports
          </h1>
          <CreatePostButton />
        </div>
        <PostList />
      </div>
    </Layout>
  );
}