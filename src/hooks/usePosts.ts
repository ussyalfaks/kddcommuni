import { useQuery, useMutation } from 'react-query';
import { postsApi } from '../lib/api';
import { queryClient } from '../lib/queryClient';
import type { Post } from '../types';

export function usePosts(params?: { location?: string; search?: string }) {
  return useQuery(['posts', params], () => postsApi.getPosts(params), {
    select: (data: Post[]) => data.map(post => ({
      ...post,
      createdAt: new Date(post.createdAt)
    }))
  });
}

export function usePost(id: string) {
  return useQuery(['post', id], () => postsApi.getPost(id), {
    select: (data: Post) => ({
      ...data,
      createdAt: new Date(data.createdAt)
    })
  });
}

export function useLikePost() {
  return useMutation(
    (postId: string) => postsApi.likePost(postId),
    {
      onMutate: async (postId) => {
        await queryClient.cancelQueries(['posts']);
        
        const previousPosts = queryClient.getQueryData<Post[]>(['posts']);
        
        if (previousPosts) {
          queryClient.setQueryData<Post[]>(['posts'], posts =>
            posts?.map(post =>
              post.id === postId ? { ...post, likes: post.likes + 1 } : post
            ) ?? []
          );
        }
        
        return { previousPosts };
      },
      onError: (_, __, context: any) => {
        if (context?.previousPosts) {
          queryClient.setQueryData(['posts'], context.previousPosts);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries(['posts']);
      }
    }
  );
}

export function useCreatePost() {
  return useMutation(
    (data: Parameters<typeof postsApi.createPost>[0]) => postsApi.createPost(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['posts']);
      }
    }
  );
}