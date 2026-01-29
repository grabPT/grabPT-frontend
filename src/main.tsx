// import { StrictMode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'react-hot-toast';

import App from '@/App.tsx';
import ConfirmModal from '@/components/ConfirmModal';
import '@/index.css';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <QueryClientProvider client={queryClient}>
    <App />
    <Toaster />
    <ConfirmModal />
    <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
  </QueryClientProvider>,
  // </StrictMode>,
);
