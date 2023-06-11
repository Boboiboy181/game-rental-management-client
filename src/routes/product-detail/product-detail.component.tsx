import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

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

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState<Product>({} as Product);

  // get product by id
  useEffect(() => {
    const fetchProduct = async () => {
      const { data }: { data: Product } = await axios.get(
        `https://game-rental-management-app-yh3ve.ondigitalocean.app/video-game/${productId}`,
      );
      setProduct(data);
    };

    fetchProduct();
  }, [productId]);

  return (
    <div className="pt-16 px-14 pb-24">
      <p className="text-black/[.5] mb-6">
        Our shop / Products / {`${product.productName}`}
      </p>
      <div className="flex">
        <div className="w-1/2 overflow-hidden m-auto rounded-xl">
          <img
            className=""
            src={`${product.imageUrl}`}
            alt={`${product.productName} image`}
          />
        </div>
        <div className="w-1/2 product-information px-10">
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
          <button
            className="rounded-md bg-blue-600 text-white px-6 py-2 transition duration-500 hover:bg-indigo-600 w-full mt-5"
            type="submit"
          >
            Add to cart
          </button>
          <p className="mt-10">Description</p>
          <p className="text-black/[0.5] mt-5">{product.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
