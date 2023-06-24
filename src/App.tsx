import { Route, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import MainLayout from './routes/main-layout.component';
import { ConfigProvider } from 'antd';
import { useEffect } from 'react';
import Home from './routes/home.component';
import PreOrder from './routes/pre-order.component';
import Customer from './routes/customer.component';
import Product from './routes/product.component';

const App = () => {
  useEffect(() => {
    // Update the system font
    document.body.style.fontFamily = 'Be Vietnam Pro, sans-serif';
  }, []);

  return (
    <ConfigProvider>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="pre-orders" element={<PreOrder />} />
          <Route path="customers" element={<Customer />} />
          <Route path="video-games" element={<Product />} />
          <Route path="rentals" element={<div>Rentals</div>} />
          <Route path="returns" element={<div>Returns</div>} />
          <Route path="invoices" element={<div>Invoices</div>} />
        </Route>
      </Routes>
    </ConfigProvider>
  );
};

export default App;
