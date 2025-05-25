import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


import './index.css'; // optional, if you have global styles
import Home from './pages';

const root = ReactDOM.createRoot(document.getElementById('root')!);
const queryClient = new QueryClient();


root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Home />
    </QueryClientProvider>
    
  </React.StrictMode>
);

