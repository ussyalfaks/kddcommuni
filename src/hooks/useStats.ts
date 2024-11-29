import { useQuery } from 'react-query';
import { adminApi } from '../lib/api';

export function useStats() {
  return useQuery('admin-stats', () => adminApi.getStats());
}