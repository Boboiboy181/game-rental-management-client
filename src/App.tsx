import { Route, Routes } from 'react-router-dom';
import Navigation from './routes/navigation.component';
import Checkout from './routes/checkout.component';
import Shop from './routes/shop.component';
import ProductDetail from './routes/product-detail.component';
import Authentication from './routes/authentication.component';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Shop />} />
        <Route path="products/:productId" element={<ProductDetail />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>
      <Route path="auth" element={<Authentication />} />
    </Routes>
  );
};

export default App;
