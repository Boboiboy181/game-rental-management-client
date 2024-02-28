import { Route, Routes } from 'react-router-dom';
import Authentication from './routes/authentication.component';
import Checkout from './routes/checkout.component';
import Introduction from './routes/introduction.component';
import Navigation from './routes/navigation.component';
import ProductDetail from './routes/product-detail.component';
import Shop from './routes/shop.component';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Shop />} />
        <Route path="products/:productId" element={<ProductDetail />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="introduction" element={<Introduction />} />
      </Route>
      <Route path="auth" element={<Authentication />} />
    </Routes>
  );
};

export default App;
