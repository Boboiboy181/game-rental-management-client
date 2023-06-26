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
          <Route path="rental" element={<div>Rentals</div>} />
          <Route path="rental/create/:preOrderID?" element={<p>Tao phieu thue</p>}/>
          <Route path="return" element={<div>Returns</div>} />
          <Route path="invoice" element={<div>Invoices</div>} />
        </Route>
      </Routes>
    </ConfigProvider>
  );
};

export default App;
