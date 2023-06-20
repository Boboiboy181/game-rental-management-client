import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.scss';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './contexts/cart.context.tsx';
import { SearchProvider } from './contexts/search.context.tsx';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider>
        <SearchProvider>
          <App />
        </SearchProvider>
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
