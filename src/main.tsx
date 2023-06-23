import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.scss';
import { BrowserRouter } from 'react-router-dom';
import { OverlayProvider } from './context/overlay.context.tsx';
import { ProductProvider } from './context/product.context.tsx';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ProductProvider>
        <OverlayProvider>
          <App />
        </OverlayProvider>
      </ProductProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
