import { MouseEventHandler, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductList from '../components/product-list.component';
import { Product } from '../types/product.type';
import { SearchContext } from '../contexts/search.context';
import api from '../api/axios.config';

const Shop = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { searchField } = useContext(SearchContext);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const { data }: { data: Product[] } = await api.get('/video-game');
      setProducts(data);
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const newFilteredProducts = products.filter((product) => {
      return product.productName.toLowerCase().includes(searchField);
    });
    setFilteredProducts(newFilteredProducts);
  }, [searchField, products]);

  const handleClick =
    (productId: string): MouseEventHandler<HTMLDivElement> =>
    () => {
      navigate(`/products/${productId}`);
    };

  return (
    <div>
      <h1 className="text-5xl font-semibold font-cursive text-center mt-16 mb-10 tracking-wider">
        Our Store
      </h1>
      <ProductList products={filteredProducts} onClickHandler={handleClick} />
    </div>
  );
};

export default Shop;
