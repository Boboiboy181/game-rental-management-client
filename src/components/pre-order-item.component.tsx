import React, { useContext, useEffect, useState } from 'react';
import { ProductForOrder } from '../types/product-order.type';
import { CartContext } from '../contexts/cart.context';
import { RentalDaysEnum } from '../enums/rental-days.enum';

type PreOrderItemProps = {
  cartItem: ProductForOrder;
};

const PreOrderItem = ({ cartItem }: PreOrderItemProps) => {
  const { updateCartItem, deleteCartItem } = useContext(CartContext);
  const [orderQuantity, setOrderQuantity] = useState<number>(
    cartItem.preOrderQuantity,
  );

  useEffect(() => {
    updateCartItem(cartItem, orderQuantity);
  }, [orderQuantity]);

  const selectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOrderQuantity(Number(e.target.value));
  };

  const numberOfRentalDays = (rentalOption: string): string => {
    const rentalIndex = Object.values(RentalDaysEnum).indexOf(rentalOption);
    return Object.keys(RentalDaysEnum)[rentalIndex];
  };

  const deleteItem = (cartItem: ProductForOrder) => {
    deleteCartItem(cartItem);
  };

  const formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });

  return (
    <li className="flex border-b p-6 justify-between">
      <div className="image-container w-1/6 rounded-md h-1/6">
        <img
          className="w-full h-full object-contain rounded-md"
          src={cartItem.imageUrl}
          alt="`${cartItem.productName} image`"
        />
      </div>
      <div className="product-description basis-[90%] pl-6">
        <div className="flex justify-between">
          <p className="text-lg">{cartItem.productName}</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 cursor-pointer hover:text-blue-600 transition-all duration-300"
            onClick={() => deleteItem(cartItem)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        </div>
        {/* <p className="text-black/[.5] text-[14px]">Genre: {cartItem.genre}</p>
        <p className="text-black/[.5] text-[14px]">
          Language: {cartItem.language}
        </p> */}
        <p className="text-black/[.5] text-[14px] mt-1">
          Order quantity:
          <span className="ml-[2px] text-black">
            {cartItem.preOrderQuantity}
          </span>
        </p>
        <p className="text-black/[.5] text-[14px] mt-[2px]">
          Number of rental days:
          <span className="ml-[2px] text-black">
            {numberOfRentalDays(cartItem.numberOfRentalDays)}
          </span>
        </p>
        <div className="flex justify-between items-center mt-3">
          <p>Unit price: {formatter.format(cartItem.priceByDays)}</p>
          <select
            name=""
            id=""
            className="rounded-md cursor-pointer"
            value={orderQuantity}
            onChange={selectHandler}
          >
            {Array.from({ length: cartItem.quantity }, (_, i) => (
              <option key={i} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </div>
      </div>
    </li>
  );
};

export default PreOrderItem;
