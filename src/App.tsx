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
import AddRental from './components/add-rental.component';
import UpdateRental from './components/update-rental.component';
import ReturnDetail from './components/return-detail.component.tsx';
import AddReturn from './components/add-return.component.tsx';
import RentalPackagePage from './routes/rental-package.component';
import RentalPackageDetail from './components/rental-package-detail.component';
import InvoicePage from './routes/invoice.component.tsx';
import AddInvoice from './components/add-invoice.component.tsx';
import InvoiceDetail from './components/invoice-detail.component.tsx';
import AuthPage from './routes/auth.component.tsx';

const App = () => {
  useEffect(() => {
    // Update the system font
    document.body.style.fontFamily = 'Be Vietnam Pro, sans-serif';
  }, []);

  return (
    <ConfigProvider>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="auth/login" element={<AuthPage />} />
          <Route index element={<Home />} />
          <Route path="customers" element={<CustomerPage />} />
          <Route path="video-games" element={<ProductPage />} />
          <Route path="rental-packages" element={<RentalPackagePage />} />
          <Route
            path="rental-packages/:rentalPackageID"
            element={<RentalPackageDetail />}
          />
          <Route path="pre-orders" element={<PreOrderPage />} />
          <Route path="pre-orders/:preOrderID" element={<PreOrderDetail />} />
          <Route path="rentals" element={<RentalPage />} />
          <Route path="rentals/:rentalID" element={<RentalDetail />} />
          <Route path="rentals/create/:preOrderID?" element={<AddRental />} />
          <Route path="rentals/update/:rentalID" element={<UpdateRental />} />
          <Route path="returns" element={<ReturnPage />} />
          <Route path="returns/:returnID" element={<ReturnDetail />} />
          <Route path="returns/create/:rentalID?" element={<AddReturn />} />
          <Route path="invoices" element={<InvoicePage />} />
          <Route path="invoices/create/:returnID?" element={<AddInvoice />} />
          <Route path="invoices/:invoiceID" element={<InvoiceDetail />} />
        </Route>
      </Routes>
    </ConfigProvider>
  );
};

export default App;
