import { Route, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import MainLayout from './routes/main-layout.component';
import { ConfigProvider } from 'antd';
import { useEffect } from 'react';
import Home from './routes/home.component';
import PreOrder from './routes/pre-order.component';
import Customer from './routes/customer.component';
import Product from './routes/product.component';
import Return from './routes/return.component';
import Rental from './routes/rental.component';
import RentalPackage from './routes/rental-package.component';

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
        <Route path="pre-order" element={<PreOrder />} />
        <Route path="customer" element={<Customer />} />
        <Route path="video-game" element={<Product />} />
        <Route path="rental" element={<Rental />} />
        <Route path="return" element={<Return />} />
        <Route path="invoice" element={<div>Invoices</div>} />
        <Route path="rental-package" element={<RentalPackage />} />
      </Route>
    </Routes>
  </ConfigProvider>
  
  );
};

export default App;
