import { useQuery, useMutation, useQueryClient } from 'react-query';
import { commentsApi } from '../lib/api';
import type { Comment } from '../types';

export function useComments(postId: string) {
  return useQuery(['comments', postId], () => commentsApi.getComments(postId));
}

export function useCreateComment() {
  const queryClient = useQueryClient();

  return useMutation(
    ({ postId, data }: { postId: string; data: Parameters<typeof commentsApi.createComment>[1] }) =>
      commentsApi.createComment(postId, data),
    {
      onSuccess: (_, { postId }) => {
        queryClient.invalidateQueries(['comments', postId]);
        queryClient.invalidateQueries(['posts']); // Update comment count in post list
      },
    }
  );
}