import { useParams } from 'react-router-dom';
import axios from 'axios';
import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../contexts/cart.context.tsx';
import { ProductForOrder } from '../types/product-order.type.ts';
import RentalDayListComponent from '../components/rental-day-list.component';

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState<ProductForOrder>(
    {} as ProductForOrder,
  );
  const [price, setPrice] = useState<number>(0);
  const { cartItems, addItemToCart } = useContext(CartContext);
  const [numberOfRentalDays, setNumberOfRentalDays] =
    useState<string>('ONE_DAY');

  // get product by id
  useEffect(() => {
    const fetchProduct = async () => {
      const { data }: { data: ProductForOrder } = await axios.get(
        `https://game-rental-management-app-yh3ve.ondigitalocean.app/video-game/${productId}`,
      );
      setProduct(data);
      setPrice(data.price);
    };
    fetchProduct();
  }, [productId]);

  const priceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = e.target.value;
    if (value === 'ONE_DAY') {
      setPrice(Math.floor(product.price));
    }
    if (value === 'THREE_DAYS') {
      setPrice(Math.floor(product.price * 3 * 0.89));
    }
    if (value === 'SEVEN_DAYS') {
      setPrice(Math.floor(product.price * 7 * 0.87));
    }
    if (value === 'FOURTEEN_DAYS') {
      setPrice(Math.floor(product.price * 14 * 0.85));
    }
    if (value === 'THIRTY_DAYS') {
      setPrice(Math.floor(product.price * 30 * 0.83));
    }
    if (value === 'SIXTY_DAYS') {
      setPrice(Math.floor(product.price * 60 * 0.8));
    }
  };

  const formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });
  const formattedPrice = formatter.format(price);

  // check the game is in the cart or not
  const isGameInCart = (product: ProductForOrder) => {
    const game = cartItems.find((item: ProductForOrder) => {
      return item._id === product._id;
    });
    return game;
  };

  const handleOnClick = () => {
    if (!isGameInCart(product)) {
      addItemToCart(product, numberOfRentalDays, price);
    } else {
      console.log('Game is already in the cart');
    }
  };

  return (
    <div className="pt-16 pl-14 pr-14 pb-24">
      <p className="text-black/[.5] mb-6">
        Our shop / Products / {`${product.productName}`}
      </p>
      <div className="flex items-center">
        <div className="w-[40%] overflow-hidden m-auto rounded-xl">
          <img
            className=""
            src={`${product.imageUrl}`}
            alt={`${product.productName} image`}
          />
        </div>
        <div className="w-[60%] product-information px-10">
          <h4 className="text-2xl">{product.productName}</h4>
          <div className="text-black/[0.5] mt-2">
            <p>Genre: {product.genre}</p>
            <p>Release date: {product.releaseDate}</p>
            <p>Language: {product.language}</p>
            <p>Manufacture: {product.manufacturer}</p>
            <p>System: {product.system}</p>
          </div>
          <p className="text-3xl font-semibold mt-5 text-red-500">
            {formattedPrice}
          </p>
          <RentalDayListComponent
            onChangeHandler={priceChange}
            setRentalDays={setNumberOfRentalDays}
          />
          <div className="flex justify-between items-center mt-5">
            <button
              className="rounded-md bg-blue-600 text-white px-6 py-2 transition duration-500 hover:bg-indigo-600 w-full focus:-translate-y-[.1rem] focus:outline-none focus:shadow-md"
              type="submit"
              onClick={handleOnClick}
            >
              Add to cart
            </button>
          </div>
          <div className="text-center cursor-pointer bg-gradient-to-br from-yellow-200 to-yellow-300 mt-4 rounded-lg p-4">
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
