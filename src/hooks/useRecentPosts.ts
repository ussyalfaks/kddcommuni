import { useQuery } from 'react-query';
import { adminApi } from '../lib/api';

export function useRecentPosts() {
  return useQuery('recent-posts', () => adminApi.getRecentPosts());
}