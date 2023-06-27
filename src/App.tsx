import { Route, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import MainLayout from './routes/main-layout.component';
import { ConfigProvider } from 'antd';
import { useEffect } from 'react';
import Home from './routes/home.component';
import PreOrderDetail from './components/pre-order-detail.component';
import CustomerPage from './routes/customer.component';
import PreOrderPage from './routes/pre-order.component';
import ProductPage from './routes/product.component';
import RentalPage from './routes/rental.component';
import ReturnPage from './routes/return.component';
import RentalDetail from './components/rental-detail.component';

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
          <Route path="customers" element={<CustomerPage />} />
          <Route path="video-games" element={<ProductPage />} />
          <Route path="pre-orders" element={<PreOrderPage />} />
          <Route path="pre-orders/:preOrderID" element={<PreOrderDetail />} />
          <Route path="rentals" element={<RentalPage />} />
          <Route path="rentals/:rentalID" element={<RentalDetail />} />
          <Route
            path="rentals/create/:preOrderID?"
            element={<p>Tao phieu thue</p>}
          />
          <Route path="returns" element={<ReturnPage />} />
          <Route
            path="returns/create/:rentalID?"
            element={<p>Tao phieu thue</p>}
          />
          <Route path="invoices" element={<div>Invoices</div>} />
        </Route>
      </Routes>
    </ConfigProvider>
  );
};

export default App;
