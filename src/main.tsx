import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { router } from './routes';
import './index.css';

// Create a QueryClient instance
const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider 
        router={router}
        future={{
          v7_startTransition: true,  // Use the known flag for transition
        }} 
      />
    </QueryClientProvider>
  </StrictMode>
);
