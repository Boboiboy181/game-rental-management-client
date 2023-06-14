import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../contexts/cart.context.tsx';
import { ProductQuantity } from '../types/product-quantity.type.ts';

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState<ProductQuantity>(
    {} as ProductQuantity,
  );
  const { addItemToCart } = useContext(CartContext);

  // get product by id
  useEffect(() => {
    const fetchProduct = async () => {
      const { data }: { data: ProductQuantity } = await axios.get(
        `https://game-rental-management-app-yh3ve.ondigitalocean.app/video-game/${productId}`,
      );
      setProduct(data);
    };
    fetchProduct();
  }, [productId]);

  const handleOnClick = () => addItemToCart(product);

  return (
    <div className="pt-16 px-14 pb-24">
      <p className="text-black/[.5] mb-6">
        Our shop / Products / {`${product.productName}`}
      </p>
      <div className="flex">
        <div className="w-1/3 overflow-hidden m-auto rounded-xl">
          <img
            className=""
            src={`${product.imageUrl}`}
            alt={`${product.productName} image`}
          />
        </div>
        <div className="w-2/3 product-information px-10">
          <h4 className="text-2xl">{product.productName}</h4>
          <div className="text-black/[0.5] mt-2">
            <p>{product.manufacturer}</p>
            <p>{product.genre}</p>
            <p>{product.releaseDate}</p>
            <p>{product.language}</p>
            <p>{product.manufacturer}</p>
            <p>{product.system}</p>
          </div>
          <p className="text-2xl mt-5">{product.price} VND</p>
          <div>
            <button
              className="rounded-md bg-blue-600 text-white px-6 py-2 transition duration-500 hover:bg-indigo-600 w-full mt-5"
              type="submit"
              onClick={handleOnClick}
            >
              Add to cart
            </button>
          </div>
          <div className="text-center bg-gradient-to-br from-yellow-200 to-yellow-300 mt-4 rounded-lg p-4">
            <p className="font-light">
              Please call to check the quantity before going to the store
            </p>
            <a href="tel:+84374756491" className="mt-2 block text-xl relative">
              Hotline: 0374756491
              <span className="absolute block bg-black left-0 w-0 h-[2px] transition-transform duration-500 hover:w-full"></span>
            </a>
          </div>
          <p className="mt-10">Description</p>
          <p className="text-black/[0.5] mt-5">{product.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
