import CustomerPage from './customer.component';
import ProductPage from './product.component';
import RentalPackagePage from './rental-package.component';
import RentalPackageDetail from '../components/rental-package/rental-package-detail.component';
import PreOrderPage from './pre-order.component';
import PreOrderDetail from '../components/pre-order/pre-order-detail.component';
import RentalPage from './rental.component';
import RentalDetail from '../components/rental/rental-detail.component';
import AddRental from '../components/rental/add-rental.component';
import UpdateRental from '../components/rental/update-rental.component';
import ReturnPage from './return.component';
import ReturnDetail from '../components/return/return-detail.component';
import AddReturn from '../components/return/add-return.component';
import InvoicePage from './invoice.component';
import AddInvoice from '../components/invoice/add-invoice.component';
import InvoiceDetail from '../components/invoice/invoice-detail.component';
import Home from './home.component';
import AuthPage from './auth.component';

const privateRoutes = [
  {
    path: '/',
    element: <Home />,
    isPrivate: false,
  },
  {
    path: 'auth/login',
    element: <AuthPage />,
    isPrivate: false,
  },
  {
    path: 'customers/',
    element: <CustomerPage />,
    isPrivate: true,
  },
  {
    path: 'video-games',
    element: <ProductPage />,
    isPrivate: true,
  },
  {
    path: 'rental-packages',
    element: <RentalPackagePage />,
    isPrivate: true,
  },
  {
    path: 'rental-packages/:rentalPackageID',
    element: <RentalPackageDetail />,
    isPrivate: true,
  },
  {
    path: 'pre-orders',
    element: <PreOrderPage />,
    isPrivate: true,
  },
  {
    path: 'pre-orders/:preOrderID',
    element: <PreOrderDetail />,
    isPrivate: true,
  },
  {
    path: 'rentals',
    element: <RentalPage />,
    isPrivate: true,
  },
  {
    path: 'rentals/:rentalID',
    element: <RentalDetail />,
    isPrivate: true,
  },
  {
    path: 'rentals/create/:preOrderID?',
    element: <AddRental />,
    isPrivate: true,
  },
  {
    path: 'rentals/update/:rentalID',
    element: <UpdateRental />,
    isPrivate: true,
  },
  {
    path: 'returns',
    element: <ReturnPage />,
    isPrivate: true,
  },
  {
    path: 'returns/:returnID',
    element: <ReturnDetail />,
    isPrivate: true,
  },
  {
    path: 'returns/create/:rentalID?',
    element: <AddReturn />,
    isPrivate: true,
  },
  {
    path: 'invoices',
    element: <InvoicePage />,
    isPrivate: true,
  },
  {
    path: 'invoices/create/:returnID?',
    element: <AddInvoice />,
    isPrivate: true,
  },
  {
    path: 'invoices/:invoiceID',
    isPrivate: true,
    element: <InvoiceDetail />,
  },
];

export default privateRoutes;
