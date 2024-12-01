import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query'; // Import React Query components
import { router } from './routes';
import './index.css';

// Create a QueryClient instance
const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* Wrap the app with QueryClientProvider */}
    <QueryClientProvider client={queryClient}>
      <RouterProvider 
        router={router} 
        future={{ 
          v7_startTransition: true, // Use only valid properties here
        }} 
      />
    </QueryClientProvider>
  </StrictMode>
);
