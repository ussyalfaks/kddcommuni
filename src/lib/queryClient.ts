import { QueryClient } from 'react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 30000,
      cacheTime: 3600000,
      onError: (error: unknown) => {
        console.error('Query error:', error instanceof Error ? error.message : 'An error occurred');
      },
      useErrorBoundary: false
    },
    mutations: {
      retry: 1,
      onError: (error: unknown) => {
        console.error('Mutation error:', error instanceof Error ? error.message : 'An error occurred');
      },
      useErrorBoundary: false
    }
  }
});