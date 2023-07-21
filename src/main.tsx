import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.scss';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './contexts/cart.context.tsx';
import { SearchProvider } from './contexts/search.context.tsx';
import { UserProvider } from './contexts/user.context.tsx';
import { LoadingProvider } from './contexts/loading.context.tsx';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <CartProvider>
          <LoadingProvider>
            <SearchProvider>
              <App />
            </SearchProvider>
          </LoadingProvider>
        </CartProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
