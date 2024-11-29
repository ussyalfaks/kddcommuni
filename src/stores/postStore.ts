import create from 'zustand';
import { Post } from '../types';
import { postsApi } from '../lib/api';

interface PostStore {
  posts: Post[];
  loading: boolean;
  error: string | null;
  fetchPosts: (params?: { location?: string; search?: string }) => Promise<void>;
  likePost: (id: string) => Promise<void>;
  reportPost: (id: string, reason: string) => Promise<void>;
}

export const usePostStore = create<PostStore>((set, get) => ({
  posts: [],
  loading: false,
  error: null,

  fetchPosts: async (params) => {
    try {
      set({ loading: true, error: null });
      const posts = await postsApi.getPosts(params);
      set({ posts, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch posts', loading: false });
    }
  },

  likePost: async (id: string) => {
    try {
      await postsApi.likePost(id);
      const posts = get().posts.map(post =>
        post.id === id ? { ...post, likes: post.likes + 1 } : post
      );
      set({ posts });
    } catch (error) {
      set({ error: 'Failed to like post' });
    }
  },

  reportPost: async (id: string, reason: string) => {
    try {
      await postsApi.reportPost(id, reason);
      // Optionally update UI to show report was successful
    } catch (error) {
      set({ error: 'Failed to report post' });
    }
  },
}));