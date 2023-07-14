import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.scss';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './context/cart.context.tsx';
import { NavigationKeyProvider } from './context/navigation-key.context.ts.tsx';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <NavigationKeyProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </NavigationKeyProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
