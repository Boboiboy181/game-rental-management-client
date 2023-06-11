import { MouseEventHandler, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

type Product = {
  _id: string;
  productName: string;
  price: number;
  quantity: number;
  manufacturer: string;
  genre: string;
  releaseDate: string;
  language: string;
  system: string;
  description: string;
  imageUrl: string;
};

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
      <div className="flex flex-wrap text-center items-center p-8">
        {products.map((product: Product) => {
          return (
            <div
              key={product._id}
              className="w-1/5 text-center cursor-pointer transition duration-500 ease-in-out transform hover:-translate-y-2 hover:shadow-xl hover:rounded-md"
              onClick={handleClick(product._id)}
            >
              <div className="image-container w-[220px] h-[300px] overflow-hidden rounded-md m-auto">
                <img src={`${product.imageUrl}`} alt="" className="" />
              </div>
              <div className="mt-3 mb-4">
                <h3>{product.productName}</h3>
                <p>{product.price}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Shop;
