import { Route, Routes } from 'react-router-dom';
import MainLayout from './routes/main-layout.component';
import { ConfigProvider } from 'antd';
import { useEffect } from 'react';
import Home from './routes/home.component';

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
          <Route path="customers" element={<div>Customers</div>} />
          <Route path="video-games" element={<div>Video game</div>} />
          <Route path="pre-orders" element={<div>Pre-order</div>} />
          <Route path="rentals" element={<div>Rentals</div>} />
          <Route path="returns" element={<div>Returns</div>} />
          <Route path="invoices" element={<div>Invoices</div>} />
        </Route>
      </Routes>
    </ConfigProvider>
  );
};

export default App;
