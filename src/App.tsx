import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Spinner from './components/spinner.component';
import Navigation from './routes/navigation.component';

const Shop = React.lazy(() => import('./routes/shop.component'));
const ProductDetail = React.lazy(
  () => import('./routes/product-detail.component'),
);
const Checkout = React.lazy(() => import('./routes/checkout.component'));
const Introduction = React.lazy(
  () => import('./routes/introduction.component'),
);
const Authentication = React.lazy(
  () => import('./routes/authentication.component'),
);

const App = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Shop />} />
          <Route path="products/:productId" element={<ProductDetail />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="introduction" element={<Introduction />} />
        </Route>
        <Route path="auth" element={<Authentication />} />
      </Routes>
    </Suspense>
  );
};

export default App;
