import { Route, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import MainLayout from './routes/main-layout.component';
import { ConfigProvider } from 'antd';
import { useEffect } from 'react';
import Home from './routes/home.component';
import PreOrderDetail from './components/pre-order-detail.component';
import ProductComponent from './routes/product.component';
import CustomerPage from './routes/customer.component';
import PreOrderPage from './routes/pre-order.component';
import Return from './routes/return.component';
import Rental from './routes/rental.component';

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
          <Route path="customer" element={<CustomerPage />} />
          <Route path="video-game" element={<ProductComponent />} />
          <Route path="pre-order" element={<PreOrderPage />} />
          <Route path="pre-order/:preOrderID" element={<PreOrderDetail />} />
          <Route path="customers" element={<Customer />} />
          <Route path="video-games" element={<Product />} />
          <Route path="rentals" element={<Rental />} />
          <Route path="rentals/create/:preOrderID?" element={<p>Tao phieu thue</p>}/>
          <Route path="returns" element={<Return />} />
          <Route path="invoices" element={<div>Invoices</div>} />
        </Route>
      </Routes>
    </ConfigProvider>
  );
};

export default App;
