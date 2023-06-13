import { MouseEventHandler, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ProductList from '../../components/product-list.component';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get(
        'https://game-rental-management-app-yh3ve.ondigitalocean.app/video-game',
      );
      setProducts(data);
    };

    fetchProducts();
  }, []);

  const handleClick =
    (productId: string): MouseEventHandler<HTMLDivElement> =>
    () => {
      navigate(`/products/${productId}`);
    };

  return (
    <div>
      <h1 className="text-5xl font-semibold font-cursive text-center mt-16 mb-10 tracking-wide">
        Our Store
      </h1>
      <ProductList products={products} onClickHandler={handleClick} />
    </div>
  );
};

export default Shop;
